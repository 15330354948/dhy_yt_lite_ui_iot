"use strict";

define(["../Core/buildModuleUrl", "../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Ellipsoid", "../Core/IauOrientationAxes", "../Core/Matrix3", "../Core/Matrix4", "../Core/Simon1994PlanetaryPositions", "../Core/Transforms", "./EllipsoidPrimitive", "./Material"], function (t, i, o, n, e, r, s, l, a, d, u, m, p, h) {
  "use strict";

  function y(i) {
    var e = (i = o(i, o.EMPTY_OBJECT)).textureUrl;
    n(e) || (e = t("Assets/Textures/moonSmall.jpg")), this.show = o(i.show, !0), this.textureUrl = e, this._ellipsoid = o(i.ellipsoid, s.MOON), this.onlySunLighting = o(i.onlySunLighting, !0), this._ellipsoidPrimitive = new p({
      radii: this.ellipsoid.radii,
      material: h.fromType(h.ImageType),
      depthTestEnabled: !1,
      _owner: this
    }), this._ellipsoidPrimitive.material.translucent = !1, this._axes = new l();
  }

  e(y.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    }
  });
  var c = new a(),
      f = new a(),
      v = new i(),
      g = [];
  return y.prototype.update = function (i) {
    if (this.show) {
      var e = this._ellipsoidPrimitive;
      e.material.uniforms.image = this.textureUrl, e.onlySunLighting = this.onlySunLighting;
      var t = i.time;
      n(m.computeIcrfToFixedMatrix(t, c)) || m.computeTemeToPseudoFixedMatrix(t, c);

      var o = this._axes.evaluate(t, f);

      a.transpose(o, o), a.multiply(c, o, o);
      var r = u.computeMoonPositionInEarthInertialFrame(t, v);
      a.multiplyByVector(c, r, r), d.fromRotationTranslation(o, r, e.modelMatrix);
      var s = i.commandList;
      return (i.commandList = g).length = 0, e.update(i), i.commandList = s, 1 === g.length ? g[0] : void 0;
    }
  }, y.prototype.isDestroyed = function () {
    return !1;
  }, y.prototype.destroy = function () {
    return this._ellipsoidPrimitive = this._ellipsoidPrimitive && this._ellipsoidPrimitive.destroy(), r(this);
  }, y;
});