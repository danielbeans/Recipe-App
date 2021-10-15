import IPantry from "@/interfaces/pantry-item.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";

class PantryState {
  pantry: IPantry | null = null;
}

const mutations = <MutationTree<PantryState>>{};

const actions = <ActionTree<PantryState, any>>{};

const getters = <GetterTree<PantryState, any>>{};

export const PantryModule = {
  state: new PantryState(),
  mutations,
  actions,
  getters,
  namespaced: true,
};
