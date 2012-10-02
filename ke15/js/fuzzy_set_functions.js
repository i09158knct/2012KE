
(function(root){
  "use strict";
  var _ = root._;
  var FSF = {};
  root.FSF = FSF;

  FSF.equal = function(a, b){
    return _.all(a, function(value, name){
      return a[name] === b[name];
    });
  };

  FSF.isSubset = function(a, b){
    return _.all(a, function(value, name){
      return a[name] <= b[name];
    });
  };

  FSF.intersection = function(a, b){
    var intersection = _.clone(a);
    _.each(b, function(value, name){
      if(b[name] < a[name]){
        intersection[name] = b[name];
      }
    });
    return intersection;
  };

  FSF.union = function(a, b){
    var union = _.clone(a);
    _.each(b, function(value, name){
      if(b[name] > a[name]){
        union[name] = b[name];
      }
    });
    return union;
  };

  FSF.complement = function(a){
    var complement = {};
    _.each(a, function(value, name){
      complement[name] = 1 - value;
    });
    return complement;
  };

  FSF.product = function(a, b){
    var product = {};
    _.each(a, function(value, name){
      product[name] = a[name] * b[name];
    });
    return product;
  };

  FSF.sum = function(a, b){
    var sum = {};
    _.each(a, function(value, name){
      sum[name] = (a[name] + b[name]) - (a[name] * b[name]);
    });
    return sum;
  };

  FSF.boundedProduct = function(a, b){
    var bProduct = {};
    _.each(a, function(value, name){
      bProduct[name] = Math.max(0, a[name] + b[name] - 1);
    });
    return bProduct;
  };

  FSF.boundedSum = function(a, b){
    var bSum = {};
    _.each(a, function(value, name){
      bSum[name] = Math.min(1, a[name] + b[name]);
    });
    return bSum;
  };

  FSF.boundedDifference = function(a, b){
    var bDiff = {};
    _.each(a, function(value, name){
      bDiff[name] = Math.max(0, a[name] - b[name]);
    });
    return bDiff;
  };


})(this);
