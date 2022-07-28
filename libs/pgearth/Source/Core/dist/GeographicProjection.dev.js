"use strict";

define(["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function (n, u, e, a, i, l, t) {
  "use strict";

  function r(i) {
    this._ellipsoid = e(i, t.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
  }

  return i(r.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    }
  }), r.prototype.project = function (i, e) {
    var t = this._semimajorAxis,
        r = i.longitude * t,
        o = i.latitude * t,
        s = i.height;
    return a(e) ? (e.x = r, e.y = o, e.z = s, e) : new n(r, o, s);
  }, r.prototype.unproject = function (i, e) {
    if (!a(i)) throw new l("cartesian is required");
    var t = this._oneOverSemimajorAxis,
        r = i.x * t,
        o = i.y * t,
        s = i.z;
    return a(e) ? (e.longitude = r, e.latitude = o, e.height = s, e) : new u(r, o, s);
  }, r;
});