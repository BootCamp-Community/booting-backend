import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../users/users.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comments.repository';
import { VoteRepository } from '../votes/votes.repository';
import { PostRepository } from '../posts/posts.repository';
import { DataSource } from 'typeorm';
import { query } from 'express';
import { Notification } from 'rxjs';
import { NotificationEntity } from '../notifications/notifications.entity';
import { CommentEntity } from './comments.entity';
import { BlockUserRepository } from '../block-users/block-users.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepostiroy: PostRepository,
    private voteRepository: VoteRepository,
    private blockUserRepository: BlockUserRepository,
    private dataSource: DataSource,
  ) {}

  async getCommentsByPostId(user: UserEntity, postId: number) {
    const post = await this.postRepostiroy.findOneBy({ id: postId });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    let comments = await this.commentRepository
      .createQueryBuilder('c')
      .select(['c', 'w.nickname', 'w.id'])
      .innerJoin('c.writer', 'w')
      .where('c.postId = :postId', { postId })
      .orderBy('c.id', 'ASC')
      .getMany();

    // 로그인한 상태로 현재 API가 호출되면 user가 존재하기 때문에 좋아요/싫어요 여부를 확인한다.
    if (user) {
      const blockedUserIds = await this.blockUserRepository.getBlockedUserIdsByUserId(user.id);

      // TODO: comment Id를 모아서 where in으로 한번만에 쿼리하는 방식으로 변경해야 할듯
      const _comments = await Promise.all(
        comments.map(async (comment) => {
          // 블락한 유저의 댓글은 조회하지 않는다.
          if (blockedUserIds.includes(comment.userId)) return null;

          const vote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(comment.id, 'comment', user.id);

          return {
            ...comment,
            liked: vote?.voteType === 'like' ? true : false,
            disliked: vote?.voteType === 'dislike' ? true : false,
          };
        }),
      );

      comments = _comments.filter(Boolean);
    } else {
      // 비회원은 좋아요/싫어요 여부를 확인할 수 없다.
      comments = comments.map((comment) => {
        return {
          ...comment,
          liked: false,
          disliked: false,
        };
      });
    }

    return {
      count: comments.length,
      comments,
    };
  }

  async createComment(user: UserEntity, ip, createCommentDto: CreateCommentDto) {
    const post = await this.postRepostiroy.findOneBy({ id: createCommentDto.postId });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    // transaction을 사용해야 한다.
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const comment = CommentEntity.from({ ...createCommentDto, userId: user.id, createIp: ip });
      await queryRunner.manager.save(comment);

      // post의 isAlarm이 true면 알람을 보내야 한다.
      if (post.isAlarm && user.id !== post.userId) {
        const notification = NotificationEntity.from({
          receiverId: post.userId,
          senderId: user.id,
          title: '새 댓글이 달렸습니다.',
          content: comment.content.length > 20 ? comment.content.substring(0, 20) + '...' : comment.content,
          isPush: 0,
        });

        await queryRunner.manager.save(notification);
      }

      await queryRunner.commitTransaction();
      return comment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateCommentById(user: UserEntity, id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({ id, userId: user.id });

    if (!comment || comment.deleted) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return this.commentRepository.update({ id, userId: user.id }, updateCommentDto);
  }

  async deleteCommentById(user: UserEntity, id: number) {
    const comment = await this.commentRepository.findOneBy({ id, userId: user.id });

    if (!comment || comment.deleted) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return this.commentRepository.update({ id, userId: user.id }, { deleted: true, deletedAt: new Date() });
  }
}
