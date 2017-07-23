import { Accounts } from 'meteor/accounts-base';
import { userSchema } from './../../shared/schemas/user-schema';

const setupAccountsValidation = () => {
  Accounts.validateNewUser((user) => {
    try {
      userSchema.validate(user);
      return true;
    } catch (e) {
      throw e;
    }
  });
};

export {
  setupAccountsValidation
};
