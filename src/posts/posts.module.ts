import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [ConfigService, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
