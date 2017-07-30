import VueRouter from 'vue-router';
import { requireAuth, requireNoAuth } from '/src/imports/modules/auth/client/lib/router-auth-hooks';

// unfortunate hack for now. jest is using babel-plugin-dynamic-import-node
// which resolves as "module" not "module.default"
const getModule = (mod) => {
  if (process.env.NODE_ENV === 'test') {
    return mod;
  }
  return mod.default;
};

const PageSignUpAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignUp/PageSignUp.vue')
    .then(PageSignUp => resolve(getModule(PageSignUp)));
};
const PageSignInAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignIn/PageSignIn.vue')
    .then(PageSignIn => resolve(getModule(PageSignIn)));
};
const PagePasswordResetAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePasswordReset/PagePasswordReset.vue')
    .then(PagePasswordReset => resolve(getModule(PagePasswordReset)));
};
const PageEnrollAccountAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageEnrollAccount/PageEnrollAccount.vue')
    .then(PageEnrollAccount => resolve(getModule(PageEnrollAccount)));
};
const PageHomeAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageHome/PageHome.vue')
    .then((PageHome) => resolve(getModule(PageHome)));
};
const PagePrivateAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PagePrivate/PagePrivate.vue')
    .then(PagePrivate => resolve(getModule(PagePrivate)));
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
