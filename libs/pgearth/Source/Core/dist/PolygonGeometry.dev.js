"use strict";

define(["./ArcType", "./arrayFill", "./BoundingRectangle", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./EllipsoidGeodesic", "./EllipsoidRhumbLine", "./EllipsoidTangentPlane", "./Geometry", "./GeometryAttribute", "./GeometryInstance", "./GeometryOffsetAttribute", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix2", "./Matrix3", "./PolygonGeometryLibrary", "./PolygonPipeline", "./Quaternion", "./Rectangle", "./VertexFormat", "./WindingOrder"], function (u, Y, t, F, W, j, e, _, q, f, Q, o, g, w, h, r, L, G, K, C, Z, S, B, J, i, X, V, k, $, y, b, M) {
  "use strict";

  var tt = new e(),
      et = new e();
  var z = new t(),
      ot = new j(),
      rt = new j(),
      it = new j(),
      nt = new j(),
      at = new j(),
      st = new j(),
      lt = new j(),
      pt = new j(),
      ct = new j(),
      ut = new W(),
      gt = new W(),
      ht = new j(),
      yt = new $(),
      mt = new X(),
      dt = new X();

  function U(t) {
    var e,
        o,
        r,
        i = t.vertexFormat,
        n = t.geometry,
        a = t.shadowVolume,
        s = n.attributes.position.values,
        l = s.length,
        p = t.wall,
        c = t.top || p,
        u = t.bottom || p;

    if (i.st || i.normal || i.tangent || i.bitangent || a) {
      var g = t.boundingRectangle,
          h = t.tangentPlane,
          y = t.ellipsoid,
          m = t.stRotation,
          d = t.perPositionHeight,
          v = ut;
      v.x = g.x, v.y = g.y;

      var _,
          f = i.st ? new Float32Array(l / 3 * 2) : void 0;

      i.normal && (_ = d && c && !p ? n.attributes.normal.values : new Float32Array(l));
      var w,
          b = i.tangent ? new Float32Array(l) : void 0,
          T = i.bitangent ? new Float32Array(l) : void 0,
          I = a ? new Float32Array(l) : void 0,
          P = 0,
          A = 0,
          x = rt,
          E = it,
          O = nt,
          H = !0,
          N = mt,
          D = dt;
      D = 0 !== m ? (w = $.fromAxisAngle(h._plane.normal, m, yt), N = X.fromQuaternion(w, N), w = $.fromAxisAngle(h._plane.normal, -m, yt), X.fromQuaternion(w, D)) : (N = X.clone(X.IDENTITY, N), X.clone(X.IDENTITY, D));
      var R = 0,
          F = 0;
      c && u && (R = l / 2, F = l / 3, l /= 2);

      for (var L = 0; L < l; L += 3) {
        var G,
            C,
            S,
            B,
            V,
            k,
            M,
            z,
            U = j.fromArray(s, L, ht);
        i.st && (G = X.multiplyByVector(N, U, ot), G = y.scaleToGeodeticSurface(G, G), C = h.projectPointOntoPlane(G, gt), W.subtract(C, v, C), S = J.clamp(C.x / g.width, 0, 1), B = J.clamp(C.y / g.height, 0, 1), u && (f[P + F] = S, f[P + 1 + F] = B), c && (f[P] = S, f[P + 1] = B), P += 2), (i.normal || i.tangent || i.bitangent || a) && (V = A + 1, k = A + 2, p ? (L + 3 < l && (M = j.fromArray(s, L + 3, at), H && (z = j.fromArray(s, L + l, st), d && function (t, e, o, r) {
          var i = r.cartesianToCartographic(t, tt).height,
              n = r.cartesianToCartographic(e, et);
          n.height = i, r.cartographicToCartesian(n, e);
          var a = r.cartesianToCartographic(o, et);
          a.height = i - 100, r.cartographicToCartesian(a, o);
        }(U, M, z, y), j.subtract(M, U, M), j.subtract(z, U, z), x = j.normalize(j.cross(z, M, x), x), H = !1), j.equalsEpsilon(M, U, J.EPSILON10) && (H = !0)), (i.tangent || i.bitangent) && (O = y.geodeticSurfaceNormal(U, O), i.tangent && (E = j.normalize(j.cross(O, x, E), E)))) : (x = y.geodeticSurfaceNormal(U, x), (i.tangent || i.bitangent) && (d && (lt = j.fromArray(_, A, lt), pt = j.cross(j.UNIT_Z, lt, pt), pt = j.normalize(X.multiplyByVector(D, pt, pt), pt), i.bitangent && (ct = j.normalize(j.cross(lt, pt, ct), ct))), E = j.cross(j.UNIT_Z, x, E), E = j.normalize(X.multiplyByVector(D, E, E), E), i.bitangent && (O = j.normalize(j.cross(x, E, O), O)))), i.normal && (t.wall ? (_[A + R] = x.x, _[V + R] = x.y, _[k + R] = x.z) : u && (_[A + R] = -x.x, _[V + R] = -x.y, _[k + R] = -x.z), (c && !d || p) && (_[A] = x.x, _[V] = x.y, _[k] = x.z)), a && (p && (x = y.geodeticSurfaceNormal(U, x)), I[A + R] = -x.x, I[V + R] = -x.y, I[k + R] = -x.z), i.tangent && (t.wall ? (b[A + R] = E.x, b[V + R] = E.y, b[k + R] = E.z) : u && (b[A + R] = -E.x, b[V + R] = -E.y, b[k + R] = -E.z), c && (d ? (b[A] = pt.x, b[V] = pt.y, b[k] = pt.z) : (b[A] = E.x, b[V] = E.y, b[k] = E.z))), i.bitangent && (u && (T[A + R] = O.x, T[V + R] = O.y, T[k + R] = O.z), c && (d ? (T[A] = ct.x, T[V] = ct.y, T[k] = ct.z) : (T[A] = O.x, T[V] = O.y, T[k] = O.z))), A += 3);
      }

      i.st && (n.attributes.st = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 2,
        values: f
      })), i.normal && (n.attributes.normal = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: _
      })), i.tangent && (n.attributes.tangent = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: b
      })), i.bitangent && (n.attributes.bitangent = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: T
      })), a && (n.attributes.extrudeDirection = new K({
        componentDatatype: q.FLOAT,
        componentsPerAttribute: 3,
        values: I
      }));
    }

    return t.extrude && Q(t.offsetAttribute) && (e = s.length / 3, r = new Uint8Array(e), t.offsetAttribute === Z.TOP ? c && u || p ? r = Y(r, 1, 0, e / 2) : c && (r = Y(r, 1)) : (o = t.offsetAttribute === Z.NONE ? 0 : 1, r = Y(r, o)), n.attributes.applyOffset = new K({
      componentDatatype: q.UNSIGNED_BYTE,
      componentsPerAttribute: 1,
      values: r
    })), n;
  }

  var m = new e(),
      d = new e(),
      v = {
    westOverIDL: 0,
    eastOverIDL: 0
  },
      T = new h();

  function a(t, e, o, r, i) {
    if (i = f(i, new y()), !Q(t) || t.length < 3) return i.west = 0, i.north = 0, i.south = 0, i.east = 0, i;
    if (o === u.RHUMB) return y.fromCartesianArray(t, e, i);
    T.ellipsoid.equals(e) || (T = new h(void 0, void 0, e)), i.west = Number.POSITIVE_INFINITY, i.east = Number.NEGATIVE_INFINITY, i.south = Number.POSITIVE_INFINITY, i.north = Number.NEGATIVE_INFINITY, v.westOverIDL = Number.POSITIVE_INFINITY, v.eastOverIDL = Number.NEGATIVE_INFINITY;

    for (var n, a = 1 / J.chordLength(r, e.maximumRadius), s = t.length, l = e.cartesianToCartographic(t[0], d), p = m, c = 1; c < s; c++) {
      n = p, p = l, l = e.cartesianToCartographic(t[c], n), T.setEndPoints(p, l), P(T, a, i, v);
    }

    return n = p, p = l, l = e.cartesianToCartographic(t[0], n), T.setEndPoints(p, l), P(T, a, i, v), i.east - i.west > v.eastOverIDL - v.westOverIDL && (i.west = v.westOverIDL, i.east = v.eastOverIDL, i.east > J.PI && (i.east = i.east - J.TWO_PI), i.west > J.PI && (i.west = i.west - J.TWO_PI)), i;
  }

  var I = new e();

  function P(t, e, o, r) {
    for (var i = t.surfaceDistance, n = Math.ceil(i * e), a = 0 < n ? i / (n - 1) : Number.POSITIVE_INFINITY, s = 0, l = 0; l < n; l++) {
      var p = t.interpolateUsingSurfaceDistance(s, I);
      s += a;
      var c = p.longitude,
          u = p.latitude;
      o.west = Math.min(o.west, c), o.east = Math.max(o.east, c), o.south = Math.min(o.south, u), o.north = Math.max(o.north, u);
      var g = 0 <= c ? c : c + J.TWO_PI;
      r.westOverIDL = Math.min(r.westOverIDL, g), r.eastOverIDL = Math.max(r.eastOverIDL, g);
    }
  }

  var vt = [];

  function A(t) {
    if (_.typeOf.object("options", t), _.typeOf.object("options.polygonHierarchy", t.polygonHierarchy), Q(t.perPositionHeight) && t.perPositionHeight && Q(t.height)) throw new g("Cannot use both options.perPositionHeight and options.height");
    if (Q(t.arcType) && t.arcType !== u.GEODESIC && t.arcType !== u.RHUMB) throw new g("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");
    var e,
        o = t.polygonHierarchy,
        r = f(t.vertexFormat, b.DEFAULT),
        i = f(t.ellipsoid, w.WGS84),
        n = f(t.granularity, J.RADIANS_PER_DEGREE),
        a = f(t.stRotation, 0),
        s = f(t.perPositionHeight, !1),
        l = s && Q(t.extrudedHeight),
        p = f(t.height, 0),
        c = f(t.extrudedHeight, p);
    l || (e = Math.max(p, c), c = Math.min(p, c), p = e), this._vertexFormat = b.clone(r), this._ellipsoid = w.clone(i), this._granularity = n, this._stRotation = a, this._height = p, this._extrudedHeight = c, this._closeTop = f(t.closeTop, !0), this._closeBottom = f(t.closeBottom, !0), this._polygonHierarchy = o, this._perPositionHeight = s, this._perPositionHeightExtrude = l, this._shadowVolume = f(t.shadowVolume, !1), this._workerName = "createPolygonGeometry", this._offsetAttribute = t.offsetAttribute, this._arcType = f(t.arcType, u.GEODESIC), this._rectangle = void 0, this._textureCoordinateRotationPoints = void 0, this.packedLength = V.computeHierarchyPackedLength(o) + w.packedLength + b.packedLength + 12;
  }

  A.fromPositions = function (t) {
    return t = f(t, f.EMPTY_OBJECT), _.defined("options.positions", t.positions), new A({
      polygonHierarchy: {
        positions: t.positions
      },
      height: t.height,
      extrudedHeight: t.extrudedHeight,
      vertexFormat: t.vertexFormat,
      stRotation: t.stRotation,
      ellipsoid: t.ellipsoid,
      granularity: t.granularity,
      perPositionHeight: t.perPositionHeight,
      closeTop: t.closeTop,
      closeBottom: t.closeBottom,
      offsetAttribute: t.offsetAttribute,
      arcType: t.arcType
    });
  }, A.pack = function (t, e, o) {
    return _.typeOf.object("value", t), _.defined("array", e), o = f(o, 0), o = V.packPolygonHierarchy(t._polygonHierarchy, e, o), w.pack(t._ellipsoid, e, o), o += w.packedLength, b.pack(t._vertexFormat, e, o), o += b.packedLength, e[o++] = t._height, e[o++] = t._extrudedHeight, e[o++] = t._granularity, e[o++] = t._stRotation, e[o++] = t._perPositionHeightExtrude ? 1 : 0, e[o++] = t._perPositionHeight ? 1 : 0, e[o++] = t._closeTop ? 1 : 0, e[o++] = t._closeBottom ? 1 : 0, e[o++] = t._shadowVolume ? 1 : 0, e[o++] = f(t._offsetAttribute, -1), e[o++] = t._arcType, e[o] = t.packedLength, e;
  };
  var x = w.clone(w.UNIT_SPHERE),
      E = new b(),
      O = {
    polygonHierarchy: {}
  };
  return A.unpack = function (t, e, o) {
    _.defined("array", t), e = f(e, 0);
    var r = V.unpackPolygonHierarchy(t, e);
    e = r.startingIndex, delete r.startingIndex;
    var i = w.unpack(t, e, x);
    e += w.packedLength;
    var n = b.unpack(t, e, E);
    e += b.packedLength;
    var a = t[e++],
        s = t[e++],
        l = t[e++],
        p = t[e++],
        c = 1 === t[e++],
        u = 1 === t[e++],
        g = 1 === t[e++],
        h = 1 === t[e++],
        y = 1 === t[e++],
        m = t[e++],
        d = t[e++],
        v = t[e];
    return Q(o) || (o = new A(O)), o._polygonHierarchy = r, o._ellipsoid = w.clone(i, o._ellipsoid), o._vertexFormat = b.clone(n, o._vertexFormat), o._height = a, o._extrudedHeight = s, o._granularity = l, o._stRotation = p, o._perPositionHeightExtrude = c, o._perPositionHeight = u, o._closeTop = g, o._closeBottom = h, o._shadowVolume = y, o._offsetAttribute = -1 === m ? void 0 : m, o._arcType = d, o.packedLength = v, o;
  }, A.computeRectangle = function (t, e) {
    _.typeOf.object("options", t), _.typeOf.object("options.polygonHierarchy", t.polygonHierarchy);
    var o = f(t.granularity, J.RADIANS_PER_DEGREE),
        r = f(t.arcType, u.GEODESIC);
    if (r !== u.GEODESIC && r !== u.RHUMB) throw new g("Invalid arcType. Valid options are ArcType.GEODESIC and ArcType.RHUMB.");
    var i = t.polygonHierarchy,
        n = f(t.ellipsoid, w.WGS84);
    return a(i.positions, n, r, o, e);
  }, A.createGeometry = function (t) {
    var e = t._vertexFormat,
        o = t._ellipsoid,
        r = t._granularity,
        i = t._stRotation,
        n = t._polygonHierarchy,
        a = t._perPositionHeight,
        s = t._closeTop,
        l = t._closeBottom,
        p = t._arcType,
        c = n.positions;

    if (!(c.length < 3)) {
      var u = L.fromPoints(c, o),
          g = V.polygonsFromHierarchy(n, u.projectPointsOntoPlane.bind(u), !a, o),
          h = g.hierarchy,
          y = g.polygons;

      if (0 !== h.length) {
        c = h[0].outerRing;
        var m,
            d = V.computeBoundingRectangle(u.plane.normal, u.projectPointOntoPlane.bind(u), c, i, z),
            v = [],
            _ = t._height,
            f = t._extrudedHeight,
            w = {
          perPositionHeight: a,
          vertexFormat: e,
          geometry: void 0,
          tangentPlane: u,
          boundingRectangle: d,
          ellipsoid: o,
          stRotation: i,
          bottom: !1,
          top: !0,
          wall: !1,
          extrude: !1,
          arcType: p
        };
        if (t._perPositionHeightExtrude || !J.equalsEpsilon(_, f, 0, J.EPSILON2)) for (w.extrude = !0, w.top = s, w.bottom = l, w.shadowVolume = t._shadowVolume, w.offsetAttribute = t._offsetAttribute, m = 0; m < y.length; m++) {
          var b,
              T = function (t, e, o, r, i, n, a, s, l) {
            var p = {
              walls: []
            };

            if (n || a) {
              var c = V.createGeometryFromPositions(t, e, o, i, s, l),
                  u = c.attributes.position.values,
                  g = c.indices;

              if (n && a) {
                var h,
                    y = u.concat(u),
                    m = y.length / 3;
                (h = B.createTypedArray(m, 2 * g.length)).set(g);

                for (var d, v = g.length, _ = m / 2, f = 0; f < v; f += 3) {
                  var w = h[f] + _,
                      b = h[f + 1] + _,
                      T = h[f + 2] + _;
                  h[f + v] = T, h[f + 1 + v] = b, h[f + 2 + v] = w;
                }

                c.attributes.position.values = y, i && s.normal && (d = c.attributes.normal.values, c.attributes.normal.values = new Float32Array(y.length), c.attributes.normal.values.set(d)), c.indices = h;
              } else if (a) {
                for (m = u.length / 3, h = B.createTypedArray(m, g.length), f = 0; f < g.length; f += 3) {
                  h[f] = g[f + 2], h[f + 1] = g[f + 1], h[f + 2] = g[f];
                }

                c.indices = h;
              }

              p.topAndBottom = new C({
                geometry: c
              });
            }

            var I = r.outerRing,
                P = L.fromPoints(I, t).projectPointsOntoPlane(I, vt);
            k.computeWindingOrder2D(P) === M.CLOCKWISE && (I = I.slice().reverse());
            var A = V.computeWallGeometry(I, t, o, i, l);
            p.walls.push(new C({
              geometry: A
            }));
            var x = r.holes;

            for (f = 0; f < x.length; f++) {
              var E = x[f],
                  P = L.fromPoints(E, t).projectPointsOntoPlane(E, vt);
              k.computeWindingOrder2D(P) === M.COUNTER_CLOCKWISE && (E = E.slice().reverse()), A = V.computeWallGeometry(E, t, o, i, l), p.walls.push(new C({
                geometry: A
              }));
            }

            return p;
          }(o, y[m], r, h[m], a, s, l, e, p);

          s && l ? (b = T.topAndBottom, w.geometry = V.scaleToGeodeticHeightExtruded(b.geometry, _, f, o, a)) : s ? ((b = T.topAndBottom).geometry.attributes.position.values = k.scaleToGeodeticHeight(b.geometry.attributes.position.values, _, o, !a), w.geometry = b.geometry) : l && ((b = T.topAndBottom).geometry.attributes.position.values = k.scaleToGeodeticHeight(b.geometry.attributes.position.values, f, o, !0), w.geometry = b.geometry), (s || l) && (w.wall = !1, b.geometry = U(w), v.push(b));
          var I = T.walls;
          w.wall = !0;

          for (var P = 0; P < I.length; P++) {
            var A = I[P];
            w.geometry = V.scaleToGeodeticHeightExtruded(A.geometry, _, f, o, a), A.geometry = U(w), v.push(A);
          }
        } else for (m = 0; m < y.length; m++) {
          var x,
              E,
              O,
              H = new C({
            geometry: V.createGeometryFromPositions(o, y[m], r, a, e, p)
          });
          H.geometry.attributes.position.values = k.scaleToGeodeticHeight(H.geometry.attributes.position.values, _, o, !a), w.geometry = H.geometry, H.geometry = U(w), Q(t._offsetAttribute) && (x = H.geometry.attributes.position.values.length, E = new Uint8Array(x / 3), O = t._offsetAttribute === Z.NONE ? 0 : 1, Y(E, O), H.geometry.attributes.applyOffset = new K({
            componentDatatype: q.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: E
          })), v.push(H);
        }
        var N = S.combineInstances(v)[0];
        N.attributes.position.values = new Float64Array(N.attributes.position.values), N.indices = B.createTypedArray(N.attributes.position.values.length / 3, N.indices);
        var D = N.attributes,
            R = F.fromVertices(D.position.values);
        return e.position || delete D.position, new G({
          attributes: D,
          indices: N.indices,
          primitiveType: N.primitiveType,
          boundingSphere: R,
          offsetAttribute: t._offsetAttribute
        });
      }
    }
  }, A.createShadowVolume = function (t, e, o) {
    var r = t._granularity,
        i = t._ellipsoid,
        n = e(r, i),
        a = o(r, i);
    return new A({
      polygonHierarchy: t._polygonHierarchy,
      ellipsoid: i,
      stRotation: t._stRotation,
      granularity: r,
      perPositionHeight: !1,
      extrudedHeight: n,
      height: a,
      vertexFormat: b.POSITION_ONLY,
      shadowVolume: !0,
      arcType: t._arcType
    });
  }, o(A.prototype, {
    rectangle: {
      get: function get() {
        var t;
        return Q(this._rectangle) || (t = this._polygonHierarchy.positions, this._rectangle = a(t, this._ellipsoid, this._arcType, this._granularity)), this._rectangle;
      }
    },
    textureCoordinateRotationPoints: {
      get: function get() {
        return Q(this._textureCoordinateRotationPoints) || (this._textureCoordinateRotationPoints = function (t) {
          var e = -t._stRotation;
          if (0 == e) return [0, 0, 0, 1, 1, 0];
          var o = t._ellipsoid,
              r = t._polygonHierarchy.positions,
              i = t.rectangle;
          return G._textureCoordinateRotationPoints(r, e, o, i);
        }(this)), this._textureCoordinateRotationPoints;
      }
    }
  }), A;
});