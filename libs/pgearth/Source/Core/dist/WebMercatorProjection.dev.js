"use strict";

define(["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Math"], function (n, u, t, d, e, s, i, r) {
  "use strict";

  function m(e) {
    this._ellipsoid = t(e, i.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
  }

  return e(m.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    }
  }), m.mercatorAngleToGeodeticLatitude = function (e) {
    return r.PI_OVER_TWO - 2 * Math.atan(Math.exp(-e));
  }, m.geodeticLatitudeToMercatorAngle = function (e) {
    m.MaximumLatitude < e ? e = m.MaximumLatitude : e < -m.MaximumLatitude && (e = -m.MaximumLatitude);
    var t = Math.sin(e);
    return .5 * Math.log((1 + t) / (1 - t));
  }, m.MaximumLatitude = m.mercatorAngleToGeodeticLatitude(Math.PI), m.prototype.project = function (e, t) {
    var i = this._semimajorAxis,
        r = e.longitude * i,
        o = m.geodeticLatitudeToMercatorAngle(e.latitude) * i,
        a = e.height;
    return d(t) ? (t.x = r, t.y = o, t.z = a, t) : new n(r, o, a);
  }, m.prototype.unproject = function (e, t) {
    if (!d(e)) throw new s("cartesian is required");
    var i = this._oneOverSemimajorAxis,
        r = e.x * i,
        o = m.mercatorAngleToGeodeticLatitude(e.y * i),
        a = e.z;
    return d(t) ? (t.longitude = r, t.latitude = o, t.height = a, t) : new u(r, o, a);
  }, m;
});