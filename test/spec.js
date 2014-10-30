var should = require('should'),
  has = require('../');

var a = {
  b: {
    c: {
      d: {
        e: 'winning!'
      }
    }
  }
}

describe('Has Deep', function () {

  it('should be requireable', function () {
    (has).should.be.a.Function;
  });

  it('should return "winning"', function () {
    var x = (has(a, 'b.c.d.e.f.g')) ? a.b.c.d.e.f : 'winning!';
    (x).should.equal('winning!');
  });

  it('should return false', function () {
    (has(a, 'b.c.d.e.f.g')).should.equal(false);
  });

  it('should return false', function () {
    (has(a, 'b.c.d.e.f')).should.equal(false);
  });

  it('should return "winning!"', function () {
    (has(a, 'b.c.d.e')).should.equal('winning!');
  });

});
