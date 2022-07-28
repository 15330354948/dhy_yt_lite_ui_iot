"use strict";

define(["../Core/DeveloperError"], function (e) {
  "use strict";

  function t(t) {
    throw new e("This type should not be instantiated directly.  Instead, use BoxEmitter, CircleEmitter, ConeEmitter or SphereEmitter.");
  }

  return t.prototype.emit = function (t) {
    e.throwInstantiationError();
  }, t;
});