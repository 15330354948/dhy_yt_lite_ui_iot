"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "../Core/GeographicTilingScheme", "../ThirdParty/when"], function (t, i, n, e, r, o, l) {
  "use strict";

  function c(e) {
    e = i(e, i.EMPTY_OBJECT), this._tilingScheme = n(e.tilingScheme) ? e.tilingScheme : new o({
      ellipsoid: e.ellipsoid
    }), this._color = i(e.color, t.YELLOW), this._errorEvent = new r(), this._tileWidth = i(e.tileWidth, 256), this._tileHeight = i(e.tileHeight, 256), this._readyPromise = l.resolve(!0);
  }

  return e(c.prototype, {
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
  }), c.prototype.getTileCredits = function (e, t, i) {}, c.prototype.requestImage = function (e, t, i, n) {
    var r = document.createElement("canvas");
    r.width = 256, r.height = 256;

    var o = r.getContext("2d"),
        l = this._color.toCssColorString();

    o.strokeStyle = l, o.lineWidth = 2, o.strokeRect(1, 1, 255, 255);
    var c = "L" + i + "X" + e + "Y" + t;
    return o.font = "bold 25px Arial", o.textAlign = "center", o.fillStyle = "black", o.fillText(c, 127, 127), o.fillStyle = l, o.fillText(c, 124, 124), r;
  }, c.prototype.pickFeatures = function (e, t, i, n, r) {}, c;
});