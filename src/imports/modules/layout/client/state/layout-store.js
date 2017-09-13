import { actions, mutations, navRoutesUser } from './layout-actions-mutations';

const initialState = {
  layoutTheme: 'light',
  isMobileNavVisible: true,
  isMobileNavExpanded: true,
  navRoutes: navRoutesUser
};

const getters = {};

const layoutStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
};

export {
  layoutStoreModule
};
