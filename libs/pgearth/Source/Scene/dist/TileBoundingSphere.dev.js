"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Check", "../Core/ColorGeometryInstanceAttribute", "../Core/defineProperties", "../Core/GeometryInstance", "../Core/Matrix4", "../Core/SphereOutlineGeometry", "./PerInstanceColorAppearance", "./Primitive"], function (t, r, o, i, e, u, a, s, c, d) {
  "use strict";

  function n(e, n) {
    this._boundingSphere = new t(e, n);
  }

  return e(n.prototype, {
    center: {
      get: function get() {
        return this._boundingSphere.center;
      }
    },
    radius: {
      get: function get() {
        return this._boundingSphere.radius;
      }
    },
    boundingVolume: {
      get: function get() {
        return this._boundingSphere;
      }
    },
    boundingSphere: {
      get: function get() {
        return this._boundingSphere;
      }
    }
  }), n.prototype.distanceToCamera = function (e) {
    o.defined("frameState", e);
    var n = this._boundingSphere;
    return Math.max(0, r.distance(n.center, e.camera.positionWC) - n.radius);
  }, n.prototype.intersectPlane = function (e) {
    return o.defined("plane", e), t.intersectPlane(this._boundingSphere, e);
  }, n.prototype.update = function (e, n) {
    r.clone(e, this._boundingSphere.center), this._boundingSphere.radius = n;
  }, n.prototype.createDebugVolume = function (e) {
    o.defined("color", e);
    var n = new s({
      radius: this.radius
    }),
        t = a.fromTranslation(this.center, new a.clone(a.IDENTITY)),
        r = new u({
      geometry: n,
      id: "outline",
      modelMatrix: t,
      attributes: {
        color: i.fromColor(e)
      }
    });
    return new d({
      geometryInstances: r,
      appearance: new c({
        translucent: !1,
        flat: !0
      }),
      asynchronous: !1
    });
  }, n;
});