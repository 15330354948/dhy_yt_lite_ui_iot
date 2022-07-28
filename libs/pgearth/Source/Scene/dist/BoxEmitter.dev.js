"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defineProperties", "../Core/Math"], function (s, n, r, e, a) {
  "use strict";

  var t = new s(1, 1, 1);

  function i(e) {
    e = r(e, t), n.defined("dimensions", e), n.typeOf.number.greaterThanOrEquals("dimensions.x", e.x, 0), n.typeOf.number.greaterThanOrEquals("dimensions.y", e.y, 0), n.typeOf.number.greaterThanOrEquals("dimensions.z", e.z, 0), this._dimensions = s.clone(e);
  }

  e(i.prototype, {
    dimensions: {
      get: function get() {
        return this._dimensions;
      },
      set: function set(e) {
        n.defined("value", e), n.typeOf.number.greaterThanOrEquals("value.x", e.x, 0), n.typeOf.number.greaterThanOrEquals("value.y", e.y, 0), n.typeOf.number.greaterThanOrEquals("value.z", e.z, 0), s.clone(e, this._dimensions);
      }
    }
  });
  var u = new s();
  return i.prototype.emit = function (e) {
    var n = this._dimensions,
        r = s.multiplyByScalar(n, .5, u),
        t = a.randomBetween(-r.x, r.x),
        i = a.randomBetween(-r.y, r.y),
        o = a.randomBetween(-r.z, r.z);
    e.position = s.fromElements(t, i, o, e.position), e.velocity = s.normalize(e.position, e.velocity);
  }, i;
});