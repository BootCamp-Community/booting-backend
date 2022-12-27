import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BOARDS')
export class BoardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'board_name', length: 20, nullable: false })
  boardName: string;

  @Column('varchar', {
    name: 'board_slug',
    length: 20,
    nullable: false,
    unique: true,
  })
  boardSlug: string;

  @Column('varchar', { name: 'board_type', length: 20, nullable: false })
  boardType: string;

  @Column('varchar', { name: 'auth', length: 255, nullable: false })
  auth: string;

  @Column('varchar', { name: 'tags', length: 255, nullable: false })
  tags: string;

  @Column('int', { nullable: false, default: 1 })
  isEnabled: number;
}
