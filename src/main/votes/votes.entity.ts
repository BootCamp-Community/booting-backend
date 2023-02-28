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

@Entity('VOTE')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'target_id', nullable: false })
  targetId: number;

  @Column('varchar', { name: 'target_type', length: 30, nullable: false })
  @ApiProperty({
    example: 'post',
    description: '좋아요, 싫어요, 궁금해요한 타입(post or comment)',
    required: true,
  })
  targetType: string;

  @Column('varchar', { name: 'vote_type', length: 30, nullable: false })
  @ApiProperty({
    example: 'like',
    description: 'like, dislike, curiosity(궁금해요)',
    required: true,
  })
  voteType: string;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (voter) => voter.votes)
  @JoinColumn({ name: 'user_id' })
  voter: UserEntity;
}
