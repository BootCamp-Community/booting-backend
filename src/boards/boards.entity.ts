import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BOARDS')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  boardName: string;

  @Column({ nullable: false })
  boardSlug: string;

  @Column({ nullable: false })
  boardType: string;

  @Column({ nullable: false })
  auth: string;

  @Column({ nullable: false })
  tags: string;

  @Column({ nullable: false, default: 1 })
  isEnabled: number;
}
