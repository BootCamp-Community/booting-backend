import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('NOTIFICATION')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'receiver_id', nullable: false })
  receiverId: number;

  @Column('int', { name: 'sender_id', nullable: false })
  senderId: number;

  @Column('boolean', { name: 'is_read', nullable: false, default: false })
  isRead: boolean;

  @Column('varchar', { name: 'photo', length: 255, nullable: false })
  photo: string;

  @Column('varchar', { name: 'title', length: 255, nullable: false })
  title: string;

  @Column('varchar', { name: 'content', length: 255, nullable: false })
  content: string;

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

  static from({ receiverId, senderId, photo = 'normal', title, content, isPush }): NotificationEntity {
    const notification = new NotificationEntity();

    notification.receiverId = receiverId;
    notification.senderId = senderId;
    notification.photo = photo;
    notification.title = title;
    notification.content = content;
    notification.isRead = false;
    notification.isPush = isPush;

    return notification;
  }
}
