import {
  Column,
  Index,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { PostEntity } from '../posts/posts.entity';
import { CommentEntity } from '../comments/comments.entity';
import { VoteEntity } from '../votes/votes.entity';

@Entity('USER')
export class UserEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('varchar', {
    name: 'oauth_id',
    length: 255,
    nullable: false,
  })
  oAuthId: string;

  @Column('varchar', { name: 'provider', length: 50, nullable: false })
  provider: string;

  @Column('varchar', { name: 'refresh_token', length: 255, nullable: true })
  refreshToken: string;

  @Column('varchar', { name: 'name', length: 30, nullable: false })
  name: string;

  @Column('varchar', { name: 'email', length: 50, nullable: false })
  email: string;

  @Column('varchar', { name: 'nickname', length: 50, nullable: false })
  nickname: string;

  @Column('json', { name: 'roles', nullable: false, default: '["user"]' })
  roles: string[];

  @Column('varchar', {
    name: 'photo',
    length: 255,
    nullable: true,
    default: null,
  })
  photo: string;

  @Column('varchar', {
    name: 'phone',
    length: 255,
    nullable: true,
    default: null,
  })
  phone: string;

  @Column('varchar', { name: 'age', length: 10, nullable: true, default: null })
  age: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: false,
  })
  lastLoginAt: Date;

  @OneToMany(() => PostEntity, (post) => post.writer)
  @JoinColumn({ name: 'post_id' })
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.writer)
  @JoinColumn({ name: 'comment_id' })
  comments: CommentEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.voter)
  @JoinColumn({ name: 'vote_id' })
  votes: VoteEntity[];
}
