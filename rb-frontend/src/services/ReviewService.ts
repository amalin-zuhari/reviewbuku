import axios from 'axios';
import type { Review } from '@/types/Review';

const API_URL = 'http://localhost:3000/review';

export class ReviewService {
  static async getAllReviews(): Promise<Review[]> {
    const response = await axios.get(API_URL);
    return response.data;
  }

  static async createReview(review: Review): Promise<Review> {
    const response = await axios.post(API_URL, review);
    return response.data;
  }

  static async updateReview(id: number, review: Review): Promise<Review> {
    const response = await axios.put(`${API_URL}/${id}`, review);
    return response.data;
  }

  static async deleteReview(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  }
}
