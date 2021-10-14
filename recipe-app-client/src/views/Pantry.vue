<template>
  <v-container class="pa-6 ml-0 mt-20">
    <h1 class="text-h3 font-weight-bold">{{ getUser.username }}'s Pantry</h1>
    <v-card
      outlined
      class="my-6"
      max-width="$vuetify.breakpoint.mdAndDown ? 100% : 50%"
    >
      <v-list>
        <div v-if="pantry.length">
          <v-list-item v-for="(item, index) in pantry" :key="item + index">
            <v-btn class="mx-1" icon color="secondary" @click="remove(index)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              icon
              color="secondary"
              @click="
                selected = item + index;
                itemToEdit = item;
              "
              v-show="selected !== item + index"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-list-item-content
              v-show="selected !== item + index"
              class="mx-3"
              >{{ item }}</v-list-item-content
            >
            <v-btn
              class="mx-1"
              icon
              color="secondary"
              @click="edit(index)"
              v-show="selected === item + index"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-text-field
              v-model="itemToEdit"
              v-show="selected === item + index"
              :placeholder="item"
              class="mx-3"
              @keydown.enter="edit(index)"
              autofocus="true"
            >
            </v-text-field>
          </v-list-item>
        </div>
        <div v-else>
          <v-list-item>
            <v-list-item-tite>No items in Pantry</v-list-item-tite>
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
            autofocus="true"
          ></v-text-field>
        </v-list-item>
      </v-list>
      <v-btn
        elevation="0"
        fab
        absolute
        bottom
        right
        color="primary"
        @click="startAdding = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { mapGetters } from "vuex";

export default {
  name: "Pantry",
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
      selected: {},
      itemToAdd: "",
      itemToEdit: "",
    };
  },
  computed: {
    ...mapGetters({ getUser: "AuthModule/getUser" }),
  },
  methods: {
    remove(index: number) {
      this.pantry.splice(index, 1);
    },
    edit(index: number) {
      this.pantry[index] = this.itemToEdit;
      this.selected = {};
      this.itemToEdit = "";
    },
    add() {
      this.pantry.push(this.itemToAdd);
      this.startAdding = false;
      this.itemToAdd = "";
    },
  },
};
</script>
