require_relative 'ke17_lib'

if ARGV[0]
  seed = ARGV[0].to_i
else
  seed = srand
end
srand seed

node = SimpleNode.new([3,2,-1])

n = 1000000
checks = [
  [1,1,0],
  [1,-1,0],
  [0,1,0]
]
puts "--- # ruby(seed: #{seed})"
checks.each do |check|
  acc = 0
  n.times do
    acc += node.input check
  end
  print '- ', acc / n.to_f, "\n"
end
