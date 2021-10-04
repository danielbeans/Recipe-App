<template>
  <section class="mt-5 text-xl text-center">
    This is Recipes page for user: {{ getUser.username }}
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { IUser } from "../interfaces/user.interface";
@Component({
  name: "Recipes",
  components: {},
})
export default class Recipes extends Vue {
  @Getter("AuthModule/getUser") getUser: IUser;
}
</script>
