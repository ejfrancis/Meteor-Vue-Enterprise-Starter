import { actions, mutations, MUTATION_TYPES } from './layout-actions-mutations';
import * as rolesModule from 'meteor/alanning:roles';

describe('layout-actions-mutations', () => {
  describe('actions', () => {
    describe('showMobileNav', () => {
      it('commits ' + MUTATION_TYPES.SHOW_MOBILE_NAV + ' with no payload', () => {
        const commit = jest.fn();
        actions.showMobileNav({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.SHOW_MOBILE_NAV);
      });
    });
    describe('showLargeNav', () => {
      it('commits ' + MUTATION_TYPES.SHOW_LARGE_NAV + ' with no payload', () => {
        const commit = jest.fn();
        actions.showLargeNav({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.SHOW_LARGE_NAV);
      });
    });
    describe('toggleMobileNavExpanded', () => {
      it('commits ' + MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED + ' with no payload', () => {
        const commit = jest.fn();
        actions.toggleMobileNavExpanded({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED);
      });
    });
    describe('setLayoutThemeLight', () => {
      it('commits ' + MUTATION_TYPES.SET_LAYOUT_THEME_LIGHT, () => {
        const commit = jest.fn();
        actions.setLayoutThemeLight({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.SET_LAYOUT_THEME_LIGHT);
      });
    });
    describe('setLayoutThemeDark', () => {
      it('commits ' + MUTATION_TYPES.SET_LAYOUT_THEME_DARK, () => {
        const commit = jest.fn();
        actions.setLayoutThemeDark({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.SET_LAYOUT_THEME_DARK);
      });
    });
    describe('setLayoutThemeDark', () => {
      it('commits ' + MUTATION_TYPES.UPDATE_NAV_ROUTES, () => {
        const commit = jest.fn();
        actions.updateNavRoutes({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.UPDATE_NAV_ROUTES);
      });
    });
    describe('updateNavRoutes', () => {
      it('commits ' + MUTATION_TYPES.UPDATE_NAV_ROUTES, () => {
        const commit = jest.fn();
        actions.updateNavRoutes({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.UPDATE_NAV_ROUTES);
      });
    });
  });
  describe('mutations', () => {
    describe(MUTATION_TYPES.SHOW_MOBILE_NAV, () => {
      it('sets state.isMobileNavVisible to true', () => {
        const state = { isMobileNavVisible: false };
        mutations[MUTATION_TYPES.SHOW_MOBILE_NAV](state);
        expect(state.isMobileNavVisible).toEqual(true);
      });
    });
    describe(MUTATION_TYPES.SHOW_LARGE_NAV, () => {
      it('sets state.isMobileNavVisible to false', () => {
        const state = { isMobileNavVisible: true };
        mutations[MUTATION_TYPES.SHOW_LARGE_NAV](state);
        expect(state.isMobileNavVisible).toEqual(false);
      });
    });
    describe(MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED, () => {
      it('sets state.isMobileNavExpanded to true when false', () => {
        const state = { isMobileNavExpanded: false };
        mutations[MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED](state);
        expect(state.isMobileNavExpanded).toEqual(true);
      });
      it('sets state.isMobileNavExpanded to false when true', () => {
        const state = { isMobileNavExpanded: true };
        mutations[MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED](state);
        expect(state.isMobileNavExpanded).toEqual(false);
      });
    });
    describe(MUTATION_TYPES.UPDATE_NAV_ROUTES, () => {
      it('sets state.navRoutes to user routes if current user is not admin or super admin', () => {
        const state = { navRoutes: [] };
        rolesModule.Roles.userIsInRole = jest.fn(() => false);
        mutations[MUTATION_TYPES.UPDATE_NAV_ROUTES](state);
        expect(state.navRoutes).toEqual([
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
        ]);
      });
      it('sets state.navRoutes to admin routes if current user is admin or super admin', () => {
        const state = { navRoutes: [] };
        rolesModule.Roles.userIsInRole = jest.fn(() => true);
        mutations[MUTATION_TYPES.UPDATE_NAV_ROUTES](state);
        expect(state.navRoutes).toEqual([
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
        ]);
      });
    });
    describe(MUTATION_TYPES.SET_LAYOUT_THEME_LIGHT, () => {
      it('sets state.layoutTheme to "light"', () => {
        const state = { layoutTheme: '' };
        mutations[MUTATION_TYPES.SET_LAYOUT_THEME_LIGHT](state);
        expect(state.layoutTheme).toEqual('light');
      });
    });
    describe(MUTATION_TYPES.SET_LAYOUT_THEME_DARK, () => {
      it('sets state.layoutTheme to "dark"', () => {
        const state = { layoutTheme: '' };
        mutations[MUTATION_TYPES.SET_LAYOUT_THEME_DARK](state);
        expect(state.layoutTheme).toEqual('dark');
      });
    });
  });
});
