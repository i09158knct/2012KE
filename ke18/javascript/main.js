var neural_network = neural_network || require('./neural_network.js');
var sys = require('sys');

(function(){
  var supervisorySignalData = [
    [[0, 0], [0]],
    [[0, 1], [1]],
    [[1, 0], [1]],
    [[1, 1], [1]]
  ];

  function parseSupervisorySignalData(ssData) {
    var ssTable = {};
    ssData.forEach(function(pairIO, index) {
      var inputs = pairIO[0];
      var correctOutputs = pairIO[1];
      ssTable[inputs] = correctOutputs;
    });
    return ssTable;
  }

  var supervisorySignalTable = parseSupervisorySignalData(supervisorySignalData);
  var learningRate = 1;

  var stepCount = 0;
  var feedback = function(inputs, output, node) {
    var correctOutput = supervisorySignalTable[inputs][0];
    var deltaOutput = correctOutput - output;
    var deltaInputWeights = inputs.map(function(input, index) {
      return learningRate * deltaOutput * input;
    });
    var deltaThreshold = - learningRate * deltaOutput;
    node.inputWeights = node.inputWeights.map(function(inputWeight, index) {
      return inputWeight + deltaInputWeights[index];
    });
    node.threshold = node.threshold + deltaThreshold;

    console.log(
      ++stepCount,
      inputs.toString(),
      correctOutput,
      node.inputWeights.toString(),
      node.threshold,
      output,
      deltaOutput,
      deltaInputWeights.toString(),
      deltaThreshold
    );
  };

  var node = new neural_network.Node({
    inputWeights: [0, 0],
    threshold: 0,
    onOutput: feedback
  });

  var outputs_is_all_correct = false;

  // to don't make functions within a loop (and to silence jsLint
  var comparison = function (pairIO, index) {
    var inputs = pairIO[0];
    var correctOutput = pairIO[1][0];
    var output = node.input(inputs);
    var output_is_correct = (output === correctOutput);
    outputs_is_all_correct &= output_is_correct;
  };

  while(!outputs_is_all_correct) {
    outputs_is_all_correct = true;
    supervisorySignalData.forEach(comparison);
  }

}).call(this);
