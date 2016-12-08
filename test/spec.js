var should = require('should'),
  has = require('../');

function BaseObject() {
  return {
    b: {
      c: {
        d: {
          string_notempty: 'winning!',
          string_empty: '',
          boolean_true: true,
          boolean_false: false,
          array_empty: [],
          array_notempty: [ 1, 2, 3 ],
          array_ofobjects: [
            { e: 1 },
            { e: 0 },
            { e: false }
          ],
          array_deeparray: [
            { e: [
              { f: 1 },
              { f: 0 },
              { f: false }
            ]}
          ],
          number_one: 1,
          number_zero: 0,
          null_value: null,
          'dotted.prop': 'value of dotted prop',
          'nested.dotted.prop': {
            foo: { 'dotted.props': 'should also work' }
          }
        }
      }
    }
  };
}

var a = new BaseObject();

describe('Has Deep', function () {

  afterEach(function () {
    (a).should.be.an.Object.with.properties(new BaseObject());
    (a.b).should.be.an.Object.with.properties(new BaseObject().b);
    (a.b.c).should.be.an.Object.with.properties(new BaseObject().b.c);
    (a.b.c.d).should.be.an.Object.with.properties(new BaseObject().b.c.d);
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

  describe('Value should return result from object', function () {

    it('a.b.c.d.string_notempty === "winning!"', function () {
      (has(a, 'b.c.d.string_notempty')).should.eql('winning!');
    });

    it('a.b.c === { d: { ... } }', function () {
      (has(a, 'b.c')).should.be.an.Object.with.property('d');
    });

  });

  describe('Should be able to validate path with brackets', function () {

    it('a.b.c.d.string_notempty === "winning!"', function () {
      (has(a, 'b.c[\'d\'].string_notempty')).should.eql('winning!');
    });

    it('a.b.c === { d: { ... } }', function () {
      (has(a, 'b["c"]')).should.be.an.Object.with.property('d');
    });

  });

  describe('Evaluate properties on objects in arrays', function () {

    it('when the object & property exists', function () {
      (has(a, 'b.c.d.array_ofobjects')).should.be.an.Array;
      (has(a, 'b.c.d.array_ofobjects[0]')).should.be.an.Object;
      (has(a, 'b.c.d.array_ofobjects[0].e')).should.eql(1);
      (has(a, 'b.c.d.array_ofobjects[1].e')).should.eql(0);
      (has(a, 'b.c.d.array_ofobjects[1].e')).should.eql(0);
      (has(a, 'b.c.d.array_ofobjects[2].e')).should.eql(false);
    });

    it('when the object & property exist deeply', function () {
      (has(a, 'b.c.d.array_deeparray[0].e')).should.be.an.Array;
      (has(a, 'b.c.d.array_deeparray[0].e[0]')).should.be.an.Object;
      (has(a, 'b.c.d.array_deeparray[0].e[0].f')).should.eql(1);
      (has(a, 'b.c.d.array_deeparray[0].e[1].f')).should.eql(0);
      (has(a, 'b.c.d.array_deeparray[0].e[2].f')).should.eql(false);
    });

  });

  describe('Evaluating a non-Object variable should return undefined', function () {

    it('String', function () {
      (has('a string', 'b.c.d') === undefined).should.equal(true);
      (has('', 'b.c.d') === undefined).should.equal(true);
    });

    it('Number', function () {
      (has(1, 'b.c.d') === undefined).should.equal(true);
      (has(-1, 'b.c.d') === undefined).should.equal(true);
      (has(0, 'b.c.d') === undefined).should.equal(true);
    });

    it('Boolean', function () {
      (has(true, 'b.c.d') === undefined).should.equal(true);
      (has(false, 'b.c.d') === undefined).should.equal(true);
    });

    it('null', function () {
      (has(null, 'b.c.d') === undefined).should.equal(true);
    });

    it('undefined', function () {
      (has(undefined, 'b.c.d') === undefined).should.equal(true);
    });

    it('Date', function () {
      (has(new Date(), 'b.c.d') === undefined).should.equal(true);
    });

    it('Array', function () {
      (has([], 'b.c.d') === undefined).should.equal(true);
      (has([1], 'b.c.d') === undefined).should.equal(true);
      (has(['a'], 'b.c.d') === undefined).should.equal(true);
      (has([{
        a: 'b'
      }], 'b.c.d') === undefined).should.equal(true);
    });

    it('Dotted Property', function () {
      (has(a, 'b.c.d["dotted.prop"]') === 'value of dotted prop').should.equal(true);
    });

    it('Nested Dotted Properties', function () {
      (has(a, 'b.c.d["nested.dotted.prop"].foo["dotted.props"]') === 'should also work').should.equal(true);
    });

    it('First property is dotted bracket', function () {
      (has(a.b.c, 'd["nested.dotted.prop"].foo["dotted.props"]') === 'should also work').should.equal(true);
    });

  });

});
