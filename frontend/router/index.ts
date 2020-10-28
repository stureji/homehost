import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import ShoppingList from '@/views/ShoppingList.vue';
import Recipes from '@/views/Recipes.vue';
import Error from '@/views/Error.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login/:id',
    name: 'Login',
    component: Login
  },
  {
    path: '/shoplist',
    name: 'Shopping List',
    component: ShoppingList
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: Recipes
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: () => import('@/views/Recipes.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Error', params: { status: 404, message: 'Not found' }}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
