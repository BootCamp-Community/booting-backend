import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { PostRepository } from '../posts/posts.repository';
import { UserRepository } from './users.repository';
import { CommentRepository } from '../comments/comments.repository';
import { VoteRepository } from '../votes/votes.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
    private voteRepository: VoteRepository,
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

  async getMyProfile(user: UserEntity) {
    const findUser = await this.userRepository
      .createQueryBuilder('u')
      .select(['u.id', 'u.name', 'u.email', 'u.nickname', 'u.photo', 'u.phone', 'u.createdAt', 'u.lastLoginAt'])
      .where('u.id = :id', { id: user.id })
      .getOne();

    if (!findUser) {
      throw new BadRequestException('등록된 회원이 아닙니다.');
    }

    const posts = await this.postRepository
      .createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin('p.writer', 'w')
      .where('p.user_id = :userId', { userId: user.id })
      .getMany();

    const comments = await this.commentRepository
      .createQueryBuilder('c')
      .select(['c', 'w.nickname', 'w.id'])
      .innerJoin('c.writer', 'w')
      .where('c.user_id = :userId', { userId: user.id })
      .getMany();

    const votes = await this.voteRepository
      .createQueryBuilder('v')
      .select(['v', 'u.nickname', 'u.id'])
      .innerJoin('v.voter', 'u')
      .where('v.user_id = :userId', { userId: user.id })
      .getMany();

    const likedPostIds = [];
    const likedCommentIds = [];
    votes.forEach((v) => {
      if (v.voteType === 'like') {
        switch (v.targetType) {
          case 'posts':
            likedPostIds.push(v.targetId);
            break;
          case 'comments':
            likedCommentIds.push(v.targetId);
            break;
          default:
            break;
        }
      }
    });

    const likedPosts = await this.postRepository
      .createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin('p.writer', 'w')
      .where('p.id in (:...likedPostIds)', { likedPostIds })
      .getMany();
    const likedComments = await this.commentRepository
      .createQueryBuilder('c')
      .select(['c', 'w.nickname', 'w.id'])
      .innerJoin('c.writer', 'w')
      .where('c.id in (:...likedCommentIds)', { likedCommentIds })
      .getMany();

    return {
      user: { ...findUser },
      usersPosts: {
        count: posts.length,
        posts: [...posts],
      },
      usersComments: {
        count: comments.length,
        comments: [...comments],
      },
      liked: {
        likedPosts,
        likedComments,
      },
    };
  }
}
