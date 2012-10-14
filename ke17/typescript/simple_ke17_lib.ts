module simpleKe17
{
  export function genSigmoid(gain?: number) {
      if(gain === undefined) gain = 1;
      return (x: number, offset?: number): number => {
        if(offset === undefined) offset = 0;
        return 1 / (1 + Math.exp(offset - gain * x));
      };
  }

  export class SimpleNode {
    private inputWeights: number[] = [1, 1];
    private threshold: number = 1;
    private sigmoid: Function = genSigmoid();

    constructor(inputWeights?: number[], threshold?: number) {
      this.inputWeights = inputWeights;
      this.threshold = threshold;
    }

    public input(inputs: number[]): number {
      var i, sum = 0;
      for(i in inputs){
        sum += inputs[i] * (this.inputWeights[i] || 0);
      }
      return this.evaluate(sum, this.threshold);
    }

    private evaluate(sum: number): number {
      if(this.sigmoid(sum, this.threshold) > Math.random()){
        return 1
      }else{
        return 0
      }
    }
  }
}

(function(){
  var SimpleNode: simpleKe17.SimpleNode;

  var node = new simpleKe17.SimpleNode([3, 2, -1], 1);

  var n = 1000000;
  var acc;
  var checks = [
    [1,1,0],
    [1,-1,0],
    [0,1,0]
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