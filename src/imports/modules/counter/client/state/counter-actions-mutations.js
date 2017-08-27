const MUTATION_TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
};

const actions = {
  increase: ({ commit }, { amount }) => {
    commit(MUTATION_TYPES.INCREMENT, { amount });
  },
  decrease: ({ commit }, { amount }) => {
    commit(MUTATION_TYPES.DECREMENT, { amount });
  },
  resetDelayed: ({ commit }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit(MUTATION_TYPES.RESET);
        resolve();
      }, 1500);
    });
  }
};

const mutations = {
  [MUTATION_TYPES.INCREMENT]: (state, { amount }) => {
    state.count += parseInt(amount, 10);
  },
  [MUTATION_TYPES.DECREMENT]: (state, { amount }) => {
    state.count -= parseInt(amount, 10);
  },
  [MUTATION_TYPES.RESET]: (state) => {
    state.count = 0;
  }
};

export {
  actions,
  mutations,
  MUTATION_TYPES
};
