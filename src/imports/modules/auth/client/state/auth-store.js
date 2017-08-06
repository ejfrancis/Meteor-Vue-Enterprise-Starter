import { actions, mutations } from './auth-actions-mutations';

const initialState = {
  user: null,
  loginError: undefined,
  // register
  registerError: undefined,
  // password resret
  passwordResetEmailSent: false,
  passwordResetError: undefined,
  // enroll account via email
  enrollAccountEmailSent: false,
  enrollAccountSubmitAttempted: false,
  enrollAccountError: undefined
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
