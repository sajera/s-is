
console.log('test');
var is = require('./index.js');

function s () { console.log('is.argument', is.argument(arguments)) };

// console.log(
// 	'default:						', uid(),
// 	'\nempty string "":				', uid('""'),
// 	'\nXXXXXX:							', uid('XXXXXX'),
// 	'\nSSSSSS:							', uid('SSSSSS'),
// 	'\nNNNNNN:							', uid('NNNNNN'),
// 	'\nwrong data type {}:				', uid({}),
// 	'\ncorrect data type "null":		', uid('null'),
// 	'\nXXX-4NNN-dummy-SSS:				', uid('XXX-4NNN-dummy-SSS'),
// 	'\nSuper-XXXXXX-NNNNN-SSSSSS:		', uid('Super-XXXXXX-NNNNN-SSSSSS'),
// 	'\n(new Date().valueOf())+"-XXXXXXXXX-4NNN-dummy-SSS": ', uid((new Date().valueOf())+'-XXXXXXXXX-4NNN-dummy-SSS')
// );

if ( typeof window != 'undefined' ) {
	window.is = is;
}