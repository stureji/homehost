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
  width: 90vw;
}
body {
  background-color: #FFFFFF;
  margin-top: 0;
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
.page-content {
  padding-left: 1rem;
}
</style>
