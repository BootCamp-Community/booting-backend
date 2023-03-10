import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BlockUsersService } from './block-users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/user.decorator';

@ApiTags('사용자 차단')
@Controller('block-users')
export class BlockUsersController {
  constructor(private blockUsersService: BlockUsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '차단한 사용자 조회' })
  async getBlockUsers(@CurrentUser() user) {
    return this.blockUsersService.getBlockUsers(user);
  }

  @Post('/:blockUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '사용자 차단' })
  @ApiParam({
    name: 'blockUserId',
  })
  async blockUser(@CurrentUser() user, @Param('blockUserId') blockUserId: number) {
    return this.blockUsersService.blockUser(user, blockUserId);
  }

  @Delete('/:blockUserId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '사용자 차단 해제' })
  @ApiParam({
    name: 'blockUserId',
  })
  async unblockUser(@CurrentUser() user, @Param('blockUserId') blockUserId: number) {
    return this.blockUsersService.unblockUser(user, blockUserId);
  }
}
