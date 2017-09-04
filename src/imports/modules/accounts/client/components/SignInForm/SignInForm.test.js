import { mount } from 'avoriaz';
import SignInForm from './SignInForm.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';
import nextTick from 'timeout-as-promise';

const getUsernameInput = (wrapper) => wrapper.find('.email input')[0];
const getPasswordInput = (wrapper) => wrapper.find('.password input')[0];
const getSubmitBtn = (wrapper) => wrapper.find('.sign-in-submit-btn')[0];
const isDisabled = (el) => el.hasAttribute('disabled', 'disabled');

describe('SignInForm', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });
  it('renders without crashing', () => {
    mount(SignInForm, { store, router });
  });
  describe('submit btn', () => {
    it('disables submit if username empty and password empty', async () => {
      const routeState = {
        query: { redirect: 'redirect-path' }
      };
      store.state.route = routeState;
      const wrapper = mount(SignInForm, { store, router });
      const usernameInput = getUsernameInput(wrapper);
      const passwordInput = getPasswordInput(wrapper);
      const submitBn = getSubmitBtn(wrapper);
      usernameInput.element.value = '';
      usernameInput.trigger('input');
      passwordInput.element.value = '';
      passwordInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBn)).toEqual(true);
    });
    it('disables submit if username empty and password filled', async () => {
      const wrapper = mount(SignInForm, { store, router });
      const usernameInput = getUsernameInput(wrapper);
      const passwordInput = getPasswordInput(wrapper);
      const submitBn = getSubmitBtn(wrapper);
      usernameInput.element.value = '';
      usernameInput.trigger('input');
      passwordInput.element.value = 'password';
      passwordInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBn)).toEqual(true);
    });
    it('disables submit if username filled and password empty', async () => {
      const wrapper = mount(SignInForm, { store, router });
      const usernameInput = getUsernameInput(wrapper);
      const passwordInput = getPasswordInput(wrapper);
      const submitBn = getSubmitBtn(wrapper);
      usernameInput.element.value = 'chewbacca@kashyyyk.com';
      usernameInput.trigger('input');
      passwordInput.element.value = '';
      passwordInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBn)).toEqual(true);
    });
    it('enables submit if username filled and password filled', async () => {
      const wrapper = mount(SignInForm, { store, router });
      const usernameInput = getUsernameInput(wrapper);
      const passwordInput = getPasswordInput(wrapper);
      const submitBn = getSubmitBtn(wrapper);
      usernameInput.element.value = 'chewbacca@kashyyyk.com';
      usernameInput.trigger('input');
      passwordInput.element.value = 'password';
      passwordInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBn)).toEqual(false);
    });
  });
  it('calls actions.accounts.clearLoginFailure() when destroyed', () => {
    const wrapper = mount(SignInForm, { store, router });
    const actions = getActions(wrapper);
    actions.accounts.clearLoginFailure = jest.fn();
    wrapper.destroy();
    expect(actions.accounts.clearLoginFailure).toHaveBeenCalledTimes(1);
  });
  it('calls actions.accounts.loginUser() when submitted', () => {
    const wrapper = mount(SignInForm, { store, router });
    const usernameInput = getUsernameInput(wrapper);
    const passwordInput = getPasswordInput(wrapper);
    const submitBn = getSubmitBtn(wrapper);
    const actions = getActions(wrapper);
    actions.accounts.loginUser = jest.fn();
    usernameInput.element.value = 'username';
    usernameInput.trigger('input');
    passwordInput.element.value = 'password';
    passwordInput.trigger('input');
    submitBn.trigger('click');
    expect(actions.accounts.loginUser).toHaveBeenCalledTimes(1);
    expect(actions.accounts.loginUser).toHaveBeenCalledWith({ username: 'username', password: 'password' });
  });
});
