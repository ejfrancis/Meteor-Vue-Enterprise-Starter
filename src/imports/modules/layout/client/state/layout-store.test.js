import { layoutStoreModule } from './layout-store';

const expectedNavRoutes = [
  {
    name: 'home',
    displayName: 'Home',
    icon: 'home'
  },
  {
    name: 'private',
    displayName: 'Private',
    icon: 'locked'
  }
];

describe('layout-store', () => {
  describe('initial state', () => {
    it('mobile nav is visisble expanded', () => {
      const expectedState = {
        layoutTheme: 'light',
        isMobileNavVisible: true,
        isMobileNavExpanded: true,
        navRoutes: expectedNavRoutes
      };
      expect(layoutStoreModule.state).toEqual(expectedState);
    });
  });
});
