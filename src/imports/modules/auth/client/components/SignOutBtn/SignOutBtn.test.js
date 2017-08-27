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
    wrapper.find('.SignOutBtn button')[0].trigger('click');
    expect(actions.auth.logoutUser).toHaveBeenCalledTimes(1);
  });
});
