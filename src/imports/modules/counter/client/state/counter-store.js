import { actions, mutations } from './counter-actions-mutations';

const initialState = {
  count: 0
};

const getters = {
  countPlusTen: (state) => {
    return state.count + 10;
  }
};

const counterStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};

export {
  counterStoreModule
};
