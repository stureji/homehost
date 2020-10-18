<template>
  <div class="flex-container" v-if="!loading && data && data.length">
    <div class="flex-item" v-for="recipe of data" :key="recipe.id">
      <div class="recipe-image">
        {{ recipe.id }}
      </div>
      <div class="recipe-name">
        {{ recipe.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar';

export default {
  setup() {
    const router = useRouter();
    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchData = () => {
      loading.value = true;

      return fetch(process.env.VUE_APP_API + '/recipe', {
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
        console.log(json.data)
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

    return {
      NavBar,
      data,
      loading,
      error
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}
.flex-container {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: unset;
  width: 100%;
}
.flex-item {
  margin: 6px 0;
  width: 100%;
  height: 6rem;
  border-style: solid;
  border-radius: 10px;
  padding-left: 1rem;
}
.recipe-image {
  float: right;
  width: 20%;
  height: 6rem;
  line-height: 6rem;
}
.recipe-name {
  width: 80%;
  height: 6rem;
  line-height: 6rem;
}
</style>
