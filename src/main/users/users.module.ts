import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users.entity';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { PostRepository } from '../posts/posts.repository';
import { VoteRepository } from '../votes/votes.repository';
import { CommentRepository } from '../comments/comments.repository';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmExModule.forCustomRepository([PostRepository, CommentRepository, VoteRepository, UserRepository]),
  ],
  providers: [ConfigService, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
