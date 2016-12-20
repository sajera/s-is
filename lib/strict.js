
/*-------------------------------------------------
    strict mode for checking data types
---------------------------------------------------*/
var strict = {
    // only own object not null or array or native objects
    '_object': function ( data ) { return ts.call(data) == '[object Object]'; },
    // only number not NaN or Infinity or NUMBER more than possible to consider
    '_number': function ( data ) { return is.number( data ) && !is.nan( data ) && data != data+1; },
    /**
     * strict comparison to equivalent between arguments
     *
     * @param first: { Any }
     * @param second: { Any }
     * @returns: { Boolean }
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
    }
    /**
     * which data types requires a strict detect ?
     * @returns: { Boolean }
     */
};

function _objEqual ( first, second ) {
    var k1 = Object.keys(first);
    var k2 = Object.keys(second)
    // fast compare
    if ( k1.length != k2.length ) {
        return false;
    } else {
        try { // compare object and array in strings 
            if( JSON.stringify(first) != JSON.stringify(second) ) return false;
        } catch (e) { return false; } // circular structure can not be compared
        // check functions if it used like a objects
        for ( var key = 0; key < k1.length; key ++ ) {
            if ( k2.indexOf(k1[key]) == -1 || !strict._equal(first[k1[key]], second[k1[key]]) ) return false;
        }
    }
    // i can not find any differents
    return true;
}