import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

import { setupPasswordResetEmail } from '/src/imports/modules/accounts/server/email/password-reset-email';
import { setupEnrollAccountEmail } from '/src/imports/modules/accounts/server/email/enroll-account-email';
import { setupAccountsValidation } from '/src/imports/modules/accounts/server/lib/accounts-validation';

// fixture data for development
import '/src/imports/modules/accounts/server/fixtures/users-fixture';

// server-side of Meteor Publications must be imported
import { setupUsersAdminPublication } from '/src/imports/modules/accounts/server/publications/users-admin-publication';

// server-side of Meteor Methods must be imported
import '/src/imports/modules/accounts/shared/methods/create-unverified-user';
import '/src/imports/modules/accounts/shared/methods/check-user-global-role';
import '/src/imports/modules/accounts/shared/methods/get-users-with-roles';

Meteor.startup(() => {
  // configure the password reset email via the accounts-password package
  setupPasswordResetEmail();
  // configure the account enrollment email via the accounts-password package
  setupEnrollAccountEmail();

  // configure accounts validation via the accounts-password package
  setupAccountsValidation();

  // publications
  setupUsersAdminPublication();

  // enable Meteor.Error to be thrown for validation errors in from Meteor Methods
  SimpleSchema.defineValidationErrorTransform(error => {
    const ddpError = new Meteor.Error(error.message);
    ddpError.error = 'validation-error';
    ddpError.details = error.details;
    return ddpError;
  });
});
