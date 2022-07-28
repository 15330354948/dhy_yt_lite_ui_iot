"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian3", "./Cartographic", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PolygonPipeline", "./PrimitiveType", "./Rectangle", "./RectangleGeometryLibrary"], function (d, _, t, e, m, h, v, p, c, A, E, P, y, H, b, N, x, g, k) {
  "use strict";

  var w = new _(),
      D = new _(),
      G = new t(),
      L = new g();

  function T(t, e) {
    var i = t._ellipsoid,
        r = e.height,
        o = e.width,
        n = e.northCap,
        a = e.southCap,
        s = r,
        u = 2,
        l = 0,
        h = 4;
    n && (--u, --s, l += 1, h -= 2), a && (--u, --s, l += 1, h -= 2), l += u * o + 2 * s - h;
    var p,
        c = new Float64Array(3 * l),
        g = 0,
        f = 0,
        d = G;
    if (n) k.computePosition(e, i, !1, f, 0, d), c[g++] = d.x, c[g++] = d.y, c[g++] = d.z;else for (p = 0; p < o; p++) {
      k.computePosition(e, i, !1, f, p, d), c[g++] = d.x, c[g++] = d.y, c[g++] = d.z;
    }

    for (p = o - 1, f = 1; f < r; f++) {
      k.computePosition(e, i, !1, f, p, d), c[g++] = d.x, c[g++] = d.y, c[g++] = d.z;
    }

    if (f = r - 1, !a) for (p = o - 2; 0 <= p; p--) {
      k.computePosition(e, i, !1, f, p, d), c[g++] = d.x, c[g++] = d.y, c[g++] = d.z;
    }

    for (p = 0, f = r - 2; 0 < f; f--) {
      k.computePosition(e, i, !1, f, p, d), c[g++] = d.x, c[g++] = d.y, c[g++] = d.z;
    }

    for (var _ = c.length / 3 * 2, v = H.createTypedArray(c.length / 3, _), y = 0, b = 0; b < c.length / 3 - 1; b++) {
      v[y++] = b, v[y++] = b + 1;
    }

    v[y++] = c.length / 3 - 1, v[y++] = 0;
    var w = new A({
      attributes: new P(),
      primitiveType: x.LINES
    });
    return w.attributes.position = new E({
      componentDatatype: m.DOUBLE,
      componentsPerAttribute: 3,
      values: c
    }), w.indices = v, w;
  }

  function f(t) {
    var e = (t = h(t, h.EMPTY_OBJECT)).rectangle,
        i = h(t.granularity, b.RADIANS_PER_DEGREE),
        r = h(t.ellipsoid, c.WGS84),
        o = h(t.rotation, 0);
    if (!v(e)) throw new p("rectangle is required.");
    if (g.validate(e), e.north < e.south) throw new p("options.rectangle.north must be greater than options.rectangle.south");
    var n = h(t.height, 0),
        a = h(t.extrudedHeight, n);
    this._rectangle = g.clone(e), this._granularity = i, this._ellipsoid = r, this._surfaceHeight = Math.max(n, a), this._rotation = o, this._extrudedHeight = Math.min(n, a), this._offsetAttribute = t.offsetAttribute, this._workerName = "createRectangleOutlineGeometry";
  }

  f.packedLength = g.packedLength + c.packedLength + 5, f.pack = function (t, e, i) {
    if (!v(t)) throw new p("value is required");
    if (!v(e)) throw new p("array is required");
    return i = h(i, 0), g.pack(t._rectangle, e, i), i += g.packedLength, c.pack(t._ellipsoid, e, i), i += c.packedLength, e[i++] = t._granularity, e[i++] = t._surfaceHeight, e[i++] = t._rotation, e[i++] = t._extrudedHeight, e[i] = h(t._offsetAttribute, -1), e;
  };
  var O = new g(),
      S = c.clone(c.UNIT_SPHERE),
      I = {
    rectangle: O,
    ellipsoid: S,
    granularity: void 0,
    height: void 0,
    rotation: void 0,
    extrudedHeight: void 0,
    offsetAttribute: void 0
  };

  f.unpack = function (t, e, i) {
    if (!v(t)) throw new p("array is required");
    e = h(e, 0);
    var r = g.unpack(t, e, O);
    e += g.packedLength;
    var o = c.unpack(t, e, S);
    e += c.packedLength;
    var n = t[e++],
        a = t[e++],
        s = t[e++],
        u = t[e++],
        l = t[e];
    return v(i) ? (i._rectangle = g.clone(r, i._rectangle), i._ellipsoid = c.clone(o, i._ellipsoid), i._surfaceHeight = a, i._rotation = s, i._extrudedHeight = u, i._offsetAttribute = -1 === l ? void 0 : l, i) : (I.granularity = n, I.height = a, I.rotation = s, I.extrudedHeight = u, I.offsetAttribute = -1 === l ? void 0 : l, new f(I));
  };

  var R = new e();
  return f.createGeometry = function (t) {
    var e = t._rectangle,
        i = t._ellipsoid,
        r = k.computeOptions(e, t._granularity, t._rotation, 0, L, R);

    if (!b.equalsEpsilon(e.north, e.south, b.EPSILON10) && !b.equalsEpsilon(e.east, e.west, b.EPSILON10)) {
      var o,
          n,
          a,
          s,
          u,
          l,
          h,
          p,
          c,
          g = t._surfaceHeight,
          f = t._extrudedHeight;
      return l = !b.equalsEpsilon(g, f, 0, b.EPSILON2) ? (a = function (t, e) {
        var i = t._surfaceHeight,
            r = t._extrudedHeight,
            o = t._ellipsoid,
            n = r,
            a = i,
            s = T(t, e),
            u = e.height,
            l = e.width,
            h = N.scaleToGeodeticHeight(s.attributes.position.values, a, o, !1),
            p = h.length,
            c = new Float64Array(2 * p);
        c.set(h);
        var g = N.scaleToGeodeticHeight(s.attributes.position.values, n, o);
        c.set(g, p), s.attributes.position.values = c;
        var f = e.northCap,
            d = e.southCap,
            _ = 4;
        f && --_, d && --_;

        for (var v, y, b, w = 2 * (c.length / 3 + _), m = H.createTypedArray(c.length / 3, w), p = c.length / 6, A = 0, E = 0; E < p - 1; E++) {
          m[A++] = E, m[A++] = E + 1, m[A++] = E + p, m[A++] = E + p + 1;
        }

        return m[A++] = p - 1, m[A++] = 0, m[A++] = p + p - 1, m[A++] = p, m[A++] = 0, m[A++] = p, v = f ? u - 1 : (y = l - 1, m[A++] = y, m[A++] = y + p, l + u - 2), m[A++] = v, m[A++] = v + p, d || (b = l + v - 1, m[A++] = b, m[A] = b + p), s.indices = m, s;
      }(t, r), v(t._offsetAttribute) && (o = a.attributes.position.values.length / 3, n = new Uint8Array(o), n = t._offsetAttribute === y.TOP ? d(n, 1, 0, o / 2) : (c = t._offsetAttribute === y.NONE ? 0 : 1, d(n, c)), a.attributes.applyOffset = new E({
        componentDatatype: m.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: n
      })), s = _.fromRectangle3D(e, i, g, D), u = _.fromRectangle3D(e, i, f, w), _.union(s, u)) : ((a = T(t, r)).attributes.position.values = N.scaleToGeodeticHeight(a.attributes.position.values, g, i, !1), v(t._offsetAttribute) && (h = a.attributes.position.values.length, p = new Uint8Array(h / 3), c = t._offsetAttribute === y.NONE ? 0 : 1, d(p, c), a.attributes.applyOffset = new E({
        componentDatatype: m.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: p
      })), _.fromRectangle3D(e, i, g)), new A({
        attributes: a.attributes,
        indices: a.indices,
        primitiveType: x.LINES,
        boundingSphere: l,
        offsetAttribute: t._offsetAttribute
      });
    }
  }, f;
});