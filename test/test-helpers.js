/*
* Unit tests for is.js
*/
// var is = require('../is.js');
var is = require('../is.min.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var args; // get object arguments
(function(){ args = arguments; })();

var promise2 = {then: function(){}};
var promise1 = new Promise(function(){});
var promise3 = (require('q')).defer().promise;

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

describe('HELPERS', function () {

    it('is.countable', function () {
        expect( dual('countable', 0)                ).to.equal(true);
        expect( dual('countable', 1)                ).to.equal(true);
        expect( dual('countable', 0.5)              ).to.equal(true);
        expect( dual('countable', '')               ).to.equal(true);
        expect( dual('countable', '1')              ).to.equal(true);
        expect( dual('countable', '0.5')            ).to.equal(true);
        expect( dual('countable', false)            ).to.equal(true);
        expect( dual('countable', null)             ).to.equal(false);
        expect( dual('countable', [])               ).to.equal(false);
        expect( dual('countable', [''])             ).to.equal(false);
        expect( dual('countable', ['1'])            ).to.equal(false);
        expect( dual('countable', NaN)              ).to.equal(false);
        expect( dual('countable', '0p')             ).to.equal(false);
        expect( dual('countable', undefined)        ).to.equal(false);
        expect( dual('countable', Infinity)         ).to.equal(false);
        expect( dual('countable', 9999999*9999999*9999999) ).to.equal(false);
    });

    it('is.empty', function () {
        expect( dual('empty', '')                   ).to.equal(true);
        expect( dual('empty', [])                   ).to.equal(true);
        expect( dual('empty', {})                   ).to.equal(true);
        expect( dual('empty', args)                 ).to.equal(true);
        expect( dual('empty', 1)                    ).to.equal(true);
        expect( dual('empty', undefined)            ).to.equal(true);
        expect( dual('empty', Infinity)             ).to.equal(true);
        expect( dual('empty', false)                ).to.equal(true);
        expect( dual('empty', null)                 ).to.equal(true);
        expect( dual('empty', NaN)                  ).to.equal(true);
        expect( dual('empty', '1')                  ).to.equal(false);
        expect( dual('empty', [''])                 ).to.equal(false);
        expect( dual('empty', ['1'])                ).to.equal(false);
        expect( dual('empty', {x:1})                ).to.equal(false);
    });
    
    it('is.argument', function () {
        expect( dual('argument', args)              ).to.equal(true);
        expect( dual('argument', '')                ).to.equal(false);
        expect( dual('argument', '1')               ).to.equal(false);
        expect( dual('argument', [])                ).to.equal(false);
        expect( dual('argument', ['1'])             ).to.equal(false);
        expect( dual('argument', {})                ).to.equal(false);
        expect( dual('argument', {x:1})             ).to.equal(false);
        expect( dual('argument', 1)                 ).to.equal(false);
        expect( dual('argument', undefined)         ).to.equal(false);
        expect( dual('argument', Infinity)          ).to.equal(false);
        expect( dual('argument', false)             ).to.equal(false);
        expect( dual('argument', null)              ).to.equal(false);
        expect( dual('argument', NaN)               ).to.equal(false);
    });

    it('is.promise', function () {
        expect( dual('promise', promise1)           ).to.equal(true);
        expect( dual('promise', promise2)           ).to.equal(true);
        expect( dual('promise', promise3)           ).to.equal(true);
        expect( dual('promise', args)               ).to.equal(false);
        expect( dual('promise', 1)                  ).to.equal(false);
        expect( dual('promise', '')                 ).to.equal(false);
        expect( dual('promise', [])                 ).to.equal(false);
        expect( dual('promise', {})                 ).to.equal(false);
        expect( dual('promise', {x:1})              ).to.equal(false);
    });

    it('is.regexp', function () {
        expect( dual('regexp', new RegExp)          ).to.equal(true);
        expect( dual('regexp', /1/g )               ).to.equal(true);
        expect( dual('regexp', '/1/g')              ).to.equal(false);
        expect( dual('regexp', args)                ).to.equal(false);
        expect( dual('regexp', {})                  ).to.equal(false);
    });

    it('is.symbol', function () {
        expect( dual('symbol', Symbol() )           ).to.equal(true);
        expect( dual('symbol', '')                  ).to.equal(false);
        expect( dual('symbol', /1/g )               ).to.equal(false);
        expect( dual('symbol', args)                ).to.equal(false);
        expect( dual('symbol', 1)                   ).to.equal(false);
    });

    it('is.error', function () {
        expect( dual('error', new Error )           ).to.equal(true);
        expect( dual('error', new TypeError)        ).to.equal(true);
        expect( dual('error', {message:'',stack:''})).to.equal(false);
        expect( dual('error', Error)                ).to.equal(false);
        expect( dual('error', args)                 ).to.equal(false);
    });

    it('is.date', function () {
        expect( dual('date', new Date )             ).to.equal(true);
        expect( dual('date', (new Date).valueOf())  ).to.equal(false);
        expect( dual('date', Date)                  ).to.equal(false);
        expect( dual('date', {})                    ).to.equal(false);
        expect( dual('date', 1482241471417)         ).to.equal(false);
    });

    it('is.equal', function () {
        expect( dual('equal', [1,{}],[1,{x:function(){}}]) ).to.equal(true);
        expect( dual('equal', {x:1},{x:1})          ).to.equal(true);
        expect( dual('equal', void(0), undefined)   ).to.equal(true);
        expect( dual('equal', '', '')               ).to.equal(true);
        expect( dual('equal', '1', 1)               ).to.equal(true);
        expect( dual('equal', '', '1')              ).to.equal(false);
        expect( dual('equal', null, 'null')         ).to.equal(false);
        expect( dual('equal', [1,{x:2}],[1,{x:1}])  ).to.equal(false);
    });

});
