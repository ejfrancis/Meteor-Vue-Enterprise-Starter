import { actions, mutations, MUTATION_TYPES } from './counter-actions-mutations';

describe('counter-actions-mutations', () => {
  describe('actions', () => {
    describe('increase', () => {
      it('commits INCREMENT with amount payload', () => {
        const commit = jest.fn();
        const amount = 5;
        actions.increase({ commit }, { amount });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.INCREMENT, { amount });
      });
    });
    describe('decrease', () => {
      it('commits DECREMENT with amount payload', () => {
        const commit = jest.fn();
        const amount = 5;
        actions.decrease({ commit }, { amount });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.DECREMENT, { amount });
      });
    });
    describe('resetDelayed', () => {
      it('commits RESET when complete', async () => {
        const commit = jest.fn();
        await actions.resetDelayed({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.RESET);
      });
    });
  });
  describe('mutations', () => {
    describe(MUTATION_TYPES.INCREMENT, () => {
      it('adds amount to state.count', () => {
        const state = { count: 0 };
        const amount = 5;
        mutations[MUTATION_TYPES.INCREMENT](state, { amount });
        expect(state.count).toEqual(5);
      });
    });
    describe(MUTATION_TYPES.DECREMENT, () => {
      it('subtracts amount from state.count', () => {
        const state = { count: 0 };
        const amount = 5;
        mutations[MUTATION_TYPES.DECREMENT](state, { amount });
        expect(state.count).toEqual(-5);
      });
    });
    describe(MUTATION_TYPES.RESET, () => {
      it('sets state.count to 0', () => {
        const state = { count: 10 };
        mutations[MUTATION_TYPES.RESET](state);
        expect(state.count).toEqual(0);
      });
    });
  });
});
