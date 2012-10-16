var simpleKe17;
(function (simpleKe17) {
    function genSigmoid(gain) {
        if (typeof gain === "undefined") { gain = 1; }
        return function (x, offset) {
            if (typeof offset === "undefined") { offset = 1; }
            return 1 / (1 + Math.exp(offset - gain * x));
        }
    }
    simpleKe17.genSigmoid = genSigmoid;
    var SimpleNode = (function () {
        function SimpleNode(inputWeights, threshold, sigmoid) {
            if (typeof inputWeights === "undefined") { inputWeights = [
                1,
                1
            ]; }
            if (typeof threshold === "undefined") { threshold = 1; }
            if (typeof sigmoid === "undefined") { sigmoid = genSigmoid(); }
            this.inputWeights = inputWeights;
            this.threshold = threshold;
            this.sigmoid = sigmoid;
        }
        SimpleNode.prototype.input = function (inputs) {
            var i;
            var sum = 0;

            for(i in inputs) {
                sum += inputs[i] * (this.inputWeights[i] || 0);
            }
            return this.evaluate(sum, this.threshold);
        };
        SimpleNode.prototype.evaluate = function (sum, threshold) {
            if(this.sigmoid(sum, threshold) > Math.random()) {
                return 1;
            } else {
                return 0;
            }
        };
        return SimpleNode;
    })();
    simpleKe17.SimpleNode = SimpleNode;
})(simpleKe17 || (simpleKe17 = {}));

(function () {
    var SimpleNode;
    var node = new simpleKe17.SimpleNode([
        3,
        2,
        -1
    ], 1);
    var n = 1000000;
    var acc;
    var checks = [
        [
            1,
            1,
            0
        ],
        [
            1,
            -1,
            0
        ],
        [
            0,
            1,
            0
        ]
    ];
    console.log("--- # typescript");
    var check_number;
    var i;

    for(check_number in checks) {
        for(i = 0 , acc = 0; i < n; i++) {
            acc += node.input(checks[check_number]);
        }
        console.log("-", acc / n);
    }
}).call(this);
