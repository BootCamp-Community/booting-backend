import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '게시글 전체 조회' })
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getPost(@Param() id: object) {
    console.log('id>>>', id);
    return this.postService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPost(@Body() dto: CreatePostDto): Promise<void> {
    console.log('>>>', CreatePostDto);
    this.postService.create(dto);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  async updatePost(@Param() param: any, @Body() dto: UpdatePostDto) {
    const { id } = param;
    return this.postService.update(id, dto);
  }
}
