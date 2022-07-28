"use strict";

define(["../Core/Check", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/loadCRN", "../Core/loadKTX", "../Core/Resource"], function (i, o, t, r, n, a, s) {
  "use strict";

  function e() {
    this.defaultAlpha = void 0, this.defaultBrightness = void 0, this.defaultContrast = void 0, this.defaultHue = void 0, this.defaultSaturation = void 0, this.defaultGamma = void 0, this.defaultMinificationFilter = void 0, this.defaultMagnificationFilter = void 0, r.throwInstantiationError();
  }

  t(e.prototype, {
    ready: {
      get: r.throwInstantiationError
    },
    readyPromise: {
      get: r.throwInstantiationError
    },
    rectangle: {
      get: r.throwInstantiationError
    },
    tileWidth: {
      get: r.throwInstantiationError
    },
    tileHeight: {
      get: r.throwInstantiationError
    },
    maximumLevel: {
      get: r.throwInstantiationError
    },
    minimumLevel: {
      get: r.throwInstantiationError
    },
    tilingScheme: {
      get: r.throwInstantiationError
    },
    tileDiscardPolicy: {
      get: r.throwInstantiationError
    },
    errorEvent: {
      get: r.throwInstantiationError
    },
    credit: {
      get: r.throwInstantiationError
    },
    proxy: {
      get: r.throwInstantiationError
    },
    hasAlphaChannel: {
      get: r.throwInstantiationError
    }
  }), e.prototype.getTileCredits = r.throwInstantiationError, e.prototype.requestImage = r.throwInstantiationError, e.prototype.pickFeatures = r.throwInstantiationError;
  var h = /\.ktx$/i,
      d = /\.crn$/i;
  return e.loadImage = function (t, r) {
    i.defined("url", r);
    var e = s.createIfNeeded(r);
    return h.test(e) ? a(e) : d.test(e) ? n(e) : o(t.tileDiscardPolicy) ? e.fetchImage({
      preferBlob: !0,
      preferImageBitmap: !0,
      flipY: !0
    }) : e.fetchImage({
      preferImageBitmap: !0,
      flipY: !0
    });
  }, e;
});