import { mount } from 'avoriaz';
import PagePrivate from './PagePrivate.vue';

describe('PagePrivate', () => {
  it('renders without crashing', () => {
    const wrapper = mount(PagePrivate);
    expect(wrapper.find('.PagePrivate')).toBeDefined();
  });
});
