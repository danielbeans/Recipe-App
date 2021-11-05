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
            v-for="item in pantry"
            @setSelected="setSelected"
            @setItem="setItem"
            :selected="selected"
            :key="item.id"
            :id="item.id"
            :name="item.name"
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
        @click="(startAdding = true), (modalState.display = false)"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card>
    <Modal
      v-if="modalState.display"
      :text="modalState.text"
      :type="modalState.type"
      :isNotLogin="true"
      class="
        absolute
        bottom-2
        transform
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-2/5
      "
    />
  </v-container>
</template>

<script lang="ts">
import { IPantryItem } from "@shared/interfaces/pantry.interface";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import PantryListItem from "./PantryListItem.vue";
import Modal from "../components//Modal.vue";
import { AlertType } from "../enum/alert.enum";
export default Vue.extend({
  components: {
    PantryListItem,
    Modal,
  },
  data() {
    return {
      AlertType,
      startAdding: false,
      selected: "",
      itemToAdd: "",
      modalState: {
        type: AlertType.SUCCESS,
        text: "",
        display: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      getUser: "AuthModule/getUser",
      getPantry: "PantryModule/getPantry",
    }),
    pantry(): void {
      return this.getPantry;
    },
  },
  methods: {
    ...mapActions({
      addPantryItem: "PantryModule/addPantryItem",
      removePantryItem: "PantryModule/removePantryItem",
      editPantryItem: "PantryModule/editPantryItem",
    }),
    remove(id: string): void {
      const itemName = this.getPantry.find((item) => item.id === id).name;
      this.removePantryItem(id);
      this.setModalState(
        AlertType.SUCCESS,
        `You have successfully removed ${itemName} from your pantry`,
        true
      );
    },
    edit(): void {
      this.selected = "";
    },
    add(): void {
      if (this.itemToAdd.length > 0) {
        this.addPantryItem(this.itemToAdd);
        this.setModalState(
          AlertType.SUCCESS,
          "You have successfully added a new item to your pantry",
          true
        );
      }
      this.startAdding = false;
      this.itemToAdd = "";
    },
    setItem(newItem: IPantryItem): void {
      this.editPantryItem(newItem);
    },
    setSelected(id: string): void {
      this.selected = id;
    },
    setModalState(type: AlertType, text: string, display: boolean) {
      this.modalState = { type, text, display };
    },
  },
});
</script>

<style lang="scss" scoped></style>
