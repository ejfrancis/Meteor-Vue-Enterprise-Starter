import { mount } from 'avoriaz';
import SignOutBtn from './SignOutBtn.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';

describe('SignOutBtn', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue().store;
    store = setup.store;
    router = setup.router;
  });
  it('renders without crashing', () => {
    const wrapper = mount(SignOutBtn, { store, router });
    expect(wrapper.find('.SignOutBtn').length).toEqual(1);
  });
  it('calls actions.auth.logoutUser when clicked', () => {
    const wrapper = mount(SignOutBtn, { store, router });
    const actions = getActions(wrapper);
    actions.auth.logoutUser = jest.fn();
    wrapper.find('.SignOutBtn')[0].trigger('click');
    expect(actions.auth.logoutUser).toHaveBeenCalledTimes(1);
  });
  // it('redirects to home when signed out', () => {
  //   const instance = Vue.extend()
  //   const $router = {
  //     push: jest.fn()
  //   };
  //   const wrapper = mount(SignOutBtn, {
  //     globals: { $router },
  //     instance
  //   });
  //   const actions = getActions(wrapper);
  //   actions.auth.logoutUser = jest.fn(() => {
  //     return new Promise((resolve, reject) => resolve(true));
  //   });
  //   wrapper.find('.SignOutBtn')[0].trigger('click');
  //   expect(actions.auth.logoutUser).toHaveBeenCalledTimes(1);
  //   expect($router.push).toHaveBeenCalledWith('/');
  // });
});
