"use strict";

define(["../Core/BoundingRectangle", "../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/DeveloperError", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/ShaderSource", "../Shaders/ViewportQuadFS", "./BlendingState", "./Material"], function (o, t, i, e, s, n, m, h, d, l, a) {
  "use strict";

  function r(e, r) {
    this.show = !0, i(e) || (e = new o()), this.rectangle = o.clone(e), i(r) || (r = a.fromType(a.ColorType, {
      color: new t(1, 1, 1, 1)
    })), this.material = r, this._material = void 0, this._overlayCommand = void 0, this._rs = void 0;
  }

  return r.prototype.update = function (e) {
    if (this.show) {
      if (!i(this.material)) throw new s("this.material must be defined.");
      if (!i(this.rectangle)) throw new s("this.rectangle must be defined.");
      var r,
          t,
          a = this._rs;
      i(a) && o.equals(a.viewport, this.rectangle) || (this._rs = m.fromCache({
        blending: l.ALPHA_BLEND,
        viewport: this.rectangle
      })), e.passes.render && (r = e.context, this._material === this.material && i(this._overlayCommand) || (this._material = this.material, i(this._overlayCommand) && this._overlayCommand.shaderProgram.destroy(), t = new h({
        sources: [this._material.shaderSource, d]
      }), this._overlayCommand = r.createViewportQuadCommand(t, {
        renderState: this._rs,
        uniformMap: this._material._uniforms,
        owner: this
      }), this._overlayCommand.pass = n.OVERLAY), this._material.update(r), this._overlayCommand.uniformMap = this._material._uniforms, e.commandList.push(this._overlayCommand));
    }
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    return i(this._overlayCommand) && (this._overlayCommand.shaderProgram = this._overlayCommand.shaderProgram && this._overlayCommand.shaderProgram.destroy()), e(this);
  }, r;
});