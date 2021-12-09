import { IUser } from "@/interfaces/user.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";

enum MutationTypes {
  SET_USER = "SET_USER",
  SET_USERNAME = "SET_USERNAME",
  SET_EMAIL = "SET_EMAIL",
  SET_NAME = "SET_NAME",
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
  [MutationTypes.SET_USERNAME](state: AuthState, username: string) {
    state.user.username = username;
  },
  [MutationTypes.SET_EMAIL](state: AuthState, email: string) {
    state.user.email = email;
  },
  [MutationTypes.SET_NAME](state: AuthState, name: string) {
    state.user.name = name;
  },
  [MutationTypes.LOGOUT_USER](state: AuthState) {
    state.user = null;
  },
  [MutationTypes.SET_MODAL_DISPLAY](state: AuthState, value: boolean) {
    state.modalDisplay = value;
  },
};

const actions = <ActionTree<AuthState, any>>{
  async setUser(context, user: IUser) {
    localStorage.clear();
    context.commit(MutationTypes.SET_USER, user);
    await this.dispatch("PantryModule/getPantry", context, { root: true });
  },
  setUsername(context, username: string) {
    context.commit(MutationTypes.SET_USERNAME, username);
  },
  setEmail(context, email: string) {
    context.commit(MutationTypes.SET_EMAIL, email);
  },
  setName(context, name: string) {
    context.commit(MutationTypes.SET_NAME, name);
  },
  logoutUser(context) {
    localStorage.clear();
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
    return !!state.user?.jwt.token;
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
