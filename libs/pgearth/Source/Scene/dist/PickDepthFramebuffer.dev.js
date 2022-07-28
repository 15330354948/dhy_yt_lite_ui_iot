"use strict";

define(["../Core/BoundingRectangle", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/Framebuffer", "../Renderer/PassState", "../Renderer/PixelDatatype", "../Renderer/Renderbuffer", "../Renderer/RenderbufferFormat", "../Renderer/Texture"], function (o, e, t, d, r, a, h, u, c, i, n, p) {
  "use strict";

  function s() {
    this._depthStencilTexture = void 0, this._framebuffer = void 0, this._passState = void 0;
  }

  function l(e) {
    e._framebuffer = e._framebuffer && e._framebuffer.destroy(), e._depthStencilTexture = e._depthStencilTexture && e._depthStencilTexture.destroy();
  }

  return s.prototype.update = function (e, t, r) {
    var i = r.width,
        n = r.height;
    d(this._framebuffer) && i === this._depthStencilTexture.width && n === this._depthStencilTexture.height || (l(this), function (e, t) {
      var r = t.drawingBufferWidth,
          i = t.drawingBufferHeight;
      e._depthStencilTexture = new p({
        context: t,
        width: r,
        height: i,
        pixelFormat: a.DEPTH_STENCIL,
        pixelDatatype: c.UNSIGNED_INT_24_8
      }), e._framebuffer = new h({
        context: t,
        depthStencilTexture: e._depthStencilTexture,
        destroyAttachments: !1
      });
      var n = new u(t);
      n.blendingEnabled = !1, n.scissorTest = {
        enabled: !0,
        rectangle: new o()
      }, n.viewport = new o(), e._passState = n;
    }(this, e));
    var s = this._framebuffer,
        f = this._passState;
    return f.framebuffer = s, f.viewport.width = i, f.viewport.height = n, f.scissorTest.rectangle.x = t.x, f.scissorTest.rectangle.y = n - t.y, f.scissorTest.rectangle.width = 1, f.scissorTest.rectangle.height = 1, f;
  }, s.prototype.isDestroyed = function () {
    return !1;
  }, s.prototype.destroy = function () {
    return l(this), r(this);
  }, s;
});