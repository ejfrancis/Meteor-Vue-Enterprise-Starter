import { mount } from 'avoriaz';
import AccountsAdminUsersList from './AccountsAdminUsersList.vue';
import { setupVue } from '/src/imports/startup/client/client-index';
import nextTick from 'timeout-as-promise';
import { Roles } from 'meteor/alanning:roles';
import { getActions } from '/tests/unit-test-setup/vuex-alt-test-util';
import { Meteor } from 'meteor/meteor';
import { globalUserRoles } from './../../../shared/constants/global-user-roles';

const usersWithRolesMock = [
  {
    '_id': 'As3QYkYpYBwXSzmgs',
    'createdAt': '2017-09-09T19:36:14.278Z',
    'services': {
      'password': {
        'bcrypt': '$2a$10$Q9drYpBsbmvBcwPM/Sb/ReRdIT0Cz/xbYAQ/ZSvjhE00E5dctEgKW'
      }
    },
    'emails': [
      {
        'address': 'test25@mail.com',
        'verified': true
      }
    ],
    'profile': {
      'firstName': 'Alex',
      'lastName': 'Anderson'
    },
    'roles': {
      [Roles.GLOBAL_GROUP]: [
        globalUserRoles.SUPER_ADMIN
      ]
    }
  },
  {
    '_id': 'QtFrBgogyoB9Js7tc',
    'createdAt': '2017-09-09T19:36:14.571Z',
    'services': {
      'password': {
        'bcrypt': '$2a$10$g0WbDt4lPFK3QIEuuo7zUevPy8AK1bIkL4x0hYujFUikb8XGFIz/y'
      }
    },
    'emails': [
      {
        'address': 'test29@mail.com',
        'verified': true
      }
    ],
    'profile': {
      'firstName': 'Monica',
      'lastName': 'Anderson'
    },
    'roles': {
      [Roles.GLOBAL_GROUP]: [
        globalUserRoles.USER
      ]
    }
  }
];

describe('AccountsAdminUsersList', () => {
  let store;

  beforeEach(() => {
    store = setupVue().store;
  });
  it('renders without crashing', () => {
    const wrapper = mount(AccountsAdminUsersList, { store });
    expect(wrapper.find('.AccountsAdminUsersList').length).toEqual(1);
  });
  it('shows loading if data not loaded yet and still loading', async () => {
    const accountsState = {
      getUsersWithRolesLoading: true,
      usersWithRoles: []
    };
    store.state.accounts = accountsState;
    const wrapper = mount(AccountsAdminUsersList, { store });
    await nextTick();
    expect(wrapper.find('.table-loading').length).toEqual(1);
    expect(wrapper.find('.table-container').length).toEqual(0);
  });
  it('shows table if data loaded', async () => {
    const accountsState = {
      getUsersWithRolesLoading: false,
      usersWithRoles: []
    };
    store.state.accounts = accountsState;
    const wrapper = mount(AccountsAdminUsersList, { store });
    await nextTick();
    expect(wrapper.find('.table-loading').length).toEqual(0);
    expect(wrapper.find('.table-container').length).toEqual(1);
  });
  it('adds "current-user" class to Meteor.user() row', async () => {
    const usersWithCurrentUserMock = [...usersWithRolesMock];
    usersWithCurrentUserMock[0]._id = Meteor.userId();

    const accountsState = {
      getUsersWithRolesLoading: false,
      usersWithRoles: usersWithRolesMock
    };
    store.state.accounts = accountsState;
    const wrapper = mount(AccountsAdminUsersList, { store });
    await nextTick();
    expect(wrapper.find('.current-user').length).toEqual(1);
  });
  describe('set user role', () => {
    it('calls setUserGlobalRole when an item is clicked', async () => {
      const accountsState = {
        getUsersWithRolesLoading: false,
        usersWithRoles: usersWithRolesMock
      };
      store.state.accounts = accountsState;
      const wrapper = mount(AccountsAdminUsersList, { store });
      const actions = getActions(wrapper);
      actions.accounts.setUserGlobalRole = jest.fn((abc) => {
      });
      await nextTick();
      wrapper.find('.role-dropdown .ivu-btn')[0].trigger('click');
      await nextTick();
      wrapper.find('.role-dropdown .ivu-select-dropdown')[0].find('.ivu-dropdown-item')[2].trigger('click');
      await nextTick();
      expect(actions.accounts.setUserGlobalRole).toHaveBeenCalledTimes(1);
      expect(actions.accounts.setUserGlobalRole).toHaveBeenCalledWith({
        userId: usersWithRolesMock[0]._id,
        role: expect.any(String)
      });
    });
  });
});
