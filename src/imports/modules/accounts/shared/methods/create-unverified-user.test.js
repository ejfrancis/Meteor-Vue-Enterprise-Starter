import { createUnverifiedUser } from './create-unverified-user';
import * as MeteorModule from 'meteor/meteor';
import * as AccountsModule from 'meteor/accounts-base';

describe('create-unverified-user', () => {
  it('does nothing if not run on server', () => {
    const email = 'invalidemail';
    const firstName = 'Leia';
    const lastName = 'Organa';
    AccountsModule.Accounts.createUser = jest.fn();
    AccountsModule.Accounts.sendEnrollmentEmail = jest.fn();
    MeteorModule.Meteor.isServer = false;
    createUnverifiedUser.call({ email, firstName, lastName });
    expect(AccountsModule.Accounts.createUser).toHaveBeenCalledTimes(0);
    expect(AccountsModule.Accounts.sendEnrollmentEmail).toHaveBeenCalledTimes(0);
  });
  it('validation requires a real email, and string firstName and lastName', () => {
    const email = 'invalidemail';
    const firstName = 'Leia';
    const lastName = 'Organa';
    AccountsModule.Accounts.createUser = jest.fn(() => 'userid');
    AccountsModule.Accounts.sendEnrollmentEmail = jest.fn();
    MeteorModule.Meteor.isServer = true;
    createUnverifiedUser.call({ email, firstName, lastName });
    expect(AccountsModule.Accounts.createUser).toHaveBeenCalledWith({
      email,
      profile: {
        firstName,
        lastName
      }
    });
    expect(AccountsModule.Accounts.sendEnrollmentEmail).toHaveBeenCalledWith('userid');
  });
});
