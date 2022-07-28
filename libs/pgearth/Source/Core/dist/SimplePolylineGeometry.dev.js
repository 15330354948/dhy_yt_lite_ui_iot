"use strict";

define(["./ArcType", "./BoundingSphere", "./Cartesian3", "./Color", "./ComponentDatatype", "./defaultValue", "./defined", "./deprecationWarning", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./IndexDatatype", "./Math", "./PolylinePipeline", "./PrimitiveType"], function (C, I, R, V, U, c, q, e, h, f, N, F, M, H, W, Y, z) {
  "use strict";

  function u(e) {
    var t = (e = c(e, c.EMPTY_OBJECT)).positions,
        r = e.colors,
        o = c(e.colorsPerVertex, !1);
    if (!q(t) || t.length < 2) throw new h("At least two positions are required.");
    if (q(r) && (o && r.length < t.length || !o && r.length < t.length - 1)) throw new h("colors has an invalid length.");
    this._positions = t, this._colors = r, this._colorsPerVertex = o, this._arcType = c(e.arcType, C.GEODESIC), this._granularity = c(e.granularity, W.RADIANS_PER_DEGREE), this._ellipsoid = c(e.ellipsoid, f.WGS84), this._workerName = "createSimplePolylineGeometry";
    var a = 1 + t.length * R.packedLength;
    a += q(r) ? 1 + r.length * V.packedLength : 1, this.packedLength = a + f.packedLength + 3;
  }

  u.pack = function (e, t, r) {
    if (!q(e)) throw new h("value is required");
    if (!q(t)) throw new h("array is required");
    var o;
    r = c(r, 0);
    var a = e._positions,
        n = a.length;

    for (t[r++] = n, o = 0; o < n; ++o, r += R.packedLength) {
      R.pack(a[o], t, r);
    }

    var i = e._colors,
        n = q(i) ? i.length : 0;

    for (t[r++] = n, o = 0; o < n; ++o, r += V.packedLength) {
      V.pack(i[o], t, r);
    }

    return f.pack(e._ellipsoid, t, r), r += f.packedLength, t[r++] = e._colorsPerVertex ? 1 : 0, t[r++] = e._arcType, t[r] = e._granularity, t;
  }, u.unpack = function (e, t, r) {
    if (!q(e)) throw new h("array is required");
    t = c(t, 0);

    for (var o = e[t++], a = new Array(o), n = 0; n < o; ++n, t += R.packedLength) {
      a[n] = R.unpack(e, t);
    }

    var i = 0 < (o = e[t++]) ? new Array(o) : void 0;

    for (n = 0; n < o; ++n, t += V.packedLength) {
      i[n] = V.unpack(e, t);
    }

    var l = f.unpack(e, t);
    t += f.packedLength;
    var s = 1 === e[t++],
        p = e[t++],
        y = e[t];
    return q(r) ? (r._positions = a, r._colors = i, r._ellipsoid = l, r._colorsPerVertex = s, r._arcType = p, r._granularity = y, r) : new u({
      positions: a,
      colors: i,
      ellipsoid: l,
      colorsPerVertex: s,
      arcType: p,
      granularity: y
    });
  };
  var J = new Array(2),
      j = new Array(2),
      K = {
    positions: J,
    height: j,
    ellipsoid: void 0,
    minDistance: void 0,
    granularity: void 0
  };
  return u.createGeometry = function (e) {
    var t,
        r,
        o,
        a = e._positions,
        n = e._colors,
        i = e._colorsPerVertex,
        l = e._arcType,
        s = e._granularity,
        p = e._ellipsoid,
        y = W.chordLength(s, p.maximumRadius),
        c = q(n) && !i,
        h = a.length,
        f = 0;

    if (l === C.GEODESIC || l === C.RHUMB) {
      var u,
          g,
          d = l === C.GEODESIC ? (u = W.chordLength(s, p.maximumRadius), g = Y.numberOfPoints, Y.generateArc) : (u = s, g = Y.numberOfPointsRhumbLine, Y.generateRhumbArc),
          T = Y.extractHeights(a, p),
          v = K;

      if (l === C.GEODESIC ? v.minDistance = y : v.granularity = s, v.ellipsoid = p, c) {
        for (var m = 0, B = 0; B < h - 1; B++) {
          m += g(a[B], a[B + 1], u) + 1;
        }

        t = new Float64Array(3 * m), o = new Uint8Array(4 * m), v.positions = J, v.height = j;
        var _ = 0;

        for (B = 0; B < h - 1; ++B) {
          J[0] = a[B], J[1] = a[B + 1], j[0] = T[B], j[1] = T[B + 1];
          var w = d(v);
          if (q(n)) for (var k = w.length / 3, A = n[B], E = 0; E < k; ++E) {
            o[_++] = V.floatToByte(A.red), o[_++] = V.floatToByte(A.green), o[_++] = V.floatToByte(A.blue), o[_++] = V.floatToByte(A.alpha);
          }
          t.set(w, f), f += w.length;
        }
      } else if (v.positions = a, v.height = T, t = new Float64Array(d(v)), q(n)) {
        for (o = new Uint8Array(t.length / 3 * 4), B = 0; B < h - 1; ++B) {
          f = function (e, t, r, o, a, n, i) {
            var l = Y.numberOfPoints(e, t, a),
                s = r.red,
                p = r.green,
                y = r.blue,
                c = r.alpha,
                h = o.red,
                f = o.green,
                u = o.blue,
                g = o.alpha;

            if (V.equals(r, o)) {
              for (_ = 0; _ < l; _++) {
                n[i++] = V.floatToByte(s), n[i++] = V.floatToByte(p), n[i++] = V.floatToByte(y), n[i++] = V.floatToByte(c);
              }

              return i;
            }

            for (var d = (h - s) / l, T = (f - p) / l, v = (u - y) / l, m = (g - c) / l, B = i, _ = 0; _ < l; _++) {
              n[B++] = V.floatToByte(s + _ * d), n[B++] = V.floatToByte(p + _ * T), n[B++] = V.floatToByte(y + _ * v), n[B++] = V.floatToByte(c + _ * m);
            }

            return B;
          }(a[B], a[B + 1], n[B], n[B + 1], y, o, f);
        }

        var b = n[h - 1];
        o[f++] = V.floatToByte(b.red), o[f++] = V.floatToByte(b.green), o[f++] = V.floatToByte(b.blue), o[f++] = V.floatToByte(b.alpha);
      }
    } else {
      r = c ? 2 * h - 2 : h, t = new Float64Array(3 * r), o = q(n) ? new Uint8Array(4 * r) : void 0;
      var P = 0,
          D = 0;

      for (B = 0; B < h; ++B) {
        var L = a[B];
        if (c && 0 < B && (R.pack(L, t, P), P += 3, A = n[B - 1], o[D++] = V.floatToByte(A.red), o[D++] = V.floatToByte(A.green), o[D++] = V.floatToByte(A.blue), o[D++] = V.floatToByte(A.alpha)), c && B === h - 1) break;
        R.pack(L, t, P), P += 3, q(n) && (A = n[B], o[D++] = V.floatToByte(A.red), o[D++] = V.floatToByte(A.green), o[D++] = V.floatToByte(A.blue), o[D++] = V.floatToByte(A.alpha));
      }
    }

    var G = new M();
    G.position = new F({
      componentDatatype: U.DOUBLE,
      componentsPerAttribute: 3,
      values: t
    }), q(n) && (G.color = new F({
      componentDatatype: U.UNSIGNED_BYTE,
      componentsPerAttribute: 4,
      values: o,
      normalize: !0
    }));
    var S = 2 * ((r = t.length / 3) - 1),
        x = H.createTypedArray(r, S),
        O = 0;

    for (B = 0; B < r - 1; ++B) {
      x[O++] = B, x[O++] = B + 1;
    }

    return new N({
      attributes: G,
      indices: x,
      primitiveType: z.LINES,
      boundingSphere: I.fromPoints(a)
    });
  }, u;
});