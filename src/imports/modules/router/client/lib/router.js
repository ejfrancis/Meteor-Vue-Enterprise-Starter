import VueRouter from 'vue-router';

import PageHome from './../../../pages/client/components/PageHome.vue';
import PageAbout from './../../../pages/client/components/PageAbout.vue';

const createRouter = () => {
  const routes = [
    { path: '/', component: PageHome },
    { path: '/home', component: PageHome },
    { path: '/about', component: PageAbout }
  ];

  const router = new VueRouter({
    routes
  });

  return router;
};

export {
  createRouter
};
