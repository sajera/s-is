/**
 * EXPORTS
 *
 * @public
 */
if ( is.platform.node() ) module.exports = is;
if ( is.platform.browser() ) window['is'] = is;
