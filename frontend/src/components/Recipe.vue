<template>
<div>
  <h2 v-if="loading">{{loading}}</h2>
  <div id="page-content" v-if="!loading && data">
    <h2 class="recipe-heading" @click="routeToAll()">{{ data.name }}</h2>
    <p>{{ data.instructions }}</p>
  </div>
</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from '@/components/NavBar';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const recipeIdInRoute = computed(() => route.params.id);

    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchData = () => {
      loading.value = true;

      return fetch(process.env.VUE_APP_API + '/recipe/?id=' + recipeIdInRoute.value, {
        method: 'get',
        headers: {
          "content-type": "application/json"
        }
      }).then((res) => {
        if(!res.ok) {
          const e = new Error(res.statusText);
          e.json = e.json();
          throw e;
        }

        return res.json()
      }).then((json) => {
        data.value = json.data;
      }).catch((e) => {
        error.value = e;
        router.push('/');
      }).then(() => {
        loading.value = false;
      });
    }

    onMounted(() => {
      fetchData();
    });

    const routeToAll = () => {
      router.push({ name: 'Recipes', params: { id: -1}});
    };

    return {
      NavBar,
      data,
      loading,
      error,
      routeToAll
    }
  }
}
</script>

<style>

</style>
