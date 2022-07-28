"use strict";

define(["./arrayFill", "./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./CornerType", "./CorridorGeometryLibrary", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PolygonPipeline", "./PrimitiveType", "./Rectangle", "./VertexFormat"], function (M, p, v, at, t, f, it, c, ot, y, nt, e, A, b, st, lt, D, dt, ut, S, _, w, V) {
  "use strict";

  var ht = new at(),
      gt = new at(),
      mt = new at(),
      ct = new at(),
      L = new at(),
      ft = new at(),
      pt = new at(),
      vt = new at();

  function T(t, e) {
    for (var r = 0; r < t.length; r++) {
      t[r] = e.scaleToGeodeticSurface(t[r], t[r]);
    }

    return t;
  }

  function yt(t, e, r, a, i, o) {
    var n = t.normals,
        s = t.tangents,
        l = t.bitangents,
        d = at.normalize(at.cross(r, e, pt), pt);
    o.normal && ot.addAttribute(n, e, a, i), o.tangent && ot.addAttribute(s, d, a, i), o.bitangent && ot.addAttribute(l, r, a, i);
  }

  function k(t, e, r) {
    var a,
        i = t.positions,
        o = t.corners,
        n = t.endPositions,
        s = t.lefts,
        l = t.normals,
        d = new lt(),
        u = 0,
        h = 0,
        g = 0;

    for (S = 0; S < i.length; S += 2) {
      u += a = i[S].length - 3, g += 2 * a, h += i[S + 1].length - 3;
    }

    for (u += 3, h += 3, S = 0; S < o.length; S++) {
      z = o[S];
      var m = o[S].leftPositions;
      nt(m) ? u += a = m.length : h += a = o[S].rightPositions.length, g += a;
    }

    var c,
        f = nt(n);
    f && (u += c = n[0].length - 3, h += c, g += 6 * (c /= 3));

    var p,
        v,
        y,
        A,
        b,
        _,
        w = u + h,
        T = new Float64Array(w),
        N = {
      normals: e.normal ? new Float32Array(w) : void 0,
      tangents: e.tangent ? new Float32Array(w) : void 0,
      bitangents: e.bitangent ? new Float32Array(w) : void 0
    },
        E = 0,
        P = w - 1,
        F = ht,
        I = gt,
        O = c / 2,
        x = dt.createTypedArray(w / 3, g),
        M = 0;

    if (f) {
      _ = mt, b = ct;

      for (var D = n[0], F = at.fromArray(l, 0, F), I = at.fromArray(s, 0, I), S = 0; S < O; S++) {
        _ = at.fromArray(D, 3 * (O - 1 - S), _), b = at.fromArray(D, 3 * (O + S), b), ot.addAttribute(T, b, E), ot.addAttribute(T, _, void 0, P), yt(N, F, I, E, P, e), A = (v = E / 3) + 1, y = (p = (P - 2) / 3) - 1, x[M++] = p, x[M++] = v, x[M++] = y, x[M++] = y, x[M++] = v, x[M++] = A, E += 3, P -= 3;
      }
    }

    var V,
        L,
        k = 0,
        G = 0,
        R = i[k++],
        C = i[k++];

    for (T.set(R, E), T.set(C, P - C.length + 1), I = at.fromArray(s, G, I), a = C.length - 3, S = 0; S < a; S += 3) {
      V = r.geodeticSurfaceNormal(at.fromArray(R, S, pt), pt), L = r.geodeticSurfaceNormal(at.fromArray(C, a - S, vt), vt), yt(N, F = at.normalize(at.add(V, L, F), F), I, E, P, e), A = (v = E / 3) + 1, y = (p = (P - 2) / 3) - 1, x[M++] = p, x[M++] = v, x[M++] = y, x[M++] = y, x[M++] = v, x[M++] = A, E += 3, P -= 3;
    }

    for (V = r.geodeticSurfaceNormal(at.fromArray(R, a, pt), pt), L = r.geodeticSurfaceNormal(at.fromArray(C, a, vt), vt), F = at.normalize(at.add(V, L, F), F), G += 3, S = 0; S < o.length; S++) {
      var H,
          z,
          U,
          B,
          Y = (z = o[S]).leftPositions,
          W = z.rightPositions,
          q = ft,
          J = mt,
          j = ct;

      if (F = at.fromArray(l, G, F), nt(Y)) {
        for (yt(N, F, I, void 0, P, e), P -= 3, U = A, B = y, H = 0; H < Y.length / 3; H++) {
          q = at.fromArray(Y, 3 * H, q), x[M++] = U, x[M++] = B - H - 1, x[M++] = B - H, ot.addAttribute(T, q, void 0, P), J = at.fromArray(T, 3 * (B - H - 1), J), j = at.fromArray(T, 3 * U, j), yt(N, F, I = at.normalize(at.subtract(J, j, I), I), void 0, P, e), P -= 3;
        }

        q = at.fromArray(T, 3 * U, q), J = at.subtract(at.fromArray(T, 3 * B, J), q, J), j = at.subtract(at.fromArray(T, 3 * (B - H), j), q, j), yt(N, F, I = at.normalize(at.add(J, j, I), I), E, void 0, e), E += 3;
      } else {
        for (yt(N, F, I, E, void 0, e), E += 3, U = y, B = A, H = 0; H < W.length / 3; H++) {
          q = at.fromArray(W, 3 * H, q), x[M++] = U, x[M++] = B + H, x[M++] = B + H + 1, ot.addAttribute(T, q, E), J = at.fromArray(T, 3 * U, J), j = at.fromArray(T, 3 * (B + H), j), yt(N, F, I = at.normalize(at.subtract(J, j, I), I), E, void 0, e), E += 3;
        }

        q = at.fromArray(T, 3 * U, q), J = at.subtract(at.fromArray(T, 3 * (B + H), J), q, J), j = at.subtract(at.fromArray(T, 3 * B, j), q, j), yt(N, F, I = at.normalize(at.negate(at.add(j, J, I), I), I), void 0, P, e), P -= 3;
      }

      for (R = i[k++], C = i[k++], R.splice(0, 3), C.splice(C.length - 3, 3), T.set(R, E), T.set(C, P - C.length + 1), a = C.length - 3, G += 3, I = at.fromArray(s, G, I), H = 0; H < C.length; H += 3) {
        V = r.geodeticSurfaceNormal(at.fromArray(R, H, pt), pt), L = r.geodeticSurfaceNormal(at.fromArray(C, a - H, vt), vt), yt(N, F = at.normalize(at.add(V, L, F), F), I, E, P, e), v = (A = E / 3) - 1, p = (y = (P - 2) / 3) + 1, x[M++] = p, x[M++] = v, x[M++] = y, x[M++] = y, x[M++] = v, x[M++] = A, E += 3, P -= 3;
      }

      E -= 3, P += 3;
    }

    if (yt(N, F = at.fromArray(l, l.length - 3, F), I, E, P, e), f) {
      E += 3, P -= 3, _ = mt, b = ct;
      var K = n[1];

      for (S = 0; S < O; S++) {
        _ = at.fromArray(K, 3 * (c - S - 1), _), b = at.fromArray(K, 3 * S, b), ot.addAttribute(T, _, void 0, P), ot.addAttribute(T, b, E), yt(N, F, I, E, P, e), v = (A = E / 3) - 1, p = (y = (P - 2) / 3) + 1, x[M++] = p, x[M++] = v, x[M++] = y, x[M++] = y, x[M++] = v, x[M++] = A, E += 3, P -= 3;
      }
    }

    if (d.position = new st({
      componentDatatype: it.DOUBLE,
      componentsPerAttribute: 3,
      values: T
    }), e.st) {
      var Q = new Float32Array(w / 3 * 2),
          X = 0;

      if (f) {
        u /= 3, h /= 3;
        var Z,
            $ = Math.PI / (c + 1),
            tt = 1 / (u - c + 1),
            et = 1 / (h - c + 1),
            rt = c / 2;

        for (S = 1 + rt; S < c + 1; S++) {
          Z = ut.PI_OVER_TWO + $ * S, Q[X++] = et * (1 + Math.cos(Z)), Q[X++] = .5 * (1 + Math.sin(Z));
        }

        for (S = 1; S < h - c + 1; S++) {
          Q[X++] = S * et, Q[X++] = 0;
        }

        for (S = c; rt < S; S--) {
          Z = ut.PI_OVER_TWO - S * $, Q[X++] = 1 - et * (1 + Math.cos(Z)), Q[X++] = .5 * (1 + Math.sin(Z));
        }

        for (S = rt; 0 < S; S--) {
          Z = ut.PI_OVER_TWO - $ * S, Q[X++] = 1 - tt * (1 + Math.cos(Z)), Q[X++] = .5 * (1 + Math.sin(Z));
        }

        for (S = u - c; 0 < S; S--) {
          Q[X++] = S * tt, Q[X++] = 1;
        }

        for (S = 1; S < 1 + rt; S++) {
          Z = ut.PI_OVER_TWO + $ * S, Q[X++] = tt * (1 + Math.cos(Z)), Q[X++] = .5 * (1 + Math.sin(Z));
        }
      } else {
        for (tt = 1 / ((u /= 3) - 1), et = 1 / ((h /= 3) - 1), S = 0; S < h; S++) {
          Q[X++] = S * et, Q[X++] = 0;
        }

        for (S = u; 0 < S; S--) {
          Q[X++] = (S - 1) * tt, Q[X++] = 1;
        }
      }

      d.st = new st({
        componentDatatype: it.FLOAT,
        componentsPerAttribute: 2,
        values: Q
      });
    }

    return e.normal && (d.normal = new st({
      componentDatatype: it.FLOAT,
      componentsPerAttribute: 3,
      values: N.normals
    })), e.tangent && (d.tangent = new st({
      componentDatatype: it.FLOAT,
      componentsPerAttribute: 3,
      values: N.tangents
    })), e.bitangent && (d.bitangent = new st({
      componentDatatype: it.FLOAT,
      componentsPerAttribute: 3,
      values: N.bitangents
    })), {
      attributes: d,
      indices: x
    };
  }

  function G(t, e, r) {
    r[e++] = t[0], r[e++] = t[1], r[e++] = t[2];

    for (var a = 3; a < t.length; a += 3) {
      var i = t[a],
          o = t[a + 1],
          n = t[a + 2];
      r[e++] = i, r[e++] = o, r[e++] = n, r[e++] = i, r[e++] = o, r[e++] = n;
    }

    return r[e++] = t[0], r[e++] = t[1], r[e++] = t[2], r;
  }

  function N(t, e) {
    var r = new V({
      position: e.position,
      normal: e.normal || e.bitangent || t.shadowVolume,
      tangent: e.tangent,
      bitangent: e.normal || e.bitangent,
      st: e.st
    }),
        a = t.ellipsoid,
        i = k(ot.computePositions(t), r, a),
        o = t.height,
        n = t.extrudedHeight,
        s = i.attributes,
        l = i.indices,
        d = s.position.values,
        u = d.length,
        h = new Float64Array(6 * u),
        g = new Float64Array(u);
    g.set(d);
    var m = new Float64Array(4 * u),
        m = G(d = S.scaleToGeodeticHeight(d, o, a), 0, m);
    m = G(g = S.scaleToGeodeticHeight(g, n, a), 2 * u, m), h.set(d), h.set(g, u), h.set(m, 2 * u), s.position.values = h, s = function (t, e) {
      if (!(e.normal || e.tangent || e.bitangent || e.st)) return t;
      var r,
          a,
          i = t.position.values;
      (e.normal || e.bitangent) && (r = t.normal.values, a = t.bitangent.values);
      var o = t.position.values.length / 18,
          n = 3 * o,
          s = 2 * o,
          l = 2 * n;

      if (e.normal || e.bitangent || e.tangent) {
        for (var d, u = e.normal ? new Float32Array(6 * n) : void 0, h = e.tangent ? new Float32Array(6 * n) : void 0, g = e.bitangent ? new Float32Array(6 * n) : void 0, m = ht, c = gt, f = mt, p = ct, v = L, y = ft, A = l, b = 0; b < n; b += 3) {
          var _ = A + l,
              m = at.fromArray(i, b, m),
              c = at.fromArray(i, b + n, c),
              f = at.fromArray(i, (b + 3) % n, f);

          c = at.subtract(c, m, c), f = at.subtract(f, m, f), p = at.normalize(at.cross(c, f, p), p), e.normal && (ot.addAttribute(u, p, _), ot.addAttribute(u, p, _ + 3), ot.addAttribute(u, p, A), ot.addAttribute(u, p, A + 3)), (e.tangent || e.bitangent) && (y = at.fromArray(r, b, y), e.bitangent && (ot.addAttribute(g, y, _), ot.addAttribute(g, y, _ + 3), ot.addAttribute(g, y, A), ot.addAttribute(g, y, A + 3)), e.tangent && (v = at.normalize(at.cross(y, p, v), v), ot.addAttribute(h, v, _), ot.addAttribute(h, v, _ + 3), ot.addAttribute(h, v, A), ot.addAttribute(h, v, A + 3))), A += 6;
        }

        if (e.normal) {
          for (u.set(r), b = 0; b < n; b += 3) {
            u[b + n] = -r[b], u[b + n + 1] = -r[b + 1], u[b + n + 2] = -r[b + 2];
          }

          t.normal.values = u;
        } else t.normal = void 0;

        e.bitangent ? (g.set(a), g.set(a, n), t.bitangent.values = g) : t.bitangent = void 0, e.tangent && (d = t.tangent.values, h.set(d), h.set(d, n), t.tangent.values = h);
      }

      if (e.st) {
        var w = t.st.values,
            T = new Float32Array(6 * s);
        T.set(w), T.set(w, s);

        for (var N = 2 * s, E = 0; E < 2; E++) {
          for (T[N++] = w[0], T[N++] = w[1], b = 2; b < s; b += 2) {
            var P = w[b],
                F = w[b + 1];
            T[N++] = P, T[N++] = F, T[N++] = P, T[N++] = F;
          }

          T[N++] = w[0], T[N++] = w[1];
        }

        t.st.values = T;
      }

      return t;
    }(s, e);
    var c,
        f,
        p = u / 3;

    if (t.shadowVolume) {
      for (var v = s.normal.values, u = v.length, y = new Float32Array(6 * u), A = 0; A < u; A++) {
        v[A] = -v[A];
      }

      y.set(v, u), y = G(v, 4 * u, y), s.extrudeDirection = new st({
        componentDatatype: it.FLOAT,
        componentsPerAttribute: 3,
        values: y
      }), e.normal || (s.normal = void 0);
    }

    nt(t.offsetAttribute) && (f = new Uint8Array(6 * p), f = t.offsetAttribute === D.TOP ? (f = M(f, 1, 0, p), M(f, 1, 2 * p, 4 * p)) : (c = t.offsetAttribute === D.NONE ? 0 : 1, M(f, c)), s.applyOffset = new st({
      componentDatatype: it.UNSIGNED_BYTE,
      componentsPerAttribute: 1,
      values: f
    }));

    var b = l.length,
        _ = p + p,
        w = dt.createTypedArray(h.length / 3, 2 * b + 3 * _);

    w.set(l);
    var T,
        N,
        E,
        P,
        F = b;

    for (A = 0; A < b; A += 3) {
      var I = l[A],
          O = l[A + 1],
          x = l[A + 2];
      w[F++] = x + p, w[F++] = O + p, w[F++] = I + p;
    }

    for (A = 0; A < _; A += 2) {
      E = (T = A + _) + 1, P = (N = T + _) + 1, w[F++] = T, w[F++] = N, w[F++] = E, w[F++] = E, w[F++] = N, w[F++] = P;
    }

    return {
      attributes: s,
      indices: w
    };
  }

  var E = new at(),
      P = new at(),
      F = new t();

  function I(t, e, r, a, i, o) {
    var n = at.subtract(e, t, E);
    at.normalize(n, n);
    var s = r.geodeticSurfaceNormal(t, P),
        l = at.cross(n, s, E);
    at.multiplyByScalar(l, a, l);
    var d = i.latitude,
        u = i.longitude,
        h = o.latitude,
        g = o.longitude;
    at.add(t, l, P), r.cartesianToCartographic(P, F);
    var m = F.latitude,
        c = F.longitude,
        d = Math.min(d, m),
        u = Math.min(u, c),
        h = Math.max(h, m),
        g = Math.max(g, c);
    at.subtract(t, l, P), r.cartesianToCartographic(P, F), m = F.latitude, c = F.longitude, d = Math.min(d, m), u = Math.min(u, c), h = Math.max(h, m), g = Math.max(g, c), i.latitude = d, i.longitude = u, o.latitude = h, o.longitude = g;
  }

  var O = new at(),
      x = new at(),
      R = new t(),
      C = new t();

  function i(t, e, r, a, i) {
    t = T(t, e);
    var o = p(t, at.equalsEpsilon),
        n = o.length;
    if (n < 2 || r <= 0) return new w();
    var s,
        l,
        d,
        u = .5 * r;
    R.latitude = Number.POSITIVE_INFINITY, R.longitude = Number.POSITIVE_INFINITY, C.latitude = Number.NEGATIVE_INFINITY, C.longitude = Number.NEGATIVE_INFINITY, a === c.ROUNDED && (d = o[0], at.subtract(d, o[1], O), at.normalize(O, O), at.multiplyByScalar(O, u, O), at.add(d, O, x), e.cartesianToCartographic(x, F), s = F.latitude, l = F.longitude, R.latitude = Math.min(R.latitude, s), R.longitude = Math.min(R.longitude, l), C.latitude = Math.max(C.latitude, s), C.longitude = Math.max(C.longitude, l));

    for (var h = 0; h < n - 1; ++h) {
      I(o[h], o[h + 1], e, u, R, C);
    }

    var g = o[n - 1];
    at.subtract(g, o[n - 2], O), at.normalize(O, O), at.multiplyByScalar(O, u, O), at.add(g, O, x), I(g, x, e, u, R, C), a === c.ROUNDED && (e.cartesianToCartographic(x, F), s = F.latitude, l = F.longitude, R.latitude = Math.min(R.latitude, s), R.longitude = Math.min(R.longitude, l), C.latitude = Math.max(C.latitude, s), C.longitude = Math.max(C.longitude, l));
    var m = nt(i) ? i : new w();
    return m.north = C.latitude, m.south = R.latitude, m.east = C.longitude, m.west = R.longitude, m;
  }

  function H(t) {
    var e = (t = y(t, y.EMPTY_OBJECT)).positions,
        r = t.width;
    f.defined("options.positions", e), f.defined("options.width", r);
    var a = y(t.height, 0),
        i = y(t.extrudedHeight, a);
    this._positions = e, this._ellipsoid = A.clone(y(t.ellipsoid, A.WGS84)), this._vertexFormat = V.clone(y(t.vertexFormat, V.DEFAULT)), this._width = r, this._height = Math.max(a, i), this._extrudedHeight = Math.min(a, i), this._cornerType = y(t.cornerType, c.ROUNDED), this._granularity = y(t.granularity, ut.RADIANS_PER_DEGREE), this._shadowVolume = y(t.shadowVolume, !1), this._workerName = "createCorridorGeometry", this._offsetAttribute = t.offsetAttribute, this._rectangle = void 0, this.packedLength = 1 + e.length * at.packedLength + A.packedLength + V.packedLength + 7;
  }

  H.pack = function (t, e, r) {
    f.defined("value", t), f.defined("array", e), r = y(r, 0);
    var a = t._positions,
        i = a.length;
    e[r++] = i;

    for (var o = 0; o < i; ++o, r += at.packedLength) {
      at.pack(a[o], e, r);
    }

    return A.pack(t._ellipsoid, e, r), r += A.packedLength, V.pack(t._vertexFormat, e, r), r += V.packedLength, e[r++] = t._width, e[r++] = t._height, e[r++] = t._extrudedHeight, e[r++] = t._cornerType, e[r++] = t._granularity, e[r++] = t._shadowVolume ? 1 : 0, e[r] = y(t._offsetAttribute, -1), e;
  };

  var z = A.clone(A.UNIT_SPHERE),
      U = new V(),
      B = {
    positions: void 0,
    ellipsoid: z,
    vertexFormat: U,
    width: void 0,
    height: void 0,
    extrudedHeight: void 0,
    cornerType: void 0,
    granularity: void 0,
    shadowVolume: void 0,
    offsetAttribute: void 0
  };
  return H.unpack = function (t, e, r) {
    f.defined("array", t), e = y(e, 0);

    for (var a = t[e++], i = new Array(a), o = 0; o < a; ++o, e += at.packedLength) {
      i[o] = at.unpack(t, e);
    }

    var n = A.unpack(t, e, z);
    e += A.packedLength;
    var s = V.unpack(t, e, U);
    e += V.packedLength;
    var l = t[e++],
        d = t[e++],
        u = t[e++],
        h = t[e++],
        g = t[e++],
        m = 1 === t[e++],
        c = t[e];
    return nt(r) ? (r._positions = i, r._ellipsoid = A.clone(n, r._ellipsoid), r._vertexFormat = V.clone(s, r._vertexFormat), r._width = l, r._height = d, r._extrudedHeight = u, r._cornerType = h, r._granularity = g, r._shadowVolume = m, r._offsetAttribute = -1 === c ? void 0 : c, r) : (B.positions = i, B.width = l, B.height = d, B.extrudedHeight = u, B.cornerType = h, B.granularity = g, B.shadowVolume = m, B.offsetAttribute = -1 === c ? void 0 : c, new H(B));
  }, H.computeRectangle = function (t, e) {
    var r = (t = y(t, y.EMPTY_OBJECT)).positions,
        a = t.width;
    return f.defined("options.positions", r), f.defined("options.width", a), i(r, y(t.ellipsoid, A.WGS84), a, y(t.cornerType, c.ROUNDED), e);
  }, H.createGeometry = function (t) {
    var e = t._positions,
        r = t._width,
        a = t._ellipsoid,
        e = T(e, a),
        i = p(e, at.equalsEpsilon);

    if (!(i.length < 2 || r <= 0)) {
      var o,
          n,
          s,
          l,
          d = t._height,
          u = t._extrudedHeight,
          h = !ut.equalsEpsilon(d, u, 0, ut.EPSILON2),
          g = t._vertexFormat,
          m = {
        ellipsoid: a,
        positions: i,
        width: r,
        cornerType: t._cornerType,
        granularity: t._granularity,
        saveAttributes: !0
      };
      h ? (m.height = d, m.extrudedHeight = u, m.shadowVolume = t._shadowVolume, m.offsetAttribute = t._offsetAttribute, l = N(m, g)) : ((l = k(ot.computePositions(m), g, a)).attributes.position.values = S.scaleToGeodeticHeight(l.attributes.position.values, d, a), nt(t._offsetAttribute) && (o = t._offsetAttribute === D.NONE ? 0 : 1, n = l.attributes.position.values.length, s = new Uint8Array(n / 3), M(s, o), l.attributes.applyOffset = new st({
        componentDatatype: it.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: s
      })));
      var c = l.attributes,
          f = v.fromVertices(c.position.values, void 0, 3);
      return g.position || (l.attributes.position.values = void 0), new b({
        attributes: c,
        indices: l.indices,
        primitiveType: _.TRIANGLES,
        boundingSphere: f,
        offsetAttribute: t._offsetAttribute
      });
    }
  }, H.createShadowVolume = function (t, e, r) {
    var a = t._granularity,
        i = t._ellipsoid,
        o = e(a, i),
        n = r(a, i);
    return new H({
      positions: t._positions,
      width: t._width,
      cornerType: t._cornerType,
      ellipsoid: i,
      granularity: a,
      extrudedHeight: o,
      height: n,
      vertexFormat: V.POSITION_ONLY,
      shadowVolume: !0
    });
  }, e(H.prototype, {
    rectangle: {
      get: function get() {
        return nt(this._rectangle) || (this._rectangle = i(this._positions, this._ellipsoid, this._width, this._cornerType)), this._rectangle;
      }
    },
    textureCoordinateRotationPoints: {
      get: function get() {
        return [0, 0, 0, 1, 1, 0];
      }
    }
  }), H;
});