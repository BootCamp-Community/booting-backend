import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USERS')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nid: string;

  @Column({ nullable: true })
  kid: string;

  @Column({ nullable: true })
  aid: string;

  @Column({ nullable: true })
  gid: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ nullable: false })
  auth: string;

  @Column({ nullable: false })
  photo: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ nullable: false })
  age: string;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  joinedAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
  })
  lastLogin: Date;
}
