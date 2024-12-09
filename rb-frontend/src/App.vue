<script setup lang="ts">
import ReviewForm from '@/components/ReviewForm.vue';
import ReviewList from '@/components/ReviewList.vue';
</script>

<template>
  <div class="book-review-app">
    <header>
      <h1>Book Review App</h1>
    </header>

    <main>
      <div class="review-container">
        <ReviewForm />
        <ReviewList />
      </div>
    </main>
  </div>
</template>

<style scoped>
.book-review-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

.review-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

h1 {
  color: #333;
  font-size: 2.5rem;
}
</style>
