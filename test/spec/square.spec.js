var chai = require('chai'),
    expect = require('chai').expect;

var basedir = '../../app/js/';
var Square = require(basedir + 'mimesis/square.js');

describe("module square.js", function() {
  
  beforeEach(function() {
  });

  it("init without data", function() {
    var sq = new Square(1, 2);
    expect(sq.row).to.be.eq(1);
    expect(sq.col).to.be.eq(2);
  });

  it("init with empty data", function() {
    var sq = new Square(1, 2, {});
    expect(sq.row).to.be.eq(1);
    expect(sq.col).to.be.eq(2);
  });

  it("init with data", function() {
    var sq = new Square(1, 2, {foo:'bar'});
    expect(sq.row).to.be.eq(1);
    expect(sq.col).to.be.eq(2);
    expect(sq.data('foo')).to.be.eq('bar');
  });

  it("updating data as key/value", function() {
    var sq = new Square(1, 2, {foo:'a', bar:'b'});
    var updated = sq.update('bar', 'c')
    expect(updated).to.deep.eq({foo:'a', bar:'c'});
  });

  it("updating data with object", function() {
    var sq = new Square(1, 2, {foo:'a', bar:'b'});
    var updated = sq.update('bar', 'c');
    expect(updated).to.deep.eq({foo:'a', bar:'c'});
  });

});
