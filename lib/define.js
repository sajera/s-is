/**
 * @description
    defination on platforms (both variants on platform like Electron)

    bower install --save s-is

    npm install --save s-is

 * @example window.is                   // in browser
 * @example var is = require('s-is')    // in Node.js
 * @exports s-is
 * @public
 */
if ( is.platform.node() ) module.exports = is;
if ( is.platform.browser() ) window['is'] = is;
