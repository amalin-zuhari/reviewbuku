<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6 text-center">Book Reviews</h2>
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="reviews.length === 0" class="text-center text-gray-500">
      No reviews found
    </div>
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReviewItem
        v-for="review in reviews"
        :key="review.id"
        :review="review"
        @edit="startEditing"
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

const startEditing = (review: Review) => {
  console.log('Editing review:', review);
};
</script>
