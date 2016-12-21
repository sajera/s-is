/*-------------------------------------------------
    detect a supported of platforms
    sometimes we want to know whether this is supported technology for this platform
---------------------------------------------------*/
var support = {
    /**
     * It determine platform support for Symbol (save)
     * 
     * @example
        is('support', 'symbol');
        is.support('symbol');
        is.support.symbol();
     *
     * @name is.support.symbol
     * @returns { Boolean }
     * @function
     * @public
     */
    'symbol': function () { return typeof Symbol == 'function' && is.symbol(Symbol()); },
    /**
     * It determine platform support for Promise (save)
     * 
     * @example
        is('support', 'promise');
        is.support('promise');
        is.support.promise();
     *
     * @name is.support.promise
     * @returns { Boolean }
     * @function
     * @public
     */
    'promise': function () { return typeof Promise == 'function' && is.promise(new Promise(new Function)); },
    /*
     * which support we may need detect ?
     * @returns: { Boolean }
     */
};