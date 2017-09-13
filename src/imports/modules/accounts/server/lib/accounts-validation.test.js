import { Meteor } from 'meteor/meteor';
import { setupAccountsValidation } from './accounts-validation';
import * as AccountsModule from 'meteor/accounts-base';
import * as userSchemaModule from './../../shared/schemas/user-schema';

const mockError = new Error('no bueno');

describe('accounts-validation', () => {
  it('sets validateNewUser and validateLoginAttempt', () => {
    AccountsModule.Accounts.validateNewUser = jest.fn();
    AccountsModule.Accounts.validateLoginAttempt = jest.fn();
    setupAccountsValidation();
    expect(AccountsModule.Accounts.validateNewUser).toHaveBeenCalledTimes(1);
    expect(AccountsModule.Accounts.validateLoginAttempt).toHaveBeenCalledTimes(1);
  });
  describe('validateNewUser', () => {
    it('throws error to rejects new user if it doesn\'t pass userSchema validation', () => {
      let validateNewUserFn;
      userSchemaModule.userSchema.validate = () => {
        throw mockError;
      };
      AccountsModule.Accounts.validateNewUser = (validateMethod) => {
        validateNewUserFn = validateMethod;
      };
      const badUser = {
        _id: 'abc'
      };
      setupAccountsValidation();
      let res;
      let err;
      try {
        res = validateNewUserFn(badUser);
      } catch (e) {
        err = e;
      }
      expect(res).toBeUndefined();
      expect(err).toEqual(mockError);
    });
    it('returns true to accept new user if it passes userSchema validation', () => {
      let validateNewUserFn;
      userSchemaModule.userSchema.validate = () => { };
      AccountsModule.Accounts.validateNewUser = (validateMethod) => {
        validateNewUserFn = validateMethod;
      };
      const badUser = {
        _id: 'abc'
      };
      setupAccountsValidation();
      let res;
      let err;
      try {
        res = validateNewUserFn(badUser);
      } catch (e) {
        err = e;
      }
      expect(res).toEqual(true);
      expect(err).toBeUndefined();
    });
  });
  describe('validateLoginAttempt', () => {
    it('returns false to invalidate login if login attempted failed (allowed = false)', () => {
      let validateLoginAttemptFn;
      AccountsModule.Accounts.validateLoginAttempt = (validateMethod) => {
        validateLoginAttemptFn = validateMethod;
      };
      setupAccountsValidation();
      let res;
      let err;
      try {
        res = validateLoginAttemptFn({
          allowed: false
        });
      } catch (e) {
        err = e;
      }
      expect(res).toEqual(false);
      expect(err).toBeUndefined();
    });
    it('returns true to validate login if user has verified their email', () => {
      let validateLoginAttemptFn;
      AccountsModule.Accounts.validateLoginAttempt = (validateMethod) => {
        validateLoginAttemptFn = validateMethod;
      };
      setupAccountsValidation();
      let res;
      let err;
      try {
        res = validateLoginAttemptFn({
          allowed: true,
          user: {
            emails: [
              {
                address: 'ohhai@recode.com',
                verified: true
              }
            ]
          }
        });
      } catch (e) {
        err = e;
      }
      expect(res).toEqual(true);
      expect(err).toBeUndefined();
    });
    it('returns true to validate login if user has verified their email', () => {
      let validateLoginAttemptFn;
      AccountsModule.Accounts.validateLoginAttempt = (validateMethod) => {
        validateLoginAttemptFn = validateMethod;
      };
      setupAccountsValidation();
      let res;
      let err;
      try {
        res = validateLoginAttemptFn({
          allowed: true,
          user: {
            emails: [
              {
                address: 'ohhai@recode.com',
                verified: false
              }
            ]
          }
        });
      } catch (e) {
        err = e;
      }
      expect(res).toBeUndefined();
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(Meteor.Error);
    });
  });
});
