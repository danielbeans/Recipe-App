import VuexPersistence from "vuex-persist";

export default ({ store }: { store: any }) => {
  new VuexPersistence({
    /* your options */
  }).plugin(store);
};
