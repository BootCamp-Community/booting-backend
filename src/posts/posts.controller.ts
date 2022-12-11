import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get(':id')
  async getPost(@Param() id: object) {
    return this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<void> {
    this.postService.create(dto);
    return;
  }
}
