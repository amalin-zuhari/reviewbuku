<template>
  <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
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
    <p class="text-gray-700 mb-4">{{ review.reviewText }}</p>
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
