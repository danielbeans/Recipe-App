<template>
  <v-alert
    v-if="getModalDisplay"
    class="w-1/3 p-5 left-1/2 absolute transform -translate-x-1/2 bottom-0"
    type="success"
    :value="alert"
  >
    You have successfully logged in!
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Modal",
  data() {
    return {
      alert: true,
    };
  },
  computed: {
    ...mapGetters({ getModalDisplay: "AuthModule/getModalDisplay" }),
  },
  methods: { ...mapActions({ setModalDisplay: "AuthModule/setModalDisplay" }) },
  created() {
    setTimeout(() => {
      this.alert = false;
      this.setModalDisplay(false);
    }, 2000);
  },
});
</script>
