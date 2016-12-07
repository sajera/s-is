
/*-------------------------------------------------
    strict mode for checking data types
---------------------------------------------------*/
var strict = {
    // only own object not null or array or native objects
    '_object': function ( data ) { return ts.call(data) == '[object Object]'; },
    // only number not NaN or Infinity or NUMBER more than possible to consider
    '_number': function ( data ) { return is.number( data ) && !is.nan( data ) && data != data+1; },
    /**
     * which data types requires a strict detect ?
     * @returns: { Boolean }
     */
};