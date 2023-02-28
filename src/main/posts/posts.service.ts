import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { GetPostsDto } from './dto/get-posts.dto';
import { VoteRepository } from '../votes/votes.repository';
import { UserEntity } from '../users/users.entity';

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

  async getPostById(id: number) {
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

    //TODO: 비회원과 회원의 API Call을 다르게 처리해서, 회원인 경우 좋아요/싫어요 여부를 확인해야한다.
    let user;
    console.log(user);
    if (user) {
      vote = await this.voteRepository
        .createQueryBuilder('v')
        .select(['v.voteType'])
        .where(`v.target_id = :targetId and v.target_type = 'posts' and v.user_id = :userId`, {
          targetId: id,
          userId: user.id,
        })
        .getOne();
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
