import { mount } from 'avoriaz';
import AccountsFormContainer from './AccountsFormContainer.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('AccountsFormContainer', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });

  it('renders without crashing', () => {
    const wrapper = mount(AccountsFormContainer, { store });
    expect(wrapper.find('.AccountsFormContainer').length).toEqual(1);
  });
});
