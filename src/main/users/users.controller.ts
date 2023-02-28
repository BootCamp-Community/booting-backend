import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
