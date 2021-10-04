<template>
  <section class="mt-5 text-xl text-center">
    This is Recipes page for user: {{ getUser.username }}
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "Recipes",

  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>
