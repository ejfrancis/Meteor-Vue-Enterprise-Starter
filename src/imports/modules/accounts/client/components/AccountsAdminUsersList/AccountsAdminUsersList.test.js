import { mount } from 'avoriaz';
import AccountsAdminUsersList from './AccountsAdminUsersList.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('AccountsAdminUsersList', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });
  it('renders without crashing', () => {
    const wrapper = mount(AccountsAdminUsersList, { store });
    expect(wrapper.find('.AccountsAdminUsersList').length).toEqual(1);
  });
});
