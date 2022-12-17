import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
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
        findByParams = {
          kid: newUser.kid,
        };
        break;
      }
      case 'naver': {
        findByParams = {
          nid: newUser.nid,
        };
        break;
      }
      case 'apple': {
        findByParams = {
          aid: newUser.aid,
        };
        break;
      }
      case 'google': {
        findByParams = {
          gid: newUser.gid,
        };
        break;
      }
      case 'github': {
        findByParams = {
          ggid: newUser.ggid,
        };
        break;
      }
    }
    if (!findByParams) {
      throw new BadRequestException('잘못된 요청 입니다.');
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
