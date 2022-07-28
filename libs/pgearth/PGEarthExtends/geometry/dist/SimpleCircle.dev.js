"use strict";

define(["../../Source/Core/RuntimeError", "../../Source/Core/defined", "../core/GeoUtils", "../geometry/Point"], function (i, e, t, n) {
  var r = function r(t) {
    if (!(e(t.center) && t.center instanceof n)) throw new i("center must be  SimplePoint");
    if (!e(t.radii)) throw new i("radii is required");
    this.center = t.center, this.radii = t.radii;
  };

  return r.prototype.pointInside = function (r) {
    if (!e(r)) throw new i("point is required");
    var o;
    if (r instanceof n ? o = r : (r.longitude || r.latitude) && (o = new n({
      position: r
    })), !e(o)) throw new i("point must be Point or include longitude and latitude");
    var d = t.distance(this.center, o);
    return d < this.radii || d == this.radii;
  }, r;
});