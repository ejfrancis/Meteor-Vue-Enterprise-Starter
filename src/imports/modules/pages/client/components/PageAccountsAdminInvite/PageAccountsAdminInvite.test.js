import { shallow } from 'avoriaz';
import PageAccountsAdminInvite from './PageAccountsAdminInvite.vue';

describe('PageAccountsAdminInvite', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(PageAccountsAdminInvite);
    expect(wrapper.find('.PageAccountsAdminInvite')).toBeDefined();
  });
});
