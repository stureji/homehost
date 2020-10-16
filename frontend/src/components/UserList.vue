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
      return fetch('http://192.168.1.18:4000/user', {
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
  justify-content: center;
  height: 200px;
  background-color: inherit;
  flex-wrap: wrap;
}
.profile {
  background-color: #333;
  color: #FFF;
  border-radius: 10px;
  text-align: center;
  margin: 10px;
  width: 180px;
  line-height: 30px;
  height: 180px;
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
