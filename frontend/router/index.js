import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import User from "@/views/User.vue";
import ShoppingList from "@/views/ShoppingList.vue";

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
