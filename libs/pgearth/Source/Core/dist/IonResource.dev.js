"use strict";

define(["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./Credit", "./defaultValue", "./defined", "./defineProperties", "./Ion", "./Resource", "./RuntimeError"], function (i, o, s, c, a, d, e, p, u, h) {
  "use strict";

  function r(e, t) {
    var n;
    s.defined("endpoint", e), s.defined("endpointResource", t);
    var r = e.externalType,
        o = d(r);

    if (o) {
      if ("3DTILES" !== r && "STK_TERRAIN_SERVER" !== r) throw new h("Ion.createResource does not support external imagery assets; use IonImageryProvider instead.");
      n = {
        url: e.options.url
      };
    } else n = {
      url: e.url,
      retryAttempts: 1,
      retryCallback: _
    };

    u.call(this, n), this._ionEndpoint = e, this._ionEndpointDomain = o ? void 0 : new i(e.url).authority, this._ionEndpointResource = t, this._ionRoot = void 0, this._pendingPromise = void 0, this._credits = void 0, this._isExternal = o;
  }

  function _(t, e) {
    var n = a(t._ionRoot, t),
        r = n._ionEndpointResource;
    return d(e) && (401 === e.statusCode || e.target instanceof Image) ? (d(n._pendingPromise) || (n._pendingPromise = r.fetchJson().then(function (e) {
      return n._ionEndpoint = e;
    }).always(function (e) {
      return n._pendingPromise = void 0, e;
    })), n._pendingPromise.then(function (e) {
      return t._ionEndpoint = e, !0;
    })) : o.resolve(!1);
  }

  return d(Object.create) && ((r.prototype = Object.create(u.prototype)).constructor = r), r.fromAssetId = function (e, t) {
    var n = r._createEndpointResource(e, t);

    return n.fetchJson().then(function (e) {
      return new r(e, n);
    });
  }, e(r.prototype, {
    credits: {
      get: function get() {
        return d(this._ionRoot) ? this._ionRoot.credits : (d(this._credits) || (this._credits = r.getCreditsFromEndpoint(this._ionEndpoint, this._ionEndpointResource)), this._credits);
      }
    }
  }), r.getCreditsFromEndpoint = function (e, t) {
    var n = e.attributions.map(c.getIonCredit),
        r = p.getDefaultTokenCredit(t.queryParameters.access_token);
    return d(r) && n.push(c.clone(r)), n;
  }, r.prototype.clone = function (e) {
    var t = a(this._ionRoot, this);
    return d(e) || (e = new r(t._ionEndpoint, t._ionEndpointResource)), (e = u.prototype.clone.call(this, e))._ionRoot = t, e._isExternal = this._isExternal, e;
  }, r.prototype.fetchImage = function (e) {
    var t;
    return this._isExternal || (t = e, e = {
      preferBlob: !0
    }, d(t) && (e.flipY = t.flipY, e.preferImageBitmap = t.preferImageBitmap)), u.prototype.fetchImage.call(this, e);
  }, r.prototype._makeRequest = function (e) {
    if (this._isExternal || new i(this.url).authority !== this._ionEndpointDomain) return u.prototype._makeRequest.call(this, e);
    var t = "*/*;access_token=" + this._ionEndpoint.accessToken,
        n = t,
        r = this.headers;
    return d(r) && d(r.Accept) && (n = r.Accept + "," + t), d(e.headers) ? d(e.headers.Accept) ? e.headers.Accept = e.headers.Accept + "," + t : e.headers.Accept = n : e.headers = {
      Accept: n
    }, u.prototype._makeRequest.call(this, e);
  }, r._createEndpointResource = function (e, t) {
    s.defined("assetId", e), t = a(t, a.EMPTY_OBJECT);
    var n = a(t.server, p.defaultServer),
        r = a(t.accessToken, p.defaultAccessToken),
        n = u.createIfNeeded(n),
        o = {
      url: "v1/assets/" + e + "/endpoint"
    };
    return d(r) && (o.queryParameters = {
      access_token: r
    }), n.getDerivedResource(o);
  }, r;
});