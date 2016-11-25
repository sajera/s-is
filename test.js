
'use strict';

console.log('test');
// var is = require('./index.js');
var is = require('./is.min.js');

var max = 26;
var low = 10;
// coloring table only for console
var browser = is.platform.browser();
var testArgs = null;
(function () { testArgs = arguments; })(1);

var testData = {
    'Number -1'          : -1,
    'Number 0'           : 0,
    'Number 1'           : 1,
    'Number 0.1'         : 0.1,
    'String  ""'         : '',
    'String -1'          : '-1',
    'String 0'           : '0',
    'String 1'           : '1',
    'String 0.1'         : '0.1',
    'String 1*5'         : '1*5',
    'String str'         : 'str',
    'String null'        : 'null',
    'String NaN'         : 'NaN',
    'String undefined'   : 'undefined',
    'String true'        : 'true',
    'undefined'          : undefined,
    'Infinity'           : Infinity,
    '-Infinity'          : -Infinity,
    'NaN'                : NaN,
    'null'               : null,
    'true'               : true,
    'false'              : false,
    '[]'                 : [],
    '[1,2]'              : [1,2],
    '{}'                 : {},
    '{x:1}'              : {x:1},
    'new Function()'     : new Function,
    'new Date()'         : new Date,
    'new RegExp()'       : new RegExp,
    'new Promise()'      : new Promise(new Function),
    'new Error()'        : new Error(),
    'Symbol()'           : Symbol(),
    'Object arguments>[1]': testArgs,
    '9999999*9999999*9999999': 9999999*9999999*9999999
};

function red ( text ) {
    if (browser) return text;
    return '\x1B[0m\x1B[41m'+text+'\x1B[49m\x1B[0m';
}
function green ( text ) {
    if (browser) return text;
    return '\x1B[0m\x1B[42m'+text+'\x1B[49m\x1B[0m';
}
function yellow ( text ) {
    if (browser) return text;
    return '\x1B[0m\x1B[43m'+text+'\x1B[49m\x1B[0m';
}
function delimiter ( length ) {
    var list = [];
    list[length] = '';
    return list.join('-');
};
function td ( str, len ) {
    str = str.length % 2 == 0 ? str : str+' ';
    var list = [];
    list[(len - str.length)/2] = '';
    return list.join(' ')+str+list.join(' ');
};
function table ( name, methods ) {
    var line = delimiter(max+1+(methods.length*(low+1)));
    // make first headers row
    var table = yellow(td(name, max))+'|';
    for ( var method of methods ) table += td(method, low)+'|';
    // data result rows    
    for (var field in testData ) {
        table+='\n'+line;
        table+=('\n'+td(field, max)+'|');
        for ( var method of methods ) {
            try { var res = is(method, testData[field]);
            } catch ( e ) { var res = 'ERROR'; };
            table += res ? green(td(res.toString(), low))+'|' : red(td(res.toString(), low))+'|';
        }
    }
    return line+'\n'+table+'\n'+line;
};
// write tables
console.log(table('GENERAL',
    ['string', 'array', 'object', 'function', 'boolean','number', 'infinity', 'undefined', 'null', 'NaN']
), '\n');

console.log(table('STRICT',
    ['_object', '_number', 'defined']
),'\n');

console.log(table('HELPERS',
    ['date', 'regexp', 'error', 'argument', 'promise', 'symbol', 'finite', 'empty', 'countable']
), '\n');