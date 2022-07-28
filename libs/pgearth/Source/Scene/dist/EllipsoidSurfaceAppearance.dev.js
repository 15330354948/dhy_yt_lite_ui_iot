"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/VertexFormat", "../Shaders/Appearances/EllipsoidSurfaceAppearanceFS", "../Shaders/Appearances/EllipsoidSurfaceAppearanceVS", "./Appearance", "./Material"], function (a, n, e, t, o, u, i, c) {
  "use strict";

  function r(e) {
    e = a(e, a.EMPTY_OBJECT);
    var t = a(e.translucent, !0),
        r = a(e.aboveGround, !1);
    this.material = n(e.material) ? e.material : c.fromType(c.ColorType), this.translucent = a(e.translucent, !0), this._vertexShaderSource = a(e.vertexShaderSource, u), this._fragmentShaderSource = a(e.fragmentShaderSource, o), this._renderState = i.getDefaultRenderState(t, !r, e.renderState), this._closed = !1, this._flat = a(e.flat, !1), this._faceForward = a(e.faceForward, r), this._aboveGround = r;
  }

  return e(r.prototype, {
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
    },
    vertexFormat: {
      get: function get() {
        return r.VERTEX_FORMAT;
      }
    },
    flat: {
      get: function get() {
        return this._flat;
      }
    },
    faceForward: {
      get: function get() {
        return this._faceForward;
      }
    },
    aboveGround: {
      get: function get() {
        return this._aboveGround;
      }
    }
  }), r.VERTEX_FORMAT = t.POSITION_AND_ST, r.prototype.getFragmentShaderSource = i.prototype.getFragmentShaderSource, r.prototype.isTranslucent = i.prototype.isTranslucent, r.prototype.getRenderState = i.prototype.getRenderState, r;
});