import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from './posts.entity';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { PostRepository } from './posts.repository';
import { AuthModule } from '../auth/auth.module';
import { VoteRepository } from '../votes/votes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmExModule.forCustomRepository([PostRepository, VoteRepository]),
    AuthModule,
  ],
  providers: [ConfigService, PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
