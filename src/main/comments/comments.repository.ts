import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { CommentEntity } from './comments.entity';
import { VoteEntity } from '../votes/votes.entity';

@CustomRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async getCommentsByUserId(userId: number) {
    return this.createQueryBuilder('c')
      .select(['c', 'w.nickname', 'w.id'])
      .innerJoin('c.writer', 'w')
      .where('c.user_id = :userId', { userId })
      .orderBy('c.createdAt', 'DESC')
      .getMany();
  }

  async getCommentsByCommentIds(commentIds: number[]) {
    return this.createQueryBuilder('c')
      .select(['c', 'w.nickname', 'w.id'])
      .innerJoin('c.writer', 'w')
      .where('c.id in (:...commentIds)', { commentIds })
      .getMany();
  }

  async getLikedCommentsByUserId(userId) {
    return this.createQueryBuilder('c')
      .select(['c', 'w.nickname', 'w.id'])
      .innerJoin(VoteEntity, 'v', `c.id = v.target_id and v.target_type = 'comment' and v.vote_type = 'like'`)
      .innerJoin('c.writer', 'w')
      .where(`c.user_id = :userId`, {
        userId,
      })
      .orderBy('c.createdAt', 'DESC')
      .getMany();
  }
}
