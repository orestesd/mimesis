
var extend = require('extend');
var Brush = require('./brush.js');


var Square = function(row, col, data) {
  this.row = row;
  this.col = col;
  var _data = data || {status:Brush.EMPTY};
  
  this.update = function(key, value) {
    if (value === undefined) {
      _data = extend(_data, key);
    } else {
      var data = {};
      data[key] = value;
      _data = extend(_data, data);
    }
    
    return _data
  };

  this.data = function(key) {
    return _data[key];
  }

};

module.exports = Square;