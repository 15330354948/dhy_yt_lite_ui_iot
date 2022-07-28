"use strict";

define(["../Core/ColorGeometryInstanceAttribute", "../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/GeometryInstance", "../Core/GeometryPipeline", "../Core/Matrix4", "./PerInstanceColorAppearance", "./Primitive"], function (i, s, c, m, l, u, g, p, y) {
  "use strict";

  return function (e) {
    var t = [],
        r = (e = s(e, s.EMPTY_OBJECT)).geometry;
    if (!c(r)) throw new m("options.geometry is required.");
    c(r.attributes) && c(r.primitiveType) || (r = r.constructor.createGeometry(r));
    var n = r.attributes,
        o = g.clone(s(e.modelMatrix, g.IDENTITY)),
        a = s(e.length, 1e4);
    if (c(n.normal) && t.push(new l({
      geometry: u.createLineSegmentsForVectors(r, "normal", a),
      attributes: {
        color: new i(1, 0, 0, 1)
      },
      modelMatrix: o
    })), c(n.tangent) && t.push(new l({
      geometry: u.createLineSegmentsForVectors(r, "tangent", a),
      attributes: {
        color: new i(0, 1, 0, 1)
      },
      modelMatrix: o
    })), c(n.bitangent) && t.push(new l({
      geometry: u.createLineSegmentsForVectors(r, "bitangent", a),
      attributes: {
        color: new i(0, 0, 1, 1)
      },
      modelMatrix: o
    })), 0 < t.length) return new y({
      asynchronous: !1,
      geometryInstances: t,
      appearance: new p({
        flat: !0,
        translucent: !1
      })
    });
  };
});