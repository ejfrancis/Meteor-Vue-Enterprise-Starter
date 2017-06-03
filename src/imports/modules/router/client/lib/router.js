import VueRouter from 'vue-router';

const PageHomeAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageHome.vue')
    .then((PageHome) => resolve(PageHome.default));
};
const PageAboutAsync = (resolve) => {
  import('/src/imports/modules/pages/client/components/PageAbout.vue')
    .then(PageAbout => resolve(PageAbout.default));
};

const createRouter = () => {
  const routes = [
    { path: '/', component: PageHomeAsync },
    { path: '/home', component: PageHomeAsync },
    { path: '/about', component: PageAboutAsync }
  ];

  const router = new VueRouter({
    routes
  });

  return router;
};

export {
  createRouter
};
