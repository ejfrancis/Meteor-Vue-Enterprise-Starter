import { actions, mutations } from './auth-actions-mutations';

const initialState = {
  user: null,
  loginError: undefined,
  registerError: undefined
};

const getters = {
};

const authStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};

export {
  authStoreModule
};
