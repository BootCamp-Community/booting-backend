import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { targetType } from './reports.interface';

@Entity('REPORT')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'target_type', length: 10, nullable: false })
  targetType: targetType;

  @Column('int', { name: 'target_id', nullable: false })
  targetId: number;

  @Column('int', { name: 'reporter_id', nullable: false })
  reporterId: number;

  @Column('varchar', { name: 'reason', length: 255, nullable: false })
  reason: string;

  @Column('boolean', { name: 'is_execute', nullable: false, default: false })
  isExecute: boolean;

  @Column('int', { name: 'executor_id', nullable: true, default: null })
  executorId: string;

  @Column('varchar', { name: 'execute_reason', length: 255, nullable: true, default: null })
  executeReason: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @Column({ nullable: true })
  @UpdateDateColumn({
    name: 'executed_at',
    type: 'timestamptz',
    nullable: true,
  })
  executedAt: Date;

  static from(item) {
    const report = new ReportEntity();

    report.targetId = item.targetId;
    report.targetType = item.targetType;
    report.reporterId = item.reporterId;
    report.reason = item.reason;

    return report;
  }
}
