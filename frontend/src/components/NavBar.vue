<template>
  <nav v-if="isLogged">
    <ul>
      <router-link to="/shoplist" ><li>Shopping List</li></router-link>
      <router-link to="/recipes" ><li>Recipes</li></router-link>
      <router-link to="/" ><li>UserPanel</li></router-link>
    </ul>
  </nav>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/UserStore';
export default {
  setup() {
    const currentUser = userStore.currentUser();
    const isLogged = userStore.isLogged();

    function goToHome() {
      const router = useRouter();
      router.push('/');
    }

    onMounted(() => {
      if(!isLogged) {
        goToHome();
      }
    });

    return {
      user: currentUser,
      goToHome,
      isLogged
    }
  }
}
</script>

<style>
nav {
  padding: 1rem 0px;
  background-color: #333;
  color: #FFF;
}
nav a {
  color: #FFF;
  text-decoration: none;
}
nav ul {
  list-style-type: none;
  margin: 0;
  padding-left: 1rem;
}
nav ul li {
  display: inline;
  padding: 10px;
}
nav ul:first-child {
  padding-left: 0;
}
nav ul li:hover {
  display: inline;
  background-color: #444;
}
</style>
