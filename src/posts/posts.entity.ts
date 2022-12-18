import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 1,
    description: '게시판 ID',
    required: true,
  })
  boardId: number;

  @Column('varchar', { name: 'hashtags', length: 100, nullable: true })
  @ApiProperty({
    example: '해쉬태그',
    description: '해쉬태그',
    required: false,
  })
  hashtags: string;

  @Column('varchar', { name: 'title', length: 100, nullable: false })
  @ApiProperty({
    example: '제목',
    description: '제목',
    required: true,
  })
  title: string;

  @Column('text', { name: 'content', nullable: true })
  @ApiProperty({
    example: '내용',
    description: '내용',
    required: false,
  })
  content: string;

  @Column('int', { name: 'view_cnt', nullable: true, default: 0 })
  viewCnt: number;

  @Column('varchar', { name: 'author', length: 30, nullable: false })
  @ApiProperty({
    example: 1,
    description: '유저 ID',
    required: true,
  })
  author: string;

  @Column('varchar', { name: 'author_type', length: 30, nullable: false })
  @ApiProperty({
    example: 'nickname',
    description: '글쓴이 타입(필명 or 실명)',
    required: true,
  })
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
