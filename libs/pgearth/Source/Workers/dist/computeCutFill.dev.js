"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (e) {
  "use strict";

  e("ThirdParty/when", [], function () {
    function _(e, t, r, n) {
      return l(e).then(t, r, n);
    }

    function l(e) {
      var t,
          r,
          n = e instanceof f ? e : o(e) ? (t = R(), e.then(function (e) {
        t.resolve(e);
      }, function (e) {
        t.reject(e);
      }, function (e) {
        t.progress(e);
      }), t.promise) : (r = e, new f(function (e) {
        try {
          return l(e ? e(r) : r);
        } catch (e) {
          return h(e);
        }
      }));
      return n;
    }

    function f(e) {
      this.then = e;
    }

    function h(r) {
      return new f(function (e, t) {
        try {
          return t ? l(t(r)) : h(r);
        } catch (e) {
          return h(e);
        }
      });
    }

    function R() {
      function e(e, t, r) {
        return i(e, t, r);
      }

      function t(e) {
        return _c(e);
      }

      function r(e) {
        return _c(h(e));
      }

      function n(e) {
        return s(e);
      }

      var o = new f(e),
          a = [],
          u = [],
          i = function i(t, r, n) {
        var o = R(),
            i = "function" == typeof n ? function (e) {
          try {
            o.progress(n(e));
          } catch (e) {
            o.progress(e);
          }
        } : function (e) {
          o.progress(e);
        };
        return a.push(function (e) {
          e.then(t, r).then(o.resolve, o.reject, i);
        }), u.push(i), o.promise;
      },
          s = function s(e) {
        return E(u, e), e;
      },
          _c = function c(e) {
        return e = l(e), i = e.then, _c = l, s = y, E(a, e), u = a = d, e;
      };

      return {
        then: e,
        resolve: t,
        reject: r,
        progress: n,
        promise: o,
        resolver: {
          resolve: t,
          reject: r,
          progress: n
        }
      };
    }

    function o(e) {
      return e && "function" == typeof e.then;
    }

    function i(e, E, d, m, p) {
      return u(2, arguments), _(e, function (e) {
        function t(e) {
          _o(e);
        }

        function r(e) {
          _n(e);
        }

        var _n,
            _o,
            i,
            a,
            u = e.length >>> 0,
            s = Math.max(0, Math.min(E, u)),
            c = [],
            l = u - s + 1,
            f = [],
            h = R();

        if (s) for (i = h.progress, _o = function o(e) {
          f.push(e), --l || (_n = _o = y, h.reject(f));
        }, _n = function n(e) {
          c.push(e), --s || (_n = _o = y, h.resolve(c));
        }, a = 0; a < u; ++a) {
          a in e && _(e[a], r, t, i);
        } else h.resolve(c);
        return h.then(d, m, p);
      });
    }

    function r(e, t, r, n) {
      return u(1, arguments), a(e, s).then(t, r, n);
    }

    function a(e, u) {
      return _(e, function (e) {
        var t,
            r,
            n,
            o = t = e.length >>> 0,
            i = [],
            a = R();
        if (o) for (r = function r(e, t) {
          _(e, u).then(function (e) {
            i[t] = e, --o || a.resolve(i);
          }, a.reject);
        }, n = 0; n < t; n++) {
          n in e ? r(e[n], n) : --o;
        } else a.resolve(i);
        return a.promise;
      });
    }

    function E(e, t) {
      for (var r, n = 0; r = e[n++];) {
        r(t);
      }
    }

    function u(e, t) {
      for (var r, n = t.length; e < n;) {
        if (null != (r = t[--n]) && "function" != typeof r) throw new Error("arg " + n + " must be a function");
      }
    }

    function y() {}

    function s(e) {
      return e;
    }

    var n, c, d;
    return _.defer = R, _.resolve = l, _.reject = function (e) {
      return _(e, h);
    }, _.join = function () {
      return a(arguments, s);
    }, _.all = r, _.map = a, _.reduce = function (e, i) {
      var t = c.call(arguments, 1);
      return _(e, function (e) {
        var o = e.length;
        return t[0] = function (e, r, n) {
          return _(e, function (t) {
            return _(r, function (e) {
              return i(t, e, n, o);
            });
          });
        }, n.apply(e, t);
      });
    }, _.any = function (e, t, r, n) {
      return i(e, 1, function (e) {
        return t ? t(e[0]) : e[0];
      }, r, n);
    }, _.some = i, _.chain = function (e, t, r) {
      var n = 2 < arguments.length;
      return _(e, function (e) {
        return e = n ? r : e, t.resolve(e), e;
      }, function (e) {
        return t.reject(e), h(e);
      }, t.progress);
    }, _.isPromise = o, f.prototype = {
      always: function always(e, t) {
        return this.then(e, e, t);
      },
      otherwise: function otherwise(e) {
        return this.then(d, e);
      },
      "yield": function _yield(e) {
        return this.then(function () {
          return e;
        });
      },
      spread: function spread(t) {
        return this.then(function (e) {
          return r(e, function (e) {
            return t.apply(d, e);
          });
        });
      }
    }, c = [].slice, n = [].reduce || function (e) {
      var t,
          r = 0,
          n = Object(this),
          o = n.length >>> 0,
          i = arguments;
      if (i.length <= 1) for (;;) {
        if (r in n) {
          t = n[r++];
          break;
        }

        if (++r >= o) throw new TypeError();
      } else t = i[1];

      for (; r < o; ++r) {
        r in n && (t = e(t, n[r], r, n));
      }

      return t;
    }, _;
  });
})("function" == typeof define && define.amd ? define : function (e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : this.when = e();
}), define("Core/defined", [], function () {
  "use strict";

  return function (e) {
    return null != e;
  };
}), define("Core/freezeObject", ["./defined"], function (e) {
  "use strict";

  var t = Object.freeze;
  return e(t) || (t = function t(e) {
    return e;
  }), t;
}), define("Core/defaultValue", ["./freezeObject"], function (e) {
  "use strict";

  function t(e, t) {
    return null != e ? e : t;
  }

  return t.EMPTY_OBJECT = e({}), t;
}), define("Core/formatError", ["./defined"], function (i) {
  "use strict";

  return function (e) {
    var t = e.name,
        r = e.message,
        n = i(t) && i(r) ? t + ": " + r : e.toString(),
        o = e.stack;
    return i(o) && (n += "\n" + o), n;
  };
}), define("Workers/createTaskProcessorWorker", ["../ThirdParty/when", "../Core/defaultValue", "../Core/defined", "../Core/formatError"], function (a, u, s, c) {
  "use strict";

  return function (o) {
    var i;
    return function (e) {
      var t = e.data,
          r = [],
          n = {
        id: t.id,
        result: void 0,
        error: void 0
      };
      return a(function (e, t, r) {
        try {
          return e(t, r);
        } catch (e) {
          return a.reject(e);
        }
      }(o, t.parameters, r)).then(function (e) {
        n.result = e;
      }).otherwise(function (e) {
        e instanceof Error ? n.error = {
          name: e.name,
          message: e.message,
          stack: e.stack
        } : n.error = e;
      }).always(function () {
        s(i) || (i = u(self.webkitPostMessage, self.postMessage)), t.canTransferArrayBuffer || (r.length = 0);

        try {
          i(n, r);
        } catch (e) {
          n.result = void 0, n.error = "postMessage failed with error: " + c(e) + "\n  with responseMessage: " + JSON.stringify(n), i(n);
        }
      });
    };
  };
}), define("Core/defineProperties", ["./defined"], function (e) {
  "use strict";

  var t = function () {
    try {
      return "x" in Object.defineProperty({}, "x", {});
    } catch (e) {
      return !1;
    }
  }(),
      r = Object.defineProperties;

  return t && e(r) || (r = function r(e) {
    return e;
  }), r;
}), define("Core/DeveloperError", ["./defined"], function (t) {
  "use strict";

  function e(e) {
    var t;
    this.name = "DeveloperError", this.message = e;

    try {
      throw new Error();
    } catch (e) {
      t = e.stack;
    }

    this.stack = t;
  }

  return t(Object.create) && ((e.prototype = Object.create(Error.prototype)).constructor = e), e.prototype.toString = function () {
    var e = this.name + ": " + this.message;
    return t(this.stack) && (e += "\n" + this.stack.toString()), e;
  }, e.throwInstantiationError = function () {
    throw new e("This function defines an interface and should not be called directly.");
  }, e;
}), define("Core/Check", ["./defined", "./DeveloperError"], function (r, o) {
  "use strict";

  function n(e, t, r) {
    return "Expected " + r + " to be typeof " + t + ", actual typeof was " + e;
  }

  var i = {
    typeOf: {},
    defined: function defined(e, t) {
      if (!r(t)) throw new o(e + " is required, actual value was undefined");
    }
  };
  return i.typeOf.func = function (e, t) {
    if ("function" != typeof t) throw new o(n(_typeof(t), "function", e));
  }, i.typeOf.string = function (e, t) {
    if ("string" != typeof t) throw new o(n(_typeof(t), "string", e));
  }, i.typeOf.number = function (e, t) {
    if ("number" != typeof t) throw new o(n(_typeof(t), "number", e));
  }, i.typeOf.number.lessThan = function (e, t, r) {
    if (i.typeOf.number(e, t), r <= t) throw new o("Expected " + e + " to be less than " + r + ", actual value was " + t);
  }, i.typeOf.number.lessThanOrEquals = function (e, t, r) {
    if (i.typeOf.number(e, t), r < t) throw new o("Expected " + e + " to be less than or equal to " + r + ", actual value was " + t);
  }, i.typeOf.number.greaterThan = function (e, t, r) {
    if (i.typeOf.number(e, t), t <= r) throw new o("Expected " + e + " to be greater than " + r + ", actual value was " + t);
  }, i.typeOf.number.greaterThanOrEquals = function (e, t, r) {
    if (i.typeOf.number(e, t), t < r) throw new o("Expected " + e + " to be greater than or equal to" + r + ", actual value was " + t);
  }, i.typeOf.object = function (e, t) {
    if ("object" != _typeof(t)) throw new o(n(_typeof(t), "object", e));
  }, i.typeOf.bool = function (e, t) {
    if ("boolean" != typeof t) throw new o(n(_typeof(t), "boolean", e));
  }, i.typeOf.number.equals = function (e, t, r, n) {
    if (i.typeOf.number(e, r), i.typeOf.number(t, n), r !== n) throw new o(e + " must be equal to " + t + ", the actual values are " + r + " and " + n);
  }, i;
}), define("Core/Fullscreen", ["./defined", "./defineProperties"], function (a, e) {
  "use strict";

  var u,
      s = {
    requestFullscreen: void 0,
    exitFullscreen: void 0,
    fullscreenEnabled: void 0,
    fullscreenElement: void 0,
    fullscreenchange: void 0,
    fullscreenerror: void 0
  },
      r = {};
  return e(r, {
    element: {
      get: function get() {
        if (r.supportsFullscreen()) return document[s.fullscreenElement];
      }
    },
    changeEventName: {
      get: function get() {
        if (r.supportsFullscreen()) return s.fullscreenchange;
      }
    },
    errorEventName: {
      get: function get() {
        if (r.supportsFullscreen()) return s.fullscreenerror;
      }
    },
    enabled: {
      get: function get() {
        if (r.supportsFullscreen()) return document[s.fullscreenEnabled];
      }
    },
    fullscreen: {
      get: function get() {
        if (r.supportsFullscreen()) return null !== r.element;
      }
    }
  }), r.supportsFullscreen = function () {
    if (a(u)) return u;
    u = !1;
    var e = document.body;
    if ("function" == typeof e.requestFullscreen) return s.requestFullscreen = "requestFullscreen", s.exitFullscreen = "exitFullscreen", s.fullscreenEnabled = "fullscreenEnabled", s.fullscreenElement = "fullscreenElement", s.fullscreenchange = "fullscreenchange", s.fullscreenerror = "fullscreenerror", u = !0;

    for (var t = ["webkit", "moz", "o", "ms", "khtml"], r = 0, n = t.length; r < n; ++r) {
      var o,
          i = t[r];
      "function" == typeof e[o = i + "RequestFullscreen"] ? (s.requestFullscreen = o, u = !0) : "function" == typeof e[o = i + "RequestFullScreen"] && (s.requestFullscreen = o, u = !0), o = i + "ExitFullscreen", "function" == typeof document[o] ? s.exitFullscreen = o : (o = i + "CancelFullScreen", "function" == typeof document[o] && (s.exitFullscreen = o)), o = i + "FullscreenEnabled", void 0 !== document[o] ? s.fullscreenEnabled = o : (o = i + "FullScreenEnabled", void 0 !== document[o] && (s.fullscreenEnabled = o)), o = i + "FullscreenElement", void 0 !== document[o] ? s.fullscreenElement = o : (o = i + "FullScreenElement", void 0 !== document[o] && (s.fullscreenElement = o)), o = i + "fullscreenchange", void 0 !== document["on" + o] && ("ms" === i && (o = "MSFullscreenChange"), s.fullscreenchange = o), o = i + "fullscreenerror", void 0 !== document["on" + o] && ("ms" === i && (o = "MSFullscreenError"), s.fullscreenerror = o);
    }

    return u;
  }, r.requestFullscreen = function (e, t) {
    r.supportsFullscreen() && e[s.requestFullscreen]({
      vrDisplay: t
    });
  }, r.exitFullscreen = function () {
    r.supportsFullscreen() && document[s.exitFullscreen]();
  }, r;
}), define("Core/RuntimeError", ["./defined"], function (t) {
  "use strict";

  function e(e) {
    var t;
    this.name = "RuntimeError", this.message = e;

    try {
      throw new Error();
    } catch (e) {
      t = e.stack;
    }

    this.stack = t;
  }

  return t(Object.create) && ((e.prototype = Object.create(Error.prototype)).constructor = e), e.prototype.toString = function () {
    var e = this.name + ": " + this.message;
    return t(this.stack) && (e += "\n" + this.stack.toString()), e;
  }, e;
}), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./Fullscreen", "./RuntimeError", "../ThirdParty/when"], function (e, r, t, n, o) {
  "use strict";

  function i(e) {
    for (var t = e.split("."), r = 0, n = t.length; r < n; ++r) {
      t[r] = parseInt(t[r], 10);
    }

    return t;
  }

  function a() {
    var e;
    return r(d) || (d = !1, l()) || null !== (e = / Chrome\/([\.0-9]+)/.exec(P.userAgent)) && (d = !0, m = i(e[1])), d;
  }

  function u() {
    var e;
    return r(p) || (p = !1, a() || l() || !/ Safari\/[\.0-9]+/.test(P.userAgent)) || null !== (e = / Version\/([\.0-9]+)/.exec(P.userAgent)) && (p = !0, _ = i(e[1])), p;
  }

  function s() {
    var e;
    return r(R) || (R = !1, null !== (e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(P.userAgent)) && (R = !0, (y = i(e[1])).isNightly = !!e[2])), R;
  }

  function c() {
    var e;
    return r(T) || (T = !1, "Microsoft Internet Explorer" === P.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(P.userAgent)) && (T = !0, A = i(e[1])) : "Netscape" === P.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(P.userAgent)) && (T = !0, A = i(e[1]))), T;
  }

  function l() {
    var e;
    return r(S) || (S = !1, null !== (e = / Edge\/([\.0-9]+)/.exec(P.userAgent)) && (S = !0, C = i(e[1]))), S;
  }

  function f() {
    var e;
    return r(g) || (g = !1, null !== (e = /Firefox\/([\.0-9]+)/.exec(P.userAgent)) && (g = !0, O = i(e[1]))), g;
  }

  function h() {
    var e, t;
    return r(v) || ((e = document.createElement("canvas")).setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;"), t = e.style.imageRendering, (v = r(t) && "" !== t) && (M = t)), v;
  }

  function E() {
    if (r(D)) return D.promise;
    D = o.defer(), l() && (w = !1, D.resolve(w));
    var e = new Image();
    return e.onload = function () {
      w = 0 < e.width && 0 < e.height, D.resolve(w);
    }, e.onerror = function () {
      w = !1, D.resolve(w);
    }, e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", D.promise;
  }

  var d,
      m,
      p,
      _,
      R,
      y,
      T,
      A,
      S,
      C,
      g,
      O,
      N,
      I,
      M,
      v,
      w,
      D,
      P = "undefined" != typeof navigator ? navigator : {},
      F = [];

  "undefined" != typeof ArrayBuffer && (F.push(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), "undefined" != typeof Uint8ClampedArray && F.push(Uint8ClampedArray), "undefined" != typeof CanvasPixelArray && F.push(CanvasPixelArray));
  var U = {
    isChrome: a,
    chromeVersion: function chromeVersion() {
      return a() && m;
    },
    isSafari: u,
    safariVersion: function safariVersion() {
      return u() && _;
    },
    isWebkit: s,
    webkitVersion: function webkitVersion() {
      return s() && y;
    },
    isInternetExplorer: c,
    internetExplorerVersion: function internetExplorerVersion() {
      return c() && A;
    },
    isEdge: l,
    edgeVersion: function edgeVersion() {
      return l() && C;
    },
    isFirefox: f,
    firefoxVersion: function firefoxVersion() {
      return f() && O;
    },
    isWindows: function isWindows() {
      return r(N) || (N = /Windows/i.test(P.appVersion)), N;
    },
    hardwareConcurrency: e(P.hardwareConcurrency, 3),
    supportsPointerEvents: function supportsPointerEvents() {
      return r(I) || (I = !1), I;
    },
    supportsImageRenderingPixelated: h,
    supportsWebP: E,
    supportsWebPSync: function supportsWebPSync() {
      return r(D) || E(), w;
    },
    imageRenderingValue: function imageRenderingValue() {
      return h() ? M : void 0;
    },
    typedArrayTypes: F,
    supportsFullscreen: function supportsFullscreen() {
      return t.supportsFullscreen();
    },
    supportsTypedArrays: function supportsTypedArrays() {
      return "undefined" != typeof ArrayBuffer;
    },
    supportsWebWorkers: function supportsWebWorkers() {
      return "undefined" != typeof Worker;
    },
    supportsWebAssembly: function supportsWebAssembly() {
      return "undefined" != typeof WebAssembly && !U.isEdge();
    }
  };
  return U;
}), define("ThirdParty/mersenne-twister", [], function () {
  function e(e) {
    null == e && (e = new Date().getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(e);
  }

  return e.prototype.init_genrand = function (e) {
    for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
      e = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
      this.mt[this.mti] = (1812433253 * ((4294901760 & e) >>> 16) << 16) + 1812433253 * (65535 & e) + this.mti, this.mt[this.mti] >>>= 0;
    }
  }, e.prototype.genrand_int32 = function () {
    var e,
        t,
        r = new Array(0, this.MATRIX_A);

    if (this.mti >= this.N) {
      for (this.mti == this.N + 1 && this.init_genrand(5489), t = 0; t < this.N - this.M; t++) {
        e = this.mt[t] & this.UPPER_MASK | this.mt[t + 1] & this.LOWER_MASK, this.mt[t] = this.mt[t + this.M] ^ e >>> 1 ^ r[1 & e];
      }

      for (; t < this.N - 1; t++) {
        e = this.mt[t] & this.UPPER_MASK | this.mt[t + 1] & this.LOWER_MASK, this.mt[t] = this.mt[t + (this.M - this.N)] ^ e >>> 1 ^ r[1 & e];
      }

      e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ r[1 & e], this.mti = 0;
    }

    return e = this.mt[this.mti++], e ^= e >>> 11, e ^= e << 7 & 2636928640, e ^= e << 15 & 4022730752, (e ^= e >>> 18) >>> 0;
  }, e.prototype.random = function () {
    return this.genrand_int32() * (1 / 4294967296);
  }, e;
}), define("Core/Math", ["../ThirdParty/mersenne-twister", "./Check", "./defaultValue", "./defined", "./DeveloperError"], function (t, e, i, r, n) {
  "use strict";

  var a = {
    EPSILON1: .1,
    EPSILON2: .01,
    EPSILON3: .001,
    EPSILON4: 1e-4,
    EPSILON5: 1e-5,
    EPSILON6: 1e-6,
    EPSILON7: 1e-7,
    EPSILON8: 1e-8,
    EPSILON9: 1e-9,
    EPSILON10: 1e-10,
    EPSILON11: 1e-11,
    EPSILON12: 1e-12,
    EPSILON13: 1e-13,
    EPSILON14: 1e-14,
    EPSILON15: 1e-15,
    EPSILON16: 1e-16,
    EPSILON17: 1e-17,
    EPSILON18: 1e-18,
    EPSILON19: 1e-19,
    EPSILON20: 1e-20,
    EPSILON21: 1e-21,
    GRAVITATIONALPARAMETER: 3986004418e5,
    SOLAR_RADIUS: 6955e5,
    LUNAR_RADIUS: 1737400,
    SIXTY_FOUR_KILOBYTES: 65536
  };
  a.sign = i(Math.sign, function (e) {
    return 0 === (e = +e) || e != e ? e : 0 < e ? 1 : -1;
  }), a.signNotZero = function (e) {
    return e < 0 ? -1 : 1;
  }, a.toSNorm = function (e, t) {
    return t = i(t, 255), Math.round((.5 * a.clamp(e, -1, 1) + .5) * t);
  }, a.fromSNorm = function (e, t) {
    return t = i(t, 255), a.clamp(e, 0, t) / t * 2 - 1;
  }, a.sinh = i(Math.sinh, function (e) {
    return (Math.exp(e) - Math.exp(-e)) / 2;
  }), a.cosh = i(Math.cosh, function (e) {
    return (Math.exp(e) + Math.exp(-e)) / 2;
  }), a.lerp = function (e, t, r) {
    return (1 - r) * e + r * t;
  }, a.PI = Math.PI, a.ONE_OVER_PI = 1 / Math.PI, a.PI_OVER_TWO = Math.PI / 2, a.PI_OVER_THREE = Math.PI / 3, a.PI_OVER_FOUR = Math.PI / 4, a.PI_OVER_SIX = Math.PI / 6, a.THREE_PI_OVER_TWO = 3 * Math.PI / 2, a.TWO_PI = 2 * Math.PI, a.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), a.RADIANS_PER_DEGREE = Math.PI / 180, a.DEGREES_PER_RADIAN = 180 / Math.PI, a.RADIANS_PER_ARCSECOND = a.RADIANS_PER_DEGREE / 3600, a.toRadians = function (e) {
    return e * a.RADIANS_PER_DEGREE;
  }, a.toDegrees = function (e) {
    return e * a.DEGREES_PER_RADIAN;
  }, a.convertLongitudeRange = function (e) {
    var t = a.TWO_PI,
        r = e - Math.floor(e / t) * t;
    return r < -Math.PI ? r + t : r >= Math.PI ? r - t : r;
  }, a.clampToLatitudeRange = function (e) {
    return a.clamp(e, -1 * a.PI_OVER_TWO, a.PI_OVER_TWO);
  }, a.negativePiToPi = function (e) {
    return a.zeroToTwoPi(e + a.PI) - a.PI;
  }, a.zeroToTwoPi = function (e) {
    var t = a.mod(e, a.TWO_PI);
    return Math.abs(t) < a.EPSILON14 && Math.abs(e) > a.EPSILON14 ? a.TWO_PI : t;
  }, a.mod = function (e, t) {
    return (e % t + t) % t;
  }, a.equalsEpsilon = function (e, t, r, n) {
    n = i(n, r);
    var o = Math.abs(e - t);
    return o <= n || o <= r * Math.max(Math.abs(e), Math.abs(t));
  };
  var o = [1];
  a.factorial = function (e) {
    var t = o.length;
    if (t <= e) for (var r = o[t - 1], n = t; n <= e; n++) {
      o.push(r * n);
    }
    return o[e];
  }, a.incrementWrap = function (e, t, r) {
    return r = i(r, 0), t < ++e && (e = r), e;
  }, a.isPowerOfTwo = function (e) {
    return 0 !== e && 0 == (e & e - 1);
  }, a.nextPowerOfTwo = function (e) {
    return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e;
  }, a.clamp = function (e, t, r) {
    return e < t ? t : r < e ? r : e;
  };
  var u = new t();
  return a.setRandomNumberSeed = function (e) {
    u = new t(e);
  }, a.nextRandomNumber = function () {
    return u.random();
  }, a.randomBetween = function (e, t) {
    return a.nextRandomNumber() * (t - e) + e;
  }, a.acosClamped = function (e) {
    return Math.acos(a.clamp(e, -1, 1));
  }, a.asinClamped = function (e) {
    return Math.asin(a.clamp(e, -1, 1));
  }, a.chordLength = function (e, t) {
    return 2 * t * Math.sin(.5 * e);
  }, a.logBase = function (e, t) {
    return Math.log(e) / Math.log(t);
  }, a.cbrt = i(Math.cbrt, function (e) {
    var t = Math.pow(Math.abs(e), 1 / 3);
    return e < 0 ? -t : t;
  }), a.log2 = i(Math.log2, function (e) {
    return Math.log(e) * Math.LOG2E;
  }), a.fog = function (e, t) {
    var r = e * t;
    return 1 - Math.exp(-r * r);
  }, a.fastApproximateAtan = function (e) {
    return e * (-.1784 * Math.abs(e) - .0663 * e * e + 1.0301);
  }, a.fastApproximateAtan2 = function (e, t) {
    var r = Math.abs(e),
        n = Math.abs(t),
        o = Math.max(r, n),
        i = (n = Math.min(r, n)) / o,
        r = a.fastApproximateAtan(i);
    return r = Math.abs(t) > Math.abs(e) ? a.PI_OVER_TWO - r : r, r = e < 0 ? a.PI - r : r, t < 0 ? -r : r;
  }, a;
}), define("Core/Color", ["./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math"], function (e, d, m, t, r, p) {
  "use strict";

  function l(e, t, r) {
    return r < 0 && (r += 1), 1 < r && --r, 6 * r < 1 ? e + 6 * (t - e) * r : 2 * r < 1 ? t : 3 * r < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
  }

  function _(e, t, r, n) {
    this.red = d(e, 1), this.green = d(t, 1), this.blue = d(r, 1), this.alpha = d(n, 1);
  }

  var n, o, i;
  _.fromCartesian4 = function (e, t) {
    return m(t) ? (t.red = e.x, t.green = e.y, t.blue = e.z, t.alpha = e.w, t) : new _(e.x, e.y, e.z, e.w);
  }, _.fromBytes = function (e, t, r, n, o) {
    return e = _.byteToFloat(d(e, 255)), t = _.byteToFloat(d(t, 255)), r = _.byteToFloat(d(r, 255)), n = _.byteToFloat(d(n, 255)), m(o) ? (o.red = e, o.green = t, o.blue = r, o.alpha = n, o) : new _(e, t, r, n);
  }, _.fromAlpha = function (e, t, r) {
    return m(r) ? (r.red = e.red, r.green = e.green, r.blue = e.blue, r.alpha = t, r) : new _(e.red, e.green, e.blue, t);
  }, t.supportsTypedArrays() && (n = new ArrayBuffer(4), o = new Uint32Array(n), i = new Uint8Array(n)), _.fromRgba = function (e, t) {
    return o[0] = e, _.fromBytes(i[0], i[1], i[2], i[3], t);
  }, _.fromHsl = function (e, t, r, n, o) {
    e = d(e, 0) % 1, t = d(t, 0), r = d(r, 0), n = d(n, 1);
    var i,
        a,
        u = r,
        s = r,
        c = r;
    return 0 !== t && (u = l(a = 2 * r - (i = r < .5 ? r * (1 + t) : r + t - r * t), i, e + 1 / 3), s = l(a, i, e), c = l(a, i, e - 1 / 3)), m(o) ? (o.red = u, o.green = s, o.blue = c, o.alpha = n, o) : new _(u, s, c, n);
  }, _.fromRandom = function (e, t) {
    var r,
        n,
        o = (e = d(e, d.EMPTY_OBJECT)).red;
    m(o) || (r = d(e.minimumRed, 0), n = d(e.maximumRed, 1), o = r + p.nextRandomNumber() * (n - r));
    var i,
        a,
        u = e.green;
    m(u) || (i = d(e.minimumGreen, 0), a = d(e.maximumGreen, 1), u = i + p.nextRandomNumber() * (a - i));
    var s,
        c,
        l = e.blue;
    m(l) || (s = d(e.minimumBlue, 0), c = d(e.maximumBlue, 1), l = s + p.nextRandomNumber() * (c - s));
    var f,
        h,
        E = e.alpha;
    return m(E) || (f = d(e.minimumAlpha, 0), h = d(e.maximumAlpha, 1), E = f + p.nextRandomNumber() * (h - f)), m(t) ? (t.red = o, t.green = u, t.blue = l, t.alpha = E, t) : new _(o, u, l, E);
  };
  var a = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
      u = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
      s = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
      c = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
  return _.fromCssColorString = function (e, t) {
    m(t) || (t = new _());

    var r = _[e.toUpperCase()];

    if (m(r)) return _.clone(r, t), t;
    var n = a.exec(e);
    return null !== n ? (t.red = parseInt(n[1], 16) / 15, t.green = parseInt(n[2], 16) / 15, t.blue = parseInt(n[3], 16) / 15, t.alpha = 1, t) : null !== (n = u.exec(e)) ? (t.red = parseInt(n[1], 16) / 255, t.green = parseInt(n[2], 16) / 255, t.blue = parseInt(n[3], 16) / 255, t.alpha = 1, t) : null !== (n = s.exec(e)) ? (t.red = parseFloat(n[1]) / ("%" === n[1].substr(-1) ? 100 : 255), t.green = parseFloat(n[2]) / ("%" === n[2].substr(-1) ? 100 : 255), t.blue = parseFloat(n[3]) / ("%" === n[3].substr(-1) ? 100 : 255), t.alpha = parseFloat(d(n[4], "1.0")), t) : null !== (n = c.exec(e)) ? _.fromHsl(parseFloat(n[1]) / 360, parseFloat(n[2]) / 100, parseFloat(n[3]) / 100, parseFloat(d(n[4], "1.0")), t) : t = void 0;
  }, _.packedLength = 4, _.pack = function (e, t, r) {
    return r = d(r, 0), t[r++] = e.red, t[r++] = e.green, t[r++] = e.blue, t[r] = e.alpha, t;
  }, _.unpack = function (e, t, r) {
    return t = d(t, 0), m(r) || (r = new _()), r.red = e[t++], r.green = e[t++], r.blue = e[t++], r.alpha = e[t], r;
  }, _.byteToFloat = function (e) {
    return e / 255;
  }, _.floatToByte = function (e) {
    return 1 === e ? 255 : 256 * e | 0;
  }, _.clone = function (e, t) {
    if (m(e)) return m(t) ? (t.red = e.red, t.green = e.green, t.blue = e.blue, t.alpha = e.alpha, t) : new _(e.red, e.green, e.blue, e.alpha);
  }, _.equals = function (e, t) {
    return e === t || m(e) && m(t) && e.red === t.red && e.green === t.green && e.blue === t.blue && e.alpha === t.alpha;
  }, _.equalsArray = function (e, t, r) {
    return e.red === t[r] && e.green === t[r + 1] && e.blue === t[r + 2] && e.alpha === t[r + 3];
  }, _.prototype.clone = function (e) {
    return _.clone(this, e);
  }, _.prototype.equals = function (e) {
    return _.equals(this, e);
  }, _.prototype.equalsEpsilon = function (e, t) {
    return this === e || m(e) && Math.abs(this.red - e.red) <= t && Math.abs(this.green - e.green) <= t && Math.abs(this.blue - e.blue) <= t && Math.abs(this.alpha - e.alpha) <= t;
  }, _.prototype.toString = function () {
    return "(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
  }, _.prototype.toCssColorString = function () {
    var e = _.floatToByte(this.red),
        t = _.floatToByte(this.green),
        r = _.floatToByte(this.blue);

    return 1 === this.alpha ? "rgb(" + e + "," + t + "," + r + ")" : "rgba(" + e + "," + t + "," + r + "," + this.alpha + ")";
  }, _.prototype.toBytes = function (e) {
    var t = _.floatToByte(this.red),
        r = _.floatToByte(this.green),
        n = _.floatToByte(this.blue),
        o = _.floatToByte(this.alpha);

    return m(e) ? (e[0] = t, e[1] = r, e[2] = n, e[3] = o, e) : [t, r, n, o];
  }, _.prototype.toRgba = function () {
    return i[0] = _.floatToByte(this.red), i[1] = _.floatToByte(this.green), i[2] = _.floatToByte(this.blue), i[3] = _.floatToByte(this.alpha), o[0];
  }, _.prototype.brighten = function (e, t) {
    return e = 1 - e, t.red = 1 - (1 - this.red) * e, t.green = 1 - (1 - this.green) * e, t.blue = 1 - (1 - this.blue) * e, t.alpha = this.alpha, t;
  }, _.prototype.darken = function (e, t) {
    return e = 1 - e, t.red = this.red * e, t.green = this.green * e, t.blue = this.blue * e, t.alpha = this.alpha, t;
  }, _.prototype.withAlpha = function (e, t) {
    return _.fromAlpha(this, e, t);
  }, _.add = function (e, t, r) {
    return r.red = e.red + t.red, r.green = e.green + t.green, r.blue = e.blue + t.blue, r.alpha = e.alpha + t.alpha, r;
  }, _.subtract = function (e, t, r) {
    return r.red = e.red - t.red, r.green = e.green - t.green, r.blue = e.blue - t.blue, r.alpha = e.alpha - t.alpha, r;
  }, _.multiply = function (e, t, r) {
    return r.red = e.red * t.red, r.green = e.green * t.green, r.blue = e.blue * t.blue, r.alpha = e.alpha * t.alpha, r;
  }, _.divide = function (e, t, r) {
    return r.red = e.red / t.red, r.green = e.green / t.green, r.blue = e.blue / t.blue, r.alpha = e.alpha / t.alpha, r;
  }, _.mod = function (e, t, r) {
    return r.red = e.red % t.red, r.green = e.green % t.green, r.blue = e.blue % t.blue, r.alpha = e.alpha % t.alpha, r;
  }, _.multiplyByScalar = function (e, t, r) {
    return r.red = e.red * t, r.green = e.green * t, r.blue = e.blue * t, r.alpha = e.alpha * t, r;
  }, _.divideByScalar = function (e, t, r) {
    return r.red = e.red / t, r.green = e.green / t, r.blue = e.blue / t, r.alpha = e.alpha / t, r;
  }, _.ALICEBLUE = r(_.fromCssColorString("#F0F8FF")), _.ANTIQUEWHITE = r(_.fromCssColorString("#FAEBD7")), _.AQUA = r(_.fromCssColorString("#00FFFF")), _.AQUAMARINE = r(_.fromCssColorString("#7FFFD4")), _.AZURE = r(_.fromCssColorString("#F0FFFF")), _.BEIGE = r(_.fromCssColorString("#F5F5DC")), _.BISQUE = r(_.fromCssColorString("#FFE4C4")), _.BLACK = r(_.fromCssColorString("#000000")), _.BLANCHEDALMOND = r(_.fromCssColorString("#FFEBCD")), _.BLUE = r(_.fromCssColorString("#0000FF")), _.BLUEVIOLET = r(_.fromCssColorString("#8A2BE2")), _.BROWN = r(_.fromCssColorString("#A52A2A")), _.BURLYWOOD = r(_.fromCssColorString("#DEB887")), _.CADETBLUE = r(_.fromCssColorString("#5F9EA0")), _.CHARTREUSE = r(_.fromCssColorString("#7FFF00")), _.CHOCOLATE = r(_.fromCssColorString("#D2691E")), _.CORAL = r(_.fromCssColorString("#FF7F50")), _.CORNFLOWERBLUE = r(_.fromCssColorString("#6495ED")), _.CORNSILK = r(_.fromCssColorString("#FFF8DC")), _.CRIMSON = r(_.fromCssColorString("#DC143C")), _.CYAN = r(_.fromCssColorString("#00FFFF")), _.DARKBLUE = r(_.fromCssColorString("#00008B")), _.DARKCYAN = r(_.fromCssColorString("#008B8B")), _.DARKGOLDENROD = r(_.fromCssColorString("#B8860B")), _.DARKGRAY = r(_.fromCssColorString("#A9A9A9")), _.DARKGREEN = r(_.fromCssColorString("#006400")), _.DARKGREY = _.DARKGRAY, _.DARKKHAKI = r(_.fromCssColorString("#BDB76B")), _.DARKMAGENTA = r(_.fromCssColorString("#8B008B")), _.DARKOLIVEGREEN = r(_.fromCssColorString("#556B2F")), _.DARKORANGE = r(_.fromCssColorString("#FF8C00")), _.DARKORCHID = r(_.fromCssColorString("#9932CC")), _.DARKRED = r(_.fromCssColorString("#8B0000")), _.DARKSALMON = r(_.fromCssColorString("#E9967A")), _.DARKSEAGREEN = r(_.fromCssColorString("#8FBC8F")), _.DARKSLATEBLUE = r(_.fromCssColorString("#483D8B")), _.DARKSLATEGRAY = r(_.fromCssColorString("#2F4F4F")), _.DARKSLATEGREY = _.DARKSLATEGRAY, _.DARKTURQUOISE = r(_.fromCssColorString("#00CED1")), _.DARKVIOLET = r(_.fromCssColorString("#9400D3")), _.DEEPPINK = r(_.fromCssColorString("#FF1493")), _.DEEPSKYBLUE = r(_.fromCssColorString("#00BFFF")), _.DIMGRAY = r(_.fromCssColorString("#696969")), _.DIMGREY = _.DIMGRAY, _.DODGERBLUE = r(_.fromCssColorString("#1E90FF")), _.FIREBRICK = r(_.fromCssColorString("#B22222")), _.FLORALWHITE = r(_.fromCssColorString("#FFFAF0")), _.FORESTGREEN = r(_.fromCssColorString("#228B22")), _.FUCHSIA = r(_.fromCssColorString("#FF00FF")), _.GAINSBORO = r(_.fromCssColorString("#DCDCDC")), _.GHOSTWHITE = r(_.fromCssColorString("#F8F8FF")), _.GOLD = r(_.fromCssColorString("#FFD700")), _.GOLDENROD = r(_.fromCssColorString("#DAA520")), _.GRAY = r(_.fromCssColorString("#808080")), _.GREEN = r(_.fromCssColorString("#008000")), _.GREENYELLOW = r(_.fromCssColorString("#ADFF2F")), _.GREY = _.GRAY, _.HONEYDEW = r(_.fromCssColorString("#F0FFF0")), _.HOTPINK = r(_.fromCssColorString("#FF69B4")), _.INDIANRED = r(_.fromCssColorString("#CD5C5C")), _.INDIGO = r(_.fromCssColorString("#4B0082")), _.IVORY = r(_.fromCssColorString("#FFFFF0")), _.KHAKI = r(_.fromCssColorString("#F0E68C")), _.LAVENDER = r(_.fromCssColorString("#E6E6FA")), _.LAVENDAR_BLUSH = r(_.fromCssColorString("#FFF0F5")), _.LAWNGREEN = r(_.fromCssColorString("#7CFC00")), _.LEMONCHIFFON = r(_.fromCssColorString("#FFFACD")), _.LIGHTBLUE = r(_.fromCssColorString("#ADD8E6")), _.LIGHTCORAL = r(_.fromCssColorString("#F08080")), _.LIGHTCYAN = r(_.fromCssColorString("#E0FFFF")), _.LIGHTGOLDENRODYELLOW = r(_.fromCssColorString("#FAFAD2")), _.LIGHTGRAY = r(_.fromCssColorString("#D3D3D3")), _.LIGHTGREEN = r(_.fromCssColorString("#90EE90")), _.LIGHTGREY = _.LIGHTGRAY, _.LIGHTPINK = r(_.fromCssColorString("#FFB6C1")), _.LIGHTSEAGREEN = r(_.fromCssColorString("#20B2AA")), _.LIGHTSKYBLUE = r(_.fromCssColorString("#87CEFA")), _.LIGHTSLATEGRAY = r(_.fromCssColorString("#778899")), _.LIGHTSLATEGREY = _.LIGHTSLATEGRAY, _.LIGHTSTEELBLUE = r(_.fromCssColorString("#B0C4DE")), _.LIGHTYELLOW = r(_.fromCssColorString("#FFFFE0")), _.LIME = r(_.fromCssColorString("#00FF00")), _.LIMEGREEN = r(_.fromCssColorString("#32CD32")), _.LINEN = r(_.fromCssColorString("#FAF0E6")), _.MAGENTA = r(_.fromCssColorString("#FF00FF")), _.MAROON = r(_.fromCssColorString("#800000")), _.MEDIUMAQUAMARINE = r(_.fromCssColorString("#66CDAA")), _.MEDIUMBLUE = r(_.fromCssColorString("#0000CD")), _.MEDIUMORCHID = r(_.fromCssColorString("#BA55D3")), _.MEDIUMPURPLE = r(_.fromCssColorString("#9370DB")), _.MEDIUMSEAGREEN = r(_.fromCssColorString("#3CB371")), _.MEDIUMSLATEBLUE = r(_.fromCssColorString("#7B68EE")), _.MEDIUMSPRINGGREEN = r(_.fromCssColorString("#00FA9A")), _.MEDIUMTURQUOISE = r(_.fromCssColorString("#48D1CC")), _.MEDIUMVIOLETRED = r(_.fromCssColorString("#C71585")), _.MIDNIGHTBLUE = r(_.fromCssColorString("#191970")), _.MINTCREAM = r(_.fromCssColorString("#F5FFFA")), _.MISTYROSE = r(_.fromCssColorString("#FFE4E1")), _.MOCCASIN = r(_.fromCssColorString("#FFE4B5")), _.NAVAJOWHITE = r(_.fromCssColorString("#FFDEAD")), _.NAVY = r(_.fromCssColorString("#000080")), _.OLDLACE = r(_.fromCssColorString("#FDF5E6")), _.OLIVE = r(_.fromCssColorString("#808000")), _.OLIVEDRAB = r(_.fromCssColorString("#6B8E23")), _.ORANGE = r(_.fromCssColorString("#FFA500")), _.ORANGERED = r(_.fromCssColorString("#FF4500")), _.ORCHID = r(_.fromCssColorString("#DA70D6")), _.PALEGOLDENROD = r(_.fromCssColorString("#EEE8AA")), _.PALEGREEN = r(_.fromCssColorString("#98FB98")), _.PALETURQUOISE = r(_.fromCssColorString("#AFEEEE")), _.PALEVIOLETRED = r(_.fromCssColorString("#DB7093")), _.PAPAYAWHIP = r(_.fromCssColorString("#FFEFD5")), _.PEACHPUFF = r(_.fromCssColorString("#FFDAB9")), _.PERU = r(_.fromCssColorString("#CD853F")), _.PINK = r(_.fromCssColorString("#FFC0CB")), _.PLUM = r(_.fromCssColorString("#DDA0DD")), _.POWDERBLUE = r(_.fromCssColorString("#B0E0E6")), _.PURPLE = r(_.fromCssColorString("#800080")), _.RED = r(_.fromCssColorString("#FF0000")), _.ROSYBROWN = r(_.fromCssColorString("#BC8F8F")), _.ROYALBLUE = r(_.fromCssColorString("#4169E1")), _.SADDLEBROWN = r(_.fromCssColorString("#8B4513")), _.SALMON = r(_.fromCssColorString("#FA8072")), _.SANDYBROWN = r(_.fromCssColorString("#F4A460")), _.SEAGREEN = r(_.fromCssColorString("#2E8B57")), _.SEASHELL = r(_.fromCssColorString("#FFF5EE")), _.SIENNA = r(_.fromCssColorString("#A0522D")), _.SILVER = r(_.fromCssColorString("#C0C0C0")), _.SKYBLUE = r(_.fromCssColorString("#87CEEB")), _.SLATEBLUE = r(_.fromCssColorString("#6A5ACD")), _.SLATEGRAY = r(_.fromCssColorString("#708090")), _.SLATEGREY = _.SLATEGRAY, _.SNOW = r(_.fromCssColorString("#FFFAFA")), _.SPRINGGREEN = r(_.fromCssColorString("#00FF7F")), _.STEELBLUE = r(_.fromCssColorString("#4682B4")), _.TAN = r(_.fromCssColorString("#D2B48C")), _.TEAL = r(_.fromCssColorString("#008080")), _.THISTLE = r(_.fromCssColorString("#D8BFD8")), _.TOMATO = r(_.fromCssColorString("#FF6347")), _.TURQUOISE = r(_.fromCssColorString("#40E0D0")), _.VIOLET = r(_.fromCssColorString("#EE82EE")), _.WHEAT = r(_.fromCssColorString("#F5DEB3")), _.WHITE = r(_.fromCssColorString("#FFFFFF")), _.WHITESMOKE = r(_.fromCssColorString("#F5F5F5")), _.YELLOW = r(_.fromCssColorString("#FFFF00")), _.YELLOWGREEN = r(_.fromCssColorString("#9ACD32")), _.TRANSPARENT = r(new _(0, 0, 0, 0)), _;
}), define("Core/Cartesian2", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, n, i, t, r, o) {
  "use strict";

  function a(e, t) {
    this.x = n(e, 0), this.y = n(t, 0);
  }

  a.fromElements = function (e, t, r) {
    return i(r) ? (r.x = e, r.y = t, r) : new a(e, t);
  }, a.fromCartesian3 = a.clone = function (e, t) {
    if (i(e)) return i(t) ? (t.x = e.x, t.y = e.y, t) : new a(e.x, e.y);
  }, a.fromCartesian4 = a.clone, a.packedLength = 2, a.pack = function (e, t, r) {
    return r = n(r, 0), t[r++] = e.x, t[r] = e.y, t;
  }, a.unpack = function (e, t, r) {
    return t = n(t, 0), i(r) || (r = new a()), r.x = e[t++], r.y = e[t], r;
  }, a.packArray = function (e, t) {
    var r = e.length;
    i(t) ? t.length = 2 * r : t = new Array(2 * r);

    for (var n = 0; n < r; ++n) {
      a.pack(e[n], t, 2 * n);
    }

    return t;
  }, a.unpackArray = function (e, t) {
    var r = e.length;
    i(t) ? t.length = r / 2 : t = new Array(r / 2);

    for (var n = 0; n < r; n += 2) {
      var o = n / 2;
      t[o] = a.unpack(e, n, t[o]);
    }

    return t;
  }, a.fromArray = a.unpack, a.maximumComponent = function (e) {
    return Math.max(e.x, e.y);
  }, a.minimumComponent = function (e) {
    return Math.min(e.x, e.y);
  }, a.minimumByComponent = function (e, t, r) {
    return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r;
  }, a.maximumByComponent = function (e, t, r) {
    return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r;
  }, a.magnitudeSquared = function (e) {
    return e.x * e.x + e.y * e.y;
  }, a.magnitude = function (e) {
    return Math.sqrt(a.magnitudeSquared(e));
  };
  var u = new a();
  a.distance = function (e, t) {
    return a.subtract(e, t, u), a.magnitude(u);
  }, a.distanceSquared = function (e, t) {
    return a.subtract(e, t, u), a.magnitudeSquared(u);
  }, a.normalize = function (e, t) {
    var r = a.magnitude(e);
    return t.x = e.x / r, t.y = e.y / r, t;
  }, a.dot = function (e, t) {
    return e.x * t.x + e.y * t.y;
  }, a.multiplyComponents = function (e, t, r) {
    return r.x = e.x * t.x, r.y = e.y * t.y, r;
  }, a.divideComponents = function (e, t, r) {
    return r.x = e.x / t.x, r.y = e.y / t.y, r;
  }, a.add = function (e, t, r) {
    return r.x = e.x + t.x, r.y = e.y + t.y, r;
  }, a.subtract = function (e, t, r) {
    return r.x = e.x - t.x, r.y = e.y - t.y, r;
  }, a.multiplyByScalar = function (e, t, r) {
    return r.x = e.x * t, r.y = e.y * t, r;
  }, a.divideByScalar = function (e, t, r) {
    return r.x = e.x / t, r.y = e.y / t, r;
  }, a.negate = function (e, t) {
    return t.x = -e.x, t.y = -e.y, t;
  }, a.abs = function (e, t) {
    return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t;
  };
  var s = new a();

  a.lerp = function (e, t, r, n) {
    return a.multiplyByScalar(t, r, s), n = a.multiplyByScalar(e, 1 - r, n), a.add(s, n, n);
  };

  var c = new a(),
      l = new a();

  a.angleBetween = function (e, t) {
    return a.normalize(e, c), a.normalize(t, l), o.acosClamped(a.dot(c, l));
  };

  var f = new a();
  return a.mostOrthogonalAxis = function (e, t) {
    var r = a.normalize(e, f);
    return a.abs(r, r), r.x <= r.y ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_Y, t);
  }, a.equals = function (e, t) {
    return e === t || i(e) && i(t) && e.x === t.x && e.y === t.y;
  }, a.equalsArray = function (e, t, r) {
    return e.x === t[r] && e.y === t[r + 1];
  }, a.equalsEpsilon = function (e, t, r, n) {
    return e === t || i(e) && i(t) && o.equalsEpsilon(e.x, t.x, r, n) && o.equalsEpsilon(e.y, t.y, r, n);
  }, a.ZERO = r(new a(0, 0)), a.UNIT_X = r(new a(1, 0)), a.UNIT_Y = r(new a(0, 1)), a.prototype.clone = function (e) {
    return a.clone(this, e);
  }, a.prototype.equals = function (e) {
    return a.equals(this, e);
  }, a.prototype.equalsEpsilon = function (e, t, r) {
    return a.equalsEpsilon(this, e, t, r);
  }, a.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")";
  }, a;
}), define("Core/Cartesian3", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, s, c, t, r, i) {
  "use strict";

  function l(e, t, r) {
    this.x = s(e, 0), this.y = s(t, 0), this.z = s(r, 0);
  }

  l.fromSpherical = function (e, t) {
    c(t) || (t = new l());
    var r = e.clock,
        n = e.cone,
        o = s(e.magnitude, 1),
        i = o * Math.sin(n);
    return t.x = i * Math.cos(r), t.y = i * Math.sin(r), t.z = o * Math.cos(n), t;
  }, l.fromElements = function (e, t, r, n) {
    return c(n) ? (n.x = e, n.y = t, n.z = r, n) : new l(e, t, r);
  }, l.fromCartesian4 = l.clone = function (e, t) {
    if (c(e)) return c(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t) : new l(e.x, e.y, e.z);
  }, l.packedLength = 3, l.pack = function (e, t, r) {
    return r = s(r, 0), t[r++] = e.x, t[r++] = e.y, t[r] = e.z, t;
  }, l.unpack = function (e, t, r) {
    return t = s(t, 0), c(r) || (r = new l()), r.x = e[t++], r.y = e[t++], r.z = e[t], r;
  }, l.packArray = function (e, t) {
    var r = e.length;
    c(t) ? t.length = 3 * r : t = new Array(3 * r);

    for (var n = 0; n < r; ++n) {
      l.pack(e[n], t, 3 * n);
    }

    return t;
  }, l.unpackArray = function (e, t) {
    var r = e.length;
    c(t) ? t.length = r / 3 : t = new Array(r / 3);

    for (var n = 0; n < r; n += 3) {
      var o = n / 3;
      t[o] = l.unpack(e, n, t[o]);
    }

    return t;
  }, l.fromArray = l.unpack, l.maximumComponent = function (e) {
    return Math.max(e.x, e.y, e.z);
  }, l.minimumComponent = function (e) {
    return Math.min(e.x, e.y, e.z);
  }, l.minimumByComponent = function (e, t, r) {
    return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r.z = Math.min(e.z, t.z), r;
  }, l.maximumByComponent = function (e, t, r) {
    return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r.z = Math.max(e.z, t.z), r;
  }, l.magnitudeSquared = function (e) {
    return e.x * e.x + e.y * e.y + e.z * e.z;
  }, l.magnitude = function (e) {
    return Math.sqrt(l.magnitudeSquared(e));
  };
  var n = new l();
  l.distance = function (e, t) {
    return l.subtract(e, t, n), l.magnitude(n);
  }, l.distanceSquared = function (e, t) {
    return l.subtract(e, t, n), l.magnitudeSquared(n);
  }, l.normalize = function (e, t) {
    var r = l.magnitude(e);
    return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t;
  }, l.dot = function (e, t) {
    return e.x * t.x + e.y * t.y + e.z * t.z;
  }, l.multiplyComponents = function (e, t, r) {
    return r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z, r;
  }, l.divideComponents = function (e, t, r) {
    return r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z, r;
  }, l.add = function (e, t, r) {
    return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r;
  }, l.subtract = function (e, t, r) {
    return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r;
  }, l.multiplyByScalar = function (e, t, r) {
    return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r;
  }, l.divideByScalar = function (e, t, r) {
    return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r;
  }, l.negate = function (e, t) {
    return t.x = -e.x, t.y = -e.y, t.z = -e.z, t;
  }, l.abs = function (e, t) {
    return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t;
  };
  var o = new l();

  l.lerp = function (e, t, r, n) {
    return l.multiplyByScalar(t, r, o), n = l.multiplyByScalar(e, 1 - r, n), l.add(o, n, n);
  };

  var a = new l(),
      u = new l();

  l.angleBetween = function (e, t) {
    l.normalize(e, a), l.normalize(t, u);
    var r = l.dot(a, u),
        n = l.magnitude(l.cross(a, u, a));
    return Math.atan2(n, r);
  };

  var f = new l();
  l.mostOrthogonalAxis = function (e, t) {
    var r = l.normalize(e, f);
    return l.abs(r, r), r.x <= r.y ? r.x <= r.z ? l.clone(l.UNIT_X, t) : l.clone(l.UNIT_Z, t) : r.y <= r.z ? l.clone(l.UNIT_Y, t) : l.clone(l.UNIT_Z, t);
  }, l.projectVector = function (e, t, r) {
    var n = l.dot(e, t) / l.dot(t, t);
    return l.multiplyByScalar(t, n, r);
  }, l.equals = function (e, t) {
    return e === t || c(e) && c(t) && e.x === t.x && e.y === t.y && e.z === t.z;
  }, l.equalsArray = function (e, t, r) {
    return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2];
  }, l.equalsEpsilon = function (e, t, r, n) {
    return e === t || c(e) && c(t) && i.equalsEpsilon(e.x, t.x, r, n) && i.equalsEpsilon(e.y, t.y, r, n) && i.equalsEpsilon(e.z, t.z, r, n);
  }, l.cross = function (e, t, r) {
    var n = e.x,
        o = e.y,
        i = e.z,
        a = t.x,
        u = t.y,
        s = t.z,
        c = o * s - i * u,
        l = i * a - n * s,
        f = n * u - o * a;
    return r.x = c, r.y = l, r.z = f, r;
  }, l.midpoint = function (e, t, r) {
    return r.x = .5 * (e.x + t.x), r.y = .5 * (e.y + t.y), r.z = .5 * (e.z + t.z), r;
  }, l.fromDegrees = function (e, t, r, n, o) {
    return e = i.toRadians(e), t = i.toRadians(t), l.fromRadians(e, t, r, n, o);
  };
  var h = new l(),
      E = new l(),
      d = new l(40680631590769, 40680631590769, 40408299984661.445);
  return l.fromRadians = function (e, t, r, n, o) {
    r = s(r, 0);
    var i = c(n) ? n.radiiSquared : d,
        a = Math.cos(t);
    h.x = a * Math.cos(e), h.y = a * Math.sin(e), h.z = Math.sin(t), h = l.normalize(h, h), l.multiplyComponents(i, h, E);
    var u = Math.sqrt(l.dot(h, E));
    return E = l.divideByScalar(E, u, E), h = l.multiplyByScalar(h, r, h), c(o) || (o = new l()), l.add(E, h, o);
  }, l.fromDegreesArray = function (e, t, r) {
    var n = e.length;
    c(r) ? r.length = n / 2 : r = new Array(n / 2);

    for (var o = 0; o < n; o += 2) {
      var i = e[o],
          a = e[o + 1],
          u = o / 2;
      r[u] = l.fromDegrees(i, a, 0, t, r[u]);
    }

    return r;
  }, l.fromRadiansArray = function (e, t, r) {
    var n = e.length;
    c(r) ? r.length = n / 2 : r = new Array(n / 2);

    for (var o = 0; o < n; o += 2) {
      var i = e[o],
          a = e[o + 1],
          u = o / 2;
      r[u] = l.fromRadians(i, a, 0, t, r[u]);
    }

    return r;
  }, l.fromDegreesArrayHeights = function (e, t, r) {
    var n = e.length;
    c(r) ? r.length = n / 3 : r = new Array(n / 3);

    for (var o = 0; o < n; o += 3) {
      var i = e[o],
          a = e[o + 1],
          u = e[o + 2],
          s = o / 3;
      r[s] = l.fromDegrees(i, a, u, t, r[s]);
    }

    return r;
  }, l.fromRadiansArrayHeights = function (e, t, r) {
    var n = e.length;
    c(r) ? r.length = n / 3 : r = new Array(n / 3);

    for (var o = 0; o < n; o += 3) {
      var i = e[o],
          a = e[o + 1],
          u = e[o + 2],
          s = o / 3;
      r[s] = l.fromRadians(i, a, u, t, r[s]);
    }

    return r;
  }, l.ZERO = r(new l(0, 0, 0)), l.UNIT_X = r(new l(1, 0, 0)), l.UNIT_Y = r(new l(0, 1, 0)), l.UNIT_Z = r(new l(0, 0, 1)), l.prototype.clone = function (e) {
    return l.clone(this, e);
  }, l.prototype.equals = function (e) {
    return l.equals(this, e);
  }, l.prototype.equalsEpsilon = function (e, t, r) {
    return l.equalsEpsilon(this, e, t, r);
  }, l.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ")";
  }, l;
}), define("Core/scaleToGeodeticSurface", ["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function (w, D, e, P) {
  "use strict";

  var F = new w(),
      U = new w();
  return function (e, t, r, n, o) {
    var i = e.x,
        a = e.y,
        u = e.z,
        s = t.x,
        c = t.y,
        l = t.z,
        f = i * i * s * s,
        h = a * a * c * c,
        E = u * u * l * l,
        d = f + h + E,
        m = Math.sqrt(1 / d),
        p = w.multiplyByScalar(e, m, F);
    if (d < n) return isFinite(m) ? w.clone(p, o) : void 0;
    var _ = r.x,
        R = r.y,
        y = r.z,
        T = U;
    T.x = p.x * _ * 2, T.y = p.y * R * 2, T.z = p.z * y * 2;

    for (var A, S, C, g, O, N, I, M = (1 - m) * w.magnitude(e) / (.5 * w.magnitude(T)), v = 0; v = (A = f * (O = (S = 1 / (1 + (M -= v) * _)) * S) + h * (N = (C = 1 / (1 + M * R)) * C) + E * (I = (g = 1 / (1 + M * y)) * g) - 1) / (-2 * (f * (O * S) * _ + h * (N * C) * R + E * (I * g) * y)), Math.abs(A) > P.EPSILON12;) {
      ;
    }

    return D(o) ? (o.x = i * S, o.y = a * C, o.z = u * g, o) : new w(i * S, a * C, u * g);
  };
}), define("Core/Cartographic", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (h, e, o, E, t, d, m) {
  "use strict";

  function p(e, t, r) {
    this.longitude = o(e, 0), this.latitude = o(t, 0), this.height = o(r, 0);
  }

  p.fromRadians = function (e, t, r, n) {
    return r = o(r, 0), E(n) ? (n.longitude = e, n.latitude = t, n.height = r, n) : new p(e, t, r);
  }, p.fromDegrees = function (e, t, r, n) {
    return e = d.toRadians(e), t = d.toRadians(t), p.fromRadians(e, t, r, n);
  };

  var _ = new h(),
      R = new h(),
      y = new h(),
      T = new h(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
      A = new h(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
      S = d.EPSILON1;

  return p.fromCartesian = function (e, t, r) {
    var n = E(t) ? t.oneOverRadii : T,
        o = E(t) ? t.oneOverRadiiSquared : A,
        i = E(t) ? t._centerToleranceSquared : S,
        a = m(e, n, o, i, R);

    if (E(a)) {
      var u = h.multiplyComponents(a, o, _),
          u = h.normalize(u, u),
          s = h.subtract(e, a, y),
          c = Math.atan2(u.y, u.x),
          l = Math.asin(u.z),
          f = d.sign(h.dot(s, e)) * h.magnitude(s);
      return E(r) ? (r.longitude = c, r.latitude = l, r.height = f, r) : new p(c, l, f);
    }
  }, p.toCartesian = function (e, t, r) {
    return h.fromRadians(e.longitude, e.latitude, e.height, t, r);
  }, p.clone = function (e, t) {
    if (E(e)) return E(t) ? (t.longitude = e.longitude, t.latitude = e.latitude, t.height = e.height, t) : new p(e.longitude, e.latitude, e.height);
  }, p.equals = function (e, t) {
    return e === t || E(e) && E(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height;
  }, p.equalsEpsilon = function (e, t, r) {
    return e === t || E(e) && E(t) && Math.abs(e.longitude - t.longitude) <= r && Math.abs(e.latitude - t.latitude) <= r && Math.abs(e.height - t.height) <= r;
  }, p.ZERO = t(new p(0, 0, 0)), p.prototype.clone = function (e) {
    return p.clone(this, e);
  }, p.prototype.equals = function (e) {
    return p.equals(this, e);
  }, p.prototype.equalsEpsilon = function (e, t) {
    return p.equalsEpsilon(this, e, t);
  }, p.prototype.toString = function () {
    return "(" + this.longitude + ", " + this.latitude + ", " + this.height + ")";
  }, p;
}), define("Core/GeometryOffsetAttribute", ["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    NONE: 0,
    TOP: 1,
    ALL: 2
  });
}), define("Core/GeometryType", ["./freezeObject"], function (e) {
  "use strict";

  return e({
    NONE: 0,
    TRIANGLES: 1,
    LINES: 2,
    POLYLINES: 3
  });
}), define("Core/Matrix2", ["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject"], function (r, e, o, i, t, n) {
  "use strict";

  function a(e, t, r, n) {
    this[0] = o(e, 0), this[1] = o(r, 0), this[2] = o(t, 0), this[3] = o(n, 0);
  }

  a.packedLength = 4, a.pack = function (e, t, r) {
    return r = o(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t;
  }, a.unpack = function (e, t, r) {
    return t = o(t, 0), i(r) || (r = new a()), r[0] = e[t++], r[1] = e[t++], r[2] = e[t++], r[3] = e[t++], r;
  }, a.clone = function (e, t) {
    if (i(e)) return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : new a(e[0], e[2], e[1], e[3]);
  }, a.fromArray = function (e, t, r) {
    return t = o(t, 0), i(r) || (r = new a()), r[0] = e[t], r[1] = e[t + 1], r[2] = e[t + 2], r[3] = e[t + 3], r;
  }, a.fromColumnMajorArray = function (e, t) {
    return a.clone(e, t);
  }, a.fromRowMajorArray = function (e, t) {
    return i(t) ? (t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t) : new a(e[0], e[1], e[2], e[3]);
  }, a.fromScale = function (e, t) {
    return i(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = e.y, t) : new a(e.x, 0, 0, e.y);
  }, a.fromUniformScale = function (e, t) {
    return i(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = e, t) : new a(e, 0, 0, e);
  }, a.fromRotation = function (e, t) {
    var r = Math.cos(e),
        n = Math.sin(e);
    return i(t) ? (t[0] = r, t[1] = n, t[2] = -n, t[3] = r, t) : new a(r, -n, n, r);
  }, a.toArray = function (e, t) {
    return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : [e[0], e[1], e[2], e[3]];
  }, a.getElementIndex = function (e, t) {
    return 2 * e + t;
  }, a.getColumn = function (e, t, r) {
    var n = 2 * t,
        o = e[n],
        i = e[1 + n];
    return r.x = o, r.y = i, r;
  }, a.setColumn = function (e, t, r, n) {
    var o = 2 * t;
    return (n = a.clone(e, n))[o] = r.x, n[1 + o] = r.y, n;
  }, a.getRow = function (e, t, r) {
    var n = e[t],
        o = e[t + 2];
    return r.x = n, r.y = o, r;
  }, a.setRow = function (e, t, r, n) {
    return (n = a.clone(e, n))[t] = r.x, n[t + 2] = r.y, n;
  };
  var u = new r();

  a.getScale = function (e, t) {
    return t.x = r.magnitude(r.fromElements(e[0], e[1], u)), t.y = r.magnitude(r.fromElements(e[2], e[3], u)), t;
  };

  var s = new r();
  return a.getMaximumScale = function (e) {
    return a.getScale(e, s), r.maximumComponent(s);
  }, a.multiply = function (e, t, r) {
    var n = e[0] * t[0] + e[2] * t[1],
        o = e[0] * t[2] + e[2] * t[3],
        i = e[1] * t[0] + e[3] * t[1],
        a = e[1] * t[2] + e[3] * t[3];
    return r[0] = n, r[1] = i, r[2] = o, r[3] = a, r;
  }, a.add = function (e, t, r) {
    return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r;
  }, a.subtract = function (e, t, r) {
    return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r;
  }, a.multiplyByVector = function (e, t, r) {
    var n = e[0] * t.x + e[2] * t.y,
        o = e[1] * t.x + e[3] * t.y;
    return r.x = n, r.y = o, r;
  }, a.multiplyByScalar = function (e, t, r) {
    return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r;
  }, a.multiplyByScale = function (e, t, r) {
    return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.y, r[3] = e[3] * t.y, r;
  }, a.negate = function (e, t) {
    return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t;
  }, a.transpose = function (e, t) {
    var r = e[0],
        n = e[2],
        o = e[1],
        i = e[3];
    return t[0] = r, t[1] = n, t[2] = o, t[3] = i, t;
  }, a.abs = function (e, t) {
    return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t;
  }, a.equals = function (e, t) {
    return e === t || i(e) && i(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
  }, a.equalsArray = function (e, t, r) {
    return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3];
  }, a.equalsEpsilon = function (e, t, r) {
    return e === t || i(e) && i(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r;
  }, a.IDENTITY = n(new a(1, 0, 0, 1)), a.ZERO = n(new a(0, 0, 0, 0)), a.COLUMN0ROW0 = 0, a.COLUMN0ROW1 = 1, a.COLUMN1ROW0 = 2, a.COLUMN1ROW1 = 3, t(a.prototype, {
    length: {
      get: function get() {
        return a.packedLength;
      }
    }
  }), a.prototype.clone = function (e) {
    return a.clone(this, e);
  }, a.prototype.equals = function (e) {
    return a.equals(this, e);
  }, a.prototype.equalsEpsilon = function (e, t) {
    return a.equalsEpsilon(this, e, t);
  }, a.prototype.toString = function () {
    return "(" + this[0] + ", " + this[2] + ")\n(" + this[1] + ", " + this[3] + ")";
  }, a;
}), define("Core/Matrix3", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function (r, e, c, A, t, n, o, E) {
  "use strict";

  function S(e, t, r, n, o, i, a, u, s) {
    this[0] = c(e, 0), this[1] = c(n, 0), this[2] = c(a, 0), this[3] = c(t, 0), this[4] = c(o, 0), this[5] = c(u, 0), this[6] = c(r, 0), this[7] = c(i, 0), this[8] = c(s, 0);
  }

  S.packedLength = 9, S.pack = function (e, t, r) {
    return r = c(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t[r++] = e[4], t[r++] = e[5], t[r++] = e[6], t[r++] = e[7], t[r++] = e[8], t;
  }, S.unpack = function (e, t, r) {
    return t = c(t, 0), A(r) || (r = new S()), r[0] = e[t++], r[1] = e[t++], r[2] = e[t++], r[3] = e[t++], r[4] = e[t++], r[5] = e[t++], r[6] = e[t++], r[7] = e[t++], r[8] = e[t++], r;
  }, S.clone = function (e, t) {
    if (A(e)) return A(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new S(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]);
  }, S.fromArray = function (e, t, r) {
    return t = c(t, 0), A(r) || (r = new S()), r[0] = e[t], r[1] = e[t + 1], r[2] = e[t + 2], r[3] = e[t + 3], r[4] = e[t + 4], r[5] = e[t + 5], r[6] = e[t + 6], r[7] = e[t + 7], r[8] = e[t + 8], r;
  }, S.fromColumnMajorArray = function (e, t) {
    return S.clone(e, t);
  }, S.fromRowMajorArray = function (e, t) {
    return A(t) ? (t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t) : new S(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
  }, S.fromQuaternion = function (e, t) {
    var r = e.x * e.x,
        n = e.x * e.y,
        o = e.x * e.z,
        i = e.x * e.w,
        a = e.y * e.y,
        u = e.y * e.z,
        s = e.y * e.w,
        c = e.z * e.z,
        l = e.z * e.w,
        f = e.w * e.w,
        h = r - a - c + f,
        E = 2 * (n - l),
        d = 2 * (o + s),
        m = 2 * (n + l),
        p = a - r - c + f,
        _ = 2 * (u - i),
        R = 2 * (o - s),
        y = 2 * (u + i),
        T = -r - a + c + f;

    return A(t) ? (t[0] = h, t[1] = m, t[2] = R, t[3] = E, t[4] = p, t[5] = y, t[6] = d, t[7] = _, t[8] = T, t) : new S(h, E, d, m, p, _, R, y, T);
  }, S.fromHeadingPitchRoll = function (e, t) {
    var r = Math.cos(-e.pitch),
        n = Math.cos(-e.heading),
        o = Math.cos(e.roll),
        i = Math.sin(-e.pitch),
        a = Math.sin(-e.heading),
        u = Math.sin(e.roll),
        s = r * n,
        c = -o * a + u * i * n,
        l = u * a + o * i * n,
        f = r * a,
        h = o * n + u * i * a,
        E = -u * n + o * i * a,
        d = -i,
        m = u * r,
        p = o * r;
    return A(t) ? (t[0] = s, t[1] = f, t[2] = d, t[3] = c, t[4] = h, t[5] = m, t[6] = l, t[7] = E, t[8] = p, t) : new S(s, c, l, f, h, E, d, m, p);
  }, S.fromScale = function (e, t) {
    return A(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e.y, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e.z, t) : new S(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z);
  }, S.fromUniformScale = function (e, t) {
    return A(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e, t) : new S(e, 0, 0, 0, e, 0, 0, 0, e);
  }, S.fromCrossProduct = function (e, t) {
    return A(t) ? (t[0] = 0, t[1] = e.z, t[2] = -e.y, t[3] = -e.z, t[4] = 0, t[5] = e.x, t[6] = e.y, t[7] = -e.x, t[8] = 0, t) : new S(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0);
  }, S.fromRotationX = function (e, t) {
    var r = Math.cos(e),
        n = Math.sin(e);
    return A(t) ? (t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = r, t[5] = n, t[6] = 0, t[7] = -n, t[8] = r, t) : new S(1, 0, 0, 0, r, -n, 0, n, r);
  }, S.fromRotationY = function (e, t) {
    var r = Math.cos(e),
        n = Math.sin(e);
    return A(t) ? (t[0] = r, t[1] = 0, t[2] = -n, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = n, t[7] = 0, t[8] = r, t) : new S(r, 0, n, 0, 1, 0, -n, 0, r);
  }, S.fromRotationZ = function (e, t) {
    var r = Math.cos(e),
        n = Math.sin(e);
    return A(t) ? (t[0] = r, t[1] = n, t[2] = 0, t[3] = -n, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new S(r, -n, 0, n, r, 0, 0, 0, 1);
  }, S.toArray = function (e, t) {
    return A(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]];
  }, S.getElementIndex = function (e, t) {
    return 3 * e + t;
  }, S.getColumn = function (e, t, r) {
    var n = 3 * t,
        o = e[n],
        i = e[1 + n],
        a = e[2 + n];
    return r.x = o, r.y = i, r.z = a, r;
  }, S.setColumn = function (e, t, r, n) {
    var o = 3 * t;
    return (n = S.clone(e, n))[o] = r.x, n[1 + o] = r.y, n[2 + o] = r.z, n;
  }, S.getRow = function (e, t, r) {
    var n = e[t],
        o = e[t + 3],
        i = e[t + 6];
    return r.x = n, r.y = o, r.z = i, r;
  }, S.setRow = function (e, t, r, n) {
    return (n = S.clone(e, n))[t] = r.x, n[t + 3] = r.y, n[t + 6] = r.z, n;
  };
  var i = new r();

  S.getScale = function (e, t) {
    return t.x = r.magnitude(r.fromElements(e[0], e[1], e[2], i)), t.y = r.magnitude(r.fromElements(e[3], e[4], e[5], i)), t.z = r.magnitude(r.fromElements(e[6], e[7], e[8], i)), t;
  };

  var a = new r();
  S.getMaximumScale = function (e) {
    return S.getScale(e, a), r.maximumComponent(a);
  }, S.multiply = function (e, t, r) {
    var n = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
        o = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
        i = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
        a = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
        u = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
        s = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
        c = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
        l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
        f = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
    return r[0] = n, r[1] = o, r[2] = i, r[3] = a, r[4] = u, r[5] = s, r[6] = c, r[7] = l, r[8] = f, r;
  }, S.add = function (e, t, r) {
    return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r;
  }, S.subtract = function (e, t, r) {
    return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r;
  }, S.multiplyByVector = function (e, t, r) {
    var n = t.x,
        o = t.y,
        i = t.z,
        a = e[0] * n + e[3] * o + e[6] * i,
        u = e[1] * n + e[4] * o + e[7] * i,
        s = e[2] * n + e[5] * o + e[8] * i;
    return r.x = a, r.y = u, r.z = s, r;
  }, S.multiplyByScalar = function (e, t, r) {
    return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r;
  }, S.multiplyByScale = function (e, t, r) {
    return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.x, r[3] = e[3] * t.y, r[4] = e[4] * t.y, r[5] = e[5] * t.y, r[6] = e[6] * t.z, r[7] = e[7] * t.z, r[8] = e[8] * t.z, r;
  }, S.negate = function (e, t) {
    return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t;
  }, S.transpose = function (e, t) {
    var r = e[0],
        n = e[3],
        o = e[6],
        i = e[1],
        a = e[4],
        u = e[7],
        s = e[2],
        c = e[5],
        l = e[8];
    return t[0] = r, t[1] = n, t[2] = o, t[3] = i, t[4] = a, t[5] = u, t[6] = s, t[7] = c, t[8] = l, t;
  };
  var d = [1, 0, 0],
      m = [2, 2, 1],
      s = new S(),
      l = new S();
  return S.computeEigenDecomposition = function (e, t) {
    var r = E.EPSILON20,
        n = 0,
        o = 0;
    A(t) || (t = {});

    for (var i = t.unitary = S.clone(S.IDENTITY, t.unitary), a = t.diagonal = S.clone(e, t.diagonal), u = r * function (e) {
      for (var t = 0, r = 0; r < 9; ++r) {
        var n = e[r];
        t += n * n;
      }

      return Math.sqrt(t);
    }(a); o < 10 && function (e) {
      for (var t = 0, r = 0; r < 3; ++r) {
        var n = e[S.getElementIndex(m[r], d[r])];
        t += 2 * n * n;
      }

      return Math.sqrt(t);
    }(a) > u;) {
      (function (e, t) {
        for (var r = E.EPSILON15, n = 0, o = 1, i = 0; i < 3; ++i) {
          var a = Math.abs(e[S.getElementIndex(m[i], d[i])]);
          n < a && (o = i, n = a);
        }

        var u,
            s,
            c = 1,
            l = 0,
            f = d[o],
            h = m[o];
        Math.abs(e[S.getElementIndex(h, f)]) > r && (l = (s = (u = (e[S.getElementIndex(h, h)] - e[S.getElementIndex(f, f)]) / 2 / e[S.getElementIndex(h, f)]) < 0 ? -1 / (-u + Math.sqrt(1 + u * u)) : 1 / (u + Math.sqrt(1 + u * u))) * (c = 1 / Math.sqrt(1 + s * s))), (t = S.clone(S.IDENTITY, t))[S.getElementIndex(f, f)] = t[S.getElementIndex(h, h)] = c, t[S.getElementIndex(h, f)] = l, t[S.getElementIndex(f, h)] = -l;
      })(a, s), S.transpose(s, l), S.multiply(a, s, a), S.multiply(l, a, a), S.multiply(i, s, i), 2 < ++n && (++o, n = 0);
    }

    return t;
  }, S.abs = function (e, t) {
    return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t;
  }, S.determinant = function (e) {
    var t = e[0],
        r = e[3],
        n = e[6],
        o = e[1],
        i = e[4],
        a = e[7],
        u = e[2],
        s = e[5],
        c = e[8];
    return t * (i * c - s * a) + o * (s * n - r * c) + u * (r * a - i * n);
  }, S.inverse = function (e, t) {
    var r = e[0],
        n = e[1],
        o = e[2],
        i = e[3],
        a = e[4],
        u = e[5],
        s = e[6],
        c = e[7],
        l = e[8],
        f = S.determinant(e);
    return t[0] = a * l - c * u, t[1] = c * o - n * l, t[2] = n * u - a * o, t[3] = s * u - i * l, t[4] = r * l - s * o, t[5] = i * o - r * u, t[6] = i * c - s * a, t[7] = s * n - r * c, t[8] = r * a - i * n, S.multiplyByScalar(t, 1 / f, t);
  }, S.equals = function (e, t) {
    return e === t || A(e) && A(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
  }, S.equalsEpsilon = function (e, t, r) {
    return e === t || A(e) && A(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r;
  }, S.IDENTITY = o(new S(1, 0, 0, 0, 1, 0, 0, 0, 1)), S.ZERO = o(new S(0, 0, 0, 0, 0, 0, 0, 0, 0)), S.COLUMN0ROW0 = 0, S.COLUMN0ROW1 = 1, S.COLUMN0ROW2 = 2, S.COLUMN1ROW0 = 3, S.COLUMN1ROW1 = 4, S.COLUMN1ROW2 = 5, S.COLUMN2ROW0 = 6, S.COLUMN2ROW1 = 7, S.COLUMN2ROW2 = 8, t(S.prototype, {
    length: {
      get: function get() {
        return S.packedLength;
      }
    }
  }), S.prototype.clone = function (e) {
    return S.clone(this, e);
  }, S.prototype.equals = function (e) {
    return S.equals(this, e);
  }, S.equalsArray = function (e, t, r) {
    return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8];
  }, S.prototype.equalsEpsilon = function (e, t) {
    return S.equalsEpsilon(this, e, t);
  }, S.prototype.toString = function () {
    return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")";
  }, S;
}), define("Core/Cartesian4", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, o, i, t, r, a) {
  "use strict";

  function u(e, t, r, n) {
    this.x = o(e, 0), this.y = o(t, 0), this.z = o(r, 0), this.w = o(n, 0);
  }

  u.fromElements = function (e, t, r, n, o) {
    return i(o) ? (o.x = e, o.y = t, o.z = r, o.w = n, o) : new u(e, t, r, n);
  }, u.fromColor = function (e, t) {
    return i(t) ? (t.x = e.red, t.y = e.green, t.z = e.blue, t.w = e.alpha, t) : new u(e.red, e.green, e.blue, e.alpha);
  }, u.clone = function (e, t) {
    if (i(e)) return i(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new u(e.x, e.y, e.z, e.w);
  }, u.packedLength = 4, u.pack = function (e, t, r) {
    return r = o(r, 0), t[r++] = e.x, t[r++] = e.y, t[r++] = e.z, t[r] = e.w, t;
  }, u.unpack = function (e, t, r) {
    return t = o(t, 0), i(r) || (r = new u()), r.x = e[t++], r.y = e[t++], r.z = e[t++], r.w = e[t], r;
  }, u.packArray = function (e, t) {
    var r = e.length;
    i(t) ? t.length = 4 * r : t = new Array(4 * r);

    for (var n = 0; n < r; ++n) {
      u.pack(e[n], t, 4 * n);
    }

    return t;
  }, u.unpackArray = function (e, t) {
    var r = e.length;
    i(t) ? t.length = r / 4 : t = new Array(r / 4);

    for (var n = 0; n < r; n += 4) {
      var o = n / 4;
      t[o] = u.unpack(e, n, t[o]);
    }

    return t;
  }, u.fromArray = u.unpack, u.maximumComponent = function (e) {
    return Math.max(e.x, e.y, e.z, e.w);
  }, u.minimumComponent = function (e) {
    return Math.min(e.x, e.y, e.z, e.w);
  }, u.minimumByComponent = function (e, t, r) {
    return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r.z = Math.min(e.z, t.z), r.w = Math.min(e.w, t.w), r;
  }, u.maximumByComponent = function (e, t, r) {
    return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r.z = Math.max(e.z, t.z), r.w = Math.max(e.w, t.w), r;
  }, u.magnitudeSquared = function (e) {
    return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
  }, u.magnitude = function (e) {
    return Math.sqrt(u.magnitudeSquared(e));
  };
  var n = new u();
  u.distance = function (e, t) {
    return u.subtract(e, t, n), u.magnitude(n);
  }, u.distanceSquared = function (e, t) {
    return u.subtract(e, t, n), u.magnitudeSquared(n);
  }, u.normalize = function (e, t) {
    var r = u.magnitude(e);
    return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t.w = e.w / r, t;
  }, u.dot = function (e, t) {
    return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
  }, u.multiplyComponents = function (e, t, r) {
    return r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z, r.w = e.w * t.w, r;
  }, u.divideComponents = function (e, t, r) {
    return r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z, r.w = e.w / t.w, r;
  }, u.add = function (e, t, r) {
    return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r.w = e.w + t.w, r;
  }, u.subtract = function (e, t, r) {
    return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r.w = e.w - t.w, r;
  }, u.multiplyByScalar = function (e, t, r) {
    return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
  }, u.divideByScalar = function (e, t, r) {
    return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
  }, u.negate = function (e, t) {
    return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
  }, u.abs = function (e, t) {
    return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t.w = Math.abs(e.w), t;
  };
  var s = new u();

  u.lerp = function (e, t, r, n) {
    return u.multiplyByScalar(t, r, s), n = u.multiplyByScalar(e, 1 - r, n), u.add(s, n, n);
  };

  var c = new u();
  u.mostOrthogonalAxis = function (e, t) {
    var r = u.normalize(e, c);
    return u.abs(r, r), r.x <= r.y ? r.x <= r.z ? r.x <= r.w ? u.clone(u.UNIT_X, t) : u.clone(u.UNIT_W, t) : r.z <= r.w ? u.clone(u.UNIT_Z, t) : u.clone(u.UNIT_W, t) : r.y <= r.z ? r.y <= r.w ? u.clone(u.UNIT_Y, t) : u.clone(u.UNIT_W, t) : r.z <= r.w ? u.clone(u.UNIT_Z, t) : u.clone(u.UNIT_W, t);
  }, u.equals = function (e, t) {
    return e === t || i(e) && i(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
  }, u.equalsArray = function (e, t, r) {
    return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2] && e.w === t[r + 3];
  }, u.equalsEpsilon = function (e, t, r, n) {
    return e === t || i(e) && i(t) && a.equalsEpsilon(e.x, t.x, r, n) && a.equalsEpsilon(e.y, t.y, r, n) && a.equalsEpsilon(e.z, t.z, r, n) && a.equalsEpsilon(e.w, t.w, r, n);
  }, u.ZERO = r(new u(0, 0, 0, 0)), u.UNIT_X = r(new u(1, 0, 0, 0)), u.UNIT_Y = r(new u(0, 1, 0, 0)), u.UNIT_Z = r(new u(0, 0, 1, 0)), u.UNIT_W = r(new u(0, 0, 0, 1)), u.prototype.clone = function (e) {
    return u.clone(this, e);
  }, u.prototype.equals = function (e) {
    return u.equals(this, e);
  }, u.prototype.equalsEpsilon = function (e, t, r) {
    return u.equalsEpsilon(this, e, t, r);
  }, u.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
  };
  var l = new Float32Array(1);
  return u.packFloat = function (e, t) {
    if (i(t) || (t = new u()), l[0] = e, 0 === (e = l[0])) return u.clone(u.ZERO, t);
    var r,
        n = e < 0 ? 1 : 0;
    isFinite(e) ? (e = Math.abs(e), r = Math.floor(a.logBase(e, 10)) + 1, e /= Math.pow(10, r)) : (e = .1, r = 38);
    var o = 256 * e;
    return t.x = Math.floor(o), o = 256 * (o - t.x), t.y = Math.floor(o), o = 256 * (o - t.y), t.z = Math.floor(o), t.w = 2 * (r + 38) + n, t;
  }, u.unpackFloat = function (e) {
    var t = e.w / 2,
        r = Math.floor(t),
        n = -(n = 2 * (n = 2 * (t - r)) - 1);
    if (38 <= (r -= 38)) return n < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    var o = n * e.x * (1 / 256);
    return o += n * e.y * (1 / 65536), (o += n * e.z * (1 / 16777216)) * Math.pow(10, r);
  }, u;
}), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (T, k, e, p, N, t, r, j, K, Z) {
  "use strict";

  function Q(e, t, r, n, o, i, a, u, s, c, l, f, h, E, d, m) {
    this[0] = p(e, 0), this[1] = p(o, 0), this[2] = p(s, 0), this[3] = p(h, 0), this[4] = p(t, 0), this[5] = p(i, 0), this[6] = p(c, 0), this[7] = p(E, 0), this[8] = p(r, 0), this[9] = p(a, 0), this[10] = p(l, 0), this[11] = p(d, 0), this[12] = p(n, 0), this[13] = p(u, 0), this[14] = p(f, 0), this[15] = p(m, 0);
  }

  Q.packedLength = 16, Q.pack = function (e, t, r) {
    return r = p(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t[r++] = e[4], t[r++] = e[5], t[r++] = e[6], t[r++] = e[7], t[r++] = e[8], t[r++] = e[9], t[r++] = e[10], t[r++] = e[11], t[r++] = e[12], t[r++] = e[13], t[r++] = e[14], t[r] = e[15], t;
  }, Q.unpack = function (e, t, r) {
    return t = p(t, 0), N(r) || (r = new Q()), r[0] = e[t++], r[1] = e[t++], r[2] = e[t++], r[3] = e[t++], r[4] = e[t++], r[5] = e[t++], r[6] = e[t++], r[7] = e[t++], r[8] = e[t++], r[9] = e[t++], r[10] = e[t++], r[11] = e[t++], r[12] = e[t++], r[13] = e[t++], r[14] = e[t++], r[15] = e[t], r;
  }, Q.clone = function (e, t) {
    if (N(e)) return N(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : new Q(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]);
  }, Q.fromArray = Q.unpack, Q.fromColumnMajorArray = function (e, t) {
    return Q.clone(e, t);
  }, Q.fromRowMajorArray = function (e, t) {
    return N(t) ? (t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t) : new Q(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
  }, Q.fromRotationTranslation = function (e, t, r) {
    return t = p(t, T.ZERO), N(r) ? (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = 0, r[4] = e[3], r[5] = e[4], r[6] = e[5], r[7] = 0, r[8] = e[6], r[9] = e[7], r[10] = e[8], r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, r) : new Q(e[0], e[3], e[6], t.x, e[1], e[4], e[7], t.y, e[2], e[5], e[8], t.z, 0, 0, 0, 1);
  }, Q.fromTranslationQuaternionRotationScale = function (e, t, r, n) {
    N(n) || (n = new Q());

    var o = r.x,
        i = r.y,
        a = r.z,
        u = t.x * t.x,
        s = t.x * t.y,
        c = t.x * t.z,
        l = t.x * t.w,
        f = t.y * t.y,
        h = t.y * t.z,
        E = t.y * t.w,
        d = t.z * t.z,
        m = t.z * t.w,
        p = t.w * t.w,
        _ = u - f - d + p,
        R = 2 * (s - m),
        y = 2 * (c + E),
        T = 2 * (s + m),
        A = f - u - d + p,
        S = 2 * (h - l),
        C = 2 * (c - E),
        g = 2 * (h + l),
        O = -u - f + d + p;

    return n[0] = _ * o, n[1] = T * o, n[2] = C * o, n[3] = 0, n[4] = R * i, n[5] = A * i, n[6] = g * i, n[7] = 0, n[8] = y * a, n[9] = S * a, n[10] = O * a, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, n;
  }, Q.fromTranslationRotationScale = function (e, t) {
    return Q.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t);
  }, Q.fromTranslation = function (e, t) {
    return Q.fromRotationTranslation(K.IDENTITY, e, t);
  }, Q.fromScale = function (e, t) {
    return N(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e.y, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e.z, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new Q(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1);
  }, Q.fromUniformScale = function (e, t) {
    return N(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new Q(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
  };
  var A = new T(),
      S = new T(),
      C = new T();
  Q.fromCamera = function (e, t) {
    var r = e.position,
        n = e.direction,
        o = e.up;
    T.normalize(n, A), T.normalize(T.cross(A, o, S), S), T.normalize(T.cross(S, A, C), C);

    var i = S.x,
        a = S.y,
        u = S.z,
        s = A.x,
        c = A.y,
        l = A.z,
        f = C.x,
        h = C.y,
        E = C.z,
        d = r.x,
        m = r.y,
        p = r.z,
        _ = i * -d + a * -m + u * -p,
        R = f * -d + h * -m + E * -p,
        y = s * d + c * m + l * p;

    return N(t) ? (t[0] = i, t[1] = f, t[2] = -s, t[3] = 0, t[4] = a, t[5] = h, t[6] = -c, t[7] = 0, t[8] = u, t[9] = E, t[10] = -l, t[11] = 0, t[12] = _, t[13] = R, t[14] = y, t[15] = 1, t) : new Q(i, a, u, _, f, h, E, R, -s, -c, -l, y, 0, 0, 0, 1);
  }, Q.computePerspectiveFieldOfView = function (e, t, r, n, o) {
    var i = 1 / Math.tan(.5 * e),
        a = i / t,
        u = (n + r) / (r - n),
        s = 2 * n * r / (r - n);
    return o[0] = a, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = i, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = u, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = s, o[15] = 0, o;
  }, Q.computeOrthographicOffCenter = function (e, t, r, n, o, i, a) {
    var u = 1 / (t - e),
        s = 1 / (n - r),
        c = 1 / (i - o),
        l = -(t + e) * u,
        f = -(n + r) * s,
        h = -(i + o) * c;
    return u *= 2, s *= 2, c *= -2, a[0] = u, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = c, a[11] = 0, a[12] = l, a[13] = f, a[14] = h, a[15] = 1, a;
  }, Q.computePerspectiveOffCenter = function (e, t, r, n, o, i, a) {
    var u = 2 * o / (t - e),
        s = 2 * o / (n - r),
        c = (t + e) / (t - e),
        l = (n + r) / (n - r),
        f = -(i + o) / (i - o),
        h = -2 * i * o / (i - o);
    return a[0] = u, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = c, a[9] = l, a[10] = f, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = h, a[15] = 0, a;
  }, Q.computeInfinitePerspectiveOffCenter = function (e, t, r, n, o, i) {
    var a = 2 * o / (t - e),
        u = 2 * o / (n - r),
        s = (t + e) / (t - e),
        c = (n + r) / (n - r),
        l = -2 * o;
    return i[0] = a, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = u, i[6] = 0, i[7] = 0, i[8] = s, i[9] = c, i[10] = -1, i[11] = -1, i[12] = 0, i[13] = 0, i[14] = l, i[15] = 0, i;
  }, Q.computeViewportTransformation = function (e, t, r, n) {
    e = p(e, p.EMPTY_OBJECT);
    var o = p(e.x, 0),
        i = p(e.y, 0),
        a = p(e.width, 0),
        u = p(e.height, 0);
    t = p(t, 0);
    var s = .5 * a,
        c = .5 * u,
        l = .5 * ((r = p(r, 1)) - t),
        f = c,
        h = l,
        E = o + s,
        d = i + c,
        m = t + l;
    return n[0] = s, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = f, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = h, n[11] = 0, n[12] = E, n[13] = d, n[14] = m, n[15] = 1, n;
  }, Q.computeView = function (e, t, r, n, o) {
    return o[0] = n.x, o[1] = r.x, o[2] = -t.x, o[3] = 0, o[4] = n.y, o[5] = r.y, o[6] = -t.y, o[7] = 0, o[8] = n.z, o[9] = r.z, o[10] = -t.z, o[11] = 0, o[12] = -T.dot(n, e), o[13] = -T.dot(r, e), o[14] = T.dot(t, e), o[15] = 1, o;
  }, Q.toArray = function (e, t) {
    return N(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]];
  }, Q.getElementIndex = function (e, t) {
    return 4 * e + t;
  }, Q.getColumn = function (e, t, r) {
    var n = 4 * t,
        o = e[n],
        i = e[1 + n],
        a = e[2 + n],
        u = e[3 + n];
    return r.x = o, r.y = i, r.z = a, r.w = u, r;
  }, Q.setColumn = function (e, t, r, n) {
    var o = 4 * t;
    return (n = Q.clone(e, n))[o] = r.x, n[1 + o] = r.y, n[2 + o] = r.z, n[3 + o] = r.w, n;
  }, Q.setTranslation = function (e, t, r) {
    return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = e[15], r;
  };
  var i = new T();
  Q.setScale = function (e, t, r) {
    var n = Q.getScale(e, i),
        o = T.divideComponents(t, n, i);
    return Q.multiplyByScale(e, o, r);
  }, Q.getRow = function (e, t, r) {
    var n = e[t],
        o = e[t + 4],
        i = e[t + 8],
        a = e[t + 12];
    return r.x = n, r.y = o, r.z = i, r.w = a, r;
  }, Q.setRow = function (e, t, r, n) {
    return (n = Q.clone(e, n))[t] = r.x, n[t + 4] = r.y, n[t + 8] = r.z, n[t + 12] = r.w, n;
  };
  var n = new T();

  Q.getScale = function (e, t) {
    return t.x = T.magnitude(T.fromElements(e[0], e[1], e[2], n)), t.y = T.magnitude(T.fromElements(e[4], e[5], e[6], n)), t.z = T.magnitude(T.fromElements(e[8], e[9], e[10], n)), t;
  };

  var o = new T();
  Q.getMaximumScale = function (e) {
    return Q.getScale(e, o), T.maximumComponent(o);
  }, Q.multiply = function (e, t, r) {
    var n = e[0],
        o = e[1],
        i = e[2],
        a = e[3],
        u = e[4],
        s = e[5],
        c = e[6],
        l = e[7],
        f = e[8],
        h = e[9],
        E = e[10],
        d = e[11],
        m = e[12],
        p = e[13],
        _ = e[14],
        R = e[15],
        y = t[0],
        T = t[1],
        A = t[2],
        S = t[3],
        C = t[4],
        g = t[5],
        O = t[6],
        N = t[7],
        I = t[8],
        M = t[9],
        v = t[10],
        w = t[11],
        D = t[12],
        P = t[13],
        F = t[14],
        U = t[15],
        L = n * y + u * T + f * A + m * S,
        x = o * y + s * T + h * A + p * S,
        B = i * y + c * T + E * A + _ * S,
        b = a * y + l * T + d * A + R * S,
        q = n * C + u * g + f * O + m * N,
        z = o * C + s * g + h * O + p * N,
        G = i * C + c * g + E * O + _ * N,
        H = a * C + l * g + d * O + R * N,
        V = n * I + u * M + f * v + m * w,
        W = o * I + s * M + h * v + p * w,
        X = i * I + c * M + E * v + _ * w,
        Y = a * I + l * M + d * v + R * w,
        k = n * D + u * P + f * F + m * U,
        j = o * D + s * P + h * F + p * U,
        K = i * D + c * P + E * F + _ * U,
        Z = a * D + l * P + d * F + R * U;
    return r[0] = L, r[1] = x, r[2] = B, r[3] = b, r[4] = q, r[5] = z, r[6] = G, r[7] = H, r[8] = V, r[9] = W, r[10] = X, r[11] = Y, r[12] = k, r[13] = j, r[14] = K, r[15] = Z, r;
  }, Q.add = function (e, t, r) {
    return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r[9] = e[9] + t[9], r[10] = e[10] + t[10], r[11] = e[11] + t[11], r[12] = e[12] + t[12], r[13] = e[13] + t[13], r[14] = e[14] + t[14], r[15] = e[15] + t[15], r;
  }, Q.subtract = function (e, t, r) {
    return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r[9] = e[9] - t[9], r[10] = e[10] - t[10], r[11] = e[11] - t[11], r[12] = e[12] - t[12], r[13] = e[13] - t[13], r[14] = e[14] - t[14], r[15] = e[15] - t[15], r;
  }, Q.multiplyTransformation = function (e, t, r) {
    var n = e[0],
        o = e[1],
        i = e[2],
        a = e[4],
        u = e[5],
        s = e[6],
        c = e[8],
        l = e[9],
        f = e[10],
        h = e[12],
        E = e[13],
        d = e[14],
        m = t[0],
        p = t[1],
        _ = t[2],
        R = t[4],
        y = t[5],
        T = t[6],
        A = t[8],
        S = t[9],
        C = t[10],
        g = t[12],
        O = t[13],
        N = t[14],
        I = n * m + a * p + c * _,
        M = o * m + u * p + l * _,
        v = i * m + s * p + f * _,
        w = n * R + a * y + c * T,
        D = o * R + u * y + l * T,
        P = i * R + s * y + f * T,
        F = n * A + a * S + c * C,
        U = o * A + u * S + l * C,
        L = i * A + s * S + f * C,
        x = n * g + a * O + c * N + h,
        B = o * g + u * O + l * N + E,
        b = i * g + s * O + f * N + d;
    return r[0] = I, r[1] = M, r[2] = v, r[3] = 0, r[4] = w, r[5] = D, r[6] = P, r[7] = 0, r[8] = F, r[9] = U, r[10] = L, r[11] = 0, r[12] = x, r[13] = B, r[14] = b, r[15] = 1, r;
  }, Q.multiplyByMatrix3 = function (e, t, r) {
    var n = e[0],
        o = e[1],
        i = e[2],
        a = e[4],
        u = e[5],
        s = e[6],
        c = e[8],
        l = e[9],
        f = e[10],
        h = t[0],
        E = t[1],
        d = t[2],
        m = t[3],
        p = t[4],
        _ = t[5],
        R = t[6],
        y = t[7],
        T = t[8],
        A = n * h + a * E + c * d,
        S = o * h + u * E + l * d,
        C = i * h + s * E + f * d,
        g = n * m + a * p + c * _,
        O = o * m + u * p + l * _,
        N = i * m + s * p + f * _,
        I = n * R + a * y + c * T,
        M = o * R + u * y + l * T,
        v = i * R + s * y + f * T;
    return r[0] = A, r[1] = S, r[2] = C, r[3] = 0, r[4] = g, r[5] = O, r[6] = N, r[7] = 0, r[8] = I, r[9] = M, r[10] = v, r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15], r;
  }, Q.multiplyByTranslation = function (e, t, r) {
    var n = t.x,
        o = t.y,
        i = t.z,
        a = n * e[0] + o * e[4] + i * e[8] + e[12],
        u = n * e[1] + o * e[5] + i * e[9] + e[13],
        s = n * e[2] + o * e[6] + i * e[10] + e[14];
    return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = a, r[13] = u, r[14] = s, r[15] = e[15], r;
  };
  var a = new T();
  Q.multiplyByUniformScale = function (e, t, r) {
    return a.x = t, a.y = t, a.z = t, Q.multiplyByScale(e, a, r);
  }, Q.multiplyByScale = function (e, t, r) {
    var n = t.x,
        o = t.y,
        i = t.z;
    return 1 === n && 1 === o && 1 === i ? Q.clone(e, r) : (r[0] = n * e[0], r[1] = n * e[1], r[2] = n * e[2], r[3] = 0, r[4] = o * e[4], r[5] = o * e[5], r[6] = o * e[6], r[7] = 0, r[8] = i * e[8], r[9] = i * e[9], r[10] = i * e[10], r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = 1, r);
  }, Q.multiplyByVector = function (e, t, r) {
    var n = t.x,
        o = t.y,
        i = t.z,
        a = t.w,
        u = e[0] * n + e[4] * o + e[8] * i + e[12] * a,
        s = e[1] * n + e[5] * o + e[9] * i + e[13] * a,
        c = e[2] * n + e[6] * o + e[10] * i + e[14] * a,
        l = e[3] * n + e[7] * o + e[11] * i + e[15] * a;
    return r.x = u, r.y = s, r.z = c, r.w = l, r;
  }, Q.multiplyByPointAsVector = function (e, t, r) {
    var n = t.x,
        o = t.y,
        i = t.z,
        a = e[0] * n + e[4] * o + e[8] * i,
        u = e[1] * n + e[5] * o + e[9] * i,
        s = e[2] * n + e[6] * o + e[10] * i;
    return r.x = a, r.y = u, r.z = s, r;
  }, Q.multiplyByPoint = function (e, t, r) {
    var n = t.x,
        o = t.y,
        i = t.z,
        a = e[0] * n + e[4] * o + e[8] * i + e[12],
        u = e[1] * n + e[5] * o + e[9] * i + e[13],
        s = e[2] * n + e[6] * o + e[10] * i + e[14];
    return r.x = a, r.y = u, r.z = s, r;
  }, Q.multiplyByScalar = function (e, t, r) {
    return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r[9] = e[9] * t, r[10] = e[10] * t, r[11] = e[11] * t, r[12] = e[12] * t, r[13] = e[13] * t, r[14] = e[14] * t, r[15] = e[15] * t, r;
  }, Q.negate = function (e, t) {
    return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t;
  }, Q.transpose = function (e, t) {
    var r = e[1],
        n = e[2],
        o = e[3],
        i = e[6],
        a = e[7],
        u = e[11];
    return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = n, t[9] = i, t[10] = e[10], t[11] = e[14], t[12] = o, t[13] = a, t[14] = u, t[15] = e[15], t;
  }, Q.abs = function (e, t) {
    return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t[9] = Math.abs(e[9]), t[10] = Math.abs(e[10]), t[11] = Math.abs(e[11]), t[12] = Math.abs(e[12]), t[13] = Math.abs(e[13]), t[14] = Math.abs(e[14]), t[15] = Math.abs(e[15]), t;
  }, Q.equals = function (e, t) {
    return e === t || N(e) && N(t) && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[3] === t[3] && e[7] === t[7] && e[11] === t[11] && e[15] === t[15];
  }, Q.equalsEpsilon = function (e, t, r) {
    return e === t || N(e) && N(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r && Math.abs(e[9] - t[9]) <= r && Math.abs(e[10] - t[10]) <= r && Math.abs(e[11] - t[11]) <= r && Math.abs(e[12] - t[12]) <= r && Math.abs(e[13] - t[13]) <= r && Math.abs(e[14] - t[14]) <= r && Math.abs(e[15] - t[15]) <= r;
  }, Q.getTranslation = function (e, t) {
    return t.x = e[12], t.y = e[13], t.z = e[14], t;
  }, Q.getRotation = function (e, t) {
    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t;
  };
  var J = new K(),
      $ = new K(),
      ee = new k(),
      te = new k(0, 0, 0, 1);
  return Q.inverse = function (e, t) {
    var r = e[0],
        n = e[4],
        o = e[8],
        i = e[12],
        a = e[1],
        u = e[5],
        s = e[9],
        c = e[13],
        l = e[2],
        f = e[6],
        h = e[10],
        E = e[14],
        d = e[3],
        m = e[7],
        p = e[11],
        _ = e[15],
        R = h * _,
        y = E * p,
        T = f * _,
        A = E * m,
        S = f * p,
        C = h * m,
        g = l * _,
        O = E * d,
        N = l * p,
        I = h * d,
        M = l * m,
        v = f * d,
        w = R * u + A * s + S * c - (y * u + T * s + C * c),
        D = y * a + g * s + I * c - (R * a + O * s + N * c),
        P = T * a + O * u + M * c - (A * a + g * u + v * c),
        F = C * a + N * u + v * s - (S * a + I * u + M * s),
        U = y * n + T * o + C * i - (R * n + A * o + S * i),
        L = R * r + O * o + N * i - (y * r + g * o + I * i),
        x = A * r + g * n + v * i - (T * r + O * n + M * i),
        B = S * r + I * n + M * o - (C * r + N * n + v * o),
        b = (R = o * c) * m + (A = i * u) * p + (S = n * s) * _ - ((y = i * s) * m + (T = n * c) * p + (C = o * u) * _),
        q = y * d + (g = r * c) * p + (I = o * a) * _ - (R * d + (O = i * a) * p + (N = r * s) * _),
        z = T * d + O * m + (M = r * u) * _ - (A * d + g * m + (v = n * a) * _),
        G = C * d + N * m + v * p - (S * d + I * m + M * p),
        H = T * h + C * E + y * f - (S * E + R * f + A * h),
        V = N * E + R * l + O * h - (g * h + I * E + y * l),
        W = g * f + v * E + A * l - (M * E + T * l + O * f),
        X = M * h + S * l + I * f - (N * f + v * h + C * l),
        Y = r * w + n * D + o * P + i * F;

    if (Math.abs(Y) < j.EPSILON21) {
      if (K.equalsEpsilon(Q.getRotation(e, J), $, j.EPSILON7) && k.equals(Q.getRow(e, 3, ee), te)) return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 0, t[11] = 0, t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = 1, t;
      throw new Z("matrix is not invertible because its determinate is zero.");
    }

    return Y = 1 / Y, t[0] = w * Y, t[1] = D * Y, t[2] = P * Y, t[3] = F * Y, t[4] = U * Y, t[5] = L * Y, t[6] = x * Y, t[7] = B * Y, t[8] = b * Y, t[9] = q * Y, t[10] = z * Y, t[11] = G * Y, t[12] = H * Y, t[13] = V * Y, t[14] = W * Y, t[15] = X * Y, t;
  }, Q.inverseTransformation = function (e, t) {
    var r = e[0],
        n = e[1],
        o = e[2],
        i = e[4],
        a = e[5],
        u = e[6],
        s = e[8],
        c = e[9],
        l = e[10],
        f = e[12],
        h = e[13],
        E = e[14],
        d = -r * f - n * h - o * E,
        m = -i * f - a * h - u * E,
        p = -s * f - c * h - l * E;
    return t[0] = r, t[1] = i, t[2] = s, t[3] = 0, t[4] = n, t[5] = a, t[6] = c, t[7] = 0, t[8] = o, t[9] = u, t[10] = l, t[11] = 0, t[12] = d, t[13] = m, t[14] = p, t[15] = 1, t;
  }, Q.IDENTITY = r(new Q(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), Q.ZERO = r(new Q(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)), Q.COLUMN0ROW0 = 0, Q.COLUMN0ROW1 = 1, Q.COLUMN0ROW2 = 2, Q.COLUMN0ROW3 = 3, Q.COLUMN1ROW0 = 4, Q.COLUMN1ROW1 = 5, Q.COLUMN1ROW2 = 6, Q.COLUMN1ROW3 = 7, Q.COLUMN2ROW0 = 8, Q.COLUMN2ROW1 = 9, Q.COLUMN2ROW2 = 10, Q.COLUMN2ROW3 = 11, Q.COLUMN3ROW0 = 12, Q.COLUMN3ROW1 = 13, Q.COLUMN3ROW2 = 14, Q.COLUMN3ROW3 = 15, t(Q.prototype, {
    length: {
      get: function get() {
        return Q.packedLength;
      }
    }
  }), Q.prototype.clone = function (e) {
    return Q.clone(this, e);
  }, Q.prototype.equals = function (e) {
    return Q.equals(this, e);
  }, Q.equalsArray = function (e, t, r) {
    return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8] && e[9] === t[r + 9] && e[10] === t[r + 10] && e[11] === t[r + 11] && e[12] === t[r + 12] && e[13] === t[r + 13] && e[14] === t[r + 14] && e[15] === t[r + 15];
  }, Q.prototype.equalsEpsilon = function (e, t) {
    return Q.equalsEpsilon(this, e, t);
  }, Q.prototype.toString = function () {
    return "(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")";
  }, Q;
}), define("Core/WebGLConstants", ["./freezeObject"], function (e) {
  "use strict";

  return e({
    DEPTH_BUFFER_BIT: 256,
    STENCIL_BUFFER_BIT: 1024,
    COLOR_BUFFER_BIT: 16384,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    ZERO: 0,
    ONE: 1,
    SRC_COLOR: 768,
    ONE_MINUS_SRC_COLOR: 769,
    SRC_ALPHA: 770,
    ONE_MINUS_SRC_ALPHA: 771,
    DST_ALPHA: 772,
    ONE_MINUS_DST_ALPHA: 773,
    DST_COLOR: 774,
    ONE_MINUS_DST_COLOR: 775,
    SRC_ALPHA_SATURATE: 776,
    FUNC_ADD: 32774,
    BLEND_EQUATION: 32777,
    BLEND_EQUATION_RGB: 32777,
    BLEND_EQUATION_ALPHA: 34877,
    FUNC_SUBTRACT: 32778,
    FUNC_REVERSE_SUBTRACT: 32779,
    BLEND_DST_RGB: 32968,
    BLEND_SRC_RGB: 32969,
    BLEND_DST_ALPHA: 32970,
    BLEND_SRC_ALPHA: 32971,
    CONSTANT_COLOR: 32769,
    ONE_MINUS_CONSTANT_COLOR: 32770,
    CONSTANT_ALPHA: 32771,
    ONE_MINUS_CONSTANT_ALPHA: 32772,
    BLEND_COLOR: 32773,
    ARRAY_BUFFER: 34962,
    ELEMENT_ARRAY_BUFFER: 34963,
    ARRAY_BUFFER_BINDING: 34964,
    ELEMENT_ARRAY_BUFFER_BINDING: 34965,
    STREAM_DRAW: 35040,
    STATIC_DRAW: 35044,
    DYNAMIC_DRAW: 35048,
    BUFFER_SIZE: 34660,
    BUFFER_USAGE: 34661,
    CURRENT_VERTEX_ATTRIB: 34342,
    FRONT: 1028,
    BACK: 1029,
    FRONT_AND_BACK: 1032,
    CULL_FACE: 2884,
    BLEND: 3042,
    DITHER: 3024,
    STENCIL_TEST: 2960,
    DEPTH_TEST: 2929,
    SCISSOR_TEST: 3089,
    POLYGON_OFFSET_FILL: 32823,
    SAMPLE_ALPHA_TO_COVERAGE: 32926,
    SAMPLE_COVERAGE: 32928,
    NO_ERROR: 0,
    INVALID_ENUM: 1280,
    INVALID_VALUE: 1281,
    INVALID_OPERATION: 1282,
    OUT_OF_MEMORY: 1285,
    CW: 2304,
    CCW: 2305,
    LINE_WIDTH: 2849,
    ALIASED_POINT_SIZE_RANGE: 33901,
    ALIASED_LINE_WIDTH_RANGE: 33902,
    CULL_FACE_MODE: 2885,
    FRONT_FACE: 2886,
    DEPTH_RANGE: 2928,
    DEPTH_WRITEMASK: 2930,
    DEPTH_CLEAR_VALUE: 2931,
    DEPTH_FUNC: 2932,
    STENCIL_CLEAR_VALUE: 2961,
    STENCIL_FUNC: 2962,
    STENCIL_FAIL: 2964,
    STENCIL_PASS_DEPTH_FAIL: 2965,
    STENCIL_PASS_DEPTH_PASS: 2966,
    STENCIL_REF: 2967,
    STENCIL_VALUE_MASK: 2963,
    STENCIL_WRITEMASK: 2968,
    STENCIL_BACK_FUNC: 34816,
    STENCIL_BACK_FAIL: 34817,
    STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
    STENCIL_BACK_PASS_DEPTH_PASS: 34819,
    STENCIL_BACK_REF: 36003,
    STENCIL_BACK_VALUE_MASK: 36004,
    STENCIL_BACK_WRITEMASK: 36005,
    VIEWPORT: 2978,
    SCISSOR_BOX: 3088,
    COLOR_CLEAR_VALUE: 3106,
    COLOR_WRITEMASK: 3107,
    UNPACK_ALIGNMENT: 3317,
    PACK_ALIGNMENT: 3333,
    MAX_TEXTURE_SIZE: 3379,
    MAX_VIEWPORT_DIMS: 3386,
    SUBPIXEL_BITS: 3408,
    RED_BITS: 3410,
    GREEN_BITS: 3411,
    BLUE_BITS: 3412,
    ALPHA_BITS: 3413,
    DEPTH_BITS: 3414,
    STENCIL_BITS: 3415,
    POLYGON_OFFSET_UNITS: 10752,
    POLYGON_OFFSET_FACTOR: 32824,
    TEXTURE_BINDING_2D: 32873,
    SAMPLE_BUFFERS: 32936,
    SAMPLES: 32937,
    SAMPLE_COVERAGE_VALUE: 32938,
    SAMPLE_COVERAGE_INVERT: 32939,
    COMPRESSED_TEXTURE_FORMATS: 34467,
    DONT_CARE: 4352,
    FASTEST: 4353,
    NICEST: 4354,
    GENERATE_MIPMAP_HINT: 33170,
    BYTE: 5120,
    UNSIGNED_BYTE: 5121,
    SHORT: 5122,
    UNSIGNED_SHORT: 5123,
    INT: 5124,
    UNSIGNED_INT: 5125,
    FLOAT: 5126,
    DEPTH_COMPONENT: 6402,
    ALPHA: 6406,
    RGB: 6407,
    RGBA: 6408,
    LUMINANCE: 6409,
    LUMINANCE_ALPHA: 6410,
    UNSIGNED_SHORT_4_4_4_4: 32819,
    UNSIGNED_SHORT_5_5_5_1: 32820,
    UNSIGNED_SHORT_5_6_5: 33635,
    FRAGMENT_SHADER: 35632,
    VERTEX_SHADER: 35633,
    MAX_VERTEX_ATTRIBS: 34921,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    MAX_VARYING_VECTORS: 36348,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
    SHADER_TYPE: 35663,
    DELETE_STATUS: 35712,
    LINK_STATUS: 35714,
    VALIDATE_STATUS: 35715,
    ATTACHED_SHADERS: 35717,
    ACTIVE_UNIFORMS: 35718,
    ACTIVE_ATTRIBUTES: 35721,
    SHADING_LANGUAGE_VERSION: 35724,
    CURRENT_PROGRAM: 35725,
    NEVER: 512,
    LESS: 513,
    EQUAL: 514,
    LEQUAL: 515,
    GREATER: 516,
    NOTEQUAL: 517,
    GEQUAL: 518,
    ALWAYS: 519,
    KEEP: 7680,
    REPLACE: 7681,
    INCR: 7682,
    DECR: 7683,
    INVERT: 5386,
    INCR_WRAP: 34055,
    DECR_WRAP: 34056,
    VENDOR: 7936,
    RENDERER: 7937,
    VERSION: 7938,
    NEAREST: 9728,
    LINEAR: 9729,
    NEAREST_MIPMAP_NEAREST: 9984,
    LINEAR_MIPMAP_NEAREST: 9985,
    NEAREST_MIPMAP_LINEAR: 9986,
    LINEAR_MIPMAP_LINEAR: 9987,
    TEXTURE_MAG_FILTER: 10240,
    TEXTURE_MIN_FILTER: 10241,
    TEXTURE_WRAP_S: 10242,
    TEXTURE_WRAP_T: 10243,
    TEXTURE_2D: 3553,
    TEXTURE: 5890,
    TEXTURE_CUBE_MAP: 34067,
    TEXTURE_BINDING_CUBE_MAP: 34068,
    TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
    TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
    TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
    TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
    TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
    TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
    MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
    TEXTURE0: 33984,
    TEXTURE1: 33985,
    TEXTURE2: 33986,
    TEXTURE3: 33987,
    TEXTURE4: 33988,
    TEXTURE5: 33989,
    TEXTURE6: 33990,
    TEXTURE7: 33991,
    TEXTURE8: 33992,
    TEXTURE9: 33993,
    TEXTURE10: 33994,
    TEXTURE11: 33995,
    TEXTURE12: 33996,
    TEXTURE13: 33997,
    TEXTURE14: 33998,
    TEXTURE15: 33999,
    TEXTURE16: 34e3,
    TEXTURE17: 34001,
    TEXTURE18: 34002,
    TEXTURE19: 34003,
    TEXTURE20: 34004,
    TEXTURE21: 34005,
    TEXTURE22: 34006,
    TEXTURE23: 34007,
    TEXTURE24: 34008,
    TEXTURE25: 34009,
    TEXTURE26: 34010,
    TEXTURE27: 34011,
    TEXTURE28: 34012,
    TEXTURE29: 34013,
    TEXTURE30: 34014,
    TEXTURE31: 34015,
    ACTIVE_TEXTURE: 34016,
    REPEAT: 10497,
    CLAMP_TO_EDGE: 33071,
    MIRRORED_REPEAT: 33648,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    INT_VEC2: 35667,
    INT_VEC3: 35668,
    INT_VEC4: 35669,
    BOOL: 35670,
    BOOL_VEC2: 35671,
    BOOL_VEC3: 35672,
    BOOL_VEC4: 35673,
    FLOAT_MAT2: 35674,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    SAMPLER_2D: 35678,
    SAMPLER_CUBE: 35680,
    VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
    VERTEX_ATTRIB_ARRAY_SIZE: 34339,
    VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
    VERTEX_ATTRIB_ARRAY_TYPE: 34341,
    VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
    VERTEX_ATTRIB_ARRAY_POINTER: 34373,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
    IMPLEMENTATION_COLOR_READ_TYPE: 35738,
    IMPLEMENTATION_COLOR_READ_FORMAT: 35739,
    COMPILE_STATUS: 35713,
    LOW_FLOAT: 36336,
    MEDIUM_FLOAT: 36337,
    HIGH_FLOAT: 36338,
    LOW_INT: 36339,
    MEDIUM_INT: 36340,
    HIGH_INT: 36341,
    FRAMEBUFFER: 36160,
    RENDERBUFFER: 36161,
    RGBA4: 32854,
    RGB5_A1: 32855,
    RGB565: 36194,
    DEPTH_COMPONENT16: 33189,
    STENCIL_INDEX: 6401,
    STENCIL_INDEX8: 36168,
    DEPTH_STENCIL: 34041,
    RENDERBUFFER_WIDTH: 36162,
    RENDERBUFFER_HEIGHT: 36163,
    RENDERBUFFER_INTERNAL_FORMAT: 36164,
    RENDERBUFFER_RED_SIZE: 36176,
    RENDERBUFFER_GREEN_SIZE: 36177,
    RENDERBUFFER_BLUE_SIZE: 36178,
    RENDERBUFFER_ALPHA_SIZE: 36179,
    RENDERBUFFER_DEPTH_SIZE: 36180,
    RENDERBUFFER_STENCIL_SIZE: 36181,
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
    COLOR_ATTACHMENT0: 36064,
    DEPTH_ATTACHMENT: 36096,
    STENCIL_ATTACHMENT: 36128,
    DEPTH_STENCIL_ATTACHMENT: 33306,
    NONE: 0,
    FRAMEBUFFER_COMPLETE: 36053,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
    FRAMEBUFFER_UNSUPPORTED: 36061,
    FRAMEBUFFER_BINDING: 36006,
    RENDERBUFFER_BINDING: 36007,
    MAX_RENDERBUFFER_SIZE: 34024,
    INVALID_FRAMEBUFFER_OPERATION: 1286,
    UNPACK_FLIP_Y_WEBGL: 37440,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
    CONTEXT_LOST_WEBGL: 37442,
    UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
    BROWSER_DEFAULT_WEBGL: 37444,
    COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
    COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
    COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
    COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
    COMPRESSED_RGB_ETC1_WEBGL: 36196,
    HALF_FLOAT_OES: 36193,
    DOUBLE: 5130,
    READ_BUFFER: 3074,
    UNPACK_ROW_LENGTH: 3314,
    UNPACK_SKIP_ROWS: 3315,
    UNPACK_SKIP_PIXELS: 3316,
    PACK_ROW_LENGTH: 3330,
    PACK_SKIP_ROWS: 3331,
    PACK_SKIP_PIXELS: 3332,
    COLOR: 6144,
    DEPTH: 6145,
    STENCIL: 6146,
    RED: 6403,
    RGB8: 32849,
    RGBA8: 32856,
    RGB10_A2: 32857,
    TEXTURE_BINDING_3D: 32874,
    UNPACK_SKIP_IMAGES: 32877,
    UNPACK_IMAGE_HEIGHT: 32878,
    TEXTURE_3D: 32879,
    TEXTURE_WRAP_R: 32882,
    MAX_3D_TEXTURE_SIZE: 32883,
    UNSIGNED_INT_2_10_10_10_REV: 33640,
    MAX_ELEMENTS_VERTICES: 33e3,
    MAX_ELEMENTS_INDICES: 33001,
    TEXTURE_MIN_LOD: 33082,
    TEXTURE_MAX_LOD: 33083,
    TEXTURE_BASE_LEVEL: 33084,
    TEXTURE_MAX_LEVEL: 33085,
    MIN: 32775,
    MAX: 32776,
    DEPTH_COMPONENT24: 33190,
    MAX_TEXTURE_LOD_BIAS: 34045,
    TEXTURE_COMPARE_MODE: 34892,
    TEXTURE_COMPARE_FUNC: 34893,
    CURRENT_QUERY: 34917,
    QUERY_RESULT: 34918,
    QUERY_RESULT_AVAILABLE: 34919,
    STREAM_READ: 35041,
    STREAM_COPY: 35042,
    STATIC_READ: 35045,
    STATIC_COPY: 35046,
    DYNAMIC_READ: 35049,
    DYNAMIC_COPY: 35050,
    MAX_DRAW_BUFFERS: 34852,
    DRAW_BUFFER0: 34853,
    DRAW_BUFFER1: 34854,
    DRAW_BUFFER2: 34855,
    DRAW_BUFFER3: 34856,
    DRAW_BUFFER4: 34857,
    DRAW_BUFFER5: 34858,
    DRAW_BUFFER6: 34859,
    DRAW_BUFFER7: 34860,
    DRAW_BUFFER8: 34861,
    DRAW_BUFFER9: 34862,
    DRAW_BUFFER10: 34863,
    DRAW_BUFFER11: 34864,
    DRAW_BUFFER12: 34865,
    DRAW_BUFFER13: 34866,
    DRAW_BUFFER14: 34867,
    DRAW_BUFFER15: 34868,
    MAX_FRAGMENT_UNIFORM_COMPONENTS: 35657,
    MAX_VERTEX_UNIFORM_COMPONENTS: 35658,
    SAMPLER_3D: 35679,
    SAMPLER_2D_SHADOW: 35682,
    FRAGMENT_SHADER_DERIVATIVE_HINT: 35723,
    PIXEL_PACK_BUFFER: 35051,
    PIXEL_UNPACK_BUFFER: 35052,
    PIXEL_PACK_BUFFER_BINDING: 35053,
    PIXEL_UNPACK_BUFFER_BINDING: 35055,
    FLOAT_MAT2x3: 35685,
    FLOAT_MAT2x4: 35686,
    FLOAT_MAT3x2: 35687,
    FLOAT_MAT3x4: 35688,
    FLOAT_MAT4x2: 35689,
    FLOAT_MAT4x3: 35690,
    SRGB: 35904,
    SRGB8: 35905,
    SRGB8_ALPHA8: 35907,
    COMPARE_REF_TO_TEXTURE: 34894,
    RGBA32F: 34836,
    RGB32F: 34837,
    RGBA16F: 34842,
    RGB16F: 34843,
    VERTEX_ATTRIB_ARRAY_INTEGER: 35069,
    MAX_ARRAY_TEXTURE_LAYERS: 35071,
    MIN_PROGRAM_TEXEL_OFFSET: 35076,
    MAX_PROGRAM_TEXEL_OFFSET: 35077,
    MAX_VARYING_COMPONENTS: 35659,
    TEXTURE_2D_ARRAY: 35866,
    TEXTURE_BINDING_2D_ARRAY: 35869,
    R11F_G11F_B10F: 35898,
    UNSIGNED_INT_10F_11F_11F_REV: 35899,
    RGB9_E5: 35901,
    UNSIGNED_INT_5_9_9_9_REV: 35902,
    TRANSFORM_FEEDBACK_BUFFER_MODE: 35967,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 35968,
    TRANSFORM_FEEDBACK_VARYINGS: 35971,
    TRANSFORM_FEEDBACK_BUFFER_START: 35972,
    TRANSFORM_FEEDBACK_BUFFER_SIZE: 35973,
    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 35976,
    RASTERIZER_DISCARD: 35977,
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 35978,
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 35979,
    INTERLEAVED_ATTRIBS: 35980,
    SEPARATE_ATTRIBS: 35981,
    TRANSFORM_FEEDBACK_BUFFER: 35982,
    TRANSFORM_FEEDBACK_BUFFER_BINDING: 35983,
    RGBA32UI: 36208,
    RGB32UI: 36209,
    RGBA16UI: 36214,
    RGB16UI: 36215,
    RGBA8UI: 36220,
    RGB8UI: 36221,
    RGBA32I: 36226,
    RGB32I: 36227,
    RGBA16I: 36232,
    RGB16I: 36233,
    RGBA8I: 36238,
    RGB8I: 36239,
    RED_INTEGER: 36244,
    RGB_INTEGER: 36248,
    RGBA_INTEGER: 36249,
    SAMPLER_2D_ARRAY: 36289,
    SAMPLER_2D_ARRAY_SHADOW: 36292,
    SAMPLER_CUBE_SHADOW: 36293,
    UNSIGNED_INT_VEC2: 36294,
    UNSIGNED_INT_VEC3: 36295,
    UNSIGNED_INT_VEC4: 36296,
    INT_SAMPLER_2D: 36298,
    INT_SAMPLER_3D: 36299,
    INT_SAMPLER_CUBE: 36300,
    INT_SAMPLER_2D_ARRAY: 36303,
    UNSIGNED_INT_SAMPLER_2D: 36306,
    UNSIGNED_INT_SAMPLER_3D: 36307,
    UNSIGNED_INT_SAMPLER_CUBE: 36308,
    UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311,
    DEPTH_COMPONENT32F: 36012,
    DEPTH32F_STENCIL8: 36013,
    FLOAT_32_UNSIGNED_INT_24_8_REV: 36269,
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 33296,
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 33297,
    FRAMEBUFFER_ATTACHMENT_RED_SIZE: 33298,
    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 33299,
    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 33300,
    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 33301,
    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 33302,
    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 33303,
    FRAMEBUFFER_DEFAULT: 33304,
    UNSIGNED_INT_24_8: 34042,
    DEPTH24_STENCIL8: 35056,
    UNSIGNED_NORMALIZED: 35863,
    DRAW_FRAMEBUFFER_BINDING: 36006,
    READ_FRAMEBUFFER: 36008,
    DRAW_FRAMEBUFFER: 36009,
    READ_FRAMEBUFFER_BINDING: 36010,
    RENDERBUFFER_SAMPLES: 36011,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 36052,
    MAX_COLOR_ATTACHMENTS: 36063,
    COLOR_ATTACHMENT1: 36065,
    COLOR_ATTACHMENT2: 36066,
    COLOR_ATTACHMENT3: 36067,
    COLOR_ATTACHMENT4: 36068,
    COLOR_ATTACHMENT5: 36069,
    COLOR_ATTACHMENT6: 36070,
    COLOR_ATTACHMENT7: 36071,
    COLOR_ATTACHMENT8: 36072,
    COLOR_ATTACHMENT9: 36073,
    COLOR_ATTACHMENT10: 36074,
    COLOR_ATTACHMENT11: 36075,
    COLOR_ATTACHMENT12: 36076,
    COLOR_ATTACHMENT13: 36077,
    COLOR_ATTACHMENT14: 36078,
    COLOR_ATTACHMENT15: 36079,
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 36182,
    MAX_SAMPLES: 36183,
    HALF_FLOAT: 5131,
    RG: 33319,
    RG_INTEGER: 33320,
    R8: 33321,
    RG8: 33323,
    R16F: 33325,
    R32F: 33326,
    RG16F: 33327,
    RG32F: 33328,
    R8I: 33329,
    R8UI: 33330,
    R16I: 33331,
    R16UI: 33332,
    R32I: 33333,
    R32UI: 33334,
    RG8I: 33335,
    RG8UI: 33336,
    RG16I: 33337,
    RG16UI: 33338,
    RG32I: 33339,
    RG32UI: 33340,
    VERTEX_ARRAY_BINDING: 34229,
    R8_SNORM: 36756,
    RG8_SNORM: 36757,
    RGB8_SNORM: 36758,
    RGBA8_SNORM: 36759,
    SIGNED_NORMALIZED: 36764,
    COPY_READ_BUFFER: 36662,
    COPY_WRITE_BUFFER: 36663,
    COPY_READ_BUFFER_BINDING: 36662,
    COPY_WRITE_BUFFER_BINDING: 36663,
    UNIFORM_BUFFER: 35345,
    UNIFORM_BUFFER_BINDING: 35368,
    UNIFORM_BUFFER_START: 35369,
    UNIFORM_BUFFER_SIZE: 35370,
    MAX_VERTEX_UNIFORM_BLOCKS: 35371,
    MAX_FRAGMENT_UNIFORM_BLOCKS: 35373,
    MAX_COMBINED_UNIFORM_BLOCKS: 35374,
    MAX_UNIFORM_BUFFER_BINDINGS: 35375,
    MAX_UNIFORM_BLOCK_SIZE: 35376,
    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 35377,
    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 35379,
    UNIFORM_BUFFER_OFFSET_ALIGNMENT: 35380,
    ACTIVE_UNIFORM_BLOCKS: 35382,
    UNIFORM_TYPE: 35383,
    UNIFORM_SIZE: 35384,
    UNIFORM_BLOCK_INDEX: 35386,
    UNIFORM_OFFSET: 35387,
    UNIFORM_ARRAY_STRIDE: 35388,
    UNIFORM_MATRIX_STRIDE: 35389,
    UNIFORM_IS_ROW_MAJOR: 35390,
    UNIFORM_BLOCK_BINDING: 35391,
    UNIFORM_BLOCK_DATA_SIZE: 35392,
    UNIFORM_BLOCK_ACTIVE_UNIFORMS: 35394,
    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 35395,
    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 35396,
    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 35398,
    INVALID_INDEX: 4294967295,
    MAX_VERTEX_OUTPUT_COMPONENTS: 37154,
    MAX_FRAGMENT_INPUT_COMPONENTS: 37157,
    MAX_SERVER_WAIT_TIMEOUT: 37137,
    OBJECT_TYPE: 37138,
    SYNC_CONDITION: 37139,
    SYNC_STATUS: 37140,
    SYNC_FLAGS: 37141,
    SYNC_FENCE: 37142,
    SYNC_GPU_COMMANDS_COMPLETE: 37143,
    UNSIGNALED: 37144,
    SIGNALED: 37145,
    ALREADY_SIGNALED: 37146,
    TIMEOUT_EXPIRED: 37147,
    CONDITION_SATISFIED: 37148,
    WAIT_FAILED: 37149,
    SYNC_FLUSH_COMMANDS_BIT: 1,
    VERTEX_ATTRIB_ARRAY_DIVISOR: 35070,
    ANY_SAMPLES_PASSED: 35887,
    ANY_SAMPLES_PASSED_CONSERVATIVE: 36202,
    SAMPLER_BINDING: 35097,
    RGB10_A2UI: 36975,
    INT_2_10_10_10_REV: 36255,
    TRANSFORM_FEEDBACK: 36386,
    TRANSFORM_FEEDBACK_PAUSED: 36387,
    TRANSFORM_FEEDBACK_ACTIVE: 36388,
    TRANSFORM_FEEDBACK_BINDING: 36389,
    COMPRESSED_R11_EAC: 37488,
    COMPRESSED_SIGNED_R11_EAC: 37489,
    COMPRESSED_RG11_EAC: 37490,
    COMPRESSED_SIGNED_RG11_EAC: 37491,
    COMPRESSED_RGB8_ETC2: 37492,
    COMPRESSED_SRGB8_ETC2: 37493,
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37494,
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37495,
    COMPRESSED_RGBA8_ETC2_EAC: 37496,
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37497,
    TEXTURE_IMMUTABLE_FORMAT: 37167,
    MAX_ELEMENT_INDEX: 36203,
    TEXTURE_IMMUTABLE_LEVELS: 33503,
    MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047
  });
}), define("Core/PrimitiveType", ["./freezeObject", "./WebGLConstants"], function (e, t) {
  "use strict";

  var r = {
    POINTS: t.POINTS,
    LINES: t.LINES,
    LINE_LOOP: t.LINE_LOOP,
    LINE_STRIP: t.LINE_STRIP,
    TRIANGLES: t.TRIANGLES,
    TRIANGLE_STRIP: t.TRIANGLE_STRIP,
    TRIANGLE_FAN: t.TRIANGLE_FAN,
    validate: function validate(e) {
      return e === r.POINTS || e === r.LINES || e === r.LINE_LOOP || e === r.LINE_STRIP || e === r.TRIANGLES || e === r.TRIANGLE_STRIP || e === r.TRIANGLE_FAN;
    }
  };
  return e(r);
}), define("Core/Quaternion", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math", "./Matrix3"], function (c, e, o, m, t, r, u, p) {
  "use strict";

  function _(e, t, r, n) {
    this.x = o(e, 0), this.y = o(t, 0), this.z = o(r, 0), this.w = o(n, 0);
  }

  var l = new c();

  _.fromAxisAngle = function (e, t, r) {
    var n = t / 2,
        o = Math.sin(n),
        i = (l = c.normalize(e, l)).x * o,
        a = l.y * o,
        u = l.z * o,
        s = Math.cos(n);
    return m(r) ? (r.x = i, r.y = a, r.z = u, r.w = s, r) : new _(i, a, u, s);
  };

  var R = [1, 2, 0],
      y = new Array(3);

  _.fromRotationMatrix = function (e, t) {
    var r,
        n,
        o,
        i,
        a,
        u,
        s,
        c,
        l = e[p.COLUMN0ROW0],
        f = e[p.COLUMN1ROW1],
        h = e[p.COLUMN2ROW2],
        E = l + f + h,
        d = 0 < E ? (o = .5 * (s = Math.sqrt(E + 1)), s = .5 / s, r = (e[p.COLUMN1ROW2] - e[p.COLUMN2ROW1]) * s, n = (e[p.COLUMN2ROW0] - e[p.COLUMN0ROW2]) * s, (e[p.COLUMN0ROW1] - e[p.COLUMN1ROW0]) * s) : (u = R[a = R[i = l < h && f < h ? 2 : l < f ? 1 : 0]], s = Math.sqrt(e[p.getElementIndex(i, i)] - e[p.getElementIndex(a, a)] - e[p.getElementIndex(u, u)] + 1), (c = y)[i] = .5 * s, s = .5 / s, o = (e[p.getElementIndex(u, a)] - e[p.getElementIndex(a, u)]) * s, c[a] = (e[p.getElementIndex(a, i)] + e[p.getElementIndex(i, a)]) * s, c[u] = (e[p.getElementIndex(u, i)] + e[p.getElementIndex(i, u)]) * s, r = -c[0], n = -c[1], -c[2]);
    return m(t) ? (t.x = r, t.y = n, t.z = d, t.w = o, t) : new _(r, n, d, o);
  };

  var n = new _(),
      i = new _(),
      a = new _(),
      s = new _();

  _.fromHeadingPitchRoll = function (e, t) {
    return s = _.fromAxisAngle(c.UNIT_X, e.roll, n), a = _.fromAxisAngle(c.UNIT_Y, -e.pitch, t), t = _.multiply(a, s, a), i = _.fromAxisAngle(c.UNIT_Z, -e.heading, n), _.multiply(i, t, t);
  };

  var f = new c(),
      h = new c(),
      E = new _(),
      d = new _(),
      T = new _();
  _.packedLength = 4, _.pack = function (e, t, r) {
    return r = o(r, 0), t[r++] = e.x, t[r++] = e.y, t[r++] = e.z, t[r] = e.w, t;
  }, _.unpack = function (e, t, r) {
    return t = o(t, 0), m(r) || (r = new _()), r.x = e[t], r.y = e[t + 1], r.z = e[t + 2], r.w = e[t + 3], r;
  }, _.packedInterpolationLength = 3, _.convertPackedArrayForInterpolation = function (e, t, r, n) {
    _.unpack(e, 4 * r, T), _.conjugate(T, T);

    for (var o = 0, i = r - t + 1; o < i; o++) {
      var a = 3 * o;
      _.unpack(e, 4 * (t + o), E), _.multiply(E, T, E), E.w < 0 && _.negate(E, E), _.computeAxis(E, f);

      var u = _.computeAngle(E);

      n[a] = f.x * u, n[1 + a] = f.y * u, n[2 + a] = f.z * u;
    }
  }, _.unpackInterpolationResult = function (e, t, r, n, o) {
    m(o) || (o = new _()), c.fromArray(e, 0, h);
    var i = c.magnitude(h);
    return _.unpack(t, 4 * n, d), 0 === i ? _.clone(_.IDENTITY, E) : _.fromAxisAngle(h, i, E), _.multiply(E, d, o);
  }, _.clone = function (e, t) {
    if (m(e)) return m(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new _(e.x, e.y, e.z, e.w);
  }, _.conjugate = function (e, t) {
    return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = e.w, t;
  }, _.magnitudeSquared = function (e) {
    return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
  }, _.magnitude = function (e) {
    return Math.sqrt(_.magnitudeSquared(e));
  }, _.normalize = function (e, t) {
    var r = 1 / _.magnitude(e),
        n = e.x * r,
        o = e.y * r,
        i = e.z * r,
        a = e.w * r;

    return t.x = n, t.y = o, t.z = i, t.w = a, t;
  }, _.inverse = function (e, t) {
    var r = _.magnitudeSquared(e);

    return t = _.conjugate(e, t), _.multiplyByScalar(t, 1 / r, t);
  }, _.add = function (e, t, r) {
    return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r.w = e.w + t.w, r;
  }, _.subtract = function (e, t, r) {
    return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r.w = e.w - t.w, r;
  }, _.negate = function (e, t) {
    return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
  }, _.dot = function (e, t) {
    return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
  }, _.multiply = function (e, t, r) {
    var n = e.x,
        o = e.y,
        i = e.z,
        a = e.w,
        u = t.x,
        s = t.y,
        c = t.z,
        l = t.w,
        f = a * u + n * l + o * c - i * s,
        h = a * s - n * c + o * l + i * u,
        E = a * c + n * s - o * u + i * l,
        d = a * l - n * u - o * s - i * c;
    return r.x = f, r.y = h, r.z = E, r.w = d, r;
  }, _.multiplyByScalar = function (e, t, r) {
    return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
  }, _.divideByScalar = function (e, t, r) {
    return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
  }, _.computeAxis = function (e, t) {
    var r = e.w;
    if (Math.abs(r - 1) < u.EPSILON6) return t.x = t.y = t.z = 0, t;
    var n = 1 / Math.sqrt(1 - r * r);
    return t.x = e.x * n, t.y = e.y * n, t.z = e.z * n, t;
  }, _.computeAngle = function (e) {
    return Math.abs(e.w - 1) < u.EPSILON6 ? 0 : 2 * Math.acos(e.w);
  };
  var A = new _();

  _.lerp = function (e, t, r, n) {
    return A = _.multiplyByScalar(t, r, A), n = _.multiplyByScalar(e, 1 - r, n), _.add(A, n, n);
  };

  var S = new _(),
      C = new _(),
      g = new _();
  _.slerp = function (e, t, r, n) {
    var o = _.dot(e, t),
        i = t;

    if (o < 0 && (o = -o, i = S = _.negate(t, S)), 1 - o < u.EPSILON6) return _.lerp(e, i, r, n);
    var a = Math.acos(o);
    return C = _.multiplyByScalar(e, Math.sin((1 - r) * a), C), g = _.multiplyByScalar(i, Math.sin(r * a), g), n = _.add(C, g, n), _.multiplyByScalar(n, 1 / Math.sin(a), n);
  }, _.log = function (e, t) {
    var r = u.acosClamped(e.w),
        n = 0;
    return 0 !== r && (n = r / Math.sin(r)), c.multiplyByScalar(e, n, t);
  }, _.exp = function (e, t) {
    var r = c.magnitude(e),
        n = 0;
    return 0 !== r && (n = Math.sin(r) / r), t.x = e.x * n, t.y = e.y * n, t.z = e.z * n, t.w = Math.cos(r), t;
  };
  var O = new c(),
      N = new c(),
      I = new _(),
      M = new _();
  _.computeInnerQuadrangle = function (e, t, r, n) {
    var o = _.conjugate(t, I);

    _.multiply(o, r, M);

    var i = _.log(M, O);

    _.multiply(o, e, M);

    var a = _.log(M, N);

    return c.add(i, a, i), c.multiplyByScalar(i, .25, i), c.negate(i, i), _.exp(i, I), _.multiply(t, I, n);
  }, _.squad = function (e, t, r, n, o, i) {
    var a = _.slerp(e, t, o, I),
        u = _.slerp(r, n, o, M);

    return _.slerp(a, u, 2 * o * (1 - o), i);
  };

  for (var v = new _(), w = 1.9011074535173003, D = t.supportsTypedArrays() ? new Float32Array(8) : [], P = t.supportsTypedArrays() ? new Float32Array(8) : [], F = t.supportsTypedArrays() ? new Float32Array(8) : [], U = t.supportsTypedArrays() ? new Float32Array(8) : [], L = 0; L < 7; ++L) {
    var x = L + 1,
        B = 2 * x + 1;
    D[L] = 1 / (x * B), P[L] = x / B;
  }

  return D[7] = w / 136, P[7] = 8 * w / 17, _.fastSlerp = function (e, t, r, n) {
    var o,
        i = _.dot(e, t);

    0 <= i ? o = 1 : (o = -1, i = -i);

    for (var a = i - 1, u = 1 - r, s = r * r, c = u * u, l = 7; 0 <= l; --l) {
      F[l] = (D[l] * s - P[l]) * a, U[l] = (D[l] * c - P[l]) * a;
    }

    var f = o * r * (1 + F[0] * (1 + F[1] * (1 + F[2] * (1 + F[3] * (1 + F[4] * (1 + F[5] * (1 + F[6] * (1 + F[7])))))))),
        h = u * (1 + U[0] * (1 + U[1] * (1 + U[2] * (1 + U[3] * (1 + U[4] * (1 + U[5] * (1 + U[6] * (1 + U[7])))))))),
        E = _.multiplyByScalar(e, h, v);

    return _.multiplyByScalar(t, f, n), _.add(E, n, n);
  }, _.fastSquad = function (e, t, r, n, o, i) {
    var a = _.fastSlerp(e, t, o, I),
        u = _.fastSlerp(r, n, o, M);

    return _.fastSlerp(a, u, 2 * o * (1 - o), i);
  }, _.equals = function (e, t) {
    return e === t || m(e) && m(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
  }, _.equalsEpsilon = function (e, t, r) {
    return e === t || m(e) && m(t) && Math.abs(e.x - t.x) <= r && Math.abs(e.y - t.y) <= r && Math.abs(e.z - t.z) <= r && Math.abs(e.w - t.w) <= r;
  }, _.ZERO = r(new _(0, 0, 0, 0)), _.IDENTITY = r(new _(0, 0, 0, 1)), _.prototype.clone = function (e) {
    return _.clone(this, e);
  }, _.prototype.equals = function (e) {
    return _.equals(this, e);
  }, _.prototype.equalsEpsilon = function (e, t) {
    return _.equalsEpsilon(this, e, t);
  }, _.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
  }, _;
}), define("Core/Ellipsoid", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (s, c, e, o, l, t, r, n, f, i) {
  "use strict";

  function a(e, t, r, n) {
    t = o(t, 0), r = o(r, 0), n = o(n, 0), e._radii = new s(t, r, n), e._radiiSquared = new s(t * t, r * r, n * n), e._radiiToTheFourth = new s(t * t * t * t, r * r * r * r, n * n * n * n), e._oneOverRadii = new s(0 === t ? 0 : 1 / t, 0 === r ? 0 : 1 / r, 0 === n ? 0 : 1 / n), e._oneOverRadiiSquared = new s(0 === t ? 0 : 1 / (t * t), 0 === r ? 0 : 1 / (r * r), 0 === n ? 0 : 1 / (n * n)), e._minimumRadius = Math.min(t, r, n), e._maximumRadius = Math.max(t, r, n), e._centerToleranceSquared = f.EPSILON1, 0 !== e._radiiSquared.z && (e._squaredXOverSquaredZ = e._radiiSquared.x / e._radiiSquared.z);
  }

  function u(e, t, r) {
    this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, a(this, e, t, r);
  }

  t(u.prototype, {
    radii: {
      get: function get() {
        return this._radii;
      }
    },
    radiiSquared: {
      get: function get() {
        return this._radiiSquared;
      }
    },
    radiiToTheFourth: {
      get: function get() {
        return this._radiiToTheFourth;
      }
    },
    oneOverRadii: {
      get: function get() {
        return this._oneOverRadii;
      }
    },
    oneOverRadiiSquared: {
      get: function get() {
        return this._oneOverRadiiSquared;
      }
    },
    minimumRadius: {
      get: function get() {
        return this._minimumRadius;
      }
    },
    maximumRadius: {
      get: function get() {
        return this._maximumRadius;
      }
    }
  }), u.clone = function (e, t) {
    if (l(e)) {
      var r = e._radii;
      return l(t) ? (s.clone(r, t._radii), s.clone(e._radiiSquared, t._radiiSquared), s.clone(e._radiiToTheFourth, t._radiiToTheFourth), s.clone(e._oneOverRadii, t._oneOverRadii), s.clone(e._oneOverRadiiSquared, t._oneOverRadiiSquared), t._minimumRadius = e._minimumRadius, t._maximumRadius = e._maximumRadius, t._centerToleranceSquared = e._centerToleranceSquared, t) : new u(r.x, r.y, r.z);
    }
  }, u.fromCartesian3 = function (e, t) {
    return l(t) || (t = new u()), l(e) && a(t, e.x, e.y, e.z), t;
  }, u.WGS84 = n(new u(6378137, 6378137, 6356752.314245179)), u.UNIT_SPHERE = n(new u(1, 1, 1)), u.MOON = n(new u(f.LUNAR_RADIUS, f.LUNAR_RADIUS, f.LUNAR_RADIUS)), u.prototype.clone = function (e) {
    return u.clone(this, e);
  }, u.packedLength = s.packedLength, u.pack = function (e, t, r) {
    return r = o(r, 0), s.pack(e._radii, t, r), t;
  }, u.unpack = function (e, t, r) {
    t = o(t, 0);
    var n = s.unpack(e, t);
    return u.fromCartesian3(n, r);
  }, u.prototype.geocentricSurfaceNormal = s.normalize, u.prototype.geodeticSurfaceNormalCartographic = function (e, t) {
    var r = e.longitude,
        n = e.latitude,
        o = Math.cos(n),
        i = o * Math.cos(r),
        a = o * Math.sin(r),
        u = Math.sin(n);
    return l(t) || (t = new s()), t.x = i, t.y = a, t.z = u, s.normalize(t, t);
  }, u.prototype.geodeticSurfaceNormal = function (e, t) {
    return l(t) || (t = new s()), t = s.multiplyComponents(e, this._oneOverRadiiSquared, t), s.normalize(t, t);
  };
  var h = new s(),
      E = new s();
  u.prototype.cartographicToCartesian = function (e, t) {
    var r = h,
        n = E;
    this.geodeticSurfaceNormalCartographic(e, r), s.multiplyComponents(this._radiiSquared, r, n);
    var o = Math.sqrt(s.dot(r, n));
    return s.divideByScalar(n, o, n), s.multiplyByScalar(r, e.height, r), l(t) || (t = new s()), s.add(n, r, t);
  }, u.prototype.cartographicArrayToCartesianArray = function (e, t) {
    var r = e.length;
    l(t) ? t.length = r : t = new Array(r);

    for (var n = 0; n < r; n++) {
      t[n] = this.cartographicToCartesian(e[n], t[n]);
    }

    return t;
  };
  var d = new s(),
      m = new s(),
      p = new s();
  return u.prototype.cartesianToCartographic = function (e, t) {
    var r = this.scaleToGeodeticSurface(e, m);

    if (l(r)) {
      var n = this.geodeticSurfaceNormal(r, d),
          o = s.subtract(e, r, p),
          i = Math.atan2(n.y, n.x),
          a = Math.asin(n.z),
          u = f.sign(s.dot(o, e)) * s.magnitude(o);
      return l(t) ? (t.longitude = i, t.latitude = a, t.height = u, t) : new c(i, a, u);
    }
  }, u.prototype.cartesianArrayToCartographicArray = function (e, t) {
    var r = e.length;
    l(t) ? t.length = r : t = new Array(r);

    for (var n = 0; n < r; ++n) {
      t[n] = this.cartesianToCartographic(e[n], t[n]);
    }

    return t;
  }, u.prototype.scaleToGeodeticSurface = function (e, t) {
    return i(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t);
  }, u.prototype.scaleToGeocentricSurface = function (e, t) {
    l(t) || (t = new s());
    var r = e.x,
        n = e.y,
        o = e.z,
        i = this._oneOverRadiiSquared,
        a = 1 / Math.sqrt(r * r * i.x + n * n * i.y + o * o * i.z);
    return s.multiplyByScalar(e, a, t);
  }, u.prototype.transformPositionToScaledSpace = function (e, t) {
    return l(t) || (t = new s()), s.multiplyComponents(e, this._oneOverRadii, t);
  }, u.prototype.transformPositionFromScaledSpace = function (e, t) {
    return l(t) || (t = new s()), s.multiplyComponents(e, this._radii, t);
  }, u.prototype.equals = function (e) {
    return this === e || l(e) && s.equals(this._radii, e._radii);
  }, u.prototype.toString = function () {
    return this._radii.toString();
  }, u.prototype.getSurfaceNormalIntersectionWithZAxis = function (e, t, r) {
    t = o(t, 0);
    var n = this._squaredXOverSquaredZ;
    if (l(r) || (r = new s()), r.x = 0, r.y = 0, r.z = e.z * (1 - n), !(Math.abs(r.z) >= this._radii.z - t)) return r;
  }, u;
}), define("Core/Rectangle", ["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function (a, e, E, d, t, m, r, p) {
  "use strict";

  function _(e, t, r, n) {
    this.west = E(e, 0), this.south = E(t, 0), this.east = E(r, 0), this.north = E(n, 0);
  }

  t(_.prototype, {
    width: {
      get: function get() {
        return _.computeWidth(this);
      }
    },
    height: {
      get: function get() {
        return _.computeHeight(this);
      }
    }
  }), _.packedLength = 4, _.pack = function (e, t, r) {
    return r = E(r, 0), t[r++] = e.west, t[r++] = e.south, t[r++] = e.east, t[r] = e.north, t;
  }, _.unpack = function (e, t, r) {
    return t = E(t, 0), d(r) || (r = new _()), r.west = e[t++], r.south = e[t++], r.east = e[t++], r.north = e[t], r;
  }, _.computeWidth = function (e) {
    var t = e.east,
        r = e.west;
    return t < r && (t += p.TWO_PI), t - r;
  }, _.computeHeight = function (e) {
    return e.north - e.south;
  }, _.fromDegrees = function (e, t, r, n, o) {
    return e = p.toRadians(E(e, 0)), t = p.toRadians(E(t, 0)), r = p.toRadians(E(r, 0)), n = p.toRadians(E(n, 0)), d(o) ? (o.west = e, o.south = t, o.east = r, o.north = n, o) : new _(e, t, r, n);
  }, _.fromRadians = function (e, t, r, n, o) {
    return d(o) ? (o.west = E(e, 0), o.south = E(t, 0), o.east = E(r, 0), o.north = E(n, 0), o) : new _(e, t, r, n);
  }, _.fromCartographicArray = function (e, t) {
    for (var r = Number.MAX_VALUE, n = -Number.MAX_VALUE, o = Number.MAX_VALUE, i = -Number.MAX_VALUE, a = Number.MAX_VALUE, u = -Number.MAX_VALUE, s = 0, c = e.length; s < c; s++) {
      var l = e[s],
          r = Math.min(r, l.longitude),
          n = Math.max(n, l.longitude),
          a = Math.min(a, l.latitude),
          u = Math.max(u, l.latitude),
          f = 0 <= l.longitude ? l.longitude : l.longitude + p.TWO_PI,
          o = Math.min(o, f),
          i = Math.max(i, f);
    }

    return i - o < n - r && (r = o, (n = i) > p.PI && (n -= p.TWO_PI), r > p.PI && (r -= p.TWO_PI)), d(t) ? (t.west = r, t.south = a, t.east = n, t.north = u, t) : new _(r, a, n, u);
  }, _.fromCartesianArray = function (e, t, r) {
    t = E(t, m.WGS84);

    for (var n = Number.MAX_VALUE, o = -Number.MAX_VALUE, i = Number.MAX_VALUE, a = -Number.MAX_VALUE, u = Number.MAX_VALUE, s = -Number.MAX_VALUE, c = 0, l = e.length; c < l; c++) {
      var f = t.cartesianToCartographic(e[c]),
          n = Math.min(n, f.longitude),
          o = Math.max(o, f.longitude),
          u = Math.min(u, f.latitude),
          s = Math.max(s, f.latitude),
          h = 0 <= f.longitude ? f.longitude : f.longitude + p.TWO_PI,
          i = Math.min(i, h),
          a = Math.max(a, h);
    }

    return a - i < o - n && (n = i, (o = a) > p.PI && (o -= p.TWO_PI), n > p.PI && (n -= p.TWO_PI)), d(r) ? (r.west = n, r.south = u, r.east = o, r.north = s, r) : new _(n, u, o, s);
  }, _.clone = function (e, t) {
    if (d(e)) return d(t) ? (t.west = e.west, t.south = e.south, t.east = e.east, t.north = e.north, t) : new _(e.west, e.south, e.east, e.north);
  }, _.equalsEpsilon = function (e, t, r) {
    return e === t || d(e) && d(t) && Math.abs(e.west - t.west) <= r && Math.abs(e.south - t.south) <= r && Math.abs(e.east - t.east) <= r && Math.abs(e.north - t.north) <= r;
  }, _.prototype.clone = function (e) {
    return _.clone(this, e);
  }, _.prototype.equals = function (e) {
    return _.equals(this, e);
  }, _.equals = function (e, t) {
    return e === t || d(e) && d(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north;
  }, _.prototype.equalsEpsilon = function (e, t) {
    return _.equalsEpsilon(this, e, t);
  }, _.validate = function (e) {}, _.southwest = function (e, t) {
    return d(t) ? (t.longitude = e.west, t.latitude = e.south, t.height = 0, t) : new a(e.west, e.south);
  }, _.northwest = function (e, t) {
    return d(t) ? (t.longitude = e.west, t.latitude = e.north, t.height = 0, t) : new a(e.west, e.north);
  }, _.northeast = function (e, t) {
    return d(t) ? (t.longitude = e.east, t.latitude = e.north, t.height = 0, t) : new a(e.east, e.north);
  }, _.southeast = function (e, t) {
    return d(t) ? (t.longitude = e.east, t.latitude = e.south, t.height = 0, t) : new a(e.east, e.south);
  }, _.center = function (e, t) {
    var r = e.east,
        n = e.west;
    r < n && (r += p.TWO_PI);
    var o = p.negativePiToPi(.5 * (n + r)),
        i = .5 * (e.south + e.north);
    return d(t) ? (t.longitude = o, t.latitude = i, t.height = 0, t) : new a(o, i);
  }, _.intersection = function (e, t, r) {
    var n = e.east,
        o = e.west,
        i = t.east,
        a = t.west;
    n < o && 0 < i ? n += p.TWO_PI : i < a && 0 < n && (i += p.TWO_PI), n < o && a < 0 ? a += p.TWO_PI : i < a && o < 0 && (o += p.TWO_PI);
    var u = p.negativePiToPi(Math.max(o, a)),
        s = p.negativePiToPi(Math.min(n, i));

    if (!((e.west < e.east || t.west < t.east) && s <= u)) {
      var c = Math.max(e.south, t.south),
          l = Math.min(e.north, t.north);
      if (!(l <= c)) return d(r) ? (r.west = u, r.south = c, r.east = s, r.north = l, r) : new _(u, c, s, l);
    }
  }, _.simpleIntersection = function (e, t, r) {
    var n = Math.max(e.west, t.west),
        o = Math.max(e.south, t.south),
        i = Math.min(e.east, t.east),
        a = Math.min(e.north, t.north);
    if (!(a <= o || i <= n)) return d(r) ? (r.west = n, r.south = o, r.east = i, r.north = a, r) : new _(n, o, i, a);
  }, _.union = function (e, t, r) {
    d(r) || (r = new _());
    var n = e.east,
        o = e.west,
        i = t.east,
        a = t.west;
    n < o && 0 < i ? n += p.TWO_PI : i < a && 0 < n && (i += p.TWO_PI), n < o && a < 0 ? a += p.TWO_PI : i < a && o < 0 && (o += p.TWO_PI);
    var u = p.convertLongitudeRange(Math.min(o, a)),
        s = p.convertLongitudeRange(Math.max(n, i));
    return r.west = u, r.south = Math.min(e.south, t.south), r.east = s, r.north = Math.max(e.north, t.north), r;
  }, _.expand = function (e, t, r) {
    return d(r) || (r = new _()), r.west = Math.min(e.west, t.longitude), r.south = Math.min(e.south, t.latitude), r.east = Math.max(e.east, t.longitude), r.north = Math.max(e.north, t.latitude), r;
  }, _.contains = function (e, t) {
    var r = t.longitude,
        n = t.latitude,
        o = e.west,
        i = e.east;
    return i < o && (i += p.TWO_PI, r < 0 && (r += p.TWO_PI)), (o < r || p.equalsEpsilon(r, o, p.EPSILON14)) && (r < i || p.equalsEpsilon(r, i, p.EPSILON14)) && n >= e.south && n <= e.north;
  };
  var f = new a();
  return _.subsample = function (e, t, r, n) {
    t = E(t, m.WGS84), r = E(r, 0), d(n) || (n = []);
    var o = 0,
        i = e.north,
        a = e.south,
        u = e.east,
        s = e.west,
        c = f;
    c.height = r, c.longitude = s, c.latitude = i, n[o] = t.cartographicToCartesian(c, n[o]), o++, c.longitude = u, n[o] = t.cartographicToCartesian(c, n[o]), o++, c.latitude = a, n[o] = t.cartographicToCartesian(c, n[o]), o++, c.longitude = s, n[o] = t.cartographicToCartesian(c, n[o]), o++, c.latitude = i < 0 ? i : 0 < a ? a : 0;

    for (var l = 1; l < 8; ++l) {
      c.longitude = -Math.PI + l * p.PI_OVER_TWO, _.contains(e, c) && (n[o] = t.cartographicToCartesian(c, n[o]), o++);
    }

    return 0 === c.latitude && (c.longitude = s, n[o] = t.cartographicToCartesian(c, n[o]), o++, c.longitude = u, n[o] = t.cartographicToCartesian(c, n[o]), o++), n.length = o, n;
  }, _.MAX_VALUE = r(new _(-Math.PI, -p.PI_OVER_TWO, Math.PI, p.PI_OVER_TWO)), _;
}), define("Core/binarySearch", ["./Check"], function (e) {
  "use strict";

  return function (e, t, r) {
    for (var n, o, i = 0, a = e.length - 1; i <= a;) {
      if ((o = r(e[n = ~~((i + a) / 2)], t)) < 0) i = 1 + n;else {
        if (!(0 < o)) return n;
        a = n - 1;
      }
    }

    return ~(a + 1);
  };
}), define("Core/EarthOrientationParametersSample", [], function () {
  "use strict";

  return function (e, t, r, n, o) {
    this.xPoleWander = e, this.yPoleWander = t, this.xPoleOffset = r, this.yPoleOffset = n, this.ut1MinusUtc = o;
  };
}), define("ThirdParty/sprintf", [], function () {
  return function () {
    function y(e, t, r, n) {
      r = r || " ";
      var o = e.length >= t ? "" : Array(1 + t - e.length >>> 0).join(r);
      return n ? e + o : o + e;
    }

    function T(e, t, r, n, o, i) {
      var a = n - e.length;
      return 0 < a && (e = r || !o ? y(e, n, i, r) : e.slice(0, t.length) + y("", a, "0", !0) + e.slice(t.length)), e;
    }

    function A(e, t, r, n, o, i, a) {
      var u = e >>> 0;
      return e = (r = r && u && {
        2: "0b",
        8: "0",
        16: "0x"
      }[t] || "") + y(u.toString(t), i || 0, "0", !1), T(e, r, n, o, a);
    }

    function S(e, t, r, n, o, i) {
      return null != n && (e = e.slice(0, n)), T(e, "", t, r, o, i);
    }

    var C = arguments,
        g = 0;
    return C[g++].replace(/%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g, function (e, t, r, n, o, i, a) {
      var u, s, c, l, f;
      if ("%%" == e) return "%";

      for (var h = !1, E = "", d = !1, m = !1, p = " ", _ = r.length, R = 0; r && R < _; R++) {
        switch (r.charAt(R)) {
          case " ":
            E = " ";
            break;

          case "+":
            E = "+";
            break;

          case "-":
            h = !0;
            break;

          case "'":
            p = r.charAt(R + 1);
            break;

          case "0":
            d = !0;
            break;

          case "#":
            m = !0;
        }
      }

      if ((n = n ? "*" == n ? +C[g++] : "*" == n.charAt(0) ? +C[n.slice(1, -1)] : +n : 0) < 0 && (n = -n, h = !0), !isFinite(n)) throw new Error("sprintf: (minimum-)width must be finite");

      switch (i = i ? "*" == i ? +C[g++] : "*" == i.charAt(0) ? +C[i.slice(1, -1)] : +i : -1 < "fFeE".indexOf(a) ? 6 : "d" == a ? 0 : void 0, f = t ? C[t.slice(0, -1)] : C[g++], a) {
        case "s":
          return S(String(f), h, n, i, d, p);

        case "c":
          return S(String.fromCharCode(+f), h, n, i, d);

        case "b":
          return A(f, 2, m, h, n, i, d);

        case "o":
          return A(f, 8, m, h, n, i, d);

        case "x":
          return A(f, 16, m, h, n, i, d);

        case "X":
          return A(f, 16, m, h, n, i, d).toUpperCase();

        case "u":
          return A(f, 10, m, h, n, i, d);

        case "i":
        case "d":
          return u = +f || 0, f = (s = (u = Math.round(u - u % 1)) < 0 ? "-" : E) + y(String(Math.abs(u)), i, "0", !1), T(f, s, h, n, d);

        case "e":
        case "E":
        case "f":
        case "F":
        case "g":
        case "G":
          return s = (u = +f) < 0 ? "-" : E, c = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(a.toLowerCase())], l = ["toString", "toUpperCase"]["eEfFgG".indexOf(a) % 2], f = s + Math.abs(u)[c](i), T(f, s, h, n, d)[l]();

        default:
          return e;
      }
    });
  };
}), define("Core/GregorianDate", [], function () {
  "use strict";

  return function (e, t, r, n, o, i, a, u) {
    this.year = e, this.month = t, this.day = r, this.hour = n, this.minute = o, this.second = i, this.millisecond = a, this.isLeapSecond = u;
  };
}), define("Core/isLeapYear", ["./DeveloperError"], function (e) {
  "use strict";

  return function (e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
  };
}), define("Core/LeapSecond", [], function () {
  "use strict";

  return function (e, t) {
    this.julianDate = e, this.offset = t;
  };
}), define("Core/TimeConstants", ["./freezeObject"], function (e) {
  "use strict";

  return e({
    SECONDS_PER_MILLISECOND: .001,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    SECONDS_PER_HOUR: 3600,
    MINUTES_PER_DAY: 1440,
    SECONDS_PER_DAY: 86400,
    DAYS_PER_JULIAN_CENTURY: 36525,
    PICOSECOND: 1e-9,
    MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5
  });
}), define("Core/TimeStandard", ["./freezeObject"], function (e) {
  "use strict";

  return e({
    UTC: 0,
    TAI: 1
  });
}), define("Core/JulianDate", ["../ThirdParty/sprintf", "./binarySearch", "./defaultValue", "./defined", "./DeveloperError", "./GregorianDate", "./isLeapYear", "./LeapSecond", "./TimeConstants", "./TimeStandard"], function (f, i, o, A, e, R, S, t, y, C) {
  "use strict";

  function a(e, t) {
    return I.compare(e.julianDate, t.julianDate);
  }

  function g(e) {
    u.julianDate = e;
    var t = I.leapSeconds,
        r = i(t, u, a);
    r < 0 && (r = ~r), r >= t.length && (r = t.length - 1);
    var n = t[r].offset;
    0 < r && I.secondsDifference(t[r].julianDate, e) > n && (n = t[--r].offset), I.addSeconds(e, n, e);
  }

  function T(e, t) {
    u.julianDate = e;
    var r = I.leapSeconds,
        n = i(r, u, a);
    if (n < 0 && (n = ~n), 0 === n) return I.addSeconds(e, -r[0].offset, t);
    if (n >= r.length) return I.addSeconds(e, -r[n - 1].offset, t);
    var o = I.secondsDifference(r[n].julianDate, e);
    return 0 === o ? I.addSeconds(e, -r[n].offset, t) : o <= 1 ? void 0 : I.addSeconds(e, -r[--n].offset, t);
  }

  function O(e, t, r) {
    var n = t / y.SECONDS_PER_DAY | 0;
    return e += n, (t -= y.SECONDS_PER_DAY * n) < 0 && (e--, t += y.SECONDS_PER_DAY), r.dayNumber = e, r.secondsOfDay = t, r;
  }

  function N(e, t, r, n, o, i, a) {
    var u = (t - 14) / 12 | 0,
        s = e + 4800 + u,
        c = (1461 * s / 4 | 0) + (367 * (t - 2 - 12 * u) / 12 | 0) - (3 * ((s + 100) / 100 | 0) / 4 | 0) + r - 32075;
    (n -= 12) < 0 && (n += 24);
    var l = i + (n * y.SECONDS_PER_HOUR + o * y.SECONDS_PER_MINUTE + a * y.SECONDS_PER_MILLISECOND);
    return 43200 <= l && --c, [c, l];
  }

  function I(e, t, r) {
    this.dayNumber = void 0, this.secondsOfDay = void 0, e = o(e, 0), t = o(t, 0), r = o(r, C.UTC);
    var n = 0 | e;
    O(n, t += (e - n) * y.SECONDS_PER_DAY, this), r === C.UTC && g(this);
  }

  var h = new R(),
      M = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      u = new t(),
      v = /^(\d{4})$/,
      w = /^(\d{4})-(\d{2})$/,
      D = /^(\d{4})-?(\d{3})$/,
      P = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
      F = /^(\d{4})-?(\d{2})-?(\d{2})$/,
      r = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
      U = /^(\d{2})(\.\d+)?/.source + r.source,
      L = /^(\d{2}):?(\d{2})(\.\d+)?/.source + r.source,
      x = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + r.source;
  I.fromGregorianDate = function (e, t) {
    var r = N(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
    return A(t) ? (O(r[0], r[1], t), g(t), t) : new I(r[0], r[1], C.UTC);
  }, I.fromDate = function (e, t) {
    var r = N(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
    return A(t) ? (O(r[0], r[1], t), g(t), t) : new I(r[0], r[1], C.UTC);
  }, I.fromIso8601 = function (e, t) {
    var r,
        n,
        o,
        i,
        a,
        u = (e = e.replace(",", ".")).split("T"),
        s = 1,
        c = 1,
        l = 0,
        f = 0,
        h = 0,
        E = 0,
        d = u[0],
        m = u[1];

    if (null !== (u = d.match(F)) ? (r = +u[1], s = +u[2], c = +u[3]) : null !== (u = d.match(w)) ? (r = +u[1], s = +u[2]) : null !== (u = d.match(v)) ? r = +u[1] : (null !== (u = d.match(D)) ? (r = +u[1], i = +u[2], o = S(r)) : null !== (u = d.match(P)) && (r = +u[1], i = 7 * +u[2] + (+u[3] || 0) - new Date(Date.UTC(r, 0, 4)).getUTCDay() - 3), (n = new Date(Date.UTC(r, 0, 1))).setUTCDate(i), s = n.getUTCMonth() + 1, c = n.getUTCDate()), o = S(r), A(m)) {
      null !== (u = m.match(x)) ? (l = +u[1], f = +u[2], h = +u[3], E = 1e3 * (u[4] || 0), a = 5) : null !== (u = m.match(L)) ? (l = +u[1], f = +u[2], h = 60 * (u[3] || 0), a = 4) : null !== (u = m.match(U)) && (l = +u[1], f = 60 * (u[2] || 0), a = 3);

      var p = u[a],
          _ = +u[a + 1],
          R = +(u[a + 2] || 0);

      switch (p) {
        case "+":
          l -= _, f -= R;
          break;

        case "-":
          l += _, f += R;
          break;

        case "Z":
          break;

        default:
          f += new Date(Date.UTC(r, s - 1, c, l, f)).getTimezoneOffset();
      }
    }

    var y = 60 === h;

    for (y && h--; 60 <= f;) {
      f -= 60, l++;
    }

    for (; 24 <= l;) {
      l -= 24, c++;
    }

    for (n = o && 2 === s ? 29 : M[s - 1]; n < c;) {
      c -= n, 12 < ++s && (s -= 12, r++), n = o && 2 === s ? 29 : M[s - 1];
    }

    for (; f < 0;) {
      f += 60, l--;
    }

    for (; l < 0;) {
      l += 24, c--;
    }

    for (; c < 1;) {
      --s < 1 && (s += 12, r--), c += n = o && 2 === s ? 29 : M[s - 1];
    }

    var T = N(r, s, c, l, f, h, E);
    return A(t) ? (O(T[0], T[1], t), g(t)) : t = new I(T[0], T[1], C.UTC), y && I.addSeconds(t, 1, t), t;
  }, I.now = function (e) {
    return I.fromDate(new Date(), e);
  };
  var B = new I(0, 0, C.TAI);
  return I.toGregorianDate = function (e, t) {
    var r = !1,
        n = T(e, B);
    A(n) || (I.addSeconds(e, -1, B), n = T(B, B), r = !0);
    var o = n.dayNumber,
        i = n.secondsOfDay;
    43200 <= i && (o += 1);

    var a = o + 68569 | 0,
        u = 4 * a / 146097 | 0,
        s = 4e3 * ((a = a - ((146097 * u + 3) / 4 | 0) | 0) + 1) / 1461001 | 0,
        c = 80 * (a = a - (1461 * s / 4 | 0) + 31 | 0) / 2447 | 0,
        l = a - (2447 * c / 80 | 0) | 0,
        f = 2 + c - 12 * (a = c / 11 | 0) | 0,
        h = 100 * (u - 49) + s + a | 0,
        E = i / y.SECONDS_PER_HOUR | 0,
        d = i - E * y.SECONDS_PER_HOUR,
        m = d / y.SECONDS_PER_MINUTE | 0,
        p = 0 | (d -= m * y.SECONDS_PER_MINUTE),
        _ = (d - p) / y.SECONDS_PER_MILLISECOND;

    return 23 < (E += 12) && (E -= 24), r && (p += 1), A(t) ? (t.year = h, t.month = f, t.day = l, t.hour = E, t.minute = m, t.second = p, t.millisecond = _, t.isLeapSecond = r, t) : new R(h, f, l, E, m, p, _, r);
  }, I.toDate = function (e) {
    var t = I.toGregorianDate(e, h),
        r = t.second;
    return t.isLeapSecond && --r, new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, r, t.millisecond));
  }, I.toIso8601 = function (e, t) {
    var r,
        n = I.toGregorianDate(e, h),
        o = n.year,
        i = n.month,
        a = n.day,
        u = n.hour,
        s = n.minute,
        c = n.second,
        l = n.millisecond;
    return 1e4 === o && 1 === i && 1 === a && 0 === u && 0 === s && 0 === c && 0 === l && (o = 9999, i = 12, a = 31, u = 24), A(t) || 0 === l ? A(t) && 0 !== t ? (r = (.01 * l).toFixed(t).replace(".", "").slice(0, t), f("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", o, i, a, u, s, c, r)) : f("%04d-%02d-%02dT%02d:%02d:%02dZ", o, i, a, u, s, c) : (r = (.01 * l).toString().replace(".", ""), f("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", o, i, a, u, s, c, r));
  }, I.clone = function (e, t) {
    if (A(e)) return A(t) ? (t.dayNumber = e.dayNumber, t.secondsOfDay = e.secondsOfDay, t) : new I(e.dayNumber, e.secondsOfDay, C.TAI);
  }, I.compare = function (e, t) {
    var r = e.dayNumber - t.dayNumber;
    return 0 != r ? r : e.secondsOfDay - t.secondsOfDay;
  }, I.equals = function (e, t) {
    return e === t || A(e) && A(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
  }, I.equalsEpsilon = function (e, t, r) {
    return e === t || A(e) && A(t) && Math.abs(I.secondsDifference(e, t)) <= r;
  }, I.totalDays = function (e) {
    return e.dayNumber + e.secondsOfDay / y.SECONDS_PER_DAY;
  }, I.secondsDifference = function (e, t) {
    return (e.dayNumber - t.dayNumber) * y.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
  }, I.daysDifference = function (e, t) {
    return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / y.SECONDS_PER_DAY;
  }, I.computeTaiMinusUtc = function (e) {
    u.julianDate = e;
    var t = I.leapSeconds,
        r = i(t, u, a);
    return r < 0 && (r = ~r, --r < 0 && (r = 0)), t[r].offset;
  }, I.addSeconds = function (e, t, r) {
    return O(e.dayNumber, e.secondsOfDay + t, r);
  }, I.addMinutes = function (e, t, r) {
    var n = e.secondsOfDay + t * y.SECONDS_PER_MINUTE;
    return O(e.dayNumber, n, r);
  }, I.addHours = function (e, t, r) {
    var n = e.secondsOfDay + t * y.SECONDS_PER_HOUR;
    return O(e.dayNumber, n, r);
  }, I.addDays = function (e, t, r) {
    return O(e.dayNumber + t, e.secondsOfDay, r);
  }, I.lessThan = function (e, t) {
    return I.compare(e, t) < 0;
  }, I.lessThanOrEquals = function (e, t) {
    return I.compare(e, t) <= 0;
  }, I.greaterThan = function (e, t) {
    return 0 < I.compare(e, t);
  }, I.greaterThanOrEquals = function (e, t) {
    return 0 <= I.compare(e, t);
  }, I.prototype.clone = function (e) {
    return I.clone(this, e);
  }, I.prototype.equals = function (e) {
    return I.equals(this, e);
  }, I.prototype.equalsEpsilon = function (e, t) {
    return I.equalsEpsilon(this, e, t);
  }, I.prototype.toString = function () {
    return I.toIso8601(this);
  }, I.leapSeconds = [new t(new I(2441317, 43210, C.TAI), 10), new t(new I(2441499, 43211, C.TAI), 11), new t(new I(2441683, 43212, C.TAI), 12), new t(new I(2442048, 43213, C.TAI), 13), new t(new I(2442413, 43214, C.TAI), 14), new t(new I(2442778, 43215, C.TAI), 15), new t(new I(2443144, 43216, C.TAI), 16), new t(new I(2443509, 43217, C.TAI), 17), new t(new I(2443874, 43218, C.TAI), 18), new t(new I(2444239, 43219, C.TAI), 19), new t(new I(2444786, 43220, C.TAI), 20), new t(new I(2445151, 43221, C.TAI), 21), new t(new I(2445516, 43222, C.TAI), 22), new t(new I(2446247, 43223, C.TAI), 23), new t(new I(2447161, 43224, C.TAI), 24), new t(new I(2447892, 43225, C.TAI), 25), new t(new I(2448257, 43226, C.TAI), 26), new t(new I(2448804, 43227, C.TAI), 27), new t(new I(2449169, 43228, C.TAI), 28), new t(new I(2449534, 43229, C.TAI), 29), new t(new I(2450083, 43230, C.TAI), 30), new t(new I(2450630, 43231, C.TAI), 31), new t(new I(2451179, 43232, C.TAI), 32), new t(new I(2453736, 43233, C.TAI), 33), new t(new I(2454832, 43234, C.TAI), 34), new t(new I(2456109, 43235, C.TAI), 35), new t(new I(2457204, 43236, C.TAI), 36), new t(new I(2457754, 43237, C.TAI), 37)], I;
}), define("ThirdParty/Uri", [], function () {
  function r(e) {
    var t;
    e instanceof r ? (this.scheme = e.scheme, this.authority = e.authority, this.path = e.path, this.query = e.query, this.fragment = e.fragment) : e && (t = n.exec(e), this.scheme = t[1], this.authority = t[2], this.path = t[3], this.query = t[4], this.fragment = t[5]);
  }

  function e(e) {
    var t = unescape(e);
    return i.test(t) ? t : e.toUpperCase();
  }

  function t(e, t, r, n) {
    return (t || "") + r.toLowerCase() + (n || "");
  }

  r.prototype.scheme = null, r.prototype.authority = null, r.prototype.path = "", r.prototype.query = null, r.prototype.fragment = null;
  var n = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$");
  r.prototype.getScheme = function () {
    return this.scheme;
  }, r.prototype.getAuthority = function () {
    return this.authority;
  }, r.prototype.getPath = function () {
    return this.path;
  }, r.prototype.getQuery = function () {
    return this.query;
  }, r.prototype.getFragment = function () {
    return this.fragment;
  }, r.prototype.isAbsolute = function () {
    return !!this.scheme && !this.fragment;
  }, r.prototype.isSameDocumentAs = function (e) {
    return e.scheme == this.scheme && e.authority == this.authority && e.path == this.path && e.query == this.query;
  }, r.prototype.equals = function (e) {
    return this.isSameDocumentAs(e) && e.fragment == this.fragment;
  }, r.prototype.normalize = function () {
    this.removeDotSegments(), this.scheme && (this.scheme = this.scheme.toLowerCase()), this.authority && (this.authority = this.authority.replace(a, t).replace(o, e)), this.path && (this.path = this.path.replace(o, e)), this.query && (this.query = this.query.replace(o, e)), this.fragment && (this.fragment = this.fragment.replace(o, e));
  };
  var o = /%[0-9a-z]{2}/gi,
      i = /[a-zA-Z0-9\-\._~]/,
      a = /(.*@)?([^@:]*)(:.*)?/;
  return r.prototype.resolve = function (e) {
    var t = new r();
    return this.scheme ? (t.scheme = this.scheme, t.authority = this.authority, t.path = this.path, t.query = this.query) : (t.scheme = e.scheme, this.authority ? (t.authority = this.authority, t.path = this.path, t.query = this.query) : (t.authority = e.authority, "" == this.path ? (t.path = e.path, t.query = this.query || e.query) : ("/" == this.path.charAt(0) ? t.path = this.path : e.authority && "" == e.path ? t.path = "/" + this.path : t.path = e.path.substring(0, e.path.lastIndexOf("/") + 1) + this.path, t.removeDotSegments(), t.query = this.query))), t.fragment = this.fragment, t;
  }, r.prototype.removeDotSegments = function () {
    var e,
        t = this.path.split("/"),
        r = [],
        n = "" == t[0];

    for (n && t.shift(), "" == t[0] && t.shift(); t.length;) {
      ".." == (e = t.shift()) ? r.pop() : "." != e && r.push(e);
    }

    "." != e && ".." != e || r.push(""), n && r.unshift(""), this.path = r.join("/");
  }, r.prototype.toString = function () {
    var e = "";
    return this.scheme && (e += this.scheme + ":"), this.authority && (e += "//" + this.authority), e += this.path, this.query && (e += "?" + this.query), this.fragment && (e += "#" + this.fragment), e;
  }, r;
}), define("Core/appendForwardSlash", [], function () {
  "use strict";

  return function (e) {
    return 0 !== e.length && "/" === e[e.length - 1] || (e += "/"), e;
  };
}), define("Core/clone", ["./defaultValue"], function (a) {
  "use strict";

  return function e(t, r) {
    if (null === t || "object" != _typeof(t)) return t;
    r = a(r, !1);
    var n,
        o = new t.constructor();

    for (var i in t) {
      t.hasOwnProperty(i) && (n = t[i], r && (n = e(n, r)), o[i] = n);
    }

    return o;
  };
}), define("Core/combine", ["./defaultValue", "./defined"], function (l, f) {
  "use strict";

  return function e(t, r, n) {
    n = l(n, !1);
    var o,
        i,
        a,
        u = {},
        s = f(t),
        c = f(r);
    if (s) for (o in t) {
      t.hasOwnProperty(o) && (i = t[o], c && n && "object" == _typeof(i) && r.hasOwnProperty(o) ? (a = r[o], u[o] = "object" == _typeof(a) ? e(i, a, n) : i) : u[o] = i);
    }
    if (c) for (o in r) {
      r.hasOwnProperty(o) && !u.hasOwnProperty(o) && (a = r[o], u[o] = a);
    }
    return u;
  };
}), define("Core/oneTimeWarning", ["./defaultValue", "./defined", "./DeveloperError"], function (r, n, e) {
  "use strict";

  function t(e, t) {
    n(o[e]) || (o[e] = !0, console.warn(r(t, e)));
  }

  var o = {};
  return t.geometryOutlines = "Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.", t.geometryZIndex = "Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored", t.geometryHeightReference = "Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored", t.geometryExtrudedHeightReference = "Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored", t;
}), define("Core/deprecationWarning", ["./defined", "./DeveloperError", "./oneTimeWarning"], function (e, t, r) {
  "use strict";

  return function (e, t) {
    r(e, t);
  };
}), define("Core/getAbsoluteUri", ["../ThirdParty/Uri", "./defaultValue", "./defined", "./DeveloperError"], function (o, i, a, e) {
  "use strict";

  function n(e, t) {
    var r;
    return "undefined" != typeof document && (r = document), n._implementation(e, t, r);
  }

  return n._implementation = function (e, t, r) {
    if (!a(t)) {
      if (void 0 === r) return e;
      t = i(r.baseURI, r.location.href);
    }

    var n = new o(t);
    return new o(e).resolve(n).toString();
  }, n;
}), define("Core/getBaseUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (o, i, e) {
  "use strict";

  return function (e, t) {
    var r = "",
        n = e.lastIndexOf("/");
    return -1 !== n && (r = e.substring(0, n + 1)), t && (e = new o(e), i(e.query) && (r += "?" + e.query), i(e.fragment) && (r += "#" + e.fragment)), r;
  };
}), define("Core/getExtensionFromUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (o, e, t) {
  "use strict";

  return function (e) {
    var t = new o(e);
    t.normalize();
    var r = t.path,
        n = r.lastIndexOf("/");
    return -1 !== n && (r = r.substr(n + 1)), -1 === (n = r.lastIndexOf(".")) ? "" : r.substr(n + 1);
  };
}), define("Core/isBlobUri", ["./Check"], function (e) {
  "use strict";

  var t = /^blob:/i;
  return function (e) {
    return t.test(e);
  };
}), define("Core/isCrossOriginUrl", ["./defined"], function (n) {
  "use strict";

  var o;
  return function (e) {
    n(o) || (o = document.createElement("a")), o.href = window.location.href;
    var t = o.host,
        r = o.protocol;
    return o.href = e, o.href = o.href, r !== o.protocol || t !== o.host;
  };
}), define("Core/isDataUri", ["./Check"], function (e) {
  "use strict";

  var t = /^data:/i;
  return function (e) {
    return t.test(e);
  };
}), define("Core/loadAndExecuteScript", ["../ThirdParty/when"], function (o) {
  "use strict";

  return function (e) {
    var t = o.defer(),
        r = document.createElement("script");
    r.async = !0, r.src = e;
    var n = document.getElementsByTagName("head")[0];
    return r.onload = function () {
      r.onload = void 0, n.removeChild(r), t.resolve();
    }, r.onerror = function (e) {
      t.reject(e);
    }, n.appendChild(r), t.promise;
  };
}), define("Core/isArray", ["./defined"], function (e) {
  "use strict";

  var t = Array.isArray;
  return e(t) || (t = function t(e) {
    return "[object Array]" === Object.prototype.toString.call(e);
  }), t;
}), define("Core/objectToQuery", ["./defined", "./DeveloperError", "./isArray"], function (e, t, u) {
  "use strict";

  return function (e) {
    var t = "";

    for (var r in e) {
      if (e.hasOwnProperty(r)) {
        var n = e[r],
            o = encodeURIComponent(r) + "=";
        if (u(n)) for (var i = 0, a = n.length; i < a; ++i) {
          t += o + encodeURIComponent(n[i]) + "&";
        } else t += o + encodeURIComponent(n) + "&";
      }
    }

    return t.slice(0, -1);
  };
}), define("Core/queryToObject", ["./defined", "./DeveloperError", "./isArray"], function (c, e, l) {
  "use strict";

  return function (e) {
    var t = {};
    if ("" === e) return t;

    for (var r = e.replace(/\+/g, "%20").split(/[&;]/), n = 0, o = r.length; n < o; ++n) {
      var i = r[n].split("="),
          a = decodeURIComponent(i[0]),
          u = i[1],
          u = c(u) ? decodeURIComponent(u) : "",
          s = t[a];
      "string" == typeof s ? t[a] = [s, u] : l(s) ? s.push(u) : t[a] = u;
    }

    return t;
  };
}), define("Core/RequestState", ["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    UNISSUED: 0,
    ISSUED: 1,
    ACTIVE: 2,
    RECEIVED: 3,
    CANCELLED: 4,
    FAILED: 5
  });
}), define("Core/RequestType", ["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    TERRAIN: 0,
    IMAGERY: 1,
    TILES3D: 2,
    OTHER: 3
  });
}), define("Core/Request", ["./defaultValue", "./defined", "./RequestState", "./RequestType"], function (n, t, o, i) {
  "use strict";

  function r(e) {
    e = n(e, n.EMPTY_OBJECT);
    var t = n(e.throttleByServer, !1),
        r = t || n(e.throttle, !1);
    this.url = e.url, this.requestFunction = e.requestFunction, this.cancelFunction = e.cancelFunction, this.priorityFunction = e.priorityFunction, this.priority = n(e.priority, 0), this.throttle = r, this.throttleByServer = t, this.type = n(e.type, i.OTHER), this.serverKey = void 0, this.state = o.UNISSUED, this.deferred = void 0, this.cancelled = !1;
  }

  return r.prototype.cancel = function () {
    this.cancelled = !0;
  }, r.prototype.clone = function (e) {
    return t(e) ? (e.url = this.url, e.requestFunction = this.requestFunction, e.cancelFunction = this.cancelFunction, e.priorityFunction = this.priorityFunction, e.priority = this.priority, e.throttle = this.throttle, e.throttleByServer = this.throttleByServer, e.type = this.type, e.serverKey = this.serverKey, e.state = this.RequestState.UNISSUED, e.deferred = void 0, e.cancelled = !1, e) : new r(this);
  }, r;
}), define("Core/parseResponseHeaders", [], function () {
  "use strict";

  return function (e) {
    var t = {};
    if (!e) return t;

    for (var r = e.split("\r\n"), n = 0; n < r.length; ++n) {
      var o,
          i,
          a = r[n],
          u = a.indexOf(": ");
      0 < u && (o = a.substring(0, u), i = a.substring(u + 2), t[o] = i);
    }

    return t;
  };
}), define("Core/RequestErrorEvent", ["./defined", "./parseResponseHeaders"], function (t, n) {
  "use strict";

  function e(e, t, r) {
    this.statusCode = e, this.response = t, this.responseHeaders = r, "string" == typeof this.responseHeaders && (this.responseHeaders = n(this.responseHeaders));
  }

  return e.prototype.toString = function () {
    var e = "Request has failed.";
    return t(this.statusCode) && (e += " Status Code: " + this.statusCode), e;
  }, e;
}), define("Core/Event", ["./Check", "./defined", "./defineProperties"], function (e, u, t) {
  "use strict";

  function r() {
    this._listeners = [], this._scopes = [], this._toRemove = [], this._insideRaiseEvent = !1;
  }

  function s(e, t) {
    return t - e;
  }

  return t(r.prototype, {
    numberOfListeners: {
      get: function get() {
        return this._listeners.length - this._toRemove.length;
      }
    }
  }), r.prototype.addEventListener = function (e, t) {
    this._listeners.push(e), this._scopes.push(t);
    var r = this;
    return function () {
      r.removeEventListener(e, t);
    };
  }, r.prototype.removeEventListener = function (e, t) {
    for (var r = this._listeners, n = this._scopes, o = -1, i = 0; i < r.length; i++) {
      if (r[i] === e && n[i] === t) {
        o = i;
        break;
      }
    }

    return -1 !== o && (this._insideRaiseEvent ? (this._toRemove.push(o), r[o] = void 0, n[o] = void 0) : (r.splice(o, 1), n.splice(o, 1)), !0);
  }, r.prototype.raiseEvent = function () {
    this._insideRaiseEvent = !0;

    for (var e = this._listeners, t = this._scopes, r = e.length, n = 0; n < r; n++) {
      var o = e[n];
      u(o) && e[n].apply(t[n], arguments);
    }

    var i = this._toRemove;

    if (0 < (r = i.length)) {
      for (i.sort(s), n = 0; n < r; n++) {
        var a = i[n];
        e.splice(a, 1), t.splice(a, 1);
      }

      i.length = 0;
    }

    this._insideRaiseEvent = !1;
  }, r;
}), define("Core/Heap", ["./Check", "./defaultValue", "./defined", "./defineProperties"], function (e, s, u, t) {
  "use strict";

  function r(e) {
    this._comparator = e.comparator, this._array = [], this._length = 0, this._maximumLength = void 0;
  }

  function c(e, t, r) {
    var n = e[t];
    e[t] = e[r], e[r] = n;
  }

  return t(r.prototype, {
    length: {
      get: function get() {
        return this._length;
      }
    },
    internalArray: {
      get: function get() {
        return this._array;
      }
    },
    maximumLength: {
      get: function get() {
        return this._maximumLength;
      },
      set: function set(e) {
        this._maximumLength = e, this._length > e && 0 < e && (this._length = e, this._array.length = e);
      }
    },
    comparator: {
      get: function get() {
        return this._comparator;
      }
    }
  }), r.prototype.reserve = function (e) {
    e = s(e, this._length), this._array.length = e;
  }, r.prototype.heapify = function (e) {
    e = s(e, 0);

    for (var t = this._length, r = this._comparator, n = this._array, o = -1, i = !0; i;) {
      var a = 2 * (e + 1),
          u = a - 1,
          o = u < t && r(n[u], n[e]) < 0 ? u : e;
      a < t && r(n[a], n[o]) < 0 && (o = a), o !== e ? (c(n, o, e), e = o) : i = !1;
    }
  }, r.prototype.resort = function () {
    for (var e = this._length, t = Math.ceil(e / 2); 0 <= t; --t) {
      this.heapify(t);
    }
  }, r.prototype.insert = function (e) {
    var t,
        r = this._array,
        n = this._comparator,
        o = this._maximumLength,
        i = this._length++;

    for (i < r.length ? r[i] = e : r.push(e); 0 !== i;) {
      var a = Math.floor((i - 1) / 2);
      if (!(n(r[i], r[a]) < 0)) break;
      c(r, i, a), i = a;
    }

    return u(o) && this._length > o && (t = r[o], this._length = o), t;
  }, r.prototype.pop = function (e) {
    if (e = s(e, 0), 0 !== this._length) {
      var t = this._array,
          r = t[e];
      return c(t, e, --this._length), this.heapify(e), r;
    }
  }, r;
}), define("Core/RequestScheduler", ["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Event", "./Heap", "./isBlobUri", "./isDataUri", "./RequestState"], function (o, t, e, r, i, n, a, u, s, c, l) {
  "use strict";

  function f() {}

  function h(e) {
    i(e.priorityFunction) && (e.priority = e.priorityFunction());
  }

  function E(e) {
    var t = r(f.requestsByServer[e], f.maximumRequestsPerServer);
    return S[e] < t;
  }

  function d(e) {
    return e.state === l.UNISSUED && (e.state = l.ISSUED, e.deferred = t.defer()), e.deferred.promise;
  }

  function m(e) {
    var t,
        r,
        n = d(e);
    return e.state = l.ACTIVE, A.push(e), ++R.numberOfActiveRequests, ++R.numberOfActiveRequestsEver, ++S[e.serverKey], e.requestFunction().then((r = e, function (e) {
      r.state !== l.CANCELLED && (--R.numberOfActiveRequests, --S[r.serverKey], g.raiseEvent(), r.state = l.RECEIVED, r.deferred.resolve(e));
    })).otherwise((t = e, function (e) {
      t.state !== l.CANCELLED && (++R.numberOfFailedRequests, --R.numberOfActiveRequests, --S[t.serverKey], g.raiseEvent(e), t.state = l.FAILED, t.deferred.reject(e));
    })), n;
  }

  function p(e) {
    var t = e.state === l.ACTIVE;
    e.state = l.CANCELLED, ++R.numberOfCancelledRequests, e.deferred.reject(), t && (--R.numberOfActiveRequests, --S[e.serverKey], ++R.numberOfCancelledActiveRequests), i(e.cancelFunction) && e.cancelFunction();
  }

  function _() {
    f.debugShowStatistics && (0 < R.numberOfAttemptedRequests && console.log("Number of attempted requests: " + R.numberOfAttemptedRequests), 0 < R.numberOfActiveRequests && console.log("Number of active requests: " + R.numberOfActiveRequests), 0 < R.numberOfCancelledRequests && console.log("Number of cancelled requests: " + R.numberOfCancelledRequests), 0 < R.numberOfCancelledActiveRequests && console.log("Number of cancelled active requests: " + R.numberOfCancelledActiveRequests), 0 < R.numberOfFailedRequests && console.log("Number of failed requests: " + R.numberOfFailedRequests), R.numberOfAttemptedRequests = 0, R.numberOfCancelledRequests = 0, R.numberOfCancelledActiveRequests = 0);
  }

  var R = {
    numberOfAttemptedRequests: 0,
    numberOfActiveRequests: 0,
    numberOfCancelledRequests: 0,
    numberOfCancelledActiveRequests: 0,
    numberOfFailedRequests: 0,
    numberOfActiveRequestsEver: 0
  },
      y = 20,
      T = new u({
    comparator: function comparator(e, t) {
      return e.priority - t.priority;
    }
  });
  T.maximumLength = y, T.reserve(y);
  var A = [],
      S = {},
      C = "undefined" != typeof document ? new o(document.location.href) : new o(),
      g = new a();
  return f.maximumRequests = 50, f.maximumRequestsPerServer = 6, f.requestsByServer = {
    "api.pgEarth.com:443": 18,
    "assets.pgEarth.com:443": 18
  }, f.throttleRequests = !0, f.debugShowStatistics = !1, f.requestCompletedEvent = g, n(f, {
    statistics: {
      get: function get() {
        return R;
      }
    },
    priorityHeapLength: {
      get: function get() {
        return y;
      },
      set: function set(e) {
        if (e < y) for (; T.length > e;) {
          p(T.pop());
        }
        y = e, T.maximumLength = e, T.reserve(e);
      }
    }
  }), f.update = function () {
    for (var e, t = 0, r = A.length, n = 0; n < r; ++n) {
      (e = A[n]).cancelled && p(e), e.state === l.ACTIVE ? 0 < t && (A[n - t] = e) : ++t;
    }

    A.length -= t;
    var o = T.internalArray,
        i = T.length;

    for (n = 0; n < i; ++n) {
      h(o[n]);
    }

    T.resort();

    for (var a = Math.max(f.maximumRequests - A.length, 0), u = 0; u < a && 0 < T.length;) {
      !(e = T.pop()).cancelled && (!e.throttleByServer || E(e.serverKey)) ? (m(e), ++u) : p(e);
    }

    _();
  }, f.getServerKey = function (e) {
    var t = new o(e).resolve(C);
    t.normalize();
    var r = t.authority;
    /:/.test(r) || (r = r + ":" + ("https" === t.scheme ? "443" : "80"));
    var n = S[r];
    return i(n) || (S[r] = 0), r;
  }, f.request = function (e) {
    if (c(e.url) || s(e.url)) return g.raiseEvent(), e.state = l.RECEIVED, e.requestFunction();
    if (++R.numberOfAttemptedRequests, i(e.serverKey) || (e.serverKey = f.getServerKey(e.url)), !f.throttleRequests || !e.throttle) return m(e);

    if (!(A.length >= f.maximumRequests) && (!e.throttleByServer || E(e.serverKey))) {
      h(e);
      var t = T.insert(e);

      if (i(t)) {
        if (t === e) return;
        p(t);
      }

      return d(e);
    }
  }, f.clearForSpecs = function () {
    for (; 0 < T.length;) {
      p(T.pop());
    }

    for (var e = A.length, t = 0; t < e; ++t) {
      p(A[t]);
    }

    A.length = 0, S = {}, R.numberOfAttemptedRequests = 0, R.numberOfActiveRequests = 0, R.numberOfCancelledRequests = 0, R.numberOfCancelledActiveRequests = 0, R.numberOfFailedRequests = 0, R.numberOfActiveRequestsEver = 0;
  }, f.numberOfActiveRequestsByServer = function (e) {
    return S[e];
  }, f.requestHeap = T, f;
}), define("Core/TrustedServers", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (o, i, e) {
  "use strict";

  var t = {},
      n = {};
  return t.add = function (e, t) {
    var r = e.toLowerCase() + ":" + t;
    i(n[r]) || (n[r] = !0);
  }, t.remove = function (e, t) {
    var r = e.toLowerCase() + ":" + t;
    i(n[r]) && delete n[r];
  }, t.contains = function (e) {
    var t = function (e) {
      var t = new o(e);
      t.normalize();
      var r = t.getAuthority();

      if (i(r)) {
        if (-1 !== r.indexOf("@") && (r = r.split("@")[1]), -1 === r.indexOf(":")) {
          var n = t.getScheme();
          if (i(n) || (n = (n = window.location.protocol).substring(0, n.length - 1)), "http" === n) r += ":80";else {
            if ("https" !== n) return;
            r += ":443";
          }
        }

        return r;
      }
    }(e);

    return !(!i(t) || !i(n[t]));
  }, t.clear = function () {
    n = {};
  }, t;
}), define("Core/Resource", ["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./deprecationWarning", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (h, f, e, r, u, E, T, A, t, n, o, i, a, s, c, l, d, m, p, _, R, y, S, C, g, O, N) {
  "use strict";

  function I(e, t, r, n) {
    var o,
        i,
        a = e.query;
    if (!A(a) || 0 === a.length) return 1;
    o = -1 === a.indexOf("=") ? ((i = {})[a] = void 0, i) : R(a), t._queryParameters = r ? w(o, t._queryParameters, n) : o, e.query = void 0;
  }

  function M(e, t) {
    return A(e) ? A(e.clone) ? e.clone() : u(e) : t;
  }

  function v(e) {
    if (e.state === g.ISSUED || e.state === g.ACTIVE) throw new O("The Resource is already being fetched.");
    e.state = g.UNISSUED, e.deferred = void 0;
  }

  function w(e, t, r) {
    if (!r) return E(e, t);
    var n,
        o,
        i = u(e, !0);

    for (var a in t) {
      t.hasOwnProperty(a) && (n = i[a], o = t[a], A(n) ? (Array.isArray(n) || (n = i[a] = [n]), i[a] = n.concat(o)) : i[a] = Array.isArray(o) ? o.slice() : o);
    }

    return i;
  }

  function D(e) {
    "string" == typeof (e = T(e, T.EMPTY_OBJECT)) && (e = {
      url: e
    }), this._url = void 0, this._templateValues = M(e.templateValues, {}), this._queryParameters = M(e.queryParameters, {}), this.headers = M(e.headers, {}), this.request = T(e.request, new y()), this.proxy = e.proxy, this.retryCallback = e.retryCallback, this.retryAttempts = T(e.retryAttempts, 0), this._retryCount = 0;
    var t = new h(e.url);
    I(t, this, !0, !0), t.fragment = void 0, this._url = t.toString();
  }

  function P(n) {
    var r = n.request;
    r.url = n.url, r.requestFunction = function () {
      var e = n.url,
          t = !1;
      n.isDataUri || n.isBlobUri || (t = n.isCrossOriginUrl);
      var r = f.defer();
      return D._Implementations.createImage(e, t, r), r.promise;
    };
    var e = C.request(r);
    if (A(e)) return e.otherwise(function (t) {
      return r.state !== g.FAILED ? f.reject(t) : n.retryOnError(t).then(function (e) {
        return e ? (r.state = g.UNISSUED, r.deferred = void 0, P(n)) : f.reject(t);
      });
    });
  }

  function F(e, t) {
    var r = decodeURIComponent(t);
    return e ? atob(r) : r;
  }

  function U(e, t) {
    for (var r = F(e, t), n = new ArrayBuffer(r.length), o = new Uint8Array(n), i = 0; i < r.length; i++) {
      o[i] = r.charCodeAt(i);
    }

    return n;
  }

  function L(e, t) {
    switch (t) {
      case "text":
        return e.toString("utf8");

      case "json":
        return JSON.parse(e.toString("utf8"));

      default:
        return new Uint8Array(e).buffer;
    }
  }

  var x = function () {
    try {
      var e = new XMLHttpRequest();
      return e.open("GET", "#", !0), (e.responseType = "blob") === e.responseType;
    } catch (e) {
      return !1;
    }
  }();

  D.createIfNeeded = function (e) {
    return e instanceof D ? e.getDerivedResource({
      request: e.request
    }) : "string" != typeof e ? e : new D({
      url: e
    });
  }, t(D, {
    isBlobSupported: {
      get: function get() {
        return x;
      }
    }
  }), t(D.prototype, {
    queryParameters: {
      get: function get() {
        return this._queryParameters;
      }
    },
    templateValues: {
      get: function get() {
        return this._templateValues;
      }
    },
    url: {
      get: function get() {
        return this.getUrlComponent(!0, !0);
      },
      set: function set(e) {
        var t = new h(e);
        I(t, this, !1), t.fragment = void 0, this._url = t.toString();
      }
    },
    extension: {
      get: function get() {
        return c(this._url);
      }
    },
    isDataUri: {
      get: function get() {
        return m(this._url);
      }
    },
    isBlobUri: {
      get: function get() {
        return l(this._url);
      }
    },
    isCrossOriginUrl: {
      get: function get() {
        return d(this._url);
      }
    },
    hasHeaders: {
      get: function get() {
        return 0 < Object.keys(this.headers).length;
      }
    }
  }), D.prototype.getUrlComponent = function (e, t) {
    if (this.isDataUri) return this._url;
    var r,
        n,
        o,
        i = new h(this._url);
    e && (r = i, n = this._queryParameters, 1 !== (o = Object.keys(n)).length || A(n[o[0]]) ? r.query = _(n) : r.query = o[0]);
    var a = i.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
        u = this._templateValues,
        s = Object.keys(u);
    if (0 < s.length) for (var c = 0; c < s.length; c++) {
      var l = s[c],
          f = u[l],
          a = a.replace(new RegExp("{" + l + "}", "g"), encodeURIComponent(f));
    }
    return t && A(this.proxy) && (a = this.proxy.getURL(a)), a;
  }, D.prototype.setQueryParameters = function (e, t) {
    this._queryParameters = t ? w(this._queryParameters, e, !1) : w(e, this._queryParameters, !1);
  }, D.prototype.addQueryParameters = function (e, t) {
    return n("Resource.addQueryParameters", "addQueryParameters has been deprecated and will be removed 1.45. Use setQueryParameters or appendQueryParameters instead."), this.setQueryParameters(e, t);
  }, D.prototype.appendQueryParameters = function (e) {
    this._queryParameters = w(e, this._queryParameters, !0);
  }, D.prototype.setTemplateValues = function (e, t) {
    this._templateValues = t ? E(this._templateValues, e) : E(e, this._templateValues);
  }, D.prototype.addTemplateValues = function (e, t) {
    return n("Resource.addTemplateValues", "addTemplateValues has been deprecated and will be removed 1.45. Use setTemplateValues."), this.setTemplateValues(e, t);
  }, D.prototype.getDerivedResource = function (e) {
    var t,
        r = this.clone();
    return r._retryCount = 0, A(e.url) && (I(t = new h(e.url), r, !0, T(e.preserveQueryParameters, !1)), t.fragment = void 0, r._url = t.resolve(new h(a(this._url))).toString()), A(e.queryParameters) && (r._queryParameters = E(e.queryParameters, r._queryParameters)), A(e.templateValues) && (r._templateValues = E(e.templateValues, r.templateValues)), A(e.headers) && (r.headers = E(e.headers, r.headers)), A(e.proxy) && (r.proxy = e.proxy), A(e.request) && (r.request = e.request), A(e.retryCallback) && (r.retryCallback = e.retryCallback), A(e.retryAttempts) && (r.retryAttempts = e.retryAttempts), r;
  }, D.prototype.retryOnError = function (e) {
    var t = this.retryCallback;
    if ("function" != typeof t || this._retryCount >= this.retryAttempts) return f(!1);
    var r = this;
    return f(t(this, e)).then(function (e) {
      return ++r._retryCount, e;
    });
  }, D.prototype.clone = function (e) {
    return A(e) || (e = new D({
      url: this._url
    })), e._url = this._url, e._queryParameters = u(this._queryParameters), e._templateValues = u(this._templateValues), e.headers = u(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
  }, D.prototype.getBaseUri = function (e) {
    return s(this.getUrlComponent(e), e);
  }, D.prototype.appendForwardSlash = function () {
    this._url = e(this._url);
  }, D.prototype.fetchArrayBuffer = function () {
    return this.fetch({
      responseType: "arraybuffer"
    });
  }, D.fetchArrayBuffer = function (e) {
    return new D(e).fetchArrayBuffer();
  }, D.prototype.fetchBlob = function () {
    return this.fetch({
      responseType: "blob"
    });
  }, D.fetchBlob = function (e) {
    return new D(e).fetchBlob();
  }, D.prototype.fetchImage = function (e) {
    if (e = T(e, !1), v(this.request), !x || this.isDataUri || this.isBlobUri || !this.hasHeaders && !e) return P(this);
    var r,
        n,
        t = this.fetchBlob();
    return A(t) ? t.then(function (e) {
      if (A(e)) {
        n = e;
        var t = window.URL.createObjectURL(e);
        return P(r = new D({
          url: t
        }));
      }
    }).then(function (e) {
      if (A(e)) return window.URL.revokeObjectURL(r.url), e.blob = n, e;
    }).otherwise(function (e) {
      return A(r) && window.URL.revokeObjectURL(r.url), f.reject(e);
    }) : void 0;
  }, D.fetchImage = function (e) {
    return new D(e).fetchImage(e.preferBlob);
  }, D.prototype.fetchText = function () {
    return this.fetch({
      responseType: "text"
    });
  }, D.fetchText = function (e) {
    return new D(e).fetchText();
  }, D.prototype.fetchJson = function () {
    var e = this.fetch({
      responseType: "text",
      headers: {
        Accept: "application/json,*/*;q=0.01"
      }
    });
    if (A(e)) return e.then(function (e) {
      if (A(e)) return JSON.parse(e);
    });
  }, D.fetchJson = function (e) {
    return new D(e).fetchJson();
  }, D.prototype.fetchXML = function () {
    return this.fetch({
      responseType: "document",
      overrideMimeType: "text/xml"
    });
  }, D.fetchXML = function (e) {
    return new D(e).fetchXML();
  }, D.prototype.fetchJsonp = function (e) {
    var t;

    for (e = T(e, "callback"), v(this.request); t = "loadJsonp" + Math.random().toString().substring(2, 8), A(window[t]);) {
      ;
    }

    return function r(n, o, i) {
      var e = {};
      e[o] = i, n.setQueryParameters(e);
      var a = n.request;
      a.url = n.url, a.requestFunction = function () {
        var t = f.defer();
        return window[i] = function (e) {
          t.resolve(e);

          try {
            delete window[i];
          } catch (e) {
            window[i] = void 0;
          }
        }, D._Implementations.loadAndExecuteScript(n.url, i, t), t.promise;
      };
      var t = C.request(a);
      if (A(t)) return t.otherwise(function (t) {
        return a.state !== g.FAILED ? f.reject(t) : n.retryOnError(t).then(function (e) {
          return e ? (a.state = g.UNISSUED, a.deferred = void 0, r(n, o, i)) : f.reject(t);
        });
      });
    }(this, e, t);
  }, D.fetchJsonp = function (e) {
    return new D(e).fetchJsonp(e.callbackParameterName);
  }, D.prototype._makeRequest = function (s) {
    var c = this;
    v(c.request);
    var l = c.request;
    l.url = c.url, l.requestFunction = function () {
      var e = s.responseType,
          t = E(s.headers, c.headers),
          r = s.overrideMimeType,
          n = s.method,
          o = s.data,
          i = f.defer(),
          a = c.url.replace(/\+/g, "%2B"),
          u = D._Implementations.loadWithXhr(a, e, n, o, t, i, r);

      return A(u) && A(u.abort) && (l.cancelFunction = function () {
        u.abort();
      }), i.promise;
    };
    var e = C.request(l);
    if (A(e)) return e.then(function (e) {
      return e;
    }).otherwise(function (t) {
      return l.state !== g.FAILED ? f.reject(t) : c.retryOnError(t).then(function (e) {
        return e ? (l.state = g.UNISSUED, l.deferred = void 0, c.fetch(s)) : f.reject(t);
      });
    });
  };
  var B = /^data:(.*?)(;base64)?,(.*)$/;
  D.prototype.fetch = function (e) {
    return (e = M(e, {})).method = "GET", this._makeRequest(e);
  }, D.fetch = function (e) {
    return new D(e).fetch({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, D.prototype["delete"] = function (e) {
    return (e = M(e, {})).method = "DELETE", this._makeRequest(e);
  }, D["delete"] = function (e) {
    return new D(e)["delete"]({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType,
      data: e.data
    });
  }, D.prototype.head = function (e) {
    return (e = M(e, {})).method = "HEAD", this._makeRequest(e);
  }, D.head = function (e) {
    return new D(e).head({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, D.prototype.options = function (e) {
    return (e = M(e, {})).method = "OPTIONS", this._makeRequest(e);
  }, D.options = function (e) {
    return new D(e).options({
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, D.prototype.post = function (e, t) {
    return r.defined("data", e), (t = M(t, {})).method = "POST", t.data = e, this._makeRequest(t);
  }, D.post = function (e) {
    return new D(e).post(e.data, {
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, D.prototype.put = function (e, t) {
    return r.defined("data", e), (t = M(t, {})).method = "PUT", t.data = e, this._makeRequest(t);
  }, D.put = function (e) {
    return new D(e).put(e.data, {
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, D.prototype.patch = function (e, t) {
    return r.defined("data", e), (t = M(t, {})).method = "PATCH", t.data = e, this._makeRequest(t);
  }, D.patch = function (e) {
    return new D(e).patch(e.data, {
      responseType: e.responseType,
      overrideMimeType: e.overrideMimeType
    });
  }, (D._Implementations = {}).createImage = function (e, t, r) {
    var n = new Image();
    n.onload = function () {
      r.resolve(n);
    }, n.onerror = function (e) {
      r.reject(e);
    }, t && (N.contains(e) ? n.crossOrigin = "use-credentials" : n.crossOrigin = ""), n.src = e;
  };
  var b = "undefined" == typeof XMLHttpRequest;
  return D._Implementations.loadWithXhr = function (e, o, i, t, r, a, n) {
    var u = B.exec(e);

    if (null === u) {
      if (b) return s = e, c = o, l = i, f = r, h = a, E = require("url").parse(s), d = "https:" === E.protocol ? require("https") : require("http"), m = require("zlib"), p = {
        protocol: E.protocol,
        hostname: E.hostname,
        port: E.port,
        path: E.path,
        query: E.query,
        method: l,
        headers: f
      }, void d.request(p).on("response", function (t) {
        var r;
        t.statusCode < 200 || 300 <= t.statusCode ? h.reject(new S(t.statusCode, t, t.headers)) : (r = [], t.on("data", function (e) {
          r.push(e);
        }), t.on("end", function () {
          var e = Buffer.concat(r);
          "gzip" === t.headers["content-encoding"] ? m.gunzip(e, function (e, t) {
            e ? h.reject(new O("Error decompressing response.")) : h.resolve(L(t, c));
          }) : h.resolve(L(e, c));
        }));
      }).on("error", function (e) {
        h.reject(new S());
      }).end();

      var s,
          c,
          l,
          f,
          h,
          E,
          d,
          m,
          p,
          _ = new XMLHttpRequest();

      if (N.contains(e) && (_.withCredentials = !0), _.open(i, e, !0), A(n) && A(_.overrideMimeType) && _.overrideMimeType(n), A(r)) for (var R in r) {
        r.hasOwnProperty(R) && _.setRequestHeader(R, r[R]);
      }
      A(o) && (_.responseType = o);
      var y = !1;
      return "string" == typeof e && (y = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), _.onload = function () {
        if (!(_.status < 200 || 300 <= _.status) || y && 0 === _.status) {
          var e = _.response,
              t = _.responseType;

          if ("HEAD" === i || "OPTIONS" === i) {
            var r = _.getAllResponseHeaders().trim().split(/[\r\n]+/),
                n = {};

            return r.forEach(function (e) {
              var t = e.split(": "),
                  r = t.shift();
              n[r] = t.join(": ");
            }), void a.resolve(n);
          }

          if (204 === _.status) a.resolve();else if (!A(e) || A(o) && t !== o) {
            if ("json" === o && "string" == typeof e) try {
              a.resolve(JSON.parse(e));
            } catch (e) {
              a.reject(e);
            } else ("" === t || "document" === t) && A(_.responseXML) && _.responseXML.hasChildNodes() ? a.resolve(_.responseXML) : "" !== t && "text" !== t || !A(_.responseText) ? a.reject(new O("Invalid XMLHttpRequest response type.")) : a.resolve(_.responseText);
          } else a.resolve(e);
        } else a.reject(new S(_.status, _.response, _.getAllResponseHeaders()));
      }, _.onerror = function (e) {
        a.reject(new S());
      }, _.send(t), _;
    }

    a.resolve(function (e, t) {
      t = T(t, "");
      var r = e[1],
          n = !!e[2],
          o = e[3];

      switch (t) {
        case "":
        case "text":
          return F(n, o);

        case "arraybuffer":
          return U(n, o);

        case "blob":
          var i = U(n, o);
          return new Blob([i], {
            type: r
          });

        case "document":
          return new DOMParser().parseFromString(F(n, o), r);

        case "json":
          return JSON.parse(F(n, o));
      }
    }(u, o));
  }, D._Implementations.loadAndExecuteScript = function (e, t, r) {
    return p(e, t).otherwise(r.reject);
  }, (D._DefaultImplementations = {}).createImage = D._Implementations.createImage, D._DefaultImplementations.loadWithXhr = D._Implementations.loadWithXhr, D._DefaultImplementations.loadAndExecuteScript = D._Implementations.loadAndExecuteScript, D.DEFAULT = i(new D({
    url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
  })), D;
}), define("Core/EarthOrientationParameters", ["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (n, S, o, C, h, e, g, O, i, E, N, I) {
  "use strict";

  function t(e) {
    var t, r;
    e = o(e, o.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = o(e.addNewLeapSeconds, !0), C(e.data) ? a(this, e.data) : C(e.url) ? (t = i.createIfNeeded(e.url), (r = this)._downloadPromise = n(t.fetchJson(), function (e) {
      a(r, e);
    }, function () {
      r._dataError = "An error occurred while retrieving the EOP data from the URL " + t.url + ".";
    })) : a(this, {
      columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
      samples: []
    });
  }

  function M(e, t) {
    return g.compare(e.julianDate, t);
  }

  function a(e, t) {
    if (!C(t.columnNames)) return e._dataError = "Error in loaded EOP data: The columnNames property is required.", 0;
    if (!C(t.samples)) return e._dataError = "Error in loaded EOP data: The samples property is required.", 0;
    var r = t.columnNames.indexOf("modifiedJulianDateUtc"),
        n = t.columnNames.indexOf("xPoleWanderRadians"),
        o = t.columnNames.indexOf("yPoleWanderRadians"),
        i = t.columnNames.indexOf("ut1MinusUtcSeconds"),
        a = t.columnNames.indexOf("xCelestialPoleOffsetRadians"),
        u = t.columnNames.indexOf("yCelestialPoleOffsetRadians"),
        s = t.columnNames.indexOf("taiMinusUtcSeconds");
    if (r < 0 || n < 0 || o < 0 || i < 0 || a < 0 || u < 0 || s < 0) return e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns", 0;
    var c = e._samples = t.samples,
        l = e._dates = [];
    e._dateColumn = r, e._xPoleWanderRadiansColumn = n, e._yPoleWanderRadiansColumn = o, e._ut1MinusUtcSecondsColumn = i, e._xCelestialPoleOffsetRadiansColumn = a, e._yCelestialPoleOffsetRadiansColumn = u, e._taiMinusUtcSecondsColumn = s, e._columnCount = t.columnNames.length, e._lastIndex = void 0;

    for (var f, h = e._addNewLeapSeconds, E = 0, d = c.length; E < d; E += e._columnCount) {
      var m,
          p,
          _,
          R = c[E + r],
          y = c[E + s],
          T = R + N.MODIFIED_JULIAN_DATE_DIFFERENCE,
          A = new g(T, y, I.TAI);

      l.push(A), h && (y !== f && C(f) && (m = g.leapSeconds, (p = S(m, A, M)) < 0 && (_ = new O(A, y), m.splice(~p, 0, _))), f = y);
    }
  }

  function R(e, t, r, n, o) {
    var i = r * n;
    o.xPoleWander = t[i + e._xPoleWanderRadiansColumn], o.yPoleWander = t[i + e._yPoleWanderRadiansColumn], o.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn], o.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn], o.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn];
  }

  function y(e, t, r) {
    return t + e * (r - t);
  }

  function d(e, t, r, n, o, i, a) {
    var u = e._columnCount;
    if (i > t.length - 1) return a.xPoleWander = 0, a.yPoleWander = 0, a.xPoleOffset = 0, a.yPoleOffset = 0, a.ut1MinusUtc = 0, a;
    var s = t[o],
        c = t[i];
    if (s.equals(c) || n.equals(s)) return R(e, r, o, u, a), a;
    if (n.equals(c)) return R(e, r, i, u, a), a;

    var l,
        f,
        h = g.secondsDifference(n, s) / g.secondsDifference(c, s),
        E = o * u,
        d = i * u,
        m = r[E + e._ut1MinusUtcSecondsColumn],
        p = r[d + e._ut1MinusUtcSecondsColumn],
        _ = p - m;

    return !(.5 < _ || _ < -.5) || (l = r[E + e._taiMinusUtcSecondsColumn]) !== (f = r[d + e._taiMinusUtcSecondsColumn]) && (c.equals(n) ? m = p : p -= f - l), a.xPoleWander = y(h, r[E + e._xPoleWanderRadiansColumn], r[d + e._xPoleWanderRadiansColumn]), a.yPoleWander = y(h, r[E + e._yPoleWanderRadiansColumn], r[d + e._yPoleWanderRadiansColumn]), a.xPoleOffset = y(h, r[E + e._xCelestialPoleOffsetRadiansColumn], r[d + e._xCelestialPoleOffsetRadiansColumn]), a.yPoleOffset = y(h, r[E + e._yCelestialPoleOffsetRadiansColumn], r[d + e._yCelestialPoleOffsetRadiansColumn]), a.ut1MinusUtc = y(h, m, p), a;
  }

  return t.NONE = e({
    getPromiseToLoad: function getPromiseToLoad() {
      return n();
    },
    compute: function compute(e, t) {
      return C(t) ? (t.xPoleWander = 0, t.yPoleWander = 0, t.xPoleOffset = 0, t.yPoleOffset = 0, t.ut1MinusUtc = 0) : t = new h(0, 0, 0, 0, 0), t;
    }
  }), t.prototype.getPromiseToLoad = function () {
    return n(this._downloadPromise);
  }, t.prototype.compute = function (e, t) {
    if (C(this._samples)) {
      if (C(t) || (t = new h(0, 0, 0, 0, 0)), 0 === this._samples.length) return t.xPoleWander = 0, t.yPoleWander = 0, t.xPoleOffset = 0, t.yPoleOffset = 0, t.ut1MinusUtc = 0, t;
      var r = this._dates,
          n = this._lastIndex,
          o = 0,
          i = 0;

      if (C(n)) {
        var a = r[n],
            u = r[n + 1],
            s = g.lessThanOrEquals(a, e),
            c = !C(u),
            l = c || g.greaterThanOrEquals(u, e);
        if (s && l) return o = n, !c && u.equals(e) && ++o, i = o + 1, d(this, r, this._samples, e, o, i, t), t;
      }

      var f = S(r, e, g.compare, this._dateColumn);
      return 0 <= f ? (f < r.length - 1 && r[f + 1].equals(e) && ++f, i = o = f) : (o = (i = ~f) - 1) < 0 && (o = 0), this._lastIndex = o, d(this, r, this._samples, e, o, i, t), t;
    }

    if (C(this._dataError)) throw new E(this._dataError);
  }, t;
}), define("Core/HeadingPitchRoll", ["./defaultValue", "./defined", "./DeveloperError", "./Math"], function (n, u, e, o) {
  "use strict";

  function s(e, t, r) {
    this.heading = n(e, 0), this.pitch = n(t, 0), this.roll = n(r, 0);
  }

  return s.fromQuaternion = function (e, t) {
    u(t) || (t = new s());
    var r = 2 * (e.w * e.y - e.z * e.x),
        n = 1 - 2 * (e.x * e.x + e.y * e.y),
        o = 2 * (e.w * e.x + e.y * e.z),
        i = 1 - 2 * (e.y * e.y + e.z * e.z),
        a = 2 * (e.w * e.z + e.x * e.y);
    return t.heading = -Math.atan2(a, i), t.roll = Math.atan2(o, n), t.pitch = -Math.asin(r), t;
  }, s.fromDegrees = function (e, t, r, n) {
    return u(n) || (n = new s()), n.heading = e * o.RADIANS_PER_DEGREE, n.pitch = t * o.RADIANS_PER_DEGREE, n.roll = r * o.RADIANS_PER_DEGREE, n;
  }, s.clone = function (e, t) {
    if (u(e)) return u(t) ? (t.heading = e.heading, t.pitch = e.pitch, t.roll = e.roll, t) : new s(e.heading, e.pitch, e.roll);
  }, s.equals = function (e, t) {
    return e === t || u(e) && u(t) && e.heading === t.heading && e.pitch === t.pitch && e.roll === t.roll;
  }, s.equalsEpsilon = function (e, t, r, n) {
    return e === t || u(e) && u(t) && o.equalsEpsilon(e.heading, t.heading, r, n) && o.equalsEpsilon(e.pitch, t.pitch, r, n) && o.equalsEpsilon(e.roll, t.roll, r, n);
  }, s.prototype.clone = function (e) {
    return s.clone(this, e);
  }, s.prototype.equals = function (e) {
    return s.equals(this, e);
  }, s.prototype.equalsEpsilon = function (e, t, r) {
    return s.equalsEpsilon(this, e, t, r);
  }, s.prototype.toString = function () {
    return "(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
  }, s;
}), define("Core/buildModuleUrl", ["./defined", "./DeveloperError", "./getAbsoluteUri", "./Resource", "require"], function (t, e, r, n, o) {
  "use strict";

  function i(e) {
    return "undefined" == typeof document ? e : (t(l) || (l = document.createElement("a")), l.href = e, l.href = l.href, l.href);
  }

  function a() {
    return t(f) || (e = "undefined" != typeof PGEARTH_BASE_URL ? PGEARTH_BASE_URL : t(define.amd) && !define.amd.toUrlUndefined && t(o.toUrl) ? r("..", c("Core/buildModuleUrl.js")) : function () {
      for (var e = document.getElementsByTagName("script"), t = 0, r = e.length; t < r; ++t) {
        var n = e[t].getAttribute("src"),
            o = E.exec(n);
        if (null !== o) return o[1];
      }
    }(), (f = new n({
      url: i(e)
    })).appendForwardSlash()), f;
    var e;
  }

  function u(e) {
    return i(o.toUrl("../" + e));
  }

  function s(e) {
    return a().getDerivedResource({
      url: e
    }).url;
  }

  function c(e) {
    return t(h) || (h = t(define.amd) && !define.amd.toUrlUndefined && t(o.toUrl) ? u : s), h(e);
  }

  var l,
      f,
      h,
      E = /((?:.*\/)|^)LSGlobe[\w-]*\.js(?:\W|$)/i;
  return c._pgEarthScriptRegex = E, c._buildModuleUrlFromBaseUrl = s, c._clearBaseResource = function () {
    f = void 0;
  }, c.setBaseUrl = function (e) {
    f = n.DEFAULT.getDerivedResource({
      url: e
    });
  }, c.getPGEarthBaseUrl = a, c;
}), define("Core/Iau2006XysSample", [], function () {
  "use strict";

  return function (e, t, r) {
    this.x = e, this.y = t, this.s = r;
  };
}), define("Core/Iau2006XysData", ["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./Iau2006XysSample", "./JulianDate", "./Resource", "./TimeStandard"], function (h, r, u, R, y, s, c, l) {
  "use strict";

  function e(e) {
    e = u(e, u.EMPTY_OBJECT), this._xysFileUrlTemplate = c.createIfNeeded(e.xysFileUrlTemplate), this._interpolationOrder = u(e.interpolationOrder, 9), this._sampleZeroJulianEphemerisDate = u(e.sampleZeroJulianEphemerisDate, 2442396.5), this._sampleZeroDateTT = new s(this._sampleZeroJulianEphemerisDate, 0, l.TAI), this._stepSizeDays = u(e.stepSizeDays, 1), this._samplesPerXysFile = u(e.samplesPerXysFile, 1e3), this._totalSamples = u(e.totalSamples, 27426), this._samples = new Array(3 * this._totalSamples), this._chunkDownloadsInProgress = [];

    for (var t = this._interpolationOrder, r = this._denominators = new Array(t + 1), n = this._xTable = new Array(t + 1), o = Math.pow(this._stepSizeDays, t), i = 0; i <= t; ++i) {
      r[i] = o, n[i] = i * this._stepSizeDays;

      for (var a = 0; a <= t; ++a) {
        a !== i && (r[i] *= i - a);
      }

      r[i] = 1 / r[i];
    }

    this._work = new Array(t + 1), this._coef = new Array(t + 1);
  }

  function T(e, t, r) {
    var n = o;
    return n.dayNumber = t, n.secondsOfDay = r, s.daysDifference(n, e._sampleZeroDateTT);
  }

  function A(a, u) {
    if (a._chunkDownloadsInProgress[u]) return a._chunkDownloadsInProgress[u];
    var s = h.defer();
    a._chunkDownloadsInProgress[u] = s;
    var e = a._xysFileUrlTemplate,
        t = R(e) ? e.getDerivedResource({
      templateValues: {
        0: u
      }
    }) : new c({
      url: r("Assets/IAU2006_XYS/IAU2006_XYS_" + u + ".json")
    });
    return h(t.fetchJson(), function (e) {
      a._chunkDownloadsInProgress[u] = !1;

      for (var t = a._samples, r = e.samples, n = u * a._samplesPerXysFile * 3, o = 0, i = r.length; o < i; ++o) {
        t[n + o] = r[o];
      }

      s.resolve();
    }), s.promise;
  }

  var o = new s(0, 0, l.TAI);
  return e.prototype.preload = function (e, t, r, n) {
    var o = T(this, e, t),
        i = T(this, r, n),
        a = o / this._stepSizeDays - this._interpolationOrder / 2 | 0;
    a < 0 && (a = 0);
    var u = i / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;
    u >= this._totalSamples && (u = this._totalSamples - 1);

    for (var s = a / this._samplesPerXysFile | 0, c = u / this._samplesPerXysFile | 0, l = [], f = s; f <= c; ++f) {
      l.push(A(this, f));
    }

    return h.all(l);
  }, e.prototype.computeXysRadians = function (e, t, r) {
    var n = T(this, e, t);

    if (!(n < 0)) {
      var o = n / this._stepSizeDays | 0;

      if (!(o >= this._totalSamples)) {
        var i = this._interpolationOrder,
            a = o - (i / 2 | 0);
        a < 0 && (a = 0);
        var u = a + i;
        u >= this._totalSamples && (a = (u = this._totalSamples - 1) - i) < 0 && (a = 0);
        var s = !1,
            c = this._samples;

        if (R(c[3 * a]) || (A(this, a / this._samplesPerXysFile | 0), s = !0), R(c[3 * u]) || (A(this, u / this._samplesPerXysFile | 0), s = !0), !s) {
          R(r) ? (r.x = 0, r.y = 0, r.s = 0) : r = new y(0, 0, 0);

          for (var l, f = n - a * this._stepSizeDays, h = this._work, E = this._denominators, d = this._coef, m = this._xTable, p = 0; p <= i; ++p) {
            h[p] = f - m[p];
          }

          for (p = 0; p <= i; ++p) {
            for (d[p] = 1, l = 0; l <= i; ++l) {
              l !== p && (d[p] *= h[l]);
            }

            d[p] *= E[p];

            var _ = 3 * (a + p);

            r.x += d[p] * c[_++], r.y += d[p] * c[_++], r.s += d[p] * c[_];
          }

          return r;
        }
      }
    }
  }, e;
}), define("Core/Transforms", ["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (u, i, f, a, e, t, c, N, r, n, o, l, s, h, E, I, M, v, d, m, w) {
  "use strict";

  var D = {},
      p = {
    up: {
      south: "east",
      north: "west",
      west: "south",
      east: "north"
    },
    down: {
      south: "west",
      north: "east",
      west: "north",
      east: "south"
    },
    south: {
      up: "west",
      down: "east",
      west: "down",
      east: "up"
    },
    north: {
      up: "east",
      down: "west",
      west: "up",
      east: "down"
    },
    west: {
      up: "north",
      down: "south",
      north: "down",
      south: "up"
    },
    east: {
      up: "south",
      down: "north",
      north: "up",
      south: "down"
    }
  },
      _ = {
    north: [-1, 0, 0],
    east: [0, 1, 0],
    up: [0, 0, 1],
    south: [1, 0, 0],
    west: [0, -1, 0],
    down: [0, 0, -1]
  },
      R = {},
      y = {
    east: new f(),
    north: new f(),
    up: new f(),
    west: new f(),
    south: new f(),
    down: new f()
  },
      T = new f(),
      A = new f(),
      S = new f();
  D.localFrameToFixedFrameGenerator = function (a, u) {
    if (!p.hasOwnProperty(a) || !p[a].hasOwnProperty(u)) throw new r("firstAxis and secondAxis must be east, north, up, west, south or down.");
    var e,
        s = p[a][u],
        t = a + u;
    return N(R[t]) ? e = R[t] : (e = function e(_e2, t, r) {
      var n, o, i;
      return N(r) || (r = new d()), M.equalsEpsilon(_e2.x, 0, M.EPSILON14) && M.equalsEpsilon(_e2.y, 0, M.EPSILON14) ? (n = M.sign(_e2.z), f.unpack(_[a], 0, T), "east" !== a && "west" !== a && f.multiplyByScalar(T, n, T), f.unpack(_[u], 0, A), "east" !== u && "west" !== u && f.multiplyByScalar(A, n, A), f.unpack(_[s], 0, S), "east" !== s && "west" !== s && f.multiplyByScalar(S, n, S)) : ((t = c(t, l.WGS84)).geodeticSurfaceNormal(_e2, y.up), o = y.up, (i = y.east).x = -_e2.y, i.y = _e2.x, i.z = 0, f.normalize(i, y.east), f.cross(o, i, y.north), f.multiplyByScalar(y.up, -1, y.down), f.multiplyByScalar(y.east, -1, y.west), f.multiplyByScalar(y.north, -1, y.south), T = y[a], A = y[u], S = y[s]), r[0] = T.x, r[1] = T.y, r[2] = T.z, r[3] = 0, r[4] = A.x, r[5] = A.y, r[6] = A.z, r[7] = 0, r[8] = S.x, r[9] = S.y, r[10] = S.z, r[11] = 0, r[12] = _e2.x, r[13] = _e2.y, r[14] = _e2.z, r[15] = 1, r;
    }, R[t] = e), e;
  }, D.eastNorthUpToFixedFrame = D.localFrameToFixedFrameGenerator("east", "north"), D.northEastDownToFixedFrame = D.localFrameToFixedFrameGenerator("north", "east"), D.northUpEastToFixedFrame = D.localFrameToFixedFrameGenerator("north", "up"), D.northWestUpToFixedFrame = D.localFrameToFixedFrameGenerator("north", "west");
  var C = new m(),
      g = new f(1, 1, 1),
      O = new d();

  D.headingPitchRollToFixedFrame = function (e, t, r, n, o) {
    n = c(n, D.eastNorthUpToFixedFrame);
    var i = m.fromHeadingPitchRoll(t, C),
        a = d.fromTranslationQuaternionRotationScale(f.ZERO, i, g, O);
    return o = n(e, r, o), d.multiply(o, a, o);
  };

  var P = new d(),
      F = new v();

  D.headingPitchRollQuaternion = function (e, t, r, n, o) {
    var i = D.headingPitchRollToFixedFrame(e, t, r, n, P),
        a = d.getRotation(i, F);
    return m.fromRotationMatrix(a, o);
  };

  var U = new f(1, 1, 1),
      L = new f(),
      x = new d(),
      B = new d(),
      b = new v(),
      q = new m();

  D.fixedFrameToHeadingPitchRoll = function (e, t, r, n) {
    t = c(t, l.WGS84), r = c(r, D.eastNorthUpToFixedFrame), N(n) || (n = new s());
    var o = d.getTranslation(e, L);
    if (f.equals(o, f.ZERO)) return n.heading = 0, n.pitch = 0, n.roll = 0, n;
    var i = d.inverseTransformation(r(o, t, x), x),
        a = d.setScale(e, U, B),
        a = d.setTranslation(a, f.ZERO, a),
        i = d.multiply(i, a, i),
        u = m.fromRotationMatrix(d.getRotation(i, b), q),
        u = m.normalize(u, u);
    return s.fromQuaternion(u, n);
  };

  var z = M.TWO_PI / 86400,
      G = new I();
  D.computeTemeToPseudoFixedMatrix = function (e, t) {
    var r = (G = I.addSeconds(e, -I.computeTaiMinusUtc(e), G)).dayNumber,
        n = G.secondsOfDay,
        o = r - 2451545,
        i = 43200 <= n ? (.5 + o) / w.DAYS_PER_JULIAN_CENTURY : (o - .5) / w.DAYS_PER_JULIAN_CENTURY,
        a = (24110.54841 + i * (8640184.812866 + i * (.093104 + -62e-7 * i))) * z % M.TWO_PI + (72921158553e-15 + 11772758384668e-32 * (r - 2451545.5)) * ((n + .5 * w.SECONDS_PER_DAY) % w.SECONDS_PER_DAY),
        u = Math.cos(a),
        s = Math.sin(a);
    return N(t) ? (t[0] = u, t[1] = -s, t[2] = 0, t[3] = s, t[4] = u, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new v(u, s, 0, -s, u, 0, 0, 0, 1);
  }, D.iau2006XysData = new h(), D.earthOrientationParameters = n.NONE, D.preloadIcrfFixed = function (e) {
    var t = e.start.dayNumber,
        r = e.start.secondsOfDay + 32.184,
        n = e.stop.dayNumber,
        o = e.stop.secondsOfDay + 32.184,
        i = D.iau2006XysData.preload(t, r, n, o),
        a = D.earthOrientationParameters.getPromiseToLoad();
    return u.all([i, a]);
  }, D.computeIcrfToFixedMatrix = function (e, t) {
    N(t) || (t = new v());
    var r = D.computeFixedToIcrfMatrix(e, t);
    if (N(r)) return v.transpose(r, t);
  };
  var H = new E(0, 0, 0),
      V = new o(0, 0, 0, 0, 0, 0),
      W = new v(),
      X = new v();

  D.computeFixedToIcrfMatrix = function (e, t) {
    N(t) || (t = new v());
    var r = D.earthOrientationParameters.compute(e, V);

    if (N(r)) {
      var n = e.dayNumber,
          o = e.secondsOfDay + 32.184,
          i = D.iau2006XysData.computeXysRadians(n, o, H);

      if (N(i)) {
        var a = i.x + r.xPoleOffset,
            u = i.y + r.yPoleOffset,
            s = 1 / (1 + Math.sqrt(1 - a * a - u * u)),
            c = W;
        c[0] = 1 - s * a * a, c[3] = -s * a * u, c[6] = a, c[1] = -s * a * u, c[4] = 1 - s * u * u, c[7] = u, c[2] = -a, c[5] = -u, c[8] = 1 - s * (a * a + u * u);

        var l = v.fromRotationZ(-i.s, X),
            f = v.multiply(c, l, W),
            h = e.dayNumber - 2451545,
            E = (e.secondsOfDay - I.computeTaiMinusUtc(e) + r.ut1MinusUtc) / w.SECONDS_PER_DAY,
            d = (d = .779057273264 + E + .00273781191135448 * (h + E)) % 1 * M.TWO_PI,
            m = v.fromRotationZ(d, X),
            p = v.multiply(f, m, W),
            _ = Math.cos(r.xPoleWander),
            R = Math.cos(r.yPoleWander),
            y = Math.sin(r.xPoleWander),
            T = Math.sin(r.yPoleWander),
            A = n - 2451545 + o / w.SECONDS_PER_DAY,
            S = -47e-6 * (A /= 36525) * M.RADIANS_PER_DEGREE / 3600,
            C = Math.cos(S),
            g = Math.sin(S),
            O = X;

        return O[0] = _ * C, O[1] = _ * g, O[2] = y, O[3] = -R * g + T * y * C, O[4] = R * C + T * y * g, O[5] = -T * _, O[6] = -T * g - R * y * C, O[7] = T * C - R * y * g, O[8] = R * _, v.multiply(p, O, t);
      }
    }
  };

  var Y = new a();
  D.pointToWindowCoordinates = function (e, t, r, n) {
    return (n = D.pointToGLWindowCoordinates(e, t, r, n)).y = 2 * t[5] - n.y, n;
  }, D.pointToGLWindowCoordinates = function (e, t, r, n) {
    N(n) || (n = new i());
    var o = Y;
    return d.multiplyByVector(e, a.fromElements(r.x, r.y, r.z, 1, o), o), a.multiplyByScalar(o, 1 / o.w, o), d.multiplyByVector(t, o, o), i.fromCartesian4(o, n);
  };
  var k = new f(),
      j = new f(),
      K = new f();

  D.rotationMatrixFromPositionVelocity = function (e, t, r, n) {
    var o = c(r, l.WGS84).geodeticSurfaceNormal(e, k),
        i = f.cross(t, o, j);
    f.equalsEpsilon(i, f.ZERO, M.EPSILON6) && (i = f.clone(f.UNIT_X, i));
    var a = f.cross(i, t, K);
    return f.normalize(a, a), f.cross(t, a, i), f.negate(i, i), f.normalize(i, i), N(n) || (n = new v()), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = i.x, n[4] = i.y, n[5] = i.z, n[6] = a.x, n[7] = a.y, n[8] = a.z, n;
  };

  var Z = new d(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
      Q = new e(),
      J = new f(),
      $ = new f(),
      ee = new v(),
      te = new d(),
      re = new d();
  return D.basisTo2D = function (e, t, r) {
    var n = d.getTranslation(t, $),
        o = e.ellipsoid,
        i = o.cartesianToCartographic(n, Q),
        a = e.project(i, J);
    f.fromElements(a.z, a.x, a.y, a);
    var u = D.eastNorthUpToFixedFrame(n, o, te),
        s = d.inverseTransformation(u, re),
        c = d.getRotation(t, ee),
        l = d.multiplyByMatrix3(s, c, r);
    return d.multiply(Z, l, r), d.setTranslation(r, a, r), r;
  }, D.wgs84To2DModelMatrix = function (e, t, r) {
    var n = e.ellipsoid,
        o = D.eastNorthUpToFixedFrame(t, n, te),
        i = d.inverseTransformation(o, re),
        a = n.cartesianToCartographic(t, Q),
        u = e.project(a, J);
    f.fromElements(u.z, u.x, u.y, u);
    var s = d.fromTranslation(u, te);
    return d.multiply(Z, i, r), d.multiply(s, r, r), r;
  }, D;
}), define("Core/Geometry", ["./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryOffsetAttribute", "./GeometryType", "./Matrix2", "./Matrix3", "./Matrix4", "./PrimitiveType", "./Quaternion", "./Rectangle", "./Transforms"], function (v, w, D, e, t, o, r, n, i, P, F, U, a, L, x, B) {
  "use strict";

  function u(e) {
    e = t(e, t.EMPTY_OBJECT), this.attributes = e.attributes, this.indices = e.indices, this.primitiveType = t(e.primitiveType, a.TRIANGLES), this.boundingSphere = e.boundingSphere, this.geometryType = t(e.geometryType, i.NONE), this.boundingSphereCV = e.boundingSphereCV, this.offsetAttribute = e.offsetAttribute;
  }

  u.computeNumberOfVertices = function (e) {
    var t,
        r = -1;

    for (var n in e.attributes) {
      e.attributes.hasOwnProperty(n) && o(e.attributes[n]) && o(e.attributes[n].values) && (r = (t = e.attributes[n]).values.length / t.componentsPerAttribute);
    }

    return r;
  };

  var b = new D(),
      q = new w(),
      z = new U(),
      G = [new D(), new D(), new D()],
      H = [new v(), new v(), new v()],
      V = [new v(), new v(), new v()],
      W = new w(),
      X = new L(),
      Y = new U(),
      k = new P();
  return u._textureCoordinateRotationPoints = function (e, t, r, n) {
    var o = x.center(n, b),
        i = D.toCartesian(o, r, q),
        a = B.eastNorthUpToFixedFrame(i, r, z),
        u = U.inverse(a, z),
        s = H,
        c = G;
    c[0].longitude = n.west, c[0].latitude = n.south, c[1].longitude = n.west, c[1].latitude = n.north, c[2].longitude = n.east, c[2].latitude = n.south;

    for (var l = W, f = 0; f < 3; f++) {
      D.toCartesian(c[f], r, l), l = U.multiplyByPointAsVector(u, l, l), s[f].x = l.x, s[f].y = l.y;
    }

    var h = L.fromAxisAngle(w.UNIT_Z, -t, X),
        E = F.fromQuaternion(h, Y),
        d = e.length,
        m = Number.POSITIVE_INFINITY,
        p = Number.POSITIVE_INFINITY,
        _ = Number.NEGATIVE_INFINITY,
        R = Number.NEGATIVE_INFINITY;

    for (f = 0; f < d; f++) {
      l = U.multiplyByPointAsVector(u, e[f], l), l = F.multiplyByVector(E, l, l), m = Math.min(m, l.x), p = Math.min(p, l.y), _ = Math.max(_, l.x), R = Math.max(R, l.y);
    }

    var y = P.fromRotation(t, k),
        T = V;
    T[0].x = m, T[0].y = p, T[1].x = m, T[1].y = R, T[2].x = _, T[2].y = p;
    var A = s[0],
        S = s[2].x - A.x,
        C = s[1].y - A.y;

    for (f = 0; f < 3; f++) {
      var g = T[f];
      P.multiplyByVector(y, g, g), g.x = (g.x - A.x) / S, g.y = (g.y - A.y) / C;
    }

    var O = T[0],
        N = T[1],
        I = T[2],
        M = new Array(6);
    return v.pack(O, M), v.pack(N, M, 2), v.pack(I, M, 4), M;
  }, u;
}), define("Scene/HorizontalOrigin", ["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    CENTER: 0,
    LEFT: 1,
    RIGHT: -1
  });
}), define("Scene/VerticalOrigin", ["../Core/freezeObject"], function (e) {
  "use strict";

  return e({
    CENTER: 0,
    BOTTOM: 1,
    BASELINE: 2,
    TOP: -1
  });
}), define("Core/GeometryAttribute", ["./defaultValue", "./defined", "./DeveloperError"], function (t, e, r) {
  "use strict";

  return function (e) {
    e = t(e, t.EMPTY_OBJECT), this.componentDatatype = e.componentDatatype, this.componentsPerAttribute = e.componentsPerAttribute, this.normalize = t(e.normalize, !1), this.values = e.values;
  };
}), define("Core/ComponentDatatype", ["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function (o, t, e, r, n, i) {
  "use strict";

  if (!r.supportsTypedArrays()) return {};
  var a = {
    BYTE: i.BYTE,
    UNSIGNED_BYTE: i.UNSIGNED_BYTE,
    SHORT: i.SHORT,
    UNSIGNED_SHORT: i.UNSIGNED_SHORT,
    INT: i.INT,
    UNSIGNED_INT: i.UNSIGNED_INT,
    FLOAT: i.FLOAT,
    DOUBLE: i.DOUBLE,
    getSizeInBytes: function getSizeInBytes(e) {
      switch (e) {
        case a.BYTE:
          return Int8Array.BYTES_PER_ELEMENT;

        case a.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT;

        case a.SHORT:
          return Int16Array.BYTES_PER_ELEMENT;

        case a.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT;

        case a.INT:
          return Int32Array.BYTES_PER_ELEMENT;

        case a.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT;

        case a.FLOAT:
          return Float32Array.BYTES_PER_ELEMENT;

        case a.DOUBLE:
          return Float64Array.BYTES_PER_ELEMENT;
      }
    },
    fromTypedArray: function fromTypedArray(e) {
      return e instanceof Int8Array ? a.BYTE : e instanceof Uint8Array ? a.UNSIGNED_BYTE : e instanceof Int16Array ? a.SHORT : e instanceof Uint16Array ? a.UNSIGNED_SHORT : e instanceof Int32Array ? a.INT : e instanceof Uint32Array ? a.UNSIGNED_INT : e instanceof Float32Array ? a.FLOAT : e instanceof Float64Array ? a.DOUBLE : void 0;
    },
    validate: function validate(e) {
      return t(e) && (e === a.BYTE || e === a.UNSIGNED_BYTE || e === a.SHORT || e === a.UNSIGNED_SHORT || e === a.INT || e === a.UNSIGNED_INT || e === a.FLOAT || e === a.DOUBLE);
    },
    createTypedArray: function createTypedArray(e, t) {
      switch (e) {
        case a.BYTE:
          return new Int8Array(t);

        case a.UNSIGNED_BYTE:
          return new Uint8Array(t);

        case a.SHORT:
          return new Int16Array(t);

        case a.UNSIGNED_SHORT:
          return new Uint16Array(t);

        case a.INT:
          return new Int32Array(t);

        case a.UNSIGNED_INT:
          return new Uint32Array(t);

        case a.FLOAT:
          return new Float32Array(t);

        case a.DOUBLE:
          return new Float64Array(t);
      }
    },
    createArrayBufferView: function createArrayBufferView(e, t, r, n) {
      switch (r = o(r, 0), n = o(n, (t.byteLength - r) / a.getSizeInBytes(e)), e) {
        case a.BYTE:
          return new Int8Array(t, r, n);

        case a.UNSIGNED_BYTE:
          return new Uint8Array(t, r, n);

        case a.SHORT:
          return new Int16Array(t, r, n);

        case a.UNSIGNED_SHORT:
          return new Uint16Array(t, r, n);

        case a.INT:
          return new Int32Array(t, r, n);

        case a.UNSIGNED_INT:
          return new Uint32Array(t, r, n);

        case a.FLOAT:
          return new Float32Array(t, r, n);

        case a.DOUBLE:
          return new Float64Array(t, r, n);
      }
    },
    fromName: function fromName(e) {
      switch (e) {
        case "BYTE":
          return a.BYTE;

        case "UNSIGNED_BYTE":
          return a.UNSIGNED_BYTE;

        case "SHORT":
          return a.SHORT;

        case "UNSIGNED_SHORT":
          return a.UNSIGNED_SHORT;

        case "INT":
          return a.INT;

        case "UNSIGNED_INT":
          return a.UNSIGNED_INT;

        case "FLOAT":
          return a.FLOAT;

        case "DOUBLE":
          return a.DOUBLE;
      }
    }
  };
  return n(a);
}), define("Core/GeographicProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function (a, u, t, s, e, r, n) {
  "use strict";

  function o(e) {
    this._ellipsoid = t(e, n.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
  }

  return e(o.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    }
  }), o.prototype.project = function (e, t) {
    var r = this._semimajorAxis,
        n = e.longitude * r,
        o = e.latitude * r,
        i = e.height;
    return s(t) ? (t.x = n, t.y = o, t.z = i, t) : new a(n, o, i);
  }, o.prototype.unproject = function (e, t) {
    var r = this._oneOverSemimajorAxis,
        n = e.x * r,
        o = e.y * r,
        i = e.z;
    return s(t) ? (t.longitude = n, t.latitude = o, t.height = i, t) : new u(n, o, i);
  }, o;
}), define("Core/Intersect", ["./freezeObject"], function (e) {
  "use strict";

  return e({
    OUTSIDE: -1,
    INTERSECTING: 0,
    INSIDE: 1
  });
}), define("Core/Interval", ["./defaultValue"], function (r) {
  "use strict";

  return function (e, t) {
    this.start = r(e, 0), this.stop = r(t, 0);
  };
}), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (F, e, t, U, L, i, r, a, u, n, s, o, f) {
  "use strict";

  function x(e, t) {
    this.center = F.clone(U(e, F.ZERO)), this.radius = U(t, 0);
  }

  var B = new F(),
      b = new F(),
      q = new F(),
      z = new F(),
      G = new F(),
      H = new F(),
      V = new F(),
      W = new F(),
      X = new F(),
      Y = new F(),
      k = new F(),
      j = new F(),
      c = 4 / 3 * n.PI;

  x.fromPoints = function (e, t) {
    if (L(t) || (t = new x()), !L(e) || 0 === e.length) return t.center = F.clone(F.ZERO, t.center), t.radius = 0, t;

    for (var r = F.clone(e[0], V), n = F.clone(r, B), o = F.clone(r, b), i = F.clone(r, q), a = F.clone(r, z), u = F.clone(r, G), s = F.clone(r, H), c = e.length, l = 1; l < c; l++) {
      F.clone(e[l], r);
      var f = r.x,
          h = r.y,
          E = r.z;
      f < n.x && F.clone(r, n), f > a.x && F.clone(r, a), h < o.y && F.clone(r, o), h > u.y && F.clone(r, u), E < i.z && F.clone(r, i), E > s.z && F.clone(r, s);
    }

    var d = F.magnitudeSquared(F.subtract(a, n, W)),
        m = F.magnitudeSquared(F.subtract(u, o, W)),
        p = F.magnitudeSquared(F.subtract(s, i, W)),
        _ = n,
        R = a,
        y = d;
    y < m && (y = m, _ = o, R = u), y < p && (y = p, _ = i, R = s);
    var T = X;
    T.x = .5 * (_.x + R.x), T.y = .5 * (_.y + R.y), T.z = .5 * (_.z + R.z);
    var A = F.magnitudeSquared(F.subtract(R, T, W)),
        S = Math.sqrt(A),
        C = Y;
    C.x = n.x, C.y = o.y, C.z = i.z;
    var g = k;
    g.x = a.x, g.y = u.y, g.z = s.z;
    var O = F.midpoint(C, g, j),
        N = 0;

    for (l = 0; l < c; l++) {
      F.clone(e[l], r);
      var I = F.magnitude(F.subtract(r, O, W));
      N < I && (N = I);
      var M,
          v,
          w = F.magnitudeSquared(F.subtract(r, T, W));
      A < w && (A = (S = .5 * (S + (M = Math.sqrt(w)))) * S, v = M - S, T.x = (S * T.x + v * r.x) / M, T.y = (S * T.y + v * r.y) / M, T.z = (S * T.z + v * r.z) / M);
    }

    return S < N ? (F.clone(T, t.center), t.radius = S) : (F.clone(O, t.center), t.radius = N), t;
  };

  var h = new r(),
      E = new F(),
      d = new F(),
      m = new e(),
      p = new e();
  x.fromRectangle2D = function (e, t, r) {
    return x.fromRectangleWithHeights2D(e, t, 0, 0, r);
  }, x.fromRectangleWithHeights2D = function (e, t, r, n, o) {
    if (L(o) || (o = new x()), !L(e)) return o.center = F.clone(F.ZERO, o.center), o.radius = 0, o;
    t = U(t, h), f.southwest(e, m), m.height = r, f.northeast(e, p), p.height = n;
    var i = t.project(m, E),
        a = t.project(p, d),
        u = a.x - i.x,
        s = a.y - i.y,
        c = a.z - i.z;
    o.radius = .5 * Math.sqrt(u * u + s * s + c * c);
    var l = o.center;
    return l.x = i.x + .5 * u, l.y = i.y + .5 * s, l.z = i.z + .5 * c, o;
  };
  var l = [];
  x.fromRectangle3D = function (e, t, r, n) {
    if (t = U(t, i.WGS84), r = U(r, 0), L(n) || (n = new x()), !L(e)) return n.center = F.clone(F.ZERO, n.center), n.radius = 0, n;
    var o = f.subsample(e, t, r, l);
    return x.fromPoints(o, n);
  }, x.fromVertices = function (e, t, r, n) {
    if (L(n) || (n = new x()), !L(e) || 0 === e.length) return n.center = F.clone(F.ZERO, n.center), n.radius = 0, n;
    t = U(t, F.ZERO), r = U(r, 3);
    var o = V;
    o.x = e[0] + t.x, o.y = e[1] + t.y, o.z = e[2] + t.z;

    for (var i = F.clone(o, B), a = F.clone(o, b), u = F.clone(o, q), s = F.clone(o, z), c = F.clone(o, G), l = F.clone(o, H), f = e.length, h = 0; h < f; h += r) {
      var E = e[h] + t.x,
          d = e[h + 1] + t.y,
          m = e[h + 2] + t.z;
      o.x = E, o.y = d, o.z = m, E < i.x && F.clone(o, i), E > s.x && F.clone(o, s), d < a.y && F.clone(o, a), d > c.y && F.clone(o, c), m < u.z && F.clone(o, u), m > l.z && F.clone(o, l);
    }

    var p = F.magnitudeSquared(F.subtract(s, i, W)),
        _ = F.magnitudeSquared(F.subtract(c, a, W)),
        R = F.magnitudeSquared(F.subtract(l, u, W)),
        y = i,
        T = s,
        A = p;

    A < _ && (A = _, y = a, T = c), A < R && (A = R, y = u, T = l);
    var S = X;
    S.x = .5 * (y.x + T.x), S.y = .5 * (y.y + T.y), S.z = .5 * (y.z + T.z);
    var C = F.magnitudeSquared(F.subtract(T, S, W)),
        g = Math.sqrt(C),
        O = Y;
    O.x = i.x, O.y = a.y, O.z = u.z;
    var N = k;
    N.x = s.x, N.y = c.y, N.z = l.z;
    var I = F.midpoint(O, N, j),
        M = 0;

    for (h = 0; h < f; h += r) {
      o.x = e[h] + t.x, o.y = e[h + 1] + t.y, o.z = e[h + 2] + t.z;
      var v = F.magnitude(F.subtract(o, I, W));
      M < v && (M = v);
      var w,
          D,
          P = F.magnitudeSquared(F.subtract(o, S, W));
      C < P && (C = (g = .5 * (g + (w = Math.sqrt(P)))) * g, D = w - g, S.x = (g * S.x + D * o.x) / w, S.y = (g * S.y + D * o.y) / w, S.z = (g * S.z + D * o.z) / w);
    }

    return g < M ? (F.clone(S, n.center), n.radius = g) : (F.clone(I, n.center), n.radius = M), n;
  }, x.fromEncodedCartesianVertices = function (e, t, r) {
    if (L(r) || (r = new x()), !L(e) || !L(t) || e.length !== t.length || 0 === e.length) return r.center = F.clone(F.ZERO, r.center), r.radius = 0, r;
    var n = V;
    n.x = e[0] + t[0], n.y = e[1] + t[1], n.z = e[2] + t[2];

    for (var o = F.clone(n, B), i = F.clone(n, b), a = F.clone(n, q), u = F.clone(n, z), s = F.clone(n, G), c = F.clone(n, H), l = e.length, f = 0; f < l; f += 3) {
      var h = e[f] + t[f],
          E = e[f + 1] + t[f + 1],
          d = e[f + 2] + t[f + 2];
      n.x = h, n.y = E, n.z = d, h < o.x && F.clone(n, o), h > u.x && F.clone(n, u), E < i.y && F.clone(n, i), E > s.y && F.clone(n, s), d < a.z && F.clone(n, a), d > c.z && F.clone(n, c);
    }

    var m = F.magnitudeSquared(F.subtract(u, o, W)),
        p = F.magnitudeSquared(F.subtract(s, i, W)),
        _ = F.magnitudeSquared(F.subtract(c, a, W)),
        R = o,
        y = u,
        T = m;

    T < p && (T = p, R = i, y = s), T < _ && (T = _, R = a, y = c);
    var A = X;
    A.x = .5 * (R.x + y.x), A.y = .5 * (R.y + y.y), A.z = .5 * (R.z + y.z);
    var S = F.magnitudeSquared(F.subtract(y, A, W)),
        C = Math.sqrt(S),
        g = Y;
    g.x = o.x, g.y = i.y, g.z = a.z;
    var O = k;
    O.x = u.x, O.y = s.y, O.z = c.z;
    var N = F.midpoint(g, O, j),
        I = 0;

    for (f = 0; f < l; f += 3) {
      n.x = e[f] + t[f], n.y = e[f + 1] + t[f + 1], n.z = e[f + 2] + t[f + 2];
      var M = F.magnitude(F.subtract(n, N, W));
      I < M && (I = M);
      var v,
          w,
          D = F.magnitudeSquared(F.subtract(n, A, W));
      S < D && (S = (C = .5 * (C + (v = Math.sqrt(D)))) * C, w = v - C, A.x = (C * A.x + w * n.x) / v, A.y = (C * A.y + w * n.y) / v, A.z = (C * A.z + w * n.z) / v);
    }

    return C < I ? (F.clone(A, r.center), r.radius = C) : (F.clone(N, r.center), r.radius = I), r;
  }, x.fromCornerPoints = function (e, t, r) {
    L(r) || (r = new x());
    var n = F.midpoint(e, t, r.center);
    return r.radius = F.distance(n, t), r;
  }, x.fromEllipsoid = function (e, t) {
    return L(t) || (t = new x()), F.clone(F.ZERO, t.center), t.radius = e.maximumRadius, t;
  };

  var _ = new F();

  x.fromBoundingSpheres = function (e, t) {
    if (L(t) || (t = new x()), !L(e) || 0 === e.length) return t.center = F.clone(F.ZERO, t.center), t.radius = 0, t;
    var r = e.length;
    if (1 === r) return x.clone(e[0], t);
    if (2 === r) return x.union(e[0], e[1], t);

    for (var n = [], o = 0; o < r; o++) {
      n.push(e[o].center);
    }

    var i = (t = x.fromPoints(n, t)).center,
        a = t.radius;

    for (o = 0; o < r; o++) {
      var u = e[o],
          a = Math.max(a, F.distance(i, u.center, _) + u.radius);
    }

    return t.radius = a, t;
  };

  var R = new F(),
      y = new F(),
      T = new F();
  x.fromOrientedBoundingBox = function (e, t) {
    L(t) || (t = new x());
    var r = e.halfAxes,
        n = s.getColumn(r, 0, R),
        o = s.getColumn(r, 1, y),
        i = s.getColumn(r, 2, T);
    return F.add(n, o, n), F.add(n, i, n), t.center = F.clone(e.center, t.center), t.radius = F.magnitude(n), t;
  }, x.clone = function (e, t) {
    if (L(e)) return L(t) ? (t.center = F.clone(e.center, t.center), t.radius = e.radius, t) : new x(e.center, e.radius);
  }, x.packedLength = 4, x.pack = function (e, t, r) {
    r = U(r, 0);
    var n = e.center;
    return t[r++] = n.x, t[r++] = n.y, t[r++] = n.z, t[r] = e.radius, t;
  }, x.unpack = function (e, t, r) {
    t = U(t, 0), L(r) || (r = new x());
    var n = r.center;
    return n.x = e[t++], n.y = e[t++], n.z = e[t++], r.radius = e[t], r;
  };
  var A = new F(),
      S = new F();

  x.union = function (e, t, r) {
    L(r) || (r = new x());
    var n = e.center,
        o = e.radius,
        i = t.center,
        a = t.radius,
        u = F.subtract(i, n, A),
        s = F.magnitude(u);
    if (s + a <= o) return e.clone(r), r;
    if (s + o <= a) return t.clone(r), r;
    var c = .5 * (o + s + a),
        l = F.multiplyByScalar(u, (c - o) / s, S);
    return F.add(l, n, l), F.clone(l, r.center), r.radius = c, r;
  };

  var C = new F();
  x.expand = function (e, t, r) {
    r = x.clone(e, r);
    var n = F.magnitude(F.subtract(t, r.center, C));
    return n > r.radius && (r.radius = n), r;
  }, x.intersectPlane = function (e, t) {
    var r = e.center,
        n = e.radius,
        o = t.normal,
        i = F.dot(o, r) + t.distance;
    return i < -n ? a.OUTSIDE : i < n ? a.INTERSECTING : a.INSIDE;
  }, x.transform = function (e, t, r) {
    return L(r) || (r = new x()), r.center = o.multiplyByPoint(t, e.center, r.center), r.radius = o.getMaximumScale(t) * e.radius, r;
  };
  var g = new F();
  x.distanceSquaredTo = function (e, t) {
    var r = F.subtract(e.center, t, g);
    return F.magnitudeSquared(r) - e.radius * e.radius;
  }, x.transformWithoutScale = function (e, t, r) {
    return L(r) || (r = new x()), r.center = o.multiplyByPoint(t, e.center, r.center), r.radius = e.radius, r;
  };
  var O = new F();

  x.computePlaneDistances = function (e, t, r, n) {
    L(n) || (n = new u());
    var o = F.subtract(e.center, t, O),
        i = F.dot(r, o);
    return n.start = i - e.radius, n.stop = i + e.radius, n;
  };

  for (var N = new F(), I = new F(), M = new F(), v = new F(), w = new F(), D = new e(), P = new Array(8), K = 0; K < 8; ++K) {
    P[K] = new F();
  }

  var Z = new r();
  return x.projectTo2D = function (e, t, r) {
    var n = (t = U(t, Z)).ellipsoid,
        o = e.center,
        i = e.radius,
        a = n.geodeticSurfaceNormal(o, N),
        u = F.cross(F.UNIT_Z, a, I);
    F.normalize(u, u);
    var s = F.cross(a, u, M);
    F.normalize(s, s), F.multiplyByScalar(a, i, a), F.multiplyByScalar(s, i, s), F.multiplyByScalar(u, i, u);
    var c = F.negate(s, w),
        l = F.negate(u, v),
        f = P,
        h = f[0];
    F.add(a, s, h), F.add(h, u, h), h = f[1], F.add(a, s, h), F.add(h, l, h), h = f[2], F.add(a, c, h), F.add(h, l, h), h = f[3], F.add(a, c, h), F.add(h, u, h), F.negate(a, a), h = f[4], F.add(a, s, h), F.add(h, u, h), h = f[5], F.add(a, s, h), F.add(h, l, h), h = f[6], F.add(a, c, h), F.add(h, l, h), h = f[7], F.add(a, c, h), F.add(h, u, h);

    for (var E = f.length, d = 0; d < E; ++d) {
      var m = f[d];
      F.add(o, m, m);
      var p = n.cartesianToCartographic(m, D);
      t.project(p, m);
    }

    var _ = (o = (r = x.fromPoints(f, r)).center).x,
        R = o.y,
        y = o.z;
    return o.x = y, o.y = _, o.z = R, r;
  }, x.isOccluded = function (e, t) {
    return !t.isBoundingSphereVisible(e);
  }, x.equals = function (e, t) {
    return e === t || L(e) && L(t) && F.equals(e.center, t.center) && e.radius === t.radius;
  }, x.prototype.intersectPlane = function (e) {
    return x.intersectPlane(this, e);
  }, x.prototype.distanceSquaredTo = function (e) {
    return x.distanceSquaredTo(this, e);
  }, x.prototype.computePlaneDistances = function (e, t, r) {
    return x.computePlaneDistances(this, e, t, r);
  }, x.prototype.isOccluded = function (e) {
    return x.isOccluded(this, e);
  }, x.prototype.equals = function (e) {
    return x.equals(this, e);
  }, x.prototype.clone = function (e) {
    return x.clone(this, e);
  }, x.prototype.volume = function () {
    var e = this.radius;
    return c * e * e * e;
  }, x;
}), define("Scene/BlendEquation", ["../Core/freezeObject", "../Core/WebGLConstants"], function (e, t) {
  "use strict";

  return e({
    ADD: t.FUNC_ADD,
    SUBTRACT: t.FUNC_SUBTRACT,
    REVERSE_SUBTRACT: t.FUNC_REVERSE_SUBTRACT,
    MIN: t.MIN,
    MAX: t.MAX
  });
}), define("Scene/BlendFunction", ["../Core/freezeObject", "../Core/WebGLConstants"], function (e, t) {
  "use strict";

  return e({
    ZERO: t.ZERO,
    ONE: t.ONE,
    SOURCE_COLOR: t.SRC_COLOR,
    ONE_MINUS_SOURCE_COLOR: t.ONE_MINUS_SRC_COLOR,
    DESTINATION_COLOR: t.DST_COLOR,
    ONE_MINUS_DESTINATION_COLOR: t.ONE_MINUS_DST_COLOR,
    SOURCE_ALPHA: t.SRC_ALPHA,
    ONE_MINUS_SOURCE_ALPHA: t.ONE_MINUS_SRC_ALPHA,
    DESTINATION_ALPHA: t.DST_ALPHA,
    ONE_MINUS_DESTINATION_ALPHA: t.ONE_MINUS_DST_ALPHA,
    CONSTANT_COLOR: t.CONSTANT_COLOR,
    ONE_MINUS_CONSTANT_COLOR: t.ONE_MINUS_CONSTANT_ALPHA,
    CONSTANT_ALPHA: t.CONSTANT_ALPHA,
    ONE_MINUS_CONSTANT_ALPHA: t.ONE_MINUS_CONSTANT_ALPHA,
    SOURCE_ALPHA_SATURATE: t.SRC_ALPHA_SATURATE
  });
}), define("Scene/BlendingState", ["../Core/freezeObject", "./BlendEquation", "./BlendFunction"], function (e, t, r) {
  "use strict";

  return e({
    DISABLED: e({
      enabled: !1
    }),
    ALPHA_BLEND: e({
      enabled: !0,
      equationRgb: t.ADD,
      equationAlpha: t.ADD,
      functionSourceRgb: r.SOURCE_ALPHA,
      functionSourceAlpha: r.SOURCE_ALPHA,
      functionDestinationRgb: r.ONE_MINUS_SOURCE_ALPHA,
      functionDestinationAlpha: r.ONE_MINUS_SOURCE_ALPHA
    }),
    PRE_MULTIPLIED_ALPHA_BLEND: e({
      enabled: !0,
      equationRgb: t.ADD,
      equationAlpha: t.ADD,
      functionSourceRgb: r.ONE,
      functionSourceAlpha: r.ONE,
      functionDestinationRgb: r.ONE_MINUS_SOURCE_ALPHA,
      functionDestinationAlpha: r.ONE_MINUS_SOURCE_ALPHA
    }),
    ADDITIVE_BLEND: e({
      enabled: !0,
      equationRgb: t.ADD,
      equationAlpha: t.ADD,
      functionSourceRgb: r.SOURCE_ALPHA,
      functionSourceAlpha: r.SOURCE_ALPHA,
      functionDestinationRgb: r.ONE,
      functionDestinationAlpha: r.ONE
    })
  });
}), define("Scene/CullFace", ["../Core/freezeObject", "../Core/WebGLConstants"], function (e, t) {
  "use strict";

  return e({
    FRONT: t.FRONT,
    BACK: t.BACK,
    FRONT_AND_BACK: t.FRONT_AND_BACK
  });
}), define("Scene/Appearance", ["../Core/clone", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "./BlendingState", "./CullFace"], function (r, o, t, i, e, a, u) {
  "use strict";

  function n(e) {
    e = t(e, t.EMPTY_OBJECT), this.material = e.material, this.translucent = t(e.translucent, !0), this._vertexShaderSource = e.vertexShaderSource, this._fragmentShaderSource = e.fragmentShaderSource, this._renderState = e.renderState, this._closed = t(e.closed, !1);
  }

  return e(n.prototype, {
    vertexShaderSource: {
      get: function get() {
        return this._vertexShaderSource;
      }
    },
    fragmentShaderSource: {
      get: function get() {
        return this._fragmentShaderSource;
      }
    },
    renderState: {
      get: function get() {
        return this._renderState;
      }
    },
    closed: {
      get: function get() {
        return this._closed;
      }
    }
  }), n.prototype.getFragmentShaderSource = function () {
    var e = [];
    return this.flat && e.push("#define FLAT"), this.faceForward && e.push("#define FACE_FORWARD"), i(this.material) && e.push(this.material.shaderSource), e.push(this.fragmentShaderSource), e.join("\n");
  }, n.prototype.isTranslucent = function () {
    return i(this.material) && this.material.isTranslucent() || !i(this.material) && this.translucent;
  }, n.prototype.getRenderState = function () {
    var e = this.isTranslucent(),
        t = r(this.renderState, !1);
    return e ? (t.depthMask = !1, t.blending = a.ALPHA_BLEND) : t.depthMask = !0, t;
  }, n.getDefaultRenderState = function (e, t, r) {
    var n = {
      depthTest: {
        enabled: !0
      }
    };
    return e && (n.depthMask = !1, n.blending = a.ALPHA_BLEND), t && (n.cull = {
      enabled: !0,
      face: u.BACK
    }), i(r) && (n = o(r, n, !0)), n;
  }, n;
}), define("Core/GeometryInstance", ["./defaultValue", "./defined", "./DeveloperError", "./Matrix4"], function (t, e, r, n) {
  "use strict";

  return function (e) {
    e = t(e, t.EMPTY_OBJECT), this.geometry = e.geometry, this.modelMatrix = n.clone(t(e.modelMatrix, n.IDENTITY)), this.id = e.id, this.pickPrimitive = e.pickPrimitive, this.attributes = t(e.attributes, {}), this.westHemisphereGeometry = void 0, this.eastHemisphereGeometry = void 0;
  };
}), define("Core/Ray", ["./Cartesian3", "./Check", "./defaultValue", "./defined"], function (n, e, r, o) {
  "use strict";

  function i(e, t) {
    t = n.clone(r(t, n.ZERO)), n.equals(t, n.ZERO) || n.normalize(t, t), this.origin = n.clone(r(e, n.ZERO)), this.direction = t;
  }

  return i.clone = function (e, t) {
    if (o(e)) return o(t) ? (t.origin = n.clone(e.origin), t.direction = n.clone(e.direction), t) : new i(e.origin, e.direction);
  }, i.getPoint = function (e, t, r) {
    return o(r) || (r = new n()), r = n.multiplyByScalar(e.direction, t, r), n.add(e.origin, r, r);
  }, i;
}), define("Core/QuadraticRealPolynomial", ["./DeveloperError", "./Math"], function (e, c) {
  "use strict";

  function l(e, t, r) {
    var n = e + t;
    return c.sign(e) !== c.sign(t) && Math.abs(n / Math.max(Math.abs(e), Math.abs(t))) < r ? 0 : n;
  }

  var t = {
    computeDiscriminant: function computeDiscriminant(e, t, r) {
      return t * t - 4 * e * r;
    },
    computeRealRoots: function computeRealRoots(e, t, r) {
      var n;
      if (0 === e) return 0 === t ? [] : [-r / t];

      if (0 === t) {
        if (0 === r) return [0, 0];
        var o = Math.abs(r),
            i = Math.abs(e);
        if (o < i && o / i < c.EPSILON14) return [0, 0];
        if (i < o && i / o < c.EPSILON14) return [];
        if ((n = -r / e) < 0) return [];
        var a = Math.sqrt(n);
        return [-a, a];
      }

      if (0 === r) return (n = -t / e) < 0 ? [n, 0] : [0, n];
      var u = l(t * t, -(4 * e * r), c.EPSILON14);
      if (u < 0) return [];
      var s = -.5 * l(t, c.sign(t) * Math.sqrt(u), c.EPSILON14);
      return 0 < t ? [s / e, r / s] : [r / s, s / e];
    }
  };
  return t;
}), define("Core/CubicRealPolynomial", ["./DeveloperError", "./QuadraticRealPolynomial"], function (e, u) {
  "use strict";

  function s(e, t, r, n) {
    var o = e,
        i = t / 3,
        a = r / 3,
        u = n,
        s = o * a,
        c = i * u,
        l = i * i,
        f = a * a,
        h = o * a - l,
        E = o * u - i * a,
        d = i * u - f,
        m = 4 * h * d - E * E;

    if (m < 0) {
      var p,
          _,
          R,
          y = s * f <= l * c ? -2 * i * (_ = h) + (p = o) * E : -(p = u) * E + 2 * a * (_ = d),
          T = -(y < 0 ? -1 : 1) * Math.abs(p) * Math.sqrt(-m),
          A = (R = T - y) / 2,
          S = A < 0 ? -Math.pow(-A, 1 / 3) : Math.pow(A, 1 / 3),
          C = R === T ? -S : -_ / S,
          g = _ <= 0 ? S + C : -y / (S * S + C * C + _);

      return s * f <= l * c ? [(g - i) / o] : [-u / (g + a)];
    }

    var O = h,
        N = -2 * i * h + o * E,
        I = d,
        M = -u * E + 2 * a * d,
        v = Math.sqrt(m),
        w = Math.sqrt(3) / 2,
        D = Math.abs(Math.atan2(o * v, -N) / 3);
    g = 2 * Math.sqrt(-O);
    var P = Math.cos(D);
    R = g * P;
    var F = g * (-P / 2 - w * Math.sin(D)),
        U = 2 * i < R + F ? R - i : F - i,
        L = o,
        x = U / L,
        D = Math.abs(Math.atan2(u * v, -M) / 3),
        B = -u,
        b = (R = (g = 2 * Math.sqrt(-I)) * (P = Math.cos(D))) + (F = g * (-P / 2 - w * Math.sin(D))) < 2 * a ? R + a : F + a,
        q = B / b,
        z = -U * b - L * B,
        G = (a * z - i * (U * B)) / (-i * z + a * (L * b));
    return x <= G ? x <= q ? G <= q ? [x, G, q] : [x, q, G] : [q, x, G] : x <= q ? [G, x, q] : G <= q ? [G, q, x] : [q, G, x];
  }

  var t = {
    computeDiscriminant: function computeDiscriminant(e, t, r, n) {
      var o = t * t,
          i = r * r;
      return 18 * e * t * r * n + o * i - 27 * (e * e) * (n * n) - 4 * (e * i * r + o * t * n);
    },
    computeRealRoots: function computeRealRoots(e, t, r, n) {
      var o, i;
      if (0 === e) return u.computeRealRoots(t, r, n);
      if (0 !== t) return 0 === r ? 0 === n ? (i = -t / e) < 0 ? [i, 0, 0] : [0, 0, i] : s(e, t, 0, n) : 0 === n ? 0 === (o = u.computeRealRoots(e, t, r)).length ? [0] : o[1] <= 0 ? [o[0], o[1], 0] : 0 <= o[0] ? [0, o[0], o[1]] : [o[0], 0, o[1]] : s(e, t, r, n);
      if (0 !== r) return 0 === n ? 0 === (o = u.computeRealRoots(e, 0, r)).Length ? [0] : [o[0], 0, o[1]] : s(e, 0, r, n);
      if (0 === n) return [0, 0, 0];
      var a = (i = -n / e) < 0 ? -Math.pow(-i, 1 / 3) : Math.pow(i, 1 / 3);
      return [a, a, a];
    }
  };
  return t;
}), define("Core/QuarticRealPolynomial", ["./CubicRealPolynomial", "./DeveloperError", "./Math", "./QuadraticRealPolynomial"], function (M, e, v, w) {
  "use strict";

  function l(e, t, r, n) {
    var o = e * e,
        i = t - 3 * o / 8,
        a = r - t * e / 2 + o * e / 8,
        u = n - r * e / 4 + t * o / 16 - 3 * o * o / 256,
        s = M.computeRealRoots(1, 2 * i, i * i - 4 * u, -a * a);

    if (0 < s.length) {
      var c = -e / 4,
          l = s[s.length - 1];

      if (Math.abs(l) < v.EPSILON14) {
        var f = w.computeRealRoots(1, i, u);

        if (2 === f.length) {
          var h,
              E = f[0],
              d = f[1];

          if (0 <= E && 0 <= d) {
            var m = Math.sqrt(E),
                p = Math.sqrt(d);
            return [c - p, c - m, c + m, c + p];
          }

          if (0 <= E && d < 0) return [c - (h = Math.sqrt(E)), c + h];
          if (E < 0 && 0 <= d) return [c - (h = Math.sqrt(d)), c + h];
        }

        return [];
      }

      if (0 < l) {
        var _ = Math.sqrt(l),
            R = (i + l - a / _) / 2,
            y = (i + l + a / _) / 2,
            T = w.computeRealRoots(1, _, R),
            A = w.computeRealRoots(1, -_, y);

        return 0 !== T.length ? (T[0] += c, T[1] += c, 0 !== A.length ? (A[0] += c, A[1] += c, T[1] <= A[0] ? [T[0], T[1], A[0], A[1]] : A[1] <= T[0] ? [A[0], A[1], T[0], T[1]] : T[0] >= A[0] && T[1] <= A[1] ? [A[0], T[0], T[1], A[1]] : A[0] >= T[0] && A[1] <= T[1] ? [T[0], A[0], A[1], T[1]] : T[0] > A[0] && T[0] < A[1] ? [A[0], T[0], A[1], T[1]] : [T[0], A[0], T[1], A[1]]) : T) : 0 !== A.length ? (A[0] += c, A[1] += c, A) : [];
      }
    }

    return [];
  }

  function f(e, t, r, n) {
    var o = e * e,
        i = -2 * t,
        a = r * e + t * t - 4 * n,
        u = o * n - r * t * e + r * r,
        s = M.computeRealRoots(1, i, a, u);

    if (0 < s.length) {
      var c,
          l,
          f,
          h,
          E,
          d,
          m,
          p,
          _ = s[0],
          R = t - _,
          y = R * R,
          T = e / 2,
          A = R / 2,
          S = y - 4 * n,
          C = y + 4 * Math.abs(n),
          g = o - 4 * _,
          O = o + 4 * Math.abs(_);
      f = _ < 0 || S * O < g * C ? (l = (c = Math.sqrt(g)) / 2, 0 === c ? 0 : (e * A - r) / c) : (l = 0 === (h = Math.sqrt(S)) ? 0 : (e * A - r) / h, h / 2), 0 == T && 0 === l ? d = E = 0 : v.sign(T) === v.sign(l) ? d = _ / (E = T + l) : E = _ / (d = T - l), 0 == A && 0 === f ? p = m = 0 : v.sign(A) === v.sign(f) ? p = n / (m = A + f) : m = n / (p = A - f);
      var N = w.computeRealRoots(1, E, m),
          I = w.computeRealRoots(1, d, p);
      if (0 !== N.length) return 0 !== I.length ? N[1] <= I[0] ? [N[0], N[1], I[0], I[1]] : I[1] <= N[0] ? [I[0], I[1], N[0], N[1]] : N[0] >= I[0] && N[1] <= I[1] ? [I[0], N[0], N[1], I[1]] : I[0] >= N[0] && I[1] <= N[1] ? [N[0], I[0], I[1], N[1]] : N[0] > I[0] && N[0] < I[1] ? [I[0], N[0], I[1], N[1]] : [N[0], I[0], N[1], I[1]] : N;
      if (0 !== I.length) return I;
    }

    return [];
  }

  var t = {
    computeDiscriminant: function computeDiscriminant(e, t, r, n, o) {
      var i = e * e,
          a = t * t,
          u = a * t,
          s = r * r,
          c = s * r,
          l = n * n,
          f = l * n,
          h = o * o;
      return a * s * l - 4 * u * f - 4 * e * c * l + 18 * e * t * r * f - 27 * i * l * l + 256 * (i * e) * (h * o) + o * (18 * u * r * n - 4 * a * c + 16 * e * s * s - 80 * e * t * s * n - 6 * e * a * l + 144 * i * r * l) + h * (144 * e * a * r - 27 * a * a - 128 * i * s - 192 * i * t * n);
    },
    computeRealRoots: function computeRealRoots(e, t, r, n, o) {
      if (Math.abs(e) < v.EPSILON15) return M.computeRealRoots(t, r, n, o);
      var i = t / e,
          a = r / e,
          u = n / e,
          s = o / e,
          c = i < 0 ? 1 : 0;

      switch (c += a < 0 ? c + 1 : c, c += u < 0 ? c + 1 : c, c += s < 0 ? c + 1 : c) {
        case 0:
          return l(i, a, u, s);

        case 1:
        case 2:
          return f(i, a, u, s);

        case 3:
        case 4:
          return l(i, a, u, s);

        case 5:
          return f(i, a, u, s);

        case 6:
        case 7:
          return l(i, a, u, s);

        case 8:
          return f(i, a, u, s);

        case 9:
        case 10:
          return l(i, a, u, s);

        case 11:
          return f(i, a, u, s);

        case 12:
        case 13:
        case 14:
        case 15:
          return l(i, a, u, s);

        default:
          return;
      }
    }
  };
  return t;
}), define("Core/IntersectionTests", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Interval", "./Math", "./Matrix3", "./QuadraticRealPolynomial", "./QuarticRealPolynomial", "./Ray"], function (F, e, _, v, t, p, U, L, x, B, r) {
  "use strict";

  function u(e, t, r) {
    v(r) || (r = new p());

    var n = e.origin,
        o = e.direction,
        i = t.center,
        a = t.radius * t.radius,
        u = F.subtract(n, i, T),
        s = function (e, t, r, n) {
      var o = t * t - 4 * e * r;

      if (!(o < 0)) {
        if (0 < o) {
          var i = 1 / (2 * e),
              a = Math.sqrt(o),
              u = (-t + a) * i,
              s = (-t - a) * i;
          return u < s ? (n.root0 = u, n.root1 = s) : (n.root0 = s, n.root1 = u), n;
        }

        var c = -t / (2 * e);
        if (0 != c) return n.root0 = n.root1 = c, n;
      }
    }(F.dot(o, o), 2 * F.dot(o, u), F.magnitudeSquared(u) - a, l);

    if (v(s)) return r.start = s.root0, r.stop = s.root1, r;
  }

  function b(e, t, r) {
    var n = e + t;
    return U.sign(e) !== U.sign(t) && Math.abs(n / Math.max(Math.abs(e), Math.abs(t))) < r ? 0 : n;
  }

  var h = {
    rayPlane: function rayPlane(e, t, r) {
      v(r) || (r = new F());
      var n = e.origin,
          o = e.direction,
          i = t.normal,
          a = F.dot(i, o);

      if (!(Math.abs(a) < U.EPSILON15)) {
        var u = (-t.distance - F.dot(i, n)) / a;
        if (!(u < 0)) return r = F.multiplyByScalar(o, u, r), F.add(n, r, r);
      }
    }
  },
      R = new F(),
      y = new F(),
      T = new F(),
      A = new F(),
      S = new F();
  h.rayTriangleParametric = function (e, t, r, n, o) {
    o = _(o, !1);
    var i,
        a,
        u,
        s,
        c = e.origin,
        l = e.direction,
        f = F.subtract(r, t, R),
        h = F.subtract(n, t, y),
        E = F.cross(l, h, T),
        d = F.dot(f, E);

    if (o) {
      if (d < U.EPSILON6) return;
      if (p = F.subtract(c, t, A), (a = F.dot(p, E)) < 0 || d < a) return;
      if (i = F.cross(p, f, S), (u = F.dot(l, i)) < 0 || d < a + u) return;
      s = F.dot(h, i) / d;
    } else {
      if (Math.abs(d) < U.EPSILON6) return;
      var m = 1 / d,
          p = F.subtract(c, t, A);
      if ((a = F.dot(p, E) * m) < 0 || 1 < a) return;
      if (i = F.cross(p, f, S), (u = F.dot(l, i) * m) < 0 || 1 < a + u) return;
      s = F.dot(h, i) * m;
    }

    return s;
  }, h.rayTriangle = function (e, t, r, n, o, i) {
    var a = h.rayTriangleParametric(e, t, r, n, o);
    if (v(a) && !(a < 0)) return v(i) || (i = new F()), F.multiplyByScalar(e.direction, a, i), F.add(e.origin, i, i);
  };
  var c = new r();

  h.lineSegmentTriangle = function (e, t, r, n, o, i, a) {
    var u = c;
    F.clone(e, u.origin), F.subtract(t, e, u.direction), F.normalize(u.direction, u.direction);
    var s = h.rayTriangleParametric(u, r, n, o, i);
    if (!(!v(s) || s < 0 || s > F.distance(e, t))) return v(a) || (a = new F()), F.multiplyByScalar(u.direction, s, a), F.add(u.origin, a, a);
  };

  var l = {
    root0: 0,
    root1: 0
  };

  h.raySphere = function (e, t, r) {
    if (r = u(e, t, r), v(r) && !(r.stop < 0)) return r.start = Math.max(r.start, 0), r;
  };

  var s = new r();

  h.lineSegmentSphere = function (e, t, r, n) {
    var o = s;
    F.clone(e, o.origin);
    var i = F.subtract(t, e, o.direction),
        a = F.magnitude(i);
    if (F.normalize(i, i), n = u(o, r, n), !(!v(n) || n.stop < 0 || n.start > a)) return n.start = Math.max(n.start, 0), n.stop = Math.min(n.stop, a), n;
  };

  var C = new F(),
      g = new F();

  h.rayEllipsoid = function (e, t) {
    var r,
        n,
        o = t.oneOverRadii,
        i = F.multiplyComponents(o, e.origin, C),
        a = F.multiplyComponents(o, e.direction, g),
        u = F.magnitudeSquared(i),
        s = F.dot(i, a);

    if (1 < u) {
      if (0 <= s) return;
      var c,
          l,
          f = s * s,
          h = u - 1;
      if (f < (l = (c = F.magnitudeSquared(a)) * h)) return;

      if (l < f) {
        r = s * s - l;
        var E = (n = -s + Math.sqrt(r)) / c,
            d = h / n;
        return E < d ? new p(E, d) : {
          start: d,
          stop: E
        };
      }

      var m = Math.sqrt(h / c);
      return new p(m, m);
    }

    return u < 1 ? (h = u - 1, r = s * s - (l = (c = F.magnitudeSquared(a)) * h), n = -s + Math.sqrt(r), new p(0, n / c)) : s < 0 ? (c = F.magnitudeSquared(a), new p(0, -s / c)) : void 0;
  };

  var w = new F(),
      D = new F(),
      P = new F(),
      q = new F(),
      z = new F(),
      G = new L(),
      H = new L(),
      V = new L(),
      W = new L(),
      X = new L(),
      Y = new L(),
      k = new L(),
      j = new F(),
      K = new F(),
      Z = new e();

  h.grazingAltitudeLocation = function (e, t) {
    var r = e.origin,
        n = e.direction;

    if (!F.equals(r, F.ZERO)) {
      var o = t.geodeticSurfaceNormal(r, w);
      if (0 <= F.dot(n, o)) return r;
    }

    var i = v(this.rayEllipsoid(e, t)),
        a = t.transformPositionToScaledSpace(n, w),
        u = F.normalize(a, a),
        s = F.mostOrthogonalAxis(a, q),
        c = F.normalize(F.cross(s, u, D), D),
        l = F.normalize(F.cross(u, c, P), P),
        f = G;
    f[0] = u.x, f[1] = u.y, f[2] = u.z, f[3] = c.x, f[4] = c.y, f[5] = c.z, f[6] = l.x, f[7] = l.y, f[8] = l.z;
    var h = L.transpose(f, H),
        E = L.fromScale(t.radii, V),
        d = L.fromScale(t.oneOverRadii, W),
        m = X;
    m[0] = 0, m[1] = -n.z, m[2] = n.y, m[3] = n.z, m[4] = 0, m[5] = -n.x, m[6] = -n.y, m[7] = n.x, m[8] = 0;

    var p,
        _ = L.multiply(L.multiply(h, d, Y), m, Y),
        R = L.multiply(L.multiply(_, E, k), f, k),
        y = L.multiplyByVector(_, r, z),
        T = function (e, t, r, n, o) {
      var i,
          a = n * n,
          u = o * o,
          s = (e[L.COLUMN1ROW1] - e[L.COLUMN2ROW2]) * u,
          c = o * (n * b(e[L.COLUMN1ROW0], e[L.COLUMN0ROW1], U.EPSILON15) + t.y),
          l = e[L.COLUMN0ROW0] * a + e[L.COLUMN2ROW2] * u + n * t.x + r,
          f = u * b(e[L.COLUMN2ROW1], e[L.COLUMN1ROW2], U.EPSILON15),
          h = o * (n * b(e[L.COLUMN2ROW0], e[L.COLUMN0ROW2]) + t.z),
          E = [];

      if (0 == h && 0 == f) {
        if (0 === (i = x.computeRealRoots(s, c, l)).length) return E;

        var d,
            m,
            p = i[0],
            _ = Math.sqrt(Math.max(1 - p * p, 0));

        return E.push(new F(n, o * p, o * -_)), E.push(new F(n, o * p, o * _)), 2 === i.length && (d = i[1], m = Math.sqrt(Math.max(1 - d * d, 0)), E.push(new F(n, o * d, o * -m)), E.push(new F(n, o * d, o * m))), E;
      }

      var R = h * h,
          y = f * f,
          T = h * f,
          A = s * s + y,
          S = 2 * (c * s + T),
          C = 2 * l * s + c * c - y + R,
          g = 2 * (l * c - T),
          O = l * l - R;
      if (0 == A && 0 == S && 0 == C && 0 == g) return E;
      var N = (i = B.computeRealRoots(A, S, C, g, O)).length;
      if (0 === N) return E;

      for (var I = 0; I < N; ++I) {
        var M = i[I],
            v = M * M,
            w = Math.max(1 - v, 0),
            D = Math.sqrt(w),
            P = (U.sign(s) === U.sign(l) ? b(s * v + l, c * M, U.EPSILON12) : U.sign(l) === U.sign(c * M) ? b(s * v, c * M + l, U.EPSILON12) : b(s * v + c * M, l, U.EPSILON12)) * b(f * M, h, U.EPSILON15);
        P < 0 ? E.push(new F(n, o * M, o * D)) : 0 < P ? E.push(new F(n, o * M, o * -D)) : 0 !== D ? (E.push(new F(n, o * M, o * -D)), E.push(new F(n, o * M, o * D)), ++I) : E.push(new F(n, o * M, o * D));
      }

      return E;
    }(R, F.negate(y, w), 0, 0, 1),
        A = T.length;

    if (0 < A) {
      for (var S = F.clone(F.ZERO, K), C = Number.NEGATIVE_INFINITY, g = 0; g < A; ++g) {
        p = L.multiplyByVector(E, L.multiplyByVector(f, T[g], j), j);
        var O = F.normalize(F.subtract(p, r, q), q),
            N = F.dot(O, n);
        C < N && (C = N, S = F.clone(p, S));
      }

      var I = t.cartesianToCartographic(S, Z),
          C = U.clamp(C, 0, 1),
          M = F.magnitude(F.subtract(S, r, q)) * Math.sqrt(1 - C * C);
      return M = i ? -M : M, I.height = M, t.cartographicToCartesian(I, new F());
    }
  };

  var f = new F();
  return h.lineSegmentPlane = function (e, t, r, n) {
    v(n) || (n = new F());
    var o = F.subtract(t, e, f),
        i = r.normal,
        a = F.dot(i, o);

    if (!(Math.abs(a) < U.EPSILON6)) {
      var u = F.dot(i, e),
          s = -(r.distance + u) / a;
      if (!(s < 0 || 1 < s)) return F.multiplyByScalar(o, s, n), F.add(e, n, n), n;
    }
  }, h.trianglePlaneIntersection = function (e, t, r, n) {
    var o,
        i,
        a = n.normal,
        u = n.distance,
        s = F.dot(a, e) + u < 0,
        c = F.dot(a, t) + u < 0,
        l = F.dot(a, r) + u < 0,
        f = 0;

    if (f += s ? 1 : 0, f += c ? 1 : 0, 1 != (f += l ? 1 : 0) && 2 != f || (o = new F(), i = new F()), 1 == f) {
      if (s) return h.lineSegmentPlane(e, t, n, o), h.lineSegmentPlane(e, r, n, i), {
        positions: [e, t, r, o, i],
        indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
      };
      if (c) return h.lineSegmentPlane(t, r, n, o), h.lineSegmentPlane(t, e, n, i), {
        positions: [e, t, r, o, i],
        indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
      };
      if (l) return h.lineSegmentPlane(r, e, n, o), h.lineSegmentPlane(r, t, n, i), {
        positions: [e, t, r, o, i],
        indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
      };
    } else if (2 == f) {
      if (!s) return h.lineSegmentPlane(t, e, n, o), h.lineSegmentPlane(r, e, n, i), {
        positions: [e, t, r, o, i],
        indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
      };
      if (!c) return h.lineSegmentPlane(r, t, n, o), h.lineSegmentPlane(e, t, n, i), {
        positions: [e, t, r, o, i],
        indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
      };
      if (!l) return h.lineSegmentPlane(e, r, n, o), h.lineSegmentPlane(t, r, n, i), {
        positions: [e, t, r, o, i],
        indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
      };
    }
  }, h;
}), define("Workers/computeCutFill", ["./createTaskProcessorWorker", "../Core/defineProperties", "../Core/Color", "../Core/Geometry", "../Core/Cartesian2", "../Scene/HorizontalOrigin", "../Scene/VerticalOrigin", "../Core/GeometryAttribute", "../Core/ComponentDatatype", "../Core/PrimitiveType", "../Core/BoundingSphere", "../Scene/Appearance", "../Scene/BlendingState", "../Core/GeometryInstance", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Math", "../Core/Matrix4", "../Core/Ray", "../Core/Event", "../Core/IntersectionTests"], function (e, t, r, n, _e, o, i, a, u, s, c, l, f, h, Re, ye, Te, Ae, Se, E, Ce) {
  "use strict";

  return e(function (e, t) {
    for (var r = e.sampleGap, n = e.geoPolygon, o = e.vertice, i = e.matLocalInvert, a = e.matLocal, u = e.zFactor, s = n._polygonHierarchy.positions, c = [], l = ye.fromCartesian(s[0]), f = Te.toDegrees(l.longitude), h = Te.toDegrees(l.latitude), E = Te.toDegrees(l.longitude), d = Te.toDegrees(l.latitude), m = 0; m < s.length; m++) {
      var p = ye.fromCartesian(s[m]),
          _ = Te.toDegrees(p.longitude),
          R = Te.toDegrees(p.latitude),
          y = new _e(_, R);

      c.push(y), E < _ && (E = _), _ < f && (f = _), d < R && (d = R), R < h && (h = R);
    }

    var T = Re.distance(Re.fromDegrees(f, h, u), Re.fromDegrees(E, h, u)),
        A = Re.distance(Re.fromDegrees(f, h, u), Re.fromDegrees(f, d, u)),
        S = parseInt(T / r + 1),
        C = parseInt(A / r + 1);
    65535 < S * C && (r = T < A ? (S = (C = 256) * (T / A), A / 256) : (C = (S = 256) * (A / T), T / 256));

    for (var g = (E - f) / (S - 1), O = (d - h) / (C - 1), N = T / (S - 1) * (A / (C - 1)), I = [], m = 0; m < S; m++) {
      for (var M = 0; M < C; M++) {
        for (var v, w = new _e(f + m * g, h + M * O), D = !1, P = 0, F = s.length - 1; P < s.length; F = P++) {
          c[P].y > w.y != c[F].y > w.y && w.x < (c[F].x - c[P].x) * (w.y - c[P].y) / (c[F].y - c[P].y) + c[P].x && (D = !D);
        }

        1 == D && (v = new Re.fromDegrees(f + m * g, h + M * O, u), I.push(v));
      }
    }

    for (var U = [], L = [], x = [], B = [], m = 0; m < I.length; m++) {
      var b = new Re(I[m].x, I[m].y, I[m].z),
          q = ye.fromCartesian(b),
          z = Te.toDegrees(q.longitude),
          G = Te.toDegrees(q.latitude),
          H = q.height,
          V = new Re.fromDegrees(z, G, H - 10);
      Ae.multiplyByPoint(i, b, b), Ae.multiplyByPoint(i, V, V);
      var W = new Re(V.x - b.x, V.y - b.y, V.z - b.z),
          X = new Se(b, W),
          Y = new Re(I[m].x, I[m].y, I[m].z),
          k = new Re(-Y.x, -Y.y, -Y.z),
          j = new Se(Y, k),
          K = new Re(I[m].x, I[m].y, I[m].z),
          Z = new Re.fromDegrees(z, G, H + 10);
      Ae.multiplyByPoint(i, K, K), Ae.multiplyByPoint(i, Z, Z);

      for (var Q, J, $ = new Re(Z.x - K.x, Z.y - K.y, Z.z - K.z), ee = new Se(K, $), te = new Re(Y.x, Y.y, Y.z), re = new Se(Y, te), ne = [], oe = [], F = 0; F < o.length; F++) {
        var ie = new Re(),
            ie = Ce.raySphere(j, o[F].boundingVolume, ie),
            ae = new Re(),
            ae = Ce.raySphere(re, o[F].boundingVolume, ae);

        if (null != o[F] && void 0 !== ie) {
          for (var ue = o[F].indices, se = o[F].verts, ce = [], P = 0; P < se.length / 3; P++) {
            (fe = new Re(0, 0, 0)).x = se[3 * P], fe.y = se[3 * P + 1], fe.z = se[3 * P + 2], ce.push(fe);
          }

          for (var le = 0; le < ue.length / 3; le++) {
            w = new Re();
            (he = []).push(ce[ue[3 * le]], ce[ue[3 * le + 1]], ce[ue[3 * le + 2]]), void 0 !== (w = Ce.rayTriangle(X, he[0], he[1], he[2], !1, w)) && ne.push(w);
          }
        }

        if (null != o[F] && void 0 !== ae) {
          for (var fe, ue = o[F].indices, se = o[F].verts, ce = [], P = 0; P < se.length / 3; P++) {
            (fe = new Re(0, 0, 0)).x = se[3 * P], fe.y = se[3 * P + 1], fe.z = se[3 * P + 2], ce.push(fe);
          }

          for (le = 0; le < ue.length / 3; le++) {
            var he,
                w = new Re();
            (he = []).push(ce[ue[3 * le]], ce[ue[3 * le + 1]], ce[ue[3 * le + 2]]), void 0 !== (w = Ce.rayTriangle(ee, he[0], he[1], he[2], !1, w)) && oe.push(w);
          }
        }
      }

      if (1 < oe.length) {
        for (var Ee = oe[0], de = 1; de < oe.length; de++) {
          Re.distance(oe[de], b) < Re.distance(Ee, b) && (Ee = oe[de]);
        }

        Ae.multiplyByPoint(a, Ee, Ee);
        var me = Re.distance(Y, Ee);
        L.push(me), B.push(Y, Ee);
      }

      if (1 == oe.length && (Q = oe[0], Ae.multiplyByPoint(a, Q, Q), J = Re.distance(Y, Q), L.push(J), B.push(Y, Q)), 1 < ne.length) {
        for (Ee = ne[0], de = 1; de < ne.length; de++) {
          Re.distance(ne[de], b) < Re.distance(Ee, b) && (Ee = ne[de]);
        }

        Ae.multiplyByPoint(a, Ee, Ee);
        me = Re.distance(Y, Ee);
        U.push(me), x.push(Y, Ee);
      }

      1 == ne.length && (Q = ne[0], Ae.multiplyByPoint(a, Q, Q), J = Re.distance(Y, Q), U.push(J), x.push(Y, Q));
    }

    var pe = [];
    return pe.hightFill = U, pe.hightCut = L, pe.pointsLine = x, pe.pointsLine1 = B, pe.areaSample = N, pe;
  });
});