import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('my-profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '마이 프로필 조회' })
  @ApiResponse({
    status: 200,
    description: '마이 프로필을 조회한다.',
  })
  async getMyProfile(@CurrentUser() user) {
    return this.usersService.getMyProfile(user);
  }

  @Get('profile/:userId')
  @ApiOperation({ summary: '회원 프로필 조회' })
  @ApiResponse({
    status: 200,
    description: '회원 프로필을 조회한다.',
  })
  @ApiParam({ name: 'userId' })
  async getUserProfile(@Param('userId') userId: number) {
    return this.usersService.getUserProfileById(userId);
  }

  @Get(':userId/posts')
  @ApiOperation({ summary: '회원 작성 글 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 작성한 글 목록을 조회한다.',
  })
  @ApiParam({ name: 'userId' })
  async getPostsByUser(@Param('userId') userId: number) {
    return this.usersService.getPostsByUser(userId);
  }

  @Get(':userId/comments')
  @ApiOperation({ summary: '회원 작성 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 작성한 댓글을 조회한다.',
  })
  @ApiParam({ name: 'userId' })
  async getCommentsByUser(@Param('userId') userId: number) {
    return this.usersService.getCommentsByUser(userId);
  }

  @Get(':userId/liked-posts')
  @ApiOperation({ summary: '회원이 좋아요 한 글 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 좋아요한 글 목록을 조회한다.',
  })
  @ApiParam({ name: 'userId' })
  async getLikedPostsByUser(@Param('userId') userId: number) {
    return this.usersService.getLikedPostsByUser(userId);
  }

  @Get(':userId/liked-comments')
  @ApiOperation({ summary: '회원이 좋아요 한 댓글 조회' })
  @ApiResponse({
    status: 200,
    description: '회원이 좋아요한 댓글을 조회한다.',
  })
  @ApiParam({ name: 'userId' })
  async getLikedCommentsByUser(@Param('userId') userId: number) {
    return this.usersService.getLikedCommentsByUser(userId);
  }
}
