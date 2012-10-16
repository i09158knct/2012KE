from sys import argv
import time
import random
import simple_ke17_lib


if len(argv) >= 2:
    seed = argv[1]
else:
    seed = time.time()
random.seed(seed)

node = simple_ke17_lib.SimpleNode([3, 2, -1])

N = 1000000
checks = [
    [1,1,0],
    [1,-1,0],
    [0,1,0]
]
print("--- # python(seed: %s)" % seed)
for check in checks:
    acc = 0
    for i in range(N):
        acc += node.input(check)
    print("- %s" % (acc / N))
