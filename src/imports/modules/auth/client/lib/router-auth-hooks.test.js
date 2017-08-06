import { requireAuth, requireNoAuth } from './router-auth-hooks';
import * as MeteorModule from 'meteor/meteor';

describe('router-auth-hooks', () => {
  describe('requireAuth', () => {
    it('if not signed in, redirects to /sign-in with the redirect path as query', () => {
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
      expect(next).toHaveBeenCalledWith({ path: '/sign-in', query: { redirect: to.fullPath } });
    });
    it('if signed in, continues to route', () => {
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
  describe('requireNoAuth', () => {
    it('if not signed in, continues to route', () => {
      MeteorModule.Meteor.userId = () => null;
      const next = jest.fn();
      const to = {};
      const from = {};
      requireNoAuth(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });
    it('if signed in, redirects to /home', () => {
      MeteorModule.Meteor.userId = () => 'someuser';
      const next = jest.fn();
      const to = {};
      const from = {};
      requireNoAuth(to, from, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({ path: '/home' });
    });
  });
});
