var has = require('../');

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
