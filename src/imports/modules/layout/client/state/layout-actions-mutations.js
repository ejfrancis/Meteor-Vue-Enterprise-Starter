const MUTATION_TYPES = {
  SHOW_MOBILE_NAV: 'SHOW_MOBILE_NAV',
  SHOW_LARGE_NAV: 'SHOW_LARGE_NAV',
  TOGGLE_MOBILE_NAV_EXPANDED: 'TOGGLE_MOBILE_NAV_EXPANDED' 
};

const actions = {
  showMobileNav: ({ commit }) => {
    commit(MUTATION_TYPES.SHOW_MOBILE_NAV);
  },
  showLargeNav: ({ commit }) => {
    commit(MUTATION_TYPES.SHOW_LARGE_NAV);
  },
  toggleMobileNavExpanded: ({ commit }) => {
    commit(MUTATION_TYPES.TOGGLE_MOBILE_NAV_EXPANDED);
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
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
