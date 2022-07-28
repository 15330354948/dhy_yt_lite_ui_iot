"use strict";

define(["./arrayRemoveDuplicates", "./BoundingRectangle", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./CornerType", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./IndexDatatype", "./Math", "./PolygonPipeline", "./PolylineVolumeGeometryLibrary", "./PrimitiveType", "./WindingOrder"], function (o, a, d, c, u, y, t, h, g, v, f, _, m, k, P, s, p, l, w, E) {
  "use strict";

  function L(e) {
    var r = (e = h(e, h.EMPTY_OBJECT)).polylinePositions,
        i = e.shapePositions;
    if (!g(r)) throw new v("options.polylinePositions is required.");
    if (!g(i)) throw new v("options.shapePositions is required.");
    this._positions = r, this._shape = i, this._ellipsoid = f.clone(h(e.ellipsoid, f.WGS84)), this._cornerType = h(e.cornerType, t.ROUNDED), this._granularity = h(e.granularity, s.RADIANS_PER_DEGREE), this._workerName = "createPolylineVolumeOutlineGeometry";
    var n = 1 + r.length * u.packedLength;
    n += 1 + i.length * c.packedLength, this.packedLength = n + f.packedLength + 2;
  }

  L.pack = function (e, r, i) {
    if (!g(e)) throw new v("value is required");
    if (!g(r)) throw new v("array is required");
    var n;
    i = h(i, 0);
    var t = e._positions,
        o = t.length;

    for (r[i++] = o, n = 0; n < o; ++n, i += u.packedLength) {
      u.pack(t[n], r, i);
    }

    var a = e._shape,
        o = a.length;

    for (r[i++] = o, n = 0; n < o; ++n, i += c.packedLength) {
      c.pack(a[n], r, i);
    }

    return f.pack(e._ellipsoid, r, i), i += f.packedLength, r[i++] = e._cornerType, r[i] = e._granularity, r;
  };

  var T = f.clone(f.UNIT_SPHERE),
      D = {
    polylinePositions: void 0,
    shapePositions: void 0,
    ellipsoid: T,
    height: void 0,
    cornerType: void 0,
    granularity: void 0
  };

  L.unpack = function (e, r, i) {
    if (!g(e)) throw new v("array is required");
    r = h(r, 0);

    for (var n = e[r++], t = new Array(n), o = 0; o < n; ++o, r += u.packedLength) {
      t[o] = u.unpack(e, r);
    }

    n = e[r++];
    var a = new Array(n);

    for (o = 0; o < n; ++o, r += c.packedLength) {
      a[o] = c.unpack(e, r);
    }

    var s = f.unpack(e, r, T);
    r += f.packedLength;
    var p = e[r++],
        l = e[r];
    return g(i) ? (i._positions = t, i._shape = a, i._ellipsoid = f.clone(s, i._ellipsoid), i._cornerType = p, i._granularity = l, i) : (D.polylinePositions = t, D.shapePositions = a, D.cornerType = p, D.granularity = l, new L(D));
  };

  var A = new a();
  return L.createGeometry = function (e) {
    var r = e._positions,
        i = o(r, u.equalsEpsilon),
        n = e._shape,
        n = l.removeDuplicatesFromShape(n);

    if (!(i.length < 2 || n.length < 3)) {
      p.computeWindingOrder2D(n) === E.CLOCKWISE && n.reverse();
      var t = a.fromPoints(n, A);
      return function (e, r) {
        var i = new k();
        i.position = new m({
          componentDatatype: y.DOUBLE,
          componentsPerAttribute: 3,
          values: e
        });
        var n = r.length,
            t = i.position.values.length / 3,
            o = e.length / 3 / n,
            a = P.createTypedArray(t, 2 * n * (1 + o)),
            s = 0,
            p = 0,
            l = p * n;

        for (h = 0; h < n - 1; h++) {
          a[s++] = h + l, a[s++] = h + l + 1;
        }

        for (a[s++] = n - 1 + l, a[s++] = l, l = (p = o - 1) * n, h = 0; h < n - 1; h++) {
          a[s++] = h + l, a[s++] = h + l + 1;
        }

        for (a[s++] = n - 1 + l, a[s++] = l, p = 0; p < o - 1; p++) {
          for (var c = n * p, u = c + n, h = 0; h < n; h++) {
            a[s++] = h + c, a[s++] = h + u;
          }
        }

        return new _({
          attributes: i,
          indices: P.createTypedArray(t, a),
          boundingSphere: d.fromVertices(e),
          primitiveType: w.LINES
        });
      }(l.computePositions(i, n, t, e, !1), n);
    }
  }, L;
});