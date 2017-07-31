import { actions, MUTATION_TYPES } from './auth-actions-mutations';
import * as createUnverifiedUserModule from './../../shared/methods/create-unverified-user';

const mockError = new Error('error');

describe('auth-actions-mutations', () => {
  describe('actions', () => {
    describe('registerUser', () => {
      it('calls createUnverifiedUser() method, when that fails it commits REGISTER_FAILED with error and rejects error, ', async () => {
        expect.assertions(3);
        const commit = jest.fn();
        const firstName = 'first';
        const lastName = 'last';
        const email = 'test@mail.com';
        createUnverifiedUserModule.createUnverifiedUser = jest.fn((cb) => cb(mockError));
        try {
          await actions.registerUser({ commit }, { email, firstName, lastName });
        } catch (e) {
          expect(e).toEqual(mockError);
          expect(commit).toHaveBeenCalledTimes(1);
          expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.REGISTER_FAILED, { error: mockError });
        }
      });
      it('calls createUnverifiedUser() method, when that succees it commits CLEAR_REGISTER_FAILURE and ENROLL_ACCOUNT_EMAIL_SENT, then resolves true, ', async () => {
        const commit = jest.fn();
        const firstName = 'first';
        const lastName = 'last';
        const email = 'test@mail.com';
        createUnverifiedUserModule.createUnverifiedUser = jest.fn((cb) => cb(null));
        await actions.registerUser({ commit }, { email, firstName, lastName });
        expect(commit).toHaveBeenCalledTimes(2);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_REGISTER_FAILURE);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.ENROLL_ACCOUNT_EMAIL_SENT);
      });
      it('rejects error if createUnverifiedUser throws', async () => {
        expect.assertions(3);
        const commit = jest.fn();
        const firstName = 'first';
        const lastName = 'last';
        const email = 'invalidEmailAddress';
        createUnverifiedUserModule.createUnverifiedUser = jest.fn((cb) => {
          throw mockError;
        });
        try {
          await actions.registerUser({ commit }, { email, firstName, lastName });
        } catch (e) {
          expect(e).toEqual(e);
          expect(commit).toHaveBeenCalledTimes(1);
          expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.REGISTER_FAILED, { error: mockError });
        }
      });
    });
  });
  // describe('mutations', () => {
  //   describe(MUTATION_TYPES.INCREMENT, () => {
  //     it('adds amount to state.count', () => {
  //       const state = { count: 0 };
  //       const amount = 5;
  //       mutations[MUTATION_TYPES.INCREMENT](state, { amount });
  //       expect(state.count).toEqual(5);
  //     });
  //   });
  //   describe(MUTATION_TYPES.DECREMENT, () => {
  //     it('subtracts amount from state.count', () => {
  //       const state = { count: 0 };
  //       const amount = 5;
  //       mutations[MUTATION_TYPES.DECREMENT](state, { amount });
  //       expect(state.count).toEqual(-5);
  //     });
  //   });
  //   describe(MUTATION_TYPES.RESET, () => {
  //     it('sets state.count to 0', () => {
  //       const state = { count: 10 };
  //       mutations[MUTATION_TYPES.RESET](state);
  //       expect(state.count).toEqual(0);
  //     });
  //   });
  // });
});
