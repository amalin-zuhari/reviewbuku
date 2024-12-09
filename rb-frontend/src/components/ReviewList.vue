<template>
  <div class="container mx-auto px-4 py-8">
    <ReviewSearch @search="handleSearch" />
    <h2 class="text-3xl font-bold mb-6 text-center">Book Reviews</h2>
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="filteredReviews.length === 0" class="text-center text-gray-500">
      No reviews found
    </div>
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReviewItem
        v-for="review in filteredReviews"
        :key="review.id"
        :review="review"
        @edit="startEditing"
        @delete="deleteReview"
      />
    </div>
    <button
      class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="navigateToAddReview"
    >
      Add New Review
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ReviewItem from './ReviewItem.vue';
import ReviewSearch from './ReviewSearch.vue';
import { ReviewService } from '@/services/ReviewService';
import type { Review } from '@/types/Review';

const reviews = ref<Review[]>([]);
const query = ref('');
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  try {
    reviews.value = await ReviewService.getAllReviews();
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  } finally {
    loading.value = false;
  }
});

const filteredReviews = computed(() =>
  reviews.value.filter((review) =>
    review.title.toLowerCase().includes(query.value.toLowerCase())
  )
);

const handleSearch = (searchQuery: string) => {
  query.value = searchQuery;
};

const deleteReview = async (id: number) => {
  try {
    await ReviewService.deleteReview(id);
    reviews.value = reviews.value.filter((review) => review.id !== id);
  } catch (error) {
    console.error('Failed to delete review:', error);
  }
};

const navigateToAddReview = () => {
  router.push('/add-review');
};
</script>
