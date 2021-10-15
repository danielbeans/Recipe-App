<template>
  <v-container class="pa-6 ml-0 mt-20">
    <h1 class="text-h3 font-weight-bold">{{ getUser.username }}'s Pantry</h1>
    <v-card
      outlined
      class="my-6"
      max-width="$vuetify.breakpoint.mdAndDown ? 100% : 50%"
    >
      <v-list class="mb-3">
        <div v-if="pantry.length">
          <PantryListItem
            v-for="(item, index) in pantry"
            @setSelected="setSelected"
            @setItem="setItem"
            :selected="selected"
            :key="item + index"
            :item="item"
            :index="index"
            :editParent="edit"
            :removeParent="remove"
          />
        </div>
        <div v-else>
          <v-list-item>
            <v-list-item-title>No items in Pantry</v-list-item-title>
          </v-list-item>
        </div>
        <v-list-item v-show="startAdding">
          <v-btn class="mx-1" icon color="secondary" @click="add">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-text-field
            v-model="itemToAdd"
            class="mx-3"
            label="Item"
            @keydown.enter="add"
            autofocus
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-btn
        :elevation="0"
        fab
        absolute
        right
        bottom
        color="primary"
        @click="startAdding = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import PantryListItem from "./PantryListItem.vue";
export default Vue.extend({
  components: {
    PantryListItem,
  },
  data() {
    return {
      pantry: [
        "apples",
        "bananas",
        "grapes",
        "blueberry",
        "pineapples",
        "celery",
      ],
      startAdding: false,
      selected: "",
      itemToAdd: "",
    };
  },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
  methods: {
    remove(index: number) {
      this.pantry.splice(index, 1);
    },
    edit() {
      this.selected = "";
    },
    add() {
      this.pantry.push(this.itemToAdd);
      this.startAdding = false;
      this.itemToAdd = "";
    },
    setItem(newItem: string, index: number) {
      this.pantry[index] = newItem;
    },
    setSelected(item: string) {
      this.selected = item;
    },
  },
});
</script>

<style lang="scss" scoped></style>
