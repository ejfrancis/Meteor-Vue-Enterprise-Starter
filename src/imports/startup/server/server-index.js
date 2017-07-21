import { Meteor } from 'meteor/meteor';
import { setUpAuthEmails } from '/src/imports/modules/auth/server/lib/setup-auth-emails';

Meteor.startup(() => {
  setUpAuthEmails();
});
