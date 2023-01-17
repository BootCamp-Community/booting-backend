import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
