import { createWebHistory, createRouter } from "vue-router";
import Home from "../src/views/Home.vue";
import User from "../src/views/User.vue";
import ShoppingList from "../src/views/ShoppingList.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/shoplist",
    name: "Shopping List",
    component: ShoppingList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
