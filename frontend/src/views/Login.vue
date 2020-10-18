<template>
  <code class="info">Logging in user with id: {{ id }}...</code>
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

    const data = ref(null);
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
        data.value = json.data;
      }).catch((e) => {
        error.value = e;
        router.push('/500');
      }).then(() => {
        loading.value = false;
      })
    }

    onMounted(async () => {
      postLogin(id).then(() => {
        if(successfulLoginAttempt) {
          const storeLoggedIn = userStore.login({
            id: data.value.id,
            username: data.value.username
          });
          if(storeLoggedIn) {router.push('/');
          } else {
            console.log("store did not log in")
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
