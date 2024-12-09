<template>
  <div class="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
    <form @submit.prevent="submitReview" class="space-y-4">
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Book Title
        </label>
        <input
          v-model="reviewForm.title"
          id="title"
          type="text"
          placeholder="Book Title"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="author">
          Author
        </label>
        <input
          v-model="reviewForm.author"
          id="author"
          type="text"
          placeholder="Author"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="genre">
          Genre
        </label>
        <select
          v-model="reviewForm.genre"
          id="genre"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Genre</option>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Science Fiction</option>
          <option>Mystery</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="rating">
          Rating
        </label>
        <select
          v-model.number="reviewForm.rating"
          id="rating"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Rating</option>
          <option :value="1">1</option>
          <option :value="2">2</option>
          <option :value="3">3</option>
          <option :value="4">4</option>
          <option :value="5">5</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="reviewText">
          Review
        </label>
        <textarea
          v-model="reviewForm.reviewText"
          id="reviewText"
          placeholder="Write your review"
          required
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
        ></textarea>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {{ currentReviewId ? 'Update Review' : 'Submit Review' }}
        </button>

        <button
          v-if="currentReviewId"
          type="button"
          @click="cancelEdit"
          class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>

    <!-- Success Dialog -->
    <div
      v-if="showSuccessDialog"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
        <h2 class="text-lg font-bold mb-4">Success</h2>
        <p class="mb-4">The review was successfully {{ currentReviewId ? 'updated' : 'added' }}!</p>
        <button
          @click="navigateToMain"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ReviewService } from '@/services/ReviewService';
import type { Review } from '@/types/Review';
import { useRouter } from 'vue-router';

const emit = defineEmits(['review-added', 'review-updated']);

const router = useRouter();

const reviewForm = ref<Review>({
  title: '',
  author: '',
  genre: '',
  rating: 0,
  reviewText: ''
});

const currentReviewId = ref<number | null>(null);
const showSuccessDialog = ref(false);

const submitReview = async () => {
  try {
    if (currentReviewId.value) {
      const updatedReview = await ReviewService.updateReview(
        currentReviewId.value,
        reviewForm.value
      );
      emit('review-updated', updatedReview);
    } else {
      const newReview = await ReviewService.createReview(reviewForm.value);
      emit('review-added', newReview);
    }
    resetForm();
    showSuccessDialog.value = true; // Show dialog after successful submission
  } catch (error) {
    console.error('Failed to submit review:', error);
  }
};

const editReview = (review: Review) => {
  currentReviewId.value = review.id || null;
  reviewForm.value = { ...review };
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  reviewForm.value = {
    title: '',
    author: '',
    genre: '',
    rating: 0,
    reviewText: ''
  };
  currentReviewId.value = null;
};

const navigateToMain = () => {
  showSuccessDialog.value = false;
  router.push('/'); // Navigate to the main page
};

defineExpose({ editReview });
</script>
