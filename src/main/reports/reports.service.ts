import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { ReportRepository } from './reports.repository';
import { reportTypes, targetType } from './reports.interface';
import { PostRepository } from '../posts/posts.repository';
import { CommentRepository } from '../comments/comments.repository';
import { ReportEntity } from './reports.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    private reportRepository: ReportRepository,
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
  ) {}

  async createReport(user, targetType: targetType, targetId: number, createReportDto: CreateReportDto) {
    let targetRepository;
    switch (targetType) {
      case 'post':
        targetRepository = this.postRepository;
        break;
      case 'comment':
        targetRepository = this.commentRepository;
        break;
      default:
        throw new BadRequestException('잘못된 요청입니다.');
    }

    const target = await targetRepository.findOne({ where: { id: targetId } });
    if (!target) {
      throw new NotFoundException('대상을 찾을 수 없습니다.');
    }

    const report = ReportEntity.from({ reason: createReportDto.reason, targetId, targetType, reporterId: user.id });
    await this.reportRepository.save(report);
  }

  getReportTypes(targetType: targetType) {
    return {
      reportTypes: reportTypes[targetType],
    };
  }
}
