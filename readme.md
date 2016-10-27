
### Reason

**My eyes feel pain when i see:**

```javascript
if ( x+'' === x ) { ... } // if that string
if ( x*1 === x ) { ... } // if that number
... // and many others
```
---------------
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
# s-is

**Let me introduce a simple way to ensure the correctness of the target data. As I see it.**

### installation
```shell
npm i s-is --save
```

In javascript definition of data types associated with some difficulties. Due to the fact that the original methods do not always work as expected. We are forced to turn to non-standard decisions. Not always, these decisions are correct, and even rarer - code still readable.
**If we are interested in conditional of 10 data types.And we want them correctly and to determine.**


>**NaN, null, undefined, infinity, number, string, boolean, function, array, object**

### Example

```javascript
var is = require('s-is');

is.array([]);      // => true
is.array({});      // => false
is('Array', []);   // => true

is.nan('Hello !');       // => false
is('NaN','Hello !');     // => false
is('NaN','Hello !' - 2); // => true
is.nan(NaN);             // => true 
```
**Note -** This approach is implemented for all the previously identified 10 of types data.

### ES6

It gives us a lot of benefits and expands our capabilities. And also adds surprises.
```javascript
// try it
typeof Symbol() == 'symbol'; // => true
// but
typeof ( new Promise(new Function, new Function) ) == 'object'; // => true
// or
typeof (class test {}) == 'function'; // => true
```

### typeof

In connection with such innovations was established method of determining the 10 data types, plus all the innovations.

```javascript
var is = require('s-is');

is.typeof( {} );               // => "object" 
is.typeof( [] );               // => "array" 
is.typeof( NaN );              // => "nan"
is.typeof( Infinity );         // => "infinity"
is.typeof( null );             // => "null" 
is.typeof( 5 );                // => "number"
is.typeof( '5' );              // => "string"
is.typeof( true );             // => "boolean"
is.typeof( undefined );        // => "undefined"
is.typeof( function () {} );   // => "function"
// just more example
is.typeof( Symbol() );         // => "symbol"
is.typeof( process );          // => "object"
is.typeof( new function Test () {} ); // => "object" 
is.typeof( new class test {} );// => "object"
is.typeof( class test {} );    // => "function"
```

### Helpers

And in the end, we frequently need to define some specific objects. This applies mainly to proven technologies.

```javascript
var is = require('s-is');
// date
is.date( new Date() );    // => true
is('date', new Date() );  // => true
is('date', (new Date()).getDate() );  // => false
// promise
var p = new Promise(new Function, new Function);
is.promise( p );                       // => true
is('promise', p );                     // => true
is.promise( {} );                      // => false
is('promise', {then: new Function} );  // => true
// isn't native
is._object( {} );                      // => true
is._object( new function Test () {} ); // => true
is._object( new class test {} );       // => true
is('_object',  window );               // => false
is('_object', process );               // => false
is('_object', new Promise(new Function, new Function) );// => false
// arguments
function test () {
    console.log('is.argument =>', is.argument(arguments)); // => true
};
```

**available list :**

**for version 1.0.0 :**
	date, error, symbol, regexp, _object, argument, promise, empty, defined



[npm-image]: https://badge.fury.io/js/s-is.svg
[npm-url]: https://npmjs.org/package/s-is
[license-image]: http://img.shields.io/npm/l/s-is.svg
[license-url]: LICENSE