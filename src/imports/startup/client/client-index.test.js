import { setupVue } from './client-index';
import VueRouter from 'vue-router';
import * as routerModule from './../../modules/router/client/lib/router';
import * as storeModule from './../../modules/store/client/lib/store';

describe('client-index', () => {
  afterEach(() => {
    jest.resetModules();
  });
  it('creates store and router', () => {
    routerModule.createRouter = jest.fn(() => {
      return {
        currentRoute: '/',
        afterEach: () => null
      };
    });
    storeModule.createStore = jest.fn(() => {
      return {
        registerModule: () => null,
        watch: () => null
      };
    });
    const { store, router } = setupVue(VueRouter);
    expect(routerModule.createRouter).toHaveBeenCalledTimes(1);
    expect(storeModule.createStore).toHaveBeenCalledTimes(1);
    expect(store).toBeDefined();
    expect(router).toBeDefined();
  });
});
