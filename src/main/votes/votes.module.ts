import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { VotesService } from './votes.service';
import { VoteEntity } from './votes.entity';
import { VoteRepository } from './votes.repository';
import { VotesController } from './votes.controller';
import { PostRepository } from '../posts/posts.repository';
import { CommentRepository } from '../comments/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteEntity]),
    TypeOrmExModule.forCustomRepository([VoteRepository, PostRepository, CommentRepository]),
    AuthModule,
  ],
  providers: [ConfigService, VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
