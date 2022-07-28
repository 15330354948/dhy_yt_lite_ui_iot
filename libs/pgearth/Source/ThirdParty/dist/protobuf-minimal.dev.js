"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (global, undefined) {
  "use strict";

  var b, c, d, f;
  b = {
    1: [function (t, r, e) {
      r.exports = function (t, r) {
        for (var e = [], n = 2; n < arguments.length;) {
          e.push(arguments[n++]);
        }

        var o = !0;
        return new Promise(function (n, i) {
          e.push(function (t) {
            if (o) if (o = !1, t) i(t);else {
              for (var r = [], e = 1; e < arguments.length;) {
                r.push(arguments[e++]);
              }

              n.apply(null, r);
            }
          });

          try {
            t.apply(r || this, e);
          } catch (t) {
            o && (o = !1, i(t));
          }
        });
      };
    }, {}],
    2: [function (t, r, e) {
      var n = e;

      n.length = function (t) {
        var r = t.length;
        if (!r) return 0;

        for (var e = 0; 1 < --r % 4 && "=" === t.charAt(r);) {
          ++e;
        }

        return Math.ceil(3 * t.length) / 4 - e;
      };

      for (var f = new Array(64), h = new Array(123), i = 0; i < 64;) {
        h[f[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      }

      n.encode = function (t, r, e) {
        for (var n, i = [], o = 0, s = 0; r < e;) {
          var u = t[r++];

          switch (s) {
            case 0:
              i[o++] = f[u >> 2], n = (3 & u) << 4, s = 1;
              break;

            case 1:
              i[o++] = f[n | u >> 4], n = (15 & u) << 2, s = 2;
              break;

            case 2:
              i[o++] = f[n | u >> 6], i[o++] = f[63 & u], s = 0;
          }
        }

        return s && (i[o++] = f[n], i[o] = 61, 1 === s && (i[o + 1] = 61)), String.fromCharCode.apply(String, i);
      };

      var a = "invalid encoding";
      n.decode = function (t, r, e) {
        for (var n, i = e, o = 0, s = 0; s < t.length;) {
          var u = t.charCodeAt(s++);
          if (61 === u && 1 < o) break;
          if ((u = h[u]) === undefined) throw Error(a);

          switch (o) {
            case 0:
              n = u, o = 1;
              break;

            case 1:
              r[e++] = n << 2 | (48 & u) >> 4, n = u, o = 2;
              break;

            case 2:
              r[e++] = (15 & n) << 4 | (60 & u) >> 2, n = u, o = 3;
              break;

            case 3:
              r[e++] = (3 & n) << 6 | u, o = 0;
          }
        }

        if (1 === o) throw Error(a);
        return e - i;
      }, n.test = function (t) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t);
      };
    }, {}],
    3: [function (t, r, e) {
      function n() {
        this._listeners = {};
      }

      (r.exports = n).prototype.on = function (t, r, e) {
        return (this._listeners[t] || (this._listeners[t] = [])).push({
          fn: r,
          ctx: e || this
        }), this;
      }, n.prototype.off = function (t, r) {
        if (t === undefined) this._listeners = {};else if (r === undefined) this._listeners[t] = [];else for (var e = this._listeners[t], n = 0; n < e.length;) {
          e[n].fn === r ? e.splice(n, 1) : ++n;
        }
        return this;
      }, n.prototype.emit = function (t) {
        var r = this._listeners[t];

        if (r) {
          for (var e = [], n = 1; n < arguments.length;) {
            e.push(arguments[n++]);
          }

          for (n = 0; n < r.length;) {
            r[n].fn.apply(r[n++].ctx, e);
          }
        }

        return this;
      };
    }, {}],
    4: [function (require, module, exports) {
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length)) return mod;
        } catch (t) {}

        return null;
      }

      module.exports = inquire;
    }, {}],
    5: [function (t, r, e) {
      r.exports = function (e, n, t) {
        var i = t || 8192,
            o = i >>> 1,
            s = null,
            u = i;
        return function (t) {
          if (t < 1 || o < t) return e(t);
          i < u + t && (s = e(i), u = 0);
          var r = n.call(s, u, u += t);
          return 7 & u && (u = 1 + (7 | u)), r;
        };
      };
    }, {}],
    6: [function (t, r, e) {
      var n = e;
      n.length = function (t) {
        for (var r = 0, e = 0, n = 0; n < t.length; ++n) {
          (e = t.charCodeAt(n)) < 128 ? r += 1 : e < 2048 ? r += 2 : 55296 == (64512 & e) && 56320 == (64512 & t.charCodeAt(n + 1)) ? (++n, r += 4) : r += 3;
        }

        return r;
      }, n.read = function (t, r, e) {
        if (e - r < 1) return "";

        for (var n, i = null, o = [], s = 0; r < e;) {
          (n = t[r++]) < 128 ? o[s++] = n : 191 < n && n < 224 ? o[s++] = (31 & n) << 6 | 63 & t[r++] : 239 < n && n < 365 ? (n = ((7 & n) << 18 | (63 & t[r++]) << 12 | (63 & t[r++]) << 6 | 63 & t[r++]) - 65536, o[s++] = 55296 + (n >> 10), o[s++] = 56320 + (1023 & n)) : o[s++] = (15 & n) << 12 | (63 & t[r++]) << 6 | 63 & t[r++], 8191 < s && ((i = i || []).push(String.fromCharCode.apply(String, o)), s = 0);
        }

        return i ? (s && i.push(String.fromCharCode.apply(String, o.slice(0, s))), i.join("")) : String.fromCharCode.apply(String, o.slice(0, s));
      }, n.write = function (t, r, e) {
        for (var n, i, o = e, s = 0; s < t.length; ++s) {
          (n = t.charCodeAt(s)) < 128 ? r[e++] = n : (n < 2048 ? r[e++] = n >> 6 | 192 : (55296 == (64512 & n) && 56320 == (64512 & (i = t.charCodeAt(s + 1))) ? (n = 65536 + ((1023 & n) << 10) + (1023 & i), ++s, r[e++] = n >> 18 | 240, r[e++] = n >> 12 & 63 | 128) : r[e++] = n >> 12 | 224, r[e++] = n >> 6 & 63 | 128), r[e++] = 63 & n | 128);
        }

        return e - o;
      };
    }, {}],
    7: [function (t, r, e) {
      var n = e;

      function i() {
        n.Reader._configure(n.BufferReader), n.util._configure();
      }

      n.build = "minimal", n.roots = {}, n.Writer = t(14), n.BufferWriter = t(15), n.Reader = t(8), n.BufferReader = t(9), n.util = t(13), n.rpc = t(10), n.configure = i, n.Writer._configure(n.BufferWriter), i();
    }, {
      10: 10,
      13: 13,
      14: 14,
      15: 15,
      8: 8,
      9: 9
    }],
    8: [function (t, r, e) {
      r.exports = f;
      var n,
          i = t(13),
          o = i.LongBits,
          s = i.utf8;

      function u(t, r) {
        return RangeError("index out of range: " + t.pos + " + " + (r || 1) + " > " + t.len);
      }

      function f(t) {
        this.buf = t, this.pos = 0, this.len = t.length;
      }

      var h,
          a = "undefined" != typeof Uint8Array ? function (t) {
        if (t instanceof Uint8Array || Array.isArray(t)) return new f(t);
        throw Error("illegal buffer");
      } : function (t) {
        if (Array.isArray(t)) return new f(t);
        throw Error("illegal buffer");
      };

      function l() {
        var t = new o(0, 0),
            r = 0;

        if (!(4 < this.len - this.pos)) {
          for (; r < 3; ++r) {
            if (this.pos >= this.len) throw u(this);
            if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * r) >>> 0, this.buf[this.pos++] < 128) return t;
          }

          return t.lo = (t.lo | (127 & this.buf[this.pos++]) << 7 * r) >>> 0, t;
        }

        for (; r < 4; ++r) {
          if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * r) >>> 0, this.buf[this.pos++] < 128) return t;
        }

        if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 28) >>> 0, t.hi = (t.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return t;

        if (r = 0, 4 < this.len - this.pos) {
          for (; r < 5; ++r) {
            if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * r + 3) >>> 0, this.buf[this.pos++] < 128) return t;
          }
        } else for (; r < 5; ++r) {
          if (this.pos >= this.len) throw u(this);
          if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * r + 3) >>> 0, this.buf[this.pos++] < 128) return t;
        }

        throw Error("invalid varint encoding");
      }

      function c(t, r) {
        return (t[r - 4] | t[r - 3] << 8 | t[r - 2] << 16 | t[r - 1] << 24) >>> 0;
      }

      function p() {
        if (this.pos + 8 > this.len) throw u(this, 8);
        return new o(c(this.buf, this.pos += 4), c(this.buf, this.pos += 4));
      }

      f.create = i.Buffer ? function (t) {
        return (f.create = function (t) {
          return i.Buffer.isBuffer(t) ? new n(t) : a(t);
        })(t);
      } : a, f.prototype._slice = i.Array.prototype.subarray || i.Array.prototype.slice, f.prototype.uint32 = (h = 4294967295, function () {
        if (h = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return h;
        if (h = (h | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return h;
        if (h = (h | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return h;
        if (h = (h | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return h;
        if (h = (h | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return h;
        if ((this.pos += 5) > this.len) throw this.pos = this.len, u(this, 10);
        return h;
      }), f.prototype.int32 = function () {
        return 0 | this.uint32();
      }, f.prototype.sint32 = function () {
        var t = this.uint32();
        return t >>> 1 ^ -(1 & t) | 0;
      }, f.prototype.bool = function () {
        return 0 !== this.uint32();
      }, f.prototype.fixed32 = function () {
        if (this.pos + 4 > this.len) throw u(this, 4);
        return c(this.buf, this.pos += 4);
      }, f.prototype.sfixed32 = function () {
        if (this.pos + 4 > this.len) throw u(this, 4);
        return 0 | c(this.buf, this.pos += 4);
      };
      var y,
          d,
          g = "undefined" != typeof Float32Array ? (y = new Float32Array(1), d = new Uint8Array(y.buffer), y[0] = -0, d[3] ? function (t, r) {
        return d[0] = t[r], d[1] = t[r + 1], d[2] = t[r + 2], d[3] = t[r + 3], y[0];
      } : function (t, r) {
        return d[0] = t[r + 3], d[1] = t[r + 2], d[2] = t[r + 1], d[3] = t[r], y[0];
      }) : function (t, r) {
        var e = c(t, r + 4),
            n = 2 * (e >> 31) + 1,
            i = e >>> 23 & 255,
            o = 8388607 & e;
        return 255 == i ? o ? NaN : 1 / 0 * n : 0 == i ? 1401298464324817e-60 * n * o : n * Math.pow(2, i - 150) * (8388608 + o);
      };

      f.prototype["float"] = function () {
        if (this.pos + 4 > this.len) throw u(this, 4);
        var t = g(this.buf, this.pos);
        return this.pos += 4, t;
      };

      var b,
          m,
          v = "undefined" != typeof Float64Array ? (b = new Float64Array(1), m = new Uint8Array(b.buffer), b[0] = -0, m[7] ? function (t, r) {
        return m[0] = t[r], m[1] = t[r + 1], m[2] = t[r + 2], m[3] = t[r + 3], m[4] = t[r + 4], m[5] = t[r + 5], m[6] = t[r + 6], m[7] = t[r + 7], b[0];
      } : function (t, r) {
        return m[0] = t[r + 7], m[1] = t[r + 6], m[2] = t[r + 5], m[3] = t[r + 4], m[4] = t[r + 3], m[5] = t[r + 2], m[6] = t[r + 1], m[7] = t[r], b[0];
      }) : function (t, r) {
        var e = c(t, r + 4),
            n = c(t, r + 8),
            i = 2 * (n >> 31) + 1,
            o = n >>> 20 & 2047,
            s = 4294967296 * (1048575 & n) + e;
        return 2047 == o ? s ? NaN : 1 / 0 * i : 0 == o ? 5e-324 * i * s : i * Math.pow(2, o - 1075) * (s + 4503599627370496);
      };
      f.prototype["double"] = function () {
        if (this.pos + 8 > this.len) throw u(this, 4);
        var t = v(this.buf, this.pos);
        return this.pos += 8, t;
      }, f.prototype.bytes = function () {
        var t = this.uint32(),
            r = this.pos,
            e = this.pos + t;
        if (e > this.len) throw u(this, t);
        return this.pos += t, r === e ? new this.buf.constructor(0) : this._slice.call(this.buf, r, e);
      }, f.prototype.string = function () {
        var t = this.bytes();
        return s.read(t, 0, t.length);
      }, f.prototype.skip = function (t) {
        if ("number" == typeof t) {
          if (this.pos + t > this.len) throw u(this, t);
          this.pos += t;
        } else do {
          if (this.pos >= this.len) throw u(this);
        } while (128 & this.buf[this.pos++]);

        return this;
      }, f.prototype.skipType = function (t) {
        switch (t) {
          case 0:
            this.skip();
            break;

          case 1:
            this.skip(8);
            break;

          case 2:
            this.skip(this.uint32());
            break;

          case 3:
            for (;;) {
              if (4 == (t = 7 & this.uint32())) break;
              this.skipType(t);
            }

            break;

          case 5:
            this.skip(4);
            break;

          default:
            throw Error("invalid wire type " + t + " at offset " + this.pos);
        }

        return this;
      }, f._configure = function (t) {
        n = t;
        var r = i.Long ? "toLong" : "toNumber";
        i.merge(f.prototype, {
          int64: function int64() {
            return l.call(this)[r](!1);
          },
          uint64: function uint64() {
            return l.call(this)[r](!0);
          },
          sint64: function sint64() {
            return l.call(this).zzDecode()[r](!1);
          },
          fixed64: function fixed64() {
            return p.call(this)[r](!0);
          },
          sfixed64: function sfixed64() {
            return p.call(this)[r](!1);
          }
        });
      };
    }, {
      13: 13
    }],
    9: [function (t, r, e) {
      r.exports = o;
      var n = t(8);
      (o.prototype = Object.create(n.prototype)).constructor = o;
      var i = t(13);

      function o(t) {
        n.call(this, t);
      }

      i.Buffer && (o.prototype._slice = i.Buffer.prototype.slice), o.prototype.string = function () {
        var t = this.uint32();
        return this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + t, this.len));
      };
    }, {
      13: 13,
      8: 8
    }],
    10: [function (t, r, e) {
      e.Service = t(11);
    }, {
      11: 11
    }],
    11: [function (t, r, e) {
      r.exports = n;
      var u = t(13);

      function n(t, r, e) {
        if ("function" != typeof t) throw TypeError("rpcImpl must be a function");
        u.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = Boolean(r), this.responseDelimited = Boolean(e);
      }

      ((n.prototype = Object.create(u.EventEmitter.prototype)).constructor = n).prototype.rpcCall = function t(e, r, n, i, o) {
        if (!i) throw TypeError("request must be specified");
        var s = this;
        if (!o) return u.asPromise(t, s, e, r, n, i);
        if (!s.rpcImpl) return setTimeout(function () {
          o(Error("already ended"));
        }, 0), undefined;

        try {
          return s.rpcImpl(e, r[s.requestDelimited ? "encodeDelimited" : "encode"](i).finish(), function (t, r) {
            if (t) return s.emit("error", t, e), o(t);
            if (null === r) return s.end(!0), undefined;
            if (!(r instanceof n)) try {
              r = n[s.responseDelimited ? "decodeDelimited" : "decode"](r);
            } catch (t) {
              return s.emit("error", t, e), o(t);
            }
            return s.emit("data", r, e), o(null, r);
          });
        } catch (t) {
          return s.emit("error", t, e), setTimeout(function () {
            o(t);
          }, 0), undefined;
        }
      }, n.prototype.end = function (t) {
        return this.rpcImpl && (t || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this;
      };
    }, {
      13: 13
    }],
    12: [function (t, r, e) {
      r.exports = i;
      var n = t(13);

      function i(t, r) {
        this.lo = t >>> 0, this.hi = r >>> 0;
      }

      var o = i.zero = new i(0, 0);
      o.toNumber = function () {
        return 0;
      }, o.zzEncode = o.zzDecode = function () {
        return this;
      }, o.length = function () {
        return 1;
      };
      i.zeroHash = "\0\0\0\0\0\0\0\0";
      i.fromNumber = function (t) {
        if (0 === t) return o;
        var r = t < 0;
        r && (t = -t);
        var e = t >>> 0,
            n = (t - e) / 4294967296 >>> 0;
        return r && (n = ~n >>> 0, e = ~e >>> 0, 4294967295 < ++e && (e = 0, 4294967295 < ++n && (n = 0))), new i(e, n);
      }, i.from = function (t) {
        if ("number" == typeof t) return i.fromNumber(t);

        if (n.isString(t)) {
          if (!n.Long) return i.fromNumber(parseInt(t, 10));
          t = n.Long.fromString(t);
        }

        return t.low || t.high ? new i(t.low >>> 0, t.high >>> 0) : o;
      }, i.prototype.toNumber = function (t) {
        if (!t && this.hi >>> 31) {
          var r = 1 + ~this.lo >>> 0,
              e = ~this.hi >>> 0;
          return r || (e = e + 1 >>> 0), -(r + 4294967296 * e);
        }

        return this.lo + 4294967296 * this.hi;
      }, i.prototype.toLong = function (t) {
        return n.Long ? new n.Long(0 | this.lo, 0 | this.hi, Boolean(t)) : {
          low: 0 | this.lo,
          high: 0 | this.hi,
          unsigned: Boolean(t)
        };
      };
      var s = String.prototype.charCodeAt;
      i.fromHash = function (t) {
        return "\0\0\0\0\0\0\0\0" === t ? o : new i((s.call(t, 0) | s.call(t, 1) << 8 | s.call(t, 2) << 16 | s.call(t, 3) << 24) >>> 0, (s.call(t, 4) | s.call(t, 5) << 8 | s.call(t, 6) << 16 | s.call(t, 7) << 24) >>> 0);
      }, i.prototype.toHash = function () {
        return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
      }, i.prototype.zzEncode = function () {
        var t = this.hi >> 31;
        return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ t) >>> 0, this.lo = (this.lo << 1 ^ t) >>> 0, this;
      }, i.prototype.zzDecode = function () {
        var t = -(1 & this.lo);
        return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ t) >>> 0, this.hi = (this.hi >>> 1 ^ t) >>> 0, this;
      }, i.prototype.length = function () {
        var t = this.lo,
            r = (this.lo >>> 28 | this.hi << 4) >>> 0,
            e = this.hi >>> 24;
        return 0 == e ? 0 == r ? t < 16384 ? t < 128 ? 1 : 2 : t < 2097152 ? 3 : 4 : r < 16384 ? r < 128 ? 5 : 6 : r < 2097152 ? 7 : 8 : e < 128 ? 9 : 10;
      };
    }, {
      13: 13
    }],
    13: [function (t, r, e) {
      var n = e;

      function i(t, r, e) {
        for (var n = Object.keys(r), i = 0; i < n.length; ++i) {
          t[n[i]] !== undefined && e || (t[n[i]] = r[n[i]]);
        }

        return t;
      }

      function o(t) {
        function e(t, r) {
          if (!(this instanceof e)) return new e(t, r);
          Object.defineProperty(this, "message", {
            get: function get() {
              return t;
            }
          }), Error.captureStackTrace ? Error.captureStackTrace(this, e) : Object.defineProperty(this, "stack", {
            value: new Error().stack || ""
          }), r && i(this, r);
        }

        return (e.prototype = Object.create(Error.prototype)).constructor = e, Object.defineProperty(e.prototype, "name", {
          get: function get() {
            return t;
          }
        }), e.prototype.toString = function () {
          return this.name + ": " + this.message;
        }, e;
      }

      n.asPromise = t(1), n.base64 = t(2), n.EventEmitter = t(3), n.inquire = t(4), n.utf8 = t(6), n.pool = t(5), n.LongBits = t(12), n.emptyArray = Object.freeze ? Object.freeze([]) : [], n.emptyObject = Object.freeze ? Object.freeze({}) : {}, n.isNode = Boolean(global.process && global.process.versions && global.process.versions.node), n.isInteger = Number.isInteger || function (t) {
        return "number" == typeof t && isFinite(t) && Math.floor(t) === t;
      }, n.isString = function (t) {
        return "string" == typeof t || t instanceof String;
      }, n.isObject = function (t) {
        return t && "object" == _typeof(t);
      }, n.Buffer = function () {
        try {
          var t = n.inquire("buffer").Buffer;
          return t.prototype.utf8Write ? t : null;
        } catch (t) {
          return null;
        }
      }(), n._Buffer_from = null, n._Buffer_allocUnsafe = null, n.newBuffer = function (t) {
        return "number" == typeof t ? n.Buffer ? n._Buffer_allocUnsafe(t) : new n.Array(t) : n.Buffer ? n._Buffer_from(t) : "undefined" == typeof Uint8Array ? t : new Uint8Array(t);
      }, n.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, n.Long = global.dcodeIO && global.dcodeIO.Long || n.inquire("long"), n.key2Re = /^true|false|0|1$/, n.key32Re = /^-?(?:0|[1-9][0-9]*)$/, n.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, n.longToHash = function (t) {
        return t ? n.LongBits.from(t).toHash() : n.LongBits.zeroHash;
      }, n.longFromHash = function (t, r) {
        var e = n.LongBits.fromHash(t);
        return n.Long ? n.Long.fromBits(e.lo, e.hi, r) : e.toNumber(Boolean(r));
      }, n.merge = i, n.lcFirst = function (t) {
        return t.charAt(0).toLowerCase() + t.substring(1);
      }, n.newError = o, n.ProtocolError = o("ProtocolError"), n.oneOfGetter = function (t) {
        for (var e = {}, r = 0; r < t.length; ++r) {
          e[t[r]] = 1;
        }

        return function () {
          for (var t = Object.keys(this), r = t.length - 1; -1 < r; --r) {
            if (1 === e[t[r]] && this[t[r]] !== undefined && null !== this[t[r]]) return t[r];
          }
        };
      }, n.oneOfSetter = function (e) {
        return function (t) {
          for (var r = 0; r < e.length; ++r) {
            e[r] !== t && delete this[e[r]];
          }
        };
      }, n.lazyResolve = function (t, r) {
        for (var e = 0; e < r.length; ++e) {
          for (var n = Object.keys(r[e]), i = 0; i < n.length; ++i) {
            for (var o = r[e][n[i]].split("."), s = t; o.length;) {
              s = s[o.shift()];
            }

            r[e][n[i]] = s;
          }
        }
      }, n.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String
      }, n._configure = function () {
        var e = n.Buffer;
        e ? (n._Buffer_from = e.from !== Uint8Array.from && e.from || function (t, r) {
          return new e(t, r);
        }, n._Buffer_allocUnsafe = e.allocUnsafe || function (t) {
          return new e(t);
        }) : n._Buffer_from = n._Buffer_allocUnsafe = null;
      };
    }, {
      1: 1,
      12: 12,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6
    }],
    14: [function (t, r, e) {
      r.exports = l;
      var n,
          i = t(13),
          o = i.LongBits,
          s = i.base64,
          u = i.utf8;

      function f(t, r, e) {
        this.fn = t, this.len = r, this.next = undefined, this.val = e;
      }

      function h() {}

      function a(t) {
        this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states;
      }

      function l() {
        this.len = 0, this.head = new f(h, 0, 0), this.tail = this.head, this.states = null;
      }

      function c(t, r, e) {
        r[e] = 255 & t;
      }

      function p(t, r) {
        this.len = t, this.next = undefined, this.val = r;
      }

      function y(t, r, e) {
        for (; t.hi;) {
          r[e++] = 127 & t.lo | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, t.hi >>>= 7;
        }

        for (; 127 < t.lo;) {
          r[e++] = 127 & t.lo | 128, t.lo = t.lo >>> 7;
        }

        r[e++] = t.lo;
      }

      function d(t, r, e) {
        r[e++] = 255 & t, r[e++] = t >>> 8 & 255, r[e++] = t >>> 16 & 255, r[e] = t >>> 24;
      }

      l.create = i.Buffer ? function () {
        return (l.create = function () {
          return new n();
        })();
      } : function () {
        return new l();
      }, l.alloc = function (t) {
        return new i.Array(t);
      }, i.Array !== Array && (l.alloc = i.pool(l.alloc, i.Array.prototype.subarray)), l.prototype.push = function (t, r, e) {
        return this.tail = this.tail.next = new f(t, r, e), this.len += r, this;
      }, (p.prototype = Object.create(f.prototype)).fn = function (t, r, e) {
        for (; 127 < t;) {
          r[e++] = 127 & t | 128, t >>>= 7;
        }

        r[e] = t;
      }, l.prototype.uint32 = function (t) {
        return this.len += (this.tail = this.tail.next = new p((t >>>= 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, this;
      }, l.prototype.int32 = function (t) {
        return t < 0 ? this.push(y, 10, o.fromNumber(t)) : this.uint32(t);
      }, l.prototype.sint32 = function (t) {
        return this.uint32((t << 1 ^ t >> 31) >>> 0);
      }, l.prototype.int64 = l.prototype.uint64 = function (t) {
        var r = o.from(t);
        return this.push(y, r.length(), r);
      }, l.prototype.sint64 = function (t) {
        var r = o.from(t).zzEncode();
        return this.push(y, r.length(), r);
      }, l.prototype.bool = function (t) {
        return this.push(c, 1, t ? 1 : 0);
      }, l.prototype.sfixed32 = l.prototype.fixed32 = function (t) {
        return this.push(d, 4, t >>> 0);
      }, l.prototype.sfixed64 = l.prototype.fixed64 = function (t) {
        var r = o.from(t);
        return this.push(d, 4, r.lo).push(d, 4, r.hi);
      };
      var g,
          b,
          m = "undefined" != typeof Float32Array ? (g = new Float32Array(1), b = new Uint8Array(g.buffer), g[0] = -0, b[3] ? function (t, r, e) {
        g[0] = t, r[e++] = b[0], r[e++] = b[1], r[e++] = b[2], r[e] = b[3];
      } : function (t, r, e) {
        g[0] = t, r[e++] = b[3], r[e++] = b[2], r[e++] = b[1], r[e] = b[0];
      }) : function (t, r, e) {
        var n,
            i = t < 0 ? 1 : 0;
        i && (t = -t), 0 === t ? d(0 < 1 / t ? 0 : 2147483648, r, e) : isNaN(t) ? d(2147483647, r, e) : d(34028234663852886e22 < t ? (i << 31 | 2139095040) >>> 0 : t < 11754943508222875e-54 ? (i << 31 | Math.round(t / 1401298464324817e-60)) >>> 0 : (i << 31 | (n = Math.floor(Math.log(t) / Math.LN2)) + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -n) * 8388608)) >>> 0, r, e);
      };

      l.prototype["float"] = function (t) {
        return this.push(m, 4, t);
      };

      var v,
          w,
          A = "undefined" != typeof Float64Array ? (v = new Float64Array(1), w = new Uint8Array(v.buffer), v[0] = -0, w[7] ? function (t, r, e) {
        v[0] = t, r[e++] = w[0], r[e++] = w[1], r[e++] = w[2], r[e++] = w[3], r[e++] = w[4], r[e++] = w[5], r[e++] = w[6], r[e] = w[7];
      } : function (t, r, e) {
        v[0] = t, r[e++] = w[7], r[e++] = w[6], r[e++] = w[5], r[e++] = w[4], r[e++] = w[3], r[e++] = w[2], r[e++] = w[1], r[e] = w[0];
      }) : function (t, r, e) {
        var n,
            i,
            o = t < 0 ? 1 : 0;
        o && (t = -t), 0 === t ? (d(0, r, e), d(0 < 1 / t ? 0 : 2147483648, r, e + 4)) : isNaN(t) ? (d(4294967295, r, e), d(2147483647, r, e + 4)) : 17976931348623157e292 < t ? (d(0, r, e), d((o << 31 | 2146435072) >>> 0, r, e + 4)) : t < 22250738585072014e-324 ? (d((n = t / 5e-324) >>> 0, r, e), d((o << 31 | n / 4294967296) >>> 0, r, e + 4)) : (1024 === (i = Math.floor(Math.log(t) / Math.LN2)) && (i = 1023), d(4503599627370496 * (n = t * Math.pow(2, -i)) >>> 0, r, e), d((o << 31 | i + 1023 << 20 | 1048576 * n & 1048575) >>> 0, r, e + 4));
      };

      l.prototype["double"] = function (t) {
        return this.push(A, 8, t);
      };

      var B = i.Array.prototype.set ? function (t, r, e) {
        r.set(t, e);
      } : function (t, r, e) {
        for (var n = 0; n < t.length; ++n) {
          r[e + n] = t[n];
        }
      };
      l.prototype.bytes = function (t) {
        var r,
            e = t.length >>> 0;
        return e ? (i.isString(t) && (r = l.alloc(e = s.length(t)), s.decode(t, r, 0), t = r), this.uint32(e).push(B, e, t)) : this.push(c, 1, 0);
      }, l.prototype.string = function (t) {
        var r = u.length(t);
        return r ? this.uint32(r).push(u.write, r, t) : this.push(c, 1, 0);
      }, l.prototype.fork = function () {
        return this.states = new a(this), this.head = this.tail = new f(h, 0, 0), this.len = 0, this;
      }, l.prototype.reset = function () {
        return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new f(h, 0, 0), this.len = 0), this;
      }, l.prototype.ldelim = function () {
        var t = this.head,
            r = this.tail,
            e = this.len;
        return this.reset().uint32(e), e && (this.tail.next = t.next, this.tail = r, this.len += e), this;
      }, l.prototype.finish = function () {
        for (var t = this.head.next, r = this.constructor.alloc(this.len), e = 0; t;) {
          t.fn(t.val, r, e), e += t.len, t = t.next;
        }

        return r;
      }, l._configure = function (t) {
        n = t;
      };
    }, {
      13: 13
    }],
    15: [function (t, r, e) {
      r.exports = s;
      var n = t(14);
      (s.prototype = Object.create(n.prototype)).constructor = s;
      var i = t(13),
          o = i.Buffer;

      function s() {
        n.call(this);
      }

      s.alloc = function (t) {
        return (s.alloc = i._Buffer_allocUnsafe)(t);
      };

      var u = o && o.prototype instanceof Uint8Array && "set" === o.prototype.set.name ? function (t, r, e) {
        r.set(t, e);
      } : function (t, r, e) {
        if (t.copy) t.copy(r, e, 0, t.length);else for (var n = 0; n < t.length;) {
          r[e++] = t[n++];
        }
      };

      function f(t, r, e) {
        t.length < 40 ? i.utf8.write(t, r, e) : r.utf8Write(t, e);
      }

      s.prototype.bytes = function (t) {
        i.isString(t) && (t = i._Buffer_from(t, "base64"));
        var r = t.length >>> 0;
        return this.uint32(r), r && this.push(u, r, t), this;
      }, s.prototype.string = function (t) {
        var r = o.byteLength(t);
        return this.uint32(r), r && this.push(f, r, t), this;
      };
    }, {
      13: 13,
      14: 14
    }]
  }, c = {}, d = [7], f = global.protobuf = function t(r) {
    var e = c[r];
    return e || b[r][0].call(e = c[r] = {
      exports: {}
    }, t, e, e.exports), e.exports;
  }(d[0]), "function" == typeof define && define.amd && define([], function () {
    return f.configure(), f;
  }), "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module && module.exports && (module.exports = f);
}("object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window || "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self || void 0);