<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-3xl font-bold mb-6 text-center">Book Reviews</h2>
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="reviews.length === 0" class="text-center text-gray-500">
      No reviews found
    </div>
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReviewItem v-for="review in reviews" :key="review.id" :review="review" @edit="startEditing"
        @delete="deleteReview" />
    </div>

    <!-- Modal for Editing -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 class="text-xl font-bold mb-4">Edit Review</h3>
        <form>
          <div class="mb-4">
            <label for="title" class="block font-medium mb-2">Title</label>
            <input type="text" id="title" v-model="editingReview.title" class="w-full border rounded px-4 py-2" />
          </div>
          <div class="mb-4">
            <label for="title" class="block font-medium mb-2">Author</label>
            <input type="text" id="author" v-model="editingReview.author" class="w-full border rounded px-4 py-2" />
          </div>
          <div class="mb-4">
            <label for="title" class="block font-medium mb-2">Genre</label>
            <select v-model="editingReview.genre" id="genre" class="w-full border rounded px-4 py-2">
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
              Rating
            </label>
            <select v-model.number="editingReview.rating" id="rating" required
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select Rating</option>
              <option :value="1">1</option>
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
            </select>
          </div>


          <div class="mb-4">
            <label for="content" class="block font-medium mb-2">Edit Review</label>
            <textarea id="content" v-model="editingReview.reviewText" class="w-full border rounded px-4 py-2"
              rows="4"></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button"
              class="btn btn-secondary mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="closeEditModal">
              Cancel
            </button>
            <button type="button"
              class="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="saveChanges">
              Save Changes
            </button>
          </div>
        </form>
      </div>
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
const isModalOpen = ref(false);
const editingReview = ref<Review | null>(null);

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
    console.log('Review deleted successfully');
  } catch (error) {
    console.error('Failed to delete review:', error);
  }
};

const startEditing = (review: Review) => {
  editingReview.value = { ...review }; // Copy review for editing
  isModalOpen.value = true; // Open the modal
};

const closeEditModal = () => {
  isModalOpen.value = false; // Close the modal
  editingReview.value = null; // Reset the editing review
};

const saveChanges = async () => {
  if (editingReview.value) {
    try {
      await ReviewService.updateReview(editingReview.value.id, editingReview.value);
      // Update the review in the reviews list
      const index = reviews.value.findIndex(r => r.id === editingReview.value!.id);
      if (index !== -1) {
        reviews.value[index] = { ...editingReview.value };
      }
      console.log('Review updated successfully');
      closeEditModal(); // Close the modal
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  }
};
</script>
