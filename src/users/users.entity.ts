import {
  Column,
  Index,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USERS')
export class UserEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('varchar', {
    name: 'nid',
    length: 255,
    nullable: true,
    default: null,
  })
  nid: string;

  @Index()
  @Column('varchar', {
    name: 'kid',
    length: 255,
    nullable: true,
    default: null,
  })
  kid: string;

  @Index()
  @Column('varchar', {
    name: 'aid',
    length: 255,
    nullable: true,
    default: null,
  })
  aid: string;

  // google
  @Index()
  @Column('varchar', {
    name: 'gid',
    length: 255,
    nullable: true,
    default: null,
  })
  gid: string;

  // github
  @Index()
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
