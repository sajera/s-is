
console.log('test');
var is = require('./index.js');
// var is = require('./is.min.js');

(function () { console.log('is.argument', is.argument(arguments), 'is.empty', is.empty(arguments), '\n', arguments) })(1);
(function () { console.log('is.argument', is.argument(arguments), 'is.empty', is.empty(arguments), '\n', arguments) })();


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
    'Symbol()'           : Symbol(),
    '9999999*9999999*9999999': 9999999*9999999*9999999
};
var max = 26;
// only for console
var browser = is.platform.browser();
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
function td ( str ) {
    str = str.length % 2 == 0 ? str : str+' ';
    var list = [];
    list[(max - str.length)/2] = '';
    return list.join(' ')+str+list.join(' ');
};
function table ( methods ) {
    var table = yellow(td('DATA'))+'|';
    for ( var method of methods ) {
        table += yellow(td(method))+'|';
    }
    var line = delimiter(((methods.length+1)*max)+methods.length+1);
    // make first headers row
    table += '\n'+line;
    for (var field in testData ) {
        // each row of table
        table+=('\n'+td(field)+'|');
        for ( var method of methods ) {
            try { var res = is(method, testData[field]);
            } catch ( e ) { var res = 'ERROR'; };
            table += res ? green(td(res.toString()))+'|' : red(td(res.toString()))+'|';
        }
        table+='\n'+line;
    }
    return line+'\n'+table;
};

console.log( red('GENERAL 1-5') );
console.log(table(['string', 'array', 'object', 'function', 'boolean']), '\n\n');
console.log(red('GENERAL 6-10'));
console.log(table(['number', 'infinity', 'undefined', 'null', 'NaN']), '\n\n');
console.log(red('STRICT'));
console.log(table(['_object', '_number', 'defined']), '\n\n');
console.log(red('HELPERS 1-5'));
console.log(table(['date', 'regexp', 'error', 'argument', 'promise']), '\n\n');
console.log(red('HELPERS 6-9'));
console.log(table(['symbol', 'finite', 'empty', 'countable']), '\n\n');


is.platform.browser()&&(window.is = is);