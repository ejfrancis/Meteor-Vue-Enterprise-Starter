import { Store } from 'vuex';
import createLogger from 'vuex/dist/logger';

// vuex store modules
import { counterStoreModule } from '/src/imports/modules/counter/client/state/counter-store';
import { accountsStoreModule } from '/src/imports/modules/accounts/client/state/accounts-store';
import { layoutStoreModule } from '/src/imports/modules/layout/client/state/layout-store';

const plugins = [];
// make store available to be imorted (shouldn't be necessary in most places, it's available in components via this)
let store;

if (['production', 'test'].indexOf(process.env.NODE_ENV) === -1) {
  plugins.push(createLogger());
}

const createStore = () => {
  const newStore = new Store({
    plugins,
    modules: {
      counter: counterStoreModule,
      accounts: accountsStoreModule,
      layout: layoutStoreModule
    }
  });
  store = newStore;
  return newStore;
};

export {
  createStore,
  store
};
