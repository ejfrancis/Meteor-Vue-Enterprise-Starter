import { mount } from 'avoriaz';
import { setupVue } from '/src/imports/startup/client/client-index';

import PageHome from './PageHome.vue';
let router;
let store;
beforeEach(() => {
  const setup = setupVue();
  router = setup.router;
  store = setup.store;
});
describe('PageHome', () => {
  it('renders without crashing', () => {
    const wrapper = mount(PageHome, { router, store });
    expect(wrapper.find('.PageHome')).toBeDefined();
  });
});
