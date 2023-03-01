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

    const posts = await this.postRepository.getPostsByUserId(user.id);
    const comments = await this.commentRepository.getCommentsByUserId(user.id);
    const likedPosts = await this.postRepository.getLikedPostsByUserId(user.id);
    const likedComments = await this.commentRepository.getLikedCommentsByUserId(user.id);

    return {
      user: { ...findUser },
      userPosts: {
        count: posts?.length || 0,
        posts: posts ? [...posts] : null,
      },
      userComments: {
        count: comments?.length || 0,
        comments: comments ? [...comments] : null,
      },
      likedPosts: {
        count: likedPosts?.length || 0,
        posts: likedPosts ? [...likedPosts] : null,
      },
      likedComments: {
        count: likedComments?.length || 0,
        comments: likedComments ? [...likedComments] : null,
      },
    };
  }

  async getUserProfileById(userId: number) {
    const findUser = await this.userRepository.findUserById(userId);

    if (!findUser) {
      throw new BadRequestException('등록된 회원이 아닙니다.');
    }

    const posts = await this.postRepository.getPostsByUserId(userId);
    const comments = await this.commentRepository.getCommentsByUserId(userId);

    return {
      user: { ...findUser },
      userPosts: {
        count: posts?.length || 0,
        posts: posts ? [...posts] : null,
      },
      userComments: {
        count: comments?.length || 0,
        comments: comments ? [...comments] : null,
      },
    };
  }

  async getPostsByUser(userId: number) {
    const findUser = await this.userRepository.findUserById(userId);

    if (!findUser) {
      throw new BadRequestException('등록된 회원이 아닙니다.');
    }

    const posts = await this.postRepository.getPostsByUserId(userId);
    return {
      count: posts?.length || 0,
      posts: posts ? posts : null,
    };
  }

  async getCommentsByUser(userId: number) {
    const findUser = await this.userRepository.findUserById(userId);

    if (!findUser) {
      throw new BadRequestException('등록된 회원이 아닙니다.');
    }

    const comments = await this.commentRepository.getCommentsByUserId(userId);
    return {
      count: comments?.length || 0,
      comments: comments ? comments : null,
    };
  }

  async getLikedPostsByUser(userId: number) {
    const findUser = await this.userRepository.findUserById(userId);

    if (!findUser) {
      throw new BadRequestException('등록된 회원이 아닙니다.');
    }
    const likedPosts = await this.postRepository.getLikedPostsByUserId(userId);

    return {
      likedPosts: {
        count: likedPosts?.length || 0,
        posts: likedPosts ? [...likedPosts] : null,
      },
    };
  }

  async getLikedCommentsByUser(userId: number) {
    const findUser = await this.userRepository.findUserById(userId);

    if (!findUser) {
      throw new BadRequestException('등록된 회원이 아닙니다.');
    }
    const likedComments = await this.commentRepository.getLikedCommentsByUserId(userId);

    return {
      likedComments: {
        count: likedComments?.length || 0,
        comments: likedComments ? [...likedComments] : null,
      },
    };
  }
}
