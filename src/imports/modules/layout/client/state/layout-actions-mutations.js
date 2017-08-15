const MUTATION_TYPES = {
  SHOW_MOBILE_NAV: 'SHOW_MOBILE_NAV',
  SHOW_LARGE_NAV: 'SHOW_LARGE_NAV',
  TOGGLE_MOBILE_NAV_EXPANDED: 'TOGGLE_MOBILE_NAV_EXPANDED',
  SET_LAYOUT_THEME_LIGHT: 'SET_LAYOUT_THEME_LIGHT',
  SET_LAYOUT_THEME_DARK: 'SET_LAYOUT_THEME_DARK'
};

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
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
