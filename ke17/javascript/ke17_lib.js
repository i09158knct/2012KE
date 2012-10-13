(function(){
  var root = this;
  var ke17 = {};

  // via Backbone
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = ke17;
    }
    exports.ke17 = ke17;
  } else {
    root.ke17 = ke17;
  }

  ke17.genSigmoid = function genSigmoid(gain){
    if(gain === undefined) gain = 1;
    return function(x, offset){
      if(offset === undefined) offset = 0;
      return 1 / (1 + Math.exp(offset - gain * x));
    };
  };

  ke17.SimpleNode = function(options){
    options = options || {
      inputWeights: [1, 1],
      threshold: 1,
      evaluationFunction: function(sum, threshold){
        return sum >= threshold ? 1 : 0;
      }
    };
    this.inputWeights = options.inputWeights;
    this.threshold = options.threshold;
    this.evaluationFunction = options.evaluationFunction;
    this.input = function(inputs){
      var i, sum = 0;
      for(i in inputs){
        sum += inputs[i] * (this.inputWeights[i] || 0);
      }
      return this.evaluationFunction(sum, this.threshold);
    };
  };
}).call(this);