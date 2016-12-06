
var ts = Object.prototype.toString;

/*-------------------------------------------------
    10 data types
---------------------------------------------------*/
var types = {
    /**
     * is.typeof return name of the data type
     * it can return all 10 data types plus new data types of ES6 and more
     *
     * @param data: { Any }
     * @returns: { String }
     */
    'typeof': function ( data ) {
        for ( var key in types ) if ( key != 'typeof' && types[key]( data ) ) break;
        // unknown data type => with a huge proportion of the probability is an object (from specific native classes)
        if ( key == 'defined' ) return typeof data;
        else return key;
    },
    // real NaN  - this unique number is not equal even to herself
    'nan': function ( data ) { return data !== data; },
    // real Infinity  - this unique number equal only to herself(+/-)
    'infinity': function ( data ) { return data === Infinity || data === -Infinity; },
    // real null  - this unique object equal only to herself
    'null': function ( data ) { return data === null; },
    // for typeof which can detect 10 types of data the number is not a NaN or (+/-)Infinity
    'number': function ( data ) { return typeof data == 'number'; },
    'string': function ( data ) { return typeof data == 'string'; },
    'boolean': function ( data ) { return typeof data == 'boolean'; },
    'function': function ( data ) { return typeof data == 'function'; },
    'undefined': function ( data ) { return typeof data == 'undefined'; },
    'array': function ( data ) { return ts.call(data) == '[object Array]'; },
    // for typeof which can detect 10 types of data the object is not a null or Array
    'object': function ( data ) { return !!data && !is.array( data ) && typeof data == 'object'; },
    /**
     * I believe that this method refers to a strict mode of data type definitions
     * but typeof is really need it
     */
    'defined': function ( data ) { return typeof data != 'undefined'; },
};