import { ReportEntity } from '../reports.entity';
import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReportDto extends PickType(ReportEntity, ['reason']) {
  @IsString()
  readonly reason: string;
}
