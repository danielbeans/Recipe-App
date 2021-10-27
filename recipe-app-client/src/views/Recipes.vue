<template>
  <section class="mt-5 text-xl text-center">
    <RecipeList />
    <Modal />
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Modal from "../components/Modal.vue";
import RecipeList from "../components/RecipeList.vue";
export default {
  name: "Recipes",
  components: { Modal, RecipeList },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>
