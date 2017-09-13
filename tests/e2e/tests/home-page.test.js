import { homePage } from './../page-objects/HomePage';

describe('home page', () => {
  it('renders page with correct title', () => {
    homePage.open();
    expect(homePage.getPageTitle()).to.equal('Vue+Meteor Demo App');
  });
  describe('counter', () => {
    it('starts with count 1', () => {
      homePage.open();
      const count = homePage.getCounterValue();
      expect(count).to.equal(1);
    });
  });
});
