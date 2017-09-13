import { mount } from 'avoriaz';
import Counter from './Counter.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import nextTick from 'timeout-as-promise';

const getIncreaseInput = (el) => el.find('.increase input')[0];
const getIncreaseBtn = (el) => el.find('.increase button')[0];
const getDecreaseInput = (el) => el.find('.decrease input')[0];
const getDecreaseBtn = (el) => el.find('.decrease button')[0];
const getResetBtn = (el) => el.find('.reset-delayed button')[0];
const getCount = (el) => el.find('.count .value')[0];
const getCountPlusTen = (el) => el.find('.count .value-plus-ten')[0];

describe('Counter', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(Counter, { store });
    expect(wrapper.find('.Counter').length).toEqual(1);
  });
  it('renders with count 1 initially', () => {
    const startValue = 1;
    const wrapper = mount(Counter, { store });
    expect(parseInt(wrapper.find('.count .value')[0].text())).toEqual(startValue);
  });
  describe('increase', () => {
    it('adds to count when Increment is clicked', async () => {
      const startValue = 0;
      const changeValue = 2;
      const endValue = startValue + changeValue;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      const countValue = getCount(wrapper);
      expect(parseInt(countValue.text())).toEqual(startValue);
      const increaseInput = getIncreaseInput(wrapper);
      const increaseBtn = getIncreaseBtn(wrapper);
      increaseInput.element.value = changeValue;
      increaseInput.trigger('change');
      await nextTick();
      increaseBtn.trigger('click');
      await nextTick();
      expect(parseInt(countValue.text())).toEqual(endValue);
    });
  });
  describe('decrease', () => {
    it('subtracts from count when Decrease is clicked', async () => {
      const startValue = 0;
      const changeValue = 5;
      const endValue = startValue - changeValue;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      const countValue = getCount(wrapper);
      expect(parseInt(countValue.text())).toEqual(startValue);
      const decreaseInput = getDecreaseInput(wrapper);
      const decreaseBtn = getDecreaseBtn(wrapper);
      decreaseInput.element.value = changeValue;
      decreaseInput.trigger('change');
      await nextTick();
      decreaseBtn.trigger('click');
      await nextTick();
      expect(parseInt(countValue.text())).toEqual(endValue);
    });
  });
  describe('count plus ten', () => {
    it('displays count + 10 when increaseed', async () => {
      const startValue = 0;
      const changeValue = 5;
      const endValuePlusTen = startValue + changeValue + 10;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      const countPlusTenValue = getCountPlusTen(wrapper);
      expect(parseInt(countPlusTenValue.text())).toEqual(startValue + 10);
      const increaseInput = getIncreaseInput(wrapper);
      const increaseBtn = getIncreaseBtn(wrapper);
      increaseInput.element.value = changeValue;
      increaseInput.trigger('change');
      await nextTick();
      increaseBtn.trigger('click');
      await nextTick();
      expect(parseInt(countPlusTenValue.text())).toEqual(endValuePlusTen);
    });
    it('displays count + 10 when decreaseed', async () => {
      const startValue = 0;
      const changeValue = 5;
      const endValuePlusTen = startValue - changeValue + 10;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      const countPlusTenValue = getCountPlusTen(wrapper);
      expect(parseInt(countPlusTenValue.text())).toEqual(startValue + 10);
      const decreaseInput = getDecreaseInput(wrapper);
      const decreaseBtn = getDecreaseBtn(wrapper);
      decreaseInput.element.value = changeValue;
      decreaseInput.trigger('change');
      await nextTick();
      decreaseBtn.trigger('click');
      await nextTick();
      expect(parseInt(countPlusTenValue.text())).toEqual(endValuePlusTen);
    });
  });
  describe('reset delayed', () => {
    it('resets count back to 0 after a 1500ms delay', async () => {
      const startValue = 0;
      const changeValue = 2;
      const endValue = startValue + changeValue;
      store.state.counter.count = startValue;
      const wrapper = mount(Counter, { store });
      const countValue = getCount(wrapper);
      expect(parseInt(countValue.text())).toEqual(startValue);
      const increaseInput = getIncreaseInput(wrapper);
      const increaseBtn = getIncreaseBtn(wrapper);
      const resetBtn = getResetBtn(wrapper);
      increaseInput.element.value = changeValue;
      increaseInput.trigger('change');
      await nextTick();
      increaseBtn.trigger('click');
      await nextTick();
      expect(parseInt(countValue.text())).toEqual(endValue);
      resetBtn.trigger('click');
      await nextTick(1500);
      expect(parseInt(countValue.text())).toEqual(startValue);
    });
  });
});
