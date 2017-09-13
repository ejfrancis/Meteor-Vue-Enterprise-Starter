import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { globalUserRoles } from '/src/imports/modules/accounts/shared/constants/global-user-roles';

const MUTATION_TYPES = {
  SHOW_MOBILE_NAV: 'SHOW_MOBILE_NAV',
  SHOW_LARGE_NAV: 'SHOW_LARGE_NAV',
  TOGGLE_MOBILE_NAV_EXPANDED: 'TOGGLE_MOBILE_NAV_EXPANDED',
  SET_LAYOUT_THEME_LIGHT: 'SET_LAYOUT_THEME_LIGHT',
  SET_LAYOUT_THEME_DARK: 'SET_LAYOUT_THEME_DARK',
  UPDATE_NAV_ROUTES: 'UPDATE_NAV_ROUTES'
};

// nav routes for "user" role
const navRoutesUser = [
  {
    name: 'home',
    displayName: 'Home',
    icon: 'home'
  },
  {
    name: 'private',
    displayName: 'Private',
    icon: 'locked'
  }
];
// nav routes for "admin" role
const navRoutesAdmin = navRoutesUser.concat([
  {
    name: 'accounts-admin',
    displayName: 'Accounts',
    icon: 'android-people'
  }
]);

const actions = {
  showMobileNav: ({ commit, state }) => {
    commit(MUTATION_TYPES.SHOW_MOBILE_NAV);
  },
  showLargeNav: ({ commit }) => {
    commit(MUTATION_TYPES.SHOW_LARGE_NAV);
  },
  toggleMobileNavExpanded: ({ commit }) => {
    commit(MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED);
  },
  setLayoutThemeLight: ({ commit }) => {
    commit(MUTATION_TYPES.SET_LAYOUT_THEME_LIGHT);
  },
  setLayoutThemeDark: ({ commit }) => {
    commit(MUTATION_TYPES.SET_LAYOUT_THEME_DARK);
  },
  updateNavRoutes: ({ commit }) => {
    commit(MUTATION_TYPES.UPDATE_NAV_ROUTES);
  }
};

const mutations = {
  [MUTATION_TYPES.SHOW_MOBILE_NAV]: (state) => {
    state.isMobileNavVisible = true;
  },
  [MUTATION_TYPES.SHOW_LARGE_NAV]: (state) => {
    state.isMobileNavVisible = false;
  },
  [MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED]: (state) => {
    state.isMobileNavExpanded = !state.isMobileNavExpanded;
  },
  [MUTATION_TYPES.SET_LAYOUT_THEME_LIGHT]: (state) => {
    state.layoutTheme = 'light';
  },
  [MUTATION_TYPES.SET_LAYOUT_THEME_DARK]: (state) => {
    state.layoutTheme = 'dark';
  },
  [MUTATION_TYPES.UPDATE_NAV_ROUTES]: (state) => {
    if (Roles.userIsInRole(Meteor.userId(), [globalUserRoles.SUPER_ADMIN, globalUserRoles.ADMIN], Roles.GLOBAL_GROUP)) {
      state.navRoutes = navRoutesAdmin;
    } else {
      state.navRoutes = navRoutesUser;
    }
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES,
  navRoutesUser,
  navRoutesAdmin
};
