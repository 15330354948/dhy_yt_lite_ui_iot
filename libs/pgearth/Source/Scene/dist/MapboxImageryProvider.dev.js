"use strict";

define(["../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/MapboxApi", "../Core/Resource", "./UrlTemplateImageryProvider"], function (m, c, u, e, d, g, h, p) {
  "use strict";

  var l = /\/$/,
      v = new m('&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/">Improve this map</a></strong>');

  function r(e) {
    var r = (e = c(e, c.EMPTY_OBJECT)).mapId;
    if (!u(r)) throw new d("options.mapId is required.");
    var t = e.url;
    u(t) || (t = "https://{s}.tiles.mapbox.com/v4/"), this._url = t;
    var i = h.createIfNeeded(t),
        o = g.getAccessToken(e.accessToken);
    this._mapId = r, this._accessToken = o, this._accessTokenErrorCredit = m.clone(g.getErrorCredit(e.accessToken));
    var n = c(e.format, "png");
    /\./.test(n) || (n = "." + n), this._format = n;
    var a,
        s = i.getUrlComponent();
    l.test(s) || (s += "/"), s += r + "/{z}/{x}/{y}" + this._format, i.url = s, i.setQueryParameters({
      access_token: o
    }), u(e.credit) ? "string" == typeof (a = e.credit) && (a = new m(a)) : a = v, this._resource = i, this._imageryProvider = new p({
      url: i,
      credit: a,
      ellipsoid: e.ellipsoid,
      minimumLevel: e.minimumLevel,
      maximumLevel: e.maximumLevel,
      rectangle: e.rectangle
    });
  }

  return e(r.prototype, {
    url: {
      get: function get() {
        return this._url;
      }
    },
    ready: {
      get: function get() {
        return this._imageryProvider.ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._imageryProvider.readyPromise;
      }
    },
    rectangle: {
      get: function get() {
        return this._imageryProvider.rectangle;
      }
    },
    tileWidth: {
      get: function get() {
        return this._imageryProvider.tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        return this._imageryProvider.tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        return this._imageryProvider.maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        return this._imageryProvider.minimumLevel;
      }
    },
    tilingScheme: {
      get: function get() {
        return this._imageryProvider.tilingScheme;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        return this._imageryProvider.tileDiscardPolicy;
      }
    },
    errorEvent: {
      get: function get() {
        return this._imageryProvider.errorEvent;
      }
    },
    credit: {
      get: function get() {
        return this._imageryProvider.credit;
      }
    },
    proxy: {
      get: function get() {
        return this._imageryProvider.proxy;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        return this._imageryProvider.hasAlphaChannel;
      }
    }
  }), r.prototype.getTileCredits = function (e, r, t) {
    if (u(this._accessTokenErrorCredit)) return [this._accessTokenErrorCredit];
  }, r.prototype.requestImage = function (e, r, t, i) {
    return this._imageryProvider.requestImage(e, r, t, i);
  }, r.prototype.pickFeatures = function (e, r, t, i, o) {
    return this._imageryProvider.pickFeatures(e, r, t, i, o);
  }, r._defaultCredit = v, r;
});