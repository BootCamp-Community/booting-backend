import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('REPORTS')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'post_id', nullable: false })
  postId: number;

  @Column('int', { name: 'reporter_id', nullable: false })
  reporterId: number;

  @Column('varchar', { name: 'reason', length: 255, nullable: false })
  reason: string;

  @Column('int', { name: 'is_execute', nullable: false, default: 0 })
  isExecute: number;

  @Column('varchar', { name: 'executor', length: 255, nullable: true })
  executor: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'executed_at',
    type: 'timestamptz',
    nullable: false,
  })
  executedAt: Date;
}
