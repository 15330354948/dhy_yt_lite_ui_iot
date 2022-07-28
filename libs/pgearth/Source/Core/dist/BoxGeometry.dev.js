"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./PrimitiveType", "./VertexFormat"], function (b, l, d, m, v, u, z, i, w, g, O, _, h, s) {
  "use strict";

  var F = new d();

  function y(e) {
    var t = (e = u(e, u.EMPTY_OBJECT)).minimum,
        n = e.maximum;
    if (m.typeOf.object("min", t), m.typeOf.object("max", n), z(e.offsetAttribute) && e.offsetAttribute === _.TOP) throw new i("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");
    var r = u(e.vertexFormat, s.DEFAULT);
    this._minimum = d.clone(t), this._maximum = d.clone(n), this._vertexFormat = r, this._offsetAttribute = e.offsetAttribute, this._workerName = "createBoxGeometry";
  }

  y.fromDimensions = function (e) {
    var t = (e = u(e, u.EMPTY_OBJECT)).dimensions;
    m.typeOf.object("dimensions", t), m.typeOf.number.greaterThanOrEquals("dimensions.x", t.x, 0), m.typeOf.number.greaterThanOrEquals("dimensions.y", t.y, 0), m.typeOf.number.greaterThanOrEquals("dimensions.z", t.z, 0);
    var n = d.multiplyByScalar(t, .5, new d());
    return new y({
      minimum: d.negate(n, new d()),
      maximum: n,
      vertexFormat: e.vertexFormat,
      offsetAttribute: e.offsetAttribute
    });
  }, y.fromAxisAlignedBoundingBox = function (e) {
    return m.typeOf.object("boundingBox", e), new y({
      minimum: e.minimum,
      maximum: e.maximum
    });
  }, y.packedLength = 2 * d.packedLength + s.packedLength + 1, y.pack = function (e, t, n) {
    return m.typeOf.object("value", e), m.defined("array", t), n = u(n, 0), d.pack(e._minimum, t, n), d.pack(e._maximum, t, n + d.packedLength), s.pack(e._vertexFormat, t, n + 2 * d.packedLength), t[n + 2 * d.packedLength + s.packedLength] = u(e._offsetAttribute, -1), t;
  };
  var e,
      p = new d(),
      f = new d(),
      x = new s(),
      c = {
    minimum: p,
    maximum: f,
    vertexFormat: x,
    offsetAttribute: void 0
  };
  return y.unpack = function (e, t, n) {
    m.defined("array", e), t = u(t, 0);
    var r = d.unpack(e, t, p),
        i = d.unpack(e, t + d.packedLength, f),
        a = s.unpack(e, t + 2 * d.packedLength, x),
        o = e[t + 2 * d.packedLength + s.packedLength];
    return z(n) ? (n._minimum = d.clone(r, n._minimum), n._maximum = d.clone(i, n._maximum), n._vertexFormat = s.clone(a, n._vertexFormat), n._offsetAttribute = -1 === o ? void 0 : o, n) : (c.offsetAttribute = -1 === o ? void 0 : o, new y(c));
  }, y.createGeometry = function (e) {
    var t = e._minimum,
        n = e._maximum,
        r = e._vertexFormat;

    if (!d.equals(t, n)) {
      var i,
          a,
          o,
          m,
          u,
          s,
          y = new O();
      r.position && (r.st || r.normal || r.tangent || r.bitangent) ? (r.position && ((a = new Float64Array(72))[0] = t.x, a[1] = t.y, a[2] = n.z, a[3] = n.x, a[4] = t.y, a[5] = n.z, a[6] = n.x, a[7] = n.y, a[8] = n.z, a[9] = t.x, a[10] = n.y, a[11] = n.z, a[12] = t.x, a[13] = t.y, a[14] = t.z, a[15] = n.x, a[16] = t.y, a[17] = t.z, a[18] = n.x, a[19] = n.y, a[20] = t.z, a[21] = t.x, a[22] = n.y, a[23] = t.z, a[24] = n.x, a[25] = t.y, a[26] = t.z, a[27] = n.x, a[28] = n.y, a[29] = t.z, a[30] = n.x, a[31] = n.y, a[32] = n.z, a[33] = n.x, a[34] = t.y, a[35] = n.z, a[36] = t.x, a[37] = t.y, a[38] = t.z, a[39] = t.x, a[40] = n.y, a[41] = t.z, a[42] = t.x, a[43] = n.y, a[44] = n.z, a[45] = t.x, a[46] = t.y, a[47] = n.z, a[48] = t.x, a[49] = n.y, a[50] = t.z, a[51] = n.x, a[52] = n.y, a[53] = t.z, a[54] = n.x, a[55] = n.y, a[56] = n.z, a[57] = t.x, a[58] = n.y, a[59] = n.z, a[60] = t.x, a[61] = t.y, a[62] = t.z, a[63] = n.x, a[64] = t.y, a[65] = t.z, a[66] = n.x, a[67] = t.y, a[68] = n.z, a[69] = t.x, a[70] = t.y, a[71] = n.z, y.position = new g({
        componentDatatype: v.DOUBLE,
        componentsPerAttribute: 3,
        values: a
      })), r.normal && ((o = new Float32Array(72))[0] = 0, o[1] = 0, o[2] = 1, o[3] = 0, o[4] = 0, o[5] = 1, o[6] = 0, o[7] = 0, o[8] = 1, o[9] = 0, o[10] = 0, o[11] = 1, o[12] = 0, o[13] = 0, o[14] = -1, o[15] = 0, o[16] = 0, o[17] = -1, o[18] = 0, o[19] = 0, o[20] = -1, o[21] = 0, o[22] = 0, o[23] = -1, o[24] = 1, o[25] = 0, o[26] = 0, o[27] = 1, o[28] = 0, o[29] = 0, o[30] = 1, o[31] = 0, o[32] = 0, o[33] = 1, o[34] = 0, o[35] = 0, o[36] = -1, o[37] = 0, o[38] = 0, o[39] = -1, o[40] = 0, o[41] = 0, o[42] = -1, o[43] = 0, o[44] = 0, o[45] = -1, o[46] = 0, o[47] = 0, o[48] = 0, o[49] = 1, o[50] = 0, o[51] = 0, o[52] = 1, o[53] = 0, o[54] = 0, o[55] = 1, o[56] = 0, o[57] = 0, o[58] = 1, o[59] = 0, o[60] = 0, o[61] = -1, o[62] = 0, o[63] = 0, o[64] = -1, o[65] = 0, o[66] = 0, o[67] = -1, o[68] = 0, o[69] = 0, o[70] = -1, o[71] = 0, y.normal = new g({
        componentDatatype: v.FLOAT,
        componentsPerAttribute: 3,
        values: o
      })), r.st && ((m = new Float32Array(48))[0] = 0, m[1] = 0, m[2] = 1, m[3] = 0, m[4] = 1, m[5] = 1, m[6] = 0, m[7] = 1, m[8] = 1, m[9] = 0, m[10] = 0, m[11] = 0, m[12] = 0, m[13] = 1, m[14] = 1, m[15] = 1, m[16] = 0, m[17] = 0, m[18] = 1, m[19] = 0, m[20] = 1, m[21] = 1, m[22] = 0, m[23] = 1, m[24] = 1, m[25] = 0, m[26] = 0, m[27] = 0, m[28] = 0, m[29] = 1, m[30] = 1, m[31] = 1, m[32] = 1, m[33] = 0, m[34] = 0, m[35] = 0, m[36] = 0, m[37] = 1, m[38] = 1, m[39] = 1, m[40] = 0, m[41] = 0, m[42] = 1, m[43] = 0, m[44] = 1, m[45] = 1, m[46] = 0, m[47] = 1, y.st = new g({
        componentDatatype: v.FLOAT,
        componentsPerAttribute: 2,
        values: m
      })), r.tangent && ((u = new Float32Array(72))[0] = 1, u[1] = 0, u[2] = 0, u[3] = 1, u[4] = 0, u[5] = 0, u[6] = 1, u[7] = 0, u[8] = 0, u[9] = 1, u[10] = 0, u[11] = 0, u[12] = -1, u[13] = 0, u[14] = 0, u[15] = -1, u[16] = 0, u[17] = 0, u[18] = -1, u[19] = 0, u[20] = 0, u[21] = -1, u[22] = 0, u[23] = 0, u[24] = 0, u[25] = 1, u[26] = 0, u[27] = 0, u[28] = 1, u[29] = 0, u[30] = 0, u[31] = 1, u[32] = 0, u[33] = 0, u[34] = 1, u[35] = 0, u[36] = 0, u[37] = -1, u[38] = 0, u[39] = 0, u[40] = -1, u[41] = 0, u[42] = 0, u[43] = -1, u[44] = 0, u[45] = 0, u[46] = -1, u[47] = 0, u[48] = -1, u[49] = 0, u[50] = 0, u[51] = -1, u[52] = 0, u[53] = 0, u[54] = -1, u[55] = 0, u[56] = 0, u[57] = -1, u[58] = 0, u[59] = 0, u[60] = 1, u[61] = 0, u[62] = 0, u[63] = 1, u[64] = 0, u[65] = 0, u[66] = 1, u[67] = 0, u[68] = 0, u[69] = 1, u[70] = 0, u[71] = 0, y.tangent = new g({
        componentDatatype: v.FLOAT,
        componentsPerAttribute: 3,
        values: u
      })), r.bitangent && ((s = new Float32Array(72))[0] = 0, s[1] = 1, s[2] = 0, s[3] = 0, s[4] = 1, s[5] = 0, s[6] = 0, s[7] = 1, s[8] = 0, s[9] = 0, s[10] = 1, s[11] = 0, s[12] = 0, s[13] = 1, s[14] = 0, s[15] = 0, s[16] = 1, s[17] = 0, s[18] = 0, s[19] = 1, s[20] = 0, s[21] = 0, s[22] = 1, s[23] = 0, s[24] = 0, s[25] = 0, s[26] = 1, s[27] = 0, s[28] = 0, s[29] = 1, s[30] = 0, s[31] = 0, s[32] = 1, s[33] = 0, s[34] = 0, s[35] = 1, s[36] = 0, s[37] = 0, s[38] = 1, s[39] = 0, s[40] = 0, s[41] = 1, s[42] = 0, s[43] = 0, s[44] = 1, s[45] = 0, s[46] = 0, s[47] = 1, s[48] = 0, s[49] = 0, s[50] = 1, s[51] = 0, s[52] = 0, s[53] = 1, s[54] = 0, s[55] = 0, s[56] = 1, s[57] = 0, s[58] = 0, s[59] = 1, s[60] = 0, s[61] = 0, s[62] = 1, s[63] = 0, s[64] = 0, s[65] = 1, s[66] = 0, s[67] = 0, s[68] = 1, s[69] = 0, s[70] = 0, s[71] = 1, y.bitangent = new g({
        componentDatatype: v.FLOAT,
        componentsPerAttribute: 3,
        values: s
      })), (i = new Uint16Array(36))[0] = 0, i[1] = 1, i[2] = 2, i[3] = 0, i[4] = 2, i[5] = 3, i[6] = 6, i[7] = 5, i[8] = 4, i[9] = 7, i[10] = 6, i[11] = 4, i[12] = 8, i[13] = 9, i[14] = 10, i[15] = 8, i[16] = 10, i[17] = 11, i[18] = 14, i[19] = 13, i[20] = 12, i[21] = 15, i[22] = 14, i[23] = 12, i[24] = 18, i[25] = 17, i[26] = 16, i[27] = 19, i[28] = 18, i[29] = 16, i[30] = 20, i[31] = 21, i[32] = 22, i[33] = 20, i[34] = 22, i[35] = 23) : ((a = new Float64Array(24))[0] = t.x, a[1] = t.y, a[2] = t.z, a[3] = n.x, a[4] = t.y, a[5] = t.z, a[6] = n.x, a[7] = n.y, a[8] = t.z, a[9] = t.x, a[10] = n.y, a[11] = t.z, a[12] = t.x, a[13] = t.y, a[14] = n.z, a[15] = n.x, a[16] = t.y, a[17] = n.z, a[18] = n.x, a[19] = n.y, a[20] = n.z, a[21] = t.x, a[22] = n.y, a[23] = n.z, y.position = new g({
        componentDatatype: v.DOUBLE,
        componentsPerAttribute: 3,
        values: a
      }), (i = new Uint16Array(36))[0] = 4, i[1] = 5, i[2] = 6, i[3] = 4, i[4] = 6, i[5] = 7, i[6] = 1, i[7] = 0, i[8] = 3, i[9] = 1, i[10] = 3, i[11] = 2, i[12] = 1, i[13] = 6, i[14] = 5, i[15] = 1, i[16] = 2, i[17] = 6, i[18] = 2, i[19] = 3, i[20] = 7, i[21] = 2, i[22] = 7, i[23] = 6, i[24] = 3, i[25] = 0, i[26] = 4, i[27] = 3, i[28] = 4, i[29] = 7, i[30] = 0, i[31] = 1, i[32] = 5, i[33] = 0, i[34] = 5, i[35] = 4);
      var p,
          f,
          x,
          c = d.subtract(n, t, F),
          A = .5 * d.magnitude(c);
      return z(e._offsetAttribute) && (p = a.length, f = new Uint8Array(p / 3), x = e._offsetAttribute === _.NONE ? 0 : 1, b(f, x), y.applyOffset = new g({
        componentDatatype: v.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: f
      })), new w({
        attributes: y,
        indices: i,
        primitiveType: h.TRIANGLES,
        boundingSphere: new l(d.ZERO, A),
        offsetAttribute: e._offsetAttribute
      });
    }
  }, y.getUnitBox = function () {
    return z(e) || (e = y.createGeometry(y.fromDimensions({
      dimensions: new d(1, 1, 1),
      vertexFormat: s.POSITION_ONLY
    }))), e;
  }, y;
});