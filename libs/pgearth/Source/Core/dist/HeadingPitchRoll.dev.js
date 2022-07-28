"use strict";

define(["./defaultValue", "./defined", "./DeveloperError", "./Math"], function (t, h, u, a) {
  "use strict";

  function s(i, n, e) {
    this.heading = t(i, 0), this.pitch = t(n, 0), this.roll = t(e, 0);
  }

  return s.fromQuaternion = function (i, n) {
    if (!h(i)) throw new u("quaternion is required");
    h(n) || (n = new s());
    var e = 2 * (i.w * i.y - i.z * i.x),
        t = 1 - 2 * (i.x * i.x + i.y * i.y),
        r = 2 * (i.w * i.x + i.y * i.z),
        o = 1 - 2 * (i.y * i.y + i.z * i.z),
        l = 2 * (i.w * i.z + i.x * i.y);
    return n.heading = -Math.atan2(l, o), n.roll = Math.atan2(r, t), n.pitch = -a.asinClamped(e), n;
  }, s.fromDegrees = function (i, n, e, t) {
    if (!h(i)) throw new u("heading is required");
    if (!h(n)) throw new u("pitch is required");
    if (!h(e)) throw new u("roll is required");
    return h(t) || (t = new s()), t.heading = i * a.RADIANS_PER_DEGREE, t.pitch = n * a.RADIANS_PER_DEGREE, t.roll = e * a.RADIANS_PER_DEGREE, t;
  }, s.clone = function (i, n) {
    if (h(i)) return h(n) ? (n.heading = i.heading, n.pitch = i.pitch, n.roll = i.roll, n) : new s(i.heading, i.pitch, i.roll);
  }, s.equals = function (i, n) {
    return i === n || h(i) && h(n) && i.heading === n.heading && i.pitch === n.pitch && i.roll === n.roll;
  }, s.equalsEpsilon = function (i, n, e, t) {
    return i === n || h(i) && h(n) && a.equalsEpsilon(i.heading, n.heading, e, t) && a.equalsEpsilon(i.pitch, n.pitch, e, t) && a.equalsEpsilon(i.roll, n.roll, e, t);
  }, s.prototype.clone = function (i) {
    return s.clone(this, i);
  }, s.prototype.equals = function (i) {
    return s.equals(this, i);
  }, s.prototype.equalsEpsilon = function (i, n, e) {
    return s.equalsEpsilon(this, i, n, e);
  }, s.prototype.toString = function () {
    return "(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
  }, s;
});