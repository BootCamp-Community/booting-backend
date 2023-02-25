import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostEntity } from './posts.entity';

@ApiTags('게시글')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {
  }

  @Get()
  @ApiOperation({ summary: '게시글 전체 조회' })
  @ApiQuery({ type: GetPostsDto })
  @ApiResponse({
    status: 200,
    description: '필터에 해당하는 게시글을 조회한다.',
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  })
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiQuery({ type: 'id' })
  @ApiResponse({
    status: 200,
    description: '아이디에 해당하는 게시글을 조회한다.',
  })
  @ApiResponse({
    status: 403,
    description: '상세 조회 실패',
  })
  async getPost(@Param() id: object) {
    return this.postService.getPostById(id);
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({ summary: '게시글 작성' })
  @ApiBody({ type: CreatePostDto })
  @ApiResponse({
    status: 201,
    type: CreatePostDto,
    schema: {
      example: {
        id: '1',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: '게시글 작성 실패',
  })
  async createPost(@Body() dto: CreatePostDto, @Ip() ip): Promise<PostEntity> {
    const created = await this.postService.create(dto, ip);
    return created;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({ summary: '게시글 수정' })
  @ApiQuery({ type: 'id' })
  @ApiBody({ type: UpdatePostDto })
  @ApiResponse({
    status: 201,
    description: '아이디에 해당하는 게시글을 수정한다.',
    type: UpdatePostDto,
  })
  @ApiResponse({
    status: 401,
    description: '게시글 작성 실패',
  })
  async updatePost(@Param() param: any, @Body() dto: UpdatePostDto, @Ip() ip) {
    const { id } = param;
    return this.postService.update(id, dto, ip);
  }
}
