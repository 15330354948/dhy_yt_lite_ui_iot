"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/PixelFormat", "./PixelDatatype"], function (g, y, m, e, A, T, l) {
  "use strict";

  function t(e, t, i, r, a, s, h, _, l, o) {
    this._gl = e, this._texture = t, this._textureTarget = i, this._targetFace = r, this._pixelFormat = a, this._pixelDatatype = s, this._size = h, this._preMultiplyAlpha = _, this._flipY = l, this._initialized = o;
  }

  return e(t.prototype, {
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
    _target: {
      get: function get() {
        return this._targetFace;
      }
    }
  }), t.prototype.copyFrom = function (e, t, i) {
    if (t = y(t, 0), i = y(i, 0), g.defined("source", e), g.typeOf.number.greaterThanOrEquals("xOffset", t, 0), g.typeOf.number.greaterThanOrEquals("yOffset", i, 0), t + e.width > this._size) throw new A("xOffset + source.width must be less than or equal to width.");
    if (i + e.height > this._size) throw new A("yOffset + source.height must be less than or equal to height.");
    var r = this._gl,
        a = this._textureTarget,
        s = this._targetFace;
    r.activeTexture(r.TEXTURE0), r.bindTexture(a, this._texture);
    var h = e.width,
        _ = e.height,
        l = e.arrayBufferView,
        o = this._size,
        u = this._pixelFormat,
        n = this._pixelDatatype,
        f = this._preMultiplyAlpha,
        p = this._flipY,
        x = 4;
    m(l) && (x = T.alignmentInBytes(u, n, h)), r.pixelStorei(r.UNPACK_ALIGNMENT, x);
    var L,
        P = !1;
    this._initialized || (0 === t && 0 === i && h === o && _ === o ? (m(l) ? (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), p && (l = T.flipY(l, u, n, o, o)), r.texImage2D(s, 0, u, o, o, 0, u, n, l)) : (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, f), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, p), r.texImage2D(s, 0, u, u, n, e)), P = !0) : (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), L = T.createTypedArray(u, n, o, o), r.texImage2D(s, 0, u, o, o, 0, u, n, L)), this._initialized = !0), P || (m(l) ? (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !1), p && (l = T.flipY(l, u, n, h, _)), r.texSubImage2D(s, 0, t, i, h, _, u, n, l)) : (r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, f), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, p), r.texSubImage2D(s, 0, t, i, u, n, e))), r.bindTexture(a, null);
  }, t.prototype.copyFromFramebuffer = function (e, t, i, r, a, s) {
    if (e = y(e, 0), t = y(t, 0), i = y(i, 0), r = y(r, 0), a = y(a, this._size), s = y(s, this._size), g.typeOf.number.greaterThanOrEquals("xOffset", e, 0), g.typeOf.number.greaterThanOrEquals("yOffset", t, 0), g.typeOf.number.greaterThanOrEquals("framebufferXOffset", i, 0), g.typeOf.number.greaterThanOrEquals("framebufferYOffset", r, 0), e + a > this._size) throw new A("xOffset + source.width must be less than or equal to width.");
    if (t + s > this._size) throw new A("yOffset + source.height must be less than or equal to height.");
    if (this._pixelDatatype === l.FLOAT) throw new A("Cannot call copyFromFramebuffer when the texture pixel data type is FLOAT.");
    if (this._pixelDatatype === l.HALF_FLOAT) throw new A("Cannot call copyFromFramebuffer when the texture pixel data type is HALF_FLOAT.");
    var h = this._gl,
        _ = this._textureTarget;
    h.activeTexture(h.TEXTURE0), h.bindTexture(_, this._texture), h.copyTexSubImage2D(this._targetFace, 0, e, t, i, r, a, s), h.bindTexture(_, null), this._initialized = !0;
  }, t;
});