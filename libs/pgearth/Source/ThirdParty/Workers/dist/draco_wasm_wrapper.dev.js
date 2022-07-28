"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, e, r) {
  t != Array.prototype && t != Object.prototype && (t[e] = r.value);
}, $jscomp.getGlobal = function (t) {
  return ("undefined" == typeof window || window !== t) && "undefined" != typeof global && null != global ? global : t;
}, $jscomp.global = $jscomp.getGlobal(void 0), $jscomp.polyfill = function (t, e, r, n) {
  if (e) {
    for (r = $jscomp.global, t = t.split("."), n = 0; n < t.length - 1; n++) {
      var o = t[n];
      o in r || (r[o] = {}), r = r[o];
    }

    (e = e(n = r[t = t[t.length - 1]])) != n && null != e && $jscomp.defineProperty(r, t, {
      configurable: !0,
      writable: !0,
      value: e
    });
  }
}, $jscomp.polyfill("Math.imul", function (t) {
  return t || function (t, e) {
    var r = 65535 & (t = Number(t)),
        n = 65535 & (e = Number(e));
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
    return t < 0 ? -e : e;
  };
}, "es6", "es3"), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
}, $jscomp.symbolCounter_ = 0, $jscomp.Symbol = function (t) {
  return $jscomp.SYMBOL_PREFIX + (t || "") + $jscomp.symbolCounter_++;
}, $jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var t = (t = $jscomp.global.Symbol.iterator) || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[t] && $jscomp.defineProperty(Array.prototype, t, {
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
  return $jscomp.initSymbolIterator(), (t = {
    next: t
  })[$jscomp.global.Symbol.iterator] = function () {
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

  function _(r) {
    return r instanceof a ? r : new a(function (t, e) {
      t(r);
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
  var r = $jscomp.global.setTimeout;
  e.prototype.asyncExecuteFunction = function (t) {
    r(t, 0);
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

  function a(t) {
    this.state_ = 0, this.result_ = void 0, this.onSettledCallbacks_ = [];
    var e = this.createResolveAndReject_();

    try {
      t(e.resolve, e.reject);
    } catch (t) {
      e.reject(t);
    }
  }

  a.prototype.createResolveAndReject_ = function () {
    function t(e) {
      return function (t) {
        n || (n = !0, e.call(r, t));
      };
    }

    var r = this,
        n = !1;
    return {
      resolve: t(this.resolveTo_),
      reject: t(this.reject_)
    };
  }, a.prototype.resolveTo_ = function (t) {
    if (t === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));else if (t instanceof a) this.settleSameAsPromise_(t);else {
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
  }, a.prototype.resolveToNonPromiseObj_ = function (t) {
    var e = void 0;

    try {
      e = t.then;
    } catch (t) {
      return void this.reject_(t);
    }

    "function" == typeof e ? this.settleSameAsThenable_(e, t) : this.fulfill_(t);
  }, a.prototype.reject_ = function (t) {
    this.settle_(2, t);
  }, a.prototype.fulfill_ = function (t) {
    this.settle_(1, t);
  }, a.prototype.settle_ = function (t, e) {
    if (0 != this.state_) throw Error("Cannot settle(" + t + ", " + e | "): Promise already settled in state" + this.state_);
    this.state_ = t, this.result_ = e, this.executeOnSettledCallbacks_();
  }, a.prototype.executeOnSettledCallbacks_ = function () {
    if (null != this.onSettledCallbacks_) {
      for (var t = this.onSettledCallbacks_, e = 0; e < t.length; ++e) {
        t[e].call(), t[e] = null;
      }

      this.onSettledCallbacks_ = null;
    }
  };
  var o = new e();
  return a.prototype.settleSameAsPromise_ = function (t) {
    var e = this.createResolveAndReject_();
    t.callWhenSettled_(e.resolve, e.reject);
  }, a.prototype.settleSameAsThenable_ = function (t, e) {
    var r = this.createResolveAndReject_();

    try {
      t.call(e, r.resolve, r.reject);
    } catch (t) {
      r.reject(t);
    }
  }, a.prototype.then = function (t, e) {
    function r(e, t) {
      return "function" == typeof e ? function (t) {
        try {
          n(e(t));
        } catch (t) {
          o(t);
        }
      } : t;
    }

    var n,
        o,
        i = new a(function (t, e) {
      n = t, o = e;
    });
    return this.callWhenSettled_(r(t, n), r(e, o)), i;
  }, a.prototype["catch"] = function (t) {
    return this.then(void 0, t);
  }, a.prototype.callWhenSettled_ = function (t, e) {
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
    null == this.onSettledCallbacks_ ? o.asyncExecute(r) : this.onSettledCallbacks_.push(function () {
      o.asyncExecute(r);
    });
  }, a.resolve = _, a.reject = function (r) {
    return new a(function (t, e) {
      e(r);
    });
  }, a.race = function (o) {
    return new a(function (t, e) {
      for (var r = $jscomp.makeIterator(o), n = r.next(); !n.done; n = r.next()) {
        _(n.value).callWhenSettled_(t, e);
      }
    });
  }, a.all = function (t) {
    var e = $jscomp.makeIterator(t),
        i = e.next();
    return i.done ? _([]) : new a(function (r, t) {
      for (var n = [], o = 0; n.push(void 0), o++, _(i.value).callWhenSettled_(function (e) {
        return function (t) {
          n[e] = t, 0 == --o && r(n);
        };
      }(n.length - 1), t), !(i = e.next()).done;) {
        ;
      }
    });
  }, a;
}, "es6", "es3");

var DracoDecoderModule = function DracoDecoderModule(t) {
  function u(t, e) {
    t || d("Assertion failed: " + e);
  }

  function n(t, e) {
    if (0 === e || !t) return "";

    for (var r, n = 0, o = 0; (n |= r = rt[t + o >> 0], 0 != r || e) && (o++, !e || o != e);) {
      ;
    }

    if (e = e || o, r = "", n < 128) {
      for (; 0 < e;) {
        n = String.fromCharCode.apply(String, rt.subarray(t, t + Math.min(e, 1024))), r = r ? r + n : n, t += 1024, e -= 1024;
      }

      return r;
    }

    return k.UTF8ToString(t);
  }

  function o() {
    t: {
      var e = Error();

      if (!e.stack) {
        try {
          throw Error(0);
        } catch (t) {
          e = t;
        }

        if (!e.stack) {
          e = "(no stack trace available)";
          break t;
        }
      }

      e = e.stack.toString();
    }

    return k.extraStackTrace && (e += "\n" + k.extraStackTrace()), e.replace(/__Z[\w\d_]+/g, function (t) {
      return t == t ? t : t + " [" + t + "]";
    });
  }

  function c(t, e) {
    return 0 < t % e && (t += e - t % e), t;
  }

  function s() {
    k.HEAP8 = et = new Int8Array(At), k.HEAP16 = nt = new Int16Array(At), k.HEAP32 = it = new Int32Array(At), k.HEAPU8 = rt = new Uint8Array(At), k.HEAPU16 = ot = new Uint16Array(At), k.HEAPU32 = _t = new Uint32Array(At), k.HEAPF32 = at = new Float32Array(At), k.HEAPF64 = pt = new Float64Array(At);
  }

  function r() {
    var t = k.usingWasm ? ft : mt,
        e = 2147483648 - t;
    if (it[yt >> 2] > e) return !1;
    var r = It;

    for (It = Math.max(It, dt); It < it[yt >> 2];) {
      It = It <= 536870912 ? c(2 * It, t) : Math.min(c((3 * It + 2147483648) / 4, t), e);
    }

    return (t = k.reallocBuffer(It)) && t.byteLength == It ? (k.buffer = At = t, s(), !0) : (It = r, !1);
  }

  function i(t) {
    for (; 0 < t.length;) {
      var e,
          r = t.shift();
      "function" == typeof r ? r() : "number" == typeof (e = r.func) ? void 0 === r.arg ? k.dynCall_v(e) : k.dynCall_vi(e, r.arg) : e(void 0 === r.arg ? null : r.arg);
    }
  }

  function l() {
    jt++, k.monitorRunDependencies && k.monitorRunDependencies(jt);
  }

  function y(t) {
    jt--, k.monitorRunDependencies && k.monitorRunDependencies(jt), 0 == jt && (null !== Mt && (clearInterval(Mt), Mt = null), Gt && (t = Gt, Gt = null, t()));
  }

  function _() {
    return !!_.uncaught_exception;
  }

  function a() {
    var t = Pt.last;
    if (!t) return 0 | (Z.setTempRet0(0), 0);
    var e = Pt.infos[t],
        r = e.type;
    if (!r) return 0 | (Z.setTempRet0(0), t);
    var n = Array.prototype.slice.call(arguments);
    k.___cxa_is_pointer_type(r), a.buffer || (a.buffer = un(4)), it[a.buffer >> 2] = t, t = a.buffer;

    for (var o = 0; o < n.length; o++) {
      if (n[o] && k.___cxa_can_catch(n[o], r, t)) return t = it[t >> 2], e.adjusted = t, 0 | (Z.setTempRet0(n[o]), t);
    }

    return t = it[t >> 2], 0 | (Z.setTempRet0(r), t);
  }

  function f(t, e) {
    Ct.varargs = e;

    try {
      var r = Ct.get(),
          n = Ct.get(),
          o = Ct.get();

      for (t = 0, f.buffer || (f.buffers = [null, [], []], f.printChar = function (t, e) {
        var r = f.buffers[t];

        if (u(r), 0 === e || 10 === e) {
          t = 1 === t ? k.print : k.printErr;

          t: {
            for (var n = e = 0; r[n];) {
              ++n;
            }

            if (16 < n - e && r.subarray && tt) e = tt.decode(r.subarray(e, n));else for (n = "";;) {
              var o,
                  i,
                  _,
                  a,
                  p = r[e++];

              if (!p) {
                e = n;
                break t;
              }

              128 & p ? (o = 63 & r[e++], 192 == (224 & p) ? n += String.fromCharCode((31 & p) << 6 | o) : (i = 63 & r[e++], (p = 224 == (240 & p) ? (15 & p) << 12 | o << 6 | i : (_ = 63 & r[e++], 240 == (248 & p) ? (7 & p) << 18 | o << 12 | i << 6 | _ : (a = 63 & r[e++], 248 == (252 & p) ? (3 & p) << 24 | o << 18 | i << 12 | _ << 6 | a : (1 & p) << 30 | o << 24 | i << 18 | _ << 12 | a << 6 | 63 & r[e++]))) < 65536 ? n += String.fromCharCode(p) : (p -= 65536, n += String.fromCharCode(55296 | p >> 10, 56320 | 1023 & p)))) : n += String.fromCharCode(p);
            }
          }

          t(e), r.length = 0;
        } else r.push(e);
      }), e = 0; e < o; e++) {
        for (var i = it[n + 8 * e >> 2], _ = it[n + (8 * e + 4) >> 2], a = 0; a < _; a++) {
          f.printChar(r, rt[i + a]);
        }

        t += _;
      }

      return t;
    } catch (t) {
      return "undefined" != typeof FS && t instanceof FS.ErrnoError || d(t), -t.errno;
    }
  }

  function p(t, e) {
    p.seen || (p.seen = {}), t in p.seen || (k.dynCall_v(e), p.seen[t] = 1);
  }

  function m(t) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + t + ")", this.status = t;
  }

  function e(t) {
    function e() {
      if (!k.calledRun && (k.calledRun = !0, !J)) {
        if (Rt || (Rt = !0, i(Et)), i(gt), k.onRuntimeInitialized && k.onRuntimeInitialized(), k.postRun) for ("function" == typeof k.postRun && (k.postRun = [k.postRun]); k.postRun.length;) {
          St.unshift(k.postRun.shift());
        }
        i(St);
      }
    }

    if (null === cn && (cn = Date.now()), !(0 < jt)) {
      if (k.preRun) for ("function" == typeof k.preRun && (k.preRun = [k.preRun]); k.preRun.length;) {
        vt.unshift(k.preRun.shift());
      }
      i(vt), 0 < jt || k.calledRun || (k.setStatus ? (k.setStatus("Running..."), setTimeout(function () {
        setTimeout(function () {
          k.setStatus("");
        }, 1), e();
      }, 1)) : e());
    }
  }

  function d(e) {
    k.onAbort && k.onAbort(e), e = void 0 !== e ? (k.print(e), k.printErr(e), JSON.stringify(e)) : "", J = !0;
    var r = "abort(" + e + ") at " + o() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
    throw sn && sn.forEach(function (t) {
      r = t(r, e);
    }), r;
  }

  function b() {}

  function h(t) {
    return (t || b).__cache__;
  }

  function A(t, e) {
    var r = h(e),
        n = r[t];
    return n || (r[(n = Object.create((e || b).prototype)).ptr = t] = n);
  }

  function T(t) {
    if ("string" == typeof t) {
      for (var e = 0, r = 0; r < t.length; ++r) {
        var n = t.charCodeAt(r);
        55296 <= n && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & t.charCodeAt(++r)), n <= 127 ? ++e : e = n <= 2047 ? e + 2 : n <= 65535 ? e + 3 : n <= 2097151 ? e + 4 : n <= 67108863 ? e + 5 : e + 6;
      }

      if ((r = 0) < (n = (e = Array(e + 1)).length)) {
        n = r + n - 1;

        for (var o = 0; o < t.length; ++o) {
          var i = t.charCodeAt(o);

          if (55296 <= i && i <= 57343 && (i = 65536 + ((1023 & i) << 10) | 1023 & t.charCodeAt(++o)), i <= 127) {
            if (n <= r) break;
            e[r++] = i;
          } else {
            if (i <= 2047) {
              if (n <= r + 1) break;
              e[r++] = 192 | i >> 6;
            } else {
              if (i <= 65535) {
                if (n <= r + 2) break;
                e[r++] = 224 | i >> 12;
              } else {
                if (i <= 2097151) {
                  if (n <= r + 3) break;
                  e[r++] = 240 | i >> 18;
                } else {
                  if (i <= 67108863) {
                    if (n <= r + 4) break;
                    e[r++] = 248 | i >> 24;
                  } else {
                    if (n <= r + 5) break;
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

      t = ln.alloc(e, et), ln.copy(e, et, t);
    }

    return t;
  }

  function I() {
    throw "cannot construct a Status, no constructor in IDL";
  }

  function v() {
    this.ptr = Le(), h(v)[this.ptr] = this;
  }

  function E() {
    this.ptr = Mr(), h(E)[this.ptr] = this;
  }

  function g() {
    this.ptr = qe(), h(g)[this.ptr] = this;
  }

  function D() {
    this.ptr = He(), h(D)[this.ptr] = this;
  }

  function S() {
    this.ptr = Bt(), h(S)[this.ptr] = this;
  }

  function R() {
    this.ptr = Ar(), h(R)[this.ptr] = this;
  }

  function j() {
    this.ptr = qt(), h(j)[this.ptr] = this;
  }

  function M() {
    this.ptr = xt(), h(M)[this.ptr] = this;
  }

  function G() {
    this.ptr = Fe(), h(G)[this.ptr] = this;
  }

  function w() {
    this.ptr = yr(), h(w)[this.ptr] = this;
  }

  function O() {
    this.ptr = je(), h(O)[this.ptr] = this;
  }

  function P() {
    this.ptr = ge(), h(P)[this.ptr] = this;
  }

  function C() {
    this.ptr = Ze(), h(C)[this.ptr] = this;
  }

  function N() {
    this.ptr = Kt(), h(N)[this.ptr] = this;
  }

  function F() {
    this.ptr = re(), h(F)[this.ptr] = this;
  }

  function U() {
    this.ptr = tr(), h(U)[this.ptr] = this;
  }

  function B() {
    throw "cannot construct a VoidPtr, no constructor in IDL";
  }

  function z() {
    this.ptr = Oe(), h(z)[this.ptr] = this;
  }

  function L() {
    this.ptr = dr(), h(L)[this.ptr] = this;
  }

  var k = t = t || {},
      x = !1,
      V = !1;
  k.onRuntimeInitialized = function () {
    x = !0, V && "function" == typeof k.onModuleLoaded && k.onModuleLoaded(k);
  }, k.onModuleParsed = function () {
    V = !0, x && "function" == typeof k.onModuleLoaded && k.onModuleLoaded(k);
  }, k.isVersionSupported = function (t) {
    return "string" == typeof t && !((t = t.split(".")).length < 2 || 3 < t.length) && (1 == t[0] && 0 <= t[1] && t[1] <= 3 || !(0 != t[0] || 10 < t[1]));
  }, k = k || (void 0 !== t ? t : null) || {};
  var H,
      $ = {};

  for (H in k) {
    k.hasOwnProperty(H) && ($[H] = k[H]);
  }

  var Q,
      W,
      q = !1,
      Y = !1,
      X = !1,
      K = !1;
  if (k.ENVIRONMENT) {
    if ("WEB" === k.ENVIRONMENT) q = !0;else if ("WORKER" === k.ENVIRONMENT) Y = !0;else if ("NODE" === k.ENVIRONMENT) X = !0;else {
      if ("SHELL" !== k.ENVIRONMENT) throw Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.");
      K = !0;
    }
  } else q = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)), Y = "function" == typeof importScripts, X = "object" == (typeof process === "undefined" ? "undefined" : _typeof(process)) && "function" == typeof require && !q && !Y, K = !q && !X && !Y;
  if (X) k.print || (k.print = console.log), k.printErr || (k.printErr = console.warn), k.read = function (t, e) {
    return Q = Q || require("fs"), t = (W = W || require("path")).normalize(t), t = Q.readFileSync(t), e ? t : t.toString();
  }, k.readBinary = function (t) {
    return (t = k.read(t, !0)).buffer || (t = new Uint8Array(t)), u(t.buffer), t;
  }, k.thisProgram || (k.thisProgram = 1 < process.argv.length ? process.argv[1].replace(/\\/g, "/") : "unknown-program"), k.arguments = process.argv.slice(2), process.on("uncaughtException", function (t) {
    if (!(t instanceof m)) throw t;
  }), k.inspect = function () {
    return "[Emscripten Module object]";
  };else if (K) k.print || (k.print = print), "undefined" != typeof printErr && (k.printErr = printErr), k.read = "undefined" != typeof read ? function (t) {
    return read(t);
  } : function () {
    throw "no read() available";
  }, k.readBinary = function (t) {
    return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t)) : (u("object" == _typeof(t = read(t, "binary"))), t);
  }, "undefined" != typeof scriptArgs ? k.arguments = scriptArgs : void 0 !== arguments && (k.arguments = arguments), "function" == typeof quit && (k.quit = function (t, e) {
    quit(t);
  });else {
    if (!q && !Y) throw Error("Unknown runtime environment. Where are we?");
    k.read = function (t) {
      var e = new XMLHttpRequest();
      return e.open("GET", t, !1), e.send(null), e.responseText;
    }, Y && (k.readBinary = function (t) {
      var e = new XMLHttpRequest();
      return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
    }), k.readAsync = function (t, e, r) {
      var n = new XMLHttpRequest();
      n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function () {
        200 == n.status || 0 == n.status && n.response ? e(n.response) : r();
      }, n.onerror = r, n.send(null);
    }, void 0 !== arguments && (k.arguments = arguments), "undefined" != typeof console ? (k.print || (k.print = function (t) {
      console.log(t);
    }), k.printErr || (k.printErr = function (t) {
      console.warn(t);
    })) : k.print || (k.print = function (t) {}), void 0 === k.setWindowTitle && (k.setWindowTitle = function (t) {
      document.title = t;
    });
  }

  for (H in k.print || (k.print = function () {}), k.printErr || (k.printErr = k.print), k.arguments || (k.arguments = []), k.thisProgram || (k.thisProgram = "./this.program"), k.quit || (k.quit = function (t, e) {
    throw e;
  }), k.print = k.print, k.printErr = k.printErr, k.preRun = [], k.postRun = [], $) {
    $.hasOwnProperty(H) && (k[H] = $[H]);
  }

  $ = void 0;
  var Z = {
    setTempRet0: function setTempRet0(t) {
      return tempRet0 = t;
    },
    getTempRet0: function getTempRet0() {
      return tempRet0;
    },
    stackSave: function stackSave() {
      return ct;
    },
    stackRestore: function stackRestore(t) {
      ct = t;
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
          return "*" === t[t.length - 1] ? Z.QUANTUM_SIZE : "i" === t[0] ? (u(0 == (t = parseInt(t.substr(1))) % 8), t / 8) : 0;
      }
    },
    getNativeFieldSize: function getNativeFieldSize(t) {
      return Math.max(Z.getNativeTypeSize(t), Z.QUANTUM_SIZE);
    },
    STACK_ALIGN: 16,
    prepVararg: function prepVararg(t, e) {
      return "double" === e || "i64" === e ? 7 & t && (u(4 == (7 & t)), t += 4) : u(0 == (3 & t)), t;
    },
    getAlignSize: function getAlignSize(t, e, r) {
      return r || "i64" != t && "double" != t ? t ? Math.min(e || (t ? Z.getNativeFieldSize(t) : 0), Z.QUANTUM_SIZE) : Math.min(e, 8) : 8;
    },
    dynCall: function dynCall(t, e, r) {
      return r && r.length ? k["dynCall_" + t].apply(null, [e].concat(r)) : k["dynCall_" + t].call(null, e);
    },
    functionPointers: [],
    addFunction: function addFunction(t) {
      for (var e = 0; e < Z.functionPointers.length; e++) {
        if (!Z.functionPointers[e]) return Z.functionPointers[e] = t, 2 * (1 + e);
      }

      throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
    },
    removeFunction: function removeFunction(t) {
      Z.functionPointers[(t - 2) / 2] = null;
    },
    warnOnce: function warnOnce(t) {
      Z.warnOnce.shown || (Z.warnOnce.shown = {}), Z.warnOnce.shown[t] || (Z.warnOnce.shown[t] = 1, k.printErr(t));
    },
    funcWrappers: {},
    getFuncWrapper: function getFuncWrapper(e, r) {
      if (e) {
        u(r), Z.funcWrappers[r] || (Z.funcWrappers[r] = {});
        var t = Z.funcWrappers[r];
        return t[e] || (t[e] = 1 === r.length ? function () {
          return Z.dynCall(r, e);
        } : 2 === r.length ? function (t) {
          return Z.dynCall(r, e, [t]);
        } : function () {
          return Z.dynCall(r, e, Array.prototype.slice.call(arguments));
        }), t[e];
      }
    },
    getCompilerSetting: function getCompilerSetting(t) {
      throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work";
    },
    stackAlloc: function stackAlloc(t) {
      var e = ct;
      return ct = (ct = ct + t | 0) + 15 & -16, e;
    },
    staticAlloc: function staticAlloc(t) {
      var e = ut;
      return ut = (ut = ut + t | 0) + 15 & -16, e;
    },
    dynamicAlloc: function dynamicAlloc(t) {
      var e = it[yt >> 2];
      return t = -16 & (e + t + 15 | 0), it[yt >> 2] = t, It <= t && !r() ? (it[yt >> 2] = e, 0) : e;
    },
    alignMemory: function alignMemory(t, e) {
      return Math.ceil(t / (e || 16)) * (e || 16);
    },
    makeBigInt: function makeBigInt(t, e, r) {
      return r ? +(t >>> 0) + 4294967296 * (e >>> 0) : +(t >>> 0) + 4294967296 * (0 | e);
    },
    GLOBAL_BASE: 1024,
    QUANTUM_SIZE: 4,
    __dummy__: 0
  },
      J = 0,
      tt = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
  "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");

  var et,
      rt,
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
      ft = 65536,
      mt = 16777216,
      dt = 16777216,
      bt = ut = ct = yt = 0;

  k.reallocBuffer || (k.reallocBuffer = function (t) {
    try {
      var e, r;
      ArrayBuffer.transfer ? r = ArrayBuffer.transfer(At, t) : (e = et, r = new ArrayBuffer(t), new Int8Array(r).set(e));
    } catch (t) {
      return !1;
    }

    return !!nn(r) && r;
  });

  try {
    var ht = Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get);
    ht(new ArrayBuffer(4));
  } catch (t) {
    ht = function ht(t) {
      return t.byteLength;
    };
  }

  var At,
      Tt = k.TOTAL_STACK || 5242880,
      It = k.TOTAL_MEMORY || 16777216;
  if (It < Tt && k.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + It + "! (TOTAL_STACK=" + Tt + ")"), At = k.buffer ? k.buffer : "object" == (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) && "function" == typeof WebAssembly.Memory ? (k.wasmMemory = new WebAssembly.Memory({
    initial: It / ft
  }), k.wasmMemory.buffer) : new ArrayBuffer(It), s(), it[0] = 1668509029, nt[1] = 25459, 115 !== rt[2] || 99 !== rt[3]) throw "Runtime error: expected the system to be little-endian!";
  k.HEAP = void 0, k.buffer = At, k.HEAP8 = et, k.HEAP16 = nt, k.HEAP32 = it, k.HEAPU8 = rt, k.HEAPU16 = ot, k.HEAPU32 = _t, k.HEAPF32 = at, k.HEAPF64 = pt;
  var vt = [],
      Et = [],
      gt = [],
      Dt = [],
      St = [],
      Rt = !1;
  u(Math.imul && Math.fround && Math.clz32 && Math.trunc, "this is a legacy browser, build with LEGACY_VM_SUPPORT");
  var jt = 0,
      Mt = null,
      Gt = null;
  k.preloadedImages = {}, k.preloadedAudios = {};
  var wt = null;
  !function () {
    function i() {
      try {
        if (k.wasmBinary) return new Uint8Array(k.wasmBinary);
        if (k.readBinary) return k.readBinary(a);
        throw "on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";
      } catch (t) {
        d(t);
      }
    }

    function _(t, e) {
      function r(t, e) {
        var r;
        (u = t.exports).memory && (t = u.memory, e = k.buffer, t.byteLength < e.byteLength && k.printErr("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here"), e = new Int8Array(e), r = new Int8Array(t), wt || e.set(r.subarray(k.STATIC_BASE, k.STATIC_BASE + k.STATIC_BUMP), k.STATIC_BASE), r.set(e), k.buffer = At = t, s()), k.asm = u, k.usingWasm = !0, y("wasm-instantiate");
      }

      function n(t) {
        r(t.instance, t.module);
      }

      function o(t) {
        (k.wasmBinary || !q && !Y || "function" != typeof fetch ? new Promise(function (t, e) {
          t(i());
        }) : fetch(a, {
          credentials: "same-origin"
        }).then(function (t) {
          if (!t.ok) throw "failed to load wasm binary file at '" + a + "'";
          return t.arrayBuffer();
        })["catch"](i)).then(function (t) {
          return WebAssembly.instantiate(t, p);
        }).then(t)["catch"](function (t) {
          k.printErr("failed to asynchronously prepare wasm: " + t), d(t);
        });
      }

      if ("object" != (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly))) return k.printErr("no native wasm support detected"), !1;
      if (!(k.wasmMemory instanceof WebAssembly.Memory)) return k.printErr("no native wasm Memory in use"), !1;
      if (e.memory = k.wasmMemory, p.global = {
        NaN: NaN,
        Infinity: 1 / 0
      }, p["global.Math"] = t.Math, p.env = e, l(), k.instantiateWasm) try {
        return k.instantiateWasm(p, r);
      } catch (t) {
        return k.printErr("Module.instantiateWasm callback failed with error: " + t), !1;
      }
      return k.wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || 0 === a.indexOf("data:") || "function" != typeof fetch ? o(n) : WebAssembly.instantiateStreaming(fetch(a, {
        credentials: "same-origin"
      }), p).then(n)["catch"](function (t) {
        k.printErr("wasm streaming compile failed: " + t), k.printErr("falling back to ArrayBuffer instantiation"), o(n);
      }), {};
    }

    var a = "draco_decoder.wasm",
        t = "draco_decoder.temp.asm.js";
    "function" == typeof k.locateFile && (k.locateFile("draco_decoder.wast"), a = k.locateFile(a), t = k.locateFile(t));
    var p = {
      global: null,
      env: null,
      asm2wasm: {
        "f64-rem": function f64Rem(t, e) {
          return t % e;
        },
        "debugger": function _debugger() {}
      },
      parent: k
    },
        u = null;
    k.asmPreload = k.asm;
    var n = k.reallocBuffer;

    k.reallocBuffer = function (t) {
      if ("asmjs" === o) var e = n(t);else t: {
        t = c(t, k.usingWasm ? ft : mt);
        var r = k.buffer.byteLength;
        if (k.usingWasm) try {
          e = -1 !== k.wasmMemory.grow((t - r) / 65536) ? k.buffer = k.wasmMemory.buffer : null;
          break t;
        } catch (t) {
          e = null;
          break t;
        }
        e = void 0;
      }
      return e;
    };

    var o = "";

    k.asm = function (t, e, r) {
      var n, o;
      return e.table || (void 0 === (n = k.wasmTableSize) && (n = 1024), o = k.wasmMaxTableSize, e.table = "object" == (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) && "function" == typeof WebAssembly.Table ? void 0 !== o ? new WebAssembly.Table({
        initial: n,
        maximum: o,
        element: "anyfunc"
      }) : new WebAssembly.Table({
        initial: n,
        element: "anyfunc"
      }) : Array(n), k.wasmTable = e.table), e.memoryBase || (e.memoryBase = k.STATIC_BASE), e.tableBase || (e.tableBase = 0), (t = _(t, e)) || d("no binaryen method succeeded. consider enabling more options, like interpreting, if you want that: https://github.com/kripken/emscripten/wiki/WebAssembly#binaryen-methods"), t;
    };
  }(), bt = Z.GLOBAL_BASE, ut = bt + 19104, Et.push(), wt = null, k.STATIC_BASE = bt, k.STATIC_BUMP = 19104;
  var Ot = ut;
  ut += 16;
  var Pt = {
    last: 0,
    caught: [],
    infos: {},
    deAdjust: function deAdjust(t) {
      if (!t || Pt.infos[t]) return t;

      for (var e in Pt.infos) {
        if (Pt.infos[e].adjusted === t) return e;
      }

      return t;
    },
    addRef: function addRef(t) {
      t && Pt.infos[t].refcount++;
    },
    decRef: function decRef(t) {
      var e;
      t && (u(0 < (e = Pt.infos[t]).refcount), e.refcount--, 0 !== e.refcount || e.rethrown || (e.destructor && k.dynCall_vi(e.destructor, t), delete Pt.infos[t], ___cxa_free_exception(t)));
    },
    clearRef: function clearRef(t) {
      t && (Pt.infos[t].refcount = 0);
    }
  },
      Ct = {
    varargs: 0,
    get: function get(t) {
      return Ct.varargs += 4, it[Ct.varargs - 4 >> 2];
    },
    getStr: function getStr() {
      return n(Ct.get());
    },
    get64: function get64() {
      var t = Ct.get(),
          e = Ct.get();
      return u(0 <= t ? 0 === e : -1 === e), t;
    },
    getZero: function getZero() {
      u(0 === Ct.get());
    }
  },
      Nt = {},
      Ft = 1;
  Dt.push(function () {
    var t,
        e = k._fflush;
    e && e(0), (e = f.printChar) && ((t = f.buffers)[1].length && e(1, 10), t[2].length && e(2, 10));
  }), yt = Z.staticAlloc(4), st = (ct = Z.alignMemory(ut)) + Tt, lt = Z.alignMemory(st), it[yt >> 2] = lt, k.wasmTableSize = 492, k.wasmMaxTableSize = 492, k.asmGlobalArg = {
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
    byteLength: ht
  }, k.asmLibraryArg = {
    abort: d,
    assert: u,
    enlargeMemory: r,
    getTotalMemory: function getTotalMemory() {
      return It;
    },
    abortOnCannotGrowMemory: function abortOnCannotGrowMemory() {
      d("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + It + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    },
    invoke_ii: function invoke_ii(t, e) {
      try {
        return k.dynCall_ii(t, e);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_iii: function invoke_iii(t, e, r) {
      try {
        return k.dynCall_iii(t, e, r);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_iiii: function invoke_iiii(t, e, r, n) {
      try {
        return k.dynCall_iiii(t, e, r, n);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_iiiiiii: function invoke_iiiiiii(t, e, r, n, o, i, _) {
      try {
        return k.dynCall_iiiiiii(t, e, r, n, o, i, _);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_v: function invoke_v(t) {
      try {
        k.dynCall_v(t);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_vi: function invoke_vi(t, e) {
      try {
        k.dynCall_vi(t, e);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_vii: function invoke_vii(t, e, r) {
      try {
        k.dynCall_vii(t, e, r);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_viii: function invoke_viii(t, e, r, n) {
      try {
        k.dynCall_viii(t, e, r, n);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_viiii: function invoke_viiii(t, e, r, n, o) {
      try {
        k.dynCall_viiii(t, e, r, n, o);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_viiiii: function invoke_viiiii(t, e, r, n, o, i) {
      try {
        k.dynCall_viiiii(t, e, r, n, o, i);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    invoke_viiiiii: function invoke_viiiiii(t, e, r, n, o, i, _) {
      try {
        k.dynCall_viiiiii(t, e, r, n, o, i, _);
      } catch (t) {
        if ("number" != typeof t && "longjmp" !== t) throw t;
        k.setThrew(1, 0);
      }
    },
    __ZSt18uncaught_exceptionv: _,
    ___cxa_allocate_exception: function ___cxa_allocate_exception(t) {
      return un(t);
    },
    ___cxa_begin_catch: function ___cxa_begin_catch(t) {
      var e = Pt.infos[t];
      return e && !e.caught && (e.caught = !0, _.uncaught_exception--), e && (e.rethrown = !1), Pt.caught.push(t), Pt.addRef(Pt.deAdjust(t)), t;
    },
    ___cxa_find_matching_catch: a,
    ___cxa_pure_virtual: function ___cxa_pure_virtual() {
      throw J = !0, "Pure virtual function called!";
    },
    ___cxa_throw: function ___cxa_throw(t, e, r) {
      throw Pt.infos[t] = {
        ptr: t,
        adjusted: t,
        type: e,
        destructor: r,
        refcount: 0,
        caught: !1,
        rethrown: !1
      }, Pt.last = t, "uncaught_exception" in _ ? _.uncaught_exception++ : _.uncaught_exception = 1, t + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___gxx_personality_v0: function ___gxx_personality_v0() {},
    ___resumeException: function ___resumeException(t) {
      throw Pt.last || (Pt.last = t), t + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
    },
    ___setErrNo: function ___setErrNo(t) {
      return k.___errno_location && (it[k.___errno_location() >> 2] = t), t;
    },
    ___syscall140: function ___syscall140(t, e) {
      Ct.varargs = e;

      try {
        var r = Ct.getStreamFromFD();
        Ct.get();
        var n = Ct.get(),
            o = Ct.get(),
            i = Ct.get();
        return FS.llseek(r, n, i), it[o >> 2] = r.position, r.getdents && 0 === n && 0 === i && (r.getdents = null), 0;
      } catch (t) {
        return "undefined" != typeof FS && t instanceof FS.ErrnoError || d(t), -t.errno;
      }
    },
    ___syscall146: f,
    ___syscall54: function ___syscall54(t, e) {
      return Ct.varargs = e, 0;
    },
    ___syscall6: function ___syscall6(t, e) {
      Ct.varargs = e;

      try {
        var r = Ct.getStreamFromFD();
        return FS.close(r), 0;
      } catch (t) {
        return "undefined" != typeof FS && t instanceof FS.ErrnoError || d(t), -t.errno;
      }
    },
    _abort: function _abort() {
      k.abort();
    },
    _emscripten_memcpy_big: function _emscripten_memcpy_big(t, e, r) {
      return rt.set(rt.subarray(e, e + r), t), t;
    },
    _pthread_getspecific: function _pthread_getspecific(t) {
      return Nt[t] || 0;
    },
    _pthread_key_create: function _pthread_key_create(t, e) {
      return 0 == t ? 22 : (it[t >> 2] = Ft, Nt[Ft] = 0, Ft++, 0);
    },
    _pthread_once: p,
    _pthread_setspecific: function _pthread_setspecific(t, e) {
      return t in Nt ? (Nt[t] = e, 0) : 22;
    },
    DYNAMICTOP_PTR: yt,
    tempDoublePtr: Ot,
    ABORT: J,
    STACKTOP: ct,
    STACK_MAX: st
  };
  var Ut = k.asm(k.asmGlobalArg, k.asmLibraryArg, At);
  k.asm = Ut, k.___cxa_can_catch = function () {
    return k.asm.___cxa_can_catch.apply(null, arguments);
  }, k.___cxa_is_pointer_type = function () {
    return k.asm.___cxa_is_pointer_type.apply(null, arguments);
  };

  var Bt = k._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = function () {
    return k.asm._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0.apply(null, arguments);
  },
      zt = k._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function () {
    return k.asm._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1.apply(null, arguments);
  },
      Lt = k._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function () {
    return k.asm._emscripten_bind_AttributeOctahedronTransform___destroy___0.apply(null, arguments);
  },
      kt = k._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function () {
    return k.asm._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0.apply(null, arguments);
  },
      xt = k._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = function () {
    return k.asm._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0.apply(null, arguments);
  },
      Vt = k._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function () {
    return k.asm._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1.apply(null, arguments);
  },
      Ht = k._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function () {
    return k.asm._emscripten_bind_AttributeQuantizationTransform___destroy___0.apply(null, arguments);
  },
      $t = k._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function () {
    return k.asm._emscripten_bind_AttributeQuantizationTransform_min_value_1.apply(null, arguments);
  },
      Qt = k._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function () {
    return k.asm._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0.apply(null, arguments);
  },
      Wt = k._emscripten_bind_AttributeQuantizationTransform_range_0 = function () {
    return k.asm._emscripten_bind_AttributeQuantizationTransform_range_0.apply(null, arguments);
  },
      qt = k._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function () {
    return k.asm._emscripten_bind_AttributeTransformData_AttributeTransformData_0.apply(null, arguments);
  },
      Yt = k._emscripten_bind_AttributeTransformData___destroy___0 = function () {
    return k.asm._emscripten_bind_AttributeTransformData___destroy___0.apply(null, arguments);
  },
      Xt = k._emscripten_bind_AttributeTransformData_transform_type_0 = function () {
    return k.asm._emscripten_bind_AttributeTransformData_transform_type_0.apply(null, arguments);
  },
      Kt = k._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function () {
    return k.asm._emscripten_bind_DecoderBuffer_DecoderBuffer_0.apply(null, arguments);
  },
      Zt = k._emscripten_bind_DecoderBuffer_Init_2 = function () {
    return k.asm._emscripten_bind_DecoderBuffer_Init_2.apply(null, arguments);
  },
      Jt = k._emscripten_bind_DecoderBuffer___destroy___0 = function () {
    return k.asm._emscripten_bind_DecoderBuffer___destroy___0.apply(null, arguments);
  },
      te = k._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function () {
    return k.asm._emscripten_bind_Decoder_DecodeBufferToMesh_2.apply(null, arguments);
  },
      ee = k._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function () {
    return k.asm._emscripten_bind_Decoder_DecodeBufferToPointCloud_2.apply(null, arguments);
  },
      re = k._emscripten_bind_Decoder_Decoder_0 = function () {
    return k.asm._emscripten_bind_Decoder_Decoder_0.apply(null, arguments);
  },
      ne = k._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeByUniqueId_2.apply(null, arguments);
  },
      oe = k._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3.apply(null, arguments);
  },
      ie = k._emscripten_bind_Decoder_GetAttributeFloat_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeFloat_3.apply(null, arguments);
  },
      _e = k._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3.apply(null, arguments);
  },
      ae = k._emscripten_bind_Decoder_GetAttributeIdByName_2 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeIdByName_2.apply(null, arguments);
  },
      pe = k._emscripten_bind_Decoder_GetAttributeId_2 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeId_2.apply(null, arguments);
  },
      ue = k._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3.apply(null, arguments);
  },
      ce = k._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3.apply(null, arguments);
  },
      se = k._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3.apply(null, arguments);
  },
      le = k._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3.apply(null, arguments);
  },
      ye = k._emscripten_bind_Decoder_GetAttributeMetadata_2 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeMetadata_2.apply(null, arguments);
  },
      fe = k._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3.apply(null, arguments);
  },
      me = k._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3.apply(null, arguments);
  },
      de = k._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3.apply(null, arguments);
  },
      be = k._emscripten_bind_Decoder_GetAttribute_2 = function () {
    return k.asm._emscripten_bind_Decoder_GetAttribute_2.apply(null, arguments);
  },
      he = k._emscripten_bind_Decoder_GetEncodedGeometryType_1 = function () {
    return k.asm._emscripten_bind_Decoder_GetEncodedGeometryType_1.apply(null, arguments);
  },
      Ae = k._emscripten_bind_Decoder_GetFaceFromMesh_3 = function () {
    return k.asm._emscripten_bind_Decoder_GetFaceFromMesh_3.apply(null, arguments);
  },
      Te = k._emscripten_bind_Decoder_GetMetadata_1 = function () {
    return k.asm._emscripten_bind_Decoder_GetMetadata_1.apply(null, arguments);
  },
      Ie = k._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function () {
    return k.asm._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2.apply(null, arguments);
  },
      ve = k._emscripten_bind_Decoder_SkipAttributeTransform_1 = function () {
    return k.asm._emscripten_bind_Decoder_SkipAttributeTransform_1.apply(null, arguments);
  },
      Ee = k._emscripten_bind_Decoder___destroy___0 = function () {
    return k.asm._emscripten_bind_Decoder___destroy___0.apply(null, arguments);
  },
      ge = k._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function () {
    return k.asm._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0.apply(null, arguments);
  },
      De = k._emscripten_bind_DracoFloat32Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoFloat32Array_GetValue_1.apply(null, arguments);
  },
      Se = k._emscripten_bind_DracoFloat32Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoFloat32Array___destroy___0.apply(null, arguments);
  },
      Re = k._emscripten_bind_DracoFloat32Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoFloat32Array_size_0.apply(null, arguments);
  },
      je = k._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = function () {
    return k.asm._emscripten_bind_DracoInt16Array_DracoInt16Array_0.apply(null, arguments);
  },
      Me = k._emscripten_bind_DracoInt16Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoInt16Array_GetValue_1.apply(null, arguments);
  },
      Ge = k._emscripten_bind_DracoInt16Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoInt16Array___destroy___0.apply(null, arguments);
  },
      we = k._emscripten_bind_DracoInt16Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoInt16Array_size_0.apply(null, arguments);
  },
      Oe = k._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function () {
    return k.asm._emscripten_bind_DracoInt32Array_DracoInt32Array_0.apply(null, arguments);
  },
      Pe = k._emscripten_bind_DracoInt32Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoInt32Array_GetValue_1.apply(null, arguments);
  },
      Ce = k._emscripten_bind_DracoInt32Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoInt32Array___destroy___0.apply(null, arguments);
  },
      Ne = k._emscripten_bind_DracoInt32Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoInt32Array_size_0.apply(null, arguments);
  },
      Fe = k._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function () {
    return k.asm._emscripten_bind_DracoInt8Array_DracoInt8Array_0.apply(null, arguments);
  },
      Ue = k._emscripten_bind_DracoInt8Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoInt8Array_GetValue_1.apply(null, arguments);
  },
      Be = k._emscripten_bind_DracoInt8Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoInt8Array___destroy___0.apply(null, arguments);
  },
      ze = k._emscripten_bind_DracoInt8Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoInt8Array_size_0.apply(null, arguments);
  },
      Le = k._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = function () {
    return k.asm._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0.apply(null, arguments);
  },
      ke = k._emscripten_bind_DracoUInt16Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoUInt16Array_GetValue_1.apply(null, arguments);
  },
      xe = k._emscripten_bind_DracoUInt16Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoUInt16Array___destroy___0.apply(null, arguments);
  },
      Ve = k._emscripten_bind_DracoUInt16Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoUInt16Array_size_0.apply(null, arguments);
  },
      He = k._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = function () {
    return k.asm._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0.apply(null, arguments);
  },
      $e = k._emscripten_bind_DracoUInt32Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoUInt32Array_GetValue_1.apply(null, arguments);
  },
      Qe = k._emscripten_bind_DracoUInt32Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoUInt32Array___destroy___0.apply(null, arguments);
  },
      We = k._emscripten_bind_DracoUInt32Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoUInt32Array_size_0.apply(null, arguments);
  },
      qe = k._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = function () {
    return k.asm._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0.apply(null, arguments);
  },
      Ye = k._emscripten_bind_DracoUInt8Array_GetValue_1 = function () {
    return k.asm._emscripten_bind_DracoUInt8Array_GetValue_1.apply(null, arguments);
  },
      Xe = k._emscripten_bind_DracoUInt8Array___destroy___0 = function () {
    return k.asm._emscripten_bind_DracoUInt8Array___destroy___0.apply(null, arguments);
  },
      Ke = k._emscripten_bind_DracoUInt8Array_size_0 = function () {
    return k.asm._emscripten_bind_DracoUInt8Array_size_0.apply(null, arguments);
  },
      Ze = k._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function () {
    return k.asm._emscripten_bind_GeometryAttribute_GeometryAttribute_0.apply(null, arguments);
  },
      Je = k._emscripten_bind_GeometryAttribute___destroy___0 = function () {
    return k.asm._emscripten_bind_GeometryAttribute___destroy___0.apply(null, arguments);
  },
      tr = k._emscripten_bind_Mesh_Mesh_0 = function () {
    return k.asm._emscripten_bind_Mesh_Mesh_0.apply(null, arguments);
  },
      er = k._emscripten_bind_Mesh___destroy___0 = function () {
    return k.asm._emscripten_bind_Mesh___destroy___0.apply(null, arguments);
  },
      rr = k._emscripten_bind_Mesh_num_attributes_0 = function () {
    return k.asm._emscripten_bind_Mesh_num_attributes_0.apply(null, arguments);
  },
      nr = k._emscripten_bind_Mesh_num_faces_0 = function () {
    return k.asm._emscripten_bind_Mesh_num_faces_0.apply(null, arguments);
  },
      or = k._emscripten_bind_Mesh_num_points_0 = function () {
    return k.asm._emscripten_bind_Mesh_num_points_0.apply(null, arguments);
  },
      ir = k._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_GetDoubleEntry_2.apply(null, arguments);
  },
      _r = k._emscripten_bind_MetadataQuerier_GetEntryName_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_GetEntryName_2.apply(null, arguments);
  },
      ar = k._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_GetIntEntry_2.apply(null, arguments);
  },
      pr = k._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_GetStringEntry_2.apply(null, arguments);
  },
      ur = k._emscripten_bind_MetadataQuerier_HasDoubleEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_HasDoubleEntry_2.apply(null, arguments);
  },
      cr = k._emscripten_bind_MetadataQuerier_HasEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_HasEntry_2.apply(null, arguments);
  },
      sr = k._emscripten_bind_MetadataQuerier_HasIntEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_HasIntEntry_2.apply(null, arguments);
  },
      lr = k._emscripten_bind_MetadataQuerier_HasStringEntry_2 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_HasStringEntry_2.apply(null, arguments);
  },
      yr = k._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_MetadataQuerier_0.apply(null, arguments);
  },
      fr = k._emscripten_bind_MetadataQuerier_NumEntries_1 = function () {
    return k.asm._emscripten_bind_MetadataQuerier_NumEntries_1.apply(null, arguments);
  },
      mr = k._emscripten_bind_MetadataQuerier___destroy___0 = function () {
    return k.asm._emscripten_bind_MetadataQuerier___destroy___0.apply(null, arguments);
  },
      dr = k._emscripten_bind_Metadata_Metadata_0 = function () {
    return k.asm._emscripten_bind_Metadata_Metadata_0.apply(null, arguments);
  },
      br = k._emscripten_bind_Metadata___destroy___0 = function () {
    return k.asm._emscripten_bind_Metadata___destroy___0.apply(null, arguments);
  },
      hr = k._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_GetAttributeTransformData_0.apply(null, arguments);
  },
      Ar = k._emscripten_bind_PointAttribute_PointAttribute_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_PointAttribute_0.apply(null, arguments);
  },
      Tr = k._emscripten_bind_PointAttribute___destroy___0 = function () {
    return k.asm._emscripten_bind_PointAttribute___destroy___0.apply(null, arguments);
  },
      Ir = k._emscripten_bind_PointAttribute_attribute_type_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_attribute_type_0.apply(null, arguments);
  },
      vr = k._emscripten_bind_PointAttribute_byte_offset_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_byte_offset_0.apply(null, arguments);
  },
      Er = k._emscripten_bind_PointAttribute_byte_stride_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_byte_stride_0.apply(null, arguments);
  },
      gr = k._emscripten_bind_PointAttribute_data_type_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_data_type_0.apply(null, arguments);
  },
      Dr = k._emscripten_bind_PointAttribute_normalized_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_normalized_0.apply(null, arguments);
  },
      Sr = k._emscripten_bind_PointAttribute_num_components_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_num_components_0.apply(null, arguments);
  },
      Rr = k._emscripten_bind_PointAttribute_size_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_size_0.apply(null, arguments);
  },
      jr = k._emscripten_bind_PointAttribute_unique_id_0 = function () {
    return k.asm._emscripten_bind_PointAttribute_unique_id_0.apply(null, arguments);
  },
      Mr = k._emscripten_bind_PointCloud_PointCloud_0 = function () {
    return k.asm._emscripten_bind_PointCloud_PointCloud_0.apply(null, arguments);
  },
      Gr = k._emscripten_bind_PointCloud___destroy___0 = function () {
    return k.asm._emscripten_bind_PointCloud___destroy___0.apply(null, arguments);
  },
      wr = k._emscripten_bind_PointCloud_num_attributes_0 = function () {
    return k.asm._emscripten_bind_PointCloud_num_attributes_0.apply(null, arguments);
  },
      Or = k._emscripten_bind_PointCloud_num_points_0 = function () {
    return k.asm._emscripten_bind_PointCloud_num_points_0.apply(null, arguments);
  },
      Pr = k._emscripten_bind_Status___destroy___0 = function () {
    return k.asm._emscripten_bind_Status___destroy___0.apply(null, arguments);
  },
      Cr = k._emscripten_bind_Status_code_0 = function () {
    return k.asm._emscripten_bind_Status_code_0.apply(null, arguments);
  },
      Nr = k._emscripten_bind_Status_error_msg_0 = function () {
    return k.asm._emscripten_bind_Status_error_msg_0.apply(null, arguments);
  },
      Fr = k._emscripten_bind_Status_ok_0 = function () {
    return k.asm._emscripten_bind_Status_ok_0.apply(null, arguments);
  },
      Ur = k._emscripten_bind_VoidPtr___destroy___0 = function () {
    return k.asm._emscripten_bind_VoidPtr___destroy___0.apply(null, arguments);
  },
      Br = k._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = function () {
    return k.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM.apply(null, arguments);
  },
      zr = k._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function () {
    return k.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM.apply(null, arguments);
  },
      Lr = k._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = function () {
    return k.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM.apply(null, arguments);
  },
      kr = k._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = function () {
    return k.asm._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM.apply(null, arguments);
  },
      xr = k._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function () {
    return k.asm._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE.apply(null, arguments);
  },
      Vr = k._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function () {
    return k.asm._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD.apply(null, arguments);
  },
      Hr = k._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function () {
    return k.asm._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH.apply(null, arguments);
  },
      $r = k._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function () {
    return k.asm._emscripten_enum_draco_GeometryAttribute_Type_COLOR.apply(null, arguments);
  },
      Qr = k._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function () {
    return k.asm._emscripten_enum_draco_GeometryAttribute_Type_GENERIC.apply(null, arguments);
  },
      Wr = k._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function () {
    return k.asm._emscripten_enum_draco_GeometryAttribute_Type_INVALID.apply(null, arguments);
  },
      qr = k._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function () {
    return k.asm._emscripten_enum_draco_GeometryAttribute_Type_NORMAL.apply(null, arguments);
  },
      Yr = k._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function () {
    return k.asm._emscripten_enum_draco_GeometryAttribute_Type_POSITION.apply(null, arguments);
  },
      Xr = k._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function () {
    return k.asm._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD.apply(null, arguments);
  },
      Kr = k._emscripten_enum_draco_StatusCode_ERROR = function () {
    return k.asm._emscripten_enum_draco_StatusCode_ERROR.apply(null, arguments);
  },
      Zr = k._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function () {
    return k.asm._emscripten_enum_draco_StatusCode_INVALID_PARAMETER.apply(null, arguments);
  },
      Jr = k._emscripten_enum_draco_StatusCode_IO_ERROR = function () {
    return k.asm._emscripten_enum_draco_StatusCode_IO_ERROR.apply(null, arguments);
  },
      tn = k._emscripten_enum_draco_StatusCode_OK = function () {
    return k.asm._emscripten_enum_draco_StatusCode_OK.apply(null, arguments);
  },
      en = k._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function () {
    return k.asm._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION.apply(null, arguments);
  },
      rn = k._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function () {
    return k.asm._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION.apply(null, arguments);
  };

  k._emscripten_get_global_libc = function () {
    return k.asm._emscripten_get_global_libc.apply(null, arguments);
  };

  var nn = k._emscripten_replace_memory = function () {
    return k.asm._emscripten_replace_memory.apply(null, arguments);
  };

  k._free = function () {
    return k.asm._free.apply(null, arguments);
  }, k._llvm_bswap_i32 = function () {
    return k.asm._llvm_bswap_i32.apply(null, arguments);
  };

  var on,
      _n,
      an,
      pn,
      un = k._malloc = function () {
    return k.asm._malloc.apply(null, arguments);
  };

  k._memcpy = function () {
    return k.asm._memcpy.apply(null, arguments);
  }, k._memmove = function () {
    return k.asm._memmove.apply(null, arguments);
  }, k._memset = function () {
    return k.asm._memset.apply(null, arguments);
  }, k._sbrk = function () {
    return k.asm._sbrk.apply(null, arguments);
  }, k.establishStackSpace = function () {
    return k.asm.establishStackSpace.apply(null, arguments);
  }, k.getTempRet0 = function () {
    return k.asm.getTempRet0.apply(null, arguments);
  }, k.runPostSets = function () {
    return k.asm.runPostSets.apply(null, arguments);
  }, k.setTempRet0 = function () {
    return k.asm.setTempRet0.apply(null, arguments);
  }, k.setThrew = function () {
    return k.asm.setThrew.apply(null, arguments);
  }, k.stackAlloc = function () {
    return k.asm.stackAlloc.apply(null, arguments);
  }, k.stackRestore = function () {
    return k.asm.stackRestore.apply(null, arguments);
  }, k.stackSave = function () {
    return k.asm.stackSave.apply(null, arguments);
  }, k.dynCall_ii = function () {
    return k.asm.dynCall_ii.apply(null, arguments);
  }, k.dynCall_iii = function () {
    return k.asm.dynCall_iii.apply(null, arguments);
  }, k.dynCall_iiii = function () {
    return k.asm.dynCall_iiii.apply(null, arguments);
  }, k.dynCall_iiiiiii = function () {
    return k.asm.dynCall_iiiiiii.apply(null, arguments);
  }, k.dynCall_v = function () {
    return k.asm.dynCall_v.apply(null, arguments);
  }, k.dynCall_vi = function () {
    return k.asm.dynCall_vi.apply(null, arguments);
  }, k.dynCall_vii = function () {
    return k.asm.dynCall_vii.apply(null, arguments);
  }, k.dynCall_viii = function () {
    return k.asm.dynCall_viii.apply(null, arguments);
  }, k.dynCall_viiii = function () {
    return k.asm.dynCall_viiii.apply(null, arguments);
  }, k.dynCall_viiiii = function () {
    return k.asm.dynCall_viiiii.apply(null, arguments);
  }, k.dynCall_viiiiii = function () {
    return k.asm.dynCall_viiiiii.apply(null, arguments);
  }, Z.stackAlloc = k.stackAlloc, Z.stackSave = k.stackSave, Z.stackRestore = k.stackRestore, Z.establishStackSpace = k.establishStackSpace, Z.setTempRet0 = k.setTempRet0, Z.getTempRet0 = k.getTempRet0, k.asm = Ut, wt && ("function" == typeof k.locateFile ? wt = k.locateFile(wt) : k.memoryInitializerPrefixURL && (wt = k.memoryInitializerPrefixURL + wt), X || K ? (on = k.readBinary(wt), rt.set(on, Z.GLOBAL_BASE)) : (_n = function _n() {
    k.readAsync(wt, an, function () {
      throw "could not load memory initializer " + wt;
    });
  }, l(), an = function an(t) {
    t.byteLength && (t = new Uint8Array(t)), rt.set(t, Z.GLOBAL_BASE), k.memoryInitializerRequest && delete k.memoryInitializerRequest.response, y("memory initializer");
  }, k.memoryInitializerRequest ? (pn = function pn() {
    var t = k.memoryInitializerRequest,
        e = t.response;
    200 !== t.status && 0 !== t.status ? (console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + t.status + ", retrying " + wt), _n()) : an(e);
  }, k.memoryInitializerRequest.response ? setTimeout(pn, 0) : k.memoryInitializerRequest.addEventListener("load", pn)) : _n())), k.then = function (t) {
    var e;
    return k.calledRun ? t(k) : (e = k.onRuntimeInitialized, k.onRuntimeInitialized = function () {
      e && e(), t(k);
    }), k;
  }, (m.prototype = Error()).constructor = m;

  var cn = null,
      Gt = function t() {
    k.calledRun || e(), k.calledRun || (Gt = t);
  };

  k.run = e, k.exit = function (t, e) {
    e && k.noExitRuntime || (!k.noExitRuntime && (J = !0, ct = void 0, i(Dt), k.onExit) && k.onExit(t), X && process.exit(t), k.quit(t, new m(t)));
  };
  var sn = [];
  if (k.abort = d, k.preInit) for ("function" == typeof k.preInit && (k.preInit = [k.preInit]); 0 < k.preInit.length;) {
    k.preInit.pop()();
  }
  e(), (((b.prototype = Object.create(b.prototype)).constructor = b).prototype.__class__ = b).__cache__ = {}, k.WrapperObject = b, k.getCache = h, k.wrapPointer = A, k.castObject = function (t, e) {
    return A(t.ptr, e);
  }, k.NULL = A(0), k.destroy = function (t) {
    if (!t.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
    t.__destroy__(), delete h(t.__class__)[t.ptr];
  }, k.compare = function (t, e) {
    return t.ptr === e.ptr;
  }, k.getPointer = function (t) {
    return t.ptr;
  }, k.getClass = function (t) {
    return t.__class__;
  };
  var ln = {
    buffer: 0,
    size: 0,
    pos: 0,
    temps: [],
    needed: 0,
    prepare: function prepare() {
      if (ln.needed) {
        for (var t = 0; t < ln.temps.length; t++) {
          k._free(ln.temps[t]);
        }

        ln.temps.length = 0, k._free(ln.buffer), ln.buffer = 0, ln.size += ln.needed, ln.needed = 0;
      }

      ln.buffer || (ln.size += 128, ln.buffer = k._malloc(ln.size), u(ln.buffer)), ln.pos = 0;
    },
    alloc: function alloc(t, e) {
      return u(ln.buffer), t = (t = t.length * e.BYTES_PER_ELEMENT) + 7 & -8, ln.pos + t >= ln.size ? (u(0 < t), ln.needed += t, e = k._malloc(t), ln.temps.push(e)) : (e = ln.buffer + ln.pos, ln.pos += t), e;
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

  function yn() {
    k.OK = tn(), k.ERROR = Kr(), k.IO_ERROR = Jr(), k.INVALID_PARAMETER = Zr(), k.UNSUPPORTED_VERSION = rn(), k.UNKNOWN_VERSION = en(), k.INVALID_GEOMETRY_TYPE = xr(), k.POINT_CLOUD = Vr(), k.TRIANGULAR_MESH = Hr(), k.ATTRIBUTE_INVALID_TRANSFORM = Br(), k.ATTRIBUTE_NO_TRANSFORM = zr(), k.ATTRIBUTE_QUANTIZATION_TRANSFORM = kr(), k.ATTRIBUTE_OCTAHEDRON_TRANSFORM = Lr(), k.INVALID = Wr(), k.POSITION = Yr(), k.NORMAL = qr(), k.COLOR = $r(), k.TEX_COORD = Xr(), k.GENERIC = Qr();
  }

  return (((I.prototype = Object.create(b.prototype)).constructor = I).prototype.__class__ = I).__cache__ = {}, (k.Status = I).prototype.code = I.prototype.code = function () {
    return Cr(this.ptr);
  }, I.prototype.ok = I.prototype.ok = function () {
    return !!Fr(this.ptr);
  }, I.prototype.error_msg = I.prototype.error_msg = function () {
    return n(Nr(this.ptr));
  }, I.prototype.__destroy__ = I.prototype.__destroy__ = function () {
    Pr(this.ptr);
  }, (((v.prototype = Object.create(b.prototype)).constructor = v).prototype.__class__ = v).__cache__ = {}, (k.DracoUInt16Array = v).prototype.GetValue = v.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), ke(e, t);
  }, v.prototype.size = v.prototype.size = function () {
    return Ve(this.ptr);
  }, v.prototype.__destroy__ = v.prototype.__destroy__ = function () {
    xe(this.ptr);
  }, (((E.prototype = Object.create(b.prototype)).constructor = E).prototype.__class__ = E).__cache__ = {}, (k.PointCloud = E).prototype.num_attributes = E.prototype.num_attributes = function () {
    return wr(this.ptr);
  }, E.prototype.num_points = E.prototype.num_points = function () {
    return Or(this.ptr);
  }, E.prototype.__destroy__ = E.prototype.__destroy__ = function () {
    Gr(this.ptr);
  }, (((g.prototype = Object.create(b.prototype)).constructor = g).prototype.__class__ = g).__cache__ = {}, (k.DracoUInt8Array = g).prototype.GetValue = g.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Ye(e, t);
  }, g.prototype.size = g.prototype.size = function () {
    return Ke(this.ptr);
  }, g.prototype.__destroy__ = g.prototype.__destroy__ = function () {
    Xe(this.ptr);
  }, (((D.prototype = Object.create(b.prototype)).constructor = D).prototype.__class__ = D).__cache__ = {}, (k.DracoUInt32Array = D).prototype.GetValue = D.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), $e(e, t);
  }, D.prototype.size = D.prototype.size = function () {
    return We(this.ptr);
  }, D.prototype.__destroy__ = D.prototype.__destroy__ = function () {
    Qe(this.ptr);
  }, (((S.prototype = Object.create(b.prototype)).constructor = S).prototype.__class__ = S).__cache__ = {}, (k.AttributeOctahedronTransform = S).prototype.InitFromAttribute = S.prototype.InitFromAttribute = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), !!zt(e, t);
  }, S.prototype.quantization_bits = S.prototype.quantization_bits = function () {
    return kt(this.ptr);
  }, S.prototype.__destroy__ = S.prototype.__destroy__ = function () {
    Lt(this.ptr);
  }, (((R.prototype = Object.create(b.prototype)).constructor = R).prototype.__class__ = R).__cache__ = {}, (k.PointAttribute = R).prototype.size = R.prototype.size = function () {
    return Rr(this.ptr);
  }, R.prototype.GetAttributeTransformData = R.prototype.GetAttributeTransformData = function () {
    return A(hr(this.ptr), j);
  }, R.prototype.attribute_type = R.prototype.attribute_type = function () {
    return Ir(this.ptr);
  }, R.prototype.data_type = R.prototype.data_type = function () {
    return gr(this.ptr);
  }, R.prototype.num_components = R.prototype.num_components = function () {
    return Sr(this.ptr);
  }, R.prototype.normalized = R.prototype.normalized = function () {
    return !!Dr(this.ptr);
  }, R.prototype.byte_stride = R.prototype.byte_stride = function () {
    return Er(this.ptr);
  }, R.prototype.byte_offset = R.prototype.byte_offset = function () {
    return vr(this.ptr);
  }, R.prototype.unique_id = R.prototype.unique_id = function () {
    return jr(this.ptr);
  }, R.prototype.__destroy__ = R.prototype.__destroy__ = function () {
    Tr(this.ptr);
  }, (((j.prototype = Object.create(b.prototype)).constructor = j).prototype.__class__ = j).__cache__ = {}, (k.AttributeTransformData = j).prototype.transform_type = j.prototype.transform_type = function () {
    return Xt(this.ptr);
  }, j.prototype.__destroy__ = j.prototype.__destroy__ = function () {
    Yt(this.ptr);
  }, (((M.prototype = Object.create(b.prototype)).constructor = M).prototype.__class__ = M).__cache__ = {}, (k.AttributeQuantizationTransform = M).prototype.InitFromAttribute = M.prototype.InitFromAttribute = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), !!Vt(e, t);
  }, M.prototype.quantization_bits = M.prototype.quantization_bits = function () {
    return Qt(this.ptr);
  }, M.prototype.min_value = M.prototype.min_value = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), $t(e, t);
  }, M.prototype.range = M.prototype.range = function () {
    return Wt(this.ptr);
  }, M.prototype.__destroy__ = M.prototype.__destroy__ = function () {
    Ht(this.ptr);
  }, (((G.prototype = Object.create(b.prototype)).constructor = G).prototype.__class__ = G).__cache__ = {}, (k.DracoInt8Array = G).prototype.GetValue = G.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Ue(e, t);
  }, G.prototype.size = G.prototype.size = function () {
    return ze(this.ptr);
  }, G.prototype.__destroy__ = G.prototype.__destroy__ = function () {
    Be(this.ptr);
  }, (((w.prototype = Object.create(b.prototype)).constructor = w).prototype.__class__ = w).__cache__ = {}, (k.MetadataQuerier = w).prototype.HasEntry = w.prototype.HasEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), !!cr(r, t, e);
  }, w.prototype.HasIntEntry = w.prototype.HasIntEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), !!sr(r, t, e);
  }, w.prototype.GetIntEntry = w.prototype.GetIntEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), ar(r, t, e);
  }, w.prototype.HasDoubleEntry = w.prototype.HasDoubleEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), !!ur(r, t, e);
  }, w.prototype.GetDoubleEntry = w.prototype.GetDoubleEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), ir(r, t, e);
  }, w.prototype.HasStringEntry = w.prototype.HasStringEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), !!lr(r, t, e);
  }, w.prototype.GetStringEntry = w.prototype.GetStringEntry = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), n(pr(r, t, e));
  }, w.prototype.NumEntries = w.prototype.NumEntries = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), fr(e, t);
  }, w.prototype.GetEntryName = w.prototype.GetEntryName = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), n(_r(r, t, e));
  }, w.prototype.__destroy__ = w.prototype.__destroy__ = function () {
    mr(this.ptr);
  }, (((O.prototype = Object.create(b.prototype)).constructor = O).prototype.__class__ = O).__cache__ = {}, (k.DracoInt16Array = O).prototype.GetValue = O.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Me(e, t);
  }, O.prototype.size = O.prototype.size = function () {
    return we(this.ptr);
  }, O.prototype.__destroy__ = O.prototype.__destroy__ = function () {
    Ge(this.ptr);
  }, (((P.prototype = Object.create(b.prototype)).constructor = P).prototype.__class__ = P).__cache__ = {}, (k.DracoFloat32Array = P).prototype.GetValue = P.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), De(e, t);
  }, P.prototype.size = P.prototype.size = function () {
    return Re(this.ptr);
  }, P.prototype.__destroy__ = P.prototype.__destroy__ = function () {
    Se(this.ptr);
  }, (((C.prototype = Object.create(b.prototype)).constructor = C).prototype.__class__ = C).__cache__ = {}, (k.GeometryAttribute = C).prototype.__destroy__ = C.prototype.__destroy__ = function () {
    Je(this.ptr);
  }, (((N.prototype = Object.create(b.prototype)).constructor = N).prototype.__class__ = N).__cache__ = {}, (k.DecoderBuffer = N).prototype.Init = N.prototype.Init = function (t, e) {
    var r,
        n = this.ptr;
    ln.prepare(), "object" == _typeof(t) && "object" == _typeof(t) && (r = ln.alloc(t, et), ln.copy(t, et, r), t = r), e && "object" == _typeof(e) && (e = e.ptr), Zt(n, t, e);
  }, N.prototype.__destroy__ = N.prototype.__destroy__ = function () {
    Jt(this.ptr);
  }, (((F.prototype = Object.create(b.prototype)).constructor = F).prototype.__class__ = F).__cache__ = {}, (k.Decoder = F).prototype.GetEncodedGeometryType = F.prototype.GetEncodedGeometryType = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), he(e, t);
  }, F.prototype.DecodeBufferToPointCloud = F.prototype.DecodeBufferToPointCloud = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), A(ee(r, t, e), I);
  }, F.prototype.DecodeBufferToMesh = F.prototype.DecodeBufferToMesh = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), A(te(r, t, e), I);
  }, F.prototype.GetAttributeId = F.prototype.GetAttributeId = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), pe(r, t, e);
  }, F.prototype.GetAttributeIdByName = F.prototype.GetAttributeIdByName = function (t, e) {
    var r = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), ae(r, t, e);
  }, F.prototype.GetAttributeIdByMetadataEntry = F.prototype.GetAttributeIdByMetadataEntry = function (t, e, r) {
    var n = this.ptr;
    return ln.prepare(), t && "object" == _typeof(t) && (t = t.ptr), e = e && "object" == _typeof(e) ? e.ptr : T(e), r = r && "object" == _typeof(r) ? r.ptr : T(r), _e(n, t, e, r);
  }, F.prototype.GetAttribute = F.prototype.GetAttribute = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), A(be(r, t, e), R);
  }, F.prototype.GetAttributeByUniqueId = F.prototype.GetAttributeByUniqueId = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), A(ne(r, t, e), R);
  }, F.prototype.GetMetadata = F.prototype.GetMetadata = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), A(Te(e, t), L);
  }, F.prototype.GetAttributeMetadata = F.prototype.GetAttributeMetadata = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), A(ye(r, t, e), L);
  }, F.prototype.GetFaceFromMesh = F.prototype.GetFaceFromMesh = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!Ae(n, t, e, r);
  }, F.prototype.GetTriangleStripsFromMesh = F.prototype.GetTriangleStripsFromMesh = function (t, e) {
    var r = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), Ie(r, t, e);
  }, F.prototype.GetAttributeFloat = F.prototype.GetAttributeFloat = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!ie(n, t, e, r);
  }, F.prototype.GetAttributeFloatForAllPoints = F.prototype.GetAttributeFloatForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!oe(n, t, e, r);
  }, F.prototype.GetAttributeIntForAllPoints = F.prototype.GetAttributeIntForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!le(n, t, e, r);
  }, F.prototype.GetAttributeInt8ForAllPoints = F.prototype.GetAttributeInt8ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!se(n, t, e, r);
  }, F.prototype.GetAttributeUInt8ForAllPoints = F.prototype.GetAttributeUInt8ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!de(n, t, e, r);
  }, F.prototype.GetAttributeInt16ForAllPoints = F.prototype.GetAttributeInt16ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!ue(n, t, e, r);
  }, F.prototype.GetAttributeUInt16ForAllPoints = F.prototype.GetAttributeUInt16ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!fe(n, t, e, r);
  }, F.prototype.GetAttributeInt32ForAllPoints = F.prototype.GetAttributeInt32ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!ce(n, t, e, r);
  }, F.prototype.GetAttributeUInt32ForAllPoints = F.prototype.GetAttributeUInt32ForAllPoints = function (t, e, r) {
    var n = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), e && "object" == _typeof(e) && (e = e.ptr), r && "object" == _typeof(r) && (r = r.ptr), !!me(n, t, e, r);
  }, F.prototype.SkipAttributeTransform = F.prototype.SkipAttributeTransform = function (t) {
    var e = this.ptr;
    t && "object" == _typeof(t) && (t = t.ptr), ve(e, t);
  }, F.prototype.__destroy__ = F.prototype.__destroy__ = function () {
    Ee(this.ptr);
  }, (((U.prototype = Object.create(b.prototype)).constructor = U).prototype.__class__ = U).__cache__ = {}, (k.Mesh = U).prototype.num_faces = U.prototype.num_faces = function () {
    return nr(this.ptr);
  }, U.prototype.num_attributes = U.prototype.num_attributes = function () {
    return rr(this.ptr);
  }, U.prototype.num_points = U.prototype.num_points = function () {
    return or(this.ptr);
  }, U.prototype.__destroy__ = U.prototype.__destroy__ = function () {
    er(this.ptr);
  }, (((B.prototype = Object.create(b.prototype)).constructor = B).prototype.__class__ = B).__cache__ = {}, (k.VoidPtr = B).prototype.__destroy__ = B.prototype.__destroy__ = function () {
    Ur(this.ptr);
  }, (((z.prototype = Object.create(b.prototype)).constructor = z).prototype.__class__ = z).__cache__ = {}, (k.DracoInt32Array = z).prototype.GetValue = z.prototype.GetValue = function (t) {
    var e = this.ptr;
    return t && "object" == _typeof(t) && (t = t.ptr), Pe(e, t);
  }, z.prototype.size = z.prototype.size = function () {
    return Ne(this.ptr);
  }, z.prototype.__destroy__ = z.prototype.__destroy__ = function () {
    Ce(this.ptr);
  }, (((L.prototype = Object.create(b.prototype)).constructor = L).prototype.__class__ = L).__cache__ = {}, (k.Metadata = L).prototype.__destroy__ = L.prototype.__destroy__ = function () {
    br(this.ptr);
  }, k.calledRun ? yn() : gt.unshift(yn), "function" == typeof k.onModuleParsed && k.onModuleParsed(), t;
};

"object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports && (module.exports = DracoDecoderModule);