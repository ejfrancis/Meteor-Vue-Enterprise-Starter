import { mount } from 'avoriaz';
import { setupVue } from '/src/imports/startup/client/client-index';
import PageSignUp from './PageSignUp.vue';

describe('PageSignUp', () => {
  let router;
  let store;
  beforeEach(() => {
    const setup = setupVue();
    router = setup.router;
    store = setup.store;
  });
  it('renders without crashing', () => {
    const wrapper = mount(PageSignUp, { router, store });
    expect(wrapper.find('.PageSignUp')).toBeDefined();
  });
});
