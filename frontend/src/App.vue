<template>
  <div id="app">
    <nav>
      <ul>
        >
        <router-link to="/"><li>Home</li></router-link>
        <router-link to="/user"><li>User</li></router-link>
        <router-link to="/shoplist"><li>Shopping List</li></router-link>
      </ul>
    </nav>
  <router-view />
  </div>
</template>

<script>
export default {
  setup() {
    return {

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
nav {
  padding: 1rem 0px;
  background-color: #333;
  color: #EEE;
}
nav a {
  color: #EEE;
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
</style>
