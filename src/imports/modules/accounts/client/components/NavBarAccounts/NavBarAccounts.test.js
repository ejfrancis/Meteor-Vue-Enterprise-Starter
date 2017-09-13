import { mount } from 'avoriaz';
import NavBarAccounts from './../NavBarAccounts/NavBarAccounts.vue';
import SignOutBtn from './../SignOutBtn/SignOutBtn.vue';
import SignInBtn from './../SignInBtn/SignInBtn.vue';
import { setupVue } from '/src/imports/startup/client/client-index';

describe('NavBarAccounts', () => {
  let store;
  let router;
  beforeEach(() => {
    const setup = setupVue();
    store = setup.store;
    router = setup.router;
  });

  it('renders without crashing', () => {
    const wrapper = mount(NavBarAccounts, { store, router });
    expect(wrapper.find('.NavBarAccounts').length).toEqual(1);
  });
  it('displays sign in button when not signed in', () => {
    const accountsState = {
      user: false
    };
    store.state.accounts = accountsState;
    const wrapper = mount(NavBarAccounts, { store, router });
    expect(wrapper.find('.signed-in').length).toEqual(0);
    expect(wrapper.find('.signed-out').length).toEqual(1);
    expect(wrapper.find(SignInBtn).length).toEqual(1);
    expect(wrapper.find(SignOutBtn).length).toEqual(0);
  });
  it('displays sign out button when signed in', () => {
    const accountsState = {
      user: { profile: { firstName: 'Han', lastName: 'Solo' } }
    };
    store.state.accounts = accountsState;
    const wrapper = mount(NavBarAccounts, { store, router });
    expect(wrapper.find('.signed-in').length).toEqual(1);
    expect(wrapper.find('.signed-out').length).toEqual(0);
    expect(wrapper.find(SignInBtn).length).toEqual(0);
    expect(wrapper.find(SignOutBtn).length).toEqual(1);
  });
});
