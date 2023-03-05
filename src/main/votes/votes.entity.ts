import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../users/users.entity';
import { targetType, voteType } from './votes.interface';

@Entity('VOTE')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'target_type', length: 10, nullable: false })
  @ApiProperty({
    example: 'post',
    description: '좋아요, 싫어요, 궁금해요한 타입(post or comment)',
    required: true,
  })
  targetType: targetType;

  @Column('int', { name: 'target_id', nullable: false })
  targetId: number;

  @Column('varchar', { name: 'vote_type', length: 30, nullable: false })
  @ApiProperty({
    example: 'like',
    description: 'like, dislike, curiosity(궁금해요)',
    required: true,
  })
  voteType: voteType;

  @Column('int', { name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at', nullable: false, type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (voter) => voter.votes)
  @JoinColumn({ name: 'user_id' })
  voter: UserEntity;

  /**
   * TypeORM 라이브러리가 초기화되는 과정에서 데코레이터로 정의한 엔티티 클래스들을 new 키워드로 생성하는데, 이 때 아무 매개변수 없이 호출을 하기 떄문에
   * constructor을 정의할 때 매개변수를 줄 수 없다. 따라서 static 형태의 from 메서드를 정의하여 사용한다.
   * @param item
   */
  static from(item: { voteType: voteType; targetId: number; targetType: targetType; userId: number }) {
    const vote = new VoteEntity();

    vote.targetId = item.targetId;
    vote.targetType = item.targetType;
    vote.voteType = item.voteType;
    vote.userId = item.userId;

    return vote;
  }
}
