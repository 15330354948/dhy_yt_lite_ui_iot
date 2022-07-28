"use strict";

define(["../Core/DeveloperError"], function (e) {
  "use strict";

  function t() {}

  return t.prototype.evaluate = function (t, o) {
    e.throwInstantiationError();
  }, t.prototype.evaluateColor = function (t, o) {
    e.throwInstantiationError();
  }, t.prototype.getShaderFunction = function (t, o, r, n) {
    e.throwInstantiationError();
  }, t;
});