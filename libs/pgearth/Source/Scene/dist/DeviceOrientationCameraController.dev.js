"use strict";

define(["../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Math", "../Core/Matrix3", "../Core/Quaternion"], function (e, t, s, o, d, p) {
  "use strict";

  function a(t) {
    if (!e(t)) throw new s("scene is required.");
    this._scene = t, this._lastAlpha = void 0, this._lastBeta = void 0, this._lastGamma = void 0, this._alpha = void 0, this._beta = void 0, this._gamma = void 0;
    var i = this;

    function a(t) {
      var a = t.alpha;
      if (!e(a)) return i._alpha = void 0, i._beta = void 0, void (i._gamma = void 0);
      i._alpha = o.toRadians(a), i._beta = o.toRadians(t.beta), i._gamma = o.toRadians(t.gamma);
    }

    window.addEventListener("deviceorientation", a, !1), this._removeListener = function () {
      window.removeEventListener("deviceorientation", a, !1);
    };
  }

  var v = new p(),
      u = new p(),
      c = new d();
  return a.prototype.update = function () {
    var t, a, i;
    e(this._alpha) && (e(this._lastAlpha) || (this._lastAlpha = this._alpha, this._lastBeta = this._beta, this._lastGamma = this._gamma), t = this._lastAlpha - this._alpha, a = this._lastBeta - this._beta, i = this._lastGamma - this._gamma, function (t, a, i, e) {
      var s = t.direction,
          o = t.right,
          r = t.up,
          n = p.fromAxisAngle(s, i, u),
          h = p.fromAxisAngle(o, e, v),
          l = p.multiply(h, n, h),
          _ = p.fromAxisAngle(r, a, u);

      p.multiply(_, l, l);
      var m = d.fromQuaternion(l, c);
      d.multiplyByVector(m, o, o), d.multiplyByVector(m, r, r), d.multiplyByVector(m, s, s);
    }(this._scene.camera, -t, a, i), this._lastAlpha = this._alpha, this._lastBeta = this._beta, this._lastGamma = this._gamma);
  }, a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return this._removeListener(), t(this);
  }, a;
});