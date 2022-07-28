"use strict";

define(["./arrayRemoveDuplicates", "./BoundingRectangle", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./CornerType", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryPipeline", "./IndexDatatype", "./Math", "./oneTimeWarning", "./PolygonPipeline", "./PolylineVolumeGeometryLibrary", "./PrimitiveType", "./VertexFormat", "./WindingOrder"], function (o, a, x, u, g, R, i, h, y, d, v, S, C, O, q, N, p, B, I, s, U, m, l) {
  "use strict";

  function f(e) {
    var t = (e = h(e, h.EMPTY_OBJECT)).polylinePositions,
        n = e.shapePositions;
    if (!y(t)) throw new d("options.polylinePositions is required.");
    if (!y(n)) throw new d("options.shapePositions is required.");
    this._positions = t, this._shape = n, this._ellipsoid = v.clone(h(e.ellipsoid, v.WGS84)), this._cornerType = h(e.cornerType, i.ROUNDED), this._vertexFormat = m.clone(h(e.vertexFormat, m.DEFAULT)), this._granularity = h(e.granularity, p.RADIANS_PER_DEGREE), this._workerName = "createPolylineVolumeGeometry";
    var r = 1 + t.length * g.packedLength;
    r += 1 + n.length * u.packedLength, this.packedLength = r + v.packedLength + m.packedLength + 2;
  }

  f.pack = function (e, t, n) {
    if (!y(e)) throw new d("value is required");
    if (!y(t)) throw new d("array is required");
    var r;
    n = h(n, 0);
    var i = e._positions,
        o = i.length;

    for (t[n++] = o, r = 0; r < o; ++r, n += g.packedLength) {
      g.pack(i[r], t, n);
    }

    var a = e._shape,
        o = a.length;

    for (t[n++] = o, r = 0; r < o; ++r, n += u.packedLength) {
      u.pack(a[r], t, n);
    }

    return v.pack(e._ellipsoid, t, n), n += v.packedLength, m.pack(e._vertexFormat, t, n), n += m.packedLength, t[n++] = e._cornerType, t[n] = e._granularity, t;
  };

  var _ = v.clone(v.UNIT_SPHERE),
      k = new m(),
      w = {
    polylinePositions: void 0,
    shapePositions: void 0,
    ellipsoid: _,
    vertexFormat: k,
    cornerType: void 0,
    granularity: void 0
  };

  f.unpack = function (e, t, n) {
    if (!y(e)) throw new d("array is required");
    t = h(t, 0);

    for (var r = e[t++], i = new Array(r), o = 0; o < r; ++o, t += g.packedLength) {
      i[o] = g.unpack(e, t);
    }

    r = e[t++];
    var a = new Array(r);

    for (o = 0; o < r; ++o, t += u.packedLength) {
      a[o] = u.unpack(e, t);
    }

    var p = v.unpack(e, t, _);
    t += v.packedLength;
    var s = m.unpack(e, t, k);
    t += m.packedLength;
    var l = e[t++],
        c = e[t];
    return y(n) ? (n._positions = i, n._shape = a, n._ellipsoid = v.clone(p, n._ellipsoid), n._vertexFormat = m.clone(s, n._vertexFormat), n._cornerType = l, n._granularity = c, n) : (w.polylinePositions = i, w.shapePositions = a, w.cornerType = l, w.granularity = c, new f(w));
  };

  var c = new a();
  return f.createGeometry = function (e) {
    var t = e._positions,
        n = o(t, g.equalsEpsilon),
        r = e._shape,
        r = s.removeDuplicatesFromShape(r);

    if (!(n.length < 2 || r.length < 3)) {
      I.computeWindingOrder2D(r) === l.CLOCKWISE && r.reverse();
      var i = a.fromPoints(r, c);
      return function (e, t, n, r) {
        var i = new O();
        r.position && (i.position = new C({
          componentDatatype: R.DOUBLE,
          componentsPerAttribute: 3,
          values: e
        }));
        var o,
            a,
            p,
            s,
            l,
            c = t.length,
            u = e.length / 3,
            g = (u - 2 * c) / (2 * c),
            h = I.triangulate(t),
            y = (g - 1) * c * 6 + 2 * h.length,
            d = N.createTypedArray(u, y),
            v = 2 * c,
            m = 0;

        for (b = 0; b < g - 1; b++) {
          for (o = 0; o < c - 1; o++) {
            l = (a = 2 * o + b * c * 2) + v, s = (p = a + 1) + v, d[m++] = p, d[m++] = a, d[m++] = s, d[m++] = s, d[m++] = a, d[m++] = l;
          }

          s = (p = (a = 2 * c - 2 + b * c * 2) + 1) + v, l = a + v, d[m++] = p, d[m++] = a, d[m++] = s, d[m++] = s, d[m++] = a, d[m++] = l;
        }

        if (r.st || r.tangent || r.bitangent) {
          for (var f, _, k = new Float32Array(2 * u), w = 1 / (g - 1), P = 1 / n.height, L = n.height / 2, T = 0, b = 0; b < g; b++) {
            for (f = b * w, _ = P * (t[0].y + L), k[T++] = f, k[T++] = _, o = 1; o < c; o++) {
              _ = P * (t[o].y + L), k[T++] = f, k[T++] = _, k[T++] = f, k[T++] = _;
            }

            _ = P * (t[0].y + L), k[T++] = f, k[T++] = _;
          }

          for (o = 0; o < c; o++) {
            f = 0, _ = P * (t[o].y + L), k[T++] = f, k[T++] = _;
          }

          for (o = 0; o < c; o++) {
            f = (g - 1) * w, _ = P * (t[o].y + L), k[T++] = f, k[T++] = _;
          }

          i.st = new C({
            componentDatatype: R.FLOAT,
            componentsPerAttribute: 2,
            values: new Float32Array(k)
          });
        }

        var E = u - 2 * c;

        for (b = 0; b < h.length; b += 3) {
          var A = h[b] + E,
              D = h[b + 1] + E,
              F = h[b + 2] + E;
          d[m++] = A, d[m++] = D, d[m++] = F, d[m++] = F + c, d[m++] = D + c, d[m++] = A + c;
        }

        var G = new S({
          attributes: i,
          indices: d,
          boundingSphere: x.fromVertices(e),
          primitiveType: U.TRIANGLES
        });

        if (r.normal && (G = q.computeNormal(G)), r.tangent || r.bitangent) {
          try {
            G = q.computeTangentAndBitangent(G);
          } catch (e) {
            B("polyline-volume-tangent-bitangent", "Unable to compute tangents and bitangents for polyline volume geometry");
          }

          r.tangent || (G.attributes.tangent = void 0), r.bitangent || (G.attributes.bitangent = void 0), r.st || (G.attributes.st = void 0);
        }

        return G;
      }(s.computePositions(n, r, i, e, !0), r, i, e._vertexFormat);
    }
  }, f;
});