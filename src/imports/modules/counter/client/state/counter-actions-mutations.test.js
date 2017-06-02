import { actions, mutations, MUTATION_TYPES } from './counter-actions-mutations';

describe('counter-actions-mutations', () => {
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
    it('commits RESET after delay', async () => {
      const commit = jest.fn();
      await actions.resetDelayed({ commit });
      expect(commit.mock.calls.length).toEqual(1);
      expect(commit.mock.calls[0][0]).toEqual(MUTATION_TYPES.RESET);
    });
  });
});