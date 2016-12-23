
/*-------------------------------------------------
    strict mode for checking data types
---------------------------------------------------*/
var strict = {
    /**
     * It determine only objects of customers (developers)
     * @see {@link is.object} less specific determine
     * 
     * @example
        is._object({});                     // => true
        is('_object', {x:1});               // => true
        is('_object', new (class q {}));    // => true
        is('_object', null);                // => false
        is('_object', new Date);            // => false
        is('_object', new Error);           // => false
     *
     * @name is._object
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    '_object': function ( data ) { return ts.call(data) == '[object Object]'; },
    /**
     * It determine only numbers not NaN or Infinity or NUMBER more than possible to consider
     * @see {@link is.finity} alias
     * @see {@link is.number} less specific determine
     * @see {@link is.countable} less specific determine
     * 
     * @example
        is._number(1);         // => true
        is._number(NaN);       // => false
        is('_number', null);   // => false
        is('_number', 9999999*9999999*9999999);   // => false
     *
     * @name is._number
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    '_number': function ( data ) { return is.number( data ) && !is.nan( data ) && data != data+1; },
    /**
     * @description 
        strict comparison to equivalent between arguments
        
        \* circular structure cannot be equaled. It returns false

     * @see {@link is.equal} less specific determine
     * 
     * @example
        is('_equal', [1,{x:2}],[1,{x:1}]);  // => false
        is('_equal', [1,{x: Function}],[1,{x:function(){}}]);// => false
        is('_equal', [1,{x:'1'}],[1,{x:1}]);// => false
        is('_equal', [1,{x:1}],[1,{x:1}]);  // => true
        is._equal();                        // => true becose (undefined, undefined)
        is._equal(NaN, NaN);                // => true
     *
     * @name is._equal
     * @param { any } first
     * @param { any } second
     * @returns { Boolean }
     * @function
     * @public
     */
    '_equal': function ( first, second ) {
        switch ( is.typeof(first) ) {
            case 'nan': return is.nan(second);
            case 'infinity':
            case 'undefined':
            case 'boolean':
            case 'symbol':
            case 'null': return first == second;
            case 'number': return is.number(second)&&first == second;
            case 'string': return is.string(second)&&first == second;
            case 'function': return is.function(second)&&first.toString() == second.toString();
            case 'array':
            case 'object':
                var st = is.typeof(second);
                if (st=='array'||st=='object') {
                    return _objEqual( first, second );
                } else return false;
        }
        // expect its case is error
        return false;
    },
    /**
     * It determine classes.
     * 
     * @example
        class q {}
        class q1 extends q {}
        function Class (){}
        is.class( Class );      // => false
        is.class( q );          // => true
        is('Class', q1 );       // => true
     *
     * @name is.class
     * @param { any } data
     * @returns { Boolean }
     * @function
     * @public
     */
    'class': function ( data ) { return is.function( data ) && /^class/.test(data.toString()); },
    /*
     * which data types requires a strict detect ?
     * @returns: { Boolean }
     */
};
/**
 * copmpare objects in strict mode
 *
 * @param: { Object }
 * @returns: { Object }
 * @function
 * @privat
 * @ignore
 */
function _objEqual ( first, second ) {
    var k1 = Object.keys(first);
    var k2 = Object.keys(second)
    // fast compare
    if ( k1.length != k2.length )return false;
    else {
        try { if( JSON.stringify(first) != JSON.stringify(second) ) return false;
        } catch (e) { return false; } // circular structure cannot be equaled
        for ( var key = 0; key < k1.length; key ++ ) // check functions
            if ( k2.indexOf(k1[key]) == -1 || !strict._equal(first[k1[key]], second[k1[key]]) ) return false;
    }
    // i can not find any differents
    return true;
}
