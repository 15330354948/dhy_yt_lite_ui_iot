"use strict";

define(["../../Core/defaultValue", "../../Core/defined", "../../Core/DeveloperError"], function (r, i, n) {
  return function (e) {
    if (!i(e)) throw new n("options is required");
    var t = r(e.where, "");

    if (i(e.geometry) && i(e.spatialRelation)) {
      var o = e.geometry;
      if (!o.WKTContent) throw new n("this geometry is not support WKT");
      "" != t && (t += " AND "), t += e.spatialRelation + "(the_geom," + o.WKTContent + ")";
    }

    this.where = t;
  };
});