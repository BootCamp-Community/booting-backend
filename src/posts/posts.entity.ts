import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('POSTS')
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

  @DeleteDateColumn({
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @Column({ default: 0 })
  like: number;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  shareCnt: number;

  @Column({ default: 0 })
  selected: number;
}
