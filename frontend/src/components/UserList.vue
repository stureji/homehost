<template>
<div>
  <h1 class="center">Select a user to login:</h1>
  <div class="flex-container" v-if="!loading && data && data.length">
    <a class="profile" v-for="user of data" :key="user.id" :href="'/login/' + user.id">
      <span class="username">{{user.username}}</span>
      <div class="profile-picture">
      </div>
    </a>
  </div>
  <div v-if="loading">
    <code class="info fade-in">Loading user profiles....</code>
  </div>
  <div v-if="error">
    <code class="error fade-in">An error occured!</code>
  </div>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = () => {
      loading.value = true;
      return fetch(process.env.VUE_APP_API + '/user', {
        method: 'get',
        headers: {
          "content-type": "application/json"
        }
      }).then((res) => {
        if(!res.ok) {
          const e = new Error(res.statusText);
          e.json = res.json();
          throw e;
        }

        return res.json();
      }).then((json) => {
        data.value = json.data;
      }).catch((e) => {
        error.value = e;
        router.push({ name: 'Error', params: { code: error.value.code, message: error.value.message }});
      }).then(() => {
        loading.value = false;
      });
    }

    onMounted(() => {
      fetchData();
    })

    return {
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: inherit;
}
.profile {
  background-color: #333;
  border-radius: 10px;
  margin: 10px;
  width: 180px;
  height: 180px;
  cursor: pointer;
}
.profile > span {
  line-height: 30px;
  font-size: 1rem;
  color: #FFF;
  text-align: left;
  font-weight: 600;
  padding: 0 1rem;
  white-space: nowrap;
}
.profile:hover {
  background-color: #666;
}
.profile:hover .profile-picture, .profile.hover .profile-picture { background-color: #999; }
.profile-picture {
  background-image: url('../assets/blue.png');
  background-size: 100%;
  background-color: #777;
  width: 80%;
  height: 80%;
  margin: auto;
  border-radius: 135px;
}
</style>
