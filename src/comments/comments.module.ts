import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ConfigService, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
