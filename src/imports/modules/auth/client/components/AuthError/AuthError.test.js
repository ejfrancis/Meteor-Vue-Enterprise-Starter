import { mount } from 'avoriaz';
import AuthError from './AuthError.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('AuthError', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(AuthError, { store });
    expect(wrapper.find('.AuthError').length).toEqual(1);
  });

  it('displays nothing if no error if none provided', () => {
    const authState = {
      loginError: undefined,
      registerError: undefined,
      passwordResetError: undefined,
      enrollAccountError: undefined
    };
    store.state.auth = authState;
    const wrapper = mount(AuthError, { store });
    expect(wrapper.find('.error.login').length).toEqual(0);
    expect(wrapper.find('.error.register').length).toEqual(0);
    expect(wrapper.find('.error.password-reset').length).toEqual(0);
    expect(wrapper.find('.error.enroll').length).toEqual(0);
  });
  it('displays login error if present', () => {
    const authState = {
      loginError: new Error('login error')
    };
    store.state.auth = authState;
    const wrapper = mount(AuthError, { store });
    expect(wrapper.find('.error.login').length).toEqual(1);
    expect(wrapper.find('.error.register').length).toEqual(0);
    expect(wrapper.find('.error.password-reset').length).toEqual(0);
    expect(wrapper.find('.error.enroll').length).toEqual(0);
  });
  it('displays register error if present', () => {
    const authState = {
      registerError: new Error('register error')
    };
    store.state.auth = authState;
    const wrapper = mount(AuthError, { store });
    expect(wrapper.find('.error.login').length).toEqual(0);
    expect(wrapper.find('.error.register').length).toEqual(1);
    expect(wrapper.find('.error.password-reset').length).toEqual(0);
    expect(wrapper.find('.error.enroll').length).toEqual(0);
  });
  it('displays password reset error if present', () => {
    const authState = {
      passwordResetError: new Error('password  error')
    };
    store.state.auth = authState;
    const wrapper = mount(AuthError, { store });
    expect(wrapper.find('.error.login').length).toEqual(0);
    expect(wrapper.find('.error.register').length).toEqual(0);
    expect(wrapper.find('.error.password-reset').length).toEqual(1);
    expect(wrapper.find('.error.enroll').length).toEqual(0);
  });
  it('displays enroll account error if present', () => {
    const authState = {
      enrollAccountError: new Error('enroll account error')
    };
    store.state.auth = authState;
    const wrapper = mount(AuthError, { store });
    expect(wrapper.find('.error.login').length).toEqual(0);
    expect(wrapper.find('.error.register').length).toEqual(0);
    expect(wrapper.find('.error.password-reset').length).toEqual(0);
    expect(wrapper.find('.error.enroll').length).toEqual(1);
  });
});
