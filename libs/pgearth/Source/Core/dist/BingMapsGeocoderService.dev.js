"use strict";

define(["./BingMapsApi", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Rectangle", "./Resource"], function (t, r, n, e, u, o, s) {
  "use strict";

  var i = "https://dev.virtualearth.net/REST/v1/Locations";

  function c(e) {
    var r = (e = n(e, n.EMPTY_OBJECT)).key;
    this._key = t.getKey(r), this._resource = new s({
      url: i,
      queryParameters: {
        key: this._key
      }
    });
  }

  return u(c.prototype, {
    url: {
      get: function get() {
        return i;
      }
    },
    key: {
      get: function get() {
        return this._key;
      }
    }
  }), c.prototype.geocode = function (e) {
    return r.typeOf.string("query", e), this._resource.getDerivedResource({
      queryParameters: {
        query: e
      }
    }).fetchJsonp("jsonp").then(function (e) {
      return 0 === e.resourceSets.length ? [] : e.resourceSets[0].resources.map(function (e) {
        var r = e.bbox,
            t = r[0],
            n = r[1],
            u = r[2],
            s = r[3];
        return {
          displayName: e.name,
          destination: o.fromDegrees(n, t, s, u)
        };
      });
    });
  }, c;
});