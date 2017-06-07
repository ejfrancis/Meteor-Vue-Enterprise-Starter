/*
 * Jest unit tests requires some babel configuration since unit tests are using es2015/es2017 but Meteor's node 
 * doesn't support them (for now). Putting babel config here so it doesn't have to go in .babelrc and
 * affect Meteor's build system unnecessarily.
 */

const babelJest = require('babel-jest');

const babelConfig = {
  presets: [
    'es2015',
    'es2017',
    'vue'
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-runtime',
    'dynamic-import-node'
  ]
};

module.exports = babelJest.createTransformer(babelConfig);