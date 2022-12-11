import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getPosts() {
    // const posts = await this.postRepository.findAll();
  }

  async getPostById(id: object) {
    const posts = await this.postRepository.findOneBy(id);

    if (!posts) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log('posts', posts);
    return this.postRepository.findOneBy(id);
  }

  async create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const posts = await this.postRepository.findOneBy(id);

    if (!posts) {
      throw new HttpException(
        '게시글을 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log('id.id>>');

    return this.postRepository.save({
      id,
      ...updatePostDto,
      updatedAt: Date.now(),
    });
  }
}
