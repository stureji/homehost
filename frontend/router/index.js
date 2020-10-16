import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import User from '@/views/User.vue';
import NotFound from '@/views/NotFound.vue';
import ShoppingList from '@/views/ShoppingList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/shoplist',
    name: 'Shopping List',
    component: ShoppingList
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFound
  },
  // {
  //   path: '*',
  //   redirect: '/404'
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
