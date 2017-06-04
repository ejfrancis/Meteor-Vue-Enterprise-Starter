import { mount } from 'avoriaz';
import Counter from './Counter.vue';

describe('Counter', () => {
  it('renders without crashing', () => {
    const wrapper = mount(Counter);
    expect(wrapper.find('.Counter').length).toEqual(1);
  });
});
