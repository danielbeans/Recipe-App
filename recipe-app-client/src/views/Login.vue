<template>
  <section class="login">
    <LoginForm />
  </section>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "Login",
  components: { LoginForm },
};
</script>
