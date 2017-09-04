import * as MeteorModule from 'meteor/meteor';
import * as AccountsModule from 'meteor/accounts-base';
import { setupPasswordResetEmail } from './password-reset-email';

describe('password-reset-email', () => {
  it('sets email template "from" to Meteor.settings.public.accounts.email.fromAddress', () => {
    const settings = {
      public: {
        accounts: {
          emails: {
            fromAddress: 'accounts@myap.com'
          }
        }
      }
    };
    const Accounts = {
      emailTemplates: {
        resetPassword: {}
      }
    };
    AccountsModule.Accounts = Accounts;
    MeteorModule.Meteor.settings = settings;
    setupPasswordResetEmail();
    expect(Accounts.emailTemplates.resetPassword.from()).toEqual(settings.public.accounts.emails.fromAddress);
  });
  it('sets email template "subject" using Meteor.settings.public.accounts.siteName', () => {
    const settings = {
      public: {
        siteName: 'MilleniumFalcon'
      }
    };
    const Accounts = {
      emailTemplates: {
        resetPassword: {}
      }
    };
    AccountsModule.Accounts = Accounts;
    MeteorModule.Meteor.settings = settings;
    setupPasswordResetEmail();
    expect(
      Accounts.emailTemplates.resetPassword.subject().indexOf(settings.public.siteName) !== -1
    ).toEqual(true);
  });
  it('sets email body which contains users name', () => {
    const settings = {
      public: {
        siteName: 'MilleniumFalcon'
      }
    };
    const Accounts = {
      emailTemplates: {
        resetPassword: {}
      }
    };
    const user = { username: 'ObiWan' };
    const url = 'http://go.com';
    AccountsModule.Accounts = Accounts;
    MeteorModule.Meteor.settings = settings;
    setupPasswordResetEmail();
    expect(
      Accounts.emailTemplates.resetPassword.text(user, url).indexOf(user.username) !== -1
    ).toEqual(true);
  });
});
