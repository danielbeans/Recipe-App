<template>
  <v-list-item>
    <v-btn class="mx-1" icon color="secondary" @click="remove">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-btn
      class="mx-1"
      icon
      color="secondary"
      @click="setSelected"
      v-show="selected !== id"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-list-item-content v-show="selected !== id" class="mx-3">{{
      name
    }}</v-list-item-content>
    <v-btn
      class="mx-1"
      icon
      color="secondary"
      @click="edit"
      v-show="selected === id"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>
    <v-text-field
      @input="(newItem) => setItem(newItem)"
      v-show="selected === id"
      :placeholder="name"
      class="mx-3"
      @keydown.enter="edit"
      autofocus
    >
    </v-text-field>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    id: String,
    name: String,
    selected: String,
    removeParent: Function,
    editParent: Function,
  },
  methods: {
    edit(): void {
      this.editParent(this.id);
    },
    remove(): void {
      this.removeParent(this.id);
    },
    setSelected(): void {
      this.$emit("setSelected", this.id);
    },
    setItem(newItemName: string): void {
      this.$emit("setItem", { id: this.id, name: newItemName });
    },
  },
});
</script>
