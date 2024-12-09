<template>
  <form @submit.prevent="submitReview">
    <input v-model="reviewForm.title" placeholder="Book Title" required />
    <input v-model="reviewForm.author" placeholder="Author" required />
    <select v-model="reviewForm.genre" required>
      <option value="">Select Genre</option>
      <option>Fiction</option>
      <option>Non-Fiction</option>
      <option>Science Fiction</option>
      <option>Mystery</option>
    </select>
    <select v-model.number="reviewForm.rating" required>
      <option value="">Rating</option>
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
      <option :value="4">4</option>
      <option :value="5">5</option>
    </select>
    <textarea v-model="reviewForm.reviewText" placeholder="Write your review" required></textarea>
    <button type="submit">{{ isEditing ? 'Update Review' : 'Submit Review' }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ReviewService } from '@/services/ReviewService';
import type { Review } from '@/types/Review';

const emit = defineEmits(['review-added', 'review-updated']);

const reviewForm = ref<Review>({
  title: '',
  author: '',
  genre: '',
  rating: 0,
  reviewText: ''
});

const isEditing = ref(false);

const submitReview = async () => {
  try {
    if (isEditing.value && reviewForm.value.id) {
      const updatedReview = await ReviewService.updateReview(reviewForm.value.id, reviewForm.value);
      emit('review-updated', updatedReview);
    } else {
      const newReview = await ReviewService.createReview(reviewForm.value);
      emit('review-added', newReview);
    }
    resetForm();
  } catch (error) {
    console.error('Failed to submit review:', error);
  }
};

const resetForm = () => {
  reviewForm.value = {
    title: '',
    author: '',
    genre: '',
    rating: 0,
    reviewText: ''
  };
  isEditing.value = false;
};
</script>
