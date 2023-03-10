import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BlockUserRepository } from './block-users.repository';
import { UserEntity } from '../users/users.entity';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class BlockUsersService {
  constructor(private blockUserRepository: BlockUserRepository, private userRepository: UserRepository) {}
  async getBlockUsers(user: UserEntity) {
    const blockUsers = await this.blockUserRepository.findBy({ userId: user.id });

    return {
      count: blockUsers.length,
      blockUsers,
    };
  }

  async blockUser(user, blockUserId: number) {
    const blockUser = await this.userRepository.findOneBy({ id: blockUserId });
    if (!blockUser || blockUserId === user.id) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const isBlockUser = await this.blockUserRepository.findOneBy({ userId: user.id, blockUserId: blockUserId });
    if (isBlockUser) {
      throw new ConflictException('이미 차단한 사용자입니다.');
    }

    return this.blockUserRepository.save({ userId: user.id, blockUserId: blockUserId });
  }

  async unblockUser(user, blockUserId: number) {
    const blockUser = await this.userRepository.findOneBy({ id: blockUserId });
    if (!blockUser || blockUserId === user.id) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const isBlockUser = await this.blockUserRepository.findOneBy({ userId: user.id, blockUserId: blockUserId });
    if (!isBlockUser) {
      throw new BadRequestException('차단하지 않은 사용자입니다.');
    }

    return this.blockUserRepository.delete({ userId: user.id, blockUserId: blockUserId });
  }
}
