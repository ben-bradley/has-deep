# Has Deep [![Build Status](https://secure.travis-ci.org/ben-bradley/has-deep.png)](http://travis-ci.org/ben-bradley/has-deep)

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

## Example

```javascript
var has = require('has-deep');

var a = {
  b: {
    c: {
      d: {
        e: true
      }
    }
  }
};

var x = (has(a, 'b.c.d.e.f.g')) ? a.b.c.d.e.f.g : 'winning';
console.log(x); // => winning
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
