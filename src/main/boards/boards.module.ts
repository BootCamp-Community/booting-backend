import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
