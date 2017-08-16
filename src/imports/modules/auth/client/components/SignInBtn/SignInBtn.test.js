import { mount } from 'avoriaz';
import SignInBtn from './SignInBtn.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('SignInBtn', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });
  it('renders without crashing', () => {
    mount(SignInBtn, { store, router });
  });
  it('pushes router to sign-up route when clicked', () => {
    const wrapper = mount(SignInBtn, { store, router });
    wrapper.instance().$router.push = jest.fn();
    wrapper.find('.SignInBtn button')[0].trigger('click');
    expect(wrapper.instance().$router.push).toHaveBeenCalledWith({ path: 'sign-in' });
  });
});
