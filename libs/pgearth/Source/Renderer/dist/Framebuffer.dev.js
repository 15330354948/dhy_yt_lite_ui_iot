"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/PixelFormat", "./ContextLimits", "./PixelDatatype"], function (c, _, p, e, i, b, T, x, m) {
  "use strict";

  function R(e, t, r) {
    var n = e._gl;
    n.framebufferTexture2D(n.FRAMEBUFFER, t, r._target, r._texture, 0);
  }

  function C(e, t, r) {
    var n = e._gl;
    n.framebufferRenderbuffer(n.FRAMEBUFFER, t, n.RENDERBUFFER, r._getRenderbuffer());
  }

  function t(e) {
    var t = (e = _(e, _.EMPTY_OBJECT)).context;

    c.defined("options.context", t);
    var r = t._gl,
        n = x.maximumColorAttachments;
    if (this._gl = r, this._framebuffer = r.createFramebuffer(), this._colorTextures = [], this._colorRenderbuffers = [], this._activeColorAttachments = [], this._depthTexture = void 0, this._depthRenderbuffer = void 0, this._stencilRenderbuffer = void 0, this._depthStencilTexture = void 0, this._depthStencilRenderbuffer = void 0, this.destroyAttachments = _(e.destroyAttachments, !0), p(e.colorTextures) && p(e.colorRenderbuffers)) throw new b("Cannot have both color texture and color renderbuffer attachments.");
    if (p(e.depthTexture) && p(e.depthRenderbuffer)) throw new b("Cannot have both a depth texture and depth renderbuffer attachment.");
    if (p(e.depthStencilTexture) && p(e.depthStencilRenderbuffer)) throw new b("Cannot have both a depth-stencil texture and depth-stencil renderbuffer attachment.");
    var o,
        h,
        i,
        f,
        s = p(e.depthTexture) || p(e.depthRenderbuffer),
        u = p(e.depthStencilTexture) || p(e.depthStencilRenderbuffer);
    if (s && u) throw new b("Cannot have both a depth and depth-stencil attachment.");
    if (p(e.stencilRenderbuffer) && u) throw new b("Cannot have both a stencil and depth-stencil attachment.");
    if (s && p(e.stencilRenderbuffer)) throw new b("Cannot have both a depth and stencil attachment.");

    if (this._bind(), p(e.colorTextures)) {
      var d,
          l = e.colorTextures;
      if (n < (d = this._colorTextures.length = this._activeColorAttachments.length = l.length)) throw new b("The number of color attachments exceeds the number supported.");

      for (i = 0; i < d; ++i) {
        if (o = l[i], !T.isColorFormat(o.pixelFormat)) throw new b("The color-texture pixel-format must be a color format.");
        if (o.pixelDatatype === m.FLOAT && !t.colorBufferFloat) throw new b("The color texture pixel datatype is FLOAT and the WebGL implementation does not support the EXT_color_buffer_float or WEBGL_color_buffer_float extensions. See Context.colorBufferFloat.");
        if (o.pixelDatatype === m.HALF_FLOAT && !t.colorBufferHalfFloat) throw new b("The color texture pixel datatype is HALF_FLOAT and the WebGL implementation does not support the EXT_color_buffer_half_float extension. See Context.colorBufferHalfFloat.");
        R(this, f = this._gl.COLOR_ATTACHMENT0 + i, o), this._activeColorAttachments[i] = f, this._colorTextures[i] = o;
      }
    }

    if (p(e.colorRenderbuffers)) {
      var a = e.colorRenderbuffers;
      if (n < (d = this._colorRenderbuffers.length = this._activeColorAttachments.length = a.length)) throw new b("The number of color attachments exceeds the number supported.");

      for (i = 0; i < d; ++i) {
        h = a[i], C(this, f = this._gl.COLOR_ATTACHMENT0 + i, h), this._activeColorAttachments[i] = f, this._colorRenderbuffers[i] = h;
      }
    }

    if (p(e.depthTexture)) {
      if ((o = e.depthTexture).pixelFormat !== T.DEPTH_COMPONENT) throw new b("The depth-texture pixel-format must be DEPTH_COMPONENT.");
      R(this, this._gl.DEPTH_ATTACHMENT, o), this._depthTexture = o;
    }

    if (p(e.depthRenderbuffer) && (h = e.depthRenderbuffer, C(this, this._gl.DEPTH_ATTACHMENT, h), this._depthRenderbuffer = h), p(e.stencilRenderbuffer) && (h = e.stencilRenderbuffer, C(this, this._gl.STENCIL_ATTACHMENT, h), this._stencilRenderbuffer = h), p(e.depthStencilTexture)) {
      if ((o = e.depthStencilTexture).pixelFormat !== T.DEPTH_STENCIL) throw new b("The depth-stencil pixel-format must be DEPTH_STENCIL.");
      R(this, this._gl.DEPTH_STENCIL_ATTACHMENT, o), this._depthStencilTexture = o;
    }

    p(e.depthStencilRenderbuffer) && (h = e.depthStencilRenderbuffer, C(this, this._gl.DEPTH_STENCIL_ATTACHMENT, h), this._depthStencilRenderbuffer = h), this._unBind();
  }

  return e(t.prototype, {
    status: {
      get: function get() {
        this._bind();

        var e = this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER);

        return this._unBind(), e;
      }
    },
    numberOfColorAttachments: {
      get: function get() {
        return this._activeColorAttachments.length;
      }
    },
    depthTexture: {
      get: function get() {
        return this._depthTexture;
      }
    },
    depthRenderbuffer: {
      get: function get() {
        return this._depthRenderbuffer;
      }
    },
    stencilRenderbuffer: {
      get: function get() {
        return this._stencilRenderbuffer;
      }
    },
    depthStencilTexture: {
      get: function get() {
        return this._depthStencilTexture;
      }
    },
    depthStencilRenderbuffer: {
      get: function get() {
        return this._depthStencilRenderbuffer;
      }
    },
    hasDepthAttachment: {
      get: function get() {
        return !!(this.depthTexture || this.depthRenderbuffer || this.depthStencilTexture || this.depthStencilRenderbuffer);
      }
    }
  }), t.prototype._bind = function () {
    var e = this._gl;
    e.bindFramebuffer(e.FRAMEBUFFER, this._framebuffer);
  }, t.prototype._unBind = function () {
    var e = this._gl;
    e.bindFramebuffer(e.FRAMEBUFFER, null);
  }, t.prototype._getActiveColorAttachments = function () {
    return this._activeColorAttachments;
  }, t.prototype.getColorTexture = function (e) {
    if (!p(e) || e < 0 || e >= this._colorTextures.length) throw new b("index is required, must be greater than or equal to zero and must be less than the number of color attachments.");
    return this._colorTextures[e];
  }, t.prototype.getColorRenderbuffer = function (e) {
    if (!p(e) || e < 0 || e >= this._colorRenderbuffers.length) throw new b("index is required, must be greater than or equal to zero and must be less than the number of color attachments.");
    return this._colorRenderbuffers[e];
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    if (this.destroyAttachments) {
      for (var e = 0, t = this._colorTextures, r = t.length; e < r; ++e) {
        var n = t[e];
        p(n) && n.destroy();
      }

      for (var o = this._colorRenderbuffers, r = o.length, e = 0; e < r; ++e) {
        var h = o[e];
        p(h) && h.destroy();
      }

      this._depthTexture = this._depthTexture && this._depthTexture.destroy(), this._depthRenderbuffer = this._depthRenderbuffer && this._depthRenderbuffer.destroy(), this._stencilRenderbuffer = this._stencilRenderbuffer && this._stencilRenderbuffer.destroy(), this._depthStencilTexture = this._depthStencilTexture && this._depthStencilTexture.destroy(), this._depthStencilRenderbuffer = this._depthStencilRenderbuffer && this._depthStencilRenderbuffer.destroy();
    }

    return this._gl.deleteFramebuffer(this._framebuffer), i(this);
  }, t;
});