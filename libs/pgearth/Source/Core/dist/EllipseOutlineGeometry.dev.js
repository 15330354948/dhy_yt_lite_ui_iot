"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./EllipseGeometryLibrary", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PrimitiveType"], function (g, b, y, v, x, w, f, M, p, l, E, L, O, S, N, c) {
  "use strict";

  var P = new y(),
      d = new y();
  var k = new b(),
      j = new b();

  function m(e) {
    var t = (e = x(e, x.EMPTY_OBJECT)).center,
        i = x(e.ellipsoid, p.WGS84),
        r = e.semiMajorAxis,
        n = e.semiMinorAxis,
        o = x(e.granularity, N.RADIANS_PER_DEGREE);
    if (!w(t)) throw new f("center is required.");
    if (!w(r)) throw new f("semiMajorAxis is required.");
    if (!w(n)) throw new f("semiMinorAxis is required.");
    if (r < n) throw new f("semiMajorAxis must be greater than or equal to the semiMinorAxis.");
    if (o <= 0) throw new f("granularity must be greater than zero.");
    var a = x(e.height, 0),
        s = x(e.extrudedHeight, a);
    this._center = y.clone(t), this._semiMajorAxis = r, this._semiMinorAxis = n, this._ellipsoid = p.clone(i), this._rotation = x(e.rotation, 0), this._height = Math.max(s, a), this._granularity = o, this._extrudedHeight = Math.min(s, a), this._numberOfVerticalLines = Math.max(x(e.numberOfVerticalLines, 16), 0), this._offsetAttribute = e.offsetAttribute, this._workerName = "createEllipseOutlineGeometry";
  }

  m.packedLength = y.packedLength + p.packedLength + 8, m.pack = function (e, t, i) {
    if (!w(e)) throw new f("value is required");
    if (!w(t)) throw new f("array is required");
    return i = x(i, 0), y.pack(e._center, t, i), i += y.packedLength, p.pack(e._ellipsoid, t, i), i += p.packedLength, t[i++] = e._semiMajorAxis, t[i++] = e._semiMinorAxis, t[i++] = e._rotation, t[i++] = e._height, t[i++] = e._granularity, t[i++] = e._extrudedHeight, t[i++] = e._numberOfVerticalLines, t[i] = x(e._offsetAttribute, -1), t;
  };

  var _ = new y(),
      A = new p(),
      D = {
    center: _,
    ellipsoid: A,
    semiMajorAxis: void 0,
    semiMinorAxis: void 0,
    rotation: void 0,
    height: void 0,
    granularity: void 0,
    extrudedHeight: void 0,
    numberOfVerticalLines: void 0,
    offsetAttribute: void 0
  };

  return m.unpack = function (e, t, i) {
    if (!w(e)) throw new f("array is required");
    t = x(t, 0);
    var r = y.unpack(e, t, _);
    t += y.packedLength;
    var n = p.unpack(e, t, A);
    t += p.packedLength;
    var o = e[t++],
        a = e[t++],
        s = e[t++],
        u = e[t++],
        l = e[t++],
        c = e[t++],
        d = e[t++],
        h = e[t];
    return w(i) ? (i._center = y.clone(r, i._center), i._ellipsoid = p.clone(n, i._ellipsoid), i._semiMajorAxis = o, i._semiMinorAxis = a, i._rotation = s, i._height = u, i._granularity = l, i._extrudedHeight = c, i._numberOfVerticalLines = d, i._offsetAttribute = -1 === h ? void 0 : h, i) : (D.height = u, D.extrudedHeight = c, D.granularity = l, D.rotation = s, D.semiMajorAxis = o, D.semiMinorAxis = a, D.numberOfVerticalLines = d, D.offsetAttribute = -1 === h ? void 0 : h, new m(D));
  }, m.createGeometry = function (e) {
    if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
      var t = e._height,
          i = e._extrudedHeight,
          r = !N.equalsEpsilon(t, i, 0, N.EPSILON2);
      e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center);
      var n,
          o,
          a,
          s,
          u = {
        center: e._center,
        semiMajorAxis: e._semiMajorAxis,
        semiMinorAxis: e._semiMinorAxis,
        ellipsoid: e._ellipsoid,
        rotation: e._rotation,
        height: t,
        granularity: e._granularity,
        numberOfVerticalLines: e._numberOfVerticalLines
      };
      return r ? (u.extrudedHeight = i, u.offsetAttribute = e._offsetAttribute, s = function (e) {
        var t = e.center,
            i = e.ellipsoid,
            r = e.semiMajorAxis,
            n = y.multiplyByScalar(i.geodeticSurfaceNormal(t, P), e.height, P);
        k.center = y.add(t, n, k.center), k.radius = r, n = y.multiplyByScalar(i.geodeticSurfaceNormal(t, n), e.extrudedHeight, n), j.center = y.add(t, n, j.center), j.radius = r;
        var o,
            a,
            s = M.computeEllipsePositions(e, !1, !0).outerPositions,
            u = new L({
          position: new E({
            componentDatatype: v.DOUBLE,
            componentsPerAttribute: 3,
            values: M.raisePositionsToHeight(s, e, !0)
          })
        }),
            s = u.position.values,
            l = b.union(k, j),
            c = s.length / 3;
        w(e.offsetAttribute) && (a = new Uint8Array(c), a = e.offsetAttribute === O.TOP ? g(a, 1, 0, c / 2) : (o = e.offsetAttribute === O.NONE ? 0 : 1, g(a, o)), u.applyOffset = new E({
          componentDatatype: v.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: a
        }));
        var d = x(e.numberOfVerticalLines, 16),
            d = N.clamp(d, 0, c / 2),
            h = S.createTypedArray(c, 2 * c + 2 * d);
        c /= 2;
        var f = 0;

        for (A = 0; A < c; ++A) {
          h[f++] = A, h[f++] = (A + 1) % c, h[f++] = A + c, h[f++] = (A + 1) % c + c;
        }

        if (0 < d) for (var p = Math.min(d, c), m = Math.round(c / p), _ = Math.min(m * d, c), A = 0; A < _; A += m) {
          h[f++] = A, h[f++] = A + c;
        }
        return {
          boundingSphere: l,
          attributes: u,
          indices: h
        };
      }(u)) : (s = function (e) {
        var t = e.center;
        d = y.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t, d), e.height, d), d = y.add(t, d, d);

        for (var i = new b(d, e.semiMajorAxis), r = M.computeEllipsePositions(e, !1, !0).outerPositions, n = new L({
          position: new E({
            componentDatatype: v.DOUBLE,
            componentsPerAttribute: 3,
            values: M.raisePositionsToHeight(r, e, !1)
          })
        }), o = r.length / 3, a = S.createTypedArray(o, 2 * o), s = 0, u = 0; u < o; ++u) {
          a[s++] = u, a[s++] = (u + 1) % o;
        }

        return {
          boundingSphere: i,
          attributes: n,
          indices: a
        };
      }(u), w(e._offsetAttribute) && (n = s.attributes.position.values.length, o = new Uint8Array(n / 3), a = e._offsetAttribute === O.NONE ? 0 : 1, g(o, a), s.attributes.applyOffset = new E({
        componentDatatype: v.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: o
      }))), new l({
        attributes: s.attributes,
        indices: s.indices,
        primitiveType: c.LINES,
        boundingSphere: s.boundingSphere,
        offsetAttribute: e._offsetAttribute
      });
    }
  }, m;
});