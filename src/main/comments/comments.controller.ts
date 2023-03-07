import { Body, Controller, Delete, Get, Ip, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PublicAuthGuard } from '../auth/jwt/public.guard';

@ApiTags('댓글')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':postId')
  @UseGuards(PublicAuthGuard)
  @ApiOperation({ summary: '특정 글의 댓글 목록 조회' })
  getCommentsByPostId(@CurrentUser() user, @Param('postId') postId: number) {
    return this.commentsService.getCommentsByPostId(user, postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '특정 글에 댓글 작성' })
  @ApiBody({ type: CreateCommentDto })
  createComment(@CurrentUser() user, @Body() createCommentDto: CreateCommentDto, @Ip() ip) {
    return this.commentsService.createComment(user, ip, createCommentDto);
  }

  @Put(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '특정 댓글 수정' })
  @ApiBody({ type: UpdateCommentDto })
  updateCommentById(@CurrentUser() user, @Body() updateCommentDto: UpdateCommentDto, @Param('commentId') id: number) {
    return this.commentsService.updateCommentById(user, id, updateCommentDto);
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token') //JWT 토큰 키 설정
  @ApiOperation({ summary: '특정 댓글 삭제' })
  deleteCommentById(@CurrentUser() user, @Param('commentId') id: number) {
    return this.commentsService.deleteCommentById(user, id);
  }
}
