import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('NOTIFICATIONS')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @Column('int', { name: 'is_read', nullable: false, default: 0 })
  isRead: number;

  @Column('varchar', { name: 'message', length: 255, nullable: false })
  message: string;

  @Column('int', { name: 'is_push', nullable: false })
  isPush: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date;
}
