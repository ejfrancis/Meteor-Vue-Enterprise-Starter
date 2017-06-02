# Meteor Vue Modular Application Starter

An opinionated starter kit application utilizing the following libraries/frameworks, with an emphasis on code modularity:

* Meteor
* Vue
* Vuex
* vue-router
* vuex-router-sync
* vuex-alt

# Usage

First, clone this repo 

```
git clone https://github.com/ejfrancis/Meteor-Vue-Modular-App-Starter
```

Then enter the new directory where it was cloned into, and install dependencies:

```
cd Meteor-Vue-Modular-App-Starter
meteor npm install
```

Now to run the application:

```
meteor npm start
```
# Testing
## Unit Tests
Unit tests are done with [Jest](https://facebook.github.io/jest/). Unit test files are kept alongside their respective file that they're testing inside `src/`.  To run unit tests, run this command:
```
meteor npm run test:unit
```
For an example of a unit test, see: `src/imports/modules/counter/client/state/counter-actions-mutations.test.js`.

## E2E Tests
End-to-end tests, a.k.a. acceptance tests, are done with [Chimp](https://chimp.readme.io/). End-to-end tests are kept in `.e2e-tests/`, with [page objects](http://webdriver.io/guide/testrunner/pageobjects.html) defined in `./e2e-tests/page-objects/` and tests defined in `.e2e-tests/tests/`. To run e2e tests, first run your Meteor application with `meteor npm start`, then in another terminal  run this command:

```
meteor npm run test:e2e
```
For an example of an e2e test, see: `.e2e-tests/tests/home-page-test.js`.

# Router
Routing is done on the client, and the client-side router is located at `src/imports/modules/router/client/lib/router.js`.

# Vuex Store
The Vuex store, which contains all application state, is initialized in `src/imports/modules/store/client/lib/store.js`. Vuex store modules are defined in their respective application modules (read below for more on application modules) and imported into the main `store.js`.

# Application Structure

The directory structure is built in a way to make things predictable and enforce code modularity and organization per feature/domain. The contents of `src/imports/modules/` is explained in the section "Application Modules" below. The structure looks like this:

```
|_package.json
|_config/                              <-- config files to populate Meteor.settings
|  |_config.development.json
|  |_config.production.json
|_src/
  |_client/                         
  |  |_index.html
  |  |_client-main.js                  <-- client code entry point
  |_server/
  |  |_server-main.js                  <-- server code entry point
  |_imports/
     |_startup/                        <-- startup code for application
     |  |_client/
     |  |  |_App.vue                   <-- main "App" component that renders the entire application
     |  |  |_client-index.js           <-- client startup code
     |   |_server/
     |      |_server-index.js          <-- server startup code
     |_modules/
                                       <-- application modules go here 
```

## Application Modules

All of the application's business logic and UI will live inside application modules within the `src/imports/modules/` directory. An application module consists of all of the code, both client and server, related to a specific feature or domain. Classes and components that are related to each other or use each other are kept within the same module if possible.

An application module contains the following:
* client code
  * components - all Vue components for this module
  * state - all Vuex state, as well as any data mocks, for this module
  * library - any client classes or functions for this module that aren't a component or Vuex-related
* server code
  * publications - all Meteor publications
  * methods - all Meteor methods using the Meteor RPC system
  * rest - any REST endpoints
  * library - any server classes or functions for this module that aren't a publication, method, or REST endpoint

### Complete Application Module Example
Below is what a complete module's directory might look like. This would live inside `src/imports/modules/module-name/`.
```
|_module-name/
  |_client/
  |  |_components/
  |  |  |_SomeComponent.vue
  |  |_state/
  |  |   |_module-name-actions.js
  |  |   |_module-name-state.js
  |  |_lib/
  |    |_some-feature-specific-library.js
  |_server/
    |_publications/
    |  |_some-publication.js
    |_methods/
    |  |_some-methods.js
    |_rest/
    |  |_one-rest-endpoint.js
    |  |_another-rest-endpoint.js
    |_lib/
       |_some-server-library.js
```

### Simple Application Module Example

A very simple module, for example the client-side router, might look like this. This would live in `src/imports/modules/router/`.
```
|_router/
  |_client/
    |_lib/
      |_router.js
```