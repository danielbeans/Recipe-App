<template>
  <section class="mt-5 text-xl">
    <RecipeOverview />
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import RecipeOverview from "../components/RecipeOverview.vue";
export default {
  name: "Recipe",
  components: { RecipeOverview },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>
