"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./EllipsoidOutlineGeometry"], function (n, s, r, a, o) {
  "use strict";

  function c(i) {
    var e = r(i.radius, 1),
        t = {
      radii: new n(e, e, e),
      stackPartitions: i.stackPartitions,
      slicePartitions: i.slicePartitions,
      subdivisions: i.subdivisions
    };
    this._ellipsoidGeometry = new o(t), this._workerName = "createSphereOutlineGeometry";
  }

  c.packedLength = o.packedLength, c.pack = function (i, e, t) {
    return s.typeOf.object("value", i), o.pack(i._ellipsoidGeometry, e, t);
  };
  var d = new o(),
      u = {
    radius: void 0,
    radii: new n(),
    stackPartitions: void 0,
    slicePartitions: void 0,
    subdivisions: void 0
  };
  return c.unpack = function (i, e, t) {
    var s = o.unpack(i, e, d);
    return u.stackPartitions = s._stackPartitions, u.slicePartitions = s._slicePartitions, u.subdivisions = s._subdivisions, a(t) ? (n.clone(s._radii, u.radii), t._ellipsoidGeometry = new o(u), t) : (u.radius = s._radii.x, new c(u));
  }, c.createGeometry = function (i) {
    return o.createGeometry(i._ellipsoidGeometry);
  }, c;
});