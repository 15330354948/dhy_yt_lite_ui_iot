"use strict";

define(["../../Source/Core/defined", "../../Source/Core/CircleGeometry", "../../Source/Core/Cartesian3", "../../Source/Core/CorridorGeometry", "../../Source/Core/VertexFormat", "../../Source/Core/PolygonHierarchy", "../../Source/Core/PolygonGeometry", "../../Source/Scene/GroundPrimitive", "../../Source/Core/GeometryInstance", "../../Source/Core/ColorGeometryInstanceAttribute", "../../Source/Core/createGuid", "../../Source/Scene/PerInstanceColorAppearance", "../../Source/Scene/ClassificationType", "../_Color"], function (e, r, o, n, t, c, a, i, s, u, y, g, d, C) {
  return function (S) {
    var l, m, w;
    S && new Error("options is required"), S.type ? "circle" == S.type ? (S.center || new Error("center is required"), m = new r({
      center: o.fromDegrees(S.center[0], S.center[1], S.center[2] || 0),
      radius: S.radius || 50
    })) : (S.ranges || new Error("ranges is required"), w = S.ranges instanceof Array && "number" == typeof S.ranges[0] ? o.fromDegreesArray(S.ranges) : S.ranges, m = new n({
      vertexFormat: t.POSITION_ONLY,
      positions: w,
      width: S.width || 5
    })) : (S.ranges && new Error("ranges is required"), l = S.ranges instanceof Array ? new c(o.fromDegreesArray(S.ranges)) : S.ranges, m = new a({
      polygonHierarchy: l
    }));
    var f = new i({
      geometryInstances: new s({
        geometry: m,
        attributes: {
          color: u.fromColor(new C(S.color || "rgba(255,0,0,0.5)"))
        },
        id: y()
      }),
      appearance: new g({
        translucent: !1,
        closed: !0
      }),
      classificationType: e(S["class"]) ? d.BOTH : d.PGEARTH_3D_TILE
    });
    return f.id = S.id || y(), f;
  };
});