import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

const createUnverifiedUser = new ValidatedMethod({
  name: 'Auth.createUnverifiedUser',
  validate: new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    }
  }).validator(),
  run ({ email, firstName, lastName }) {
    // want to create a user without a password, and let them set it after verifying their email
    // Accounts.createUser only accepts password-less if on the server
    if (Meteor.isServer) {
      const userId = Accounts.createUser({
        email,
        profile: {
          firstName,
          lastName
        }
      });
      Accounts.sendEnrollmentEmail(userId);
    }
  }
});

export {
  createUnverifiedUser
};
