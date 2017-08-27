import { mount } from 'avoriaz';
import LayoutMobile from './LayoutMobile.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('LayoutMobile', () => {
  let store;
  let router;

  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });

  it('renders without crashing', () => {
    const wrapper = mount(LayoutMobile, { store, router });
    expect(wrapper.find('.LayoutMobile').length).toEqual(1);
  });
});
