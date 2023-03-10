import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from './notifications.repository';
import { NotificationEntity } from './notifications.entity';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    TypeOrmExModule.forCustomRepository([NotificationRepository]),
    AuthModule,
  ],
  providers: [ConfigService, NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
