<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Search Component -->
    <ReviewSearch @search="handleSearch" />

    <!-- Title -->
    <h2 class="text-3xl font-bold mb-6 text-center">Book Reviews</h2>

    <!-- Loading or No Reviews -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="filteredReviews.length === 0" class="text-center text-gray-500">
      No reviews found
    </div>

    <!-- Display Reviews -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReviewItem
        v-for="review in filteredReviews"
        :key="review.id"
        :review="review"
        @edit="startEditing"
        @delete="deleteReview"
      />
    </div>

    <!-- Button to Add New Review -->
    <button
      class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="navigateToAddReview"
    >
      Add New Review
    </button>

    <!-- Modal for Editing Review -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      @keydown.esc="closeEditModal"
    >
      <div
        class="bg-white p-6 rounded shadow-lg w-full max-w-lg"
        role="dialog"
        aria-labelledby="edit-modal-title"
        aria-modal="true"
      >
        <h3 id="edit-modal-title" class="text-xl font-bold mb-4">Edit Review</h3>
        <form @submit.prevent="saveChanges">
          <!-- Image URL -->
          <div class="mb-4">
            <label for="imageUrl" class="block font-medium mb-2">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              v-model="editingReview.imageUrl"
              class="w-full border rounded px-4 py-2"
            />
          </div>

          <!-- Title -->
          <div class="mb-4">
            <label for="title" class="block font-medium mb-2">Title</label>
            <input
              type="text"
              id="title"
              v-model="editingReview.title"
              class="w-full border rounded px-4 py-2"
            />
          </div>

          <!-- Author -->
          <div class="mb-4">
            <label for="author" class="block font-medium mb-2">Author</label>
            <input
              type="text"
              id="author"
              v-model="editingReview.author"
              class="w-full border rounded px-4 py-2"
            />
          </div>

          <!-- Genre -->
          <div class="mb-4">
            <label for="genre" class="block font-medium mb-2">Genre</label>
            <select
              id="genre"
              v-model="editingReview.genre"
              class="w-full border rounded px-4 py-2"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>

          <!-- Rating -->
          <div class="mb-4">
            <label for="rating" class="block font-medium mb-2">Rating</label>
            <select
              id="rating"
              v-model.number="editingReview.rating"
              class="w-full border rounded px-4 py-2"
            >
              <option value="">Select Rating</option>
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
            </select>
          </div>

          <!-- Review Content -->
          <div class="mb-4">
            <label for="content" class="block font-medium mb-2">Edit Review</label>
            <textarea
              id="content"
              v-model="editingReview.reviewText"
              class="w-full border rounded px-4 py-2"
              rows="4"
            ></textarea>
          </div>

          <!-- Modal Actions -->
          <div class="flex justify-end space-x-4">
            <button
              type="button"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
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
const isModalOpen = ref(false);
const editingReview = ref<Review | null>(null);
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
  reviews.value.filter((review) => {
    const lowerCaseQuery = query.value.toLowerCase();
    return (
      review.title.toLowerCase().includes(lowerCaseQuery) ||
      review.author.toLowerCase().includes(lowerCaseQuery)
    );
  })
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

const startEditing = (review: Review) => {
  editingReview.value = { ...review };
  isModalOpen.value = true;
};

const closeEditModal = () => {
  isModalOpen.value = false;
  editingReview.value = null;
};

const isEditingReviewValid = (review: typeof editingReview.value): review is Review => {
  return review !== null;
};

const saveChanges = async () => {
  if (isEditingReviewValid(editingReview.value)) {
    try {
      await ReviewService.updateReview(editingReview.value.id, editingReview.value);
      const index = reviews.value.findIndex((r) => r.id === editingReview.value.id);
      if (index !== -1) {
        reviews.value[index] = { ...editingReview.value };
      }
      console.log('Review updated successfully');
      closeEditModal();
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  }
};

const navigateToAddReview = () => {
  router.push('/add-review');
};
</script>
