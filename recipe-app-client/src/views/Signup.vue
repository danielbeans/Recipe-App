<template>
  <section class="login">
    <SignupForm />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SignupForm from "../components/auth/signup/SignupForm.vue";

@Component({
  components: { SignupForm },
})
export default class Signup extends Vue {}
</script>
