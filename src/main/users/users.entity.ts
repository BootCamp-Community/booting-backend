import {
  Column,
  Index,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('varchar', { name: 'provider', length: 30, nullable: false })
  provider: string;

  @Column('varchar', { name: 'refresh_token', length: 255, nullable: true })
  refreshToken: string;

  @Column('varchar', { name: 'name', length: 30, nullable: false })
  name: string;

  @Column('varchar', { name: 'email', length: 50, nullable: false })
  email: string;

  @Column('varchar', { name: 'nickname', length: 50, nullable: false })
  nickname: string;

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
}
