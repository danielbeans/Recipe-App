<template>
  <v-alert class="modal" type="success" :value="alert">
    You have successfully logged in!
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Modal",
  data() {
    return {
      alert: true,
    };
  },
  created() {
    setTimeout(() => {
      this.alert = false;
    }, 2000);
  },
});
</script>

<style scoped>
.modal {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  padding: 20px;
  background: white;
  border-radius: 10px;
}
</style>
