"use strict";

define(["../Core/BoundingSphere", "../Core/BoxOutlineGeometry", "../Core/Cartesian3", "../Core/Check", "../Core/ColorGeometryInstanceAttribute", "../Core/defineProperties", "../Core/GeometryInstance", "../Core/Matrix3", "../Core/Matrix4", "../Core/OrientedBoundingBox", "./PerInstanceColorAppearance", "./Primitive"], function (o, r, i, u, d, e, a, t, s, c, g, m) {
  "use strict";

  function n(e, n) {
    this._orientedBoundingBox = new c(e, n), this._boundingSphere = o.fromOrientedBoundingBox(this._orientedBoundingBox);
  }

  return e(n.prototype, {
    boundingVolume: {
      get: function get() {
        return this._orientedBoundingBox;
      }
    },
    boundingSphere: {
      get: function get() {
        return this._boundingSphere;
      }
    }
  }), n.prototype.distanceToCamera = function (e) {
    return u.defined("frameState", e), Math.sqrt(this._orientedBoundingBox.distanceSquaredTo(e.camera.positionWC));
  }, n.prototype.intersectPlane = function (e) {
    return u.defined("plane", e), this._orientedBoundingBox.intersectPlane(e);
  }, n.prototype.update = function (e, n) {
    i.clone(e, this._orientedBoundingBox.center), t.clone(n, this._orientedBoundingBox.halfAxes), o.fromOrientedBoundingBox(this._orientedBoundingBox, this._boundingSphere);
  }, n.prototype.createDebugVolume = function (e) {
    u.defined("color", e);
    var n = new r({
      minimum: new i(-1, -1, -1),
      maximum: new i(1, 1, 1)
    }),
        o = s.fromRotationTranslation(this.boundingVolume.halfAxes, this.boundingVolume.center),
        t = new a({
      geometry: n,
      id: "outline",
      modelMatrix: o,
      attributes: {
        color: d.fromColor(e)
      }
    });
    return new m({
      geometryInstances: t,
      appearance: new g({
        translucent: !1,
        flat: !0
      }),
      asynchronous: !1
    });
  }, n;
});