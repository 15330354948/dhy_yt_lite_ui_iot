"use strict";

define(["../Core/AttributeCompression", "../Core/AxisAlignedBoundingBox", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/defined", "../Core/Ellipsoid", "../Core/IndexDatatype", "../Core/Math", "../Core/Matrix4", "../Core/OrientedBoundingBox", "../Core/TerrainEncoding", "../Core/Transforms", "../Core/WebMercatorProjection", "./createTaskProcessorWorker"], function (Te, Ne, ye, pe, fe, e, xe, ve, we, Ce, be, Ae, Ee, Se, Me, t) {
  "use strict";

  var Fe = 32767,
      Be = new fe(),
      Pe = new fe(),
      Ve = new fe(),
      _e = new e(),
      He = new pe(),
      ke = new fe(),
      Ye = new be(),
      ze = new be();

  function Oe(e, t, r, n, i, o, a, s, c) {
    var u = Number.POSITIVE_INFINITY,
        d = i.north,
        h = i.south,
        I = i.east,
        l = i.west;
    I < l && (I += Ce.TWO_PI);

    for (var m = e.length, g = 0; g < m; ++g) {
      var T = e[g],
          N = r[T],
          y = n[T];
      _e.longitude = Ce.lerp(l, I, y.x), _e.latitude = Ce.lerp(h, d, y.y), _e.height = N - t;
      var p = o.cartographicToCartesian(_e, Be);
      be.multiplyByPoint(a, p, p), fe.minimumByComponent(p, s, s), fe.maximumByComponent(p, c, c), u = Math.min(u, _e.height);
    }

    return u;
  }

  function We(e, t, r, n, i, o, a, s, c, u, d, h, I, l, m, g, T, N) {
    var y,
        p,
        f = I ? (y = i.length - 1, p = -1) : (y = 0, p = i.length, 1),
        x = -1,
        v = xe(c),
        w = t / o.getStride(),
        C = d.north,
        b = d.south,
        A = d.east,
        E = d.west;
    A < E && (A += Ce.TWO_PI);

    for (var S = y; S !== p; S += f) {
      var M = i[S],
          F = a[M],
          B = s[M];
      _e.longitude = Ce.lerp(E, A, B.x) + T, _e.latitude = Ce.lerp(b, C, B.y) + N, _e.height = F - h;

      var P,
          V,
          _,
          H,
          k,
          Y = u.cartographicToCartesian(_e, Be);

      v && (P = 2 * M, He.x = c[P], He.y = c[1 + P], 1 !== l && (V = Te.octDecode(He.x, He.y, ke), _ = Se.eastNorthUpToFixedFrame(Be, u, ze), H = be.inverseTransformation(_, Ye), be.multiplyByPointAsVector(H, V, V), V.z *= l, fe.normalize(V, V), be.multiplyByPointAsVector(_, V, V), fe.normalize(V, V), Te.octEncode(V, He))), o.hasWebMercatorT && (k = (Me.geodeticLatitudeToMercatorAngle(_e.latitude) - m) * g), t = o.encode(e, t, Y, B, _e.height, He, k), -1 !== x && (r[n++] = x, r[n++] = w - 1, r[n++] = M, r[n++] = w - 1, r[n++] = w, r[n++] = M), x = M, ++w;
    }

    return n;
  }

  function Ge(e, t) {
    var r;
    return "function" == typeof e.slice && "function" != typeof (r = e.slice()).sort && (r = void 0), xe(r) || (r = Array.prototype.slice.call(e)), r.sort(t), r;
  }

  return t(function (e, t) {
    var r,
        n,
        i = e.quantizedVertices,
        o = i.length / 3,
        a = e.octEncodedNormals,
        s = e.westIndices.length + e.eastIndices.length + e.southIndices.length + e.northIndices.length,
        c = e.includeWebMercatorT,
        u = e.rectangle,
        d = u.west,
        h = u.south,
        I = u.east,
        l = u.north,
        m = ve.clone(e.ellipsoid),
        g = e.exaggeration,
        T = e.minimumHeight * g,
        N = e.maximumHeight * g,
        y = e.relativeToCenter,
        p = Se.eastNorthUpToFixedFrame(y, m),
        f = be.inverseTransformation(p, new be());
    c && (r = Me.geodeticLatitudeToMercatorAngle(h), n = 1 / (Me.geodeticLatitudeToMercatorAngle(l) - r));
    var x = i.subarray(0, o),
        v = i.subarray(o, 2 * o),
        w = i.subarray(2 * o, 3 * o),
        C = xe(a),
        b = new Array(o),
        A = new Array(o),
        E = new Array(o),
        S = c ? new Array(o) : [],
        M = Pe;
    M.x = Number.POSITIVE_INFINITY, M.y = Number.POSITIVE_INFINITY, M.z = Number.POSITIVE_INFINITY;
    var F = Ve;
    F.x = Number.NEGATIVE_INFINITY, F.y = Number.NEGATIVE_INFINITY, F.z = Number.NEGATIVE_INFINITY;

    for (var B = Number.POSITIVE_INFINITY, P = Number.NEGATIVE_INFINITY, V = Number.POSITIVE_INFINITY, _ = Number.NEGATIVE_INFINITY, H = 0; H < o; ++H) {
      var k = x[H],
          Y = v[H],
          z = k / Fe,
          O = Y / Fe,
          W = Ce.lerp(T, N, w[H] / Fe);
      _e.longitude = Ce.lerp(d, I, z), _e.latitude = Ce.lerp(h, l, O), _e.height = W, B = Math.min(_e.longitude, B), P = Math.max(_e.longitude, P), V = Math.min(_e.latitude, V), _ = Math.max(_e.latitude, _);
      var G = m.cartographicToCartesian(_e);
      b[H] = new pe(z, O), A[H] = W, E[H] = G, c && (S[H] = (Me.geodeticLatitudeToMercatorAngle(_e.latitude) - r) * n), be.multiplyByPoint(f, G, Be), fe.minimumByComponent(Be, M, M), fe.maximumByComponent(Be, F, F);
    }

    var L,
        D,
        U = Ge(e.westIndices, function (e, t) {
      return b[e].y - b[t].y;
    }),
        j = Ge(e.eastIndices, function (e, t) {
      return b[t].y - b[e].y;
    }),
        q = Ge(e.southIndices, function (e, t) {
      return b[t].x - b[e].x;
    }),
        R = Ge(e.northIndices, function (e, t) {
      return b[e].x - b[t].x;
    });
    1 !== g && (D = ye.fromPoints(E), L = Ae.fromRectangle(u, T, N, m));
    var J = T,
        J = Math.min(J, Oe(e.westIndices, e.westSkirtHeight, A, b, u, m, f, M, F));
    J = Math.min(J, Oe(e.southIndices, e.southSkirtHeight, A, b, u, m, f, M, F)), J = Math.min(J, Oe(e.eastIndices, e.eastSkirtHeight, A, b, u, m, f, M, F)), J = Math.min(J, Oe(e.northIndices, e.northSkirtHeight, A, b, u, m, f, M, F));

    for (var K, Q, X, Z, $ = new Ne(M, F, y), ee = new Ee($, J, N, p, C, c), te = ee.getStride(), re = new Float32Array(o * te + s * te), ne = 0, ie = 0; ie < o; ++ie) {
      C && (K = 2 * ie, He.x = a[K], He.y = a[1 + K], 1 !== g && (Q = Te.octDecode(He.x, He.y, ke), X = Se.eastNorthUpToFixedFrame(E[ie], m, ze), Z = be.inverseTransformation(X, Ye), be.multiplyByPointAsVector(Z, Q, Q), Q.z *= g, fe.normalize(Q, Q), be.multiplyByPointAsVector(X, Q, Q), fe.normalize(Q, Q), Te.octEncode(Q, He))), ne = ee.encode(re, ne, E[ie], b[ie], A[ie], He, S[ie]);
    }

    var oe = Math.max(0, 2 * (s - 4)),
        ae = e.indices.length + 3 * oe,
        se = we.createTypedArray(o + s, ae);
    se.set(e.indices, 0);
    var ce = 1e-4 * (P - B),
        ue = 1e-4 * (_ - V),
        de = -ce,
        he = ce,
        Ie = ue,
        le = -ue,
        me = o * te,
        ge = We(re, me, se, ge = e.indices.length, e.westIndices, ee, A, b, a, m, u, e.westSkirtHeight, !0, g, r, n, de, 0);
    return ge = We(re, me += e.westIndices.length * te, se, ge, e.southIndices, ee, A, b, a, m, u, e.southSkirtHeight, !1, g, r, n, 0, le), ge = We(re, me += e.southIndices.length * te, se, ge, e.eastIndices, ee, A, b, a, m, u, e.eastSkirtHeight, !1, g, r, n, he, 0), We(re, me += e.eastIndices.length * te, se, ge, e.northIndices, ee, A, b, a, m, u, e.northSkirtHeight, !0, g, r, n, 0, Ie), t.push(re.buffer, se.buffer), {
      vertices: re.buffer,
      indices: se.buffer,
      westIndicesSouthToNorth: U,
      southIndicesEastToWest: q,
      eastIndicesNorthToSouth: j,
      northIndicesWestToEast: R,
      vertexStride: te,
      center: y,
      minimumHeight: T,
      maximumHeight: N,
      boundingSphere: D,
      orientedBoundingBox: L,
      encoding: ee,
      skirtIndex: e.indices.length
    };
  });
});