class PageObjectBase {
  constructor ({ 
    port, 
    urlBase,
    path = '/'
  } = {}) {
    this.port = process.env.E2E_APP_PORT || port || 3000;
    this.urlBase = process.env.E2E_APP_URL_BASE || urlBase || 'http://localhost';
    this.path = path;
  }
  open () {
    const openUrl = `${this.urlBase}:${this.port}${this.path}`;
    console.log(`PageObject opening: ${openUrl}`);
    browser.url(openUrl);
  }
  getPageTitle () {
    return browser.getTitle();
  }
}

export {
  PageObjectBase
};
