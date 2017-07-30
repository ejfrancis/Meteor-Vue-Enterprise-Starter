import { mount } from 'avoriaz';
import SignInBtn from './SignInBtn.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('SignInBtn', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });
  it('renders without crashing', () => {
    mount(SignInBtn, { store, router });
  });
});
