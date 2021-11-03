<template>
  <section>
    <SettingsOptions />
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import SettingsOptions from "../components/SettingsOptions.vue";

export default {
  name: "Settings",
  components: { SettingsOptions },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>

<style lang="scss" scoped></style>
