import { mount } from 'avoriaz';
import SignUpBtn from './SignUpBtn.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('SignUpBtn', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });
  it('renders without crashing', () => {
    const wrapper = mount(SignUpBtn, { store, router });
    expect(wrapper.find('.SignUpBtn').length).toEqual(1);
  });
  it('pushes router to sign-up route when clicked', () => {
    const wrapper = mount(SignUpBtn, { store, router });
    wrapper.instance().$router.push = jest.fn();
    wrapper.find('.SignUpBtn button')[0].trigger('click');
    expect(wrapper.instance().$router.push).toHaveBeenCalledWith({ path: 'sign-up' });
  });
});
