import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { CommentEntity } from './comments.entity';
import { CommentRepository } from './comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmExModule.forCustomRepository([CommentRepository]),
    AuthModule,
  ],
  providers: [ConfigService, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
