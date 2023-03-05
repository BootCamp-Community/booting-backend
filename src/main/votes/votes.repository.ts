import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { VoteEntity } from './votes.entity';
import { targetType } from './votes.interface';

@CustomRepository(VoteEntity)
export class VoteRepository extends Repository<VoteEntity> {
  async getVoteTypeByTargetIdAndUserId(targetId, targetType: targetType, userId) {
    return this.createQueryBuilder('v')
      .select(['v.voteType', 'v.id'])
      .where(`v.target_id = :targetId and v.target_type = :targetType and v.user_id = :userId`, {
        targetId,
        targetType,
        userId,
      })
      .getOne();
  }
}
