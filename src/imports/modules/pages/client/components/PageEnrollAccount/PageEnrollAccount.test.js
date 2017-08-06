import { mount } from 'avoriaz';
import { setupVue } from '/src/imports/startup/client/client-index';
import PageEnrollAccount from './PageEnrollAccount.vue';

describe('PageEnrollAccount', () => {
  let router;
  let store;
  beforeEach(() => {
    const setup = setupVue();
    router = setup.router;
    store = setup.store;
  });
  it('renders without crashing', () => {
    const wrapper = mount(PageEnrollAccount, { router, store });
    expect(wrapper.find('.PageEnrollAccount')).toBeDefined();
  });
});
