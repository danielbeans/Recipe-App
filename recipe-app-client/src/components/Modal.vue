<template>
  <div>
    <v-alert
      v-if="isNotLogin || getModalDisplay"
      elevation="2"
      colored-border
      border="left"
      class="p-5"
      dismissible
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
  computed: {
    ...mapGetters({ getModalDisplay: "AuthModule/getModalDisplay" }),
  },
  methods: { ...mapActions({ setModalDisplay: "AuthModule/setModalDisplay" }) },
});
</script>
