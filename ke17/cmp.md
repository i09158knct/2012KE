```Python
# リスト内包表記
i_sum = sum([inputs[i] * self.input_weights[i] for i
             in range(0,len(inputs))])

# 従来の方法
i_sum = 0
for i in range(0, len(inputs)):
    i_sum += inputs[i] * self.input_weights[i]
```

```Ruby
# zip, map
weighted_inputs = inputs.zip(@input_weights).map {|pair|
  pair[0] * (pair[1] || 0)
}
sum = weighted_inputs.inject(:+)

# 従来の方法
sum = 0
inputs.each_with_index do |input, i|
  sum += input * (@input_weights[i] || 1)
end
```