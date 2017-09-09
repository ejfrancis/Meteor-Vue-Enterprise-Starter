import { mount } from 'avoriaz';
import AccountsAdminUsersList from './AccountsAdminUsersList.vue';

describe('AccountsAdminUsersList', () => {
  it('renders without crashing', () => {
    const wrapper = mount(AccountsAdminUsersList);
    expect(wrapper.find('.AccountsAdminUsersList').length).toEqual(1);
  });
});
