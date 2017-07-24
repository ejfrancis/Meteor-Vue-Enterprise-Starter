import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

const setupEnrollAccountEmail = () => {
  Accounts.emailTemplates.enrollAccount.from = () => `${Meteor.settings.public.accounts.emails.fromAddress}`;
  Accounts.emailTemplates.enrollAccount.subject = () => `Welcome to ${Meteor.settings.public.siteName}!`;
  Accounts.emailTemplates.enrollAccount.text = (user, url) => `Hello ${user.username},

You're almost done setting up your account with ${Meteor.settings.public.siteName}! To complete the process, please click the link below.

${url.replace('#/', '').replace('enroll-account/', 'enroll-account?token=')}

Your token is: ${url.substring(url.lastIndexOf('/') + 1, url.length)}

Thank you,
${Meteor.settings.public.siteName}
`;
};

export {
  setupEnrollAccountEmail
};
