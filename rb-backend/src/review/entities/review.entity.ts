import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  author: string;

  @Column()
  @IsString()
  genre: string;

  @Column()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @Column('text')
  @IsString()
  reviewText: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}