import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const setUpAuthEmails = () => {
  Accounts.emailTemplates.resetPassword.from = () => 'someemail@test.com';
  Accounts.emailTemplates.resetPassword.subject = () => `Password reset for ${Meteor.settings.public.siteName}`;
  Accounts.emailTemplates.resetPassword.text = (user, url) => `Hello ${user.username},

A password reset has been requested for your account on ${Meteor.settings.public.siteName}. To continue resetting your password please click the following link:

${url.replace('#/', '')}

If you didn't request to change your password, please ignore this email. If it keeps happening, please contact us.

Thank you.
`;
};

export {
  setUpAuthEmails
};
