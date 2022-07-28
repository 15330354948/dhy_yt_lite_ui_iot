"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "../Core/GeographicTilingScheme", "../ThirdParty/when"], function (t, e, i, r, o, n, s) {
  "use strict";

  var l = new t(1, 1, 1, .4),
      h = new t(0, 1, 0, .05),
      c = new t(0, .5, 0, .2);

  function a(t) {
    t = e(t, e.EMPTY_OBJECT), this._tilingScheme = i(t.tilingScheme) ? t.tilingScheme : new n({
      ellipsoid: t.ellipsoid
    }), this._cells = e(t.cells, 8), this._color = e(t.color, l), this._glowColor = e(t.glowColor, h), this._glowWidth = e(t.glowWidth, 6), this._backgroundColor = e(t.backgroundColor, c), this._errorEvent = new o(), this._tileWidth = e(t.tileWidth, 256), this._tileHeight = e(t.tileHeight, 256), this._canvasSize = e(t.canvasSize, 256), this._canvas = this._createGridCanvas(), this._readyPromise = s.resolve(!0);
  }

  return r(a.prototype, {
    proxy: {
      get: function get() {}
    },
    tileWidth: {
      get: function get() {
        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {}
    },
    minimumLevel: {
      get: function get() {}
    },
    tilingScheme: {
      get: function get() {
        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        return this._tilingScheme.rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {}
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    ready: {
      get: function get() {
        return !0;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
      }
    },
    credit: {
      get: function get() {}
    },
    hasAlphaChannel: {
      get: function get() {
        return !0;
      }
    }
  }), a.prototype._drawGrid = function (t) {
    for (var e = this._canvasSize, i = 0; i <= this._cells; ++i) {
      var r = 1 + i / this._cells * (e - 1);
      t.moveTo(r, 0), t.lineTo(r, e), t.moveTo(0, r), t.lineTo(e, r);
    }

    t.stroke();
  }, a.prototype._createGridCanvas = function () {
    var t = document.createElement("canvas");
    t.width = this._canvasSize, t.height = this._canvasSize;

    var e = this._canvasSize,
        i = t.getContext("2d"),
        r = this._backgroundColor.toCssColorString();

    i.fillStyle = r, i.fillRect(0, 0, e, e);

    var o = this._glowColor.toCssColorString();

    i.strokeStyle = o, i.lineWidth = this._glowWidth, i.strokeRect(0, 0, e, e), this._drawGrid(i), i.lineWidth = .5 * this._glowWidth, i.strokeRect(0, 0, e, e), this._drawGrid(i);

    var n = this._color.toCssColorString();

    return i.strokeStyle = n, i.lineWidth = 2, i.strokeRect(0, 0, e, e), i.lineWidth = 1, this._drawGrid(i), t;
  }, a.prototype.getTileCredits = function (t, e, i) {}, a.prototype.requestImage = function (t, e, i, r) {
    return this._canvas;
  }, a.prototype.pickFeatures = function (t, e, i, r, o) {}, a;
});