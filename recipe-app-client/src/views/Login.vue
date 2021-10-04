<template>
  <section class="login">
    <LoginForm />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoginForm from "../components/LoginForm.vue";

@Component({
  name: "Login",
  components: { LoginForm },
})
export default class Login extends Vue {}
</script>
