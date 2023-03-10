import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BlockUsersService } from './block-users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/user.decorator';

@Controller('block-users')
export class BlockUsersController {
  constructor(private blockUsersService: BlockUsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async getBlockUsers(@CurrentUser() user) {
    return this.blockUsersService.getBlockUsers(user);
  }

  @Post('/:blockUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async blockUser(@CurrentUser() user, @Param('blockUserId') blockUserId: number) {
    return this.blockUsersService.blockUser(user, blockUserId);
  }

  @Delete('/:blockUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  async unblockUser(@CurrentUser() user, @Param('blockUserId') blockUserId: number) {
    return this.blockUsersService.unblockUser(user, blockUserId);
  }
}
