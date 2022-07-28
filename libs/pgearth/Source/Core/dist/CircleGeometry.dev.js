"use strict";

define(["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./EllipseGeometry", "./Ellipsoid", "./VertexFormat"], function (o, r, n, a, e, s, l, d) {
  "use strict";

  function u(e) {
    var t = (e = n(e, n.EMPTY_OBJECT)).radius;
    r.typeOf.number("radius", t);
    var i = {
      center: e.center,
      semiMajorAxis: t,
      semiMinorAxis: t,
      ellipsoid: e.ellipsoid,
      height: e.height,
      extrudedHeight: e.extrudedHeight,
      granularity: e.granularity,
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      shadowVolume: e.shadowVolume
    };
    this._ellipseGeometry = new s(i), this._workerName = "createCircleGeometry";
  }

  u.packedLength = s.packedLength, u.pack = function (e, t, i) {
    return r.typeOf.object("value", e), s.pack(e._ellipseGeometry, t, i);
  };
  var m = new s({
    center: new o(),
    semiMajorAxis: 1,
    semiMinorAxis: 1
  }),
      c = {
    center: new o(),
    radius: void 0,
    ellipsoid: l.clone(l.UNIT_SPHERE),
    height: void 0,
    extrudedHeight: void 0,
    granularity: void 0,
    vertexFormat: new d(),
    stRotation: void 0,
    semiMajorAxis: void 0,
    semiMinorAxis: void 0,
    shadowVolume: void 0
  };
  return u.unpack = function (e, t, i) {
    var r = s.unpack(e, t, m);
    return c.center = o.clone(r._center, c.center), c.ellipsoid = l.clone(r._ellipsoid, c.ellipsoid), c.height = r._height, c.extrudedHeight = r._extrudedHeight, c.granularity = r._granularity, c.vertexFormat = d.clone(r._vertexFormat, c.vertexFormat), c.stRotation = r._stRotation, c.shadowVolume = r._shadowVolume, a(i) ? (c.semiMajorAxis = r._semiMajorAxis, c.semiMinorAxis = r._semiMinorAxis, i._ellipseGeometry = new s(c), i) : (c.radius = r._semiMajorAxis, new u(c));
  }, u.createGeometry = function (e) {
    return s.createGeometry(e._ellipseGeometry);
  }, u.createShadowVolume = function (e, t, i) {
    var r = e._ellipseGeometry._granularity,
        o = e._ellipseGeometry._ellipsoid,
        n = t(r, o),
        a = i(r, o);
    return new u({
      center: e._ellipseGeometry._center,
      radius: e._ellipseGeometry._semiMajorAxis,
      ellipsoid: o,
      stRotation: e._ellipseGeometry._stRotation,
      granularity: r,
      extrudedHeight: n,
      height: a,
      vertexFormat: d.POSITION_ONLY,
      shadowVolume: !0
    });
  }, e(u.prototype, {
    rectangle: {
      get: function get() {
        return this._ellipseGeometry.rectangle;
      }
    },
    textureCoordinateRotationPoints: {
      get: function get() {
        return this._ellipseGeometry.textureCoordinateRotationPoints;
      }
    }
  }), u;
});