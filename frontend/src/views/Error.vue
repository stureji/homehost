<template>
<div class="error-box">
  <h2 class="error-title">ERROR {{ status }}</h2>
  <p class="error-message">{{ message }}</p>
  <p class="error-message" v-if="status === 503">Could not connect to server backend. Make sure it is up and paths are configured right.</p>
  <p class="error-message" @click="goHome"><span style="text-decoration: underline">Click here to return to home</span></p>
</div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const goHome = () => {
      router.push('/');
    }
    const status = () => {
      if(route.params.status === undefined) {
        return 503;
      } else {
        route.params.status;
      }
    }

    const message = route.params.message;

    onMounted(() => {
      window.history.pushState('', 'Error', '/');
    });

    return {
      goHome,
      status: status(),
      message
    }
  }
}
</script>

<style>
.error-box {
  font-family:'Courier New', Courier, monospace;
  background-color: red;
  padding: 5vh 10vw;
  margin: 5vh 5vw;
  border-radius: 50px;
}
.error-title {
  color: white;
  font-weight: 400;
  margin-bottom: 0;
}
.error-message {
  color: white;
}
</style>
