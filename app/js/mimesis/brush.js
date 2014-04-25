var Brush = function(value) {
  this.value = value || Brush.EMPTY;

  this.next = function() {
    this.value = (parseInt(this.value) + 1) % Brush.count;
    return this.value;
  }

}

Brush.EMPTY = 0;
Brush.TL = 1;
Brush.TR = 2;
Brush.BL = 3;
Brush.BR = 4;
Brush.FULL = 5;

Brush.count = 6;

module.exports = Brush;