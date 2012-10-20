(function(){
  'use strict';
  var simpleKe17 = this.simpleKe17 = {};

  simpleKe17.genSigmoid = function(gain){
    if(gain === undefined) gain = 1;
    return function(x, offset){
      if(offset === undefined) offset = 0;
      return 1 / (1 + Math.exp(offset - gain * x));
    };
  };

  simpleKe17.SimpleNode = function(options){
    options = options || {};
    this.inputWeights = options.inputWeights || [1, 1];
    this.threshold = options.threshold;
    if(this.threshold === undefined) { this.threshold = 1; }
    this.sigmoid = simpleKe17.genSigmoid();

    this.evaluationFunction = function(sum, threshold){
      if(this.sigmoid(sum, threshold) > Math.random()){
        return 1;
      }
      return 0;
    };
    this.input = function(inputs){
      var i, sum = 0;
      for(i in inputs){
        sum += inputs[i] * (this.inputWeights[i] || 0);
      }
      return this.evaluationFunction(sum, this.threshold);
    };
  };
}).call(this);



// main
(function(){
  var simpleKe17 = this.simpleKe17;

  var node = new simpleKe17.SimpleNode({
    inputWeights: [3, 2, -1],
    threshold: 1
  });

  var n = 1000000;
  var acc;
  var checks = [
    [1, 1, 0],
    [1, -1, 0],
    [0, 1, 0]
  ];

  console.log("--- # javascript");
  var check_number, i;
  for(check_number in checks){
    for(i=0,acc=0; i<n; i++){
      acc += node.input(checks[check_number]);
    }
    console.log("-", acc/n);
  }
}).call(this);