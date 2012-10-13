def genSigmoid(gain=1)
  ->(x, offset=1){ 1 / (1 + Math.exp(offset - gain * x))}
end

class SimpleNode
  def initialize(inputWeights=[1,1], threshold=1)
    @inputWeights = inputWeights
    @threshold = threshold
    @sigmoid = genSigmoid
  end

  def input(inputs)
    weighted_inputs = inputs.zip(@inputWeights).map {|pair|
      pair[0] * (pair[1] || 0)
    }
    sum = weighted_inputs.inject(:+)
    evaluate sum
  end

  private

  def evaluate(sum)
    if @sigmoid[sum, @threshold] > rand
      return 1
    else
      return 0
    end
  end
end