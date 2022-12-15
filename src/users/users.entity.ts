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

  @Column('varchar', { name: 'nid', length: 30, nullable: true })
  nid: string;

  @Column('varchar', { name: 'kid', length: 30, nullable: true })
  kid: string;

  @Column('varchar', { name: 'aid', length: 30, nullable: true })
  aid: string;

  @Column('varchar', { name: 'gid', length: 30, nullable: true })
  gid: string;

  @Column('varchar', { name: 'name', length: 30, nullable: false })
  name: string;

  @Column('varchar', { name: 'email', length: 50, nullable: false })
  email: string;

  @Column('varchar', { name: 'nickname', length: 50, nullable: false })
  nickname: string;

  @Column('varchar', { name: 'auth', length: 50, nullable: false })
  auth: string;

  @Column('varchar', { name: 'photo', length: 255, nullable: true })
  photo: string;

  @Column('varchar', { name: 'phone', length: 255, nullable: false })
  phone: string;

  @Column('varchar', { name: 'age', length: 10, nullable: true })
  age: string;

  @CreateDateColumn({
    name: 'joined_at',
    type: 'timestamptz',
    nullable: false,
  })
  joinedAt: Date;

  @UpdateDateColumn({
    name: 'last_login',
    type: 'timestamptz',
    nullable: false,
  })
  lastLogin: Date;
}
