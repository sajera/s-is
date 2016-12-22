
var ts = Object.prototype.toString;
/*-------------------------------------------------
    10 data types
---------------------------------------------------*/
var types = {
    /**
     * typeof return name of the data type
     * it can return all 10 data types plus new data types of ES6.
     * @example
        is.typeof([]);      // => 'array'
        is('typeof', []);   // => 'array'
     *
     * @name is.typeof
     * @param { any } data
     * @returns { String }
     * @function
     * @public
     */
    'typeof': function ( data ) {
        for ( var key in types ) if ( key != 'typeof' && types[key]( data ) ) break;
        // unknown data type => with a huge proportion of the probability is an object (from specific native classes)
        if ( key == 'defined' ) return typeof data;
        else return key;
    },
    /**
     * It determine only NaN
     * 
     * @example
        is.nan(NaN);        // => true
        is('NaN', NaN);     // => true
        is('NaN', 'NaN');   // => false
     *
     * @name is.nan
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'nan': function ( data ) { return data !== data; },
    /**
     * It determine only infinity's
     * 
     * @example
        is.infinity(-Infinity);                     // => true
        is('Infinity', Infinity);                   // => true
        is('Infinity', 9999999*9999999*9999999);    // => true
     *
     * @name is.infinity
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'infinity': function ( data ) { return data == data+1; },
    /**
     * It determine only null
     * 
     * @example
        is.null(null);      // => true
        is('null', null);   // => true
        // otherwise false
     *
     * @name is.null
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'null': function ( data ) { return data === null; },
    /**
     * It determine only numbers (like a native typeof)
     * @see {@link is.finity} more specific determine
     * @see {@link is._number} more specific determine
     * @see {@link is.countable} less specific determine
     * 
     * @example
        is.number(1);         // => true
        is.number(NaN);       // => true
        is('number', null);   // => false
     *
     * @name is.number
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'number': function ( data ) { return typeof data == 'number'; },
    /**
     * It determine only strings
     * 
     * @example
        is.string('');          // => true
        is('string', 'null');   // => true
        is('string', []);       // => false
     *
     * @name is.string
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'string': function ( data ) { return typeof data == 'string'; },
    /**
     * It determine only booleans
     * 
     * @example
        is.boolean(true);          // => true
        is('boolean', false);      // => true
        // otherwise false
     *
     * @name is.boolean
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */   
    'boolean': function ( data ) { return typeof data == 'boolean'; },
    /**
     * It determine only functions
     * 
     * @example
        is.function(Function);      // => true
        is('function', Function);   // => true
     *
     * @name is.function
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'function': function ( data ) { return typeof data == 'function'; },
    /**
     * It determine only array
     * 
     * @example
        is.array([]);           // => true
        is('array', [1,2]);     // => true
        is('array', '1,2');     // => false
     *
     * @name is.array
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'array': function ( data ) { return ts.call(data) == '[object Array]'; },
    /**
     * It determine only objects. Except null and array
     * 
     * @example
        is.object({});          // => true
        is('object', {x:1});    // => true
        is('object', []);       // => false
        is('object', null);     // => false
     *
     * @name is.object
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'object': function ( data ) { return !!data && !is.array( data ) && typeof data == 'object'; },
    /**
     * It determine only undefined
     * @see {@link is._object} more specific determine
     * 
     * @example
        is.undefined(undefined);    // => true
        is('undefined', void(0));   // => true
     *
     * @name is.undefined
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'undefined': function ( data ) { return typeof data == 'undefined'; },
    /*-------------------------------------------------
        I believe that this method refers to a strict mode of data type definitions
        but typeof is really need it
    ---------------------------------------------------*/
    /**
     * always success except undefined
     * 
     * @example
        is.defined(null);       // => true
        is('defined', 0);       // => true
        is('defined', void(0)); // => false
     *
     * @name is.defined
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'defined': function ( data ) { return typeof data != 'undefined'; },
    /*
     * which additional data types requires detect ?
     * @returns: { Boolean }
     */
};