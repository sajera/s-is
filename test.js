
console.log('test');
// var is = require('./index.js');
var is = require('./is.min.js');

(function () { console.log('is.argument', is.argument(arguments), 'is.empty', is.empty(arguments), '\n', arguments) })(1);
(function () { console.log('is.argument', is.argument(arguments), 'is.empty', is.empty(arguments), '\n', arguments) })();

console.log(
	'1) is.nan -',
		'\n\tNaN:', is.nan(NaN),
		'\n\t"NaN":', is.nan("NaN"),
		'\n\t5*0:', is.nan(5*0),

	'\n\n2) is.null -',
		'\n\tnull:', is.null(null),
		'\n\t"null":', is.null("null"),
		'\n\tundefined:', is.null(undefined),
		'\n\t{}:', is.null({}),

	'\n\n3) is.infinity -',
		'\n\tInfinity:', is.infinity(Infinity),
		'\n\t-Infinity:', is.infinity(-Infinity),
		'\n\t"Infinity":', is.infinity("Infinity"),
		'\n\t9999999*9999999*9999999:', is.infinity(9999999*9999999*9999999),

	'\n\n4) is.number -',
		'\n\t0:', is.number(0),
		'\n\ttrue:', is.number(true),
		'\n\t"1":', is.number("1"),
		'\n\t"":', is.number(""),
		'\n\tNaN:', is.number(NaN),
		'\n\tInfinity:', is.number(Infinity),
		'\n\t9999999*9999999*9999999:', is.number(9999999*9999999*9999999),

	'\n\n5) is._number -',
		'\n\t0:', is._number(0),
		'\n\ttrue:', is._number(true),
		'\n\t"1":', is._number("1"),
		'\n\t"":', is._number(""),
		'\n\tNaN:', is._number(NaN),
		'\n\tInfinity:', is._number(Infinity),
		'\n\t9999999*9999999*9999999:', is._number(9999999*9999999*9999999),

	'\n\n6) is.string -',
		'\n\t"1":', is.string("1"),
		'\n\t[1]:', is.string([1]),
		'\n\t"[1]":', is.string("[1]"),
		'\n\t1:', is.string(1),

	'\n\n7) is.boolean -',
		'\n\ttrue:', is.boolean(true),
		'\n\tfalse:', is.boolean(false),
		'\n\t"true":', is.boolean("true"),
		'\n\t0:', is.boolean(0),
		'\n\t"":', is.boolean(""),
		'\n\tundefined:', is.boolean(undefined),

	'\n\n8) is.function -',
		'\n\tnew Function:', is.function(new Function),
		'\n\tfunction(){}:', is.function(function(){}),
		'\n\t"function(){}":', is.function("function(){}"),
		'\n\tis:', is.function(is),

	'\n\n9) is.array -',
		'\n\t[]:', is.array([]),
		'\n\t{}:', is.array({}),
		'\n\t"[]":', is.array("[]"),

	'\n\n10) is.undefined -',
		'\n\tundefined:', is.undefined(undefined),
		'\n\tnull:', is.undefined(null),
		'\n\tfalse:', is.undefined(false),
		'\n\t"":', is.undefined(""),

	'\n\n11) is.object -',
		'\n\t[]:', is.object([]),
		'\n\t{}:', is.object({}),
		'\n\tnull:', is.object(null),
		'\n\tfunction(){}:', is.object(function(){}),
		'\n\tnew function(){}:', is.object(new function(){}),
		'\n\t'+(is('platform', 'node') ? 'process' : 'window')+':', is.object( (is('platform', 'node') ? process : window) ),

	'\n\n12) is._object -',
		'\n\t[]:', is._object([]),
		'\n\t{}:', is._object({}),
		'\n\tnull:', is._object(null),
		'\n\tfunction(){}:', is._object(function(){}),
		'\n\tnew function(){}:', is._object(new function(){}),
		'\n\t'+(is('platform', 'node') ? 'process' : 'window')+':', is._object( (is('platform', 'node') ? process : window) )

	
);


is.platform.browser()&&(window.is = is);