import { actions, mutations } from './accounts-actions-mutations';

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
  enrollAccountError: undefined,
  // get user with roles
  getUsersWithRolesLoading: false,
  getUsersWithRolesError: undefined
};

const getters = {
};

const accountsStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};

export {
  accountsStoreModule
};
