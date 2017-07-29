import { mount } from 'avoriaz';
import SignInBtn from './SignInBtn.vue';
import { setupVue } from './../../../../startup/client/client-index';

describe('SignInBtn', () => {
  let store;
  beforeEach(() => {
    store = setupVue().store;
  });
  it('renders without crashing', () => {
    mount(SignInBtn, { store });
  });
});
