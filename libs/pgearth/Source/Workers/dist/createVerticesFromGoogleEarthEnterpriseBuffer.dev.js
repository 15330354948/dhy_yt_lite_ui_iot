"use strict";

define(["../Core/AxisAlignedBoundingBox", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/Ellipsoid", "../Core/EllipsoidalOccluder", "../Core/Math", "../Core/Matrix4", "../Core/OrientedBoundingBox", "../Core/Rectangle", "../Core/RuntimeError", "../Core/TerrainEncoding", "../Core/Transforms", "../Core/WebMercatorProjection", "./createTaskProcessorWorker"], function (Fe, Oe, We, Ve, Ye, o, ke, a, Ue, He, Le, De, u, Ge, ze, je, qe, e) {
  "use strict";

  var Je = Uint16Array.BYTES_PER_ELEMENT,
      Ke = Int32Array.BYTES_PER_ELEMENT,
      Qe = Uint32Array.BYTES_PER_ELEMENT,
      Xe = Float32Array.BYTES_PER_ELEMENT,
      Ze = Float64Array.BYTES_PER_ELEMENT;

  function $e(e, t, r) {
    r = o(r, He);

    for (var n = e.length, i = 0; i < n; ++i) {
      if (r.equalsEpsilon(e[i], t, He.EPSILON12)) return i;
    }

    return -1;
  }

  var et = new Ye(),
      tt = new Ve(),
      rt = new Ve(),
      nt = new Ve(),
      it = new Le();

  function ot(e, t, r, n, i, o, a, u, s, d) {
    for (var h = a.length, c = 0; c < h; ++c) {
      var l = a[c],
          g = l.cartographic,
          m = l.index,
          p = e.length,
          I = g.longitude,
          v = g.latitude,
          v = He.clamp(v, -He.PI_OVER_TWO, He.PI_OVER_TWO),
          E = g.height - o.skirtHeight;
      o.hMin = Math.min(o.hMin, E), Ye.fromRadians(I, v, E, et), s && (et.longitude += u), s ? c === h - 1 ? et.latitude += d : 0 === c && (et.latitude -= d) : et.latitude += u;
      var T = o.ellipsoid.cartographicToCartesian(et);
      e.push(T), t.push(E), r.push(We.clone(r[m])), 0 < n.length && n.push(n[m]), Le.multiplyByPoint(o.toENU, T, tt);
      var f = o.minimum,
          N = o.maximum;
      Ve.minimumByComponent(tt, f, f), Ve.maximumByComponent(tt, N, N);
      var x,
          S = o.lastBorderPoint;
      ke(S) && (x = S.index, i.push(x, p - 1, p, p, m, x)), o.lastBorderPoint = l;
    }
  }

  return e(function (e, t) {
    e.ellipsoid = a.clone(e.ellipsoid), e.rectangle = u.clone(e.rectangle);

    var r = function (e, t, r, n, i, o, a, u, s, d) {
      var h, c, l, g, m, p;
      p = ke(n) ? (h = n.west, c = n.south, l = n.east, g = n.north, m = n.width, n.height) : (h = He.toRadians(i.west), c = He.toRadians(i.south), l = He.toRadians(i.east), g = He.toRadians(i.north), m = He.toRadians(n.width), He.toRadians(n.height));
      var I,
          v,
          E = [c, g],
          T = [h, l],
          f = je.eastNorthUpToFixedFrame(t, r),
          N = Le.inverseTransformation(f, it);
      u && (I = qe.geodeticLatitudeToMercatorAngle(c), v = 1 / (qe.geodeticLatitudeToMercatorAngle(g) - I));
      var x = new DataView(e),
          S = Number.POSITIVE_INFINITY,
          C = Number.NEGATIVE_INFINITY,
          w = rt;
      w.x = Number.POSITIVE_INFINITY, w.y = Number.POSITIVE_INFINITY, w.z = Number.POSITIVE_INFINITY;
      var B = nt;
      B.x = Number.NEGATIVE_INFINITY, B.y = Number.NEGATIVE_INFINITY, B.z = Number.NEGATIVE_INFINITY;
      var P,
          R,
          b = 0,
          A = 0,
          _ = 0;

      for (R = 0; R < 4; ++R) {
        var y = b;
        P = x.getUint32(y, !0), y += Qe;
        var M = He.toRadians(180 * x.getFloat64(y, !0));
        y += Ze, -1 === $e(T, M) && T.push(M);
        var F = He.toRadians(180 * x.getFloat64(y, !0));
        y += Ze, -1 === $e(E, F) && E.push(F), y += 2 * Ze;
        var O = x.getInt32(y, !0);
        y += Ke, A += O, O = x.getInt32(y, !0), _ += 3 * O, b += P + Qe;
      }

      var W = [],
          V = [],
          Y = new Array(A),
          k = new Array(A),
          U = new Array(A),
          H = u ? new Array(A) : [],
          L = new Array(_),
          D = [],
          G = [],
          z = [],
          j = [],
          q = 0,
          J = 0;

      for (R = b = 0; R < 4; ++R) {
        P = x.getUint32(b, !0);
        var K = b += Qe,
            Q = He.toRadians(180 * x.getFloat64(b, !0));
        b += Ze;
        var X = He.toRadians(180 * x.getFloat64(b, !0));
        b += Ze;
        var Z = He.toRadians(180 * x.getFloat64(b, !0)),
            $ = .5 * Z;
        b += Ze;
        var ee = He.toRadians(180 * x.getFloat64(b, !0)),
            te = .5 * ee;
        b += Ze;
        var re = x.getInt32(b, !0);
        b += Ke;
        var ne = x.getInt32(b, !0);
        b += Ke, b += Ke;

        for (var ie = new Array(re), oe = 0; oe < re; ++oe) {
          var ae = Q + x.getUint8(b++) * Z;
          et.longitude = ae;
          var ue = X + x.getUint8(b++) * ee;
          et.latitude = ue;
          var se = 6371010 * x.getFloat32(b, !0);

          if (b += Xe, se < d && (se *= s), se *= o, et.height = se, -1 !== $e(T, ae) || -1 !== $e(E, ue)) {
            var de = $e(W, et, Ye);

            if (-1 !== de) {
              ie[oe] = V[de];
              continue;
            }

            W.push(Ye.clone(et)), V.push(q);
          }

          ie[oe] = q, Math.abs(ae - h) < $ ? D.push({
            index: q,
            cartographic: Ye.clone(et)
          }) : Math.abs(ae - l) < $ ? z.push({
            index: q,
            cartographic: Ye.clone(et)
          }) : Math.abs(ue - c) < te ? G.push({
            index: q,
            cartographic: Ye.clone(et)
          }) : Math.abs(ue - g) < te && j.push({
            index: q,
            cartographic: Ye.clone(et)
          }), S = Math.min(se, S), C = Math.max(se, C), U[q] = se;
          var he = r.cartographicToCartesian(et);
          Y[q] = he, u && (H[q] = (qe.geodeticLatitudeToMercatorAngle(ue) - I) * v), Le.multiplyByPoint(N, he, tt), Ve.minimumByComponent(tt, w, w), Ve.maximumByComponent(tt, B, B);
          var ce = (ae - h) / (l - h);
          ce = He.clamp(ce, 0, 1);
          var le = (ue - c) / (g - c);
          le = He.clamp(le, 0, 1), k[q] = new We(ce, le), ++q;
        }

        for (var ge = 3 * ne, me = 0; me < ge; ++me, ++J) {
          L[J] = ie[x.getUint16(b, !0)], b += Je;
        }

        if (P !== b - K) throw new Ge("Invalid terrain tile.");
      }

      Y.length = q, k.length = q, U.length = q, u && (H.length = q);
      var pe = q,
          Ie = J,
          ve = {
        hMin: S,
        lastBorderPoint: void 0,
        skirtHeight: a,
        toENU: N,
        ellipsoid: r,
        minimum: w,
        maximum: B
      };
      D.sort(function (e, t) {
        return t.cartographic.latitude - e.cartographic.latitude;
      }), G.sort(function (e, t) {
        return e.cartographic.longitude - t.cartographic.longitude;
      }), z.sort(function (e, t) {
        return e.cartographic.latitude - t.cartographic.latitude;
      }), j.sort(function (e, t) {
        return t.cartographic.longitude - e.cartographic.longitude;
      });
      var Ee = 1e-5;
      {
        var Te, fe, Ne;
        ot(Y, U, k, H, L, ve, D, -Ee * m, !0, -Ee * p), ot(Y, U, k, H, L, ve, G, -Ee * p, !1), ot(Y, U, k, H, L, ve, z, Ee * m, !0, Ee * p), ot(Y, U, k, H, L, ve, j, Ee * p, !1), 0 < D.length && 0 < j.length && (Te = D[0].index, fe = j[j.length - 1].index, Ne = Y.length - 1, L.push(fe, Ne, pe, pe, Te, fe));
      }
      A = Y.length;
      var xe,
          Se = Oe.fromPoints(Y);
      ke(n) && n.width < He.PI_OVER_TWO + He.EPSILON5 && (xe = De.fromRectangle(n, S, C, r));

      for (var Ce = new Ue(r).computeHorizonCullingPoint(t, Y), we = new Fe(w, B, t), Be = new ze(we, ve.hMin, C, f, !1, u), Pe = new Float32Array(A * Be.getStride()), Re = 0, be = 0; be < A; ++be) {
        Re = Be.encode(Pe, Re, Y[be], k[be], U[be], void 0, H[be]);
      }

      var Ae = D.map(function (e) {
        return e.index;
      }).reverse(),
          _e = G.map(function (e) {
        return e.index;
      }).reverse(),
          ye = z.map(function (e) {
        return e.index;
      }).reverse(),
          Me = j.map(function (e) {
        return e.index;
      }).reverse();

      return _e.unshift(ye[ye.length - 1]), _e.push(Ae[0]), Me.unshift(Ae[Ae.length - 1]), Me.push(ye[0]), {
        vertices: Pe,
        indices: new Uint16Array(L),
        maximumHeight: C,
        minimumHeight: S,
        encoding: Be,
        boundingSphere3D: Se,
        orientedBoundingBox: xe,
        occludeePointInScaledSpace: Ce,
        vertexCountWithoutSkirts: pe,
        skirtIndex: Ie,
        westIndicesSouthToNorth: Ae,
        southIndicesEastToWest: _e,
        eastIndicesNorthToSouth: ye,
        northIndicesWestToEast: Me
      };
    }(e.buffer, e.relativeToCenter, e.ellipsoid, e.rectangle, e.nativeRectangle, e.exaggeration, e.skirtHeight, e.includeWebMercatorT, e.negativeAltitudeExponentBias, e.negativeElevationThreshold),
        n = r.vertices;

    t.push(n.buffer);
    var i = r.indices;
    return t.push(i.buffer), {
      vertices: n.buffer,
      indices: i.buffer,
      numberOfAttributes: r.encoding.getStride(),
      minimumHeight: r.minimumHeight,
      maximumHeight: r.maximumHeight,
      boundingSphere3D: r.boundingSphere3D,
      orientedBoundingBox: r.orientedBoundingBox,
      occludeePointInScaledSpace: r.occludeePointInScaledSpace,
      encoding: r.encoding,
      vertexCountWithoutSkirts: r.vertexCountWithoutSkirts,
      skirtIndex: r.skirtIndex,
      westIndicesSouthToNorth: r.westIndicesSouthToNorth,
      southIndicesEastToWest: r.southIndicesEastToWest,
      eastIndicesNorthToSouth: r.eastIndicesNorthToSouth,
      northIndicesWestToEast: r.northIndicesWestToEast
    };
  });
});