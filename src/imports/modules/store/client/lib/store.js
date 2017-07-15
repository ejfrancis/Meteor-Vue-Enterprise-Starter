import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';

import { counterStoreModule } from './../../../counter/client/state/counter-store.js';

const plugins = [];
if (['production', 'test'].indexOf(process.env.NODE_ENV) === -1) {
  plugins.push(createLogger());
}

const createStore = () => {
  const store = new Store({
    plugins,
    modules: {
      counter: counterStoreModule
    }
  });
  return store;
};

export {
  createStore
};
