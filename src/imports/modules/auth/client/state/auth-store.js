import { actions, mutations } from './auth-actions-mutations';

const initialState = {
  user: null,
  loginError: undefined,
  // register
  registerError: undefined,
  // password resret
  passwordResetEmailSent: false,
  passwordResetError: undefined,
  passwordResetComplete: false,
  // enroll account via email
  enrollAccountEmailSent: false
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
