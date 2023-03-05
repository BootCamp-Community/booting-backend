import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { VoteEntity } from '../votes/votes.entity';

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getPostsByUserId(userId: number) {
    return this.createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin('p.writer', 'w')
      .where('p.user_id = :userId', { userId })
      .orderBy('p.createdAt', 'DESC')
      .getMany();
  }

  async getPostsByPostIds(postIds: number[]) {
    return this.createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin('p.writer', 'w')
      .where('p.id in (:...postIds)', { postIds })
      .orderBy('p.createdAt', 'DESC')
      .getMany();
  }

  async getLikedPostsByUserId(userId) {
    return this.createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin(VoteEntity, 'v', `p.id = v.target_id and v.target_type = 'post' and v.vote_type = 'like'`)
      .innerJoin('p.writer', 'w')
      .where(`p.user_id = :userId`, {
        userId,
      })
      .orderBy('p.createdAt', 'DESC')
      .getMany();
  }
}
