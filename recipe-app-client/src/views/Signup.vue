<template>
  <section class="signup">
    <SignupForm />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignupForm from "../components/SignupForm.vue";

@Component({
  name: "Signup",
  components: { SignupForm },
})
export default class Signup extends Vue {}
</script>
