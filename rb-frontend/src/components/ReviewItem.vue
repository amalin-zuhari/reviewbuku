<template>
  <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
    <img :src="review.imageUrl" alt="Review Image" class="w-32 h-48 object-cover rounded-lg mx-auto mb-4" />
    <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ review.title }}</h3>
    <p class="text-gray-600 mb-1">Author: {{ review.author }}</p>
    <p class="text-gray-600 mb-1">Genre: {{ review.genre }}</p>
    <div class="flex items-center mb-2">
      <span class="text-yellow-500 mr-2">Rating:</span>
      <div class="flex">
        <svg v-for="n in 5" :key="n"
          class="w-5 h-5"
          :class="n <= review.rating ? 'text-yellow-500' : 'text-gray-300'"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
    </div>
    <p class="text-gray-700 mb-4 reviewText">{{ review.reviewText }}</p>
    <div class="flex justify-between">
      <button
        @click="$emit('edit', review)"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', review.id)"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '@/types/Review';

defineProps<{ review: Review }>();
defineEmits(['edit', 'delete']);

</script>

<style>
.reviewText {
    font-family: 'Georgia', serif; /* A classic font often used for quotes */
    font-size: 1.2em;
    font-style: italic;
    color: #4a4a4a; /* Darker gray for better contrast */
    border-left: 4px solid #4a90e2; /* Blue border for emphasis */
    padding-left: 20px; /* Adjusted for a balanced space */
    margin: 20px 0; /* Slightly larger vertical spacing */
    line-height: 1.6; /* Improved readability */
    background-color: #f4f4f4; /* Light background for distinction */
    border-radius: 8px; /* Rounded corners for a softer look */
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}



</style>

