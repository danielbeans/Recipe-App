import { IUser } from "@/interfaces/user.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";

enum MutationTypes {
  SET_USER = "SET_USER",
  LOGOUT_USER = "LOGOUT_USER",
  SET_MODAL_DISPLAY = "SET_MODAL_DISPLAY",
}

class AuthState {
  user: IUser | null = null;
  modalDisplay: boolean;
}

const mutations = <MutationTree<AuthState>>{
  [MutationTypes.SET_USER](state: AuthState, user: IUser) {
    state.user = user;
  },
  [MutationTypes.LOGOUT_USER](state: AuthState) {
    state.user = null;
  },
  [MutationTypes.SET_MODAL_DISPLAY](state: AuthState, value: boolean) {
    state.modalDisplay = value;
  },
};

const actions = <ActionTree<AuthState, any>>{
  setUser(context, user: IUser) {
    context.commit(MutationTypes.SET_USER, user);
  },
  logoutUser(context) {
    localStorage.removeItem("user");
    context.commit(MutationTypes.LOGOUT_USER);
  },
  setModalDisplay(context, value: boolean) {
    localStorage.removeItem("modalDisplayed");
    context.commit(MutationTypes.SET_MODAL_DISPLAY, value);
  },
};

const getters = <GetterTree<AuthState, any>>{
  getModalDisplay(state: AuthState) {
    return state.modalDisplay;
  },
  isLoggedIn(state: AuthState) {
    return !!state.user?.token;
  },
  getUser(state: AuthState) {
    return state.user;
  },
};

export const AuthModule = {
  state: new AuthState(),
  mutations,
  actions,
  getters,
  namespaced: true,
};
