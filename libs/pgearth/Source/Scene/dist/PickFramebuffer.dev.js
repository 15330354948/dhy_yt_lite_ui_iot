"use strict";

define(["../Core/BoundingRectangle", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/destroyObject", "../Renderer/Framebuffer", "../Renderer/PassState", "../Renderer/Renderbuffer", "../Renderer/RenderbufferFormat", "../Renderer/Texture"], function (o, w, g, y, t, s, r, n, a, f) {
  "use strict";

  function e(t) {
    var e = new r(t);
    e.blendingEnabled = !1, e.scissorTest = {
      enabled: !0,
      rectangle: new o()
    }, e.viewport = new o(), this._context = t, this._fb = void 0, this._passState = e, this._width = 0, this._height = 0;
  }

  e.prototype.begin = function (t, e) {
    var r = this._context,
        i = e.width,
        h = e.height;
    return o.clone(t, this._passState.scissorTest.rectangle), y(this._fb) && this._width === i && this._height === h || (this._width = i, this._height = h, this._fb = this._fb && this._fb.destroy(), this._fb = new s({
      context: r,
      colorTextures: [new f({
        context: r,
        width: i,
        height: h
      })],
      depthStencilRenderbuffer: new n({
        context: r,
        width: i,
        height: h,
        format: a.DEPTH_STENCIL
      })
    }), this._passState.framebuffer = this._fb), this._passState.viewport.width = i, this._passState.viewport.height = h, this._passState;
  };

  var x = new w();
  return e.prototype.end = function (t) {
    for (var e, r = g(t.width, 1), i = g(t.height, 1), h = this._context, o = h.readPixels({
      x: t.x,
      y: t.y,
      width: r,
      height: i,
      framebuffer: this._fb
    }), s = Math.max(r, i), n = s * s, a = Math.floor(.5 * r), f = Math.floor(.5 * i), d = 0, b = 0, _ = 0, c = -1, u = 0; u < n; ++u) {
      if (-a <= d && d <= a && -f <= b && b <= f) {
        var l = 4 * ((f - b) * r + d + a);
        x.red = w.byteToFloat(o[l]), x.green = w.byteToFloat(o[1 + l]), x.blue = w.byteToFloat(o[2 + l]), x.alpha = w.byteToFloat(o[3 + l]);
        var p = h.getObjectByPickColor(x);
        if (y(p)) return p;
      }

      (d === b || d < 0 && -d === b || 0 < d && d === 1 - b) && (e = _, _ = -c, c = e), d += _, b += c;
    }
  }, e.prototype.isDestroyed = function () {
    return !1;
  }, e.prototype.destroy = function () {
    return this._fb = this._fb && this._fb.destroy(), t(this);
  }, e;
});