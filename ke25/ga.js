function GeneticAlgorithm(options) {
  this.populations = options.initialPopulations.map(function(pop) {
    return new CachedModel(pop);
  });

  this.evaluation = options.evaluation;
  this.selection = options.selection;
  this.crossover = options.crossover;
  this.mutation = options.mutation;

  this.numberOfSelections = options.numberOfSelections;
  this.numberOfCrossovers = options.numberOfCrossovers;
  this.numberOfMutations = options.numberOfMutations;

  this.numberOfPopulations =
    this.numberOfSelections +
    this.numberOfCrossovers +
    this.numberOfMutations;

  // assert(this.numberOfPopulations === this.populations.length);
}

GeneticAlgorithm.prototype.execute = function() {
  var
    length = this.numberOfPopulations,
    nextPopulations,
    i;

  nextPopulations = this.selection(
    this.populations,
    this.evaluation,
    this.numberOfSelections
  );

  nextPopulations = nextPopulations.concat(this.crossover(
    this.populations,
    this.numberOfCrossovers
  ));

  for (i = nextPopulations.length; i < length; i++) {
    randomIndex1 = Math.floor(Math.random() * length);
    nextPopulations[i] = new CachedModel(this.mutation(
      this.populations[randomIndex1].model
    ));
  }
  this.populations = nextPopulations;
};


function CachedModel(model) {
  this.cache = 0;
  this.model = model;
}


function roulette(populations, evaluation, numberOfSelections) {
  var
    length = populations.length,
    remainingTableLength = length,
    sum = 0,
    selectionProbabilities,
    remainingTable,
    selected,
    pop,
    i;

  for (i = length; i--;) {
    pop = populations[i];
    pop.cache = (pop.cache || evaluation(pop.model));
    sum += pop.cache;
  }

  selectionProbabilities = new Float64Array(length);
  for (i = length; i--;) {
    selectionProbabilities[i] = populations[i].cache / sum;
  }

  remainingTable = new Array(length);
  for (i = length; i--;) {
    remainingTable[i] = i;
  }

  selected = new Array(numberOfSelections);
  while (numberOfSelections) {
    for (i = remainingTableLength; i--;) {
      if (selectionProbabilities[remainingTable[i]] > Math.random()) {
        selected[--numberOfSelections] = populations[remainingTable[i]];
        remainingTable[i++] = remainingTable[--remainingTableLength];
        if (numberOfSelections === 0) {
          break;
        }
      }
    }
  }

  return selected;
}


function partialMapping(populations, numberOfMapped) {
  var __NUMBER_OF_CITIES__ = 51; // temporary constant
  var
    length = populations.length,
    mapped = new Array(numberOfMapped),
    randomIndex1,
    randomIndex2,
    crossPoint,
    outerI,

    route1,
    route2,
    newRoute,
    newRouteLength,
    target,
    index,
    i,
    j;

  for (outerI = numberOfMapped; outerI--;) {
    randomIndex1 = Math.floor(Math.random() * length);
    randomIndex2 = Math.floor(Math.random() * length);
    crossPoint = Math.floor(Math.random() * __NUMBER_OF_CITIES__);

    route1 = populations[randomIndex1].model;
    route2 = populations[randomIndex2].model;

    newRoute = new Array(__NUMBER_OF_CITIES__);
    for (i = crossPoint; i--;) {
      newRoute[i] = route1[i];
    }
    newRouteLength = crossPoint;

    for (i = crossPoint; i < __NUMBER_OF_CITIES__; i++) {
      target = route2[i];
      for (j = newRouteLength; j--;) {
        if (target === newRoute[j]) {
          target = route2[j];
          j = newRouteLength;
          continue;
        }
      }
      newRoute[newRouteLength++] = target;
    }

    mapped[outerI] = new CachedModel(newRoute);
  }
  return mapped;
}


