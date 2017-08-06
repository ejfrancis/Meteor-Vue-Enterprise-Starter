import { Meteor } from 'meteor/meteor';

const requireAuth = (to, from, next) => {
  if (!Meteor.userId()) {
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath }
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
  requireNoAuth
};
