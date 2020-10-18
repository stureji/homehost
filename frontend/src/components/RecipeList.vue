<template>
  <div id="search-container">
    <input id="search-bar" type="text" v-model="searchInput"
    @input="reactiveInput(searchInput)" placeholder="Sök efter recept" />
  </div>
  <div class="flex-container" v-if="!loading && stage && stage.length">
    <div class="flex-item" v-for="recipe in stage" :key="recipe.id">
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
import { readonly, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar';

export default {
  setup() {
    const router = useRouter();
    const data = ref(null);
    const searchResult = ref(null);
    const stage = ref(null);
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
        data.value = json.data;
        stage.value = json.data;
      }).catch((e) => {
        error.value = e;
        router.push('/');
      }).then(() => {
        loading.value = false;
      });
    }

    const sortData = () => {
      data.value.sort((a, b) => a.name.localeCompare(b.name));
    }

    const reactiveInput = (input) => {
      console.log(input)
      if(input == '') {
        searchResult.value = [];
        stage.value = data.value;
      } else {
        searchResult.value = readonly(data).value.filter( r => r.name.toLowerCase().includes(input))
        stage.value = searchResult.value;
      }
    }

    onMounted(() => {
      fetchData();
    });

    return {
      NavBar,
      stage,
      loading,
      error,
      sortData,
      reactiveInput,
      searchInput: ''
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
  margin: 2px 2vw;
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
#search-container {
  background-color: grey;
  height: 4rem;
  margin-bottom: 0;
}
#search-container > input {
  margin: 0.2rem;
  height: 3.6rem;
  width: calc(100% - 0.4rem);
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 1.5rem;
}

#search-container > input::placeholder {
  font-size: 1.5rem;
}
</style>
