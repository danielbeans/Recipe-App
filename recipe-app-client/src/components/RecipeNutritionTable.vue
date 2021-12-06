<template>
  <v-data-table
    v-if="totalNutrients"
    class="h-full elevation-1"
    :mobile-breakpoint="10000"
    :items-per-page="1"
    :headers="headers"
    :items="nutrients"
  ></v-data-table>
</template>
<script lang="ts">
import Vue from "vue";
import IRecipe from "@shared/interfaces/recipe.interface";
import RecipeIngredientList from "../components/RecipeIngredientList.vue";
export default Vue.extend({
  props: {
    weight: Number,
    serves: Number,
    label: String,
    totalNutrients: Array,
  },
  data() {
    return {
      headers: [
        {
          text: `Food (${(this.weight / this.serves).toFixed(2)}g serving)`,
          align: "start",
          sortable: false,
          value: "name",
          width: `300px`,
        },
        ...this.totalNutrients.map((item: any) => {
          const name: string = item.label.split(",")[0];
          return {
            text: `${name} (${item.unit})`,
            value: name.toLowerCase(),
            width: `150px`,
          };
        }),
      ],
      nutrients: [
        {
          name: this.label,
          ...this.getNutrientMap(),
        },
      ],
    };
  },
  computed: {
    recipe(): IRecipe {
      return this.$route.query.recipe;
    },
    id(): string {
      return this.$route.params.id;
    },
  },
  methods: {
    getNutrientMap() {
      const nutrientMap = this.totalNutrients.map((nutrient) => [
        nutrient.label.toLowerCase(),
        `${(nutrient.total / this.serves).toFixed(2)}`,
      ]);
      return Object.fromEntries(nutrientMap);
    },
  },
});
</script>
