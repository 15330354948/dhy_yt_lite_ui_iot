"use strict";

define(["../../Source/Core/Check", "../../Source/Core/defined", "../../Source/Core/defaultValue", "../../Source/Core/Cartesian3", "../../Source/Core/RuntimeError", "../../Source/Core/PolygonGeometry", "../../Source/Core/PolygonHierarchy", "../../Source/Core/CircleGeometry", "../../Source/Core/VertexFormat"], function (e, r, i, t, o, n, s, g, h) {
  return function (u) {
    if (!u) throw new o("options is required");
    var c;

    if (e.typeOf.object("options", u), "polygon" === u.type) {
      if (!u.rings) throw new o("rings is required");
      var a = {};
      if (isNaN(u.rings[0])) {
        if (u.rings[0] instanceof Array) {
          var f = [];

          if (u.rings[0] && 3 === u.rings[0].length) {
            for (var d in u.rings) {
              f.push(u.rings[d][0], u.rings[d][1], u.rings[d][2]);
            }

            a = t.fromDegreesArrayHeights(f);
          } else if (u.rings[0] && 2 === u.rings[0].length) {
            for (var d in u.rings) {
              f.push(u.rings[d][0], u.rings[d][1]);
            }

            a = t.fromDegreesArray(f);
          }
        } else u.rings[0] instanceof Object && (a = u.rings);
      } else a = t.fromDegreesArrayHeights(u.rings);
      c = new n({
        polygonHierarchy: new s(a),
        height: i(u.height, void 0),
        perPositionHeight: i(u.perPositionHeight, !1)
      }), r(u.extrudedHeight) && (c.extrudedHeight = u.extrudedHeight);
    } else {
      if ("circle" !== u.type) throw new o(u.type + " is not support");
      c = new g({
        center: t.fromDegrees(u.center[0], u.center[1], i(u.height, 0)),
        radius: u.radius,
        height: i(u.height, 0),
        vertexFormat: i(u.vertexFormat, h.DEFAULT)
      }), r(u.extrudedHeight) && (c.extrudedHeight = u.extrudedHeight);
    }

    return c;
  };
});