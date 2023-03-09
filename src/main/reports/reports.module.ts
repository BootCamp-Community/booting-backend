import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './reports.entity';
import { ReportRepository } from './reports.repository';
import { TypeOrmExModule } from '../../configs/typeorm-ex.module';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from '../posts/posts.repository';
import { CommentRepository } from '../comments/comments.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportEntity]),
    TypeOrmExModule.forCustomRepository([ReportRepository, PostRepository, CommentRepository]),
    AuthModule,
  ],
  providers: [ConfigService, ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
