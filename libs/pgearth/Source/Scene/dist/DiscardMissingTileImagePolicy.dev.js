"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/DeveloperError", "../Core/getImagePixels", "../Core/Resource"], function (i, d, m, f, s) {
  "use strict";

  function e(l) {
    if (l = i(l, i.EMPTY_OBJECT), !d(l.missingImageUrl)) throw new m("options.missingImageUrl is required.");
    if (!d(l.pixelsToCheck)) throw new m("options.pixelsToCheck is required.");
    this._pixelsToCheck = l.pixelsToCheck, this._missingImagePixels = void 0, this._missingImageByteLength = void 0, this._isReady = !1;
    var e = s.createIfNeeded(l.missingImageUrl),
        h = this;
    e.fetchImage({
      preferBlob: !0,
      preferImageBitmap: !0,
      flipY: !0
    }).then(function (e) {
      d(e.blob) && (h._missingImageByteLength = e.blob.size);
      var i = f(e);

      if (l.disableCheckIfAllPixelsAreTransparent) {
        for (var s = !0, r = e.width, t = l.pixelsToCheck, o = 0, n = t.length; s && o < n; ++o) {
          var a = t[o];
          0 < i[3 + (4 * a.x + a.y * r)] && (s = !1);
        }

        s && (i = void 0);
      }

      h._missingImagePixels = i, h._isReady = !0;
    }).otherwise(function () {
      h._missingImagePixels = void 0, h._isReady = !0;
    });
  }

  return e.prototype.isReady = function () {
    return this._isReady;
  }, e.prototype.shouldDiscardImage = function (e) {
    if (!this._isReady) throw new m("shouldDiscardImage must not be called before the discard policy is ready.");
    var i = this._pixelsToCheck,
        s = this._missingImagePixels;
    if (!d(s)) return !1;
    if (d(e.blob) && e.blob.size !== this._missingImageByteLength) return !1;

    for (var r = f(e), t = e.width, o = 0, n = i.length; o < n; ++o) {
      for (var a = i[o], l = 4 * a.x + a.y * t, h = 0; h < 4; ++h) {
        var g = l + h;
        if (r[g] !== s[g]) return !1;
      }
    }

    return !0;
  }, e;
});