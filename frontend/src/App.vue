<template>
  <div id="app">
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
@media only screen and (max-width: 800px) {
  body {
    margin: 0;
  }
  #app {
    width: 100vw;
  }
}
a {
  text-decoration: none;
}
</style>
