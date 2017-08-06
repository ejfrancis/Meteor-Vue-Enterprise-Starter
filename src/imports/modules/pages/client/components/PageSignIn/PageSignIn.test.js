import { mount } from 'avoriaz';
import { setupVue } from '/src/imports/startup/client/client-index';
import PageSignIn from './PageSignIn.vue';

describe('PageSignIn', () => {
  let router;
  let store;
  beforeEach(() => {
    const setup = setupVue();
    router = setup.router;
    store = setup.store;
  });
  it('renders without crashing', () => {
    const wrapper = mount(PageSignIn, { router, store });
    expect(wrapper.find('.PageSignIn')).toBeDefined();
  });
});
