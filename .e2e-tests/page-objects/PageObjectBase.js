class PageObjectBase {
  constructor({ url }) {
    this.url = url;
  }
  open() {
    browser.url(this.url);
  }
}

export {
  PageObjectBase
}