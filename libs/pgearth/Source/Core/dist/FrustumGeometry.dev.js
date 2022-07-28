"use strict";

define(["./BoundingSphere", "./Cartesian3", "./Cartesian4", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./Matrix3", "./Matrix4", "./OrthographicFrustum", "./PerspectiveFrustum", "./PrimitiveType", "./Quaternion", "./VertexFormat"], function (b, x, A, m, P, T, O, z, N, C, D, j, s, l, B, f, y) {
  "use strict";

  function G(e) {
    m.typeOf.object("options", e), m.typeOf.object("options.frustum", e.frustum), m.typeOf.object("options.origin", e.origin), m.typeOf.object("options.orientation", e.orientation);
    var t,
        n,
        r = e.frustum,
        a = e.orientation,
        o = e.origin,
        i = T(e.vertexFormat, y.DEFAULT),
        u = T(e._drawNearPlane, !0);
    r instanceof l ? (t = 0, n = l.packedLength) : r instanceof s && (t = 1, n = s.packedLength), this._frustumType = t, this._frustum = r.clone(), this._origin = x.clone(o), this._orientation = f.clone(a), this._drawNearPlane = u, this._vertexFormat = i, this._workerName = "createFrustumGeometry", this.packedLength = 2 + n + x.packedLength + f.packedLength + y.packedLength;
  }

  G.pack = function (e, t, n) {
    m.typeOf.object("value", e), m.defined("array", t), n = T(n, 0);
    var r = e._frustumType,
        a = e._frustum;
    return 0 === (t[n++] = r) ? (l.pack(a, t, n), n += l.packedLength) : (s.pack(a, t, n), n += s.packedLength), x.pack(e._origin, t, n), n += x.packedLength, f.pack(e._orientation, t, n), n += f.packedLength, y.pack(e._vertexFormat, t, n), t[n += y.packedLength] = e._drawNearPlane ? 1 : 0, t;
  };

  var w = new l(),
      v = new s(),
      g = new f(),
      d = new x(),
      _ = new y();

  function V(e, t, n, r, a, o, i, u) {
    for (var p = e / 3 * 2, c = 0; c < 4; ++c) {
      O(t) && (t[e] = o.x, t[e + 1] = o.y, t[e + 2] = o.z), O(n) && (n[e] = i.x, n[e + 1] = i.y, n[e + 2] = i.z), O(r) && (r[e] = u.x, r[e + 1] = u.y, r[e + 2] = u.z), e += 3;
    }

    a[p] = 0, a[1 + p] = 0, a[2 + p] = 1, a[3 + p] = 0, a[4 + p] = 1, a[5 + p] = 1, a[6 + p] = 0, a[7 + p] = 1;
  }

  G.unpack = function (e, t, n) {
    m.defined("array", e), t = T(t, 0);
    var r,
        a = e[t++];
    0 === a ? (r = l.unpack(e, t, w), t += l.packedLength) : (r = s.unpack(e, t, v), t += s.packedLength);
    var o = x.unpack(e, t, d);
    t += x.packedLength;
    var i = f.unpack(e, t, g);
    t += f.packedLength;
    var u = y.unpack(e, t, _),
        p = 1 === e[t += y.packedLength];
    if (!O(n)) return new G({
      frustum: r,
      origin: o,
      orientation: i,
      vertexFormat: u,
      _drawNearPlane: p
    });
    var c = a === n._frustumType ? n._frustum : void 0;
    return n._frustum = r.clone(c), n._frustumType = a, n._origin = x.clone(o, n._origin), n._orientation = f.clone(i, n._orientation), n._vertexFormat = y.clone(u, n._vertexFormat), n._drawNearPlane = p, n;
  };

  var S = new D(),
      E = new j(),
      M = new j(),
      U = new x(),
      Q = new x(),
      I = new x(),
      R = new x(),
      q = new x(),
      H = new x(),
      J = new Array(3),
      K = new Array(4);
  K[0] = new A(-1, -1, 1, 1), K[1] = new A(1, -1, 1, 1), K[2] = new A(1, 1, 1, 1), K[3] = new A(-1, 1, 1, 1);

  for (var W = new Array(4), e = 0; e < 4; ++e) {
    W[e] = new A();
  }

  return G._computeNearFarPlanes = function (e, t, n, r, a, o, i, u) {
    var p = D.fromQuaternion(t, S),
        c = T(o, U),
        m = T(i, Q),
        s = T(u, I),
        c = D.getColumn(p, 0, c),
        m = D.getColumn(p, 1, m),
        s = D.getColumn(p, 2, s);
    x.normalize(c, c), x.normalize(m, m), x.normalize(s, s), x.negate(c, c);
    var l,
        f,
        y,
        w,
        v = j.computeView(e, s, m, c, E);
    0 === n ? (f = r.projectionMatrix, y = j.multiply(f, v, M), w = j.inverse(y, M)) : l = j.inverseTransformation(v, M), O(w) ? (J[0] = r.near, J[1] = r.far) : (J[0] = 0, J[1] = r.near, J[2] = r.far);

    for (var g = 0; g < 2; ++g) {
      for (var d = 0; d < 4; ++d) {
        var _,
            h,
            k,
            F,
            L = A.clone(K[d], W[d]);

        O(w) ? (_ = 1 / (L = j.multiplyByVector(w, L, L)).w, x.multiplyByScalar(L, _, L), x.subtract(L, e, L), x.normalize(L, L), h = x.dot(s, L), x.multiplyByScalar(L, J[g] / h, L), x.add(L, e, L)) : (O(r._offCenterFrustum) && (r = r._offCenterFrustum), k = J[g], F = J[g + 1], L.x = .5 * (L.x * (r.right - r.left) + r.left + r.right), L.y = .5 * (L.y * (r.top - r.bottom) + r.bottom + r.top), L.z = .5 * (L.z * (k - F) - k - F), L.w = 1, j.multiplyByVector(l, L, L)), a[12 * g + 3 * d] = L.x, a[12 * g + 3 * d + 1] = L.y, a[12 * g + 3 * d + 2] = L.z;
      }
    }
  }, G.createGeometry = function (e) {
    var t = e._frustumType,
        n = e._frustum,
        r = e._origin,
        a = e._orientation,
        o = e._drawNearPlane,
        i = e._vertexFormat,
        u = o ? 6 : 5,
        p = new Float64Array(72);

    G._computeNearFarPlanes(r, a, t, n, p);

    var c = 24;
    p[c] = p[12], p[c + 1] = p[13], p[c + 2] = p[14], p[c + 3] = p[0], p[c + 4] = p[1], p[c + 5] = p[2], p[c + 6] = p[9], p[c + 7] = p[10], p[c + 8] = p[11], p[c + 9] = p[21], p[c + 10] = p[22], p[c + 11] = p[23], p[c += 12] = p[15], p[c + 1] = p[16], p[c + 2] = p[17], p[c + 3] = p[3], p[c + 4] = p[4], p[c + 5] = p[5], p[c + 6] = p[0], p[c + 7] = p[1], p[c + 8] = p[2], p[c + 9] = p[12], p[c + 10] = p[13], p[c + 11] = p[14], p[c += 12] = p[3], p[c + 1] = p[4], p[c + 2] = p[5], p[c + 3] = p[15], p[c + 4] = p[16], p[c + 5] = p[17], p[c + 6] = p[18], p[c + 7] = p[19], p[c + 8] = p[20], p[c + 9] = p[6], p[c + 10] = p[7], p[c + 11] = p[8], p[c += 12] = p[6], p[c + 1] = p[7], p[c + 2] = p[8], p[c + 3] = p[18], p[c + 4] = p[19], p[c + 5] = p[20], p[c + 6] = p[21], p[c + 7] = p[22], p[c + 8] = p[23], p[c + 9] = p[9], p[c + 10] = p[10], p[c + 11] = p[11], o || (p = p.subarray(12));

    var m,
        s,
        l,
        f,
        y,
        w,
        v,
        g,
        d,
        _,
        h = new C({
      position: new N({
        componentDatatype: P.DOUBLE,
        componentsPerAttribute: 3,
        values: p
      })
    });

    (O(i.normal) || O(i.tangent) || O(i.bitangent) || O(i.st)) && (m = O(i.normal) ? new Float32Array(12 * u) : void 0, s = O(i.tangent) ? new Float32Array(12 * u) : void 0, l = O(i.bitangent) ? new Float32Array(12 * u) : void 0, f = O(i.st) ? new Float32Array(8 * u) : void 0, y = U, w = Q, v = I, g = x.negate(y, R), d = x.negate(w, q), _ = x.negate(v, H), c = 0, o && (V(c, m, s, l, f, _, y, w), c += 12), V(c, m, s, l, f, v, g, w), V(c += 12, m, s, l, f, g, _, w), V(c += 12, m, s, l, f, d, _, g), V(c += 12, m, s, l, f, y, v, w), V(c += 12, m, s, l, f, w, v, g), O(m) && (h.normal = new N({
      componentDatatype: P.FLOAT,
      componentsPerAttribute: 3,
      values: m
    })), O(s) && (h.tangent = new N({
      componentDatatype: P.FLOAT,
      componentsPerAttribute: 3,
      values: s
    })), O(l) && (h.bitangent = new N({
      componentDatatype: P.FLOAT,
      componentsPerAttribute: 3,
      values: l
    })), O(f) && (h.st = new N({
      componentDatatype: P.FLOAT,
      componentsPerAttribute: 2,
      values: f
    })));

    for (var k = new Uint16Array(6 * u), F = 0; F < u; ++F) {
      var L = 6 * F,
          A = 4 * F;
      k[L] = A, k[1 + L] = 1 + A, k[2 + L] = 2 + A, k[3 + L] = A, k[4 + L] = 2 + A, k[5 + L] = 3 + A;
    }

    return new z({
      attributes: h,
      indices: k,
      primitiveType: B.TRIANGLES,
      boundingSphere: b.fromVertices(p)
    });
  }, G;
});