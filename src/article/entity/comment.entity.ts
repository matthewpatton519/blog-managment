import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleId: number;

  @Column({default:0})
  parentCommentId: number;

  @Column({ type: 'longtext' })
  comment: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

}