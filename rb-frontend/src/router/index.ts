import { createRouter, createWebHistory } from 'vue-router';
import ReviewList from '@/components/ReviewList.vue';
import ReviewForm from '@/components/ReviewForm.vue';

const routes = [
  {
    path: '/',
    name: 'ReviewList',
    component: ReviewList
  },
  {
    path: '/add-review',
    name: 'ReviewForm',
    component: ReviewForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
