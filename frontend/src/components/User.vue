<template>
  <NavBar />
  <div class="page-content">
    <h3>Session information:</h3>
    <code>CurrentUser: {{ currentUser }}</code>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import { userStore } from '@/stores/UserStore';

export default {
  setup() {
    const currentUser = userStore.getState();

    return {
      NavBar,
      currentUser: currentUser
    }
  }
}
</script>

<style>

</style>
