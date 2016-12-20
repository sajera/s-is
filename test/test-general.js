/*
* Unit tests for is.js
*/
var is = require('../is.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
var args;
(function(){ args = arguments; })()

function dual ( method, data ) {
    return is[method](data)&&is(method, data);
}

describe('GENERAL', function () {

    it('is.nan', function () {
        expect( dual('nan', NaN)            ).to.equal(true);
        expect( dual('nan', 'NaN')          ).to.equal(false);
        expect( dual('nan', null)           ).to.equal(false);
        expect( dual('nan', false)          ).to.equal(false);
        expect( dual('nan', undefined)      ).to.equal(false);
        expect( dual('nan', 0)              ).to.equal(false);
        expect( dual('nan', '')             ).to.equal(false);
    });

    it('is.infinity', function () {
        expect( dual('infinity', Infinity)  ).to.equal(true);
        expect( dual('infinity', 'Infinity')).to.equal(false);
        expect( dual('infinity', null)      ).to.equal(false);
        expect( dual('infinity', NaN)       ).to.equal(false);
        expect( dual('infinity', 0)         ).to.equal(false);
        expect( dual('infinity', 9999999*9999999*9999999) ).to.equal(false);
    });

    it('is.null', function () {
        expect( dual('null', null)          ).to.equal(true);
        expect( dual('null', 'null')        ).to.equal(false);
        expect( dual('null', NaN)           ).to.equal(false);
        expect( dual('null', undefined)     ).to.equal(false);
        expect( dual('null', 0)             ).to.equal(false);
        expect( dual('null', false)         ).to.equal(false);
    });
    
    it('is.number', function () {
        expect( dual('number', 9999999*9999999*9999999) ).to.equal(true);
        expect( dual('number', 0)           ).to.equal(true);
        expect( dual('number', 1)           ).to.equal(true);
        expect( dual('number', 0.5)         ).to.equal(true);
        expect( dual('number', NaN)         ).to.equal(true);
        expect( dual('number', '0')         ).to.equal(false);
        expect( dual('number', null)        ).to.equal(false);
        expect( dual('number', false)       ).to.equal(false);
        expect( dual('number', undefined)   ).to.equal(false);
    });

    it('is.string', function () {
        expect( dual('string', '')          ).to.equal(true);
        expect( dual('string', '1')         ).to.equal(true);
        expect( dual('string', '[1,2]')     ).to.equal(true);
        expect( dual('string', 1)           ).to.equal(false);
        expect( dual('string', [1])         ).to.equal(false);
    });
    
    it('is.array', function () {
        expect( dual('array', [])           ).to.equal(true);
        expect( dual('array', [1,2])        ).to.equal(true);
        expect( dual('array', '')           ).to.equal(false);
        expect( dual('array', '1.2')        ).to.equal(false);
        expect( dual('array', '[]')         ).to.equal(false);
        expect( dual('array', {})           ).to.equal(false);
        expect( dual('array', args)         ).to.equal(false);
    });



});


