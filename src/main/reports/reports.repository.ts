import { ReportEntity } from './reports.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from '../../configs/typeorm-ex.decorator';

@CustomRepository(ReportEntity)
export class ReportRepository extends Repository<ReportEntity> {}
