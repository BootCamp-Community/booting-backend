import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('COMMENTS')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'post_id', nullable: false })
  postId: number;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @Column('int', { name: 'parent_id', nullable: false })
  parentId: number;

  @Column('int', { name: 'level', nullable: false })
  level: number;

  @Column('varchar', { name: 'content', nullable: true })
  content: string;

  @CreateDateColumn({ nullable: false, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamptz' })
  updatedAt: Date;

  @Column('int', { nullable: false, default: 0 })
  deleted: number;
}
