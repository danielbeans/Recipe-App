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
  SET_PANTRY = "SET_PANTRY",
}
class PantryState {
  pantry: IPantryItem[] = [];
}

const mutations = <MutationTree<PantryState>>{
  [MutationTypes.ADD_PANTRY_ITEM](state: PantryState, newItem: IPantryItem) {
    state.pantry = [...state.pantry, newItem];
  },
  [MutationTypes.REMOVE_PANTRY_ITEM](state: PantryState, id: string) {
    const pantry = state.pantry.filter((item) => item.id !== id);
    state.pantry = pantry;
  },
  [MutationTypes.EDIT_PANTRY_ITEM](
    state: PantryState,
    newPantry: IPantryItem[]
  ) {
    state.pantry = newPantry;
  },
  [MutationTypes.UPDATE_PANTRY_ITEM](
    state: PantryState,
    pantry: IPantryItem[]
  ) {
    state.pantry = pantry;
  },
  [MutationTypes.SET_PANTRY](state: PantryState, pantry: IPantryItem[]) {
    state.pantry = pantry;
  },
};

const actions = <ActionTree<PantryState, any>>{
  async addPantryItem({ commit, rootState }, pantryItem: IPantryItem) {
    try {
      const res = await axios.post(PANTRY_ROUTES.BASE + PANTRY_ROUTES.ADD, {
        pantryItem,
        token: rootState.AuthModule.user.jwt.token,
      });
      commit(MutationTypes.ADD_PANTRY_ITEM, res.data);
    } catch (err) {
      console.log(err);
    }
  },
  async removePantryItem({ commit, rootState }, pantryItem: IPantryItem) {
    try {
      const res = await axios.post(PANTRY_ROUTES.BASE + PANTRY_ROUTES.REMOVE, {
        pantryItem,
        token: rootState.AuthModule.user.jwt.token,
      });
      commit(MutationTypes.REMOVE_PANTRY_ITEM, pantryItem.id);
    } catch (err) {
      console.log(err);
    }
  },
  async editPantryItem({ commit, rootState }, pantryItem: IPantryItem) {
    localStorage.removeItem("modalDisplayed");
    try {
      const res = await axios.post(PANTRY_ROUTES.BASE + PANTRY_ROUTES.EDIT, {
        pantryItem,
        token: rootState.AuthModule.user.jwt.token,
      });
      commit(MutationTypes.EDIT_PANTRY_ITEM, res.data);
    } catch (err) {
      console.log(err);
    }
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
      commit(MutationTypes.SET_PANTRY, res.data);
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
