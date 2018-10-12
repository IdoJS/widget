const jsdom = require("jsdom");
const { window } = new jsdom.JSDOM('<!doctype html><html><body><div id="root"></div></body></html>');

const nodeExternals = require('webpack-node-externals');

// Save these two objects in the global space so that libraries/tests
// can hook into them, using the above doc definition.
global.document = window.document;
global.window = window;

module.exports = {
  output: {
    // use absolute paths in sourcemaps (important for debugging via IDE)
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  target: 'node',  // webpack should compile node compatible code
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: "inline-cheap-module-source-map"
};
