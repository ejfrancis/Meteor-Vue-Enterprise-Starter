import { mount } from 'avoriaz';
import Layout from './Layout.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('Layout', () => {
  let store;
  let router;

  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });

  it('renders without crashing', () => {
    const wrapper = mount(Layout, { store, router });
    expect(wrapper.find('.Layout').length).toEqual(1);
  });
});
