import { mount } from 'avoriaz';
import PasswordResetForm from './PasswordResetForm.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';
import nextTick from 'timeout-as-promise';

const getPasswordInput1 = (wrapper) => wrapper.find('.password-1 input')[0];
const getPasswordInput2 = (wrapper) => wrapper.find('.password-2 input')[0];
const getSubmitBtn = (wrapper) => wrapper.find('.password-reset-submit-btn')[0];
const isDisabled = (el) => el.hasAttribute('disabled', 'disabled');

describe('PasswordResetEmailForm', () => {
  let store;
  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(PasswordResetForm, { store });
    expect(wrapper.find('.PasswordResetForm').length).toEqual(1);
  });
  describe('submit button', () => {
    it('disables submit if one password empty', async () => {
      const wrapper = mount(PasswordResetForm, { store });
      const passwordInput1 = getPasswordInput1(wrapper);
      const passwordInput2 = getPasswordInput2(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      passwordInput1.element.value = 'somepass';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '';
      passwordInput2.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('disables submit if both passwords filled but don\'t match', async () => {
      const wrapper = mount(PasswordResetForm, { store });
      const passwordInput1 = getPasswordInput1(wrapper);
      const passwordInput2 = getPasswordInput2(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      passwordInput1.element.value = 'somepass';
      passwordInput1.trigger('input');
      passwordInput2.element.value = 'anotherpass';
      passwordInput2.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('disables submit if both passwords filled and match but not strong enough', async () => {
      const wrapper = mount(PasswordResetForm, { store });
      const passwordInput1 = getPasswordInput1(wrapper);
      const passwordInput2 = getPasswordInput2(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      passwordInput1.element.value = 'anotherpass';
      passwordInput1.trigger('input');
      passwordInput2.element.value = 'anotherpass';
      passwordInput2.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('enables submit if both passwords filled, match, and are strong enough', async () => {
      const wrapper = mount(PasswordResetForm, { store });
      const passwordInput1 = getPasswordInput1(wrapper);
      const passwordInput2 = getPasswordInput2(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      passwordInput1.element.value = '!SomePassword8';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '!SomePassword8';
      passwordInput2.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(false);
    });
  });
  describe('submit action', () => {
    it('calls actions.accounts.passwordReset when submitted', () => {
      const routeState = {
        query: { token: 'kyber' }
      };
      store.state.route = routeState;
      const wrapper = mount(PasswordResetForm, { store });
      const passwordInput1 = getPasswordInput1(wrapper);
      const passwordInput2 = getPasswordInput2(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      const actions = getActions(wrapper);
      actions.accounts.passwordReset = jest.fn();
      passwordInput1.element.value = '!SomePassword8';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '!SomePassword8';
      passwordInput2.trigger('input');
      submitBtn.trigger('click');
      expect(actions.accounts.passwordReset).toHaveBeenCalledTimes(1);
      expect(actions.accounts.passwordReset).toHaveBeenCalledWith({ token: 'kyber', newPassword: '!SomePassword8' });
    });
  });
  it('clears password reset error when destroyed', () => {
    const wrapper = mount(PasswordResetForm, { store });
    const actions = getActions(wrapper);
    actions.accounts.clearPasswordResetFailure = jest.fn();
    wrapper.destroy();
    expect(actions.accounts.clearPasswordResetFailure).toHaveBeenCalledTimes(1);
  });
});
