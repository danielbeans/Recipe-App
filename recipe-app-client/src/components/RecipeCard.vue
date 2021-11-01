<template>
  <v-card :loading="!name" class="mx-1 my-8 w-full md:w-2/5 xl:w-5/12">
    <template slot="progress">
      <v-progress-linear
        color="primary"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img height="250" :src="image"></v-img>
    <v-card-title
      ><span class="text-truncate w-4/5 whitespace-nowrap text-left">{{
        name
      }}</span>
      <v-spacer />
      <span class="pa-0 flex justify-end items-center">
        <v-icon dense>mdi-clock</v-icon>
        <v-icon v-if="total_time > 30" dense>mdi-clock</v-icon>
        <v-icon v-if="total_time > 60" dense>mdi-clock</v-icon>
      </span>
    </v-card-title>
    <v-card-text class="text-left">
      <v-row align="center" class="mx-0">
        <div>Calories per serving:</div>
        <div class="grey--text ms-2">{{ getCaloriesPerServing }} kcal</div>
      </v-row>
      <v-row align="center" class="mx-0">
        <div>Servings:</div>
        <div class="grey--text ms-2">{{ servings }}</div>
      </v-row>
      <div class="mt-2 text-subtitle-1 text-truncate">
        {{ getHealthLabels }}
      </div>
    </v-card-text>
    <v-divider class="mx-3"></v-divider>
    <v-card-actions>
      <v-btn color="primary lighten-2" text> Cook now </v-btn>
      <v-spacer />
      <v-btn class="mr-2" icon light @click="favorite"
        ><v-icon>{{
          favorited ? "mdi-heart" : "mdi-heart-outline"
        }}</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
declare module "vue/types/vue" {
  interface Vue {
    id: string;
  }
}
export default Vue.extend({
  props: {
    id: String,
    name: String,
    image: String,
    total_calories: Number,
    servings: Number,
    health_labels: Array,
    favorited: Boolean,
    link: String,
    total_time: Number,
  },
  methods: {
    favorite() {
      this.$emit("favorite", this.id);
    },
  },
  computed: {
    getCaloriesPerServing() {
      return Math.round(this.total_calories / this.servings);
    },
    getHealthLabels() {
      if (!this.health_labels) return;
      const temp = this.health_labels;
      temp.length = 3;
      return temp.filter((item) => !!item).join(", ");
    },
  },
});
</script>
