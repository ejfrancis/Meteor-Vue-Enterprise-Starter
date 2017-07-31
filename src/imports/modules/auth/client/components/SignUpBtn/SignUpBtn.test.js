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
});
