class PageObjectBase {
  constructor ({
    port,
    urlBase,
    path = '/',
    selector
  } = {}) {
    this.port = process.env.E2E_APP_PORT || port || 3000;
    this.urlBase = process.env.E2E_APP_URL_BASE || urlBase || 'http://localhost';
    this.path = path;
    this.selector = selector;
  }
  open () {
    const openUrl = `${this.urlBase}:${this.port}${this.path}`;
    browser.url(openUrl);
    if (this.selector) {
      browser.waitForExist(this.selector);
    }
  }
  getPageTitle () {
    return browser.getTitle();
  }
}

export {
  PageObjectBase
};
