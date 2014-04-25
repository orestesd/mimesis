var chai = require('chai'),
    expect = require('chai').expect;

var basedir = '../../app/js/';
var Board = require(basedir + 'mimesis/board.js');

describe("module board.js", function() {
  
  var board;

  beforeEach(function() {
    board = new Board({width:10, height:20});
  });

  it("retrieving grid", function() {
    expect(board.grid).to.have.length(10);
    expect(board.grid[0]).to.have.length(20);
  });

  it("retrieving square with row/col parameters", function() {
    expect(board.getSquare(0, 0)).to.exists;
    expect(board.getSquare(9, 19)).to.exists;
    expect(board.getSquare(1, 2)).to.exists;
    expect(board.getSquare(-1, 2)).to.not.exists;
    expect(board.getSquare(100, 0)).to.not.exists;
  });

  it("retrieving square with row/col object", function() {
    expect(board.getSquare({row:0, col:0})).to.exists;
    expect(board.getSquare({row:9, col:19})).to.exists;
    expect(board.getSquare({row:1, col:2})).to.exists;
    expect(board.getSquare({row:-1, col:2})).to.not.exists;
    expect(board.getSquare({row:100, col:2})).to.not.exists;
  });

  it("retrieving square with row/col array", function() {
    expect(board.getSquare([0, 0])).to.exists;
    expect(board.getSquare([9, 19])).to.exists;
    expect(board.getSquare([1, 2])).to.exists;
    expect(board.getSquare([-1, 2])).to.not.exists;
    expect(board.getSquare([100, 0])).to.not.exists;
  });

  it("retrieving square with row/col as strings", function() {
    expect(board.getSquare('0', '0')).to.exists;
    expect(board.getSquare({row:'0', col:'0'})).to.exists;
    expect(board.getSquare(['0', '0'])).to.exists;
  });

  it("updating square data", function() {
    board.update(1, 2, 'foo', 'bar');
    expect(board.getSquare(1,2).data('foo')).to.be.eq('bar');
    board.update(1, 2, {'foo':'a', 'bar':'b'});
    expect(board.getSquare(1,2).data('foo')).to.be.eq('a');
    expect(board.getSquare(1,2).data('bar')).to.be.eq('b');
  });

  it("clearing the board", function() {
    var board = new Board({width:10, height:10});
    board.update(1, 2, 'foo', 'bar');
    board.clear();
    expect(board.getSquare(1, 2).data('foo')).to.not.exists
  });
  
});
