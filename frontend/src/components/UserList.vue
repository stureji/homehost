<template>
  <div class="flex-container" v-if="!loading && data && data.length">
    <div class="profile" v-for="user of data" :key="user.id">
      {{user.username}}
      <div class="profile-picture">

      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const fetchData = () => {
      loading.value = true;
      return fetch('http://localhost:4000/user', {
        method: 'get',
        headers: {
          "content-type": "application/json"
        }
      }).then( (res) => {
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
      }).then(() => {
        loading.value = false;
      })
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
.flex-container {
  display: flex;
  align-items: center;
  height: 200px;
  background-color:lightskyblue;
  flex-wrap: wrap;
}
.profile {
  background-color: hotpink;
  text-align: center;
  margin: 10px;
  width: 180px;
  line-height: 2.5rem;
  height: 180px;
}
.profile-picture {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
  background-size: 180px;
  width: 180px;
  height: calc(100% - 2.5rem);
}
</style>
