import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
// import { Roles } from 'meteor/alanning:roles';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

const getUsersWithRoles = new ValidatedMethod({
  name: 'Accounts.getUsersWithRoles',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    startIndex: { type: Number, required: true },
    limit: { type: Number, required: false }
  }).validator(),
  run ({
    startIndex = 0,
    limit = 20
  } = {}) {
    if (Meteor.isServer) {
      console.log('----getUsersWithRoles() called');
      const maxPageSizeLimit = 2;
      const pageSize = limit > maxPageSizeLimit ? maxPageSizeLimit : limit;
      // if (!startingUserId) {
      console.log('---finding meteor.users.find()');
      // start from page one
      return Meteor.users.find({}, {
        sort: { 'emails.0.address': 1 },
        limit: pageSize,
        skip: startIndex
      }).fetch();
    }
  }
});

export {
  getUsersWithRoles
};
