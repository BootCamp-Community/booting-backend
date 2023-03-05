import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { VoteEntity } from '../votes/votes.entity';
import { CommentEntity } from '../comments/comments.entity';

@Entity('POST')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id', nullable: false })
  @ApiProperty({
    example: 1,
    description: '유저 ID',
    required: true,
  })
  userId: string;

  @Column('varchar', { name: 'user_type', length: 30, nullable: false })
  @ApiProperty({
    example: 'nickname',
    description: '글쓴이 타입(필명 or 실명)',
    required: true,
  })
  userType: string;

  @Column('int', { name: 'board_id', nullable: false })
  @ApiProperty({
    example: 1,
    description: '게시판 ID',
    required: true,
  })
  boardId: number;

  @Column({ type: 'json', name: 'hashtags', nullable: true })
  @ApiProperty({
    example: '해쉬태그',
    description: '해쉬태그',
    required: false,
  })
  hashtags: string[];

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

  @Column('int', { name: 'view_count', nullable: true, default: 0 })
  viewCount: number;

  @Column('varchar', { name: 'create_ip', length: 255, nullable: false })
  createIp: string;

  @ApiProperty({
    example: '1',
    description: '삭제 여부',
    required: true,
  })
  @Column('int', { name: 'deleted', nullable: true, default: 0 })
  deleted: number;

  @ApiProperty({
    example: '2022-12-27 12:55:32.679158 +00:00',
    description: '삭제 시각',
    required: true,
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;

  @ApiProperty({
    example: '2022-12-27 12:55:32.679158 +00:00',
    description: '생성 시각',
    required: true,
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @ApiProperty({
    example: '2022-12-27 12:55:32.679158 +00:00',
    description: '수정 시각',
    required: true,
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: false,
  })
  updatedAt: Date;

  @ApiProperty({
    example: '0',
    description: '공유 수',
    required: true,
  })
  @Column('int', { name: 'share_count', nullable: false, default: 0 })
  shareCount: number;

  @ApiProperty({
    example: '0',
    description: '좋아요 수',
    required: true,
  })
  @Column('int', { name: 'like_count', nullable: false, default: 0 })
  likeCount: number;

  @ApiProperty({
    example: '0',
    description: '싫어요 수',
    required: true,
  })
  @Column('int', { name: 'dislike_count', nullable: false, default: 0 })
  dislikeCount: number;

  @ApiProperty({
    example: '0',
    description: '채택된 답변인지 여부',
    required: true,
  })
  @Column('int', { name: 'selected_answer', nullable: false, default: 0 })
  selectedAnswer: number;

  @ApiProperty({
    example: '0',
    description: '답글인지 여부',
    required: true,
  })
  @Column('int', { name: 'is_answer', nullable: false, default: 0 })
  isAnswer: number;

  @ApiProperty({
    example: '0',
    description: '답변 글인경우 부모글(질문글) ID',
    required: true,
  })
  @Column('int', { name: 'parent_post_id', nullable: true, default: null })
  parentPostId: number;

  @ManyToOne(() => UserEntity, (writer) => writer.posts)
  @JoinColumn({ name: 'user_id' })
  writer: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];
}
