(function(){
  var root = this;
  var neural_networks = {};

  // via Underscore
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = neural_networks;
    }
    exports.neural_networks = neural_networks;
  } else {
    root.neural_networks = neural_networks;
  }

  neural_networks.Node = function(options) {
    var thisNode = this;
    options = options || {};
    this.inputWeights = options.inputWeights || [1, 1];
    this.threshold = options.threshold || 1;
    this.evaluate =
      options.evaluate ||
      function(sum, threshold) { return sum >= threshold ? 1 : 0; };
    this.onOutput =
      options.onOutput ||
      function() {};
    this.input = function(inputs) {
      var sum = 0, output, i;
      for(i in inputs) {
        sum += inputs[i] * (this.inputWeights[i] || 0);
      }
      output = this.evaluate(sum, this.threshold);
      this.onOutput(inputs, output, thisNode);
      return output;
    };
  };
}).call(this);