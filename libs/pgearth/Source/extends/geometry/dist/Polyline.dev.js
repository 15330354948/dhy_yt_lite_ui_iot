"use strict";

define(["../../Core/PolylineGeometry", "../../Core/defined", "../../Core/DeveloperError", "../../Core/Check", "../../Core/defaultValue", "../../Core/Ellipsoid", "../tasks/support/GeoUtils"], function (n, s, l, p, d, u, a) {
  return function (e) {
    if (!s(e)) throw new l("options is required");
    if (!s(e.positions)) throw new l("positions is required");
    p.typeOf.object("options", e), this.__proto__ = n.prototype, n.call(this, e);

    for (var o = e.positions, i = d(e.ellipsoid, u.WGS84), t = [], r = 0; r < o.length; r++) {
      t.push(a.cartesian2Degrees(o[r], i).longitude.toFixed(6) + " " + a.cartesian2Degrees(o[r], i).latitude.toFixed(6));
    }

    this.WKTContent = "LineString(" + t.toString() + ")", this.type = "polyline";
  };
});