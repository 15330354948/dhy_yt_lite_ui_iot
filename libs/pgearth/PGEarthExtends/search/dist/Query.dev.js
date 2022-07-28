"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/DeveloperError"], function (e, r, o) {
  return function (t) {
    if (!r(t)) throw new o("options is required");
    var i = e(t.where, "");

    if (r(t.geometry) && r(t.spatialRelation)) {
      var n = t.geometry;
      if (!n.WKTContent) throw new o("this geometry is not support WKT");
      var a = t.spatialRelation + "(the_geom," + n.WKTContent + ")";
      "" != i && (i += " AND "), i += a;
    }

    this.where = i;
  };
});