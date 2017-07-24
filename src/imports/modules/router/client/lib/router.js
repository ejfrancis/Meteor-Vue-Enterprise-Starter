import VueRouter from 'vue-router';
import { requireAuth, requireNoAuth } from '/src/imports/modules/auth/client/lib/router-auth-hooks';

const PageSignUpAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignUp.vue')
    .then(PageSignUp => resolve(PageSignUp.default));
};
const PageSignInAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignIn.vue')
    .then(PageSignIn => resolve(PageSignIn.default));
};
const PagePasswordResetAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePasswordReset.vue')
    .then(PagePasswordReset => resolve(PagePasswordReset.default));
};
const PageEnrollAccountAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageEnrollAccount.vue')
    .then(PageEnrollAccount => resolve(PageEnrollAccount.default));
};
const PageHomeAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageHome.vue')
    .then((PageHome) => resolve(PageHome.default));
};
const PagePrivateAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePrivate.vue')
    .then(PagePrivate => resolve(PagePrivate.default));
};

const createRouter = () => {
  const routes = [
    { path: '/sign-up', name: 'sign-up', component: PageSignUpAsync, beforeEnter: requireNoAuth },
    { path: '/enroll-account', name: 'enroll-account', component: PageEnrollAccountAsync, beforeEnter: requireNoAuth },
    { path: '/sign-in', name: 'sign-in', component: PageSignInAsync, beforeEnter: requireNoAuth },
    { path: '/reset-password', name: 'reset-password', component: PagePasswordResetAsync, beforeEnter: requireNoAuth },
    { path: '/home', name: 'home', component: PageHomeAsync },
    { path: '/private', name: 'private', component: PagePrivateAsync, beforeEnter: requireAuth },
    { path: '/', component: PageHomeAsync }
  ];

  const router = new VueRouter({
    routes,
    mode: 'history'
  });

  return router;
};

export {
  createRouter
};
