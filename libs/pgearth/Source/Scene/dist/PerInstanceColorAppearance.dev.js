"use strict";

define(["../Core/defaultValue", "../Core/defineProperties", "../Core/VertexFormat", "../Shaders/Appearances/PerInstanceColorAppearanceFS", "../Shaders/Appearances/PerInstanceColorAppearanceVS", "../Shaders/Appearances/PerInstanceFlatColorAppearanceFS", "../Shaders/Appearances/PerInstanceFlatColorAppearanceVS", "./Appearance"], function (s, e, r, S, u, d, i, p) {
  "use strict";

  function h(e) {
    e = s(e, s.EMPTY_OBJECT);
    var r = s(e.translucent, !0),
        t = s(e.closed, !1),
        a = s(e.flat, !1),
        n = a ? i : u,
        o = a ? d : S,
        c = a ? h.FLAT_VERTEX_FORMAT : h.VERTEX_FORMAT;
    this.material = void 0, this.translucent = r, this._vertexShaderSource = s(e.vertexShaderSource, n), this._fragmentShaderSource = s(e.fragmentShaderSource, o), this._renderState = p.getDefaultRenderState(r, t, e.renderState), this._closed = t, this._vertexFormat = c, this._flat = a, this._faceForward = s(e.faceForward, !t);
  }

  return e(h.prototype, {
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
        return this._vertexFormat;
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
    }
  }), h.VERTEX_FORMAT = r.POSITION_AND_NORMAL, h.FLAT_VERTEX_FORMAT = r.POSITION_ONLY, h.prototype.getFragmentShaderSource = p.prototype.getFragmentShaderSource, h.prototype.isTranslucent = p.prototype.isTranslucent, h.prototype.getRenderState = p.prototype.getRenderState, h;
});