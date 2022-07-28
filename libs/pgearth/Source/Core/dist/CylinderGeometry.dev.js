"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./CylinderGeometryLibrary", "./defaultValue", "./defined", "./DeveloperError", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PrimitiveType", "./VertexFormat"], function (U, S, q, B, Y, V, f, Z, m, J, W, j, H, K, Q, X, p) {
  "use strict";

  var $ = new q(),
      tt = new B(),
      et = new B(),
      nt = new B(),
      ot = new B();

  function d(t) {
    var e = (t = f(t, f.EMPTY_OBJECT)).length,
        n = t.topRadius,
        o = t.bottomRadius,
        r = f(t.vertexFormat, p.DEFAULT),
        a = f(t.slices, 128);
    if (!Z(e)) throw new m("options.length must be defined.");
    if (!Z(n)) throw new m("options.topRadius must be defined.");
    if (!Z(o)) throw new m("options.bottomRadius must be defined.");
    if (a < 3) throw new m("options.slices must be greater than or equal to 3.");
    if (Z(t.offsetAttribute) && t.offsetAttribute === H.TOP) throw new m("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");
    this._length = e, this._topRadius = n, this._bottomRadius = o, this._vertexFormat = p.clone(r), this._slices = a, this._offsetAttribute = t.offsetAttribute, this._workerName = "createCylinderGeometry";
  }

  d.packedLength = p.packedLength + 5, d.pack = function (t, e, n) {
    if (!Z(t)) throw new m("value is required");
    if (!Z(e)) throw new m("array is required");
    return n = f(n, 0), p.pack(t._vertexFormat, e, n), n += p.packedLength, e[n++] = t._length, e[n++] = t._topRadius, e[n++] = t._bottomRadius, e[n++] = t._slices, e[n] = f(t._offsetAttribute, -1), e;
  };
  var t,
      l = new p(),
      b = {
    vertexFormat: l,
    length: void 0,
    topRadius: void 0,
    bottomRadius: void 0,
    slices: void 0,
    offsetAttribute: void 0
  };
  return d.unpack = function (t, e, n) {
    if (!Z(t)) throw new m("array is required");
    e = f(e, 0);
    var o = p.unpack(t, e, l);
    e += p.packedLength;
    var r = t[e++],
        a = t[e++],
        i = t[e++],
        s = t[e++],
        u = t[e];
    return Z(n) ? (n._vertexFormat = p.clone(o, n._vertexFormat), n._length = r, n._topRadius = a, n._bottomRadius = i, n._slices = s, n._offsetAttribute = -1 === u ? void 0 : u, n) : (b.length = r, b.topRadius = a, b.bottomRadius = i, b.slices = s, b.offsetAttribute = -1 === u ? void 0 : u, new d(b));
  }, d.createGeometry = function (t) {
    var e = t._length,
        n = t._topRadius,
        o = t._bottomRadius,
        r = t._vertexFormat,
        a = t._slices;

    if (!(e <= 0 || n < 0 || o < 0 || 0 === n && 0 === o)) {
      var i = a + a,
          s = a + i,
          u = i + i,
          f = V.computePositions(e, n, o, a, !0),
          m = r.st ? new Float32Array(2 * u) : void 0,
          p = r.normal ? new Float32Array(3 * u) : void 0,
          d = r.tangent ? new Float32Array(3 * u) : void 0,
          l = r.bitangent ? new Float32Array(3 * u) : void 0,
          b = r.normal || r.tangent || r.bitangent;

      if (b) {
        var c = r.tangent || r.bitangent,
            v = 0,
            y = 0,
            h = 0,
            w = Math.atan2(o - n, e),
            g = tt;
        g.z = Math.sin(w);

        for (var A = Math.cos(w), _ = nt, x = et, R = 0; R < a; R++) {
          var F = R / a * Q.TWO_PI,
              O = A * Math.cos(F),
              T = A * Math.sin(F);
          b && (g.x = O, g.y = T, c && (_ = B.normalize(B.cross(B.UNIT_Z, g, _), _)), r.normal && (p[v++] = g.x, p[v++] = g.y, p[v++] = g.z, p[v++] = g.x, p[v++] = g.y, p[v++] = g.z), r.tangent && (d[y++] = _.x, d[y++] = _.y, d[y++] = _.z, d[y++] = _.x, d[y++] = _.y, d[y++] = _.z), r.bitangent && (x = B.normalize(B.cross(g, _, x), x), l[h++] = x.x, l[h++] = x.y, l[h++] = x.z, l[h++] = x.x, l[h++] = x.y, l[h++] = x.z));
        }

        for (R = 0; R < a; R++) {
          r.normal && (p[v++] = 0, p[v++] = 0, p[v++] = -1), r.tangent && (d[y++] = 1, d[y++] = 0, d[y++] = 0), r.bitangent && (l[h++] = 0, l[h++] = -1, l[h++] = 0);
        }

        for (R = 0; R < a; R++) {
          r.normal && (p[v++] = 0, p[v++] = 0, p[v++] = 1), r.tangent && (d[y++] = 1, d[y++] = 0, d[y++] = 0), r.bitangent && (l[h++] = 0, l[h++] = 1, l[h++] = 0);
        }
      }

      var L = 12 * a - 12,
          P = K.createTypedArray(u, L),
          D = 0,
          G = 0;

      for (R = 0; R < a - 1; R++) {
        P[D++] = G, P[D++] = G + 2, P[D++] = G + 3, P[D++] = G, P[D++] = G + 3, P[D++] = G + 1, G += 2;
      }

      for (P[D++] = i - 2, P[D++] = 0, P[D++] = 1, P[D++] = i - 2, P[D++] = 1, P[D++] = i - 1, R = 1; R < a - 1; R++) {
        P[D++] = i + R + 1, P[D++] = i + R, P[D++] = i;
      }

      for (R = 1; R < a - 1; R++) {
        P[D++] = s, P[D++] = s + R, P[D++] = s + R + 1;
      }

      var E = 0;

      if (r.st) {
        var k = Math.max(n, o);

        for (R = 0; R < u; R++) {
          var z = B.fromArray(f, 3 * R, ot);
          m[E++] = (z.x + k) / (2 * k), m[E++] = (z.y + k) / (2 * k);
        }
      }

      var M = new j();
      r.position && (M.position = new W({
        componentDatatype: Y.DOUBLE,
        componentsPerAttribute: 3,
        values: f
      })), r.normal && (M.normal = new W({
        componentDatatype: Y.FLOAT,
        componentsPerAttribute: 3,
        values: p
      })), r.tangent && (M.tangent = new W({
        componentDatatype: Y.FLOAT,
        componentsPerAttribute: 3,
        values: d
      })), r.bitangent && (M.bitangent = new W({
        componentDatatype: Y.FLOAT,
        componentsPerAttribute: 3,
        values: l
      })), r.st && (M.st = new W({
        componentDatatype: Y.FLOAT,
        componentsPerAttribute: 2,
        values: m
      })), $.x = .5 * e, $.y = Math.max(o, n);
      var N,
          C,
          I = new S(B.ZERO, q.magnitude($));
      return Z(t._offsetAttribute) && (e = f.length, N = new Uint8Array(e / 3), C = t._offsetAttribute === H.NONE ? 0 : 1, U(N, C), M.applyOffset = new W({
        componentDatatype: Y.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: N
      })), new J({
        attributes: M,
        indices: P,
        primitiveType: X.TRIANGLES,
        boundingSphere: I,
        offsetAttribute: t._offsetAttribute
      });
    }
  }, d.getUnitCylinder = function () {
    return Z(t) || (t = d.createGeometry(new d({
      topRadius: 1,
      bottomRadius: 1,
      length: 1,
      vertexFormat: p.POSITION_ONLY
    }))), t;
  }, d;
});