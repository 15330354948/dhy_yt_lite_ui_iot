"use strict";

define(["./Check", "./Credit", "./defaultValue", "./defined", "./defineProperties", "./Ion", "./PeliasGeocoderService", "./Rectangle", "./Resource"], function (a, o, n, d, e, i, u, r, f) {
  "use strict";

  function t(e) {
    e = n(e, n.EMPTY_OBJECT), a.typeOf.object("options.scene", e.scene);
    var r = n(e.accessToken, i.defaultAccessToken),
        t = f.createIfNeeded(n(e.server, i.defaultServer));
    t.appendForwardSlash();
    var s = i.getDefaultTokenCredit(r);
    d(s) && e.scene.frameState.creditDisplay.addDefaultCredit(o.clone(s));
    var c = t.getDerivedResource({
      url: "v1/geocode"
    });
    d(r) && c.appendQueryParameters({
      access_token: r
    }), this._accessToken = r, this._server = t, this._pelias = new u(c);
  }

  return t.prototype.geocode = function (e, r) {
    return this._pelias.geocode(e, r);
  }, t;
});