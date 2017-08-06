# Meteor Vue Modular Application Starter

[![CircleCI](https://circleci.com/gh/ejfrancis/Meteor-Vue-Modular-App-Starter/tree/master.svg?style=svg)](https://circleci.com/gh/ejfrancis/Meteor-Vue-Modular-App-Starter/tree/master)

An opinionated starter kit application utilizing the following libraries/frameworks, with an emphasis on code modularity:

* Meteor 1.6
* Vue 2
* vuex 2
* vue-router 2
* vuex-router-sync
* vuex-alt
* vue-meteor-tracker

The following development tools are used:

* Jest - unit tests
* Chimp - e2e tests
* semistandard - code linting
* husky - git hooks

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

# Mimic Production
To run the app with a production bundle and using the production settings located at `config/config.production.json`, run:

```
meteor npm run start:mimic-prod
```

# Application Config
You can provide application config/settings values in the `config/` directory, which will be made available via `Meteor.settings` in your code. You'll see two files:

* `config/config.development.json`: local config, used when `meteor npm start` is run
* `config/config.production.json`: production config, use this for production values. ([see the Meteor guide](https://docs.meteor.com/environment-variables.html#METEOR-SETTINGS))

# Testing
## Unit Tests
See the [Unit Tests documentation](/docs/unit-tests.md).

## E2E Tests
See the [E2E Tests documentation](/docs/e2e-tests.md).

# Code Linting
Code linting is done with [semistandard](https://www.npmjs.com/package/semistandard), which is a pre-configured eslint that works out of the box with an opinionated ruleset. Run code linting with this command:
```
meteor npm run lint
```

To automatically fix linting errors, run:
```
meteor npm run lint:fix
```

# Routing
Routing is done on the client with VueRouter. The router configuration is located at [src/imports/modules/router/client/lib/router.js](/src/imports/modules/router/client/lib/router.js).

The router configuration includes an example of lazy-loading your route components, to avoid them being included in your initial client JavaScript bundle.

# Client State Management with Vuex
See the [Vuex State Management documentation](/docs/vuex-client-state-management.md).


# Application Structure
The directory structure is built in a way to make things predictable and enforce code modularity and organization per feature/domain by splitting the code into "Application Modules".

See the [Application Structure documentation](/docs/application-structure.md).
