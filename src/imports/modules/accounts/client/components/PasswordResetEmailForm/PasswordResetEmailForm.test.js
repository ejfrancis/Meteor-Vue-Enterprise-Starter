import { mount } from 'avoriaz';
import PasswordResetEmailForm from './PasswordResetEmailForm.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';
import nextTick from 'timeout-as-promise';

const getEmailInput = (wrapper) => wrapper.find('.email input')[0];
const getSubmitBtn = (wrapper) => wrapper.find('.password-reset-email-submit-btn')[0];
const isDisabled = (el) => el.hasAttribute('disabled', 'disabled');

describe('PasswordResetEmailForm', () => {
  let store;
  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(PasswordResetEmailForm, { store });
    expect(wrapper.find('.PasswordResetEmailForm').length).toEqual(1);
  });
  describe('submit button', () => {
    it('disables submit if email is empty', async () => {
      const wrapper = mount(PasswordResetEmailForm, { store });
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      emailInput.element.value = '';
      emailInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('disables submit if email is filled with invalid email address', async () => {
      const wrapper = mount(PasswordResetEmailForm, { store });
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      emailInput.element.value = 'something';
      emailInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('enables submit if email is filled with a valid email address', async () => {
      const wrapper = mount(PasswordResetEmailForm, { store });
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      emailInput.element.value = 'something@mail.com';
      emailInput.trigger('input');
      await nextTick();
      expect(isDisabled(submitBtn)).toEqual(false);
    });
  });
  it('calls actions.accounts.sendPasswordResetEmail when submitted', () => {
    const wrapper = mount(PasswordResetEmailForm, { store });
    const emailInput = getEmailInput(wrapper);
    const submitBtn = getSubmitBtn(wrapper);
    const actions = getActions(wrapper);
    actions.accounts.sendPasswordResetEmail = jest.fn();
    emailInput.element.value = 'somemail@mail.com';
    emailInput.trigger('input');
    submitBtn.trigger('click');
    expect(actions.accounts.sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(actions.accounts.sendPasswordResetEmail).toHaveBeenCalledWith({ email: 'somemail@mail.com' });
  });
  describe('sent success', () => {
    it('displays sent message if sent', async () => {
      const accountsState = {
        passwordResetEmailSent: true
      };
      store.state.accounts = accountsState;
      const wrapper = mount(PasswordResetEmailForm, { store });
      wrapper.instance().$Message.success = jest.fn();
      wrapper.instance().$Message.error = jest.fn();
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      const actions = getActions(wrapper);
      actions.accounts.sendPasswordResetEmail = jest.fn(async () => true);
      emailInput.element.value = 'somemail@mail.com';
      emailInput.trigger('input');
      submitBtn.trigger('click');
      await nextTick();
      expect(wrapper.instance().$Message.success).toHaveBeenCalledTimes(1);
      expect(wrapper.instance().$Message.error).toHaveBeenCalledTimes(0);
    });
  });
  describe('sent failed', () => {
    it('displays failure message if failed to send', async () => {
      const accountsState = {
        passwordResetEmailSent: true
      };
      store.state.accounts = accountsState;
      const wrapper = mount(PasswordResetEmailForm, { store });
      wrapper.instance().$Message.error = jest.fn();
      wrapper.instance().$Message.success = jest.fn();
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      const actions = getActions(wrapper);
      actions.accounts.sendPasswordResetEmail = jest.fn(async () => {
        throw new Error('oh no');
      });
      emailInput.element.value = 'somemail@mail.com';
      emailInput.trigger('input');
      submitBtn.trigger('click');
      await nextTick();
      expect(wrapper.instance().$Message.success).toHaveBeenCalledTimes(0);
      expect(wrapper.instance().$Message.error).toHaveBeenCalledTimes(1);
    });
  });
  it('clears password reset error when destroyed', () => {
    const wrapper = mount(PasswordResetEmailForm, { store });
    const actions = getActions(wrapper);
    actions.accounts.clearPasswordResetFailure = jest.fn();
    wrapper.destroy();
    expect(actions.accounts.clearPasswordResetFailure).toHaveBeenCalledTimes(1);
  });
});
