import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { GetPostsDto } from './dto/get-posts.dto';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository) {}

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
    return posts;
  }

  async getPostById(id: object) {
    const posts = await this.postRepository.findOneBy(id);

    if (!posts) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return posts;
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
