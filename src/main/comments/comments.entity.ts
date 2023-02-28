import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../users/users.entity';

@Entity('COMMENT')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'post_id', nullable: false })
  postId: number;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @Column('int', { name: 'parent_id', nullable: false })
  parentId: number;

  @Column('text', { name: 'content', nullable: true })
  @ApiProperty({
    example: '내용',
    description: '내용',
    required: false,
  })
  content: string;

  @Column('int', { name: 'like_count', nullable: false, default: 0 })
  likeCount: number;

  @Column('int', { name: 'dislike_count', nullable: false, default: 0 })
  dislikeCount: number;

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, type: 'timestamptz' })
  updatedAt: Date;

  @Column('int', { nullable: false, default: 0 })
  deleted: number;

  @ManyToOne(() => UserEntity, (writer) => writer.posts)
  @JoinColumn({ name: 'user_id' })
  writer: UserEntity;
}