function exx(populations, numberOfCrossed) {
  var __NUMBER_OF_CITIES__ = 51; // temporary constant
  var
    length = populations.length,
    crossed = new Array(numberOfCrossed),
    randomIndex1,
    randomIndex2,
    crossPoint,
    outerI,

    route1,
    route2,
    index,
    branches1,
    branches2,
    randomIndex,
    bs1selectedIndex,
    bs2selectedIndex,
    bs1selectedEndPoint,
    bs2selectedEndPoint,
    selectedStartPoint,
    bs1indexCorrespondingToB2selectedEndPoint,
    bs2indexCorrespondingToB1selectedEndPoint,
    bs1branchCorrespondingToB2selectedEndPoint,
    bs2branchCorrespondingToB1selectedEndPoint,
    leftBranch,
    rightBranch,
    target,
    tmp,
    newRoute1,
    newRoute2,
    i,
    j;

  for (outerI = numberOfCrossed; outerI--;) {
    randomIndex1 = Math.floor(Math.random() * length);
    randomIndex2 = Math.floor(Math.random() * length);
    crossPoint = Math.floor(Math.random() * __NUMBER_OF_CITIES__);

    route1 = populations[randomIndex1].model;
    route2 = populations[randomIndex2].model;
    index = crossPoint;



    branches1 = new Array(__NUMBER_OF_CITIES__);
    branches2 = new Array(__NUMBER_OF_CITIES__);

    i = __NUMBER_OF_CITIES__ - 1;
    branches1[i] = [route1[i], route1[0]];
    branches2[i] = [route2[i], route2[0]];
    for (; i--;) {
      branches1[i] = [route1[i], route1[i + 1]];
      branches2[i] = [route2[i], route2[i + 1]];
    }

    bs1selectedIndex = index;
    selectedStartPoint = route1[bs1selectedIndex];
    for (i = __NUMBER_OF_CITIES__; i--;) {
      if (route2[i] === selectedStartPoint) {
        bs2selectedIndex = i;
        break;
      }
    }


    while (true) {

      bs2selectedEndPoint = branches2[bs2selectedIndex][1];
      for (i = __NUMBER_OF_CITIES__; i--;) {
        if (branches1[i][0] === bs2selectedEndPoint) {
          bs1indexCorrespondingToB2selectedEndPoint = i;
          bs1branchCorrespondingToB2selectedEndPoint = branches1[i];
          break;
        }
      }

      bs1selectedEndPoint = branches1[bs1selectedIndex][1];
      for (i = __NUMBER_OF_CITIES__; i--;) {
        if (branches2[i][0] === bs1selectedEndPoint) {
          bs2indexCorrespondingToB1selectedEndPoint = i;
          bs2branchCorrespondingToB1selectedEndPoint = branches2[i];
          break;
        }
      }


      tmp = branches1[bs1selectedIndex];
      branches1[bs1selectedIndex] = branches2[bs2selectedIndex];
      branches2[bs2selectedIndex] = tmp;
      if (branches1[bs1selectedIndex][1] === branches2[bs2selectedIndex][1]) {
        break;
      }


      i = bs1selectedIndex + 1;
      j = bs1indexCorrespondingToB2selectedEndPoint - 1;
      leftBranch = branches1[i] || branches1[i = 0];
      rightBranch = branches1[j] || branches1[j = __NUMBER_OF_CITIES__ - 1];
      while (true) {
        tmp = leftBranch[0];
        leftBranch[0] = leftBranch[1];
        leftBranch[1] = tmp;

        if (i === j) break;

        tmp = rightBranch[0];
        rightBranch[0] = rightBranch[1];
        rightBranch[1] = tmp;

        branches1[i] = rightBranch;
        branches1[j] = leftBranch;

        leftBranch = branches1[++i] || branches1[i = 0];
        if (i === j) break;
        rightBranch = branches1[--j] || branches1[j = __NUMBER_OF_CITIES__ - 1];
      }

      i = bs2selectedIndex + 1;
      j = bs2indexCorrespondingToB1selectedEndPoint - 1;
      leftBranch = branches2[i] || branches2[i = 0];
      rightBranch = branches2[j] || branches2[j = __NUMBER_OF_CITIES__ - 1];
      while (true) {
        tmp = leftBranch[0];
        leftBranch[0] = leftBranch[1];
        leftBranch[1] = tmp;

        if (i === j) break;

        tmp = rightBranch[0];
        rightBranch[0] = rightBranch[1];
        rightBranch[1] = tmp;

        branches2[i] = rightBranch;
        branches2[j] = leftBranch;

        leftBranch = branches2[++i] || branches2[i = 0];
        if (i === j) break;
        rightBranch = branches2[--j] || branches2[j = __NUMBER_OF_CITIES__ - 1];
      }


      bs1selectedIndex = bs1indexCorrespondingToB2selectedEndPoint;
      bs2selectedIndex = bs2indexCorrespondingToB1selectedEndPoint;
    }

    newRoute1 = new Array(__NUMBER_OF_CITIES__);
    newRoute2 = new Array(__NUMBER_OF_CITIES__);
    for (i = __NUMBER_OF_CITIES__; i--;) {
      newRoute1[i] = branches1[i][0];
      newRoute2[i] = branches2[i][0];
    }

    crossed[outerI--] = new CachedModel(newRoute1);
    if (outerI === -1) break;
    crossed[outerI] = new CachedModel(newRoute2);
  }
  return crossed;
}


