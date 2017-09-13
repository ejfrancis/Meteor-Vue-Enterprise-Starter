import { setUserGlobalRole } from './set-user-global-role';
import * as MeteorModule from 'meteor/meteor';
import * as RolesModule from 'meteor/alanning:roles';
import { globalUserRoles } from './../constants/global-user-roles';

describe('set-user-global-role', () => {
  it('does nothing if not on server', () => {
    RolesModule.Roles.userIsInRole = jest.fn();
    MeteorModule.Meteor.isServer = false;
    let err;
    let res;
    try {
      res = setUserGlobalRole.call({ userId: 'abc', role: 'somerole' });
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeUndefined();
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(0);
  });
  it('throws 403 if user is not "admin" or "super admin"', () => {
    RolesModule.Roles.userIsInRole = jest.fn()
      .mockImplementationOnce(() => false);
    MeteorModule.Meteor.isServer = true;
    let err;
    let res;
    try {
      res = setUserGlobalRole.call({ userId: 'abc', role: 'somerole' });
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeInstanceOf(MeteorModule.Meteor.Error);
    expect(err.code).toEqual(403);
    expect(err.message).toEqual('Only admins can modify a users global role.');
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
  });
  it('throws 403 if attempting to set another user to "super admin" and current user is not "super admin"', () => {
    RolesModule.Roles.userIsInRole = jest.fn()
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false);
    MeteorModule.Meteor.isServer = true;
    let err;
    let res;
    try {
      res = setUserGlobalRole.call({ userId: 'abc', role: globalUserRoles.SUPER_ADMIN });
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeInstanceOf(MeteorModule.Meteor.Error);
    expect(err.code).toEqual(403);
    expect(err.message).toEqual('Only super admins can set others users as super admins.');
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(2);
  });
  it('throws 403 if current user is "super admin" and they\'re trying to downgrade themselves out of "super admin"', () => {
    RolesModule.Roles.userIsInRole = jest.fn()
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => true);
    MeteorModule.Meteor.isServer = true;
    let err;
    let res;
    try {
      res = setUserGlobalRole.call({
        userId: MeteorModule.Meteor.userId(),
        role: 'somerole'
      });
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeInstanceOf(MeteorModule.Meteor.Error);
    expect(err.code).toEqual(403);
    expect(err.message).toEqual('Super admins cannot remove themselves from super admin role.');
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(2); // should skip second check since role !== SUPER_ADMIN
  });
  it('throws 403 if current user is not "super admin" and they\'re trying to downgrade an admin', () => {
    RolesModule.Roles.userIsInRole = jest.fn()
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => false);
    MeteorModule.Meteor.isServer = true;
    let err;
    let res;
    try {
      res = setUserGlobalRole.call({
        userId: MeteorModule.Meteor.userId(),
        role: globalUserRoles.EMPLOYEE
      });
    } catch (e) {
      err = e;
    }
    expect(res).toBeUndefined();
    expect(err).toBeInstanceOf(MeteorModule.Meteor.Error);
    expect(err.code).toEqual(403);
    expect(err.message).toEqual('Only super admins can downgrade admins out of their admin status.');
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(4); // should skip second check since role !== SUPER_ADMIN
  });
  it('sets user role', () => {
    RolesModule.Roles.setUserRoles = jest.fn();
    RolesModule.Roles.userIsInRole = jest.fn()
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false);
    MeteorModule.Meteor.isServer = true;
    let err;
    let res;
    try {
      res = setUserGlobalRole.call({
        userId: 'someuser',
        role: 'somerole'
      });
    } catch (e) {
      err = e;
    }
    expect(res).toEqual(true);
    expect(err).toBeUndefined();
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(2); // should skip second check since role !== SUPER_ADMIN, and third check because userId !== Meteor.userId()
    expect(RolesModule.Roles.setUserRoles).toHaveBeenCalledWith('someuser', ['somerole'], RolesModule.Roles.GLOBAL_GROUP);
  });
});
