var should = require('should'),
  has = require('../');

var a = {
  b: {
    c: {
      d: {
        string_notempty: 'winning!',
        string_empty: '',
        boolean_true: true,
        boolean_false: false,
        array_empty: [],
        array_notempty: [1, 2, 3],
        number_one: 1,
        number_zero: 0,
        null_value: null
      }
    }
  }
}

describe('Has Deep', function () {

  afterEach(function () {
    (a).should.be.an.Object.with.property('b');
    (a.b).should.be.an.Object.with.property('c');
    (a.b.c).should.be.an.Object.with.property('d');
    (a.b.c.d).should.be.an.Object.with.properties({
      string_notempty: 'winning!',
      string_empty: '',
      boolean_true: true,
      boolean_false: false,
      array_empty: [],
      array_notempty: [1, 2, 3],
      number_one: 1,
      number_zero: 0,
      null_value: null
    });
  });

  it('should be requireable', function () {
    (has).should.be.a.Function;
  });

  describe('Object does not have property path', function () {

    it('should return undefined on property of undefined', function () {
      (has(a, 'b.c.d.e.f.g') === undefined).should.equal(true);
    });

    it('should return undefined on no property for defined', function () {
      (has(a, 'b.c.d.e') === undefined).should.equal(true);
    });

  });

  describe('Value is falsey/falsish', function () {

    it('value === false', function () {
      (has(a, 'b.c.d.boolean_false')).should.eql(false);
    });

    it('value === ""', function () {
      (has(a, 'b.c.d.string_empty')).should.eql('');
    });

    it('value === 0', function () {
      (has(a, 'b.c.d.number_zero')).should.eql(0);
    });

    it('value === null', function () {
      (has(a, 'b.c.d.null_value') === null).should.eql(true);
    });

  });

});
