<template>
  <NavBar />
  <div id="page-content">
    <h2 class="recipe-heading">{{ data.name }}</h2>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar';

export default {
  setup() {
    const router = useRouter();
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    const data = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchData = () => {
      loading.value = true;

      return fetch(process.env.VUE_APP_API + '/recipe/' + id, {
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

    return {
      NavBar,
      data
    }
  }
}
</script>

<style>

</style>
