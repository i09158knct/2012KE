(function(root){
  "use strict";

  var _ = root._;

   var favoriteLanguageSet = {
    c: 0,
    java: 0,
    objectiveC: 0,
    cpp: 0,
    csharp: 0,
    php: 0,
    vb: 0,
    python: 0,
    perl: 0,
    ruby: 0,
    javascript: 0,
    pascal: 0,
    lisp: 0,
    lua: 0,
    ada: 0,
    matlab: 0,
    bash: 0,
    assembly: 0,
    r: 0,
    cobol: 0,
    fortran: 0,
    scratch: 0,
    prolog: 0,
    d: 0,
    haskell: 0,
    scala: 0,
    erlang: 0,
    smalltalk: 0,
    clojure: 0,
    groovy: 0,
    ocaml: 0
  };

  var newFLS = function(ownFLS){
    return _.extend({}, favoriteLanguageSet, ownFLS);
  };

  root.myFLS = newFLS({
    ruby: 0.3,
    javascript: 0.3,
    haskell: 0.2
  });

  root.hisFLS = newFLS({
    javascript: 0.5,
    python: 0.7,
    ruby: 0.2
  });

  root.webDeveloperFLS = newFLS({
    javascript: 0.8,
    php: 0.8
  });

  root.agileDeveloperFLS = newFLS({
    javascript: 1.0,
    python: 1.0,
    ruby: 1.0
  });

  root.beginnerFLS = newFLS({
    c: 0.2,
    php: 0.1,
    pascal: 0.1
  });

})(this);
