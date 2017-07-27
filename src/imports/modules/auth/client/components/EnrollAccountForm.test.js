import { mount } from 'avoriaz';
import EnrollAccountForm from './EnrollAccountForm.vue';
import { setupVue } from './../../../../startup/client/client-index';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';
import nextTick from 'timeout-as-promise';

describe('EnrollAccountForm', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(EnrollAccountForm, { store });
    expect(wrapper.find('.EnrollAccountForm').length).toEqual(1);
  });

  describe('enrolling', () => {
    it('doesn\'t display success message', () => {
      const routeState = {
        query: { success: false }
      };
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      expect(wrapper.find('.enrolled').length).toEqual(0);
      expect(wrapper.find('.enroll').length).toEqual(1);
    });
    it('disables submit button if both passwords not filled', () => {
      const routeState = {
        query: { success: false }
      };
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      const passwordInput1 = wrapper.find('.password-1 input')[0];
      const passwordInput2 = wrapper.find('.password-2 input')[0];
      const enrollSubmitBtn = wrapper.find('.enroll-password-form button')[0];

      passwordInput1.element.value = '';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '';
      passwordInput2.trigger('input');
      expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(true);

      passwordInput1.element.value = 'password';
      passwordInput1.trigger('input');
      passwordInput2.element.value = '';
      passwordInput2.trigger('input');
      expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(true);
    });
    it('enables submit button if both passwords filled and match', () => {
      const routeState = {
        query: { success: false }
      };
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      const passwordInput1 = wrapper.find('.password-1 input')[0];
      const passwordInput2 = wrapper.find('.password-2 input')[0];
      const enrollSubmitBtn = wrapper.find('.enroll-password-form button')[0];

      passwordInput1.element.value = 'password';
      passwordInput1.trigger('input');
      passwordInput2.element.value = 'password';
      passwordInput2.trigger('input');
      expect(enrollSubmitBtn.hasAttribute('disabled', 'disabled')).toEqual(false);
    });
    it('calls actions.auth.enrollVerifyAccount on submit', async () => {
      const routeState = {
        query: { token: 'fakeauthtoken' }
      };
      store.state.route = routeState;
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      const actions = getActions(wrapper);
      actions.auth.enrollVerifyAccount = jest.fn();

      const passwordInput1 = wrapper.find('.password-1 input')[0];
      const passwordInput2 = wrapper.find('.password-2 input')[0];
      const enrollSubmitBtn = wrapper.find('.enroll-password-form button')[0];

      passwordInput1.element.value = 'SomePassword2-';
      passwordInput1.trigger('input');
      passwordInput2.element.value = 'SomePassword2-';
      passwordInput2.trigger('input');
      enrollSubmitBtn.trigger('click');

      await nextTick();
      expect(actions.auth.enrollVerifyAccount).toHaveBeenCalledTimes(1);
      expect(actions.auth.enrollVerifyAccount).toHaveBeenCalledWith({ token: 'fakeauthtoken', newPassword: 'SomePassword2-' });
    });
  });
  describe('enrolled success', () => {
    it('displays success message if url param present', () => {
      const routeState = {
        query: { success: true }
      };
      store.state.route = routeState;
      const wrapper = mount(EnrollAccountForm, { store });
      expect(wrapper.find('.enrolled').length).toEqual(1);
      expect(wrapper.find('.enroll').length).toEqual(0);
    });
  });

  // it('displays nothing if no error if none provided', () => {
  //   const authState = {
  //     loginError: undefined,
  //     registerError: undefined,
  //     passwordResetError: undefined,
  //     enrollAccountError: undefined
  //   };
  //   store.state.auth = authState;
  //   const wrapper = mount(AuthError, { store });
  //   expect(wrapper.find('.error.login').length).toEqual(0);
  //   expect(wrapper.find('.error.register').length).toEqual(0);
  //   expect(wrapper.find('.error.password-reset').length).toEqual(0);
  //   expect(wrapper.find('.error.enroll').length).toEqual(0);
  // });
  // it('displays login error if present', () => {
  //   const authState = {
  //     loginError: new Error('login error')
  //   };
  //   store.state.auth = authState;
  //   const wrapper = mount(AuthError, { store });
  //   expect(wrapper.find('.error.login').length).toEqual(1);
  //   expect(wrapper.find('.error.register').length).toEqual(0);
  //   expect(wrapper.find('.error.password-reset').length).toEqual(0);
  //   expect(wrapper.find('.error.enroll').length).toEqual(0);
  // });
  // it('displays register error if present', () => {
  //   const authState = {
  //     registerError: new Error('register error')
  //   };
  //   store.state.auth = authState;
  //   const wrapper = mount(AuthError, { store });
  //   expect(wrapper.find('.error.login').length).toEqual(0);
  //   expect(wrapper.find('.error.register').length).toEqual(1);
  //   expect(wrapper.find('.error.password-reset').length).toEqual(0);
  //   expect(wrapper.find('.error.enroll').length).toEqual(0);
  // });
  // it('displays password reset error if present', () => {
  //   const authState = {
  //     passwordResetError: new Error('password  error')
  //   };
  //   store.state.auth = authState;
  //   const wrapper = mount(AuthError, { store });
  //   expect(wrapper.find('.error.login').length).toEqual(0);
  //   expect(wrapper.find('.error.register').length).toEqual(0);
  //   expect(wrapper.find('.error.password-reset').length).toEqual(1);
  //   expect(wrapper.find('.error.enroll').length).toEqual(0);
  // });
  // it('displays enroll account error if present', () => {
  //   const authState = {
  //     enrollAccountError: new Error('enroll account error')
  //   };
  //   store.state.auth = authState;
  //   const wrapper = mount(AuthError, { store });
  //   expect(wrapper.find('.error.login').length).toEqual(0);
  //   expect(wrapper.find('.error.register').length).toEqual(0);
  //   expect(wrapper.find('.error.password-reset').length).toEqual(0);
  //   expect(wrapper.find('.error.enroll').length).toEqual(1);
  // });
});
