<template>
  <div v-if="isNotLogin || getModalDisplay">
    <v-alert
      v-model="alert"
      elevation="2"
      colored-border
      border="left"
      class="p-5"
      :dismissible="isNotLogin"
      :type="type"
      :value="alert"
    >
      {{ text }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Modal",
  props: {
    type: { type: String, default: "" },
    text: { type: String, default: "" },
    isNotLogin: Boolean,
  },
  data() {
    return {
      alert: true,
    };
  },
  created() {
    if (!this.isNotLogin) setTimeout(() => this.setModalDisplay(false), 3500);
  },
  computed: {
    ...mapGetters({ getModalDisplay: "AuthModule/getModalDisplay" }),
  },
  methods: {
    ...mapActions({ setModalDisplay: "AuthModule/setModalDisplay" }),
  },
});
</script>
