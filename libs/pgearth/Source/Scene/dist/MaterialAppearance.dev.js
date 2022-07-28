"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/freezeObject", "../Core/VertexFormat", "../Shaders/Appearances/AllMaterialAppearanceFS", "../Shaders/Appearances/AllMaterialAppearanceVS", "../Shaders/Appearances/BasicMaterialAppearanceFS", "../Shaders/Appearances/BasicMaterialAppearanceVS", "../Shaders/Appearances/TexturedMaterialAppearanceFS", "../Shaders/Appearances/TexturedMaterialAppearanceVS", "./Appearance", "./Material"], function (o, n, e, r, t, a, S, c, p, i, u, d, s) {
  "use strict";

  function h(e) {
    e = o(e, o.EMPTY_OBJECT);
    var r = o(e.translucent, !0),
        t = o(e.closed, !1),
        a = o(e.materialSupport, h.MaterialSupport.TEXTURED);
    this.material = n(e.material) ? e.material : s.fromType(s.ColorType), this.translucent = r, this._vertexShaderSource = o(e.vertexShaderSource, a.vertexShaderSource), this._fragmentShaderSource = o(e.fragmentShaderSource, a.fragmentShaderSource), this._renderState = d.getDefaultRenderState(r, t, e.renderState), this._closed = t, this._materialSupport = a, this._vertexFormat = a.vertexFormat, this._flat = o(e.flat, !1), this._faceForward = o(e.faceForward, !t);
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
    materialSupport: {
      get: function get() {
        return this._materialSupport;
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
  }), h.prototype.getFragmentShaderSource = d.prototype.getFragmentShaderSource, h.prototype.isTranslucent = d.prototype.isTranslucent, h.prototype.getRenderState = d.prototype.getRenderState, h.MaterialSupport = {
    BASIC: r({
      vertexFormat: t.POSITION_AND_NORMAL,
      vertexShaderSource: p,
      fragmentShaderSource: c
    }),
    TEXTURED: r({
      vertexFormat: t.POSITION_NORMAL_AND_ST,
      vertexShaderSource: u,
      fragmentShaderSource: i
    }),
    ALL: r({
      vertexFormat: t.ALL,
      vertexShaderSource: S,
      fragmentShaderSource: a
    })
  }, h;
});