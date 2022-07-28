"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PrimitiveType"], function (M, G, f, D, u, I, d, z, L, N, q, x, B, C, S) {
  "use strict";

  var s = new f(1, 1, 1),
      U = Math.cos,
      F = Math.sin;

  function c(t) {
    t = u(t, u.EMPTY_OBJECT);
    var i = u(t.radii, s),
        e = Math.round(u(t.stackPartitions, 10)),
        r = Math.round(u(t.slicePartitions, 8)),
        o = Math.round(u(t.subdivisions, 128));
    if (e < 1) throw new d("options.stackPartitions cannot be less than 1");
    if (r < 0) throw new d("options.slicePartitions cannot be less than 0");
    if (o < 0) throw new d("options.subdivisions must be greater than or equal to zero.");
    if (I(t.offsetAttribute) && t.offsetAttribute === x.TOP) throw new d("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");
    this._radii = f.clone(i), this._stackPartitions = e, this._slicePartitions = r, this._subdivisions = o, this._offsetAttribute = t.offsetAttribute, this._workerName = "createEllipsoidOutlineGeometry";
  }

  c.packedLength = f.packedLength + 4, c.pack = function (t, i, e) {
    if (!I(t)) throw new d("value is required");
    if (!I(i)) throw new d("array is required");
    return e = u(e, 0), f.pack(t._radii, i, e), e += f.packedLength, i[e++] = t._stackPartitions, i[e++] = t._slicePartitions, i[e++] = t._subdivisions, i[e] = u(t._offsetAttribute, -1), i;
  };
  var p = new f(),
      h = {
    radii: p,
    stackPartitions: void 0,
    slicePartitions: void 0,
    subdivisions: void 0,
    offsetAttribute: void 0
  };
  return c.unpack = function (t, i, e) {
    if (!I(t)) throw new d("array is required");
    i = u(i, 0);
    var r = f.unpack(t, i, p);
    i += f.packedLength;
    var o = t[i++],
        s = t[i++],
        n = t[i++],
        a = t[i];
    return I(e) ? (e._radii = f.clone(r, e._radii), e._stackPartitions = o, e._slicePartitions = s, e._subdivisions = n, e._offsetAttribute = -1 === a ? void 0 : a, e) : (h.stackPartitions = o, h.slicePartitions = s, h.subdivisions = n, h.offsetAttribute = -1 === a ? void 0 : a, new c(h));
  }, c.createGeometry = function (t) {
    var i = t._radii;

    if (!(i.x <= 0 || i.y <= 0 || i.z <= 0)) {
      for (var e, r, o, s, n = z.fromCartesian3(i), a = t._stackPartitions, f = t._slicePartitions, u = t._subdivisions, d = u * (a + f - 1), c = d - f + 2, p = new Float64Array(3 * c), h = B.createTypedArray(c, 2 * d), l = 0, b = new Array(u), v = new Array(u), _ = 0; _ < u; _++) {
        e = C.TWO_PI * _ / u, b[_] = U(e), v[_] = F(e);
      }

      for (_ = 1; _ < a; _++) {
        for (r = Math.PI * _ / a, o = U(r), s = F(r), w = 0; w < u; w++) {
          p[l++] = i.x * b[w] * s, p[l++] = i.y * v[w] * s, p[l++] = i.z * o;
        }
      }

      for (b.length = f, v.length = f, _ = 0; _ < f; _++) {
        e = C.TWO_PI * _ / f, b[_] = U(e), v[_] = F(e);
      }

      for (p[l++] = 0, p[l++] = 0, p[l++] = i.z, _ = 1; _ < u; _++) {
        for (r = Math.PI * _ / u, o = U(r), s = F(r), w = 0; w < f; w++) {
          p[l++] = i.x * b[w] * s, p[l++] = i.y * v[w] * s, p[l++] = i.z * o;
        }
      }

      for (p[l++] = 0, p[l++] = 0, p[l++] = -i.z, _ = l = 0; _ < a - 1; ++_) {
        for (var y = _ * u, w = 0; w < u - 1; ++w) {
          h[l++] = y + w, h[l++] = y + w + 1;
        }

        h[l++] = y + u - 1, h[l++] = y;
      }

      var P = u * (a - 1);

      for (w = 1; w < f + 1; ++w) {
        h[l++] = P, h[l++] = P + w;
      }

      for (_ = 0; _ < u - 2; ++_) {
        var A = _ * f + 1 + P,
            m = (_ + 1) * f + 1 + P;

        for (w = 0; w < f - 1; ++w) {
          h[l++] = m + w, h[l++] = A + w;
        }

        h[l++] = m + f - 1, h[l++] = A + f - 1;
      }

      var k = p.length / 3 - 1;

      for (w = k - 1; k - f - 1 < w; --w) {
        h[l++] = k, h[l++] = w;
      }

      var g,
          E,
          O,
          T = new q({
        position: new N({
          componentDatatype: D.DOUBLE,
          componentsPerAttribute: 3,
          values: p
        })
      });
      return I(t._offsetAttribute) && (g = p.length, E = new Uint8Array(g / 3), O = t._offsetAttribute === x.NONE ? 0 : 1, M(E, O), T.applyOffset = new N({
        componentDatatype: D.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: E
      })), new L({
        attributes: T,
        indices: h,
        primitiveType: S.LINES,
        boundingSphere: G.fromEllipsoid(n),
        offsetAttribute: t._offsetAttribute
      });
    }
  }, c;
});