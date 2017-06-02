import { actions, mutations, MUTATION_TYPES } from './counter-actions-mutations';

describe('counter-actions-mutations', () => {
  describe('actions', () => {
    describe('increment', () => {
      it('commits INCREMENT with amount payload', () => {
        const commit = jest.fn();
        const amount = 5;
        actions.increment({ commit }, { amount });
        expect(commit.mock.calls.length).toEqual(1);
        expect(commit.mock.calls[0][0]).toEqual(MUTATION_TYPES.INCREMENT);
        expect(commit.mock.calls[0][1]).toEqual({ amount });
      });
    });
    describe('decrement', () => {
      it('commits DECREMENT with amount payload', () => {
        const commit = jest.fn();
        const amount = 5;
        actions.decrement({ commit }, { amount });
        expect(commit.mock.calls.length).toEqual(1);
        expect(commit.mock.calls[0][0]).toEqual(MUTATION_TYPES.DECREMENT);
        expect(commit.mock.calls[0][1]).toEqual({ amount });
      });
    });
    describe('resetDelayed', () => {
      it('commits RESET when complete', async () => {
        const commit = jest.fn();
        await actions.resetDelayed({ commit });
        expect(commit.mock.calls.length).toEqual(1);
        expect(commit.mock.calls[0][0]).toEqual(MUTATION_TYPES.RESET);
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
