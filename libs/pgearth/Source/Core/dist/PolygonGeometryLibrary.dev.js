"use strict";

define(["./ArcType", "./arrayRemoveDuplicates", "./Cartesian2", "./Cartesian3", "./Cartographic", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidRhumbLine", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix3", "./PolygonPipeline", "./PrimitiveType", "./Quaternion", "./Queue", "./WindingOrder"], function (T, x, e, S, r, L, p, C, n, f, y, A, G, N, v, D, M, d, O, P, g, R, q) {
  "use strict";

  var B = {
    computeHierarchyPackedLength: function computeHierarchyPackedLength(e) {
      for (var r = 0, n = [e]; 0 < n.length;) {
        var t = n.pop();

        if (C(t)) {
          r += 2;
          var i = t.positions,
              a = t.holes;
          if (C(i) && (r += i.length * S.packedLength), C(a)) for (var o = a.length, u = 0; u < o; ++u) {
            n.push(a[u]);
          }
        }
      }

      return r;
    },
    packPolygonHierarchy: function packPolygonHierarchy(e, r, n) {
      for (var t = [e]; 0 < t.length;) {
        var i = t.pop();

        if (C(i)) {
          var a = i.positions,
              o = i.holes;
          if (r[n++] = C(a) ? a.length : 0, r[n++] = C(o) ? o.length : 0, C(a)) for (var u = a.length, s = 0; s < u; ++s, n += 3) {
            S.pack(a[s], r, n);
          }
          if (C(o)) for (var l = o.length, c = 0; c < l; ++c) {
            t.push(o[c]);
          }
        }
      }

      return n;
    },
    unpackPolygonHierarchy: function unpackPolygonHierarchy(e, r) {
      for (var n = e[r++], t = e[r++], i = new Array(n), a = 0 < t ? new Array(t) : void 0, o = 0; o < n; ++o, r += S.packedLength) {
        i[o] = S.unpack(e, r);
      }

      for (var u = 0; u < t; ++u) {
        a[u] = B.unpackPolygonHierarchy(e, r), r = a[u].startingIndex, delete a[u].startingIndex;
      }

      return {
        positions: i,
        holes: a,
        startingIndex: r
      };
    }
  },
      m = new S();

  B.subdivideLineCount = function (e, r, n) {
    var t = S.distance(e, r) / n,
        i = Math.max(0, Math.ceil(M.log2(t)));
    return Math.pow(2, i);
  };

  var w = new r(),
      b = new r(),
      I = new r(),
      E = new S();
  B.subdivideRhumbLineCount = function (e, r, n, t) {
    var i = e.cartesianToCartographic(r, w),
        a = e.cartesianToCartographic(n, b),
        o = new y(i, a, e).surfaceDistance / t,
        u = Math.max(0, Math.ceil(M.log2(o)));
    return Math.pow(2, u);
  }, B.subdivideLine = function (e, r, n, t) {
    var i = B.subdivideLineCount(e, r, n),
        a = S.distance(e, r),
        o = a / i;
    C(t) || (t = []);
    var u = t;
    u.length = 3 * i;

    for (var s, l, c, h, p = 0, f = 0; f < i; f++) {
      var v = (s = e, l = r, c = f * o, h = a, S.subtract(l, s, m), S.multiplyByScalar(m, c / h, m), S.add(s, m, m), [m.x, m.y, m.z]);
      u[p++] = v[0], u[p++] = v[1], u[p++] = v[2];
    }

    return u;
  }, B.subdivideRhumbLine = function (e, r, n, t, i) {
    var a = e.cartesianToCartographic(r, w),
        o = e.cartesianToCartographic(n, b),
        u = new y(a, o, e),
        s = u.surfaceDistance / t,
        l = Math.max(0, Math.ceil(M.log2(s))),
        c = Math.pow(2, l),
        h = u.surfaceDistance / c;
    C(i) || (i = []);
    var p = i;
    p.length = 3 * c;

    for (var f = 0, v = 0; v < c; v++) {
      var d = u.interpolateUsingSurfaceDistance(v * h, I),
          g = e.cartographicToCartesian(d, E);
      p[f++] = g.x, p[f++] = g.y, p[f++] = g.z;
    }

    return p;
  };
  var H = new S(),
      z = new S(),
      k = new S(),
      F = new S();
  B.scaleToGeodeticHeightExtruded = function (e, r, n, t, i) {
    t = p(t, f.WGS84);
    var a = H,
        o = z,
        u = k,
        s = F;
    if (C(e) && C(e.attributes) && C(e.attributes.position)) for (var l = e.attributes.position.values, c = l.length / 2, h = 0; h < c; h += 3) {
      S.fromArray(l, h, u), t.geodeticSurfaceNormal(u, a), s = t.scaleToGeodeticSurface(u, s), o = S.multiplyByScalar(a, n, o), o = S.add(s, o, o), l[h + c] = o.x, l[h + 1 + c] = o.y, l[h + 2 + c] = o.z, i && (s = S.clone(u, s)), o = S.multiplyByScalar(a, r, o), o = S.add(s, o, o), l[h] = o.x, l[h + 1] = o.y, l[h + 2] = o.z;
    }
    return e;
  }, B.polygonOutlinesFromHierarchy = function (e, r, n) {
    var t,
        i,
        a = [],
        o = new R();

    for (o.enqueue(e); 0 !== o.length;) {
      var u = o.dequeue(),
          s = u.positions;
      if (r) for (i = s.length, c = 0; c < i; c++) {
        n.scaleToGeodeticSurface(s[c], s[c]);
      }

      if (!((s = x(s, S.equalsEpsilon, !0)).length < 3)) {
        for (var l = u.holes ? u.holes.length : 0, c = 0; c < l; c++) {
          var h = u.holes[c],
              p = h.positions;
          if (r) for (i = p.length, t = 0; t < i; ++t) {
            n.scaleToGeodeticSurface(p[t], p[t]);
          }

          if (!((p = x(p, S.equalsEpsilon, !0)).length < 3)) {
            a.push(p);
            var f = 0;

            for (C(h.holes) && (f = h.holes.length), t = 0; t < f; t++) {
              o.enqueue(h.holes[t]);
            }
          }
        }

        a.push(s);
      }
    }

    return a;
  }, B.polygonsFromHierarchy = function (e, r, n, t) {
    var i = [],
        a = [],
        o = new R();

    for (o.enqueue(e); 0 !== o.length;) {
      var u,
          s = o.dequeue(),
          l = s.positions,
          c = s.holes;
      if (n) for (u = l.length, m = 0; m < u; m++) {
        t.scaleToGeodeticSurface(l[m], l[m]);
      }

      if (!((l = x(l, S.equalsEpsilon, !0)).length < 3)) {
        var h = r(l);

        if (C(h)) {
          var p = [],
              f = O.computeWindingOrder2D(h);
          f === q.CLOCKWISE && (h.reverse(), l = l.slice().reverse());

          for (var v, d = l.slice(), g = C(c) ? c.length : 0, y = [], m = 0; m < g; m++) {
            var w = c[m],
                b = w.positions;
            if (n) for (u = b.length, v = 0; v < u; ++v) {
              t.scaleToGeodeticSurface(b[v], b[v]);
            }

            if (!((b = x(b, S.equalsEpsilon, !0)).length < 3)) {
              var I = r(b);

              if (C(I)) {
                (f = O.computeWindingOrder2D(I)) === q.CLOCKWISE && (I.reverse(), b = b.slice().reverse()), y.push(b), p.push(d.length), d = d.concat(b), h = h.concat(I);
                var E = 0;

                for (C(w.holes) && (E = w.holes.length), v = 0; v < E; v++) {
                  o.enqueue(w.holes[v]);
                }
              }
            }
          }

          i.push({
            outerRing: l,
            holes: y
          }), a.push({
            positions: d,
            positions2D: h,
            holes: p
          });
        }
      }
    }

    return {
      hierarchy: i,
      polygons: a
    };
  };
  var W = new e(),
      U = new S(),
      V = new g(),
      Y = new d();
  B.computeBoundingRectangle = function (e, r, n, t, i) {
    for (var a = g.fromAxisAngle(e, t, V), o = d.fromQuaternion(a, Y), u = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY, l = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, h = n.length, p = 0; p < h; ++p) {
      var f = S.clone(n[p], U);
      d.multiplyByVector(o, f, f);
      var v = r(f, W);
      C(v) && (u = Math.min(u, v.x), s = Math.max(s, v.x), l = Math.min(l, v.y), c = Math.max(c, v.y));
    }

    return i.x = u, i.y = l, i.width = s - u, i.height = c - l, i;
  }, B.createGeometryFromPositions = function (e, r, n, t, i, a) {
    var o = O.triangulate(r.positions2D, r.holes);
    o.length < 3 && (o = [0, 1, 2]);
    var u = r.positions;

    if (t) {
      for (var s = u.length, l = new Array(3 * s), c = 0, h = 0; h < s; h++) {
        var p = u[h];
        l[c++] = p.x, l[c++] = p.y, l[c++] = p.z;
      }

      var f = new A({
        attributes: {
          position: new G({
            componentDatatype: L.DOUBLE,
            componentsPerAttribute: 3,
            values: l
          })
        },
        indices: o,
        primitiveType: P.TRIANGLES
      });
      return i.normal ? v.computeNormal(f) : f;
    }

    return a === T.GEODESIC ? O.computeSubdivision(e, u, o, n) : a === T.RHUMB ? O.computeRhumbLineSubdivision(e, u, o, n) : void 0;
  };
  var _ = [],
      Q = new S(),
      K = new S();
  return B.computeWallGeometry = function (e, r, n, t, i) {
    var a,
        o,
        u,
        s = e.length,
        l = 0;
    if (t) for (o = 3 * s * 2, a = new Array(2 * o), u = 0; u < s; u++) {
      f = e[u], v = e[(u + 1) % s], a[l] = a[l + o] = f.x, a[++l] = a[l + o] = f.y, a[++l] = a[l + o] = f.z, a[++l] = a[l + o] = v.x, a[++l] = a[l + o] = v.y, a[++l] = a[l + o] = v.z, ++l;
    } else {
      var c = M.chordLength(n, r.maximumRadius),
          h = 0;
      if (i === T.GEODESIC) for (u = 0; u < s; u++) {
        h += B.subdivideLineCount(e[u], e[(u + 1) % s], c);
      } else if (i === T.RHUMB) for (u = 0; u < s; u++) {
        h += B.subdivideRhumbLineCount(r, e[u], e[(u + 1) % s], c);
      }

      for (o = 3 * (h + s), a = new Array(2 * o), u = 0; u < s; u++) {
        var p,
            f = e[u],
            v = e[(u + 1) % s];
        i === T.GEODESIC ? p = B.subdivideLine(f, v, c, _) : i === T.RHUMB && (p = B.subdivideRhumbLine(r, f, v, c, _));

        for (var d = p.length, g = 0; g < d; ++g, ++l) {
          a[l] = p[g], a[l + o] = p[g];
        }

        a[l] = v.x, a[l + o] = v.x, a[++l] = v.y, a[l + o] = v.y, a[++l] = v.z, a[l + o] = v.z, ++l;
      }
    }
    s = a.length;
    var y = D.createTypedArray(s / 3, s - 6 * e.length),
        m = 0;

    for (s /= 6, u = 0; u < s; u++) {
      var w = u,
          b = w + 1,
          I = w + s,
          E = I + 1;
      f = S.fromArray(a, 3 * w, Q), v = S.fromArray(a, 3 * b, K), S.equalsEpsilon(f, v, M.EPSILON14, M.EPSILON6) || (y[m++] = w, y[m++] = I, y[m++] = b, y[m++] = b, y[m++] = I, y[m++] = E);
    }

    return new A({
      attributes: new N({
        position: new G({
          componentDatatype: L.DOUBLE,
          componentsPerAttribute: 3,
          values: a
        })
      }),
      indices: y,
      primitiveType: P.TRIANGLES
    });
  }, B;
});