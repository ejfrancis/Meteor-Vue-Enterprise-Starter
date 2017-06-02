import { counterStoreModule } from './counter-store';

describe('counter-store', () => {
  describe('initial state', () => {
    it('contains a count of 0', () => {
      const expectedState = { count: 0 };
      expect(counterStoreModule.state).toEqual(expectedState);
    });
  });
  describe('getters', () => {
    describe('countPlusTen', () => {
      it('returns state.count + 10', () => {
        const state = { count: 5 };
        const result = counterStoreModule.getters.countPlusTen(state);
        expect(result).toEqual(15);
      });
    });
  });
});