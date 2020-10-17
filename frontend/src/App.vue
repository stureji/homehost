<template>
  <div id="app">
    <nav>
      <ul>
        >
        <router-link to="/" v-if="!isLoggedIn"><li>Login</li></router-link>
        <router-link to="/user" v-if="isLoggedIn"><li>User</li></router-link>
        <router-link to="/shoplist" v-if="isLoggedIn"><li>Shopping List</li></router-link>
      </ul>
    </nav>
  <router-view />
  </div>
</template>

<script>
import { userStore } from './stores/UserStore';

export default {
  setup() {
    const isLoggedIn = userStore.isLoggedIn();
    return {
      isLoggedIn: isLoggedIn
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin: 0 auto;
  width: 80vw;
}
@media only screen and (max-width: 800px) {
  body {
    margin: 0;
  }
  #app {
    width: 100vw;
  }
}
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
nav ul li:hover {
  display: inline;
  background-color: #444;
}
a {
  text-decoration: none;
}
</style>
