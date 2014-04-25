var chai = require('chai'),
    expect = require('chai').expect;

var basedir = '../../app/js/';
var Symmetry = require(basedir + 'mimesis/symmetry.js'),
    Brush = require(basedir + 'mimesis/brush.js');

describe("module symmetry.js", function() {
  
  var symmetry;


  describe("horizontal", function() {

    beforeEach(function() {
      symmetry = Symmetry.get('horizontal');
    });
  
    it("calculates the symmetries in square", function() {
      var sym = new symmetry({width:10, height:10});
      var order = sym.calculate({row:1, col:2, status:Brush.FULL})[1];
      expect(order.row).to.equal(1);
      expect(order.col).to.equal(7);
      expect(order.status).to.equal(Brush.FULL);
      
      order = sym.calculate({row:0, col:0, status:Brush.TL})[1];
      expect(order.row).to.equal(0);
      expect(order.col).to.equal(9);
      expect(order.status).to.equal(Brush.TR);
      
      order = sym.calculate({row:9, col:9, status:Brush.BL})[1];
      expect(order.row).to.equal(9);
      expect(order.col).to.equal(0);
      expect(order.status).to.equal(Brush.BR);
    });

    it("calculates the symmetries in portrait board", function() {
      var sym = new symmetry({width:10, height:20});
      var order = sym.calculate({row:1, col:2, status:Brush.FULL})[1];
      expect(order.row).to.equal(1);
      expect(order.col).to.equal(7);
      expect(order.status).to.equal(Brush.FULL);
      
      order = sym.calculate({row:0, col:0, status:Brush.TL})[1];
      expect(order.row).to.equal(0);
      expect(order.col).to.equal(9);
      expect(order.status).to.equal(Brush.TR);
      
      order = sym.calculate({row:9, col:9, status:Brush.BL})[1];
      expect(order.row).to.equal(9);
      expect(order.col).to.equal(0);
      expect(order.status).to.equal(Brush.BR);
    });

    it("calculates the symmetries in landscape board", function() {
      var sym = new symmetry({width:20, height:10});
      var order = sym.calculate({row:1, col:2, status:Brush.FULL})[1];
      expect(order.row).to.equal(1);
      expect(order.col).to.equal(17);
      expect(order.status).to.equal(Brush.FULL);
      
      order = sym.calculate({row:0, col:0, status:Brush.TL})[1];
      expect(order.row).to.equal(0);
      expect(order.col).to.equal(19);
      expect(order.status).to.equal(Brush.TR);
      
      order = sym.calculate({row:19, col:19, status:Brush.BL})[1];
      expect(order.row).to.equal(19);
      expect(order.col).to.equal(0);
      expect(order.status).to.equal(Brush.BR);
    });
  });


  describe("vertical", function() {

    beforeEach(function() {
      symmetry = Symmetry.get('vertical');
    });
  
    it("calculates the symmetries in square", function() {
      var sym = new symmetry({width:10, height:10});
      var order = sym.calculate({row:1, col:2, status:Brush.FULL})[1];
      expect(order.row).to.equal(8);
      expect(order.col).to.equal(2);
      expect(order.status).to.equal(Brush.FULL);
      
      order = sym.calculate({row:0, col:0, status:Brush.TL})[1];
      expect(order.row).to.equal(9);
      expect(order.col).to.equal(0);
      expect(order.status).to.equal(Brush.BL);
      
      order = sym.calculate({row:9, col:9, status:Brush.BL})[1];
      expect(order.row).to.equal(0);
      expect(order.col).to.equal(9);
      expect(order.status).to.equal(Brush.TL);
    });

    it("calculates the symmetries in portrait board", function() {
      var sym = new symmetry({width:10, height:20});
      var order = sym.calculate({row:1, col:2, status:Brush.FULL})[1];
      expect(order.row).to.equal(18);
      expect(order.col).to.equal(2);
      expect(order.status).to.equal(Brush.FULL);
      
      order = sym.calculate({row:0, col:0, status:Brush.TL})[1];
      expect(order.row).to.equal(19);
      expect(order.col).to.equal(0);
      expect(order.status).to.equal(Brush.BL);
      
      order = sym.calculate({row:9, col:9, status:Brush.BL})[1];
      expect(order.row).to.equal(10);
      expect(order.col).to.equal(9);
      expect(order.status).to.equal(Brush.TL);
    });

    it("calculates the symmetries in landscape board", function() {
      var sym = new symmetry({width:20, height:10});
      var order = sym.calculate({row:1, col:2, status:Brush.FULL})[1];
      expect(order.row).to.equal(8);
      expect(order.col).to.equal(2);
      expect(order.status).to.equal(Brush.FULL);
      
      order = sym.calculate({row:0, col:0, status:Brush.TL})[1];
      expect(order.row).to.equal(9);
      expect(order.col).to.equal(0);
      expect(order.status).to.equal(Brush.BL);
      
      order = sym.calculate({row:9, col:9, status:Brush.BL})[1];
      expect(order.row).to.equal(0);
      expect(order.col).to.equal(9);
      expect(order.status).to.equal(Brush.TL);
    });
  });

});
