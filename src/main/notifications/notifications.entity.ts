import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('NOTIFICATION')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'receiver_id', nullable: false })
  receiverId: number;

  @Column('int', { name: 'sender_id', nullable: false })
  senderId: number;

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
    name: 'read_at',
    type: 'timestamptz',
    nullable: false,
  })
  readAt: Date;
}
