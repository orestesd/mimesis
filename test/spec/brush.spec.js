var chai = require('chai'),
    expect = require('chai').expect;

var basedir = '../../app/js/';
var Brush = require(basedir + 'mimesis/brush.js');

describe("module brush.js", function() {
  
  it("create default brush", function() {
    var brush = new Brush();
    expect(brush.value).to.be.eq(Brush.EMPTY);
  });

  it("create brush with value", function() {
    expect(new Brush(Brush.FULL).value).to.be.eq(Brush.FULL);
    expect(new Brush(Brush.TL).value).to.be.eq(Brush.TL);
    expect(new Brush(Brush.TR).value).to.be.eq(Brush.TR);
    expect(new Brush(Brush.BL).value).to.be.eq(Brush.BL);
    expect(new Brush(Brush.BR).value).to.be.eq(Brush.BR);
    expect(new Brush(Brush.EMPTY).value).to.be.eq(Brush.EMPTY);
  });

  it("next value", function() {
    var brush = new Brush();
    expect(brush.next()).to.equal(Brush.TL);
    expect(brush.next()).to.equal(Brush.TR);
    expect(brush.next()).to.equal(Brush.BL);
    expect(brush.next()).to.equal(Brush.BR);
    expect(brush.next()).to.equal(Brush.FULL);
    expect(brush.next()).to.equal(Brush.EMPTY);
    expect(brush.next()).to.equal(Brush.TL);
  });

  it("next value with string", function() {
    var brush = new Brush();
    brush.value = new String(Brush.TR);
    expect(brush.next()).to.equal(Brush.BL);

    brush.value = new String(Brush.FULL);
    expect(brush.next()).to.equal(Brush.EMPTY);
  });

});
