"use strict";

define(["./Cartesian3", "./Check", "./defined", "./defineProperties", "./GeocodeType", "./Rectangle", "./Resource"], function (i, t, u, e, o, s, r) {
  "use strict";

  function n(e) {
    t.defined("url", e), this._url = r.createIfNeeded(e), this._url.appendForwardSlash();
  }

  return e(n.prototype, {
    url: {
      get: function get() {
        return this._url;
      }
    }
  }), n.prototype.geocode = function (e, r) {
    return t.typeOf.string("query", e), this._url.getDerivedResource({
      url: r === o.AUTOCOMPLETE ? "autocomplete" : "search",
      queryParameters: {
        text: e
      }
    }).fetchJson().then(function (e) {
      return e.features.map(function (e) {
        var r,
            t,
            o,
            n = e.bbox;
        return o = u(n) ? s.fromDegrees(n[0], n[1], n[2], n[3]) : (r = e.geometry.coordinates[0], t = e.geometry.coordinates[1], i.fromDegrees(r, t)), {
          displayName: e.properties.label,
          destination: o
        };
      });
    });
  }, n;
});