import { IPantryItem } from "@shared/interfaces/pantry-item.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { PANTRY_ROUTES } from "@shared/routes";
import axios from "axios";

enum MutationTypes {
  ADD_PANTRY_ITEM = "ADD_PANTRY_ITEM",
  REMOVE_PANTRY_ITEM = "REMOVE_PANTRY_ITEM",
  EDIT_PANTRY_ITEM = "EDIT_PANTRY_ITEM ",
  UPDATE_PANTRY_ITEM = "UPDATE_PANTRY_ITEM",
  GET_PANTRY_ITEM = "GET_PANTRY_ITEM",
}
class PantryState {
  pantry: IPantryItem[] = [];
}

const mutations = <MutationTree<PantryState>>{
  [MutationTypes.ADD_PANTRY_ITEM](state: PantryState, newItemName: string) {
    state.pantry.push({ name: newItemName, id: uuidv4() });
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
  [MutationTypes.UPDATE_PANTRY_ITEM](
    state: PantryState,
    pantry: IPantryItem[]
  ) {
    state.pantry = pantry;
  },
  [MutationTypes.GET_PANTRY_ITEM](state: PantryState, pantry: IPantryItem[]) {
    state.pantry = pantry;
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
  // Updates Pantry and then sets state Pantry from the updated Pantry in the response
  async updatePantry({ commit, rootState }, pantry: IPantryItem[]) {
    try {
      const res = await axios.post(PANTRY_ROUTES.BASE + PANTRY_ROUTES.UPDATE, {
        pantry,
        token: rootState.AuthModule.user.jwt.token,
      });
      commit(MutationTypes.UPDATE_PANTRY_ITEM, res.data);
    } catch (err) {
      console.error(err);
    }
  },
  // Gets Pantry (sends jwt.token in body)
  async getPantry({ commit, rootState }) {
    try {
      const res = await axios.post(PANTRY_ROUTES.BASE + PANTRY_ROUTES.GET, {
        token: rootState.AuthModule.user.jwt.token,
      });
      commit(MutationTypes.GET_PANTRY_ITEM, res.data);
    } catch (err) {
      console.error(err);
    }
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
