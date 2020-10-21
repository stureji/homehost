<template>
<UserList v-if="!isLogged" />
<User v-else />
</template>

<script>
import UserList from '@/components/UserList';
import User from '@/components/User';
import { userStore } from '@/stores/UserStore';

export default {
  setup() {
    const isLogged = userStore.isLogged();

    return {
      UserList,
      User,
      isLogged
    }
  }
}
</script>

<style>

</style>
