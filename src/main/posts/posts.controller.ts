import { Body, Controller, Delete, Get, Ip, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostsDto } from './dto/get-posts.dto';
import { PostEntity } from './posts.entity';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UserEntity } from '../users/users.entity';
import { PublicAuthGuard } from '../auth/jwt/public.guard';

@ApiTags('게시글')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '게시글 전체 조회' })
  @ApiResponse({
    status: 200,
    description: '필터에 해당하는 게시글을 조회한다.',
  })
  @ApiResponse({
    status: 401,
    description: '로그인 실패',
  })
  async getPosts(@Query() getPostsDto: GetPostsDto) {
    return this.postService.getPosts(getPostsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '아이디에 해당하는 게시글을 조회한다.',
  })
  @ApiResponse({
    status: 403,
    description: '상세 조회 실패',
  })
  @UseGuards(PublicAuthGuard)
  async getPost(@CurrentUser() user, @Param('id') id: number) {
    return this.postService.getPostById(user, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
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
  async createPost(@CurrentUser() user, @Body() dto: CreatePostDto, @Ip() ip): Promise<PostEntity> {
    const created = await this.postService.create(user, dto, ip);
    return created;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({
    name: 'id',
  })
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
  async updatePost(@CurrentUser() user: UserEntity, @Param() param, @Body() dto: UpdatePostDto, @Ip() ip) {
    const { id }: { id: number } = param;
    return this.postService.update(user, id, dto, ip);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({
    name: 'id',
  })
  @ApiResponse({
    status: 201,
    description: '아이디에 해당하는 게시글을 삭제한다.',
  })
  async deletePost(@CurrentUser() user, @Param() param: any) {
    const { id } = param;
    return this.postService.delete(user, id);
  }
}
