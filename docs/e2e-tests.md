# E2E Tests
End-to-end tests, a.k.a. acceptance tests, are done with [Chimp](https://chimp.readme.io/). 

## Running E2E Tests
To run e2e tests on you local machine, first run your Meteor application with `meteor npm start`, then in another terminal  run this command:

```
meteor npm run test:e2e
```

## Where to Put E2E Tests
Unlike unit tests, which are kept alongside their respective files in `src/imports`, end-to-end tests are kept in `tests/`. This is because they don't relate to any specific unit of code and they apply to the entire application, so they belong closer to the root of the application. The Meteor build tools defaults to excluding the `tests/` dir from the build as well. The tests themselves reside in [tests/e2e/tests](/tests/e2e-tests/).

For an example of an e2e test, see: [tests/e2e-tests/home-page.test.js](/tests/e2e-tests/home-page.test.js).

## Page Objects
The [Page Object Pattern](http://webdriver.io/guide/testrunner/pageobjects.html) is used for interacting with web pages. Page objects are defined in `tests/e2e/page-objects/`. See a very basic example at [tests/e2e/page-objects/HomePage.js](/tests/page-objects/HomePage.js).


