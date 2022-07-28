"use strict";

define(["./ArcType", "./arrayFill", "./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidTangentPlane", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryInstance", "./GeometryOffsetAttribute", "./GeometryPipeline", "./IndexDatatype", "./Math", "./PolygonGeometryLibrary", "./PolygonPipeline", "./PrimitiveType", "./Queue", "./WindingOrder"], function (E, _, e, H, t, d, P, g, A, y, c, T, O, w, L, D, x, G, I, C, S, R, k, i, N) {
  "use strict";

  var U = [],
      B = [];

  function f(e) {
    if (d.typeOf.object("options", e), d.typeOf.object("options.polygonHierarchy", e.polygonHierarchy), e.perPositionHeight && A(e.height)) throw new y("Cannot use both options.perPositionHeight and options.height");
    if (A(e.arcType) && e.arcType !== E.GEODESIC && e.arcType !== E.RHUMB) throw new y("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");
    var t,
        i = e.polygonHierarchy,
        r = g(e.ellipsoid, c.WGS84),
        o = g(e.granularity, C.RADIANS_PER_DEGREE),
        n = g(e.perPositionHeight, !1),
        a = n && A(e.extrudedHeight),
        s = g(e.arcType, E.GEODESIC),
        p = g(e.height, 0),
        u = g(e.extrudedHeight, p);
    a || (t = Math.max(p, u), u = Math.min(p, u), p = t), this._ellipsoid = c.clone(r), this._granularity = o, this._height = p, this._extrudedHeight = u, this._arcType = s, this._polygonHierarchy = i, this._perPositionHeight = n, this._perPositionHeightExtrude = a, this._offsetAttribute = e.offsetAttribute, this._workerName = "createPolygonOutlineGeometry", this.packedLength = S.computeHierarchyPackedLength(i) + c.packedLength + 8;
  }

  f.pack = function (e, t, i) {
    return d.typeOf.object("value", e), d.defined("array", t), i = g(i, 0), i = S.packPolygonHierarchy(e._polygonHierarchy, t, i), c.pack(e._ellipsoid, t, i), i += c.packedLength, t[i++] = e._height, t[i++] = e._extrudedHeight, t[i++] = e._granularity, t[i++] = e._perPositionHeightExtrude ? 1 : 0, t[i++] = e._perPositionHeight ? 1 : 0, t[i++] = e._arcType, t[i++] = g(e._offsetAttribute, -1), t[i] = e.packedLength, t;
  };

  var m = c.clone(c.UNIT_SPHERE),
      v = {
    polygonHierarchy: {}
  };
  return f.unpack = function (e, t, i) {
    d.defined("array", e), t = g(t, 0);
    var r = S.unpackPolygonHierarchy(e, t);
    t = r.startingIndex, delete r.startingIndex;
    var o = c.unpack(e, t, m);
    t += c.packedLength;
    var n = e[t++],
        a = e[t++],
        s = e[t++],
        p = 1 === e[t++],
        u = 1 === e[t++],
        y = e[t++],
        h = e[t++],
        l = e[t];
    return A(i) || (i = new f(v)), i._polygonHierarchy = r, i._ellipsoid = c.clone(o, i._ellipsoid), i._height = n, i._extrudedHeight = a, i._granularity = s, i._perPositionHeight = u, i._perPositionHeightExtrude = p, i._arcType = y, i._offsetAttribute = -1 === h ? void 0 : h, i.packedLength = l, i;
  }, f.fromPositions = function (e) {
    return e = g(e, g.EMPTY_OBJECT), d.defined("options.positions", e.positions), new f({
      polygonHierarchy: {
        positions: e.positions
      },
      height: e.height,
      extrudedHeight: e.extrudedHeight,
      ellipsoid: e.ellipsoid,
      granularity: e.granularity,
      perPositionHeight: e.perPositionHeight,
      arcType: e.arcType,
      offsetAttribute: e.offsetAttribute
    });
  }, f.createGeometry = function (e) {
    var t = e._ellipsoid,
        i = e._granularity,
        r = e._polygonHierarchy,
        o = e._perPositionHeight,
        n = e._arcType,
        a = S.polygonOutlinesFromHierarchy(r, !o, t);

    if (0 !== a.length) {
      var s,
          p,
          u,
          y,
          h,
          l,
          d,
          g = [],
          c = C.chordLength(i, t.maximumRadius),
          f = e._height,
          m = e._extrudedHeight;
      if (e._perPositionHeightExtrude || !C.equalsEpsilon(f, m, 0, C.EPSILON2)) for (s = 0; s < a.length; s++) {
        (y = function (e, t, i, r, o) {
          var n,
              a = T.fromPoints(t, e).projectPointsOntoPlane(t, U);
          R.computeWindingOrder2D(a) === N.CLOCKWISE && (a.reverse(), t = t.slice().reverse());
          var s = t.length,
              p = new Array(s),
              u = 0;
          if (r) for (n = new Float64Array(2 * s * 3 * 2), b = 0; b < s; ++b) {
            p[b] = u / 3;
            var y = t[b],
                h = t[(b + 1) % s];
            n[u++] = y.x, n[u++] = y.y, n[u++] = y.z, n[u++] = h.x, n[u++] = h.y, n[u++] = h.z;
          } else {
            var l,
                d = 0;
            if (o === E.GEODESIC) for (b = 0; b < s; b++) {
              d += S.subdivideLineCount(t[b], t[(b + 1) % s], i);
            } else if (o === E.RHUMB) for (b = 0; b < s; b++) {
              d += S.subdivideRhumbLineCount(e, t[b], t[(b + 1) % s], i);
            }

            for (n = new Float64Array(3 * d * 2), b = 0; b < s; ++b) {
              p[b] = u / 3, o === E.GEODESIC ? l = S.subdivideLine(t[b], t[(b + 1) % s], i, B) : o === E.RHUMB && (l = S.subdivideRhumbLine(e, t[b], t[(b + 1) % s], i, B));

              for (var g = l.length, c = 0; c < g; ++c) {
                n[u++] = l[c];
              }
            }
          }
          s = n.length / 6;

          for (var f = p.length, m = 2 * (2 * s + f), v = I.createTypedArray(s + f, m), u = 0, b = 0; b < s; ++b) {
            v[u++] = b, v[u++] = (b + 1) % s, v[u++] = b + s, v[u++] = (b + 1) % s + s;
          }

          for (b = 0; b < f; b++) {
            var _ = p[b];
            v[u++] = _, v[u++] = _ + s;
          }

          return new D({
            geometry: new O({
              attributes: new L({
                position: new w({
                  componentDatatype: P.DOUBLE,
                  componentsPerAttribute: 3,
                  values: n
                })
              }),
              indices: v,
              primitiveType: k.LINES
            })
          });
        }(t, a[s], c, o, n)).geometry = S.scaleToGeodeticHeightExtruded(y.geometry, f, m, t, o), A(e._offsetAttribute) && (p = y.geometry.attributes.position.values.length / 3, u = new Uint8Array(p), u = e._offsetAttribute === x.TOP ? _(u, 1, 0, p / 2) : (d = e._offsetAttribute === x.NONE ? 0 : 1, _(u, d)), y.geometry.attributes.applyOffset = new w({
          componentDatatype: P.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: u
        })), g.push(y);
      } else for (s = 0; s < a.length; s++) {
        (y = function (e, t, i, r, o) {
          var n,
              a = T.fromPoints(t, e).projectPointsOntoPlane(t, U);
          R.computeWindingOrder2D(a) === N.CLOCKWISE && (a.reverse(), t = t.slice().reverse());
          var s = t.length,
              p = 0;
          if (r) for (n = new Float64Array(2 * s * 3), m = 0; m < s; m++) {
            var u = t[m],
                y = t[(m + 1) % s];
            n[p++] = u.x, n[p++] = u.y, n[p++] = u.z, n[p++] = y.x, n[p++] = y.y, n[p++] = y.z;
          } else {
            var h,
                l = 0;
            if (o === E.GEODESIC) for (m = 0; m < s; m++) {
              l += S.subdivideLineCount(t[m], t[(m + 1) % s], i);
            } else if (o === E.RHUMB) for (m = 0; m < s; m++) {
              l += S.subdivideRhumbLineCount(e, t[m], t[(m + 1) % s], i);
            }

            for (n = new Float64Array(3 * l), m = 0; m < s; m++) {
              o === E.GEODESIC ? h = S.subdivideLine(t[m], t[(m + 1) % s], i, B) : o === E.RHUMB && (h = S.subdivideRhumbLine(e, t[m], t[(m + 1) % s], i, B));

              for (var d = h.length, g = 0; g < d; ++g) {
                n[p++] = h[g];
              }
            }
          }

          for (var c = 2 * (s = n.length / 3), f = I.createTypedArray(s, c), p = 0, m = 0; m < s - 1; m++) {
            f[p++] = m, f[p++] = m + 1;
          }

          return f[p++] = s - 1, f[p++] = 0, new D({
            geometry: new O({
              attributes: new L({
                position: new w({
                  componentDatatype: P.DOUBLE,
                  componentsPerAttribute: 3,
                  values: n
                })
              }),
              indices: f,
              primitiveType: k.LINES
            })
          });
        }(t, a[s], c, o, n)).geometry.attributes.position.values = R.scaleToGeodeticHeight(y.geometry.attributes.position.values, f, t, !o), A(e._offsetAttribute) && (h = y.geometry.attributes.position.values.length, l = new Uint8Array(h / 3), d = e._offsetAttribute === x.NONE ? 0 : 1, _(l, d), y.geometry.attributes.applyOffset = new w({
          componentDatatype: P.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: l
        })), g.push(y);
      }
      var v = G.combineInstances(g)[0],
          b = H.fromVertices(v.attributes.position.values);
      return new O({
        attributes: v.attributes,
        indices: v.indices,
        primitiveType: v.primitiveType,
        boundingSphere: b,
        offsetAttribute: e._offsetAttribute
      });
    }
  }, f;
});