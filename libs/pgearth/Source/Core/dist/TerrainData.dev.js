"use strict";

define(["./defineProperties", "./DeveloperError"], function (t, r) {
  "use strict";

  function o() {
    r.throwInstantiationError();
  }

  return t(o.prototype, {
    credits: {
      get: r.throwInstantiationError
    },
    waterMask: {
      get: r.throwInstantiationError
    }
  }), o.prototype.interpolateHeight = r.throwInstantiationError, o.prototype.isChildAvailable = r.throwInstantiationError, o.prototype.createMesh = r.throwInstantiationError, o.prototype.upsample = r.throwInstantiationError, o.prototype.wasCreatedByUpsampling = r.throwInstantiationError, o;
});