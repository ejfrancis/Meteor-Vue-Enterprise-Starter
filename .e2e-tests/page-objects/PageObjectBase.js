class PageObjectBase {
  constructor({ url }) {
    this.url = url;
  }
  open() {
    browser.url(this.url);
  }
  getPageTitle() {
    return browser.getTitle();
  }
}

export {
  PageObjectBase
}