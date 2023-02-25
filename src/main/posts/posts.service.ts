import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private postRepository: PostRepository) {
  }

  async getPosts() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async getPostById(id: object) {
    const posts = await this.postRepository.findOneBy(id);

    if (!posts) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return posts;
  }

  async create(createPostDto: CreatePostDto, ip: string): Promise<PostEntity> {
    createPostDto.createIp = ip;

    const result = await this.postRepository.save(createPostDto);

    return result;
  }

  async update(id: number, updatePostDto: UpdatePostDto, ip: string) {
    updatePostDto.createIp = ip;

    const posts = await this.postRepository.findOneBy({ id });

    if (!posts) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return this.postRepository.update(id, {
      ...updatePostDto,
    });
  }
}
