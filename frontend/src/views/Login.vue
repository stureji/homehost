<template>
<div>
  <code class="info" v-if="loading">Logging in user with id: {{ id }}...</code>
  <code class="error" v-if="error">ERROR</code>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/UserStore';

export default {
  setup() {
    const router = useRouter();
    const url = window.location.href.split('/');
    const id = url[url.length - 1];

    let data = {};
    const loading = ref(false);
    const error = ref(null);
    let successfulLoginAttempt = false;

    const postLogin = (id) => {
      loading.value = true;
      return fetch(process.env.VUE_APP_API + '/user/login', {
        method: 'post',
        body: '{"id":' + id + '}',
        headers: {
          "content-type": "application/json"
        }
      }).then((res) => {
        if(res.status != 200) {
          const e = new Error(res.statusText);
          e.json = res.json();
          throw e;
        }

        return res.json();
      }).then((json) => {
        successfulLoginAttempt = true;
        data = json.data[0];
      }).catch((e) => {
        error.value = e;
        router.push('/error');
      }).then(() => {
        loading.value = false;
      })
    }

    onMounted(async () => {
      postLogin(id).then(() => {
        if(successfulLoginAttempt) {
          const storeLoggedIn = userStore.login({
            id: data.id,
            username: data.username
          });
          if(storeLoggedIn) {
            router.push('/');
          }
        }
      });
    });

    return {
      data,
      loading,
      error,
      id
    }
  }
}
</script>

<style>

</style>
