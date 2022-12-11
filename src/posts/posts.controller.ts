import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  async getPost(@Param() id: object) {
    return this.postService.getPostById(id);
  }

  @Post()
  async createPost(@Body() dto: CreatePostDto): Promise<void> {
    this.postService.create(dto);
    return;
  }

  @Put(':id')
  async updatePost(@Param() param: any, @Body() dto: UpdatePostDto) {
    const { id } = param;
    return this.postService.update(id, dto);
  }
}
