import { mount } from 'avoriaz';
import PasswordResetEmailForm from './PasswordResetEmailForm.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';

const getEmailInput = (wrapper) => wrapper.find('.email input')[0];
const getSubmitBtn = (wrapper) => wrapper.find('.submit-form-btn')[0];
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
    it('disables submit if email is empty', () => {
      const wrapper = mount(PasswordResetEmailForm, { store });
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      emailInput.element.value = '';
      emailInput.trigger('input');
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('enables submit if email is not empty', () => {
      const wrapper = mount(PasswordResetEmailForm, { store });
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      emailInput.element.value = 'something';
      emailInput.trigger('input');
      expect(isDisabled(submitBtn)).toEqual(false);
    });
  });
  it('calls actions.auth.sendPasswordResetEmail when submitted', () => {
    const wrapper = mount(PasswordResetEmailForm, { store });
    const emailInput = getEmailInput(wrapper);
    const submitBtn = getSubmitBtn(wrapper);
    const actions = getActions(wrapper);
    actions.auth.sendPasswordResetEmail = jest.fn();
    emailInput.element.value = 'somemail@mail.com';
    emailInput.trigger('input');
    submitBtn.trigger('click');
    expect(actions.auth.sendPasswordResetEmail).toHaveBeenCalledTimes(1);
    expect(actions.auth.sendPasswordResetEmail).toHaveBeenCalledWith({ email: 'somemail@mail.com' });
  });
  describe('sent success', () => {
    it('doesn\'t dislay sent message if not snet', () => {
      const authState = {
        passwordResetEmailSent: false
      };
      store.state.auth = authState;
      const wrapper = mount(PasswordResetEmailForm, { store });
      expect(wrapper.find('.sent-success').length).toEqual(0);
    });
    it('displays sent message if sent', () => {
      const authState = {
        passwordResetEmailSent: true
      };
      store.state.auth = authState;
      const wrapper = mount(PasswordResetEmailForm, { store });
      expect(wrapper.find('.sent-success').length).toEqual(1);
    });
  });
  it('clears password reset error when destroyed', () => {
    const wrapper = mount(PasswordResetEmailForm, { store });
    const actions = getActions(wrapper);
    actions.auth.clearPasswordResetFailure = jest.fn();
    wrapper.destroy();
    expect(actions.auth.clearPasswordResetFailure).toHaveBeenCalledTimes(1);
  });
});
