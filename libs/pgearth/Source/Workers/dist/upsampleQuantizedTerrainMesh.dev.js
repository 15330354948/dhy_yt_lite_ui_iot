"use strict";

define(["../Core/AttributeCompression", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/defined", "../Core/Ellipsoid", "../Core/EllipsoidalOccluder", "../Core/IndexDatatype", "../Core/Intersections2D", "../Core/Math", "../Core/OrientedBoundingBox", "../Core/TerrainEncoding", "./createTaskProcessorWorker"], function (r, ge, e, ce, t, c, xe, me, we, ve, ye, Ce, Be, i) {
  "use strict";

  var Ie = 32767,
      Ae = 16383,
      ze = [],
      Ne = [],
      Ve = [],
      be = new t(),
      Te = new ce(),
      He = [],
      Re = [],
      Ee = [],
      Fe = [],
      Oe = [],
      Ue = new ce(),
      Xe = new ge(),
      ke = new Ce(),
      De = new e(),
      Ke = new ce();

  function Me() {
    this.vertexBuffer = void 0, this.index = void 0, this.first = void 0, this.second = void 0, this.ratio = void 0;
  }

  Me.prototype.clone = function (e) {
    return c(e) || (e = new Me()), e.uBuffer = this.uBuffer, e.vBuffer = this.vBuffer, e.heightBuffer = this.heightBuffer, e.normalBuffer = this.normalBuffer, e.index = this.index, e.first = this.first, e.second = this.second, e.ratio = this.ratio, e;
  }, Me.prototype.initializeIndexed = function (e, t, i, n, r) {
    this.uBuffer = e, this.vBuffer = t, this.heightBuffer = i, this.normalBuffer = n, this.index = r, this.first = void 0, this.second = void 0, this.ratio = void 0;
  }, Me.prototype.initializeFromClipResult = function (e, t, i) {
    var n = t + 1;
    return -1 !== e[t] ? i[e[t]].clone(this) : (this.vertexBuffer = void 0, this.index = void 0, this.first = i[e[n]], ++n, this.second = i[e[n]], ++n, this.ratio = e[n], ++n), n;
  }, Me.prototype.getKey = function () {
    return this.isIndexed() ? this.index : JSON.stringify({
      first: this.first.getKey(),
      second: this.second.getKey(),
      ratio: this.ratio
    });
  }, Me.prototype.isIndexed = function () {
    return c(this.index);
  }, Me.prototype.getH = function () {
    return c(this.index) ? this.heightBuffer[this.index] : ye.lerp(this.first.getH(), this.second.getH(), this.ratio);
  }, Me.prototype.getU = function () {
    return c(this.index) ? this.uBuffer[this.index] : ye.lerp(this.first.getU(), this.second.getU(), this.ratio);
  }, Me.prototype.getV = function () {
    return c(this.index) ? this.vBuffer[this.index] : ye.lerp(this.first.getV(), this.second.getV(), this.ratio);
  };
  var n = new e(),
      s = -1,
      o = [new ce(), new ce()],
      h = [new ce(), new ce()];

  function u(e, t) {
    var i = o[++s],
        n = h[s],
        i = r.octDecode(e.first.getNormalX(), e.first.getNormalY(), i),
        n = r.octDecode(e.second.getNormalX(), e.second.getNormalY(), n);
    return Te = ce.lerp(i, n, e.ratio, Te), ce.normalize(Te, Te), r.octEncode(Te, t), --s, t;
  }

  Me.prototype.getNormalX = function () {
    return c(this.index) ? this.normalBuffer[2 * this.index] : (n = u(this, n)).x;
  }, Me.prototype.getNormalY = function () {
    return c(this.index) ? this.normalBuffer[2 * this.index + 1] : (n = u(this, n)).y;
  };
  var x = [];

  function Pe(e, t, i, n, r, s, o, h, u) {
    if (0 !== o.length) {
      for (var d = 0, l = 0; l < o.length;) {
        l = x[d++].initializeFromClipResult(o, l, h);
      }

      for (var a = 0; a < d; ++a) {
        var f,
            p,
            g = x[a];
        g.isIndexed() ? (g.newIndex = s[g.index], g.uBuffer = e, g.vBuffer = t, g.heightBuffer = i, u && (g.normalBuffer = n)) : (f = g.getKey(), c(s[f]) ? g.newIndex = s[f] : (p = e.length, e.push(g.getU()), t.push(g.getV()), i.push(g.getH()), u && (n.push(g.getNormalX()), n.push(g.getNormalY())), g.newIndex = p, s[f] = p));
      }

      3 === d ? (r.push(x[0].newIndex), r.push(x[1].newIndex), r.push(x[2].newIndex)) : 4 === d && (r.push(x[0].newIndex), r.push(x[1].newIndex), r.push(x[2].newIndex), r.push(x[0].newIndex), r.push(x[2].newIndex), r.push(x[3].newIndex));
    }
  }

  return x.push(new Me()), x.push(new Me()), x.push(new Me()), x.push(new Me()), i(function (e, t) {
    var i = e.isEastChild,
        n = e.isNorthChild,
        r = i ? Ae : 0,
        s = i ? Ie : Ae,
        o = n ? Ae : 0,
        h = n ? Ie : Ae,
        u = He,
        d = Re,
        l = Ee,
        a = Oe;
    u.length = 0, d.length = 0, l.length = 0, a.length = 0;
    var f = Fe;
    f.length = 0;

    for (var p = {}, g = e.vertices, c = (c = e.indices).subarray(0, e.skirtIndex), x = Be.clone(e.encoding), m = x.hasVertexNormals, w = e.exaggeration, v = 0, y = e.vertexCountWithoutSkirts, C = e.minimumHeight, B = e.maximumHeight, I = new Array(y), A = new Array(y), z = new Array(y), N = m ? new Array(2 * y) : void 0, V = 0, b = 0; V < y; ++V, b += 2) {
      var T,
          H = x.decodeTextureCoordinates(g, V, De),
          R = x.decodeHeight(g, V) / w,
          E = ye.clamp(H.x * Ie | 0, 0, Ie),
          F = ye.clamp(H.y * Ie | 0, 0, Ie);
      z[V] = ye.clamp((R - C) / (B - C) * Ie | 0, 0, Ie), E < 20 && (E = 0), F < 20 && (F = 0), Ie - E < 20 && (E = Ie), Ie - F < 20 && (F = Ie), I[V] = E, A[V] = F, m && (T = x.getOctEncodedNormal(g, V, Ke), N[b] = T.x, N[b + 1] = T.y), (i && Ae <= E || !i && E <= Ae) && (n && Ae <= F || !n && F <= Ae) && (p[V] = v, u.push(E), d.push(F), l.push(z[V]), m && (a.push(N[b]), a.push(N[b + 1])), ++v);
    }

    var O = [];
    O.push(new Me()), O.push(new Me()), O.push(new Me());
    var U = [];

    for (U.push(new Me()), U.push(new Me()), U.push(new Me()), V = 0; V < c.length; V += 3) {
      var X = c[V],
          k = c[V + 1],
          D = c[V + 2],
          K = I[X],
          M = I[k],
          P = I[D];
      O[0].initializeIndexed(I, A, z, N, X), O[1].initializeIndexed(I, A, z, N, k), O[2].initializeIndexed(I, A, z, N, D);
      var S,
          Y = ve.clipTriangleAtAxisAlignedThreshold(Ae, i, K, M, P, ze);
      (S = 0) >= Y.length || (S = U[0].initializeFromClipResult(Y, S, O)) >= Y.length || (S = U[1].initializeFromClipResult(Y, S, O)) >= Y.length || (S = U[2].initializeFromClipResult(Y, S, O), Pe(u, d, l, a, f, p, ve.clipTriangleAtAxisAlignedThreshold(Ae, n, U[0].getV(), U[1].getV(), U[2].getV(), Ne), U, m), S < Y.length && (U[2].clone(U[1]), U[2].initializeFromClipResult(Y, S, O), Pe(u, d, l, a, f, p, ve.clipTriangleAtAxisAlignedThreshold(Ae, n, U[0].getV(), U[1].getV(), U[2].getV(), Ne), U, m)));
    }

    var W = i ? -Ie : 0,
        _ = n ? -Ie : 0,
        J = [],
        L = [],
        Z = [],
        j = [],
        q = Number.MAX_VALUE,
        G = -q,
        Q = Ve;

    Q.length = 0;
    var $ = xe.clone(e.ellipsoid),
        ee = e.childRectangle,
        te = ee.north,
        ie = ee.south,
        ne = ee.east,
        re = ee.west;

    for (ne < re && (ne += ye.TWO_PI), V = 0; V < u.length; ++V) {
      E = (E = Math.round(u[V])) <= r ? (J.push(V), 0) : s <= E ? (Z.push(V), Ie) : 2 * E + W, u[V] = E, F = (F = Math.round(d[V])) <= o ? (L.push(V), 0) : h <= F ? (j.push(V), Ie) : 2 * F + _, d[V] = F, (R = ye.lerp(C, B, l[V] / Ie)) < q && (q = R), G < R && (G = R), l[V] = R, be.longitude = ye.lerp(re, ne, E / Ie), be.latitude = ye.lerp(ie, te, F / Ie), be.height = R, $.cartographicToCartesian(be, Te), Q.push(Te.x), Q.push(Te.y), Q.push(Te.z);
    }

    var se = ge.fromVertices(Q, ce.ZERO, 3, Xe),
        oe = Ce.fromRectangle(ee, q, G, $, ke),
        he = new me($).computeHorizonCullingPointFromVertices(se.center, Q, 3, se.center, Ue),
        ue = G - q,
        de = new Uint16Array(u.length + d.length + l.length);

    for (V = 0; V < u.length; ++V) {
      de[V] = u[V];
    }

    var le = u.length;

    for (V = 0; V < d.length; ++V) {
      de[le + V] = d[V];
    }

    for (le += d.length, V = 0; V < l.length; ++V) {
      de[le + V] = Ie * (l[V] - q) / ue;
    }

    var ae,
        fe,
        pe = we.createTypedArray(u.length, f);
    return m ? (fe = new Uint8Array(a), t.push(de.buffer, pe.buffer, fe.buffer), ae = fe.buffer) : t.push(de.buffer, pe.buffer), {
      vertices: de.buffer,
      encodedNormals: ae,
      indices: pe.buffer,
      minimumHeight: q,
      maximumHeight: G,
      westIndices: J,
      southIndices: L,
      eastIndices: Z,
      northIndices: j,
      boundingSphere: se,
      orientedBoundingBox: oe,
      horizonOcclusionPoint: he
    };
  });
});