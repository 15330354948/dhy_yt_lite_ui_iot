"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./EllipsoidGeometry", "./VertexFormat"], function (a, r, o, n, s, c) {
  "use strict";

  function d(e) {
    var t = o(e.radius, 1),
        i = {
      radii: new a(t, t, t),
      stackPartitions: e.stackPartitions,
      slicePartitions: e.slicePartitions,
      vertexFormat: e.vertexFormat
    };
    this._ellipsoidGeometry = new s(i), this._workerName = "createSphereGeometry";
  }

  d.packedLength = s.packedLength, d.pack = function (e, t, i) {
    return r.typeOf.object("value", e), s.pack(e._ellipsoidGeometry, t, i);
  };
  var l = new s(),
      u = {
    radius: void 0,
    radii: new a(),
    vertexFormat: new c(),
    stackPartitions: void 0,
    slicePartitions: void 0
  };
  return d.unpack = function (e, t, i) {
    var r = s.unpack(e, t, l);
    return u.vertexFormat = c.clone(r._vertexFormat, u.vertexFormat), u.stackPartitions = r._stackPartitions, u.slicePartitions = r._slicePartitions, n(i) ? (a.clone(r._radii, u.radii), i._ellipsoidGeometry = new s(u), i) : (u.radius = r._radii.x, new d(u));
  }, d.createGeometry = function (e) {
    return s.createGeometry(e._ellipsoidGeometry);
  }, d;
});