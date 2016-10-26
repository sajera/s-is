
(function ( factory, glob ) {

'use strict';
    /*-------------------------------------------------
        dual method usage
            1. is.function(new Function); => true
            2. is('function',new Function); => true
    ---------------------------------------------------*/
    function dualize ( checks ) {
        var duplicate = factory.bind(checks);
        return Object.assign(duplicate, checks);
    }

    var ts = ({}).toString;

    var is = dualize({
        // pure js data types
        'nan': function ( data ) { return data !== data },
        'null': function ( data ) { return data === null; },
        'infinity': function ( data ) { return data === Infinity || data === -Infinity; },
        'number': function ( data ) { return typeof data == 'number'; },
        'string': function ( data ) { return typeof data == 'string'; },
        'boolean': function ( data ) { return typeof data == 'boolean'; },
        'function': function ( data ) { return typeof data == 'function'; },
        'error': function ( data ) { return ts.call(data) == '[object Error]'; },
        'array': function ( data ) { return ts.call(data) == '[object Array]'; },
        'regexp': function ( data ) { return ts.call(data) == '[object RegExp]'; },
        'object': function ( data ) { return ts.call(data) == '[object Object]'; },
        'argument': function ( data ) { return ts.call(data) == '[object Arguments]'; },
        'date': function ( data ) { return ts.call(data) == '[object Date]'; },
        'symbol': function ( data ) { return ts.call(data) == '[object Symbol]'; },
        'promise': function ( data ) { return ts.call(data) == '[object Promise]'||(data && is('function', data['then'])); },
        'undefined': function ( data ) { return typeof data == 'undefined'; },
        'defined': function ( data ) { return typeof data !== 'undefined'; }
    });
    
    /**
     * is.typeof return name of the data type
     *
     * @param: { Any }
     * @returns: { String }
     */
    Object.defineProperty( is, 'typeof', { value: function ( data ) {
        for ( var key in is ) if ( is('function', is[key]) && is[key]( data ) ) break;
        // unknown data type => with a huge proportion of the probability is an object (from specific native classes)
        if ( key == 'defined' ) return typeof data;
        else return key;
    }});

    /**
     * is.empty check the data that may contain child elements
     *
     * @param: { Object|Array|Arguments|String }
     * @returns: { Boolean }
     */
    Object.defineProperty( is, 'empty', { value: function ( data ) {
        if ( is('argument', data) || is('array', data) || is('string', data) ) {
            return data.length == 0;
        } else if ( is('object', data) ) {
            return Object.keys(data).length == 0;
        } else throw new Error('A you sure ? - "'+is.typeof(data).toUpperCase()+'" may contain child elements ?');
    }});
    
    /*-------------------------------------------------
        FUTURE maybe         
    ---------------------------------------------------*/
    /**
     * check platform
     *
     * @param: { Object }
     * @returns: { Object }
     */
    Object.defineProperty( is, 'this', { value: dualize({
        'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
        'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
    })});
    /**
     * check platform to support technology
     *
     * @param: { Object }
     * @returns: { Object }
     */
    Object.defineProperty( is, 'there', { value: dualize({
        // es6 support methods
        'symbol': function () { return typeof Symbol == 'function' && is('symbol', Symbol()); },
        'promise': function () { return typeof Promise == 'function' && is('promise', new Promise(new Function, new Function)); },
    })});

    /**
     * EXPORTS
     *
     * @public
     */
    if ( is.this('node') ) module.exports = is;
    else glob['is'] = is;

})( function is ( check ) {
    check = check.toLowerCase();
    if ( typeof this[check] == 'function' ) {
        return this[check].apply(null, Array.prototype.slice.call(arguments, 1));
    } else throw new Error('No such check as "'+check+'"');
}, this);