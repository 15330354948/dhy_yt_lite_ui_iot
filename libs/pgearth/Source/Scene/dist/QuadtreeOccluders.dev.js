"use strict";

define(["../Core/Cartesian3", "../Core/defineProperties", "../Core/EllipsoidalOccluder"], function (i, e, o) {
  "use strict";

  function t(e) {
    this._ellipsoid = new o(e.ellipsoid, i.ZERO);
  }

  return e(t.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    }
  }), t;
});