import IPantryItem from "@/interfaces/pantry-item.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { uuid } from "uuidv4";

enum MutationTypes {
  ADD_PANTRY_ITEM = "ADD_PANTRY_ITEM",
  REMOVE_PANTRY_ITEM = "REMOVE_PANTRY_ITEM",
  EDIT_PANTRY_ITEM = "EDIT_PANTRY_ITEM ",
}
class PantryState {
  pantry: IPantryItem[] = [];
}

const mutations = <MutationTree<PantryState>>{
  [MutationTypes.ADD_PANTRY_ITEM](state: PantryState, newItemName: string) {
    state.pantry.push({ name: newItemName, id: uuid() });
  },
  [MutationTypes.REMOVE_PANTRY_ITEM](state: PantryState, id: string) {
    const indexToRemove = state.pantry.findIndex((item) => item.id === id);
    state.pantry.splice(indexToRemove, 1);
  },
  [MutationTypes.EDIT_PANTRY_ITEM](state: PantryState, newItem: IPantryItem) {
    const indexToEdit = state.pantry.findIndex(
      (item) => item.id === newItem.id
    );
    state.pantry[indexToEdit] = newItem;
  },
};

const actions = <ActionTree<PantryState, any>>{
  addPantryItem(context, newItem: IPantryItem) {
    context.commit(MutationTypes.ADD_PANTRY_ITEM, newItem);
  },
  removePantryItem(context, item: IPantryItem) {
    localStorage.removeItem("user");
    context.commit(MutationTypes.REMOVE_PANTRY_ITEM, item);
  },
  editPantryItem(context, newItem: IPantryItem) {
    localStorage.removeItem("modalDisplayed");
    context.commit(MutationTypes.EDIT_PANTRY_ITEM, newItem);
  },
};

const getters = <GetterTree<PantryState, any>>{
  getPantry(state: PantryState) {
    return state.pantry;
  },
};

export const PantryModule = {
  state: new PantryState(),
  mutations,
  actions,
  getters,
  namespaced: true,
};
