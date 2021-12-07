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
      v-show="selected.id !== item.id"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-list-item-content v-show="selected.id !== item.id" class="mx-3">{{
      item.name
    }}</v-list-item-content>
    <v-btn
      class="mx-1"
      icon
      color="secondary"
      @click="edit"
      v-show="selected.id === item.id"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>
    <v-text-field
      v-show="selected.id === item.id"
      v-model="name"
      :placeholder="item.name"
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
  data() {
    return {
      name: "",
    };
  },
  props: {
    item: Object,
    selected: Object,
    removeParent: Function,
    setSelectedParent: Function,
    editParent: Function,
  },
  methods: {
    edit(): void {
      this.editParent({ name: this.name, id: this.item.id });
    },
    remove(): void {
      this.removeParent(this.item);
    },
    setSelected(): void {
      this.setSelectedParent(this.item);
    },
  },
});
</script>
