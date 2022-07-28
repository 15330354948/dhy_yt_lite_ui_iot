"use strict";

define(["./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./PerspectiveOffCenterFrustum"], function (o, i, s, t, f, r, e) {
  "use strict";

  function a(t) {
    t = i(t, i.EMPTY_OBJECT), this._offCenterFrustum = new e(), this.fov = t.fov, this._fov = void 0, this._fovy = void 0, this._sseDenominator = void 0, this.aspectRatio = t.aspectRatio, this._aspectRatio = void 0, this.near = i(t.near, 1), this._near = this.near, this.far = i(t.far, 5e8), this._far = this.far, this.xOffset = i(t.xOffset, 0), this._xOffset = this.xOffset, this.yOffset = i(t.yOffset, 0), this._yOffset = this.yOffset;
  }

  function n(t) {
    if (!(s(t.fov) && s(t.aspectRatio) && s(t.near) && s(t.far))) throw new f("fov, aspectRatio, near, or far parameters are not set.");
    var e = t._offCenterFrustum;

    if (t.fov !== t._fov || t.aspectRatio !== t._aspectRatio || t.near !== t._near || t.far !== t._far || t.xOffset !== t._xOffset || t.yOffset !== t._yOffset) {
      if (t.fov < 0 || t.fov >= Math.PI) throw new f("fov must be in the range [0, PI).");
      if (t.aspectRatio < 0) throw new f("aspectRatio must be positive.");
      if (t.near < 0 || t.near > t.far) throw new f("near must be greater than zero and less than far.");
      t._aspectRatio = t.aspectRatio, t._fov = t.fov, t._fovy = t.aspectRatio <= 1 ? t.fov : 2 * Math.atan(Math.tan(.5 * t.fov) / t.aspectRatio), t._near = t.near, t._far = t.far, t._sseDenominator = 2 * Math.tan(.5 * t._fovy), t._xOffset = t.xOffset, t._yOffset = t.yOffset, e.top = t.near * Math.tan(.5 * t._fovy), e.bottom = -e.top, e.right = t.aspectRatio * e.top, e.left = -e.right, e.near = t.near, e.far = t.far, e.right += t.xOffset, e.left += t.xOffset, e.top += t.yOffset, e.bottom += t.yOffset;
    }
  }

  return a.packedLength = 6, a.pack = function (t, e, f) {
    return o.typeOf.object("value", t), o.defined("array", e), f = i(f, 0), e[f++] = t.fov, e[f++] = t.aspectRatio, e[f++] = t.near, e[f++] = t.far, e[f++] = t.xOffset, e[f] = t.yOffset, e;
  }, a.unpack = function (t, e, f) {
    return o.defined("array", t), e = i(e, 0), s(f) || (f = new a()), f.fov = t[e++], f.aspectRatio = t[e++], f.near = t[e++], f.far = t[e++], f.xOffset = t[e++], f.yOffset = t[e], f;
  }, t(a.prototype, {
    projectionMatrix: {
      get: function get() {
        return n(this), this._offCenterFrustum.projectionMatrix;
      }
    },
    infiniteProjectionMatrix: {
      get: function get() {
        return n(this), this._offCenterFrustum.infiniteProjectionMatrix;
      }
    },
    fovy: {
      get: function get() {
        return n(this), this._fovy;
      }
    },
    sseDenominator: {
      get: function get() {
        return n(this), this._sseDenominator;
      }
    }
  }), a.prototype.computeCullingVolume = function (t, e, f) {
    return n(this), this._offCenterFrustum.computeCullingVolume(t, e, f);
  }, a.prototype.getPixelDimensions = function (t, e, f, o) {
    return n(this), this._offCenterFrustum.getPixelDimensions(t, e, f, o);
  }, a.prototype.clone = function (t) {
    return s(t) || (t = new a()), t.aspectRatio = this.aspectRatio, t.fov = this.fov, t.near = this.near, t.far = this.far, t._aspectRatio = void 0, t._fov = void 0, t._near = void 0, t._far = void 0, this._offCenterFrustum.clone(t._offCenterFrustum), t;
  }, a.prototype.equals = function (t) {
    return !!(s(t) && t instanceof a) && (n(this), n(t), this.fov === t.fov && this.aspectRatio === t.aspectRatio && this._offCenterFrustum.equals(t._offCenterFrustum));
  }, a.prototype.equalsEpsilon = function (t, e, f) {
    return !!(s(t) && t instanceof a) && (n(this), n(t), r.equalsEpsilon(this.fov, t.fov, e, f) && r.equalsEpsilon(this.aspectRatio, t.aspectRatio, e, f) && this._offCenterFrustum.equalsEpsilon(t._offCenterFrustum, e, f));
  }, a;
});