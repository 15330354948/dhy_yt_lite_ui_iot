"use strict";

define(["../Core/AttributeCompression", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Color", "../Core/defined", "../Core/Ellipsoid", "../Core/IndexDatatype", "../Core/Math", "../Core/OrientedBoundingBox", "../Core/Rectangle", "./createTaskProcessorWorker"], function (Le, Oe, Ue, Be, Fe, Se, Pe, _e, Me, Re, e) {
  "use strict";

  var De = new Oe(),
      Ge = new Se(),
      Ye = new Re(),
      Ve = {
    min: void 0,
    max: void 0,
    indexBytesPerElement: void 0
  };

  function He(e, r, n) {
    var a = r.length,
        t = 2 + a * Me.packedLength + 1 + function (e) {
      for (var r = e.length, n = 0, a = 0; a < r; ++a) {
        n += Be.packedLength + 3 + e[a].batchIds.length;
      }

      return n;
    }(n),
        o = new Float64Array(t),
        i = 0;

    o[i++] = e, o[i++] = a;

    for (var f = 0; f < a; ++f) {
      Me.pack(r[f], o, i), i += Me.packedLength;
    }

    var s = n.length;
    o[i++] = s;

    for (var c = 0; c < s; ++c) {
      var h = n[c];
      Be.pack(h.color, o, i), i += Be.packedLength, o[i++] = h.offset, o[i++] = h.count;
      var d = h.batchIds,
          u = d.length;
      o[i++] = u;

      for (var l = 0; l < u; ++l) {
        o[i++] = d[l];
      }
    }

    return o;
  }

  var ze = new Oe(),
      We = new Oe(),
      Ze = new Oe(),
      je = new Oe(),
      qe = new Oe(),
      Je = new Ue(),
      Ke = new Re();
  return e(function (e, r) {
    var n, a, t;
    n = e.packedBuffer, a = new Float64Array(n), t = 0, Ve.indexBytesPerElement = a[t++], Ve.min = a[t++], Ve.max = a[t++], Oe.unpack(a, t, De), t += Oe.packedLength, Se.unpack(a, t, Ge), t += Se.packedLength, Re.unpack(a, t, Ye);
    var o,
        i = new (2 === Ve.indexBytesPerElement ? Uint16Array : Uint32Array)(e.indices),
        f = new Uint16Array(e.positions),
        s = new Uint32Array(e.counts),
        c = new Uint32Array(e.indexCounts),
        h = new Uint32Array(e.batchIds),
        d = new Uint32Array(e.batchTableColors),
        u = new Array(s.length),
        l = De,
        g = Ge,
        p = Ye,
        b = Ve.min,
        y = Ve.max,
        v = e.minimumHeights,
        w = e.maximumHeights;
    Fe(v) && Fe(w) && (v = new Float32Array(v), w = new Float32Array(w));
    var I = f.length / 2,
        m = f.subarray(0, I),
        x = f.subarray(I, 2 * I);
    Le.zigZagDeltaDecode(m, x);

    for (var A = new Float32Array(3 * I), N = 0; N < I; ++N) {
      var k = m[N],
          C = x[N],
          T = _e.lerp(p.west, p.east, k / 32767),
          E = _e.lerp(p.south, p.north, C / 32767),
          L = Ue.fromRadians(T, E, 0, Je),
          O = g.cartographicToCartesian(L, ze);

      Oe.pack(O, A, 3 * N);
    }

    var U = s.length,
        B = new Array(U),
        F = new Array(U),
        S = 0,
        P = 0;

    for (N = 0; N < U; ++N) {
      B[N] = S, F[N] = P, S += s[N], P += c[N];
    }

    var _,
        M = new Float32Array(3 * I * 2),
        R = new Uint16Array(2 * I),
        D = new Uint32Array(F.length),
        G = new Uint32Array(c.length),
        Y = [],
        V = {};

    for (N = 0; N < U; ++N) {
      o = d[N], Fe(V[o]) ? (V[o].positionLength += s[N], V[o].indexLength += c[N], V[o].batchIds.push(N)) : V[o] = {
        positionLength: s[N],
        indexLength: c[N],
        offset: 0,
        indexOffset: 0,
        batchIds: [N]
      };
    }

    var H,
        z = 0,
        W = 0;

    for (o in V) {
      V.hasOwnProperty(o) && ((_ = V[o]).offset = z, _.indexOffset = W, z += 2 * _.positionLength, W += H = 2 * _.indexLength + 6 * _.positionLength, _.indexLength = H);
    }

    var Z = [];

    for (o in V) {
      V.hasOwnProperty(o) && (_ = V[o], Z.push({
        color: Be.fromRgba(parseInt(o)),
        offset: _.indexOffset,
        count: _.indexLength,
        batchIds: _.batchIds
      }));
    }

    for (N = 0; N < U; ++N) {
      var j = (_ = V[o = d[N]]).offset,
          q = 3 * j,
          J = j,
          K = B[N],
          Q = s[N],
          X = h[N],
          $ = b,
          ee = y;
      Fe(v) && Fe(w) && ($ = v[N], ee = w[N]);

      for (var re = Number.POSITIVE_INFINITY, ne = Number.NEGATIVE_INFINITY, ae = Number.POSITIVE_INFINITY, te = Number.NEGATIVE_INFINITY, oe = 0; oe < Q; ++oe) {
        var ie = Oe.unpack(A, 3 * K + 3 * oe, ze);
        g.scaleToGeodeticSurface(ie, ie);
        var fe = g.cartesianToCartographic(ie, Je),
            se = fe.latitude,
            ce = fe.longitude,
            re = Math.min(se, re),
            ne = Math.max(se, ne),
            ae = Math.min(ce, ae),
            te = Math.max(ce, te),
            he = g.geodeticSurfaceNormal(ie, We),
            de = Oe.multiplyByScalar(he, $, Ze),
            ue = Oe.add(ie, de, je),
            de = Oe.multiplyByScalar(he, ee, de),
            le = Oe.add(ie, de, qe);
        Oe.subtract(le, l, le), Oe.subtract(ue, l, ue), Oe.pack(le, M, q), Oe.pack(ue, M, q + 3), R[J] = X, R[J + 1] = X, q += 6, J += 2;
      }

      (p = Ke).west = ae, p.east = te, p.south = re, p.north = ne, u[N] = Me.fromRectangle(p, b, y, g);
      var ge = _.indexOffset,
          pe = F[N],
          be = c[N];

      for (D[N] = ge, oe = 0; oe < be; oe += 3) {
        var ye = i[pe + oe] - K,
            ve = i[pe + oe + 1] - K,
            we = i[pe + oe + 2] - K;
        Y[ge++] = 2 * ye + j, Y[ge++] = 2 * ve + j, Y[ge++] = 2 * we + j, Y[ge++] = 2 * we + 1 + j, Y[ge++] = 2 * ve + 1 + j, Y[ge++] = 2 * ye + 1 + j;
      }

      for (oe = 0; oe < Q; ++oe) {
        var Ie = oe,
            me = (oe + 1) % Q;
        Y[ge++] = 2 * Ie + 1 + j, Y[ge++] = 2 * me + j, Y[ge++] = 2 * Ie + j, Y[ge++] = 2 * Ie + 1 + j, Y[ge++] = 2 * me + 1 + j, Y[ge++] = 2 * me + j;
      }

      _.offset += 2 * Q, _.indexOffset = ge, G[N] = ge - D[N];
    }

    Y = Pe.createTypedArray(M.length / 3, Y);

    for (var xe = Z.length, Ae = 0; Ae < xe; ++Ae) {
      for (var Ne = Z[Ae].batchIds, ke = 0, Ce = Ne.length, Te = 0; Te < Ce; ++Te) {
        ke += G[Ne[Te]];
      }

      Z[Ae].count = ke;
    }

    var Ee = He(2 === Y.BYTES_PER_ELEMENT ? Pe.UNSIGNED_SHORT : Pe.UNSIGNED_INT, u, Z);
    return r.push(M.buffer, Y.buffer, D.buffer, G.buffer, R.buffer, Ee.buffer), {
      positions: M.buffer,
      indices: Y.buffer,
      indexOffsets: D.buffer,
      indexCounts: G.buffer,
      batchIds: R.buffer,
      packedBuffer: Ee.buffer
    };
  });
});