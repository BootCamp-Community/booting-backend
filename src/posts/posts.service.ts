import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { PostEntity } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async getPostById(id: object) {
    return this.postRepository.findOneBy(id);
  }

  async create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }
}
