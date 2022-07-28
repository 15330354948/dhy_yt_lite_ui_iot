"use strict";

define(["../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/combine", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/GeographicProjection", "../Core/isArray", "../Core/Math", "../Core/Rectangle", "../Core/Resource", "../Core/WebMercatorTilingScheme", "../ThirdParty/when", "./ImageryProvider", "../Core/createGuid"], function (I, G, B, ac, V, s, ab, K, ah, U, S, E, X, u, d, e, R, af, W) {
  var D = /{[^}]+}/g;
  var H = {
    "x": aa,
    "y": k,
    "z": L,
    "s": T,
    "reverseX": J,
    "reverseY": an,
    "reverseZ": y,
    "westDegrees": ag,
    "southDegrees": aj,
    "eastDegrees": am,
    "northDegrees": Z,
    "westProjected": x,
    "southProjected": C,
    "eastProjected": M,
    "northProjected": O,
    "width": P,
    "height": t
  };
  var ak = ac(H, {
    "i": N,
    "j": b,
    "reverseI": A,
    "reverseJ": ae,
    "longitudeDegrees": i,
    "latitudeDegrees": Y,
    "longitudeProjected": p,
    "latitudeProjected": v,
    "format": o
  });

  function ai(ao) {
    if (!ab(ao)) {
      throw new ah("options is required.");
    }

    if (!R.isPromise(ao) && !ab(ao.url)) {
      throw new ah("options is required.");
    }

    this._errorEvent = new U();
    this._resource = undefined;
    this._urlSchemeZeroPadding = undefined;
    this._pickFeaturesResource = undefined;
    this._tileWidth = undefined;
    this._tileHeight = undefined;
    this._maximumLevel = undefined;
    this._minimumLevel = undefined;
    this._tilingScheme = undefined;
    this._rectangle = undefined;
    this._tileDiscardPolicy = undefined;
    this._credit = undefined;
    this._hasAlphaChannel = undefined;
    this._readyPromise = undefined;
    this._tags = undefined;
    this._pickFeaturesTags = undefined;
    this.enablePickFeatures = true;
    this.reinitialize(ao);
  }

  K(ai.prototype, {
    url: {
      get: function get() {
        return this._resource.url;
      }
    },
    urlSchemeZeroPadding: {
      get: function get() {
        return this._urlSchemeZeroPadding;
      }
    },
    pickFeaturesUrl: {
      get: function get() {
        return this._pickFeaturesResource.url;
      }
    },
    proxy: {
      get: function get() {
        return this._resource.proxy;
      }
    },
    tileWidth: {
      get: function get() {
        if (!this.ready) {
          throw new ah("tileWidth must not be called before the imagery provider is ready.");
        }

        return this._tileWidth;
      }
    },
    tileHeight: {
      get: function get() {
        if (!this.ready) {
          throw new ah("tileHeight must not be called before the imagery provider is ready.");
        }

        return this._tileHeight;
      }
    },
    maximumLevel: {
      get: function get() {
        if (!this.ready) {
          throw new ah("maximumLevel must not be called before the imagery provider is ready.");
        }

        return this._maximumLevel;
      }
    },
    minimumLevel: {
      get: function get() {
        if (!this.ready) {
          throw new ah("minimumLevel must not be called before the imagery provider is ready.");
        }

        return this._minimumLevel;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this.ready) {
          throw new ah("tilingScheme must not be called before the imagery provider is ready.");
        }

        return this._tilingScheme;
      }
    },
    rectangle: {
      get: function get() {
        if (!this.ready) {
          throw new ah("rectangle must not be called before the imagery provider is ready.");
        }

        return this._rectangle;
      }
    },
    tileDiscardPolicy: {
      get: function get() {
        if (!this.ready) {
          throw new ah("tileDiscardPolicy must not be called before the imagery provider is ready.");
        }

        return this._tileDiscardPolicy;
      }
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    ready: {
      get: function get() {
        return ab(this._resource);
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise;
      }
    },
    credit: {
      get: function get() {
        if (!this.ready) {
          throw new ah("credit must not be called before the imagery provider is ready.");
        }

        return this._credit;
      }
    },
    hasAlphaChannel: {
      get: function get() {
        if (!this.ready) {
          throw new ah("hasAlphaChannel must not be called before the imagery provider is ready.");
        }

        return this._hasAlphaChannel;
      }
    }
  });

  ai.prototype.reinitialize = function (ao) {
    var ap = this;
    ap._readyPromise = R(ao).then(function (at) {
      if (!ab(at)) {
        throw new ah("options is required.");
      }

      if (!ab(at.url)) {
        throw new ah("options.url is required.");
      }

      var au = at.customTags;
      var aq = ac(H, au);
      var ar = ac(ak, au);
      var av = d.createIfNeeded(at.url);
      av.setQueryParameters({
        uuid: W()
      });
      var ax = d.createIfNeeded(at.pickFeaturesUrl);
      ap.enablePickFeatures = s(at.enablePickFeatures, ap.enablePickFeatures);
      ap._urlSchemeZeroPadding = s(at.urlSchemeZeroPadding, ap.urlSchemeZeroPadding);
      ap._tileDiscardPolicy = at.tileDiscardPolicy;
      ap._getFeatureInfoFormats = at.getFeatureInfoFormats;
      ap._subdomains = at.subdomains;

      if (E(ap._subdomains)) {
        ap._subdomains = ap._subdomains.slice();
      } else {
        if (ab(ap._subdomains) && ap._subdomains.length > 0) {
          ap._subdomains = ap._subdomains.split("");
        } else {
          ap._subdomains = ["a", "b", "c"];
        }
      }

      ap._tileWidth = s(at.tileWidth, 256);
      ap._tileHeight = s(at.tileHeight, 256);
      ap._minimumLevel = s(at.minimumLevel, 0);
      ap._maximumLevel = at.maximumLevel;
      ap._tilingScheme = s(at.tilingScheme, new e({
        ellipsoid: at.ellipsoid
      }));
      ap._rectangle = s(at.rectangle, ap._tilingScheme.rectangle);
      ap._rectangle = u.intersection(ap._rectangle, ap._tilingScheme.rectangle);
      ap._hasAlphaChannel = s(at.hasAlphaChannel, true);
      var aw = at.credit;

      if (typeof aw === "string") {
        aw = new V(aw);
      }

      ap._credit = aw;
      ap._resource = av;
      ap._tags = aq;
      ap._pickFeaturesResource = ax;
      ap._pickFeaturesTags = ar;
      return true;
    });
  };

  ai.prototype.getTileCredits = function (ao, aq, ap) {
    if (!this.ready) {
      throw new ah("getTileCredits must not be called before the imagery provider is ready.");
    }

    return undefined;
  };

  ai.prototype.requestImage = function (ao, ar, aq, ap) {
    if (!this.ready) {
      throw new ah("requestImage must not be called before the imagery provider is ready.");
    }

    return af.loadImage(this, ad(this, ao, ar, aq, ap));
  };

  ai.prototype.pickFeatures = function (ax, av, ap, ao, aw) {
    if (!this.ready) {
      throw new ah("pickFeatures must not be called before the imagery provider is ready.");
    }

    if (!this.enablePickFeatures || !ab(this._pickFeaturesResource) || this._getFeatureInfoFormats.length === 0) {
      return undefined;
    }

    var aq = 0;
    var au = this;

    function at(az, ay) {
      return az.callback(ay);
    }

    function ar() {
      if (aq >= au._getFeatureInfoFormats.length) {
        return R([]);
      }

      var az = au._getFeatureInfoFormats[aq];
      var ay = al(au, ax, av, ap, ao, aw, az.format);
      ++aq;

      if (az.type === "json") {
        return ay.fetchJson().then(az.callback).otherwise(ar);
      } else {
        if (az.type === "xml") {
          return ay.fetchXML().then(az.callback).otherwise(ar);
        } else {
          if (az.type === "text" || az.type === "html") {
            return ay.fetchText().then(az.callback).otherwise(ar);
          }
        }
      }

      return ay.fetch({
        responseType: az.format
      }).then(at.bind(undefined, az)).otherwise(ar);
    }

    return ar();
  };

  var h = false;
  var f = new u();
  var l = false;
  var q = new u();

  function ad(at, ax, aw, ao, ar) {
    h = false;
    l = false;
    var aq = at._resource;
    var ap = aq.getUrlComponent(true);
    var av = at._tags;
    var ay = {};
    var au = ap.match(D);

    if (ab(au)) {
      au.forEach(function (az) {
        var aA = az.substring(1, az.length - 1);

        if (ab(av[aA])) {
          ay[aA] = av[aA](at, ax, aw, ao);
        }
      });
    }

    return aq.getDerivedResource({
      request: ar,
      templateValues: ay
    });
  }

  var a = false;
  var g = new I();
  var z = false;

  function al(at, ay, aw, aq, ao, ax, az) {
    h = false;
    l = false;
    a = false;
    z = false;
    var ar = at._pickFeaturesResource;
    var ap = ar.getUrlComponent(true);
    var av = at._pickFeaturesTags;
    var aA = {};
    var au = ap.match(D);

    if (ab(au)) {
      au.forEach(function (aB) {
        var aC = aB.substring(1, aB.length - 1);

        if (ab(av[aC])) {
          aA[aC] = av[aC](at, ay, aw, aq, ao, ax, az);
        }
      });
    }

    return ar.getDerivedResource({
      templateValues: aA
    });
  }

  function Q(ap, aq, ar) {
    if (ap && ap.urlSchemeZeroPadding && ap.urlSchemeZeroPadding.hasOwnProperty(aq)) {
      var at = ap.urlSchemeZeroPadding[aq];

      if (typeof at === "string") {
        var ao = at.length;

        if (ao > 1) {
          ar = ar.length >= ao ? ar : new Array(ao - ar.toString().length + 1).join("0") + ar;
        }
      }
    }

    return ar;
  }

  function aa(ap, ao, ar, aq) {
    return Q(ap, "{x}", ao);
  }

  function J(ap, ao, at, ar) {
    var aq = ap.tilingScheme.getNumberOfXTilesAtLevel(ar) - ao - 1;
    return Q(ap, "{reverseX}", aq);
  }

  function k(ap, ao, ar, aq) {
    return Q(ap, "{y}", ar);
  }

  function an(ap, ao, at, ar) {
    var aq = ap.tilingScheme.getNumberOfYTilesAtLevel(ar) - at - 1;
    return Q(ap, "{reverseY}", aq);
  }

  function y(ap, ao, au, at) {
    var aq = ap.maximumLevel;
    var ar = ab(aq) && at < aq ? aq - at - 1 : at;
    return Q(ap, "{reverseZ}", ar);
  }

  function L(ap, ao, ar, aq) {
    return Q(ap, "{z}", aq);
  }

  function T(aq, ao, at, ar) {
    var ap = (ao + at + ar) % aq._subdomains.length;
    return aq._subdomains[ap];
  }

  function r(ap, ao, ar, aq) {
    if (h) {
      return;
    }

    ap.tilingScheme.tileXYToRectangle(ao, ar, aq, f);
    f.west = X.toDegrees(f.west);
    f.south = X.toDegrees(f.south);
    f.east = X.toDegrees(f.east);
    f.north = X.toDegrees(f.north);
    h = true;
  }

  function ag(ap, ao, ar, aq) {
    r(ap, ao, ar, aq);
    return f.west;
  }

  function aj(ap, ao, ar, aq) {
    r(ap, ao, ar, aq);
    return f.south;
  }

  function am(ap, ao, ar, aq) {
    r(ap, ao, ar, aq);
    return f.east;
  }

  function Z(ap, ao, ar, aq) {
    r(ap, ao, ar, aq);
    return f.north;
  }

  function m(ap, ao, ar, aq) {
    if (l) {
      return;
    }

    ap.tilingScheme.tileXYToNativeRectangle(ao, ar, aq, q);
    l = true;
  }

  function x(ap, ao, ar, aq) {
    m(ap, ao, ar, aq);
    return q.west;
  }

  function C(ap, ao, ar, aq) {
    m(ap, ao, ar, aq);
    return q.south;
  }

  function M(ap, ao, ar, aq) {
    m(ap, ao, ar, aq);
    return q.east;
  }

  function O(ap, ao, ar, aq) {
    m(ap, ao, ar, aq);
    return q.north;
  }

  function P(ap, ao, ar, aq) {
    return ap.tileWidth;
  }

  function t(ap, ao, ar, aq) {
    return ap.tileHeight;
  }

  function N(ap, ao, av, au, aq, at, ar) {
    n(ap, ao, av, au, aq, at);
    return g.x;
  }

  function b(ap, ao, av, au, aq, at, ar) {
    n(ap, ao, av, au, aq, at);
    return g.y;
  }

  function A(ap, ao, av, au, aq, at, ar) {
    n(ap, ao, av, au, aq, at);
    return ap.tileWidth - g.x - 1;
  }

  function ae(ap, ao, av, au, aq, at, ar) {
    n(ap, ao, av, au, aq, at);
    return ap.tileHeight - g.y - 1;
  }

  var F = new u();
  var c = new G();

  function n(aq, av, ar, ap, ao, at, aw) {
    if (a) {
      return;
    }

    w(aq, av, ar, ap, ao, at);
    var ax = c;
    var au = aq.tilingScheme.tileXYToNativeRectangle(av, ar, ap, F);
    g.x = aq.tileWidth * (ax.x - au.west) / au.width | 0;
    g.y = aq.tileHeight * (au.north - ax.y) / au.height | 0;
    a = true;
  }

  function i(ap, ao, av, au, aq, at, ar) {
    return X.toDegrees(aq);
  }

  function Y(ap, ao, av, au, aq, at, ar) {
    return X.toDegrees(at);
  }

  function p(ap, ao, av, au, aq, at, ar) {
    w(ap, ao, av, au, aq, at);
    return c.x;
  }

  function v(ap, ao, av, au, aq, at, ar) {
    w(ap, ao, av, au, aq, at);
    return c.y;
  }

  var j = new B();

  function w(ap, ao, aw, av, ar, au, at) {
    if (z) {
      return;
    }

    if (ap.tilingScheme.projection instanceof S) {
      c.x = X.toDegrees(ar);
      c.y = X.toDegrees(au);
    } else {
      var aq = j;
      aq.longitude = ar;
      aq.latitude = au;
      ap.tilingScheme.projection.project(aq, c);
    }

    z = true;
  }

  function o(ap, ao, av, au, aq, at, ar) {
    return ar;
  }

  return ai;
});