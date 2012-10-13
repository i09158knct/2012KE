TestCase("sigmoidFunctionTest", {
  setUp: function(){},
  tearDown: function(){},

  "test genSigmoid() should return standard sigmoid function": function(){
    var sigmoid = ke17.genSigmoid();
    assertEquals(sigmoid(0), 0.5);
  }
});