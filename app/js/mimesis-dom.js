
var $ = require('jquery');
var Mim = require('./mimesis/index.js');

module.exports = function(board, symmetry) {
  var _self = this;
  var board = board;

  this.symmetry = symmetry;
  this.context = {status: null, color: null};

  var $board = null;
  var $table = null;

  this.create = function(container) {
    $board = $(container);
    $table = createTable.call(this, board);

    $board.append($table);

    activateMouseEvents(true);
  }

  this.clear = function() {
    board.clear();
    repaint();
  }

  var createTable = function(board) {
    var $table = $('<table/>');
    for(var row = 0; row < board.dimension.height; row++) {
      var $tr = $('<tr/>');
      for(var col = 0; col < board.dimension.width; col++) {
        var sq = board.getSquare(row, col);
        
        var $td = $('<td/>')
          .attr('pos', row + '-' + col)
          .attr('status', sq.data('status'))
          .attr('color',  sq.data('color'))
          .addClass('sq-status');
        $tr.append($td);
      }

      $table.append($tr);
    }

    return $table;
  }

  var repaint = function() {
    $table.find('td').each(function() {
      var pos = $(this).attr('pos').split('-');
      var sq = board.getSquare(pos);

      $(this).attr('status', sq.data('status'));
      $(this).attr('color', sq.data('color'));
    });
  }

  // for performance, only update the necessary cells
  var paintSquares = function(orders, color) {
    orders.forEach(function(order) {
      var pos = order.row + '-' + order.col;
      var $td = $table.find('[pos='+ pos + ']');

      $td.attr('status', order.status);
      $td.attr('color', color);
    });
  }

  var updateBoardModel = function(orders, color) {
    var data = {color:color};

    orders.forEach(function(order) {
      data.status = order.status;
      board.update(order.row, order.col, data);
    });
  }

  var setStatusClassName = function($td, status) {
    $td.removeClass(function(index, css) {
      return (css.match (/\bsq-status-\S+/g) || []).join(' ');
    });
    $td.addClass('sq-status-' + status);      
  }

  var activateMouseEvents = function(slide) {
    var pressed = false;
    var origin = null;

    $table.find('td')
      .click(function() {
        var pos = $(this).attr('pos').split('-');
        var status = _self.context.status;
        var color = _self.context.color;

        var orders = _self.symmetry.calculate({row:pos[0], col:pos[1], status:status});
        updateBoardModel(orders, color);
        //paintSquares(orders);
        repaint();
      })

    if (slide) {
      $table.find('td')
        .mousedown(function() {
          pressed = true;
          origin = $(this);
        })
        .mouseup(function() {
          pressed = false;
          origin = null;
        })
        .mouseover(function() {
          if (pressed) {
            if (origin) {
              origin.click();
              origin = null;
            }

            $(this).click();
          } 
        });
    }
  }
}
