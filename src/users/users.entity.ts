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

  @Column('varchar', { name: 'nid', length: 30, nullable: true, default: null })
  nid: string;

  @Column('varchar', { name: 'kid', length: 30, nullable: true, default: null })
  kid: string;

  @Column('varchar', { name: 'aid', length: 30, nullable: true, default: null })
  aid: string;

  // google
  @Column('varchar', { name: 'gid', length: 30, nullable: true, default: null })
  gid: string;

  // github
  @Column('varchar', {
    name: 'ggid',
    length: 30,
    nullable: true,
    default: null,
  })
  ggid: string;

  @Column('varchar', { name: 'name', length: 30, nullable: false })
  name: string;

  @Column('varchar', { name: 'email', length: 50, nullable: false })
  email: string;

  @Column('varchar', { name: 'nickname', length: 50, nullable: false })
  nickname: string;

  @Column('varchar', {
    name: 'auth',
    length: 50,
    nullable: true,
    default: null,
  })
  auth: string;

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
