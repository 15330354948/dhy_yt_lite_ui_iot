"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, r) {
  t != Array.prototype && t != Object.prototype && (t[e] = r.value);
}, $jscomp.getGlobal = function (t) {
  return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t;
}, $jscomp.global = $jscomp.getGlobal(void 0), $jscomp.polyfill = function (t, e, r, n) {
  if (e) {
    for (r = $jscomp.global, t = t.split("."), n = 0; n < t.length - 1; n++) {
      var o = t[n];
      o in r || (r[o] = {}), r = r[o];
    }

    t = t[t.length - 1], n = r[t], e = e(n), e != n && null != e && $jscomp.defineProperty(r, t, {
      configurable: !0,
      writable: !0,
      value: e
    });
  }
}, $jscomp.polyfill("Math.imul", function (t) {
  return t || function (t, e) {
    t = Number(t), e = Number(e);
    var r = 65535 & t,
        n = 65535 & e;
    return r * n + ((t >>> 16 & 65535) * n + r * (e >>> 16 & 65535) << 16 >>> 0) | 0;
  };
}, "es6", "es3"), $jscomp.polyfill("Math.clz32", function (t) {
  return t || function (t) {
    if (0 === (t = Number(t) >>> 0)) return 32;
    var e = 0;
    return 0 == (4294901760 & t) && (t <<= 16, e += 16), 0 == (4278190080 & t) && (t <<= 8, e += 8), 0 == (4026531840 & t) && (t <<= 4, e += 4), 0 == (3221225472 & t) && (t <<= 2, e += 2), 0 == (2147483648 & t) && e++, e;
  };
}, "es6", "es3"), $jscomp.polyfill("Math.trunc", function (t) {
  return t || function (t) {
    if (t = Number(t), isNaN(t) || 1 / 0 === t || -1 / 0 === t || 0 === t) return t;
    var e = Math.floor(Math.abs(t));
    return 0 > t ? -e : e;
  };
}, "es6", "es3"), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
}, $jscomp.symbolCounter_ = 0, $jscomp.Symbol = function (t) {
  return $jscomp.SYMBOL_PREFIX + (t || "") + $jscomp.symbolCounter_++;
}, $jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var t = $jscomp.global.Symbol.iterator;
  t || (t = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator")), "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, {
    configurable: !0,
    writable: !0,
    value: function value() {
      return $jscomp.arrayIterator(this);
    }
  }), $jscomp.initSymbolIterator = function () {};
}, $jscomp.arrayIterator = function (t) {
  var e = 0;
  return $jscomp.iteratorPrototype(function () {
    return e < t.length ? {
      done: !1,
      value: t[e++]
    } : {
      done: !0
    };
  });
}, $jscomp.iteratorPrototype = function (t) {
  return $jscomp.initSymbolIterator(), t = {
    next: t
  }, t[$jscomp.global.Symbol.iterator] = function () {
    return this;
  }, t;
}, $jscomp.makeIterator = function (t) {
  $jscomp.initSymbolIterator();
  var e = t[Symbol.iterator];
  return e ? e.call(t) : $jscomp.arrayIterator(t);
}, $jscomp.FORCE_POLYFILL_PROMISE = !1, $jscomp.polyfill("Promise", function (t) {
  function e() {
    this.batch_ = null;
  }

  function r(t) {
    return t instanceof o ? t : new o(function (e, r) {
      e(t);
    });
  }

  if (t && !$jscomp.FORCE_POLYFILL_PROMISE) return t;
  e.prototype.asyncExecute = function (t) {
    return null == this.batch_ && (this.batch_ = [], this.asyncExecuteBatch_()), this.batch_.push(t), this;
  }, e.prototype.asyncExecuteBatch_ = function () {
    var t = this;
    this.asyncExecuteFunction(function () {
      t.executeBatch_();
    });
  };
  var n = $jscomp.global.setTimeout;
  e.prototype.asyncExecuteFunction = function (t) {
    n(t, 0);
  }, e.prototype.executeBatch_ = function () {
    for (; this.batch_ && this.batch_.length;) {
      var t = this.batch_;
      this.batch_ = [];

      for (var e = 0; e < t.length; ++e) {
        var r = t[e];
        delete t[e];

        try {
          r();
        } catch (t) {
          this.asyncThrow_(t);
        }
      }
    }

    this.batch_ = null;
  }, e.prototype.asyncThrow_ = function (t) {
    this.asyncExecuteFunction(function () {
      throw t;
    });
  };

  var o = function o(t) {
    this.state_ = 0, this.result_ = void 0, this.onSettledCallbacks_ = [];
    var e = this.createResolveAndReject_();

    try {
      t(e.resolve, e.reject);
    } catch (t) {
      e.reject(t);
    }
  };

  o.prototype.createResolveAndReject_ = function () {
    function t(t) {
      return function (n) {
        r || (r = !0, t.call(e, n));
      };
    }

    var e = this,
        r = !1;
    return {
      resolve: t(this.resolveTo_),
      reject: t(this.reject_)
    };
  }, o.prototype.resolveTo_ = function (t) {
    if (t === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));else if (t instanceof o) this.settleSameAsPromise_(t);else {
      t: switch (_typeof(t)) {
        case "object":
          var e = null != t;
          break t;

        case "function":
          e = !0;
          break t;

        default:
          e = !1;
      }

      e ? this.resolveToNonPromiseObj_(t) : this.fulfill_(t);
    }
  }, o.prototype.resolveToNonPromiseObj_ = function (t) {
    var e = void 0;

    try {
      e = t.then;
    } catch (t) {
      return void this.reject_(t);
    }

    "function" == typeof e ? this.settleSameAsThenable_(e, t) : this.fulfill_(t);
  }, o.prototype.reject_ = function (t) {
    this.settle_(2, t);
  }, o.prototype.fulfill_ = function (t) {
    this.settle_(1, t);
  }, o.prototype.settle_ = function (t, e) {
    if (0 != this.state_) throw Error("Cannot settle(" + t + ", " + e | "): Promise already settled in state" + this.state_);
    this.state_ = t, this.result_ = e, this.executeOnSettledCallbacks_();
  }, o.prototype.executeOnSettledCallbacks_ = function () {
    if (null != this.onSettledCallbacks_) {
      for (var t = this.onSettledCallbacks_, e = 0; e < t.length; ++e) {
        t[e].call(), t[e] = null;
      }

      this.onSettledCallbacks_ = null;
    }
  };
  var i = new e();
  return o.prototype.settleSameAsPromise_ = function (t) {
    var e = this.createResolveAndReject_();
    t.callWhenSettled_(e.resolve, e.reject);
  }, o.prototype.settleSameAsThenable_ = function (t, e) {
    var r = this.createResolveAndReject_();

    try {
      t.call(e, r.resolve, r.reject);
    } catch (t) {
      r.reject(t);
    }
  }, o.prototype.then = function (t, e) {
    function r(t, e) {
      return "function" == typeof t ? function (e) {
        try {
          n(t(e));
        } catch (t) {
          i(t);
        }
      } : e;
    }

    var n,
        i,
        _ = new o(function (t, e) {
      n = t, i = e;
    });

    return this.callWhenSettled_(r(t, n), r(e, i)), _;
  }, o.prototype["catch"] = function (t) {
    return this.then(void 0, t);
  }, o.prototype.callWhenSettled_ = function (t, e) {
    function r() {
      switch (n.state_) {
        case 1:
          t(n.result_);
          break;

        case 2:
          e(n.result_);
          break;

        default:
          throw Error("Unexpected state: " + n.state_);
      }
    }

    var n = this;
    null == this.onSettledCallbacks_ ? i.asyncExecute(r) : this.onSettledCallbacks_.push(function () {
      i.asyncExecute(r);
    });
  }, o.resolve = r, o.reject = function (t) {
    return new o(function (e, r) {
      r(t);
    });
  }, o.race = function (t) {
    return new o(function (e, n) {
      for (var o = $jscomp.makeIterator(t), i = o.next(); !i.done; i = o.next()) {
        r(i.value).callWhenSettled_(e, n);
      }
    });
  }, o.all = function (t) {
    var e = $jscomp.makeIterator(t),
        n = e.next();
    return n.done ? r([]) : new o(function (t, o) {
      var i = [],
          _ = 0;

      do {
        i.push(void 0), _++, r(n.value).callWhenSettled_(function (e) {
          return function (r) {
            i[e] = r, 0 == --_ && t(i);
          };
        }(i.length - 1), o), n = e.next();
      } while (!n.done);
    });
  }, o;
}, "es6", "es3");

