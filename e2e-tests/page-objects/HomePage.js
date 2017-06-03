import { PageObjectBase } from './PageObjectBase';

class HomePage extends PageObjectBase {
  constructor () {
    super({ url: 'http://localhost:3000/' });
  }
}

const homePage = new HomePage();

export {
  homePage
};
