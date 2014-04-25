
var Square = require('./square.js');

var Board = function(dimension) {

  // Dimension en cuadrados del tablero
  this.dimension = dimension;
  
  // devuelve el array[][] de cuadrados
  this.grid = (function(width, height) {
    var grid = new Array(width);

    for (var row = 0; row < width; row++) {
      grid[row] = new Array(height);
      for (var col = 0; col < height; col++) {
        grid[row][col] = new Square(row, col);
      }
    }
    return grid;
  }(dimension.width, dimension.height));    
  

  this.update = function(row, col, key, value) {
    var sq = this.getSquare(row, col);
    return sq.update(key, value);
  }

  this.getSquare = function(row, col) {
    var _row, _col;
    if (Object.prototype.toString.call( row ) === '[object Array]' ) {
      _row = row[0];
      _col = row[1];
    } else if (row.col) {
      _row = row.row;
      _col = row.col;
    } else {
      _row = row;
      _col = col;
    }
    
    if (Math.min(_row, _col) >= 0 && _col < this.grid.length && _row < this.grid[0].length) {
      return this.grid[_col][_row];  
    } else {
      return null;
    }
    
  }

  // devuelve el tablero a su estado inicial 
  this.clear = function() {
    for (var i = 0; i < this.dimension.width; i++) {
      for (var j = 0; j < this.dimension.height; j++) {
        this.grid[i][j] = new Square(i, j);
      }
    }
  }
};

module.exports = Board;