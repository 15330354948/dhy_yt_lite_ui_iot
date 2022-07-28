"use strict";

define(["./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defined", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./PrimitiveType"], function (r, i, a, o, u, y, c, p, d) {
  "use strict";

  function m() {
    this._workerName = "createPlaneOutlineGeometry";
  }

  m.packedLength = 0, m.pack = function (e, t) {
    return a.defined("value", e), a.defined("array", t), t;
  }, m.unpack = function (e, t, n) {
    return a.defined("array", e), u(n) ? n : new m();
  };
  var s = new i(-.5, -.5, 0),
      f = new i(.5, .5, 0);
  return m.createGeometry = function () {
    var e = new p(),
        t = new Uint16Array(8),
        n = new Float64Array(12);
    return n[0] = s.x, n[1] = s.y, n[2] = s.z, n[3] = f.x, n[4] = s.y, n[5] = s.z, n[6] = f.x, n[7] = f.y, n[8] = s.z, n[9] = s.x, n[10] = f.y, n[11] = s.z, e.position = new c({
      componentDatatype: o.DOUBLE,
      componentsPerAttribute: 3,
      values: n
    }), t[0] = 0, t[1] = 1, t[2] = 1, t[3] = 2, t[4] = 2, t[5] = 3, t[6] = 3, t[7] = 0, new y({
      attributes: e,
      indices: t,
      primitiveType: d.LINES,
      boundingSphere: new r(i.ZERO, Math.sqrt(2))
    });
  }, m;
});