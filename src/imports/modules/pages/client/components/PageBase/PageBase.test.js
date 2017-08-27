import { mount } from 'avoriaz';
import PageBase from './PageBase.vue';

describe('PageBase', () => {
  it('renders without crashing', () => {
    const wrapper = mount(PageBase);
    expect(wrapper.find('.PageBase')).toBeDefined();
  });
});
