/*-------------------------------------------------
    detect a supported of platforms
    sometimes we want to know whether this is supported technology for this platform
---------------------------------------------------*/
var support = {
    /**
     * 
     * @returns: { Boolean }
     */
    'symbol': function () { return typeof Symbol == 'function' && is.symbol(Symbol()); },
    /**
     * 
     * @returns: { Boolean }
     */
    'promise': function () { return typeof Promise == 'function' && is.promise(new Promise(new Function)); },
    /**
     * which support we may need detect ?
     * @returns: { Boolean }
     */
};