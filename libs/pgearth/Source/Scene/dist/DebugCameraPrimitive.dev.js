"use strict";

define(["../Core/Cartesian3", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FrustumGeometry", "../Core/FrustumOutlineGeometry", "../Core/GeometryInstance", "../Core/Matrix3", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Core/PerspectiveFrustum", "../Core/PerspectiveOffCenterFrustum", "../Core/Quaternion", "./PerInstanceColorAppearance", "./Primitive"], function (d, v, _, t, r, i, o, w, g, y, P, O, e, F, I, b, A, G) {
  "use strict";

  function n(e) {
    if (e = t(e, t.EMPTY_OBJECT), !r(e.camera)) throw new o("options.camera is required.");
    this._camera = e.camera, this._color = t(e.color, v.CYAN), this._updateOnChange = t(e.updateOnChange, !0), this.show = t(e.show, !0), this.id = e.id, this._id = void 0, this._outlinePrimitives = [], this._planesPrimitives = [];
  }

  var W = new d(),
      E = new P(),
      M = new b(),
      N = new F(),
      k = new I(),
      x = new O(),
      D = new e(),
      T = new v(),
      Y = [1, 1e5];
  return n.prototype.update = function (e) {
    if (this.show) {
      var t,
          r,
          i = this._planesPrimitives,
          o = this._outlinePrimitives;

      if (this._updateOnChange) {
        for (r = i.length, t = 0; t < r; ++t) {
          o[t] = o[t] && o[t].destroy(), i[t] = i[t] && i[t].destroy();
        }

        i.length = 0, o.length = 0;
      }

      if (0 === i.length) {
        var n = this._camera,
            s = n.frustum,
            a = s instanceof F ? N : s instanceof I ? k : s instanceof O ? x : D;
        a = s.clone(a);
        var u = e.frustumSplits,
            h = u.length - 1;
        h <= 0 && ((u = Y)[0] = this._camera.frustum.near, u[1] = this._camera.frustum.far, h = 1);
        var m = n.positionWC,
            l = n.directionWC,
            c = n.upWC,
            f = n.rightWC,
            f = d.negate(f, W),
            p = E;
        P.setColumn(p, 0, f, p), P.setColumn(p, 1, c, p), P.setColumn(p, 2, l, p);
        var C = b.fromRotationMatrix(p, M);

        for (i.length = o.length = h, t = 0; t < h; ++t) {
          a.near = u[t], a.far = u[t + 1], i[t] = new G({
            geometryInstances: new y({
              geometry: new w({
                origin: m,
                orientation: C,
                frustum: a,
                _drawNearPlane: 0 === t
              }),
              attributes: {
                color: _.fromColor(v.fromAlpha(this._color, .1, T))
              },
              id: this.id,
              pickPrimitive: this
            }),
            appearance: new A({
              translucent: !0,
              flat: !0
            }),
            asynchronous: !1
          }), o[t] = new G({
            geometryInstances: new y({
              geometry: new g({
                origin: m,
                orientation: C,
                frustum: a,
                _drawNearPlane: 0 === t
              }),
              attributes: {
                color: _.fromColor(this._color)
              },
              id: this.id,
              pickPrimitive: this
            }),
            appearance: new A({
              translucent: !1,
              flat: !0
            }),
            asynchronous: !1
          });
        }
      }

      for (r = i.length, t = 0; t < r; ++t) {
        o[t].update(e), i[t].update(e);
      }
    }
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    for (var e = this._planesPrimitives.length, t = 0; t < e; ++t) {
      this._outlinePrimitives[t] = this._outlinePrimitives[t] && this._outlinePrimitives[t].destroy(), this._planesPrimitives[t] = this._planesPrimitives[t] && this._planesPrimitives[t].destroy();
    }

    return i(this);
  }, n;
});