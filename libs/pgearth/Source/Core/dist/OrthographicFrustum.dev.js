"use strict";

define(["./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./OrthographicOffCenterFrustum"], function (r, a, n, t, o, s, e) {
  "use strict";

  function f(t) {
    t = a(t, a.EMPTY_OBJECT), this._offCenterFrustum = new e(), this.width = t.width, this._width = void 0, this.aspectRatio = t.aspectRatio, this._aspectRatio = void 0, this.near = a(t.near, 1), this._near = this.near, this.far = a(t.far, 5e8), this._far = this.far;
  }

  function u(t) {
    if (!(n(t.width) && n(t.aspectRatio) && n(t.near) && n(t.far))) throw new o("width, aspectRatio, near, or far parameters are not set.");
    var e = t._offCenterFrustum;

    if (t.width !== t._width || t.aspectRatio !== t._aspectRatio || t.near !== t._near || t.far !== t._far) {
      if (t.aspectRatio < 0) throw new o("aspectRatio must be positive.");
      if (t.near < 0 || t.near > t.far) throw new o("near must be greater than zero and less than far.");
      t._aspectRatio = t.aspectRatio, t._width = t.width, t._near = t.near, t._far = t.far;
      var i = 1 / t.aspectRatio;
      e.right = .5 * t.width, e.left = -e.right, e.top = i * e.right, e.bottom = -e.top, e.near = t.near, e.far = t.far;
    }
  }

  return f.packedLength = 4, f.pack = function (t, e, i) {
    return r.typeOf.object("value", t), r.defined("array", e), i = a(i, 0), e[i++] = t.width, e[i++] = t.aspectRatio, e[i++] = t.near, e[i] = t.far, e;
  }, f.unpack = function (t, e, i) {
    return r.defined("array", t), e = a(e, 0), n(i) || (i = new f()), i.width = t[e++], i.aspectRatio = t[e++], i.near = t[e++], i.far = t[e], i;
  }, t(f.prototype, {
    projectionMatrix: {
      get: function get() {
        return u(this), this._offCenterFrustum.projectionMatrix;
      }
    }
  }), f.prototype.computeCullingVolume = function (t, e, i) {
    return u(this), this._offCenterFrustum.computeCullingVolume(t, e, i);
  }, f.prototype.getPixelDimensions = function (t, e, i, r) {
    return u(this), this._offCenterFrustum.getPixelDimensions(t, e, i, r);
  }, f.prototype.clone = function (t) {
    return n(t) || (t = new f()), t.aspectRatio = this.aspectRatio, t.width = this.width, t.near = this.near, t.far = this.far, t._aspectRatio = void 0, t._width = void 0, t._near = void 0, t._far = void 0, this._offCenterFrustum.clone(t._offCenterFrustum), t;
  }, f.prototype.equals = function (t) {
    return !!(n(t) && t instanceof f) && (u(this), u(t), this.width === t.width && this.aspectRatio === t.aspectRatio && this._offCenterFrustum.equals(t._offCenterFrustum));
  }, f.prototype.equalsEpsilon = function (t, e, i) {
    return !!(n(t) && t instanceof f) && (u(this), u(t), s.equalsEpsilon(this.width, t.width, e, i) && s.equalsEpsilon(this.aspectRatio, t.aspectRatio, e, i) && this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum, e, i));
  }, f;
});