"use strict";

define(["./Check", "./defaultValue", "./defined"], function (u, c, a) {
  "use strict";

  function r(n, t, e) {
    this.clock = c(n, 0), this.cone = c(t, 0), this.magnitude = c(e, 1);
  }

  return r.fromCartesian3 = function (n, t) {
    u.typeOf.object("cartesian3", n);
    var e = n.x,
        c = n.y,
        o = n.z,
        i = e * e + c * c;
    return a(t) || (t = new r()), t.clock = Math.atan2(c, e), t.cone = Math.atan2(Math.sqrt(i), o), t.magnitude = Math.sqrt(i + o * o), t;
  }, r.clone = function (n, t) {
    if (a(n)) return a(t) ? (t.clock = n.clock, t.cone = n.cone, t.magnitude = n.magnitude, t) : new r(n.clock, n.cone, n.magnitude);
  }, r.normalize = function (n, t) {
    return u.typeOf.object("spherical", n), a(t) ? (t.clock = n.clock, t.cone = n.cone, t.magnitude = 1, t) : new r(n.clock, n.cone, 1);
  }, r.equals = function (n, t) {
    return n === t || a(n) && a(t) && n.clock === t.clock && n.cone === t.cone && n.magnitude === t.magnitude;
  }, r.equalsEpsilon = function (n, t, e) {
    return e = c(e, 0), n === t || a(n) && a(t) && Math.abs(n.clock - t.clock) <= e && Math.abs(n.cone - t.cone) <= e && Math.abs(n.magnitude - t.magnitude) <= e;
  }, r.prototype.equals = function (n) {
    return r.equals(this, n);
  }, r.prototype.clone = function (n) {
    return r.clone(this, n);
  }, r.prototype.equalsEpsilon = function (n, t) {
    return r.equalsEpsilon(this, n, t);
  }, r.prototype.toString = function () {
    return "(" + this.clock + ", " + this.cone + ", " + this.magnitude + ")";
  }, r;
});