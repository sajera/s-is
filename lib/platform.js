
/*-------------------------------------------------
    detect a platforms (my plan make a more platform detection)
---------------------------------------------------*/
var platform = {
    /**
     * @description It determine platform Node.js (save)
     * @example
        is('platform', 'node'); // => true
        is.platform('node');    // => true
        is.platform.node();     // => true
     * @returns { Boolean }
     * @function is.platform.node
     * @public
     */
    'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
    /**
     * @description It determine platform browser (save)
     * @example
        is('platform', 'browser'); // => true
        is.platform('browser');    // => true
        is.platform.browser();     // => true
     * @returns { Boolean }
     * @function is.platform.browser
     * @public
     */
    'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
    /*
     * which platform we may need detect ?
     * @returns: { Boolean }
     */
};
