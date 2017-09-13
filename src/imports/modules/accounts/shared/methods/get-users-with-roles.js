import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Roles } from 'meteor/alanning:roles';
import { globalUserRoles } from './../constants/global-user-roles';
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
    limit = 14
  } = {}) {
    if (!Roles.userIsInRole(Meteor.userId(), [globalUserRoles.SUPER_ADMIN, globalUserRoles.ADMIN], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error(403, 'Only admins can view users with roles.');
    }
    if (Meteor.isServer) {
      const maxPageSizeLimit = 14;
      const pageSize = limit > maxPageSizeLimit ? maxPageSizeLimit : limit;
      // start from page one
      const validatedStartIndex = startIndex < 0 ? 0 : startIndex;
      const usersWithRoles = Meteor.users.find({}, {
        sort: {
          'profile.lastName': 1
        },
        limit: pageSize,
        skip: validatedStartIndex
      }).fetch();
      const count = Meteor.users.find().count();
      return {
        usersWithRoles,
        count,
        pageSize
      };
    }
  }
});

export {
  getUsersWithRoles
};
