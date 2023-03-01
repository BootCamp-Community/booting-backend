import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('my-profile')
  @ApiOperation({ summary: '마이 프로필 조회' })
  @ApiResponse({
    status: 200,
    description: '마이 프로필을 조회한다.',
  })
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@CurrentUser() user) {
    return this.usersService.getMyProfile(user);
  }

  @Get('profile/:userId')
  @ApiOperation({ summary: '회원 프로필 조회' })
  @ApiResponse({
    status: 200,
    description: '회원 프로필을 조회한다.',
  })
  async getUserProfile(@Param() param) {
    const { userId }: { userId: number } = param;
    return this.usersService.getUserProfileById(userId);
  }

  @Get(':userId/posts')
  @ApiOperation({ summary: '회원 작성 글 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 작성한 글 목록을 조회한다.',
  })
  async getPostsByUser(@Param() param) {
    const { userId }: { userId: number } = param;
    return this.usersService.getPostsByUser(userId);
  }

  @Get(':userId/comments')
  @ApiOperation({ summary: '회원 작성 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 작성한 댓글을 조회한다.',
  })
  async getCommentsByUser(@Param() param) {
    const { userId }: { userId: number } = param;
    return this.usersService.getCommentsByUser(userId);
  }

  @Get(':userId/liked-posts')
  @ApiOperation({ summary: '회원이 좋아요 한 글 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 좋아요한 글 목록을 조회한다.',
  })
  async getLikedPostsByUser(@Param() param) {
    const { userId }: { userId: number } = param;
    return this.usersService.getLikedPostsByUser(userId);
  }

  @Get(':userId/liked-comments')
  @ApiOperation({ summary: '회원이 좋아요 한 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 좋아요한 댓글을 조회한다.',
  })
  async getLikedCommentsByUser(@Param() param) {
    const { userId }: { userId: number } = param;
    return this.usersService.getLikedCommentsByUser(userId);
  }
}
