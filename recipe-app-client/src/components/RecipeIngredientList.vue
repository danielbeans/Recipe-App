<template>
  <v-list v-if="ingredients" shaped>
    <v-list-item-group multiple>
      <template v-for="(ingredient, i) in ingredients">
        <v-divider v-if="!ingredient" :key="`divider-${i}`"></v-divider>
        <v-list-item
          v-else
          class="text-black"
          :key="`item-${i}`"
          :ripple="false"
          :disabled="true"
          :value="ingredient.text"
        >
          <template>
            <v-list-item-action>
              <v-simple-checkbox
                :value="checkPantryForIngredient(ingredient.food)"
                :ripple="false"
                color="green"
              ></v-simple-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="ingredient.text"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script lang="ts">
import Vue from "vue";
import IRecipe from "@shared/interfaces/recipe.interface";
import { mapGetters } from "vuex";
import { IPantryItem } from "../../../shared/interfaces/pantry-item.interface";
export default Vue.extend({
  props: {
    ingredients: Array,
  },
  computed: {
    ...mapGetters({
      getPantry: "PantryModule/getPantry",
    }),
    getPantryItemNames(): string[] {
      return this.getPantry.map((i: IPantryItem) => i.name.toLowerCase());
    },
  },
  methods: {
    checkPantryForIngredient(ingredient: string) {
      return this.getPantryItemNames.includes(ingredient.toLowerCase());
    },
  },
});
</script>
