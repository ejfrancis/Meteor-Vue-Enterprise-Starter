import { shallow } from 'avoriaz';
import PageAccountsAdminInvites from './PageAccountsAdminInvites.vue';

describe('PageAccountsAdminInvites', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(PageAccountsAdminInvites);
    expect(wrapper.find('.PageAccountsAdminInvites')).toBeDefined();
  });
});
