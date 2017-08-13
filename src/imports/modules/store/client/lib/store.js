import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';

// vuex store modules
import { counterStoreModule } from '/src/imports/modules/counter/client/state/counter-store';
import { authStoreModule } from '/src/imports/modules/auth/client/state/auth-store';
import { layoutStoreModule } from '/src/imports/modules/layout/client/state/layout-store';

const plugins = [];

if (['production', 'test'].indexOf(process.env.NODE_ENV) === -1) {
  plugins.push(createLogger());
}

const createStore = () => {
  const store = new Store({
    plugins,
    modules: {
      counter: counterStoreModule,
      auth: authStoreModule,
      layout: layoutStoreModule
    }
  });
  return store;
};

export {
  createStore
};
