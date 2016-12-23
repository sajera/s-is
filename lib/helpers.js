
/*-------------------------------------------------
    some helpers to detect some things
---------------------------------------------------*/
var helpers = {
    /**
     * @description 
        comparison to equivalent between arguments
        ignores difference in functions
        ignores data types difference if it equivalent (1,'1')

        \* circular structure cannot be equaled. It returns false
     * @see {@link is._equal} more specific determine
     * 
     * @example
        is('equal', [1,{x:2}],[1,{x:1}]);  // => false
        is('equal', [1,{x:'1'}],[1,{x:1}]);// => true
        is('equal', [1,{x:1}],[1,{x:1}]);  // => true
        is.equal();                        // => true becose (undefined, undefined)
        is.equal(NaN, NaN);                // => true
        is('equal', [1,{x: Function}],[1,{x:function(){}}]);// => true
     *
     * @name is.equal
     * @param { any } first
     * @param { any } second
     * @returns { Boolean }
     * @function
     * @public
     */
    'equal': function ( first, second ) {
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
                    return objEqual(first, second);
                } else return false;
        }
        // expect its case is error
        return false;
    },
    /**
     * @description 
        check the data that may contain child elements. Otherwise returns false.

        \* can work not safe and throws an error when data is incorrect.
     * @see {@link https://docs.omniref.com/js/npm/lodash/0.9.0/symbols/%3Canonymous%3E~hasDontEnumBug} without fix
     * 
     * @example
        is.empty([]);        // true
        is('empty', '');     // true
        is('empty', {});     // true
        is.empty([1]);       // true
        is('empty', '[]');   // true
     *
     * @name is.empty
     * @param { any } data - without "notSafe" can check any data type
     * @param { Boolean } [notSafe=false]
     * @returns { Boolean }
     * @function
     * @public
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
    /**
     * It determine only numbers of possible to consider
     * @see {@link is._number} alias
     * @see {@link is.number} less specific determine
     * @see {@link is.countable} less specific determine
     * 
     * @example
        is.finite(1);         // => true
        is.finite(NaN);       // => false
        is('finite', null);   // => false
        is('finite', 9999999*9999999*9999999);   // => false
     *
     * @name is.finite
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'finite': function ( data ) { return is._number(data); },
    /**
     * It determine value can be involved in mathematical operations
     * @see {@link is._number} more specific determine
     * @see {@link is.number} more specific determine
     * @see {@link is.finite} more specific determine
     * 
     * @example
        is.countable(1);         // => true
        is.countable('1');       // => true
        is.countable(true);      // => true
        is.countable(NaN);       // => false
        is('countable', null);   // => false
        is('countable', 9999999*9999999*9999999);   // => false
     *
     * @name is.countable
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'countable': function ( data ) {
        return !is.symbol( data ) && !is.infinity( data ) && !is.array( data ) && data*1 == data;
    },
    /*-------------------------------------------------
        addition js data detection
    ---------------------------------------------------*/
    /**
     * It determine object of native Date ( some things like (new Date()) instanceof Date )
     * 
     * @example
        is.date(new Date);      // => true
        is('date', new Date);   // => true
     *
     * @name is.date
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'date': function ( data ) { return ts.call(data) == '[object Date]'; },
    /**
     * It determine object of error
     * 
     * @example
        is.error(new Error);        // => true
        is('error', new TypeError); // => true
     *
     * @name is.error
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'error': function ( data ) { return ts.call(data) == '[object Error]'; },
    /**
     * It determine RegExp.
     * 
     * @example
        is.regexp(new RegExp);  // => true
        is('RegExp', /1/g);     // => true
        is('regexp', '/1/g');   // => false because it isn't RegExp
     *
     * @name is.regexp
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'regexp': function ( data ) { return ts.call(data) == '[object RegExp]'; },
    /**
     * It determine object arguments.
     * 
     * @example
        var args; // get object arguments
        (function(){ args = arguments; })();
        is.argument(args);          // => true
        is('argument', args);       // => true
        is('argument', []);         // => false
     *
     * @name is.argument
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */    
    'argument': function ( data ) { return ts.call(data) == '[object Arguments]'; },
    /**
     * It determine instance Symbol. (safety for es5)
     * 
     * @example
        is.symbol(Symbol());     // => true
        is('symbol', Symbol());  // => true
     *
     * @name is.symbol
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'symbol': function ( data ) { return ts.call(data) == '[object Symbol]'; },
    /**
     * It determine instance Promise.
     * 
     * @example
        is.promise(new Promise(function(){}));  // => true
        is('promise', q.defer().promise);       // => true
        is('promise', {then: function(){}});    // => true
     *
     * @name is.promise
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'promise': function ( data ) { return ts.call(data) == '[object Promise]'||(!!data && is.function(data['then'])); },
    /*
     * which additional data types requires detect ?
     * @returns: { Boolean }
     */
};
/**
 * copmpare objects in non strict mode
 *
 * @param: { Object }
 * @returns: { Object }
 * @function
 * @privat
 * @ignore
 */
function objEqual ( first, second ) {
    var k1 = Object.keys(first);
    var k2 = Object.keys(second)
    // fast compare
    if ( k1.length != k2.length ) return false;
    else { // check on circular links
        try { JSON.stringify(first)&&JSON.stringify(second)
        } catch (e) { return false; } // circular structure cannot be equaled
        for ( var key = 0; key < k1.length; key ++ )
            if ( k2.indexOf(k1[key]) == -1 || !helpers.equal(first[k1[key]], second[k1[key]]) ) return false;
    }
    // i can not find any differents
    return true;
}