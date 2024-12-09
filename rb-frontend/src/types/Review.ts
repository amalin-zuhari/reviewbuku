export interface Review {
  id?: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  reviewText: string;
  createdAt?: Date;
  updatedAt?: Date;
}
