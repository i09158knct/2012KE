(function(root){
  "use strict";

  var _ = root._;
  var FSF = root.FSF;
  var operator;

   var X = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  };

  var newSet = function(a){
    return _.extend({}, X, a);
  };

  var A = newSet({
    3: 0.8,
    5: 1,
    6: 0.6
  });

  var B = newSet({
    3: 0.7,
    4: 1,
    6: 0.5
  });

  var compact = function(a){
    if(a === true || a === false){
      return a;
    }

    var compactA = {};
    var name;
    for(name in a){
      if(a[name] > 0){
        compactA[name] = a[name];
      }
    }
    return compactA;
  };

  root.execute = function(operator, a, b){
    var result = FSF[operator](a, b);
    var cA = compact(a);
    var cB = compact(b);
    var cResult = compact(result);
    root.console.log("##", operator);
    root.console.log("a=", JSON.stringify(cA));
    root.console.log("b=", JSON.stringify(cB));
    root.console.log("=>", JSON.stringify(cResult));
    root.console.log("- - -");

    return result;
  };

  for(operator in FSF){
    root.execute(operator, A, B);
  }


})(this);
