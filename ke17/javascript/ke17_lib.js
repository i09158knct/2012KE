(function(){
  'use strict';
  var ke17 = this.ke17 = {};

  ke17.genSigmoid = function genSigmoid(gain){
    if(gain === undefined){
      gain = 1;
    }
    return function(x){
      return 1 / (1 + Math.exp(-gain * x));
    };
  };
}).call(this);