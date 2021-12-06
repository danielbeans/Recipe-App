<template>
  <v-container fluid>
    <v-combobox
      v-model="ingredients"
      :search-input.sync="search"
      :items="getPantryItemNames"
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
      v-if="
        !loading &&
        pages[currentPageIndex] &&
        pages[currentPageIndex].recipes.length > 0
      "
      flex
      class="flex-wrap justify-center"
    >
      <v-container flex class="mx-10">
        <v-btn v-if="showPrevBtn" dense depressed @click="goToPrevPage"
          ><v-icon>mdi-arrow-left</v-icon></v-btn
        >
        <v-spacer />
        <v-btn dense depressed v-if="showNextBtn" @click="goToNextPage"
          ><v-icon>mdi-arrow-right</v-icon></v-btn
        ></v-container
      >
      <RecipeCard
        class="mx-10"
        v-for="recipe in pages[currentPageIndex].recipes"
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
        @goToRecipe="goToRecipe"
      />
      <RecipeCard
        class="mx-10"
        style="visibility: hidden"
        v-if="pages[currentPageIndex].recipes.length % 2 !== 0"
      />
    </v-container>
    <v-progress-circular
      class="mt-10"
      :size="50"
      indeterminate
      color="primary"
      v-else-if="loading"
    ></v-progress-circular>
    <h5 v-else-if="error" class="mt-5 text-gray-500 text-lg">{{ error }}</h5>
    <h5 v-else class="mt-5 text-gray-500 text-lg">
      No recipes to display, try searching for recipes using the text field
      above.
    </h5>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import axios, { AxiosError } from "axios";
import { mapActions, mapGetters } from "vuex";
import RecipeCard from "@/components/RecipeCard.vue";
import { IRecipePage } from "@shared/interfaces/recipe-page.interface";
import { RECIPE_ROUTES } from "@shared/routes";
import { IRecipe } from "@shared/interfaces/recipe.interface";

export default Vue.extend({
  components: { RecipeCard },
  data() {
    return {
      pages: [] as IRecipePage[],
      currentPageIndex: 0,
      ingredients: [],
      loading: false,
      search: null,
      error: "",
    };
  },
  computed: {
    ...mapGetters({
      getUser: "AuthModule/getUser",
      isLoggedIn: "AuthModule/isLoggedIn",
      getPantry: "PantryModule/getPantry",
      getFavoriteRecipes: "RecipeModule/getFavoriteRecipes",
    }),
    showPrevBtn(): boolean {
      return this.pages.length > 0 && this.currentPageIndex !== 0;
    },
    showNextBtn(): boolean {
      return (
        this.pages.length > 0 && this.pages[this.currentPageIndex].hasNextPage
      );
    },
    getPantryItemNames(): string[] {
      return this.getPantry.map(({ name }) => name);
    },
  },
  methods: {
    ...mapActions({ _favoriteRecipe: "RecipeModule/favoriteRecipe" }),
    async getRecipes(): Promise<void> {
      this.loading = true;
      try {
        const data: IRecipePage = (
          await axios.post(
            RECIPE_ROUTES.BASE + RECIPE_ROUTES.SEARCH,
            {
              token: this.getUser.jwt.token,
              ingredients: this.ingredients,
            },
            { withCredentials: true }
          )
        ).data;
        const ingredientMatch = this.pages.find(
          (page) =>
            JSON.stringify(page.ingredients) ===
            JSON.stringify(this.ingredients)
        );
        if (!ingredientMatch) this.resetPageState();
        this.pages.push(data);
        this.error = "";
        this.setDefaultFavorite();
        this.updateFavorites();
      } catch (err) {
        this.error = (err as AxiosError).response?.data.error;
      }
      this.loading = false;
    },
    async getNextPageOfRecipes(): Promise<void | IRecipePage> {
      this.loading = true;
      if (this.currentPageIndex !== this.pages.length - 1) {
        this.loading = false;
        return;
      }
      const data: IRecipePage = (
        await axios.post(
          RECIPE_ROUTES.BASE + RECIPE_ROUTES.SEARCH,
          {
            token: this.getUser.jwt.token,
            ingredients: [],
          },
          { withCredentials: true }
        )
      ).data;
      this.loading = false;
      return data;
    },
    async goToNextPage(): Promise<void> {
      const nextPage = await this.getNextPageOfRecipes();
      if (nextPage) this.pages.push(nextPage);
      this.currentPageIndex++;
      this.setDefaultFavorite();
      this.updateFavorites();
    },
    async favoriteRecipe(id: string): Promise<void> {
      const curPage = this.pages[this.currentPageIndex];
      const indexOfRecipe = curPage.recipes.findIndex(
        (recipe) => recipe.uri === id
      );
      const recipeToFavorite = curPage.recipes[indexOfRecipe];
      recipeToFavorite.favorited = !recipeToFavorite.favorited;
      await this._favoriteRecipe(curPage.recipes[indexOfRecipe]);
    },
    goToRecipe(id: string) {
      const formattedId: string = new URL(id).hash.substring(1);
      const curPage: IRecipePage = this.pages[this.currentPageIndex];
      const indexOfRecipe: number = curPage.recipes.findIndex(
        (recipe) => recipe.uri === id
      );
      const recipe: IRecipe = curPage.recipes[indexOfRecipe];
      this.$router.push({
        path: `/recipe/${formattedId}`,
        query: {
          recipe,
        },
      });
    },
    updateFavorites() {
      const curPage = this.pages[this.currentPageIndex];
      curPage.recipes.forEach((recipe) => {
        const foundRecipe: IRecipe = this.getFavoriteRecipes.find(
          (r) => r.uri === recipe.uri
        );
        if (foundRecipe) recipe.favorited = foundRecipe.favorited;
      });
    },
    setDefaultFavorite() {
      const curPage = this.pages[this.currentPageIndex];
      curPage.recipes = curPage.recipes.map((recipe) => ({
        ...recipe,
        favorited: false,
      }));
    },
    goToPrevPage(): void {
      if (this.currentPageIndex > 0) this.currentPageIndex--;
    },
    resetPageState(): void {
      this.pages = [];
      this.currentPageIndex = 0;
    },
  },
});
</script>
