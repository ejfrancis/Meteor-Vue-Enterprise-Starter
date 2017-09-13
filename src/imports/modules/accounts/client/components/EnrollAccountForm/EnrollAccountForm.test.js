import { mount } from 'avoriaz';
import EnrollAccountForm from './EnrollAccountForm.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';
import nextTick from 'timeout-as-promise';

const getPassword1 = (wrapper) => wrapper.find('.password-1 input')[0];
const getPassword1Error = (wrapper) => wrapper.find('.password-1 .ivu-form-item-error-tip')[0];
const getPassword2 = (wrapper) => wrapper.find('.password-2 input')[0];
const getPassword2Error = (wrapper) => wrapper.find('.password-2 .ivu-form-item-error-tip')[0];
const getSubmitBtn = (wrapper) => wrapper.find('button.enroll-account-submit-btn')[0];
const isDisabled = (el) => el.hasAttribute('disabled', 'disabled');

describe('EnrollAccountForm', () => {
  let store;
  let router;

  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });

  it('renders without crashing', () => {
    const wrapper = mount(EnrollAccountForm, { store });
    expect(wrapper.find('.EnrollAccountForm').length).toEqual(1);
  });

  describe('enrolling', () => {
    it('disables submit button if both passwords not filled', async () => {
      const routeState = {
        query: { success: false }
      };
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      const passwordInput1 = getPassword1(wrapper);
      const passwordInput2 = getPassword2(wrapper);
      const enrollSubmitBtn = getSubmitBtn(wrapper);
      passwordInput1.element.value = '';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '';
      passwordInput2.trigger('input');
      await nextTick();
      expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(true);
      passwordInput1.element.value = 'password';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '';
      passwordInput2.trigger('input');
      await nextTick();
      expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(true);
    });
    describe('password validation', () => {
      it('disables submit button and displays error if password 1 contains "password"', async () => {
        const routeState = {
          query: { success: false }
        };
        store.state.route = routeState;
        const wrapper = mount(EnrollAccountForm, { store });
        const passwordInput1 = getPassword1(wrapper);
        const enrollSubmitBtn = getSubmitBtn(wrapper);
        passwordInput1.element.value = 'SomePassword1-';
        passwordInput1.trigger('input');
        await nextTick();
        expect(isDisabled(enrollSubmitBtn)).toEqual(true);
        expect(getPassword1Error(wrapper).text()).toContain('Cannot contain the word "password"');
      });
      it('disables submit button and displays error if password 2 contains "password"', async () => {
        const routeState = {
          query: { success: false }
        };
        store.state.route = routeState;
        const wrapper = mount(EnrollAccountForm, { store });
        const passwordInput2 = getPassword2(wrapper);
        const enrollSubmitBtn = getSubmitBtn(wrapper);
        passwordInput2.element.value = 'SomePassword1-';
        passwordInput2.trigger('input');
        await nextTick();
        expect(isDisabled(enrollSubmitBtn)).toEqual(true);
        expect(getPassword2Error(wrapper).text()).toContain('Cannot contain the word "password"');
      });
      it('displays error if password 1 doesn\'t pass schema validation', async () => {
        const routeState = {
          query: { success: false }
        };
        store.state.route = routeState;
        const wrapper = mount(EnrollAccountForm, { store });
        const passwordInput1 = getPassword1(wrapper);
        const enrollSubmitBtn = getSubmitBtn(wrapper);
        passwordInput1.element.value = 'weakpassword';
        passwordInput1.trigger('input');
        await nextTick();
        expect(isDisabled(enrollSubmitBtn)).toEqual(true);
        expect(getPassword1Error(wrapper).text()).toContain('Cannot contain the word "password"');
      });
      it('disables submit button if both passwords filled, match, but don\'t pass schema validation', async () => {
        const routeState = {
          query: { success: false }
        };
        store.state.route = routeState;
        const wrapper = mount(EnrollAccountForm, { store });
        const passwordInput1 = getPassword1(wrapper);
        const passwordInput2 = getPassword2(wrapper);
        const enrollSubmitBtn = getSubmitBtn(wrapper);
        passwordInput1.element.value = 'starlord';
        passwordInput1.trigger('input');
        passwordInput2.element.value = 'starlord';
        passwordInput2.trigger('input');
        await nextTick();
        expect(isDisabled(enrollSubmitBtn)).toEqual(true);
        expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(true);
      });
      it('enables submit button if both passwords filled, match, and pass schema validation', async () => {
        const routeState = {
          query: { success: false }
        };
        store.state.route = routeState;
        const wrapper = mount(EnrollAccountForm, { store });
        const passwordInput1 = getPassword1(wrapper);
        const passwordInput2 = getPassword2(wrapper);
        const enrollSubmitBtn = getSubmitBtn(wrapper);
        passwordInput1.element.value = 'SomePassword1-';
        passwordInput1.trigger('input');
        passwordInput2.element.value = 'SomePassword1-';
        passwordInput2.trigger('input');
        await nextTick();
        expect(isDisabled(enrollSubmitBtn)).toEqual(false);
        expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(false);
      });
    });
    describe('submit', () => {
      it('calls actions.accounts.enrollVerifyAccount on submit', async () => {
        const routeState = {
          query: { token: 'fakeaccountstoken' }
        };
        store.state.route = routeState;
        const wrapper = mount(EnrollAccountForm, { store });
        const actions = getActions(wrapper);
        actions.accounts.enrollVerifyAccount = jest.fn();
        const passwordInput1 = getPassword1(wrapper);
        const passwordInput2 = getPassword2(wrapper);
        const enrollSubmitBtn = getSubmitBtn(wrapper);
        passwordInput1.element.value = 'SomePassword2-';
        passwordInput1.trigger('input');
        passwordInput2.element.value = 'SomePassword2-';
        passwordInput2.trigger('input');
        enrollSubmitBtn.trigger('click');
        await nextTick();
        expect(actions.accounts.enrollVerifyAccount).toHaveBeenCalledTimes(1);
        expect(actions.accounts.enrollVerifyAccount).toHaveBeenCalledWith({ token: 'fakeaccountstoken', newPassword: 'SomePassword2-' });
      });
    });
    it('clears enrollment error when destroyed', () => {
      const routeState = {
        query: { token: 'fakeaccountstoken' }
      };
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      const actions = getActions(wrapper);
      actions.accounts.clearEnrollAccountFailure = jest.fn();
      wrapper.destroy();
      expect(actions.accounts.clearEnrollAccountFailure).toHaveBeenCalledTimes(1);
    });
    it('starts with password hidden', async () => {
      const wrapper = mount(EnrollAccountForm, { store });
      const password1 = getPassword1(wrapper);
      const password2 = getPassword2(wrapper);
      expect(password1.hasAttribute('type', 'password')).toEqual(true);
      expect(password2.hasAttribute('type', 'password')).toEqual(true);
    });
  });
  describe('enrolled success', () => {
    it('displays success message if url param present', () => {
      store.state.route.query.success = true;
      const wrapper = mount(EnrollAccountForm, { store });
      expect(wrapper.find('.enrolled').length).toEqual(1);
      expect(wrapper.find('.enroll').length).toEqual(0);
    });
    it('redirects to home when "Go to Home" button is clicked', () => {
      store.state.route.query.success = true;
      const wrapper = mount(EnrollAccountForm, { store, router });
      wrapper.instance().$router.push = jest.fn();
      wrapper.find('button.enroll-account-complete-btn')[0].trigger('click');
      expect(wrapper.instance().$router.push).toHaveBeenCalledWith('/');
    });
  });
  describe('destroyed', () => {
    it('redirects to home when "Go to Home" button is clicked', () => {
      const wrapper = mount(EnrollAccountForm, { store, router });
      const actions = getActions(wrapper);
      actions.accounts.clearEnrollAccountFailure = jest.fn();
      wrapper.destroy();
      expect(actions.accounts.clearEnrollAccountFailure).toHaveBeenCalledTimes(1);
    });
  });
});
