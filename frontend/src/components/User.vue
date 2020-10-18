<template>
  <NavBar />
  <code>{{ currentUser }}</code>
</template>

<script>
import NavBar from '@/components/NavBar';
import { userStore } from '@/stores/UserStore';

export default {
  setup() {
    const currentUser = userStore.currentUser();

    return {
      NavBar,
      currentUser: currentUser
    }
  }
}
</script>

<style>

</style>
