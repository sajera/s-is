/*
* Unit tests for is.js
*/
var is = require('./test.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('SUPPORT', function() {

    it('platform Node', function () {
        expect( is('platform','node')&&is['platform']('node')&&is.platform.node() ).to.equal(true);
        expect( is('platform','browser')&&is['platform']('browser')&&is.platform.browser() ).to.equal(false);
    });

    it('support', function () {
        expect( is('support','Symbol')&&is['support']('Symbol')&&is.support.symbol() ).to.equal(true);
        expect( is('support','Promise')&&is['support']('Promise')&&is.support.promise() ).to.equal(true);
    });
});