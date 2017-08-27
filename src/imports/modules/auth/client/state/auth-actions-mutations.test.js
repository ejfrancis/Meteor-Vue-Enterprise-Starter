import { actions, mutations, MUTATION_TYPES } from './auth-actions-mutations';
import * as createUnverifiedUserModule from './../../shared/methods/create-unverified-user';
import * as AccountsModule from 'meteor/accounts-base';
import * as MeteorModule from 'meteor/meteor';

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
    describe('clearRegisterFailure', () => {
      it('clears any registure failure', () => {
        const commit = jest.fn();
        actions.clearRegisterFailure({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_REGISTER_FAILURE);
      });
    });
    describe('enrollVerifyAccount', () => {
      it('rejects password validation error and commits ENROLL_ACCOUNT_FAILED if password isn\'t strong enough', async () => {
        const commit = jest.fn();
        const token = 'token';
        const newPassword = 'weakPassword';
        let err;
        let result;
        try {
          result = await actions.enrollVerifyAccount({ commit }, { token, newPassword });
        } catch (e) {
          err = e;
        }
        expect(result).toBeUndefined();
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.ENROLL_ACCOUNT_FAILED, { error: expect.any(Error) });
        expect(err.message).toContain('Must be 8-16 characters, include at least one lowercase letter');
      });
      it('with strong password, calls Accounts.resetPassword, when that fails rejects error when resetPassword fails and commits ENROLL_ACCOUNT_FAILED', async () => {
        const commit = jest.fn();
        const token = 'token';
        const newPassword = '1StrongPassword-';
        AccountsModule.Accounts.resetPassword = jest.fn((t, np, cb) => cb(mockError));
        let err;
        let result;
        try {
          result = await actions.enrollVerifyAccount({ commit }, { token, newPassword });
        } catch (e) {
          err = e;
        }
        expect(err).toBeDefined();
        expect(result).toBeUndefined();
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.ENROLL_ACCOUNT_FAILED, { error: expect.any(Error) });
        expect(AccountsModule.Accounts.resetPassword).toHaveBeenCalledWith(token, newPassword, expect.any(Function));
      });
      it('with strong password and reset password success, clears any error and resolves true', async () => {
        const commit = jest.fn();
        const token = 'token';
        const newPassword = '1StrongPassword-';
        AccountsModule.Accounts.resetPassword = jest.fn((t, np, cb) => cb(null));
        let err;
        let result;
        try {
          result = await actions.enrollVerifyAccount({ commit }, { token, newPassword });
        } catch (e) {
          err = e;
        }
        expect(err).toBeUndefined();
        expect(result).toEqual(true);
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE);
        expect(AccountsModule.Accounts.resetPassword).toHaveBeenCalledWith(token, newPassword, expect.any(Function));
      });
    });
    describe('clearEnrollAccoutnFailure', () => {
      it('clears enroll account failure', () => {
        const commit = jest.fn();
        actions.clearEnrollAccountFailure({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE);
      });
    });
    describe('loginUser', () => {
      it('calls Meteor.loginWithPassword with credentials, when login fails, rejects error and commits failure', async () => {
        const commit = jest.fn();
        MeteorModule.Meteor.loginWithPassword = jest.fn((u, p, cb) => cb(mockError));
        const username = 'chewbacca';
        const password = 'BowCaster83%';
        let err;
        let result;
        try {
          result = await actions.loginUser({ commit }, { username, password });
        } catch (e) {
          err = e;
        }
        expect(err).toBeDefined();
        expect(result).toBeUndefined();
        expect(MeteorModule.Meteor.loginWithPassword).toHaveBeenCalledWith(username, password, expect.any(Function));
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.LOGIN_FAILED, { error: mockError });
      });
      it('calls Meteor.loginWithPassword with credentials, when login succeeds, resolves true and clears error', async () => {
        const commit = jest.fn();
        MeteorModule.Meteor.loginWithPassword = jest.fn((u, p, cb) => cb(null));
        const username = 'chewbacca';
        const password = 'BowCaster83%';
        const result = await actions.loginUser({ commit }, { username, password });
        expect(result).toEqual(true);
        expect(MeteorModule.Meteor.loginWithPassword).toHaveBeenCalledWith(username, password, expect.any(Function));
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_LOGIN_FAILURE);
      });
    });
    describe('clearLoginFailure', () => {
      it('clears any login failure', () => {
        const commit = jest.fn();
        actions.clearLoginFailure({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_LOGIN_FAILURE);
      });
    });
    describe('setUser', () => {
      it('sets the provided user', () => {
        const commit = jest.fn();
        const user = { name: 'a' };
        actions.setUser({ commit }, { user });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.SET_USER, { user });
      });
    });
    describe('logoutUser', () => {
      it('calls Meteor.logout, when that fails, resolves error', async () => {
        let err;
        let result;
        MeteorModule.Meteor.logout = jest.fn((cb) => cb(mockError));
        try {
          result = await actions.logoutUser();
        } catch (e) {
          err = e;
        }
        expect(err).toBeDefined();
        expect(result).toBeUndefined();
      });
      it('calls Meteor.logout, when that succeeds, resolves true', async () => {
        MeteorModule.Meteor.logout = jest.fn((cb) => cb(null));
        const result = await actions.logoutUser();
        expect(result).toEqual(true);
      });
    });
    describe('sendPasswordResetEmail', () => {
      it('calls Accoutns.forgotPassword, when that fails, commits failure and rejects error', async () => {
        const commit = jest.fn();
        const email = 'someEmail@mail.com';
        let err;
        let result;
        AccountsModule.Accounts.forgotPassword = jest.fn(({ email }, cb) => cb(mockError));
        try {
          result = await actions.sendPasswordResetEmail({ commit }, { email });
        } catch (e) {
          err = e;
        }
        expect(err).toBeDefined();
        expect(result).toBeUndefined();
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.PASSWORD_RESET_FAILED, { error: mockError });
      });
      it('calls Accoutns.forgotPassword, when that succeeds, clears any error and resolves true', async () => {
        const commit = jest.fn();
        const email = 'someEmail@mail.com';
        AccountsModule.Accounts.forgotPassword = jest.fn(({ email }, cb) => cb(null));
        const result = await actions.sendPasswordResetEmail({ commit }, { email });
        expect(result).toEqual(true);
        expect(commit).toHaveBeenCalledTimes(2);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.PASSWORD_RESET_EMAIL_SENT);
      });
    });
    describe('passwordReset', () => {
      it('calls Accounts.resetPassword, when that failures, commits failure with error and rejects error', async () => {
        const commit = jest.fn();
        const token = 'someToken';
        const newPassword = '?ImAStrongPassword923!';
        let err;
        let result;
        AccountsModule.Accounts.resetPassword = jest.fn((t, np, cb) => cb(mockError));
        try {
          result = await actions.passwordReset({ commit }, { token, newPassword });
        } catch (e) {
          err = e;
        }
        expect(err).toBeDefined();
        expect(result).toBeUndefined();
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.PASSWORD_RESET_FAILED, { error: mockError });
      });
      it('calls Accounts.resetPassword, when that succeeds, clears error and resolves true', async () => {
        const commit = jest.fn();
        const token = 'someToken';
        const newPassword = '?ImAStrongPassword923!';
        AccountsModule.Accounts.resetPassword = jest.fn((t, np, cb) => cb(null));
        const result = await actions.passwordReset({ commit }, { token, newPassword });
        expect(result).toEqual(true);
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE);
      });
    });
    describe('clearPasswordResetFailure', () => {
      it('clears any password reset failure', () => {
        const commit = jest.fn();
        actions.clearPasswordResetFailure({ commit });
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE);
      });
    });
  });
  describe('mutations', () => {
    describe(MUTATION_TYPES.SET_USER, () => {
      it('stores user in state.user', () => {
        const state = { user: undefined };
        const user = { name: 'Anakin' };
        mutations[MUTATION_TYPES.SET_USER](state, { user });
        expect(state.user).toEqual(user);
      });
    });
    describe(MUTATION_TYPES.LOGIN_FAILED, () => {
      it('stores login failure on state.loginError', () => {
        const state = { loginError: undefined };
        const error = mockError;
        mutations[MUTATION_TYPES.LOGIN_FAILED](state, { error });
        expect(state.loginError).toEqual(error);
      });
    });
    describe(MUTATION_TYPES.CLEAR_LOGIN_FAILURE, () => {
      it('clears login error on state.loginError', () => {
        const state = { loginError: mockError };
        mutations[MUTATION_TYPES.CLEAR_LOGIN_FAILURE](state);
        expect(state.loginError).toEqual(undefined);
      });
    });
    describe(MUTATION_TYPES.REGISTER_FAILED, () => {
      it('stores register failure on state.registerError and sets  state.enrollAccountEmailSent to false', () => {
        const error = mockError;
        const state = {
          registerError: undefined,
          enrollAccountEmailSent: false
        };
        const expectedState = {
          registerError: error,
          enrollAccountEmailSent: false
        };
        mutations[MUTATION_TYPES.REGISTER_FAILED](state, { error });
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.CLEAR_REGISTER_FAILURE, () => {
      it('clears register error on state.registerError', () => {
        const error = mockError;
        const state = { registerError: error };
        const expectedState = { registerError: undefined };
        mutations[MUTATION_TYPES.CLEAR_REGISTER_FAILURE](state);
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.PASSWORD_RESET_EMAIL_SENT, () => {
      it('sets state.passwordResetEmailSent to true', () => {
        const state = { passwordResetEmailSent: false };
        const expectedState = { passwordResetEmailSent: true };
        mutations[MUTATION_TYPES.PASSWORD_RESET_EMAIL_SENT](state);
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.PASSWORD_RESET_FAILED, () => {
      it('stores error in state.passwordResetError', () => {
        const error = mockError;
        const state = { passwordResetError: undefined };
        const expectedState = { passwordResetError: error };
        mutations[MUTATION_TYPES.PASSWORD_RESET_FAILED](state, { error });
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE, () => {
      it('clears error in state.passwordResetError', () => {
        const state = { passwordResetError: mockError };
        const expectedState = { passwordResetError: undefined };
        mutations[MUTATION_TYPES.CLEAR_PASSWORD_RESET_FAILURE](state);
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.ENROLL_ACCOUNT_EMAIL_SENT, () => {
      it('sets state.enrollAccountEmailSent to true', () => {
        const state = { enrollAccountEmailSent: false };
        const expectedState = { enrollAccountEmailSent: true };
        mutations[MUTATION_TYPES.ENROLL_ACCOUNT_EMAIL_SENT](state);
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.ENROLL_ACCOUNT_FAILED, () => {
      it('stores error in state.enrollAccountError', () => {
        const error = mockError;
        const state = { enrollAccountError: undefined };
        const expectedState = { enrollAccountError: mockError };
        mutations[MUTATION_TYPES.ENROLL_ACCOUNT_FAILED](state, { error });
        expect(state).toEqual(expectedState);
      });
    });
    describe(MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE, () => {
      it('clears error in state.enrollAccountError', () => {
        const state = { enrollAccountError: mockError };
        const expectedState = { enrollAccountError: undefined };
        mutations[MUTATION_TYPES.CLEAR_ENROLL_ACCOUNT_FAILURE](state);
        expect(state).toEqual(expectedState);
      });
    });
  });
});
