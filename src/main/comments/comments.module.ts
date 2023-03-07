import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { CommentEntity } from './comments.entity';
import { CommentRepository } from './comments.repository';
import { VoteRepository } from '../votes/votes.repository';
import { PostRepository } from '../posts/posts.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmExModule.forCustomRepository([CommentRepository, PostRepository, VoteRepository]),
    AuthModule,
  ],
  providers: [ConfigService, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
