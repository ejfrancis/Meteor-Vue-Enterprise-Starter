import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { globalUserRoles } from './../../shared/constants/global-user-roles';
import { adminInvitesCollection } from './../../shared/collections/admin-invites-collection';
import { accountsPublicationNames } from './../../shared/constants/accounts-publication-names';

const setupUsersAdminPublication = () => {
  console.log('Publishing usersAdmin collection');
  Meteor.publish(accountsPublicationNames.USERS_ADMIN, function () {
    let isAdmin = Roles.userIsInRole(this.userId, [globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_Group);

    if (isAdmin) {
      return [
        Meteor.users.find({}, { fields: { 'emails.address': 1, 'roles': 1 } }),
        adminInvitesCollection.find({}, { fields: { 'email': 1, 'role': 1, 'date': 1 } })
      ];
    } else {
      return null;
    }
  });
};

export {
  setupUsersAdminPublication
};
