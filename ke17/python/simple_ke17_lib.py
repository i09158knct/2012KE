import math
import random


def gen_sigmoid(gain=1):
    return lambda x, offset = 1: 1 / (1 + math.exp(offset - gain * x))


class SimpleNode:
    def __init__(self, input_weights, threshold=1):
        self.input_weights = input_weights
        self.threshold = threshold
        self.sigmoid = gen_sigmoid()

    def input(self, inputs):
        i_sum = 0
        for i in range(0, len(inputs)):
            i_sum += inputs[i] * self.input_weights[i]
        return self._evaluate(i_sum, self.threshold)

    def _evaluate(self, i_sum, threshold=1):
        if self.sigmoid(i_sum, threshold) > random.random():
            return 1
        else:
            return 0
