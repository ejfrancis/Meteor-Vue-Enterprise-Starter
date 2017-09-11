import { Meteor } from 'meteor/meteor';
// import { Tracker } from 'meteor/tracker';
import iView from 'iview';
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

const requireAdmin = async (to, from, next) => {
  if (!Meteor.userId()) {
    return next({
      name: 'sign-in',
      query: { redirect: to.fullPath }
    });
  }
  try {
    console.log('--calling meteor method');
    const isUserAdmin = await checkUserGlobalRole.callPromise({ roles: [ globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN ] });
    // if user is admin, they're good to go through
    if (isUserAdmin) {
      return next();
    }
    // user is logged in but not admin, send them to home and make sure router loading animation finishes
    iView.LoadingBar.finish();
    return next({
      name: 'home'
    });
  } catch (e) {
    // if error checking permissinns, but user is logged in, send them to home
    return next({
      name: 'home'
    });
  }
};

const requireNoAuth = (to, from, next) => {
  if (Meteor.userId()) {
    next({
      name: 'home'
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
