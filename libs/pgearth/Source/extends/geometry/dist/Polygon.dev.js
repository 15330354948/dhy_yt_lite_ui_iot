"use strict";

define(["../../Core/PolygonGeometry", "../../Core/defined", "../../Core/DeveloperError", "../../Core/Check", "../../Core/defaultValue", "../../Core/Ellipsoid", "../tasks/support/GeoUtils"], function (n, l, s, p, a, y, d) {
  return function (e) {
    if (!l(e.polygonHierarchy)) throw new s("polygonHierarchy is required");
    p.typeOf.object("options", e);
    var o = a(e.ellipsoid, y.WGS84);
    this.__proto__ = n.prototype, n.call(this, e);

    for (var r = e.polygonHierarchy.positions, t = [], i = 0; i < r.length; i++) {
      t.push(d.cartesian2Degrees(r[i], o).longitude.toFixed(6) + " " + d.cartesian2Degrees(r[i], o).latitude.toFixed(6));
    }

    this.WKTContent = "Polygon((" + t.toString() + "))", this.type = "polygon";
  };
});