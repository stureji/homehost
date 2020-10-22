<template>
<div>
  <NavBar />
  <RecipeList v-if="recipeSelected < 0" />
  <Recipe v-if="recipeSelected >= 0" :id="id" />
</div>
</template>

<script>
import { ref, computed, onUpdated } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import RecipeList from '@/components/RecipeList.vue';
import Recipe from '@/components/Recipe.vue';

export default {
  setup() {
    const route = useRoute();
    const recipeIdInRoute = computed(() => route.params.id);
    const recipeSelected = ref(-1);

    if(Number.isInteger(recipeIdInRoute)) {
      recipeSelected.value = recipeIdInRoute.value;
    }

    onUpdated(() => {
      recipeSelected.value = recipeIdInRoute.value;
    })

    return {
      NavBar,
      RecipeList,
      Recipe,
      recipeSelected
    }
  }
}
</script>

<style>

</style>
