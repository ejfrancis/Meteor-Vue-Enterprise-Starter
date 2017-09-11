import { getUsersWithRoles } from './get-users-with-roles';
import * as MeteorModule from 'meteor/meteor';
import * as RolesModule from 'meteor/alanning:roles';

describe('get-users-with-roles', () => {
  it('throws an error if user is not in "super admin" or "admin" role, on client and server', () => {
    RolesModule.Roles.userIsInRole = jest.fn();
    MeteorModule.Meteor.isServer = false;
    let err;
    let res;
    try {
      res = getUsersWithRoles.call();
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeInstanceOf(MeteorModule.Meteor.Error);
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
  });
  it('does nothing if on server', () => {
    RolesModule.Roles.userIsInRole = jest.fn(() => true);
    MeteorModule.Meteor.isServer = false;
    MeteorModule.Meteor.users.find = jest.fn();
    let err;
    let res;
    try {
      res = getUsersWithRoles.call();
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeUndefined();
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
    expect(MeteorModule.Meteor.users.find).toHaveBeenCalledTimes(0);
  });
  it('returns Meteor.users.find() with startIndex default 0, limit default 14', () => {
    RolesModule.Roles.userIsInRole = jest.fn(() => true);
    MeteorModule.Meteor.isServer = true;
    const findFetch = jest.fn(() => ['someuser']);
    const findCount = jest.fn(() => 1);
    MeteorModule.Meteor.users.find = jest.fn(() => {
      return {
        fetch: findFetch,
        count: findCount
      };
    });
    let err;
    let res;
    try {
      res = getUsersWithRoles.call();
    } catch (e) {
      err = e;
    }
    expect(res).toEqual({
      usersWithRoles: ['someuser'],
      count: 1,
      pageSize: 14
    });
    expect(err).toBeUndefined();
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
    expect(MeteorModule.Meteor.users.find).toHaveBeenCalledTimes(2);
    expect(MeteorModule.Meteor.users.find).toHaveBeenCalledWith({}, {
      sort: {
        'profile.lastName': 1
      },
      limit: 14,
      skip: 0
    });
    expect(findFetch).toHaveBeenCalledTimes(1);
    expect(findCount).toHaveBeenCalledTimes(1);
  });
  it('returns Meteor.users.find() with startIndex and limit provided in args', () => {
    RolesModule.Roles.userIsInRole = jest.fn(() => true);
    MeteorModule.Meteor.isServer = true;
    const findFetch = jest.fn(() => ['someuser']);
    const findCount = jest.fn(() => 1);
    MeteorModule.Meteor.users.find = jest.fn(() => {
      return {
        fetch: findFetch,
        count: findCount
      };
    });
    let err;
    let res;
    try {
      res = getUsersWithRoles.call({
        startIndex: 4,
        limit: 5
      });
    } catch (e) {
      err = e;
    }
    expect(res).toEqual({
      usersWithRoles: ['someuser'],
      count: 1,
      pageSize: 5
    });
    expect(err).toBeUndefined();
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
    expect(MeteorModule.Meteor.users.find).toHaveBeenCalledTimes(2);
    expect(MeteorModule.Meteor.users.find).toHaveBeenCalledWith({}, {
      sort: {
        'profile.lastName': 1
      },
      limit: 5,
      skip: 4
    });
    expect(findFetch).toHaveBeenCalledTimes(1);
    expect(findCount).toHaveBeenCalledTimes(1);
  });
});
