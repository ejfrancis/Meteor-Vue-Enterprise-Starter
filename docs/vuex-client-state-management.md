# Vuex State Management
[Vuex](https://vuex.vuejs.org/) is used for storing and modifying application state. The Vuex store is initialized in [src/imports/modules/store/client/lib/store.js](/src/imports/modules/store/client/lib/store.js). 

## Organization Vuex Code
All Vuex code is kept in namespaced [Vuex modules](https://vuex.vuejs.org/en/modules.html). This is a requirement by the [vuex-alt plugin](https://www.npmjs.com/package/vuex-alt) and leads to better organized and modular code.

## Where to Put Vuex Modules
Vuex store modules are defined in their respective Application Module's `state/` directory and imported into the main [store.js](/src/imports/modules/store/client/lib/store.js) (see the  [Application Structure documentation](/docs/application-structure.md) for more on Application Modules).

So for the included "counter" example, the Vuex code for managing the "counter" state is organized like this:

```
src/imports/modules/counter/
 |_client/
   |_state/
     |_counter-actions-mutations.js     <-- all modifications to state
     |_counter-store.js                 <-- initial store state, and store creation
```
You can see them here:
* [src/imports/modules/counter/client/state/counter-actions-mutations.js](/src/imports/modules/counter/client/state/counter-actions-mutations.js) 
* [src/imports/modules/counter/client/state/counter-store.js](/src/imports/modules/counter/client/state/counter-store.js)

## Unit Testing Vuex Modules
See the [Unit Tests documentation](/docs/unit-tests.md) for information on unit testing Vuex store modules.