import { mount } from 'avoriaz';
import SignUpForm from './SignUpForm.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';

const getFirstNameInput = (wrapper) => wrapper.find('.first-name input')[0];
const getLastNameInput = (wrapper) => wrapper.find('.last-name input')[0];
const getEmailInput = (wrapper) => wrapper.find('.email input')[0];
const getSuccessMessage = (wrapper) => wrapper.find('.success')[0];
const getSubmitBtn = (wrapper) => wrapper.find('.sign-up-submit-btn')[0];
const isDisabled = (el) => el.hasAttribute('disabled', 'disabled');

describe('SignUpForm', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });
  it('renders without crashing', () => {
    mount(SignUpForm, { store, router });
  });
  describe('submit btn', () => {
    it('disables submit if all inputs are empty', () => {
      const wrapper = mount(SignUpForm, { store, router });
      const firstNameInput = getFirstNameInput(wrapper);
      const lastNameInput = getLastNameInput(wrapper);
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      firstNameInput.element.value = '';
      firstNameInput.trigger('input');
      lastNameInput.element.value = '';
      lastNameInput.trigger('input');
      emailInput.element.value = '';
      emailInput.trigger('input');
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('disables submit if one input is empty', () => {
      const wrapper = mount(SignUpForm, { store, router });
      const firstNameInput = getFirstNameInput(wrapper);
      const lastNameInput = getLastNameInput(wrapper);
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      firstNameInput.element.value = '';
      firstNameInput.trigger('input');
      lastNameInput.element.value = '';
      lastNameInput.trigger('input');
      emailInput.element.value = 'mail@mail.com';
      emailInput.trigger('input');
      expect(isDisabled(submitBtn)).toEqual(true);
    });
    it('enables submit if all inputs are filled', () => {
      const wrapper = mount(SignUpForm, { store, router });
      const firstNameInput = getFirstNameInput(wrapper);
      const lastNameInput = getLastNameInput(wrapper);
      const emailInput = getEmailInput(wrapper);
      const submitBtn = getSubmitBtn(wrapper);
      firstNameInput.element.value = 'first';
      firstNameInput.trigger('input');
      lastNameInput.element.value = 'last';
      lastNameInput.trigger('input');
      emailInput.element.value = 'mail@mail.com';
      emailInput.trigger('input');
      expect(isDisabled(submitBtn)).toEqual(false);
    });
  });
  it('calls actions.auth.registerUser when submitted ', () => {
    const wrapper = mount(SignUpForm, { store, router });
    const actions = getActions(wrapper);
    actions.auth.registerUser = jest.fn();
    const firstNameInput = getFirstNameInput(wrapper);
    const lastNameInput = getLastNameInput(wrapper);
    const emailInput = getEmailInput(wrapper);
    const submitBtn = getSubmitBtn(wrapper);
    firstNameInput.element.value = 'first';
    firstNameInput.trigger('input');
    lastNameInput.element.value = 'last';
    lastNameInput.trigger('input');
    emailInput.element.value = 'mail@mail.com';
    emailInput.trigger('input');
    submitBtn.trigger('click');
    expect(actions.auth.registerUser).toHaveBeenCalledWith({
      firstName: 'first',
      lastName: 'last',
      email: 'mail@mail.com'
    });
  });
  it('calls actions.auth.clearRegisterFailure() when destroyed', () => {
    const wrapper = mount(SignUpForm, { store, router });
    const actions = getActions(wrapper);
    actions.auth.clearRegisterFailure = jest.fn();
    wrapper.destroy();
    expect(actions.auth.clearRegisterFailure).toHaveBeenCalledTimes(1);
  });
  describe('success message', () => {
    it('displays success message if enroll email sent', () => {
      const authState = {
        enrollAccountEmailSent: true
      };
      store.state.auth = authState;
      const wrapper = mount(SignUpForm, { store, router });
      expect(getSuccessMessage(wrapper)).toBeDefined();
    });
    it('doesn\'t display success message if enroll email sent', () => {
      const authState = {
        enrollAccountEmailSent: false
      };
      store.state.auth = authState;
      const wrapper = mount(SignUpForm, { store, router });
      expect(getSuccessMessage(wrapper)).toBeUndefined();
    });
  });
});
