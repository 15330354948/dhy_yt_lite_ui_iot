"use strict";

define(["./ApproximateTerrainHeights", "./ArcType", "./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./DeveloperError", "./Math", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./EllipsoidGeodesic", "./EllipsoidRhumbLine", "./EncodedCartesian3", "./GeographicProjection", "./Geometry", "./GeometryAttribute", "./IntersectionTests", "./Matrix3", "./Plane", "./Quaternion", "./Rectangle", "./WebMercatorProjection"], function (Re, j, q, Be, je, G, h, qe, a, Ge, g, U, e, w, k, H, Ue, n, He, Ve, V, p, d, u, We, r) {
  "use strict";

  var W = [n, r],
      t = W.length,
      Ye = Math.cos(Ge.toRadians(30)),
      y = Math.cos(Ge.toRadians(150)),
      Y = 0,
      Z = 1e3;

  function f(e) {
    var n = (e = g(e, g.EMPTY_OBJECT)).positions;
    if (!U(n) || n.length < 2) throw new a("At least two positions are required.");
    if (U(e.arcType) && e.arcType !== j.GEODESIC && e.arcType !== j.RHUMB) throw new a("Valid options for arcType are ArcType.GEODESIC and ArcType.RHUMB.");
    this.width = g(e.width, 1), this._positions = n, this.granularity = g(e.granularity, 9999), this.loop = g(e.loop, !1), this.arcType = g(e.arcType, j.GEODESIC), this._ellipsoid = w.WGS84, this._projectionIndex = 0, this._workerName = "createGroundPolylineGeometry", this._scene3DOnly = !1;
  }

  e(f.prototype, {
    packedLength: {
      get: function get() {
        return 1 + 3 * this._positions.length + 1 + 1 + 1 + w.packedLength + 1 + 1;
      }
    }
  }), f.setProjectionAndEllipsoid = function (e, n) {
    for (var a = 0, r = 0; r < t; r++) {
      if (n instanceof W[r]) {
        a = r;
        break;
      }
    }

    e._projectionIndex = a, e._ellipsoid = n.ellipsoid;
  };
  var v = new je(),
      m = new je(),
      E = new je();

  function X(e, n, a, r, t) {
    var o = J(r, e, 0, v),
        i = J(r, e, a, m),
        l = J(r, n, 0, E),
        s = Ze(i, o, m),
        c = Ze(l, o, E);
    return je.cross(c, s, t), je.normalize(t, t);
  }

  var T = new G(),
      P = new je(),
      S = new je(),
      N = new je();

  function Q(e, n, a, r, t, o, i, l, s, c, p) {
    if (0 !== t) {
      var u;
      o === j.GEODESIC ? u = new k(e, n, i) : o === j.RHUMB && (u = new H(e, n, i));
      var d = u.surfaceDistance;
      if (!(d < t)) for (var h = X(e, n, r, i, N), g = Math.ceil(d / t), w = d / g, y = w, f = g - 1, v = l.length, m = 0; m < f; m++) {
        var E = u.interpolateUsingSurfaceDistance(y, T),
            I = J(i, E, a, P),
            O = J(i, E, r, S);
        je.pack(h, l, v), je.pack(I, s, v), je.pack(O, c, v), p.push(E.latitude), p.push(E.longitude), v += 3, y += w;
      }
    }
  }

  var o = new G();

  function J(e, n, a, r) {
    return G.clone(n, o), o.height = a, G.toCartesian(o, e, r);
  }

  function Ze(e, n, a) {
    return je.subtract(e, n, a), je.normalize(a, a), a;
  }

  f.pack = function (e, n, a) {
    h.typeOf.object("value", e), h.defined("array", n);
    var r = g(a, 0),
        t = e._positions,
        o = t.length;
    n[r++] = o;

    for (var i = 0; i < o; ++i) {
      var l = t[i];
      je.pack(l, n, r), r += 3;
    }

    return n[r++] = e.granularity, n[r++] = e.loop ? 1 : 0, n[r++] = e.arcType, w.pack(e._ellipsoid, n, r), r += w.packedLength, n[r++] = e._projectionIndex, n[r++] = e._scene3DOnly ? 1 : 0, n;
  }, f.unpack = function (e, n, a) {
    h.defined("array", e);

    for (var r = g(n, 0), t = e[r++], o = new Array(t), i = 0; i < t; i++) {
      o[i] = je.unpack(e, r), r += 3;
    }

    var l = e[r++],
        s = 1 === e[r++],
        c = e[r++],
        p = w.unpack(e, r);
    r += w.packedLength;
    var u = e[r++],
        d = 1 === e[r++];
    return U(a) || (a = new f({
      positions: o
    })), a._positions = o, a.granularity = l, a.loop = s, a.arcType = c, a._ellipsoid = p, a._projectionIndex = u, a._scene3DOnly = d, a;
  };

  var I = new je(),
      O = new je(),
      _ = new je(),
      A = new je(),
      L = new d(je.UNIT_X, 0),
      C = new je();

  function K(e, n, a, r, t) {
    var o = Ze(a, n, C),
        i = Ze(e, n, I),
        l = Ze(r, n, O),
        s = je.cross(o, i, A),
        s = je.normalize(s, s),
        c = d.fromPointNormal(n, s, L),
        p = d.getPointDistance(c, r);
    if (Ge.equalsEpsilon(p, 0, Ge.EPSILON7)) return je.clone(s, t), t;
    t = je.add(l, i, t), t = je.normalize(t, t);
    var u = je.cross(o, t, _);
    return je.normalize(u, u), je.cross(u, o, t), je.normalize(t, t), je.dot(l, u) < 0 && (t = je.negate(t, t)), t;
  }

  var $ = d.fromPointNormal(je.ZERO, je.UNIT_Y),
      ee = new je(),
      ne = new je(),
      ae = new je(),
      re = new je(),
      te = new je(),
      oe = new je(),
      ie = new G(),
      le = new G(),
      se = new G();

  f.createGeometry = function (e) {
    var n,
        a,
        r,
        t,
        o,
        i = !e._scene3DOnly,
        l = e.loop,
        s = e._ellipsoid,
        c = e.granularity,
        p = e.arcType,
        u = new W[e._projectionIndex](s),
        d = Y,
        h = Z,
        g = e._positions,
        w = g.length;
    2 === w && (l = !1);

    for (var y, f, v, m = new H(void 0, void 0, s), E = [g[0]], I = 0; I < w - 1; I++) {
      a = g[I], r = g[I + 1], y = V.lineSegmentPlane(a, r, $, oe), !U(y) || je.equalsEpsilon(y, a, Ge.EPSILON7) || je.equalsEpsilon(y, r, Ge.EPSILON7) || (e.arcType === j.GEODESIC ? E.push(je.clone(y)) : e.arcType === j.RHUMB && (v = s.cartesianToCartographic(y, ie).longitude, t = s.cartesianToCartographic(a, ie), o = s.cartesianToCartographic(r, le), m.setEndPoints(t, o), f = m.findIntersectionWithLongitude(v, se), y = s.cartographicToCartesian(f, oe), !U(y) || je.equalsEpsilon(y, a, Ge.EPSILON7) || je.equalsEpsilon(y, r, Ge.EPSILON7) || E.push(je.clone(y)))), E.push(r);
    }

    l && (a = g[w - 1], r = g[0], y = V.lineSegmentPlane(a, r, $, oe), !U(y) || je.equalsEpsilon(y, a, Ge.EPSILON7) || je.equalsEpsilon(y, r, Ge.EPSILON7) || (e.arcType === j.GEODESIC ? E.push(je.clone(y)) : e.arcType === j.RHUMB && (v = s.cartesianToCartographic(y, ie).longitude, t = s.cartesianToCartographic(a, ie), o = s.cartesianToCartographic(r, le), m.setEndPoints(t, o), f = m.findIntersectionWithLongitude(v, se), y = s.cartographicToCartesian(f, oe), !U(y) || je.equalsEpsilon(y, a, Ge.EPSILON7) || je.equalsEpsilon(y, r, Ge.EPSILON7) || E.push(je.clone(y)))));
    var O = E.length,
        k = new Array(O);

    for (I = 0; I < O; I++) {
      var T = G.fromCartesian(E[I], s);
      T.height = 0, k[I] = T;
    }

    if (!((O = (k = q(k, G.equalsEpsilon)).length) < 2)) {
      var P = [],
          S = [],
          N = [],
          _ = [],
          A = ee,
          L = ne,
          C = ae,
          D = re,
          b = te,
          z = k[0],
          x = k[1];

      for (A = J(s, k[O - 1], d, A), D = J(s, x, d, D), L = J(s, z, d, L), C = J(s, z, h, C), b = l ? K(A, L, C, D, b) : X(z, x, h, s, b), je.pack(b, S, 0), je.pack(L, N, 0), je.pack(C, _, 0), P.push(z.latitude), P.push(z.longitude), Q(z, x, d, h, c, p, s, S, N, _, P), I = 1; I < O - 1; ++I) {
        A = je.clone(L, A), L = je.clone(D, L);
        var M = k[I];
        J(s, M, h, C), J(s, k[I + 1], d, D), K(A, L, C, D, b), n = S.length, je.pack(b, S, n), je.pack(L, N, n), je.pack(C, _, n), P.push(M.latitude), P.push(M.longitude), Q(k[I], k[I + 1], d, h, c, p, s, S, N, _, P);
      }

      var F,
          R = k[O - 1],
          B = k[O - 2],
          L = J(s, R, d, L),
          C = J(s, R, h, C);

      if (b = l ? (F = k[0], K(A = J(s, B, d, A), L, C, D = J(s, F, d, D), b)) : X(B, R, h, s, b), n = S.length, je.pack(b, S, n), je.pack(L, N, n), je.pack(C, _, n), P.push(R.latitude), P.push(R.longitude), l) {
        for (Q(R, z, d, h, c, p, s, S, N, _, P), n = S.length, I = 0; I < 3; ++I) {
          S[n + I] = S[I], N[n + I] = N[I], _[n + I] = _[I];
        }

        P.push(z.latitude), P.push(z.longitude);
      }

      return function (e, n, a, r, t, o, i) {
        var l,
            s,
            c,
            p,
            u,
            d,
            h = n._ellipsoid,
            g = a.length / 3 - 1,
            w = 8 * g,
            y = 4 * w,
            f = 36 * g,
            v = new (65535 < w ? Uint32Array : Uint16Array)(f),
            m = new Float64Array(3 * w),
            E = new Float32Array(y),
            I = new Float32Array(y),
            O = new Float32Array(y),
            k = new Float32Array(y),
            T = new Float32Array(y);
        i && (c = new Float32Array(y), p = new Float32Array(y), u = new Float32Array(y), d = new Float32Array(2 * w));
        var P = o.length / 2,
            S = 0,
            N = $e;
        N.height = 0;
        var _ = en;
        _.height = 0;
        var A = nn,
            L = an;
        if (i) for (s = 0, l = 1; l < P; l++) {
          N.latitude = o[s], N.longitude = o[s + 1], _.latitude = o[s + 2], _.longitude = o[s + 3], A = n.project(N, A), L = n.project(_, L), S += je.distance(A, L), s += 2;
        }
        var C = r.length / 3;
        L = je.unpack(r, 0, L);
        var D,
            b = 0;

        for (s = 3, l = 1; l < C; l++) {
          A = je.clone(L, A), L = je.unpack(r, s, L), b += je.distance(A, L), s += 3;
        }

        s = 3;
        var z = 0,
            x = 0,
            M = 0,
            F = 0,
            R = !1,
            B = je.unpack(a, 0, tn),
            j = je.unpack(r, 0, an),
            q = je.unpack(t, 0, ln);
        {
          var G;
          e && (G = je.unpack(a, a.length - 6, rn), Xe(q, G, B, j) && (q = je.negate(q, q)));
        }
        var U,
            H,
            V,
            W,
            Y,
            Z,
            X,
            Q = 0,
            J = 0,
            K = 0;

        for (l = 0; l < g; l++) {
          var $,
              ee,
              ne = je.clone(B, rn),
              ae = je.clone(j, nn),
              re = je.clone(q, on);
          R && (re = je.negate(re, re)), B = je.unpack(a, s, tn), j = je.unpack(r, s, an), q = je.unpack(t, s, ln), R = Xe(q, ne, B, j), N.latitude = o[z], N.longitude = o[z + 1], _.latitude = o[z + 2], _.longitude = o[z + 3], i && ($ = function (e, n) {
            var a = Math.abs(e.longitude),
                r = Math.abs(n.longitude);
            {
              if (Ge.equalsEpsilon(a, Ge.PI, Ge.EPSILON11)) {
                var t = Ge.sign(n.longitude);
                return e.longitude = t * (a - Ge.EPSILON11), 1;
              }

              if (Ge.equalsEpsilon(r, Ge.PI, Ge.EPSILON11)) {
                var o = Ge.sign(e.longitude);
                return n.longitude = o * (r - Ge.EPSILON11), 2;
              }
            }
            return 0;
          }(N, _), U = n.project(N, gn), (ee = Ze(H = n.project(_, wn), U, Sn)).y = Math.abs(ee.y), V = yn, W = fn, 0 === $ || je.dot(ee, je.UNIT_Y) > Ye ? (V = Qe(n, N, re, U, yn), W = Qe(n, _, q, H, fn)) : 1 === $ ? (W = Qe(n, _, q, H, fn), V.x = 0, V.y = Ge.sign(N.longitude - Math.abs(_.longitude)), V.z = 0) : (V = Qe(n, N, re, U, yn), W.x = 0, W.y = Ge.sign(N.longitude - _.longitude), W.z = 0));
          var te = je.distance(ae, j),
              oe = Ue.fromCartesian(ne, Tn),
              ie = je.subtract(B, ne, vn),
              le = je.normalize(ie, In),
              se = je.subtract(ae, ne, mn);
          se = je.normalize(se, se);
          var ce = je.cross(le, se, In);
          ce = je.normalize(ce, ce);
          var pe = je.cross(se, re, On);
          pe = je.normalize(pe, pe);
          var ue = je.subtract(j, B, En);
          ue = je.normalize(ue, ue);
          var de = je.cross(q, ue, kn);
          de = je.normalize(de, de);
          var he,
              ge = te / b,
              we = Q / b,
              ye = 0,
              fe = 0,
              ve = 0;

          for (i && (ye = je.distance(U, H), Y = Ue.fromCartesian(U, Pn), Z = je.subtract(H, U, Sn), he = (X = je.normalize(Z, Nn)).x, X.x = X.y, X.y = -he, fe = ye / S, ve = J / S), D = 0; D < 8; D++) {
            var me = F + 4 * D,
                Ee = x + 2 * D,
                Ie = me + 3,
                Oe = D < 4 ? 1 : -1,
                ke = 2 === D || 3 === D || 6 === D || 7 === D ? 1 : -1;
            je.pack(oe.high, E, me), E[Ie] = ie.x, je.pack(oe.low, I, me), I[Ie] = ie.y, je.pack(pe, O, me), O[Ie] = ie.z, je.pack(de, k, me), k[Ie] = ge * Oe, je.pack(ce, T, me);
            var Te = we * ke;
            0 === Te && ke < 0 && (Te = Number.POSITIVE_INFINITY), T[Ie] = Te, i && (c[me] = Y.high.x, c[me + 1] = Y.high.y, c[me + 2] = Y.low.x, c[me + 3] = Y.low.y, u[me] = -V.y, u[me + 1] = V.x, u[me + 2] = W.y, u[me + 3] = -W.x, p[me] = Z.x, p[me + 1] = Z.y, p[me + 2] = X.x, p[me + 3] = X.y, d[Ee] = fe * Oe, 0 === (Te = ve * ke) && ke < 0 && (Te = Number.POSITIVE_INFINITY), d[Ee + 1] = Te);
          }

          var Pe = dn,
              Se = hn,
              Ne = pn,
              _e = un,
              Ae = We.fromCartographicArray(sn, cn),
              Le = Re.getMinimumMaximumHeights(Ae, h),
              Ce = Le.minimumTerrainHeight,
              De = Le.maximumTerrainHeight;
          K += Ce, K += De, Je(ne, ae, Ce, De, Pe, Ne), Je(B, j, Ce, De, Se, _e);
          var be = je.multiplyByScalar(ce, Ge.EPSILON5, _n);
          je.add(Pe, be, Pe), je.add(Se, be, Se), je.add(Ne, be, Ne), je.add(_e, be, _e), Ke(Pe, Se), Ke(Ne, _e), je.pack(Pe, m, M), je.pack(Se, m, M + 3), je.pack(_e, m, M + 6), je.pack(Ne, m, M + 9), be = je.multiplyByScalar(ce, -2 * Ge.EPSILON5, _n), je.add(Pe, be, Pe), je.add(Se, be, Se), je.add(Ne, be, Ne), je.add(_e, be, _e), Ke(Pe, Se), Ke(Ne, _e), je.pack(Pe, m, M + 12), je.pack(Se, m, M + 15), je.pack(_e, m, M + 18), je.pack(Ne, m, M + 21), z += 2, s += 3, x += 16, M += 24, F += 32, Q += te, J += ye;
        }

        var ze = s = 0;

        for (l = 0; l < g; l++) {
          for (D = 0; D < Cn; D++) {
            v[s + D] = Ln[D] + ze;
          }

          ze += 8, s += Cn;
        }

        var xe = An;
        Be.fromVertices(a, je.ZERO, 3, xe[0]), Be.fromVertices(r, je.ZERO, 3, xe[1]);
        var Me = Be.fromBoundingSpheres(xe);
        Me.radius += K / (2 * g);
        var Fe = {
          position: new Ve({
            componentDatatype: qe.DOUBLE,
            componentsPerAttribute: 3,
            normalize: !1,
            values: m
          }),
          startHiAndForwardOffsetX: Dn(E),
          startLoAndForwardOffsetY: Dn(I),
          startNormalAndForwardOffsetZ: Dn(O),
          endNormalAndTextureCoordinateNormalizationX: Dn(k),
          rightNormalAndTextureCoordinateNormalizationY: Dn(T)
        };
        i && (Fe.startHiLo2D = Dn(c), Fe.offsetAndRight2D = Dn(p), Fe.startEndNormals2D = Dn(u), Fe.texcoordNormalization2D = new Ve({
          componentDatatype: qe.FLOAT,
          componentsPerAttribute: 2,
          normalize: !1,
          values: d
        }));
        return new He({
          attributes: Fe,
          indices: v,
          boundingSphere: Me
        });
      }(l, u, N, _, S, P, i);
    }
  };

  var D = new je(),
      b = new p(),
      z = new u();

  function Xe(e, n, a, r) {
    var t = Ze(a, n, D),
        o = je.dot(t, e);

    if (Ye < o || o < y) {
      var i = Ze(r, a, C),
          l = o < y ? Ge.PI_OVER_TWO : -Ge.PI_OVER_TWO,
          s = u.fromAxisAngle(i, l, z),
          c = p.fromQuaternion(s, b);
      return p.multiplyByVector(c, e, e), !0;
    }

    return !1;
  }

  var x = new G(),
      M = new je(),
      F = new je();

  function Qe(e, n, a, r, t) {
    var o = G.toCartesian(n, e._ellipsoid, M),
        i = je.add(o, a, F),
        l = !1,
        s = e._ellipsoid,
        c = s.cartesianToCartographic(i, x);
    Math.abs(n.longitude - c.longitude) > Ge.PI_OVER_TWO && (l = !0, i = je.subtract(o, a, F), c = s.cartesianToCartographic(i, x)), c.height = 0;
    var p = e.project(c, t);
    return (t = je.subtract(p, r, t)).z = 0, t = je.normalize(t, t), l && je.negate(t, t), t;
  }

  var R = new je(),
      B = new je();

  function Je(e, n, a, r, t, o) {
    var i = je.subtract(n, e, R);
    je.normalize(i, i);
    var l = a - Y,
        s = je.multiplyByScalar(i, l, B);
    je.add(e, s, t);
    var c = r - Z,
        s = je.multiplyByScalar(i, c, B);
    je.add(n, s, o);
  }

  var i = new je();

  function Ke(e, n) {
    var a = d.getPointDistance($, e),
        r = d.getPointDistance($, n),
        t = i;
    Ge.equalsEpsilon(a, 0, Ge.EPSILON2) ? (t = Ze(n, e, t), je.multiplyByScalar(t, Ge.EPSILON2, t), je.add(e, t, e)) : Ge.equalsEpsilon(r, 0, Ge.EPSILON2) && (t = Ze(e, n, t), je.multiplyByScalar(t, Ge.EPSILON2, t), je.add(n, t, n));
  }

  var $e = new G(),
      en = new G(),
      nn = new je(),
      an = new je(),
      rn = new je(),
      tn = new je(),
      on = new je(),
      ln = new je(),
      sn = [$e, en],
      cn = new We(),
      pn = new je(),
      un = new je(),
      dn = new je(),
      hn = new je(),
      gn = new je(),
      wn = new je(),
      yn = new je(),
      fn = new je(),
      vn = new je(),
      mn = new je(),
      En = new je(),
      In = new je(),
      On = new je(),
      kn = new je(),
      Tn = new Ue(),
      Pn = new Ue(),
      Sn = new je(),
      Nn = new je(),
      _n = new je(),
      An = [new Be(), new Be()],
      Ln = [0, 2, 1, 0, 3, 2, 0, 7, 3, 0, 4, 7, 0, 5, 4, 0, 1, 5, 5, 7, 4, 5, 6, 7, 5, 2, 6, 5, 1, 2, 3, 6, 2, 3, 7, 6],
      Cn = Ln.length;

  function Dn(e) {
    return new Ve({
      componentDatatype: qe.FLOAT,
      componentsPerAttribute: 4,
      normalize: !1,
      values: e
    });
  }

  return f._projectNormal = Qe, f;
});