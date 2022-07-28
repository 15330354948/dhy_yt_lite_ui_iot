"use strict";

define(["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Fullscreen", "../ThirdParty/when"], function (e, n, r, t, i, u) {
  "use strict";

  var o, s, a, l, f, p, d, c, A, y, g, v, m, b, h, x, E;

  function w(e) {
    for (var r = e.split("."), n = 0, t = r.length; n < t; ++n) {
      r[n] = parseInt(r[n], 10);
    }

    return r;
  }

  function _() {
    var e;
    return n(s) || (s = !1, P() || null !== (e = / Chrome\/([\.0-9]+)/.exec(o.userAgent)) && (s = !0, a = w(e[1]))), s;
  }

  function W() {
    var e;
    return n(l) || (l = !1, _() || P() || !/ Safari\/[\.0-9]+/.test(o.userAgent) || null !== (e = / Version\/([\.0-9]+)/.exec(o.userAgent)) && (l = !0, f = w(e[1]))), l;
  }

  function I() {
    var e;
    return n(p) || (p = !1, null !== (e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(o.userAgent)) && (p = !0, (d = w(e[1])).isNightly = !!e[2])), p;
  }

  function V() {
    var e;
    return n(c) || (c = !1, "Microsoft Internet Explorer" === o.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(o.userAgent)) && (c = !0, A = w(e[1])) : "Netscape" === o.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(o.userAgent)) && (c = !0, A = w(e[1]))), c;
  }

  function P() {
    var e;
    return n(y) || (y = !1, null !== (e = / Edge\/([\.0-9]+)/.exec(o.userAgent)) && (y = !0, g = w(e[1]))), y;
  }

  function C() {
    var e;
    return n(v) || (v = !1, null !== (e = /Firefox\/([\.0-9]+)/.exec(o.userAgent)) && (v = !0, m = w(e[1]))), v;
  }

  function F() {
    var e, r;
    return n(E) || ((e = document.createElement("canvas")).setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;"), r = e.style.imageRendering, (E = n(r) && "" !== r) && (x = r)), E;
  }

  function U() {
    if (!U.initialized) throw new t("You must call FeatureDetection.supportsWebP.initialize and wait for the promise to resolve before calling FeatureDetection.supportsWebP");
    return U._result;
  }

  o = "undefined" != typeof navigator ? navigator : {}, U._promise = void 0, U._result = void 0, U.initialize = function () {
    if (n(U._promise)) return U._promise;
    var e = u.defer();
    if (U._promise = e.promise, P()) return U._result = !1, e.resolve(U._result), e.promise;
    var r = new Image();
    return r.onload = function () {
      U._result = 0 < r.width && 0 < r.height, e.resolve(U._result);
    }, r.onerror = function () {
      U._result = !1, e.resolve(U._result);
    }, r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.promise;
  }, r(U, {
    initialized: {
      get: function get() {
        return n(U._result);
      }
    }
  });
  var k = [];
  "undefined" != typeof ArrayBuffer && (k.push(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), "undefined" != typeof Uint8ClampedArray && k.push(Uint8ClampedArray), "undefined" != typeof CanvasPixelArray && k.push(CanvasPixelArray));
  var z = {
    isChrome: _,
    chromeVersion: function chromeVersion() {
      return _() && a;
    },
    isSafari: W,
    safariVersion: function safariVersion() {
      return W() && f;
    },
    isWebkit: I,
    webkitVersion: function webkitVersion() {
      return I() && d;
    },
    isInternetExplorer: V,
    internetExplorerVersion: function internetExplorerVersion() {
      return V() && A;
    },
    isEdge: P,
    edgeVersion: function edgeVersion() {
      return P() && g;
    },
    isFirefox: C,
    firefoxVersion: function firefoxVersion() {
      return C() && m;
    },
    isWindows: function isWindows() {
      return n(b) || (b = /Windows/i.test(o.appVersion)), b;
    },
    hardwareConcurrency: e(o.hardwareConcurrency, 3),
    supportsPointerEvents: function supportsPointerEvents() {
      return n(h) || (h = !C() && "undefined" != typeof PointerEvent && (!n(o.pointerEnabled) || o.pointerEnabled)), h;
    },
    supportsImageRenderingPixelated: F,
    supportsWebP: U,
    imageRenderingValue: function imageRenderingValue() {
      return F() ? x : void 0;
    },
    typedArrayTypes: k,
    supportsFullscreen: function supportsFullscreen() {
      return i.supportsFullscreen();
    },
    supportsTypedArrays: function supportsTypedArrays() {
      return "undefined" != typeof ArrayBuffer;
    },
    supportsWebWorkers: function supportsWebWorkers() {
      return "undefined" != typeof Worker;
    },
    supportsWebAssembly: function supportsWebAssembly() {
      return "undefined" != typeof WebAssembly && !z.isEdge();
    }
  };
  return z;
});