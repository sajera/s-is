
// MDN POLYFILL => https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(target, firstSource) {
            'use strict';
            if (target === undefined || target === null) throw new TypeError('Cannot convert first argument to object');
            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) continue;
                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                }
            }
            return to;
        }
    });
}

var extend = Object.assign;

/**
 * create bound function
 * with object in context and the same object in properties of bound function
 * @example 
        1. is.function(new Function);   // => true
        2. is('function',new Function); // => true
 *
 * @param { Object } checks - map of methods
 * @returns { Function }
 * @function
 * @private
 */
function dualize ( checks ) {
    return extend(is.bind(checks), checks);
}
/**
 * executor of checks to delegate a data for checking
 * have a ability use upper case when string annotation name checks used
 * @example
    // the same
    is('platform', 'browser');
    is.platform('browser');
    is.platform.browser();
 *
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
