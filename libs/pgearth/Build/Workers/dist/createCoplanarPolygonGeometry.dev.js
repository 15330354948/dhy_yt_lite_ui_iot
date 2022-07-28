"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  define("Core/defined", [], function () {
    "use strict";

    function e(e) {
      return void 0 !== e && null !== e;
    }

    return e;
  }), define("Core/DeveloperError", ["./defined"], function (e) {
    "use strict";

    function t(e) {
      this.name = "DeveloperError", this.message = e;
      var t;

      try {
        throw new Error();
      } catch (e) {
        t = e.stack;
      }

      this.stack = t;
    }

    return e(Object.create) && (t.prototype = Object.create(Error.prototype), t.prototype.constructor = t), t.prototype.toString = function () {
      var t = this.name + ": " + this.message;
      return e(this.stack) && (t += "\n" + this.stack.toString()), t;
    }, t.throwInstantiationError = function () {
      throw new t("This function defines an interface and should not be called directly.");
    }, t;
  }), define("Core/Check", ["./defined", "./DeveloperError"], function (e, t) {
    "use strict";

    function n(e) {
      return e + " is required, actual value was undefined";
    }

    function r(e, t, n) {
      return "Expected " + n + " to be typeof " + t + ", actual typeof was " + e;
    }

    var i = {};
    return i.typeOf = {}, i.defined = function (r, i) {
      if (!e(i)) throw new t(n(r));
    }, i.typeOf.func = function (e, n) {
      if ("function" != typeof n) throw new t(r(_typeof(n), "function", e));
    }, i.typeOf.string = function (e, n) {
      if ("string" != typeof n) throw new t(r(_typeof(n), "string", e));
    }, i.typeOf.number = function (e, n) {
      if ("number" != typeof n) throw new t(r(_typeof(n), "number", e));
    }, i.typeOf.number.lessThan = function (e, n, r) {
      if (i.typeOf.number(e, n), n >= r) throw new t("Expected " + e + " to be less than " + r + ", actual value was " + n);
    }, i.typeOf.number.lessThanOrEquals = function (e, n, r) {
      if (i.typeOf.number(e, n), n > r) throw new t("Expected " + e + " to be less than or equal to " + r + ", actual value was " + n);
    }, i.typeOf.number.greaterThan = function (e, n, r) {
      if (i.typeOf.number(e, n), n <= r) throw new t("Expected " + e + " to be greater than " + r + ", actual value was " + n);
    }, i.typeOf.number.greaterThanOrEquals = function (e, n, r) {
      if (i.typeOf.number(e, n), n < r) throw new t("Expected " + e + " to be greater than or equal to" + r + ", actual value was " + n);
    }, i.typeOf.object = function (e, n) {
      if ("object" != _typeof(n)) throw new t(r(_typeof(n), "object", e));
    }, i.typeOf.bool = function (e, n) {
      if ("boolean" != typeof n) throw new t(r(_typeof(n), "boolean", e));
    }, i.typeOf.number.equals = function (e, n, r, a) {
      if (i.typeOf.number(e, r), i.typeOf.number(n, a), r !== a) throw new t(e + " must be equal to " + n + ", the actual values are " + r + " and " + a);
    }, i;
  }), define("Core/freezeObject", ["./defined"], function (e) {
    "use strict";

    var t = Object.freeze;
    return e(t) || (t = function t(e) {
      return e;
    }), t;
  }), define("Core/defaultValue", ["./freezeObject"], function (e) {
    "use strict";

    function t(e, t) {
      return void 0 !== e && null !== e ? e : t;
    }

    return t.EMPTY_OBJECT = e({}), t;
  }), define("ThirdParty/mersenne-twister", [], function () {
    var e = function e(_e2) {
      void 0 == _e2 && (_e2 = new Date().getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(_e2);
    };

    return e.prototype.init_genrand = function (e) {
      for (this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
        var e = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
        this.mt[this.mti] = (1812433253 * ((4294901760 & e) >>> 16) << 16) + 1812433253 * (65535 & e) + this.mti, this.mt[this.mti] >>>= 0;
      }
    }, e.prototype.genrand_int32 = function () {
      var e,
          t = new Array(0, this.MATRIX_A);

      if (this.mti >= this.N) {
        var n;

        for (this.mti == this.N + 1 && this.init_genrand(5489), n = 0; n < this.N - this.M; n++) {
          e = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + this.M] ^ e >>> 1 ^ t[1 & e];
        }

        for (; n < this.N - 1; n++) {
          e = this.mt[n] & this.UPPER_MASK | this.mt[n + 1] & this.LOWER_MASK, this.mt[n] = this.mt[n + (this.M - this.N)] ^ e >>> 1 ^ t[1 & e];
        }

        e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ t[1 & e], this.mti = 0;
      }

      return e = this.mt[this.mti++], e ^= e >>> 11, e ^= e << 7 & 2636928640, e ^= e << 15 & 4022730752, (e ^= e >>> 18) >>> 0;
    }, e.prototype.random = function () {
      return this.genrand_int32() * (1 / 4294967296);
    }, e;
  }), define("Core/Math", ["../ThirdParty/mersenne-twister", "./Check", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, n, r, i) {
    "use strict";

    var a = {};
    a.EPSILON1 = .1, a.EPSILON2 = .01, a.EPSILON3 = .001, a.EPSILON4 = 1e-4, a.EPSILON5 = 1e-5, a.EPSILON6 = 1e-6, a.EPSILON7 = 1e-7, a.EPSILON8 = 1e-8, a.EPSILON9 = 1e-9, a.EPSILON10 = 1e-10, a.EPSILON11 = 1e-11, a.EPSILON12 = 1e-12, a.EPSILON13 = 1e-13, a.EPSILON14 = 1e-14, a.EPSILON15 = 1e-15, a.EPSILON16 = 1e-16, a.EPSILON17 = 1e-17, a.EPSILON18 = 1e-18, a.EPSILON19 = 1e-19, a.EPSILON20 = 1e-20, a.EPSILON21 = 1e-21, a.GRAVITATIONALPARAMETER = 3986004418e5, a.SOLAR_RADIUS = 6955e5, a.LUNAR_RADIUS = 1737400, a.SIXTY_FOUR_KILOBYTES = 65536, a.sign = n(Math.sign, function (e) {
      return e = +e, 0 === e || e !== e ? e : e > 0 ? 1 : -1;
    }), a.signNotZero = function (e) {
      return e < 0 ? -1 : 1;
    }, a.toSNorm = function (e, t) {
      return t = n(t, 255), Math.round((.5 * a.clamp(e, -1, 1) + .5) * t);
    }, a.fromSNorm = function (e, t) {
      return t = n(t, 255), a.clamp(e, 0, t) / t * 2 - 1;
    }, a.normalize = function (e, t, n) {
      return n = Math.max(n - t, 0), 0 === n ? 0 : a.clamp((e - t) / n, 0, 1);
    }, a.sinh = n(Math.sinh, function (e) {
      return (Math.exp(e) - Math.exp(-e)) / 2;
    }), a.cosh = n(Math.cosh, function (e) {
      return (Math.exp(e) + Math.exp(-e)) / 2;
    }), a.lerp = function (e, t, n) {
      return (1 - n) * e + n * t;
    }, a.PI = Math.PI, a.ONE_OVER_PI = 1 / Math.PI, a.PI_OVER_TWO = Math.PI / 2, a.PI_OVER_THREE = Math.PI / 3, a.PI_OVER_FOUR = Math.PI / 4, a.PI_OVER_SIX = Math.PI / 6, a.THREE_PI_OVER_TWO = 3 * Math.PI / 2, a.TWO_PI = 2 * Math.PI, a.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), a.RADIANS_PER_DEGREE = Math.PI / 180, a.DEGREES_PER_RADIAN = 180 / Math.PI, a.RADIANS_PER_ARCSECOND = a.RADIANS_PER_DEGREE / 3600, a.toRadians = function (e) {
      return e * a.RADIANS_PER_DEGREE;
    }, a.toDegrees = function (e) {
      return e * a.DEGREES_PER_RADIAN;
    }, a.convertLongitudeRange = function (e) {
      var t = a.TWO_PI,
          n = e - Math.floor(e / t) * t;
      return n < -Math.PI ? n + t : n >= Math.PI ? n - t : n;
    }, a.clampToLatitudeRange = function (e) {
      return a.clamp(e, -1 * a.PI_OVER_TWO, a.PI_OVER_TWO);
    }, a.negativePiToPi = function (e) {
      return a.zeroToTwoPi(e + a.PI) - a.PI;
    }, a.zeroToTwoPi = function (e) {
      var t = a.mod(e, a.TWO_PI);
      return Math.abs(t) < a.EPSILON14 && Math.abs(e) > a.EPSILON14 ? a.TWO_PI : t;
    }, a.mod = function (e, t) {
      return (e % t + t) % t;
    }, a.equalsEpsilon = function (e, t, r, i) {
      i = n(i, r);
      var a = Math.abs(e - t);
      return a <= i || a <= r * Math.max(Math.abs(e), Math.abs(t));
    }, a.lessThan = function (e, t, n) {
      return e - t < -n;
    }, a.lessThanOrEquals = function (e, t, n) {
      return e - t < n;
    }, a.greaterThan = function (e, t, n) {
      return e - t > n;
    }, a.greaterThanOrEquals = function (e, t, n) {
      return e - t > -n;
    };
    var o = [1];
    a.factorial = function (e) {
      var t = o.length;
      if (e >= t) for (var n = o[t - 1], r = t; r <= e; r++) {
        o.push(n * r);
      }
      return o[e];
    }, a.incrementWrap = function (e, t, r) {
      return r = n(r, 0), ++e, e > t && (e = r), e;
    }, a.isPowerOfTwo = function (e) {
      return 0 !== e && 0 == (e & e - 1);
    }, a.nextPowerOfTwo = function (e) {
      return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e;
    }, a.clamp = function (e, t, n) {
      return e < t ? t : e > n ? n : e;
    };
    var u = new e();
    return a.setRandomNumberSeed = function (t) {
      u = new e(t);
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
    }, a.cbrt = n(Math.cbrt, function (e) {
      var t = Math.pow(Math.abs(e), 1 / 3);
      return e < 0 ? -t : t;
    }), a.log2 = n(Math.log2, function (e) {
      return Math.log(e) * Math.LOG2E;
    }), a.fog = function (e, t) {
      var n = e * t;
      return 1 - Math.exp(-n * n);
    }, a.fastApproximateAtan = function (e) {
      return e * (-.1784 * Math.abs(e) - .0663 * e * e + 1.0301);
    }, a.fastApproximateAtan2 = function (e, t) {
      var n,
          r,
          i = Math.abs(e);
      n = Math.abs(t), r = Math.max(i, n), n = Math.min(i, n);
      var o = n / r;
      return i = a.fastApproximateAtan(o), i = Math.abs(t) > Math.abs(e) ? a.PI_OVER_TWO - i : i, i = e < 0 ? a.PI - i : i, i = t < 0 ? -i : i;
    }, a;
  }), define("Core/arrayRemoveDuplicates", ["./Check", "./defaultValue", "./defined", "./Math"], function (e, t, n, r) {
    "use strict";

    function i(e, r, i) {
      if (n(e)) {
        i = t(i, !1);
        var o = e.length;
        if (o < 2) return e;
        var u, s, c;

        for (u = 1; u < o && (s = e[u - 1], c = e[u], !r(s, c, a)); ++u) {
          ;
        }

        if (u === o) return i && r(e[0], e[e.length - 1], a) ? e.slice(1) : e;

        for (var l = e.slice(0, u); u < o; ++u) {
          c = e[u], r(s, c, a) || (l.push(c), s = c);
        }

        return i && l.length > 1 && r(l[0], l[l.length - 1], a) && l.shift(), l;
      }
    }

    var a = r.EPSILON10;
    return i;
  }), define("Core/Cartesian2", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e, n) {
      this.x = t(e, 0), this.y = t(n, 0);
    }

    o.fromElements = function (e, t, r) {
      return n(r) ? (r.x = e, r.y = t, r) : new o(e, t);
    }, o.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.x = e.x, t.y = e.y, t) : new o(e.x, e.y);
    }, o.fromCartesian3 = o.clone, o.fromCartesian4 = o.clone, o.packedLength = 2, o.pack = function (e, n, r) {
      return r = t(r, 0), n[r++] = e.x, n[r] = e.y, n;
    }, o.unpack = function (e, r, i) {
      return r = t(r, 0), n(i) || (i = new o()), i.x = e[r++], i.y = e[r], i;
    }, o.packArray = function (e, t) {
      var r = e.length;
      n(t) ? t.length = 2 * r : t = new Array(2 * r);

      for (var i = 0; i < r; ++i) {
        o.pack(e[i], t, 2 * i);
      }

      return t;
    }, o.unpackArray = function (e, t) {
      var r = e.length;
      n(t) ? t.length = r / 2 : t = new Array(r / 2);

      for (var i = 0; i < r; i += 2) {
        var a = i / 2;
        t[a] = o.unpack(e, i, t[a]);
      }

      return t;
    }, o.fromArray = o.unpack, o.maximumComponent = function (e) {
      return Math.max(e.x, e.y);
    }, o.minimumComponent = function (e) {
      return Math.min(e.x, e.y);
    }, o.minimumByComponent = function (e, t, n) {
      return n.x = Math.min(e.x, t.x), n.y = Math.min(e.y, t.y), n;
    }, o.maximumByComponent = function (e, t, n) {
      return n.x = Math.max(e.x, t.x), n.y = Math.max(e.y, t.y), n;
    }, o.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y;
    }, o.magnitude = function (e) {
      return Math.sqrt(o.magnitudeSquared(e));
    };
    var u = new o();
    o.distance = function (e, t) {
      return o.subtract(e, t, u), o.magnitude(u);
    }, o.distanceSquared = function (e, t) {
      return o.subtract(e, t, u), o.magnitudeSquared(u);
    }, o.normalize = function (e, t) {
      var n = o.magnitude(e);
      return t.x = e.x / n, t.y = e.y / n, t;
    }, o.dot = function (e, t) {
      return e.x * t.x + e.y * t.y;
    }, o.multiplyComponents = function (e, t, n) {
      return n.x = e.x * t.x, n.y = e.y * t.y, n;
    }, o.divideComponents = function (e, t, n) {
      return n.x = e.x / t.x, n.y = e.y / t.y, n;
    }, o.add = function (e, t, n) {
      return n.x = e.x + t.x, n.y = e.y + t.y, n;
    }, o.subtract = function (e, t, n) {
      return n.x = e.x - t.x, n.y = e.y - t.y, n;
    }, o.multiplyByScalar = function (e, t, n) {
      return n.x = e.x * t, n.y = e.y * t, n;
    }, o.divideByScalar = function (e, t, n) {
      return n.x = e.x / t, n.y = e.y / t, n;
    }, o.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t;
    }, o.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t;
    };
    var s = new o();

    o.lerp = function (e, t, n, r) {
      return o.multiplyByScalar(t, n, s), r = o.multiplyByScalar(e, 1 - n, r), o.add(s, r, r);
    };

    var c = new o(),
        l = new o();

    o.angleBetween = function (e, t) {
      return o.normalize(e, c), o.normalize(t, l), a.acosClamped(o.dot(c, l));
    };

    var f = new o();
    return o.mostOrthogonalAxis = function (e, t) {
      var n = o.normalize(e, f);
      return o.abs(n, n), t = n.x <= n.y ? o.clone(o.UNIT_X, t) : o.clone(o.UNIT_Y, t);
    }, o.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.x === t.x && e.y === t.y;
    }, o.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1];
    }, o.equalsEpsilon = function (e, t, r, i) {
      return e === t || n(e) && n(t) && a.equalsEpsilon(e.x, t.x, r, i) && a.equalsEpsilon(e.y, t.y, r, i);
    }, o.ZERO = i(new o(0, 0)), o.UNIT_X = i(new o(1, 0)), o.UNIT_Y = i(new o(0, 1)), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, n) {
      return o.equalsEpsilon(this, e, t, n);
    }, o.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ")";
    }, o;
  }), define("Core/Cartesian3", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e, n, r) {
      this.x = t(e, 0), this.y = t(n, 0), this.z = t(r, 0);
    }

    o.fromSpherical = function (e, r) {
      n(r) || (r = new o());
      var i = e.clock,
          a = e.cone,
          u = t(e.magnitude, 1),
          s = u * Math.sin(a);
      return r.x = s * Math.cos(i), r.y = s * Math.sin(i), r.z = u * Math.cos(a), r;
    }, o.fromElements = function (e, t, r, i) {
      return n(i) ? (i.x = e, i.y = t, i.z = r, i) : new o(e, t, r);
    }, o.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t) : new o(e.x, e.y, e.z);
    }, o.fromCartesian4 = o.clone, o.packedLength = 3, o.pack = function (e, n, r) {
      return r = t(r, 0), n[r++] = e.x, n[r++] = e.y, n[r] = e.z, n;
    }, o.unpack = function (e, r, i) {
      return r = t(r, 0), n(i) || (i = new o()), i.x = e[r++], i.y = e[r++], i.z = e[r], i;
    }, o.packArray = function (e, t) {
      var r = e.length;
      n(t) ? t.length = 3 * r : t = new Array(3 * r);

      for (var i = 0; i < r; ++i) {
        o.pack(e[i], t, 3 * i);
      }

      return t;
    }, o.unpackArray = function (e, t) {
      var r = e.length;
      n(t) ? t.length = r / 3 : t = new Array(r / 3);

      for (var i = 0; i < r; i += 3) {
        var a = i / 3;
        t[a] = o.unpack(e, i, t[a]);
      }

      return t;
    }, o.fromArray = o.unpack, o.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z);
    }, o.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z);
    }, o.minimumByComponent = function (e, t, n) {
      return n.x = Math.min(e.x, t.x), n.y = Math.min(e.y, t.y), n.z = Math.min(e.z, t.z), n;
    }, o.maximumByComponent = function (e, t, n) {
      return n.x = Math.max(e.x, t.x), n.y = Math.max(e.y, t.y), n.z = Math.max(e.z, t.z), n;
    }, o.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z;
    }, o.magnitude = function (e) {
      return Math.sqrt(o.magnitudeSquared(e));
    };
    var u = new o();
    o.distance = function (e, t) {
      return o.subtract(e, t, u), o.magnitude(u);
    }, o.distanceSquared = function (e, t) {
      return o.subtract(e, t, u), o.magnitudeSquared(u);
    }, o.normalize = function (e, t) {
      var n = o.magnitude(e);
      return t.x = e.x / n, t.y = e.y / n, t.z = e.z / n, t;
    }, o.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z;
    }, o.multiplyComponents = function (e, t, n) {
      return n.x = e.x * t.x, n.y = e.y * t.y, n.z = e.z * t.z, n;
    }, o.divideComponents = function (e, t, n) {
      return n.x = e.x / t.x, n.y = e.y / t.y, n.z = e.z / t.z, n;
    }, o.add = function (e, t, n) {
      return n.x = e.x + t.x, n.y = e.y + t.y, n.z = e.z + t.z, n;
    }, o.subtract = function (e, t, n) {
      return n.x = e.x - t.x, n.y = e.y - t.y, n.z = e.z - t.z, n;
    }, o.multiplyByScalar = function (e, t, n) {
      return n.x = e.x * t, n.y = e.y * t, n.z = e.z * t, n;
    }, o.divideByScalar = function (e, t, n) {
      return n.x = e.x / t, n.y = e.y / t, n.z = e.z / t, n;
    }, o.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t;
    }, o.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t;
    };
    var s = new o();

    o.lerp = function (e, t, n, r) {
      return o.multiplyByScalar(t, n, s), r = o.multiplyByScalar(e, 1 - n, r), o.add(s, r, r);
    };

    var c = new o(),
        l = new o();

    o.angleBetween = function (e, t) {
      o.normalize(e, c), o.normalize(t, l);
      var n = o.dot(c, l),
          r = o.magnitude(o.cross(c, l, c));
      return Math.atan2(r, n);
    };

    var f = new o();
    o.mostOrthogonalAxis = function (e, t) {
      var n = o.normalize(e, f);
      return o.abs(n, n), t = n.x <= n.y ? n.x <= n.z ? o.clone(o.UNIT_X, t) : o.clone(o.UNIT_Z, t) : n.y <= n.z ? o.clone(o.UNIT_Y, t) : o.clone(o.UNIT_Z, t);
    }, o.projectVector = function (e, t, n) {
      var r = o.dot(e, t) / o.dot(t, t);
      return o.multiplyByScalar(t, r, n);
    }, o.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.x === t.x && e.y === t.y && e.z === t.z;
    }, o.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2];
    }, o.equalsEpsilon = function (e, t, r, i) {
      return e === t || n(e) && n(t) && a.equalsEpsilon(e.x, t.x, r, i) && a.equalsEpsilon(e.y, t.y, r, i) && a.equalsEpsilon(e.z, t.z, r, i);
    }, o.cross = function (e, t, n) {
      var r = e.x,
          i = e.y,
          a = e.z,
          o = t.x,
          u = t.y,
          s = t.z,
          c = i * s - a * u,
          l = a * o - r * s,
          f = r * u - i * o;
      return n.x = c, n.y = l, n.z = f, n;
    }, o.midpoint = function (e, t, n) {
      return n.x = .5 * (e.x + t.x), n.y = .5 * (e.y + t.y), n.z = .5 * (e.z + t.z), n;
    }, o.fromDegrees = function (e, t, n, r, i) {
      return e = a.toRadians(e), t = a.toRadians(t), o.fromRadians(e, t, n, r, i);
    };
    var h = new o(),
        d = new o(),
        p = new o(40680631590769, 40680631590769, 40408299984661.445);
    return o.fromRadians = function (e, r, i, a, u) {
      i = t(i, 0);
      var s = n(a) ? a.radiiSquared : p,
          c = Math.cos(r);
      h.x = c * Math.cos(e), h.y = c * Math.sin(e), h.z = Math.sin(r), h = o.normalize(h, h), o.multiplyComponents(s, h, d);
      var l = Math.sqrt(o.dot(h, d));
      return d = o.divideByScalar(d, l, d), h = o.multiplyByScalar(h, i, h), n(u) || (u = new o()), o.add(d, h, u);
    }, o.fromDegreesArray = function (e, t, r) {
      var i = e.length;
      n(r) ? r.length = i / 2 : r = new Array(i / 2);

      for (var a = 0; a < i; a += 2) {
        var u = e[a],
            s = e[a + 1],
            c = a / 2;
        r[c] = o.fromDegrees(u, s, 0, t, r[c]);
      }

      return r;
    }, o.fromRadiansArray = function (e, t, r) {
      var i = e.length;
      n(r) ? r.length = i / 2 : r = new Array(i / 2);

      for (var a = 0; a < i; a += 2) {
        var u = e[a],
            s = e[a + 1],
            c = a / 2;
        r[c] = o.fromRadians(u, s, 0, t, r[c]);
      }

      return r;
    }, o.fromDegreesArrayHeights = function (e, t, r) {
      var i = e.length;
      n(r) ? r.length = i / 3 : r = new Array(i / 3);

      for (var a = 0; a < i; a += 3) {
        var u = e[a],
            s = e[a + 1],
            c = e[a + 2],
            l = a / 3;
        r[l] = o.fromDegrees(u, s, c, t, r[l]);
      }

      return r;
    }, o.fromRadiansArrayHeights = function (e, t, r) {
      var i = e.length;
      n(r) ? r.length = i / 3 : r = new Array(i / 3);

      for (var a = 0; a < i; a += 3) {
        var u = e[a],
            s = e[a + 1],
            c = e[a + 2],
            l = a / 3;
        r[l] = o.fromRadians(u, s, c, t, r[l]);
      }

      return r;
    }, o.ZERO = i(new o(0, 0, 0)), o.UNIT_X = i(new o(1, 0, 0)), o.UNIT_Y = i(new o(0, 1, 0)), o.UNIT_Z = i(new o(0, 0, 1)), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, n) {
      return o.equalsEpsilon(this, e, t, n);
    }, o.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }, o;
  }), define("Core/scaleToGeodeticSurface", ["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function (e, t, n, r) {
    "use strict";

    function i(n, i, u, s, c) {
      var l = n.x,
          f = n.y,
          h = n.z,
          d = i.x,
          p = i.y,
          m = i.z,
          y = l * l * d * d,
          E = f * f * p * p,
          v = h * h * m * m,
          _ = y + E + v,
          T = Math.sqrt(1 / _),
          g = e.multiplyByScalar(n, T, a);

      if (_ < s) return isFinite(T) ? e.clone(g, c) : void 0;
      var R = u.x,
          A = u.y,
          S = u.z,
          w = o;
      w.x = g.x * R * 2, w.y = g.y * A * 2, w.z = g.z * S * 2;
      var O,
          I,
          x,
          N,
          M,
          C,
          P,
          b,
          D,
          U,
          L,
          F = (1 - T) * e.magnitude(n) / (.5 * e.magnitude(w)),
          B = 0;

      do {
        F -= B, x = 1 / (1 + F * R), N = 1 / (1 + F * A), M = 1 / (1 + F * S), C = x * x, P = N * N, b = M * M, D = C * x, U = P * N, L = b * M, O = y * C + E * P + v * b - 1, I = y * D * R + E * U * A + v * L * S;
        B = O / (-2 * I);
      } while (Math.abs(O) > r.EPSILON12);

      return t(c) ? (c.x = l * x, c.y = f * N, c.z = h * M, c) : new e(l * x, f * N, h * M);
    }

    var a = new e(),
        o = new e();
    return i;
  }), define("Core/Cartographic", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, n, r, i, a, o) {
    "use strict";

    function u(e, t, r) {
      this.longitude = n(e, 0), this.latitude = n(t, 0), this.height = n(r, 0);
    }

    u.fromRadians = function (e, t, i, a) {
      return i = n(i, 0), r(a) ? (a.longitude = e, a.latitude = t, a.height = i, a) : new u(e, t, i);
    }, u.fromDegrees = function (e, t, n, r) {
      return e = a.toRadians(e), t = a.toRadians(t), u.fromRadians(e, t, n, r);
    };
    var s = new e(),
        c = new e(),
        l = new e(),
        f = new e(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
        h = new e(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
        d = a.EPSILON1;
    return u.fromCartesian = function (t, n, i) {
      var p = r(n) ? n.oneOverRadii : f,
          m = r(n) ? n.oneOverRadiiSquared : h,
          y = r(n) ? n._centerToleranceSquared : d,
          E = o(t, p, m, y, c);

      if (r(E)) {
        var v = e.multiplyComponents(E, m, s);
        v = e.normalize(v, v);

        var _ = e.subtract(t, E, l),
            T = Math.atan2(v.y, v.x),
            g = Math.asin(v.z),
            R = a.sign(e.dot(_, t)) * e.magnitude(_);

        return r(i) ? (i.longitude = T, i.latitude = g, i.height = R, i) : new u(T, g, R);
      }
    }, u.toCartesian = function (t, n, r) {
      return e.fromRadians(t.longitude, t.latitude, t.height, n, r);
    }, u.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.longitude = e.longitude, t.latitude = e.latitude, t.height = e.height, t) : new u(e.longitude, e.latitude, e.height);
    }, u.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height;
    }, u.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(e.longitude - t.longitude) <= n && Math.abs(e.latitude - t.latitude) <= n && Math.abs(e.height - t.height) <= n;
    }, u.ZERO = i(new u(0, 0, 0)), u.prototype.clone = function (e) {
      return u.clone(this, e);
    }, u.prototype.equals = function (e) {
      return u.equals(this, e);
    }, u.prototype.equalsEpsilon = function (e, t) {
      return u.equalsEpsilon(this, e, t);
    }, u.prototype.toString = function () {
      return "(" + this.longitude + ", " + this.latitude + ", " + this.height + ")";
    }, u;
  }), define("Core/defineProperties", ["./defined"], function (e) {
    "use strict";

    var t = function () {
      try {
        return "x" in Object.defineProperty({}, "x", {});
      } catch (e) {
        return !1;
      }
    }(),
        n = Object.defineProperties;

    return t && e(n) || (n = function n(e) {
      return e;
    }), n;
  }), define("Core/Ellipsoid", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, n, r, i, a, o, u, s, c) {
    "use strict";

    function l(t, n, i, a) {
      n = r(n, 0), i = r(i, 0), a = r(a, 0), t._radii = new e(n, i, a), t._radiiSquared = new e(n * n, i * i, a * a), t._radiiToTheFourth = new e(n * n * n * n, i * i * i * i, a * a * a * a), t._oneOverRadii = new e(0 === n ? 0 : 1 / n, 0 === i ? 0 : 1 / i, 0 === a ? 0 : 1 / a), t._oneOverRadiiSquared = new e(0 === n ? 0 : 1 / (n * n), 0 === i ? 0 : 1 / (i * i), 0 === a ? 0 : 1 / (a * a)), t._minimumRadius = Math.min(n, i, a), t._maximumRadius = Math.max(n, i, a), t._centerToleranceSquared = s.EPSILON1, 0 !== t._radiiSquared.z && (t._squaredXOverSquaredZ = t._radiiSquared.x / t._radiiSquared.z);
    }

    function f(e, t, n) {
      this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, l(this, e, t, n);
    }

    a(f.prototype, {
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
    }), f.clone = function (t, n) {
      if (i(t)) {
        var r = t._radii;
        return i(n) ? (e.clone(r, n._radii), e.clone(t._radiiSquared, n._radiiSquared), e.clone(t._radiiToTheFourth, n._radiiToTheFourth), e.clone(t._oneOverRadii, n._oneOverRadii), e.clone(t._oneOverRadiiSquared, n._oneOverRadiiSquared), n._minimumRadius = t._minimumRadius, n._maximumRadius = t._maximumRadius, n._centerToleranceSquared = t._centerToleranceSquared, n) : new f(r.x, r.y, r.z);
      }
    }, f.fromCartesian3 = function (e, t) {
      return i(t) || (t = new f()), i(e) ? (l(t, e.x, e.y, e.z), t) : t;
    }, f.WGS84 = u(new f(6378137, 6378137, 6356752.314245179)), f.UNIT_SPHERE = u(new f(1, 1, 1)), f.MOON = u(new f(s.LUNAR_RADIUS, s.LUNAR_RADIUS, s.LUNAR_RADIUS)), f.prototype.clone = function (e) {
      return f.clone(this, e);
    }, f.packedLength = e.packedLength, f.pack = function (t, n, i) {
      return i = r(i, 0), e.pack(t._radii, n, i), n;
    }, f.unpack = function (t, n, i) {
      n = r(n, 0);
      var a = e.unpack(t, n);
      return f.fromCartesian3(a, i);
    }, f.prototype.geocentricSurfaceNormal = e.normalize, f.prototype.geodeticSurfaceNormalCartographic = function (t, n) {
      var r = t.longitude,
          a = t.latitude,
          o = Math.cos(a),
          u = o * Math.cos(r),
          s = o * Math.sin(r),
          c = Math.sin(a);
      return i(n) || (n = new e()), n.x = u, n.y = s, n.z = c, e.normalize(n, n);
    }, f.prototype.geodeticSurfaceNormal = function (t, n) {
      return i(n) || (n = new e()), n = e.multiplyComponents(t, this._oneOverRadiiSquared, n), e.normalize(n, n);
    };
    var h = new e(),
        d = new e();
    f.prototype.cartographicToCartesian = function (t, n) {
      var r = h,
          a = d;
      this.geodeticSurfaceNormalCartographic(t, r), e.multiplyComponents(this._radiiSquared, r, a);
      var o = Math.sqrt(e.dot(r, a));
      return e.divideByScalar(a, o, a), e.multiplyByScalar(r, t.height, r), i(n) || (n = new e()), e.add(a, r, n);
    }, f.prototype.cartographicArrayToCartesianArray = function (e, t) {
      var n = e.length;
      i(t) ? t.length = n : t = new Array(n);

      for (var r = 0; r < n; r++) {
        t[r] = this.cartographicToCartesian(e[r], t[r]);
      }

      return t;
    };
    var p = new e(),
        m = new e(),
        y = new e();
    return f.prototype.cartesianToCartographic = function (n, r) {
      var a = this.scaleToGeodeticSurface(n, m);

      if (i(a)) {
        var o = this.geodeticSurfaceNormal(a, p),
            u = e.subtract(n, a, y),
            c = Math.atan2(o.y, o.x),
            l = Math.asin(o.z),
            f = s.sign(e.dot(u, n)) * e.magnitude(u);
        return i(r) ? (r.longitude = c, r.latitude = l, r.height = f, r) : new t(c, l, f);
      }
    }, f.prototype.cartesianArrayToCartographicArray = function (e, t) {
      var n = e.length;
      i(t) ? t.length = n : t = new Array(n);

      for (var r = 0; r < n; ++r) {
        t[r] = this.cartesianToCartographic(e[r], t[r]);
      }

      return t;
    }, f.prototype.scaleToGeodeticSurface = function (e, t) {
      return c(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t);
    }, f.prototype.scaleToGeocentricSurface = function (t, n) {
      i(n) || (n = new e());
      var r = t.x,
          a = t.y,
          o = t.z,
          u = this._oneOverRadiiSquared,
          s = 1 / Math.sqrt(r * r * u.x + a * a * u.y + o * o * u.z);
      return e.multiplyByScalar(t, s, n);
    }, f.prototype.transformPositionToScaledSpace = function (t, n) {
      return i(n) || (n = new e()), e.multiplyComponents(t, this._oneOverRadii, n);
    }, f.prototype.transformPositionFromScaledSpace = function (t, n) {
      return i(n) || (n = new e()), e.multiplyComponents(t, this._radii, n);
    }, f.prototype.equals = function (t) {
      return this === t || i(t) && e.equals(this._radii, t._radii);
    }, f.prototype.toString = function () {
      return this._radii.toString();
    }, f.prototype.getSurfaceNormalIntersectionWithZAxis = function (t, n, a) {
      n = r(n, 0);
      var o = this._squaredXOverSquaredZ;
      if (i(a) || (a = new e()), a.x = 0, a.y = 0, a.z = t.z * (1 - o), !(Math.abs(a.z) >= this._radii.z - n)) return a;
    }, f;
  }), define("Core/GeographicProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function (e, t, n, r, i, a, o) {
    "use strict";

    function u(e) {
      this._ellipsoid = n(e, o.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
    }

    return i(u.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      }
    }), u.prototype.project = function (t, n) {
      var i = this._semimajorAxis,
          a = t.longitude * i,
          o = t.latitude * i,
          u = t.height;
      return r(n) ? (n.x = a, n.y = o, n.z = u, n) : new e(a, o, u);
    }, u.prototype.unproject = function (e, n) {
      var i = this._oneOverSemimajorAxis,
          a = e.x * i,
          o = e.y * i,
          u = e.z;
      return r(n) ? (n.longitude = a, n.latitude = o, n.height = u, n) : new t(a, o, u);
    }, u;
  }), define("Core/Intersect", ["./freezeObject"], function (e) {
    "use strict";

    return e({
      OUTSIDE: -1,
      INTERSECTING: 0,
      INSIDE: 1
    });
  }), define("Core/Rectangle", ["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e, t, r, i) {
      this.west = n(e, 0), this.south = n(t, 0), this.east = n(r, 0), this.north = n(i, 0);
    }

    i(s.prototype, {
      width: {
        get: function get() {
          return s.computeWidth(this);
        }
      },
      height: {
        get: function get() {
          return s.computeHeight(this);
        }
      }
    }), s.packedLength = 4, s.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e.west, t[r++] = e.south, t[r++] = e.east, t[r] = e.north, t;
    }, s.unpack = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new s()), i.west = e[t++], i.south = e[t++], i.east = e[t++], i.north = e[t], i;
    }, s.computeWidth = function (e) {
      var t = e.east,
          n = e.west;
      return t < n && (t += u.TWO_PI), t - n;
    }, s.computeHeight = function (e) {
      return e.north - e.south;
    }, s.fromDegrees = function (e, t, i, a, o) {
      return e = u.toRadians(n(e, 0)), t = u.toRadians(n(t, 0)), i = u.toRadians(n(i, 0)), a = u.toRadians(n(a, 0)), r(o) ? (o.west = e, o.south = t, o.east = i, o.north = a, o) : new s(e, t, i, a);
    }, s.fromRadians = function (e, t, i, a, o) {
      return r(o) ? (o.west = n(e, 0), o.south = n(t, 0), o.east = n(i, 0), o.north = n(a, 0), o) : new s(e, t, i, a);
    }, s.fromCartographicArray = function (e, t) {
      for (var n = Number.MAX_VALUE, i = -Number.MAX_VALUE, a = Number.MAX_VALUE, o = -Number.MAX_VALUE, c = Number.MAX_VALUE, l = -Number.MAX_VALUE, f = 0, h = e.length; f < h; f++) {
        var d = e[f];
        n = Math.min(n, d.longitude), i = Math.max(i, d.longitude), c = Math.min(c, d.latitude), l = Math.max(l, d.latitude);
        var p = d.longitude >= 0 ? d.longitude : d.longitude + u.TWO_PI;
        a = Math.min(a, p), o = Math.max(o, p);
      }

      return i - n > o - a && (n = a, i = o, i > u.PI && (i -= u.TWO_PI), n > u.PI && (n -= u.TWO_PI)), r(t) ? (t.west = n, t.south = c, t.east = i, t.north = l, t) : new s(n, c, i, l);
    }, s.fromCartesianArray = function (e, t, i) {
      t = n(t, a.WGS84);

      for (var o = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = Number.MAX_VALUE, f = -Number.MAX_VALUE, h = Number.MAX_VALUE, d = -Number.MAX_VALUE, p = 0, m = e.length; p < m; p++) {
        var y = t.cartesianToCartographic(e[p]);
        o = Math.min(o, y.longitude), c = Math.max(c, y.longitude), h = Math.min(h, y.latitude), d = Math.max(d, y.latitude);
        var E = y.longitude >= 0 ? y.longitude : y.longitude + u.TWO_PI;
        l = Math.min(l, E), f = Math.max(f, E);
      }

      return c - o > f - l && (o = l, c = f, c > u.PI && (c -= u.TWO_PI), o > u.PI && (o -= u.TWO_PI)), r(i) ? (i.west = o, i.south = h, i.east = c, i.north = d, i) : new s(o, h, c, d);
    }, s.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.west = e.west, t.south = e.south, t.east = e.east, t.north = e.north, t) : new s(e.west, e.south, e.east, e.north);
    }, s.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(e.west - t.west) <= n && Math.abs(e.south - t.south) <= n && Math.abs(e.east - t.east) <= n && Math.abs(e.north - t.north) <= n;
    }, s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north;
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.validate = function (e) {}, s.southwest = function (t, n) {
      return r(n) ? (n.longitude = t.west, n.latitude = t.south, n.height = 0, n) : new e(t.west, t.south);
    }, s.northwest = function (t, n) {
      return r(n) ? (n.longitude = t.west, n.latitude = t.north, n.height = 0, n) : new e(t.west, t.north);
    }, s.northeast = function (t, n) {
      return r(n) ? (n.longitude = t.east, n.latitude = t.north, n.height = 0, n) : new e(t.east, t.north);
    }, s.southeast = function (t, n) {
      return r(n) ? (n.longitude = t.east, n.latitude = t.south, n.height = 0, n) : new e(t.east, t.south);
    }, s.center = function (t, n) {
      var i = t.east,
          a = t.west;
      i < a && (i += u.TWO_PI);
      var o = u.negativePiToPi(.5 * (a + i)),
          s = .5 * (t.south + t.north);
      return r(n) ? (n.longitude = o, n.latitude = s, n.height = 0, n) : new e(o, s);
    }, s.intersection = function (e, t, n) {
      var i = e.east,
          a = e.west,
          o = t.east,
          c = t.west;
      i < a && o > 0 ? i += u.TWO_PI : o < c && i > 0 && (o += u.TWO_PI), i < a && c < 0 ? c += u.TWO_PI : o < c && a < 0 && (a += u.TWO_PI);
      var l = u.negativePiToPi(Math.max(a, c)),
          f = u.negativePiToPi(Math.min(i, o));

      if (!((e.west < e.east || t.west < t.east) && f <= l)) {
        var h = Math.max(e.south, t.south),
            d = Math.min(e.north, t.north);
        if (!(h >= d)) return r(n) ? (n.west = l, n.south = h, n.east = f, n.north = d, n) : new s(l, h, f, d);
      }
    }, s.simpleIntersection = function (e, t, n) {
      var i = Math.max(e.west, t.west),
          a = Math.max(e.south, t.south),
          o = Math.min(e.east, t.east),
          u = Math.min(e.north, t.north);
      if (!(a >= u || i >= o)) return r(n) ? (n.west = i, n.south = a, n.east = o, n.north = u, n) : new s(i, a, o, u);
    }, s.union = function (e, t, n) {
      r(n) || (n = new s());
      var i = e.east,
          a = e.west,
          o = t.east,
          c = t.west;
      i < a && o > 0 ? i += u.TWO_PI : o < c && i > 0 && (o += u.TWO_PI), i < a && c < 0 ? c += u.TWO_PI : o < c && a < 0 && (a += u.TWO_PI);
      var l = u.convertLongitudeRange(Math.min(a, c)),
          f = u.convertLongitudeRange(Math.max(i, o));
      return n.west = l, n.south = Math.min(e.south, t.south), n.east = f, n.north = Math.max(e.north, t.north), n;
    }, s.expand = function (e, t, n) {
      return r(n) || (n = new s()), n.west = Math.min(e.west, t.longitude), n.south = Math.min(e.south, t.latitude), n.east = Math.max(e.east, t.longitude), n.north = Math.max(e.north, t.latitude), n;
    }, s.contains = function (e, t) {
      var n = t.longitude,
          r = t.latitude,
          i = e.west,
          a = e.east;
      return a < i && (a += u.TWO_PI, n < 0 && (n += u.TWO_PI)), (n > i || u.equalsEpsilon(n, i, u.EPSILON14)) && (n < a || u.equalsEpsilon(n, a, u.EPSILON14)) && r >= e.south && r <= e.north;
    };
    var c = new e();
    return s.subsample = function (e, t, i, o) {
      t = n(t, a.WGS84), i = n(i, 0), r(o) || (o = []);
      var l = 0,
          f = e.north,
          h = e.south,
          d = e.east,
          p = e.west,
          m = c;
      m.height = i, m.longitude = p, m.latitude = f, o[l] = t.cartographicToCartesian(m, o[l]), l++, m.longitude = d, o[l] = t.cartographicToCartesian(m, o[l]), l++, m.latitude = h, o[l] = t.cartographicToCartesian(m, o[l]), l++, m.longitude = p, o[l] = t.cartographicToCartesian(m, o[l]), l++, m.latitude = f < 0 ? f : h > 0 ? h : 0;

      for (var y = 1; y < 8; ++y) {
        m.longitude = -Math.PI + y * u.PI_OVER_TWO, s.contains(e, m) && (o[l] = t.cartographicToCartesian(m, o[l]), l++);
      }

      return 0 === m.latitude && (m.longitude = p, o[l] = t.cartographicToCartesian(m, o[l]), l++, m.longitude = d, o[l] = t.cartographicToCartesian(m, o[l]), l++), o.length = l, o;
    }, s.MAX_VALUE = o(new s(-Math.PI, -u.PI_OVER_TWO, Math.PI, u.PI_OVER_TWO)), s;
  }), define("Core/BoundingRectangle", ["./Cartesian2", "./Cartographic", "./Check", "./defaultValue", "./defined", "./GeographicProjection", "./Intersect", "./Rectangle"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e, t, n, i) {
      this.x = r(e, 0), this.y = r(t, 0), this.width = r(n, 0), this.height = r(i, 0);
    }

    s.packedLength = 4, s.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e.x, t[n++] = e.y, t[n++] = e.width, t[n] = e.height, t;
    }, s.unpack = function (e, t, n) {
      return t = r(t, 0), i(n) || (n = new s()), n.x = e[t++], n.y = e[t++], n.width = e[t++], n.height = e[t], n;
    }, s.fromPoints = function (e, t) {
      if (i(t) || (t = new s()), !i(e) || 0 === e.length) return t.x = 0, t.y = 0, t.width = 0, t.height = 0, t;

      for (var n = e.length, r = e[0].x, a = e[0].y, o = e[0].x, u = e[0].y, c = 1; c < n; c++) {
        var l = e[c],
            f = l.x,
            h = l.y;
        r = Math.min(f, r), o = Math.max(f, o), a = Math.min(h, a), u = Math.max(h, u);
      }

      return t.x = r, t.y = a, t.width = o - r, t.height = u - a, t;
    };
    var c = new a(),
        l = new t(),
        f = new t();
    return s.fromRectangle = function (t, n, a) {
      if (i(a) || (a = new s()), !i(t)) return a.x = 0, a.y = 0, a.width = 0, a.height = 0, a;
      n = r(n, c);
      var o = n.project(u.southwest(t, l)),
          h = n.project(u.northeast(t, f));
      return e.subtract(h, o, h), a.x = o.x, a.y = o.y, a.width = h.x, a.height = h.y, a;
    }, s.clone = function (e, t) {
      if (i(e)) return i(t) ? (t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height, t) : new s(e.x, e.y, e.width, e.height);
    }, s.union = function (e, t, n) {
      i(n) || (n = new s());
      var r = Math.min(e.x, t.x),
          a = Math.min(e.y, t.y),
          o = Math.max(e.x + e.width, t.x + t.width),
          u = Math.max(e.y + e.height, t.y + t.height);
      return n.x = r, n.y = a, n.width = o - r, n.height = u - a, n;
    }, s.expand = function (e, t, n) {
      n = s.clone(e, n);
      var r = t.x - n.x,
          i = t.y - n.y;
      return r > n.width ? n.width = r : r < 0 && (n.width -= r, n.x = t.x), i > n.height ? n.height = i : i < 0 && (n.height -= i, n.y = t.y), n;
    }, s.intersect = function (e, t) {
      var n = e.x,
          r = e.y,
          i = t.x,
          a = t.y;
      return n > i + t.width || n + e.width < i || r + e.height < a || r > a + t.height ? o.OUTSIDE : o.INTERSECTING;
    }, s.equals = function (e, t) {
      return e === t || i(e) && i(t) && e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
    }, s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.intersect = function (e) {
      return s.intersect(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s;
  }), define("Core/Interval", ["./defaultValue"], function (e) {
    "use strict";

    function t(t, n) {
      this.start = e(t, 0), this.stop = e(n, 0);
    }

    return t;
  }), define("Core/Matrix3", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e, t, r, i, a, o, u, s, c) {
      this[0] = n(e, 0), this[1] = n(i, 0), this[2] = n(u, 0), this[3] = n(t, 0), this[4] = n(a, 0), this[5] = n(s, 0), this[6] = n(r, 0), this[7] = n(o, 0), this[8] = n(c, 0);
    }

    function c(e) {
      for (var t = 0, n = 0; n < 9; ++n) {
        var r = e[n];
        t += r * r;
      }

      return Math.sqrt(t);
    }

    function l(e) {
      for (var t = 0, n = 0; n < 3; ++n) {
        var r = e[s.getElementIndex(m[n], p[n])];
        t += 2 * r * r;
      }

      return Math.sqrt(t);
    }

    function f(e, t) {
      for (var n = u.EPSILON15, r = 0, i = 1, a = 0; a < 3; ++a) {
        var o = Math.abs(e[s.getElementIndex(m[a], p[a])]);
        o > r && (i = a, r = o);
      }

      var c = 1,
          l = 0,
          f = p[i],
          h = m[i];

      if (Math.abs(e[s.getElementIndex(h, f)]) > n) {
        var d,
            y = e[s.getElementIndex(h, h)],
            E = e[s.getElementIndex(f, f)],
            v = e[s.getElementIndex(h, f)],
            _ = (y - E) / 2 / v;

        d = _ < 0 ? -1 / (-_ + Math.sqrt(1 + _ * _)) : 1 / (_ + Math.sqrt(1 + _ * _)), c = 1 / Math.sqrt(1 + d * d), l = d * c;
      }

      return t = s.clone(s.IDENTITY, t), t[s.getElementIndex(f, f)] = t[s.getElementIndex(h, h)] = c, t[s.getElementIndex(h, f)] = l, t[s.getElementIndex(f, h)] = -l, t;
    }

    s.packedLength = 9, s.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t[r++] = e[4], t[r++] = e[5], t[r++] = e[6], t[r++] = e[7], t[r++] = e[8], t;
    }, s.unpack = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new s()), i[0] = e[t++], i[1] = e[t++], i[2] = e[t++], i[3] = e[t++], i[4] = e[t++], i[5] = e[t++], i[6] = e[t++], i[7] = e[t++], i[8] = e[t++], i;
    }, s.clone = function (e, t) {
      if (r(e)) return r(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new s(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]);
    }, s.fromArray = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new s()), i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i[4] = e[t + 4], i[5] = e[t + 5], i[6] = e[t + 6], i[7] = e[t + 7], i[8] = e[t + 8], i;
    }, s.fromColumnMajorArray = function (e, t) {
      return s.clone(e, t);
    }, s.fromRowMajorArray = function (e, t) {
      return r(t) ? (t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t) : new s(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
    }, s.fromQuaternion = function (e, t) {
      var n = e.x * e.x,
          i = e.x * e.y,
          a = e.x * e.z,
          o = e.x * e.w,
          u = e.y * e.y,
          c = e.y * e.z,
          l = e.y * e.w,
          f = e.z * e.z,
          h = e.z * e.w,
          d = e.w * e.w,
          p = n - u - f + d,
          m = 2 * (i - h),
          y = 2 * (a + l),
          E = 2 * (i + h),
          v = -n + u - f + d,
          _ = 2 * (c - o),
          T = 2 * (a - l),
          g = 2 * (c + o),
          R = -n - u + f + d;

      return r(t) ? (t[0] = p, t[1] = E, t[2] = T, t[3] = m, t[4] = v, t[5] = g, t[6] = y, t[7] = _, t[8] = R, t) : new s(p, m, y, E, v, _, T, g, R);
    }, s.fromHeadingPitchRoll = function (e, t) {
      var n = Math.cos(-e.pitch),
          i = Math.cos(-e.heading),
          a = Math.cos(e.roll),
          o = Math.sin(-e.pitch),
          u = Math.sin(-e.heading),
          c = Math.sin(e.roll),
          l = n * i,
          f = -a * u + c * o * i,
          h = c * u + a * o * i,
          d = n * u,
          p = a * i + c * o * u,
          m = -c * i + a * o * u,
          y = -o,
          E = c * n,
          v = a * n;
      return r(t) ? (t[0] = l, t[1] = d, t[2] = y, t[3] = f, t[4] = p, t[5] = E, t[6] = h, t[7] = m, t[8] = v, t) : new s(l, f, h, d, p, m, y, E, v);
    }, s.fromScale = function (e, t) {
      return r(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e.y, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e.z, t) : new s(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z);
    }, s.fromUniformScale = function (e, t) {
      return r(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e, t) : new s(e, 0, 0, 0, e, 0, 0, 0, e);
    }, s.fromCrossProduct = function (e, t) {
      return r(t) ? (t[0] = 0, t[1] = e.z, t[2] = -e.y, t[3] = -e.z, t[4] = 0, t[5] = e.x, t[6] = e.y, t[7] = -e.x, t[8] = 0, t) : new s(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0);
    }, s.fromRotationX = function (e, t) {
      var n = Math.cos(e),
          i = Math.sin(e);
      return r(t) ? (t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = n, t[5] = i, t[6] = 0, t[7] = -i, t[8] = n, t) : new s(1, 0, 0, 0, n, -i, 0, i, n);
    }, s.fromRotationY = function (e, t) {
      var n = Math.cos(e),
          i = Math.sin(e);
      return r(t) ? (t[0] = n, t[1] = 0, t[2] = -i, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = i, t[7] = 0, t[8] = n, t) : new s(n, 0, i, 0, 1, 0, -i, 0, n);
    }, s.fromRotationZ = function (e, t) {
      var n = Math.cos(e),
          i = Math.sin(e);
      return r(t) ? (t[0] = n, t[1] = i, t[2] = 0, t[3] = -i, t[4] = n, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new s(n, -i, 0, i, n, 0, 0, 0, 1);
    }, s.toArray = function (e, t) {
      return r(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]];
    }, s.getElementIndex = function (e, t) {
      return 3 * e + t;
    }, s.getColumn = function (e, t, n) {
      var r = 3 * t,
          i = e[r],
          a = e[r + 1],
          o = e[r + 2];
      return n.x = i, n.y = a, n.z = o, n;
    }, s.setColumn = function (e, t, n, r) {
      r = s.clone(e, r);
      var i = 3 * t;
      return r[i] = n.x, r[i + 1] = n.y, r[i + 2] = n.z, r;
    }, s.getRow = function (e, t, n) {
      var r = e[t],
          i = e[t + 3],
          a = e[t + 6];
      return n.x = r, n.y = i, n.z = a, n;
    }, s.setRow = function (e, t, n, r) {
      return r = s.clone(e, r), r[t] = n.x, r[t + 3] = n.y, r[t + 6] = n.z, r;
    };
    var h = new e();

    s.getScale = function (t, n) {
      return n.x = e.magnitude(e.fromElements(t[0], t[1], t[2], h)), n.y = e.magnitude(e.fromElements(t[3], t[4], t[5], h)), n.z = e.magnitude(e.fromElements(t[6], t[7], t[8], h)), n;
    };

    var d = new e();
    s.getMaximumScale = function (t) {
      return s.getScale(t, d), e.maximumComponent(d);
    }, s.multiply = function (e, t, n) {
      var r = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
          i = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
          a = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
          o = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
          u = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
          s = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
          c = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
          l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
          f = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
      return n[0] = r, n[1] = i, n[2] = a, n[3] = o, n[4] = u, n[5] = s, n[6] = c, n[7] = l, n[8] = f, n;
    }, s.add = function (e, t, n) {
      return n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n[4] = e[4] + t[4], n[5] = e[5] + t[5], n[6] = e[6] + t[6], n[7] = e[7] + t[7], n[8] = e[8] + t[8], n;
    }, s.subtract = function (e, t, n) {
      return n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n[4] = e[4] - t[4], n[5] = e[5] - t[5], n[6] = e[6] - t[6], n[7] = e[7] - t[7], n[8] = e[8] - t[8], n;
    }, s.multiplyByVector = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z,
          o = e[0] * r + e[3] * i + e[6] * a,
          u = e[1] * r + e[4] * i + e[7] * a,
          s = e[2] * r + e[5] * i + e[8] * a;
      return n.x = o, n.y = u, n.z = s, n;
    }, s.multiplyByScalar = function (e, t, n) {
      return n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n[4] = e[4] * t, n[5] = e[5] * t, n[6] = e[6] * t, n[7] = e[7] * t, n[8] = e[8] * t, n;
    }, s.multiplyByScale = function (e, t, n) {
      return n[0] = e[0] * t.x, n[1] = e[1] * t.x, n[2] = e[2] * t.x, n[3] = e[3] * t.y, n[4] = e[4] * t.y, n[5] = e[5] * t.y, n[6] = e[6] * t.z, n[7] = e[7] * t.z, n[8] = e[8] * t.z, n;
    }, s.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t;
    }, s.transpose = function (e, t) {
      var n = e[0],
          r = e[3],
          i = e[6],
          a = e[1],
          o = e[4],
          u = e[7],
          s = e[2],
          c = e[5],
          l = e[8];
      return t[0] = n, t[1] = r, t[2] = i, t[3] = a, t[4] = o, t[5] = u, t[6] = s, t[7] = c, t[8] = l, t;
    };
    var p = [1, 0, 0],
        m = [2, 2, 1],
        y = new s(),
        E = new s();
    return s.computeEigenDecomposition = function (e, t) {
      var n = u.EPSILON20,
          i = 0,
          a = 0;
      r(t) || (t = {});

      for (var o = t.unitary = s.clone(s.IDENTITY, t.unitary), h = t.diagonal = s.clone(e, t.diagonal), d = n * c(h); a < 10 && l(h) > d;) {
        f(h, y), s.transpose(y, E), s.multiply(h, y, h), s.multiply(E, h, h), s.multiply(o, y, o), ++i > 2 && (++a, i = 0);
      }

      return t;
    }, s.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t;
    }, s.determinant = function (e) {
      var t = e[0],
          n = e[3],
          r = e[6],
          i = e[1],
          a = e[4],
          o = e[7],
          u = e[2],
          s = e[5],
          c = e[8];
      return t * (a * c - s * o) + i * (s * r - n * c) + u * (n * o - a * r);
    }, s.inverse = function (e, t) {
      var n = e[0],
          r = e[1],
          i = e[2],
          a = e[3],
          o = e[4],
          u = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = s.determinant(e);
      t[0] = o * f - l * u, t[1] = l * i - r * f, t[2] = r * u - o * i, t[3] = c * u - a * f, t[4] = n * f - c * i, t[5] = a * i - n * u, t[6] = a * l - c * o, t[7] = c * r - n * l, t[8] = n * o - a * r;
      var d = 1 / h;
      return s.multiplyByScalar(t, d, t);
    }, s.equals = function (e, t) {
      return e === t || r(e) && r(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
    }, s.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n && Math.abs(e[4] - t[4]) <= n && Math.abs(e[5] - t[5]) <= n && Math.abs(e[6] - t[6]) <= n && Math.abs(e[7] - t[7]) <= n && Math.abs(e[8] - t[8]) <= n;
    }, s.IDENTITY = o(new s(1, 0, 0, 0, 1, 0, 0, 0, 1)), s.ZERO = o(new s(0, 0, 0, 0, 0, 0, 0, 0, 0)), s.COLUMN0ROW0 = 0, s.COLUMN0ROW1 = 1, s.COLUMN0ROW2 = 2, s.COLUMN1ROW0 = 3, s.COLUMN1ROW1 = 4, s.COLUMN1ROW2 = 5, s.COLUMN2ROW0 = 6, s.COLUMN2ROW1 = 7, s.COLUMN2ROW2 = 8, i(s.prototype, {
      length: {
        get: function get() {
          return s.packedLength;
        }
      }
    }), s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.equalsArray = function (e, t, n) {
      return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3] && e[4] === t[n + 4] && e[5] === t[n + 5] && e[6] === t[n + 6] && e[7] === t[n + 7] && e[8] === t[n + 8];
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.prototype.toString = function () {
      return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")";
    }, s;
  }), define("Core/Cartesian4", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e, n, r, i) {
      this.x = t(e, 0), this.y = t(n, 0), this.z = t(r, 0), this.w = t(i, 0);
    }

    o.fromElements = function (e, t, r, i, a) {
      return n(a) ? (a.x = e, a.y = t, a.z = r, a.w = i, a) : new o(e, t, r, i);
    }, o.fromColor = function (e, t) {
      return n(t) ? (t.x = e.red, t.y = e.green, t.z = e.blue, t.w = e.alpha, t) : new o(e.red, e.green, e.blue, e.alpha);
    }, o.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new o(e.x, e.y, e.z, e.w);
    }, o.packedLength = 4, o.pack = function (e, n, r) {
      return r = t(r, 0), n[r++] = e.x, n[r++] = e.y, n[r++] = e.z, n[r] = e.w, n;
    }, o.unpack = function (e, r, i) {
      return r = t(r, 0), n(i) || (i = new o()), i.x = e[r++], i.y = e[r++], i.z = e[r++], i.w = e[r], i;
    }, o.packArray = function (e, t) {
      var r = e.length;
      n(t) ? t.length = 4 * r : t = new Array(4 * r);

      for (var i = 0; i < r; ++i) {
        o.pack(e[i], t, 4 * i);
      }

      return t;
    }, o.unpackArray = function (e, t) {
      var r = e.length;
      n(t) ? t.length = r / 4 : t = new Array(r / 4);

      for (var i = 0; i < r; i += 4) {
        var a = i / 4;
        t[a] = o.unpack(e, i, t[a]);
      }

      return t;
    }, o.fromArray = o.unpack, o.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z, e.w);
    }, o.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z, e.w);
    }, o.minimumByComponent = function (e, t, n) {
      return n.x = Math.min(e.x, t.x), n.y = Math.min(e.y, t.y), n.z = Math.min(e.z, t.z), n.w = Math.min(e.w, t.w), n;
    }, o.maximumByComponent = function (e, t, n) {
      return n.x = Math.max(e.x, t.x), n.y = Math.max(e.y, t.y), n.z = Math.max(e.z, t.z), n.w = Math.max(e.w, t.w), n;
    }, o.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }, o.magnitude = function (e) {
      return Math.sqrt(o.magnitudeSquared(e));
    };
    var u = new o();
    o.distance = function (e, t) {
      return o.subtract(e, t, u), o.magnitude(u);
    }, o.distanceSquared = function (e, t) {
      return o.subtract(e, t, u), o.magnitudeSquared(u);
    }, o.normalize = function (e, t) {
      var n = o.magnitude(e);
      return t.x = e.x / n, t.y = e.y / n, t.z = e.z / n, t.w = e.w / n, t;
    }, o.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }, o.multiplyComponents = function (e, t, n) {
      return n.x = e.x * t.x, n.y = e.y * t.y, n.z = e.z * t.z, n.w = e.w * t.w, n;
    }, o.divideComponents = function (e, t, n) {
      return n.x = e.x / t.x, n.y = e.y / t.y, n.z = e.z / t.z, n.w = e.w / t.w, n;
    }, o.add = function (e, t, n) {
      return n.x = e.x + t.x, n.y = e.y + t.y, n.z = e.z + t.z, n.w = e.w + t.w, n;
    }, o.subtract = function (e, t, n) {
      return n.x = e.x - t.x, n.y = e.y - t.y, n.z = e.z - t.z, n.w = e.w - t.w, n;
    }, o.multiplyByScalar = function (e, t, n) {
      return n.x = e.x * t, n.y = e.y * t, n.z = e.z * t, n.w = e.w * t, n;
    }, o.divideByScalar = function (e, t, n) {
      return n.x = e.x / t, n.y = e.y / t, n.z = e.z / t, n.w = e.w / t, n;
    }, o.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
    }, o.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t.w = Math.abs(e.w), t;
    };
    var s = new o();

    o.lerp = function (e, t, n, r) {
      return o.multiplyByScalar(t, n, s), r = o.multiplyByScalar(e, 1 - n, r), o.add(s, r, r);
    };

    var c = new o();
    o.mostOrthogonalAxis = function (e, t) {
      var n = o.normalize(e, c);
      return o.abs(n, n), t = n.x <= n.y ? n.x <= n.z ? n.x <= n.w ? o.clone(o.UNIT_X, t) : o.clone(o.UNIT_W, t) : n.z <= n.w ? o.clone(o.UNIT_Z, t) : o.clone(o.UNIT_W, t) : n.y <= n.z ? n.y <= n.w ? o.clone(o.UNIT_Y, t) : o.clone(o.UNIT_W, t) : n.z <= n.w ? o.clone(o.UNIT_Z, t) : o.clone(o.UNIT_W, t);
    }, o.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, o.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2] && e.w === t[n + 3];
    }, o.equalsEpsilon = function (e, t, r, i) {
      return e === t || n(e) && n(t) && a.equalsEpsilon(e.x, t.x, r, i) && a.equalsEpsilon(e.y, t.y, r, i) && a.equalsEpsilon(e.z, t.z, r, i) && a.equalsEpsilon(e.w, t.w, r, i);
    }, o.ZERO = i(new o(0, 0, 0, 0)), o.UNIT_X = i(new o(1, 0, 0, 0)), o.UNIT_Y = i(new o(0, 1, 0, 0)), o.UNIT_Z = i(new o(0, 0, 1, 0)), o.UNIT_W = i(new o(0, 0, 0, 1)), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, n) {
      return o.equalsEpsilon(this, e, t, n);
    }, o.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    };
    var l = new Float32Array(1);
    return o.packFloat = function (e, t) {
      if (n(t) || (t = new o()), l[0] = e, 0 === (e = l[0])) return o.clone(o.ZERO, t);
      var r,
          i = e < 0 ? 1 : 0;
      isFinite(e) ? (e = Math.abs(e), r = Math.floor(a.logBase(e, 10)) + 1, e /= Math.pow(10, r)) : (e = .1, r = 38);
      var u = 256 * e;
      return t.x = Math.floor(u), u = 256 * (u - t.x), t.y = Math.floor(u), u = 256 * (u - t.y), t.z = Math.floor(u), t.w = 2 * (r + 38) + i, t;
    }, o.unpackFloat = function (e) {
      var t = e.w / 2,
          n = Math.floor(t),
          r = 2 * (t - n);
      if (n -= 38, r = 2 * r - 1, r = -r, n >= 38) return r < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      var i = r * e.x * (1 / 256);
      return i += r * e.y * (1 / 65536), (i += r * e.z * (1 / 16777216)) * Math.pow(10, n);
    }, o;
  }), define("Core/RuntimeError", ["./defined"], function (e) {
    "use strict";

    function t(e) {
      this.name = "RuntimeError", this.message = e;
      var t;

      try {
        throw new Error();
      } catch (e) {
        t = e.stack;
      }

      this.stack = t;
    }

    return e(Object.create) && (t.prototype = Object.create(Error.prototype), t.prototype.constructor = t), t.prototype.toString = function () {
      var t = this.name + ": " + this.message;
      return e(this.stack) && (t += "\n" + this.stack.toString()), t;
    }, t;
  }), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (e, t, n, r, i, a, o, u, s, c) {
    "use strict";

    function l(e, t, n, i, a, o, u, s, c, l, f, h, d, p, m, y) {
      this[0] = r(e, 0), this[1] = r(a, 0), this[2] = r(c, 0), this[3] = r(d, 0), this[4] = r(t, 0), this[5] = r(o, 0), this[6] = r(l, 0), this[7] = r(p, 0), this[8] = r(n, 0), this[9] = r(u, 0), this[10] = r(f, 0), this[11] = r(m, 0), this[12] = r(i, 0), this[13] = r(s, 0), this[14] = r(h, 0), this[15] = r(y, 0);
    }

    l.packedLength = 16, l.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t[n++] = e[4], t[n++] = e[5], t[n++] = e[6], t[n++] = e[7], t[n++] = e[8], t[n++] = e[9], t[n++] = e[10], t[n++] = e[11], t[n++] = e[12], t[n++] = e[13], t[n++] = e[14], t[n] = e[15], t;
    }, l.unpack = function (e, t, n) {
      return t = r(t, 0), i(n) || (n = new l()), n[0] = e[t++], n[1] = e[t++], n[2] = e[t++], n[3] = e[t++], n[4] = e[t++], n[5] = e[t++], n[6] = e[t++], n[7] = e[t++], n[8] = e[t++], n[9] = e[t++], n[10] = e[t++], n[11] = e[t++], n[12] = e[t++], n[13] = e[t++], n[14] = e[t++], n[15] = e[t], n;
    }, l.clone = function (e, t) {
      if (i(e)) return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : new l(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]);
    }, l.fromArray = l.unpack, l.fromColumnMajorArray = function (e, t) {
      return l.clone(e, t);
    }, l.fromRowMajorArray = function (e, t) {
      return i(t) ? (t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t) : new l(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
    }, l.fromRotationTranslation = function (t, n, a) {
      return n = r(n, e.ZERO), i(a) ? (a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = 0, a[4] = t[3], a[5] = t[4], a[6] = t[5], a[7] = 0, a[8] = t[6], a[9] = t[7], a[10] = t[8], a[11] = 0, a[12] = n.x, a[13] = n.y, a[14] = n.z, a[15] = 1, a) : new l(t[0], t[3], t[6], n.x, t[1], t[4], t[7], n.y, t[2], t[5], t[8], n.z, 0, 0, 0, 1);
    }, l.fromTranslationQuaternionRotationScale = function (e, t, n, r) {
      i(r) || (r = new l());

      var a = n.x,
          o = n.y,
          u = n.z,
          s = t.x * t.x,
          c = t.x * t.y,
          f = t.x * t.z,
          h = t.x * t.w,
          d = t.y * t.y,
          p = t.y * t.z,
          m = t.y * t.w,
          y = t.z * t.z,
          E = t.z * t.w,
          v = t.w * t.w,
          _ = s - d - y + v,
          T = 2 * (c - E),
          g = 2 * (f + m),
          R = 2 * (c + E),
          A = -s + d - y + v,
          S = 2 * (p - h),
          w = 2 * (f - m),
          O = 2 * (p + h),
          I = -s - d + y + v;

      return r[0] = _ * a, r[1] = R * a, r[2] = w * a, r[3] = 0, r[4] = T * o, r[5] = A * o, r[6] = O * o, r[7] = 0, r[8] = g * u, r[9] = S * u, r[10] = I * u, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, r;
    }, l.fromTranslationRotationScale = function (e, t) {
      return l.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t);
    }, l.fromTranslation = function (e, t) {
      return l.fromRotationTranslation(s.IDENTITY, e, t);
    }, l.fromScale = function (e, t) {
      return i(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e.y, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e.z, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1);
    }, l.fromUniformScale = function (e, t) {
      return i(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
    };
    var f = new e(),
        h = new e(),
        d = new e();
    l.fromCamera = function (t, n) {
      var r = t.position,
          a = t.direction,
          o = t.up;
      e.normalize(a, f), e.normalize(e.cross(f, o, h), h), e.normalize(e.cross(h, f, d), d);
      var u = h.x,
          s = h.y,
          c = h.z,
          p = f.x,
          m = f.y,
          y = f.z,
          E = d.x,
          v = d.y,
          _ = d.z,
          T = r.x,
          g = r.y,
          R = r.z,
          A = u * -T + s * -g + c * -R,
          S = E * -T + v * -g + _ * -R,
          w = p * T + m * g + y * R;
      return i(n) ? (n[0] = u, n[1] = E, n[2] = -p, n[3] = 0, n[4] = s, n[5] = v, n[6] = -m, n[7] = 0, n[8] = c, n[9] = _, n[10] = -y, n[11] = 0, n[12] = A, n[13] = S, n[14] = w, n[15] = 1, n) : new l(u, s, c, A, E, v, _, S, -p, -m, -y, w, 0, 0, 0, 1);
    }, l.computePerspectiveFieldOfView = function (e, t, n, r, i) {
      var a = Math.tan(.5 * e),
          o = 1 / a,
          u = o / t,
          s = (r + n) / (n - r),
          c = 2 * r * n / (n - r);
      return i[0] = u, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = o, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = s, i[11] = -1, i[12] = 0, i[13] = 0, i[14] = c, i[15] = 0, i;
    }, l.computeOrthographicOffCenter = function (e, t, n, r, i, a, o) {
      var u = 1 / (t - e),
          s = 1 / (r - n),
          c = 1 / (a - i),
          l = -(t + e) * u,
          f = -(r + n) * s,
          h = -(a + i) * c;
      return u *= 2, s *= 2, c *= -2, o[0] = u, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = s, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = c, o[11] = 0, o[12] = l, o[13] = f, o[14] = h, o[15] = 1, o;
    }, l.computePerspectiveOffCenter = function (e, t, n, r, i, a, o) {
      var u = 2 * i / (t - e),
          s = 2 * i / (r - n),
          c = (t + e) / (t - e),
          l = (r + n) / (r - n),
          f = -(a + i) / (a - i),
          h = -2 * a * i / (a - i);
      return o[0] = u, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = s, o[6] = 0, o[7] = 0, o[8] = c, o[9] = l, o[10] = f, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = h, o[15] = 0, o;
    }, l.computeInfinitePerspectiveOffCenter = function (e, t, n, r, i, a) {
      var o = 2 * i / (t - e),
          u = 2 * i / (r - n),
          s = (t + e) / (t - e),
          c = (r + n) / (r - n),
          l = -2 * i;
      return a[0] = o, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = u, a[6] = 0, a[7] = 0, a[8] = s, a[9] = c, a[10] = -1, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = l, a[15] = 0, a;
    }, l.computeViewportTransformation = function (e, t, n, i) {
      e = r(e, r.EMPTY_OBJECT);
      var a = r(e.x, 0),
          o = r(e.y, 0),
          u = r(e.width, 0),
          s = r(e.height, 0);
      t = r(t, 0), n = r(n, 1);
      var c = .5 * u,
          l = .5 * s,
          f = .5 * (n - t),
          h = c,
          d = l,
          p = f,
          m = a + c,
          y = o + l,
          E = t + f;
      return i[0] = h, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = d, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = p, i[11] = 0, i[12] = m, i[13] = y, i[14] = E, i[15] = 1, i;
    }, l.computeView = function (t, n, r, i, a) {
      return a[0] = i.x, a[1] = r.x, a[2] = -n.x, a[3] = 0, a[4] = i.y, a[5] = r.y, a[6] = -n.y, a[7] = 0, a[8] = i.z, a[9] = r.z, a[10] = -n.z, a[11] = 0, a[12] = -e.dot(i, t), a[13] = -e.dot(r, t), a[14] = e.dot(n, t), a[15] = 1, a;
    }, l.toArray = function (e, t) {
      return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]];
    }, l.getElementIndex = function (e, t) {
      return 4 * e + t;
    }, l.getColumn = function (e, t, n) {
      var r = 4 * t,
          i = e[r],
          a = e[r + 1],
          o = e[r + 2],
          u = e[r + 3];
      return n.x = i, n.y = a, n.z = o, n.w = u, n;
    }, l.setColumn = function (e, t, n, r) {
      r = l.clone(e, r);
      var i = 4 * t;
      return r[i] = n.x, r[i + 1] = n.y, r[i + 2] = n.z, r[i + 3] = n.w, r;
    }, l.setTranslation = function (e, t, n) {
      return n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = t.x, n[13] = t.y, n[14] = t.z, n[15] = e[15], n;
    };
    var p = new e();
    l.setScale = function (t, n, r) {
      var i = l.getScale(t, p),
          a = e.divideComponents(n, i, p);
      return l.multiplyByScale(t, a, r);
    }, l.getRow = function (e, t, n) {
      var r = e[t],
          i = e[t + 4],
          a = e[t + 8],
          o = e[t + 12];
      return n.x = r, n.y = i, n.z = a, n.w = o, n;
    }, l.setRow = function (e, t, n, r) {
      return r = l.clone(e, r), r[t] = n.x, r[t + 4] = n.y, r[t + 8] = n.z, r[t + 12] = n.w, r;
    };
    var m = new e();

    l.getScale = function (t, n) {
      return n.x = e.magnitude(e.fromElements(t[0], t[1], t[2], m)), n.y = e.magnitude(e.fromElements(t[4], t[5], t[6], m)), n.z = e.magnitude(e.fromElements(t[8], t[9], t[10], m)), n;
    };

    var y = new e();
    l.getMaximumScale = function (t) {
      return l.getScale(t, y), e.maximumComponent(y);
    }, l.multiply = function (e, t, n) {
      var r = e[0],
          i = e[1],
          a = e[2],
          o = e[3],
          u = e[4],
          s = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = e[9],
          d = e[10],
          p = e[11],
          m = e[12],
          y = e[13],
          E = e[14],
          v = e[15],
          _ = t[0],
          T = t[1],
          g = t[2],
          R = t[3],
          A = t[4],
          S = t[5],
          w = t[6],
          O = t[7],
          I = t[8],
          x = t[9],
          N = t[10],
          M = t[11],
          C = t[12],
          P = t[13],
          b = t[14],
          D = t[15],
          U = r * _ + u * T + f * g + m * R,
          L = i * _ + s * T + h * g + y * R,
          F = a * _ + c * T + d * g + E * R,
          B = o * _ + l * T + p * g + v * R,
          z = r * A + u * S + f * w + m * O,
          q = i * A + s * S + h * w + y * O,
          G = a * A + c * S + d * w + E * O,
          V = o * A + l * S + p * w + v * O,
          W = r * I + u * x + f * N + m * M,
          X = i * I + s * x + h * N + y * M,
          k = a * I + c * x + d * N + E * M,
          H = o * I + l * x + p * N + v * M,
          Y = r * C + u * P + f * b + m * D,
          j = i * C + s * P + h * b + y * D,
          Z = a * C + c * P + d * b + E * D,
          K = o * C + l * P + p * b + v * D;
      return n[0] = U, n[1] = L, n[2] = F, n[3] = B, n[4] = z, n[5] = q, n[6] = G, n[7] = V, n[8] = W, n[9] = X, n[10] = k, n[11] = H, n[12] = Y, n[13] = j, n[14] = Z, n[15] = K, n;
    }, l.add = function (e, t, n) {
      return n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n[4] = e[4] + t[4], n[5] = e[5] + t[5], n[6] = e[6] + t[6], n[7] = e[7] + t[7], n[8] = e[8] + t[8], n[9] = e[9] + t[9], n[10] = e[10] + t[10], n[11] = e[11] + t[11], n[12] = e[12] + t[12], n[13] = e[13] + t[13], n[14] = e[14] + t[14], n[15] = e[15] + t[15], n;
    }, l.subtract = function (e, t, n) {
      return n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n[4] = e[4] - t[4], n[5] = e[5] - t[5], n[6] = e[6] - t[6], n[7] = e[7] - t[7], n[8] = e[8] - t[8], n[9] = e[9] - t[9], n[10] = e[10] - t[10], n[11] = e[11] - t[11], n[12] = e[12] - t[12], n[13] = e[13] - t[13], n[14] = e[14] - t[14], n[15] = e[15] - t[15], n;
    }, l.multiplyTransformation = function (e, t, n) {
      var r = e[0],
          i = e[1],
          a = e[2],
          o = e[4],
          u = e[5],
          s = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = e[12],
          d = e[13],
          p = e[14],
          m = t[0],
          y = t[1],
          E = t[2],
          v = t[4],
          _ = t[5],
          T = t[6],
          g = t[8],
          R = t[9],
          A = t[10],
          S = t[12],
          w = t[13],
          O = t[14],
          I = r * m + o * y + c * E,
          x = i * m + u * y + l * E,
          N = a * m + s * y + f * E,
          M = r * v + o * _ + c * T,
          C = i * v + u * _ + l * T,
          P = a * v + s * _ + f * T,
          b = r * g + o * R + c * A,
          D = i * g + u * R + l * A,
          U = a * g + s * R + f * A,
          L = r * S + o * w + c * O + h,
          F = i * S + u * w + l * O + d,
          B = a * S + s * w + f * O + p;
      return n[0] = I, n[1] = x, n[2] = N, n[3] = 0, n[4] = M, n[5] = C, n[6] = P, n[7] = 0, n[8] = b, n[9] = D, n[10] = U, n[11] = 0, n[12] = L, n[13] = F, n[14] = B, n[15] = 1, n;
    }, l.multiplyByMatrix3 = function (e, t, n) {
      var r = e[0],
          i = e[1],
          a = e[2],
          o = e[4],
          u = e[5],
          s = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = t[0],
          d = t[1],
          p = t[2],
          m = t[3],
          y = t[4],
          E = t[5],
          v = t[6],
          _ = t[7],
          T = t[8],
          g = r * h + o * d + c * p,
          R = i * h + u * d + l * p,
          A = a * h + s * d + f * p,
          S = r * m + o * y + c * E,
          w = i * m + u * y + l * E,
          O = a * m + s * y + f * E,
          I = r * v + o * _ + c * T,
          x = i * v + u * _ + l * T,
          N = a * v + s * _ + f * T;
      return n[0] = g, n[1] = R, n[2] = A, n[3] = 0, n[4] = S, n[5] = w, n[6] = O, n[7] = 0, n[8] = I, n[9] = x, n[10] = N, n[11] = 0, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15], n;
    }, l.multiplyByTranslation = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z,
          o = r * e[0] + i * e[4] + a * e[8] + e[12],
          u = r * e[1] + i * e[5] + a * e[9] + e[13],
          s = r * e[2] + i * e[6] + a * e[10] + e[14];
      return n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = o, n[13] = u, n[14] = s, n[15] = e[15], n;
    };
    var E = new e();
    l.multiplyByUniformScale = function (e, t, n) {
      return E.x = t, E.y = t, E.z = t, l.multiplyByScale(e, E, n);
    }, l.multiplyByScale = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z;
      return 1 === r && 1 === i && 1 === a ? l.clone(e, n) : (n[0] = r * e[0], n[1] = r * e[1], n[2] = r * e[2], n[3] = 0, n[4] = i * e[4], n[5] = i * e[5], n[6] = i * e[6], n[7] = 0, n[8] = a * e[8], n[9] = a * e[9], n[10] = a * e[10], n[11] = 0, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = 1, n);
    }, l.multiplyByVector = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z,
          o = t.w,
          u = e[0] * r + e[4] * i + e[8] * a + e[12] * o,
          s = e[1] * r + e[5] * i + e[9] * a + e[13] * o,
          c = e[2] * r + e[6] * i + e[10] * a + e[14] * o,
          l = e[3] * r + e[7] * i + e[11] * a + e[15] * o;
      return n.x = u, n.y = s, n.z = c, n.w = l, n;
    }, l.multiplyByPointAsVector = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z,
          o = e[0] * r + e[4] * i + e[8] * a,
          u = e[1] * r + e[5] * i + e[9] * a,
          s = e[2] * r + e[6] * i + e[10] * a;
      return n.x = o, n.y = u, n.z = s, n;
    }, l.multiplyByPoint = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z,
          o = e[0] * r + e[4] * i + e[8] * a + e[12],
          u = e[1] * r + e[5] * i + e[9] * a + e[13],
          s = e[2] * r + e[6] * i + e[10] * a + e[14];
      return n.x = o, n.y = u, n.z = s, n;
    }, l.multiplyByScalar = function (e, t, n) {
      return n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n[4] = e[4] * t, n[5] = e[5] * t, n[6] = e[6] * t, n[7] = e[7] * t, n[8] = e[8] * t, n[9] = e[9] * t, n[10] = e[10] * t, n[11] = e[11] * t, n[12] = e[12] * t, n[13] = e[13] * t, n[14] = e[14] * t, n[15] = e[15] * t, n;
    }, l.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t;
    }, l.transpose = function (e, t) {
      var n = e[1],
          r = e[2],
          i = e[3],
          a = e[6],
          o = e[7],
          u = e[11];
      return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = n, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = r, t[9] = a, t[10] = e[10], t[11] = e[14], t[12] = i, t[13] = o, t[14] = u, t[15] = e[15], t;
    }, l.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t[9] = Math.abs(e[9]), t[10] = Math.abs(e[10]), t[11] = Math.abs(e[11]), t[12] = Math.abs(e[12]), t[13] = Math.abs(e[13]), t[14] = Math.abs(e[14]), t[15] = Math.abs(e[15]), t;
    }, l.equals = function (e, t) {
      return e === t || i(e) && i(t) && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[3] === t[3] && e[7] === t[7] && e[11] === t[11] && e[15] === t[15];
    }, l.equalsEpsilon = function (e, t, n) {
      return e === t || i(e) && i(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n && Math.abs(e[4] - t[4]) <= n && Math.abs(e[5] - t[5]) <= n && Math.abs(e[6] - t[6]) <= n && Math.abs(e[7] - t[7]) <= n && Math.abs(e[8] - t[8]) <= n && Math.abs(e[9] - t[9]) <= n && Math.abs(e[10] - t[10]) <= n && Math.abs(e[11] - t[11]) <= n && Math.abs(e[12] - t[12]) <= n && Math.abs(e[13] - t[13]) <= n && Math.abs(e[14] - t[14]) <= n && Math.abs(e[15] - t[15]) <= n;
    }, l.getTranslation = function (e, t) {
      return t.x = e[12], t.y = e[13], t.z = e[14], t;
    }, l.getRotation = function (e, t) {
      return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t;
    };

    var v = new s(),
        _ = new s(),
        T = new t(),
        g = new t(0, 0, 0, 1);

    return l.inverse = function (e, n) {
      var r = e[0],
          i = e[4],
          a = e[8],
          o = e[12],
          f = e[1],
          h = e[5],
          d = e[9],
          p = e[13],
          m = e[2],
          y = e[6],
          E = e[10],
          R = e[14],
          A = e[3],
          S = e[7],
          w = e[11],
          O = e[15],
          I = E * O,
          x = R * w,
          N = y * O,
          M = R * S,
          C = y * w,
          P = E * S,
          b = m * O,
          D = R * A,
          U = m * w,
          L = E * A,
          F = m * S,
          B = y * A,
          z = I * h + M * d + C * p - (x * h + N * d + P * p),
          q = x * f + b * d + L * p - (I * f + D * d + U * p),
          G = N * f + D * h + F * p - (M * f + b * h + B * p),
          V = P * f + U * h + B * d - (C * f + L * h + F * d),
          W = x * i + N * a + P * o - (I * i + M * a + C * o),
          X = I * r + D * a + U * o - (x * r + b * a + L * o),
          k = M * r + b * i + B * o - (N * r + D * i + F * o),
          H = C * r + L * i + F * a - (P * r + U * i + B * a);
      I = a * p, x = o * d, N = i * p, M = o * h, C = i * d, P = a * h, b = r * p, D = o * f, U = r * d, L = a * f, F = r * h, B = i * f;
      var Y = I * S + M * w + C * O - (x * S + N * w + P * O),
          j = x * A + b * w + L * O - (I * A + D * w + U * O),
          Z = N * A + D * S + F * O - (M * A + b * S + B * O),
          K = P * A + U * S + B * w - (C * A + L * S + F * w),
          J = N * E + P * R + x * y - (C * R + I * y + M * E),
          Q = U * R + I * m + D * E - (b * E + L * R + x * m),
          $ = b * y + B * R + M * m - (F * R + N * m + D * y),
          ee = F * E + C * m + L * y - (U * y + B * E + P * m),
          te = r * z + i * q + a * G + o * V;

      if (Math.abs(te) < u.EPSILON21) {
        if (s.equalsEpsilon(l.getRotation(e, v), _, u.EPSILON7) && t.equals(l.getRow(e, 3, T), g)) return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 0, n[11] = 0, n[12] = -e[12], n[13] = -e[13], n[14] = -e[14], n[15] = 1, n;
        throw new c("matrix is not invertible because its determinate is zero.");
      }

      return te = 1 / te, n[0] = z * te, n[1] = q * te, n[2] = G * te, n[3] = V * te, n[4] = W * te, n[5] = X * te, n[6] = k * te, n[7] = H * te, n[8] = Y * te, n[9] = j * te, n[10] = Z * te, n[11] = K * te, n[12] = J * te, n[13] = Q * te, n[14] = $ * te, n[15] = ee * te, n;
    }, l.inverseTransformation = function (e, t) {
      var n = e[0],
          r = e[1],
          i = e[2],
          a = e[4],
          o = e[5],
          u = e[6],
          s = e[8],
          c = e[9],
          l = e[10],
          f = e[12],
          h = e[13],
          d = e[14],
          p = -n * f - r * h - i * d,
          m = -a * f - o * h - u * d,
          y = -s * f - c * h - l * d;
      return t[0] = n, t[1] = a, t[2] = s, t[3] = 0, t[4] = r, t[5] = o, t[6] = c, t[7] = 0, t[8] = i, t[9] = u, t[10] = l, t[11] = 0, t[12] = p, t[13] = m, t[14] = y, t[15] = 1, t;
    }, l.IDENTITY = o(new l(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), l.ZERO = o(new l(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)), l.COLUMN0ROW0 = 0, l.COLUMN0ROW1 = 1, l.COLUMN0ROW2 = 2, l.COLUMN0ROW3 = 3, l.COLUMN1ROW0 = 4, l.COLUMN1ROW1 = 5, l.COLUMN1ROW2 = 6, l.COLUMN1ROW3 = 7, l.COLUMN2ROW0 = 8, l.COLUMN2ROW1 = 9, l.COLUMN2ROW2 = 10, l.COLUMN2ROW3 = 11, l.COLUMN3ROW0 = 12, l.COLUMN3ROW1 = 13, l.COLUMN3ROW2 = 14, l.COLUMN3ROW3 = 15, a(l.prototype, {
      length: {
        get: function get() {
          return l.packedLength;
        }
      }
    }), l.prototype.clone = function (e) {
      return l.clone(this, e);
    }, l.prototype.equals = function (e) {
      return l.equals(this, e);
    }, l.equalsArray = function (e, t, n) {
      return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3] && e[4] === t[n + 4] && e[5] === t[n + 5] && e[6] === t[n + 6] && e[7] === t[n + 7] && e[8] === t[n + 8] && e[9] === t[n + 9] && e[10] === t[n + 10] && e[11] === t[n + 11] && e[12] === t[n + 12] && e[13] === t[n + 13] && e[14] === t[n + 14] && e[15] === t[n + 15];
    }, l.prototype.equalsEpsilon = function (e, t) {
      return l.equalsEpsilon(this, e, t);
    }, l.prototype.toString = function () {
      return "(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")";
    }, l;
  }), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (e, t, n, r, i, a, o, u, s, c, l, f, h) {
    "use strict";

    function d(t, n) {
      this.center = e.clone(r(t, e.ZERO)), this.radius = r(n, 0);
    }

    var p = new e(),
        m = new e(),
        y = new e(),
        E = new e(),
        v = new e(),
        _ = new e(),
        T = new e(),
        g = new e(),
        R = new e(),
        A = new e(),
        S = new e(),
        w = new e(),
        O = 4 / 3 * c.PI;

    d.fromPoints = function (t, n) {
      if (i(n) || (n = new d()), !i(t) || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
      var r,
          a = e.clone(t[0], T),
          o = e.clone(a, p),
          u = e.clone(a, m),
          s = e.clone(a, y),
          c = e.clone(a, E),
          l = e.clone(a, v),
          f = e.clone(a, _),
          h = t.length;

      for (r = 1; r < h; r++) {
        e.clone(t[r], a);
        var O = a.x,
            I = a.y,
            x = a.z;
        O < o.x && e.clone(a, o), O > c.x && e.clone(a, c), I < u.y && e.clone(a, u), I > l.y && e.clone(a, l), x < s.z && e.clone(a, s), x > f.z && e.clone(a, f);
      }

      var N = e.magnitudeSquared(e.subtract(c, o, g)),
          M = e.magnitudeSquared(e.subtract(l, u, g)),
          C = e.magnitudeSquared(e.subtract(f, s, g)),
          P = o,
          b = c,
          D = N;
      M > D && (D = M, P = u, b = l), C > D && (D = C, P = s, b = f);
      var U = R;
      U.x = .5 * (P.x + b.x), U.y = .5 * (P.y + b.y), U.z = .5 * (P.z + b.z);
      var L = e.magnitudeSquared(e.subtract(b, U, g)),
          F = Math.sqrt(L),
          B = A;
      B.x = o.x, B.y = u.y, B.z = s.z;
      var z = S;
      z.x = c.x, z.y = l.y, z.z = f.z;
      var q = e.midpoint(B, z, w),
          G = 0;

      for (r = 0; r < h; r++) {
        e.clone(t[r], a);
        var V = e.magnitude(e.subtract(a, q, g));
        V > G && (G = V);
        var W = e.magnitudeSquared(e.subtract(a, U, g));

        if (W > L) {
          var X = Math.sqrt(W);
          F = .5 * (F + X), L = F * F;
          var k = X - F;
          U.x = (F * U.x + k * a.x) / X, U.y = (F * U.y + k * a.y) / X, U.z = (F * U.z + k * a.z) / X;
        }
      }

      return F < G ? (e.clone(U, n.center), n.radius = F) : (e.clone(q, n.center), n.radius = G), n;
    };

    var I = new o(),
        x = new e(),
        N = new e(),
        M = new t(),
        C = new t();
    d.fromRectangle2D = function (e, t, n) {
      return d.fromRectangleWithHeights2D(e, t, 0, 0, n);
    }, d.fromRectangleWithHeights2D = function (t, n, a, o, u) {
      if (i(u) || (u = new d()), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
      n = r(n, I), h.southwest(t, M), M.height = a, h.northeast(t, C), C.height = o;
      var s = n.project(M, x),
          c = n.project(C, N),
          l = c.x - s.x,
          f = c.y - s.y,
          p = c.z - s.z;
      u.radius = .5 * Math.sqrt(l * l + f * f + p * p);
      var m = u.center;
      return m.x = s.x + .5 * l, m.y = s.y + .5 * f, m.z = s.z + .5 * p, u;
    };
    var P = [];
    d.fromRectangle3D = function (t, n, o, u) {
      if (n = r(n, a.WGS84), o = r(o, 0), i(u) || (u = new d()), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
      var s = h.subsample(t, n, o, P);
      return d.fromPoints(s, u);
    }, d.fromVertices = function (t, n, a, o) {
      if (i(o) || (o = new d()), !i(t) || 0 === t.length) return o.center = e.clone(e.ZERO, o.center), o.radius = 0, o;
      n = r(n, e.ZERO), a = r(a, 3);
      var u = T;
      u.x = t[0] + n.x, u.y = t[1] + n.y, u.z = t[2] + n.z;
      var s,
          c = e.clone(u, p),
          l = e.clone(u, m),
          f = e.clone(u, y),
          h = e.clone(u, E),
          O = e.clone(u, v),
          I = e.clone(u, _),
          x = t.length;

      for (s = 0; s < x; s += a) {
        var N = t[s] + n.x,
            M = t[s + 1] + n.y,
            C = t[s + 2] + n.z;
        u.x = N, u.y = M, u.z = C, N < c.x && e.clone(u, c), N > h.x && e.clone(u, h), M < l.y && e.clone(u, l), M > O.y && e.clone(u, O), C < f.z && e.clone(u, f), C > I.z && e.clone(u, I);
      }

      var P = e.magnitudeSquared(e.subtract(h, c, g)),
          b = e.magnitudeSquared(e.subtract(O, l, g)),
          D = e.magnitudeSquared(e.subtract(I, f, g)),
          U = c,
          L = h,
          F = P;
      b > F && (F = b, U = l, L = O), D > F && (F = D, U = f, L = I);
      var B = R;
      B.x = .5 * (U.x + L.x), B.y = .5 * (U.y + L.y), B.z = .5 * (U.z + L.z);
      var z = e.magnitudeSquared(e.subtract(L, B, g)),
          q = Math.sqrt(z),
          G = A;
      G.x = c.x, G.y = l.y, G.z = f.z;
      var V = S;
      V.x = h.x, V.y = O.y, V.z = I.z;
      var W = e.midpoint(G, V, w),
          X = 0;

      for (s = 0; s < x; s += a) {
        u.x = t[s] + n.x, u.y = t[s + 1] + n.y, u.z = t[s + 2] + n.z;
        var k = e.magnitude(e.subtract(u, W, g));
        k > X && (X = k);
        var H = e.magnitudeSquared(e.subtract(u, B, g));

        if (H > z) {
          var Y = Math.sqrt(H);
          q = .5 * (q + Y), z = q * q;
          var j = Y - q;
          B.x = (q * B.x + j * u.x) / Y, B.y = (q * B.y + j * u.y) / Y, B.z = (q * B.z + j * u.z) / Y;
        }
      }

      return q < X ? (e.clone(B, o.center), o.radius = q) : (e.clone(W, o.center), o.radius = X), o;
    }, d.fromEncodedCartesianVertices = function (t, n, r) {
      if (i(r) || (r = new d()), !i(t) || !i(n) || t.length !== n.length || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var a = T;
      a.x = t[0] + n[0], a.y = t[1] + n[1], a.z = t[2] + n[2];
      var o,
          u = e.clone(a, p),
          s = e.clone(a, m),
          c = e.clone(a, y),
          l = e.clone(a, E),
          f = e.clone(a, v),
          h = e.clone(a, _),
          O = t.length;

      for (o = 0; o < O; o += 3) {
        var I = t[o] + n[o],
            x = t[o + 1] + n[o + 1],
            N = t[o + 2] + n[o + 2];
        a.x = I, a.y = x, a.z = N, I < u.x && e.clone(a, u), I > l.x && e.clone(a, l), x < s.y && e.clone(a, s), x > f.y && e.clone(a, f), N < c.z && e.clone(a, c), N > h.z && e.clone(a, h);
      }

      var M = e.magnitudeSquared(e.subtract(l, u, g)),
          C = e.magnitudeSquared(e.subtract(f, s, g)),
          P = e.magnitudeSquared(e.subtract(h, c, g)),
          b = u,
          D = l,
          U = M;
      C > U && (U = C, b = s, D = f), P > U && (U = P, b = c, D = h);
      var L = R;
      L.x = .5 * (b.x + D.x), L.y = .5 * (b.y + D.y), L.z = .5 * (b.z + D.z);
      var F = e.magnitudeSquared(e.subtract(D, L, g)),
          B = Math.sqrt(F),
          z = A;
      z.x = u.x, z.y = s.y, z.z = c.z;
      var q = S;
      q.x = l.x, q.y = f.y, q.z = h.z;
      var G = e.midpoint(z, q, w),
          V = 0;

      for (o = 0; o < O; o += 3) {
        a.x = t[o] + n[o], a.y = t[o + 1] + n[o + 1], a.z = t[o + 2] + n[o + 2];
        var W = e.magnitude(e.subtract(a, G, g));
        W > V && (V = W);
        var X = e.magnitudeSquared(e.subtract(a, L, g));

        if (X > F) {
          var k = Math.sqrt(X);
          B = .5 * (B + k), F = B * B;
          var H = k - B;
          L.x = (B * L.x + H * a.x) / k, L.y = (B * L.y + H * a.y) / k, L.z = (B * L.z + H * a.z) / k;
        }
      }

      return B < V ? (e.clone(L, r.center), r.radius = B) : (e.clone(G, r.center), r.radius = V), r;
    }, d.fromCornerPoints = function (t, n, r) {
      i(r) || (r = new d());
      var a = e.midpoint(t, n, r.center);
      return r.radius = e.distance(a, n), r;
    }, d.fromEllipsoid = function (t, n) {
      return i(n) || (n = new d()), e.clone(e.ZERO, n.center), n.radius = t.maximumRadius, n;
    };
    var b = new e();

    d.fromBoundingSpheres = function (t, n) {
      if (i(n) || (n = new d()), !i(t) || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
      var r = t.length;
      if (1 === r) return d.clone(t[0], n);
      if (2 === r) return d.union(t[0], t[1], n);
      var a,
          o = [];

      for (a = 0; a < r; a++) {
        o.push(t[a].center);
      }

      n = d.fromPoints(o, n);
      var u = n.center,
          s = n.radius;

      for (a = 0; a < r; a++) {
        var c = t[a];
        s = Math.max(s, e.distance(u, c.center, b) + c.radius);
      }

      return n.radius = s, n;
    };

    var D = new e(),
        U = new e(),
        L = new e();
    d.fromOrientedBoundingBox = function (t, n) {
      i(n) || (n = new d());
      var r = t.halfAxes,
          a = l.getColumn(r, 0, D),
          o = l.getColumn(r, 1, U),
          u = l.getColumn(r, 2, L);
      return e.add(a, o, a), e.add(a, u, a), n.center = e.clone(t.center, n.center), n.radius = e.magnitude(a), n;
    }, d.clone = function (t, n) {
      if (i(t)) return i(n) ? (n.center = e.clone(t.center, n.center), n.radius = t.radius, n) : new d(t.center, t.radius);
    }, d.packedLength = 4, d.pack = function (e, t, n) {
      n = r(n, 0);
      var i = e.center;
      return t[n++] = i.x, t[n++] = i.y, t[n++] = i.z, t[n] = e.radius, t;
    }, d.unpack = function (e, t, n) {
      t = r(t, 0), i(n) || (n = new d());
      var a = n.center;
      return a.x = e[t++], a.y = e[t++], a.z = e[t++], n.radius = e[t], n;
    };
    var F = new e(),
        B = new e();

    d.union = function (t, n, r) {
      i(r) || (r = new d());
      var a = t.center,
          o = t.radius,
          u = n.center,
          s = n.radius,
          c = e.subtract(u, a, F),
          l = e.magnitude(c);
      if (o >= l + s) return t.clone(r), r;
      if (s >= l + o) return n.clone(r), r;
      var f = .5 * (o + l + s),
          h = e.multiplyByScalar(c, (-o + f) / l, B);
      return e.add(h, a, h), e.clone(h, r.center), r.radius = f, r;
    };

    var z = new e();
    d.expand = function (t, n, r) {
      r = d.clone(t, r);
      var i = e.magnitude(e.subtract(n, r.center, z));
      return i > r.radius && (r.radius = i), r;
    }, d.intersectPlane = function (t, n) {
      var r = t.center,
          i = t.radius,
          a = n.normal,
          o = e.dot(a, r) + n.distance;
      return o < -i ? u.OUTSIDE : o < i ? u.INTERSECTING : u.INSIDE;
    }, d.transform = function (e, t, n) {
      return i(n) || (n = new d()), n.center = f.multiplyByPoint(t, e.center, n.center), n.radius = f.getMaximumScale(t) * e.radius, n;
    };
    var q = new e();
    d.distanceSquaredTo = function (t, n) {
      var r = e.subtract(t.center, n, q);
      return e.magnitudeSquared(r) - t.radius * t.radius;
    }, d.transformWithoutScale = function (e, t, n) {
      return i(n) || (n = new d()), n.center = f.multiplyByPoint(t, e.center, n.center), n.radius = e.radius, n;
    };
    var G = new e();

    d.computePlaneDistances = function (t, n, r, a) {
      i(a) || (a = new s());
      var o = e.subtract(t.center, n, G),
          u = e.dot(r, o);
      return a.start = u - t.radius, a.stop = u + t.radius, a;
    };

    for (var V = new e(), W = new e(), X = new e(), k = new e(), H = new e(), Y = new t(), j = new Array(8), Z = 0; Z < 8; ++Z) {
      j[Z] = new e();
    }

    var K = new o();
    return d.projectTo2D = function (t, n, i) {
      n = r(n, K);
      var a = n.ellipsoid,
          o = t.center,
          u = t.radius,
          s = a.geodeticSurfaceNormal(o, V),
          c = e.cross(e.UNIT_Z, s, W);
      e.normalize(c, c);
      var l = e.cross(s, c, X);
      e.normalize(l, l), e.multiplyByScalar(s, u, s), e.multiplyByScalar(l, u, l), e.multiplyByScalar(c, u, c);
      var f = e.negate(l, H),
          h = e.negate(c, k),
          p = j,
          m = p[0];
      e.add(s, l, m), e.add(m, c, m), m = p[1], e.add(s, l, m), e.add(m, h, m), m = p[2], e.add(s, f, m), e.add(m, h, m), m = p[3], e.add(s, f, m), e.add(m, c, m), e.negate(s, s), m = p[4], e.add(s, l, m), e.add(m, c, m), m = p[5], e.add(s, l, m), e.add(m, h, m), m = p[6], e.add(s, f, m), e.add(m, h, m), m = p[7], e.add(s, f, m), e.add(m, c, m);

      for (var y = p.length, E = 0; E < y; ++E) {
        var v = p[E];
        e.add(o, v, v);

        var _ = a.cartesianToCartographic(v, Y);

        n.project(_, v);
      }

      i = d.fromPoints(p, i), o = i.center;
      var T = o.x,
          g = o.y,
          R = o.z;
      return o.x = R, o.y = T, o.z = g, i;
    }, d.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e);
    }, d.equals = function (t, n) {
      return t === n || i(t) && i(n) && e.equals(t.center, n.center) && t.radius === n.radius;
    }, d.prototype.intersectPlane = function (e) {
      return d.intersectPlane(this, e);
    }, d.prototype.distanceSquaredTo = function (e) {
      return d.distanceSquaredTo(this, e);
    }, d.prototype.computePlaneDistances = function (e, t, n) {
      return d.computePlaneDistances(this, e, t, n);
    }, d.prototype.isOccluded = function (e) {
      return d.isOccluded(this, e);
    }, d.prototype.equals = function (e) {
      return d.equals(this, e);
    }, d.prototype.clone = function (e) {
      return d.clone(this, e);
    }, d.prototype.volume = function () {
      var e = this.radius;
      return O * e * e * e;
    }, d.prototype.empty = function () {
      return this.radius <= 0;
    }, d;
  }), define("Core/Fullscreen", ["./defined", "./defineProperties"], function (e, t) {
    "use strict";

    var n,
        r = {
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenEnabled: void 0,
      fullscreenElement: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0
    },
        i = {};
    return t(i, {
      element: {
        get: function get() {
          if (i.supportsFullscreen()) return document[r.fullscreenElement];
        }
      },
      changeEventName: {
        get: function get() {
          if (i.supportsFullscreen()) return r.fullscreenchange;
        }
      },
      errorEventName: {
        get: function get() {
          if (i.supportsFullscreen()) return r.fullscreenerror;
        }
      },
      enabled: {
        get: function get() {
          if (i.supportsFullscreen()) return document[r.fullscreenEnabled];
        }
      },
      fullscreen: {
        get: function get() {
          if (i.supportsFullscreen()) return null !== i.element;
        }
      }
    }), i.supportsFullscreen = function () {
      if (e(n)) return n;
      n = !1;
      var t = document.body;
      if ("function" == typeof t.requestFullscreen) return r.requestFullscreen = "requestFullscreen", r.exitFullscreen = "exitFullscreen", r.fullscreenEnabled = "fullscreenEnabled", r.fullscreenElement = "fullscreenElement", r.fullscreenchange = "fullscreenchange", r.fullscreenerror = "fullscreenerror", n = !0;

      for (var i, a = ["webkit", "moz", "o", "ms", "khtml"], o = 0, u = a.length; o < u; ++o) {
        var s = a[o];
        i = s + "RequestFullscreen", "function" == typeof t[i] ? (r.requestFullscreen = i, n = !0) : (i = s + "RequestFullScreen", "function" == typeof t[i] && (r.requestFullscreen = i, n = !0)), i = s + "ExitFullscreen", "function" == typeof document[i] ? r.exitFullscreen = i : (i = s + "CancelFullScreen", "function" == typeof document[i] && (r.exitFullscreen = i)), i = s + "FullscreenEnabled", void 0 !== document[i] ? r.fullscreenEnabled = i : (i = s + "FullScreenEnabled", void 0 !== document[i] && (r.fullscreenEnabled = i)), i = s + "FullscreenElement", void 0 !== document[i] ? r.fullscreenElement = i : (i = s + "FullScreenElement", void 0 !== document[i] && (r.fullscreenElement = i)), i = s + "fullscreenchange", void 0 !== document["on" + i] && ("ms" === s && (i = "MSFullscreenChange"), r.fullscreenchange = i), i = s + "fullscreenerror", void 0 !== document["on" + i] && ("ms" === s && (i = "MSFullscreenError"), r.fullscreenerror = i);
      }

      return n;
    }, i.requestFullscreen = function (e, t) {
      i.supportsFullscreen() && e[r.requestFullscreen]({
        vrDisplay: t
      });
    }, i.exitFullscreen = function () {
      i.supportsFullscreen() && document[r.exitFullscreen]();
    }, i;
  }), function (e) {
    "use strict";

    e("ThirdParty/when", [], function () {
      function e(e, n, r, i) {
        return t(e).then(n, r, i);
      }

      function t(e) {
        var t, n;
        return e instanceof r ? t = e : u(e) ? (n = o(), e.then(function (e) {
          n.resolve(e);
        }, function (e) {
          n.reject(e);
        }, function (e) {
          n.progress(e);
        }), t = n.promise) : t = i(e), t;
      }

      function n(t) {
        return e(t, a);
      }

      function r(e) {
        this.then = e;
      }

      function i(e) {
        return new r(function (n) {
          try {
            return t(n ? n(e) : e);
          } catch (e) {
            return a(e);
          }
        });
      }

      function a(e) {
        return new r(function (n, r) {
          try {
            return r ? t(r(e)) : a(e);
          } catch (e) {
            return a(e);
          }
        });
      }

      function o() {
        function e(e, t, n) {
          return h(e, t, n);
        }

        function n(e) {
          return _p(e);
        }

        function i(e) {
          return _p(a(e));
        }

        function u(e) {
          return d(e);
        }

        var s, c, l, f, h, d, _p;

        return c = new r(e), s = {
          then: e,
          resolve: n,
          reject: i,
          progress: u,
          promise: c,
          resolver: {
            resolve: n,
            reject: i,
            progress: u
          }
        }, l = [], f = [], h = function h(e, t, n) {
          var r, i;
          return r = o(), i = "function" == typeof n ? function (e) {
            try {
              r.progress(n(e));
            } catch (e) {
              r.progress(e);
            }
          } : function (e) {
            r.progress(e);
          }, l.push(function (n) {
            n.then(e, t).then(r.resolve, r.reject, i);
          }), f.push(i), r.promise;
        }, d = function d(e) {
          return m(f, e), e;
        }, _p = function p(e) {
          return e = t(e), h = e.then, _p = t, d = E, m(l, e), f = l = g, e;
        }, s;
      }

      function u(e) {
        return e && "function" == typeof e.then;
      }

      function s(t, n, r, i, a) {
        return y(2, arguments), e(t, function (t) {
          function u(e) {
            _m(e);
          }

          function s(e) {
            _p2(e);
          }

          var c, l, f, h, d, _p2, _m, y, v, _;

          if (v = t.length >>> 0, c = Math.max(0, Math.min(n, v)), f = [], l = v - c + 1, h = [], d = o(), c) for (y = d.progress, _m = function m(e) {
            h.push(e), --l || (_p2 = _m = E, d.reject(h));
          }, _p2 = function p(e) {
            f.push(e), --c || (_p2 = _m = E, d.resolve(f));
          }, _ = 0; _ < v; ++_) {
            _ in t && e(t[_], s, u, y);
          } else d.resolve(f);
          return d.then(r, i, a);
        });
      }

      function c(e, t, n, r) {
        function i(e) {
          return t ? t(e[0]) : e[0];
        }

        return s(e, 1, i, n, r);
      }

      function l(e, t, n, r) {
        return y(1, arguments), h(e, v).then(t, n, r);
      }

      function f() {
        return h(arguments, v);
      }

      function h(t, n) {
        return e(t, function (t) {
          var r, i, a, u, s, c;
          if (a = i = t.length >>> 0, r = [], c = o(), a) for (u = function u(t, i) {
            e(t, n).then(function (e) {
              r[i] = e, --a || c.resolve(r);
            }, c.reject);
          }, s = 0; s < i; s++) {
            s in t ? u(t[s], s) : --a;
          } else c.resolve(r);
          return c.promise;
        });
      }

      function d(t, n) {
        var r = T.call(arguments, 1);
        return e(t, function (t) {
          var i;
          return i = t.length, r[0] = function (t, r, a) {
            return e(t, function (t) {
              return e(r, function (e) {
                return n(t, e, a, i);
              });
            });
          }, _.apply(t, r);
        });
      }

      function p(t, n, r) {
        var i = arguments.length > 2;
        return e(t, function (e) {
          return e = i ? r : e, n.resolve(e), e;
        }, function (e) {
          return n.reject(e), a(e);
        }, n.progress);
      }

      function m(e, t) {
        for (var n, r = 0; n = e[r++];) {
          n(t);
        }
      }

      function y(e, t) {
        for (var n, r = t.length; r > e;) {
          if (null != (n = t[--r]) && "function" != typeof n) throw new Error("arg " + r + " must be a function");
        }
      }

      function E() {}

      function v(e) {
        return e;
      }

      var _, T, g;

      return e.defer = o, e.resolve = t, e.reject = n, e.join = f, e.all = l, e.map = h, e.reduce = d, e.any = c, e.some = s, e.chain = p, e.isPromise = u, r.prototype = {
        always: function always(e, t) {
          return this.then(e, e, t);
        },
        otherwise: function otherwise(e) {
          return this.then(g, e);
        },
        "yield": function _yield(e) {
          return this.then(function () {
            return e;
          });
        },
        spread: function spread(e) {
          return this.then(function (t) {
            return l(t, function (t) {
              return e.apply(g, t);
            });
          });
        }
      }, T = [].slice, _ = [].reduce || function (e) {
        var t, n, r, i, a;
        if (a = 0, t = Object(this), i = t.length >>> 0, n = arguments, n.length <= 1) for (;;) {
          if (a in t) {
            r = t[a++];
            break;
          }

          if (++a >= i) throw new TypeError();
        } else r = n[1];

        for (; a < i; ++a) {
          a in t && (r = e(r, t[a], a, t));
        }

        return r;
      }, e;
    });
  }("function" == typeof define && define.amd ? define : function (e) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : this.when = e();
  }), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Fullscreen", "../ThirdParty/when"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e) {
      for (var t = e.split("."), n = 0, r = t.length; n < r; ++n) {
        t[n] = parseInt(t[n], 10);
      }

      return t;
    }

    function u() {
      if (!t(w) && (w = !1, !m())) {
        var e = / Chrome\/([\.0-9]+)/.exec(S.userAgent);
        null !== e && (w = !0, O = o(e[1]));
      }

      return w;
    }

    function s() {
      return u() && O;
    }

    function c() {
      if (!t(I) && (I = !1, !u() && !m() && / Safari\/[\.0-9]+/.test(S.userAgent))) {
        var e = / Version\/([\.0-9]+)/.exec(S.userAgent);
        null !== e && (I = !0, x = o(e[1]));
      }

      return I;
    }

    function l() {
      return c() && x;
    }

    function f() {
      if (!t(N)) {
        N = !1;
        var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(S.userAgent);
        null !== e && (N = !0, M = o(e[1]), M.isNightly = !!e[2]);
      }

      return N;
    }

    function h() {
      return f() && M;
    }

    function d() {
      if (!t(C)) {
        C = !1;
        var e;
        "Microsoft Internet Explorer" === S.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(S.userAgent)) && (C = !0, P = o(e[1])) : "Netscape" === S.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(S.userAgent)) && (C = !0, P = o(e[1]));
      }

      return C;
    }

    function p() {
      return d() && P;
    }

    function m() {
      if (!t(b)) {
        b = !1;
        var e = / Edge\/([\.0-9]+)/.exec(S.userAgent);
        null !== e && (b = !0, D = o(e[1]));
      }

      return b;
    }

    function y() {
      return m() && D;
    }

    function E() {
      if (!t(U)) {
        U = !1;
        var e = /Firefox\/([\.0-9]+)/.exec(S.userAgent);
        null !== e && (U = !0, L = o(e[1]));
      }

      return U;
    }

    function v() {
      return t(F) || (F = /Windows/i.test(S.appVersion)), F;
    }

    function _() {
      return E() && L;
    }

    function T() {
      return t(B) || (B = !E() && "undefined" != typeof PointerEvent && (!t(S.pointerEnabled) || S.pointerEnabled)), B;
    }

    function g() {
      if (!t(q)) {
        var e = document.createElement("canvas");
        e.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;");
        var n = e.style.imageRendering;
        q = t(n) && "" !== n, q && (z = n);
      }

      return q;
    }

    function R() {
      return g() ? z : void 0;
    }

    function A() {
      return A._result;
    }

    var S;
    S = "undefined" != typeof navigator ? navigator : {};
    var w, O, I, x, N, M, C, P, b, D, U, L, F, B, z, q;
    A._promise = void 0, A._result = void 0, A.initialize = function () {
      if (t(A._promise)) return A._promise;
      var e = a.defer();
      if (A._promise = e.promise, m()) return A._result = !1, e.resolve(A._result), e.promise;
      var n = new Image();
      return n.onload = function () {
        A._result = n.width > 0 && n.height > 0, e.resolve(A._result);
      }, n.onerror = function () {
        A._result = !1, e.resolve(A._result);
      }, n.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.promise;
    }, n(A, {
      initialized: {
        get: function get() {
          return t(A._result);
        }
      }
    });
    var G = [];
    "undefined" != typeof ArrayBuffer && (G.push(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), "undefined" != typeof Uint8ClampedArray && G.push(Uint8ClampedArray), "undefined" != typeof CanvasPixelArray && G.push(CanvasPixelArray));
    var V = {
      isChrome: u,
      chromeVersion: s,
      isSafari: c,
      safariVersion: l,
      isWebkit: f,
      webkitVersion: h,
      isInternetExplorer: d,
      internetExplorerVersion: p,
      isEdge: m,
      edgeVersion: y,
      isFirefox: E,
      firefoxVersion: _,
      isWindows: v,
      hardwareConcurrency: e(S.hardwareConcurrency, 3),
      supportsPointerEvents: T,
      supportsImageRenderingPixelated: g,
      supportsWebP: A,
      imageRenderingValue: R,
      typedArrayTypes: G
    };
    return V.supportsFullscreen = function () {
      return i.supportsFullscreen();
    }, V.supportsTypedArrays = function () {
      return "undefined" != typeof ArrayBuffer;
    }, V.supportsWebWorkers = function () {
      return "undefined" != typeof Worker;
    }, V.supportsWebAssembly = function () {
      return "undefined" != typeof WebAssembly && !V.isEdge();
    }, V;
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
  }), define("Core/ComponentDatatype", ["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function (e, t, n, r, i, a) {
    "use strict";

    if (!r.supportsTypedArrays()) return {};
    var o = {
      BYTE: a.BYTE,
      UNSIGNED_BYTE: a.UNSIGNED_BYTE,
      SHORT: a.SHORT,
      UNSIGNED_SHORT: a.UNSIGNED_SHORT,
      INT: a.INT,
      UNSIGNED_INT: a.UNSIGNED_INT,
      FLOAT: a.FLOAT,
      DOUBLE: a.DOUBLE
    };
    return o.getSizeInBytes = function (e) {
      switch (e) {
        case o.BYTE:
          return Int8Array.BYTES_PER_ELEMENT;

        case o.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT;

        case o.SHORT:
          return Int16Array.BYTES_PER_ELEMENT;

        case o.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT;

        case o.INT:
          return Int32Array.BYTES_PER_ELEMENT;

        case o.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT;

        case o.FLOAT:
          return Float32Array.BYTES_PER_ELEMENT;

        case o.DOUBLE:
          return Float64Array.BYTES_PER_ELEMENT;
      }
    }, o.fromTypedArray = function (e) {
      return e instanceof Int8Array ? o.BYTE : e instanceof Uint8Array ? o.UNSIGNED_BYTE : e instanceof Int16Array ? o.SHORT : e instanceof Uint16Array ? o.UNSIGNED_SHORT : e instanceof Int32Array ? o.INT : e instanceof Uint32Array ? o.UNSIGNED_INT : e instanceof Float32Array ? o.FLOAT : e instanceof Float64Array ? o.DOUBLE : void 0;
    }, o.validate = function (e) {
      return t(e) && (e === o.BYTE || e === o.UNSIGNED_BYTE || e === o.SHORT || e === o.UNSIGNED_SHORT || e === o.INT || e === o.UNSIGNED_INT || e === o.FLOAT || e === o.DOUBLE);
    }, o.createTypedArray = function (e, t) {
      switch (e) {
        case o.BYTE:
          return new Int8Array(t);

        case o.UNSIGNED_BYTE:
          return new Uint8Array(t);

        case o.SHORT:
          return new Int16Array(t);

        case o.UNSIGNED_SHORT:
          return new Uint16Array(t);

        case o.INT:
          return new Int32Array(t);

        case o.UNSIGNED_INT:
          return new Uint32Array(t);

        case o.FLOAT:
          return new Float32Array(t);

        case o.DOUBLE:
          return new Float64Array(t);
      }
    }, o.createArrayBufferView = function (t, n, r, i) {
      switch (r = e(r, 0), i = e(i, (n.byteLength - r) / o.getSizeInBytes(t)), t) {
        case o.BYTE:
          return new Int8Array(n, r, i);

        case o.UNSIGNED_BYTE:
          return new Uint8Array(n, r, i);

        case o.SHORT:
          return new Int16Array(n, r, i);

        case o.UNSIGNED_SHORT:
          return new Uint16Array(n, r, i);

        case o.INT:
          return new Int32Array(n, r, i);

        case o.UNSIGNED_INT:
          return new Uint32Array(n, r, i);

        case o.FLOAT:
          return new Float32Array(n, r, i);

        case o.DOUBLE:
          return new Float64Array(n, r, i);
      }
    }, o.fromName = function (e) {
      switch (e) {
        case "BYTE":
          return o.BYTE;

        case "UNSIGNED_BYTE":
          return o.UNSIGNED_BYTE;

        case "SHORT":
          return o.SHORT;

        case "UNSIGNED_SHORT":
          return o.UNSIGNED_SHORT;

        case "INT":
          return o.INT;

        case "UNSIGNED_INT":
          return o.UNSIGNED_INT;

        case "FLOAT":
          return o.FLOAT;

        case "DOUBLE":
          return o.DOUBLE;
      }
    }, i(o);
  }), define("Core/QuadraticRealPolynomial", ["./DeveloperError", "./Math"], function (e, t) {
    "use strict";

    function n(e, n, r) {
      var i = e + n;
      return t.sign(e) !== t.sign(n) && Math.abs(i / Math.max(Math.abs(e), Math.abs(n))) < r ? 0 : i;
    }

    var r = {};
    return r.computeDiscriminant = function (e, t, n) {
      return t * t - 4 * e * n;
    }, r.computeRealRoots = function (e, r, i) {
      var a;
      if (0 === e) return 0 === r ? [] : [-i / r];

      if (0 === r) {
        if (0 === i) return [0, 0];
        var o = Math.abs(i),
            u = Math.abs(e);
        if (o < u && o / u < t.EPSILON14) return [0, 0];
        if (o > u && u / o < t.EPSILON14) return [];
        if ((a = -i / e) < 0) return [];
        var s = Math.sqrt(a);
        return [-s, s];
      }

      if (0 === i) return a = -r / e, a < 0 ? [a, 0] : [0, a];
      var c = r * r,
          l = 4 * e * i,
          f = n(c, -l, t.EPSILON14);
      if (f < 0) return [];
      var h = -.5 * n(r, t.sign(r) * Math.sqrt(f), t.EPSILON14);
      return r > 0 ? [h / e, i / h] : [i / h, h / e];
    }, r;
  }), define("Core/CubicRealPolynomial", ["./DeveloperError", "./QuadraticRealPolynomial"], function (e, t) {
    "use strict";

    function n(e, t, n, r) {
      var i,
          a,
          o = e,
          u = t / 3,
          s = n / 3,
          c = r,
          l = o * s,
          f = u * c,
          h = u * u,
          d = s * s,
          p = o * s - h,
          m = o * c - u * s,
          y = u * c - d,
          E = 4 * p * y - m * m;

      if (E < 0) {
        var v, _, T;

        h * f >= l * d ? (v = o, _ = p, T = -2 * u * p + o * m) : (v = c, _ = y, T = -c * m + 2 * s * y);
        var g = T < 0 ? -1 : 1,
            R = -g * Math.abs(v) * Math.sqrt(-E);
        a = -T + R;
        var A = a / 2,
            S = A < 0 ? -Math.pow(-A, 1 / 3) : Math.pow(A, 1 / 3),
            w = a === R ? -S : -_ / S;
        return i = _ <= 0 ? S + w : -T / (S * S + w * w + _), h * f >= l * d ? [(i - u) / o] : [-c / (i + s)];
      }

      var O = p,
          I = -2 * u * p + o * m,
          x = y,
          N = -c * m + 2 * s * y,
          M = Math.sqrt(E),
          C = Math.sqrt(3) / 2,
          P = Math.abs(Math.atan2(o * M, -I) / 3);
      i = 2 * Math.sqrt(-O);
      var b = Math.cos(P);
      a = i * b;
      var D = i * (-b / 2 - C * Math.sin(P)),
          U = a + D > 2 * u ? a - u : D - u,
          L = o,
          F = U / L;
      P = Math.abs(Math.atan2(c * M, -N) / 3), i = 2 * Math.sqrt(-x), b = Math.cos(P), a = i * b, D = i * (-b / 2 - C * Math.sin(P));
      var B = -c,
          z = a + D < 2 * s ? a + s : D + s,
          q = B / z,
          G = L * z,
          V = -U * z - L * B,
          W = U * B,
          X = (s * V - u * W) / (-u * V + s * G);
      return F <= X ? F <= q ? X <= q ? [F, X, q] : [F, q, X] : [q, F, X] : F <= q ? [X, F, q] : X <= q ? [X, q, F] : [q, X, F];
    }

    var r = {};
    return r.computeDiscriminant = function (e, t, n, r) {
      var i = e * e,
          a = t * t,
          o = n * n;
      return 18 * e * t * n * r + a * o - 27 * i * (r * r) - 4 * (e * o * n + a * t * r);
    }, r.computeRealRoots = function (e, r, i, a) {
      var o, u;
      if (0 === e) return t.computeRealRoots(r, i, a);

      if (0 === r) {
        if (0 === i) {
          if (0 === a) return [0, 0, 0];
          u = -a / e;
          var s = u < 0 ? -Math.pow(-u, 1 / 3) : Math.pow(u, 1 / 3);
          return [s, s, s];
        }

        return 0 === a ? (o = t.computeRealRoots(e, 0, i), 0 === o.Length ? [0] : [o[0], 0, o[1]]) : n(e, 0, i, a);
      }

      return 0 === i ? 0 === a ? (u = -r / e, u < 0 ? [u, 0, 0] : [0, 0, u]) : n(e, r, 0, a) : 0 === a ? (o = t.computeRealRoots(e, r, i), 0 === o.length ? [0] : o[1] <= 0 ? [o[0], o[1], 0] : o[0] >= 0 ? [0, o[0], o[1]] : [o[0], 0, o[1]]) : n(e, r, i, a);
    }, r;
  }), define("Core/QuarticRealPolynomial", ["./CubicRealPolynomial", "./DeveloperError", "./Math", "./QuadraticRealPolynomial"], function (e, t, n, r) {
    "use strict";

    function i(t, i, a, o) {
      var u = t * t,
          s = i - 3 * u / 8,
          c = a - i * t / 2 + u * t / 8,
          l = o - a * t / 4 + i * u / 16 - 3 * u * u / 256,
          f = e.computeRealRoots(1, 2 * s, s * s - 4 * l, -c * c);

      if (f.length > 0) {
        var h = -t / 4,
            d = f[f.length - 1];

        if (Math.abs(d) < n.EPSILON14) {
          var p = r.computeRealRoots(1, s, l);

          if (2 === p.length) {
            var m,
                y = p[0],
                E = p[1];

            if (y >= 0 && E >= 0) {
              var v = Math.sqrt(y),
                  _ = Math.sqrt(E);

              return [h - _, h - v, h + v, h + _];
            }

            if (y >= 0 && E < 0) return m = Math.sqrt(y), [h - m, h + m];
            if (y < 0 && E >= 0) return m = Math.sqrt(E), [h - m, h + m];
          }

          return [];
        }

        if (d > 0) {
          var T = Math.sqrt(d),
              g = (s + d - c / T) / 2,
              R = (s + d + c / T) / 2,
              A = r.computeRealRoots(1, T, g),
              S = r.computeRealRoots(1, -T, R);
          return 0 !== A.length ? (A[0] += h, A[1] += h, 0 !== S.length ? (S[0] += h, S[1] += h, A[1] <= S[0] ? [A[0], A[1], S[0], S[1]] : S[1] <= A[0] ? [S[0], S[1], A[0], A[1]] : A[0] >= S[0] && A[1] <= S[1] ? [S[0], A[0], A[1], S[1]] : S[0] >= A[0] && S[1] <= A[1] ? [A[0], S[0], S[1], A[1]] : A[0] > S[0] && A[0] < S[1] ? [S[0], A[0], S[1], A[1]] : [A[0], S[0], A[1], S[1]]) : A) : 0 !== S.length ? (S[0] += h, S[1] += h, S) : [];
        }
      }

      return [];
    }

    function a(t, i, a, o) {
      var u = a * a,
          s = i * i,
          c = t * t,
          l = -2 * i,
          f = a * t + s - 4 * o,
          h = c * o - a * i * t + u,
          d = e.computeRealRoots(1, l, f, h);

      if (d.length > 0) {
        var p,
            m,
            y = d[0],
            E = i - y,
            v = E * E,
            _ = t / 2,
            T = E / 2,
            g = v - 4 * o,
            R = v + 4 * Math.abs(o),
            A = c - 4 * y,
            S = c + 4 * Math.abs(y);

        if (y < 0 || g * S < A * R) {
          var w = Math.sqrt(A);
          p = w / 2, m = 0 === w ? 0 : (t * T - a) / w;
        } else {
          var O = Math.sqrt(g);
          p = 0 === O ? 0 : (t * T - a) / O, m = O / 2;
        }

        var I, x;
        0 === _ && 0 === p ? (I = 0, x = 0) : n.sign(_) === n.sign(p) ? (I = _ + p, x = y / I) : (x = _ - p, I = y / x);
        var N, M;
        0 === T && 0 === m ? (N = 0, M = 0) : n.sign(T) === n.sign(m) ? (N = T + m, M = o / N) : (M = T - m, N = o / M);
        var C = r.computeRealRoots(1, I, N),
            P = r.computeRealRoots(1, x, M);
        if (0 !== C.length) return 0 !== P.length ? C[1] <= P[0] ? [C[0], C[1], P[0], P[1]] : P[1] <= C[0] ? [P[0], P[1], C[0], C[1]] : C[0] >= P[0] && C[1] <= P[1] ? [P[0], C[0], C[1], P[1]] : P[0] >= C[0] && P[1] <= C[1] ? [C[0], P[0], P[1], C[1]] : C[0] > P[0] && C[0] < P[1] ? [P[0], C[0], P[1], C[1]] : [C[0], P[0], C[1], P[1]] : C;
        if (0 !== P.length) return P;
      }

      return [];
    }

    var o = {};
    return o.computeDiscriminant = function (e, t, n, r, i) {
      var a = e * e,
          o = a * e,
          u = t * t,
          s = u * t,
          c = n * n,
          l = c * n,
          f = r * r,
          h = f * r,
          d = i * i;
      return u * c * f - 4 * s * h - 4 * e * l * f + 18 * e * t * n * h - 27 * a * f * f + 256 * o * (d * i) + i * (18 * s * n * r - 4 * u * l + 16 * e * c * c - 80 * e * t * c * r - 6 * e * u * f + 144 * a * n * f) + d * (144 * e * u * n - 27 * u * u - 128 * a * c - 192 * a * t * r);
    }, o.computeRealRoots = function (t, r, o, u, s) {
      if (Math.abs(t) < n.EPSILON15) return e.computeRealRoots(r, o, u, s);
      var c = r / t,
          l = o / t,
          f = u / t,
          h = s / t,
          d = c < 0 ? 1 : 0;

      switch (d += l < 0 ? d + 1 : d, d += f < 0 ? d + 1 : d, d += h < 0 ? d + 1 : d) {
        case 0:
          return i(c, l, f, h);

        case 1:
        case 2:
          return a(c, l, f, h);

        case 3:
        case 4:
          return i(c, l, f, h);

        case 5:
          return a(c, l, f, h);

        case 6:
        case 7:
          return i(c, l, f, h);

        case 8:
          return a(c, l, f, h);

        case 9:
        case 10:
          return i(c, l, f, h);

        case 11:
          return a(c, l, f, h);

        case 12:
        case 13:
        case 14:
        case 15:
          return i(c, l, f, h);

        default:
          return;
      }
    }, o;
  }), define("Core/Ray", ["./Cartesian3", "./Check", "./defaultValue", "./defined"], function (e, t, n, r) {
    "use strict";

    function i(t, r) {
      r = e.clone(n(r, e.ZERO)), e.equals(r, e.ZERO) || e.normalize(r, r), this.origin = e.clone(n(t, e.ZERO)), this.direction = r;
    }

    return i.clone = function (t, n) {
      if (r(t)) return r(n) ? (n.origin = e.clone(t.origin), n.direction = e.clone(t.direction), n) : new i(t.origin, t.direction);
    }, i.getPoint = function (t, n, i) {
      return r(i) || (i = new e()), i = e.multiplyByScalar(t.direction, n, i), e.add(t.origin, i, i);
    }, i;
  }), define("Core/IntersectionTests", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Interval", "./Math", "./Matrix3", "./QuadraticRealPolynomial", "./QuarticRealPolynomial", "./Ray"], function (e, t, n, r, i, a, o, u, s, c, l) {
    "use strict";

    function f(e, t, n, r) {
      var i = t * t - 4 * e * n;

      if (!(i < 0)) {
        if (i > 0) {
          var a = 1 / (2 * e),
              o = Math.sqrt(i),
              u = (-t + o) * a,
              s = (-t - o) * a;
          return u < s ? (r.root0 = u, r.root1 = s) : (r.root0 = s, r.root1 = u), r;
        }

        var c = -t / (2 * e);
        if (0 !== c) return r.root0 = r.root1 = c, r;
      }
    }

    function h(t, n, i) {
      r(i) || (i = new a());
      var o = t.origin,
          u = t.direction,
          s = n.center,
          c = n.radius * n.radius,
          l = e.subtract(o, s, v),
          h = e.dot(u, u),
          d = 2 * e.dot(u, l),
          p = e.magnitudeSquared(l) - c,
          m = f(h, d, p, R);
      if (r(m)) return i.start = m.root0, i.stop = m.root1, i;
    }

    function d(e, t, n) {
      var r = e + t;
      return o.sign(e) !== o.sign(t) && Math.abs(r / Math.max(Math.abs(e), Math.abs(t))) < n ? 0 : r;
    }

    function p(t, n, r, i, a) {
      var l,
          f = i * i,
          h = a * a,
          p = (t[u.COLUMN1ROW1] - t[u.COLUMN2ROW2]) * h,
          m = a * (i * d(t[u.COLUMN1ROW0], t[u.COLUMN0ROW1], o.EPSILON15) + n.y),
          y = t[u.COLUMN0ROW0] * f + t[u.COLUMN2ROW2] * h + i * n.x + r,
          E = h * d(t[u.COLUMN2ROW1], t[u.COLUMN1ROW2], o.EPSILON15),
          v = a * (i * d(t[u.COLUMN2ROW0], t[u.COLUMN0ROW2]) + n.z),
          _ = [];

      if (0 === v && 0 === E) {
        if (l = s.computeRealRoots(p, m, y), 0 === l.length) return _;
        var T = l[0],
            g = Math.sqrt(Math.max(1 - T * T, 0));

        if (_.push(new e(i, a * T, a * -g)), _.push(new e(i, a * T, a * g)), 2 === l.length) {
          var R = l[1],
              A = Math.sqrt(Math.max(1 - R * R, 0));
          _.push(new e(i, a * R, a * -A)), _.push(new e(i, a * R, a * A));
        }

        return _;
      }

      var S = v * v,
          w = E * E,
          O = p * p,
          I = v * E,
          x = O + w,
          N = 2 * (m * p + I),
          M = 2 * y * p + m * m - w + S,
          C = 2 * (y * m - I),
          P = y * y - S;
      if (0 === x && 0 === N && 0 === M && 0 === C) return _;
      l = c.computeRealRoots(x, N, M, C, P);
      var b = l.length;
      if (0 === b) return _;

      for (var D = 0; D < b; ++D) {
        var U,
            L = l[D],
            F = L * L,
            B = Math.max(1 - F, 0),
            z = Math.sqrt(B);
        U = o.sign(p) === o.sign(y) ? d(p * F + y, m * L, o.EPSILON12) : o.sign(y) === o.sign(m * L) ? d(p * F, m * L + y, o.EPSILON12) : d(p * F + m * L, y, o.EPSILON12);
        var q = d(E * L, v, o.EPSILON15),
            G = U * q;
        G < 0 ? _.push(new e(i, a * L, a * z)) : G > 0 ? _.push(new e(i, a * L, a * -z)) : 0 !== z ? (_.push(new e(i, a * L, a * -z)), _.push(new e(i, a * L, a * z)), ++D) : _.push(new e(i, a * L, a * z));
      }

      return _;
    }

    var m = {};

    m.rayPlane = function (t, n, i) {
      r(i) || (i = new e());
      var a = t.origin,
          u = t.direction,
          s = n.normal,
          c = e.dot(s, u);

      if (!(Math.abs(c) < o.EPSILON15)) {
        var l = (-n.distance - e.dot(s, a)) / c;
        if (!(l < 0)) return i = e.multiplyByScalar(u, l, i), e.add(a, i, i);
      }
    };

    var y = new e(),
        E = new e(),
        v = new e(),
        _ = new e(),
        T = new e();

    m.rayTriangleParametric = function (t, r, i, a, u) {
      u = n(u, !1);
      var s,
          c,
          l,
          f,
          h,
          d = t.origin,
          p = t.direction,
          m = e.subtract(i, r, y),
          g = e.subtract(a, r, E),
          R = e.cross(p, g, v),
          A = e.dot(m, R);

      if (u) {
        if (A < o.EPSILON6) return;
        if (s = e.subtract(d, r, _), (l = e.dot(s, R)) < 0 || l > A) return;
        if (c = e.cross(s, m, T), (f = e.dot(p, c)) < 0 || l + f > A) return;
        h = e.dot(g, c) / A;
      } else {
        if (Math.abs(A) < o.EPSILON6) return;
        var S = 1 / A;
        if (s = e.subtract(d, r, _), (l = e.dot(s, R) * S) < 0 || l > 1) return;
        if (c = e.cross(s, m, T), (f = e.dot(p, c) * S) < 0 || l + f > 1) return;
        h = e.dot(g, c) * S;
      }

      return h;
    }, m.rayTriangle = function (t, n, i, a, o, u) {
      var s = m.rayTriangleParametric(t, n, i, a, o);
      if (r(s) && !(s < 0)) return r(u) || (u = new e()), e.multiplyByScalar(t.direction, s, u), e.add(t.origin, u, u);
    };
    var g = new l();

    m.lineSegmentTriangle = function (t, n, i, a, o, u, s) {
      var c = g;
      e.clone(t, c.origin), e.subtract(n, t, c.direction), e.normalize(c.direction, c.direction);
      var l = m.rayTriangleParametric(c, i, a, o, u);
      if (!(!r(l) || l < 0 || l > e.distance(t, n))) return r(s) || (s = new e()), e.multiplyByScalar(c.direction, l, s), e.add(c.origin, s, s);
    };

    var R = {
      root0: 0,
      root1: 0
    };

    m.raySphere = function (e, t, n) {
      if (n = h(e, t, n), r(n) && !(n.stop < 0)) return n.start = Math.max(n.start, 0), n;
    };

    var A = new l();

    m.lineSegmentSphere = function (t, n, i, a) {
      var o = A;
      e.clone(t, o.origin);
      var u = e.subtract(n, t, o.direction),
          s = e.magnitude(u);
      if (e.normalize(u, u), a = h(o, i, a), !(!r(a) || a.stop < 0 || a.start > s)) return a.start = Math.max(a.start, 0), a.stop = Math.min(a.stop, s), a;
    };

    var S = new e(),
        w = new e();

    m.rayEllipsoid = function (t, n) {
      var r,
          i,
          o,
          u,
          s,
          c = n.oneOverRadii,
          l = e.multiplyComponents(c, t.origin, S),
          f = e.multiplyComponents(c, t.direction, w),
          h = e.magnitudeSquared(l),
          d = e.dot(l, f);

      if (h > 1) {
        if (d >= 0) return;
        var p = d * d;
        if (r = h - 1, i = e.magnitudeSquared(f), o = i * r, p < o) return;

        if (p > o) {
          u = d * d - o, s = -d + Math.sqrt(u);
          var m = s / i,
              y = r / s;
          return m < y ? new a(m, y) : {
            start: y,
            stop: m
          };
        }

        var E = Math.sqrt(r / i);
        return new a(E, E);
      }

      return h < 1 ? (r = h - 1, i = e.magnitudeSquared(f), o = i * r, u = d * d - o, s = -d + Math.sqrt(u), new a(0, s / i)) : d < 0 ? (i = e.magnitudeSquared(f), new a(0, -d / i)) : void 0;
    };

    var O = new e(),
        I = new e(),
        x = new e(),
        N = new e(),
        M = new e(),
        C = new u(),
        P = new u(),
        b = new u(),
        D = new u(),
        U = new u(),
        L = new u(),
        F = new u(),
        B = new e(),
        z = new e(),
        q = new t();

    m.grazingAltitudeLocation = function (t, n) {
      var i = t.origin,
          a = t.direction;

      if (!e.equals(i, e.ZERO)) {
        var s = n.geodeticSurfaceNormal(i, O);
        if (e.dot(a, s) >= 0) return i;
      }

      var c = r(this.rayEllipsoid(t, n)),
          l = n.transformPositionToScaledSpace(a, O),
          f = e.normalize(l, l),
          h = e.mostOrthogonalAxis(l, N),
          d = e.normalize(e.cross(h, f, I), I),
          m = e.normalize(e.cross(f, d, x), x),
          y = C;
      y[0] = f.x, y[1] = f.y, y[2] = f.z, y[3] = d.x, y[4] = d.y, y[5] = d.z, y[6] = m.x, y[7] = m.y, y[8] = m.z;

      var E = u.transpose(y, P),
          v = u.fromScale(n.radii, b),
          _ = u.fromScale(n.oneOverRadii, D),
          T = U;

      T[0] = 0, T[1] = -a.z, T[2] = a.y, T[3] = a.z, T[4] = 0, T[5] = -a.x, T[6] = -a.y, T[7] = a.x, T[8] = 0;
      var g,
          R,
          A = u.multiply(u.multiply(E, _, L), T, L),
          S = u.multiply(u.multiply(A, v, F), y, F),
          w = u.multiplyByVector(A, i, M),
          G = p(S, e.negate(w, O), 0, 0, 1),
          V = G.length;

      if (V > 0) {
        for (var W = e.clone(e.ZERO, z), X = Number.NEGATIVE_INFINITY, k = 0; k < V; ++k) {
          g = u.multiplyByVector(v, u.multiplyByVector(y, G[k], B), B);
          var H = e.normalize(e.subtract(g, i, N), N),
              Y = e.dot(H, a);
          Y > X && (X = Y, W = e.clone(g, W));
        }

        var j = n.cartesianToCartographic(W, q);
        return X = o.clamp(X, 0, 1), R = e.magnitude(e.subtract(W, i, N)) * Math.sqrt(1 - X * X), R = c ? -R : R, j.height = R, n.cartographicToCartesian(j, new e());
      }
    };

    var G = new e();
    return m.lineSegmentPlane = function (t, n, i, a) {
      r(a) || (a = new e());
      var u = e.subtract(n, t, G),
          s = i.normal,
          c = e.dot(s, u);

      if (!(Math.abs(c) < o.EPSILON6)) {
        var l = e.dot(s, t),
            f = -(i.distance + l) / c;
        if (!(f < 0 || f > 1)) return e.multiplyByScalar(u, f, a), e.add(t, a, a), a;
      }
    }, m.trianglePlaneIntersection = function (t, n, r, i) {
      var a = i.normal,
          o = i.distance,
          u = e.dot(a, t) + o < 0,
          s = e.dot(a, n) + o < 0,
          c = e.dot(a, r) + o < 0,
          l = 0;
      l += u ? 1 : 0, l += s ? 1 : 0, l += c ? 1 : 0;
      var f, h;

      if (1 !== l && 2 !== l || (f = new e(), h = new e()), 1 === l) {
        if (u) return m.lineSegmentPlane(t, n, i, f), m.lineSegmentPlane(t, r, i, h), {
          positions: [t, n, r, f, h],
          indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
        };
        if (s) return m.lineSegmentPlane(n, r, i, f), m.lineSegmentPlane(n, t, i, h), {
          positions: [t, n, r, f, h],
          indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
        };
        if (c) return m.lineSegmentPlane(r, t, i, f), m.lineSegmentPlane(r, n, i, h), {
          positions: [t, n, r, f, h],
          indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
        };
      } else if (2 === l) {
        if (!u) return m.lineSegmentPlane(n, t, i, f), m.lineSegmentPlane(r, t, i, h), {
          positions: [t, n, r, f, h],
          indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
        };
        if (!s) return m.lineSegmentPlane(r, n, i, f), m.lineSegmentPlane(t, n, i, h), {
          positions: [t, n, r, f, h],
          indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
        };
        if (!c) return m.lineSegmentPlane(t, r, i, f), m.lineSegmentPlane(n, r, i, h), {
          positions: [t, n, r, f, h],
          indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
        };
      }
    }, m;
  }), define("Core/AxisAlignedBoundingBox", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./Intersect"], function (e, t, n, r, i) {
    "use strict";

    function a(t, i, a) {
      this.minimum = e.clone(n(t, e.ZERO)), this.maximum = e.clone(n(i, e.ZERO)), a = r(a) ? e.clone(a) : e.midpoint(this.minimum, this.maximum, new e()), this.center = a;
    }

    a.fromPoints = function (t, n) {
      if (r(n) || (n = new a()), !r(t) || 0 === t.length) return n.minimum = e.clone(e.ZERO, n.minimum), n.maximum = e.clone(e.ZERO, n.maximum), n.center = e.clone(e.ZERO, n.center), n;

      for (var i = t[0].x, o = t[0].y, u = t[0].z, s = t[0].x, c = t[0].y, l = t[0].z, f = t.length, h = 1; h < f; h++) {
        var d = t[h],
            p = d.x,
            m = d.y,
            y = d.z;
        i = Math.min(p, i), s = Math.max(p, s), o = Math.min(m, o), c = Math.max(m, c), u = Math.min(y, u), l = Math.max(y, l);
      }

      var E = n.minimum;
      E.x = i, E.y = o, E.z = u;
      var v = n.maximum;
      return v.x = s, v.y = c, v.z = l, n.center = e.midpoint(E, v, n.center), n;
    }, a.clone = function (t, n) {
      if (r(t)) return r(n) ? (n.minimum = e.clone(t.minimum, n.minimum), n.maximum = e.clone(t.maximum, n.maximum), n.center = e.clone(t.center, n.center), n) : new a(t.minimum, t.maximum, t.center);
    }, a.equals = function (t, n) {
      return t === n || r(t) && r(n) && e.equals(t.center, n.center) && e.equals(t.minimum, n.minimum) && e.equals(t.maximum, n.maximum);
    };
    var o = new e();
    return a.intersectPlane = function (t, n) {
      o = e.subtract(t.maximum, t.minimum, o);
      var r = e.multiplyByScalar(o, .5, o),
          a = n.normal,
          u = r.x * Math.abs(a.x) + r.y * Math.abs(a.y) + r.z * Math.abs(a.z),
          s = e.dot(t.center, a) + n.distance;
      return s - u > 0 ? i.INSIDE : s + u < 0 ? i.OUTSIDE : i.INTERSECTING;
    }, a.prototype.clone = function (e) {
      return a.clone(this, e);
    }, a.prototype.intersectPlane = function (e) {
      return a.intersectPlane(this, e);
    }, a.prototype.equals = function (e) {
      return a.equals(this, e);
    }, a;
  }), define("Core/Plane", ["./Cartesian3", "./Check", "./defined", "./DeveloperError", "./freezeObject", "./Math", "./Matrix4"], function (e, t, n, r, i, a, o) {
    "use strict";

    function u(t, n) {
      this.normal = e.clone(t), this.distance = n;
    }

    u.fromPointNormal = function (t, r, i) {
      var a = -e.dot(r, t);
      return n(i) ? (e.clone(r, i.normal), i.distance = a, i) : new u(r, a);
    };

    var s = new e();
    u.fromCartesian4 = function (t, r) {
      var i = e.fromCartesian4(t, s),
          a = t.w;
      return n(r) ? (e.clone(i, r.normal), r.distance = a, r) : new u(i, a);
    }, u.getPointDistance = function (t, n) {
      return e.dot(t.normal, n) + t.distance;
    };
    var c = new e();

    u.projectPointOntoPlane = function (t, r, i) {
      n(i) || (i = new e());
      var a = u.getPointDistance(t, r),
          o = e.multiplyByScalar(t.normal, a, c);
      return e.subtract(r, o, i);
    };

    var l = new e();
    return u.transform = function (t, n, r) {
      return o.multiplyByPointAsVector(n, t.normal, s), e.normalize(s, s), e.multiplyByScalar(t.normal, -t.distance, l), o.multiplyByPoint(n, l, l), u.fromPointNormal(l, s, r);
    }, u.clone = function (t, r) {
      return n(r) ? (e.clone(t.normal, r.normal), r.distance = t.distance, r) : new u(t.normal, t.distance);
    }, u.equals = function (t, n) {
      return t.distance === n.distance && e.equals(t.normal, n.normal);
    }, u.ORIGIN_XY_PLANE = i(new u(e.UNIT_Z, 0)), u.ORIGIN_YZ_PLANE = i(new u(e.UNIT_X, 0)), u.ORIGIN_ZX_PLANE = i(new u(e.UNIT_Y, 0)), u;
  }), define("Core/binarySearch", ["./Check"], function (e) {
    "use strict";

    function t(e, t, n) {
      for (var r, i, a = 0, o = e.length - 1; a <= o;) {
        if (r = ~~((a + o) / 2), (i = n(e[r], t)) < 0) a = r + 1;else {
          if (!(i > 0)) return r;
          o = r - 1;
        }
      }

      return ~(o + 1);
    }

    return t;
  }), define("Core/EarthOrientationParametersSample", [], function () {
    "use strict";

    function e(e, t, n, r, i) {
      this.xPoleWander = e, this.yPoleWander = t, this.xPoleOffset = n, this.yPoleOffset = r, this.ut1MinusUtc = i;
    }

    return e;
  }), define("ThirdParty/sprintf", [], function () {
    function e() {
      var e = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
          t = arguments,
          n = 0,
          r = t[n++],
          i = function i(e, t, n, r) {
        n || (n = " ");
        var i = e.length >= t ? "" : Array(1 + t - e.length >>> 0).join(n);
        return r ? e + i : i + e;
      },
          a = function a(e, t, n, r, _a, o) {
        var u = r - e.length;
        return u > 0 && (e = n || !_a ? i(e, r, o, n) : e.slice(0, t.length) + i("", u, "0", !0) + e.slice(t.length)), e;
      },
          o = function o(e, t, n, r, _o, u, s) {
        var c = e >>> 0;
        return n = n && c && {
          2: "0b",
          8: "0",
          16: "0x"
        }[t] || "", e = n + i(c.toString(t), u || 0, "0", !1), a(e, n, r, _o, s);
      },
          u = function u(e, t, n, r, i, o) {
        return null != r && (e = e.slice(0, r)), a(e, "", t, n, i, o);
      },
          s = function s(e, r, _s, c, l, f, h) {
        var d, p, m, y, E;
        if ("%%" == e) return "%";

        for (var v = !1, _ = "", T = !1, g = !1, R = " ", A = _s.length, S = 0; _s && S < A; S++) {
          switch (_s.charAt(S)) {
            case " ":
              _ = " ";
              break;

            case "+":
              _ = "+";
              break;

            case "-":
              v = !0;
              break;

            case "'":
              R = _s.charAt(S + 1);
              break;

            case "0":
              T = !0;
              break;

            case "#":
              g = !0;
          }
        }

        if (c = c ? "*" == c ? +t[n++] : "*" == c.charAt(0) ? +t[c.slice(1, -1)] : +c : 0, c < 0 && (c = -c, v = !0), !isFinite(c)) throw new Error("sprintf: (minimum-)width must be finite");

        switch (f = f ? "*" == f ? +t[n++] : "*" == f.charAt(0) ? +t[f.slice(1, -1)] : +f : "fFeE".indexOf(h) > -1 ? 6 : "d" == h ? 0 : void 0, E = r ? t[r.slice(0, -1)] : t[n++], h) {
          case "s":
            return u(String(E), v, c, f, T, R);

          case "c":
            return u(String.fromCharCode(+E), v, c, f, T);

          case "b":
            return o(E, 2, g, v, c, f, T);

          case "o":
            return o(E, 8, g, v, c, f, T);

          case "x":
            return o(E, 16, g, v, c, f, T);

          case "X":
            return o(E, 16, g, v, c, f, T).toUpperCase();

          case "u":
            return o(E, 10, g, v, c, f, T);

          case "i":
          case "d":
            return d = +E || 0, d = Math.round(d - d % 1), p = d < 0 ? "-" : _, E = p + i(String(Math.abs(d)), f, "0", !1), a(E, p, v, c, T);

          case "e":
          case "E":
          case "f":
          case "F":
          case "g":
          case "G":
            return d = +E, p = d < 0 ? "-" : _, m = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(h.toLowerCase())], y = ["toString", "toUpperCase"]["eEfFgG".indexOf(h) % 2], E = p + Math.abs(d)[m](f), a(E, p, v, c, T)[y]();

          default:
            return e;
        }
      };

      return r.replace(e, s);
    }

    return e;
  }), define("Core/GregorianDate", [], function () {
    "use strict";

    function e(e, t, n, r, i, a, o, u) {
      this.year = e, this.month = t, this.day = n, this.hour = r, this.minute = i, this.second = a, this.millisecond = o, this.isLeapSecond = u;
    }

    return e;
  }), define("Core/isLeapYear", ["./DeveloperError"], function (e) {
    "use strict";

    function t(e) {
      return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
    }

    return t;
  }), define("Core/LeapSecond", [], function () {
    "use strict";

    function e(e, t) {
      this.julianDate = e, this.offset = t;
    }

    return e;
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
  }), define("Core/JulianDate", ["../ThirdParty/sprintf", "./binarySearch", "./defaultValue", "./defined", "./DeveloperError", "./GregorianDate", "./isLeapYear", "./LeapSecond", "./TimeConstants", "./TimeStandard"], function (e, t, n, r, i, a, o, u, s, c) {
    "use strict";

    function l(e, t) {
      return m.compare(e.julianDate, t.julianDate);
    }

    function f(e) {
      v.julianDate = e;
      var n = m.leapSeconds,
          r = t(n, v, l);
      r < 0 && (r = ~r), r >= n.length && (r = n.length - 1);
      var i = n[r].offset;

      if (r > 0) {
        m.secondsDifference(n[r].julianDate, e) > i && (r--, i = n[r].offset);
      }

      m.addSeconds(e, i, e);
    }

    function h(e, n) {
      v.julianDate = e;
      var r = m.leapSeconds,
          i = t(r, v, l);
      if (i < 0 && (i = ~i), 0 === i) return m.addSeconds(e, -r[0].offset, n);
      if (i >= r.length) return m.addSeconds(e, -r[i - 1].offset, n);
      var a = m.secondsDifference(r[i].julianDate, e);
      return 0 === a ? m.addSeconds(e, -r[i].offset, n) : a <= 1 ? void 0 : m.addSeconds(e, -r[--i].offset, n);
    }

    function d(e, t, n) {
      var r = t / s.SECONDS_PER_DAY | 0;
      return e += r, t -= s.SECONDS_PER_DAY * r, t < 0 && (e--, t += s.SECONDS_PER_DAY), n.dayNumber = e, n.secondsOfDay = t, n;
    }

    function p(e, t, n, r, i, a, o) {
      var u = (t - 14) / 12 | 0,
          c = e + 4800 + u,
          l = (1461 * c / 4 | 0) + (367 * (t - 2 - 12 * u) / 12 | 0) - (3 * ((c + 100) / 100 | 0) / 4 | 0) + n - 32075;
      (r -= 12) < 0 && (r += 24);
      var f = a + (r * s.SECONDS_PER_HOUR + i * s.SECONDS_PER_MINUTE + o * s.SECONDS_PER_MILLISECOND);
      return f >= 43200 && (l -= 1), [l, f];
    }

    function m(e, t, r) {
      this.dayNumber = void 0, this.secondsOfDay = void 0, e = n(e, 0), t = n(t, 0), r = n(r, c.UTC);
      var i = 0 | e;
      t += (e - i) * s.SECONDS_PER_DAY, d(i, t, this), r === c.UTC && f(this);
    }

    var y = new a(),
        E = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        v = new u(),
        _ = /^(\d{4})$/,
        T = /^(\d{4})-(\d{2})$/,
        g = /^(\d{4})-?(\d{3})$/,
        R = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
        A = /^(\d{4})-?(\d{2})-?(\d{2})$/,
        S = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
        w = /^(\d{2})(\.\d+)?/.source + S.source,
        O = /^(\d{2}):?(\d{2})(\.\d+)?/.source + S.source,
        I = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + S.source;
    m.fromGregorianDate = function (e, t) {
      var n = p(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
      return r(t) ? (d(n[0], n[1], t), f(t), t) : new m(n[0], n[1], c.UTC);
    }, m.fromDate = function (e, t) {
      var n = p(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
      return r(t) ? (d(n[0], n[1], t), f(t), t) : new m(n[0], n[1], c.UTC);
    }, m.fromIso8601 = function (e, t) {
      e = e.replace(",", ".");
      var n,
          i,
          a,
          u = e.split("T"),
          s = 1,
          l = 1,
          h = 0,
          y = 0,
          v = 0,
          S = 0,
          x = u[0],
          N = u[1];
      if (null !== (u = x.match(A))) n = +u[1], s = +u[2], l = +u[3];else if (null !== (u = x.match(T))) n = +u[1], s = +u[2];else if (null !== (u = x.match(_))) n = +u[1];else {
        var M;
        if (null !== (u = x.match(g))) n = +u[1], M = +u[2], a = o(n);else if (null !== (u = x.match(R))) {
          n = +u[1];
          var C = +u[2],
              P = +u[3] || 0,
              b = new Date(Date.UTC(n, 0, 4));
          M = 7 * C + P - b.getUTCDay() - 3;
        }
        i = new Date(Date.UTC(n, 0, 1)), i.setUTCDate(M), s = i.getUTCMonth() + 1, l = i.getUTCDate();
      }
      a = o(n);
      var D;

      if (r(N)) {
        u = N.match(I), null !== u ? (h = +u[1], y = +u[2], v = +u[3], S = 1e3 * +(u[4] || 0), D = 5) : (u = N.match(O), null !== u ? (h = +u[1], y = +u[2], v = 60 * +(u[3] || 0), D = 4) : null !== (u = N.match(w)) && (h = +u[1], y = 60 * +(u[2] || 0), D = 3));
        var U = u[D],
            L = +u[D + 1],
            F = +(u[D + 2] || 0);

        switch (U) {
          case "+":
            h -= L, y -= F;
            break;

          case "-":
            h += L, y += F;
            break;

          case "Z":
            break;

          default:
            y += new Date(Date.UTC(n, s - 1, l, h, y)).getTimezoneOffset();
        }
      }

      var B = 60 === v;

      for (B && v--; y >= 60;) {
        y -= 60, h++;
      }

      for (; h >= 24;) {
        h -= 24, l++;
      }

      for (i = a && 2 === s ? 29 : E[s - 1]; l > i;) {
        l -= i, s++, s > 12 && (s -= 12, n++), i = a && 2 === s ? 29 : E[s - 1];
      }

      for (; y < 0;) {
        y += 60, h--;
      }

      for (; h < 0;) {
        h += 24, l--;
      }

      for (; l < 1;) {
        s--, s < 1 && (s += 12, n--), i = a && 2 === s ? 29 : E[s - 1], l += i;
      }

      var z = p(n, s, l, h, y, v, S);
      return r(t) ? (d(z[0], z[1], t), f(t)) : t = new m(z[0], z[1], c.UTC), B && m.addSeconds(t, 1, t), t;
    }, m.now = function (e) {
      return m.fromDate(new Date(), e);
    };
    var x = new m(0, 0, c.TAI);
    return m.toGregorianDate = function (e, t) {
      var n = !1,
          i = h(e, x);
      r(i) || (m.addSeconds(e, -1, x), i = h(x, x), n = !0);
      var o = i.dayNumber,
          u = i.secondsOfDay;
      u >= 43200 && (o += 1);
      var c = o + 68569 | 0,
          l = 4 * c / 146097 | 0;
      c = c - ((146097 * l + 3) / 4 | 0) | 0;
      var f = 4e3 * (c + 1) / 1461001 | 0;
      c = c - (1461 * f / 4 | 0) + 31 | 0;
      var d = 80 * c / 2447 | 0,
          p = c - (2447 * d / 80 | 0) | 0;
      c = d / 11 | 0;

      var y = d + 2 - 12 * c | 0,
          E = 100 * (l - 49) + f + c | 0,
          v = u / s.SECONDS_PER_HOUR | 0,
          _ = u - v * s.SECONDS_PER_HOUR,
          T = _ / s.SECONDS_PER_MINUTE | 0;

      _ -= T * s.SECONDS_PER_MINUTE;
      var g = 0 | _,
          R = (_ - g) / s.SECONDS_PER_MILLISECOND;
      return v += 12, v > 23 && (v -= 24), n && (g += 1), r(t) ? (t.year = E, t.month = y, t.day = p, t.hour = v, t.minute = T, t.second = g, t.millisecond = R, t.isLeapSecond = n, t) : new a(E, y, p, v, T, g, R, n);
    }, m.toDate = function (e) {
      var t = m.toGregorianDate(e, y),
          n = t.second;
      return t.isLeapSecond && (n -= 1), new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, n, t.millisecond));
    }, m.toIso8601 = function (t, n) {
      var i = m.toGregorianDate(t, y),
          a = i.year,
          o = i.month,
          u = i.day,
          s = i.hour,
          c = i.minute,
          l = i.second,
          f = i.millisecond;
      1e4 === a && 1 === o && 1 === u && 0 === s && 0 === c && 0 === l && 0 === f && (a = 9999, o = 12, u = 31, s = 24);
      var h;
      return r(n) || 0 === f ? r(n) && 0 !== n ? (h = (.01 * f).toFixed(n).replace(".", "").slice(0, n), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", a, o, u, s, c, l, h)) : e("%04d-%02d-%02dT%02d:%02d:%02dZ", a, o, u, s, c, l) : (h = (.01 * f).toString().replace(".", ""), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", a, o, u, s, c, l, h));
    }, m.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.dayNumber = e.dayNumber, t.secondsOfDay = e.secondsOfDay, t) : new m(e.dayNumber, e.secondsOfDay, c.TAI);
    }, m.compare = function (e, t) {
      var n = e.dayNumber - t.dayNumber;
      return 0 !== n ? n : e.secondsOfDay - t.secondsOfDay;
    }, m.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
    }, m.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(m.secondsDifference(e, t)) <= n;
    }, m.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / s.SECONDS_PER_DAY;
    }, m.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * s.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
    }, m.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / s.SECONDS_PER_DAY;
    }, m.computeTaiMinusUtc = function (e) {
      v.julianDate = e;
      var n = m.leapSeconds,
          r = t(n, v, l);
      return r < 0 && (r = ~r, --r < 0 && (r = 0)), n[r].offset;
    }, m.addSeconds = function (e, t, n) {
      return d(e.dayNumber, e.secondsOfDay + t, n);
    }, m.addMinutes = function (e, t, n) {
      var r = e.secondsOfDay + t * s.SECONDS_PER_MINUTE;
      return d(e.dayNumber, r, n);
    }, m.addHours = function (e, t, n) {
      var r = e.secondsOfDay + t * s.SECONDS_PER_HOUR;
      return d(e.dayNumber, r, n);
    }, m.addDays = function (e, t, n) {
      return d(e.dayNumber + t, e.secondsOfDay, n);
    }, m.lessThan = function (e, t) {
      return m.compare(e, t) < 0;
    }, m.lessThanOrEquals = function (e, t) {
      return m.compare(e, t) <= 0;
    }, m.greaterThan = function (e, t) {
      return m.compare(e, t) > 0;
    }, m.greaterThanOrEquals = function (e, t) {
      return m.compare(e, t) >= 0;
    }, m.prototype.clone = function (e) {
      return m.clone(this, e);
    }, m.prototype.equals = function (e) {
      return m.equals(this, e);
    }, m.prototype.equalsEpsilon = function (e, t) {
      return m.equalsEpsilon(this, e, t);
    }, m.prototype.toString = function () {
      return m.toIso8601(this);
    }, m.leapSeconds = [new u(new m(2441317, 43210, c.TAI), 10), new u(new m(2441499, 43211, c.TAI), 11), new u(new m(2441683, 43212, c.TAI), 12), new u(new m(2442048, 43213, c.TAI), 13), new u(new m(2442413, 43214, c.TAI), 14), new u(new m(2442778, 43215, c.TAI), 15), new u(new m(2443144, 43216, c.TAI), 16), new u(new m(2443509, 43217, c.TAI), 17), new u(new m(2443874, 43218, c.TAI), 18), new u(new m(2444239, 43219, c.TAI), 19), new u(new m(2444786, 43220, c.TAI), 20), new u(new m(2445151, 43221, c.TAI), 21), new u(new m(2445516, 43222, c.TAI), 22), new u(new m(2446247, 43223, c.TAI), 23), new u(new m(2447161, 43224, c.TAI), 24), new u(new m(2447892, 43225, c.TAI), 25), new u(new m(2448257, 43226, c.TAI), 26), new u(new m(2448804, 43227, c.TAI), 27), new u(new m(2449169, 43228, c.TAI), 28), new u(new m(2449534, 43229, c.TAI), 29), new u(new m(2450083, 43230, c.TAI), 30), new u(new m(2450630, 43231, c.TAI), 31), new u(new m(2451179, 43232, c.TAI), 32), new u(new m(2453736, 43233, c.TAI), 33), new u(new m(2454832, 43234, c.TAI), 34), new u(new m(2456109, 43235, c.TAI), 35), new u(new m(2457204, 43236, c.TAI), 36), new u(new m(2457754, 43237, c.TAI), 37)], m;
  }), define("ThirdParty/Uri", [], function () {
    function e(t) {
      if (t instanceof e) this.scheme = t.scheme, this.authority = t.authority, this.path = t.path, this.query = t.query, this.fragment = t.fragment;else if (t) {
        var n = r.exec(t);
        this.scheme = n[1], this.authority = n[2], this.path = n[3], this.query = n[4], this.fragment = n[5];
      }
    }

    function t(e) {
      var t = unescape(e);
      return a.test(t) ? t : e.toUpperCase();
    }

    function n(e, t, n, r) {
      return (t || "") + n.toLowerCase() + (r || "");
    }

    e.prototype.scheme = null, e.prototype.authority = null, e.prototype.path = "", e.prototype.query = null, e.prototype.fragment = null;
    var r = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$");
    e.prototype.getScheme = function () {
      return this.scheme;
    }, e.prototype.getAuthority = function () {
      return this.authority;
    }, e.prototype.getPath = function () {
      return this.path;
    }, e.prototype.getQuery = function () {
      return this.query;
    }, e.prototype.getFragment = function () {
      return this.fragment;
    }, e.prototype.isAbsolute = function () {
      return !!this.scheme && !this.fragment;
    }, e.prototype.isSameDocumentAs = function (e) {
      return e.scheme == this.scheme && e.authority == this.authority && e.path == this.path && e.query == this.query;
    }, e.prototype.equals = function (e) {
      return this.isSameDocumentAs(e) && e.fragment == this.fragment;
    }, e.prototype.normalize = function () {
      this.removeDotSegments(), this.scheme && (this.scheme = this.scheme.toLowerCase()), this.authority && (this.authority = this.authority.replace(o, n).replace(i, t)), this.path && (this.path = this.path.replace(i, t)), this.query && (this.query = this.query.replace(i, t)), this.fragment && (this.fragment = this.fragment.replace(i, t));
    };
    var i = /%[0-9a-z]{2}/gi,
        a = /[a-zA-Z0-9\-\._~]/,
        o = /(.*@)?([^@:]*)(:.*)?/;
    return e.prototype.resolve = function (t) {
      var n = new e();
      return this.scheme ? (n.scheme = this.scheme, n.authority = this.authority, n.path = this.path, n.query = this.query) : (n.scheme = t.scheme, this.authority ? (n.authority = this.authority, n.path = this.path, n.query = this.query) : (n.authority = t.authority, "" == this.path ? (n.path = t.path, n.query = this.query || t.query) : ("/" == this.path.charAt(0) ? (n.path = this.path, n.removeDotSegments()) : (t.authority && "" == t.path ? n.path = "/" + this.path : n.path = t.path.substring(0, t.path.lastIndexOf("/") + 1) + this.path, n.removeDotSegments()), n.query = this.query))), n.fragment = this.fragment, n;
    }, e.prototype.removeDotSegments = function () {
      var e,
          t = this.path.split("/"),
          n = [],
          r = "" == t[0];
      r && t.shift();

      for ("" == t[0] && t.shift(); t.length;) {
        e = t.shift(), ".." == e ? n.pop() : "." != e && n.push(e);
      }

      "." != e && ".." != e || n.push(""), r && n.unshift(""), this.path = n.join("/");
    }, e.prototype.toString = function () {
      var e = "";
      return this.scheme && (e += this.scheme + ":"), this.authority && (e += "//" + this.authority), e += this.path, this.query && (e += "?" + this.query), this.fragment && (e += "#" + this.fragment), e;
    }, e;
  }), define("Core/appendForwardSlash", [], function () {
    "use strict";

    function e(e) {
      return 0 !== e.length && "/" === e[e.length - 1] || (e += "/"), e;
    }

    return e;
  }), define("Core/clone", ["./defaultValue"], function (e) {
    "use strict";

    function t(n, r) {
      if (null === n || "object" != _typeof(n)) return n;
      r = e(r, !1);
      var i = new n.constructor();

      for (var a in n) {
        if (n.hasOwnProperty(a)) {
          var o = n[a];
          r && (o = t(o, r)), i[a] = o;
        }
      }

      return i;
    }

    return t;
  }), define("Core/combine", ["./defaultValue", "./defined"], function (e, t) {
    "use strict";

    function n(r, i, a) {
      a = e(a, !1);
      var o,
          u,
          s,
          c = {},
          l = t(r),
          f = t(i);
      if (l) for (o in r) {
        r.hasOwnProperty(o) && (u = r[o], f && a && "object" == _typeof(u) && i.hasOwnProperty(o) ? (s = i[o], c[o] = "object" == _typeof(s) ? n(u, s, a) : u) : c[o] = u);
      }
      if (f) for (o in i) {
        i.hasOwnProperty(o) && !c.hasOwnProperty(o) && (s = i[o], c[o] = s);
      }
      return c;
    }

    return n;
  }), define("Core/getAbsoluteUri", ["../ThirdParty/Uri", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, n, r) {
    "use strict";

    function i(e, t) {
      var n;
      return "undefined" != typeof document && (n = document), i._implementation(e, t, n);
    }

    return i._implementation = function (r, i, a) {
      if (!n(i)) {
        if (void 0 === a) return r;
        i = t(a.baseURI, a.location.href);
      }

      var o = new e(i);
      return new e(r).resolve(o).toString();
    }, i;
  }), define("Core/getBaseUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, n) {
    "use strict";

    function r(n, r) {
      var i = "",
          a = n.lastIndexOf("/");
      return -1 !== a && (i = n.substring(0, a + 1)), r ? (n = new e(n), t(n.query) && (i += "?" + n.query), t(n.fragment) && (i += "#" + n.fragment), i) : i;
    }

    return r;
  }), define("Core/getExtensionFromUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, n) {
    "use strict";

    function r(t) {
      var n = new e(t);
      n.normalize();
      var r = n.path,
          i = r.lastIndexOf("/");
      return -1 !== i && (r = r.substr(i + 1)), i = r.lastIndexOf("."), r = -1 === i ? "" : r.substr(i + 1);
    }

    return r;
  }), define("Core/isBlobUri", ["./Check"], function (e) {
    "use strict";

    function t(e) {
      return n.test(e);
    }

    var n = /^blob:/i;
    return t;
  }), define("Core/isCrossOriginUrl", ["./defined"], function (e) {
    "use strict";

    function t(t) {
      e(n) || (n = document.createElement("a")), n.href = window.location.href;
      var r = n.host,
          i = n.protocol;
      return n.href = t, n.href = n.href, i !== n.protocol || r !== n.host;
    }

    var n;
    return t;
  }), define("Core/isDataUri", ["./Check"], function (e) {
    "use strict";

    function t(e) {
      return n.test(e);
    }

    var n = /^data:/i;
    return t;
  }), define("Core/loadAndExecuteScript", ["../ThirdParty/when"], function (e) {
    "use strict";

    function t(t) {
      var n = e.defer(),
          r = document.createElement("script");
      r.async = !0, r.src = t;
      var i = document.getElementsByTagName("head")[0];
      return r.onload = function () {
        r.onload = void 0, i.removeChild(r), n.resolve();
      }, r.onerror = function (e) {
        n.reject(e);
      }, i.appendChild(r), n.promise;
    }

    return t;
  }), define("Core/isArray", ["./defined"], function (e) {
    "use strict";

    var t = Array.isArray;
    return e(t) || (t = function t(e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    }), t;
  }), define("Core/objectToQuery", ["./defined", "./DeveloperError", "./isArray"], function (e, t, n) {
    "use strict";

    function r(e) {
      var t = "";

      for (var r in e) {
        if (e.hasOwnProperty(r)) {
          var i = e[r],
              a = encodeURIComponent(r) + "=";
          if (n(i)) for (var o = 0, u = i.length; o < u; ++o) {
            t += a + encodeURIComponent(i[o]) + "&";
          } else t += a + encodeURIComponent(i) + "&";
        }
      }

      return t = t.slice(0, -1);
    }

    return r;
  }), define("Core/queryToObject", ["./defined", "./DeveloperError", "./isArray"], function (e, t, n) {
    "use strict";

    function r(t) {
      var r = {};
      if ("" === t) return r;

      for (var i = t.replace(/\+/g, "%20").split(/[&;]/), a = 0, o = i.length; a < o; ++a) {
        var u = i[a].split("="),
            s = decodeURIComponent(u[0]),
            c = u[1];
        c = e(c) ? decodeURIComponent(c) : "";
        var l = r[s];
        "string" == typeof l ? r[s] = [l, c] : n(l) ? l.push(c) : r[s] = c;
      }

      return r;
    }

    return r;
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
  }), define("Core/Request", ["./defaultValue", "./defined", "./RequestState", "./RequestType"], function (e, t, n, r) {
    "use strict";

    function i(t) {
      t = e(t, e.EMPTY_OBJECT);
      var i = e(t.throttleByServer, !1),
          a = e(t.throttle, !1);
      this.url = t.url, this.requestFunction = t.requestFunction, this.cancelFunction = t.cancelFunction, this.priorityFunction = t.priorityFunction, this.priority = e(t.priority, 0), this.throttle = a, this.throttleByServer = i, this.type = e(t.type, r.OTHER), this.serverKey = void 0, this.state = n.UNISSUED, this.deferred = void 0, this.cancelled = !1;
    }

    return i.prototype.cancel = function () {
      this.cancelled = !0;
    }, i.prototype.clone = function (e) {
      return t(e) ? (e.url = this.url, e.requestFunction = this.requestFunction, e.cancelFunction = this.cancelFunction, e.priorityFunction = this.priorityFunction, e.priority = this.priority, e.throttle = this.throttle, e.throttleByServer = this.throttleByServer, e.type = this.type, e.serverKey = this.serverKey, e.state = this.RequestState.UNISSUED, e.deferred = void 0, e.cancelled = !1, e) : new i(this);
    }, i;
  }), define("Core/parseResponseHeaders", [], function () {
    "use strict";

    function e(e) {
      var t = {};
      if (!e) return t;

      for (var n = e.split("\r\n"), r = 0; r < n.length; ++r) {
        var i = n[r],
            a = i.indexOf(": ");

        if (a > 0) {
          var o = i.substring(0, a),
              u = i.substring(a + 2);
          t[o] = u;
        }
      }

      return t;
    }

    return e;
  }), define("Core/RequestErrorEvent", ["./defined", "./parseResponseHeaders"], function (e, t) {
    "use strict";

    function n(e, n, r) {
      this.statusCode = e, this.response = n, this.responseHeaders = r, "string" == typeof this.responseHeaders && (this.responseHeaders = t(this.responseHeaders));
    }

    return n.prototype.toString = function () {
      var t = "Request has failed.";
      return e(this.statusCode) && (t += " Status Code: " + this.statusCode), t;
    }, n;
  }), define("Core/Event", ["./Check", "./defined", "./defineProperties"], function (e, t, n) {
    "use strict";

    function r() {
      this._listeners = [], this._scopes = [], this._toRemove = [], this._insideRaiseEvent = !1;
    }

    function i(e, t) {
      return t - e;
    }

    return n(r.prototype, {
      numberOfListeners: {
        get: function get() {
          return this._listeners.length - this._toRemove.length;
        }
      }
    }), r.prototype.addEventListener = function (e, t) {
      this._listeners.push(e), this._scopes.push(t);
      var n = this;
      return function () {
        n.removeEventListener(e, t);
      };
    }, r.prototype.removeEventListener = function (e, t) {
      for (var n = this._listeners, r = this._scopes, i = -1, a = 0; a < n.length; a++) {
        if (n[a] === e && r[a] === t) {
          i = a;
          break;
        }
      }

      return -1 !== i && (this._insideRaiseEvent ? (this._toRemove.push(i), n[i] = void 0, r[i] = void 0) : (n.splice(i, 1), r.splice(i, 1)), !0);
    }, r.prototype.raiseEvent = function () {
      this._insideRaiseEvent = !0;
      var e,
          n = this._listeners,
          r = this._scopes,
          a = n.length;

      for (e = 0; e < a; e++) {
        var o = n[e];
        t(o) && n[e].apply(r[e], arguments);
      }

      var u = this._toRemove;

      if ((a = u.length) > 0) {
        for (u.sort(i), e = 0; e < a; e++) {
          var s = u[e];
          n.splice(s, 1), r.splice(s, 1);
        }

        u.length = 0;
      }

      this._insideRaiseEvent = !1;
    }, r;
  }), define("Core/Heap", ["./Check", "./defaultValue", "./defined", "./defineProperties"], function (e, t, n, r) {
    "use strict";

    function i(e) {
      this._comparator = e.comparator, this._array = [], this._length = 0, this._maximumLength = void 0;
    }

    function a(e, t, n) {
      var r = e[t];
      e[t] = e[n], e[n] = r;
    }

    return r(i.prototype, {
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
          this._maximumLength = e, this._length > e && e > 0 && (this._length = e, this._array.length = e);
        }
      },
      comparator: {
        get: function get() {
          return this._comparator;
        }
      }
    }), i.prototype.reserve = function (e) {
      e = t(e, this._length), this._array.length = e;
    }, i.prototype.heapify = function (e) {
      e = t(e, 0);

      for (var n = this._length, r = this._comparator, i = this._array, o = -1, u = !0; u;) {
        var s = 2 * (e + 1),
            c = s - 1;
        o = c < n && r(i[c], i[e]) < 0 ? c : e, s < n && r(i[s], i[o]) < 0 && (o = s), o !== e ? (a(i, o, e), e = o) : u = !1;
      }
    }, i.prototype.resort = function () {
      for (var e = this._length, t = Math.ceil(e / 2); t >= 0; --t) {
        this.heapify(t);
      }
    }, i.prototype.insert = function (e) {
      var t = this._array,
          r = this._comparator,
          i = this._maximumLength,
          o = this._length++;

      for (o < t.length ? t[o] = e : t.push(e); 0 !== o;) {
        var u = Math.floor((o - 1) / 2);
        if (!(r(t[o], t[u]) < 0)) break;
        a(t, o, u), o = u;
      }

      var s;
      return n(i) && this._length > i && (s = t[i], this._length = i), s;
    }, i.prototype.pop = function (e) {
      if (e = t(e, 0), 0 !== this._length) {
        var n = this._array,
            r = n[e];
        return a(n, e, --this._length), this.heapify(e), r;
      }
    }, i;
  }), define("Core/RequestScheduler", ["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Event", "./Heap", "./isBlobUri", "./isDataUri", "./RequestState"], function (e, t, n, r, i, a, o, u, s, c, l) {
    "use strict";

    function f(e, t) {
      return e.priority - t.priority;
    }

    function h() {}

    function d(e) {
      i(e.priorityFunction) && (e.priority = e.priorityFunction());
    }

    function p(e) {
      var t = r(h.requestsByServer[e], h.maximumRequestsPerServer);
      return w[e] < t;
    }

    function m(e) {
      return e.state === l.UNISSUED && (e.state = l.ISSUED, e.deferred = t.defer()), e.deferred.promise;
    }

    function y(e) {
      return function (t) {
        e.state !== l.CANCELLED && (--g.numberOfActiveRequests, --w[e.serverKey], I.raiseEvent(), e.state = l.RECEIVED, e.deferred.resolve(t));
      };
    }

    function E(e) {
      return function (t) {
        e.state !== l.CANCELLED && (++g.numberOfFailedRequests, --g.numberOfActiveRequests, --w[e.serverKey], I.raiseEvent(t), e.state = l.FAILED, e.deferred.reject(t));
      };
    }

    function v(e) {
      var t = m(e);
      return e.state = l.ACTIVE, S.push(e), ++g.numberOfActiveRequests, ++g.numberOfActiveRequestsEver, ++w[e.serverKey], e.requestFunction().then(y(e)).otherwise(E(e)), t;
    }

    function _(e) {
      var t = e.state === l.ACTIVE;
      e.state = l.CANCELLED, ++g.numberOfCancelledRequests, e.deferred.reject(), t && (--g.numberOfActiveRequests, --w[e.serverKey], ++g.numberOfCancelledActiveRequests), i(e.cancelFunction) && e.cancelFunction();
    }

    function T() {
      h.debugShowStatistics && (0 === g.numberOfActiveRequests && g.lastNumberOfActiveRequests > 0 && (g.numberOfAttemptedRequests > 0 && (console.log("Number of attempted requests: " + g.numberOfAttemptedRequests), g.numberOfAttemptedRequests = 0), g.numberOfCancelledRequests > 0 && (console.log("Number of cancelled requests: " + g.numberOfCancelledRequests), g.numberOfCancelledRequests = 0), g.numberOfCancelledActiveRequests > 0 && (console.log("Number of cancelled active requests: " + g.numberOfCancelledActiveRequests), g.numberOfCancelledActiveRequests = 0), g.numberOfFailedRequests > 0 && (console.log("Number of failed requests: " + g.numberOfFailedRequests), g.numberOfFailedRequests = 0)), g.lastNumberOfActiveRequests = g.numberOfActiveRequests);
    }

    var g = {
      numberOfAttemptedRequests: 0,
      numberOfActiveRequests: 0,
      numberOfCancelledRequests: 0,
      numberOfCancelledActiveRequests: 0,
      numberOfFailedRequests: 0,
      numberOfActiveRequestsEver: 0,
      lastNumberOfActiveRequests: 0
    },
        R = 20,
        A = new u({
      comparator: f
    });
    A.maximumLength = R, A.reserve(R);
    var S = [],
        w = {},
        O = "undefined" != typeof document ? new e(document.location.href) : new e(),
        I = new o();
    return h.maximumRequests = 50, h.maximumRequestsPerServer = 6, h.requestsByServer = {
      "api.pgEarth.com:443": 18,
      "assets.pgEarth.com:443": 18
    }, h.throttleRequests = !0, h.debugShowStatistics = !1, h.requestCompletedEvent = I, a(h, {
      statistics: {
        get: function get() {
          return g;
        }
      },
      priorityHeapLength: {
        get: function get() {
          return R;
        },
        set: function set(e) {
          if (e < R) for (; A.length > e;) {
            var t = A.pop();

            _(t);
          }
          R = e, A.maximumLength = e, A.reserve(e);
        }
      }
    }), h.update = function () {
      var e,
          t,
          n = 0,
          r = S.length;

      for (e = 0; e < r; ++e) {
        t = S[e], t.cancelled && _(t), t.state === l.ACTIVE ? n > 0 && (S[e - n] = t) : ++n;
      }

      S.length -= n;
      var i = A.internalArray,
          a = A.length;

      for (e = 0; e < a; ++e) {
        d(i[e]);
      }

      A.resort();

      for (var o = Math.max(h.maximumRequests - S.length, 0), u = 0; u < o && A.length > 0;) {
        t = A.pop(), t.cancelled ? _(t) : !t.throttleByServer || p(t.serverKey) ? (v(t), ++u) : _(t);
      }

      T();
    }, h.getServerKey = function (t) {
      var n = new e(t).resolve(O);
      n.normalize();
      var r = n.authority;
      /:/.test(r) || (r = r + ":" + ("https" === n.scheme ? "443" : "80"));
      var a = w[r];
      return i(a) || (w[r] = 0), r;
    }, h.request = function (e) {
      if (c(e.url) || s(e.url)) return I.raiseEvent(), e.state = l.RECEIVED, e.requestFunction();

      if (++g.numberOfAttemptedRequests, i(e.serverKey) || (e.serverKey = h.getServerKey(e.url)), !e.throttleByServer || p(e.serverKey)) {
        if (!h.throttleRequests || !e.throttle) return v(e);

        if (!(S.length >= h.maximumRequests)) {
          d(e);
          var t = A.insert(e);

          if (i(t)) {
            if (t === e) return;

            _(t);
          }

          return m(e);
        }
      }
    }, h.clearForSpecs = function () {
      for (; A.length > 0;) {
        _(A.pop());
      }

      for (var e = S.length, t = 0; t < e; ++t) {
        _(S[t]);
      }

      S.length = 0, w = {}, g.numberOfAttemptedRequests = 0, g.numberOfActiveRequests = 0, g.numberOfCancelledRequests = 0, g.numberOfCancelledActiveRequests = 0, g.numberOfFailedRequests = 0, g.numberOfActiveRequestsEver = 0, g.lastNumberOfActiveRequests = 0;
    }, h.numberOfActiveRequestsByServer = function (e) {
      return w[e];
    }, h.requestHeap = A, h;
  }), define("Core/TrustedServers", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, n) {
    "use strict";

    function r(n) {
      var r = new e(n);
      r.normalize();
      var i = r.getAuthority();

      if (t(i)) {
        if (-1 !== i.indexOf("@")) {
          i = i.split("@")[1];
        }

        if (-1 === i.indexOf(":")) {
          var a = r.getScheme();
          if (t(a) || (a = window.location.protocol, a = a.substring(0, a.length - 1)), "http" === a) i += ":80";else {
            if ("https" !== a) return;
            i += ":443";
          }
        }

        return i;
      }
    }

    var i = {},
        a = {};
    return i.add = function (e, n) {
      var r = e.toLowerCase() + ":" + n;
      t(a[r]) || (a[r] = !0);
    }, i.remove = function (e, n) {
      var r = e.toLowerCase() + ":" + n;
      t(a[r]) && delete a[r];
    }, i.contains = function (e) {
      var n = r(e);
      return !(!t(n) || !t(a[n]));
    }, i.clear = function () {
      a = {};
    }, i;
  }), define("Core/Resource", ["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m, y, E, v, _, T, g, R, A, S, w) {
    "use strict";

    function O(e, t, n, r) {
      var i = e.query;
      if (!u(i) || 0 === i.length) return {};
      var a;

      if (-1 === i.indexOf("=")) {
        var o = {};
        o[i] = void 0, a = o;
      } else a = _(i);

      t._queryParameters = n ? M(a, t._queryParameters, r) : a, e.query = void 0;
    }

    function I(e, t) {
      var n = t._queryParameters,
          r = Object.keys(n);
      1 !== r.length || u(n[r[0]]) ? e.query = v(n) : e.query = r[0];
    }

    function x(e, t) {
      return u(e) ? u(e.clone) ? e.clone() : i(e) : t;
    }

    function N(e) {
      if (e.state === A.ISSUED || e.state === A.ACTIVE) throw new S("The Resource is already being fetched.");
      e.state = A.UNISSUED, e.deferred = void 0;
    }

    function M(e, t, n) {
      if (!n) return a(e, t);
      var r = i(e, !0);

      for (var o in t) {
        if (t.hasOwnProperty(o)) {
          var s = r[o],
              c = t[o];
          u(s) ? (Array.isArray(s) || (s = r[o] = [s]), r[o] = s.concat(c)) : r[o] = Array.isArray(c) ? c.slice() : c;
        }
      }

      return r;
    }

    function C(t) {
      t = o(t, o.EMPTY_OBJECT), "string" == typeof t && (t = {
        url: t
      }), this._url = void 0, this._templateValues = x(t.templateValues, {}), this._queryParameters = x(t.queryParameters, {}), this.headers = x(t.headers, {}), this.request = o(t.request, new T()), this.proxy = t.proxy, this.retryCallback = t.retryCallback, this.retryAttempts = o(t.retryAttempts, 0), this._retryCount = 0;
      var n = new e(t.url);
      O(n, this, !0, !0), n.fragment = void 0, this._url = n.toString();
    }

    function P(e) {
      var n = e.resource,
          r = e.flipY,
          i = e.preferImageBitmap,
          a = n.request;
      a.url = n.url, a.requestFunction = function () {
        var e = n.url,
            a = !1;
        n.isDataUri || n.isBlobUri || (a = n.isCrossOriginUrl);
        var o = t.defer();
        return C._Implementations.createImage(e, a, o, r, i), o.promise;
      };
      var o = R.request(a);
      if (u(o)) return o.otherwise(function (e) {
        return a.state !== A.FAILED ? t.reject(e) : n.retryOnError(e).then(function (o) {
          return o ? (a.state = A.UNISSUED, a.deferred = void 0, P({
            resource: n,
            flipY: r,
            preferImageBitmap: i
          })) : t.reject(e);
        });
      });
    }

    function b(e, n, r) {
      var i = {};
      i[n] = r, e.setQueryParameters(i);
      var a = e.request;
      a.url = e.url, a.requestFunction = function () {
        var n = t.defer();
        return window[r] = function (e) {
          n.resolve(e);

          try {
            delete window[r];
          } catch (e) {
            window[r] = void 0;
          }
        }, C._Implementations.loadAndExecuteScript(e.url, r, n), n.promise;
      };
      var o = R.request(a);
      if (u(o)) return o.otherwise(function (i) {
        return a.state !== A.FAILED ? t.reject(i) : e.retryOnError(i).then(function (o) {
          return o ? (a.state = A.UNISSUED, a.deferred = void 0, b(e, n, r)) : t.reject(i);
        });
      });
    }

    function D(e, t) {
      var n = decodeURIComponent(t);
      return e ? atob(n) : n;
    }

    function U(e, t) {
      for (var n = D(e, t), r = new ArrayBuffer(n.length), i = new Uint8Array(r), a = 0; a < n.length; a++) {
        i[a] = n.charCodeAt(a);
      }

      return r;
    }

    function L(e, t) {
      t = o(t, "");
      var n = e[1],
          r = !!e[2],
          i = e[3];

      switch (t) {
        case "":
        case "text":
          return D(r, i);

        case "arraybuffer":
          return U(r, i);

        case "blob":
          var a = U(r, i);
          return new Blob([a], {
            type: n
          });

        case "document":
          return new DOMParser().parseFromString(D(r, i), n);

        case "json":
          return JSON.parse(D(r, i));
      }
    }

    function F(e, t, n) {
      var r = new Image();
      r.onload = function () {
        n.resolve(r);
      }, r.onerror = function (e) {
        n.reject(e);
      }, t && (w.contains(e) ? r.crossOrigin = "use-credentials" : r.crossOrigin = ""), r.src = e;
    }

    function B(e, t) {
      switch (t) {
        case "text":
          return e.toString("utf8");

        case "json":
          return JSON.parse(e.toString("utf8"));

        default:
          return new Uint8Array(e).buffer;
      }
    }

    function z(e, t, n, r, i, a, o) {
      var u = global.require,
          s = u("url").parse(e),
          c = u("https:" === s.protocol ? "https" : "http"),
          l = u("zlib"),
          f = {
        protocol: s.protocol,
        hostname: s.hostname,
        port: s.port,
        path: s.path,
        query: s.query,
        method: n,
        headers: i
      };
      c.request(f).on("response", function (e) {
        if (e.statusCode < 200 || e.statusCode >= 300) return void a.reject(new g(e.statusCode, e, e.headers));
        var n = [];
        e.on("data", function (e) {
          n.push(e);
        }), e.on("end", function () {
          var r = Buffer.concat(n);
          "gzip" === e.headers["content-encoding"] ? l.gunzip(r, function (e, n) {
            e ? a.reject(new S("Error decompressing response.")) : a.resolve(B(n, t));
          }) : a.resolve(B(r, t));
        });
      }).on("error", function (e) {
        a.reject(new g());
      }).end();
    }

    var q = function () {
      try {
        var e = new XMLHttpRequest();
        return e.open("GET", "#", !0), e.responseType = "blob", "blob" === e.responseType;
      } catch (e) {
        return !1;
      }
    }();

    C.createIfNeeded = function (e) {
      return e instanceof C ? e.getDerivedResource({
        request: e.request
      }) : "string" != typeof e ? e : new C({
        url: e
      });
    };

    var G;
    C.supportsImageBitmapOptions = function () {
      if (u(G)) return G;
      if ("function" != typeof createImageBitmap) return G = t.resolve(!1);
      return G = C.fetchBlob({
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////fwAJ+wP9CNHoHgAAAABJRU5ErkJggg=="
      }).then(function (e) {
        return createImageBitmap(e, {
          imageOrientation: "flipY",
          premultiplyAlpha: "none"
        });
      }).then(function (e) {
        return !0;
      }).otherwise(function () {
        return !1;
      });
    }, s(C, {
      isBlobSupported: {
        get: function get() {
          return q;
        }
      }
    }), s(C.prototype, {
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
        set: function set(t) {
          var n = new e(t);
          O(n, this, !1), n.fragment = void 0, this._url = n.toString();
        }
      },
      extension: {
        get: function get() {
          return d(this._url);
        }
      },
      isDataUri: {
        get: function get() {
          return y(this._url);
        }
      },
      isBlobUri: {
        get: function get() {
          return p(this._url);
        }
      },
      isCrossOriginUrl: {
        get: function get() {
          return m(this._url);
        }
      },
      hasHeaders: {
        get: function get() {
          return Object.keys(this.headers).length > 0;
        }
      }
    }), C.prototype.getUrlComponent = function (t, n) {
      if (this.isDataUri) return this._url;
      var r = new e(this._url);
      t && I(r, this);
      var i = r.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
          a = this._templateValues;
      return i = i.replace(/{(.*?)}/g, function (e, t) {
        var n = a[t];
        return u(n) ? encodeURIComponent(n) : e;
      }), n && u(this.proxy) && (i = this.proxy.getURL(i)), i;
    }, C.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t ? M(this._queryParameters, e, !1) : M(e, this._queryParameters, !1);
    }, C.prototype.appendQueryParameters = function (e) {
      this._queryParameters = M(e, this._queryParameters, !0);
    }, C.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t ? a(this._templateValues, e) : a(e, this._templateValues);
    }, C.prototype.getDerivedResource = function (t) {
      var n = this.clone();

      if (n._retryCount = 0, u(t.url)) {
        var r = new e(t.url);
        O(r, n, !0, o(t.preserveQueryParameters, !1)), r.fragment = void 0, n._url = r.resolve(new e(f(this._url))).toString();
      }

      return u(t.queryParameters) && (n._queryParameters = a(t.queryParameters, n._queryParameters)), u(t.templateValues) && (n._templateValues = a(t.templateValues, n.templateValues)), u(t.headers) && (n.headers = a(t.headers, n.headers)), u(t.proxy) && (n.proxy = t.proxy), u(t.request) && (n.request = t.request), u(t.retryCallback) && (n.retryCallback = t.retryCallback), u(t.retryAttempts) && (n.retryAttempts = t.retryAttempts), n;
    }, C.prototype.retryOnError = function (e) {
      var n = this.retryCallback;
      if ("function" != typeof n || this._retryCount >= this.retryAttempts) return t(!1);
      var r = this;
      return t(n(this, e)).then(function (e) {
        return ++r._retryCount, e;
      });
    }, C.prototype.clone = function (e) {
      return u(e) || (e = new C({
        url: this._url
      })), e._url = this._url, e._queryParameters = i(this._queryParameters), e._templateValues = i(this._templateValues), e.headers = i(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
    }, C.prototype.getBaseUri = function (e) {
      return h(this.getUrlComponent(e), e);
    }, C.prototype.appendForwardSlash = function () {
      this._url = n(this._url);
    }, C.prototype.fetchArrayBuffer = function () {
      return this.fetch({
        responseType: "arraybuffer"
      });
    }, C.fetchArrayBuffer = function (e) {
      return new C(e).fetchArrayBuffer();
    }, C.prototype.fetchBlob = function () {
      return this.fetch({
        responseType: "blob"
      });
    }, C.fetchBlob = function (e) {
      return new C(e).fetchBlob();
    }, C.prototype.fetchImage = function (e) {
      e = o(e, o.EMPTY_OBJECT);
      var n = o(e.preferImageBitmap, !1),
          r = o(e.preferBlob, !1),
          i = o(e.flipY, !1);
      if (N(this.request), !q || this.isDataUri || this.isBlobUri || !this.hasHeaders && !r) return P({
        resource: this,
        flipY: i,
        preferImageBitmap: n
      });
      var a = this.fetchBlob();

      if (u(a)) {
        var s, c, l, f;
        return C.supportsImageBitmapOptions().then(function (e) {
          return s = e, c = s && n, a;
        }).then(function (e) {
          if (u(e)) {
            if (f = e, c) return C.createImageBitmapFromBlob(e, {
              flipY: i,
              premultiplyAlpha: !1
            });
            var t = window.URL.createObjectURL(e);
            return l = new C({
              url: t
            }), P({
              resource: l,
              flipY: i,
              preferImageBitmap: !1
            });
          }
        }).then(function (e) {
          if (u(e)) return e.blob = f, c ? e : (window.URL.revokeObjectURL(l.url), e);
        }).otherwise(function (e) {
          return u(l) && window.URL.revokeObjectURL(l.url), e.blob = f, t.reject(e);
        });
      }
    }, C.fetchImage = function (e) {
      return new C(e).fetchImage({
        flipY: e.flipY,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap
      });
    }, C.prototype.fetchText = function () {
      return this.fetch({
        responseType: "text"
      });
    }, C.fetchText = function (e) {
      return new C(e).fetchText();
    }, C.prototype.fetchJson = function () {
      var e = this.fetch({
        responseType: "text",
        headers: {
          Accept: "application/json,*/*;q=0.01"
        }
      });
      if (u(e)) return e.then(function (e) {
        if (u(e)) return JSON.parse(e);
      });
    }, C.fetchJson = function (e) {
      return new C(e).fetchJson();
    }, C.prototype.fetchXML = function () {
      return this.fetch({
        responseType: "document",
        overrideMimeType: "text/xml"
      });
    }, C.fetchXML = function (e) {
      return new C(e).fetchXML();
    }, C.prototype.fetchJsonp = function (e) {
      e = o(e, "callback"), N(this.request);
      var t;

      do {
        t = "loadJsonp" + Math.random().toString().substring(2, 8);
      } while (u(window[t]));

      return b(this, e, t);
    }, C.fetchJsonp = function (e) {
      return new C(e).fetchJsonp(e.callbackParameterName);
    }, C.prototype._makeRequest = function (e) {
      var n = this;
      N(n.request);
      var r = n.request;
      r.url = n.url, r.requestFunction = function () {
        var i = e.responseType,
            o = a(e.headers, n.headers),
            s = e.overrideMimeType,
            c = e.method,
            l = e.data,
            f = t.defer(),
            h = C._Implementations.loadWithXhr(n.url, i, c, l, o, f, s);

        return u(h) && u(h.abort) && (r.cancelFunction = function () {
          h.abort();
        }), f.promise;
      };
      var i = R.request(r);
      if (u(i)) return i.then(function (e) {
        return e;
      }).otherwise(function (i) {
        return r.state !== A.FAILED ? t.reject(i) : n.retryOnError(i).then(function (a) {
          return a ? (r.state = A.UNISSUED, r.deferred = void 0, n.fetch(e)) : t.reject(i);
        });
      });
    };
    var V = /^data:(.*?)(;base64)?,(.*)$/;
    C.prototype.fetch = function (e) {
      return e = x(e, {}), e.method = "GET", this._makeRequest(e);
    }, C.fetch = function (e) {
      return new C(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, C.prototype["delete"] = function (e) {
      return e = x(e, {}), e.method = "DELETE", this._makeRequest(e);
    }, C["delete"] = function (e) {
      return new C(e)["delete"]({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data
      });
    }, C.prototype.head = function (e) {
      return e = x(e, {}), e.method = "HEAD", this._makeRequest(e);
    }, C.head = function (e) {
      return new C(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, C.prototype.options = function (e) {
      return e = x(e, {}), e.method = "OPTIONS", this._makeRequest(e);
    }, C.options = function (e) {
      return new C(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, C.prototype.post = function (e, t) {
      return r.defined("data", e), t = x(t, {}), t.method = "POST", t.data = e, this._makeRequest(t);
    }, C.post = function (e) {
      return new C(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, C.prototype.put = function (e, t) {
      return r.defined("data", e), t = x(t, {}), t.method = "PUT", t.data = e, this._makeRequest(t);
    }, C.put = function (e) {
      return new C(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, C.prototype.patch = function (e, t) {
      return r.defined("data", e), t = x(t, {}), t.method = "PATCH", t.data = e, this._makeRequest(t);
    }, C.patch = function (e) {
      return new C(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, C._Implementations = {}, C._Implementations.createImage = function (e, t, n, r, i) {
      C.supportsImageBitmapOptions().then(function (r) {
        return r && i ? C.fetchBlob({
          url: e
        }) : void F(e, t, n);
      }).then(function (e) {
        if (u(e)) return C.createImageBitmapFromBlob(e, {
          flipY: r,
          premultiplyAlpha: !1
        });
      }).then(function (e) {
        u(e) && n.resolve(e);
      }).otherwise(n.reject);
    }, C.createImageBitmapFromBlob = function (e, t) {
      return r.defined("options", t), r.typeOf.bool("options.flipY", t.flipY), r.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha), createImageBitmap(e, {
        imageOrientation: t.flipY ? "flipY" : "none",
        premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"
      });
    };
    var W = "undefined" == typeof XMLHttpRequest;
    return C._Implementations.loadWithXhr = function (e, t, n, r, i, a, o) {
      var s = V.exec(e);
      if (null !== s) return void a.resolve(L(s, t));
      if (W) return void z(e, t, n, r, i, a, o);
      var c = new XMLHttpRequest();
      if (w.contains(e) && (c.withCredentials = !0), c.open(n, e, !0), u(o) && u(c.overrideMimeType) && c.overrideMimeType(o), u(i)) for (var l in i) {
        i.hasOwnProperty(l) && c.setRequestHeader(l, i[l]);
      }
      u(t) && (c.responseType = t);
      var f = !1;
      return "string" == typeof e && (f = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), c.onload = function () {
        if ((c.status < 200 || c.status >= 300) && (!f || 0 !== c.status)) return void a.reject(new g(c.status, c.response, c.getAllResponseHeaders()));
        var e = c.response,
            r = c.responseType;

        if ("HEAD" === n || "OPTIONS" === n) {
          var i = c.getAllResponseHeaders(),
              o = i.trim().split(/[\r\n]+/),
              s = {};
          return o.forEach(function (e) {
            var t = e.split(": "),
                n = t.shift();
            s[n] = t.join(": ");
          }), void a.resolve(s);
        }

        if (u(e) && "string" == typeof e) try {
          if (-1 === JSON.parse(e).code) return void a.reject(new g(c.status, c.response, c.getAllResponseHeaders()));
        } catch (e) {
          a.reject(e);
        }
        if (204 === c.status) a.resolve();else if (!u(e) || u(t) && r !== t) {
          if ("json" === t && "string" == typeof e) try {
            a.resolve(JSON.parse(e));
          } catch (e) {
            a.reject(e);
          } else ("" === r || "document" === r) && u(c.responseXML) && c.responseXML.hasChildNodes() ? a.resolve(c.responseXML) : "" !== r && "text" !== r || !u(c.responseText) ? a.reject(new S("Invalid XMLHttpRequest response type.")) : a.resolve(c.responseText);
        } else a.resolve(e);
      }, c.onerror = function (e) {
        a.reject(new g());
      }, c.send(r), c;
    }, C._Implementations.loadAndExecuteScript = function (e, t, n) {
      return E(e, t).otherwise(n.reject);
    }, C._DefaultImplementations = {}, C._DefaultImplementations.createImage = C._Implementations.createImage, C._DefaultImplementations.loadWithXhr = C._Implementations.loadWithXhr, C._DefaultImplementations.loadAndExecuteScript = C._Implementations.loadAndExecuteScript, C.DEFAULT = l(new C({
      url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
    })), C;
  }), define("Core/EarthOrientationParameters", ["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (e, t, n, r, i, a, o, u, s, c, l, f) {
    "use strict";

    function h(t) {
      if (t = n(t, n.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = n(t.addNewLeapSeconds, !0), r(t.data)) p(this, t.data);else if (r(t.url)) {
        var i = s.createIfNeeded(t.url),
            a = this;
        this._downloadPromise = e(i.fetchJson(), function (e) {
          p(a, e);
        }, function () {
          a._dataError = "An error occurred while retrieving the EOP data from the URL " + i.url + ".";
        });
      } else p(this, {
        columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
        samples: []
      });
    }

    function d(e, t) {
      return o.compare(e.julianDate, t);
    }

    function p(e, n) {
      if (!r(n.columnNames)) return void (e._dataError = "Error in loaded EOP data: The columnNames property is required.");
      if (!r(n.samples)) return void (e._dataError = "Error in loaded EOP data: The samples property is required.");
      var i = n.columnNames.indexOf("modifiedJulianDateUtc"),
          a = n.columnNames.indexOf("xPoleWanderRadians"),
          s = n.columnNames.indexOf("yPoleWanderRadians"),
          c = n.columnNames.indexOf("ut1MinusUtcSeconds"),
          h = n.columnNames.indexOf("xCelestialPoleOffsetRadians"),
          p = n.columnNames.indexOf("yCelestialPoleOffsetRadians"),
          m = n.columnNames.indexOf("taiMinusUtcSeconds");
      if (i < 0 || a < 0 || s < 0 || c < 0 || h < 0 || p < 0 || m < 0) return void (e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");
      var y = e._samples = n.samples,
          E = e._dates = [];
      e._dateColumn = i, e._xPoleWanderRadiansColumn = a, e._yPoleWanderRadiansColumn = s, e._ut1MinusUtcSecondsColumn = c, e._xCelestialPoleOffsetRadiansColumn = h, e._yCelestialPoleOffsetRadiansColumn = p, e._taiMinusUtcSecondsColumn = m, e._columnCount = n.columnNames.length, e._lastIndex = void 0;

      for (var v, _ = e._addNewLeapSeconds, T = 0, g = y.length; T < g; T += e._columnCount) {
        var R = y[T + i],
            A = y[T + m],
            S = R + l.MODIFIED_JULIAN_DATE_DIFFERENCE,
            w = new o(S, A, f.TAI);

        if (E.push(w), _) {
          if (A !== v && r(v)) {
            var O = o.leapSeconds,
                I = t(O, w, d);

            if (I < 0) {
              var x = new u(w, A);
              O.splice(~I, 0, x);
            }
          }

          v = A;
        }
      }
    }

    function m(e, t, n, r, i) {
      var a = n * r;
      i.xPoleWander = t[a + e._xPoleWanderRadiansColumn], i.yPoleWander = t[a + e._yPoleWanderRadiansColumn], i.xPoleOffset = t[a + e._xCelestialPoleOffsetRadiansColumn], i.yPoleOffset = t[a + e._yCelestialPoleOffsetRadiansColumn], i.ut1MinusUtc = t[a + e._ut1MinusUtcSecondsColumn];
    }

    function y(e, t, n) {
      return t + e * (n - t);
    }

    function E(e, t, n, r, i, a, u) {
      var s = e._columnCount;
      if (a > t.length - 1) return u.xPoleWander = 0, u.yPoleWander = 0, u.xPoleOffset = 0, u.yPoleOffset = 0, u.ut1MinusUtc = 0, u;
      var c = t[i],
          l = t[a];
      if (c.equals(l) || r.equals(c)) return m(e, n, i, s, u), u;
      if (r.equals(l)) return m(e, n, a, s, u), u;
      var f = o.secondsDifference(r, c) / o.secondsDifference(l, c),
          h = i * s,
          d = a * s,
          p = n[h + e._ut1MinusUtcSecondsColumn],
          E = n[d + e._ut1MinusUtcSecondsColumn],
          v = E - p;

      if (v > .5 || v < -.5) {
        var _ = n[h + e._taiMinusUtcSecondsColumn],
            T = n[d + e._taiMinusUtcSecondsColumn];
        _ !== T && (l.equals(r) ? p = E : E -= T - _);
      }

      return u.xPoleWander = y(f, n[h + e._xPoleWanderRadiansColumn], n[d + e._xPoleWanderRadiansColumn]), u.yPoleWander = y(f, n[h + e._yPoleWanderRadiansColumn], n[d + e._yPoleWanderRadiansColumn]), u.xPoleOffset = y(f, n[h + e._xCelestialPoleOffsetRadiansColumn], n[d + e._xCelestialPoleOffsetRadiansColumn]), u.yPoleOffset = y(f, n[h + e._yCelestialPoleOffsetRadiansColumn], n[d + e._yCelestialPoleOffsetRadiansColumn]), u.ut1MinusUtc = y(f, p, E), u;
    }

    return h.NONE = a({
      getPromiseToLoad: function getPromiseToLoad() {
        return e();
      },
      compute: function compute(e, t) {
        return r(t) ? (t.xPoleWander = 0, t.yPoleWander = 0, t.xPoleOffset = 0, t.yPoleOffset = 0, t.ut1MinusUtc = 0) : t = new i(0, 0, 0, 0, 0), t;
      }
    }), h.prototype.getPromiseToLoad = function () {
      return e(this._downloadPromise);
    }, h.prototype.compute = function (e, n) {
      if (r(this._samples)) {
        if (r(n) || (n = new i(0, 0, 0, 0, 0)), 0 === this._samples.length) return n.xPoleWander = 0, n.yPoleWander = 0, n.xPoleOffset = 0, n.yPoleOffset = 0, n.ut1MinusUtc = 0, n;
        var a = this._dates,
            u = this._lastIndex,
            s = 0,
            l = 0;

        if (r(u)) {
          var f = a[u],
              h = a[u + 1],
              d = o.lessThanOrEquals(f, e),
              p = !r(h),
              m = p || o.greaterThanOrEquals(h, e);
          if (d && m) return s = u, !p && h.equals(e) && ++s, l = s + 1, E(this, a, this._samples, e, s, l, n), n;
        }

        var y = t(a, e, o.compare, this._dateColumn);
        return y >= 0 ? (y < a.length - 1 && a[y + 1].equals(e) && ++y, s = y, l = y) : (l = ~y, (s = l - 1) < 0 && (s = 0)), this._lastIndex = s, E(this, a, this._samples, e, s, l, n), n;
      }

      if (r(this._dataError)) throw new c(this._dataError);
    }, h;
  }), define("Core/HeadingPitchRoll", ["./defaultValue", "./defined", "./DeveloperError", "./Math"], function (e, t, n, r) {
    "use strict";

    function i(t, n, r) {
      this.heading = e(t, 0), this.pitch = e(n, 0), this.roll = e(r, 0);
    }

    return i.fromQuaternion = function (e, n) {
      t(n) || (n = new i());
      var a = 2 * (e.w * e.y - e.z * e.x),
          o = 1 - 2 * (e.x * e.x + e.y * e.y),
          u = 2 * (e.w * e.x + e.y * e.z),
          s = 1 - 2 * (e.y * e.y + e.z * e.z),
          c = 2 * (e.w * e.z + e.x * e.y);
      return n.heading = -Math.atan2(c, s), n.roll = Math.atan2(u, o), n.pitch = -r.asinClamped(a), n;
    }, i.fromDegrees = function (e, n, a, o) {
      return t(o) || (o = new i()), o.heading = e * r.RADIANS_PER_DEGREE, o.pitch = n * r.RADIANS_PER_DEGREE, o.roll = a * r.RADIANS_PER_DEGREE, o;
    }, i.clone = function (e, n) {
      if (t(e)) return t(n) ? (n.heading = e.heading, n.pitch = e.pitch, n.roll = e.roll, n) : new i(e.heading, e.pitch, e.roll);
    }, i.equals = function (e, n) {
      return e === n || t(e) && t(n) && e.heading === n.heading && e.pitch === n.pitch && e.roll === n.roll;
    }, i.equalsEpsilon = function (e, n, i, a) {
      return e === n || t(e) && t(n) && r.equalsEpsilon(e.heading, n.heading, i, a) && r.equalsEpsilon(e.pitch, n.pitch, i, a) && r.equalsEpsilon(e.roll, n.roll, i, a);
    }, i.prototype.clone = function (e) {
      return i.clone(this, e);
    }, i.prototype.equals = function (e) {
      return i.equals(this, e);
    }, i.prototype.equalsEpsilon = function (e, t, n) {
      return i.equalsEpsilon(this, e, t, n);
    }, i.prototype.toString = function () {
      return "(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
    }, i;
  }), define("Core/buildModuleUrl", ["./defined", "./DeveloperError", "./getAbsoluteUri", "./Resource", "require"], function (e, t, n, r, i) {
    "use strict";

    function a() {
      for (var e = document.getElementsByTagName("script"), t = 0, n = e.length; t < n; ++t) {
        var r = e[t].getAttribute("src"),
            i = p.exec(r);
        if (null !== i) return i[1];
      }
    }

    function o(t) {
      return "undefined" == typeof document ? t : (e(f) || (f = document.createElement("a")), f.href = t, f.href = f.href, f.href);
    }

    function u() {
      if (e(h)) return h;
      var t;
      return t = "undefined" != typeof PGEARTH_BASE_URL ? PGEARTH_BASE_URL : e(define.amd) && !define.amd.toUrlUndefined && e(i.toUrl) ? n("..", l("Core/buildModuleUrl.js")) : a(), h = new r({
        url: o(t)
      }), h.appendForwardSlash(), h;
    }

    function s(e) {
      return o(i.toUrl("../" + e));
    }

    function c(e) {
      return u().getDerivedResource({
        url: e
      }).url;
    }

    function l(t) {
      return e(d) || (d = e(define.amd) && !define.amd.toUrlUndefined && e(i.toUrl) ? s : c), d(t);
    }

    var f,
        h,
        d,
        p = /((?:.*\/)|^)pgEarth[\w-]*\.js(?:\W|$)/i;
    return l._pgEarthScriptRegex = p, l._buildModuleUrlFromBaseUrl = c, l._clearBaseResource = function () {
      h = void 0;
    }, l.setBaseUrl = function (e) {
      h = r.DEFAULT.getDerivedResource({
        url: e
      });
    }, l.getPGEarthBaseUrl = u, l;
  }), define("Core/Iau2006XysSample", [], function () {
    "use strict";

    function e(e, t, n) {
      this.x = e, this.y = t, this.s = n;
    }

    return e;
  }), define("Core/Iau2006XysData", ["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./Iau2006XysSample", "./JulianDate", "./Resource", "./TimeStandard"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e) {
      e = n(e, n.EMPTY_OBJECT), this._xysFileUrlTemplate = o.createIfNeeded(e.xysFileUrlTemplate), this._interpolationOrder = n(e.interpolationOrder, 9), this._sampleZeroJulianEphemerisDate = n(e.sampleZeroJulianEphemerisDate, 2442396.5), this._sampleZeroDateTT = new a(this._sampleZeroJulianEphemerisDate, 0, u.TAI), this._stepSizeDays = n(e.stepSizeDays, 1), this._samplesPerXysFile = n(e.samplesPerXysFile, 1e3), this._totalSamples = n(e.totalSamples, 27426), this._samples = new Array(3 * this._totalSamples), this._chunkDownloadsInProgress = [];

      for (var t = this._interpolationOrder, r = this._denominators = new Array(t + 1), i = this._xTable = new Array(t + 1), s = Math.pow(this._stepSizeDays, t), c = 0; c <= t; ++c) {
        r[c] = s, i[c] = c * this._stepSizeDays;

        for (var l = 0; l <= t; ++l) {
          l !== c && (r[c] *= c - l);
        }

        r[c] = 1 / r[c];
      }

      this._work = new Array(t + 1), this._coef = new Array(t + 1);
    }

    function c(e, t, n) {
      var r = f;
      return r.dayNumber = t, r.secondsOfDay = n, a.daysDifference(r, e._sampleZeroDateTT);
    }

    function l(n, i) {
      if (n._chunkDownloadsInProgress[i]) return n._chunkDownloadsInProgress[i];
      var a = e.defer();
      n._chunkDownloadsInProgress[i] = a;
      var u,
          s = n._xysFileUrlTemplate;
      return u = r(s) ? s.getDerivedResource({
        templateValues: {
          0: i
        }
      }) : new o({
        url: t("Assets/IAU2006_XYS/IAU2006_XYS_" + i + ".json")
      }), e(u.fetchJson(), function (e) {
        n._chunkDownloadsInProgress[i] = !1;

        for (var t = n._samples, r = e.samples, o = i * n._samplesPerXysFile * 3, u = 0, s = r.length; u < s; ++u) {
          t[o + u] = r[u];
        }

        a.resolve();
      }), a.promise;
    }

    var f = new a(0, 0, u.TAI);
    return s.prototype.preload = function (t, n, r, i) {
      var a = c(this, t, n),
          o = c(this, r, i),
          u = a / this._stepSizeDays - this._interpolationOrder / 2 | 0;
      u < 0 && (u = 0);
      var s = o / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;
      s >= this._totalSamples && (s = this._totalSamples - 1);

      for (var f = u / this._samplesPerXysFile | 0, h = s / this._samplesPerXysFile | 0, d = [], p = f; p <= h; ++p) {
        d.push(l(this, p));
      }

      return e.all(d);
    }, s.prototype.computeXysRadians = function (e, t, n) {
      var a = c(this, e, t);

      if (!(a < 0)) {
        var o = a / this._stepSizeDays | 0;

        if (!(o >= this._totalSamples)) {
          var u = this._interpolationOrder,
              s = o - (u / 2 | 0);
          s < 0 && (s = 0);
          var f = s + u;
          f >= this._totalSamples && (f = this._totalSamples - 1, (s = f - u) < 0 && (s = 0));
          var h = !1,
              d = this._samples;

          if (r(d[3 * s]) || (l(this, s / this._samplesPerXysFile | 0), h = !0), r(d[3 * f]) || (l(this, f / this._samplesPerXysFile | 0), h = !0), !h) {
            r(n) ? (n.x = 0, n.y = 0, n.s = 0) : n = new i(0, 0, 0);
            var p,
                m,
                y = a - s * this._stepSizeDays,
                E = this._work,
                v = this._denominators,
                _ = this._coef,
                T = this._xTable;

            for (p = 0; p <= u; ++p) {
              E[p] = y - T[p];
            }

            for (p = 0; p <= u; ++p) {
              for (_[p] = 1, m = 0; m <= u; ++m) {
                m !== p && (_[p] *= E[m]);
              }

              _[p] *= v[p];
              var g = 3 * (s + p);
              n.x += _[p] * d[g++], n.y += _[p] * d[g++], n.s += _[p] * d[g];
            }

            return n;
          }
        }
      }
    }, s;
  }), define("Core/Quaternion", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math", "./Matrix3"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e, t, r, i) {
      this.x = n(e, 0), this.y = n(t, 0), this.z = n(r, 0), this.w = n(i, 0);
    }

    var c = new e();

    s.fromAxisAngle = function (t, n, i) {
      var a = n / 2,
          o = Math.sin(a);
      c = e.normalize(t, c);
      var u = c.x * o,
          l = c.y * o,
          f = c.z * o,
          h = Math.cos(a);
      return r(i) ? (i.x = u, i.y = l, i.z = f, i.w = h, i) : new s(u, l, f, h);
    };

    var l = [1, 2, 0],
        f = new Array(3);

    s.fromRotationMatrix = function (e, t) {
      var n,
          i,
          a,
          o,
          c,
          h = e[u.COLUMN0ROW0],
          d = e[u.COLUMN1ROW1],
          p = e[u.COLUMN2ROW2],
          m = h + d + p;
      if (m > 0) n = Math.sqrt(m + 1), c = .5 * n, n = .5 / n, i = (e[u.COLUMN1ROW2] - e[u.COLUMN2ROW1]) * n, a = (e[u.COLUMN2ROW0] - e[u.COLUMN0ROW2]) * n, o = (e[u.COLUMN0ROW1] - e[u.COLUMN1ROW0]) * n;else {
        var y = l,
            E = 0;
        d > h && (E = 1), p > h && p > d && (E = 2);
        var v = y[E],
            _ = y[v];
        n = Math.sqrt(e[u.getElementIndex(E, E)] - e[u.getElementIndex(v, v)] - e[u.getElementIndex(_, _)] + 1);
        var T = f;
        T[E] = .5 * n, n = .5 / n, c = (e[u.getElementIndex(_, v)] - e[u.getElementIndex(v, _)]) * n, T[v] = (e[u.getElementIndex(v, E)] + e[u.getElementIndex(E, v)]) * n, T[_] = (e[u.getElementIndex(_, E)] + e[u.getElementIndex(E, _)]) * n, i = -T[0], a = -T[1], o = -T[2];
      }
      return r(t) ? (t.x = i, t.y = a, t.z = o, t.w = c, t) : new s(i, a, o, c);
    };

    var h = new s(),
        d = new s(),
        p = new s(),
        m = new s();

    s.fromHeadingPitchRoll = function (t, n) {
      return m = s.fromAxisAngle(e.UNIT_X, t.roll, h), p = s.fromAxisAngle(e.UNIT_Y, -t.pitch, n), n = s.multiply(p, m, p), d = s.fromAxisAngle(e.UNIT_Z, -t.heading, h), s.multiply(d, n, n);
    };

    var y = new e(),
        E = new e(),
        v = new s(),
        _ = new s(),
        T = new s();

    s.packedLength = 4, s.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e.x, t[r++] = e.y, t[r++] = e.z, t[r] = e.w, t;
    }, s.unpack = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new s()), i.x = e[t], i.y = e[t + 1], i.z = e[t + 2], i.w = e[t + 3], i;
    }, s.packedInterpolationLength = 3, s.convertPackedArrayForInterpolation = function (e, t, n, r) {
      s.unpack(e, 4 * n, T), s.conjugate(T, T);

      for (var i = 0, a = n - t + 1; i < a; i++) {
        var o = 3 * i;
        s.unpack(e, 4 * (t + i), v), s.multiply(v, T, v), v.w < 0 && s.negate(v, v), s.computeAxis(v, y);
        var u = s.computeAngle(v);
        r[o] = y.x * u, r[o + 1] = y.y * u, r[o + 2] = y.z * u;
      }
    }, s.unpackInterpolationResult = function (t, n, i, a, o) {
      r(o) || (o = new s()), e.fromArray(t, 0, E);
      var u = e.magnitude(E);
      return s.unpack(n, 4 * a, _), 0 === u ? s.clone(s.IDENTITY, v) : s.fromAxisAngle(E, u, v), s.multiply(v, _, o);
    }, s.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new s(e.x, e.y, e.z, e.w);
    }, s.conjugate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = e.w, t;
    }, s.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }, s.magnitude = function (e) {
      return Math.sqrt(s.magnitudeSquared(e));
    }, s.normalize = function (e, t) {
      var n = 1 / s.magnitude(e),
          r = e.x * n,
          i = e.y * n,
          a = e.z * n,
          o = e.w * n;
      return t.x = r, t.y = i, t.z = a, t.w = o, t;
    }, s.inverse = function (e, t) {
      var n = s.magnitudeSquared(e);
      return t = s.conjugate(e, t), s.multiplyByScalar(t, 1 / n, t);
    }, s.add = function (e, t, n) {
      return n.x = e.x + t.x, n.y = e.y + t.y, n.z = e.z + t.z, n.w = e.w + t.w, n;
    }, s.subtract = function (e, t, n) {
      return n.x = e.x - t.x, n.y = e.y - t.y, n.z = e.z - t.z, n.w = e.w - t.w, n;
    }, s.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
    }, s.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }, s.multiply = function (e, t, n) {
      var r = e.x,
          i = e.y,
          a = e.z,
          o = e.w,
          u = t.x,
          s = t.y,
          c = t.z,
          l = t.w,
          f = o * u + r * l + i * c - a * s,
          h = o * s - r * c + i * l + a * u,
          d = o * c + r * s - i * u + a * l,
          p = o * l - r * u - i * s - a * c;
      return n.x = f, n.y = h, n.z = d, n.w = p, n;
    }, s.multiplyByScalar = function (e, t, n) {
      return n.x = e.x * t, n.y = e.y * t, n.z = e.z * t, n.w = e.w * t, n;
    }, s.divideByScalar = function (e, t, n) {
      return n.x = e.x / t, n.y = e.y / t, n.z = e.z / t, n.w = e.w / t, n;
    }, s.computeAxis = function (e, t) {
      var n = e.w;
      if (Math.abs(n - 1) < o.EPSILON6) return t.x = t.y = t.z = 0, t;
      var r = 1 / Math.sqrt(1 - n * n);
      return t.x = e.x * r, t.y = e.y * r, t.z = e.z * r, t;
    }, s.computeAngle = function (e) {
      return Math.abs(e.w - 1) < o.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    };
    var g = new s();

    s.lerp = function (e, t, n, r) {
      return g = s.multiplyByScalar(t, n, g), r = s.multiplyByScalar(e, 1 - n, r), s.add(g, r, r);
    };

    var R = new s(),
        A = new s(),
        S = new s();
    s.slerp = function (e, t, n, r) {
      var i = s.dot(e, t),
          a = t;
      if (i < 0 && (i = -i, a = R = s.negate(t, R)), 1 - i < o.EPSILON6) return s.lerp(e, a, n, r);
      var u = Math.acos(i);
      return A = s.multiplyByScalar(e, Math.sin((1 - n) * u), A), S = s.multiplyByScalar(a, Math.sin(n * u), S), r = s.add(A, S, r), s.multiplyByScalar(r, 1 / Math.sin(u), r);
    }, s.log = function (t, n) {
      var r = o.acosClamped(t.w),
          i = 0;
      return 0 !== r && (i = r / Math.sin(r)), e.multiplyByScalar(t, i, n);
    }, s.exp = function (t, n) {
      var r = e.magnitude(t),
          i = 0;
      return 0 !== r && (i = Math.sin(r) / r), n.x = t.x * i, n.y = t.y * i, n.z = t.z * i, n.w = Math.cos(r), n;
    };
    var w = new e(),
        O = new e(),
        I = new s(),
        x = new s();
    s.computeInnerQuadrangle = function (t, n, r, i) {
      var a = s.conjugate(n, I);
      s.multiply(a, r, x);
      var o = s.log(x, w);
      s.multiply(a, t, x);
      var u = s.log(x, O);
      return e.add(o, u, o), e.multiplyByScalar(o, .25, o), e.negate(o, o), s.exp(o, I), s.multiply(n, I, i);
    }, s.squad = function (e, t, n, r, i, a) {
      var o = s.slerp(e, t, i, I),
          u = s.slerp(n, r, i, x);
      return s.slerp(o, u, 2 * i * (1 - i), a);
    };

    for (var N = new s(), M = 1.9011074535173003, C = i.supportsTypedArrays() ? new Float32Array(8) : [], P = i.supportsTypedArrays() ? new Float32Array(8) : [], b = i.supportsTypedArrays() ? new Float32Array(8) : [], D = i.supportsTypedArrays() ? new Float32Array(8) : [], U = 0; U < 7; ++U) {
      var L = U + 1,
          F = 2 * L + 1;
      C[U] = 1 / (L * F), P[U] = L / F;
    }

    return C[7] = M / 136, P[7] = 8 * M / 17, s.fastSlerp = function (e, t, n, r) {
      var i,
          a = s.dot(e, t);
      a >= 0 ? i = 1 : (i = -1, a = -a);

      for (var o = a - 1, u = 1 - n, c = n * n, l = u * u, f = 7; f >= 0; --f) {
        b[f] = (C[f] * c - P[f]) * o, D[f] = (C[f] * l - P[f]) * o;
      }

      var h = i * n * (1 + b[0] * (1 + b[1] * (1 + b[2] * (1 + b[3] * (1 + b[4] * (1 + b[5] * (1 + b[6] * (1 + b[7])))))))),
          d = u * (1 + D[0] * (1 + D[1] * (1 + D[2] * (1 + D[3] * (1 + D[4] * (1 + D[5] * (1 + D[6] * (1 + D[7])))))))),
          p = s.multiplyByScalar(e, d, N);
      return s.multiplyByScalar(t, h, r), s.add(p, r, r);
    }, s.fastSquad = function (e, t, n, r, i, a) {
      var o = s.fastSlerp(e, t, i, I),
          u = s.fastSlerp(n, r, i, x);
      return s.fastSlerp(o, u, 2 * i * (1 - i), a);
    }, s.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, s.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(e.x - t.x) <= n && Math.abs(e.y - t.y) <= n && Math.abs(e.z - t.z) <= n && Math.abs(e.w - t.w) <= n;
    }, s.ZERO = a(new s(0, 0, 0, 0)), s.IDENTITY = a(new s(0, 0, 0, 1)), s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    }, s;
  }), define("Core/Transforms", ["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m, y, E, v, _, T) {
    "use strict";

    var g = {},
        R = {
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
        A = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1]
    },
        S = {},
        w = {
      east: new n(),
      north: new n(),
      up: new n(),
      west: new n(),
      south: new n(),
      down: new n()
    },
        O = new n(),
        I = new n(),
        x = new n();
    g.localFrameToFixedFrameGenerator = function (e, t) {
      if (!R.hasOwnProperty(e) || !R[e].hasOwnProperty(t)) throw new s("firstAxis and secondAxis must be east, north, up, west, south or down.");
      var r,
          i = R[e][t],
          a = e + t;
      return u(S[a]) ? r = S[a] : (r = function r(_r, a, s) {
        if (u(s) || (s = new v()), y.equalsEpsilon(_r.x, 0, y.EPSILON14) && y.equalsEpsilon(_r.y, 0, y.EPSILON14)) {
          var c = y.sign(_r.z);
          n.unpack(A[e], 0, O), "east" !== e && "west" !== e && n.multiplyByScalar(O, c, O), n.unpack(A[t], 0, I), "east" !== t && "west" !== t && n.multiplyByScalar(I, c, I), n.unpack(A[i], 0, x), "east" !== i && "west" !== i && n.multiplyByScalar(x, c, x);
        } else {
          a = o(a, f.WGS84), a.geodeticSurfaceNormal(_r, w.up);
          var l = w.up,
              h = w.east;
          h.x = -_r.y, h.y = _r.x, h.z = 0, n.normalize(h, w.east), n.cross(l, h, w.north), n.multiplyByScalar(w.up, -1, w.down), n.multiplyByScalar(w.east, -1, w.west), n.multiplyByScalar(w.north, -1, w.south), O = w[e], I = w[t], x = w[i];
        }

        return s[0] = O.x, s[1] = O.y, s[2] = O.z, s[3] = 0, s[4] = I.x, s[5] = I.y, s[6] = I.z, s[7] = 0, s[8] = x.x, s[9] = x.y, s[10] = x.z, s[11] = 0, s[12] = _r.x, s[13] = _r.y, s[14] = _r.z, s[15] = 1, s;
      }, S[a] = r), r;
    }, g.eastNorthUpToFixedFrame = g.localFrameToFixedFrameGenerator("east", "north"), g.northEastDownToFixedFrame = g.localFrameToFixedFrameGenerator("north", "east"), g.northUpEastToFixedFrame = g.localFrameToFixedFrameGenerator("north", "up"), g.northWestUpToFixedFrame = g.localFrameToFixedFrameGenerator("north", "west");
    var N = new _(),
        M = new n(1, 1, 1),
        C = new v();

    g.headingPitchRollToFixedFrame = function (e, t, r, i, a) {
      i = o(i, g.eastNorthUpToFixedFrame);

      var u = _.fromHeadingPitchRoll(t, N),
          s = v.fromTranslationQuaternionRotationScale(n.ZERO, u, M, C);

      return a = i(e, r, a), v.multiply(a, s, a);
    };

    var P = new v(),
        b = new E();

    g.headingPitchRollQuaternion = function (e, t, n, r, i) {
      var a = g.headingPitchRollToFixedFrame(e, t, n, r, P),
          o = v.getRotation(a, b);
      return _.fromRotationMatrix(o, i);
    };

    var D = new n(1, 1, 1),
        U = new n(),
        L = new v(),
        F = new v(),
        B = new E(),
        z = new _();

    g.fixedFrameToHeadingPitchRoll = function (e, t, r, i) {
      t = o(t, f.WGS84), r = o(r, g.eastNorthUpToFixedFrame), u(i) || (i = new h());
      var a = v.getTranslation(e, U);
      if (n.equals(a, n.ZERO)) return i.heading = 0, i.pitch = 0, i.roll = 0, i;
      var s = v.inverseTransformation(r(a, t, L), L),
          c = v.setScale(e, D, F);
      c = v.setTranslation(c, n.ZERO, c), s = v.multiply(s, c, s);

      var l = _.fromRotationMatrix(v.getRotation(s, B), z);

      return l = _.normalize(l, l), h.fromQuaternion(l, i);
    };

    var q = y.TWO_PI / 86400,
        G = new m();
    g.computeTemeToPseudoFixedMatrix = function (e, t) {
      G = m.addSeconds(e, -m.computeTaiMinusUtc(e), G);
      var n,
          r = G.dayNumber,
          i = G.secondsOfDay,
          a = r - 2451545;
      n = i >= 43200 ? (a + .5) / T.DAYS_PER_JULIAN_CENTURY : (a - .5) / T.DAYS_PER_JULIAN_CENTURY;
      var o = 24110.54841 + n * (8640184.812866 + n * (.093104 + -62e-7 * n)),
          s = o * q % y.TWO_PI,
          c = 72921158553e-15 + 1.1772758384668e-19 * (r - 2451545.5),
          l = (i + .5 * T.SECONDS_PER_DAY) % T.SECONDS_PER_DAY,
          f = s + c * l,
          h = Math.cos(f),
          d = Math.sin(f);
      return u(t) ? (t[0] = h, t[1] = -d, t[2] = 0, t[3] = d, t[4] = h, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new E(h, d, 0, -d, h, 0, 0, 0, 1);
    }, g.iau2006XysData = new d(), g.earthOrientationParameters = c.NONE;
    g.preloadIcrfFixed = function (t) {
      var n = t.start.dayNumber,
          r = t.start.secondsOfDay + 32.184,
          i = t.stop.dayNumber,
          a = t.stop.secondsOfDay + 32.184,
          o = g.iau2006XysData.preload(n, r, i, a),
          u = g.earthOrientationParameters.getPromiseToLoad();
      return e.all([o, u]);
    }, g.computeIcrfToFixedMatrix = function (e, t) {
      u(t) || (t = new E());
      var n = g.computeFixedToIcrfMatrix(e, t);
      if (u(n)) return E.transpose(n, t);
    };
    var V = new p(0, 0, 0),
        W = new l(0, 0, 0, 0, 0, 0),
        X = new E(),
        k = new E();

    g.computeFixedToIcrfMatrix = function (e, t) {
      u(t) || (t = new E());
      var n = g.earthOrientationParameters.compute(e, W);

      if (u(n)) {
        var r = e.dayNumber,
            i = e.secondsOfDay + 32.184,
            a = g.iau2006XysData.computeXysRadians(r, i, V);

        if (u(a)) {
          var o = a.x + n.xPoleOffset,
              s = a.y + n.yPoleOffset,
              c = 1 / (1 + Math.sqrt(1 - o * o - s * s)),
              l = X;
          l[0] = 1 - c * o * o, l[3] = -c * o * s, l[6] = o, l[1] = -c * o * s, l[4] = 1 - c * s * s, l[7] = s, l[2] = -o, l[5] = -s, l[8] = 1 - c * (o * o + s * s);

          var f = E.fromRotationZ(-a.s, k),
              h = E.multiply(l, f, X),
              d = e.dayNumber,
              p = e.secondsOfDay - m.computeTaiMinusUtc(e) + n.ut1MinusUtc,
              v = d - 2451545,
              _ = p / T.SECONDS_PER_DAY,
              R = .779057273264 + _ + .00273781191135448 * (v + _);

          R = R % 1 * y.TWO_PI;
          var A = E.fromRotationZ(R, k),
              S = E.multiply(h, A, X),
              w = Math.cos(n.xPoleWander),
              O = Math.cos(n.yPoleWander),
              I = Math.sin(n.xPoleWander),
              x = Math.sin(n.yPoleWander),
              N = r - 2451545 + i / T.SECONDS_PER_DAY;
          N /= 36525;
          var M = -47e-6 * N * y.RADIANS_PER_DEGREE / 3600,
              C = Math.cos(M),
              P = Math.sin(M),
              b = k;
          return b[0] = w * C, b[1] = w * P, b[2] = I, b[3] = -O * P + x * I * C, b[4] = O * C + x * I * P, b[5] = -x * w, b[6] = -x * P - O * I * C, b[7] = x * C - O * I * P, b[8] = O * w, E.multiply(S, b, t);
        }
      }
    };

    var H = new r();
    g.pointToWindowCoordinates = function (e, t, n, r) {
      return r = g.pointToGLWindowCoordinates(e, t, n, r), r.y = 2 * t[5] - r.y, r;
    }, g.pointToGLWindowCoordinates = function (e, n, i, a) {
      u(a) || (a = new t());
      var o = H;
      return v.multiplyByVector(e, r.fromElements(i.x, i.y, i.z, 1, o), o), r.multiplyByScalar(o, 1 / o.w, o), v.multiplyByVector(n, o, o), t.fromCartesian4(o, a);
    };
    var Y = new n(),
        j = new n(),
        Z = new n();

    g.rotationMatrixFromPositionVelocity = function (e, t, r, i) {
      var a = o(r, f.WGS84).geodeticSurfaceNormal(e, Y),
          s = n.cross(t, a, j);
      n.equalsEpsilon(s, n.ZERO, y.EPSILON6) && (s = n.clone(n.UNIT_X, s));
      var c = n.cross(s, t, Z);
      return n.normalize(c, c), n.cross(t, c, s), n.negate(s, s), n.normalize(s, s), u(i) || (i = new E()), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = s.x, i[4] = s.y, i[5] = s.z, i[6] = c.x, i[7] = c.y, i[8] = c.z, i;
    };

    var K = new v(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
        J = new i(),
        Q = new n(),
        $ = new n(),
        ee = new E(),
        te = new v(),
        ne = new v();
    return g.basisTo2D = function (e, t, r) {
      var i = v.getTranslation(t, $),
          a = e.ellipsoid,
          o = a.cartesianToCartographic(i, J),
          u = e.project(o, Q);
      n.fromElements(u.z, u.x, u.y, u);
      var s = g.eastNorthUpToFixedFrame(i, a, te),
          c = v.inverseTransformation(s, ne),
          l = v.getRotation(t, ee),
          f = v.multiplyByMatrix3(c, l, r);
      return v.multiply(K, f, r), v.setTranslation(r, u, r), r;
    }, g.wgs84To2DModelMatrix = function (e, t, r) {
      var i = e.ellipsoid,
          a = g.eastNorthUpToFixedFrame(t, i, te),
          o = v.inverseTransformation(a, ne),
          u = i.cartesianToCartographic(t, J),
          s = e.project(u, Q);
      n.fromElements(s.z, s.x, s.y, s);
      var c = v.fromTranslation(s, te);
      return v.multiply(K, o, r), v.multiply(c, r, r), r;
    }, g;
  }), define("Core/EllipsoidTangentPlane", ["./AxisAlignedBoundingBox", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./IntersectionTests", "./Matrix4", "./Plane", "./Ray", "./Transforms"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p) {
    "use strict";

    function m(e, t) {
      t = a(t, c.WGS84), e = t.scaleToGeodeticSurface(e);
      var r = p.eastNorthUpToFixedFrame(e, t);
      this._ellipsoid = t, this._origin = e, this._xAxis = n.fromCartesian4(f.getColumn(r, 0, y)), this._yAxis = n.fromCartesian4(f.getColumn(r, 1, y));
      var i = n.fromCartesian4(f.getColumn(r, 2, y));
      this._plane = h.fromPointNormal(e, i);
    }

    var y = new r();
    u(m.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      },
      origin: {
        get: function get() {
          return this._origin;
        }
      },
      plane: {
        get: function get() {
          return this._plane;
        }
      },
      xAxis: {
        get: function get() {
          return this._xAxis;
        }
      },
      yAxis: {
        get: function get() {
          return this._yAxis;
        }
      },
      zAxis: {
        get: function get() {
          return this._plane.normal;
        }
      }
    });
    var E = new e();

    m.fromPoints = function (t, n) {
      return new m(e.fromPoints(t, E).center, n);
    };

    var v = new d(),
        _ = new n();

    m.prototype.projectPointOntoPlane = function (e, r) {
      var i = v;
      i.origin = e, n.normalize(e, i.direction);
      var a = l.rayPlane(i, this._plane, _);

      if (o(a) || (n.negate(i.direction, i.direction), a = l.rayPlane(i, this._plane, _)), o(a)) {
        var u = n.subtract(a, this._origin, a),
            s = n.dot(this._xAxis, u),
            c = n.dot(this._yAxis, u);
        return o(r) ? (r.x = s, r.y = c, r) : new t(s, c);
      }
    }, m.prototype.projectPointsOntoPlane = function (e, t) {
      o(t) || (t = []);

      for (var n = 0, r = e.length, i = 0; i < r; i++) {
        var a = this.projectPointOntoPlane(e[i], t[n]);
        o(a) && (t[n] = a, n++);
      }

      return t.length = n, t;
    }, m.prototype.projectPointToNearestOnPlane = function (e, r) {
      o(r) || (r = new t());
      var i = v;
      i.origin = e, n.clone(this._plane.normal, i.direction);
      var a = l.rayPlane(i, this._plane, _);
      o(a) || (n.negate(i.direction, i.direction), a = l.rayPlane(i, this._plane, _));
      var u = n.subtract(a, this._origin, a),
          s = n.dot(this._xAxis, u),
          c = n.dot(this._yAxis, u);
      return r.x = s, r.y = c, r;
    }, m.prototype.projectPointsToNearestOnPlane = function (e, t) {
      o(t) || (t = []);
      var n = e.length;
      t.length = n;

      for (var r = 0; r < n; r++) {
        t[r] = this.projectPointToNearestOnPlane(e[r], t[r]);
      }

      return t;
    };
    var T = new n();
    return m.prototype.projectPointOntoEllipsoid = function (e, t) {
      o(t) || (t = new n());
      var r = this._ellipsoid,
          i = this._origin,
          a = this._xAxis,
          u = this._yAxis,
          s = T;
      return n.multiplyByScalar(a, e.x, s), t = n.add(i, s, t), n.multiplyByScalar(u, e.y, s), n.add(t, s, t), r.scaleToGeocentricSurface(t, t), t;
    }, m.prototype.projectPointsOntoEllipsoid = function (e, t) {
      var n = e.length;
      o(t) ? t.length = n : t = new Array(n);

      for (var r = 0; r < n; ++r) {
        t[r] = this.projectPointOntoEllipsoid(e[r], t[r]);
      }

      return t;
    }, m;
  }), define("Core/OrientedBoundingBox", ["./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidTangentPlane", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Plane", "./Rectangle"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m) {
    "use strict";

    function y(e, t) {
      this.center = n.clone(a(e, n.ZERO)), this.halfAxes = d.clone(a(t, d.ZERO));
    }

    function E(e, t, r, i, a, u, s, c) {
      o(c) || (c = new y());
      var l = c.halfAxes;
      d.setColumn(l, 0, e.xAxis, l), d.setColumn(l, 1, e.yAxis, l), d.setColumn(l, 2, e.zAxis, l);
      var f = O;
      f.x = (t + r) / 2, f.y = (i + a) / 2, f.z = (u + s) / 2;
      var h = I;
      h.x = (r - t) / 2, h.y = (a - i) / 2, h.z = (s - u) / 2;
      var p = c.center;
      return f = d.multiplyByVector(l, f, f), n.add(e.origin, f, p), d.multiplyByScale(l, h, l), c;
    }

    y.packedLength = n.packedLength + d.packedLength, y.pack = function (e, t, r) {
      return r = a(r, 0), n.pack(e.center, t, r), d.pack(e.halfAxes, t, r + n.packedLength), t;
    }, y.unpack = function (e, t, r) {
      return t = a(t, 0), o(r) || (r = new y()), n.unpack(e, t, r.center), d.unpack(e, t + n.packedLength, r.halfAxes), r;
    };

    var v = new n(),
        _ = new n(),
        T = new n(),
        g = new n(),
        R = new n(),
        A = new n(),
        S = new d(),
        w = {
      unitary: new d(),
      diagonal: new d()
    };

    y.fromPoints = function (e, t) {
      if (o(t) || (t = new y()), !o(e) || 0 === e.length) return t.halfAxes = d.ZERO, t.center = n.ZERO, t;
      var r,
          i = e.length,
          a = n.clone(e[0], v);

      for (r = 1; r < i; r++) {
        n.add(a, e[r], a);
      }

      var u = 1 / i;
      n.multiplyByScalar(a, u, a);
      var s,
          c = 0,
          l = 0,
          f = 0,
          h = 0,
          p = 0,
          m = 0;

      for (r = 0; r < i; r++) {
        s = n.subtract(e[r], a, _), c += s.x * s.x, l += s.x * s.y, f += s.x * s.z, h += s.y * s.y, p += s.y * s.z, m += s.z * s.z;
      }

      c *= u, l *= u, f *= u, h *= u, p *= u, m *= u;
      var E = S;
      E[0] = c, E[1] = l, E[2] = f, E[3] = l, E[4] = h, E[5] = p, E[6] = f, E[7] = p, E[8] = m;
      var O = d.computeEigenDecomposition(E, w),
          I = d.clone(O.unitary, t.halfAxes),
          x = d.getColumn(I, 0, g),
          N = d.getColumn(I, 1, R),
          M = d.getColumn(I, 2, A),
          C = -Number.MAX_VALUE,
          P = -Number.MAX_VALUE,
          b = -Number.MAX_VALUE,
          D = Number.MAX_VALUE,
          U = Number.MAX_VALUE,
          L = Number.MAX_VALUE;

      for (r = 0; r < i; r++) {
        s = e[r], C = Math.max(n.dot(x, s), C), P = Math.max(n.dot(N, s), P), b = Math.max(n.dot(M, s), b), D = Math.min(n.dot(x, s), D), U = Math.min(n.dot(N, s), U), L = Math.min(n.dot(M, s), L);
      }

      x = n.multiplyByScalar(x, .5 * (D + C), x), N = n.multiplyByScalar(N, .5 * (U + P), N), M = n.multiplyByScalar(M, .5 * (L + b), M);
      var F = n.add(x, N, t.center);
      n.add(F, M, F);
      var B = T;
      return B.x = C - D, B.y = P - U, B.z = b - L, n.multiplyByScalar(B, .5, B), d.multiplyByScale(t.halfAxes, B, t.halfAxes), t;
    };

    var O = new n(),
        I = new n(),
        x = new r(),
        N = new n(),
        M = [new r(), new r(), new r(), new r(), new r(), new r(), new r(), new r()],
        C = [new n(), new n(), new n(), new n(), new n(), new n(), new n(), new n()],
        P = [new t(), new t(), new t(), new t(), new t(), new t(), new t(), new t()];
    y.fromRectangle = function (e, t, n, r, i) {
      t = a(t, 0), n = a(n, 0), r = a(r, s.WGS84);
      var o = m.center(e, x),
          u = r.cartographicToCartesian(o, N),
          l = new c(u, r),
          f = l.plane,
          h = M[0],
          d = M[1],
          y = M[2],
          v = M[3],
          _ = M[4],
          T = M[5],
          g = M[6],
          R = M[7],
          A = o.longitude,
          S = e.south < 0 && e.north > 0 ? 0 : o.latitude;
      g.latitude = T.latitude = _.latitude = e.south, R.latitude = v.latitude = S, h.latitude = d.latitude = y.latitude = e.north, g.longitude = R.longitude = h.longitude = e.west, T.longitude = d.longitude = A, _.longitude = v.longitude = y.longitude = e.east, y.height = d.height = h.height = R.height = g.height = T.height = _.height = v.height = n, r.cartographicArrayToCartesianArray(M, C), l.projectPointsToNearestOnPlane(C, P);
      var w = Math.min(P[6].x, P[7].x, P[0].x),
          O = Math.max(P[2].x, P[3].x, P[4].x),
          I = Math.min(P[4].y, P[5].y, P[6].y),
          b = Math.max(P[0].y, P[1].y, P[2].y);
      return y.height = h.height = _.height = g.height = t, r.cartographicArrayToCartesianArray(M, C), E(l, w, O, I, b, Math.min(p.getPointDistance(f, C[0]), p.getPointDistance(f, C[2]), p.getPointDistance(f, C[4]), p.getPointDistance(f, C[6])), n, i);
    }, y.clone = function (e, t) {
      if (o(e)) return o(t) ? (n.clone(e.center, t.center), d.clone(e.halfAxes, t.halfAxes), t) : new y(e.center, e.halfAxes);
    }, y.intersectPlane = function (e, t) {
      var r = e.center,
          i = t.normal,
          a = e.halfAxes,
          o = i.x,
          u = i.y,
          s = i.z,
          c = Math.abs(o * a[d.COLUMN0ROW0] + u * a[d.COLUMN0ROW1] + s * a[d.COLUMN0ROW2]) + Math.abs(o * a[d.COLUMN1ROW0] + u * a[d.COLUMN1ROW1] + s * a[d.COLUMN1ROW2]) + Math.abs(o * a[d.COLUMN2ROW0] + u * a[d.COLUMN2ROW1] + s * a[d.COLUMN2ROW2]),
          f = n.dot(i, r) + t.distance;
      return f <= -c ? l.OUTSIDE : f >= c ? l.INSIDE : l.INTERSECTING;
    };
    var b = new n(),
        D = new n(),
        U = new n(),
        L = new n();

    y.distanceSquaredTo = function (e, t) {
      var r = n.subtract(t, e.center, O),
          i = e.halfAxes,
          a = d.getColumn(i, 0, b),
          o = d.getColumn(i, 1, D),
          u = d.getColumn(i, 2, U),
          s = n.magnitude(a),
          c = n.magnitude(o),
          l = n.magnitude(u);
      n.normalize(a, a), n.normalize(o, o), n.normalize(u, u);
      var f = L;
      f.x = n.dot(r, a), f.y = n.dot(r, o), f.z = n.dot(r, u);
      var h,
          p = 0;
      return f.x < -s ? (h = f.x + s, p += h * h) : f.x > s && (h = f.x - s, p += h * h), f.y < -c ? (h = f.y + c, p += h * h) : f.y > c && (h = f.y - c, p += h * h), f.z < -l ? (h = f.z + l, p += h * h) : f.z > l && (h = f.z - l, p += h * h), p;
    };

    var F = new n(),
        B = new n();

    y.computePlaneDistances = function (e, t, r, i) {
      o(i) || (i = new f());
      var a = Number.POSITIVE_INFINITY,
          u = Number.NEGATIVE_INFINITY,
          s = e.center,
          c = e.halfAxes,
          l = d.getColumn(c, 0, b),
          h = d.getColumn(c, 1, D),
          p = d.getColumn(c, 2, U),
          m = n.add(l, h, F);
      n.add(m, p, m), n.add(m, s, m);
      var y = n.subtract(m, t, B),
          E = n.dot(r, y);
      return a = Math.min(E, a), u = Math.max(E, u), n.add(s, l, m), n.add(m, h, m), n.subtract(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), n.add(s, l, m), n.subtract(m, h, m), n.add(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), n.add(s, l, m), n.subtract(m, h, m), n.subtract(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), n.subtract(s, l, m), n.add(m, h, m), n.add(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), n.subtract(s, l, m), n.add(m, h, m), n.subtract(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), n.subtract(s, l, m), n.subtract(m, h, m), n.add(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), n.subtract(s, l, m), n.subtract(m, h, m), n.subtract(m, p, m), n.subtract(m, t, y), E = n.dot(r, y), a = Math.min(E, a), u = Math.max(E, u), i.start = a, i.stop = u, i;
    };

    var z = new e();
    return y.isOccluded = function (t, n) {
      var r = e.fromOrientedBoundingBox(t, z);
      return !n.isBoundingSphereVisible(r);
    }, y.prototype.intersectPlane = function (e) {
      return y.intersectPlane(this, e);
    }, y.prototype.distanceSquaredTo = function (e) {
      return y.distanceSquaredTo(this, e);
    }, y.prototype.computePlaneDistances = function (e, t, n) {
      return y.computePlaneDistances(this, e, t, n);
    }, y.prototype.isOccluded = function (e) {
      return y.isOccluded(this, e);
    }, y.equals = function (e, t) {
      return e === t || o(e) && o(t) && n.equals(e.center, t.center) && d.equals(e.halfAxes, t.halfAxes);
    }, y.prototype.clone = function (e) {
      return y.clone(this, e);
    }, y.prototype.equals = function (e) {
      return y.equals(this, e);
    }, y;
  }), define("Core/CoplanarPolygonGeometryLibrary", ["./defined", "./Cartesian2", "./Cartesian3", "./Check", "./IntersectionTests", "./Math", "./Matrix3", "./OrientedBoundingBox"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e, r, i, a, o) {
      var u = n.subtract(e, r, l),
          s = n.dot(i, u),
          c = n.dot(a, u);
      return t.fromElements(s, c, o);
    }

    var c = {},
        l = new n(),
        f = new n(),
        h = new n(),
        d = new n(),
        p = new u();
    return c.validOutline = function (e) {
      var t = u.fromPoints(e, p),
          r = t.halfAxes,
          i = o.getColumn(r, 0, f),
          a = o.getColumn(r, 1, h),
          s = o.getColumn(r, 2, d),
          c = n.magnitude(i),
          l = n.magnitude(a),
          m = n.magnitude(s);
      return !(0 === c && (0 === l || 0 === m) || 0 === l && 0 === m);
    }, c.computeProjectTo2DArguments = function (e, t, r, i) {
      var a = u.fromPoints(e, p),
          s = a.halfAxes,
          c = o.getColumn(s, 0, f),
          l = o.getColumn(s, 1, h),
          m = o.getColumn(s, 2, d),
          y = n.magnitude(c),
          E = n.magnitude(l),
          v = n.magnitude(m),
          _ = Math.min(y, E, v);

      if (0 === y && (0 === E || 0 === v) || 0 === E && 0 === v) return !1;
      var T, g;
      return _ !== E && _ !== v || (T = c), _ === y ? T = l : _ === v && (g = l), _ !== y && _ !== E || (g = m), n.normalize(T, r), n.normalize(g, i), n.clone(a.center, t), !0;
    }, c.createProjectPointsTo2DFunction = function (e, t, n) {
      return function (r) {
        for (var i = new Array(r.length), a = 0; a < r.length; a++) {
          i[a] = s(r[a], e, t, n);
        }

        return i;
      };
    }, c.createProjectPointTo2DFunction = function (e, t, n) {
      return function (r, i) {
        return s(r, e, t, n, i);
      };
    }, c;
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
  }), define("Core/Matrix2", ["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e, t, r, i) {
      this[0] = n(e, 0), this[1] = n(r, 0), this[2] = n(t, 0), this[3] = n(i, 0);
    }

    o.packedLength = 4, o.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t;
    }, o.unpack = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new o()), i[0] = e[t++], i[1] = e[t++], i[2] = e[t++], i[3] = e[t++], i;
    }, o.clone = function (e, t) {
      if (r(e)) return r(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : new o(e[0], e[2], e[1], e[3]);
    }, o.fromArray = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new o()), i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i;
    }, o.fromColumnMajorArray = function (e, t) {
      return o.clone(e, t);
    }, o.fromRowMajorArray = function (e, t) {
      return r(t) ? (t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t) : new o(e[0], e[1], e[2], e[3]);
    }, o.fromScale = function (e, t) {
      return r(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = e.y, t) : new o(e.x, 0, 0, e.y);
    }, o.fromUniformScale = function (e, t) {
      return r(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = e, t) : new o(e, 0, 0, e);
    }, o.fromRotation = function (e, t) {
      var n = Math.cos(e),
          i = Math.sin(e);
      return r(t) ? (t[0] = n, t[1] = i, t[2] = -i, t[3] = n, t) : new o(n, -i, i, n);
    }, o.toArray = function (e, t) {
      return r(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : [e[0], e[1], e[2], e[3]];
    }, o.getElementIndex = function (e, t) {
      return 2 * e + t;
    }, o.getColumn = function (e, t, n) {
      var r = 2 * t,
          i = e[r],
          a = e[r + 1];
      return n.x = i, n.y = a, n;
    }, o.setColumn = function (e, t, n, r) {
      r = o.clone(e, r);
      var i = 2 * t;
      return r[i] = n.x, r[i + 1] = n.y, r;
    }, o.getRow = function (e, t, n) {
      var r = e[t],
          i = e[t + 2];
      return n.x = r, n.y = i, n;
    }, o.setRow = function (e, t, n, r) {
      return r = o.clone(e, r), r[t] = n.x, r[t + 2] = n.y, r;
    };
    var u = new e();

    o.getScale = function (t, n) {
      return n.x = e.magnitude(e.fromElements(t[0], t[1], u)), n.y = e.magnitude(e.fromElements(t[2], t[3], u)), n;
    };

    var s = new e();
    return o.getMaximumScale = function (t) {
      return o.getScale(t, s), e.maximumComponent(s);
    }, o.multiply = function (e, t, n) {
      var r = e[0] * t[0] + e[2] * t[1],
          i = e[0] * t[2] + e[2] * t[3],
          a = e[1] * t[0] + e[3] * t[1],
          o = e[1] * t[2] + e[3] * t[3];
      return n[0] = r, n[1] = a, n[2] = i, n[3] = o, n;
    }, o.add = function (e, t, n) {
      return n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n;
    }, o.subtract = function (e, t, n) {
      return n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n;
    }, o.multiplyByVector = function (e, t, n) {
      var r = e[0] * t.x + e[2] * t.y,
          i = e[1] * t.x + e[3] * t.y;
      return n.x = r, n.y = i, n;
    }, o.multiplyByScalar = function (e, t, n) {
      return n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n;
    }, o.multiplyByScale = function (e, t, n) {
      return n[0] = e[0] * t.x, n[1] = e[1] * t.x, n[2] = e[2] * t.y, n[3] = e[3] * t.y, n;
    }, o.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t;
    }, o.transpose = function (e, t) {
      var n = e[0],
          r = e[2],
          i = e[1],
          a = e[3];
      return t[0] = n, t[1] = r, t[2] = i, t[3] = a, t;
    }, o.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t;
    }, o.equals = function (e, t) {
      return e === t || r(e) && r(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
    }, o.equalsArray = function (e, t, n) {
      return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3];
    }, o.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n;
    }, o.IDENTITY = a(new o(1, 0, 0, 1)), o.ZERO = a(new o(0, 0, 0, 0)), o.COLUMN0ROW0 = 0, o.COLUMN0ROW1 = 1, o.COLUMN1ROW0 = 2, o.COLUMN1ROW1 = 3, i(o.prototype, {
      length: {
        get: function get() {
          return o.packedLength;
        }
      }
    }), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t) {
      return o.equalsEpsilon(this, e, t);
    }, o.prototype.toString = function () {
      return "(" + this[0] + ", " + this[2] + ")\n(" + this[1] + ", " + this[3] + ")";
    }, o;
  }), define("Core/PrimitiveType", ["./freezeObject", "./WebGLConstants"], function (e, t) {
    "use strict";

    var n = {
      POINTS: t.POINTS,
      LINES: t.LINES,
      LINE_LOOP: t.LINE_LOOP,
      LINE_STRIP: t.LINE_STRIP,
      TRIANGLES: t.TRIANGLES,
      TRIANGLE_STRIP: t.TRIANGLE_STRIP,
      TRIANGLE_FAN: t.TRIANGLE_FAN,
      validate: function validate(e) {
        return e === n.POINTS || e === n.LINES || e === n.LINE_LOOP || e === n.LINE_STRIP || e === n.TRIANGLES || e === n.TRIANGLE_STRIP || e === n.TRIANGLE_FAN;
      }
    };
    return e(n);
  }), define("Core/Geometry", ["./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryOffsetAttribute", "./GeometryType", "./Matrix2", "./Matrix3", "./Matrix4", "./PrimitiveType", "./Quaternion", "./Rectangle", "./Transforms"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m) {
    "use strict";

    function y(e) {
      e = i(e, i.EMPTY_OBJECT), this.attributes = e.attributes, this.indices = e.indices, this.primitiveType = i(e.primitiveType, h.TRIANGLES), this.boundingSphere = e.boundingSphere, this.geometryType = i(e.geometryType, s.NONE), this.boundingSphereCV = e.boundingSphereCV, this.offsetAttribute = e.offsetAttribute;
    }

    y.computeNumberOfVertices = function (e) {
      var t = -1;

      for (var n in e.attributes) {
        if (e.attributes.hasOwnProperty(n) && a(e.attributes[n]) && a(e.attributes[n].values)) {
          var r = e.attributes[n],
              i = r.values.length / r.componentsPerAttribute;
          t = i;
        }
      }

      return t;
    };

    var E = new n(),
        v = new t(),
        _ = new f(),
        T = [new n(), new n(), new n()],
        g = [new e(), new e(), new e()],
        R = [new e(), new e(), new e()],
        A = new t(),
        S = new d(),
        w = new f(),
        O = new c();

    return y._textureCoordinateRotationPoints = function (r, i, a, o) {
      var u,
          s = p.center(o, E),
          h = n.toCartesian(s, a, v),
          y = m.eastNorthUpToFixedFrame(h, a, _),
          I = f.inverse(y, _),
          x = g,
          N = T;
      N[0].longitude = o.west, N[0].latitude = o.south, N[1].longitude = o.west, N[1].latitude = o.north, N[2].longitude = o.east, N[2].latitude = o.south;
      var M = A;

      for (u = 0; u < 3; u++) {
        n.toCartesian(N[u], a, M), M = f.multiplyByPointAsVector(I, M, M), x[u].x = M.x, x[u].y = M.y;
      }

      var C = d.fromAxisAngle(t.UNIT_Z, -i, S),
          P = l.fromQuaternion(C, w),
          b = r.length,
          D = Number.POSITIVE_INFINITY,
          U = Number.POSITIVE_INFINITY,
          L = Number.NEGATIVE_INFINITY,
          F = Number.NEGATIVE_INFINITY;

      for (u = 0; u < b; u++) {
        M = f.multiplyByPointAsVector(I, r[u], M), M = l.multiplyByVector(P, M, M), D = Math.min(D, M.x), U = Math.min(U, M.y), L = Math.max(L, M.x), F = Math.max(F, M.y);
      }

      var B = c.fromRotation(i, O),
          z = R;
      z[0].x = D, z[0].y = U, z[1].x = D, z[1].y = F, z[2].x = L, z[2].y = U;
      var q = x[0],
          G = x[2].x - q.x,
          V = x[1].y - q.y;

      for (u = 0; u < 3; u++) {
        var W = z[u];
        c.multiplyByVector(B, W, W), W.x = (W.x - q.x) / G, W.y = (W.y - q.y) / V;
      }

      var X = z[0],
          k = z[1],
          H = z[2],
          Y = new Array(6);
      return e.pack(X, Y), e.pack(k, Y, 2), e.pack(H, Y, 4), Y;
    }, y;
  }), define("Core/GeometryAttribute", ["./defaultValue", "./defined", "./DeveloperError"], function (e, t, n) {
    "use strict";

    function r(t) {
      t = e(t, e.EMPTY_OBJECT), this.componentDatatype = t.componentDatatype, this.componentsPerAttribute = t.componentsPerAttribute, this.normalize = e(t.normalize, !1), this.values = t.values;
    }

    return r;
  }), define("Core/GeometryAttributes", ["./defaultValue"], function (e) {
    "use strict";

    function t(t) {
      t = e(t, e.EMPTY_OBJECT), this.position = t.position, this.normal = t.normal, this.st = t.st, this.bitangent = t.bitangent, this.tangent = t.tangent, this.color = t.color;
    }

    return t;
  }), define("Core/GeometryInstance", ["./defaultValue", "./defined", "./DeveloperError", "./Matrix4"], function (e, t, n, r) {
    "use strict";

    function i(t) {
      t = e(t, e.EMPTY_OBJECT), this.geometry = t.geometry, this.modelMatrix = r.clone(e(t.modelMatrix, r.IDENTITY)), this.id = t.id, this.pickPrimitive = t.pickPrimitive, this.attributes = e(t.attributes, {}), this.westHemisphereGeometry = void 0, this.eastHemisphereGeometry = void 0;
    }

    return i;
  }), define("Core/AttributeCompression", ["./Cartesian2", "./Cartesian3", "./Check", "./defined", "./DeveloperError", "./Math"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e) {
      return l[0] = e, l[0];
    }

    function u(e) {
      return e >> 1 ^ -(1 & e);
    }

    var s = {};
    s.octEncodeInRange = function (e, t, n) {
      if (n.x = e.x / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z)), n.y = e.y / (Math.abs(e.x) + Math.abs(e.y) + Math.abs(e.z)), e.z < 0) {
        var r = n.x,
            i = n.y;
        n.x = (1 - Math.abs(i)) * a.signNotZero(r), n.y = (1 - Math.abs(r)) * a.signNotZero(i);
      }

      return n.x = a.toSNorm(n.x, t), n.y = a.toSNorm(n.y, t), n;
    }, s.octEncode = function (e, t) {
      return s.octEncodeInRange(e, 255, t);
    };
    var c = new e(),
        l = new Uint8Array(1);
    s.octEncodeToCartesian4 = function (e, t) {
      return s.octEncodeInRange(e, 65535, c), t.x = o(c.x * (1 / 256)), t.y = o(c.x), t.z = o(c.y * (1 / 256)), t.w = o(c.y), t;
    }, s.octDecodeInRange = function (e, n, r, i) {
      if (i.x = a.fromSNorm(e, r), i.y = a.fromSNorm(n, r), i.z = 1 - (Math.abs(i.x) + Math.abs(i.y)), i.z < 0) {
        var o = i.x;
        i.x = (1 - Math.abs(i.y)) * a.signNotZero(o), i.y = (1 - Math.abs(o)) * a.signNotZero(i.y);
      }

      return t.normalize(i, i);
    }, s.octDecode = function (e, t, n) {
      return s.octDecodeInRange(e, t, 255, n);
    }, s.octDecodeFromCartesian4 = function (e, t) {
      var n = e.x,
          r = e.y,
          i = e.z,
          a = e.w,
          o = 256 * n + r,
          u = 256 * i + a;
      return s.octDecodeInRange(o, u, 65535, t);
    }, s.octPackFloat = function (e) {
      return 256 * e.x + e.y;
    };
    var f = new e();
    return s.octEncodeFloat = function (e) {
      return s.octEncode(e, f), s.octPackFloat(f);
    }, s.octDecodeFloat = function (e, t) {
      var n = e / 256,
          r = Math.floor(n),
          i = 256 * (n - r);
      return s.octDecode(r, i, t);
    }, s.octPack = function (e, t, n, r) {
      var i = s.octEncodeFloat(e),
          a = s.octEncodeFloat(t),
          o = s.octEncode(n, f);
      return r.x = 65536 * o.x + i, r.y = 65536 * o.y + a, r;
    }, s.octUnpack = function (e, t, n, r) {
      var i = e.x / 65536,
          a = Math.floor(i),
          o = 65536 * (i - a);
      i = e.y / 65536;
      var u = Math.floor(i),
          c = 65536 * (i - u);
      s.octDecodeFloat(o, t), s.octDecodeFloat(c, n), s.octDecode(a, u, r);
    }, s.compressTextureCoordinates = function (e) {
      return 4096 * (4095 * e.x | 0) + (4095 * e.y | 0);
    }, s.decompressTextureCoordinates = function (e, t) {
      var n = e / 4096,
          r = Math.floor(n);
      return t.x = r / 4095, t.y = (e - 4096 * r) / 4095, t;
    }, s.zigZagDeltaDecode = function (e, t, n) {
      for (var i = e.length, a = 0, o = 0, s = 0, c = 0; c < i; ++c) {
        a += u(e[c]), o += u(t[c]), e[c] = a, t[c] = o, r(n) && (s += u(n[c]), n[c] = s);
      }
    }, s;
  }), define("Core/barycentricCoordinates", ["./Cartesian2", "./Cartesian3", "./Check", "./defined", "./Math"], function (e, t, n, r, i) {
    "use strict";

    function a(n, a, c, l, f) {
      r(f) || (f = new t());

      var h, d, p, m, y, E, v, _;

      if (r(a.z)) {
        if (t.equalsEpsilon(n, a, i.EPSILON14)) return t.clone(t.UNIT_X, f);
        if (t.equalsEpsilon(n, c, i.EPSILON14)) return t.clone(t.UNIT_Y, f);
        if (t.equalsEpsilon(n, l, i.EPSILON14)) return t.clone(t.UNIT_Z, f);
        h = t.subtract(c, a, o), d = t.subtract(l, a, u), p = t.subtract(n, a, s), m = t.dot(h, h), y = t.dot(h, d), E = t.dot(h, p), v = t.dot(d, d), _ = t.dot(d, p);
      } else {
        if (e.equalsEpsilon(n, a, i.EPSILON14)) return t.clone(t.UNIT_X, f);
        if (e.equalsEpsilon(n, c, i.EPSILON14)) return t.clone(t.UNIT_Y, f);
        if (e.equalsEpsilon(n, l, i.EPSILON14)) return t.clone(t.UNIT_Z, f);
        h = e.subtract(c, a, o), d = e.subtract(l, a, u), p = e.subtract(n, a, s), m = e.dot(h, h), y = e.dot(h, d), E = e.dot(h, p), v = e.dot(d, d), _ = e.dot(d, p);
      }

      var T = m * v - y * y,
          g = 1 / T;
      return f.y = (v * E - y * _) * g, f.z = (m * _ - y * E) * g, f.x = 1 - f.y - f.z, f;
    }

    var o = new t(),
        u = new t(),
        s = new t();
    return a;
  }), define("Core/EncodedCartesian3", ["./Cartesian3", "./Check", "./defined"], function (e, t, n) {
    "use strict";

    function r() {
      this.high = e.clone(e.ZERO), this.low = e.clone(e.ZERO);
    }

    r.encode = function (e, t) {
      n(t) || (t = {
        high: 0,
        low: 0
      });
      var r;
      return e >= 0 ? (r = 65536 * Math.floor(e / 65536), t.high = r, t.low = e - r) : (r = 65536 * Math.floor(-e / 65536), t.high = -r, t.low = e + r), t;
    };

    var i = {
      high: 0,
      low: 0
    };

    r.fromCartesian = function (e, t) {
      n(t) || (t = new r());
      var a = t.high,
          o = t.low;
      return r.encode(e.x, i), a.x = i.high, o.x = i.low, r.encode(e.y, i), a.y = i.high, o.y = i.low, r.encode(e.z, i), a.z = i.high, o.z = i.low, t;
    };

    var a = new r();
    return r.writeElements = function (e, t, n) {
      r.fromCartesian(e, a);
      var i = a.high,
          o = a.low;
      t[n] = i.x, t[n + 1] = i.y, t[n + 2] = i.z, t[n + 3] = o.x, t[n + 4] = o.y, t[n + 5] = o.z;
    }, r;
  }), define("Core/IndexDatatype", ["./defined", "./DeveloperError", "./freezeObject", "./Math", "./WebGLConstants"], function (e, t, n, r, i) {
    "use strict";

    var a = {
      UNSIGNED_BYTE: i.UNSIGNED_BYTE,
      UNSIGNED_SHORT: i.UNSIGNED_SHORT,
      UNSIGNED_INT: i.UNSIGNED_INT
    };
    return a.getSizeInBytes = function (e) {
      switch (e) {
        case a.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT;

        case a.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT;

        case a.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT;
      }
    }, a.fromSizeInBytes = function (e) {
      switch (e) {
        case 2:
          return a.UNSIGNED_SHORT;

        case 4:
          return a.UNSIGNED_INT;

        case 1:
          return a.UNSIGNED_BYTE;
      }
    }, a.validate = function (t) {
      return e(t) && (t === a.UNSIGNED_BYTE || t === a.UNSIGNED_SHORT || t === a.UNSIGNED_INT);
    }, a.createTypedArray = function (e, t) {
      return e >= r.SIXTY_FOUR_KILOBYTES ? new Uint32Array(t) : new Uint16Array(t);
    }, a.createTypedArrayFromArrayBuffer = function (e, t, n, i) {
      return e >= r.SIXTY_FOUR_KILOBYTES ? new Uint32Array(t, n, i) : new Uint16Array(t, n, i);
    }, n(a);
  }), define("Core/Tipsify", ["./defaultValue", "./defined", "./DeveloperError"], function (e, t, n) {
    "use strict";

    var r = {};
    return r.calculateACMR = function (n) {
      n = e(n, e.EMPTY_OBJECT);
      var r = n.indices,
          i = n.maximumIndex,
          a = e(n.cacheSize, 24),
          o = r.length;

      if (!t(i)) {
        i = 0;

        for (var u = 0, s = r[u]; u < o;) {
          s > i && (i = s), ++u, s = r[u];
        }
      }

      for (var c = [], l = 0; l < i + 1; l++) {
        c[l] = 0;
      }

      for (var f = a + 1, h = 0; h < o; ++h) {
        f - c[r[h]] > a && (c[r[h]] = f, ++f);
      }

      return (f - a + 1) / (o / 3);
    }, r.tipsify = function (n) {
      function r(e, t, n, r) {
        for (; t.length >= 1;) {
          var a = t[t.length - 1];
          if (t.splice(t.length - 1, 1), e[a].numLiveTriangles > 0) return a;
        }

        for (; i < r;) {
          if (e[i].numLiveTriangles > 0) return ++i - 1;
          ++i;
        }

        return -1;
      }

      n = e(n, e.EMPTY_OBJECT);
      var i,
          a = n.indices,
          o = n.maximumIndex,
          u = e(n.cacheSize, 24),
          s = a.length,
          c = 0,
          l = 0,
          f = a[l],
          h = s;
      if (t(o)) c = o + 1;else {
        for (; l < h;) {
          f > c && (c = f), ++l, f = a[l];
        }

        if (-1 === c) return 0;
        ++c;
      }
      var d,
          p = [];

      for (d = 0; d < c; d++) {
        p[d] = {
          numLiveTriangles: 0,
          timeStamp: 0,
          vertexTriangles: []
        };
      }

      l = 0;

      for (var m = 0; l < h;) {
        p[a[l]].vertexTriangles.push(m), ++p[a[l]].numLiveTriangles, p[a[l + 1]].vertexTriangles.push(m), ++p[a[l + 1]].numLiveTriangles, p[a[l + 2]].vertexTriangles.push(m), ++p[a[l + 2]].numLiveTriangles, ++m, l += 3;
      }

      var y = 0,
          E = u + 1;
      i = 1;

      var v,
          _,
          T = [],
          g = [],
          R = 0,
          A = [],
          S = s / 3,
          w = [];

      for (d = 0; d < S; d++) {
        w[d] = !1;
      }

      for (var O, I; -1 !== y;) {
        T = [], _ = p[y], I = _.vertexTriangles.length;

        for (var x = 0; x < I; ++x) {
          if (m = _.vertexTriangles[x], !w[m]) {
            w[m] = !0, l = m + m + m;

            for (var N = 0; N < 3; ++N) {
              O = a[l], T.push(O), g.push(O), A[R] = O, ++R, v = p[O], --v.numLiveTriangles, E - v.timeStamp > u && (v.timeStamp = E, ++E), ++l;
            }
          }
        }

        y = function (e, t, n, i, a, o, u) {
          for (var s, c = -1, l = -1, f = 0; f < n.length;) {
            var h = n[f];
            i[h].numLiveTriangles && (s = 0, a - i[h].timeStamp + 2 * i[h].numLiveTriangles <= t && (s = a - i[h].timeStamp), (s > l || -1 === l) && (l = s, c = h)), ++f;
          }

          return -1 === c ? r(i, o, e, u) : c;
        }(a, u, T, p, E, g, c);
      }

      return A;
    }, r;
  }), define("Core/GeometryPipeline", ["./AttributeCompression", "./barycentricCoordinates", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./EncodedCartesian3", "./GeographicProjection", "./Geometry", "./GeometryAttribute", "./GeometryType", "./IndexDatatype", "./Intersect", "./IntersectionTests", "./Math", "./Matrix3", "./Matrix4", "./Plane", "./PrimitiveType", "./Tipsify"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m, y, E, v, _, T, g, R, A, S) {
    "use strict";

    function w(e, t, n, r, i) {
      e[t++] = n, e[t++] = r, e[t++] = r, e[t++] = i, e[t++] = i, e[t] = n;
    }

    function O(e) {
      for (var t = e.length, n = t / 3 * 6, r = y.createTypedArray(t, n), i = 0, a = 0; a < t; a += 3, i += 6) {
        w(r, i, e[a], e[a + 1], e[a + 2]);
      }

      return r;
    }

    function I(e) {
      var t = e.length;

      if (t >= 3) {
        var n = 6 * (t - 2),
            r = y.createTypedArray(t, n);
        w(r, 0, e[0], e[1], e[2]);

        for (var i = 6, a = 3; a < t; ++a, i += 6) {
          w(r, i, e[a - 1], e[a], e[a - 2]);
        }

        return r;
      }

      return new Uint16Array();
    }

    function x(e) {
      if (e.length > 0) {
        for (var t = e.length - 1, n = 6 * (t - 1), r = y.createTypedArray(t, n), i = e[0], a = 0, o = 1; o < t; ++o, a += 6) {
          w(r, a, i, e[o], e[o + 1]);
        }

        return r;
      }

      return new Uint16Array();
    }

    function N(e) {
      var t = {};

      for (var n in e) {
        if (e.hasOwnProperty(n) && c(e[n]) && c(e[n].values)) {
          var r = e[n];
          t[n] = new p({
            componentDatatype: r.componentDatatype,
            componentsPerAttribute: r.componentsPerAttribute,
            normalize: r.normalize,
            values: []
          });
        }
      }

      return t;
    }

    function M(e, t, n) {
      for (var r in t) {
        if (t.hasOwnProperty(r) && c(t[r]) && c(t[r].values)) for (var i = t[r], a = 0; a < i.componentsPerAttribute; ++a) {
          e[r].values.push(i.values[n * i.componentsPerAttribute + a]);
        }
      }
    }

    function C(e, t) {
      if (c(t)) for (var n = t.values, r = n.length, a = 0; a < r; a += 3) {
        i.unpack(n, a, se), g.multiplyByPoint(e, se, se), i.pack(se, n, a);
      }
    }

    function P(e, t) {
      if (c(t)) for (var n = t.values, r = n.length, a = 0; a < r; a += 3) {
        i.unpack(n, a, se), T.multiplyByVector(e, se, se), se = i.normalize(se, se), i.pack(se, n, a);
      }
    }

    function b(e, t) {
      var n,
          r = e.length,
          i = {},
          a = e[0][t].attributes;

      for (n in a) {
        if (a.hasOwnProperty(n) && c(a[n]) && c(a[n].values)) {
          for (var o = a[n], s = o.values.length, l = !0, f = 1; f < r; ++f) {
            var h = e[f][t].attributes[n];

            if (!c(h) || o.componentDatatype !== h.componentDatatype || o.componentsPerAttribute !== h.componentsPerAttribute || o.normalize !== h.normalize) {
              l = !1;
              break;
            }

            s += h.values.length;
          }

          l && (i[n] = new p({
            componentDatatype: o.componentDatatype,
            componentsPerAttribute: o.componentsPerAttribute,
            normalize: o.normalize,
            values: u.createTypedArray(o.componentDatatype, s)
          }));
        }
      }

      return i;
    }

    function D(e, t) {
      var r,
          a,
          o,
          u,
          s,
          l,
          f,
          h = e.length,
          p = (e[0].modelMatrix, c(e[0][t].indices)),
          m = e[0][t].primitiveType,
          E = b(e, t);

      for (r in E) {
        if (E.hasOwnProperty(r)) for (s = E[r].values, u = 0, a = 0; a < h; ++a) {
          for (l = e[a][t].attributes[r].values, f = l.length, o = 0; o < f; ++o) {
            s[u++] = l[o];
          }
        }
      }

      var v;

      if (p) {
        var _ = 0;

        for (a = 0; a < h; ++a) {
          _ += e[a][t].indices.length;
        }

        var T = d.computeNumberOfVertices(new d({
          attributes: E,
          primitiveType: A.POINTS
        })),
            g = y.createTypedArray(T, _),
            R = 0,
            S = 0;

        for (a = 0; a < h; ++a) {
          var w = e[a][t].indices,
              O = w.length;

          for (u = 0; u < O; ++u) {
            g[R++] = S + w[u];
          }

          S += d.computeNumberOfVertices(e[a][t]);
        }

        v = g;
      }

      var I,
          x = new i(),
          N = 0;

      for (a = 0; a < h; ++a) {
        if (I = e[a][t].boundingSphere, !c(I)) {
          x = void 0;
          break;
        }

        i.add(I.center, x, x);
      }

      if (c(x)) for (i.divideByScalar(x, h, x), a = 0; a < h; ++a) {
        I = e[a][t].boundingSphere;
        var M = i.magnitude(i.subtract(I.center, x, fe)) + I.radius;
        M > N && (N = M);
      }
      return new d({
        attributes: E,
        indices: v,
        primitiveType: m,
        boundingSphere: c(x) ? new n(x, N) : void 0
      });
    }

    function U(e) {
      if (c(e.indices)) return e;

      for (var t = d.computeNumberOfVertices(e), n = y.createTypedArray(t, t), r = 0; r < t; ++r) {
        n[r] = r;
      }

      return e.indices = n, e;
    }

    function L(e) {
      var t = d.computeNumberOfVertices(e),
          n = y.createTypedArray(t, 3 * (t - 2));
      n[0] = 1, n[1] = 0, n[2] = 2;

      for (var r = 3, i = 3; i < t; ++i) {
        n[r++] = i - 1, n[r++] = 0, n[r++] = i;
      }

      return e.indices = n, e.primitiveType = A.TRIANGLES, e;
    }

    function F(e) {
      var t = d.computeNumberOfVertices(e),
          n = y.createTypedArray(t, 3 * (t - 2));
      n[0] = 0, n[1] = 1, n[2] = 2, t > 3 && (n[3] = 0, n[4] = 2, n[5] = 3);

      for (var r = 6, i = 3; i < t - 1; i += 2) {
        n[r++] = i, n[r++] = i - 1, n[r++] = i + 1, i + 2 < t && (n[r++] = i, n[r++] = i + 1, n[r++] = i + 2);
      }

      return e.indices = n, e.primitiveType = A.TRIANGLES, e;
    }

    function B(e) {
      if (c(e.indices)) return e;

      for (var t = d.computeNumberOfVertices(e), n = y.createTypedArray(t, t), r = 0; r < t; ++r) {
        n[r] = r;
      }

      return e.indices = n, e;
    }

    function z(e) {
      var t = d.computeNumberOfVertices(e),
          n = y.createTypedArray(t, 2 * (t - 1));
      n[0] = 0, n[1] = 1;

      for (var r = 2, i = 2; i < t; ++i) {
        n[r++] = i - 1, n[r++] = i;
      }

      return e.indices = n, e.primitiveType = A.LINES, e;
    }

    function q(e) {
      var t = d.computeNumberOfVertices(e),
          n = y.createTypedArray(t, 2 * t);
      n[0] = 0, n[1] = 1;

      for (var r = 2, i = 2; i < t; ++i) {
        n[r++] = i - 1, n[r++] = i;
      }

      return n[r++] = t - 1, n[r] = 0, e.indices = n, e.primitiveType = A.LINES, e;
    }

    function G(e) {
      switch (e.primitiveType) {
        case A.TRIANGLE_FAN:
          return L(e);

        case A.TRIANGLE_STRIP:
          return F(e);

        case A.TRIANGLES:
          return U(e);

        case A.LINE_STRIP:
          return z(e);

        case A.LINE_LOOP:
          return q(e);

        case A.LINES:
          return B(e);
      }

      return e;
    }

    function V(e, t) {
      Math.abs(e.y) < _.EPSILON6 && (e.y = t ? -_.EPSILON6 : _.EPSILON6);
    }

    function W(e, t, n) {
      if (0 !== e.y && 0 !== t.y && 0 !== n.y) return V(e, e.y < 0), V(t, t.y < 0), void V(n, n.y < 0);
      var r,
          i = Math.abs(e.y),
          a = Math.abs(t.y),
          o = Math.abs(n.y);
      r = i > a ? i > o ? _.sign(e.y) : _.sign(n.y) : a > o ? _.sign(t.y) : _.sign(n.y);
      var u = r < 0;
      V(e, u), V(t, u), V(n, u);
    }

    function X(e, t, n, r) {
      i.add(e, i.multiplyByScalar(i.subtract(t, e, Se), e.y / (e.y - t.y), Se), n), i.clone(n, r), V(n, !0), V(r, !1);
    }

    function k(e, t, n) {
      if (!(e.x >= 0 || t.x >= 0 || n.x >= 0)) {
        W(e, t, n);
        var r = e.y < 0,
            i = t.y < 0,
            a = n.y < 0,
            o = 0;
        o += r ? 1 : 0, o += i ? 1 : 0, o += a ? 1 : 0;
        var u = Ne.indices;
        1 === o ? (u[1] = 3, u[2] = 4, u[5] = 6, u[7] = 6, u[8] = 5, r ? (X(e, t, we, Ie), X(e, n, Oe, xe), u[0] = 0, u[3] = 1, u[4] = 2, u[6] = 1) : i ? (X(t, n, we, Ie), X(t, e, Oe, xe), u[0] = 1, u[3] = 2, u[4] = 0, u[6] = 2) : a && (X(n, e, we, Ie), X(n, t, Oe, xe), u[0] = 2, u[3] = 0, u[4] = 1, u[6] = 0)) : 2 === o && (u[2] = 4, u[4] = 4, u[5] = 3, u[7] = 5, u[8] = 6, r ? i ? a || (X(n, e, we, Ie), X(n, t, Oe, xe), u[0] = 0, u[1] = 1, u[3] = 0, u[6] = 2) : (X(t, n, we, Ie), X(t, e, Oe, xe), u[0] = 2, u[1] = 0, u[3] = 2, u[6] = 1) : (X(e, t, we, Ie), X(e, n, Oe, xe), u[0] = 1, u[1] = 2, u[3] = 1, u[6] = 0));
        var s = Ne.positions;
        return s[0] = e, s[1] = t, s[2] = n, s.length = 3, 1 !== o && 2 !== o || (s[3] = we, s[4] = Oe, s[5] = Ie, s[6] = xe, s.length = 7), Ne;
      }
    }

    function H(e, t) {
      var r = e.attributes;

      if (0 !== r.position.values.length) {
        for (var i in r) {
          if (r.hasOwnProperty(i) && c(r[i]) && c(r[i].values)) {
            var a = r[i];
            a.values = u.createTypedArray(a.componentDatatype, a.values);
          }
        }

        var o = d.computeNumberOfVertices(e);
        return e.indices = y.createTypedArray(o, e.indices), t && (e.boundingSphere = n.fromVertices(r.position.values)), e;
      }
    }

    function Y(e) {
      var t = e.attributes,
          n = {};

      for (var r in t) {
        if (t.hasOwnProperty(r) && c(t[r]) && c(t[r].values)) {
          var i = t[r];
          n[r] = new p({
            componentDatatype: i.componentDatatype,
            componentsPerAttribute: i.componentsPerAttribute,
            normalize: i.normalize,
            values: []
          });
        }
      }

      return new d({
        attributes: n,
        indices: [],
        primitiveType: e.primitiveType
      });
    }

    function j(e, t, n) {
      var r = c(e.geometry.boundingSphere);
      t = H(t, r), n = H(n, r), c(n) && !c(t) ? e.geometry = n : !c(n) && c(t) ? e.geometry = t : (e.westHemisphereGeometry = t, e.eastHemisphereGeometry = n, e.geometry = void 0);
    }

    function Z(e, t) {
      var n = new e(),
          r = new e(),
          i = new e();
      return function (a, o, u, s, c, l, f, h) {
        var d = e.fromArray(c, a * t, n),
            p = e.fromArray(c, o * t, r),
            m = e.fromArray(c, u * t, i);
        e.multiplyByScalar(d, s.x, d), e.multiplyByScalar(p, s.y, p), e.multiplyByScalar(m, s.z, m);
        var y = e.add(d, p, d);
        e.add(y, m, y), h && e.normalize(y, y), e.pack(y, l, f * t);
      };
    }

    function K(e, n, r, a, o, u, s, l, f, h, d, p, m, y, E, v) {
      if (c(u) || c(s) || c(l) || c(f) || c(h) || 0 !== y) {
        var _ = i.fromArray(o, 3 * e, De),
            T = i.fromArray(o, 3 * n, Ue),
            g = i.fromArray(o, 3 * r, Le),
            R = t(a, _, T, g, Fe);

        if (c(u) && Ce(e, n, r, R, u, p.normal.values, v, !0), c(h)) {
          var A = i.fromArray(h, 3 * e, De),
              S = i.fromArray(h, 3 * n, Ue),
              w = i.fromArray(h, 3 * r, Le);
          i.multiplyByScalar(A, R.x, A), i.multiplyByScalar(S, R.y, S), i.multiplyByScalar(w, R.z, w);
          var O;
          i.equals(A, i.ZERO) && i.equals(S, i.ZERO) && i.equals(w, i.ZERO) ? (O = De, O.x = 0, O.y = 0, O.z = 0) : (O = i.add(A, S, A), i.add(O, w, O), i.normalize(O, O)), i.pack(O, p.extrudeDirection.values, 3 * v);
        }

        if (c(d) && be(e, n, r, R, d, p.applyOffset.values, v), c(s) && Ce(e, n, r, R, s, p.tangent.values, v, !0), c(l) && Ce(e, n, r, R, l, p.bitangent.values, v, !0), c(f) && Pe(e, n, r, R, f, p.st.values, v), y > 0) for (var I = 0; I < y; I++) {
          var x = m[I];
          J(e, n, r, R, v, E[x], p[x]);
        }
      }
    }

    function J(e, t, n, r, i, a, o) {
      var u = a.componentsPerAttribute,
          s = a.values,
          c = o.values;

      switch (u) {
        case 4:
          Me(e, t, n, r, s, c, i, !1);
          break;

        case 3:
          Ce(e, t, n, r, s, c, i, !1);
          break;

        case 2:
          Pe(e, t, n, r, s, c, i, !1);
          break;

        default:
          c[i] = s[e] * r.x + s[t] * r.y + s[n] * r.z;
      }
    }

    function Q(e, t, n, r, i, a) {
      var o = e.position.values.length / 3;

      if (-1 !== i) {
        var u = r[i],
            s = n[u];
        return -1 === s ? (n[u] = o, e.position.values.push(a.x, a.y, a.z), t.push(o), o) : (t.push(s), s);
      }

      return e.position.values.push(a.x, a.y, a.z), t.push(o), o;
    }

    function $(e) {
      var t = e.geometry,
          n = t.attributes,
          r = n.position.values,
          a = c(n.normal) ? n.normal.values : void 0,
          o = c(n.bitangent) ? n.bitangent.values : void 0,
          u = c(n.tangent) ? n.tangent.values : void 0,
          s = c(n.st) ? n.st.values : void 0,
          l = c(n.extrudeDirection) ? n.extrudeDirection.values : void 0,
          f = c(n.applyOffset) ? n.applyOffset.values : void 0,
          h = t.indices,
          d = [];

      for (var p in n) {
        n.hasOwnProperty(p) && !Be[p] && c(n[p]) && d.push(p);
      }

      var m,
          y,
          E,
          v,
          _,
          T = d.length,
          g = Y(t),
          R = Y(t),
          A = [];

      A.length = r.length / 3;
      var S = [];

      for (S.length = r.length / 3, _ = 0; _ < A.length; ++_) {
        A[_] = -1, S[_] = -1;
      }

      var w = h.length;

      for (_ = 0; _ < w; _ += 3) {
        var O = h[_],
            I = h[_ + 1],
            x = h[_ + 2],
            N = i.fromArray(r, 3 * O),
            M = i.fromArray(r, 3 * I),
            C = i.fromArray(r, 3 * x),
            P = k(N, M, C);
        if (c(P) && P.positions.length > 3) for (var b = P.positions, D = P.indices, U = D.length, L = 0; L < U; ++L) {
          var F = D[L],
              B = b[F];
          B.y < 0 ? (m = R.attributes, y = R.indices, E = A) : (m = g.attributes, y = g.indices, E = S), v = Q(m, y, E, h, F < 3 ? _ + F : -1, B), K(O, I, x, B, r, a, u, o, s, l, f, m, d, T, n, v);
        } else c(P) && (N = P.positions[0], M = P.positions[1], C = P.positions[2]), N.y < 0 ? (m = R.attributes, y = R.indices, E = A) : (m = g.attributes, y = g.indices, E = S), v = Q(m, y, E, h, _, N), K(O, I, x, N, r, a, u, o, s, l, f, m, d, T, n, v), v = Q(m, y, E, h, _ + 1, M), K(O, I, x, M, r, a, u, o, s, l, f, m, d, T, n, v), v = Q(m, y, E, h, _ + 2, C), K(O, I, x, C, r, a, u, o, s, l, f, m, d, T, n, v);
      }

      j(e, R, g);
    }

    function ee(e, t, n, r, a, o, u) {
      if (c(u)) {
        var s = i.fromArray(r, 3 * e, De);
        i.equalsEpsilon(s, n, _.EPSILON10) ? o.applyOffset.values[a] = u[e] : o.applyOffset.values[a] = u[t];
      }
    }

    function te(e) {
      var t,
          n = e.geometry,
          r = n.attributes,
          a = r.position.values,
          o = c(r.applyOffset) ? r.applyOffset.values : void 0,
          u = n.indices,
          s = Y(n),
          l = Y(n),
          f = u.length,
          h = [];
      h.length = a.length / 3;
      var d = [];

      for (d.length = a.length / 3, t = 0; t < h.length; ++t) {
        h[t] = -1, d[t] = -1;
      }

      for (t = 0; t < f; t += 2) {
        var p,
            m = u[t],
            y = u[t + 1],
            E = i.fromArray(a, 3 * m, De),
            T = i.fromArray(a, 3 * y, Ue);
        Math.abs(E.y) < _.EPSILON6 && (E.y < 0 ? E.y = -_.EPSILON6 : E.y = _.EPSILON6), Math.abs(T.y) < _.EPSILON6 && (T.y < 0 ? T.y = -_.EPSILON6 : T.y = _.EPSILON6);
        var g = s.attributes,
            R = s.indices,
            A = d,
            S = l.attributes,
            w = l.indices,
            O = h,
            I = v.lineSegmentPlane(E, T, ze, Le);

        if (c(I)) {
          var x = i.multiplyByScalar(i.UNIT_Y, 5 * _.EPSILON9, qe);
          E.y < 0 && (i.negate(x, x), g = l.attributes, R = l.indices, A = h, S = s.attributes, w = s.indices, O = d);
          var N = i.add(I, x, Ge);
          p = Q(g, R, A, u, t, E), ee(m, y, E, a, p, g, o), p = Q(g, R, A, u, -1, N), ee(m, y, N, a, p, g, o), i.negate(x, x), i.add(I, x, N), p = Q(S, w, O, u, -1, N), ee(m, y, N, a, p, S, o), p = Q(S, w, O, u, t + 1, T), ee(m, y, T, a, p, S, o);
        } else {
          var M, C, P;
          E.y < 0 ? (M = l.attributes, C = l.indices, P = h) : (M = s.attributes, C = s.indices, P = d), p = Q(M, C, P, u, t, E), ee(m, y, E, a, p, M, o), p = Q(M, C, P, u, t + 1, T), ee(m, y, T, a, p, M, o);
        }
      }

      j(e, l, s);
    }

    function ne(e) {
      for (var t = e.attributes, n = t.position.values, r = t.prevPosition.values, a = t.nextPosition.values, o = n.length, u = 0; u < o; u += 3) {
        var s = i.unpack(n, u, Xe);

        if (!(s.x > 0)) {
          var c = i.unpack(r, u, ke);
          (s.y < 0 && c.y > 0 || s.y > 0 && c.y < 0) && (u - 3 > 0 ? (r[u] = n[u - 3], r[u + 1] = n[u - 2], r[u + 2] = n[u - 1]) : i.pack(s, r, u));
          var l = i.unpack(a, u, He);
          (s.y < 0 && l.y > 0 || s.y > 0 && l.y < 0) && (u + 3 < o ? (a[u] = n[u + 3], a[u + 1] = n[u + 4], a[u + 2] = n[u + 5]) : i.pack(s, a, u));
        }
      }
    }

    function re(e) {
      var t,
          n,
          o,
          u = e.geometry,
          s = u.attributes,
          l = s.position.values,
          f = s.prevPosition.values,
          h = s.nextPosition.values,
          d = s.expandAndWidth.values,
          p = c(s.st) ? s.st.values : void 0,
          m = c(s.color) ? s.color.values : void 0,
          y = Y(u),
          E = Y(u),
          T = !1,
          g = l.length / 3;

      for (t = 0; t < g; t += 4) {
        var R = t,
            A = t + 2,
            S = i.fromArray(l, 3 * R, Xe),
            w = i.fromArray(l, 3 * A, ke);
        if (Math.abs(S.y) < Qe) for (S.y = Qe * (w.y < 0 ? -1 : 1), l[3 * t + 1] = S.y, l[3 * (t + 1) + 1] = S.y, n = 3 * R; n < 3 * R + 12; n += 3) {
          f[n] = l[3 * t], f[n + 1] = l[3 * t + 1], f[n + 2] = l[3 * t + 2];
        }
        if (Math.abs(w.y) < Qe) for (w.y = Qe * (S.y < 0 ? -1 : 1), l[3 * (t + 2) + 1] = w.y, l[3 * (t + 3) + 1] = w.y, n = 3 * R; n < 3 * R + 12; n += 3) {
          h[n] = l[3 * (t + 2)], h[n + 1] = l[3 * (t + 2) + 1], h[n + 2] = l[3 * (t + 2) + 2];
        }
        var O = y.attributes,
            I = y.indices,
            x = E.attributes,
            N = E.indices,
            M = v.lineSegmentPlane(S, w, ze, Ye);

        if (c(M)) {
          T = !0;
          var C = i.multiplyByScalar(i.UNIT_Y, Je, je);
          S.y < 0 && (i.negate(C, C), O = E.attributes, I = E.indices, x = y.attributes, N = y.indices);
          var P = i.add(M, C, Ze);
          O.position.values.push(S.x, S.y, S.z, S.x, S.y, S.z), O.position.values.push(P.x, P.y, P.z), O.position.values.push(P.x, P.y, P.z), O.prevPosition.values.push(f[3 * R], f[3 * R + 1], f[3 * R + 2]), O.prevPosition.values.push(f[3 * R + 3], f[3 * R + 4], f[3 * R + 5]), O.prevPosition.values.push(S.x, S.y, S.z, S.x, S.y, S.z), O.nextPosition.values.push(P.x, P.y, P.z), O.nextPosition.values.push(P.x, P.y, P.z), O.nextPosition.values.push(P.x, P.y, P.z), O.nextPosition.values.push(P.x, P.y, P.z), i.negate(C, C), i.add(M, C, P), x.position.values.push(P.x, P.y, P.z), x.position.values.push(P.x, P.y, P.z), x.position.values.push(w.x, w.y, w.z, w.x, w.y, w.z), x.prevPosition.values.push(P.x, P.y, P.z), x.prevPosition.values.push(P.x, P.y, P.z), x.prevPosition.values.push(P.x, P.y, P.z), x.prevPosition.values.push(P.x, P.y, P.z), x.nextPosition.values.push(w.x, w.y, w.z, w.x, w.y, w.z), x.nextPosition.values.push(h[3 * A], h[3 * A + 1], h[3 * A + 2]), x.nextPosition.values.push(h[3 * A + 3], h[3 * A + 4], h[3 * A + 5]);
          var b = r.fromArray(d, 2 * R, Ve),
              D = Math.abs(b.y);
          O.expandAndWidth.values.push(-1, D, 1, D), O.expandAndWidth.values.push(-1, -D, 1, -D), x.expandAndWidth.values.push(-1, D, 1, D), x.expandAndWidth.values.push(-1, -D, 1, -D);
          var U = i.magnitudeSquared(i.subtract(M, S, He));

          if (U /= i.magnitudeSquared(i.subtract(w, S, He)), c(m)) {
            var L = a.fromArray(m, 4 * R, Ke),
                F = a.fromArray(m, 4 * A, Ke),
                B = _.lerp(L.x, F.x, U),
                z = _.lerp(L.y, F.y, U),
                q = _.lerp(L.z, F.z, U),
                G = _.lerp(L.w, F.w, U);

            for (n = 4 * R; n < 4 * R + 8; ++n) {
              O.color.values.push(m[n]);
            }

            for (O.color.values.push(B, z, q, G), O.color.values.push(B, z, q, G), x.color.values.push(B, z, q, G), x.color.values.push(B, z, q, G), n = 4 * A; n < 4 * A + 8; ++n) {
              x.color.values.push(m[n]);
            }
          }

          if (c(p)) {
            var V = r.fromArray(p, 2 * R, Ve),
                W = r.fromArray(p, 2 * (t + 3), We),
                X = _.lerp(V.x, W.x, U);

            for (n = 2 * R; n < 2 * R + 4; ++n) {
              O.st.values.push(p[n]);
            }

            for (O.st.values.push(X, V.y), O.st.values.push(X, W.y), x.st.values.push(X, V.y), x.st.values.push(X, W.y), n = 2 * A; n < 2 * A + 4; ++n) {
              x.st.values.push(p[n]);
            }
          }

          o = O.position.values.length / 3 - 4, I.push(o, o + 2, o + 1), I.push(o + 1, o + 2, o + 3), o = x.position.values.length / 3 - 4, N.push(o, o + 2, o + 1), N.push(o + 1, o + 2, o + 3);
        } else {
          var k, H;

          for (S.y < 0 ? (k = E.attributes, H = E.indices) : (k = y.attributes, H = y.indices), k.position.values.push(S.x, S.y, S.z), k.position.values.push(S.x, S.y, S.z), k.position.values.push(w.x, w.y, w.z), k.position.values.push(w.x, w.y, w.z), n = 3 * t; n < 3 * t + 12; ++n) {
            k.prevPosition.values.push(f[n]), k.nextPosition.values.push(h[n]);
          }

          for (n = 2 * t; n < 2 * t + 8; ++n) {
            k.expandAndWidth.values.push(d[n]), c(p) && k.st.values.push(p[n]);
          }

          if (c(m)) for (n = 4 * t; n < 4 * t + 16; ++n) {
            k.color.values.push(m[n]);
          }
          o = k.position.values.length / 3 - 4, H.push(o, o + 2, o + 1), H.push(o + 1, o + 2, o + 3);
        }
      }

      T && (ne(E), ne(y)), j(e, E, y);
    }

    var ie = {};
    ie.toWireframe = function (e) {
      var t = e.indices;

      if (c(t)) {
        switch (e.primitiveType) {
          case A.TRIANGLES:
            e.indices = O(t);
            break;

          case A.TRIANGLE_STRIP:
            e.indices = I(t);
            break;

          case A.TRIANGLE_FAN:
            e.indices = x(t);
        }

        e.primitiveType = A.LINES;
      }

      return e;
    }, ie.createLineSegmentsForVectors = function (e, t, r) {
      t = s(t, "normal"), r = s(r, 1e4);

      for (var i = e.attributes.position.values, a = e.attributes[t].values, o = i.length, l = new Float64Array(2 * o), f = 0, h = 0; h < o; h += 3) {
        l[f++] = i[h], l[f++] = i[h + 1], l[f++] = i[h + 2], l[f++] = i[h] + a[h] * r, l[f++] = i[h + 1] + a[h + 1] * r, l[f++] = i[h + 2] + a[h + 2] * r;
      }

      var m,
          y = e.boundingSphere;
      return c(y) && (m = new n(y.center, y.radius + r)), new d({
        attributes: {
          position: new p({
            componentDatatype: u.DOUBLE,
            componentsPerAttribute: 3,
            values: l
          })
        },
        primitiveType: A.LINES,
        boundingSphere: m
      });
    }, ie.createAttributeLocations = function (e) {
      var t,
          n = ["position", "positionHigh", "positionLow", "position3DHigh", "position3DLow", "position2DHigh", "position2DLow", "pickColor", "normal", "st", "tangent", "bitangent", "extrudeDirection", "compressedAttributes"],
          r = e.attributes,
          i = {},
          a = 0,
          o = n.length;

      for (t = 0; t < o; ++t) {
        var u = n[t];
        c(r[u]) && (i[u] = a++);
      }

      for (var s in r) {
        r.hasOwnProperty(s) && !c(i[s]) && (i[s] = a++);
      }

      return i;
    }, ie.reorderForPreVertexCache = function (e) {
      var t = d.computeNumberOfVertices(e),
          n = e.indices;

      if (c(n)) {
        for (var r = new Int32Array(t), i = 0; i < t; i++) {
          r[i] = -1;
        }

        for (var a, o = n, s = o.length, l = y.createTypedArray(t, s), f = 0, h = 0, p = 0; f < s;) {
          a = r[o[f]], -1 !== a ? l[h] = a : (a = o[f], r[a] = p, l[h] = p, ++p), ++f, ++h;
        }

        e.indices = l;
        var m = e.attributes;

        for (var E in m) {
          if (m.hasOwnProperty(E) && c(m[E]) && c(m[E].values)) {
            for (var v = m[E], _ = v.values, T = 0, g = v.componentsPerAttribute, R = u.createTypedArray(v.componentDatatype, p * g); T < t;) {
              var A = r[T];
              if (-1 !== A) for (var S = 0; S < g; S++) {
                R[g * A + S] = _[g * T + S];
              }
              ++T;
            }

            v.values = R;
          }
        }
      }

      return e;
    }, ie.reorderForPostVertexCache = function (e, t) {
      var n = e.indices;

      if (e.primitiveType === A.TRIANGLES && c(n)) {
        for (var r = n.length, i = 0, a = 0; a < r; a++) {
          n[a] > i && (i = n[a]);
        }

        e.indices = S.tipsify({
          indices: n,
          maximumIndex: i,
          cacheSize: t
        });
      }

      return e;
    }, ie.fitToUnsignedShortIndices = function (e) {
      var t = [],
          n = d.computeNumberOfVertices(e);

      if (c(e.indices) && n >= _.SIXTY_FOUR_KILOBYTES) {
        var r,
            i = [],
            a = [],
            o = 0,
            u = N(e.attributes),
            s = e.indices,
            l = s.length;
        e.primitiveType === A.TRIANGLES ? r = 3 : e.primitiveType === A.LINES ? r = 2 : e.primitiveType === A.POINTS && (r = 1);

        for (var f = 0; f < l; f += r) {
          for (var h = 0; h < r; ++h) {
            var p = s[f + h],
                m = i[p];
            c(m) || (m = o++, i[p] = m, M(u, e.attributes, p)), a.push(m);
          }

          o + r >= _.SIXTY_FOUR_KILOBYTES && (t.push(new d({
            attributes: u,
            indices: a,
            primitiveType: e.primitiveType,
            boundingSphere: e.boundingSphere,
            boundingSphereCV: e.boundingSphereCV
          })), i = [], a = [], o = 0, u = N(e.attributes));
        }

        0 !== a.length && t.push(new d({
          attributes: u,
          indices: a,
          primitiveType: e.primitiveType,
          boundingSphere: e.boundingSphere,
          boundingSphereCV: e.boundingSphereCV
        }));
      } else t.push(e);

      return t;
    };
    var ae = new i(),
        oe = new o();

    ie.projectTo2D = function (e, t, n, r, a) {
      var o = e.attributes[t];
      a = c(a) ? a : new h();

      for (var s = a.ellipsoid, l = o.values, f = new Float64Array(l.length), d = 0, m = 0; m < l.length; m += 3) {
        var y = i.fromArray(l, m, ae),
            E = s.cartesianToCartographic(y, oe),
            v = a.project(E, ae);
        f[d++] = v.x, f[d++] = v.y, f[d++] = v.z;
      }

      return e.attributes[n] = o, e.attributes[r] = new p({
        componentDatatype: u.DOUBLE,
        componentsPerAttribute: 3,
        values: f
      }), delete e.attributes[t], e;
    };

    var ue = {
      high: 0,
      low: 0
    };

    ie.encodeAttribute = function (e, t, n, r) {
      for (var i = e.attributes[t], a = i.values, o = a.length, s = new Float32Array(o), c = new Float32Array(o), l = 0; l < o; ++l) {
        f.encode(a[l], ue), s[l] = ue.high, c[l] = ue.low;
      }

      var h = i.componentsPerAttribute;
      return e.attributes[n] = new p({
        componentDatatype: u.FLOAT,
        componentsPerAttribute: h,
        values: s
      }), e.attributes[r] = new p({
        componentDatatype: u.FLOAT,
        componentsPerAttribute: h,
        values: c
      }), delete e.attributes[t], e;
    };

    var se = new i(),
        ce = new g(),
        le = new T();

    ie.transformToWorldCoordinates = function (e) {
      var t = e.modelMatrix;
      if (g.equals(t, g.IDENTITY)) return e;
      var r = e.geometry.attributes;
      C(t, r.position), C(t, r.prevPosition), C(t, r.nextPosition), (c(r.normal) || c(r.tangent) || c(r.bitangent)) && (g.inverse(t, ce), g.transpose(ce, ce), g.getRotation(ce, le), P(le, r.normal), P(le, r.tangent), P(le, r.bitangent));
      var i = e.geometry.boundingSphere;
      return c(i) && (e.geometry.boundingSphere = n.transform(i, t, i)), e.modelMatrix = g.clone(g.IDENTITY), e;
    };

    var fe = new i();

    ie.combineInstances = function (e) {
      for (var t = [], n = [], r = e.length, i = 0; i < r; ++i) {
        var a = e[i];
        c(a.geometry) ? t.push(a) : c(a.westHemisphereGeometry) && c(a.eastHemisphereGeometry) && n.push(a);
      }

      var o = [];
      return t.length > 0 && o.push(D(t, "geometry")), n.length > 0 && (o.push(D(n, "westHemisphereGeometry")), o.push(D(n, "eastHemisphereGeometry"))), o;
    };

    var he = new i(),
        de = new i(),
        pe = new i(),
        me = new i();

    ie.computeNormal = function (e) {
      var t,
          n = e.indices,
          r = e.attributes,
          a = r.position.values,
          o = r.position.values.length / 3,
          s = n.length,
          c = new Array(o),
          l = new Array(s / 3),
          f = new Array(s);

      for (t = 0; t < o; t++) {
        c[t] = {
          indexOffset: 0,
          count: 0,
          currentCount: 0
        };
      }

      var h = 0;

      for (t = 0; t < s; t += 3) {
        var d = n[t],
            m = n[t + 1],
            y = n[t + 2],
            E = 3 * d,
            v = 3 * m,
            T = 3 * y;
        de.x = a[E], de.y = a[E + 1], de.z = a[E + 2], pe.x = a[v], pe.y = a[v + 1], pe.z = a[v + 2], me.x = a[T], me.y = a[T + 1], me.z = a[T + 2], c[d].count++, c[m].count++, c[y].count++, i.subtract(pe, de, pe), i.subtract(me, de, me), l[h] = i.cross(pe, me, new i()), h++;
      }

      var g = 0;

      for (t = 0; t < o; t++) {
        c[t].indexOffset += g, g += c[t].count;
      }

      h = 0;
      var R;

      for (t = 0; t < s; t += 3) {
        R = c[n[t]];
        var A = R.indexOffset + R.currentCount;
        f[A] = h, R.currentCount++, R = c[n[t + 1]], A = R.indexOffset + R.currentCount, f[A] = h, R.currentCount++, R = c[n[t + 2]], A = R.indexOffset + R.currentCount, f[A] = h, R.currentCount++, h++;
      }

      var S = new Float32Array(3 * o);

      for (t = 0; t < o; t++) {
        var w = 3 * t;

        if (R = c[t], i.clone(i.ZERO, he), R.count > 0) {
          for (h = 0; h < R.count; h++) {
            i.add(he, l[f[R.indexOffset + h]], he);
          }

          i.equalsEpsilon(i.ZERO, he, _.EPSILON10) && i.clone(l[f[R.indexOffset]], he);
        }

        i.equalsEpsilon(i.ZERO, he, _.EPSILON10) && (he.z = 1), i.normalize(he, he), S[w] = he.x, S[w + 1] = he.y, S[w + 2] = he.z;
      }

      return e.attributes.normal = new p({
        componentDatatype: u.FLOAT,
        componentsPerAttribute: 3,
        values: S
      }), e;
    };

    var ye = new i(),
        Ee = new i(),
        ve = new i();

    ie.computeTangentAndBitangent = function (e) {
      var t,
          n = (e.attributes, e.indices),
          r = e.attributes.position.values,
          a = e.attributes.normal.values,
          o = e.attributes.st.values,
          s = e.attributes.position.values.length / 3,
          c = n.length,
          l = new Array(3 * s);

      for (t = 0; t < l.length; t++) {
        l[t] = 0;
      }

      var f, h, d;

      for (t = 0; t < c; t += 3) {
        var m = n[t],
            y = n[t + 1],
            E = n[t + 2];
        f = 3 * m, h = 3 * y, d = 3 * E;

        var v = 2 * m,
            _ = 2 * y,
            T = 2 * E,
            g = r[f],
            R = r[f + 1],
            A = r[f + 2],
            S = o[v],
            w = o[v + 1],
            O = o[_ + 1] - w,
            I = o[T + 1] - w,
            x = 1 / ((o[_] - S) * I - (o[T] - S) * O),
            N = (I * (r[h] - g) - O * (r[d] - g)) * x,
            M = (I * (r[h + 1] - R) - O * (r[d + 1] - R)) * x,
            C = (I * (r[h + 2] - A) - O * (r[d + 2] - A)) * x;

        l[f] += N, l[f + 1] += M, l[f + 2] += C, l[h] += N, l[h + 1] += M, l[h + 2] += C, l[d] += N, l[d + 1] += M, l[d + 2] += C;
      }

      var P = new Float32Array(3 * s),
          b = new Float32Array(3 * s);

      for (t = 0; t < s; t++) {
        f = 3 * t, h = f + 1, d = f + 2;
        var D = i.fromArray(a, f, ye),
            U = i.fromArray(l, f, ve),
            L = i.dot(D, U);
        i.multiplyByScalar(D, L, Ee), i.normalize(i.subtract(U, Ee, U), U), P[f] = U.x, P[h] = U.y, P[d] = U.z, i.normalize(i.cross(D, U, U), U), b[f] = U.x, b[h] = U.y, b[d] = U.z;
      }

      return e.attributes.tangent = new p({
        componentDatatype: u.FLOAT,
        componentsPerAttribute: 3,
        values: P
      }), e.attributes.bitangent = new p({
        componentDatatype: u.FLOAT,
        componentsPerAttribute: 3,
        values: b
      }), e;
    };

    var _e = new r(),
        Te = new i(),
        ge = new i(),
        Re = new i(),
        Ae = new r();

    ie.compressVertices = function (t) {
      var n,
          a,
          o = t.attributes.extrudeDirection;

      if (c(o)) {
        var s = o.values;
        a = s.length / 3;
        var l = new Float32Array(2 * a),
            f = 0;

        for (n = 0; n < a; ++n) {
          i.fromArray(s, 3 * n, Te), i.equals(Te, i.ZERO) ? f += 2 : (Ae = e.octEncodeInRange(Te, 65535, Ae), l[f++] = Ae.x, l[f++] = Ae.y);
        }

        return t.attributes.compressedAttributes = new p({
          componentDatatype: u.FLOAT,
          componentsPerAttribute: 2,
          values: l
        }), delete t.attributes.extrudeDirection, t;
      }

      var h = t.attributes.normal,
          d = t.attributes.st,
          m = c(h),
          y = c(d);
      if (!m && !y) return t;

      var E,
          v,
          _,
          T,
          g = t.attributes.tangent,
          R = t.attributes.bitangent,
          A = c(g),
          S = c(R);

      m && (E = h.values), y && (v = d.values), A && (_ = g.values), S && (T = R.values), a = (m ? E.length : v.length) / (m ? 3 : 2);
      var w = a,
          O = y && m ? 2 : 1;
      O += A || S ? 1 : 0, w *= O;
      var I = new Float32Array(w),
          x = 0;

      for (n = 0; n < a; ++n) {
        y && (r.fromArray(v, 2 * n, _e), I[x++] = e.compressTextureCoordinates(_e));
        var N = 3 * n;
        m && c(_) && c(T) ? (i.fromArray(E, N, Te), i.fromArray(_, N, ge), i.fromArray(T, N, Re), e.octPack(Te, ge, Re, _e), I[x++] = _e.x, I[x++] = _e.y) : (m && (i.fromArray(E, N, Te), I[x++] = e.octEncodeFloat(Te)), A && (i.fromArray(_, N, Te), I[x++] = e.octEncodeFloat(Te)), S && (i.fromArray(T, N, Te), I[x++] = e.octEncodeFloat(Te)));
      }

      return t.attributes.compressedAttributes = new p({
        componentDatatype: u.FLOAT,
        componentsPerAttribute: O,
        values: I
      }), m && delete t.attributes.normal, y && delete t.attributes.st, S && delete t.attributes.bitangent, A && delete t.attributes.tangent, t;
    };

    var Se = new i(),
        we = new i(),
        Oe = new i(),
        Ie = new i(),
        xe = new i(),
        Ne = {
      positions: new Array(7),
      indices: new Array(9)
    },
        Me = Z(a, 4),
        Ce = Z(i, 3),
        Pe = Z(r, 2),
        be = function be(e, t, n, r, i, a, o) {
      var u = i[e] * r.x,
          s = i[t] * r.y,
          c = i[n] * r.z;
      a[o] = u + s + c > _.EPSILON6 ? 1 : 0;
    },
        De = new i(),
        Ue = new i(),
        Le = new i(),
        Fe = new i(),
        Be = {
      position: !0,
      normal: !0,
      bitangent: !0,
      tangent: !0,
      st: !0,
      extrudeDirection: !0,
      applyOffset: !0
    },
        ze = R.fromPointNormal(i.ZERO, i.UNIT_Y),
        qe = new i(),
        Ge = new i(),
        Ve = new r(),
        We = new r(),
        Xe = new i(),
        ke = new i(),
        He = new i(),
        Ye = new i(),
        je = new i(),
        Ze = new i(),
        Ke = new a(),
        Je = 5 * _.EPSILON9,
        Qe = _.EPSILON6;

    return ie.splitLongitude = function (e) {
      var t = e.geometry,
          r = t.boundingSphere;

      if (c(r)) {
        if (r.center.x - r.radius > 0 || n.intersectPlane(r, R.ORIGIN_ZX_PLANE) !== E.INTERSECTING) return e;
      }

      if (t.geometryType !== m.NONE) switch (t.geometryType) {
        case m.POLYLINES:
          re(e);
          break;

        case m.TRIANGLES:
          $(e);
          break;

        case m.LINES:
          te(e);
      } else G(t), t.primitiveType === A.TRIANGLES ? $(e) : t.primitiveType === A.LINES && te(e);
      return e;
    }, ie;
  }), define("Core/ArcType", ["./freezeObject"], function (e) {
    "use strict";

    return e({
      NONE: 0,
      GEODESIC: 1,
      RHUMB: 2
    });
  }), define("Core/EllipsoidRhumbLine", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Math"], function (e, t, n, r, i, a, o, u, s) {
    "use strict";

    function c(e, t, n) {
      if (0 === e) return t * n;
      var r = e * e,
          i = r * r,
          a = i * r,
          o = a * r,
          u = o * r,
          s = u * r,
          c = n;
      return t * ((1 - r / 4 - 3 * i / 64 - 5 * a / 256 - 175 * o / 16384 - 441 * u / 65536 - 4851 * s / 1048576) * c - (3 * r / 8 + 3 * i / 32 + 45 * a / 1024 + 105 * o / 4096 + 2205 * u / 131072 + 6237 * s / 524288) * Math.sin(2 * c) + (15 * i / 256 + 45 * a / 1024 + 525 * o / 16384 + 1575 * u / 65536 + 155925 * s / 8388608) * Math.sin(4 * c) - (35 * a / 3072 + 175 * o / 12288 + 3675 * u / 262144 + 13475 * s / 1048576) * Math.sin(6 * c) + (315 * o / 131072 + 2205 * u / 524288 + 43659 * s / 8388608) * Math.sin(8 * c) - (693 * u / 1310720 + 6237 * s / 5242880) * Math.sin(10 * c) + 1001 * s / 8388608 * Math.sin(12 * c));
    }

    function l(e, t, n) {
      var r = e / n;
      if (0 === t) return r;

      var i = r * r,
          a = i * r,
          o = a * r,
          u = t,
          s = u * u,
          c = s * s,
          l = c * s,
          f = l * s,
          h = f * s,
          d = h * s,
          p = Math.sin(2 * r),
          m = Math.cos(2 * r),
          y = Math.sin(4 * r),
          E = Math.cos(4 * r),
          v = Math.sin(6 * r),
          _ = Math.cos(6 * r),
          T = Math.sin(8 * r),
          g = Math.cos(8 * r),
          R = Math.sin(10 * r);

      return r + r * s / 4 + 7 * r * c / 64 + 15 * r * l / 256 + 579 * r * f / 16384 + 1515 * r * h / 65536 + 16837 * r * d / 1048576 + (3 * r * c / 16 + 45 * r * l / 256 - r * (32 * i - 561) * f / 4096 - r * (232 * i - 1677) * h / 16384 + r * (399985 - 90560 * i + 512 * o) * d / 5242880) * m + (21 * r * l / 256 + 483 * r * f / 4096 - r * (224 * i - 1969) * h / 16384 - r * (33152 * i - 112599) * d / 1048576) * E + (151 * r * f / 4096 + 4681 * r * h / 65536 + 1479 * r * d / 16384 - 453 * a * d / 32768) * _ + (1097 * r * h / 65536 + 42783 * r * d / 1048576) * g + 8011 * r * d / 1048576 * Math.cos(10 * r) + (3 * s / 8 + 3 * c / 16 + 213 * l / 2048 - 3 * i * l / 64 + 255 * f / 4096 - 33 * i * f / 512 + 20861 * h / 524288 - 33 * i * h / 512 + o * h / 1024 + 28273 * d / 1048576 - 471 * i * d / 8192 + 9 * o * d / 4096) * p + (21 * c / 256 + 21 * l / 256 + 533 * f / 8192 - 21 * i * f / 512 + 197 * h / 4096 - 315 * i * h / 4096 + 584039 * d / 16777216 - 12517 * i * d / 131072 + 7 * o * d / 2048) * y + (151 * l / 6144 + 151 * f / 4096 + 5019 * h / 131072 - 453 * i * h / 16384 + 26965 * d / 786432 - 8607 * i * d / 131072) * v + (1097 * f / 131072 + 1097 * h / 65536 + 225797 * d / 10485760 - 1097 * i * d / 65536) * T + (8011 * h / 2621440 + 8011 * d / 1048576) * R + 293393 * d / 251658240 * Math.sin(12 * r);
    }

    function f(e, t) {
      if (0 === e) return Math.log(Math.tan(.5 * (s.PI_OVER_TWO + t)));
      var n = e * Math.sin(t);
      return Math.log(Math.tan(.5 * (s.PI_OVER_TWO + t))) - e / 2 * Math.log((1 + n) / (1 - n));
    }

    function h(e, t, n, r, i) {
      var a = f(e._ellipticity, n),
          o = f(e._ellipticity, i);
      return Math.atan2(s.negativePiToPi(r - t), o - a);
    }

    function d(e, t, n, r, i, a, o) {
      var u = e._heading,
          l = a - r,
          f = 0;
      if (s.equalsEpsilon(Math.abs(u), s.PI_OVER_TWO, s.EPSILON8)) {
        if (t === n) f = t * Math.cos(i) * s.negativePiToPi(l);else {
          var h = Math.sin(i);
          f = t * Math.cos(i) * s.negativePiToPi(l) / Math.sqrt(1 - e._ellipticitySquared * h * h);
        }
      } else {
        var d = c(e._ellipticity, t, i);
        f = (c(e._ellipticity, t, o) - d) / Math.cos(u);
      }
      return Math.abs(f);
    }

    function p(n, r, i, a) {
      var o = (e.normalize(a.cartographicToCartesian(r, v), E), e.normalize(a.cartographicToCartesian(i, v), v), a.maximumRadius),
          u = a.minimumRadius,
          s = o * o,
          c = u * u;
      n._ellipticitySquared = (s - c) / s, n._ellipticity = Math.sqrt(n._ellipticitySquared), n._start = t.clone(r, n._start), n._start.height = 0, n._end = t.clone(i, n._end), n._end.height = 0, n._heading = h(n, r.longitude, r.latitude, i.longitude, i.latitude), n._distance = d(n, a.maximumRadius, a.minimumRadius, r.longitude, r.latitude, i.longitude, i.latitude);
    }

    function m(e, n, r, a, o, u) {
      var h,
          d,
          p,
          m = o * o;

      if (Math.abs(s.PI_OVER_TWO - Math.abs(n)) > s.EPSILON8) {
        d = l(c(o, a, e.latitude) + r * Math.cos(n), o, a);
        var y = f(o, e.latitude),
            E = f(o, d);
        p = Math.tan(n) * (E - y), h = s.negativePiToPi(e.longitude + p);
      } else {
        d = e.latitude;
        var v;
        if (0 === o) v = a * Math.cos(e.latitude);else {
          var _ = Math.sin(e.latitude);

          v = a * Math.cos(e.latitude) / Math.sqrt(1 - m * _ * _);
        }
        p = r / v, h = n > 0 ? s.negativePiToPi(e.longitude + p) : s.negativePiToPi(e.longitude - p);
      }

      return i(u) ? (u.longitude = h, u.latitude = d, u.height = 0, u) : new t(h, d, 0);
    }

    function y(e, n, a) {
      var o = r(a, u.WGS84);
      this._ellipsoid = o, this._start = new t(), this._end = new t(), this._heading = void 0, this._distance = void 0, this._ellipticity = void 0, this._ellipticitySquared = void 0, i(e) && i(n) && p(this, e, n, o);
    }

    var E = new e(),
        v = new e();
    return a(y.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      },
      surfaceDistance: {
        get: function get() {
          return this._distance;
        }
      },
      start: {
        get: function get() {
          return this._start;
        }
      },
      end: {
        get: function get() {
          return this._end;
        }
      },
      heading: {
        get: function get() {
          return this._heading;
        }
      }
    }), y.fromStartHeadingDistance = function (e, t, n, a, o) {
      var c = r(a, u.WGS84),
          l = c.maximumRadius,
          f = c.minimumRadius,
          h = l * l,
          d = f * f,
          p = Math.sqrt((h - d) / h);
      t = s.negativePiToPi(t);
      var E = m(e, t, n, c.maximumRadius, p);
      return !i(o) || i(a) && !a.equals(o.ellipsoid) ? new y(e, E, c) : (o.setEndPoints(e, E), o);
    }, y.prototype.setEndPoints = function (e, t) {
      p(this, e, t, this._ellipsoid);
    }, y.prototype.interpolateUsingFraction = function (e, t) {
      return this.interpolateUsingSurfaceDistance(e * this._distance, t);
    }, y.prototype.interpolateUsingSurfaceDistance = function (e, t) {
      return m(this._start, this._heading, e, this._ellipsoid.maximumRadius, this._ellipticity, t);
    }, y.prototype.findIntersectionWithLongitude = function (e, n) {
      var r = this._ellipticity,
          a = this._heading,
          o = Math.abs(a),
          u = this._start;
      if (e = s.negativePiToPi(e), s.equalsEpsilon(Math.abs(e), Math.PI, s.EPSILON14) && (e = s.sign(u.longitude) * Math.PI), i(n) || (n = new t()), Math.abs(s.PI_OVER_TWO - o) <= s.EPSILON8) return n.longitude = e, n.latitude = u.latitude, n.height = 0, n;

      if (s.equalsEpsilon(Math.abs(s.PI_OVER_TWO - o), s.PI_OVER_TWO, s.EPSILON8)) {
        if (s.equalsEpsilon(e, u.longitude, s.EPSILON12)) return;
        return n.longitude = e, n.latitude = s.PI_OVER_TWO * s.sign(s.PI_OVER_TWO - a), n.height = 0, n;
      }

      var c,
          l = u.latitude,
          f = r * Math.sin(l),
          h = Math.tan(.5 * (s.PI_OVER_TWO + l)) * Math.exp((e - u.longitude) / Math.tan(a)),
          d = (1 + f) / (1 - f),
          p = u.latitude;

      do {
        c = p;
        var m = r * Math.sin(c),
            y = (1 + m) / (1 - m);
        p = 2 * Math.atan(h * Math.pow(y / d, r / 2)) - s.PI_OVER_TWO;
      } while (!s.equalsEpsilon(p, c, s.EPSILON12));

      return n.longitude = e, n.latitude = p, n.height = 0, n;
    }, y.prototype.findIntersectionWithLatitude = function (e, n) {
      var r = this._ellipticity,
          a = this._heading,
          o = this._start;

      if (!s.equalsEpsilon(Math.abs(a), s.PI_OVER_TWO, s.EPSILON8)) {
        var u = f(r, o.latitude),
            c = f(r, e),
            l = Math.tan(a) * (c - u),
            h = s.negativePiToPi(o.longitude + l);
        return i(n) ? (n.longitude = h, n.latitude = e, n.height = 0, n) : new t(h, e, 0);
      }
    }, y;
  }), define("ThirdParty/earcut-2.1.1", [], function () {
    "use strict";

    function e(e, n, i) {
      i = i || 2;
      var a = n && n.length,
          o = a ? n[0] * i : e.length,
          u = t(e, 0, o, i, !0),
          c = [];
      if (!u) return c;
      var l, f, h, d, p, m, y;

      if (a && (u = s(e, n, u, i)), e.length > 80 * i) {
        l = h = e[0], f = d = e[1];

        for (var E = i; E < o; E += i) {
          p = e[E], m = e[E + 1], p < l && (l = p), m < f && (f = m), p > h && (h = p), m > d && (d = m);
        }

        y = Math.max(h - l, d - f);
      }

      return r(u, c, i, l, f, y), c;
    }

    function t(e, t, n, r, i) {
      var a, o;
      if (i === x(e, t, n, r) > 0) for (a = t; a < n; a += r) {
        o = w(a, e[a], e[a + 1], o);
      } else for (a = n - r; a >= t; a -= r) {
        o = w(a, e[a], e[a + 1], o);
      }
      return o && _(o, o.next) && (O(o), o = o.next), o;
    }

    function n(e, t) {
      if (!e) return e;
      t || (t = e);
      var n,
          r = e;

      do {
        if (n = !1, r.steiner || !_(r, r.next) && 0 !== v(r.prev, r, r.next)) r = r.next;else {
          if (O(r), (r = t = r.prev) === r.next) return null;
          n = !0;
        }
      } while (n || r !== t);

      return t;
    }

    function r(e, t, s, c, l, f, d) {
      if (e) {
        !d && f && h(e, c, l, f);

        for (var p, m, y = e; e.prev !== e.next;) {
          if (p = e.prev, m = e.next, f ? a(e, c, l, f) : i(e)) t.push(p.i / s), t.push(e.i / s), t.push(m.i / s), O(e), e = m.next, y = m.next;else if ((e = m) === y) {
            d ? 1 === d ? (e = o(e, t, s), r(e, t, s, c, l, f, 2)) : 2 === d && u(e, t, s, c, l, f) : r(n(e), t, s, c, l, f, 1);
            break;
          }
        }
      }
    }

    function i(e) {
      var t = e.prev,
          n = e,
          r = e.next;
      if (v(t, n, r) >= 0) return !1;

      for (var i = e.next.next; i !== e.prev;) {
        if (y(t.x, t.y, n.x, n.y, r.x, r.y, i.x, i.y) && v(i.prev, i, i.next) >= 0) return !1;
        i = i.next;
      }

      return !0;
    }

    function a(e, t, n, r) {
      var i = e.prev,
          a = e,
          o = e.next;
      if (v(i, a, o) >= 0) return !1;

      for (var u = i.x < a.x ? i.x < o.x ? i.x : o.x : a.x < o.x ? a.x : o.x, s = i.y < a.y ? i.y < o.y ? i.y : o.y : a.y < o.y ? a.y : o.y, c = i.x > a.x ? i.x > o.x ? i.x : o.x : a.x > o.x ? a.x : o.x, l = i.y > a.y ? i.y > o.y ? i.y : o.y : a.y > o.y ? a.y : o.y, f = p(u, s, t, n, r), h = p(c, l, t, n, r), d = e.nextZ; d && d.z <= h;) {
        if (d !== e.prev && d !== e.next && y(i.x, i.y, a.x, a.y, o.x, o.y, d.x, d.y) && v(d.prev, d, d.next) >= 0) return !1;
        d = d.nextZ;
      }

      for (d = e.prevZ; d && d.z >= f;) {
        if (d !== e.prev && d !== e.next && y(i.x, i.y, a.x, a.y, o.x, o.y, d.x, d.y) && v(d.prev, d, d.next) >= 0) return !1;
        d = d.prevZ;
      }

      return !0;
    }

    function o(e, t, n) {
      var r = e;

      do {
        var i = r.prev,
            a = r.next.next;
        !_(i, a) && T(i, r, r.next, a) && R(i, a) && R(a, i) && (t.push(i.i / n), t.push(r.i / n), t.push(a.i / n), O(r), O(r.next), r = e = a), r = r.next;
      } while (r !== e);

      return r;
    }

    function u(e, t, i, a, o, u) {
      var s = e;

      do {
        for (var c = s.next.next; c !== s.prev;) {
          if (s.i !== c.i && E(s, c)) {
            var l = S(s, c);
            return s = n(s, s.next), l = n(l, l.next), r(s, t, i, a, o, u), void r(l, t, i, a, o, u);
          }

          c = c.next;
        }

        s = s.next;
      } while (s !== e);
    }

    function s(e, r, i, a) {
      var o,
          u,
          s,
          f,
          h,
          d = [];

      for (o = 0, u = r.length; o < u; o++) {
        s = r[o] * a, f = o < u - 1 ? r[o + 1] * a : e.length, h = t(e, s, f, a, !1), h === h.next && (h.steiner = !0), d.push(m(h));
      }

      for (d.sort(c), o = 0; o < d.length; o++) {
        l(d[o], i), i = n(i, i.next);
      }

      return i;
    }

    function c(e, t) {
      return e.x - t.x;
    }

    function l(e, t) {
      if (t = f(e, t)) {
        var r = S(t, e);
        n(r, r.next);
      }
    }

    function f(e, t) {
      var n,
          r = t,
          i = e.x,
          a = e.y,
          o = -1 / 0;

      do {
        if (a <= r.y && a >= r.next.y) {
          var u = r.x + (a - r.y) * (r.next.x - r.x) / (r.next.y - r.y);

          if (u <= i && u > o) {
            if (o = u, u === i) {
              if (a === r.y) return r;
              if (a === r.next.y) return r.next;
            }

            n = r.x < r.next.x ? r : r.next;
          }
        }

        r = r.next;
      } while (r !== t);

      if (!n) return null;
      if (i === o) return n.prev;
      var s,
          c = n,
          l = n.x,
          f = n.y,
          h = 1 / 0;

      for (r = n.next; r !== c;) {
        i >= r.x && r.x >= l && y(a < f ? i : o, a, l, f, a < f ? o : i, a, r.x, r.y) && ((s = Math.abs(a - r.y) / (i - r.x)) < h || s === h && r.x > n.x) && R(r, e) && (n = r, h = s), r = r.next;
      }

      return n;
    }

    function h(e, t, n, r) {
      var i = e;

      do {
        null === i.z && (i.z = p(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
      } while (i !== e);

      i.prevZ.nextZ = null, i.prevZ = null, d(i);
    }

    function d(e) {
      var t,
          n,
          r,
          i,
          a,
          o,
          u,
          s,
          c = 1;

      do {
        for (n = e, e = null, a = null, o = 0; n;) {
          for (o++, r = n, u = 0, t = 0; t < c && (u++, r = r.nextZ); t++) {
            ;
          }

          for (s = c; u > 0 || s > 0 && r;) {
            0 === u ? (i = r, r = r.nextZ, s--) : 0 !== s && r ? n.z <= r.z ? (i = n, n = n.nextZ, u--) : (i = r, r = r.nextZ, s--) : (i = n, n = n.nextZ, u--), a ? a.nextZ = i : e = i, i.prevZ = a, a = i;
          }

          n = r;
        }

        a.nextZ = null, c *= 2;
      } while (o > 1);

      return e;
    }

    function p(e, t, n, r, i) {
      return e = 32767 * (e - n) / i, t = 32767 * (t - r) / i, e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e | t << 1;
    }

    function m(e) {
      var t = e,
          n = e;

      do {
        t.x < n.x && (n = t), t = t.next;
      } while (t !== e);

      return n;
    }

    function y(e, t, n, r, i, a, o, u) {
      return (i - o) * (t - u) - (e - o) * (a - u) >= 0 && (e - o) * (r - u) - (n - o) * (t - u) >= 0 && (n - o) * (a - u) - (i - o) * (r - u) >= 0;
    }

    function E(e, t) {
      return e.next.i !== t.i && e.prev.i !== t.i && !g(e, t) && R(e, t) && R(t, e) && A(e, t);
    }

    function v(e, t, n) {
      return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
    }

    function _(e, t) {
      return e.x === t.x && e.y === t.y;
    }

    function T(e, t, n, r) {
      return !!(_(e, t) && _(n, r) || _(e, r) && _(n, t)) || v(e, t, n) > 0 != v(e, t, r) > 0 && v(n, r, e) > 0 != v(n, r, t) > 0;
    }

    function g(e, t) {
      var n = e;

      do {
        if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && T(n, n.next, e, t)) return !0;
        n = n.next;
      } while (n !== e);

      return !1;
    }

    function R(e, t) {
      return v(e.prev, e, e.next) < 0 ? v(e, t, e.next) >= 0 && v(e, e.prev, t) >= 0 : v(e, t, e.prev) < 0 || v(e, e.next, t) < 0;
    }

    function A(e, t) {
      var n = e,
          r = !1,
          i = (e.x + t.x) / 2,
          a = (e.y + t.y) / 2;

      do {
        n.y > a != n.next.y > a && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
      } while (n !== e);

      return r;
    }

    function S(e, t) {
      var n = new I(e.i, e.x, e.y),
          r = new I(t.i, t.x, t.y),
          i = e.next,
          a = t.prev;
      return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r;
    }

    function w(e, t, n, r) {
      var i = new I(e, t, n);
      return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
    }

    function O(e) {
      e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
    }

    function I(e, t, n) {
      this.i = e, this.x = t, this.y = n, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
    }

    function x(e, t, n, r) {
      for (var i = 0, a = t, o = n - r; a < n; a += r) {
        i += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a;
      }

      return i;
    }

    return e.deviation = function (e, t, n, r) {
      var i = t && t.length,
          a = i ? t[0] * n : e.length,
          o = Math.abs(x(e, 0, a, n));
      if (i) for (var u = 0, s = t.length; u < s; u++) {
        var c = t[u] * n,
            l = u < s - 1 ? t[u + 1] * n : e.length;
        o -= Math.abs(x(e, c, l, n));
      }
      var f = 0;

      for (u = 0; u < r.length; u += 3) {
        var h = r[u] * n,
            d = r[u + 1] * n,
            p = r[u + 2] * n;
        f += Math.abs((e[h] - e[p]) * (e[d + 1] - e[h + 1]) - (e[h] - e[d]) * (e[p + 1] - e[h + 1]));
      }

      return 0 === o && 0 === f ? 0 : Math.abs((f - o) / o);
    }, e.flatten = function (e) {
      for (var t = e[0][0].length, n = {
        vertices: [],
        holes: [],
        dimensions: t
      }, r = 0, i = 0; i < e.length; i++) {
        for (var a = 0; a < e[i].length; a++) {
          for (var o = 0; o < t; o++) {
            n.vertices.push(e[i][a][o]);
          }
        }

        i > 0 && (r += e[i - 1].length, n.holes.push(r));
      }

      return n;
    }, e;
  }), define("Core/WindingOrder", ["./freezeObject", "./WebGLConstants"], function (e, t) {
    "use strict";

    var n = {
      CLOCKWISE: t.CW,
      COUNTER_CLOCKWISE: t.CCW,
      validate: function validate(e) {
        return e === n.CLOCKWISE || e === n.COUNTER_CLOCKWISE;
      }
    };
    return e(n);
  }), define("Core/PolygonPipeline", ["../ThirdParty/earcut-2.1.1", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./Ellipsoid", "./EllipsoidRhumbLine", "./Geometry", "./GeometryAttribute", "./Math", "./PrimitiveType", "./WindingOrder"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p) {
    "use strict";

    var m = new n(),
        y = new n(),
        E = {};
    E.computeArea2D = function (e) {
      for (var t = e.length, n = 0, r = t - 1, i = 0; i < t; r = i++) {
        var a = e[r],
            o = e[i];
        n += a.x * o.y - o.x * a.y;
      }

      return .5 * n;
    }, E.computeWindingOrder2D = function (e) {
      return E.computeArea2D(e) > 0 ? p.COUNTER_CLOCKWISE : p.CLOCKWISE;
    }, E.triangulate = function (n, r) {
      var i = t.packArray(n);
      return e(i, r, 2);
    };

    var v = new n(),
        _ = new n(),
        T = new n(),
        g = new n(),
        R = new n(),
        A = new n(),
        S = new n();

    E.computeSubdivision = function (e, t, r, i) {
      i = o(i, h.RADIANS_PER_DEGREE);
      var s,
          c = r.slice(0),
          p = t.length,
          m = new Array(3 * p),
          y = 0;

      for (s = 0; s < p; s++) {
        var E = t[s];
        m[y++] = E.x, m[y++] = E.y, m[y++] = E.z;
      }

      for (var w = [], O = {}, I = e.maximumRadius, x = h.chordLength(i, I), N = x * x; c.length > 0;) {
        var M,
            C,
            P = c.pop(),
            b = c.pop(),
            D = c.pop(),
            U = n.fromArray(m, 3 * D, v),
            L = n.fromArray(m, 3 * b, _),
            F = n.fromArray(m, 3 * P, T),
            B = n.multiplyByScalar(n.normalize(U, g), I, g),
            z = n.multiplyByScalar(n.normalize(L, R), I, R),
            q = n.multiplyByScalar(n.normalize(F, A), I, A),
            G = n.magnitudeSquared(n.subtract(B, z, S)),
            V = n.magnitudeSquared(n.subtract(z, q, S)),
            W = n.magnitudeSquared(n.subtract(q, B, S)),
            X = Math.max(G, V, W);
        X > N ? G === X ? (M = Math.min(D, b) + " " + Math.max(D, b), s = O[M], u(s) || (C = n.add(U, L, S), n.multiplyByScalar(C, .5, C), m.push(C.x, C.y, C.z), s = m.length / 3 - 1, O[M] = s), c.push(D, s, P), c.push(s, b, P)) : V === X ? (M = Math.min(b, P) + " " + Math.max(b, P), s = O[M], u(s) || (C = n.add(L, F, S), n.multiplyByScalar(C, .5, C), m.push(C.x, C.y, C.z), s = m.length / 3 - 1, O[M] = s), c.push(b, s, D), c.push(s, P, D)) : W === X && (M = Math.min(P, D) + " " + Math.max(P, D), s = O[M], u(s) || (C = n.add(F, U, S), n.multiplyByScalar(C, .5, C), m.push(C.x, C.y, C.z), s = m.length / 3 - 1, O[M] = s), c.push(P, s, b), c.push(s, D, b)) : (w.push(D), w.push(b), w.push(P));
      }

      return new l({
        attributes: {
          position: new f({
            componentDatatype: a.DOUBLE,
            componentsPerAttribute: 3,
            values: m
          })
        },
        indices: w,
        primitiveType: d.TRIANGLES
      });
    };

    var w = new r(),
        O = new r(),
        I = new r(),
        x = new r();
    return E.computeRhumbLineSubdivision = function (e, t, r, i) {
      i = o(i, h.RADIANS_PER_DEGREE);
      var s,
          p = r.slice(0),
          m = t.length,
          y = new Array(3 * m),
          E = 0;

      for (s = 0; s < m; s++) {
        var g = t[s];
        y[E++] = g.x, y[E++] = g.y, y[E++] = g.z;
      }

      for (var R = [], A = {}, N = e.maximumRadius, M = h.chordLength(i, N), C = new c(void 0, void 0, e), P = new c(void 0, void 0, e), b = new c(void 0, void 0, e); p.length > 0;) {
        var D = p.pop(),
            U = p.pop(),
            L = p.pop(),
            F = n.fromArray(y, 3 * L, v),
            B = n.fromArray(y, 3 * U, _),
            z = n.fromArray(y, 3 * D, T),
            q = e.cartesianToCartographic(F, w),
            G = e.cartesianToCartographic(B, O),
            V = e.cartesianToCartographic(z, I);
        C.setEndPoints(q, G);
        var W = C.surfaceDistance;
        P.setEndPoints(G, V);
        var X = P.surfaceDistance;
        b.setEndPoints(V, q);
        var k,
            H,
            Y,
            j,
            Z = b.surfaceDistance,
            K = Math.max(W, X, Z);
        K > M ? W === K ? (k = Math.min(L, U) + " " + Math.max(L, U), s = A[k], u(s) || (H = C.interpolateUsingFraction(.5, x), Y = .5 * (q.height + G.height), j = n.fromRadians(H.longitude, H.latitude, Y, e, S), y.push(j.x, j.y, j.z), s = y.length / 3 - 1, A[k] = s), p.push(L, s, D), p.push(s, U, D)) : X === K ? (k = Math.min(U, D) + " " + Math.max(U, D), s = A[k], u(s) || (H = P.interpolateUsingFraction(.5, x), Y = .5 * (G.height + V.height), j = n.fromRadians(H.longitude, H.latitude, Y, e, S), y.push(j.x, j.y, j.z), s = y.length / 3 - 1, A[k] = s), p.push(U, s, L), p.push(s, D, L)) : Z === K && (k = Math.min(D, L) + " " + Math.max(D, L), s = A[k], u(s) || (H = b.interpolateUsingFraction(.5, x), Y = .5 * (V.height + q.height), j = n.fromRadians(H.longitude, H.latitude, Y, e, S), y.push(j.x, j.y, j.z), s = y.length / 3 - 1, A[k] = s), p.push(D, s, U), p.push(s, L, U)) : (R.push(L), R.push(U), R.push(D));
      }

      return new l({
        attributes: {
          position: new f({
            componentDatatype: a.DOUBLE,
            componentsPerAttribute: 3,
            values: y
          })
        },
        indices: R,
        primitiveType: d.TRIANGLES
      });
    }, E.scaleToGeodeticHeight = function (e, t, r, i) {
      r = o(r, s.WGS84);
      var a = m,
          c = y;
      if (t = o(t, 0), i = o(i, !0), u(e)) for (var l = e.length, f = 0; f < l; f += 3) {
        n.fromArray(e, f, c), i && (c = r.scaleToGeodeticSurface(c, c)), 0 !== t && (a = r.geodeticSurfaceNormal(c, a), n.multiplyByScalar(a, t, a), n.add(c, a, c)), e[f] = c.x, e[f + 1] = c.y, e[f + 2] = c.z;
      }
      return e;
    }, E;
  }), define("Core/Queue", ["./defineProperties"], function (e) {
    "use strict";

    function t() {
      this._array = [], this._offset = 0, this._length = 0;
    }

    return e(t.prototype, {
      length: {
        get: function get() {
          return this._length;
        }
      }
    }), t.prototype.enqueue = function (e) {
      this._array.push(e), this._length++;
    }, t.prototype.dequeue = function () {
      if (0 !== this._length) {
        var e = this._array,
            t = this._offset,
            n = e[t];
        return e[t] = void 0, t++, t > 10 && 2 * t > e.length && (this._array = e.slice(t), t = 0), this._offset = t, this._length--, n;
      }
    }, t.prototype.peek = function () {
      if (0 !== this._length) return this._array[this._offset];
    }, t.prototype.contains = function (e) {
      return -1 !== this._array.indexOf(e);
    }, t.prototype.clear = function () {
      this._array.length = this._offset = this._length = 0;
    }, t.prototype.sort = function (e) {
      this._offset > 0 && (this._array = this._array.slice(this._offset), this._offset = 0), this._array.sort(e);
    }, t;
  }), define("Core/PolygonGeometryLibrary", ["./ArcType", "./arrayRemoveDuplicates", "./Cartesian2", "./Cartesian3", "./Cartographic", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidRhumbLine", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix3", "./PolygonPipeline", "./PrimitiveType", "./Quaternion", "./Queue", "./WindingOrder"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m, y, E, v, _, T, g, R) {
    "use strict";

    function A(e, t, n, i) {
      return r.subtract(t, e, w), r.multiplyByScalar(w, n / i, w), r.add(e, w, w), [w.x, w.y, w.z];
    }

    var S = {};
    S.computeHierarchyPackedLength = function (e) {
      for (var t = 0, n = [e]; n.length > 0;) {
        var i = n.pop();

        if (u(i)) {
          t += 2;
          var a = i.positions,
              o = i.holes;
          if (u(a) && (t += a.length * r.packedLength), u(o)) for (var s = o.length, c = 0; c < s; ++c) {
            n.push(o[c]);
          }
        }
      }

      return t;
    }, S.packPolygonHierarchy = function (e, t, n) {
      for (var i = [e]; i.length > 0;) {
        var a = i.pop();

        if (u(a)) {
          var o = a.positions,
              s = a.holes;
          if (t[n++] = u(o) ? o.length : 0, t[n++] = u(s) ? s.length : 0, u(o)) for (var c = o.length, l = 0; l < c; ++l, n += 3) {
            r.pack(o[l], t, n);
          }
          if (u(s)) for (var f = s.length, h = 0; h < f; ++h) {
            i.push(s[h]);
          }
        }
      }

      return n;
    }, S.unpackPolygonHierarchy = function (e, t) {
      for (var n = e[t++], i = e[t++], a = new Array(n), o = i > 0 ? new Array(i) : void 0, u = 0; u < n; ++u, t += r.packedLength) {
        a[u] = r.unpack(e, t);
      }

      for (var s = 0; s < i; ++s) {
        o[s] = S.unpackPolygonHierarchy(e, t), t = o[s].startingIndex, delete o[s].startingIndex;
      }

      return {
        positions: a,
        holes: o,
        startingIndex: t
      };
    };
    var w = new r();

    S.subdivideLineCount = function (e, t, n) {
      var i = r.distance(e, t),
          a = i / n,
          o = Math.max(0, Math.ceil(y.log2(a)));
      return Math.pow(2, o);
    };

    var O = new i(),
        I = new i(),
        x = new i(),
        N = new r();
    S.subdivideRhumbLineCount = function (e, t, n, r) {
      var i = e.cartesianToCartographic(t, O),
          a = e.cartesianToCartographic(n, I),
          o = new l(i, a, e),
          u = o.surfaceDistance / r,
          s = Math.max(0, Math.ceil(y.log2(u)));
      return Math.pow(2, s);
    }, S.subdivideLine = function (e, t, n, i) {
      var a = S.subdivideLineCount(e, t, n),
          o = r.distance(e, t),
          s = o / a;
      u(i) || (i = []);
      var c = i;
      c.length = 3 * a;

      for (var l = 0, f = 0; f < a; f++) {
        var h = A(e, t, f * s, o);
        c[l++] = h[0], c[l++] = h[1], c[l++] = h[2];
      }

      return c;
    }, S.subdivideRhumbLine = function (e, t, n, r, i) {
      var a = e.cartesianToCartographic(t, O),
          o = e.cartesianToCartographic(n, I),
          s = new l(a, o, e),
          c = s.surfaceDistance / r,
          f = Math.max(0, Math.ceil(y.log2(c))),
          h = Math.pow(2, f),
          d = s.surfaceDistance / h;
      u(i) || (i = []);
      var p = i;
      p.length = 3 * h;

      for (var m = 0, E = 0; E < h; E++) {
        var v = s.interpolateUsingSurfaceDistance(E * d, x),
            _ = e.cartographicToCartesian(v, N);

        p[m++] = _.x, p[m++] = _.y, p[m++] = _.z;
      }

      return p;
    };
    var M = new r(),
        C = new r(),
        P = new r(),
        b = new r();
    S.scaleToGeodeticHeightExtruded = function (e, t, n, i, a) {
      i = o(i, c.WGS84);
      var s = M,
          l = C,
          f = P,
          h = b;
      if (u(e) && u(e.attributes) && u(e.attributes.position)) for (var d = e.attributes.position.values, p = d.length / 2, m = 0; m < p; m += 3) {
        r.fromArray(d, m, f), i.geodeticSurfaceNormal(f, s), h = i.scaleToGeodeticSurface(f, h), l = r.multiplyByScalar(s, n, l), l = r.add(h, l, l), d[m + p] = l.x, d[m + 1 + p] = l.y, d[m + 2 + p] = l.z, a && (h = r.clone(f, h)), l = r.multiplyByScalar(s, t, l), l = r.add(h, l, l), d[m] = l.x, d[m + 1] = l.y, d[m + 2] = l.z;
      }
      return e;
    }, S.polygonOutlinesFromHierarchy = function (e, n, i) {
      var a = [],
          o = new g();
      o.enqueue(e);

      for (var s, c, l; 0 !== o.length;) {
        var f = o.dequeue(),
            h = f.positions;
        if (n) for (l = h.length, s = 0; s < l; s++) {
          i.scaleToGeodeticSurface(h[s], h[s]);
        }

        if (h = t(h, r.equalsEpsilon, !0), !(h.length < 3)) {
          var d = f.holes ? f.holes.length : 0;

          for (s = 0; s < d; s++) {
            var p = f.holes[s],
                m = p.positions;
            if (n) for (l = m.length, c = 0; c < l; ++c) {
              i.scaleToGeodeticSurface(m[c], m[c]);
            }

            if (m = t(m, r.equalsEpsilon, !0), !(m.length < 3)) {
              a.push(m);
              var y = 0;

              for (u(p.holes) && (y = p.holes.length), c = 0; c < y; c++) {
                o.enqueue(p.holes[c]);
              }
            }
          }

          a.push(h);
        }
      }

      return a;
    }, S.polygonsFromHierarchy = function (e, n, i, a) {
      var o = [],
          s = [],
          c = new g();

      for (c.enqueue(e); 0 !== c.length;) {
        var l,
            f,
            h = c.dequeue(),
            d = h.positions,
            p = h.holes;
        if (i) for (f = d.length, l = 0; l < f; l++) {
          a.scaleToGeodeticSurface(d[l], d[l]);
        }

        if (d = t(d, r.equalsEpsilon, !0), !(d.length < 3)) {
          var m = n(d);

          if (u(m)) {
            var y = [],
                E = v.computeWindingOrder2D(m);
            E === R.CLOCKWISE && (m.reverse(), d = d.slice().reverse());

            var _,
                T = d.slice(),
                A = u(p) ? p.length : 0,
                S = [];

            for (l = 0; l < A; l++) {
              var w = p[l],
                  O = w.positions;
              if (i) for (f = O.length, _ = 0; _ < f; ++_) {
                a.scaleToGeodeticSurface(O[_], O[_]);
              }

              if (O = t(O, r.equalsEpsilon, !0), !(O.length < 3)) {
                var I = n(O);

                if (u(I)) {
                  E = v.computeWindingOrder2D(I), E === R.CLOCKWISE && (I.reverse(), O = O.slice().reverse()), S.push(O), y.push(T.length), T = T.concat(O), m = m.concat(I);
                  var x = 0;

                  for (u(w.holes) && (x = w.holes.length), _ = 0; _ < x; _++) {
                    c.enqueue(w.holes[_]);
                  }
                }
              }
            }

            o.push({
              outerRing: d,
              holes: S
            }), s.push({
              positions: T,
              positions2D: m,
              holes: y
            });
          }
        }
      }

      return {
        hierarchy: o,
        polygons: s
      };
    };
    var D = new n(),
        U = new r(),
        L = new T(),
        F = new E();
    S.computeBoundingRectangle = function (e, t, n, i, a) {
      for (var o = T.fromAxisAngle(e, i, L), s = E.fromQuaternion(o, F), c = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY, f = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY, d = n.length, p = 0; p < d; ++p) {
        var m = r.clone(n[p], U);
        E.multiplyByVector(s, m, m);
        var y = t(m, D);
        u(y) && (c = Math.min(c, y.x), l = Math.max(l, y.x), f = Math.min(f, y.y), h = Math.max(h, y.y));
      }

      return a.x = c, a.y = f, a.width = l - c, a.height = h - f, a;
    }, S.createGeometryFromPositions = function (t, n, r, i, o, u) {
      var s = v.triangulate(n.positions2D, n.holes);
      s.length < 3 && (s = [0, 1, 2]);
      var c = n.positions;

      if (i) {
        for (var l = c.length, d = new Array(3 * l), m = 0, y = 0; y < l; y++) {
          var E = c[y];
          d[m++] = E.x, d[m++] = E.y, d[m++] = E.z;
        }

        var T = new f({
          attributes: {
            position: new h({
              componentDatatype: a.DOUBLE,
              componentsPerAttribute: 3,
              values: d
            })
          },
          indices: s,
          primitiveType: _.TRIANGLES
        });
        return o.normal ? p.computeNormal(T) : T;
      }

      return u === e.GEODESIC ? v.computeSubdivision(t, c, s, r) : u === e.RHUMB ? v.computeRhumbLineSubdivision(t, c, s, r) : void 0;
    };
    var B = [],
        z = new r(),
        q = new r();
    return S.computeWallGeometry = function (t, n, i, o, u) {
      var s,
          c,
          l,
          p,
          E,
          v = t.length,
          T = 0;
      if (o) for (c = 3 * v * 2, s = new Array(2 * c), l = 0; l < v; l++) {
        p = t[l], E = t[(l + 1) % v], s[T] = s[T + c] = p.x, ++T, s[T] = s[T + c] = p.y, ++T, s[T] = s[T + c] = p.z, ++T, s[T] = s[T + c] = E.x, ++T, s[T] = s[T + c] = E.y, ++T, s[T] = s[T + c] = E.z, ++T;
      } else {
        var g = y.chordLength(i, n.maximumRadius),
            R = 0;
        if (u === e.GEODESIC) for (l = 0; l < v; l++) {
          R += S.subdivideLineCount(t[l], t[(l + 1) % v], g);
        } else if (u === e.RHUMB) for (l = 0; l < v; l++) {
          R += S.subdivideRhumbLineCount(n, t[l], t[(l + 1) % v], g);
        }

        for (c = 3 * (R + v), s = new Array(2 * c), l = 0; l < v; l++) {
          p = t[l], E = t[(l + 1) % v];
          var A;
          u === e.GEODESIC ? A = S.subdivideLine(p, E, g, B) : u === e.RHUMB && (A = S.subdivideRhumbLine(n, p, E, g, B));

          for (var w = A.length, O = 0; O < w; ++O, ++T) {
            s[T] = A[O], s[T + c] = A[O];
          }

          s[T] = E.x, s[T + c] = E.x, ++T, s[T] = E.y, s[T + c] = E.y, ++T, s[T] = E.z, s[T + c] = E.z, ++T;
        }
      }
      v = s.length;
      var I = m.createTypedArray(v / 3, v - 6 * t.length),
          x = 0;

      for (v /= 6, l = 0; l < v; l++) {
        var N = l,
            M = N + 1,
            C = N + v,
            P = C + 1;
        p = r.fromArray(s, 3 * N, z), E = r.fromArray(s, 3 * M, q), r.equalsEpsilon(p, E, y.EPSILON14, y.EPSILON6) || (I[x++] = N, I[x++] = C, I[x++] = M, I[x++] = M, I[x++] = C, I[x++] = P);
      }

      return new f({
        attributes: new d({
          position: new h({
            componentDatatype: a.DOUBLE,
            componentsPerAttribute: 3,
            values: s
          })
        }),
        indices: I,
        primitiveType: _.TRIANGLES
      });
    }, S;
  }), define("Core/VertexFormat", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function (e, t, n, r) {
    "use strict";

    function i(t) {
      t = e(t, e.EMPTY_OBJECT), this.position = e(t.position, !1), this.normal = e(t.normal, !1), this.st = e(t.st, !1), this.bitangent = e(t.bitangent, !1), this.tangent = e(t.tangent, !1), this.color = e(t.color, !1);
    }

    return i.POSITION_ONLY = r(new i({
      position: !0
    })), i.POSITION_AND_NORMAL = r(new i({
      position: !0,
      normal: !0
    })), i.POSITION_NORMAL_AND_ST = r(new i({
      position: !0,
      normal: !0,
      st: !0
    })), i.POSITION_AND_ST = r(new i({
      position: !0,
      st: !0
    })), i.POSITION_AND_COLOR = r(new i({
      position: !0,
      color: !0
    })), i.ALL = r(new i({
      position: !0,
      normal: !0,
      st: !0,
      tangent: !0,
      bitangent: !0
    })), i.DEFAULT = i.POSITION_NORMAL_AND_ST, i.packedLength = 6, i.pack = function (t, n, r) {
      return r = e(r, 0), n[r++] = t.position ? 1 : 0, n[r++] = t.normal ? 1 : 0, n[r++] = t.st ? 1 : 0, n[r++] = t.tangent ? 1 : 0, n[r++] = t.bitangent ? 1 : 0, n[r] = t.color ? 1 : 0, n;
    }, i.unpack = function (n, r, a) {
      return r = e(r, 0), t(a) || (a = new i()), a.position = 1 === n[r++], a.normal = 1 === n[r++], a.st = 1 === n[r++], a.tangent = 1 === n[r++], a.bitangent = 1 === n[r++], a.color = 1 === n[r], a;
    }, i.clone = function (e, n) {
      if (t(e)) return t(n) || (n = new i()), n.position = e.position, n.normal = e.normal, n.st = e.st, n.tangent = e.tangent, n.bitangent = e.bitangent, n.color = e.color, n;
    }, i;
  }), define("Core/CoplanarPolygonGeometry", ["./arrayRemoveDuplicates", "./BoundingRectangle", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Check", "./ComponentDatatype", "./CoplanarPolygonGeometryLibrary", "./defaultValue", "./defined", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryInstance", "./GeometryPipeline", "./IndexDatatype", "./Math", "./Matrix3", "./PolygonGeometryLibrary", "./PolygonPipeline", "./PrimitiveType", "./Quaternion", "./VertexFormat"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, p, m, y, E, v, _, T, g, R, A) {
    "use strict";

    function S(e, t, n, a, u, s, c, l) {
      var p = e.positions,
          m = T.triangulate(e.positions2D, e.holes);
      m.length < 3 && (m = [0, 1, 2]);

      var _ = y.createTypedArray(p.length, m.length);

      _.set(m);

      var A = F;

      if (0 !== a) {
        var S = R.fromAxisAngle(s, a, L);

        if (A = v.fromQuaternion(S, A), t.tangent || t.bitangent) {
          S = R.fromAxisAngle(s, -a, L);
          var w = v.fromQuaternion(S, B);
          c = i.normalize(v.multiplyByVector(w, c, c), c), t.bitangent && (l = i.normalize(i.cross(s, c, l), l));
        }
      } else A = v.clone(v.IDENTITY, A);

      var I = N;
      t.st && (I.x = n.x, I.y = n.y);

      for (var M = p.length, C = 3 * M, P = new Float64Array(C), b = t.normal ? new Float32Array(C) : void 0, D = t.tangent ? new Float32Array(C) : void 0, U = t.bitangent ? new Float32Array(C) : void 0, z = t.st ? new Float32Array(2 * M) : void 0, q = 0, G = 0, V = 0, W = 0, X = 0, k = 0; k < M; k++) {
        var H = p[k];

        if (P[q++] = H.x, P[q++] = H.y, P[q++] = H.z, t.st) {
          var Y = v.multiplyByVector(A, H, O),
              j = u(Y, x);
          r.subtract(j, I, j);
          var Z = E.clamp(j.x / n.width, 0, 1),
              K = E.clamp(j.y / n.height, 0, 1);
          z[X++] = Z, z[X++] = K;
        }

        t.normal && (b[G++] = s.x, b[G++] = s.y, b[G++] = s.z), t.tangent && (D[W++] = c.x, D[W++] = c.y, D[W++] = c.z), t.bitangent && (U[V++] = l.x, U[V++] = l.y, U[V++] = l.z);
      }

      var J = new d();
      return t.position && (J.position = new h({
        componentDatatype: o.DOUBLE,
        componentsPerAttribute: 3,
        values: P
      })), t.normal && (J.normal = new h({
        componentDatatype: o.FLOAT,
        componentsPerAttribute: 3,
        values: b
      })), t.tangent && (J.tangent = new h({
        componentDatatype: o.FLOAT,
        componentsPerAttribute: 3,
        values: D
      })), t.bitangent && (J.bitangent = new h({
        componentDatatype: o.FLOAT,
        componentsPerAttribute: 3,
        values: U
      })), t.st && (J.st = new h({
        componentDatatype: o.FLOAT,
        componentsPerAttribute: 2,
        values: z
      })), new f({
        attributes: J,
        indices: _,
        primitiveType: g.TRIANGLES
      });
    }

    function w(e) {
      e = s(e, s.EMPTY_OBJECT);
      var t = e.polygonHierarchy,
          n = s(e.vertexFormat, A.DEFAULT);
      this._vertexFormat = A.clone(n), this._polygonHierarchy = t, this._stRotation = s(e.stRotation, 0), this._ellipsoid = l.clone(s(e.ellipsoid, l.WGS84)), this._workerName = "createCoplanarPolygonGeometry", this.packedLength = _.computeHierarchyPackedLength(t) + A.packedLength + l.packedLength + 2;
    }

    var O = new i(),
        I = new t(),
        x = new r(),
        N = new r(),
        M = new i(),
        C = new i(),
        P = new i(),
        b = new i(),
        D = new i(),
        U = new i(),
        L = new R(),
        F = new v(),
        B = new v(),
        z = new i();
    w.fromPositions = function (e) {
      return e = s(e, s.EMPTY_OBJECT), new w({
        polygonHierarchy: {
          positions: e.positions
        },
        vertexFormat: e.vertexFormat,
        stRotation: e.stRotation,
        ellipsoid: e.ellipsoid
      });
    }, w.pack = function (e, t, n) {
      return n = s(n, 0), n = _.packPolygonHierarchy(e._polygonHierarchy, t, n), l.pack(e._ellipsoid, t, n), n += l.packedLength, A.pack(e._vertexFormat, t, n), n += A.packedLength, t[n++] = e._stRotation, t[n] = e.packedLength, t;
    };
    var q = l.clone(l.UNIT_SPHERE),
        G = new A(),
        V = {
      polygonHierarchy: {}
    };
    return w.unpack = function (e, t, n) {
      t = s(t, 0);

      var r = _.unpackPolygonHierarchy(e, t);

      t = r.startingIndex, delete r.startingIndex;
      var i = l.unpack(e, t, q);
      t += l.packedLength;
      var a = A.unpack(e, t, G);
      t += A.packedLength;
      var o = e[t++],
          u = e[t];
      return c(n) || (n = new w(V)), n._polygonHierarchy = r, n._ellipsoid = l.clone(i, n._ellipsoid), n._vertexFormat = A.clone(a, n._vertexFormat), n._stRotation = o, n.packedLength = u, n;
    }, w.createGeometry = function (t) {
      var r = t._vertexFormat,
          a = t._polygonHierarchy,
          o = t._stRotation,
          s = a.positions;

      if (s = e(s, i.equalsEpsilon, !0), !(s.length < 3)) {
        var c = M,
            l = C,
            h = P,
            d = D,
            v = U;

        if (u.computeProjectTo2DArguments(s, b, d, v)) {
          if (c = i.cross(d, v, c), c = i.normalize(c, c), !i.equalsEpsilon(b, i.ZERO, E.EPSILON6)) {
            var T = t._ellipsoid.geodeticSurfaceNormal(b, z);

            i.dot(c, T) < 0 && (c = i.negate(c, c), d = i.negate(d, d));
          }

          var g = u.createProjectPointsTo2DFunction(b, d, v),
              R = u.createProjectPointTo2DFunction(b, d, v);
          r.tangent && (l = i.clone(d, l)), r.bitangent && (h = i.clone(v, h));

          var A = _.polygonsFromHierarchy(a, g, !1),
              w = A.hierarchy,
              O = A.polygons;

          if (0 !== w.length) {
            s = w[0].outerRing;

            for (var x = n.fromPoints(s), N = _.computeBoundingRectangle(c, R, s, o, I), L = [], F = 0; F < O.length; F++) {
              var B = new p({
                geometry: S(O[F], r, N, o, R, c, l, h)
              });
              L.push(B);
            }

            var q = m.combineInstances(L)[0];
            q.attributes.position.values = new Float64Array(q.attributes.position.values), q.indices = y.createTypedArray(q.attributes.position.values.length / 3, q.indices);
            var G = q.attributes;
            return r.position || delete G.position, new f({
              attributes: G,
              indices: q.indices,
              primitiveType: q.primitiveType,
              boundingSphere: x
            });
          }
        }
      }
    }, w;
  }), define("Workers/createCoplanarPolygonGeometry", ["../Core/defined", "../Core/CoplanarPolygonGeometry"], function (e, t) {
    "use strict";

    function n(n, r) {
      return e(r) && (n = t.unpack(n, r)), t.createGeometry(n);
    }

    return n;
  });
}();