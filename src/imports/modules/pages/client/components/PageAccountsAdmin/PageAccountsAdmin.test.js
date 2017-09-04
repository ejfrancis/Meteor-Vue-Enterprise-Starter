import { mount } from 'avoriaz';
import PageAccountsAdmin from './PageAccountsAdmin.vue';

describe('PageAccountsAdmin', () => {
  it('renders without crashing', () => {
    const wrapper = mount(PageAccountsAdmin);
    expect(wrapper.find('.PageAccountsAdmin')).toBeDefined();
  });
});
