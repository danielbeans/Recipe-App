<template>
  <section class="login">
    <LoginForm />
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
      text="You have successfully logged out."
    />
  </section>
</template>

<script lang="ts">
import LoginForm from "../components/LoginForm.vue";
import { mapGetters } from "vuex";
import Modal from "../components/Modal.vue";
import { AlertType } from "../enum/alert.enum";

export default {
  name: "Login",
  components: { Modal, LoginForm },
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
