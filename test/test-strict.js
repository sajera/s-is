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

describe('STRICT', function () {

    it('is._object', function () {
        expect( dual('_object', {})             ).to.equal(true);
        expect( dual('_object', new (class q {})) ).to.equal(true);
        expect( dual('_object', args)           ).to.equal(false);
        expect( dual('_object', new Error)      ).to.equal(false);
        expect( dual('_object', null)           ).to.equal(false);
        expect( dual('_object', [])             ).to.equal(false);
    });

    it('is._number', function () {
        expect( dual('_number', 0)              ).to.equal(true);
        expect( dual('_number', 1)              ).to.equal(true);
        expect( dual('_number', 0.5)            ).to.equal(true);
        expect( dual('_number', NaN)            ).to.equal(false);
        expect( dual('_number', '0')            ).to.equal(false);
        expect( dual('_number', null)           ).to.equal(false);
        expect( dual('_number', false)          ).to.equal(false);
        expect( dual('_number', undefined)      ).to.equal(false);
        expect( dual('_number', 9999999*9999999*9999999) ).to.equal(false);
    });

    it('is.defined', function () {
        expect( dual('defined', undefined)      ).to.equal(false);
        expect( dual('defined', void(0) )       ).to.equal(false);
        expect( dual('defined', false)          ).to.equal(true);
        expect( dual('defined', '')             ).to.equal(true);
        expect( dual('defined', 0)              ).to.equal(true);
        expect( dual('defined', NaN)            ).to.equal(true);
        expect( dual('defined', null)           ).to.equal(true);
    });
});