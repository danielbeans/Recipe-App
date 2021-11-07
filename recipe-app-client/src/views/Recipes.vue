<template>
  <section class="mt-5 text-xl text-center">
    <RecipeList />
    <Modal
      :type="AlertType.SUCCESS"
      class="
        absolute
        bottom-2
        transform
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-2/5
      "
      text="You have successfully logged in."
      :isNotLogin="false"
    />
  </section>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import Modal from "../components/Modal.vue";
import RecipeList from "../components/RecipeList.vue";
import { AlertType } from "../enum/alert.enum";
export default {
  name: "Recipes",
  components: { Modal, RecipeList },
  data() {
    return {
      AlertType,
    };
  },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
};
</script>
