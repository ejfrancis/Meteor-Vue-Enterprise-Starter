const MUTATION_TYPES = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
};

const actions = {
  increment: ({ commit }, { amount }) => {
    commit(MUTATION_TYPES.INCREMENT, { amount });
  },
  decrement: ({ commit }, { amount }) => {
    commit(MUTATION_TYPES.DECREMENT, { amount });
  },
  resetDelayed: ({ commit }) => {
    setTimeout(() => {
      commit(MUTATION_TYPES.RESET);
    }, 1500);
  }
}

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
}

export {
  actions,
  mutations
};