var $ = require('jquery');

var Mim = require('./mimesis/index.js');
var MimDom = require('./mimesis-dom.js');

$(document).ready(function() {

  var brush = new Mim.Brush(Mim.Brush.FULL);
  var board;
  var symmetry;
  var mimdom;

  function init(symmetryName, width, height) {
    var dimension = {width:width, height:height};
    board = new Mim.Board(dimension);    
    symmetry = new Mim.Symmetry.get(symmetryName)(dimension);

    $('.init').hide();
    $('.main').show();

    mimdom = new MimDom(board, symmetry, brush);
    mimdom.create('#board');

    return false;
  }


  $('#initform').submit(function(event) {
    var width = $('#width').val();
    var height = $('#height').val();
    var symmetryName = $('#symmetry').val();

    init(symmetryName, width, height);
    return false;
  });

  $('.legend').find('td').click(function() {
    brush.value = $(this).attr('status');
    mimdom.context.status = brush.value;
    markCurrentBrush(mimdom.context.status);
    return false;
  });

  $('#board').bind("contextmenu",function(e){
    brush.next();
    mimdom.context.status = brush.value;
    markCurrentBrush(mimdom.context.status);
    return false;
  }); 

  $('.actions a[href=#back]').click(function() {
    $('.init').show();
    $('.main').hide();
    board = symmetry = mimdom = null;
  });

  $('.actions a[href=#clear]').click(function() {
    mimdom.clear();
  });

  $('.actions a[href=#grid]').click(function() {
    $('.board').toggleClass('ungrid');
    mimdom.context.color = mimdom.context.color + 1;
  });

  function markCurrentBrush(value) {
    $('.legend').find('td').removeClass('current');
    $('.legend').find('[status="' + value+ '"]').addClass('current');
  }

});
