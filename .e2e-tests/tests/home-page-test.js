import { homePage } from './../page-objects/HomePage';

describe('home page', () => {
  it('renders page with correct title', () => {
    homePage.open();
    expect(homePage.getPageTitle()).to.equal('Vue+Meteor Demo App');
  });
});