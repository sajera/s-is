/*-------------------------------------------------
    detect a platforms (my plan make a more platform detection)
---------------------------------------------------*/
var platform = {
    /**
     * It determine platform Node.js (save)
     * 
     * @example
        is('platform', 'node'); // => true
        is.platform('node');    // => true
        is.platform.node();     // => true
     *
     * @name is.platform.node
     * @returns { Boolean }
     * @function
     * @public
     */
    'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
    /**
     * It determine platform browser (save)
     * 
     * @example
        is('platform', 'browser'); // => true
        is.platform('browser');    // => true
        is.platform.browser();     // => true
     *
     * @name is.platform.browser
     * @returns { Boolean }
     * @function
     * @public
     */
    'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
    /*
     * which platform we may need detect ?
     * @returns: { Boolean }
     */
};