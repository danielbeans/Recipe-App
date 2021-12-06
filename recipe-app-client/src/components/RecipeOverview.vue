<template>
  <v-container class="text-center mx-auto">
    <section>
      <v-img
        class="w-1/2 lg:w-1/4 shadow-md rounded-full mb-8 mx-auto avatar"
        :src="recipe.image"
      />
      <h3 class="mb-5 text-2xl text-gray-600 mt-8">{{ recipe.label }}</h3>
      <p class="text-base text-gray-500">
        For recipe instructions visit
        <a target="_blank" :href="recipe.url">here</a>
      </p>
    </section>
    <section class="mt-10">
      <h3 class="mb-5 text-gray-500">Ingredients</h3>
      <v-divider class="w-full lg:w-1/2 mx-auto" />
      <RecipeIngredientList
        class="w-full lg:w-1/4 mx-auto"
        :ingredients="recipe.ingredients"
      />
    </section>
    <section class="mt-5">
      <h3 class="mb-5 text-gray-500">Nutrition:</h3>
      <v-divider class="w-full lg:w-1/2 mx-auto" />
      <RecipeNutritionTable
        :label="recipe.label"
        :serves="recipe.yield"
        :weight="recipe.totalWeight"
        :totalNutrients="recipe.digest"
        class="w-full lg:w-1/2 mt-5 mx-auto"
      />
    </section>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import IRecipe from "@shared/interfaces/recipe.interface";
import RecipeNutritionTable from "./RecipeNutritionTable.vue";
import RecipeIngredientList from "../components/RecipeIngredientList.vue";
export default Vue.extend({
  components: { RecipeIngredientList, RecipeNutritionTable },
  computed: {
    recipe(): IRecipe {
      return this.$route.query.recipe;
    },
    id(): string {
      return this.$route.params.id;
    },
  },
});
</script>
