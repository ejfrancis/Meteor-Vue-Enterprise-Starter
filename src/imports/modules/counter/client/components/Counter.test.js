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
});
