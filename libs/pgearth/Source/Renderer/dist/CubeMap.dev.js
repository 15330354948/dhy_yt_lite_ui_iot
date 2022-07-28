"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Math", "../Core/PixelFormat", "./ContextLimits", "./CubeMapFace", "./MipmapHint", "./PixelDatatype", "./Sampler", "./TextureMagnificationFilter", "./TextureMinificationFilter"], function (m, v, P, e, t, f, r, I, c, M, n, U, X, s, E) {
  "use strict";

  function i(e) {
    e = v(e, v.EMPTY_OBJECT), m.defined("options.context", e.context);
    var a,
        t,
        i = e.context,
        r = e.source;

    if (P(r)) {
      var n = [r.positiveX, r.negativeX, r.positiveY, r.negativeY, r.positiveZ, r.negativeZ];
      if (!(n[0] && n[1] && n[2] && n[3] && n[4] && n[5])) throw new f("options.source requires positiveX, negativeX, positiveY, negativeY, positiveZ, and negativeZ faces.");
      a = n[0].width, t = n[0].height;

      for (var _ = 1; _ < 6; ++_) {
        if (Number(n[_].width) !== a || Number(n[_].height) !== t) throw new f("Each face in options.source must have the same width and height.");
      }
    } else a = e.width, t = e.height;

    var o = a,
        s = v(e.pixelFormat, I.RGBA),
        E = v(e.pixelDatatype, U.UNSIGNED_BYTE);
    if (!P(a) || !P(t)) throw new f("options requires a source field to create an initialized cube map or width and height fields to create a blank cube map.");
    if (a !== t) throw new f("Width must equal height.");
    if (o <= 0) throw new f("Width and height must be greater than zero.");
    if (o > c.maximumCubeMapSize) throw new f("Width and height must be less than or equal to the maximum cube map size (" + c.maximumCubeMapSize + ").  Check maximumCubeMapSize.");
    if (!I.validate(s)) throw new f("Invalid options.pixelFormat.");
    if (I.isDepthFormat(s)) throw new f("options.pixelFormat cannot be DEPTH_COMPONENT or DEPTH_STENCIL.");
    if (!U.validate(E)) throw new f("Invalid options.pixelDatatype.");
    if (E === U.FLOAT && !i.floatingPointTexture) throw new f("When options.pixelDatatype is FLOAT, this WebGL implementation must support the OES_texture_float extension.");
    if (E === U.HALF_FLOAT && !i.halfFloatingPointTexture) throw new f("When options.pixelDatatype is HALF_FLOAT, this WebGL implementation must support the OES_texture_half_float extension.");
    var h = 6 * I.textureSizeInBytes(s, E, o, o),
        p = e.preMultiplyAlpha || s === I.RGB || s === I.LUMINANCE,
        T = v(e.flipY, !0),
        u = i._gl,
        l = u.TEXTURE_CUBE_MAP,
        A = u.createTexture();

    function x(e, t, i, r) {
      var n = t.arrayBufferView;
      P(n) || (n = t.bufferView);
      var _ = 4;
      P(n) && (_ = I.alignmentInBytes(s, E, a)), u.pixelStorei(u.UNPACK_ALIGNMENT, _), P(n) ? (u.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, !1), r && (n = I.flipY(n, s, E, o, o)), u.texImage2D(e, 0, s, o, o, 0, s, E, n)) : (u.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL, i), u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, r), u.texImage2D(e, 0, s, s, E, t));
    }

    u.activeTexture(u.TEXTURE0), u.bindTexture(l, A), P(r) ? (x(u.TEXTURE_CUBE_MAP_POSITIVE_X, r.positiveX, p, T), x(u.TEXTURE_CUBE_MAP_NEGATIVE_X, r.negativeX, p, T), x(u.TEXTURE_CUBE_MAP_POSITIVE_Y, r.positiveY, p, T), x(u.TEXTURE_CUBE_MAP_NEGATIVE_Y, r.negativeY, p, T), x(u.TEXTURE_CUBE_MAP_POSITIVE_Z, r.positiveZ, p, T), x(u.TEXTURE_CUBE_MAP_NEGATIVE_Z, r.negativeZ, p, T)) : (u.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X, 0, s, o, o, 0, s, E, null), u.texImage2D(u.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, s, o, o, 0, s, E, null), u.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, s, o, o, 0, s, E, null), u.texImage2D(u.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, s, o, o, 0, s, E, null), u.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, s, o, o, 0, s, E, null), u.texImage2D(u.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, s, o, o, 0, s, E, null)), u.bindTexture(l, null), this._context = i, this._textureFilterAnisotropic = i._textureFilterAnisotropic, this._textureTarget = l, this._texture = A, this._pixelFormat = s, this._pixelDatatype = E, this._size = o, this._hasMipmap = !1, this._sizeInBytes = h, this._preMultiplyAlpha = p, this._flipY = T, this._sampler = void 0;
    var g = P(r);
    this._positiveX = new M(u, A, l, u.TEXTURE_CUBE_MAP_POSITIVE_X, s, E, o, p, T, g), this._negativeX = new M(u, A, l, u.TEXTURE_CUBE_MAP_NEGATIVE_X, s, E, o, p, T, g), this._positiveY = new M(u, A, l, u.TEXTURE_CUBE_MAP_POSITIVE_Y, s, E, o, p, T, g), this._negativeY = new M(u, A, l, u.TEXTURE_CUBE_MAP_NEGATIVE_Y, s, E, o, p, T, g), this._positiveZ = new M(u, A, l, u.TEXTURE_CUBE_MAP_POSITIVE_Z, s, E, o, p, T, g), this._negativeZ = new M(u, A, l, u.TEXTURE_CUBE_MAP_NEGATIVE_Z, s, E, o, p, T, g), this.sampler = P(e.sampler) ? e.sampler : new X();
  }

  return e(i.prototype, {
    positiveX: {
      get: function get() {
        return this._positiveX;
      }
    },
    negativeX: {
      get: function get() {
        return this._negativeX;
      }
    },
    positiveY: {
      get: function get() {
        return this._positiveY;
      }
    },
    negativeY: {
      get: function get() {
        return this._negativeY;
      }
    },
    positiveZ: {
      get: function get() {
        return this._positiveZ;
      }
    },
    negativeZ: {
      get: function get() {
        return this._negativeZ;
      }
    },
    sampler: {
      get: function get() {
        return this._sampler;
      },
      set: function set(e) {
        var t = e.minificationFilter,
            i = e.magnificationFilter,
            r = t === E.NEAREST_MIPMAP_NEAREST || t === E.NEAREST_MIPMAP_LINEAR || t === E.LINEAR_MIPMAP_NEAREST || t === E.LINEAR_MIPMAP_LINEAR,
            n = this._context,
            _ = this._pixelDatatype;
        (_ === U.FLOAT && !n.textureFloatLinear || _ === U.HALF_FLOAT && !n.textureHalfFloatLinear) && (t = r ? E.NEAREST_MIPMAP_NEAREST : E.NEAREST, i = s.NEAREST);
        var a = n._gl,
            o = this._textureTarget;
        a.activeTexture(a.TEXTURE0), a.bindTexture(o, this._texture), a.texParameteri(o, a.TEXTURE_MIN_FILTER, t), a.texParameteri(o, a.TEXTURE_MAG_FILTER, i), a.texParameteri(o, a.TEXTURE_WRAP_S, e.wrapS), a.texParameteri(o, a.TEXTURE_WRAP_T, e.wrapT), P(this._textureFilterAnisotropic) && a.texParameteri(o, this._textureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, e.maximumAnisotropy), a.bindTexture(o, null), this._sampler = e;
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
    width: {
      get: function get() {
        return this._size;
      }
    },
    height: {
      get: function get() {
        return this._size;
      }
    },
    sizeInBytes: {
      get: function get() {
        return this._hasMipmap ? Math.floor(4 * this._sizeInBytes / 3) : this._sizeInBytes;
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
    _target: {
      get: function get() {
        return this._textureTarget;
      }
    }
  }), i.prototype.generateMipmap = function (e) {
    if (e = v(e, n.DONT_CARE), 1 < this._size && !r.isPowerOfTwo(this._size)) throw new f("width and height must be a power of two to call generateMipmap().");
    if (!n.validate(e)) throw new f("hint is invalid.");
    this._hasMipmap = !0;
    var t = this._context._gl,
        i = this._textureTarget;
    t.hint(t.GENERATE_MIPMAP_HINT, e), t.activeTexture(t.TEXTURE0), t.bindTexture(i, this._texture), t.generateMipmap(i), t.bindTexture(i, null);
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    return this._context._gl.deleteTexture(this._texture), this._positiveX = t(this._positiveX), this._negativeX = t(this._negativeX), this._positiveY = t(this._positiveY), this._negativeY = t(this._negativeY), this._positiveZ = t(this._positiveZ), this._negativeZ = t(this._negativeZ), t(this);
  }, i;
});