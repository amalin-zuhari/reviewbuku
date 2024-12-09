import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  genre: string;

  @IsNumber()
  rating: number;

  @IsString()
  reviewText: string;
}