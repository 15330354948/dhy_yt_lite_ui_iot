"use strict";

define(["../Core/BoundingRectangle", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Shaders/BrdfLutGeneratorFS"], function (a, d, e, r, f, u, s, m, c, h, _, p, x, l) {
  "use strict";

  function t() {
    this._framebuffer = void 0, this._colorTexture = void 0, this._drawCommand = void 0;
  }

  return e(t.prototype, {
    colorTexture: {
      get: function get() {
        return this._colorTexture;
      }
    }
  }), t.prototype.update = function (e) {
    var r, t, o, i, n;
    d(this._colorTexture) || (function (e, r) {
      var t = new h({
        context: r,
        width: 256,
        height: 256,
        pixelFormat: f.RGBA,
        pixelDatatype: s.UNSIGNED_BYTE,
        sampler: new c({
          wrapS: x.CLAMP_TO_EDGE,
          wrapT: x.CLAMP_TO_EDGE,
          minificationFilter: p.NEAREST,
          magnificationFilter: _.NEAREST
        })
      });
      e._colorTexture = t;
      var o = new u({
        context: r,
        colorTextures: [t],
        destroyAttachments: !1
      });
      e._framebuffer = o;
    }(this, r = e.context), o = r, i = (t = this)._framebuffer, n = o.createViewportQuadCommand(l, {
      framebuffer: i,
      renderState: m.fromCache({
        viewport: new a(0, 0, 256, 256)
      })
    }), t._drawCommand = n, this._drawCommand.execute(r), this._framebuffer = this._framebuffer && this._framebuffer.destroy(), this._drawCommand.shaderProgram = this._drawCommand.shaderProgram && this._drawCommand.shaderProgram.destroy());
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    return this._colorTexture = this._colorTexture && this._colorTexture.destroy(), r(this);
  }, t;
});