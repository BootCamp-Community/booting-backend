import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BOARDS')
export class BoardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'board_name', length: 20, nullable: false })
  boardName: string;

  @Column('varchar', { name: 'board_slug', length: 20, nullable: false })
  boardSlug: string;

  @Column('varchar', { name: 'board_slug', length: 20, nullable: false })
  boardType: string;

  @Column('varchar', { name: 'auth', length: 100, nullable: false })
  auth: string;

  @Column('varchar', { name: 'tags', length: 50, nullable: false })
  tags: string;

  @Column({ nullable: false, default: 1 })
  isEnabled: number;
}
