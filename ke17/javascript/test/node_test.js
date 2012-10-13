TestCase("NodeTest", {
  setUp: function(){
    var stdsigmoid = ke17.genSigmoid();
    this.options = {
      inputWeights: [3, 2, -1],
      threshold: 1
    };
    this.node = new ke17.Node(this.options);
  },
  tearDown: function(){},

  "test node.input should return 0 when argument is [0, 0]": function(){
    var inputs = [0, 0];
    assertEquals(this.node.input(inputs), 0);
  },
  "test node.input should return 1 when argument is [1, 0]": function(){
    var inputs = [1, 0];
    assertEquals(this.node.input(inputs), 1);
  },
  "test node.input should return 1 when argument is [0, 1]": function(){
    var inputs = [0, 1];
    assertEquals(this.node.input(inputs), 1);
  },
  "test node.input should return 1 when argument is [1, 1]": function(){
    var inputs = [1, 1];
    assertEquals(this.node.input(inputs), 1);
  },

  // TODO: use clone
  "test node.inputWeights should use option": function(){
    assertEquals(this.node.inputWeights, this.options.inputWeights);
  },

  // TODO: use clone
  "test node.threshold should use option": function(){
    assertEquals(this.node.threshold, this.options.threshold);
  }
});