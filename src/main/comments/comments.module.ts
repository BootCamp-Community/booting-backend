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
import { BlockUserRepository } from '../block-users/block-users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmExModule.forCustomRepository([CommentRepository, PostRepository, VoteRepository, BlockUserRepository]),
    AuthModule,
  ],
  providers: [ConfigService, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
