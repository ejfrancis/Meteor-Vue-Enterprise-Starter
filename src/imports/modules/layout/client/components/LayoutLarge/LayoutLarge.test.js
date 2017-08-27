import { mount } from 'avoriaz';
import LayoutLarge from './LayoutLarge.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('LayoutLarge', () => {
  let store;
  let router;

  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });

  it('renders without crashing', () => {
    const wrapper = mount(LayoutLarge, { store, router });
    expect(wrapper.find('.LayoutLarge').length).toEqual(1);
  });
});
