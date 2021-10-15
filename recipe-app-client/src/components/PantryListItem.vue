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
      v-show="selected !== item + index"
    >
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-list-item-content v-show="selected !== item + index" class="mx-3">{{
      item
    }}</v-list-item-content>
    <v-btn
      class="mx-1"
      icon
      color="secondary"
      @click="edit"
      v-show="selected === item + index"
    >
      <v-icon>mdi-check</v-icon>
    </v-btn>
    <v-text-field
      @input="(newItem) => setItem(newItem)"
      v-show="selected === item + index"
      :placeholder="item"
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
    item: String,
    index: Number,
    selected: String,
    removeParent: Function,
    editParent: Function,
  },
  methods: {
    edit() {
      this.editParent(this.index);
    },
    remove() {
      this.removeParent(this.index);
    },
    setSelected() {
      this.$emit("setSelected", this.item + this.index);
    },
    setItem(newItem: string) {
      this.$emit("setItem", newItem, this.index);
    },
  },
});
</script>
