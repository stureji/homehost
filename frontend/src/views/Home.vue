<template>
  <UserList v-if="!isLogged" />
  <NavBar v-else />
</template>

<script>
import UserList from '../components/UserList';
import NavBar from '../components/NavBar';
import { userStore } from '../stores/UserStore';

export default {
  setup() {
    const isLogged = userStore.isLogged();
    return {
      UserList,
      NavBar,
      isLogged
    }
  }
}
</script>

<style>

</style>
