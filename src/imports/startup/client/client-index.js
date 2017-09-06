import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import { VuexAltPlugin } from 'vuex-alt';
import VueMeteorTracker from 'vue-meteor-tracker';
import iView from 'meteor/efrancis:iview';
// import locale from 'meteor/efrancis:iview/dist/locale/en-US';

import { createRouter as createRouterOriginal } from './../../modules/router/client/lib/router';
import { createStore as createStoreOriginal } from './../../modules/store/client/lib/store';
import App from './App.vue';

// import { getUsersWithRoles } from '/src/imports/modules/accounts/shared/methods/get-users-with-roles';
// console.log('---calling getUsersWithRoles');
// getUsersWithRoles.callPromise({ startIndex: 0 })
//   .then((res) => {
//     console.log('---res=');
//     res.map((user) => console.log(user._id, user.emails[0].address));
//   })
//   .catch((e) => {
//     console.error('---e=', e);
//   });
// getUsersWithRoles.callPromise({
//   startIndex: 2
// })
//   .then((res) => {
//     console.log('---res2 =');
//     res.map((user) => console.log(user._id, user.emails[0].address));
//   })
//   .catch((e) => {
//     console.error('---e2 =', e);
//   });

// iView responsive show/hide directives. keeping these here for now.
Vue.directive('hidden-xs', {
  inserted: (el) => {
    el.className += ' hidden-xs';
  }
});
Vue.directive('hidden-sm', {
  inserted: (el) => {
    el.className += ' hidden-sm';
  }
});
Vue.directive('hidden-md', {
  inserted: (el) => {
    el.className += ' hidden-md';
  }
});
Vue.directive('hidden-lg', {
  inserted: (el) => {
    el.className += ' hidden-lg';
  }
});

/**
 * Export the setup of Vue, and allow overriding of the store and
 * router factory functions. Mostly for unit tests.
 * @param {Object} params
 * @param {Function} [params.createStore]     optional, function that returns a configured Vuex store
 * @param {Function} [params.createRouter]           optional, function that returns a configured VueRouter appInstance
 */
export const setupVue = ({
  createStore = createStoreOriginal,
  createRouter = createRouterOriginal
 } = {}) => {
  Vue.use(VueRouter);                 // router
  Vue.use(Vuex);                      // global state management (similar to Redux)
  Vue.use(VueMeteorTracker);          // Meteor Tracker integration
  Vue.use(iView);

  const store = createStore();        // vuex store
  const router = createRouter();      // vue-router instance

  Vue.use(VuexAltPlugin, { store });  // alternative mapActions() and mapGetters() for vuex

  sync(store, router);
  return { store, router };
};

// client application startup
Meteor.startup(() => {
  const { store, router } = setupVue();
  const appInstance = new Vue({
    render: h => h(App),
    router,
    store
  });
  // mounting will cause error in tests from missing #app
  if (process.env.NODE_ENV !== 'test') {
    appInstance.$mount('#app');
  }
});