var DracoDecoderModule = function DracoDecoderModule(t) {
  function e(t, e) {
    t || b("Assertion failed: " + e);
  }

  function r(t, e) {
    if (0 === e || !t) return "";

    for (var r, n = 0, o = 0; (r = nt[t + o >> 0], n |= r, 0 != r || e) && (o++, !e || o != e);) {
      ;
    }

    if (e || (e = o), r = "", 128 > n) {
      for (; 0 < e;) {
        n = String.fromCharCode.apply(String, nt.subarray(t, t + Math.min(e, 1024))), r = r ? r + n : n, t += 1024, e -= 1024;
      }

      return r;
    }

    return x.UTF8ToString(t);
  }

  function n(t) {
    return t.replace(/__Z[\w\d_]+/g, function (t) {
      return t === t ? t : t + " [" + t + "]";
    });
  }

  function o() {
    t: {
      var t = Error();

      if (!t.stack) {
        try {
          throw Error(0);
        } catch (e) {
          t = e;
        }

        if (!t.stack) {
          t = "(no stack trace available)";
          break t;
        }
      }

      t = t.stack.toString();
    }

    return x.extraStackTrace && (t += "\n" + x.extraStackTrace()), n(t);
  }

  function i(t, e) {
    return 0 < t % e && (t += e - t % e), t;
  }

  function _() {
    x.HEAP8 = rt = new Int8Array(Et), x.HEAP16 = ot = new Int16Array(Et), x.HEAP32 = _t = new Int32Array(Et), x.HEAPU8 = nt = new Uint8Array(Et), x.HEAPU16 = it = new Uint16Array(Et), x.HEAPU32 = at = new Uint32Array(Et), x.HEAPF32 = pt = new Float32Array(Et), x.HEAPF64 = ut = new Float64Array(Et);
  }

  function a() {
    var t = x.usingWasm ? dt : bt,
        e = 2147483648 - t;
    if (_t[mt >> 2] > e) return !1;
    var r = vt;

    for (vt = Math.max(vt, ht); vt < _t[mt >> 2];) {
      vt = 536870912 >= vt ? i(2 * vt, t) : Math.min(i((3 * vt + 2147483648) / 4, t), e);
    }

    return (t = x.reallocBuffer(vt)) && t.byteLength == vt ? (x.buffer = Et = t, _(), !0) : (vt = r, !1);
  }

  function p(t) {
    for (; 0 < t.length;) {
      var e = t.shift();
      if ("function" == typeof e) e();else {
        var r = e.func;
        "number" == typeof r ? void 0 === e.arg ? x.dynCall_v(r) : x.dynCall_vi(r, e.arg) : r(void 0 === e.arg ? null : e.arg);
      }
    }
  }

  function u(t) {
    wt++, x.monitorRunDependencies && x.monitorRunDependencies(wt);
  }

  function c(t) {
    wt--, x.monitorRunDependencies && x.monitorRunDependencies(wt), 0 == wt && (null !== Gt && (clearInterval(Gt), Gt = null), Ot && (t = Ot, Ot = null, t()));
  }

  function s() {
    return !!s.uncaught_exception;
  }

  function l() {
    var t = Nt.last;
    if (!t) return 0 | (J.setTempRet0(0), 0);
    var e = Nt.infos[t],
        r = e.type;
    if (!r) return 0 | (J.setTempRet0(0), t);
    var n = Array.prototype.slice.call(arguments);
    x.___cxa_is_pointer_type(r), l.buffer || (l.buffer = an(4)), _t[l.buffer >> 2] = t, t = l.buffer;

    for (var o = 0; o < n.length; o++) {
      if (n[o] && x.___cxa_can_catch(n[o], r, t)) return t = _t[t >> 2], e.adjusted = t, 0 | (J.setTempRet0(n[o]), t);
    }

    return t = _t[t >> 2], 0 | (J.setTempRet0(r), t);
  }

  function y(t, r) {
    Ft.varargs = r;

    try {
      var n = Ft.get(),
          o = Ft.get(),
          i = Ft.get();

      for (t = 0, y.buffer || (y.buffers = [null, [], []], y.printChar = function (t, r) {
        var n = y.buffers[t];

        if (e(n), 0 === r || 10 === r) {
          t = 1 === t ? x.print : x.printErr;

          t: {
            for (var o = r = 0; n[o];) {
              ++o;
            }

            if (16 < o - r && n.subarray && et) r = et.decode(n.subarray(r, o));else for (o = "";;) {
              var i = n[r++];

              if (!i) {
                r = o;
                break t;
              }

              if (128 & i) {
                var _ = 63 & n[r++];

                if (192 == (224 & i)) o += String.fromCharCode((31 & i) << 6 | _);else {
                  var a = 63 & n[r++];
                  if (224 == (240 & i)) i = (15 & i) << 12 | _ << 6 | a;else {
                    var p = 63 & n[r++];
                    if (240 == (248 & i)) i = (7 & i) << 18 | _ << 12 | a << 6 | p;else {
                      var u = 63 & n[r++];
                      if (248 == (252 & i)) i = (3 & i) << 24 | _ << 18 | a << 12 | p << 6 | u;else {
                        var c = 63 & n[r++];
                        i = (1 & i) << 30 | _ << 24 | a << 18 | p << 12 | u << 6 | c;
                      }
                    }
                  }
                  65536 > i ? o += String.fromCharCode(i) : (i -= 65536, o += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i));
                }
              } else o += String.fromCharCode(i);
            }
          }

          t(r), n.length = 0;
        } else n.push(r);
      }), r = 0; r < i; r++) {
        for (var _ = _t[o + 8 * r >> 2], a = _t[o + (8 * r + 4) >> 2], p = 0; p < a; p++) {
          y.printChar(n, nt[_ + p]);
        }

        t += a;
      }

      return t;
    } catch (t) {
      return "undefined" != typeof FS && t instanceof FS.ErrnoError || b(t), -t.errno;
    }
  }

  function f(t, e) {
    f.seen || (f.seen = {}), t in f.seen || (x.dynCall_v(e), f.seen[t] = 1);
  }

  function m(t) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + t + ")", this.status = t;
  }

  function d(t) {
    function e() {
      if (!x.calledRun && (x.calledRun = !0, !tt)) {
        if (Mt || (Mt = !0, p(Dt)), p(St), x.onRuntimeInitialized && x.onRuntimeInitialized(), x.postRun) for ("function" == typeof x.postRun && (x.postRun = [x.postRun]); x.postRun.length;) {
          jt.unshift(x.postRun.shift());
        }
        p(jt);
      }
    }

    if (null === ln && (ln = Date.now()), !(0 < wt)) {
      if (x.preRun) for ("function" == typeof x.preRun && (x.preRun = [x.preRun]); x.preRun.length;) {
        gt.unshift(x.preRun.shift());
      }
      p(gt), 0 < wt || x.calledRun || (x.setStatus ? (x.setStatus("Running..."), setTimeout(function () {
        setTimeout(function () {
          x.setStatus("");
        }, 1), e();
      }, 1)) : e());
    }
  }

  function b(t) {
    x.onAbort && x.onAbort(t), void 0 !== t ? (x.print(t), x.printErr(t), t = JSON.stringify(t)) : t = "", tt = !0;
    var e = "abort(" + t + ") at " + o() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
    throw yn && yn.forEach(function (r) {
      e = r(e, t);
    }), e;
  }

  function h() {}

  function A(t) {
    return (t || h).__cache__;
  }

  function T(t, e) {
    var r = A(e),
        n = r[t];
    return n || (n = Object.create((e || h).prototype), n.ptr = t, r[t] = n);
  }

  function I(t) {
    if ("string" == typeof t) {
      for (var e = 0, r = 0; r < t.length; ++r) {
        var n = t.charCodeAt(r);
        55296 <= n && 57343 >= n && (n = 65536 + ((1023 & n) << 10) | 1023 & t.charCodeAt(++r)), 127 >= n ? ++e : e = 2047 >= n ? e + 2 : 65535 >= n ? e + 3 : 2097151 >= n ? e + 4 : 67108863 >= n ? e + 5 : e + 6;
      }

      if (e = Array(e + 1), r = 0, 0 < (n = e.length)) {
        n = r + n - 1;

        for (var o = 0; o < t.length; ++o) {
          var i = t.charCodeAt(o);

          if (55296 <= i && 57343 >= i && (i = 65536 + ((1023 & i) << 10) | 1023 & t.charCodeAt(++o)), 127 >= i) {
            if (r >= n) break;
            e[r++] = i;
          } else {
            if (2047 >= i) {
              if (r + 1 >= n) break;
              e[r++] = 192 | i >> 6;
            } else {
              if (65535 >= i) {
                if (r + 2 >= n) break;
                e[r++] = 224 | i >> 12;
              } else {
                if (2097151 >= i) {
                  if (r + 3 >= n) break;
                  e[r++] = 240 | i >> 18;
                } else {
                  if (67108863 >= i) {
                    if (r + 4 >= n) break;
                    e[r++] = 248 | i >> 24;
                  } else {
                    if (r + 5 >= n) break;
                    e[r++] = 252 | i >> 30, e[r++] = 128 | i >> 24 & 63;
                  }

                  e[r++] = 128 | i >> 18 & 63;
                }

                e[r++] = 128 | i >> 12 & 63;
              }

              e[r++] = 128 | i >> 6 & 63;
            }

            e[r++] = 128 | 63 & i;
          }
        }

        e[r] = 0;
      }

      t = fn.alloc(e, rt), fn.copy(e, rt, t);
    }

    return t;
  }

  function v() {
    throw "cannot construct a Status, no constructor in IDL";
  }

  function E() {
    this.ptr = xe(), A(E)[this.ptr] = this;
  }

  function g() {
    this.ptr = Gr(), A(g)[this.ptr] = this;
  }

  function D() {
    this.ptr = Xe(), A(D)[this.ptr] = this;
  }

  function S() {
    this.ptr = Qe(), A(S)[this.ptr] = this;
  }

  function R() {
    this.ptr = Lt(), A(R)[this.ptr] = this;
  }

  function j() {
    this.ptr = Ir(), A(j)[this.ptr] = this;
  }

  function M() {
    this.ptr = Xt(), A(M)[this.ptr] = this;
  }

  function w() {
    this.ptr = Ht(), A(w)[this.ptr] = this;
  }

  function G() {
    this.ptr = Be(), A(G)[this.ptr] = this;
  }

  function O() {
    this.ptr = mr(), A(O)[this.ptr] = this;
  }

  function P() {
    this.ptr = we(), A(P)[this.ptr] = this;
  }

  function C() {
    this.ptr = Se(), A(C)[this.ptr] = this;
  }

  function N() {
    this.ptr = tr(), A(N)[this.ptr] = this;
  }

  function F() {
    this.ptr = Jt(), A(F)[this.ptr] = this;
  }

  function U() {
    this.ptr = oe(), A(U)[this.ptr] = this;
  }

  function B() {
    this.ptr = rr(), A(B)[this.ptr] = this;
  }

  function z() {
    throw "cannot construct a VoidPtr, no constructor in IDL";
  }

  function L() {
    this.ptr = Ce(), A(L)[this.ptr] = this;
  }

  function k() {
    this.ptr = hr(), A(k)[this.ptr] = this;
  }

  var x = t = t || {},
      V = !1,
      H = !1;
  x.onRuntimeInitialized = function () {
    V = !0, H && "function" == typeof x.onModuleLoaded && x.onModuleLoaded(x);
  }, x.onModuleParsed = function () {
    H = !0, V && "function" == typeof x.onModuleLoaded && x.onModuleLoaded(x);
  }, x.isVersionSupported = function (t) {
    return "string" == typeof t && (t = t.split("."), !(2 > t.length || 3 < t.length) && (1 == t[0] && 0 <= t[1] && 3 >= t[1] || !(0 != t[0] || 10 < t[1])));
  }, x || (x = (void 0 !== t ? t : null) || {});
  var $,
      Q = {};

  for ($ in x) {
    x.hasOwnProperty($) && (Q[$] = x[$]);
  }

  var W = !1,
      q = !1,
      Y = !1,
      X = !1;
  if (x.ENVIRONMENT) {
    if ("WEB" === x.ENVIRONMENT) W = !0;else if ("WORKER" === x.ENVIRONMENT) q = !0;else if ("NODE" === x.ENVIRONMENT) Y = !0;else {
      if ("SHELL" !== x.ENVIRONMENT) throw Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");
      X = !0;
    }
  } else W = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)), q = "function" == typeof importScripts, Y = "object" == (typeof process === "undefined" ? "undefined" : _typeof(process)) && "function" == typeof require && !W && !q, X = !W && !Y && !q;

  if (Y) {
    x.print || (x.print = console.log), x.printErr || (x.printErr = console.warn);
    var K, Z;
    x.read = function (t, e) {
      return K || (K = require("fs")), Z || (Z = require("path")), t = Z.normalize(t), t = K.readFileSync(t), e ? t : t.toString();
    }, x.readBinary = function (t) {
      return t = x.read(t, !0), t.buffer || (t = new Uint8Array(t)), e(t.buffer), t;
    }, x.thisProgram || (x.thisProgram = 1 < process.argv.length ? process.argv[1].replace(/\\/g, "/") : "unknown-program"), x.arguments = process.argv.slice(2), process.on("uncaughtException", function (t) {
      if (!(t instanceof m)) throw t;
    }), x.inspect = function () {
      return "[Emscripten Module object]";
    };
  } else if (X) x.print || (x.print = print), "undefined" != typeof printErr && (x.printErr = printErr), x.read = "undefined" != typeof read ? function (t) {
    return read(t);
  } : function () {
    throw "no read() available";
  }, x.readBinary = function (t) {
    return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t)) : (t = read(t, "binary"), e("object" == _typeof(t)), t);
  }, "undefined" != typeof scriptArgs ? x.arguments = scriptArgs : void 0 !== arguments && (x.arguments = arguments), "function" == typeof quit && (x.quit = function (t, e) {
    quit(t);
  });else {
    if (!W && !q) throw Error("Unknown runtime environment. Where are we?");
    x.read = function (t) {
      var e = new XMLHttpRequest();
      return e.open("GET", t, !1), e.send(null), e.responseText;
    }, q && (x.readBinary = function (t) {
      var e = new XMLHttpRequest();
      return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
    }), x.readAsync = function (t, e, r) {
      var n = new XMLHttpRequest();
      n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function () {
        200 == n.status || 0 == n.status && n.response ? e(n.response) : r();
      }, n.onerror = r, n.send(null);
    }, void 0 !== arguments && (x.arguments = arguments), "undefined" != typeof console ? (x.print || (x.print = function (t) {
      console.log(t);
    }), x.printErr || (x.printErr = function (t) {
      console.warn(t);
    })) : x.print || (x.print = function (t) {}), void 0 === x.setWindowTitle && (x.setWindowTitle = function (t) {
      document.title = t;
    });
  }

  x.print || (x.print = function () {}), x.printErr || (x.printErr = x.print), x.arguments || (x.arguments = []), x.thisProgram || (x.thisProgram = "./this.program"), x.quit || (x.quit = function (t, e) {
    throw e;
  }), x.print = x.print, x.printErr = x.printErr, x.preRun = [], x.postRun = [];

  for ($ in Q) {
    Q.hasOwnProperty($) && (x[$] = Q[$]);
  }

  Q = void 0;
  var J = {
    setTempRet0: function setTempRet0(t) {
      return tempRet0 = t;
    },
    getTempRet0: function getTempRet0() {
      return tempRet0;
    },
    stackSave: function stackSave() {
      return lt;
    },
    stackRestore: function stackRestore(t) {
      lt = t;
    },
    getNativeTypeSize: function getNativeTypeSize(t) {
      switch (t) {
        case "i1":
        case "i8":
          return 1;

        case "i16":
          return 2;

        case "i32":
          return 4;

        case "i64":
          return 8;

        case "float":
          return 4;

        case "double":
          return 8;

        default:
          return "*" === t[t.length - 1] ? J.QUANTUM_SIZE : "i" === t[0] ? (t = parseInt(t.substr(1)), e(0 == t % 8), t / 8) : 0;
      }
    },
    getNativeFieldSize: function getNativeFieldSize(t) {
      return Math.max(J.getNativeTypeSize(t), J.QUANTUM_SIZE);
    },
    STACK_ALIGN: 16,
    prepVararg: function prepVararg(t, r) {
      return "double" === r || "i64" === r ? 7 & t && (e(4 == (7 & t)), t += 4) : e(0 == (3 & t)), t;
    },
    getAlignSize: function getAlignSize(t, e, r) {
      return r || "i64" != t && "double" != t ? t ? Math.min(e || (t ? J.getNativeFieldSize(t) : 0), J.QUANTUM_SIZE) : Math.min(e, 8) : 8;
    },
    dynCall: function dynCall(t, e, r) {
      return r && r.length ? x["dynCall_" + t].apply(null, [e].concat(r)) : x["dynCall_" + t].call(null, e);
    },
    functionPointers: [],
    addFunction: function addFunction(t) {
      for (var e = 0; e < J.functionPointers.length; e++) {
        if (!J.functionPointers[e]) return J.functionPointers[e] = t, 2 * (1 + e);
      }

      throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
    },
    removeFunction: function removeFunction(t) {
      J.functionPointers[(t - 2) / 2] = null;
    },
    warnOnce: function warnOnce(t) {
      J.warnOnce.shown || (J.warnOnce.shown = {}), J.warnOnce.shown[t] || (J.warnOnce.shown[t] = 1, x.printErr(t));
    },
    funcWrappers: {},
    getFuncWrapper: function getFuncWrapper(t, r) {
      if (t) {
        e(r), J.funcWrappers[r] || (J.funcWrappers[r] = {});
        var n = J.funcWrappers[r];
        return n[t] || (n[t] = 1 === r.length ? function () {
          return J.dynCall(r, t);
        } : 2 === r.length ? function (e) {
          return J.dynCall(r, t, [e]);
        } : function () {
          return J.dynCall(r, t, Array.prototype.slice.call(arguments));
        }), n[t];
      }
    },
    getCompilerSetting: function getCompilerSetting(t) {
      throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
    },
    stackAlloc: function stackAlloc(t) {
      var e = lt;
      return lt = lt + t | 0, lt = lt + 15 & -16, e;
    },
    staticAlloc: function staticAlloc(t) {
      var e = ct;
      return ct = ct + t | 0, ct = ct + 15 & -16, e;
    },
    dynamicAlloc: function dynamicAlloc(t) {
      var e = _t[mt >> 2];
      return t = -16 & (e + t + 15 | 0), _t[mt >> 2] = t, t >= vt && !a() ? (_t[mt >> 2] = e, 0) : e;
    },
    alignMemory: function alignMemory(t, e) {
      return Math.ceil(t / (e || 16)) * (e || 16);
    },
    makeBigInt: function makeBigInt(t, e, r) {
      return r ? +(t >>> 0) + 4294967296 * +(e >>> 0) : +(t >>> 0) + 4294967296 * +(0 | e);
    },
    GLOBAL_BASE: 1024,
    QUANTUM_SIZE: 4,
    __dummy__: 0
  },
      tt = 0,
      et = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
  "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");

  var rt,
      nt,
      ot,
      it,
      _t,
      at,
      pt,
      ut,
      ct,
      st,
      lt,
      yt,
      ft,
      mt,
      dt = 65536,
      bt = 16777216,
      ht = 16777216,
      At = ct = st = lt = yt = ft = mt = 0;

  x.reallocBuffer || (x.reallocBuffer = function (t) {
    try {
      if (ArrayBuffer.transfer) var e = ArrayBuffer.transfer(Et, t);else {
        var r = rt;
        e = new ArrayBuffer(t), new Int8Array(e).set(r);
      }
    } catch (t) {
      return !1;
    }

    return !!_n(e) && e;
  });

  try {
    var Tt = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get);
    Tt(new ArrayBuffer(4));
  } catch (t) {
    Tt = function Tt(t) {
      return t.byteLength;
    };
  }

  var It = x.TOTAL_STACK || 5242880,
      vt = x.TOTAL_MEMORY || 16777216;
  if (vt < It && x.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + vt + "! (TOTAL_STACK=" + It + ")"), x.buffer) var Et = x.buffer;else "object" == (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) && "function" == typeof WebAssembly.Memory ? (x.wasmMemory = new WebAssembly.Memory({
    initial: vt / dt
  }), Et = x.wasmMemory.buffer) : Et = new ArrayBuffer(vt);
  if (_(), _t[0] = 1668509029, ot[1] = 25459, 115 !== nt[2] || 99 !== nt[3]) throw "Runtime error: expected the system to be little-endian!";
  x.HEAP = void 0, x.buffer = Et, x.HEAP8 = rt, x.HEAP16 = ot, x.HEAP32 = _t, x.HEAPU8 = nt, x.HEAPU16 = it, x.HEAPU32 = at, x.HEAPF32 = pt, x.HEAPF64 = ut;
  var gt = [],
      Dt = [],
      St = [],
      Rt = [],
      jt = [],
      Mt = !1;
  e(Math.imul && Math.fround && Math.clz32 && Math.trunc, "this is a legacy browser, build with LEGACY_VM_SUPPORT");
  var wt = 0,
      Gt = null,
      Ot = null;
  x.preloadedImages = {}, x.preloadedAudios = {};
  var Pt = null;
  !function () {
    function t() {
      try {
        if (x.wasmBinary) return new Uint8Array(x.wasmBinary);
        if (x.readBinary) return x.readBinary(n);
        throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
      } catch (t) {
        b(t);
      }
    }

    function e() {
      return x.wasmBinary || !W && !q || "function" != typeof fetch ? new Promise(function (e, r) {
        e(t());
      }) : fetch(n, {
        credentials: "same-origin"
      }).then(function (t) {
        if (!t.ok) throw "failed to load wasm binary file at '" + n + "'";
        return t.arrayBuffer();
      })["catch"](function () {
        return t();
      });
    }

    function r(t, r, o) {
      function i(t, e) {
        if (p = t.exports, p.memory) {
          t = p.memory, e = x.buffer, t.byteLength < e.byteLength && x.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"), e = new Int8Array(e);
          var r = new Int8Array(t);
          Pt || e.set(r.subarray(x.STATIC_BASE, x.STATIC_BASE + x.STATIC_BUMP), x.STATIC_BASE), r.set(e), x.buffer = Et = t, _();
        }

        x.asm = p, x.usingWasm = !0, c("wasm-instantiate");
      }

      function s(t) {
        i(t.instance, t.module);
      }

      function l(t) {
        e().then(function (t) {
          return WebAssembly.instantiate(t, a);
        }).then(t)["catch"](function (t) {
          x.printErr("failed to asynchronously prepare wasm: " + t), b(t);
        });
      }

      if ("object" != (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly))) return x.printErr("no native wasm support detected"), !1;
      if (!(x.wasmMemory instanceof WebAssembly.Memory)) return x.printErr("no native wasm Memory in use"), !1;
      if (r.memory = x.wasmMemory, a.global = {
        NaN: NaN,
        Infinity: 1 / 0
      }, a["global.Math"] = t.Math, a.env = r, u("wasm-instantiate"), x.instantiateWasm) try {
        return x.instantiateWasm(a, i);
      } catch (t) {
        return x.printErr("Module.instantiateWasm callback failed with error: " + t), !1;
      }
      return x.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || 0 === n.indexOf("data:") || "function" != typeof fetch ? l(s) : WebAssembly.instantiateStreaming(fetch(n, {
        credentials: "same-origin"
      }), a).then(s)["catch"](function (t) {
        x.printErr("wasm streaming compile failed: " + t), x.printErr("falling back to ArrayBuffer instantiation"), l(s);
      }), {};
    }

    var n = "draco_decoder.wasm",
        o = "draco_decoder.temp.asm.js";
    "function" == typeof x.locateFile && (x.locateFile("draco_decoder.wast"), n = x.locateFile(n), o = x.locateFile(o));
    var a = {
      global: null,
      env: null,
      asm2wasm: {
        "f64-rem": function f64Rem(t, e) {
          return t % e;
        },
        "debugger": function _debugger() {}
      },
      parent: x
    },
        p = null;
    x.asmPreload = x.asm;
    var s = x.reallocBuffer;

    x.reallocBuffer = function (t) {
      if ("asmjs" === l) var e = s(t);else t: {
        t = i(t, x.usingWasm ? dt : bt);
        var r = x.buffer.byteLength;
        if (x.usingWasm) try {
          e = -1 !== x.wasmMemory.grow((t - r) / 65536) ? x.buffer = x.wasmMemory.buffer : null;
          break t;
        } catch (t) {
          e = null;
          break t;
        }
        e = void 0;
      }
      return e;
    };

    var l = "";

    x.asm = function (t, e, n) {
      if (!e.table) {
        var o = x.wasmTableSize;
        void 0 === o && (o = 1024);
        var i = x.wasmMaxTableSize;
        e.table = "object" == (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) && "function" == typeof WebAssembly.Table ? void 0 !== i ? new WebAssembly.Table({
          initial: o,
          maximum: i,
          element: "anyfunc"
        }) : new WebAssembly.Table({
          initial: o,
          element: "anyfunc"
        }) : Array(o), x.wasmTable = e.table;
      }

      return e.memoryBase || (e.memoryBase = x.STATIC_BASE), e.tableBase || (e.tableBase = 0), (t = r(t, e, n)) || b("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"), t;
    };
  }(), At = J.GLOBAL_BASE, ct = At + 19104, Dt.push(), Pt = null, x.STATIC_BASE = At, x.STATIC_BUMP = 19104;
  var Ct = ct;
  ct += 16;
  var Nt = {
    last: 0,
    caught: [],
    infos: {},
    deAdjust: function deAdjust(t) {
      if (!t || Nt.infos[t]) return t;

      for (var e in Nt.infos) {
        if (Nt.infos[e].adjusted === t) return e;
      }

      return t;
    },
    addRef: function addRef(t) {
      t && Nt.infos[t].refcount++;
    },
    decRef: function decRef(t) {
      if (t) {
        var r = Nt.infos[t];
        e(0 < r.refcount), r.refcount--, 0 !== r.refcount || r.rethrown || (r.destructor && x.dynCall_vi(r.destructor, t), delete Nt.infos[t], ___cxa_free_exception(t));
      }
    },
    clearRef: function clearRef(t) {
      t && (Nt.infos[t].refcount = 0);
    }
  },
      Ft = {
    varargs: 0,
    get: function get(t) {
      return Ft.varargs += 4, _t[Ft.varargs - 4 >> 2];
    },
    getStr: function getStr() {
      return r(Ft.get());
    },
    get64: function get64() {
      var t = Ft.get(),
          r = Ft.get();
      return e(0 <= t ? 0 === r : -1 === r), t;
    },
    getZero: function getZero() {
      e(0 === Ft.get());
    }
  },
      Ut = {},
      Bt = 1;
  Rt.push(function () {
    var t = x._fflush;

    if (t && t(0), t = y.printChar) {
      var e = y.buffers;
      e[1].length && t(1, 10), e[2].length && t(2, 10);
    }
  }), mt = J.staticAlloc(4), st = lt = J.alignMemory(ct), yt = st + It, ft = J.alignMemory(yt), _t[mt >> 2] = ft, x.wasmTableSize = 492, x.wasmMaxTableSize = 492, x.asmGlobalArg = {
    Math: Math,
    Int8Array: Int8Array,
    Int16Array: Int16Array,
    Int32Array: Int32Array,
    Uint8Array: Uint8Array,
    Uint16Array: Uint16Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
    NaN: NaN,
    Infinity: 1 / 0,
    byteLength: Tt
  }, x.asmLibraryArg = {
    abort: b,
    assert: e,
    enlargeMemory: a,
    getTotalMemory: function getTotalMemory() {
      return vt;
    },
    abortOnCannotGrowMemory: function abortOnCannotGrowMemory() {
      b("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + vt + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    },
    invoke_ii: function invoke_ii(t, e) {
      try {
        return x.dynCall_ii(t, e);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_iii: function invoke_iii(t, e, r) {
      try {
        return x.dynCall_iii(t, e, r);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_iiii: function invoke_iiii(t, e, r, n) {
      try {
        return x.dynCall_iiii(t, e, r, n);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_iiiiiii: function invoke_iiiiiii(t, e, r, n, o, i, _) {
      try {
        return x.dynCall_iiiiiii(t, e, r, n, o, i, _);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_v: function invoke_v(t) {
      try {
        x.dynCall_v(t);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_vi: function invoke_vi(t, e) {
      try {
        x.dynCall_vi(t, e);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_vii: function invoke_vii(t, e, r) {
      try {
        x.dynCall_vii(t, e, r);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_viii: function invoke_viii(t, e, r, n) {
      try {
        x.dynCall_viii(t, e, r, n);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_viiii: function invoke_viiii(t, e, r, n, o) {
      try {
        x.dynCall_viiii(t, e, r, n, o);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_viiiii: function invoke_viiiii(t, e, r, n, o, i) {
      try {
        x.dynCall_viiiii(t, e, r, n, o, i);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    invoke_viiiiii: function invoke_viiiiii(t, e, r, n, o, i, _) {
      try {
        x.dynCall_viiiiii(t, e, r, n, o, i, _);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        x.setThrew(1, 0);
      }
    },
    __ZSt18uncaught_exceptionv: s,
    ___cxa_allocate_exception: function ___cxa_allocate_exception(t) {
      return an(t);
    },
    ___cxa_begin_catch: function ___cxa_begin_catch(t) {
      var e = Nt.infos[t];
      return e && !e.caught && (e.caught = !0, s.uncaught_exception--), e && (e.rethrown = !1), Nt.caught.push(t), Nt.addRef(Nt.deAdjust(t)), t;
    },
    ___cxa_find_matching_catch: l,
    ___cxa_pure_virtual: function ___cxa_pure_virtual() {
      throw tt = !0, "Pure virtual function called!";
    },
    ___cxa_throw: function ___cxa_throw(t, e, r) {
      throw Nt.infos[t] = {
        ptr: t,
        adjusted: t,
        type: e,
        destructor: r,
        refcount: 0,
        caught: !1,
        rethrown: !1
      }, Nt.last = t, "uncaught_exception" in s ? s.uncaught_exception++ : s.uncaught_exception = 1, t + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___gxx_personality_v0: function ___gxx_personality_v0() {},
    ___resumeException: function ___resumeException(t) {
      throw Nt.last || (Nt.last = t), t + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___setErrNo: function ___setErrNo(t) {
      return x.___errno_location && (_t[x.___errno_location() >> 2] = t), t;
    },
    ___syscall140: function ___syscall140(t, e) {
      Ft.varargs = e;

      try {
        var r = Ft.getStreamFromFD();
        Ft.get();
        var n = Ft.get(),
            o = Ft.get(),
            i = Ft.get();
        return FS.llseek(r, n, i), _t[o >> 2] = r.position, r.getdents && 0 === n && 0 === i && (r.getdents = null), 0;
      } catch (t) {
        return "undefined" != typeof FS && t instanceof FS.ErrnoError || b(t), -t.errno;
      }
    },
    ___syscall146: y,
    ___syscall54: function ___syscall54(t, e) {
      return Ft.varargs = e, 0;
    },
    ___syscall6: function ___syscall6(t, e) {
      Ft.varargs = e;

      try {
        var r = Ft.getStreamFromFD();
        return FS.close(r), 0;
      } catch (t) {
        return "undefined" != typeof FS && t instanceof FS.ErrnoError || b(t), -t.errno;
      }
    },
    _abort: function _abort() {
      x.abort();
    },
    _emscripten_memcpy_big: function _emscripten_memcpy_big(t, e, r) {
      return nt.set(nt.subarray(e, e + r), t), t;
    },
    _pthread_getspecific: function _pthread_getspecific(t) {
      return Ut[t] || 0;
    },
    _pthread_key_create: function _pthread_key_create(t, e) {
      return 0 == t ? 22 : (_t[t >> 2] = Bt, Ut[Bt] = 0, Bt++, 0);
    },
    _pthread_once: f,
    _pthread_setspecific: function _pthread_setspecific(t, e) {
      return t in Ut ? (Ut[t] = e, 0) : 22;
    },
    DYNAMICTOP_PTR: mt,
    tempDoublePtr: Ct,
    ABORT: tt,
    STACKTOP: lt,
    STACK_MAX: yt
  };
  var zt = x.asm(x.asmGlobalArg, x.asmLibraryArg, Et);
  x.asm = zt, x.___cxa_can_catch = function () {
    return x.asm.___cxa_can_catch.apply(null, arguments);
  }, x.___cxa_is_pointer_type = function () {
    return x.asm.___cxa_is_pointer_type.apply(null, arguments);
  };

  var Lt = x._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = function () {
    return x.asm._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0.apply(null, arguments);
  },
      kt = x._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function () {
    return x.asm._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1.apply(null, arguments);
  },
      xt = x._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function () {
    return x.asm._emscripten_bind_AttributeOctahedronTransform___destroy___0.apply(null, arguments);
  },
      Vt = x._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function () {
    return x.asm._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0.apply(null, arguments);
  },
      Ht = x._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = function () {
    return x.asm._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0.apply(null, arguments);
  },
      $t = x._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function () {
    return x.asm._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1.apply(null, arguments);
  },
      Qt = x._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function () {
    return x.asm._emscripten_bind_AttributeQuantizationTransform___destroy___0.apply(null, arguments);
  },
      Wt = x._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function () {
    return x.asm._emscripten_bind_AttributeQuantizationTransform_min_value_1.apply(null, arguments);
  },
      qt = x._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function () {
    return x.asm._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0.apply(null, arguments);
  },
      Yt = x._emscripten_bind_AttributeQuantizationTransform_range_0 = function () {
    return x.asm._emscripten_bind_AttributeQuantizationTransform_range_0.apply(null, arguments);
  },
      Xt = x._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function () {
    return x.asm._emscripten_bind_AttributeTransformData_AttributeTransformData_0.apply(null, arguments);
  },
      Kt = x._emscripten_bind_AttributeTransformData___destroy___0 = function () {
    return x.asm._emscripten_bind_AttributeTransformData___destroy___0.apply(null, arguments);
  },
      Zt = x._emscripten_bind_AttributeTransformData_transform_type_0 = function () {
    return x.asm._emscripten_bind_AttributeTransformData_transform_type_0.apply(null, arguments);
  },
      Jt = x._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function () {
    return x.asm._emscripten_bind_DecoderBuffer_DecoderBuffer_0.apply(null, arguments);
  },
      te = x._emscripten_bind_DecoderBuffer_Init_2 = function () {
    return x.asm._emscripten_bind_DecoderBuffer_Init_2.apply(null, arguments);
  },
      ee = x._emscripten_bind_DecoderBuffer___destroy___0 = function () {
    return x.asm._emscripten_bind_DecoderBuffer___destroy___0.apply(null, arguments);
  },
      re = x._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function () {
    return x.asm._emscripten_bind_Decoder_DecodeBufferToMesh_2.apply(null, arguments);
  },
      ne = x._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function () {
    return x.asm._emscripten_bind_Decoder_DecodeBufferToPointCloud_2.apply(null, arguments);
  },
      oe = x._emscripten_bind_Decoder_Decoder_0 = function () {
    return x.asm._emscripten_bind_Decoder_Decoder_0.apply(null, arguments);
  },
      ie = x._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeByUniqueId_2.apply(null, arguments);
  },
      _e = x._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3.apply(null, arguments);
  },
      ae = x._emscripten_bind_Decoder_GetAttributeFloat_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeFloat_3.apply(null, arguments);
  },
      pe = x._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3.apply(null, arguments);
  },
      ue = x._emscripten_bind_Decoder_GetAttributeIdByName_2 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeIdByName_2.apply(null, arguments);
  },
      ce = x._emscripten_bind_Decoder_GetAttributeId_2 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeId_2.apply(null, arguments);
  },
      se = x._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3.apply(null, arguments);
  },
      le = x._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3.apply(null, arguments);
  },
      ye = x._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3.apply(null, arguments);
  },
      fe = x._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3.apply(null, arguments);
  },
      me = x._emscripten_bind_Decoder_GetAttributeMetadata_2 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeMetadata_2.apply(null, arguments);
  },
      de = x._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3.apply(null, arguments);
  },
      be = x._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3.apply(null, arguments);
  },
      he = x._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3.apply(null, arguments);
  },
      Ae = x._emscripten_bind_Decoder_GetAttribute_2 = function () {
    return x.asm._emscripten_bind_Decoder_GetAttribute_2.apply(null, arguments);
  },
      Te = x._emscripten_bind_Decoder_GetEncodedGeometryType_1 = function () {
    return x.asm._emscripten_bind_Decoder_GetEncodedGeometryType_1.apply(null, arguments);
  },
      Ie = x._emscripten_bind_Decoder_GetFaceFromMesh_3 = function () {
    return x.asm._emscripten_bind_Decoder_GetFaceFromMesh_3.apply(null, arguments);
  },
      ve = x._emscripten_bind_Decoder_GetMetadata_1 = function () {
    return x.asm._emscripten_bind_Decoder_GetMetadata_1.apply(null, arguments);
  },
      Ee = x._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function () {
    return x.asm._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2.apply(null, arguments);
  },
      ge = x._emscripten_bind_Decoder_SkipAttributeTransform_1 = function () {
    return x.asm._emscripten_bind_Decoder_SkipAttributeTransform_1.apply(null, arguments);
  },
      De = x._emscripten_bind_Decoder___destroy___0 = function () {
    return x.asm._emscripten_bind_Decoder___destroy___0.apply(null, arguments);
  },
      Se = x._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function () {
    return x.asm._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0.apply(null, arguments);
  },
      Re = x._emscripten_bind_DracoFloat32Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoFloat32Array_GetValue_1.apply(null, arguments);
  },
      je = x._emscripten_bind_DracoFloat32Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoFloat32Array___destroy___0.apply(null, arguments);
  },
      Me = x._emscripten_bind_DracoFloat32Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoFloat32Array_size_0.apply(null, arguments);
  },
      we = x._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = function () {
    return x.asm._emscripten_bind_DracoInt16Array_DracoInt16Array_0.apply(null, arguments);
  },
      Ge = x._emscripten_bind_DracoInt16Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoInt16Array_GetValue_1.apply(null, arguments);
  },
      Oe = x._emscripten_bind_DracoInt16Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoInt16Array___destroy___0.apply(null, arguments);
  },
      Pe = x._emscripten_bind_DracoInt16Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoInt16Array_size_0.apply(null, arguments);
  },
      Ce = x._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function () {
    return x.asm._emscripten_bind_DracoInt32Array_DracoInt32Array_0.apply(null, arguments);
  },
      Ne = x._emscripten_bind_DracoInt32Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoInt32Array_GetValue_1.apply(null, arguments);
  },
      Fe = x._emscripten_bind_DracoInt32Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoInt32Array___destroy___0.apply(null, arguments);
  },
      Ue = x._emscripten_bind_DracoInt32Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoInt32Array_size_0.apply(null, arguments);
  },
      Be = x._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function () {
    return x.asm._emscripten_bind_DracoInt8Array_DracoInt8Array_0.apply(null, arguments);
  },
      ze = x._emscripten_bind_DracoInt8Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoInt8Array_GetValue_1.apply(null, arguments);
  },
      Le = x._emscripten_bind_DracoInt8Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoInt8Array___destroy___0.apply(null, arguments);
  },
      ke = x._emscripten_bind_DracoInt8Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoInt8Array_size_0.apply(null, arguments);
  },
      xe = x._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = function () {
    return x.asm._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0.apply(null, arguments);
  },
      Ve = x._emscripten_bind_DracoUInt16Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoUInt16Array_GetValue_1.apply(null, arguments);
  },
      He = x._emscripten_bind_DracoUInt16Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoUInt16Array___destroy___0.apply(null, arguments);
  },
      $e = x._emscripten_bind_DracoUInt16Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoUInt16Array_size_0.apply(null, arguments);
  },
      Qe = x._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = function () {
    return x.asm._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0.apply(null, arguments);
  },
      We = x._emscripten_bind_DracoUInt32Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoUInt32Array_GetValue_1.apply(null, arguments);
  },
      qe = x._emscripten_bind_DracoUInt32Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoUInt32Array___destroy___0.apply(null, arguments);
  },
      Ye = x._emscripten_bind_DracoUInt32Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoUInt32Array_size_0.apply(null, arguments);
  },
      Xe = x._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = function () {
    return x.asm._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0.apply(null, arguments);
  },
      Ke = x._emscripten_bind_DracoUInt8Array_GetValue_1 = function () {
    return x.asm._emscripten_bind_DracoUInt8Array_GetValue_1.apply(null, arguments);
  },
      Ze = x._emscripten_bind_DracoUInt8Array___destroy___0 = function () {
    return x.asm._emscripten_bind_DracoUInt8Array___destroy___0.apply(null, arguments);
  },
      Je = x._emscripten_bind_DracoUInt8Array_size_0 = function () {
    return x.asm._emscripten_bind_DracoUInt8Array_size_0.apply(null, arguments);
  },
      tr = x._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function () {
    return x.asm._emscripten_bind_GeometryAttribute_GeometryAttribute_0.apply(null, arguments);
  },
      er = x._emscripten_bind_GeometryAttribute___destroy___0 = function () {
    return x.asm._emscripten_bind_GeometryAttribute___destroy___0.apply(null, arguments);
  },
      rr = x._emscripten_bind_Mesh_Mesh_0 = function () {
    return x.asm._emscripten_bind_Mesh_Mesh_0.apply(null, arguments);
  },
      nr = x._emscripten_bind_Mesh___destroy___0 = function () {
    return x.asm._emscripten_bind_Mesh___destroy___0.apply(null, arguments);
  },
      or = x._emscripten_bind_Mesh_num_attributes_0 = function () {
    return x.asm._emscripten_bind_Mesh_num_attributes_0.apply(null, arguments);
  },
      ir = x._emscripten_bind_Mesh_num_faces_0 = function () {
    return x.asm._emscripten_bind_Mesh_num_faces_0.apply(null, arguments);
  },
      _r = x._emscripten_bind_Mesh_num_points_0 = function () {
    return x.asm._emscripten_bind_Mesh_num_points_0.apply(null, arguments);
  },
      ar = x._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_GetDoubleEntry_2.apply(null, arguments);
  },
      pr = x._emscripten_bind_MetadataQuerier_GetEntryName_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_GetEntryName_2.apply(null, arguments);
  },
      ur = x._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_GetIntEntry_2.apply(null, arguments);
  },
      cr = x._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_GetStringEntry_2.apply(null, arguments);
  },
      sr = x._emscripten_bind_MetadataQuerier_HasDoubleEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_HasDoubleEntry_2.apply(null, arguments);
  },
      lr = x._emscripten_bind_MetadataQuerier_HasEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_HasEntry_2.apply(null, arguments);
  },
      yr = x._emscripten_bind_MetadataQuerier_HasIntEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_HasIntEntry_2.apply(null, arguments);
  },
      fr = x._emscripten_bind_MetadataQuerier_HasStringEntry_2 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_HasStringEntry_2.apply(null, arguments);
  },
      mr = x._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_MetadataQuerier_0.apply(null, arguments);
  },
      dr = x._emscripten_bind_MetadataQuerier_NumEntries_1 = function () {
    return x.asm._emscripten_bind_MetadataQuerier_NumEntries_1.apply(null, arguments);
  },
      br = x._emscripten_bind_MetadataQuerier___destroy___0 = function () {
    return x.asm._emscripten_bind_MetadataQuerier___destroy___0.apply(null, arguments);
  },
      hr = x._emscripten_bind_Metadata_Metadata_0 = function () {
    return x.asm._emscripten_bind_Metadata_Metadata_0.apply(null, arguments);
  },
      Ar = x._emscripten_bind_Metadata___destroy___0 = function () {
    return x.asm._emscripten_bind_Metadata___destroy___0.apply(null, arguments);
  },
      Tr = x._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_GetAttributeTransformData_0.apply(null, arguments);
  },
      Ir = x._emscripten_bind_PointAttribute_PointAttribute_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_PointAttribute_0.apply(null, arguments);
  },
      vr = x._emscripten_bind_PointAttribute___destroy___0 = function () {
    return x.asm._emscripten_bind_PointAttribute___destroy___0.apply(null, arguments);
  },
      Er = x._emscripten_bind_PointAttribute_attribute_type_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_attribute_type_0.apply(null, arguments);
  },
      gr = x._emscripten_bind_PointAttribute_byte_offset_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_byte_offset_0.apply(null, arguments);
  },
      Dr = x._emscripten_bind_PointAttribute_byte_stride_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_byte_stride_0.apply(null, arguments);
  },
      Sr = x._emscripten_bind_PointAttribute_data_type_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_data_type_0.apply(null, arguments);
  },
      Rr = x._emscripten_bind_PointAttribute_normalized_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_normalized_0.apply(null, arguments);
  },
      jr = x._emscripten_bind_PointAttribute_num_components_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_num_components_0.apply(null, arguments);
  },
      Mr = x._emscripten_bind_PointAttribute_size_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_size_0.apply(null, arguments);
  },
      wr = x._emscripten_bind_PointAttribute_unique_id_0 = function () {
    return x.asm._emscripten_bind_PointAttribute_unique_id_0.apply(null, arguments);
  },
      Gr = x._emscripten_bind_PointCloud_PointCloud_0 = function () {
    return x.asm._emscripten_bind_PointCloud_PointCloud_0.apply(null, arguments);
  },
      Or = x._emscripten_bind_PointCloud___destroy___0 = function () {
    return x.asm._emscripten_bind_PointCloud___destroy___0.apply(null, arguments);
  },
      Pr = x._emscripten_bind_PointCloud_num_attributes_0 = function () {
    return x.asm._emscripten_bind_PointCloud_num_attributes_0.apply(null, arguments);
  },
      Cr = x._emscripten_bind_PointCloud_num_points_0 = function () {
    return x.asm._emscripten_bind_PointCloud_num_points_0.apply(null, arguments);
  },
      Nr = x._emscripten_bind_Status___destroy___0 = function () {
    return x.asm._emscripten_bind_Status___destroy___0.apply(null, arguments);
  },
      Fr = x._emscripten_bind_Status_code_0 = function () {
    return x.asm._emscripten_bind_Status_code_0.apply(null, arguments);
  },
      Ur = x._emscripten_bind_Status_error_msg_0 = function () {
    return x.asm._emscripten_bind_Status_error_msg_0.apply(null, arguments);
  },
      Br = x._emscripten_bind_Status_ok_0 = function () {
    return x.asm._emscripten_bind_Status_ok_0.apply(null, arguments);
  },
      zr = x._emscripten_bind_VoidPtr___destroy___0 = function () {
    return x.asm._emscripten_bind_VoidPtr___destroy___0.apply(null, arguments);
  },
      Lr = x._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = function () {
    return x.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM.apply(null, arguments);
  },
      kr = x._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function () {
    return x.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM.apply(null, arguments);
  },
      xr = x._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = function () {
    return x.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM.apply(null, arguments);
  },
      Vr = x._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = function () {
    return x.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM.apply(null, arguments);
  },
      Hr = x._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function () {
    return x.asm._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE.apply(null, arguments);
  },
      $r = x._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function () {
    return x.asm._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD.apply(null, arguments);
  },
      Qr = x._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function () {
    return x.asm._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH.apply(null, arguments);
  },
      Wr = x._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function () {
    return x.asm._emscripten_enum_draco_GeometryAttribute_Type_COLOR.apply(null, arguments);
  },
      qr = x._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function () {
    return x.asm._emscripten_enum_draco_GeometryAttribute_Type_GENERIC.apply(null, arguments);
  },
      Yr = x._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function () {
    return x.asm._emscripten_enum_draco_GeometryAttribute_Type_INVALID.apply(null, arguments);
  },
      Xr = x._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function () {
    return x.asm._emscripten_enum_draco_GeometryAttribute_Type_NORMAL.apply(null, arguments);
  },
      Kr = x._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function () {
    return x.asm._emscripten_enum_draco_GeometryAttribute_Type_POSITION.apply(null, arguments);
  },
      Zr = x._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function () {
    return x.asm._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD.apply(null, arguments);
  },
      Jr = x._emscripten_enum_draco_StatusCode_ERROR = function () {
    return x.asm._emscripten_enum_draco_StatusCode_ERROR.apply(null, arguments);
  },
      tn = x._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function () {
    return x.asm._emscripten_enum_draco_StatusCode_INVALID_PARAMETER.apply(null, arguments);
  },
      en = x._emscripten_enum_draco_StatusCode_IO_ERROR = function () {
    return x.asm._emscripten_enum_draco_StatusCode_IO_ERROR.apply(null, arguments);
  },
      rn = x._emscripten_enum_draco_StatusCode_OK = function () {
    return x.asm._emscripten_enum_draco_StatusCode_OK.apply(null, arguments);
  },
      nn = x._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function () {
    return x.asm._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION.apply(null, arguments);
  },
      on = x._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function () {
    return x.asm._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION.apply(null, arguments);
  };

  x._emscripten_get_global_libc = function () {
    return x.asm._emscripten_get_global_libc.apply(null, arguments);
  };

  var _n = x._emscripten_replace_memory = function () {
    return x.asm._emscripten_replace_memory.apply(null, arguments);
  };

  x._free = function () {
    return x.asm._free.apply(null, arguments);
  }, x._llvm_bswap_i32 = function () {
    return x.asm._llvm_bswap_i32.apply(null, arguments);
  };

  var an = x._malloc = function () {
    return x.asm._malloc.apply(null, arguments);
  };

  if (x._memcpy = function () {
    return x.asm._memcpy.apply(null, arguments);
  }, x._memmove = function () {
    return x.asm._memmove.apply(null, arguments);
  }, x._memset = function () {
    return x.asm._memset.apply(null, arguments);
  }, x._sbrk = function () {
    return x.asm._sbrk.apply(null, arguments);
  }, x.establishStackSpace = function () {
    return x.asm.establishStackSpace.apply(null, arguments);
  }, x.getTempRet0 = function () {
    return x.asm.getTempRet0.apply(null, arguments);
  }, x.runPostSets = function () {
    return x.asm.runPostSets.apply(null, arguments);
  }, x.setTempRet0 = function () {
    return x.asm.setTempRet0.apply(null, arguments);
  }, x.setThrew = function () {
    return x.asm.setThrew.apply(null, arguments);
  }, x.stackAlloc = function () {
    return x.asm.stackAlloc.apply(null, arguments);
  }, x.stackRestore = function () {
    return x.asm.stackRestore.apply(null, arguments);
  }, x.stackSave = function () {
    return x.asm.stackSave.apply(null, arguments);
  }, x.dynCall_ii = function () {
    return x.asm.dynCall_ii.apply(null, arguments);
  }, x.dynCall_iii = function () {
    return x.asm.dynCall_iii.apply(null, arguments);
  }, x.dynCall_iiii = function () {
    return x.asm.dynCall_iiii.apply(null, arguments);
  }, x.dynCall_iiiiiii = function () {
    return x.asm.dynCall_iiiiiii.apply(null, arguments);
  }, x.dynCall_v = function () {
    return x.asm.dynCall_v.apply(null, arguments);
  }, x.dynCall_vi = function () {
    return x.asm.dynCall_vi.apply(null, arguments);
  }, x.dynCall_vii = function () {
    return x.asm.dynCall_vii.apply(null, arguments);
  }, x.dynCall_viii = function () {
    return x.asm.dynCall_viii.apply(null, arguments);
  }, x.dynCall_viiii = function () {
    return x.asm.dynCall_viiii.apply(null, arguments);
  }, x.dynCall_viiiii = function () {
    return x.asm.dynCall_viiiii.apply(null, arguments);
  }, x.dynCall_viiiiii = function () {
    return x.asm.dynCall_viiiiii.apply(null, arguments);
  }, J.stackAlloc = x.stackAlloc, J.stackSave = x.stackSave, J.stackRestore = x.stackRestore, J.establishStackSpace = x.establishStackSpace, J.setTempRet0 = x.setTempRet0, J.getTempRet0 = x.getTempRet0, x.asm = zt, Pt) if ("function" == typeof x.locateFile ? Pt = x.locateFile(Pt) : x.memoryInitializerPrefixURL && (Pt = x.memoryInitializerPrefixURL + Pt), Y || X) {
    var pn = x.readBinary(Pt);
    nt.set(pn, J.GLOBAL_BASE);
  } else {
    var un = function un() {
      x.readAsync(Pt, cn, function () {
        throw "could not load memory initializer " + Pt;
      });
    };

    u("memory initializer");

    var cn = function cn(t) {
      t.byteLength && (t = new Uint8Array(t)), nt.set(t, J.GLOBAL_BASE), x.memoryInitializerRequest && delete x.memoryInitializerRequest.response, c("memory initializer");
    };

    if (x.memoryInitializerRequest) {
      var sn = function sn() {
        var t = x.memoryInitializerRequest,
            e = t.response;
        200 !== t.status && 0 !== t.status ? (console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + t.status + ", retrying " + Pt), un()) : cn(e);
      };

      x.memoryInitializerRequest.response ? setTimeout(sn, 0) : x.memoryInitializerRequest.addEventListener("load", sn);
    } else un();
  }
  x.then = function (t) {
    if (x.calledRun) t(x);else {
      var e = x.onRuntimeInitialized;

      x.onRuntimeInitialized = function () {
        e && e(), t(x);
      };
    }
    return x;
  }, m.prototype = Error(), m.prototype.constructor = m;
  var ln = null;
  Ot = function t() {
    x.calledRun || d(), x.calledRun || (Ot = t);
  }, x.run = d, x.exit = function (t, e) {
    e && x.noExitRuntime || (!x.noExitRuntime && (tt = !0, lt = void 0, p(Rt), x.onExit) && x.onExit(t), Y && process.exit(t), x.quit(t, new m(t)));
  };
  var yn = [];
  if (x.abort = b, x.preInit) for ("function" == typeof x.preInit && (x.preInit = [x.preInit]); 0 < x.preInit.length;) {
    x.preInit.pop()();
  }
  d(), h.prototype = Object.create(h.prototype), h.prototype.constructor = h, h.prototype.__class__ = h, h.__cache__ = {}, x.WrapperObject = h, x.getCache = A, x.wrapPointer = T, x.castObject = function (t, e) {
    return T(t.ptr, e);
  }, x.NULL = T(0), x.destroy = function (t) {
    if (!t.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
    t.__destroy__(), delete A(t.__class__)[t.ptr];
  }, x.compare = function (t, e) {
    return t.ptr === e.ptr;
  }, x.getPointer = function (t) {
    return t.ptr;
  }, x.getClass = function (t) {
    return t.__class__;
  };
  var fn = {
    buffer: 0,
    size: 0,
    pos: 0,
    temps: [],
    needed: 0,
    prepare: function prepare() {
      if (fn.needed) {
        for (var t = 0; t < fn.temps.length; t++) {
          x._free(fn.temps[t]);
        }

        fn.temps.length = 0, x._free(fn.buffer), fn.buffer = 0, fn.size += fn.needed, fn.needed = 0;
      }

      fn.buffer || (fn.size += 128, fn.buffer = x._malloc(fn.size), e(fn.buffer)), fn.pos = 0;
    },
    alloc: function alloc(t, r) {
      return e(fn.buffer), t = t.length * r.BYTES_PER_ELEMENT, t = t + 7 & -8, fn.pos + t >= fn.size ? (e(0 < t), fn.needed += t, r = x._malloc(t), fn.temps.push(r)) : (r = fn.buffer + fn.pos, fn.pos += t), r;
    },
    copy: function copy(t, e, r) {
      switch (e.BYTES_PER_ELEMENT) {
        case 2:
          r >>= 1;
          break;

        case 4:
          r >>= 2;
          break;

        case 8:
          r >>= 3;
      }

      for (var n = 0; n < t.length; n++) {
        e[r + n] = t[n];
      }
    }
  };
  return v.prototype = Object.create(h.prototype), v.prototype.constructor = v, v.prototype.__class__ = v, v.__cache__ = {}, x.Status = v, v.prototype.code = v.prototype.code = function () {
    return Fr(this.ptr);
  }, v.prototype.ok = v.prototype.ok = function () {
    return !!Br(this.ptr);
  }, v.prototype.error_msg = v.prototype.error_msg = function () {
    return r(Ur(this.ptr));
  }, v.prototype.__destroy__ = v.prototype.__destroy__ = function () {
    Nr(this.ptr);
  }, E.prototype = Object.create(h.prototype), E.prototype.constructor = E, E.prototype.__class__ = E, E.__cache__ = {}, x.DracoUInt16Array = E, E.prototype.GetValue = E.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Ve(e, t);
  }, E.prototype.size = E.prototype.size = function () {
    return $e(this.ptr);
  }, E.prototype.__destroy__ = E.prototype.__destroy__ = function () {
    He(this.ptr);
  }, g.prototype = Object.create(h.prototype), g.prototype.constructor = g, g.prototype.__class__ = g, g.__cache__ = {}, x.PointCloud = g, g.prototype.num_attributes = g.prototype.num_attributes = function () {
    return Pr(this.ptr);
  }, g.prototype.num_points = g.prototype.num_points = function () {
    return Cr(this.ptr);
  }, g.prototype.__destroy__ = g.prototype.__destroy__ = function () {
    Or(this.ptr);
  }, D.prototype = Object.create(h.prototype), D.prototype.constructor = D, D.prototype.__class__ = D, D.__cache__ = {}, x.DracoUInt8Array = D, D.prototype.GetValue = D.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Ke(e, t);
  }, D.prototype.size = D.prototype.size = function () {
    return Je(this.ptr);
  }, D.prototype.__destroy__ = D.prototype.__destroy__ = function () {
    Ze(this.ptr);
  }, S.prototype = Object.create(h.prototype), S.prototype.constructor = S, S.prototype.__class__ = S, S.__cache__ = {}, x.DracoUInt32Array = S, S.prototype.GetValue = S.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), We(e, t);
  }, S.prototype.size = S.prototype.size = function () {
    return Ye(this.ptr);
  }, S.prototype.__destroy__ = S.prototype.__destroy__ = function () {
    qe(this.ptr);
  }, R.prototype = Object.create(h.prototype), R.prototype.constructor = R, R.prototype.__class__ = R, R.__cache__ = {}, x.AttributeOctahedronTransform = R, R.prototype.InitFromAttribute = R.prototype.InitFromAttribute = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), !!kt(e, t);
  }, R.prototype.quantization_bits = R.prototype.quantization_bits = function () {
    return Vt(this.ptr);
  }, R.prototype.__destroy__ = R.prototype.__destroy__ = function () {
    xt(this.ptr);
  }, j.prototype = Object.create(h.prototype), j.prototype.constructor = j, j.prototype.__class__ = j, j.__cache__ = {}, x.PointAttribute = j, j.prototype.size = j.prototype.size = function () {
    return Mr(this.ptr);
  }, j.prototype.GetAttributeTransformData = j.prototype.GetAttributeTransformData = function () {
    return T(Tr(this.ptr), M);
  }, j.prototype.attribute_type = j.prototype.attribute_type = function () {
    return Er(this.ptr);
  }, j.prototype.data_type = j.prototype.data_type = function () {
    return Sr(this.ptr);
  }, j.prototype.num_components = j.prototype.num_components = function () {
    return jr(this.ptr);
  }, j.prototype.normalized = j.prototype.normalized = function () {
    return !!Rr(this.ptr);
  }, j.prototype.byte_stride = j.prototype.byte_stride = function () {
    return Dr(this.ptr);
  }, j.prototype.byte_offset = j.prototype.byte_offset = function () {
    return gr(this.ptr);
  }, j.prototype.unique_id = j.prototype.unique_id = function () {
    return wr(this.ptr);
  }, j.prototype.__destroy__ = j.prototype.__destroy__ = function () {
    vr(this.ptr);
  }, M.prototype = Object.create(h.prototype), M.prototype.constructor = M, M.prototype.__class__ = M, M.__cache__ = {}, x.AttributeTransformData = M, M.prototype.transform_type = M.prototype.transform_type = function () {
    return Zt(this.ptr);
  }, M.prototype.__destroy__ = M.prototype.__destroy__ = function () {
    Kt(this.ptr);
  }, w.prototype = Object.create(h.prototype), w.prototype.constructor = w, w.prototype.__class__ = w, w.__cache__ = {}, x.AttributeQuantizationTransform = w, w.prototype.InitFromAttribute = w.prototype.InitFromAttribute = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), !!$t(e, t);
  }, w.prototype.quantization_bits = w.prototype.quantization_bits = function () {
    return qt(this.ptr);
  }, w.prototype.min_value = w.prototype.min_value = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Wt(e, t);
  }, w.prototype.range = w.prototype.range = function () {
    return Yt(this.ptr);
  }, w.prototype.__destroy__ = w.prototype.__destroy__ = function () {
    Qt(this.ptr);
  }, G.prototype = Object.create(h.prototype), G.prototype.constructor = G, G.prototype.__class__ = G, G.__cache__ = {}, x.DracoInt8Array = G, G.prototype.GetValue = G.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), ze(e, t);
  }, G.prototype.size = G.prototype.size = function () {
    return ke(this.ptr);
  }, G.prototype.__destroy__ = G.prototype.__destroy__ = function () {
    Le(this.ptr);
  }, O.prototype = Object.create(h.prototype), O.prototype.constructor = O, O.prototype.__class__ = O, O.__cache__ = {}, x.MetadataQuerier = O, O.prototype.HasEntry = O.prototype.HasEntry = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), !!lr(r, t, e);
  }, O.prototype.HasIntEntry = O.prototype.HasIntEntry = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), !!yr(r, t, e);
  }, O.prototype.GetIntEntry = O.prototype.GetIntEntry = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), ur(r, t, e);
  }, O.prototype.HasDoubleEntry = O.prototype.HasDoubleEntry = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), !!sr(r, t, e);
  }, O.prototype.GetDoubleEntry = O.prototype.GetDoubleEntry = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), ar(r, t, e);
  }, O.prototype.HasStringEntry = O.prototype.HasStringEntry = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), !!fr(r, t, e);
  }, O.prototype.GetStringEntry = O.prototype.GetStringEntry = function (t, e) {
    var n = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), r(cr(n, t, e));
  }, O.prototype.NumEntries = O.prototype.NumEntries = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), dr(e, t);
  }, O.prototype.GetEntryName = O.prototype.GetEntryName = function (t, e) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r(pr(n, t, e));
  }, O.prototype.__destroy__ = O.prototype.__destroy__ = function () {
    br(this.ptr);
  }, P.prototype = Object.create(h.prototype), P.prototype.constructor = P, P.prototype.__class__ = P, P.__cache__ = {}, x.DracoInt16Array = P, P.prototype.GetValue = P.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Ge(e, t);
  }, P.prototype.size = P.prototype.size = function () {
    return Pe(this.ptr);
  }, P.prototype.__destroy__ = P.prototype.__destroy__ = function () {
    Oe(this.ptr);
  }, C.prototype = Object.create(h.prototype), C.prototype.constructor = C, C.prototype.__class__ = C, C.__cache__ = {}, x.DracoFloat32Array = C, C.prototype.GetValue = C.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Re(e, t);
  }, C.prototype.size = C.prototype.size = function () {
    return Me(this.ptr);
  }, C.prototype.__destroy__ = C.prototype.__destroy__ = function () {
    je(this.ptr);
  }, N.prototype = Object.create(h.prototype), N.prototype.constructor = N, N.prototype.__class__ = N, N.__cache__ = {}, x.GeometryAttribute = N, N.prototype.__destroy__ = N.prototype.__destroy__ = function () {
    er(this.ptr);
  }, F.prototype = Object.create(h.prototype), F.prototype.constructor = F, F.prototype.__class__ = F, F.__cache__ = {}, x.DecoderBuffer = F, F.prototype.Init = F.prototype.Init = function (t, e) {
    var r = this.ptr;

    if (fn.prepare(), "object" == _typeof(t) && "object" == _typeof(t)) {
      var n = fn.alloc(t, rt);
      fn.copy(t, rt, n), t = n;
    }

    e && "object" == _typeof(e) && (e = e.ptr), te(r, t, e);
  }, F.prototype.__destroy__ = F.prototype.__destroy__ = function () {
    ee(this.ptr);
  }, U.prototype = Object.create(h.prototype), U.prototype.constructor = U, U.prototype.__class__ = U, U.__cache__ = {}, x.Decoder = U, U.prototype.GetEncodedGeometryType = U.prototype.GetEncodedGeometryType = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Te(e, t);
  }, U.prototype.DecodeBufferToPointCloud = U.prototype.DecodeBufferToPointCloud = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), T(ne(r, t, e), v);
  }, U.prototype.DecodeBufferToMesh = U.prototype.DecodeBufferToMesh = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), T(re(r, t, e), v);
  }, U.prototype.GetAttributeId = U.prototype.GetAttributeId = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), ce(r, t, e);
  }, U.prototype.GetAttributeIdByName = U.prototype.GetAttributeIdByName = function (t, e) {
    var r = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), ue(r, t, e);
  }, U.prototype.GetAttributeIdByMetadataEntry = U.prototype.GetAttributeIdByMetadataEntry = function (t, e, r) {
    var n = this.ptr;
    return fn.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : I(e), r = r && "object" == _typeof(r) ? r.ptr : I(r), pe(n, t, e, r);
  }, U.prototype.GetAttribute = U.prototype.GetAttribute = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), T(Ae(r, t, e), j);
  }, U.prototype.GetAttributeByUniqueId = U.prototype.GetAttributeByUniqueId = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), T(ie(r, t, e), j);
  }, U.prototype.GetMetadata = U.prototype.GetMetadata = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), T(ve(e, t), k);
  }, U.prototype.GetAttributeMetadata = U.prototype.GetAttributeMetadata = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), T(me(r, t, e), k);
  }, U.prototype.GetFaceFromMesh = U.prototype.GetFaceFromMesh = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!Ie(n, t, e, r);
  }, U.prototype.GetTriangleStripsFromMesh = U.prototype.GetTriangleStripsFromMesh = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), Ee(r, t, e);
  }, U.prototype.GetAttributeFloat = U.prototype.GetAttributeFloat = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!ae(n, t, e, r);
  }, U.prototype.GetAttributeFloatForAllPoints = U.prototype.GetAttributeFloatForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!_e(n, t, e, r);
  }, U.prototype.GetAttributeIntForAllPoints = U.prototype.GetAttributeIntForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!fe(n, t, e, r);
  }, U.prototype.GetAttributeInt8ForAllPoints = U.prototype.GetAttributeInt8ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!ye(n, t, e, r);
  }, U.prototype.GetAttributeUInt8ForAllPoints = U.prototype.GetAttributeUInt8ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!he(n, t, e, r);
  }, U.prototype.GetAttributeInt16ForAllPoints = U.prototype.GetAttributeInt16ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!se(n, t, e, r);
  }, U.prototype.GetAttributeUInt16ForAllPoints = U.prototype.GetAttributeUInt16ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!de(n, t, e, r);
  }, U.prototype.GetAttributeInt32ForAllPoints = U.prototype.GetAttributeInt32ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!le(n, t, e, r);
  }, U.prototype.GetAttributeUInt32ForAllPoints = U.prototype.GetAttributeUInt32ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!be(n, t, e, r);
  }, U.prototype.SkipAttributeTransform = U.prototype.SkipAttributeTransform = function (t) {
    var e = this.ptr;
    t && "object" == _typeof(t) && (t = t.ptr), ge(e, t);
  }, U.prototype.__destroy__ = U.prototype.__destroy__ = function () {
    De(this.ptr);
  }, B.prototype = Object.create(h.prototype), B.prototype.constructor = B, B.prototype.__class__ = B, B.__cache__ = {}, x.Mesh = B, B.prototype.num_faces = B.prototype.num_faces = function () {
    return ir(this.ptr);
  }, B.prototype.num_attributes = B.prototype.num_attributes = function () {
    return or(this.ptr);
  }, B.prototype.num_points = B.prototype.num_points = function () {
    return _r(this.ptr);
  }, B.prototype.__destroy__ = B.prototype.__destroy__ = function () {
    nr(this.ptr);
  }, z.prototype = Object.create(h.prototype), z.prototype.constructor = z, z.prototype.__class__ = z, z.__cache__ = {}, x.VoidPtr = z, z.prototype.__destroy__ = z.prototype.__destroy__ = function () {
    zr(this.ptr);
  }, L.prototype = Object.create(h.prototype), L.prototype.constructor = L, L.prototype.__class__ = L, L.__cache__ = {}, x.DracoInt32Array = L, L.prototype.GetValue = L.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Ne(e, t);
  }, L.prototype.size = L.prototype.size = function () {
    return Ue(this.ptr);
  }, L.prototype.__destroy__ = L.prototype.__destroy__ = function () {
    Fe(this.ptr);
  }, k.prototype = Object.create(h.prototype), k.prototype.constructor = k, k.prototype.__class__ = k, k.__cache__ = {}, x.Metadata = k, k.prototype.__destroy__ = k.prototype.__destroy__ = function () {
    Ar(this.ptr);
  }, function () {
    function t() {
      x.OK = rn(), x.ERROR = Jr(), x.IO_ERROR = en(), x.INVALID_PARAMETER = tn(), x.UNSUPPORTED_VERSION = on(), x.UNKNOWN_VERSION = nn(), x.INVALID_GEOMETRY_TYPE = Hr(), x.POINT_CLOUD = $r(), x.TRIANGULAR_MESH = Qr(), x.ATTRIBUTE_INVALID_TRANSFORM = Lr(), x.ATTRIBUTE_NO_TRANSFORM = kr(), x.ATTRIBUTE_QUANTIZATION_TRANSFORM = Vr(), x.ATTRIBUTE_OCTAHEDRON_TRANSFORM = xr(), x.INVALID = Yr(), x.POSITION = Kr(), x.NORMAL = Xr(), x.COLOR = Wr(), x.TEX_COORD = Zr(), x.GENERIC = qr();
    }

    x.calledRun ? t() : St.unshift(t);
  }(), "function" == typeof x.onModuleParsed && x.onModuleParsed(), t;
};

"object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = DracoDecoderModule);