import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  providers: [ConfigService, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
