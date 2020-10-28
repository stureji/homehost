<template>
<div id="app">
  <Error v-if="error.status >= 300" />
  <router-view v-else />
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Error from '@/views/Error.vue';
export default {
  setup() {
    const error = ref({status: Number});

    onMounted(async () => {
      const backend = await fetch(process.env.VUE_APP_BACKEND, {
        method: 'get',
        headers: {
          "content-type": "application/json"
        }
      });

      if(backend.status != 202){
        error.value = backend.status;
      }
    });

    return {
      Error,
      error
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
#page-content {
  padding-left: 1rem;
}
</style>
