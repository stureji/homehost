<template>
  <div class="error-box">
    <h2 class="error-title">ERROR!</h2>
    <p class="error-message">Could not connect to server backend. Make sure it is up and paths are configured right.</p>
    <p class="error-message" @click="goHome"><span style="text-decoration: underline">Click here to return to home</span></p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const goHome = () => {
      router.push('/');
    }

    return {
      goHome
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
