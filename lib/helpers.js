
/*-------------------------------------------------
    some helpers to detect some things
---------------------------------------------------*/
var helpers = {
    /**
     * compare to equalent betwin argumetns
     *
     * @param first: { Any }
     * @param second: { Any }
     * @returns: { Boolean }
     */
    equal: function ( first, second ) {
        switch ( is.typeof(first) ) {
            case 'nan': return is.nan(second);
            case 'infinity':
            case 'undefined':
            case 'boolean':
            case 'null': return first == second;
            case 'function': return is.function(second);
            case 'symbol':
            case 'number':
            case 'string':
                var st = is.typeof(second);
                if (st!='null'&&st!='undefined') {
                    return first.toString() == second.toString();
                } else return false;
            case 'array':
            case 'object':
                var st = is.typeof(second);
                if (st=='array'||st=='object') {
                    try { return JSON.stringify(first) == JSON.stringify(second);
                    } catch ( e ) { return false; } // circular structure can not be equaled
                } else return false;
        }
        // expect its case is error
        return false;
    },
    /**
     * is.empty check the data that may contain child elements
     * without fix to => https://docs.omniref.com/js/npm/lodash/0.9.0/symbols/%3Canonymous%3E~hasDontEnumBug
     *
     * @param data: { Object|Array|Arguments|String } - without "notSafe" can check any data type
     * @param notSafe: { Boolean } - if true throw error on wrong data type
     * @returns: { Boolean }
     */
    'empty': function ( data, notSafe ) {
        // if datatype acceptable to Object.keys
        if ( data&&(typeof data == 'object'||is.string(data)||is.function(data) ) ) {
            for ( var prop in data ) 
                if ( Object.prototype.hasOwnProperty.call(data, prop) ) return false;
            return true;
        // or maybe it's must be an error ?
        } else if ( notSafe ) throw new Error('A you sure ? - '+is.typeof(data).toUpperCase()+' may contain child elements ?');
        // or maybe it's must be "true" ?
        else return true;
    },

    // alias for strict detect number
    'finite': function ( data ) { return is._number(data); },
    // this value can be involved mathematical operations
    'countable': function ( data ) { return !is.symbol(data) && !is.infinity(data) && !is.array(data) && data*1 == data && data != data+1;; },
    // addition js data detection
    'date': function ( data ) { return ts.call(data) == '[object Date]'; },
    'error': function ( data ) { return ts.call(data) == '[object Error]'; },
    'symbol': function ( data ) { return ts.call(data) == '[object Symbol]'; },
    'regexp': function ( data ) { return ts.call(data) == '[object RegExp]'; },
    'argument': function ( data ) { return ts.call(data) == '[object Arguments]'; },
    // really it is worth to install the module for this check?
    'promise': function ( data ) { return ts.call(data) == '[object Promise]'||(!!data && is.function(data['then'])); },
    /**
     * which additional data types requires detect ?
     * @returns: { Boolean }
     */
};