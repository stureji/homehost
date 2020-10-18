<template>
  <UserList v-if="!isLogged" />
  <User v-else />
</template>

<script>
import UserList from '@/components/UserList';
import User from '@/components/User';
import NavBar from '@/components/NavBar';
import { userStore } from '@/stores/UserStore';

export default {
  setup() {
    const isLogged = userStore.isLogged();
    return {
      UserList,
      User,
      NavBar,
      isLogged
    }
  }
}
</script>

<style>

</style>
