def gen_sigmoid(gain = 1)
  ->(x, offset = 1){ 1 / (1 + Math.exp(offset - gain * x))}
end

class SimpleNode
  def initialize(input_weights = [1, 1], threshold = 1)
    @input_weights = input_weights
    @threshold = threshold
    @sigmoid = gen_sigmoid
  end

  def input(inputs)
    weighted_inputs = inputs.zip(@input_weights).map {|pair|
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