<template>
  <div class="mb-4">
    <input
      type="text"
      v-model="query"
      placeholder="Search reviews by title..."
      class="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
      @input="emitSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const query = ref('');
const emit = defineEmits(['search']);

const emitSearch = () => {
  emit('search', query.value);
};
</script>