function mutation(route) {
  var
    length = route.length,
    randomIndex1 = Math.floor(Math.random() * length),
    randomIndex2 = Math.floor(Math.random() * length),
    newRoute = new Array(length),
    tmp;

  for (i = length; i--;) {
    newRoute[i] = route[i];
  }

  tmp = newRoute[randomIndex1];
  newRoute[randomIndex1] = newRoute[randomIndex2];
  newRoute[randomIndex2] = tmp;

  return newRoute;
}



;(function _prepare() {

  // via Lo-Dash
  function shuffle(collection) {
    var index = -1,
        length = collection ? collection.length : 0,
        result = Array(typeof length == 'number' ? length : 0);

    collection.forEach(function(value) {
      var rand = Math.floor(Math.random() * (++index + 1));
      result[index] = result[rand];
      result[rand] = value;
    });
    return result;
  }

  function makeRandomRoutes(data, number) {
    var
      routes = new Array(number),
      route,
      i;

    for (i = 0; i < number; i++) {
      route = new Array(data.length);
      for (j = 0; j < data.length; j++) {
        route[j] = j;
      }
      route = shuffle(route);
      routes[i] = route;
    }

    return routes;
  }

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
      total += distance(mapData[points[i]], mapData[points[i - 1]]);
    }

    total += distance(mapData[points[0]], mapData[points[length - 1]]);
    // return total;
    return 1 / total;
  }

  var
    mapData = [[37,52],[49,49],[52,64],[20,26],[40,30],[21,47],[17,63],[31,62],[52,33],[51,21],[42,41],[31,32],[5,25],[12,42],[36,16],[52,41],[27,23],[17,33],[13,13],[57,58],[62,42],[42,57],[16,57],[8,52],[7,38],[27,68],[30,48],[43,67],[58,48],[58,27],[37,69],[38,46],[46,10],[61,33],[62,63],[63,69],[32,22],[45,35],[59,15],[5,6],[10,17],[21,10],[5,64],[30,15],[39,10],[32,39],[25,32],[25,55],[48,28],[56,37],[30,40]];

  // global variables
  mapDataa = mapData;
  evaluation = totalDistance;
  ga = new GeneticAlgorithm({
    initialPopulations: makeRandomRoutes(mapData, 1000),
    evaluation: totalDistance,
    selection: roulette,
    crossover: exx,
    // crossover: partialMapping,
    mutation: mutation,

    numberOfSelections: 700,
    numberOfCrossovers: 250,
    numberOfMutations: 50
  });

})();

var
  MAX_GENERATIONS,
  SAMPLING_PERIOD,
  outerCount,
  count,
  _outerCount,
  _count,
  minModel;

MAX_GENERATIONS = 10000;
SAMPLING_PERIOD = 100;

;(function _setInitCounts() {
  if (MAX_GENERATIONS < SAMPLING_PERIOD) {
    _outerCount = MAX_GENERATIONS;
    _count = 1;
  } else {
    _outerCount = MAX_GENERATIONS / SAMPLING_PERIOD;
    _count = SAMPLING_PERIOD;
  }
})();

for (outerCount = _outerCount; outerCount--;) {
  for(count = _count; count--;) {
    ga.execute();
  }

  minModel = findMaxModel(ga.populations);
  console.log(1 / evaluation(minModel));
}

console.log(JSON.stringify(findMaxModel(ga.populations).map(mapMapData)));
// console.log(a.populations.map(function(pop){return evaluation(pop.model)}));
// console.log(ga.populations.map(function(pop){return 1/evaluation(pop.model);}));


function findMaxModel(populations) {
  var
    pop,
    maxModel,
    max = -1,
    i;

  for (i = populations.length; i--;) {
    pop = populations[i];
    pop.cache = (pop.cache || evaluation(pop.model));
    if (pop.cache > max) {
      maxModel = pop.model;
      max = pop.cache;
    }
  }

  return maxModel;
}

function mapMapData(id) {
  return mapDataa[id];
}
