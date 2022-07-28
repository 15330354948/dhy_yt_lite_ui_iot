"use strict";

define(["../Core/DeveloperError"], function (t) {
  "use strict";

  function r() {
    t.throwInstantiationError();
  }

  return r.prototype.update = t.throwInstantiationError, r.prototype.getBoundingSphere = t.throwInstantiationError, r.prototype.isDestroyed = t.throwInstantiationError, r.prototype.destroy = t.throwInstantiationError, r;
});