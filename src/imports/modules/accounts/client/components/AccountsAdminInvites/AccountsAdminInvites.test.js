import { mount } from 'avoriaz';
import AccountsAdminInvites from './AccountsAdminInvites.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('AccountsAdminInvites', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(AccountsAdminInvites, { store });
    expect(wrapper.find('.AccountsAdminInvites').length).toEqual(1);
  });
});
