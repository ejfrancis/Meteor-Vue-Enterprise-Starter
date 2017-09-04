import { actions, mutations } from './layout-actions-mutations';

const initialState = {
  layoutTheme: 'light',
  isMobileNavVisible: true,
  isMobileNavExpanded: true,
  navRoutes: [
    {
      name: 'home',
      displayName: 'Home',
      icon: 'home'
    },
    {
      name: 'private',
      displayName: 'Private',
      icon: 'locked'
    },
    {
      name: 'accounts-admin',
      displayName: 'Accounts',
      icon: 'android-people'
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
