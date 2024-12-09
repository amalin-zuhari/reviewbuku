<template>
  <div class="container mx-auto px-4 py-8">
    <ReviewSearch @search="handleSearch" />
    <h2 class="text-3xl font-bold mb-6 text-center">Book Reviews</h2>

    <!-- Loading or No Reviews -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="filteredReviews.length === 0" class="text-center text-gray-500">
      No reviews found
    </div>

    <!-- Display Reviews -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReviewItem v-for="review in filteredReviews" :key="review.id" :review="review" @edit="startEditing"
        @delete="deleteReview" />
    </div>

    <!-- Button to Add New Review -->
    <button class="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="navigateToAddReview">
      Add New Review
    </button>

    <!-- Modal for Editing Review -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 class="text-xl font-bold mb-4">Edit Review</h3>
        <form>
          <div class="mb-4">
            <label for="imageUrl" class="block font-medium mb-2">Image URL</label>
            <input type="text" id="imageUrl" v-model="editingReview.imageUrl" class="w-full border rounded px-4 py-2" />
          </div>
          <div class="mb-4">
            <label for="title" class="block font-medium mb-2">Title</label>
            <input type="text" id="title" v-model="editingReview.title" class="w-full border rounded px-4 py-2" />
          </div>
          <div class="mb-4">
            <label for="author" class="block font-medium mb-2">Author</label>
            <input type="text" id="author" v-model="editingReview.author" class="w-full border rounded px-4 py-2" />
          </div>
          <div class="mb-4">
            <label for="genre" class="block font-medium mb-2">Genre</label>
            <select v-model="editingReview.genre" id="genre" class="w-full border rounded px-4 py-2">
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">Rating</label>
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

// Computed property for filtered reviews based on search query
const filteredReviews = computed(() =>
  reviews.value.filter((review) =>
    review.title.toLowerCase().includes(query.value.toLowerCase())
  )
);

// Handle search functionality
const handleSearch = (searchQuery: string) => {
  query.value = searchQuery;
};

// Delete review functionality
const deleteReview = async (id: number) => {
  try {
    await ReviewService.deleteReview(id);
    reviews.value = reviews.value.filter((review) => review.id !== id);
  } catch (error) {
    console.error('Failed to delete review:', error);
  }
};

// Open the edit modal and load the review for editing
const startEditing = (review: Review) => {
  editingReview.value = { ...review }; // Copy review for editing
  isModalOpen.value = true; // Open the modal
};

// Close the edit modal
const closeEditModal = () => {
  isModalOpen.value = false;
  editingReview.value = null; // Reset the editing review
};

// Save the changes after editing the review
const saveChanges = async () => {
  if (editingReview.value) {
    try {
      await ReviewService.updateReview(editingReview.value.id, editingReview.value);
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

// Navigate to the page for adding a new review
const navigateToAddReview = () => {
  router.push('/add-review');
};
</script>
