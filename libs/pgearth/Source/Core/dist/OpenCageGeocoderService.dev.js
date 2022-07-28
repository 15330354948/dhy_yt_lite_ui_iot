"use strict";

define(["./Cartesian3", "./Check", "./combine", "./defaultValue", "./defined", "./defineProperties", "./GeocodeType", "./Rectangle", "./Resource"], function (a, n, t, s, o, e, r, u, i) {
  "use strict";

  function d(e, t, r) {
    n.defined("url", e), n.defined("apiKey", t), o(r) && n.typeOf.object("params", r), (e = i.createIfNeeded(e)).appendForwardSlash(), e.setQueryParameters({
      key: t
    }), this._url = e, this._params = s(r, {});
  }

  return e(d.prototype, {
    url: {
      get: function get() {
        return this._url;
      }
    },
    params: {
      get: function get() {
        return this._params;
      }
    }
  }), d.prototype.geocode = function (e) {
    return n.typeOf.string("query", e), this._url.getDerivedResource({
      url: "json",
      queryParameters: t(this._params, {
        q: e
      })
    }).fetchJson().then(function (e) {
      return e.results.map(function (e) {
        var t,
            r,
            n,
            s = e.bounds;
        return n = o(s) ? u.fromDegrees(s.southwest.lng, s.southwest.lat, s.northeast.lng, s.northeast.lat) : (t = e.geometry.lat, r = e.geometry.lng, a.fromDegrees(t, r)), {
          displayName: e.formatted,
          destination: n
        };
      });
    });
  }, d;
});