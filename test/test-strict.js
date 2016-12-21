/*
* Unit tests for is.js
*/
var is = require('./test.js');

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
function dual ( method, data, data2 ) {
    return is[method](data, data2)&&is(method, data, data2);
}

describe('STRICT', function () {

    it('is._object', function () {
        expect( dual('_object', {})                 ).to.equal(true);
        expect( dual('_object', new (class q {}))   ).to.equal(true);
        expect( dual('_object', args)               ).to.equal(false);
        expect( dual('_object', new Error)          ).to.equal(false);
        expect( dual('_object', null)               ).to.equal(false);
        expect( dual('_object', [])                 ).to.equal(false);
    });

    it('is._number', function () {
        expect( dual('_number', 0)                  ).to.equal(true);
        expect( dual('_number', 1)                  ).to.equal(true);
        expect( dual('_number', 0.5)                ).to.equal(true);
        expect( dual('_number', NaN)                ).to.equal(false);
        expect( dual('_number', '0')                ).to.equal(false);
        expect( dual('_number', null)               ).to.equal(false);
        expect( dual('_number', false)              ).to.equal(false);
        expect( dual('_number', undefined)          ).to.equal(false);
        expect( dual('_number', 9999999*9999999*9999999) ).to.equal(false);
    });

    it('is.defined', function () {
        expect( dual('defined', undefined)          ).to.equal(false);
        expect( dual('defined', void(0) )           ).to.equal(false);
        expect( dual('defined', false)              ).to.equal(true);
        expect( dual('defined', '')                 ).to.equal(true);
        expect( dual('defined', 0)                  ).to.equal(true);
        expect( dual('defined', NaN)                ).to.equal(true);
        expect( dual('defined', null)               ).to.equal(true);
    });

    it('is._equal', function () {
        expect( dual('_equal', [1,{x:1}],[1,{x:1}]) ).to.equal(true);
        expect( dual('_equal', void(0), undefined)  ).to.equal(true);
        expect( dual('_equal', NaN, NaN)            ).to.equal(true);
        expect( dual('_equal', '', '')              ).to.equal(true);
        expect( dual('_equal', '1', 1)              ).to.equal(false);
        expect( dual('_equal', '', '1')             ).to.equal(false);
        expect( dual('_equal', null, 'null')        ).to.equal(false);
        expect( dual('_equal', [1,{x:2}],[1,{x:1}]) ).to.equal(false);
        expect( dual('_equal', [1,{x:'1'}],[1,{x:1}]) ).to.equal(false);
        expect( dual('_equal', [1,{x: Function}],[1,{x:function(){}}]) ).to.equal(false);
    });

});