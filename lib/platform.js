/*-------------------------------------------------
    detect a platforms (my plan make a more platform detection)
---------------------------------------------------*/
var platform = {
    /**
     * detect a node is very simple but it can be simple and FAST
     * @returns: { Boolean }
     */
    'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
    /**
     * detect a browser is very simple but it can be simple and FAST
     * @returns: { Boolean }
     */
    'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
    /**
     * which platform we may need detect ?
     * @returns: { Boolean }
     */
};