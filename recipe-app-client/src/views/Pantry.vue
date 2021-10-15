<template>
  <section>
    <PantryList />
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import PantryList from "../components/PantryList.vue";

export default {
  name: "Pantry",
  components: { PantryList },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>

<style lang="scss" scoped></style>
