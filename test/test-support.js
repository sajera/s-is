/*
* Unit tests for is.js
*/
// var is = require('../is.js');
var is = require('../is.min.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;
/**
 * use dualized a function dual times
 *
 * @param method: { String }
 * @param data: { Any }
 * @returns: { Boolean }
 */
function dual ( method, data, data2 ) {

    // return is[method](data, data2)&&is(method, data, data2);
    console.log(arguments, method, is[method])
    is['platform']('node')
    // return is[method](data, data2)&&is(method, data, data2);
}

describe('SUPPORT', function() {

    it('platform Node', function () {

// is.platform.node()
// is.platform('node')
// is('platform','node')
// is['platform']('node')
// dual('null', 'browser');
        expect( is('platform','node')&&is['platform']('node')&&is.platform.node() ).to.equal(true);
        expect( is('platform','browser')&&is['platform']('browser')&&is.platform.browser() ).to.equal(false);
    });

    it('support', function () {
        expect( is('support','Symbol')&&is['support']('Symbol')&&is.support.symbol() ).to.equal(true);
        expect( is('support','Promise')&&is['support']('Promise')&&is.support.promise() ).to.equal(true);
    });
});