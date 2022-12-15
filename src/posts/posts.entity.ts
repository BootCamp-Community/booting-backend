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

  @Column('int', { name: 'board_id', nullable: false })
  boardId: number;

  @Column('varchar', { name: 'hashtags', length: 100, nullable: true })
  hashtags: string;

  @Column('varchar', { name: 'hashtags', length: 100, nullable: false })
  title: string;

  @Column('text', { name: 'content', nullable: true })
  content: string;

  @Column('int', { name: 'view_cnt', nullable: true, default: 0 })
  viewCnt: number;

  @Column('varchar', { name: 'author', length: 30, nullable: false })
  author: string;

  @Column('varchar', { name: 'author_type', length: 30, nullable: false })
  authorType: string;

  @Column('int', { name: 'deleted', nullable: true, default: 0 })
  deleted: number;

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

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @Column('int', { name: 'like', nullable: false, default: 0 })
  like: number;

  @Column('int', { name: 'dislike', nullable: false, default: 0 })
  dislike: number;

  @Column('int', { name: 'share_cnt', nullable: false, default: 0 })
  shareCnt: number;

  @Column('int', { name: 'selected', nullable: false, default: 0 })
  selected: number;
}
