<template>
<div>
  <NavBar />
  <div id="page-content">
    <h3>Session information:</h3>
    <code>{{ currentUser.id }}:{{ currentUser.username }}</code><br />
    <code>Time since login: {{ (Date.now() -  currentUser.loginTime.getTime()) / 1000 }}s </code>
  </div>
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
