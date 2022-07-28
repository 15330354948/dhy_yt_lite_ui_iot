"use strict";

define(["./AxisAlignedBoundingBox", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidalOccluder", "./freezeObject", "./Math", "./Matrix4", "./OrientedBoundingBox", "./Rectangle", "./TerrainEncoding", "./Transforms", "./WebMercatorProjection"], function (je, Ze, Je, Ke, Qe, Xe, $e, et, tt, e, it, rt, nt, at, ot, st, ht) {
  "use strict";

  var ut = {};
  ut.DEFAULT_STRUCTURE = e({
    heightScale: 1,
    heightOffset: 0,
    elementsPerHeight: 1,
    stride: 1,
    elementMultiplier: 256,
    isBigEndian: !1
  });
  var dt = new Ke(),
      Tt = new rt(),
      lt = new Ke(),
      gt = new Ke();
  return ut.computeVertices = function (e) {
    if (!Xe(e) || !Xe(e.heightmap)) throw new $e("options.heightmap is required.");
    if (!Xe(e.width) || !Xe(e.height)) throw new $e("options.width and options.height are required.");
    if (!Xe(e.nativeRectangle)) throw new $e("options.nativeRectangle is required.");
    if (!Xe(e.skirtHeight)) throw new $e("options.skirtHeight is required.");

    var t,
        i,
        r,
        n = Math.cos,
        a = Math.sin,
        o = Math.sqrt,
        s = Math.atan,
        h = Math.exp,
        u = it.PI_OVER_TWO,
        d = it.toRadians,
        T = e.heightmap,
        l = e.width,
        g = e.height,
        m = e.skirtHeight,
        c = Qe(e.isGeographic, !0),
        I = Qe(e.ellipsoid, et.WGS84),
        E = 1 / I.maximumRadius,
        p = e.nativeRectangle,
        f = e.rectangle,
        v = Xe(f) ? (t = f.west, i = f.south, r = f.east, f.north) : c ? (t = d(p.west), i = d(p.south), r = d(p.east), d(p.north)) : (t = p.west * E, i = u - 2 * s(h(-p.south * E)), r = p.east * E, u - 2 * s(h(-p.north * E))),
        w = e.relativeToCenter,
        N = Xe(w),
        w = N ? w : Ke.ZERO,
        R = Qe(e.exaggeration, 1),
        S = Qe(e.includeWebMercatorT, !1),
        U = Qe(e.structure, ut.DEFAULT_STRUCTURE),
        A = Qe(U.heightScale, ut.DEFAULT_STRUCTURE.heightScale),
        _ = Qe(U.heightOffset, ut.DEFAULT_STRUCTURE.heightOffset),
        F = Qe(U.elementsPerHeight, ut.DEFAULT_STRUCTURE.elementsPerHeight),
        M = Qe(U.stride, ut.DEFAULT_STRUCTURE.stride),
        x = Qe(U.elementMultiplier, ut.DEFAULT_STRUCTURE.elementMultiplier),
        O = Qe(U.isBigEndian, ut.DEFAULT_STRUCTURE.isBigEndian),
        P = at.computeWidth(p),
        C = at.computeHeight(p),
        y = P / (l - 1),
        B = C / (g - 1);

    c || (P *= E, C *= E);
    var L,
        b,
        V = I.radiiSquared,
        D = V.x,
        H = V.y,
        W = V.z,
        Y = 65536,
        q = -65536,
        z = st.eastNorthUpToFixedFrame(w, I),
        G = rt.inverseTransformation(z, Tt);
    S && (L = ht.geodeticLatitudeToMercatorAngle(i), b = 1 / (ht.geodeticLatitudeToMercatorAngle(v) - L));
    var k = lt;
    k.x = Number.POSITIVE_INFINITY, k.y = Number.POSITIVE_INFINITY, k.z = Number.POSITIVE_INFINITY;
    var j = gt;
    j.x = Number.NEGATIVE_INFINITY, j.y = Number.NEGATIVE_INFINITY, j.z = Number.NEGATIVE_INFINITY;
    var Z = Number.POSITIVE_INFINITY,
        J = l + (0 < m ? 2 : 0),
        K = g + (0 < m ? 2 : 0),
        Q = J * K,
        X = new Array(Q),
        $ = new Array(Q),
        ee = new Array(Q),
        te = S ? new Array(Q) : [],
        ie = 0,
        re = g,
        ne = 0,
        ae = l;
    0 < m && (--ie, ++re, --ne, ++ae);

    for (var oe = 0, se = ie; se < re; ++se) {
      var he = se;
      he < 0 && (he = 0), g <= he && (he = g - 1);
      var ue,
          de = p.north - B * he,
          Te = n(de = c ? d(de) : u - 2 * s(h(-de * E))),
          le = a(de),
          ge = W * le,
          me = (de - i) / (v - i),
          me = it.clamp(me, 0, 1);
      S && (ue = (ht.geodeticLatitudeToMercatorAngle(de) - L) * b);

      for (var ce = ne; ce < ae; ++ce) {
        var Ie = ce;
        Ie < 0 && (Ie = 0), l <= Ie && (Ie = l - 1);
        var Ee = p.west + y * Ie;
        c ? Ee = d(Ee) : Ee *= E;
        var pe = he * (l * M) + Ie * M;
        if (1 === F) ve = T[pe];else {
          var fe,
              ve = 0;
          if (O) for (fe = 0; fe < F; ++fe) {
            ve = ve * x + T[pe + fe];
          } else for (fe = F - 1; 0 <= fe; --fe) {
            ve = ve * x + T[pe + fe];
          }
        }
        ve = (ve * A + _) * R;
        var we = (Ee - t) / (r - t),
            we = it.clamp(we, 0, 1);
        ee[oe] = new Je(we, me), q = Math.max(q, ve), Y = Math.min(Y, ve), ce === Ie && se === he || (ce < 0 ? Ee -= 1e-5 * P : Ee += 1e-5 * P, se < 0 ? de += 1e-5 * C : de -= 1e-5 * C, Te = n(de), ge = W * (le = a(de)), ve -= m);

        var Ne = Te * n(Ee),
            Re = Te * a(Ee),
            Se = D * Ne,
            Ue = H * Re,
            Ae = 1 / o(Se * Ne + Ue * Re + ge * le),
            _e = Se * Ae,
            Fe = Ue * Ae,
            Me = ge * Ae,
            xe = new Ke();

        xe.x = _e + Ne * ve, xe.y = Fe + Re * ve, xe.z = Me + le * ve, X[oe] = xe, $[oe] = ve, S && (te[oe] = ue), oe++, rt.multiplyByPoint(G, xe, dt), Ke.minimumByComponent(dt, k, k), Ke.maximumByComponent(dt, j, j), Z = Math.min(Z, ve);
      }
    }

    var Oe,
        Pe,
        Ce = Ze.fromPoints(X);
    Xe(f) && f.width < it.PI_OVER_TWO + it.EPSILON5 && (Oe = nt.fromRectangle(f, Y, q, I)), N && (Pe = new tt(I).computeHorizonCullingPoint(w, X));

    for (var ye, Be, Le, be, Ve = new je(k, j, w), De = new ot(Ve, Z, q, z, !1, S), He = new Float32Array(Q * De.getStride()), We = 0, Ye = 0; Ye < Q; ++Ye) {
      We = De.encode(He, We, X[Ye], ee[Ye], $[Ye], void 0, te[Ye]);
    }

    if (0 < m) {
      be = [], Be = [];

      for (var qe = 0; qe < l; ++qe) {
        be.push(J + 1 + qe), Be.push(J * (K - 1) - 2 - qe);
      }

      ye = [], Le = [];

      for (var ze = 0; ze < g; ++ze) {
        Le.push((ze + 1) * J + l), ye.push((g - ze) * J + 1);
      }
    } else {
      be = [], Be = [];

      for (var Ge = 0; Ge < l; ++Ge) {
        be.push(Ge), Be.push(l * g - 1 - Ge);
      }

      ye = [], Le = [];

      for (var ke = 0; ke < g; ++ke) {
        Le.push((ke + 1) * l - 1), ye.push((g - ke - 1) * l);
      }
    }

    return {
      vertices: He,
      maximumHeight: q,
      minimumHeight: Y,
      encoding: De,
      boundingSphere3D: Ce,
      orientedBoundingBox: Oe,
      occludeePointInScaledSpace: Pe,
      westIndicesSouthToNorth: ye,
      southIndicesEastToWest: Be,
      eastIndicesNorthToSouth: Le,
      northIndicesWestToEast: be
    };
  }, ut;
});