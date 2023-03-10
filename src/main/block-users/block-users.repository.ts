import { CustomRepository } from '../../configs/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { BlockUserEntity } from './block-users.entity';

@CustomRepository(BlockUserEntity)
export class BlockUserRepository extends Repository<BlockUserEntity> {
  async getBlockedUserIdsByUserId(userId: number) {
    const blockedUsers = await this.find({
      where: { userId },
      select: ['blockUserId'],
    });
    const blockedUserIds = blockedUsers.map((blockedUser) => blockedUser.blockUserId);

    return blockedUserIds;
  }
}
