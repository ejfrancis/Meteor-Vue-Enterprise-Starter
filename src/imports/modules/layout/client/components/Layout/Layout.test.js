import { mount } from 'avoriaz';
import Layout from './Layout.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';

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
  it('shows mobile layout when media matches', () => {
    store.state.layout.isMobileNavVisible = false;
    const wrapper = mount(Layout, { store, router });
    const actions = getActions(wrapper);
    actions.layout.showMobileNav = jest.fn();
    actions.layout.showLargeNav = jest.fn();
    wrapper.vm.handleEnterMobile();
    expect(actions.layout.showMobileNav).toHaveBeenCalledTimes(1);
    expect(actions.layout.showLargeNav).toHaveBeenCalledTimes(0);
  });
  it('shows large layout when media matches', () => {
    store.state.layout.isMobileNavVisible = true;
    const wrapper = mount(Layout, { store, router });
    const actions = getActions(wrapper);
    actions.layout.showMobileNav = jest.fn();
    actions.layout.showLargeNav = jest.fn();
    wrapper.vm.handleEnterLarge();
    expect(actions.layout.showMobileNav).toHaveBeenCalledTimes(0);
    expect(actions.layout.showLargeNav).toHaveBeenCalledTimes(1);
  });
});
