"use strict";

define(["../Core/defined", "../Core/defineProperties"], function (_, t) {
  "use strict";

  function e() {
    this._style = void 0, this._styleDirty = !1, this._lastStyleTime = 0;
  }

  return t(e.prototype, {
    style: {
      get: function get() {
        return this._style;
      },
      set: function set(t) {
        this._style = t, this._styleDirty = !0;
      }
    }
  }), e.prototype.makeDirty = function () {
    this._styleDirty = !0;
  }, e.prototype.applyStyle = function (t, e) {
    if (t.ready && (!_(this._style) || this._style.ready)) {
      var s = this._styleDirty;
      e.passes.render && (this._styleDirty = !1), s && ++this._lastStyleTime;

      for (var i = this._lastStyleTime, l = t._statistics, y = s ? t._selectedTiles : t._selectedTilesToStyle, r = y.length, n = 0; n < r; ++n) {
        var o,
            a = y[n];
        a.lastStyleTime !== i && (o = a.content, a.lastStyleTime = i, o.applyStyle(this._style), l.numberOfFeaturesStyled += o.featuresLength, ++l.numberOfTilesStyled);
      }
    }
  }, e;
});