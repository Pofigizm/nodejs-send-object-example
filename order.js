(function (factory){
  'use strict';

  if( typeof define === 'function' && define.amd ){
    define(factory);
  } else if( typeof module != 'undefined' && 
             typeof module.exports != 'undefined' ){
    module.exports = factory();
  } else {
    window['Order'] = factory();
  }
})(function (){
  'use strict';

  // Class definition

  function Order(object) {
    object.parts = object.parts || [];
    var partsArr = [];
    object.parts.forEach(function (value, key) {
      partsArr[key] = new Order(value);
    });

    this.name = object.name || 'Default';
    this.cost = object.cost || 0;
    this.parts = partsArr;
  }

  Order.prototype.summ = function() {
    var summ = 0;
    this.parts.forEach(function(part) {
      summ += part.summ();
    });
    return summ + this.cost;
  };

  // Export
  return  Order;
});