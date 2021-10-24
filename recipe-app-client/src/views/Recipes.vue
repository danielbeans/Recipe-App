<template>
  <section class="mt-5 text-xl text-center">
    This is Recipes page for user: {{ getUser.username }}
    <Modal />
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Modal from "../components/Modal.vue";

export default {
  name: "Recipes",
  components: { Modal },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>
