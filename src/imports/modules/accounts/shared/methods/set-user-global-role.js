import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Roles } from 'meteor/alanning:roles';
import SimpleSchema from 'simpl-schema';
import { globalUserRoles } from './../constants/global-user-roles';

const setUserGlobalRole = new ValidatedMethod({
  name: 'Accounts.setUserGlobalRole',
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    userId: { type: String, required: true },
    role: { type: String, required: true }
  }).validator(),
  run ({ userId, role }) {
    if (Meteor.isServer) {
      // only allow admins or super admins to modify roles
      if (!Roles.userIsInRole(Meteor.userId(), [globalUserRoles.SUPER_ADMIN, globalUserRoles.ADMIN], Roles.GLOBAL_GROUP)) {
        throw new Meteor.Error(403, 'Only admins can modify a users global role.');
      }
      // only allow super admins to set others to super admin
      if (role === globalUserRoles.SUPER_ADMIN && !Roles.userIsInRole(Meteor.userId(), [globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_GROUP)) {
        throw new Meteor.Error(403, 'Only super admins can set others users as super admins.');
      }
      // dont allow super admins to remove themselves from super admin
      if (userId === Meteor.userId() && Roles.userIsInRole(Meteor.userId(), [globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_GROUP)) {
        throw new Meteor.Error(403, 'Super admins cannot remove themselves from super admin role.');
      }
      // only allow super admins to downgrade admins out of their admin status
      if (
        // if the user being modified is currently an admin or super admin
        Roles.userIsInRole(userId, [globalUserRoles.SUPER_ADMIN, globalUserRoles.ADMIN], Roles.GLOBAL_GROUP) &&
        // and they're being downgraded to below admin or super admin
        [globalUserRoles.SUPER_ADMIN, globalUserRoles.ADMIN].indexOf(role) === -1 &&
        // and the user making the change is not a super admin
        !Roles.userIsInRole(Meteor.userId(), [globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_GROUP)
        ) {
        throw new Meteor.Error(403, 'Only super admins can downgrade admins out of their admin status.');
      }
      console.log('--starting user.roles:', Meteor.user().roles);
      console.log('adding user ' + userId + ' to role ' + role + ' in group ' + Roles.GLOBAL_GROUP);
      Roles.setUserRoles(userId, [role], Roles.GLOBAL_GROUP);
      console.log('--update user.roles:', Meteor.user().roles);
      return true;
    }
  }
});

export {
  setUserGlobalRole
};
