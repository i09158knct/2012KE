function distance(point1, point2) {
  var
    dx = point1[0] - point2[0],
    dy = point1[1] - point2[1];

  return Math.sqrt(dx * dx + dy * dy);
}


function totalDistance(points) {
  var
    total = 0,
    length = points.length,
    i;

  for (i = 1; i < length; i++) {
    total += distance(points[i], points[i - 1]);
  }

  total += distance(points[0], points[length - 1]);

  return total;
}


function swap(array, index1, index2) {
  var
    tmp;

  tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
}


function sa(route, params) {

  function shouldChange(delta, t) {
    if (delta <= 0) return true;
    if (Math.random() < Math.exp(- delta / t)) return true;
    return false;
  }

  var
    length = route.length,
    defaults,
    t,
    finalT,
    n,
    coolingRate,
    currentTotalDistance,
    newTotalDistance,
    randomIndex1,
    randomIndex2,
    i;

  params = params || {};

  defaults = {
    initialT: 100,
    finalT: 0.8,
    n: 1000,
    coolingRate: 0.9
  };

  t = params.initialT || defaults.initialT;
  finalT = params.finalT || defaults.finalT;
  n = params.n || defaults.n;
  coolingRate = params.coolingRate || defaults.coolingRate;

  currentTotalDistance = totalDistance(route);

  for (; t > finalT; t *= coolingRate) {
    for (i = 0; i < n; i++) {
      randomIndex1 = Math.floor(Math.random() * length);
      randomIndex2 = Math.floor(Math.random() * length);

      swap(route, randomIndex1, randomIndex2);

      newTotalDistance = totalDistance(route);

      if (shouldChange(newTotalDistance - currentTotalDistance, t)) {
        currentTotalDistance = newTotalDistance;
      } else {
        swap(route, randomIndex1, randomIndex2);
      }
    }
  }

}


;(function main() {
  var
    route = [[37,52],[49,49],[52,64],[20,26],[40,30],[21,47],[17,63],[31,62],[52,33],[51,21],[42,41],[31,32],[5,25],[12,42],[36,16],[52,41],[27,23],[17,33],[13,13],[57,58],[62,42],[42,57],[16,57],[8,52],[7,38],[27,68],[30,48],[43,67],[58,48],[58,27],[37,69],[38,46],[46,10],[61,33],[62,63],[63,69],[32,22],[45,35],[59,15],[5,6],[10,17],[21,10],[5,64],[30,15],[39,10],[32,39],[25,32],[25,55],[48,28],[56,37],[30,40]];

  console.log(totalDistance(route));
  sa(route);
  console.log(totalDistance(route));
  console.log(JSON.stringify(route));
})();
