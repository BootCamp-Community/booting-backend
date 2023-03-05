import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { GetPostsDto } from './dto/get-posts.dto';
import { VoteRepository } from '../votes/votes.repository';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository, private voteRepository: VoteRepository) {}

  async getPosts(getPostDto: GetPostsDto) {
    const { offset, limit, board_id: boardId } = getPostDto;
    const posts = await this.postRepository.find({
      where: {
        boardId: boardId,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });

    return {
      count: posts.length,
      posts,
    };
  }

  async getPostById(user, id: number) {
    const post = await this.postRepository
      .createQueryBuilder('p')
      .select(['p', 'w.nickname', 'w.id'])
      .innerJoin('p.writer', 'w')
      .where('p.id = :id', { id })
      .getOne();

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    let vote;

    // 로그인한 상태로 현재 API가 호출되면 user가 존재하기 때문에 좋아요/싫어요 여부를 확인한다.
    if (user) {
      vote = await this.voteRepository.getVoteTypeByTargetIdAndUserId(id, 'post', user.id);
    }

    return {
      post: {
        ...post,
        liked: vote?.voteType === 'like' ? true : false,
        disliked: vote?.voteType === 'dislike' ? true : false,
      },
    };
  }

  async create(user, createPostDto: CreatePostDto, ip: string): Promise<PostEntity> {
    return this.postRepository.save({ ...createPostDto, createIp: ip, userId: user.id });
  }

  async update(user, id: number, updatePostDto: UpdatePostDto, ip: string) {
    const posts = await this.postRepository.findOneBy({ id, userId: user.id });

    if (!posts) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return this.postRepository.update(id, {
      ...updatePostDto,
      createIp: ip,
    });
  }

  async delete(user, id: number) {
    const posts = await this.postRepository.findOneBy({ id, userId: user.id });

    if (!posts) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return this.postRepository.delete(id);
  }
}
