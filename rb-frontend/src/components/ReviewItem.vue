<template>
  <div class="review-item">
    <h3>{{ review.title }}</h3>
    <p>Author: {{ review.author }}</p>
    <p>Genre: {{ review.genre }}</p>
    <p>Rating: {{ review.rating }}/5</p>
    <p>{{ review.reviewText }}</p>
    <div>
      <button @click="$emit('edit', review)">Edit</button>
      <button @click="$emit('delete', review.id)">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '@/types/Review';

defineProps<{ review: Review }>();
defineEmits(['edit', 'delete']);
</script>
