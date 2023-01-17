import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByFields(options): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne(options);
  }

  async register(newUser: UserEntity) {
    const [userFind] = await this.userRepository.findBy({
      oAuthId: newUser.oAuthId,
      provider: newUser.provider,
    });

    if (userFind) {
      throw new BadRequestException('이미 등록된 회원 입니다.');
    }

    return this.save(newUser);
  }

  async save(user: UserEntity) {
    return this.userRepository.save(user);
  }
}
