"use strict";

define(["./ArcType", "./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Color", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryType", "./IndexDatatype", "./Math", "./PolylinePipeline", "./PrimitiveType", "./VertexFormat"], function (J, j, K, Q, X, Z, d, $, v, y, ee, te, re, oe, ne, ae, ie, le, g) {
  "use strict";

  var se = [];

  function m(e) {
    var t = (e = d(e, d.EMPTY_OBJECT)).positions,
        r = e.colors,
        o = d(e.width, 1),
        n = d(e.colorsPerVertex, !1);
    if (!$(t) || t.length < 2) throw new v("At least two positions are required.");
    if ("number" != typeof o) throw new v("width must be a number");
    if ($(r) && (n && r.length < t.length || !n && r.length < t.length - 1)) throw new v("colors has an invalid length.");
    this._positions = t, this._colors = r, this._width = o, this._colorsPerVertex = n, this._vertexFormat = g.clone(d(e.vertexFormat, g.DEFAULT)), this._arcType = d(e.arcType, J.GEODESIC), this._granularity = d(e.granularity, ae.RADIANS_PER_DEGREE), this._ellipsoid = y.clone(d(e.ellipsoid, y.WGS84)), this._workerName = "createPolylineGeometry";
    var a = 1 + t.length * Q.packedLength;
    a += $(r) ? 1 + r.length * X.packedLength : 1, this.packedLength = a + y.packedLength + g.packedLength + 4;
  }

  m.pack = function (e, t, r) {
    if (!$(e)) throw new v("value is required");
    if (!$(t)) throw new v("array is required");
    var o;
    r = d(r, 0);
    var n = e._positions,
        a = n.length;

    for (t[r++] = a, o = 0; o < a; ++o, r += Q.packedLength) {
      Q.pack(n[o], t, r);
    }

    var i = e._colors,
        a = $(i) ? i.length : 0;

    for (t[r++] = a, o = 0; o < a; ++o, r += X.packedLength) {
      X.pack(i[o], t, r);
    }

    return y.pack(e._ellipsoid, t, r), r += y.packedLength, g.pack(e._vertexFormat, t, r), r += g.packedLength, t[r++] = e._width, t[r++] = e._colorsPerVertex ? 1 : 0, t[r++] = e._arcType, t[r] = e._granularity, t;
  };

  var w = y.clone(y.UNIT_SPHERE),
      f = new g(),
      _ = {
    positions: void 0,
    colors: void 0,
    ellipsoid: w,
    vertexFormat: f,
    width: void 0,
    colorsPerVertex: void 0,
    arcType: void 0,
    granularity: void 0
  };

  m.unpack = function (e, t, r) {
    if (!$(e)) throw new v("array is required");
    t = d(t, 0);

    for (var o = e[t++], n = new Array(o), a = 0; a < o; ++a, t += Q.packedLength) {
      n[a] = Q.unpack(e, t);
    }

    var i = 0 < (o = e[t++]) ? new Array(o) : void 0;

    for (a = 0; a < o; ++a, t += X.packedLength) {
      i[a] = X.unpack(e, t);
    }

    var l = y.unpack(e, t, w);
    t += y.packedLength;
    var s = g.unpack(e, t, f);
    t += g.packedLength;
    var p = e[t++],
        c = 1 === e[t++],
        h = e[t++],
        u = e[t];
    return $(r) ? (r._positions = n, r._colors = i, r._ellipsoid = y.clone(l, r._ellipsoid), r._vertexFormat = g.clone(s, r._vertexFormat), r._width = p, r._colorsPerVertex = c, r._arcType = h, r._granularity = u, r) : (_.positions = n, _.colors = i, _.width = p, _.colorsPerVertex = c, _.arcType = h, _.granularity = u, new m(_));
  };

  var pe = new Q(),
      ce = new Q(),
      he = new Q(),
      ue = new Q();
  return m.createGeometry = function (e) {
    var t = e._width,
        r = e._vertexFormat,
        o = e._colors,
        n = e._colorsPerVertex,
        a = e._arcType,
        i = e._granularity,
        l = e._ellipsoid,
        s = j(e._positions, Q.equalsEpsilon),
        p = s.length;

    if (!(p < 2 || t <= 0)) {
      if (a === J.GEODESIC || a === J.RHUMB) {
        var c,
            h = a === J.GEODESIC ? (c = ae.chordLength(i, l.maximumRadius), ie.numberOfPoints) : (c = i, ie.numberOfPointsRhumbLine),
            u = ie.extractHeights(s, l);

        if ($(o)) {
          for (var d = 1, v = 0; v < p - 1; ++v) {
            d += h(s[v], s[v + 1], c);
          }

          var y = new Array(d),
              g = 0;

          for (v = 0; v < p - 1; ++v) {
            var m = s[v],
                w = s[v + 1],
                f = o[v],
                _ = h(m, w, c);

            if (n && v < d) for (var A = function (e, t, r) {
              var o = se;
              o.length = r;
              var n = e.red,
                  a = e.green,
                  i = e.blue,
                  l = e.alpha,
                  s = t.red,
                  p = t.green,
                  c = t.blue,
                  h = t.alpha;

              if (X.equals(e, t)) {
                for (g = 0; g < r; g++) {
                  o[g] = X.clone(e);
                }

                return o;
              }

              for (var u = (s - n) / r, d = (p - a) / r, v = (c - i) / r, y = (h - l) / r, g = 0; g < r; g++) {
                o[g] = new X(n + g * u, a + g * d, i + g * v, l + g * y);
              }

              return o;
            }(f, o[v + 1], _), k = A.length, E = 0; E < k; ++E) {
              y[g++] = A[E];
            } else for (E = 0; E < _; ++E) {
              y[g++] = X.clone(f);
            }
          }

          y[g] = X.clone(o[o.length - 1]), o = y, se.length = 0;
        }

        s = a === J.GEODESIC ? ie.generateCartesianArc({
          positions: s,
          minDistance: c,
          ellipsoid: l,
          height: u
        }) : ie.generateCartesianRhumbArc({
          positions: s,
          granularity: c,
          ellipsoid: l,
          height: u
        });
      }

      var P,
          T,
          L,
          b = 4 * (p = s.length) - 4,
          D = new Float64Array(3 * b),
          x = new Float64Array(3 * b),
          F = new Float64Array(3 * b),
          G = new Float32Array(2 * b),
          O = r.st ? new Float32Array(2 * b) : void 0,
          S = $(o) ? new Uint8Array(4 * b) : void 0,
          B = 0,
          C = 0,
          I = 0,
          R = 0;

      for (E = 0; E < p; ++E) {
        0 === E ? (P = pe, Q.subtract(s[0], s[1], P), Q.add(s[0], P, P)) : P = s[E - 1], Q.clone(P, he), Q.clone(s[E], ce), E === p - 1 ? (P = pe, Q.subtract(s[p - 1], s[p - 2], P), Q.add(s[p - 1], P, P)) : P = s[E + 1], Q.clone(P, ue), $(S) && (T = 0 === E || n ? o[E] : o[E - 1], E !== p - 1 && (L = o[E]));

        for (var V = E === p - 1 ? 2 : 4, U = 0 === E ? 2 : 0; U < V; ++U) {
          Q.pack(ce, D, B), Q.pack(he, x, B), Q.pack(ue, F, B), B += 3;
          var N,
              q = U - 2 < 0 ? -1 : 1;
          G[C++] = U % 2 * 2 - 1, G[C++] = q * t, r.st && (O[I++] = E / (p - 1), O[I++] = Math.max(G[C - 2], 0)), $(S) && (N = U < 2 ? T : L, S[R++] = X.floatToByte(N.red), S[R++] = X.floatToByte(N.green), S[R++] = X.floatToByte(N.blue), S[R++] = X.floatToByte(N.alpha));
        }
      }

      var M = new re();
      M.position = new te({
        componentDatatype: Z.DOUBLE,
        componentsPerAttribute: 3,
        values: D
      }), M.prevPosition = new te({
        componentDatatype: Z.DOUBLE,
        componentsPerAttribute: 3,
        values: x
      }), M.nextPosition = new te({
        componentDatatype: Z.DOUBLE,
        componentsPerAttribute: 3,
        values: F
      }), M.expandAndWidth = new te({
        componentDatatype: Z.FLOAT,
        componentsPerAttribute: 2,
        values: G
      }), r.st && (M.st = new te({
        componentDatatype: Z.FLOAT,
        componentsPerAttribute: 2,
        values: O
      })), $(S) && (M.color = new te({
        componentDatatype: Z.UNSIGNED_BYTE,
        componentsPerAttribute: 4,
        values: S,
        normalize: !0
      }));
      var H = ne.createTypedArray(b, 6 * p - 6),
          Y = 0,
          W = 0,
          z = p - 1;

      for (E = 0; E < z; ++E) {
        H[W++] = Y, H[W++] = Y + 2, H[W++] = Y + 1, H[W++] = Y + 1, H[W++] = Y + 2, H[W++] = Y + 3, Y += 4;
      }

      return new ee({
        attributes: M,
        indices: H,
        primitiveType: le.TRIANGLES,
        boundingSphere: K.fromPoints(s),
        geometryType: oe.POLYLINES
      });
    }
  }, m;
});