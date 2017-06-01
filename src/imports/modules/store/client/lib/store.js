import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';

import { counterStoreModule } from './../../../counter/client/state/counter-store.js';

const createStore = () => {
  const store = new Store({
    plugins: [
      createLogger()
    ],
    modules: {
      counter: counterStoreModule
    }
  });
  return store;
}

export {
  createStore
};