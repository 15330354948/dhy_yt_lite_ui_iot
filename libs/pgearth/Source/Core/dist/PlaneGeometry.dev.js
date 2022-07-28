"use strict";

define(["./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./PrimitiveType", "./VertexFormat"], function (m, c, a, y, o, i, s, v, w, A, p) {
  "use strict";

  function u(e) {
    e = o(e, o.EMPTY_OBJECT);
    var t = o(e.vertexFormat, p.DEFAULT);
    this._vertexFormat = t, this._workerName = "createPlaneGeometry";
  }

  u.packedLength = p.packedLength, u.pack = function (e, t, n) {
    return a.typeOf.object("value", e), a.defined("array", t), n = o(n, 0), p.pack(e._vertexFormat, t, n), t;
  };
  var F = new p(),
      l = {
    vertexFormat: F
  };

  u.unpack = function (e, t, n) {
    a.defined("array", e), t = o(t, 0);
    var r = p.unpack(e, t, F);
    return i(n) ? (n._vertexFormat = p.clone(r, n._vertexFormat), n) : new u(l);
  };

  var d = new c(-.5, -.5, 0),
      b = new c(.5, .5, 0);
  return u.createGeometry = function (e) {
    var t,
        n,
        r,
        a,
        o,
        i,
        p = e._vertexFormat,
        u = new w();
    return p.position && ((i = new Float64Array(12))[0] = d.x, i[1] = d.y, i[2] = 0, i[3] = b.x, i[4] = d.y, i[5] = 0, i[6] = b.x, i[7] = b.y, i[8] = 0, i[9] = d.x, i[10] = b.y, i[11] = 0, u.position = new v({
      componentDatatype: y.DOUBLE,
      componentsPerAttribute: 3,
      values: i
    }), p.normal && ((n = new Float32Array(12))[0] = 0, n[1] = 0, n[2] = 1, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 1, n[9] = 0, n[10] = 0, n[11] = 1, u.normal = new v({
      componentDatatype: y.FLOAT,
      componentsPerAttribute: 3,
      values: n
    })), p.st && ((r = new Float32Array(8))[0] = 0, r[1] = 0, r[2] = 1, r[3] = 0, r[4] = 1, r[5] = 1, r[6] = 0, r[7] = 1, u.st = new v({
      componentDatatype: y.FLOAT,
      componentsPerAttribute: 2,
      values: r
    })), p.tangent && ((a = new Float32Array(12))[0] = 1, a[1] = 0, a[2] = 0, a[3] = 1, a[4] = 0, a[5] = 0, a[6] = 1, a[7] = 0, a[8] = 0, a[9] = 1, a[10] = 0, a[11] = 0, u.tangent = new v({
      componentDatatype: y.FLOAT,
      componentsPerAttribute: 3,
      values: a
    })), p.bitangent && ((o = new Float32Array(12))[0] = 0, o[1] = 1, o[2] = 0, o[3] = 0, o[4] = 1, o[5] = 0, o[6] = 0, o[7] = 1, o[8] = 0, o[9] = 0, o[10] = 1, o[11] = 0, u.bitangent = new v({
      componentDatatype: y.FLOAT,
      componentsPerAttribute: 3,
      values: o
    })), (t = new Uint16Array(6))[0] = 0, t[1] = 1, t[2] = 2, t[3] = 0, t[4] = 2, t[5] = 3), new s({
      attributes: u,
      indices: t,
      primitiveType: A.TRIANGLES,
      boundingSphere: new m(c.ZERO, Math.sqrt(2))
    });
  }, u;
});