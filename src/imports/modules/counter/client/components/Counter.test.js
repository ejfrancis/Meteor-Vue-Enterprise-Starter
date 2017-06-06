import { mount } from 'avoriaz';
import Counter from './Counter.vue';
import { setupVue } from './../../../../startup/client/client-index';

describe('Counter', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(Counter, { store });
    expect(wrapper.find('.Counter').length).toEqual(1);
  });
  it('renders with count 0 initially', () => {
    const wrapper = mount(Counter, { store });
    expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(0);
  });
  describe('increment', () => {
    it('adds to count when Increment is clicked', () => {
      const wrapper = mount(Counter, { store });
      const incrementInput = wrapper.find('.increment input')[0];
      incrementInput.element.value = 2;
      incrementInput.dispatch('input');
      wrapper.find('.increment button')[0].dispatch('click');
      expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(2);
    });
  });
  describe('decrement', () => {
    it('subtracts from count when Decrement is clicked', () => {
      const wrapper = mount(Counter, { store });
      const decrementInput = wrapper.find('.increment input')[0];
      decrementInput.element.value = -2;
      decrementInput.dispatch('input');
      wrapper.find('.decrement button')[0].dispatch('click');
      expect(wrapper.find('.count .value')[0].text()).toEqual('-2');
    });
  });
});
