import { IUser } from "@/interfaces/user.interface";
import { GetterTree, MutationTree, ActionTree } from "vuex";

enum MutationTypes {
  SET_USER = "SET_USER",
  LOGOUT_USER = "LOGOUT_USER",
}

class AuthState {
  user: IUser | null = null;
}

const mutations = <MutationTree<AuthState>>{
  [MutationTypes.SET_USER](state: AuthState, user: IUser) {
    state.user = user;
  },
  [MutationTypes.LOGOUT_USER](state: AuthState) {
    state.user = null;
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
};

const getters = <GetterTree<AuthState, any>>{
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
