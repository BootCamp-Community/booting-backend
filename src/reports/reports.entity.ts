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

  @Column({ nullable: false })
  postId: number;

  @Column({ nullable: false })
  reporterId: number;

  @Column({ nullable: false })
  reason: string;

  @Column({ nullable: false, default: 0 })
  isExecute: number;

  @Column({ nullable: true })
  executor: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date;
}
