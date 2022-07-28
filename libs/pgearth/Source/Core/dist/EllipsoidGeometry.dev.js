"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PrimitiveType", "./VertexFormat"], function (B, q, Y, V, W, c, J, f, R, X, Z, j, H, K, Q, $, u) {
  "use strict";

  var tt = new V(),
      et = new V(),
      rt = new V(),
      at = new V(),
      nt = new V(),
      i = new V(1, 1, 1),
      it = Math.cos,
      ot = Math.sin;

  function p(t) {
    t = c(t, c.EMPTY_OBJECT);
    var e = c(t.radii, i),
        r = Math.round(c(t.stackPartitions, 64)),
        a = Math.round(c(t.slicePartitions, 64)),
        n = c(t.vertexFormat, u.DEFAULT);
    if (a < 3) throw new f("options.slicePartitions cannot be less than three.");
    if (r < 3) throw new f("options.stackPartitions cannot be less than three.");
    if (J(t.offsetAttribute) && t.offsetAttribute === H.TOP) throw new f("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");
    this._radii = V.clone(e), this._stackPartitions = r, this._slicePartitions = a, this._vertexFormat = u.clone(n), this._offsetAttribute = t.offsetAttribute, this._workerName = "createEllipsoidGeometry";
  }

  p.packedLength = V.packedLength + u.packedLength + 3, p.pack = function (t, e, r) {
    if (!J(t)) throw new f("value is required");
    if (!J(e)) throw new f("array is required");
    return r = c(r, 0), V.pack(t._radii, e, r), r += V.packedLength, u.pack(t._vertexFormat, e, r), r += u.packedLength, e[r++] = t._stackPartitions, e[r++] = t._slicePartitions, e[r] = c(t._offsetAttribute, -1), e;
  };
  var t,
      l = new V(),
      m = new u(),
      d = {
    radii: l,
    vertexFormat: m,
    stackPartitions: void 0,
    slicePartitions: void 0,
    offsetAttribute: void 0
  };
  return p.unpack = function (t, e, r) {
    if (!J(t)) throw new f("array is required");
    e = c(e, 0);
    var a = V.unpack(t, e, l);
    e += V.packedLength;
    var n = u.unpack(t, e, m);
    e += u.packedLength;
    var i = t[e++],
        o = t[e++],
        s = t[e];
    return J(r) ? (r._radii = V.clone(a, r._radii), r._vertexFormat = u.clone(n, r._vertexFormat), r._stackPartitions = i, r._slicePartitions = o, r._offsetAttribute = -1 === s ? void 0 : s, r) : (d.stackPartitions = i, d.slicePartitions = o, d.offsetAttribute = -1 === s ? void 0 : s, new p(d));
  }, p.createGeometry = function (t) {
    var e = t._radii;

    if (!(e.x <= 0 || e.y <= 0 || e.z <= 0)) {
      for (var r = R.fromCartesian3(e), a = t._vertexFormat, n = t._slicePartitions + 1, i = t._stackPartitions + 1, o = i * n, s = new Float64Array(3 * o), c = 6 * (n - 1) * (i - 2), f = K.createTypedArray(o, c), u = a.normal ? new Float32Array(3 * o) : void 0, p = a.tangent ? new Float32Array(3 * o) : void 0, l = a.bitangent ? new Float32Array(3 * o) : void 0, m = a.st ? new Float32Array(2 * o) : void 0, d = new Array(n), y = new Array(n), v = 0, w = 0; w < n; w++) {
        var A = Q.TWO_PI * w / (n - 1);
        d[w] = it(A), y[w] = ot(A), s[v++] = 0, s[v++] = 0, s[v++] = e.z;
      }

      for (w = 1; w < i - 1; w++) {
        for (var h = Math.PI * w / (i - 1), b = ot(h), P = e.x * b, _ = e.y * b, g = e.z * it(h), k = 0; k < n; k++) {
          s[v++] = d[k] * P, s[v++] = y[k] * _, s[v++] = g;
        }
      }

      for (w = 0; w < n; w++) {
        s[v++] = 0, s[v++] = 0, s[v++] = -e.z;
      }

      var F = new j();
      a.position && (F.position = new Z({
        componentDatatype: W.DOUBLE,
        componentsPerAttribute: 3,
        values: s
      }));
      var T,
          O,
          x,
          L,
          E,
          N = 0,
          D = 0,
          I = 0,
          M = 0;

      if (a.st || a.normal || a.tangent || a.bitangent) {
        for (w = 0; w < o; w++) {
          var z,
              G,
              S,
              U = V.fromArray(s, 3 * w, tt),
              C = r.geodeticSurfaceNormal(U, et);
          a.st && (z = Y.negate(C, nt), Y.magnitude(z) < Q.EPSILON6 && ((v = 3 * (w + n * Math.floor(.5 * i))) > s.length && (v = 3 * (w - n * Math.floor(.5 * i))), V.fromArray(s, v, z), r.geodeticSurfaceNormal(z, z), Y.negate(z, z)), m[N++] = Math.atan2(z.y, z.x) / Q.TWO_PI + .5, m[N++] = Math.asin(C.z) / Math.PI + .5), a.normal && (u[D++] = C.x, u[D++] = C.y, u[D++] = C.z), (a.tangent || a.bitangent) && (G = rt, w < n || o - n - 1 < w ? V.cross(V.UNIT_X, C, G) : V.cross(V.UNIT_Z, C, G), V.normalize(G, G), a.tangent && (p[I++] = G.x, p[I++] = G.y, p[I++] = G.z), a.bitangent && (S = V.cross(C, G, at), V.normalize(S, S), l[M++] = S.x, l[M++] = S.y, l[M++] = S.z));
        }

        a.st && (F.st = new Z({
          componentDatatype: W.FLOAT,
          componentsPerAttribute: 2,
          values: m
        })), a.normal && (F.normal = new Z({
          componentDatatype: W.FLOAT,
          componentsPerAttribute: 3,
          values: u
        })), a.tangent && (F.tangent = new Z({
          componentDatatype: W.FLOAT,
          componentsPerAttribute: 3,
          values: p
        })), a.bitangent && (F.bitangent = new Z({
          componentDatatype: W.FLOAT,
          componentsPerAttribute: 3,
          values: l
        }));
      }

      for (J(t._offsetAttribute) && (T = s.length, O = new Uint8Array(T / 3), x = t._offsetAttribute === H.NONE ? 0 : 1, B(O, x), F.applyOffset = new Z({
        componentDatatype: W.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: O
      })), k = v = 0; k < n - 1; k++) {
        f[v++] = n + k, f[v++] = n + k + 1, f[v++] = k + 1;
      }

      for (w = 1; w < i - 2; w++) {
        for (L = w * n, E = (w + 1) * n, k = 0; k < n - 1; k++) {
          f[v++] = E + k, f[v++] = E + k + 1, f[v++] = L + k + 1, f[v++] = E + k, f[v++] = L + k + 1, f[v++] = L + k;
        }
      }

      for (L = (w = i - 2) * n, E = (w + 1) * n, k = 0; k < n - 1; k++) {
        f[v++] = E + k, f[v++] = L + k + 1, f[v++] = L + k;
      }

      return new X({
        attributes: F,
        indices: f,
        primitiveType: $.TRIANGLES,
        boundingSphere: q.fromEllipsoid(r),
        offsetAttribute: t._offsetAttribute
      });
    }
  }, p.getUnitEllipsoid = function () {
    return J(t) || (t = p.createGeometry(new p({
      radii: new V(1, 1, 1),
      vertexFormat: u.POSITION_ONLY
    }))), t;
  }, p;
});