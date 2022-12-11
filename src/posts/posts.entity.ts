import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  boardId: number;

  @Column({ nullable: true })
  hashtags: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  content: string;

  @Column({ default: 0 })
  viewCnt: number;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  authorType: string;

  @Column({ default: 0 })
  deleted: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: number;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: number;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  shareCnt: number;

  @Column({ default: 0 })
  selected: number;
}
