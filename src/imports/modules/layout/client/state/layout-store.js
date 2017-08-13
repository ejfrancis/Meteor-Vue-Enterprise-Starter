import { actions, mutations } from './layout-actions-mutations';

const initialState = {
  isMobileNavVisible: true,
  isMobileNavExpanded: true,
  navRoutes: [
    {
      name: 'Home',
      path: '/home',
      icon: 'home'
    },
    {
      name: 'Private',
      path: '/private',
      icon: 'locked'
    }
  ]
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
