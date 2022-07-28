"use strict";

define(["../Core/Color", "../Core/defined", "../Core/destroyObject", "../Core/PixelFormat", "../Renderer/ClearCommand", "../Renderer/Framebuffer", "../Renderer/PixelDatatype", "../Renderer/Renderbuffer", "../Renderer/RenderbufferFormat", "../Renderer/RenderState", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap"], function (d, f, e, u, t, h, _, a, c, r, l, p, T, s, m) {
  "use strict";

  function i() {
    this._colorTexture = void 0, this._idTexture = void 0, this._depthStencilTexture = void 0, this._depthStencilRenderbuffer = void 0, this._framebuffer = void 0, this._idFramebuffer = void 0, this._idClearColor = new d(0, 0, 0, 0), this._useHdr = void 0, this._clearCommand = new t({
      color: new d(0, 0, 0, 0),
      depth: 1,
      owner: this
    });
  }

  function x(e) {
    e._framebuffer = e._framebuffer && e._framebuffer.destroy(), e._idFramebuffer = e._idFramebuffer && e._idFramebuffer.destroy(), e._colorTexture = e._colorTexture && e._colorTexture.destroy(), e._idTexture = e._idTexture && e._idTexture.destroy(), e._depthStencilTexture = e._depthStencilTexture && e._depthStencilTexture.destroy(), e._depthStencilRenderbuffer = e._depthStencilRenderbuffer && e._depthStencilRenderbuffer.destroy(), e._depthStencilIdTexture = e._depthStencilIdTexture && e._depthStencilIdTexture.destroy(), e._depthStencilIdRenderbuffer = e._depthStencilIdRenderbuffer && e._depthStencilIdRenderbuffer.destroy(), e._framebuffer = void 0, e._idFramebuffer = void 0, e._colorTexture = void 0, e._idTexture = void 0, e._depthStencilTexture = void 0, e._depthStencilRenderbuffer = void 0, e._depthStencilIdTexture = void 0, e._depthStencilIdRenderbuffer = void 0;
  }

  return i.prototype.update = function (e, t, r) {
    var i,
        d = t.width,
        n = t.height,
        o = this._colorTexture;
    f(o) && o.width === d && o.height === n && r === this._useHdr || (x(this), i = (this._useHdr = r) ? e.halfFloatingPointTexture ? _.HALF_FLOAT : _.FLOAT : _.UNSIGNED_BYTE, this._colorTexture = new p({
      context: e,
      width: d,
      height: n,
      pixelFormat: u.RGBA,
      pixelDatatype: i,
      sampler: new l({
        wrapS: m.CLAMP_TO_EDGE,
        wrapT: m.CLAMP_TO_EDGE,
        minificationFilter: s.NEAREST,
        magnificationFilter: T.NEAREST
      })
    }), this._idTexture = new p({
      context: e,
      width: d,
      height: n,
      pixelFormat: u.RGBA,
      pixelDatatype: _.UNSIGNED_BYTE,
      sampler: new l({
        wrapS: m.CLAMP_TO_EDGE,
        wrapT: m.CLAMP_TO_EDGE,
        minificationFilter: s.NEAREST,
        magnificationFilter: T.NEAREST
      })
    }), e.depthTexture ? (this._depthStencilTexture = new p({
      context: e,
      width: d,
      height: n,
      pixelFormat: u.DEPTH_STENCIL,
      pixelDatatype: _.UNSIGNED_INT_24_8,
      sampler: new l({
        wrapS: m.CLAMP_TO_EDGE,
        wrapT: m.CLAMP_TO_EDGE,
        minificationFilter: s.NEAREST,
        magnificationFilter: T.NEAREST
      })
    }), this._depthStencilIdTexture = new p({
      context: e,
      width: d,
      height: n,
      pixelFormat: u.DEPTH_STENCIL,
      pixelDatatype: _.UNSIGNED_INT_24_8,
      sampler: new l({
        wrapS: m.CLAMP_TO_EDGE,
        wrapT: m.CLAMP_TO_EDGE,
        minificationFilter: s.NEAREST,
        magnificationFilter: T.NEAREST
      })
    })) : (this._depthStencilRenderbuffer = new a({
      context: e,
      width: d,
      height: n,
      format: c.DEPTH_STENCIL
    }), this._depthStencilIdRenderbuffer = new a({
      context: e,
      width: d,
      height: n,
      format: c.DEPTH_STENCIL
    })), this._framebuffer = new h({
      context: e,
      colorTextures: [this._colorTexture],
      depthStencilTexture: this._depthStencilTexture,
      depthStencilRenderbuffer: this._depthStencilRenderbuffer,
      destroyAttachments: !1
    }), this._idFramebuffer = new h({
      context: e,
      colorTextures: [this._idTexture],
      depthStencilTexture: this._depthStencilIdTexture,
      depthStencilRenderbuffer: this._depthStencilIdRenderbuffer,
      destroyAttachments: !1
    }));
  }, i.prototype.clear = function (e, t, r) {
    var i = t.framebuffer;
    t.framebuffer = this._framebuffer, d.clone(r, this._clearCommand.color), this._clearCommand.execute(e, t), t.framebuffer = this._idFramebuffer, d.clone(this._idClearColor, this._clearCommand.color), this._clearCommand.execute(e, t), t.framebuffer = i;
  }, i.prototype.getFramebuffer = function () {
    return this._framebuffer;
  }, i.prototype.getIdFramebuffer = function () {
    return this._idFramebuffer;
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return x(this), e(this);
  }, i;
});