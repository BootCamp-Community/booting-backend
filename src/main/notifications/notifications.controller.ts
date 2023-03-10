import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/user.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '알림 목록 조회' })
  getAllNotifications(@CurrentUser() user) {
    return this.notificationService.getAllNotifications(user);
  }
}
