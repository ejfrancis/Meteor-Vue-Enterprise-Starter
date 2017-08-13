import Vue from 'vue';
import iView from 'iview';

// iView is used in meteor build system via efrancis:iview atmosphere package (because of need to bundle fonts w/less). 
// to get the iView components to work in unit tests, we need to import it right from npm as a devDependency and hook it up
Vue.use(iView);

// throw uncaught Promise rejections to fail the test and
// log a stack trace
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', err => {
    throw err;
  });
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}

// window.matchMedia mock
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {},
    removeListener: function () {}
  };
};
