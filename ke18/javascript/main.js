var nn = nn || require('./neural_networks.js');
(function(){

  var node = new nn.Node({
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