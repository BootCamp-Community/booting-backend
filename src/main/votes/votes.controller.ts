import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { VotesService } from './votes.service';
import { targetType, validateTargetType } from './votes.interface';

@Controller('votes')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Post('/:targetType/:targetId/like')
  @UseGuards(JwtAuthGuard)
  async createLike(
    @CurrentUser() user,
    @Param('targetType') targetType: targetType,
    @Param('targetId') targetId: number,
  ) {
    validateTargetType(targetType);
    return this.votesService.createLike(user, targetType, targetId);
  }

  @Delete('/:targetType/:targetId/like')
  @UseGuards(JwtAuthGuard)
  async deleteLike(
    @CurrentUser() user,
    @Param('targetType') targetType: targetType,
    @Param('targetId') targetId: number,
  ) {
    validateTargetType(targetType);
    return this.votesService.deleteLike(user, targetType, targetId);
  }

  @Post('/:targetType/:targetId/dislike')
  @UseGuards(JwtAuthGuard)
  async createDislike(
    @CurrentUser() user,
    @Param('targetType') targetType: targetType,
    @Param('targetId') targetId: number,
  ) {
    validateTargetType(targetType);
    return this.votesService.createDislike(user, targetType, targetId);
  }

  @Delete('/:targetType/:targetId/dislike')
  @UseGuards(JwtAuthGuard)
  async deleteDislike(
    @CurrentUser() user,
    @Param('targetType') targetType: targetType,
    @Param('targetId') targetId: number,
  ) {
    validateTargetType(targetType);
    return this.votesService.deleteDislike(user, targetType, targetId);
  }
}
