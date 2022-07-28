"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/FeatureDetection", "../Core/VertexFormat", "../Shaders/Appearances/PolylineMaterialAppearanceVS", "../Shaders/PolylineCommon", "../Shaders/PolylineFS", "./Appearance", "./Material"], function (a, n, e, r, t, o, i, S, s, u) {
  "use strict";

  var c = i + "\n" + o,
      d = S;

  function h(e) {
    e = a(e, a.EMPTY_OBJECT);
    var r = a(e.translucent, !0),
        t = h.VERTEX_FORMAT;
    this.material = n(e.material) ? e.material : u.fromType(u.ColorType), this.translucent = r, this._vertexShaderSource = a(e.vertexShaderSource, c), this._fragmentShaderSource = a(e.fragmentShaderSource, d), this._renderState = s.getDefaultRenderState(r, !1, e.renderState), this._closed = !1, this._vertexFormat = t;
  }

  return r.isInternetExplorer() || (c = "#define CLIP_POLYLINE \n" + c), e(h.prototype, {
    vertexShaderSource: {
      get: function get() {
        var e = this._vertexShaderSource;
        return -1 !== this.material.shaderSource.search(/varying\s+float\s+v_polylineAngle;/g) && (e = "#define POLYLINE_DASH\n" + e), e;
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
    }
  }), h.VERTEX_FORMAT = t.POSITION_AND_ST, h.prototype.getFragmentShaderSource = s.prototype.getFragmentShaderSource, h.prototype.isTranslucent = s.prototype.isTranslucent, h.prototype.getRenderState = s.prototype.getRenderState, h;
});