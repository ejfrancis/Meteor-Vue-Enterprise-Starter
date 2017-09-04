import { Meteor } from 'meteor/meteor';
import { globalUserRoles } from './../../shared/constants/global-user-roles';
import { checkUserGlobalRole } from './../../shared/methods/check-user-global-role';

const requireAuth = (to, from, next) => {
  if (!Meteor.userId()) {
    next({
      name: 'sign-in',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
};

const requireAdmin = (to, from, next) => {
  if (!Meteor.userId()) {
    return next({
      name: 'sign-in',
      query: { redirect: to.fullPath }
    });
  }
  checkUserGlobalRole.call({ roles: [ globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN ] }, (err, isUserAdmin) => {
    if (err) {
      // if error checking permissinos, but user is logged in, send them to home
      return next({
        name: 'home'
      });
    }
    // if user is admin, they're good to go through
    if (isUserAdmin) {
      return next();
    }
    // user is logged in but not admin, send them to home
    return next({
      name: 'home'
    });
  });
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
