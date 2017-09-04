import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { globalUserRoles } from './../../shared/constants/global-user-roles';

const requireAuth = (to, from, next) => {
  if (!Meteor.userId()) {
    next({
      path: 'sign-in',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
};

const requireAdmin = (to, from, next) => {
  if (!Meteor.userId()) {
    next({
      path: 'sign-in',
      query: { redirect: to.fullPath }
    });
  } else if (!Roles.userIsInRole(Meteor.userId(), [globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN], Roles.GLOBAL_Group)) {
    next({
      path: 'home'
    });
  } else {
    next();
  }
};

const requireNoAuth = (to, from, next) => {
  if (Meteor.userId()) {
    next({
      path: '/home'
    });
  } else {
    next();
  }
};

export {
  requireAuth,
  requireNoAuth,
  requireAdmin
};
