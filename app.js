//APP entry point

require('babel-core/register');
['.css', '.less', '.sass', '.styl', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('./src/server.js');
