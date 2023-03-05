import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../posts/posts.repository';
import { VoteRepository } from './votes.repository';
import { UserEntity } from '../users/users.entity';
import { VoteEntity } from './votes.entity';
import { targetType } from './votes.interface';
import { CommentRepository } from '../comments/comments.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
    private voteRepository: VoteRepository,
    private dataSource: DataSource,
  ) {}

  async createLike(user: UserEntity, targetType: targetType, targetId: number) {
    let targetRepository;
    switch (targetType) {
      case 'post':
        targetRepository = this.postRepository;
        break;
      case 'comment':
        targetRepository = this.commentRepository;
        break;
      default:
        throw new BadRequestException('잘못된 요청입니다.');
    }

    const target = await targetRepository.findOne({ where: { id: targetId } });
    if (!target) {
      throw new NotFoundException('대상을 찾을 수 없습니다.');
    }

    // transaction
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const findVote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(targetId, targetType, user.id);
      if (findVote?.voteType === 'like') {
        throw new BadRequestException('이미 좋아요를 눌렀습니다.');
      } else if (findVote?.voteType === 'dislike') {
        // 싫어요가 눌려있다면 삭제하고 좋아요로 변경한다.
        target.dislikeCount = Math.max(0, target.dislikeCount - 1);
        await queryRunner.manager.delete(VoteEntity, findVote.id);
      }

      const vote = VoteEntity.from({
        targetId,
        targetType,
        voteType: 'like',
        userId: user.id,
      });
      target.likeCount += 1;

      await queryRunner.manager.save(vote);
      await queryRunner.manager.save(target);

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    // transaction example
    // const rst = await this.dataSource.transaction(async (manager) => {
    //   const _voteRepository = manager.withRepository(this.voteRepository);
    //   const _targetRepository = manager.withRepository(targetRepository);
    //
    //   const vote = VoteEntity.from({
    //     targetId,
    //     targetType,
    //     voteType: 'like',
    //     userId: user.id,
    //   });
    //   target.likeCount += 1;
    //
    //   await _voteRepository.save(vote);
    //   await _targetRepository.save(target);
    //   return;
    // });
    //
    // return rst;
  }

  async deleteLike(user: UserEntity, targetType: targetType, targetId: number) {
    let targetRepository;
    switch (targetType) {
      case 'post':
        targetRepository = this.postRepository;
        break;
      case 'comment':
        targetRepository = this.commentRepository;
        break;
      default:
        throw new BadRequestException('잘못된 요청입니다.');
    }

    const target = await targetRepository.findOne({ where: { id: targetId } });
    if (!target) {
      throw new NotFoundException('대상을 찾을 수 없습니다.');
    }

    // transaction
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const findVote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(targetId, targetType, user.id);
      if (!findVote) {
        return;
      } else if (findVote?.voteType === 'dislike') {
        return;
      }

      // 좋아요가 눌려있다면 삭제한다.
      target.likeCount = Math.max(0, target.likeCount - 1);
      await queryRunner.manager.delete(VoteEntity, findVote.id);
      await queryRunner.manager.save(target);

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createDislike(user: UserEntity, targetType: targetType, targetId: number) {
    let targetRepository;
    switch (targetType) {
      case 'post':
        targetRepository = this.postRepository;
        break;
      case 'comment':
        targetRepository = this.commentRepository;
        break;
      default:
        throw new BadRequestException('잘못된 요청입니다.');
    }

    const target = await targetRepository.findOne({ where: { id: targetId } });
    if (!target) {
      throw new NotFoundException('대상을 찾을 수 없습니다.');
    }

    // transaction
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const findVote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(targetId, targetType, user.id);
      if (findVote?.voteType === 'dislike') {
        throw new BadRequestException('이미 좋아요를 눌렀습니다.');
      } else if (findVote?.voteType === 'like') {
        // 좋아요가 눌려있다면 삭제하고 싫어요로 변경한다.
        target.likeCount = Math.max(0, target.likeCount - 1);
        await queryRunner.manager.delete(VoteEntity, findVote.id);
      }

      const vote = VoteEntity.from({
        targetId,
        targetType,
        voteType: 'dislike',
        userId: user.id,
      });
      target.dislikeCount += 1;

      await queryRunner.manager.save(vote);
      await queryRunner.manager.save(target);

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async deleteDislike(user: UserEntity, targetType: targetType, targetId: number) {
    let targetRepository;
    switch (targetType) {
      case 'post':
        targetRepository = this.postRepository;
        break;
      case 'comment':
        targetRepository = this.commentRepository;
        break;
      default:
        throw new BadRequestException('잘못된 요청입니다.');
    }

    const target = await targetRepository.findOne({ where: { id: targetId } });
    if (!target) {
      throw new NotFoundException('대상을 찾을 수 없습니다.');
    }

    // transaction
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const findVote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(targetId, targetType, user.id);
      if (!findVote) {
        return;
      } else if (findVote?.voteType === 'like') {
        return;
      }

      // 싫어요가 눌려있다면 삭제한다.
      target.dislikeCount = Math.max(0, target.dislikeCount - 1);
      await queryRunner.manager.delete(VoteEntity, findVote.id);
      await queryRunner.manager.save(target);

      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
