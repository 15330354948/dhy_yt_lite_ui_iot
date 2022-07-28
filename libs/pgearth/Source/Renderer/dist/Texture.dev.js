"use strict";

define(["../Core/Cartesian2", "../Core/Check", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Math", "../Core/PixelFormat", "../Core/WebGLConstants", "./ContextLimits", "./MipmapHint", "./PixelDatatype", "./Sampler", "./TextureMagnificationFilter", "./TextureMinificationFilter"], function (c, w, d, P, F, e, t, L, r, g, A, N, a, O, C, h, f) {
  "use strict";

  function p(e) {
    e = P(e, P.EMPTY_OBJECT), w.defined("options.context", e.context);
    var t = e.context,
        i = e.width,
        r = e.height,
        a = e.source;
    F(a) && (F(i) || (i = P(a.videoWidth, a.width)), F(r) || (r = P(a.videoHeight, a.height)));
    var o = P(e.pixelFormat, g.RGBA),
        n = P(e.pixelDatatype, O.UNSIGNED_BYTE),
        s = o,
        h = g.isCompressedFormat(s);
    if (t.webgl2) if (o === g.DEPTH_STENCIL ? s = A.DEPTH24_STENCIL8 : o === g.DEPTH_COMPONENT && (n === O.UNSIGNED_SHORT ? s = A.DEPTH_COMPONENT16 : n === O.UNSIGNED_INT && (s = A.DEPTH_COMPONENT24)), n === O.FLOAT) switch (o) {
      case g.RGBA:
        s = A.RGBA32F;
        break;

      case g.RGB:
        s = A.RGB32F;
        break;

      case g.RG:
        s = A.RG32F;
        break;

      case g.R:
        s = A.R32F;
    } else if (n === O.HALF_FLOAT) switch (o) {
      case g.RGBA:
        s = A.RGBA16F;
        break;

      case g.RGB:
        s = A.RGB16F;
        break;

      case g.RG:
        s = A.RG16F;
        break;

      case g.R:
        s = A.R16F;
    }
    if (!F(i) || !F(r)) throw new L("options requires a source field to create an initialized texture or width and height fields to create a blank texture.");
    if (w.typeOf.number.greaterThan("width", i, 0), i > N.maximumTextureSize) throw new L("Width must be less than or equal to the maximum texture size (" + N.maximumTextureSize + ").  Check maximumTextureSize.");
    if (w.typeOf.number.greaterThan("height", r, 0), r > N.maximumTextureSize) throw new L("Height must be less than or equal to the maximum texture size (" + N.maximumTextureSize + ").  Check maximumTextureSize.");
    if (!g.validate(o)) throw new L("Invalid options.pixelFormat.");
    if (!h && !O.validate(n)) throw new L("Invalid options.pixelDatatype.");
    if (o === g.DEPTH_COMPONENT && n !== O.UNSIGNED_SHORT && n !== O.UNSIGNED_INT) throw new L("When options.pixelFormat is DEPTH_COMPONENT, options.pixelDatatype must be UNSIGNED_SHORT or UNSIGNED_INT.");
    if (o === g.DEPTH_STENCIL && n !== O.UNSIGNED_INT_24_8) throw new L("When options.pixelFormat is DEPTH_STENCIL, options.pixelDatatype must be UNSIGNED_INT_24_8.");
    if (n === O.FLOAT && !t.floatingPointTexture) throw new L("When options.pixelDatatype is FLOAT, this WebGL implementation must support the OES_texture_float extension.  Check context.floatingPointTexture.");
    if (n === O.HALF_FLOAT && !t.halfFloatingPointTexture) throw new L("When options.pixelDatatype is HALF_FLOAT, this WebGL implementation must support the OES_texture_half_float extension. Check context.halfFloatingPointTexture.");

    if (g.isDepthFormat(o)) {
      if (F(a)) throw new L("When options.pixelFormat is DEPTH_COMPONENT or DEPTH_STENCIL, source cannot be provided.");
      if (!t.depthTexture) throw new L("When options.pixelFormat is DEPTH_COMPONENT or DEPTH_STENCIL, this WebGL implementation must support WEBGL_depth_texture.  Check context.depthTexture.");
    }

    if (h) {
      if (!F(a) || !F(a.arrayBufferView)) throw new L("When options.pixelFormat is compressed, options.source.arrayBufferView must be defined.");
      if (g.isDXTFormat(s) && !t.s3tc) throw new L("When options.pixelFormat is S3TC compressed, this WebGL implementation must support the WEBGL_texture_compression_s3tc extension. Check context.s3tc.");
      if (g.isPVRTCFormat(s) && !t.pvrtc) throw new L("When options.pixelFormat is PVRTC compressed, this WebGL implementation must support the WEBGL_texture_compression_pvrtc extension. Check context.pvrtc.");
      if (g.isETC1Format(s) && !t.etc1) throw new L("When options.pixelFormat is ETC1 compressed, this WebGL implementation must support the WEBGL_texture_compression_etc1 extension. Check context.etc1.");
      if (g.compressedTextureSizeInBytes(s, i, r) !== a.arrayBufferView.byteLength) throw new L("The byte length of the array buffer is invalid for the compressed texture with the given width and height.");
    }

    var f = e.preMultiplyAlpha || o === g.RGB || o === g.LUMINANCE,
        p = P(e.flipY, !0),
        u = !0,
        _ = t._gl,
        l = _.TEXTURE_2D,
        m = _.createTexture();

    _.activeTexture(_.TEXTURE0), _.bindTexture(l, m);
    var x,
        T,
        E = 4;
    F(a) && F(a.arrayBufferView) && !h && (E = g.alignmentInBytes(o, n, i)), _.pixelStorei(_.UNPACK_ALIGNMENT, E), F(a) ? F(a.arrayBufferView) ? (_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _.pixelStorei(_.UNPACK_FLIP_Y_WEBGL, !1), x = a.arrayBufferView, h ? _.compressedTexImage2D(l, 0, s, i, r, 0, x) : (p && (x = g.flipY(x, o, n, i, r)), _.texImage2D(l, 0, s, i, r, 0, o, n, x))) : F(a.framebuffer) ? (_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), _.pixelStorei(_.UNPACK_FLIP_Y_WEBGL, !1), a.framebuffer !== t.defaultFramebuffer && a.framebuffer._bind(), _.copyTexImage2D(l, 0, s, a.xOffset, a.yOffset, i, r, 0), a.framebuffer !== t.defaultFramebuffer && a.framebuffer._unBind()) : (_.pixelStorei(_.UNPACK_PREMULTIPLY_ALPHA_WEBGL, f), _.pixelStorei(_.UNPACK_FLIP_Y_WEBGL, p), _.texImage2D(l, 0, s, o, n, a)) : (_.texImage2D(l, 0, s, i, r, 0, o, n, null), u = !1), _.bindTexture(l, null), T = h ? g.compressedTextureSizeInBytes(o, i, r) : g.textureSizeInBytes(o, n, i, r), this._id = d(), this._context = t, this._textureFilterAnisotropic = t._textureFilterAnisotropic, this._textureTarget = l, this._texture = m, this._pixelFormat = o, this._pixelDatatype = n, this._width = i, this._height = r, this._dimensions = new c(i, r), this._hasMipmap = !1, this._sizeInBytes = T, this._preMultiplyAlpha = f, this._flipY = p, this._initialized = u, this._sampler = void 0, this.sampler = F(e.sampler) ? e.sampler : new C();
  }

  return p.create = function (e) {
    return new p(e);
  }, p.fromFramebuffer = function (e) {
    e = P(e, P.EMPTY_OBJECT), w.defined("options.context", e.context);
    var t = e.context,
        i = t._gl,
        r = P(e.pixelFormat, g.RGB),
        a = P(e.framebufferXOffset, 0),
        o = P(e.framebufferYOffset, 0),
        n = P(e.width, i.drawingBufferWidth),
        s = P(e.height, i.drawingBufferHeight),
        h = e.framebuffer;
    if (!g.validate(r)) throw new L("Invalid pixelFormat.");
    if (g.isDepthFormat(r) || g.isCompressedFormat(r)) throw new L("pixelFormat cannot be DEPTH_COMPONENT, DEPTH_STENCIL or a compressed format.");
    if (w.defined("options.context", e.context), w.typeOf.number.greaterThanOrEquals("framebufferXOffset", a, 0), w.typeOf.number.greaterThanOrEquals("framebufferYOffset", o, 0), a + n > i.drawingBufferWidth) throw new L("framebufferXOffset + width must be less than or equal to drawingBufferWidth");
    if (o + s > i.drawingBufferHeight) throw new L("framebufferYOffset + height must be less than or equal to drawingBufferHeight.");
    return new p({
      context: t,
      width: n,
      height: s,
      pixelFormat: r,
      source: {
        framebuffer: F(h) ? h : t.defaultFramebuffer,
        xOffset: a,
        yOffset: o,
        width: n,
        height: s
      }
    });
  }, e(p.prototype, {
    id: {
      get: function get() {
        return this._id;
      }
    },
    sampler: {
      get: function get() {
        return this._sampler;
      },
      set: function set(e) {
        var t = e.minificationFilter,
            i = e.magnificationFilter,
            r = t === f.NEAREST_MIPMAP_NEAREST || t === f.NEAREST_MIPMAP_LINEAR || t === f.LINEAR_MIPMAP_NEAREST || t === f.LINEAR_MIPMAP_LINEAR,
            a = this._context,
            o = this._pixelDatatype;
        (o === O.FLOAT && !a.textureFloatLinear || o === O.HALF_FLOAT && !a.textureHalfFloatLinear) && (t = r ? f.NEAREST_MIPMAP_NEAREST : f.NEAREST, i = h.NEAREST);
        var n = a._gl,
            s = this._textureTarget;
        n.activeTexture(n.TEXTURE0), n.bindTexture(s, this._texture), n.texParameteri(s, n.TEXTURE_MIN_FILTER, t), n.texParameteri(s, n.TEXTURE_MAG_FILTER, i), n.texParameteri(s, n.TEXTURE_WRAP_S, e.wrapS), n.texParameteri(s, n.TEXTURE_WRAP_T, e.wrapT), F(this._textureFilterAnisotropic) && n.texParameteri(s, this._textureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, e.maximumAnisotropy), n.bindTexture(s, null), this._sampler = e;
      }
    },
    pixelFormat: {
      get: function get() {
        return this._pixelFormat;
      }
    },
    pixelDatatype: {
      get: function get() {
        return this._pixelDatatype;
      }
    },
    dimensions: {
      get: function get() {
        return this._dimensions;
      }
    },
    preMultiplyAlpha: {
      get: function get() {
        return this._preMultiplyAlpha;
      }
    },
    flipY: {
      get: function get() {
        return this._flipY;
      }
    },
    width: {
      get: function get() {
        return this._width;
      }
    },
    height: {
      get: function get() {
        return this._height;
      }
    },
    sizeInBytes: {
      get: function get() {
        return this._hasMipmap ? Math.floor(4 * this._sizeInBytes / 3) : this._sizeInBytes;
      }
    },
    _target: {
      get: function get() {
        return this._textureTarget;
      }
    }
  }), p.prototype.copyFrom = function (e, t, i) {
    if (t = P(t, 0), i = P(i, 0), w.defined("source", e), g.isDepthFormat(this._pixelFormat)) throw new L("Cannot call copyFrom when the texture pixel format is DEPTH_COMPONENT or DEPTH_STENCIL.");
    if (g.isCompressedFormat(this._pixelFormat)) throw new L("Cannot call copyFrom with a compressed texture pixel format.");
    w.typeOf.number.greaterThanOrEquals("xOffset", t, 0), w.typeOf.number.greaterThanOrEquals("yOffset", i, 0), w.typeOf.number.lessThanOrEquals("xOffset + source.width", t + e.width, this._width), w.typeOf.number.lessThanOrEquals("yOffset + source.height", i + e.height, this._height);
    var r = this._context._gl,
        a = this._textureTarget;
    r.activeTexture(r.TEXTURE0), r.bindTexture(a, this._texture);
    var o = e.width,
        n = e.height,
        s = e.arrayBufferView,
        h = this._width,
        f = this._height,
        p = this._pixelFormat,
        u = this._pixelDatatype,
        _ = this._preMultiplyAlpha,
        l = this._flipY,
        m = 4;
    F(s) && (m = g.alignmentInBytes(p, u, o)), r.pixelStorei(r.UNPACK_ALIGNMENT, m);
    var x,
        T = !1;
    this._initialized || (0 === t && 0 === i && o === h && n === f ? (F(s) ? (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), l && (s = g.flipY(s, p, u, h, f)), r.texImage2D(a, 0, p, h, f, 0, p, u, s)) : (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, l), r.texImage2D(a, 0, p, p, u, e)), T = !0) : (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), x = g.createTypedArray(p, u, h, f), r.texImage2D(a, 0, p, h, f, 0, p, u, x)), this._initialized = !0), T || (F(s) ? (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), l && (s = g.flipY(s, p, u, o, n)), r.texSubImage2D(a, 0, t, i, o, n, p, u, s)) : (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, l), r.texSubImage2D(a, 0, t, i, p, u, e))), r.bindTexture(a, null);
  }, p.prototype.copyFromFramebuffer = function (e, t, i, r, a, o) {
    if (e = P(e, 0), t = P(t, 0), i = P(i, 0), r = P(r, 0), a = P(a, this._width), o = P(o, this._height), g.isDepthFormat(this._pixelFormat)) throw new L("Cannot call copyFromFramebuffer when the texture pixel format is DEPTH_COMPONENT or DEPTH_STENCIL.");
    if (this._pixelDatatype === O.FLOAT) throw new L("Cannot call copyFromFramebuffer when the texture pixel data type is FLOAT.");
    if (this._pixelDatatype === O.HALF_FLOAT) throw new L("Cannot call copyFromFramebuffer when the texture pixel data type is HALF_FLOAT.");
    if (g.isCompressedFormat(this._pixelFormat)) throw new L("Cannot call copyFrom with a compressed texture pixel format.");
    w.typeOf.number.greaterThanOrEquals("xOffset", e, 0), w.typeOf.number.greaterThanOrEquals("yOffset", t, 0), w.typeOf.number.greaterThanOrEquals("framebufferXOffset", i, 0), w.typeOf.number.greaterThanOrEquals("framebufferYOffset", r, 0), w.typeOf.number.lessThanOrEquals("xOffset + width", e + a, this._width), w.typeOf.number.lessThanOrEquals("yOffset + height", t + o, this._height);
    var n = this._context._gl,
        s = this._textureTarget;
    n.activeTexture(n.TEXTURE0), n.bindTexture(s, this._texture), n.copyTexSubImage2D(s, 0, e, t, i, r, a, o), n.bindTexture(s, null), this._initialized = !0;
  }, p.prototype.generateMipmap = function (e) {
    if (e = P(e, a.DONT_CARE), g.isDepthFormat(this._pixelFormat)) throw new L("Cannot call generateMipmap when the texture pixel format is DEPTH_COMPONENT or DEPTH_STENCIL.");
    if (g.isCompressedFormat(this._pixelFormat)) throw new L("Cannot call generateMipmap with a compressed pixel format.");
    if (1 < this._width && !r.isPowerOfTwo(this._width)) throw new L("width must be a power of two to call generateMipmap().");
    if (1 < this._height && !r.isPowerOfTwo(this._height)) throw new L("height must be a power of two to call generateMipmap().");
    if (!a.validate(e)) throw new L("hint is invalid.");
    this._hasMipmap = !0;
    var t = this._context._gl,
        i = this._textureTarget;
    t.hint(t.GENERATE_MIPMAP_HINT, e), t.activeTexture(t.TEXTURE0), t.bindTexture(i, this._texture), t.generateMipmap(i), t.bindTexture(i, null);
  }, p.prototype.isDestroyed = function () {
    return !1;
  }, p.prototype.destroy = function () {
    return this._context._gl.deleteTexture(this._texture), t(this);
  }, p;
});