"use strict";

define(["../Core/defaultValue", "../Core/defineProperties", "../Core/FeatureDetection", "../Core/VertexFormat", "../Shaders/Appearances/PerInstanceFlatColorAppearanceFS", "../Shaders/Appearances/PolylineColorAppearanceVS", "../Shaders/PolylineCommon", "./Appearance"], function (n, e, t, r, a, o, S, c) {
  "use strict";

  var i = S + "\n" + o,
      u = a;

  function s(e) {
    e = n(e, n.EMPTY_OBJECT);
    var t = n(e.translucent, !0),
        r = s.VERTEX_FORMAT;
    this.material = void 0, this.translucent = t, this._vertexShaderSource = n(e.vertexShaderSource, i), this._fragmentShaderSource = n(e.fragmentShaderSource, u), this._renderState = c.getDefaultRenderState(t, !1, e.renderState), this._closed = !1, this._vertexFormat = r;
  }

  return t.isInternetExplorer() || (i = "#define CLIP_POLYLINE \n" + i), e(s.prototype, {
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
    }
  }), s.VERTEX_FORMAT = r.POSITION_ONLY, s.prototype.getFragmentShaderSource = c.prototype.getFragmentShaderSource, s.prototype.isTranslucent = c.prototype.isTranslucent, s.prototype.getRenderState = c.prototype.getRenderState, s;
});