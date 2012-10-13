var ke17 = ke17 || require('./ke17_lib.js');
(function(){
  var sigmoid = ke17.genSigmoid();
  var evaluationFunction = function(sum, threshold){
    if(sigmoid(sum, threshold) > Math.random()){
      return 1;
    }
    return 0;
  };

  var node = new ke17.Node({
    inputWeights: [3, 2, -1],
    threshold: 1,
    evaluationFunction: evaluationFunction
  });

  var n = 1000000;
  var accs = [0,0,0];
  var checks = [
    [1,1,0],
    [1,-1,0],
    [0,1,0]
  ];
  console.log("--- javascript");
  var check_number, i;
  for(check_number in checks){
    for(i=0; i<n; i++){
      accs[check_number] += node.input(checks[check_number]);
    }
    console.log("-", accs[check_number]/n);
  }
}).call(this);