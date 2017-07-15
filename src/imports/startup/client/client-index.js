import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';

import { createRouter } from './../../modules/router/client/lib/router';
import { createStore } from './../../modules/store/client/lib/store';
import { VuexAltPlugin } from 'vuex-alt';
import App from './App.vue';

Meteor.startup(() => {
  // Vue middleware
  Vue.use(VueRouter);
  Vue.use(Vuex);

  const store = createStore();
  const router = createRouter();

  Vue.use(VuexAltPlugin, { store });

  sync(store, router);

  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app');
});
