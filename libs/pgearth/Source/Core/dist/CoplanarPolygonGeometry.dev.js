"use strict";

define(["./arrayRemoveDuplicates", "./BoundingRectangle", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Check", "./ComponentDatatype", "./CoplanarPolygonGeometryLibrary", "./defaultValue", "./defined", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryInstance", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix3", "./PolygonGeometryLibrary", "./PolygonPipeline", "./PrimitiveType", "./Quaternion", "./VertexFormat"], function (F, e, x, G, I, l, O, T, p, c, y, B, C, z, _, k, S, N, j, L, M, V, Q, g) {
  "use strict";

  var U = new I(),
      D = new e(),
      Y = new G(),
      q = new G(),
      E = new I(),
      R = new I(),
      H = new I(),
      J = new I(),
      W = new I(),
      Z = new I(),
      K = new Q(),
      X = new j(),
      $ = new j(),
      ee = new I();

  function u(e) {
    var t = (e = p(e, p.EMPTY_OBJECT)).polygonHierarchy;
    l.defined("options.polygonHierarchy", t);
    var n = p(e.vertexFormat, g.DEFAULT);
    this._vertexFormat = g.clone(n), this._polygonHierarchy = t, this._stRotation = p(e.stRotation, 0), this._ellipsoid = y.clone(p(e.ellipsoid, y.WGS84)), this._workerName = "createCoplanarPolygonGeometry", this.packedLength = L.computeHierarchyPackedLength(t) + g.packedLength + y.packedLength + 2;
  }

  u.fromPositions = function (e) {
    return e = p(e, p.EMPTY_OBJECT), l.defined("options.positions", e.positions), new u({
      polygonHierarchy: {
        positions: e.positions
      },
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      ellipsoid: e.ellipsoid
    });
  }, u.pack = function (e, t, n) {
    return l.typeOf.object("value", e), l.defined("array", t), n = p(n, 0), n = L.packPolygonHierarchy(e._polygonHierarchy, t, n), y.pack(e._ellipsoid, t, n), n += y.packedLength, g.pack(e._vertexFormat, t, n), n += g.packedLength, t[n++] = e._stRotation, t[n] = e.packedLength, t;
  };
  var m = y.clone(y.UNIT_SPHERE),
      d = new g(),
      v = {
    polygonHierarchy: {}
  };
  return u.unpack = function (e, t, n) {
    l.defined("array", e), t = p(t, 0);
    var o = L.unpackPolygonHierarchy(e, t);
    t = o.startingIndex, delete o.startingIndex;
    var r = y.unpack(e, t, m);
    t += y.packedLength;
    var a = g.unpack(e, t, d);
    t += g.packedLength;
    var i = e[t++],
        s = e[t];
    return c(n) || (n = new u(v)), n._polygonHierarchy = o, n._ellipsoid = y.clone(r, n._ellipsoid), n._vertexFormat = g.clone(a, n._vertexFormat), n._stRotation = i, n.packedLength = s, n;
  }, u.createGeometry = function (e) {
    var t = e._vertexFormat,
        n = e._polygonHierarchy,
        o = e._stRotation,
        r = n.positions;

    if (!((r = F(r, I.equalsEpsilon, !0)).length < 3)) {
      var a = E,
          i = R,
          s = H,
          l = W,
          p = Z;

      if (T.computeProjectTo2DArguments(r, J, l, p)) {
        var c,
            a = I.cross(l, p, a);
        a = I.normalize(a, a), I.equalsEpsilon(J, I.ZERO, N.EPSILON6) || (c = e._ellipsoid.geodeticSurfaceNormal(J, ee), I.dot(a, c) < 0 && (a = I.negate(a, a), l = I.negate(l, l)));
        var y = T.createProjectPointsTo2DFunction(J, l, p),
            g = T.createProjectPointTo2DFunction(J, l, p);
        t.tangent && (i = I.clone(l, i)), t.bitangent && (s = I.clone(p, s));
        var u = L.polygonsFromHierarchy(n, y, !1),
            m = u.hierarchy,
            d = u.polygons;

        if (0 !== m.length) {
          r = m[0].outerRing;

          for (var v = x.fromPoints(r), h = L.computeBoundingRectangle(a, g, r, o, D), w = [], f = 0; f < d.length; f++) {
            var b = new _({
              geometry: function (e, t, n, o, r, a, i, s) {
                var l = e.positions,
                    p = M.triangulate(e.positions2D, e.holes);
                p.length < 3 && (p = [0, 1, 2]);
                var c = S.createTypedArray(l.length, p.length);
                c.set(p);
                var y,
                    g,
                    u = X;
                0 !== o ? (y = Q.fromAxisAngle(a, o, K), u = j.fromQuaternion(y, u), (t.tangent || t.bitangent) && (y = Q.fromAxisAngle(a, -o, K), g = j.fromQuaternion(y, $), i = I.normalize(j.multiplyByVector(g, i, i), i), t.bitangent && (s = I.normalize(I.cross(a, i, s), s)))) : u = j.clone(j.IDENTITY, u);
                var m = q;
                t.st && (m.x = n.x, m.y = n.y);

                for (var d = l.length, v = 3 * d, h = new Float64Array(v), w = t.normal ? new Float32Array(v) : void 0, f = t.tangent ? new Float32Array(v) : void 0, b = t.bitangent ? new Float32Array(v) : void 0, A = t.st ? new Float32Array(2 * d) : void 0, P = 0, F = 0, x = 0, T = 0, _ = 0, k = 0; k < d; k++) {
                  var L,
                      D,
                      E,
                      R = l[k];
                  h[P++] = R.x, h[P++] = R.y, h[P++] = R.z, t.st && (L = r(j.multiplyByVector(u, R, U), Y), G.subtract(L, m, L), D = N.clamp(L.x / n.width, 0, 1), E = N.clamp(L.y / n.height, 0, 1), A[_++] = D, A[_++] = E), t.normal && (w[F++] = a.x, w[F++] = a.y, w[F++] = a.z), t.tangent && (f[T++] = i.x, f[T++] = i.y, f[T++] = i.z), t.bitangent && (b[x++] = s.x, b[x++] = s.y, b[x++] = s.z);
                }

                var H = new z();
                return t.position && (H.position = new C({
                  componentDatatype: O.DOUBLE,
                  componentsPerAttribute: 3,
                  values: h
                })), t.normal && (H.normal = new C({
                  componentDatatype: O.FLOAT,
                  componentsPerAttribute: 3,
                  values: w
                })), t.tangent && (H.tangent = new C({
                  componentDatatype: O.FLOAT,
                  componentsPerAttribute: 3,
                  values: f
                })), t.bitangent && (H.bitangent = new C({
                  componentDatatype: O.FLOAT,
                  componentsPerAttribute: 3,
                  values: b
                })), t.st && (H.st = new C({
                  componentDatatype: O.FLOAT,
                  componentsPerAttribute: 2,
                  values: A
                })), new B({
                  attributes: H,
                  indices: c,
                  primitiveType: V.TRIANGLES
                });
              }(d[f], t, h, o, g, a, i, s)
            });
            w.push(b);
          }

          var A = k.combineInstances(w)[0];
          A.attributes.position.values = new Float64Array(A.attributes.position.values), A.indices = S.createTypedArray(A.attributes.position.values.length / 3, A.indices);
          var P = A.attributes;
          return t.position || delete P.position, new B({
            attributes: P,
            indices: A.indices,
            primitiveType: A.primitiveType,
            boundingSphere: v
          });
        }
      }
    }
  }, u;
});