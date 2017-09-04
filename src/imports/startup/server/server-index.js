import { Meteor } from 'meteor/meteor';
import { setupPasswordResetEmail } from '/src/imports/modules/accounts/server/email/password-reset-email';
import { setupEnrollAccountEmail } from '/src/imports/modules/accounts/server/email/enroll-account-email';
import { setupAccountsValidation } from '/src/imports/modules/accounts/server/lib/accounts-validation';
import SimpleSchema from 'simpl-schema';

// server-side of Meteor Methods must be imported
import '/src/imports/modules/accounts/shared/methods/create-unverified-user';

Meteor.startup(() => {
  // configure the password reset email via the accounts-password package
  setupPasswordResetEmail();
  // configure the account enrollment email via the accounts-password package
  setupEnrollAccountEmail();

  // configure accounts validation via the accounts-password package
  setupAccountsValidation();

  // enable Meteor.Error to be thrown for validation errors in from Meteor Methods
  SimpleSchema.defineValidationErrorTransform(error => {
    const ddpError = new Meteor.Error(error.message);
    ddpError.error = 'validation-error';
    ddpError.details = error.details;
    return ddpError;
  });
});
