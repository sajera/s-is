(function () {'use strict';

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
/*-------------------------------------------------
    strict mode for checking data types
---------------------------------------------------*/
var strict = {
    // only own object not null or array or native objects
    '_object': function ( data ) { return ts.call(data) == '[object Object]'; },
    // only number not NaN or Infinity or NUMBER more than possible to consider
    '_number': function ( data ) { return is.number( data ) && !is.nan( data ) && data != data+1; },

};

/*-------------------------------------------------
    some helpers to detect some things
---------------------------------------------------*/
var helpers = {
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
        if ( (is.string(data)||is.object(data)||is.function(data) ) && !is.null(data) ) {
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
    'countable': function ( data ) { return !is.symbol(data) && !is.infinity(data) && data*1 == data; },
    // addition js data detection
    'date': function ( data ) { return ts.call(data) == '[object Date]'; },
    'error': function ( data ) { return ts.call(data) == '[object Error]'; },
    'symbol': function ( data ) { return ts.call(data) == '[object Symbol]'; },
    'regexp': function ( data ) { return ts.call(data) == '[object RegExp]'; },
    'argument': function ( data ) { return ts.call(data) == '[object Arguments]'; },
    // really it is worth to install the module for this check?
    'promise': function ( data ) { return ts.call(data) == '[object Promise]'||(!!data && is.function(data['then'])); },

};

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
/*-------------------------------------------------
    detect a platforms (my plan make a more platform detection)
---------------------------------------------------*/
var platform = {
	/**
	 * detect a node is very simple but it can be simple and FAST
	 * @returns: { Boolean }
	 */
    'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
    /**
	 * detect a browser is very simple but it can be simple and FAST
	 * @returns: { Boolean }
	 */
    'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
    /**
	 * which platform we may need detect ?
	 * @returns: { Boolean }
	 */
};

/*-------------------------------------------------
    dual method usage
        1. is.function(new Function); => true
        2. is('function',new Function); => true
---------------------------------------------------*/
/**
 * create bound function
 * with object in context and the same object in properties of bound function
 *
 * @param checks: { Object } - map of methods
 * @returns: { Function }
 */
function dualize ( checks ) {
    return Object.assign(is.bind(checks), checks);
}
/**
 * executor of checks to delegate a data for checking
 * have a ability use upper case when string annotation name checks used
 * EXAMPLE:
 * is('platform', 'browser');// the same
 * is.platform('browser');   // the same
 * is.platform.browser();    // the same
 *
 * @param check: { String } - it can be name of branch/check
 * @param : { any } - any (it can be name of branch/check)
 * @returns: { Boolean }
 */
function is ( check ) {
    if (
        typeof check.toLowerCase == 'function'
        && (check = check.toLowerCase())
        && typeof this[check] == 'function'
    ) return this[check].apply(null, Array.prototype.slice.call(arguments, 1));
    else throw new Error('No such check as "'+check+'"');
}

/*-------------------------------------------------
    build a user frendly =) executer for cheks
    easier to understand if seen as a map of the methods
---------------------------------------------------*/
var is = dualize(Object.assign(
	{
	    // to make an branch "platform" (addition ability of "is")
	    'platform': dualize( platform ),
	    // to make an branch "support" (addition ability of "is")
	    'support': dualize( support )
	},
	// standard 10 types (has a typeof be 10+ data types )
	types,
	// helpers
	helpers,
	// strict mode detect of data
	strict
));

/**
 * EXPORTS
 *
 * @public
 */
if ( is.platform.node() ) module.exports = is;
if ( is.platform.browser() ) window['is'] = is;
})()