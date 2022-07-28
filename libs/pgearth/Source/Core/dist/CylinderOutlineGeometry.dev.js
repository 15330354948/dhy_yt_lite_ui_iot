"use strict";

define(["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Check", "./ComponentDatatype", "./CylinderGeometryLibrary", "./defaultValue", "./defined", "./DeveloperError", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./PrimitiveType"], function (h, v, O, A, f, R, g, p, w, s, L, E, G, T, V, C) {
  "use strict";

  var D = new O();

  function d(t) {
    var e = (t = p(t, p.EMPTY_OBJECT)).length,
        i = t.topRadius,
        r = t.bottomRadius,
        o = p(t.slices, 128),
        n = Math.max(p(t.numberOfVerticalLines, 16), 0);
    if (f.typeOf.number("options.positions", e), f.typeOf.number("options.topRadius", i), f.typeOf.number("options.bottomRadius", r), f.typeOf.number.greaterThanOrEquals("options.slices", o, 3), w(t.offsetAttribute) && t.offsetAttribute === T.TOP) throw new s("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");
    this._length = e, this._topRadius = i, this._bottomRadius = r, this._slices = o, this._numberOfVerticalLines = n, this._offsetAttribute = t.offsetAttribute, this._workerName = "createCylinderOutlineGeometry";
  }

  d.packedLength = 6, d.pack = function (t, e, i) {
    return f.typeOf.object("value", t), f.defined("array", e), i = p(i, 0), e[i++] = t._length, e[i++] = t._topRadius, e[i++] = t._bottomRadius, e[i++] = t._slices, e[i++] = t._numberOfVerticalLines, e[i] = p(t._offsetAttribute, -1), e;
  };
  var b = {
    length: void 0,
    topRadius: void 0,
    bottomRadius: void 0,
    slices: void 0,
    numberOfVerticalLines: void 0,
    offsetAttribute: void 0
  };
  return d.unpack = function (t, e, i) {
    f.defined("array", t), e = p(e, 0);
    var r = t[e++],
        o = t[e++],
        n = t[e++],
        s = t[e++],
        a = t[e++],
        u = t[e];
    return w(i) ? (i._length = r, i._topRadius = o, i._bottomRadius = n, i._slices = s, i._numberOfVerticalLines = a, i._offsetAttribute = -1 === u ? void 0 : u, i) : (b.length = r, b.topRadius = o, b.bottomRadius = n, b.slices = s, b.numberOfVerticalLines = a, b.offsetAttribute = -1 === u ? void 0 : u, new d(b));
  }, d.createGeometry = function (t) {
    var e = t._length,
        i = t._topRadius,
        r = t._bottomRadius,
        o = t._slices,
        n = t._numberOfVerticalLines;

    if (!(e <= 0 || i < 0 || r < 0 || 0 === i && 0 === r)) {
      var s,
          a,
          u = 2 * o,
          f = g.computePositions(e, i, r, o, !1),
          p = 2 * o;
      0 < n && (s = Math.min(n, o), a = Math.round(o / s), p += s);

      for (var d = V.createTypedArray(u, 2 * p), b = 0, m = 0; m < o - 1; m++) {
        d[b++] = m, d[b++] = m + 1, d[b++] = m + o, d[b++] = m + 1 + o;
      }

      if (d[b++] = o - 1, d[b++] = 0, d[b++] = o + o - 1, d[b++] = o, 0 < n) for (m = 0; m < o; m += a) {
        d[b++] = m, d[b++] = m + o;
      }
      var l = new G();
      l.position = new E({
        componentDatatype: R.DOUBLE,
        componentsPerAttribute: 3,
        values: f
      }), D.x = .5 * e, D.y = Math.max(r, i);

      var c,
          y,
          _ = new v(A.ZERO, O.magnitude(D));

      return w(t._offsetAttribute) && (e = f.length, c = new Uint8Array(e / 3), y = t._offsetAttribute === T.NONE ? 0 : 1, h(c, y), l.applyOffset = new E({
        componentDatatype: R.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: c
      })), new L({
        attributes: l,
        indices: d,
        primitiveType: C.LINES,
        boundingSphere: _,
        offsetAttribute: t._offsetAttribute
      });
    }
  }, d;
});