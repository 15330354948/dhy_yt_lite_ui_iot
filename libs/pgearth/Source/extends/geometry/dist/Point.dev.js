"use strict";

define(["../../Core/defined", "../../Core/DeveloperError", "../../Core/defaultValue", "../../Core/Cartesian3", "../../Core/Ellipsoid", "../tasks/support/GeoUtils"], function (s, h, d, l, n, r) {
  return function (t) {
    if (!s(t)) throw new h("options is required");
    var e = d(t.ellipsoid, n.WGS84);

    if (t.x && t.y) {
      this.x = t.x, this.y = t.y, this.z = t.z;
      var i = {
        x: t.x,
        y: t.y,
        z: t.z
      },
          o = r.cartesian2Degrees(i, e);
      this.longitude = o.longitude, this.latitude = o.latitude, this.height = o.height;
    } else {
      if (!s(t.longitude) || !s(t.latitude)) throw new h("longitude and latitude is required");
      this.longitude = t.longitude, this.latitude = t.latitude, this.height = d(t.height, 0), o = l.fromDegrees(t.longitude, t.latitude, t.height), this.x = o.x, this.y = o.y, this.z = o.z;
    }

    this.WKTContent = "Point (" + t.longitude + " " + t.latitude + ")", this.type = "point";
  };
});