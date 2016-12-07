
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
