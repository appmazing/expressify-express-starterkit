/* register babel for ES6 */
require('babel-core/register');
require('babel-polyfill');

/* export server `app` promise returning Express.js instance */
module.exports = require('./server');
