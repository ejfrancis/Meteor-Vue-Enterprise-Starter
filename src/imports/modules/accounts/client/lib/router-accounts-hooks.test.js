import {
  requireAuth,
  requireAdmin,
  requireNoAuth
} from './router-accounts-hooks';
import { globalUserRoles } from './../../shared/constants/global-user-roles';
import * as MeteorModule from 'meteor/meteor';
import * as checkUserGlobalRoleModule from './../../shared/methods/check-user-global-role';

describe('router-accounts-hooks', () => {
  describe('requireAuth', () => {
    it('redirects to /sign-in with the redirect path as query if not signed in', () => {
      MeteorModule.Meteor.userId = () => null;
      const next = jest.fn();
      const to = {
        fullPath: 'redirect-path'
      };
      const from = {
        fullPath: 'from-path'
      };
      requireAuth(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({ name: 'sign-in', query: { redirect: to.fullPath } });
    });
    it('continues to route if signed in', () => {
      MeteorModule.Meteor.userId = () => 'someuser';
      const next = jest.fn();
      const to = {
        fullPath: 'redirect-path'
      };
      const from = {
        fullPath: 'from-path'
      };
      requireAuth(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });
  });
  describe('requireAdmin', () => {
    it('redirects to /sign-in with the redirect path as query if not signed in', () => {
      MeteorModule.Meteor.userId = () => null;
      const next = jest.fn();
      const to = {
        fullPath: 'redirect-path'
      };
      const from = {
        fullPath: 'from-path'
      };
      requireAdmin(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({ name: 'sign-in', query: { redirect: to.fullPath } });
    });
    it('continues to route if user is in "admin" or "super admin" role', async () => {
      MeteorModule.Meteor.userId = () => 'someuser';
      const next = jest.fn();
      const to = {};
      const from = {};
      checkUserGlobalRoleModule.checkUserGlobalRole = {
        callPromise: jest.fn(async () => true)
      };
      await requireAdmin(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
      expect(checkUserGlobalRoleModule.checkUserGlobalRole.callPromise).toHaveBeenCalledTimes(1);
      expect(checkUserGlobalRoleModule.checkUserGlobalRole.callPromise).toHaveBeenCalledWith({ roles: [ globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN ] });
    });
    it('redirects to /home route if user is not in "admin" or "super admin" role', async () => {
      MeteorModule.Meteor.userId = () => 'someuser';
      const next = jest.fn();
      const to = {};
      const from = {};
      checkUserGlobalRoleModule.checkUserGlobalRole = {
        callPromise: jest.fn(async () => false)
      };
      await requireAdmin(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({ name: 'home' });
      expect(checkUserGlobalRoleModule.checkUserGlobalRole.callPromise).toHaveBeenCalledTimes(1);
      expect(checkUserGlobalRoleModule.checkUserGlobalRole.callPromise).toHaveBeenCalledWith({ roles: [ globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN ] });
    });
    it('redirects to /home route if user role check fails', async () => {
      MeteorModule.Meteor.userId = () => 'someuser';
      const next = jest.fn();
      const to = {};
      const from = {};
      checkUserGlobalRoleModule.checkUserGlobalRole = {
        callPromise: jest.fn(async () => {
          throw new Error('NOOOOOOOO');
        })
      };
      await requireAdmin(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({ name: 'home' });
      expect(checkUserGlobalRoleModule.checkUserGlobalRole.callPromise).toHaveBeenCalledTimes(1);
      expect(checkUserGlobalRoleModule.checkUserGlobalRole.callPromise).toHaveBeenCalledWith({ roles: [ globalUserRoles.ADMIN, globalUserRoles.SUPER_ADMIN ] });
    });
  });
  describe('requireNoAuth', () => {
    it('continues to route if not signed in', () => {
      MeteorModule.Meteor.userId = () => null;
      const next = jest.fn();
      const to = {};
      const from = {};
      requireNoAuth(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });
    it('redirects to /home if signed in', () => {
      MeteorModule.Meteor.userId = () => 'someuser';
      const next = jest.fn();
      const to = {};
      const from = {};
      requireNoAuth(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({ name: 'home' });
    });
  });
});
