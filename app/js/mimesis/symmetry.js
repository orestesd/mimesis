
var Brush = require('./brush.js');


var Order = function(row, col, status) {
  this.row = row;
  this.col = col;
  this.status = status;
};


var Horizontal = function(dimension) {
  var _dim = dimension;
  
  function calculateSymmetryPaintMode(type) {
    var simtype = type;
    if (type == Brush.TL) simtype = Brush.TR;
    if (type == Brush.TR) simtype = Brush.TL;
    if (type == Brush.BL) simtype = Brush.BR;
    if (type == Brush.BR) simtype = Brush.BL;
    return simtype;
  };

  return {
    
    // Devuelve todos los cuadrados que deben pintarse dada una orden
    calculate :  function(order) {
      var otherCol = _dim.width - order.col -1;
      var simOrder = new Order(order.row, otherCol, calculateSymmetryPaintMode(order.status));
      return [order, simOrder];
    }
    
  }
};

var Vertical = function(dimension) {
  var _dim = dimension;
  
  function calculateSymmetryPaintMode(type) {
    var simtype = type;
    if (type == Brush.TL) simtype = Brush.BL;
    if (type == Brush.TR) simtype = Brush.BR;
    if (type == Brush.BL) simtype = Brush.TL;
    if (type == Brush.BR) simtype = Brush.TR;
    return simtype;
  };

  return {
    
    // Devuelve todos los cuadrados que deben pintarse dada una orden
    calculate :  function(order) {
      var otherRow = _dim.height - order.row -1;
      var simOrder = new Order(otherRow, order.col, calculateSymmetryPaintMode(order.status));
      return [order, simOrder];
    }
    
  }
};

var Quad = function(dimension) {
  var _dim = dimension;
  
  function calculateSymmetryPaintMode(type) {
    var simtype = type;
    if (type == Brush.TL) simtype = Brush.TR;
    if (type == Brush.TR) simtype = Brush.TL;
    if (type == Brush.BL) simtype = Brush.BR;
    if (type == Brush.BR) simtype = Brush.BL;
    return simtype;
  };

  return {
    
    // Devuelve todos los cuadrados que deben pintarse dada una orden
    calculate :  function(order) {
      var shorizontal = new Horizontal(_dim);
      var svertical = new Vertical(_dim);
      var horizontal = shorizontal.calculate(order)[1];
      var vertical = svertical.calculate(order)[1];
      var diagonal = svertical.calculate(horizontal)[1];
      return [order, horizontal, vertical, diagonal];
    }
    
  }
};

var None = function() {
  return {
    
    // Devuelve todos los cuadrados que deben pintarse dada una orden
    calculate :  function(order) {
      return [order];
    }
    
  }
}


var Simmetry = (function() {

  var list = [];

  return {
    list : function() {
      return list;
    },

    register: function(name, symmetry) {
      list[name] = symmetry;
    },

    get : function(name) {
      return list[name];
    }
  }

})();

Simmetry.register('horizontal', Horizontal);
Simmetry.register('vertical', Vertical);
Simmetry.register('quad', Quad);
Simmetry.register('none', None);

module.exports = Simmetry;
