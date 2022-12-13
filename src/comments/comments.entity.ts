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

  @Column({ nullable: false })
  postId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  parentId: number;

  @Column({ nullable: false })
  level: number;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({ nullable: false, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamptz' })
  updatedAt: Date;

  @Column({ nullable: false, default: 0 })
  deleted: number;
}
