import { actions, mutations, MUTATION_TYPES } from './layout-actions-mutations';

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
});
