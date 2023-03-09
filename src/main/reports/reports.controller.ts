import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { targetType, validateTargetType } from './reports.interface';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateReportDto } from './dto/create-report.dto';

@ApiTags('신고하기')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('/:targetType/:targetId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '신고하기' })
  @ApiParam({ name: 'targetType', enum: ['post', 'comment'] })
  async createReport(
    @CurrentUser() user,
    @Param('targetType') targetType: targetType,
    @Param('targetId') targetId: number,
    @Body() createReportDto: CreateReportDto,
  ) {
    validateTargetType(targetType);
    return this.reportsService.createReport(user, targetType, targetId, createReportDto);
  }

  @Get('/type/:targetType')
  @ApiOperation({ summary: '신고 사유 목록 조회' })
  async getReportTypes(@Param('targetType') targetType: targetType) {
    return this.reportsService.getReportTypes(targetType);
  }
}
