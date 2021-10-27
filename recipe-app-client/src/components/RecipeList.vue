<template>
  <v-container fluid>
    <v-combobox
      v-model="ingredients"
      :search-input.sync="search"
      hide-selected
      multiple
      label="Add ingredients for search"
      small-chips
    ></v-combobox>
    <v-btn color="primary" depressed class="flex" @click="getRecipes"
      >Search</v-btn
    >
    <h3 class="my-4 font-bold">Recipes</h3>
    <v-divider />
    <v-container
      v-if="recipes.length > 0"
      flex
      class="flex-wrap justify-center"
    >
      <RecipeCard
        class="mx-10"
        v-for="recipe in recipes"
        :key="recipe.uri"
        :id="recipe.uri"
        :name="recipe.label"
        :link="recipe.url"
        :image="recipe.image"
        :total_time="recipe.totalTime"
        :total_calories="recipe.calories"
        :servings="recipe.yield"
        :time="recipe.totalTime"
        :health_labels="recipe.healthLabels"
        :favorited="recipe.favorited"
        @favorite="favoriteRecipe"
      />
      <RecipeCard
        class="mx-10"
        style="visibility: hidden"
        v-if="recipes.length % 2 !== 0"
      />
    </v-container>
    <v-progress-circular
      class="mt-10"
      :size="50"
      indeterminate
      color="primary"
      v-else-if="loading"
    ></v-progress-circular>
    <h5 v-else class="mt-5 text-gray-500 text-lg">
      No recipes to display, try searching for recipes using the text field
      above.
    </h5>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import RecipeCard from "./RecipeCard.vue";
import axios from "axios";
export default Vue.extend({
  components: { RecipeCard },
  data() {
    return {
      recipes: [],
      ingredients: ["Chicken"],
      ingredient: "",
      search: null,
      loading: false,
    };
  },
  methods: {
    favoriteRecipe(id: string) {
      const indexOfRecipe: number = this.recipes.findIndex(
        (recipe) => recipe.uri === id
      );
      this.recipes[indexOfRecipe].favorited =
        !this.recipes[indexOfRecipe].favorited;
    },
    async getRecipes() {
      this.loading = true;
      const data = (
        await axios.post("http://localhost:3000/recipes/search", {
          ingredients: this.ingredients,
        })
      ).data;
      console.log(data);
      this.recipes = data.recipes.map((recipe) => ({
        ...recipe,
        favorited: false,
      }));
      this.loading = false;
    },
  },
});
</script>
