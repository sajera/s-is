/*
 * s-is version 1.4.15 at 2018-01-26
 * @license MIT License Copyright (c) 2016 Serhii Perekhrest <allsajera@gmail.com> ( Sajera )    
 */
/** @ignore */
(function () {'use strict';

var ts = Object.prototype.toString;
/*-------------------------------------------------
    10 data types
---------------------------------------------------*/
var types = {
    /**
     * @description
        typeof return name of the data type
        it can return all 10 data types plus new data types of ES6.
     * @example
        is.typeof([]);      // => 'array'
        is('typeof', []);   // => 'array'
     * @param { any } data
     * @returns { String }
     * @function is.typeof
     * @public
     */
    'typeof': function ( data ) {
        for ( var key in types ) if ( key != 'typeof' && types[key]( data ) ) break;
        // unknown data type => with a huge proportion of the probability is an object (from specific native classes)
        if ( key == 'defined' ) return typeof data;
        else return key;
    },
    /**
     * @description It determine only NaN
     * @example
        is.nan(NaN);        // => true
        is('NaN', NaN);     // => true
        is('NaN', 'NaN');   // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.nan
     * @public
     */
    'nan': function ( data ) { return data !== data; },
    /**
     * @description It determine only infinity's
     * @example
        is.infinity(-Infinity);                     // => true
        is('Infinity', Infinity);                   // => true
        is('Infinity', 9999999*9999999*9999999);    // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.infinity
     * @public
     */
    'infinity': function ( data ) { return is.number( data ) && data == data+1; },
    /**
     * @description It determine only null
     * @example
        is.null(null);      // => true
        is('null', null);   // => true
        // otherwise false
     * @param { any } data
     * @returns { Boolean }
     * @function is.null
     * @public
     */
    'null': function ( data ) { return data === null; },
    /**
     * @description It determine only numbers (like a native typeof)
     * @see {@link is.finity} more specific determine
     * @see {@link is._number} more specific determine
     * @see {@link is.countable} less specific determine
     * @example
        is.number(1);         // => true
        is.number(NaN);       // => true
        is('number', null);   // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.number
     * @public
     */
    'number': function ( data ) { return typeof data == 'number'; },
    /**
     * @description It determine only strings
     * @example
        is.string('');          // => true
        is('string', 'null');   // => true
        is('string', []);       // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.string
     * @public
     */
    'string': function ( data ) { return typeof data == 'string'; },
    /**
     * @description It determine only booleans
     * @example
        is.boolean(true);          // => true
        is('boolean', false);      // => true
        // otherwise false
     * @param { any } data
     * @returns { Boolean }
     * @function is.boolean
     * @public
     */
    'boolean': function ( data ) { return typeof data == 'boolean'; },
    /**
     * @description It determine only functions
     * @example
        is.function(Function);      // => true
        is('function', Function);   // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.function
     * @public
     */
    'function': function ( data ) { return typeof data == 'function'; },
    /**
     * @description It determine only array
     * @example
        is.array([]);           // => true
        is('array', [1,2]);     // => true
        is('array', '1,2');     // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.array
     * @public
     */
    'array': function ( data ) { return ts.call(data) == '[object Array]'; },
    /**
     * @description It determine only objects. Except null and array
     * @example
        is.object({});          // => true
        is('object', {x:1});    // => true
        is('object', []);       // => false
        is('object', null);     // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.object
     * @public
     */
    'object': function ( data ) { return !!data && !is.array( data ) && typeof data == 'object'; },
    /**
     * @description It determine only undefined
     * @see {@link is._object} more specific determine
     * @example
        is.undefined(undefined);    // => true
        is('undefined', void(0));   // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.undefined
     * @public
     */
    'undefined': function ( data ) { return typeof data == 'undefined'; },
    /*-------------------------------------------------
        I believe that this method refers to a strict mode of data type definitions
        but typeof is really need it
    ---------------------------------------------------*/
    /**
     * @description always success except undefined
     * @example
        is.defined(null);       // => true
        is('defined', 0);       // => true
        is('defined', void(0)); // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.defined
     * @public
     */
    'defined': function ( data ) { return typeof data != 'undefined'; },
    /*
     * which additional data types requires detect ?
     * @returns: { Boolean }
     */
};


/*-------------------------------------------------
    strict mode for checking data types
---------------------------------------------------*/
var strict = {
    /**
     * @description It determine only objects of customers (developers)
     * @see {@link is.object} less specific determine
     * @example
        is._object({});                     // => true
        is('_object', {x:1});               // => true
        is('_object', new (class q {}));    // => true
        is('_object', null);                // => false
        is('_object', new Date);            // => false
        is('_object', new Error);           // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is._object
     * @public
     */
    '_object': function ( data ) { return ts.call(data) == '[object Object]'; },
    /**
     * @description strictly determine of numbers. Not NaN or Infinity or NUMBER more than possible to consider
     * @see {@link is.finity} alias
     * @see {@link is.number} less specific determine
     * @see {@link is.countable} less specific determine
     * @example
        is._number(1);         // => true
        is._number(NaN);       // => false
        is('_number', null);   // => false
        is('_number', 9999999*9999999*9999999);   // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is._number
     * @public
     */
    '_number': function ( data ) { return is.number( data ) && !is.nan( data ) && data != data+1; },
    /**
     * @description It determine classes.
     * @example
        class q {}
        class q1 extends q {}
        function Class (){}
        is.class( Class );      // => false
        is.class( q );          // => true
        is('Class', q1 );       // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.class
     * @public
     */
    'class': function ( data ) { return is.function( data ) && /^class/.test(data.toString()); },
    /**
     * @description
        strict comparison to equivalent between arguments

        \* circular structure cannot be equaled. It returns false

     * @see {@link is.equal} less specific determine
     * @example
        is('_equal', [1,{x:2}],[1,{x:1}]);  // => false
        is('_equal', [1,{x: Function}],[1,{x:function(){}}]);// => false
        is('_equal', [1,{x:'1'}],[1,{x:1}]);// => false
        is('_equal', [1,{x:1}],[1,{x:1}]);  // => true
        is._equal();                        // => true becose (undefined, undefined)
        is._equal(NaN, NaN);                // => true
     * @param { any } first
     * @param { any } second
     * @returns { Boolean }
     * @function is._equal
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
    /*
     * which data types requires a strict detect ?
     * @returns: { Boolean }
     */
};
/**
 * @description copmpare objects in strict mode
 * @param { Object }
 * @returns { Object }
 * @function
 * @private
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
     * @example
        is('equal', [1,{x:2}],[1,{x:1}]);  // => false
        is('equal', [1,{x:'1'}],[1,{x:1}]);// => true
        is('equal', [1,{x:1}],[1,{x:1}]);  // => true
        is.equal();                        // => true becose (undefined, undefined)
        is.equal(NaN, NaN);                // => true
        is('equal', [1,{x: Function}],[1,{x:function(){}}]);// => true
     * @param { any } first
     * @param { any } second
     * @returns { Boolean }
     * @function is.equal
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
     * @example
        is.empty([]);        // true
        is('empty', '');     // true
        is('empty', {});     // true
        is.empty([1]);       // false
        is('empty', '[]');   // false
     * @param { any } data
     * @param { Boolean } [notSafe=false] - without "notSafe" can check any data type
     * @returns { Boolean }
     * @function is.empty
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
     * @description It determine only numbers of possible to consider
     * @see {@link is._number} alias
     * @see {@link is.number} less specific determine
     * @see {@link is.countable} less specific determine
     * @example
        is.finite(1);         // => true
        is.finite(NaN);       // => false
        is('finite', null);   // => false
        is('finite', 9999999*9999999*9999999);   // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.finite
     * @public
     */
    'finite': function ( data ) { return is._number(data); },
    /**
     * @description It determine value can be involved in mathematical operations
     * @see {@link is._number} more specific determine
     * @see {@link is.number} more specific determine
     * @see {@link is.finite} more specific determine
     * @example
        is.countable(1);         // => true
        is.countable('1');       // => true
        is.countable(true);      // => true
        is.countable(NaN);       // => false
        is('countable', null);   // => false
        is('countable', 9999999*9999999*9999999);   // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.countable
     * @public
     */
    'countable': function ( data ) {
        return !is.symbol( data ) && !is.infinity( data ) && !is.array( data ) && data*1 == data;
    },
    /*-------------------------------------------------
        addition js data detection
    ---------------------------------------------------*/
    /**
     * @description It determine object of native Date ( some things like (new Date()) instanceof Date )
     * @example
        is.date(new Date);      // => true
        is('date', new Date);   // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.date
     * @public
     */
    'date': function ( data ) { return ts.call(data) == '[object Date]'; },
    /**
     * @description It determine object of error
     * @example
        is.error(new Error);        // => true
        is('error', new TypeError); // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.error
     * @public
     */
    'error': function ( data ) { return ts.call(data) == '[object Error]'; },
    /**
     * @description It determine RegExp.
     * @example
        is.regexp(new RegExp);  // => true
        is('RegExp', /1/g);     // => true
        is('regexp', '/1/g');   // => false because it isn't RegExp
     * @param { any } data
     * @returns { Boolean }
     * @function is.regexp
     * @public
     */
    'regexp': function ( data ) { return ts.call(data) == '[object RegExp]'; },
    /**
     * @description It determine object arguments.
     * @example
        var args; // get object arguments
        (function(){ args = arguments; })();
        is.argument(args);          // => true
        is('argument', args);       // => true
        is('argument', []);         // => false
     * @param { any } data
     * @returns { Boolean }
     * @function is.argument
     * @public
     */
    'argument': function ( data ) { return ts.call(data) == '[object Arguments]'; },
    /**
     * @description It determine instance Symbol. (safety for es5)
     * @example
        is.symbol(Symbol());     // => true
        is('symbol', Symbol());  // => true
     * @param { any } data
     * @returns { Boolean }
     * @function is.symbol
     * @public
     */
    'symbol': function ( data ) { return ts.call(data) == '[object Symbol]'; },
    /**
     * @description It determine instance Promise.
     * @example
        is.promise(new Promise(function(){}));  // => true
        is('promise', q.defer().promise);       // => true
        is('promise', {then: function(){}});    // => true
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
 * @description copmpare objects in non strict mode
 * @param { Object }
 * @returns { Object }
 * @function
 * @private
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


/*-------------------------------------------------
    detect a supported of platforms
    sometimes we want to know whether this is supported technology for this platform
---------------------------------------------------*/
var support = {
    /**
     * @description It determine platform support for Symbol (save)
     * @example
        is('support', 'symbol');
        is.support('symbol');
        is.support.symbol();
     * @returns { Boolean }
     * @function is.support.symbol
     * @public
     */
    'symbol': function () { return typeof Symbol == 'function' && is.symbol(Symbol()); },
    /**
     * @description It determine platform support for Promise (save)
     * @example
        is('support', 'promise');
        is.support('promise');
        is.support.promise();
     * @returns { Boolean }
     * @function is.support.promise
     * @public
     */
    'promise': function () { return typeof Promise == 'function' && is.promise(new Promise(new Function)); },
    /*
     * which support we may need detect ?
     * @returns: { Boolean }
     */
};


/*-------------------------------------------------
    detect a platforms (my plan make a more platform detection)
---------------------------------------------------*/
var platform = {
    /**
     * @description It determine platform Node.js (save)
     * @example
        is('platform', 'node'); // => true
        is.platform('node');    // => true
        is.platform.node();     // => true
     * @returns { Boolean }
     * @function is.platform.node
     * @public
     */
    'node': function () { return typeof process != 'undefined' && ts.call(process) == '[object process]'; },
    /**
     * @description It determine platform browser (save)
     * @example
        is('platform', 'browser'); // => true
        is.platform('browser');    // => true
        is.platform.browser();     // => true
     * @returns { Boolean }
     * @function is.platform.browser
     * @public
     */
    'browser': function () { return typeof window != 'undefined' && ts.call(window) == '[object Window]'; },
    /*
     * which platform we may need detect ?
     * @returns: { Boolean }
     */
};


/**
 * @description replace Object.assign
 * @param { Object } any count
 * @returns { Object }
 * @function extend
 * @private
 */
function extend () {
    var result = arguments[0], key = 1, field;
    for ( ; key < arguments.length; key ++ ) {
        for ( field in arguments[key] ) {
            result[field] = arguments[key][field];
        }
    }
    return result;
}

/**
 * @description
    create bound function
    with object in context and the same object in properties of bound function
 * @example
        1. is.function(new Function);   // => true
        2. is('function',new Function); // => true
 * @param { Object } checks - map of methods
 * @returns { Function }
 * @function
 * @private
 */
function dualize ( checks ) {
    return extend(is.bind(checks), checks);
}
/**
 * @description
    executor of checks to delegate a data for checking
    have a ability use upper case when string annotation name checks used
 * @example
    // the same
    is('platform', 'browser');
    is.platform('browser');
    is.platform.browser();
 * @param { String } check - it can be name of branch/check
 * @param { any } - it can be name of branch/check
 * @returns { Boolean }
 * @function
 * @public
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
var is = dualize(extend(
    {
        // to make an branch "platform" (addition ability of "is")
        'platform': dualize(platform),
        // to make an branch "support" (addition ability of "is")
        'support': dualize(support)
    },
    // standard 10 types (has a typeof be 10+ data types )
    types,
    // helpers
    helpers,
    // strict mode detect of data
    strict
));

/**
 * @description
    defination on platforms (both variants on platform like Electron)

    bower install --save s-is

    npm install --save s-is

 * @example window.is                   // in browser
 * @example var is = require('s-is')    // in Node.js
 * @exports s-is
 * @public
 */
if ( is.platform.node() ) module.exports = is;
if ( is.platform.browser() ) window['is'] = is;

})() 