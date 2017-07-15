# Unit Tests
Unit tests are done with [Jest](https://facebook.github.io/jest/). See [tests/unit-test-setup/jest-config.json](/tests/unit-test-setup/jest-config.json) for Jest configuration. 

## Running Unit Tests

To run unit tests, run this command:
```
meteor npm run test:unit
```
For an example of a unit test, see: [src/imports/modules/counter/client/state/counter-actions-mutations.test.js](/src/imports/modules/counter/client/state/counter-actions-mutations.test.js).


## Where to Put Unit Tests
Unit test files are kept alongside their respective file that they're testing inside `src/`, not in a separate tests folder. So the following structure is used:

```
src/imports/modules/counter/
 |_client/
  |_components/
    |_Counter.js
    |_Counter.test.js
```

## Vue Component Unit Tests
Vue component unit tests are done with [avoriaz](https://www.npmjs.com/package/avoriaz). For an example of a component test, see [src/imports/modules/counter/client/components/Counter.test.js](/src/imports/modules/counter/client/components/Counter.test.js).

## Mocking Meteor Packages in Unit Tests
Meteor Atmosphere packages are automatically mocked via Jest's `moduleNameMapper` config option. Mocks are kept in [tests/unit-test-setup/meteor-mocks](tests/unit-test-setup/meteor-mocks). So a package called `meteor/my:package` is automatically mocked with `tests/unit-test-setup/meteor-mocks/my:package.js` when `meteor/my:package` is imported.

## Vuex Store Unit Tests
See the unit test examples for the "counter" Vuex store module here:
* [src/imports/modules/counter/client/state/counter-actions-mutations.test.js](/src/imports/modules/counter/client/state/counter-actions-mutations.test.js) 
* [src/imports/modules/counter/client/state/counter-store.test.js](/src/imports/modules/counter/client/state/counter-store.test.js)

## Unit Test Coverage
Unit tests write a coverage report to `tests/coverage/unit-tests/`. You can view a human-friendly web page report by opening `tests/coverage/unit-tests/lcov-report/index.html` in a web browser.
