require_relative 'simple_ke17_lib'

seed = (ARGV[0] || srand()).to_i
srand(seed)

node = SimpleNode.new([3, 2, -1])

N = 1000000
checks = [
  [1,1,0],
  [1,-1,0],
  [0,1,0]
]
puts "--- # ruby(seed: #{seed})"
checks.each do |check|
  acc = 0
  N.times do
    acc += node.input(check)
  end
  print '- ', acc / N.to_f, "\n"
end
