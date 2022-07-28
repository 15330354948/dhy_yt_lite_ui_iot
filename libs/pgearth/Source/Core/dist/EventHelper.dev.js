"use strict";

define(["./defined", "./DeveloperError"], function (o, s) {
  "use strict";

  function e() {
    this._removalFunctions = [];
  }

  return e.prototype.add = function (e, n, t) {
    if (!o(e)) throw new s("event is required");
    var r = e.addEventListener(n, t);

    this._removalFunctions.push(r);

    var i = this;
    return function () {
      r();
      var e = i._removalFunctions;
      e.splice(e.indexOf(r), 1);
    };
  }, e.prototype.removeAll = function () {
    for (var e = this._removalFunctions, n = 0, t = e.length; n < t; ++n) {
      e[n]();
    }

    e.length = 0;
  }, e;
});