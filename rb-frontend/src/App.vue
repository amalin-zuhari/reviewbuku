<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto px-4">
      <header class="text-center mb-10">
        <h1 class="text-4xl font-extrabold text-gray-900">Review Buku</h1>
        <p class="text-gray-600 mt-2">Kongsikan pengalaman anda dengan buku kegemaran anda</p>
      </header>

      <main>
        <div class="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          <ReviewForm ref="reviewFormRef" />
          <ReviewList @edit-review="handleEditReview" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewForm from '@/components/ReviewForm.vue';
import ReviewList from '@/components/ReviewList.vue';
import { ref } from 'vue';
import type { Review } from '@/types/Review';

const reviewFormRef = ref(null);
const handleEditReview = (review: Review) => {
  console.log('Editing review:', review);
};
</script>
