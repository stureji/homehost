<template>
<div>
  <NavBar />
  <RecipeList />
</div>
</template>

<script>
import NavBar from '@/components/NavBar';
import RecipeList from '@/components/RecipeList';

export default {
  setup() {

    return {
      NavBar,
      RecipeList
    }
  }
}
</script>

<style>

</style>
