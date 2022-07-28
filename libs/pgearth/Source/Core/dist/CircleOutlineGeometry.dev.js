"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./EllipseOutlineGeometry", "./Ellipsoid"], function (n, t, s, a, l, o) {
  "use strict";

  function u(e) {
    var i = (e = s(e, s.EMPTY_OBJECT)).radius;
    t.typeOf.number("radius", i);
    var r = {
      center: e.center,
      semiMajorAxis: i,
      semiMinorAxis: i,
      ellipsoid: e.ellipsoid,
      height: e.height,
      extrudedHeight: e.extrudedHeight,
      granularity: e.granularity,
      numberOfVerticalLines: e.numberOfVerticalLines
    };
    this._ellipseGeometry = new l(r), this._workerName = "createCircleOutlineGeometry";
  }

  u.packedLength = l.packedLength, u.pack = function (e, i, r) {
    return t.typeOf.object("value", e), l.pack(e._ellipseGeometry, i, r);
  };
  var d = new l({
    center: new n(),
    semiMajorAxis: 1,
    semiMinorAxis: 1
  }),
      c = {
    center: new n(),
    radius: void 0,
    ellipsoid: o.clone(o.UNIT_SPHERE),
    height: void 0,
    extrudedHeight: void 0,
    granularity: void 0,
    numberOfVerticalLines: void 0,
    semiMajorAxis: void 0,
    semiMinorAxis: void 0
  };
  return u.unpack = function (e, i, r) {
    var t = l.unpack(e, i, d);
    return c.center = n.clone(t._center, c.center), c.ellipsoid = o.clone(t._ellipsoid, c.ellipsoid), c.height = t._height, c.extrudedHeight = t._extrudedHeight, c.granularity = t._granularity, c.numberOfVerticalLines = t._numberOfVerticalLines, a(r) ? (c.semiMajorAxis = t._semiMajorAxis, c.semiMinorAxis = t._semiMinorAxis, r._ellipseGeometry = new l(c), r) : (c.radius = t._semiMajorAxis, new u(c));
  }, u.createGeometry = function (e) {
    return l.createGeometry(e._ellipseGeometry);
  }, u;
});