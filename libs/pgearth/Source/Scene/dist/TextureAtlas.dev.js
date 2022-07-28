"use strict";

define(["../Core/BoundingRectangle", "../Core/Cartesian2", "../Core/createGuid", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/PixelFormat", "../Core/Resource", "../Core/RuntimeError", "../Renderer/Framebuffer", "../Renderer/Texture", "../ThirdParty/when"], function (f, p, w, n, R, t, e, o, r, h, i, C, L, d) {
  "use strict";

  function I(t, e, i, r, o) {
    this.bottomLeft = n(t, p.ZERO), this.topRight = n(e, p.ZERO), this.childNode1 = i, this.childNode2 = r, this.imageIndex = o;
  }

  var u = new p(16, 16);

  function s(t) {
    t = n(t, n.EMPTY_OBJECT);
    var e = n(t.borderWidthInPixels, 1),
        i = n(t.initialSize, u);
    if (!R(t.context)) throw new o("context is required.");
    if (e < 0) throw new o("borderWidthInPixels must be greater than or equal to zero.");
    if (i.x < 1 || i.y < 1) throw new o("initialSize must be greater than zero.");
    this._context = t.context, this._pixelFormat = n(t.pixelFormat, r.RGBA), this._borderWidthInPixels = e, this._textureCoordinates = [], this._guid = w(), this._idHash = {}, this._initialSize = i, this._root = void 0;
  }

  function _(t, e, i) {
    var r,
        o,
        n,
        h,
        d,
        u,
        s,
        x,
        a = function t(e, i, r) {
      if (R(i)) {
        if (R(i.childNode1) || R(i.childNode2)) return t(e, i.childNode1, r) || t(e, i.childNode2, r);
        if (R(i.imageIndex)) return;
        var o,
            n,
            h = i.topRight.x - i.bottomLeft.x,
            d = i.topRight.y - i.bottomLeft.y,
            u = h - r.width,
            s = d - r.height;
        if (u < 0 || s < 0) return;
        return 0 == u && 0 == s ? i : (s < u ? (i.childNode1 = new I(new p(i.bottomLeft.x, i.bottomLeft.y), new p(i.bottomLeft.x + r.width, i.topRight.y)), (o = i.bottomLeft.x + r.width + e._borderWidthInPixels) < i.topRight.x && (i.childNode2 = new I(new p(o, i.bottomLeft.y), new p(i.topRight.x, i.topRight.y)))) : (i.childNode1 = new I(new p(i.bottomLeft.x, i.bottomLeft.y), new p(i.topRight.x, i.bottomLeft.y + r.height)), (n = i.bottomLeft.y + r.height + e._borderWidthInPixels) < i.topRight.y && (i.childNode2 = new I(new p(i.bottomLeft.x, n), new p(i.topRight.x, i.topRight.y)))), t(e, i.childNode1, r));
      }
    }(t, t._root, e);

    R(a) ? (a.imageIndex = i, r = t._texture.width, o = t._texture.height, n = a.topRight.x - a.bottomLeft.x, h = a.topRight.y - a.bottomLeft.y, d = a.bottomLeft.x / r, u = a.bottomLeft.y / o, s = n / r, x = h / o, t._textureCoordinates[i] = new f(d, u, s, x), t._texture.copyFrom(e, a.bottomLeft.x, a.bottomLeft.y)) : (function (t, e) {
      var i = t._context,
          r = t.numberOfImages,
          o = t._borderWidthInPixels;

      if (0 < r) {
        for (var n = t._texture.width, h = t._texture.height, d = 2 * (n + e.width + o), u = 2 * (h + e.height + o), s = n / d, x = h / u, a = new I(new p(n + o, o), new p(d, h)), f = new I(new p(), new p(d, h), t._root, a), w = new I(new p(o, h + o), new p(d, u)), _ = new I(new p(), new p(d, u), f, w), g = 0; g < t._textureCoordinates.length; g++) {
          var c = t._textureCoordinates[g];
          R(c) && (c.x *= s, c.y *= x, c.width *= s, c.height *= x);
        }

        var m = new L({
          context: t._context,
          width: d,
          height: u,
          pixelFormat: t._pixelFormat
        }),
            l = new C({
          context: i,
          colorTextures: [t._texture],
          destroyAttachments: !1
        });
        l._bind(), m.copyFromFramebuffer(0, 0, 0, 0, d, u), l._unBind(), l.destroy(), t._texture = t._texture && t._texture.destroy(), t._texture = m, t._root = _;
      } else {
        var y = 2 * (e.width + 2 * o),
            b = 2 * (e.height + 2 * o);
        y < t._initialSize.x && (y = t._initialSize.x), b < t._initialSize.y && (b = t._initialSize.y), t._texture = t._texture && t._texture.destroy(), t._texture = new L({
          context: t._context,
          width: y,
          height: b,
          pixelFormat: t._pixelFormat
        }), t._root = new I(new p(o, o), new p(y, b));
      }
    }(t, e), _(t, e, i)), t._guid = w();
  }

  return t(s.prototype, {
    borderWidthInPixels: {
      get: function get() {
        return this._borderWidthInPixels;
      }
    },
    textureCoordinates: {
      get: function get() {
        return this._textureCoordinates;
      }
    },
    texture: {
      get: function get() {
        return R(this._texture) || (this._texture = new L({
          context: this._context,
          width: this._initialSize.x,
          height: this._initialSize.y,
          pixelFormat: this._pixelFormat
        })), this._texture;
      }
    },
    numberOfImages: {
      get: function get() {
        return this._textureCoordinates.length;
      }
    },
    guid: {
      get: function get() {
        return this._guid;
      }
    }
  }), s.prototype.addImage = function (t, e) {
    if (!R(t)) throw new o("id is required.");
    if (!R(e)) throw new o("image is required.");
    var i = this._idHash[t];
    if (R(i)) return i;

    if ("function" == typeof e) {
      if (e = e(t), !R(e)) throw new o("image is required.");
    } else ("string" == typeof e || e instanceof h) && (e = h.createIfNeeded(e).fetchImage());

    var r = this,
        i = d(e, function (t) {
      if (r.isDestroyed()) return -1;
      var e = r.numberOfImages;
      return _(r, t, e), e;
    });
    return this._idHash[t] = i;
  }, s.prototype.addSubRegion = function (t, s) {
    if (!R(t)) throw new o("id is required.");
    if (!R(s)) throw new o("subRegion is required.");
    var e = this._idHash[t];
    if (!R(e)) throw new i('image with id "' + t + '" not found in the atlas.');
    var x = this;
    return d(e, function (t) {
      if (-1 === t) return -1;
      var e = x._texture.width,
          i = x._texture.height,
          r = x.numberOfImages,
          o = x._textureCoordinates[t],
          n = o.x + s.x / e,
          h = o.y + s.y / i,
          d = s.width / e,
          u = s.height / i;
      return x._textureCoordinates.push(new f(n, h, d, u)), x._guid = w(), r;
    });
  }, s.prototype.isDestroyed = function () {
    return !1;
  }, s.prototype.destroy = function () {
    return this._texture = this._texture && this._texture.destroy(), e(this);
  }, s;
});