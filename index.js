
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
    /*-------------------------------------------------
        is.typeof =>
            Have 10 clearly defined types of data.
            For other data types "is" can partially help.
    ---------------------------------------------------*/
    var ts = ({}).toString;
    var typesOfData = {
        'nan': function ( data ) { return data !== data },
        'null': function ( data ) { return data === null; },
        'infinity': function ( data ) { return data === Infinity || data === -Infinity; },
        'number': function ( data ) {
            return typeof data == 'number' && !typesOfData['nan'](data) && !typesOfData['infinity'](data);
        },
        'string': function ( data ) { return typeof data == 'string'; },
        'boolean': function ( data ) { return typeof data == 'boolean'; },
        'function': function ( data ) { return typeof data == 'function'; },
        'array': function ( data ) { return ts.call(data) == '[object Array]'; },
        'object': function ( data ) { return !!data && typeof data == 'object' && !typesOfData['array'](data); },
        'undefined': function ( data ) { return typeof data == 'undefined'; },
        'defined': function ( data ) { return typeof data !== 'undefined'; }
    };

    var is = dualize(Object.assign({}, typesOfData, {
        // addition js data types
        'date': function ( data ) { return ts.call(data) == '[object Date]'; },
        'error': function ( data ) { return ts.call(data) == '[object Error]'; },
        'symbol': function ( data ) { return ts.call(data) == '[object Symbol]'; },
        'regexp': function ( data ) { return ts.call(data) == '[object RegExp]'; },
        '_object': function ( data ) { return ts.call(data) == '[object Object]'; },
        'argument': function ( data ) { return ts.call(data) == '[object Arguments]'; },
        'promise': function ( data ) { return ts.call(data) == '[object Promise]'||(data && is('function', data['then'])); },
        /**
         * is.typeof return name of the data type
         *
         * @param: { Any }
         * @returns: { String }
         */
        'typeof': function ( data ) {
            for ( var key in typesOfData ) if ( typesOfData[key]( data ) ) break;
            // unknown data type => with a huge proportion of the probability is an object (from specific native classes)
            if ( key == 'defined' ) return typeof data;
            else return key;
        },
        /**
         * is.empty check the data that may contain child elements
         *
         * @param: { Object|Array|Arguments|String }
         * @returns: { Boolean }
         */
        'empty': function ( data, notSafe ) {
            // if data type with length by default
            if ( is('argument', data) || is('array', data) || is('string', data) || is.typeof(data) == 'object' )
                return Object.keys(data).length == 0;
            // or maybe it's must be an error ?
            else if ( notSafe ) throw new Error('A you sure ? - '+is.typeof(data).toUpperCase()+' may contain child elements ?');
            // or maybe it's must be "true" ?
            else return true;
        },
        /**
         * check platform
         */
        'platform': dualize({
            'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
            'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
        }),
        /**
         * check platform to support technology
         */
        'support': dualize({
            // es6 support methods
            'symbol': function () { return typeof Symbol == 'function' && is('symbol', Symbol()); },
            'promise': function () { return typeof Promise == 'function' && is('promise', new Promise(new Function, new Function)); },
        })
    }));

    /**
     * EXPORTS
     *
     * @public
     */
    if ( is('platform', 'node') ) module.exports = is;
    else glob['is'] = is;

})( function is ( check ) {
    if (
        typeof check.toLowerCase == 'function'
        && (check = check.toLowerCase())
        && typeof this[check] == 'function'
    ) return this[check].apply(null, Array.prototype.slice.call(arguments, 1));
    else throw new Error('No such check as "'+check+'"');
}, this);