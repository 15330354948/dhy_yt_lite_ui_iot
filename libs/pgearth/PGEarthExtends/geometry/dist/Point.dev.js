"use strict";

define(["../../Source/Core/defined", "../../Source/Core/defaultValue", "../../Source/Core/Cartesian3", "../../Source/Core/RuntimeError", "../core/GeoUtils"], function (t, e, i, o, n) {
  return function (u) {
    if (!t(u)) throw new o("options is required");

    if (u.x && u.y) {
      this.x = u.x, this.y = u.y, this.z = u.z;
      var h = {
        x: u.x,
        y: u.y,
        z: u.z
      },
          r = n.cartesian2Degrees(h);
      this.longitude = r.longitude, this.latitude = r.latitude, this.height = r.height;
    } else {
      if (!t(u.longitude) || !t(u.latitude)) throw new o("options.longitude and options.latitude is required");
      this.longitude = u.longitude, this.latitude = u.latitude, this.height = e(u.height, 0), r = i.fromDegrees(u.longitude, u.latitude, u.height), this.x = r.x, this.y = r.y, this.z = r.z;
    }

    this.WKTContent = "Point (" + u.longitude + " " + u.latitude + ")", this.type = "point";
  };
});