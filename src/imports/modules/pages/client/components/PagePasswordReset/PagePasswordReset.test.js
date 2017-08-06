import { mount } from 'avoriaz';
import { setupVue } from '/src/imports/startup/client/client-index';
import PagePasswordReset from './PagePasswordReset.vue';

describe('PagePasswordReset', () => {
  let router;
  let store;
  beforeEach(() => {
    const setup = setupVue();
    router = setup.router;
    store = setup.store;
  });
  it('renders without crashing', () => {
    const wrapper = mount(PagePasswordReset, { router, store });
    expect(wrapper.find('.PagePasswordReset')).toBeDefined();
  });
});
