import VueRouter from 'vue-router';
import { requireAuth } from './require-auth';

const PageSignUpAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignUp.vue')
    .then(PageSignUp => resolve(PageSignUp.default));
};
const PageSignInAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageSignIn.vue')
    .then(PageSignIn => resolve(PageSignIn.default));
};
const PageResetPasswordAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageResetPassword.vue')
    .then(PageResetPassword => resolve(PageResetPassword.default));
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
    { path: '/sign-up', component: PageSignUpAsync },
    { path: '/sign-in', component: PageSignInAsync },
    { path: '/reset-password', component: PageResetPasswordAsync },
    { path: '/home', component: PageHomeAsync },
    { path: '/private', component: PagePrivateAsync, beforeEnter: requireAuth },
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
