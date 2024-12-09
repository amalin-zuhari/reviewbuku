<template>
  <div class="review-list">
    <h2>Book Reviews</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="reviews.length === 0">No reviews found</div>
    <div v-else>
      <ReviewItem
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        @edit="editReview"
        @delete="deleteReview"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ReviewService } from '@/services/ReviewService';
import type { Review } from '@/types/Review';
import ReviewItem from './ReviewItem.vue';

const reviews = ref<Review[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    reviews.value = await ReviewService.getAllReviews();
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  } finally {
    loading.value = false;
  }
});

const deleteReview = async (id: number) => {
  try {
    await ReviewService.deleteReview(id);
    reviews.value = reviews.value.filter(r => r.id !== id);
  } catch (error) {
    console.error('Failed to delete review:', error);
  }
};

const editReview = (review: Review) => {
  // Implement edit logic or emit to parent component
};
</script>
