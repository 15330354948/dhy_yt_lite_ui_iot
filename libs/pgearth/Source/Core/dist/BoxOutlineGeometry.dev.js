"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./PrimitiveType"], function (p, y, c, a, b, m, d, i, A, x, l, O, _) {
  "use strict";

  var h = new c();

  function u(e) {
    var t = (e = m(e, m.EMPTY_OBJECT)).minimum,
        n = e.maximum;
    if (a.typeOf.object("min", t), a.typeOf.object("max", n), d(e.offsetAttribute) && e.offsetAttribute === O.TOP) throw new i("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");
    this._min = c.clone(t), this._max = c.clone(n), this._offsetAttribute = e.offsetAttribute, this._workerName = "createBoxOutlineGeometry";
  }

  u.fromDimensions = function (e) {
    var t = (e = m(e, m.EMPTY_OBJECT)).dimensions;
    a.typeOf.object("dimensions", t), a.typeOf.number.greaterThanOrEquals("dimensions.x", t.x, 0), a.typeOf.number.greaterThanOrEquals("dimensions.y", t.y, 0), a.typeOf.number.greaterThanOrEquals("dimensions.z", t.z, 0);
    var n = c.multiplyByScalar(t, .5, new c());
    return new u({
      minimum: c.negate(n, new c()),
      maximum: n,
      offsetAttribute: e.offsetAttribute
    });
  }, u.fromAxisAlignedBoundingBox = function (e) {
    return a.typeOf.object("boundindBox", e), new u({
      minimum: e.minimum,
      maximum: e.maximum
    });
  }, u.packedLength = 2 * c.packedLength + 1, u.pack = function (e, t, n) {
    return a.typeOf.object("value", e), a.defined("array", t), n = m(n, 0), c.pack(e._min, t, n), c.pack(e._max, t, n + c.packedLength), t[n + 2 * c.packedLength] = m(e._offsetAttribute, -1), t;
  };
  var f = new c(),
      s = new c(),
      w = {
    minimum: f,
    maximum: s,
    offsetAttribute: void 0
  };
  return u.unpack = function (e, t, n) {
    a.defined("array", e), t = m(t, 0);
    var i = c.unpack(e, t, f),
        r = c.unpack(e, t + c.packedLength, s),
        o = e[t + 2 * c.packedLength];
    return d(n) ? (n._min = c.clone(i, n._min), n._max = c.clone(r, n._max), n._offsetAttribute = -1 === o ? void 0 : o, n) : (w.offsetAttribute = -1 === o ? void 0 : o, new u(w));
  }, u.createGeometry = function (e) {
    var t = e._min,
        n = e._max;

    if (!c.equals(t, n)) {
      var i = new l(),
          r = new Uint16Array(24),
          o = new Float64Array(24);
      o[0] = t.x, o[1] = t.y, o[2] = t.z, o[3] = n.x, o[4] = t.y, o[5] = t.z, o[6] = n.x, o[7] = n.y, o[8] = t.z, o[9] = t.x, o[10] = n.y, o[11] = t.z, o[12] = t.x, o[13] = t.y, o[14] = n.z, o[15] = n.x, o[16] = t.y, o[17] = n.z, o[18] = n.x, o[19] = n.y, o[20] = n.z, o[21] = t.x, o[22] = n.y, o[23] = n.z, i.position = new x({
        componentDatatype: b.DOUBLE,
        componentsPerAttribute: 3,
        values: o
      }), r[0] = 4, r[1] = 5, r[2] = 5, r[3] = 6, r[4] = 6, r[5] = 7, r[6] = 7, r[7] = 4, r[8] = 0, r[9] = 1, r[10] = 1, r[11] = 2, r[12] = 2, r[13] = 3, r[14] = 3, r[15] = 0, r[16] = 0, r[17] = 4, r[18] = 1, r[19] = 5, r[20] = 2, r[21] = 6, r[22] = 3, r[23] = 7;
      var a,
          m,
          u,
          f = c.subtract(n, t, h),
          s = .5 * c.magnitude(f);
      return d(e._offsetAttribute) && (a = o.length, m = new Uint8Array(a / 3), u = e._offsetAttribute === O.NONE ? 0 : 1, p(m, u), i.applyOffset = new x({
        componentDatatype: b.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: m
      })), new A({
        attributes: i,
        indices: r,
        primitiveType: _.LINES,
        boundingSphere: new y(c.ZERO, s),
        offsetAttribute: e._offsetAttribute
      });
    }
  }, u;
});