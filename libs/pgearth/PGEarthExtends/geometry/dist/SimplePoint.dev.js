"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/Cartesian3", "../../Source/Core/DeveloperError", "../../Source/Core/defined", "../core/GeoUtils"], function (i, e, t, o, n) {
  return function (s) {
    if (!o(s.position)) throw new t("position is required");
    var r = s.position;

    if (r instanceof e) {
      this.x = s.position.x, this.y = s.position.y, this.z = s.position.z;
      var u = n.cartesian2Degrees(r);
      this.longitude = u.longitude, this.latitude = u.latitude, this.height = u.height;
    } else {
      if (!o(r.longitude) || !o(r.latitude)) throw new t("postion.longitude and postion.latitude is required");
      this.longitude = r.longitude, this.latitude = r.latitude, this.height = i(r.height, 0), u = e.fromDegrees(r.longitude, r.latitude, r.height), this.x = u.x, this.y = u.y, this.z = u.z;
    }
  };
});