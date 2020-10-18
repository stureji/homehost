import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';
import ShoppingList from '@/views/ShoppingList.vue';
import Recipes from '@/views/Recipes.vue';
import ErrorLoadingPage from '@/views/ErrorLoadingPage.vue';
import Recipe from '@/components/Recipe.vue';

const routes = [
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
    component: Recipe
  },
  {
    path: '/500',
    name: 'ErrorLoadingPage',
    component: ErrorLoadingPage
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
