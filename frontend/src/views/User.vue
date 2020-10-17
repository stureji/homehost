<template>
  <h1>This is User view for logged in user: {{ currentUser }}</h1>
</template>

<script>
import { userStore } from '../stores/UserStore';

export default {
  setup() {
    const currentUser = userStore.getState();

    return {
      currentUser: currentUser
    }
  }
}
</script>

<style>

</style>
