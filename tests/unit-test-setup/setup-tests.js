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
    addListener: function () { },
    removeListener: function () { }
  };
};

// el.dataset jsdom polyfill, from here https://gist.github.com/dsheiko/37e4673cce20d5896510
const _attrToDataKey = function (val) {
  const out = val.substr(5);
  return out.split('-').map(function (part, inx) {
    if (!inx) {
      return part;
    }
    return part.charAt(0).toUpperCase() + part.substr(1);
  }).join('');
};
/**
 * Produce dataset object emulating behavior of el.dataset
 * @param {Element} el
 * @returns {Object}
 */
const _getNodeDataAttrs = function (el) {
  let i = 0;
  let atts = el.attributes;
  let len = atts.length;
  let attr;
  let _datasetMap = [];
    // represents el.dataset
  let proxy = {};
  let datakey;
  for (; i < len; i++) {
    attr = atts[i].nodeName;
    if (attr.indexOf('data-') === 0) {
      datakey = _attrToDataKey(attr);
      if (typeof _datasetMap[datakey] !== 'undefined') {
        break;
      }
      _datasetMap[datakey] = atts[i].nodeValue;
      (function (datakey) {
        // every data-attr found on the element makes a getter and setter
        Object.defineProperty(proxy, datakey, {
          enumerable: true,
          configurable: true,
          get: function () {
            return _datasetMap[datakey];
          },
          set: function (val) {
            _datasetMap[datakey] = val;
            el.setAttribute(attr, val);
          }
        });
      }(datakey));
    }
  }
  return proxy;
};
Object.defineProperty(global.window.Element.prototype, 'dataset', {
  configurable: true,
  get: function () {
    return _getNodeDataAttrs(this);
  }
});
