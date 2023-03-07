import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../users/users.entity';
import { PostEntity } from '../posts/posts.entity';

@Entity('COMMENT')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'post_id', nullable: false })
  @ApiProperty({
    example: 162,
    description: '게시글 ID',
    required: true,
  })
  postId: number;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @Column('int', { name: 'parent_id', nullable: true, default: null })
  @ApiProperty({
    example: 1,
    description: '서브 댓글인 경우 부모 댓글의 ID',
    required: false,
  })
  parentId: number;

  @Column('boolean', { name: 'is_parent', nullable: false, default: false })
  isParent: boolean;

  @Column('text', { name: 'content', nullable: true })
  @ApiProperty({
    example: '내용',
    description: '내용',
    required: true,
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

  @Column('varchar', { name: 'create_ip', length: 255, nullable: false })
  createIp: string;

  @Column('boolean', { nullable: false, default: false })
  deleted: boolean;

  @ManyToOne(() => UserEntity, (writer) => writer.posts)
  @JoinColumn({ name: 'user_id' })
  writer: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;
}
