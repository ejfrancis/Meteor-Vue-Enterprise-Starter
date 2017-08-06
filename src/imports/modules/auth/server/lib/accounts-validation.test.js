import * as AccountsModule from 'meteor/accounts-base';
import { setupAccountsValidation } from './accounts-validation';

describe('accounts-validation', () => {
  it('sets validateNewUser and validateLoginAttempt', () => {
    AccountsModule.Accounts.validateNewUser = jest.fn();
    AccountsModule.Accounts.validateLoginAttempt = jest.fn();
    setupAccountsValidation();
    expect(AccountsModule.Accounts.validateNewUser).toHaveBeenCalledTimes(1);
    expect(AccountsModule.Accounts.validateLoginAttempt).toHaveBeenCalledTimes(1);
  });
});
