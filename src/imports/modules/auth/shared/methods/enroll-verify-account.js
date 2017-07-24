import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';
import passwordSchema from './../schemas/password-schema';

const enrollVerifyAccount = new ValidatedMethod({
  name: 'Auth.enrollVerifyAccount',
  validate: new SimpleSchema({
    token: {
      type: String,
      required: true
    },
    newPassword: {
      type: passwordSchema,
      required: true
    }
  }).validator(),
  run ({ token, newPassword }) {
    if (Meteor.isServer) {
      // set initial password
      console.log('--setting password');
      Accounts.resetPassword(token, newPassword);
      // verify email address since they followed the enrollment link
      console.log('--verifying email');
      Accounts.verifyEmail(token);
    }
  }
});

export {
  enrollVerifyAccount
};
