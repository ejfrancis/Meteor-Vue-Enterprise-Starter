import { layoutStoreModule } from './layout-store';

const expectedNavRoutes = [
  {
    name: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    name: 'Private',
    path: '/private',
    icon: 'locked'
  }
];

describe('layout-store', () => {
  describe('initial state', () => {
    it('mobile nav is visisble expanded', () => {
      const expectedState = {
        isMobileNavVisible: true,
        isMobileNavExpanded: true,
        navRoutes: expectedNavRoutes
      };
      expect(layoutStoreModule.state).toEqual(expectedState);
    });
  });
});
