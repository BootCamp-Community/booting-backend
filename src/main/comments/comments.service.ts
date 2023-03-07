import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../users/users.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comments.repository';
import { VoteRepository } from '../votes/votes.repository';
import { PostRepository } from '../posts/posts.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepostiroy: PostRepository,
    private voteRepository: VoteRepository,
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
      // TODO: comment Id를 모아서 where in으로 한번만에 쿼리하는 방식으로 변경해야 할듯
      const _comments = await Promise.all(
        comments.map(async (comment) => {
          const vote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(comment.id, 'comment', user.id);

          return {
            ...comment,
            liked: vote?.voteType === 'like' ? true : false,
            disliked: vote?.voteType === 'dislike' ? true : false,
          };
        }),
      );

      comments = _comments;
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

    return this.commentRepository.save({ ...createCommentDto, userId: user.id, createIp: ip });
  }

  async updateCommentById(user: UserEntity, id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({ id, userId: user.id });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return this.commentRepository.update({ id, userId: user.id }, updateCommentDto);
  }

  async deleteCommentById(user: UserEntity, id: number) {
    const comment = await this.commentRepository.findOneBy({ id, userId: user.id });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return this.commentRepository.delete({ id, userId: user.id });
  }
}
