"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryInstance", "./GeometryOffsetAttribute", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix2", "./Matrix3", "./PolygonPipeline", "./PrimitiveType", "./Quaternion", "./Rectangle", "./RectangleGeometryLibrary", "./VertexFormat"], function (gt, w, v, pt, t, d, dt, m, mt, e, o, h, b, vt, a, ht, yt, ft, _t, wt, y, H, bt, n, A, x, V, At) {
  "use strict";

  var xt = new pt(),
      Et = new pt(),
      Pt = new pt(),
      Ft = new pt(),
      E = new x(),
      z = new v(),
      P = new w(),
      F = new w();

  function Rt(t, e) {
    var r = new b({
      attributes: new a(),
      primitiveType: n.TRIANGLES
    });
    return r.attributes.position = new vt({
      componentDatatype: dt.DOUBLE,
      componentsPerAttribute: 3,
      values: e.positions
    }), t.normal && (r.attributes.normal = new vt({
      componentDatatype: dt.FLOAT,
      componentsPerAttribute: 3,
      values: e.normals
    })), t.tangent && (r.attributes.tangent = new vt({
      componentDatatype: dt.FLOAT,
      componentsPerAttribute: 3,
      values: e.tangents
    })), t.bitangent && (r.attributes.bitangent = new vt({
      componentDatatype: dt.FLOAT,
      componentsPerAttribute: 3,
      values: e.bitangents
    })), r;
  }

  var Lt = new pt(),
      Tt = new pt();

  function Nt(t, e) {
    var r = t._vertexFormat,
        a = t._ellipsoid,
        n = e.height,
        o = e.width,
        i = e.northCap,
        s = e.southCap,
        l = 0,
        u = n,
        c = n,
        g = 0;
    i && (--c, g += l = 1), s && (--u, --c, g += 1), g += o * c;

    for (var p = r.position ? new Float64Array(3 * g) : void 0, d = r.st ? new Float32Array(2 * g) : void 0, m = 0, v = 0, h = xt, y = z, f = Number.MAX_VALUE, _ = Number.MAX_VALUE, w = -Number.MAX_VALUE, b = -Number.MAX_VALUE, A = l; A < u; ++A) {
      for (var x = 0; x < o; ++x) {
        V.computePosition(e, a, r.st, A, x, h, y), p[m++] = h.x, p[m++] = h.y, p[m++] = h.z, r.st && (d[v++] = y.x, d[v++] = y.y, f = Math.min(f, y.x), _ = Math.min(_, y.y), w = Math.max(w, y.x), b = Math.max(b, y.y));
      }
    }

    if (i && (V.computePosition(e, a, r.st, 0, 0, h, y), p[m++] = h.x, p[m++] = h.y, p[m++] = h.z, r.st && (d[v++] = y.x, d[v++] = y.y, f = y.x, _ = y.y, w = y.x, b = y.y)), s && (V.computePosition(e, a, r.st, n - 1, 0, h, y), p[m++] = h.x, p[m++] = h.y, p[m] = h.z, r.st && (d[v++] = y.x, d[v] = y.y, f = Math.min(f, y.x), _ = Math.min(_, y.y), w = Math.max(w, y.x), b = Math.max(b, y.y))), r.st && (f < 0 || _ < 0 || 1 < w || 1 < b)) for (var E = 0; E < d.length; E += 2) {
      d[E] = (d[E] - f) / (w - f), d[E + 1] = (d[E + 1] - _) / (b - _);
    }

    var P = function (t, e, r, a) {
      var n = t.length,
          o = e.normal ? new Float32Array(n) : void 0,
          i = e.tangent ? new Float32Array(n) : void 0,
          s = e.bitangent ? new Float32Array(n) : void 0,
          l = 0,
          u = Ft,
          c = Pt,
          g = Et;
      if (e.normal || e.tangent || e.bitangent) for (var p = 0; p < n; p += 3) {
        var d = pt.fromArray(t, p, xt),
            m = l + 1,
            v = l + 2,
            g = r.geodeticSurfaceNormal(d, g);
        (e.tangent || e.bitangent) && (pt.cross(pt.UNIT_Z, g, c), H.multiplyByVector(a, c, c), pt.normalize(c, c), e.bitangent && pt.normalize(pt.cross(g, c, u), u)), e.normal && (o[l] = g.x, o[m] = g.y, o[v] = g.z), e.tangent && (i[l] = c.x, i[m] = c.y, i[v] = c.z), e.bitangent && (s[l] = u.x, s[m] = u.y, s[v] = u.z), l += 3;
      }
      return Rt(e, {
        positions: t,
        normals: o,
        tangents: i,
        bitangents: s
      });
    }(p, r, a, e.tangentRotationMatrix),
        F = 6 * (o - 1) * (c - 1);

    i && (F += 3 * (o - 1)), s && (F += 3 * (o - 1));

    for (var R = _t.createTypedArray(g, F), L = 0, T = 0, N = 0; N < c - 1; ++N) {
      for (var O = 0; O < o - 1; ++O) {
        var D = L + o,
            k = D + 1,
            S = L + 1;
        R[T++] = L, R[T++] = D, R[T++] = S, R[T++] = S, R[T++] = D, R[T++] = k, ++L;
      }

      ++L;
    }

    if (i || s) {
      var M,
          G,
          I = g - 1,
          C = g - 1;
      if (i && s && (I = g - 2), L = 0, i) for (N = 0; N < o - 1; N++) {
        G = (M = L) + 1, R[T++] = I, R[T++] = M, R[T++] = G, ++L;
      }
      if (s) for (L = (c - 1) * o, N = 0; N < o - 1; N++) {
        G = (M = L) + 1, R[T++] = M, R[T++] = C, R[T++] = G, ++L;
      }
    }

    return P.indices = R, r.st && (P.attributes.st = new vt({
      componentDatatype: dt.FLOAT,
      componentsPerAttribute: 2,
      values: d
    })), P;
  }

  function Ot(t, e, r, a, n) {
    return t[e++] = a[r], t[e++] = a[r + 1], t[e++] = a[r + 2], t[e++] = n[r], t[e++] = n[r + 1], t[e] = n[r + 2], t;
  }

  function Dt(t, e, r, a) {
    return t[e++] = a[r], t[e++] = a[r + 1], t[e++] = a[r], t[e] = a[r + 1], t;
  }

  var kt = new At();

  function R(t, e) {
    var r,
        a = t._shadowVolume,
        n = t._offsetAttribute,
        o = t._vertexFormat,
        i = t._extrudedHeight,
        s = t._surfaceHeight,
        l = t._ellipsoid,
        u = e.height,
        c = e.width;
    a && ((r = At.clone(o, kt)).normal = !0, t._vertexFormat = r);
    var g = Nt(t, e);
    a && (t._vertexFormat = o);
    var p = bt.scaleToGeodeticHeight(g.attributes.position.values, s, l, !1),
        d = 2 * (st = (p = new Float64Array(p)).length),
        m = new Float64Array(d);
    m.set(p);
    var v = bt.scaleToGeodeticHeight(g.attributes.position.values, i, l);
    m.set(v, st), g.attributes.position.values = m;

    var h,
        y,
        f,
        _ = o.normal ? new Float32Array(d) : void 0,
        w = o.tangent ? new Float32Array(d) : void 0,
        b = o.bitangent ? new Float32Array(d) : void 0,
        A = o.st ? new Float32Array(d / 3 * 2) : void 0;

    if (o.normal) {
      for (y = g.attributes.normal.values, _.set(y), E = 0; E < st; E++) {
        y[E] = -y[E];
      }

      _.set(y, st), g.attributes.normal.values = _;
    }

    if (a) {
      y = g.attributes.normal.values, o.normal || (g.attributes.normal = void 0);

      for (var x = new Float32Array(d), E = 0; E < st; E++) {
        y[E] = -y[E];
      }

      x.set(y, st), g.attributes.extrudeDirection = new vt({
        componentDatatype: dt.FLOAT,
        componentsPerAttribute: 3,
        values: x
      });
    }

    var P,
        F,
        R,
        L = mt(n);

    if (L && (P = st / 3 * 2, F = new Uint8Array(P), F = n === yt.TOP ? gt(F, 1, 0, P / 2) : (f = n === yt.NONE ? 0 : 1, gt(F, f)), g.attributes.applyOffset = new vt({
      componentDatatype: dt.UNSIGNED_BYTE,
      componentsPerAttribute: 1,
      values: F
    })), o.tangent) {
      var T = g.attributes.tangent.values;

      for (w.set(T), E = 0; E < st; E++) {
        T[E] = -T[E];
      }

      w.set(T, st), g.attributes.tangent.values = w;
    }

    o.bitangent && (R = g.attributes.bitangent.values, b.set(R), b.set(R, st), g.attributes.bitangent.values = b), o.st && (h = g.attributes.st.values, A.set(h), A.set(h, st / 3 * 2), g.attributes.st.values = A);

    var N = g.indices,
        O = N.length,
        D = st / 3,
        k = _t.createTypedArray(d / 3, 2 * O);

    for (k.set(N), E = 0; E < O; E += 3) {
      k[E + O] = N[E + 2] + D, k[E + 1 + O] = N[E + 1] + D, k[E + 2 + O] = N[E] + D;
    }

    g.indices = k;
    var S = e.northCap,
        M = e.southCap,
        G = u,
        I = 2,
        C = 0,
        H = 4,
        V = 4;
    S && (--I, --G, C += 1, H -= 2, --V), M && (--I, --G, C += 1, H -= 2, --V);
    var z = 2 * ((C += I * c + 2 * G - H) + V),
        U = new Float64Array(3 * z),
        B = a ? new Float32Array(3 * z) : void 0,
        q = L ? new Uint8Array(z) : void 0,
        Y = o.st ? new Float32Array(2 * z) : void 0,
        X = n === yt.TOP;
    L && !X && (f = n === yt.ALL ? 1 : 0, q = gt(q, f));
    var j = 0,
        J = 0,
        Q = 0,
        W = 0,
        Z = c * G;

    for (E = 0; E < Z; E += c) {
      U = Ot(U, j, $ = 3 * E, p, v), j += 6, o.st && (Y = Dt(Y, J, 2 * E, h), J += 4), a && (Q += 3, B[Q++] = y[$], B[Q++] = y[$ + 1], B[Q++] = y[$ + 2]), X && (q[W++] = 1, W += 1);
    }

    if (M) {
      var K = S ? 1 + Z : Z,
          $ = 3 * K;

      for (E = 0; E < 2; E++) {
        U = Ot(U, j, $, p, v), j += 6, o.st && (Y = Dt(Y, J, 2 * K, h), J += 4), a && (Q += 3, B[Q++] = y[$], B[Q++] = y[$ + 1], B[Q++] = y[$ + 2]), X && (q[W++] = 1, W += 1);
      }
    } else for (E = Z - c; E < Z; E++) {
      U = Ot(U, j, $ = 3 * E, p, v), j += 6, o.st && (Y = Dt(Y, J, 2 * E, h), J += 4), a && (Q += 3, B[Q++] = y[$], B[Q++] = y[$ + 1], B[Q++] = y[$ + 2]), X && (q[W++] = 1, W += 1);
    }

    for (E = Z - 1; 0 < E; E -= c) {
      U = Ot(U, j, $ = 3 * E, p, v), j += 6, o.st && (Y = Dt(Y, J, 2 * E, h), J += 4), a && (Q += 3, B[Q++] = y[$], B[Q++] = y[$ + 1], B[Q++] = y[$ + 2]), X && (q[W++] = 1, W += 1);
    }

    if (S) {
      var tt = Z;

      for ($ = 3 * tt, E = 0; E < 2; E++) {
        U = Ot(U, j, $, p, v), j += 6, o.st && (Y = Dt(Y, J, 2 * tt, h), J += 4), a && (Q += 3, B[Q++] = y[$], B[Q++] = y[$ + 1], B[Q++] = y[$ + 2]), X && (q[W++] = 1, W += 1);
      }
    } else for (E = c - 1; 0 <= E; E--) {
      U = Ot(U, j, $ = 3 * E, p, v), j += 6, o.st && (Y = Dt(Y, J, 2 * E, h), J += 4), a && (Q += 3, B[Q++] = y[$], B[Q++] = y[$ + 1], B[Q++] = y[$ + 2]), X && (q[W++] = 1, W += 1);
    }

    var et = function (t, e, r) {
      var a = t.length,
          n = e.normal ? new Float32Array(a) : void 0,
          o = e.tangent ? new Float32Array(a) : void 0,
          i = e.bitangent ? new Float32Array(a) : void 0,
          s = 0,
          l = 0,
          u = 0,
          c = !0,
          g = Ft,
          p = Pt,
          d = Et;
      if (e.normal || e.tangent || e.bitangent) for (var m = 0; m < a; m += 6) {
        var v,
            h = pt.fromArray(t, m, xt),
            y = pt.fromArray(t, (m + 6) % a, Lt);
        c && (v = pt.fromArray(t, (m + 3) % a, Tt), pt.subtract(y, h, y), pt.subtract(v, h, v), d = pt.normalize(pt.cross(v, y, d), d), c = !1), pt.equalsEpsilon(y, h, wt.EPSILON10) && (c = !0), (e.tangent || e.bitangent) && (g = r.geodeticSurfaceNormal(h, g), e.tangent && (p = pt.normalize(pt.cross(g, d, p), p))), e.normal && (n[s++] = d.x, n[s++] = d.y, n[s++] = d.z, n[s++] = d.x, n[s++] = d.y, n[s++] = d.z), e.tangent && (o[l++] = p.x, o[l++] = p.y, o[l++] = p.z, o[l++] = p.x, o[l++] = p.y, o[l++] = p.z), e.bitangent && (i[u++] = g.x, i[u++] = g.y, i[u++] = g.z, i[u++] = g.x, i[u++] = g.y, i[u++] = g.z);
      }
      return Rt(e, {
        positions: t,
        normals: n,
        tangents: o,
        bitangents: i
      });
    }(U, o, l);

    o.st && (et.attributes.st = new vt({
      componentDatatype: dt.FLOAT,
      componentsPerAttribute: 2,
      values: Y
    })), a && (et.attributes.extrudeDirection = new vt({
      componentDatatype: dt.FLOAT,
      componentsPerAttribute: 3,
      values: B
    })), L && (et.attributes.applyOffset = new vt({
      componentDatatype: dt.UNSIGNED_BYTE,
      componentsPerAttribute: 1,
      values: q
    }));

    var rt,
        at,
        nt,
        ot,
        it = _t.createTypedArray(z, 6 * C),
        st = U.length / 3,
        lt = 0;

    for (E = 0; E < st - 1; E += 2) {
      ot = ((rt = E) + 2) % st;
      var ut = pt.fromArray(U, 3 * rt, Lt),
          ct = pt.fromArray(U, 3 * ot, Tt);
      pt.equalsEpsilon(ut, ct, wt.EPSILON10) || (nt = (2 + (at = (rt + 1) % st)) % st, it[lt++] = rt, it[lt++] = at, it[lt++] = ot, it[lt++] = ot, it[lt++] = at, it[lt++] = nt);
    }

    return et.indices = it, (et = ft.combineInstances([new ht({
      geometry: g
    }), new ht({
      geometry: et
    })]))[0];
  }

  var u = [new pt(), new pt(), new pt(), new pt()],
      L = new t(),
      T = new t();

  function f(t, e, r, a, n) {
    if (0 === r) return x.clone(t, n);
    var o = V.computeOptions(t, e, r, 0, E, L),
        i = o.height,
        s = o.width,
        l = u;
    return V.computePosition(o, a, !1, 0, 0, l[0]), V.computePosition(o, a, !1, 0, s - 1, l[1]), V.computePosition(o, a, !1, i - 1, 0, l[2]), V.computePosition(o, a, !1, i - 1, s - 1, l[3]), x.fromCartesianArray(l, a, n);
  }

  function _(t) {
    var e = (t = m(t, m.EMPTY_OBJECT)).rectangle;
    if (d.typeOf.object("rectangle", e), x.validate(e), e.north < e.south) throw new o("options.rectangle.north must be greater than or equal to options.rectangle.south");
    var r = m(t.height, 0),
        a = m(t.extrudedHeight, r);
    this._rectangle = x.clone(e), this._granularity = m(t.granularity, wt.RADIANS_PER_DEGREE), this._ellipsoid = h.clone(m(t.ellipsoid, h.WGS84)), this._surfaceHeight = Math.max(r, a), this._rotation = m(t.rotation, 0), this._stRotation = m(t.stRotation, 0), this._vertexFormat = At.clone(m(t.vertexFormat, At.DEFAULT)), this._extrudedHeight = Math.min(r, a), this._shadowVolume = m(t.shadowVolume, !1), this._workerName = "createRectangleGeometry", this._offsetAttribute = t.offsetAttribute, this._rotatedRectangle = void 0, this._textureCoordinateRotationPoints = void 0;
  }

  _.packedLength = x.packedLength + h.packedLength + At.packedLength + 7, _.pack = function (t, e, r) {
    return d.typeOf.object("value", t), d.defined("array", e), r = m(r, 0), x.pack(t._rectangle, e, r), r += x.packedLength, h.pack(t._ellipsoid, e, r), r += h.packedLength, At.pack(t._vertexFormat, e, r), r += At.packedLength, e[r++] = t._granularity, e[r++] = t._surfaceHeight, e[r++] = t._rotation, e[r++] = t._stRotation, e[r++] = t._extrudedHeight, e[r++] = t._shadowVolume ? 1 : 0, e[r] = m(t._offsetAttribute, -1), e;
  };
  var N = new x(),
      O = h.clone(h.UNIT_SPHERE),
      D = {
    rectangle: N,
    ellipsoid: O,
    vertexFormat: kt,
    granularity: void 0,
    height: void 0,
    rotation: void 0,
    stRotation: void 0,
    extrudedHeight: void 0,
    shadowVolume: void 0,
    offsetAttribute: void 0
  };
  _.unpack = function (t, e, r) {
    d.defined("array", t), e = m(e, 0);
    var a = x.unpack(t, e, N);
    e += x.packedLength;
    var n = h.unpack(t, e, O);
    e += h.packedLength;
    var o = At.unpack(t, e, kt);
    e += At.packedLength;
    var i = t[e++],
        s = t[e++],
        l = t[e++],
        u = t[e++],
        c = t[e++],
        g = 1 === t[e++],
        p = t[e];
    return mt(r) ? (r._rectangle = x.clone(a, r._rectangle), r._ellipsoid = h.clone(n, r._ellipsoid), r._vertexFormat = At.clone(o, r._vertexFormat), r._granularity = i, r._surfaceHeight = s, r._rotation = l, r._stRotation = u, r._extrudedHeight = c, r._shadowVolume = g, r._offsetAttribute = -1 === p ? void 0 : p, r) : (D.granularity = i, D.height = s, D.rotation = l, D.stRotation = u, D.extrudedHeight = c, D.shadowVolume = g, D.offsetAttribute = -1 === p ? void 0 : p, new _(D));
  }, _.computeRectangle = function (t, e) {
    var r = (t = m(t, m.EMPTY_OBJECT)).rectangle;
    if (d.typeOf.object("rectangle", r), x.validate(r), r.north < r.south) throw new o("options.rectangle.north must be greater than or equal to options.rectangle.south");
    var a = m(t.granularity, wt.RADIANS_PER_DEGREE),
        n = m(t.ellipsoid, h.WGS84);
    return f(r, a, m(t.rotation, 0), n, e);
  };
  var k = new H(),
      S = new A(),
      M = new t();
  _.createGeometry = function (t) {
    if (!wt.equalsEpsilon(t._rectangle.north, t._rectangle.south, wt.EPSILON10) && !wt.equalsEpsilon(t._rectangle.east, t._rectangle.west, wt.EPSILON10)) {
      var e,
          r,
          a = t._rectangle,
          n = t._ellipsoid,
          o = t._rotation,
          i = t._stRotation,
          s = t._vertexFormat,
          l = V.computeOptions(a, t._granularity, o, i, E, L, T),
          u = k;
      0 !== i || 0 !== o ? (e = x.center(a, M), r = n.geodeticSurfaceNormalCartographic(e, Lt), A.fromAxisAngle(r, -i, S), H.fromQuaternion(S, u)) : H.clone(H.IDENTITY, u);

      var c,
          g,
          p,
          d,
          m,
          v,
          h,
          y = t._surfaceHeight,
          f = t._extrudedHeight,
          _ = !wt.equalsEpsilon(y, f, 0, wt.EPSILON2);

      return l.lonScalar = 1 / t._rectangle.width, l.latScalar = 1 / t._rectangle.height, l.tangentRotationMatrix = u, a = t._rectangle, p = _ ? (h = R(t, l), c = w.fromRectangle3D(a, n, y, F), g = w.fromRectangle3D(a, n, f, P), w.union(c, g)) : ((h = Nt(t, l)).attributes.position.values = bt.scaleToGeodeticHeight(h.attributes.position.values, y, n, !1), mt(t._offsetAttribute) && (d = h.attributes.position.values.length, m = new Uint8Array(d / 3), v = t._offsetAttribute === yt.NONE ? 0 : 1, gt(m, v), h.attributes.applyOffset = new vt({
        componentDatatype: dt.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: m
      })), w.fromRectangle3D(a, n, y)), s.position || delete h.attributes.position, new b({
        attributes: h.attributes,
        indices: h.indices,
        primitiveType: h.primitiveType,
        boundingSphere: p,
        offsetAttribute: t._offsetAttribute
      });
    }
  }, _.createShadowVolume = function (t, e, r) {
    var a = t._granularity,
        n = t._ellipsoid,
        o = e(a, n),
        i = r(a, n);
    return new _({
      rectangle: t._rectangle,
      rotation: t._rotation,
      ellipsoid: n,
      stRotation: t._stRotation,
      granularity: a,
      extrudedHeight: i,
      height: o,
      vertexFormat: At.POSITION_ONLY,
      shadowVolume: !0
    });
  };
  var G = new x(),
      I = [new v(), new v(), new v()],
      C = new y(),
      U = new t();
  return e(_.prototype, {
    rectangle: {
      get: function get() {
        return mt(this._rotatedRectangle) || (this._rotatedRectangle = f(this._rectangle, this._granularity, this._rotation, this._ellipsoid)), this._rotatedRectangle;
      }
    },
    textureCoordinateRotationPoints: {
      get: function get() {
        return mt(this._textureCoordinateRotationPoints) || (this._textureCoordinateRotationPoints = function (t) {
          if (0 === t._stRotation) return [0, 0, 0, 1, 1, 0];
          var e = x.clone(t._rectangle, G),
              r = t._granularity,
              a = t._ellipsoid,
              n = f(e, r, t._rotation - t._stRotation, a, G),
              o = I;
          o[0].x = n.west, o[0].y = n.south, o[1].x = n.west, o[1].y = n.north, o[2].x = n.east, o[2].y = n.south;

          for (var i = t.rectangle, s = y.fromRotation(t._stRotation, C), l = x.center(i, U), u = 0; u < 3; ++u) {
            var c = o[u];
            c.x -= l.longitude, c.y -= l.latitude, y.multiplyByVector(s, c, c), c.x += l.longitude, c.y += l.latitude, c.x = (c.x - i.west) / i.width, c.y = (c.y - i.south) / i.height;
          }

          var g = o[0],
              p = o[1],
              d = o[2],
              m = new Array(6);
          return v.pack(g, m), v.pack(p, m, 2), v.pack(d, m, 4), m;
        }(this)), this._textureCoordinateRotationPoints;
      }
    }
  }), _;
});