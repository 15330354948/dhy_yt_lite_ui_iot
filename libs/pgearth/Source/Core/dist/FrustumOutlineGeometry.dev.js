"use strict";

define(["./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./FrustumGeometry", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./OrthographicFrustum", "./PerspectiveFrustum", "./PrimitiveType", "./Quaternion"], function (d, p, s, _, f, m, g, h, k, y, l, w, v, L) {
  "use strict";

  function b(e) {
    s.typeOf.object("options", e), s.typeOf.object("options.frustum", e.frustum), s.typeOf.object("options.origin", e.origin), s.typeOf.object("options.orientation", e.orientation);
    var t,
        n,
        r = e.frustum,
        a = e.orientation,
        i = e.origin,
        o = f(e._drawNearPlane, !0);
    r instanceof w ? (t = 0, n = w.packedLength) : r instanceof l && (t = 1, n = l.packedLength), this._frustumType = t, this._frustum = r.clone(), this._origin = p.clone(i), this._orientation = L.clone(a), this._drawNearPlane = o, this._workerName = "createFrustumOutlineGeometry", this.packedLength = 2 + n + p.packedLength + L.packedLength;
  }

  b.pack = function (e, t, n) {
    s.typeOf.object("value", e), s.defined("array", t), n = f(n, 0);
    var r = e._frustumType,
        a = e._frustum;
    return 0 === (t[n++] = r) ? (w.pack(a, t, n), n += w.packedLength) : (l.pack(a, t, n), n += l.packedLength), p.pack(e._origin, t, n), n += p.packedLength, L.pack(e._orientation, t, n), t[n += L.packedLength] = e._drawNearPlane ? 1 : 0, t;
  };

  var P = new w(),
      N = new l(),
      O = new L(),
      T = new p();
  return b.unpack = function (e, t, n) {
    s.defined("array", e), t = f(t, 0);
    var r,
        a = e[t++];
    0 === a ? (r = w.unpack(e, t, P), t += w.packedLength) : (r = l.unpack(e, t, N), t += l.packedLength);
    var i = p.unpack(e, t, T);
    t += p.packedLength;
    var o = L.unpack(e, t, O),
        u = 1 === e[t += L.packedLength];
    if (!m(n)) return new b({
      frustum: r,
      origin: i,
      orientation: o,
      _drawNearPlane: u
    });
    var c = a === n._frustumType ? n._frustum : void 0;
    return n._frustum = r.clone(c), n._frustumType = a, n._origin = p.clone(i, n._origin), n._orientation = L.clone(o, n._orientation), n._drawNearPlane = u, n;
  }, b.createGeometry = function (e) {
    var t = e._frustumType,
        n = e._frustum,
        r = e._origin,
        a = e._orientation,
        i = e._drawNearPlane,
        o = new Float64Array(24);

    g._computeNearFarPlanes(r, a, t, n, o);

    for (var u, c, p = new y({
      position: new k({
        componentDatatype: _.DOUBLE,
        componentsPerAttribute: 3,
        values: o
      })
    }), s = i ? 2 : 1, f = new Uint16Array(8 * (1 + s)), m = i ? 0 : 1; m < 2; ++m) {
      c = 4 * m, f[u = i ? 8 * m : 0] = c, f[u + 1] = c + 1, f[u + 2] = c + 1, f[u + 3] = c + 2, f[u + 4] = c + 2, f[u + 5] = c + 3, f[u + 6] = c + 3, f[u + 7] = c;
    }

    for (m = 0; m < 2; ++m) {
      c = 4 * m, f[u = 8 * (s + m)] = c, f[u + 1] = c + 4, f[u + 2] = c + 1, f[u + 3] = c + 5, f[u + 4] = c + 2, f[u + 5] = c + 6, f[u + 6] = c + 3, f[u + 7] = c + 7;
    }

    return new h({
      attributes: p,
      indices: f,
      primitiveType: v.LINES,
      boundingSphere: d.fromVertices(o)
    });
  }, b;
});