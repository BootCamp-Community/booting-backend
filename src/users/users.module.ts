import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
