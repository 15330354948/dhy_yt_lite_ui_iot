"use strict";

define(["../Core/clone", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "./BlendingState", "./CullFace"], function (r, a, t, i, e, s, u) {
  "use strict";

  function n(e) {
    e = t(e, t.EMPTY_OBJECT), this.material = e.material, this.translucent = t(e.translucent, !0), this._vertexShaderSource = e.vertexShaderSource, this._fragmentShaderSource = e.fragmentShaderSource, this._renderState = e.renderState, this._closed = t(e.closed, !1);
  }

  return e(n.prototype, {
    vertexShaderSource: {
      get: function get() {
        return this._vertexShaderSource;
      }
    },
    fragmentShaderSource: {
      get: function get() {
        return this._fragmentShaderSource;
      }
    },
    renderState: {
      get: function get() {
        return this._renderState;
      }
    },
    closed: {
      get: function get() {
        return this._closed;
      }
    }
  }), n.prototype.getFragmentShaderSource = function () {
    var e = [];
    return this.flat && e.push("#define FLAT"), this.faceForward && e.push("#define FACE_FORWARD"), i(this.material) && e.push(this.material.shaderSource), e.push(this.fragmentShaderSource), e.join("\n");
  }, n.prototype.isTranslucent = function () {
    return i(this.material) && this.material.isTranslucent() || !i(this.material) && this.translucent;
  }, n.prototype.getRenderState = function () {
    var e = this.isTranslucent(),
        t = r(this.renderState, !1);
    return e ? (t.depthMask = !1, t.blending = s.ALPHA_BLEND) : t.depthMask = !0, t;
  }, n.getDefaultRenderState = function (e, t, r) {
    var n = {
      depthTest: {
        enabled: !0
      }
    };
    return e && (n.depthMask = !1, n.blending = s.ALPHA_BLEND), t && (n.cull = {
      enabled: !0,
      face: u.BACK
    }), i(r) && (n = a(r, n, !0)), n;
  }, n;
});