# Has Deep [![Build Status](https://secure.travis-ci.org/ben-bradley/has-deep.png)](http://travis-ci.org/ben-bradley/has-deep) [Slides](https://slides.com/ben-bradley/has-deep)

[![NPM](https://nodei.co/npm/has-deep.png?downloads=true)](https://nodei.co/npm/has-deep/)

This module is designed to simplify the painful process of validating the deep properties of an object.

## About

```javascript
var a = {
  b: {
    c: {
      d: {
        e: true
      }
    }
  }
};
```

In JavaScript, if you try to find a property on an `undefined`, the script will throw an error.

This sucks.

```javascript
// this throws your app
var x = a.b.c.d.e.f.g;
```

The most common way to solve the problem is to have repetitious blocks of if-then code to slowly validate the property path.

This also sucks, but it works.

```javascript
var x = (a && a.b && a.b.c && a.b.c.d && a.b.c.d.e && a.b.c.d.e.f && a.b.c.d.e.f.g) ? a.b.c.d.e.f.g : 'winning';
console.log(x); // => winning
```

I'm writing this module to help make it suck less.

```javascript
var has = require('has-deep');

var x = (has(a, 'b.c.d.e.f.g')) ? a.b.c.d.e.f.g : 'winning';
console.log(x); // => winning
```

Yeah, the result is the same, but look at how much less validation there is!

## `has(object, path)`

- `object` - _Object_ This is the source object that you want to validate.
- `path` - _String_ This is a period-delimited string that is the property path you want to validate.
- Returns the value at the end of the `path` or `undefined` if the path doesn't exist.

## Example

```javascript
var has = require('has-deep');

var a = {
  b: {
    c: {
      d: {
        e: 'winning!',
        f: [{
          g: false
        }, {
          g: true
        }]
      }
    }
  }
};

console.log(has(a, 'b.c.d.e.f.g')); // => undefined
console.log(has(a, 'b.c.d.e.f')); // => undefined
console.log(has(a, 'b.c.d.e')); // => "winning!"
console.log(has(a, 'b.c.d')); // => { e: "winning!" }
console.log(has(a, 'b.c.d.f[0].g')); // => false
console.log(has(a, 'b.c.d.f[1].g')); // => true
```

## Install

```
npm install has-deep
```

-or-

```
npm install ben-bradley/has-deep
```

## Test

```
npm test
```

-or-

```
mocha -R spec
```

## Versions
- 1.0.1 - Catch when first property is bracketed
- 1.0.0 - Able to handle dotted properties
- 0.0.6 - Using `Object.prototype.toString.call(object) === '[object Object]'` for when `toString()` is overwritten =(
- 0.0.4 - Providing a non-Object variabl for evaluation will return `undefined` instead of Throwing
- 0.0.3 - Refactored lib to be more functional, modified deep-array valitaion to detect falsey values, added comments
- 0.0.2 - Added deep-array validation
- 0.0.1 - Inital commit
