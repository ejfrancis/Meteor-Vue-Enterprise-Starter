import { checkUserGlobalRole } from './check-user-global-role';
import * as MeteorModule from 'meteor/meteor';
import * as RolesModule from 'meteor/alanning:roles';

describe('check-user-global-role', () => {
  it('does nothing if not run on server', () => {
    const roles = [];
    RolesModule.Roles.userIsInRole = jest.fn();
    MeteorModule.Meteor.isServer = false;
    checkUserGlobalRole.call({ roles });
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(0);
  });
  it('returns false if user not signed in', () => {
    const roles = [];
    RolesModule.Roles.userIsInRole = jest.fn();
    MeteorModule.Meteor.isServer = true;
    MeteorModule.Meteor.userId = () => null;
    const res = checkUserGlobalRole.call({ roles });
    expect(res).toEqual(false);
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(0);
  });
  it('returns true if user is in role', () => {
    const roles = [];
    RolesModule.Roles.userIsInRole = jest.fn(() => false);
    MeteorModule.Meteor.isServer = true;
    MeteorModule.Meteor.userId = () => 'someuser';
    const res = checkUserGlobalRole.call({ roles });
    expect(res).toEqual(false);
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
  });
  it('returns true if user is in role', () => {
    const roles = [];
    RolesModule.Roles.userIsInRole = jest.fn(() => true);
    MeteorModule.Meteor.isServer = true;
    MeteorModule.Meteor.userId = () => 'someuser';
    const res = checkUserGlobalRole.call({ roles });
    expect(res).toEqual(true);
    expect(RolesModule.Roles.userIsInRole).toHaveBeenCalledTimes(1);
  });
});
