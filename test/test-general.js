/*
* Unit tests for is.js
*/
// var is = require('../is.js');
var is = require('../is.min.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var args; // get object arguments
(function(){ args = arguments; })()
/**
 * use dualized a function dual times
 *
 * @param method: { String }
 * @param data: { Any }
 * @returns: { Boolean }
 */
function dual ( method, data ) {
    return is[method](data)&&is(method, data);
}

describe('GENERAL', function () {

    it('is.nan', function () {
        expect( dual('nan', NaN)                ).to.equal(true);
        expect( dual('nan', 'NaN')              ).to.equal(false);
        expect( dual('nan', null)               ).to.equal(false);
        expect( dual('nan', false)              ).to.equal(false);
        expect( dual('nan', undefined)          ).to.equal(false);
        expect( dual('nan', 0)                  ).to.equal(false);
        expect( dual('nan', '')                 ).to.equal(false);
    });

    it('is.infinity', function () {
        expect( dual('infinity', Infinity)      ).to.equal(true);
        expect( dual('infinity', 'Infinity')    ).to.equal(false);
        expect( dual('infinity', null)          ).to.equal(false);
        expect( dual('infinity', NaN)           ).to.equal(false);
        expect( dual('infinity', 0)             ).to.equal(false);
        expect( dual('infinity', 9999999*9999999*9999999) ).to.equal(false);
    });

    it('is.null', function () {
        expect( dual('null', null)              ).to.equal(true);
        expect( dual('null', 'null')            ).to.equal(false);
        expect( dual('null', NaN)               ).to.equal(false);
        expect( dual('null', undefined)         ).to.equal(false);
        expect( dual('null', 0)                 ).to.equal(false);
        expect( dual('null', false)             ).to.equal(false);
    });
    
    it('is.number', function () {
        expect( dual('number', 9999999*9999999*9999999) ).to.equal(true);
        expect( dual('number', 0)               ).to.equal(true);
        expect( dual('number', 1)               ).to.equal(true);
        expect( dual('number', 0.5)             ).to.equal(true);
        expect( dual('number', NaN)             ).to.equal(true);
        expect( dual('number', '0')             ).to.equal(false);
        expect( dual('number', null)            ).to.equal(false);
        expect( dual('number', false)           ).to.equal(false);
        expect( dual('number', undefined)       ).to.equal(false);
    });

    it('is.string', function () {
        expect( dual('string', '')              ).to.equal(true);
        expect( dual('string', '1')             ).to.equal(true);
        expect( dual('string', '[1,2]')         ).to.equal(true);
        expect( dual('string', 1)               ).to.equal(false);
        expect( dual('string', [1])             ).to.equal(false);
    });

    it('is.boolean', function () {
        expect( dual('boolean', true)           ).to.equal(true);
        expect( dual('boolean', false)          ).to.equal(true);
        expect( dual('boolean', 0)              ).to.equal(false);
        expect( dual('boolean', 1)              ).to.equal(false);
        expect( dual('boolean', '')             ).to.equal(false);
        expect( dual('boolean', NaN)            ).to.equal(false);
        expect( dual('boolean', null)           ).to.equal(false);
        expect( dual('boolean', undefined)      ).to.equal(false);
    });

    it('is.function', function () {
        expect( dual('function', Function)      ).to.equal(true);
        expect( dual('function', new Function)  ).to.equal(true);
        expect( dual('function', class q {} )   ).to.equal(true);
        expect( dual('function', function(){})  ).to.equal(true);
        expect( dual('function', [])            ).to.equal(false);
        expect( dual('function', {})            ).to.equal(false);
        expect( dual('function', args)          ).to.equal(false);
    });

    it('is.undefined', function () {
        expect( dual('undefined', undefined)    ).to.equal(true);
        expect( dual('undefined', void(0) )     ).to.equal(true);
        expect( dual('undefined', false)        ).to.equal(false);
        expect( dual('undefined', '')           ).to.equal(false);
        expect( dual('undefined', 0)            ).to.equal(false);
        expect( dual('undefined', NaN)          ).to.equal(false);
        expect( dual('undefined', null)         ).to.equal(false);
    });

    it('is.array', function () {
        expect( dual('array', [])               ).to.equal(true);
        expect( dual('array', [1,2])            ).to.equal(true);
        expect( dual('array', '')               ).to.equal(false);
        expect( dual('array', '1.2')            ).to.equal(false);
        expect( dual('array', '[]')             ).to.equal(false);
        expect( dual('array', {})               ).to.equal(false);
        expect( dual('array', args)             ).to.equal(false);
    });

    it('is.object', function () {
        expect( dual('object', {})              ).to.equal(true);
        expect( dual('object', args)            ).to.equal(true);
        expect( dual('object', new (class q {})) ).to.equal(true);
        expect( dual('object', new Error)       ).to.equal(true);
        expect( dual('object', null)            ).to.equal(false);
        expect( dual('object', [])              ).to.equal(false);
    });

    it('is.typeof', function () {
        expect( dual('typeof', args)            ).to.equal('object');
        expect( dual('typeof', {})              ).to.equal('object');
        expect( dual('typeof', [])              ).to.equal('array');
        expect( dual('typeof', null)            ).to.equal('null');
        expect( dual('typeof', '')              ).to.equal('string');
        expect( dual('typeof', true)            ).to.equal('boolean');
        expect( dual('typeof', NaN)             ).to.equal('nan');
        expect( dual('typeof', 0)               ).to.equal('number');
        expect( dual('typeof', undefined)       ).to.equal('undefined');
        expect( dual('typeof', -Infinity)       ).to.equal('infinity');
        expect( dual('typeof', class q1 {})     ).to.equal('function');
        expect( dual('typeof', new Function)    ).to.equal('function');
    });

});
