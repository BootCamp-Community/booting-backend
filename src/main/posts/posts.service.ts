import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { GetPostsDto } from './dto/get-posts.dto';
import { VoteRepository } from '../votes/votes.repository';
import { BlockUserRepository } from '../block-users/block-users.repository';
import { UserEntity } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    private postRepository: PostRepository,
    private voteRepository: VoteRepository,
    private blockUserRepository: BlockUserRepository,
  ) {}

  async getPosts(user: UserEntity, getPostDto: GetPostsDto) {
    const { offset, limit, board_id: boardId } = getPostDto;
    let posts = await this.postRepository.find({
      where: {
        boardId: boardId,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    // 로그인한 상태로 현재 API가 호출되면 차단한 유저를 확인해서 차단한 유저의 글은 제외한다.
    if (user) {
      const blockedUserIds = await this.blockUserRepository.getBlockedUserIdsByUserId(user.id);

      posts = posts.filter((post) => !blockedUserIds.includes(post.userId));
    }

    return {
      count: posts.length,
      posts,
    };
  }

  async getPostById(user: UserEntity, id: number) {
    const post = await this.postRepository
      .createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin('p.writer', 'w')
      .where('p.id = :id', { id })
      .getOne();

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    let blockedUserIds;
    let vote;
    // 로그인한 상태로 현재 API가 호출되면 user가 존재하기 때문에 좋아요/싫어요 여부를 확인한다.
    if (user) {
      blockedUserIds = await this.blockUserRepository.getBlockedUserIdsByUserId(user.id);
      vote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(id, 'post', user.id);
    }

    // 블락한 유저의 게시글은 조회 할 수 없다.
    if (blockedUserIds.includes(post.userId)) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return {
      post: {
        ...post,
        liked: vote?.voteType === 'like' ? true : false,
        disliked: vote?.voteType === 'dislike' ? true : false,
      },
    };
  }

  async create(user: UserEntity, createPostDto: CreatePostDto, ip: string): Promise<PostEntity> {
    return await this.postRepository.save({ ...createPostDto, createIp: ip, userId: user.id });
  }

  async update(user: UserEntity, id: number, updatePostDto: UpdatePostDto, ip: string) {
    const post = await this.postRepository.findOneBy({ id, userId: user.id });

    if (!post || post.deleted) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return this.postRepository.update(id, {
      ...updatePostDto,
      createIp: ip,
    });
  }

  async delete(user: UserEntity, id: number) {
    const post = await this.postRepository.findOneBy({ id, userId: user.id });

    if (!post || post.deleted) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return this.postRepository.update({ id }, { deleted: true, deletedAt: new Date() });
  }
}
