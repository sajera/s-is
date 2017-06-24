/**
 * @description
    defination on platforms (both variants on platform like Electron)

    bower i --save s-is

    npm i --save s-is

 * @example window.is || window['s-is'] // in browser
 * @example var is = require('s-is')    // in Node.js
 *
 * @exports s-is
 * @publick
 */
if ( is.platform.node() ) module.exports = is;
if ( is.platform.browser() ) window['is'] = window['s-is'] = is;
