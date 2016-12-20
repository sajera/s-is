/*
* Unit tests for is.js
*/
// var is = require('../is.js');
var is = require('../is.min.js');

// require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

// beforeEach(function() {
//     console.log('"is", test beforeEach');
// });

// afterEach(function() {
//     console.log('"is", test afterEach');
// });

describe('test for', function() {

    it('"is" properties should be a function', function() {
        for ( var method in is ) {
            expect(is[method]).to.be.a('function');
        }
    });

    require('./test-general.js')
    require('./test-strict.js'); 
    require('./test-helpers.js'); 
    require('./test-support.js');

});