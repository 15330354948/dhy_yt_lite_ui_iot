"use strict";

define(["../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "./ContextLimits", "./RenderbufferFormat"], function (h, o, u, e, t, d, s, a) {
  "use strict";

  function r(e) {
    e = o(e, o.EMPTY_OBJECT), h.defined("options.context", e.context);
    var t = e.context._gl,
        r = s.maximumRenderbufferSize,
        i = o(e.format, a.RGBA4),
        n = u(e.width) ? e.width : t.drawingBufferWidth,
        f = u(e.height) ? e.height : t.drawingBufferHeight;
    if (!a.validate(i)) throw new d("Invalid format.");
    if (h.typeOf.number.greaterThan("width", n, 0), r < n) throw new d("Width must be less than or equal to the maximum renderbuffer size (" + r + ").  Check maximumRenderbufferSize.");
    if (h.typeOf.number.greaterThan("height", f, 0), r < f) throw new d("Height must be less than or equal to the maximum renderbuffer size (" + r + ").  Check maximumRenderbufferSize.");
    this._gl = t, this._format = i, this._width = n, this._height = f, this._renderbuffer = this._gl.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this._renderbuffer), t.renderbufferStorage(t.RENDERBUFFER, i, n, f), t.bindRenderbuffer(t.RENDERBUFFER, null);
  }

  return e(r.prototype, {
    format: {
      get: function get() {
        return this._format;
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
    }
  }), r.prototype._getRenderbuffer = function () {
    return this._renderbuffer;
  }, r.prototype.isDestroyed = function () {
    return !1;
  }, r.prototype.destroy = function () {
    return this._gl.deleteRenderbuffer(this._renderbuffer), t(this);
  }, r;
});