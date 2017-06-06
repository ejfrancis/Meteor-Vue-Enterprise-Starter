# Application Structure
The directory structure is built in a way to make things predictable and enforce code modularity and organization per feature/domain. The contents of [src/imports/modules](/src/imports/modules) is explained in the section "Application Modules" below. The structure looks like this:

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

All of the application's business logic and UI will live inside application modules within the `src/imports/modules/` directory. An application module consists of all of the code, both client and server, related to a specific feature or domain. Classes and components that are related to each other or use each other are kept within the same module if possible. This keeps code modular, and makes it easy to distribute certain parts of your code as packages later on if you see fit.

An application module contains the following:
* client code
  * components - all Vue components for this module
  * state - all Vuex state and actions, as well as any data mocks, for this module
  * library - any client classes or functions for this module that aren't a component or Vuex-related
* server code
  * publications - all Meteor data publications
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