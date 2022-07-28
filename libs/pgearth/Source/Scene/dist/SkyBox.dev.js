"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

define(["../Core/BoxGeometry", "../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Core/GeometryPipeline", "../Core/Matrix4", "../Core/VertexFormat", "../Renderer/BufferUsage", "../Renderer/CubeMap", "../Renderer/DrawCommand", "../Renderer/loadCubeMap", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/VertexArray", "../Shaders/SkyBoxFS", "../Shaders/SkyBoxVS", "./BlendingState", "./SceneMode"], function (c, d, t, p, r, h, v, o, f, y, m, i, _, b, g, M, S, x, C, w, R) {
  "use strict";

  function e(e) {
    this.sources = e.sources, this._sources = void 0, this.show = t(e.show, !0), this._command = new i({
      modelMatrix: o.clone(o.IDENTITY),
      owner: this
    }), this._cubeMap = void 0, this._attributeLocations = void 0, this._useHdr = void 0;
  }

  return e.prototype.update = function (e, t) {
    var r = this;

    if (this.show && (e.mode === R.SCENE3D || e.mode === R.MORPHING) && e.passes.render) {
      var o = e.context;

      if (this._sources !== this.sources) {
        this._sources = this.sources;
        var i = this.sources;
        if (!(p(i.positiveX) && p(i.negativeX) && p(i.positiveY) && p(i.negativeY) && p(i.positiveZ) && p(i.negativeZ))) throw new h("this.sources is required and must have positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ properties.");
        if (_typeof(i.positiveX) != _typeof(i.negativeX) || _typeof(i.positiveX) != _typeof(i.positiveY) || _typeof(i.positiveX) != _typeof(i.negativeY) || _typeof(i.positiveX) != _typeof(i.positiveZ) || _typeof(i.positiveX) != _typeof(i.negativeZ)) throw new h("this.sources properties must all be the same type.");
        "string" == typeof i.positiveX ? _(o, this._sources).then(function (e) {
          r._cubeMap = r._cubeMap && r._cubeMap.destroy(), r._cubeMap = e;
        }) : (this._cubeMap = this._cubeMap && this._cubeMap.destroy(), this._cubeMap = new m({
          context: o,
          source: i
        }));
      }

      var s,
          a,
          n,
          u = this._command;
      if (p(u.vertexArray) || (u.uniformMap = {
        u_cubeMap: function u_cubeMap() {
          return r._cubeMap;
        }
      }, s = c.createGeometry(c.fromDimensions({
        dimensions: new d(2, 2, 2),
        vertexFormat: f.POSITION_ONLY
      })), a = this._attributeLocations = v.createAttributeLocations(s), u.vertexArray = S.fromGeometry({
        context: o,
        geometry: s,
        attributeLocations: a,
        bufferUsage: y.STATIC_DRAW
      }), u.renderState = b.fromCache({
        blending: w.ALPHA_BLEND
      })), p(u.shaderProgram) && this._useHdr === t || (n = new M({
        defines: [t ? "HDR" : ""],
        sources: [x]
      }), u.shaderProgram = g.fromCache({
        context: o,
        vertexShaderSource: C,
        fragmentShaderSource: n,
        attributeLocations: this._attributeLocations
      }), this._useHdr = t), p(this._cubeMap)) return u;
    }
  }, e.prototype.isDestroyed = function () {
    return !1;
  }, e.prototype.destroy = function () {
    var e = this._command;
    return e.vertexArray = e.vertexArray && e.vertexArray.destroy(), e.shaderProgram = e.shaderProgram && e.shaderProgram.destroy(), this._cubeMap = this._cubeMap && this._cubeMap.destroy(), r(this);
  }, e;
});