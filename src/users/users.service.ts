import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async register({
    category,
    newUser,
  }: {
    category: string;
    newUser: UserEntity;
  }) {
    let findByParams;
    switch (category) {
      case 'kakao': {
        findByParams: {
          kid: newUser.kid;
        }
      }
      case 'naver': {
        findByParams: {
          nid: newUser.nid;
        }
      }
      case 'apple': {
        findByParams: {
          aid: newUser.aid;
        }
      }
      case 'google': {
        findByParams: {
          gid: newUser.gid;
        }
      }
      case 'github': {
        findByParams: {
          ggid: newUser.ggid;
        }
      }
    }

    const [userFind] = await this.userRepository.findBy(findByParams);

    if (userFind) {
      throw new HttpException(
        '이미 존재하는 회원 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.save(newUser);
  }

  async save(user: UserEntity) {
    return this.userRepository.save(user);
  }
}
