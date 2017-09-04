import { mount } from 'avoriaz';
import PageAccountsAdmin from './PageAccountsAdmin.vue';

describe('PageAccountsAdmin', () => {
  it('renders without crashing', () => {
    const wrapper = mount(PageBase);
    expect(wrapper.find('.PageAccountsAdmin')).toBeDefined();
  });
});
