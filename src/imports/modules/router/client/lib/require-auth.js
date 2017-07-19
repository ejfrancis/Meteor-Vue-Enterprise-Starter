import { Meteor } from 'meteor/meteor';

const requireAuth = (to, from, next) => {
  if (!Meteor.user()) {
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
};

export {
  requireAuth
};
