<template>
  <v-alert
    v-if="isNotLogin || getModalDisplay"
    class="p-5"
    :type="type"
    :value="alert"
  >
    {{ text }}
  </v-alert>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Modal",
  props: {
    type: String,
    text: String,
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
  created() {
    setTimeout(() => {
      this.alert = false;
      this.setModalDisplay(false);
    }, 2000);
  },
});
</script>
