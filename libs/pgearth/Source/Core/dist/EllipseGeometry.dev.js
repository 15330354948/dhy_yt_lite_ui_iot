"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./EllipseGeometryLibrary", "./Ellipsoid", "./GeographicProjection", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryInstance", "./GeometryOffsetAttribute", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix3", "./PrimitiveType", "./Quaternion", "./Rectangle", "./VertexFormat"], function (U, v, Q, W, e, h, q, A, J, t, l, B, x, Z, w, K, X, b, $, T, I, p, ee, N, te, d, g) {
  "use strict";

  var re = new W(),
      ie = new W(),
      oe = new W(),
      ne = new W(),
      ae = new Q(),
      se = new ee(),
      Y = new ee(),
      ue = new te(),
      le = new W(),
      me = new W(),
      ce = new W(),
      pe = new e(),
      de = new W(),
      ye = new Q(),
      he = new Q();

  function M(e, t, r) {
    var i = t.vertexFormat,
        o = t.center,
        n = t.semiMajorAxis,
        a = t.semiMinorAxis,
        s = t.ellipsoid,
        u = t.stRotation,
        l = r ? e.length / 3 * 2 : e.length / 3,
        m = t.shadowVolume,
        c = i.st ? new Float32Array(2 * l) : void 0,
        p = i.normal ? new Float32Array(3 * l) : void 0,
        d = i.tangent ? new Float32Array(3 * l) : void 0,
        y = i.bitangent ? new Float32Array(3 * l) : void 0,
        h = m ? new Float32Array(3 * l) : void 0,
        A = 0,
        x = le,
        g = me,
        f = ce,
        _ = new Z(s),
        v = _.project(s.cartesianToCartographic(o, pe), de),
        w = s.scaleToGeodeticSurface(o, re);

    s.geodeticSurfaceNormal(w, w);
    var b,
        T = se,
        I = Y;
    I = 0 !== u ? (b = te.fromAxisAngle(w, u, ue), T = ee.fromQuaternion(b, T), b = te.fromAxisAngle(w, -u, ue), ee.fromQuaternion(b, I)) : (T = ee.clone(ee.IDENTITY, T), ee.clone(ee.IDENTITY, I));

    for (var N = Q.fromElements(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, ye), M = Q.fromElements(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, he), E = e.length, P = r ? E : 0, F = P / 3 * 2, O = 0; O < E; O += 3) {
      var S,
          D,
          R = O + 1,
          L = O + 2,
          j = W.fromArray(e, O, re);
      i.st && (S = ee.multiplyByVector(T, j, ie), D = _.project(s.cartesianToCartographic(S, pe), oe), W.subtract(D, v, D), ae.x = (D.x + n) / (2 * n), ae.y = (D.y + a) / (2 * a), N.x = Math.min(ae.x, N.x), N.y = Math.min(ae.y, N.y), M.x = Math.max(ae.x, M.x), M.y = Math.max(ae.y, M.y), r && (c[A + F] = ae.x, c[A + 1 + F] = ae.y), c[A++] = ae.x, c[A++] = ae.y), (i.normal || i.tangent || i.bitangent || m) && (x = s.geodeticSurfaceNormal(j, x), m && (h[O + P] = -x.x, h[R + P] = -x.y, h[L + P] = -x.z), (i.normal || i.tangent || i.bitangent) && ((i.tangent || i.bitangent) && (g = W.normalize(W.cross(W.UNIT_Z, x, g), g), ee.multiplyByVector(I, g, g)), i.normal && (p[O] = x.x, p[R] = x.y, p[L] = x.z, r && (p[O + P] = -x.x, p[R + P] = -x.y, p[L + P] = -x.z)), i.tangent && (d[O] = g.x, d[R] = g.y, d[L] = g.z, r && (d[O + P] = -g.x, d[R + P] = -g.y, d[L + P] = -g.z)), i.bitangent && (f = W.normalize(W.cross(x, g, f), f), y[O] = f.x, y[R] = f.y, y[L] = f.z, r && (y[O + P] = f.x, y[R + P] = f.y, y[L + P] = f.z))));
    }

    if (i.st) {
      E = c.length;

      for (var G = 0; G < E; G += 2) {
        c[G] = (c[G] - N.x) / (M.x - N.x), c[G + 1] = (c[G + 1] - N.y) / (M.y - N.y);
      }
    }

    var V,
        z,
        k,
        C = new X();
    return i.position && (V = B.raisePositionsToHeight(e, t, r), C.position = new K({
      componentDatatype: q.DOUBLE,
      componentsPerAttribute: 3,
      values: V
    })), i.st && (C.st = new K({
      componentDatatype: q.FLOAT,
      componentsPerAttribute: 2,
      values: c
    })), i.normal && (C.normal = new K({
      componentDatatype: q.FLOAT,
      componentsPerAttribute: 3,
      values: p
    })), i.tangent && (C.tangent = new K({
      componentDatatype: q.FLOAT,
      componentsPerAttribute: 3,
      values: d
    })), i.bitangent && (C.bitangent = new K({
      componentDatatype: q.FLOAT,
      componentsPerAttribute: 3,
      values: y
    })), m && (C.extrudeDirection = new K({
      componentDatatype: q.FLOAT,
      componentsPerAttribute: 3,
      values: h
    })), r && J(t.offsetAttribute) && (k = new Uint8Array(l), k = t.offsetAttribute === $.TOP ? U(k, 1, 0, l / 2) : (z = t.offsetAttribute === $.NONE ? 0 : 1, U(k, z)), C.applyOffset = new K({
      componentDatatype: q.UNSIGNED_BYTE,
      componentsPerAttribute: 1,
      values: k
    })), C;
  }

  function E(e) {
    for (var t, r, i = new Array(e * (e + 1) * 12 - 6), o = 0, n = 0, a = 1, s = 0; s < 3; s++) {
      i[o++] = a++, i[o++] = n, i[o++] = a;
    }

    for (s = 2; s < e + 1; ++s) {
      for (a = s * (s + 1) - 1, n = (s - 1) * s - 1, i[o++] = a++, i[o++] = n, i[o++] = a, t = 2 * s, r = 0; r < t - 1; ++r) {
        i[o++] = a, i[o++] = n++, i[o++] = n, i[o++] = a++, i[o++] = n, i[o++] = a;
      }

      i[o++] = a++, i[o++] = n, i[o++] = a;
    }

    for (t = 2 * e, ++a, ++n, s = 0; s < t - 1; ++s) {
      i[o++] = a, i[o++] = n++, i[o++] = n, i[o++] = a++, i[o++] = n, i[o++] = a;
    }

    for (i[o++] = a, i[o++] = n++, i[o++] = n, i[o++] = a++, i[o++] = n++, i[o++] = n, ++n, s = e - 1; 1 < s; --s) {
      for (i[o++] = n++, i[o++] = n, i[o++] = a, t = 2 * s, r = 0; r < t - 1; ++r) {
        i[o++] = a, i[o++] = n++, i[o++] = n, i[o++] = a++, i[o++] = n, i[o++] = a;
      }

      i[o++] = n++, i[o++] = n++, i[o++] = a++;
    }

    for (s = 0; s < 3; s++) {
      i[o++] = n++, i[o++] = n, i[o++] = a;
    }

    return i;
  }

  var m = new W();
  var P = new v(),
      F = new v();

  function c(e) {
    var t = e.center,
        r = e.ellipsoid,
        i = e.semiMajorAxis,
        o = W.multiplyByScalar(r.geodeticSurfaceNormal(t, re), e.height, re);
    P.center = W.add(t, o, P.center), P.radius = i, o = W.multiplyByScalar(r.geodeticSurfaceNormal(t, o), e.extrudedHeight, o), F.center = W.add(t, o, F.center), F.radius = i;
    var n = B.computeEllipsePositions(e, !0, !0),
        a = n.positions,
        s = n.numPts,
        u = n.outerPositions,
        l = v.union(P, F),
        m = M(a, e, !0),
        c = (x = E(s)).length;
    x.length = 2 * c;

    for (var p = a.length / 3, d = 0; d < c; d += 3) {
      x[d + c] = x[d + 2] + p, x[d + 1 + c] = x[d + 1] + p, x[d + 2 + c] = x[d] + p;
    }

    var y = I.createTypedArray(2 * p / 3, x),
        h = new w({
      attributes: m,
      indices: y,
      primitiveType: N.TRIANGLES
    }),
        A = function (e, t) {
      var r = t.vertexFormat,
          i = t.center,
          o = t.semiMajorAxis,
          n = t.semiMinorAxis,
          a = t.ellipsoid,
          s = t.height,
          u = t.extrudedHeight,
          l = t.stRotation,
          m = e.length / 3 * 2,
          c = new Float64Array(3 * m),
          p = r.st ? new Float32Array(2 * m) : void 0,
          d = r.normal ? new Float32Array(3 * m) : void 0,
          y = r.tangent ? new Float32Array(3 * m) : void 0,
          h = r.bitangent ? new Float32Array(3 * m) : void 0,
          A = t.shadowVolume,
          x = A ? new Float32Array(3 * m) : void 0,
          g = 0,
          f = le,
          _ = me,
          v = ce,
          w = new Z(a),
          b = w.project(a.cartesianToCartographic(i, pe), de),
          T = a.scaleToGeodeticSurface(i, re);
      a.geodeticSurfaceNormal(T, T);

      for (var I = te.fromAxisAngle(T, l, ue), N = ee.fromQuaternion(I, se), M = Q.fromElements(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, ye), E = Q.fromElements(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, he), P = e.length, F = P / 3 * 2, O = 0; O < P; O += 3) {
        var S,
            D,
            R = O + 1,
            L = O + 2,
            j = W.fromArray(e, O, re);
        r.st && (S = ee.multiplyByVector(N, j, ie), D = w.project(a.cartesianToCartographic(S, pe), oe), W.subtract(D, b, D), ae.x = (D.x + o) / (2 * o), ae.y = (D.y + n) / (2 * n), M.x = Math.min(ae.x, M.x), M.y = Math.min(ae.y, M.y), E.x = Math.max(ae.x, E.x), E.y = Math.max(ae.y, E.y), p[g + F] = ae.x, p[g + 1 + F] = ae.y, p[g++] = ae.x, p[g++] = ae.y), j = a.scaleToGeodeticSurface(j, j), k = W.clone(j, ie), f = a.geodeticSurfaceNormal(j, f), A && (x[O + P] = -f.x, x[R + P] = -f.y, x[L + P] = -f.z);
        var G,
            V,
            z = W.multiplyByScalar(f, s, ne),
            j = W.add(j, z, j),
            z = W.multiplyByScalar(f, u, z),
            k = W.add(k, z, k);
        r.position && (c[O + P] = k.x, c[R + P] = k.y, c[L + P] = k.z, c[O] = j.x, c[R] = j.y, c[L] = j.z), (r.normal || r.tangent || r.bitangent) && (v = W.clone(f, v), G = W.fromArray(e, (O + 3) % P, ne), W.subtract(G, j, G), V = W.subtract(k, j, oe), f = W.normalize(W.cross(V, G, f), f), r.normal && (d[O] = f.x, d[R] = f.y, d[L] = f.z, d[O + P] = f.x, d[R + P] = f.y, d[L + P] = f.z), r.tangent && (_ = W.normalize(W.cross(v, f, _), _), y[O] = _.x, y[R] = _.y, y[L] = _.z, y[O + P] = _.x, y[O + 1 + P] = _.y, y[O + 2 + P] = _.z), r.bitangent && (h[O] = v.x, h[R] = v.y, h[L] = v.z, h[O + P] = v.x, h[R + P] = v.y, h[L + P] = v.z));
      }

      if (r.st) {
        P = p.length;

        for (var C = 0; C < P; C += 2) {
          p[C] = (p[C] - M.x) / (E.x - M.x), p[C + 1] = (p[C + 1] - M.y) / (E.y - M.y);
        }
      }

      var B,
          Y,
          H = new X();
      return r.position && (H.position = new K({
        componentDatatype: q.DOUBLE,
        componentsPerAttribute: 3,
        values: c
      })), r.st && (H.st = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 2,
        values: p
      })), r.normal && (H.normal = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: d
      })), r.tangent && (H.tangent = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: y
      })), r.bitangent && (H.bitangent = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: h
      })), A && (H.extrudeDirection = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: x
      })), J(t.offsetAttribute) && (Y = new Uint8Array(m), Y = t.offsetAttribute === $.TOP ? U(Y, 1, 0, m / 2) : (B = t.offsetAttribute === $.NONE ? 0 : 1, U(Y, B)), H.applyOffset = new K({
        componentDatatype: q.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: Y
      })), H;
    }(u, e),
        x = function (e) {
      for (var t = e.length / 3, r = I.createTypedArray(t, 6 * t), i = 0, o = 0; o < t; o++) {
        var n = o + t,
            a = (o + 1) % t,
            s = a + t;
        r[i++] = o, r[i++] = n, r[i++] = a, r[i++] = a, r[i++] = n, r[i++] = s;
      }

      return r;
    }(u),
        g = I.createTypedArray(2 * u.length / 3, x),
        f = new w({
      attributes: A,
      indices: g,
      primitiveType: N.TRIANGLES
    }),
        _ = T.combineInstances([new b({
      geometry: h
    }), new b({
      geometry: f
    })]);

    return {
      boundingSphere: l,
      attributes: _[0].attributes,
      indices: _[0].indices
    };
  }

  function u(e, t, r, i, o, n, a) {
    for (var s = B.computeEllipsePositions({
      center: e,
      semiMajorAxis: t,
      semiMinorAxis: r,
      rotation: i,
      granularity: o
    }, !1, !0).outerPositions, u = s.length / 3, l = new Array(u), m = 0; m < u; ++m) {
      l[m] = W.fromArray(s, 3 * m);
    }

    var c = d.fromCartesianArray(l, n, a);
    return c.width > p.PI && (c.north = 0 < c.north ? p.PI_OVER_TWO - p.EPSILON7 : c.north, c.south = c.south < 0 ? p.EPSILON7 - p.PI_OVER_TWO : c.south, c.east = p.PI, c.west = -p.PI), c;
  }

  function f(e) {
    var t = (e = A(e, A.EMPTY_OBJECT)).center,
        r = A(e.ellipsoid, x.WGS84),
        i = e.semiMajorAxis,
        o = e.semiMinorAxis,
        n = A(e.granularity, p.RADIANS_PER_DEGREE),
        a = A(e.vertexFormat, g.DEFAULT);
    if (h.defined("options.center", t), h.typeOf.number("options.semiMajorAxis", i), h.typeOf.number("options.semiMinorAxis", o), i < o) throw new l("semiMajorAxis must be greater than or equal to the semiMinorAxis.");
    if (n <= 0) throw new l("granularity must be greater than zero.");
    var s = A(e.height, 0),
        u = A(e.extrudedHeight, s);
    this._center = W.clone(t), this._semiMajorAxis = i, this._semiMinorAxis = o, this._ellipsoid = x.clone(r), this._rotation = A(e.rotation, 0), this._stRotation = A(e.stRotation, 0), this._height = Math.max(u, s), this._granularity = n, this._vertexFormat = g.clone(a), this._extrudedHeight = Math.min(u, s), this._shadowVolume = A(e.shadowVolume, !1), this._workerName = "createEllipseGeometry", this._offsetAttribute = e.offsetAttribute, this._rectangle = void 0, this._textureCoordinateRotationPoints = void 0;
  }

  f.packedLength = W.packedLength + x.packedLength + g.packedLength + 9, f.pack = function (e, t, r) {
    return h.defined("value", e), h.defined("array", t), r = A(r, 0), W.pack(e._center, t, r), r += W.packedLength, x.pack(e._ellipsoid, t, r), r += x.packedLength, g.pack(e._vertexFormat, t, r), r += g.packedLength, t[r++] = e._semiMajorAxis, t[r++] = e._semiMinorAxis, t[r++] = e._rotation, t[r++] = e._stRotation, t[r++] = e._height, t[r++] = e._granularity, t[r++] = e._extrudedHeight, t[r++] = e._shadowVolume ? 1 : 0, t[r] = A(e._offsetAttribute, -1), t;
  };

  var _ = new W(),
      O = new x(),
      S = new g(),
      D = {
    center: _,
    ellipsoid: O,
    vertexFormat: S,
    semiMajorAxis: void 0,
    semiMinorAxis: void 0,
    rotation: void 0,
    stRotation: void 0,
    height: void 0,
    granularity: void 0,
    extrudedHeight: void 0,
    shadowVolume: void 0,
    offsetAttribute: void 0
  };

  return f.unpack = function (e, t, r) {
    h.defined("array", e), t = A(t, 0);
    var i = W.unpack(e, t, _);
    t += W.packedLength;
    var o = x.unpack(e, t, O);
    t += x.packedLength;
    var n = g.unpack(e, t, S);
    t += g.packedLength;
    var a = e[t++],
        s = e[t++],
        u = e[t++],
        l = e[t++],
        m = e[t++],
        c = e[t++],
        p = e[t++],
        d = 1 === e[t++],
        y = e[t];
    return J(r) ? (r._center = W.clone(i, r._center), r._ellipsoid = x.clone(o, r._ellipsoid), r._vertexFormat = g.clone(n, r._vertexFormat), r._semiMajorAxis = a, r._semiMinorAxis = s, r._rotation = u, r._stRotation = l, r._height = m, r._granularity = c, r._extrudedHeight = p, r._shadowVolume = d, r._offsetAttribute = -1 === y ? void 0 : y, r) : (D.height = m, D.extrudedHeight = p, D.granularity = c, D.stRotation = l, D.rotation = u, D.semiMajorAxis = a, D.semiMinorAxis = s, D.shadowVolume = d, D.offsetAttribute = -1 === y ? void 0 : y, new f(D));
  }, f.computeRectangle = function (e, t) {
    var r = (e = A(e, A.EMPTY_OBJECT)).center,
        i = A(e.ellipsoid, x.WGS84),
        o = e.semiMajorAxis,
        n = e.semiMinorAxis,
        a = A(e.granularity, p.RADIANS_PER_DEGREE),
        s = A(e.rotation, 0);
    if (h.defined("options.center", r), h.typeOf.number("options.semiMajorAxis", o), h.typeOf.number("options.semiMinorAxis", n), o < n) throw new l("semiMajorAxis must be greater than or equal to the semiMinorAxis.");
    if (a <= 0) throw new l("granularity must be greater than zero.");
    return u(r, o, n, s, a, i, t);
  }, f.createGeometry = function (e) {
    if (!(e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0)) {
      var t = e._height,
          r = e._extrudedHeight,
          i = !p.equalsEpsilon(t, r, 0, p.EPSILON2);
      e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center);
      var o,
          n,
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
        vertexFormat: e._vertexFormat,
        stRotation: e._stRotation
      };
      return i ? (u.extrudedHeight = r, u.shadowVolume = e._shadowVolume, u.offsetAttribute = e._offsetAttribute, s = c(u)) : (s = function (e) {
        var t = e.center;
        m = W.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t, m), e.height, m), m = W.add(t, m, m);
        var r = new v(m, e.semiMajorAxis),
            i = B.computeEllipsePositions(e, !0, !1),
            o = i.positions,
            n = i.numPts,
            a = M(o, e, !1),
            s = E(n);
        return {
          boundingSphere: r,
          attributes: a,
          indices: s = I.createTypedArray(o.length / 3, s)
        };
      }(u), J(e._offsetAttribute) && (o = s.attributes.position.values.length, n = new Uint8Array(o / 3), a = e._offsetAttribute === $.NONE ? 0 : 1, U(n, a), s.attributes.applyOffset = new K({
        componentDatatype: q.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: n
      }))), new w({
        attributes: s.attributes,
        indices: s.indices,
        primitiveType: N.TRIANGLES,
        boundingSphere: s.boundingSphere,
        offsetAttribute: e._offsetAttribute
      });
    }
  }, f.createShadowVolume = function (e, t, r) {
    var i = e._granularity,
        o = e._ellipsoid,
        n = t(i, o),
        a = r(i, o);
    return new f({
      center: e._center,
      semiMajorAxis: e._semiMajorAxis,
      semiMinorAxis: e._semiMinorAxis,
      ellipsoid: o,
      rotation: e._rotation,
      stRotation: e._stRotation,
      granularity: i,
      extrudedHeight: n,
      height: a,
      vertexFormat: g.POSITION_ONLY,
      shadowVolume: !0
    });
  }, t(f.prototype, {
    rectangle: {
      get: function get() {
        return J(this._rectangle) || (this._rectangle = u(this._center, this._semiMajorAxis, this._semiMinorAxis, this._rotation, this._granularity, this._ellipsoid)), this._rectangle;
      }
    },
    textureCoordinateRotationPoints: {
      get: function get() {
        return J(this._textureCoordinateRotationPoints) || (this._textureCoordinateRotationPoints = function (e) {
          var t = -e._stRotation;
          if (0 == t) return [0, 0, 0, 1, 1, 0];

          for (var r = B.computeEllipsePositions({
            center: e._center,
            semiMajorAxis: e._semiMajorAxis,
            semiMinorAxis: e._semiMinorAxis,
            rotation: e._rotation,
            granularity: e._granularity
          }, !1, !0).outerPositions, i = r.length / 3, o = new Array(i), n = 0; n < i; ++n) {
            o[n] = W.fromArray(r, 3 * n);
          }

          var a = e._ellipsoid,
              s = e.rectangle;
          return w._textureCoordinateRotationPoints(o, t, a, s);
        }(this)), this._textureCoordinateRotationPoints;
      }
    }
  }), f;
});