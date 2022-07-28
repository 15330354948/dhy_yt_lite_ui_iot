"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined"], function (t, o, e, r) {
  "use strict";

  function c(i, n) {
    n = t.clone(e(n, t.ZERO)), t.equals(n, t.ZERO) || t.normalize(n, n), this.origin = t.clone(e(i, t.ZERO)), this.direction = n;
  }

  return c.clone = function (i, n) {
    if (r(i)) return r(n) ? (n.origin = t.clone(i.origin), n.direction = t.clone(i.direction), n) : new c(i.origin, i.direction);
  }, c.getPoint = function (i, n, e) {
    return o.typeOf.object("ray", i), o.typeOf.number("t", n), r(e) || (e = new t()), e = t.multiplyByScalar(i.direction, n, e), t.add(i.origin, e, e);
  }, c;
});