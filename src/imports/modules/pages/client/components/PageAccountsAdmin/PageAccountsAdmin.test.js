import { shallow } from 'avoriaz';
import PageAccountsAdmin from './PageAccountsAdmin.vue';

describe('PageAccountsAdmin', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(PageAccountsAdmin);
    expect(wrapper.find('.PageAccountsAdmin')).toBeDefined();
  });
});
