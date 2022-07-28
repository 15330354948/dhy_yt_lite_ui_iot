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

    function r(e) {
      return e + " is required, actual value was undefined";
    }

    function n(e, t, r) {
      return "Expected " + r + " to be typeof " + t + ", actual typeof was " + e;
    }

    var i = {};
    return i.typeOf = {}, i.defined = function (n, i) {
      if (!e(i)) throw new t(r(n));
    }, i.typeOf.func = function (e, r) {
      if ("function" != typeof r) throw new t(n(_typeof(r), "function", e));
    }, i.typeOf.string = function (e, r) {
      if ("string" != typeof r) throw new t(n(_typeof(r), "string", e));
    }, i.typeOf.number = function (e, r) {
      if ("number" != typeof r) throw new t(n(_typeof(r), "number", e));
    }, i.typeOf.number.lessThan = function (e, r, n) {
      if (i.typeOf.number(e, r), r >= n) throw new t("Expected " + e + " to be less than " + n + ", actual value was " + r);
    }, i.typeOf.number.lessThanOrEquals = function (e, r, n) {
      if (i.typeOf.number(e, r), r > n) throw new t("Expected " + e + " to be less than or equal to " + n + ", actual value was " + r);
    }, i.typeOf.number.greaterThan = function (e, r, n) {
      if (i.typeOf.number(e, r), r <= n) throw new t("Expected " + e + " to be greater than " + n + ", actual value was " + r);
    }, i.typeOf.number.greaterThanOrEquals = function (e, r, n) {
      if (i.typeOf.number(e, r), r < n) throw new t("Expected " + e + " to be greater than or equal to" + n + ", actual value was " + r);
    }, i.typeOf.object = function (e, r) {
      if ("object" != _typeof(r)) throw new t(n(_typeof(r), "object", e));
    }, i.typeOf.bool = function (e, r) {
      if ("boolean" != typeof r) throw new t(n(_typeof(r), "boolean", e));
    }, i.typeOf.number.equals = function (e, r, n, a) {
      if (i.typeOf.number(e, n), i.typeOf.number(r, a), n !== a) throw new t(e + " must be equal to " + r + ", the actual values are " + n + " and " + a);
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
    var e = function e(_e) {
      void 0 == _e && (_e = new Date().getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(_e);
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
        var r;

        for (this.mti == this.N + 1 && this.init_genrand(5489), r = 0; r < this.N - this.M; r++) {
          e = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + this.M] ^ e >>> 1 ^ t[1 & e];
        }

        for (; r < this.N - 1; r++) {
          e = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + (this.M - this.N)] ^ e >>> 1 ^ t[1 & e];
        }

        e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ t[1 & e], this.mti = 0;
      }

      return e = this.mt[this.mti++], e ^= e >>> 11, e ^= e << 7 & 2636928640, e ^= e << 15 & 4022730752, (e ^= e >>> 18) >>> 0;
    }, e.prototype.random = function () {
      return this.genrand_int32() * (1 / 4294967296);
    }, e;
  }), define("Core/Math", ["../ThirdParty/mersenne-twister", "./Check", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, r, n, i) {
    "use strict";

    var a = {};
    a.EPSILON1 = .1, a.EPSILON2 = .01, a.EPSILON3 = .001, a.EPSILON4 = 1e-4, a.EPSILON5 = 1e-5, a.EPSILON6 = 1e-6, a.EPSILON7 = 1e-7, a.EPSILON8 = 1e-8, a.EPSILON9 = 1e-9, a.EPSILON10 = 1e-10, a.EPSILON11 = 1e-11, a.EPSILON12 = 1e-12, a.EPSILON13 = 1e-13, a.EPSILON14 = 1e-14, a.EPSILON15 = 1e-15, a.EPSILON16 = 1e-16, a.EPSILON17 = 1e-17, a.EPSILON18 = 1e-18, a.EPSILON19 = 1e-19, a.EPSILON20 = 1e-20, a.EPSILON21 = 1e-21, a.GRAVITATIONALPARAMETER = 3986004418e5, a.SOLAR_RADIUS = 6955e5, a.LUNAR_RADIUS = 1737400, a.SIXTY_FOUR_KILOBYTES = 65536, a.sign = r(Math.sign, function (e) {
      return e = +e, 0 === e || e !== e ? e : e > 0 ? 1 : -1;
    }), a.signNotZero = function (e) {
      return e < 0 ? -1 : 1;
    }, a.toSNorm = function (e, t) {
      return t = r(t, 255), Math.round((.5 * a.clamp(e, -1, 1) + .5) * t);
    }, a.fromSNorm = function (e, t) {
      return t = r(t, 255), a.clamp(e, 0, t) / t * 2 - 1;
    }, a.normalize = function (e, t, r) {
      return r = Math.max(r - t, 0), 0 === r ? 0 : a.clamp((e - t) / r, 0, 1);
    }, a.sinh = r(Math.sinh, function (e) {
      return (Math.exp(e) - Math.exp(-e)) / 2;
    }), a.cosh = r(Math.cosh, function (e) {
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
    }, a.equalsEpsilon = function (e, t, n, i) {
      i = r(i, n);
      var a = Math.abs(e - t);
      return a <= i || a <= n * Math.max(Math.abs(e), Math.abs(t));
    }, a.lessThan = function (e, t, r) {
      return e - t < -r;
    }, a.lessThanOrEquals = function (e, t, r) {
      return e - t < r;
    }, a.greaterThan = function (e, t, r) {
      return e - t > r;
    }, a.greaterThanOrEquals = function (e, t, r) {
      return e - t > -r;
    };
    var o = [1];
    a.factorial = function (e) {
      var t = o.length;
      if (e >= t) for (var r = o[t - 1], n = t; n <= e; n++) {
        o.push(r * n);
      }
      return o[e];
    }, a.incrementWrap = function (e, t, n) {
      return n = r(n, 0), ++e, e > t && (e = n), e;
    }, a.isPowerOfTwo = function (e) {
      return 0 !== e && 0 == (e & e - 1);
    }, a.nextPowerOfTwo = function (e) {
      return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e;
    }, a.clamp = function (e, t, r) {
      return e < t ? t : e > r ? r : e;
    };
    var s = new e();
    return a.setRandomNumberSeed = function (t) {
      s = new e(t);
    }, a.nextRandomNumber = function () {
      return s.random();
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
    }, a.cbrt = r(Math.cbrt, function (e) {
      var t = Math.pow(Math.abs(e), 1 / 3);
      return e < 0 ? -t : t;
    }), a.log2 = r(Math.log2, function (e) {
      return Math.log(e) * Math.LOG2E;
    }), a.fog = function (e, t) {
      var r = e * t;
      return 1 - Math.exp(-r * r);
    }, a.fastApproximateAtan = function (e) {
      return e * (-.1784 * Math.abs(e) - .0663 * e * e + 1.0301);
    }, a.fastApproximateAtan2 = function (e, t) {
      var r,
          n,
          i = Math.abs(e);
      r = Math.abs(t), n = Math.max(i, r), r = Math.min(i, r);
      var o = r / n;
      return i = a.fastApproximateAtan(o), i = Math.abs(t) > Math.abs(e) ? a.PI_OVER_TWO - i : i, i = e < 0 ? a.PI - i : i, i = t < 0 ? -i : i;
    }, a;
  }), define("Core/Cartesian3", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, a) {
    "use strict";

    function o(e, r, n) {
      this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0);
    }

    o.fromSpherical = function (e, n) {
      r(n) || (n = new o());
      var i = e.clock,
          a = e.cone,
          s = t(e.magnitude, 1),
          u = s * Math.sin(a);
      return n.x = u * Math.cos(i), n.y = u * Math.sin(i), n.z = s * Math.cos(a), n;
    }, o.fromElements = function (e, t, n, i) {
      return r(i) ? (i.x = e, i.y = t, i.z = n, i) : new o(e, t, n);
    }, o.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t) : new o(e.x, e.y, e.z);
    }, o.fromCartesian4 = o.clone, o.packedLength = 3, o.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n++] = e.y, r[n] = e.z, r;
    }, o.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new o()), i.x = e[n++], i.y = e[n++], i.z = e[n], i;
    }, o.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 3 * n : t = new Array(3 * n);

      for (var i = 0; i < n; ++i) {
        o.pack(e[i], t, 3 * i);
      }

      return t;
    }, o.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 3 : t = new Array(n / 3);

      for (var i = 0; i < n; i += 3) {
        var a = i / 3;
        t[a] = o.unpack(e, i, t[a]);
      }

      return t;
    }, o.fromArray = o.unpack, o.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z);
    }, o.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z);
    }, o.minimumByComponent = function (e, t, r) {
      return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r.z = Math.min(e.z, t.z), r;
    }, o.maximumByComponent = function (e, t, r) {
      return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r.z = Math.max(e.z, t.z), r;
    }, o.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z;
    }, o.magnitude = function (e) {
      return Math.sqrt(o.magnitudeSquared(e));
    };
    var s = new o();
    o.distance = function (e, t) {
      return o.subtract(e, t, s), o.magnitude(s);
    }, o.distanceSquared = function (e, t) {
      return o.subtract(e, t, s), o.magnitudeSquared(s);
    }, o.normalize = function (e, t) {
      var r = o.magnitude(e);
      return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t;
    }, o.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z;
    }, o.multiplyComponents = function (e, t, r) {
      return r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z, r;
    }, o.divideComponents = function (e, t, r) {
      return r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z, r;
    }, o.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r;
    }, o.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r;
    }, o.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r;
    }, o.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r;
    }, o.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t;
    }, o.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t;
    };
    var u = new o();

    o.lerp = function (e, t, r, n) {
      return o.multiplyByScalar(t, r, u), n = o.multiplyByScalar(e, 1 - r, n), o.add(u, n, n);
    };

    var c = new o(),
        l = new o();

    o.angleBetween = function (e, t) {
      o.normalize(e, c), o.normalize(t, l);
      var r = o.dot(c, l),
          n = o.magnitude(o.cross(c, l, c));
      return Math.atan2(n, r);
    };

    var f = new o();
    o.mostOrthogonalAxis = function (e, t) {
      var r = o.normalize(e, f);
      return o.abs(r, r), t = r.x <= r.y ? r.x <= r.z ? o.clone(o.UNIT_X, t) : o.clone(o.UNIT_Z, t) : r.y <= r.z ? o.clone(o.UNIT_Y, t) : o.clone(o.UNIT_Z, t);
    }, o.projectVector = function (e, t, r) {
      var n = o.dot(e, t) / o.dot(t, t);
      return o.multiplyByScalar(t, n, r);
    }, o.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z;
    }, o.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2];
    }, o.equalsEpsilon = function (e, t, n, i) {
      return e === t || r(e) && r(t) && a.equalsEpsilon(e.x, t.x, n, i) && a.equalsEpsilon(e.y, t.y, n, i) && a.equalsEpsilon(e.z, t.z, n, i);
    }, o.cross = function (e, t, r) {
      var n = e.x,
          i = e.y,
          a = e.z,
          o = t.x,
          s = t.y,
          u = t.z,
          c = i * u - a * s,
          l = a * o - n * u,
          f = n * s - i * o;
      return r.x = c, r.y = l, r.z = f, r;
    }, o.midpoint = function (e, t, r) {
      return r.x = .5 * (e.x + t.x), r.y = .5 * (e.y + t.y), r.z = .5 * (e.z + t.z), r;
    }, o.fromDegrees = function (e, t, r, n, i) {
      return e = a.toRadians(e), t = a.toRadians(t), o.fromRadians(e, t, r, n, i);
    };
    var h = new o(),
        d = new o(),
        E = new o(40680631590769, 40680631590769, 40408299984661.445);
    return o.fromRadians = function (e, n, i, a, s) {
      i = t(i, 0);
      var u = r(a) ? a.radiiSquared : E,
          c = Math.cos(n);
      h.x = c * Math.cos(e), h.y = c * Math.sin(e), h.z = Math.sin(n), h = o.normalize(h, h), o.multiplyComponents(u, h, d);
      var l = Math.sqrt(o.dot(h, d));
      return d = o.divideByScalar(d, l, d), h = o.multiplyByScalar(h, i, h), r(s) || (s = new o()), o.add(d, h, s);
    }, o.fromDegreesArray = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 2 : n = new Array(i / 2);

      for (var a = 0; a < i; a += 2) {
        var s = e[a],
            u = e[a + 1],
            c = a / 2;
        n[c] = o.fromDegrees(s, u, 0, t, n[c]);
      }

      return n;
    }, o.fromRadiansArray = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 2 : n = new Array(i / 2);

      for (var a = 0; a < i; a += 2) {
        var s = e[a],
            u = e[a + 1],
            c = a / 2;
        n[c] = o.fromRadians(s, u, 0, t, n[c]);
      }

      return n;
    }, o.fromDegreesArrayHeights = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 3 : n = new Array(i / 3);

      for (var a = 0; a < i; a += 3) {
        var s = e[a],
            u = e[a + 1],
            c = e[a + 2],
            l = a / 3;
        n[l] = o.fromDegrees(s, u, c, t, n[l]);
      }

      return n;
    }, o.fromRadiansArrayHeights = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 3 : n = new Array(i / 3);

      for (var a = 0; a < i; a += 3) {
        var s = e[a],
            u = e[a + 1],
            c = e[a + 2],
            l = a / 3;
        n[l] = o.fromRadians(s, u, c, t, n[l]);
      }

      return n;
    }, o.ZERO = i(new o(0, 0, 0)), o.UNIT_X = i(new o(1, 0, 0)), o.UNIT_Y = i(new o(0, 1, 0)), o.UNIT_Z = i(new o(0, 0, 1)), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, r) {
      return o.equalsEpsilon(this, e, t, r);
    }, o.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }, o;
  }), define("Core/scaleToGeodeticSurface", ["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function (e, t, r, n) {
    "use strict";

    function i(r, i, s, u, c) {
      var l = r.x,
          f = r.y,
          h = r.z,
          d = i.x,
          E = i.y,
          p = i.z,
          m = l * l * d * d,
          _ = f * f * E * E,
          y = h * h * p * p,
          R = m + _ + y,
          T = Math.sqrt(1 / R),
          A = e.multiplyByScalar(r, T, a);

      if (R < u) return isFinite(T) ? e.clone(A, c) : void 0;
      var S = s.x,
          g = s.y,
          C = s.z,
          v = o;
      v.x = A.x * S * 2, v.y = A.y * g * 2, v.z = A.z * C * 2;
      var I,
          O,
          N,
          M,
          w,
          P,
          D,
          U,
          F,
          x,
          L,
          B = (1 - T) * e.magnitude(r) / (.5 * e.magnitude(v)),
          b = 0;

      do {
        B -= b, N = 1 / (1 + B * S), M = 1 / (1 + B * g), w = 1 / (1 + B * C), P = N * N, D = M * M, U = w * w, F = P * N, x = D * M, L = U * w, I = m * P + _ * D + y * U - 1, O = m * F * S + _ * x * g + y * L * C;
        b = I / (-2 * O);
      } while (Math.abs(I) > n.EPSILON12);

      return t(c) ? (c.x = l * N, c.y = f * M, c.z = h * w, c) : new e(l * N, f * M, h * w);
    }

    var a = new e(),
        o = new e();
    return i;
  }), define("Core/Cartographic", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, r, n, i, a, o) {
    "use strict";

    function s(e, t, n) {
      this.longitude = r(e, 0), this.latitude = r(t, 0), this.height = r(n, 0);
    }

    s.fromRadians = function (e, t, i, a) {
      return i = r(i, 0), n(a) ? (a.longitude = e, a.latitude = t, a.height = i, a) : new s(e, t, i);
    }, s.fromDegrees = function (e, t, r, n) {
      return e = a.toRadians(e), t = a.toRadians(t), s.fromRadians(e, t, r, n);
    };
    var u = new e(),
        c = new e(),
        l = new e(),
        f = new e(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
        h = new e(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
        d = a.EPSILON1;
    return s.fromCartesian = function (t, r, i) {
      var E = n(r) ? r.oneOverRadii : f,
          p = n(r) ? r.oneOverRadiiSquared : h,
          m = n(r) ? r._centerToleranceSquared : d,
          _ = o(t, E, p, m, c);

      if (n(_)) {
        var y = e.multiplyComponents(_, p, u);
        y = e.normalize(y, y);
        var R = e.subtract(t, _, l),
            T = Math.atan2(y.y, y.x),
            A = Math.asin(y.z),
            S = a.sign(e.dot(R, t)) * e.magnitude(R);
        return n(i) ? (i.longitude = T, i.latitude = A, i.height = S, i) : new s(T, A, S);
      }
    }, s.toCartesian = function (t, r, n) {
      return e.fromRadians(t.longitude, t.latitude, t.height, r, n);
    }, s.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.longitude = e.longitude, t.latitude = e.latitude, t.height = e.height, t) : new s(e.longitude, e.latitude, e.height);
    }, s.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height;
    }, s.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.longitude - t.longitude) <= r && Math.abs(e.latitude - t.latitude) <= r && Math.abs(e.height - t.height) <= r;
    }, s.ZERO = i(new s(0, 0, 0)), s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.prototype.toString = function () {
      return "(" + this.longitude + ", " + this.latitude + ", " + this.height + ")";
    }, s;
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
  }), define("Core/Ellipsoid", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, r, n, i, a, o, s, u, c) {
    "use strict";

    function l(t, r, i, a) {
      r = n(r, 0), i = n(i, 0), a = n(a, 0), t._radii = new e(r, i, a), t._radiiSquared = new e(r * r, i * i, a * a), t._radiiToTheFourth = new e(r * r * r * r, i * i * i * i, a * a * a * a), t._oneOverRadii = new e(0 === r ? 0 : 1 / r, 0 === i ? 0 : 1 / i, 0 === a ? 0 : 1 / a), t._oneOverRadiiSquared = new e(0 === r ? 0 : 1 / (r * r), 0 === i ? 0 : 1 / (i * i), 0 === a ? 0 : 1 / (a * a)), t._minimumRadius = Math.min(r, i, a), t._maximumRadius = Math.max(r, i, a), t._centerToleranceSquared = u.EPSILON1, 0 !== t._radiiSquared.z && (t._squaredXOverSquaredZ = t._radiiSquared.x / t._radiiSquared.z);
    }

    function f(e, t, r) {
      this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, l(this, e, t, r);
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
    }), f.clone = function (t, r) {
      if (i(t)) {
        var n = t._radii;
        return i(r) ? (e.clone(n, r._radii), e.clone(t._radiiSquared, r._radiiSquared), e.clone(t._radiiToTheFourth, r._radiiToTheFourth), e.clone(t._oneOverRadii, r._oneOverRadii), e.clone(t._oneOverRadiiSquared, r._oneOverRadiiSquared), r._minimumRadius = t._minimumRadius, r._maximumRadius = t._maximumRadius, r._centerToleranceSquared = t._centerToleranceSquared, r) : new f(n.x, n.y, n.z);
      }
    }, f.fromCartesian3 = function (e, t) {
      return i(t) || (t = new f()), i(e) ? (l(t, e.x, e.y, e.z), t) : t;
    }, f.WGS84 = s(new f(6378137, 6378137, 6356752.314245179)), f.UNIT_SPHERE = s(new f(1, 1, 1)), f.MOON = s(new f(u.LUNAR_RADIUS, u.LUNAR_RADIUS, u.LUNAR_RADIUS)), f.prototype.clone = function (e) {
      return f.clone(this, e);
    }, f.packedLength = e.packedLength, f.pack = function (t, r, i) {
      return i = n(i, 0), e.pack(t._radii, r, i), r;
    }, f.unpack = function (t, r, i) {
      r = n(r, 0);
      var a = e.unpack(t, r);
      return f.fromCartesian3(a, i);
    }, f.prototype.geocentricSurfaceNormal = e.normalize, f.prototype.geodeticSurfaceNormalCartographic = function (t, r) {
      var n = t.longitude,
          a = t.latitude,
          o = Math.cos(a),
          s = o * Math.cos(n),
          u = o * Math.sin(n),
          c = Math.sin(a);
      return i(r) || (r = new e()), r.x = s, r.y = u, r.z = c, e.normalize(r, r);
    }, f.prototype.geodeticSurfaceNormal = function (t, r) {
      return i(r) || (r = new e()), r = e.multiplyComponents(t, this._oneOverRadiiSquared, r), e.normalize(r, r);
    };
    var h = new e(),
        d = new e();
    f.prototype.cartographicToCartesian = function (t, r) {
      var n = h,
          a = d;
      this.geodeticSurfaceNormalCartographic(t, n), e.multiplyComponents(this._radiiSquared, n, a);
      var o = Math.sqrt(e.dot(n, a));
      return e.divideByScalar(a, o, a), e.multiplyByScalar(n, t.height, n), i(r) || (r = new e()), e.add(a, n, r);
    }, f.prototype.cartographicArrayToCartesianArray = function (e, t) {
      var r = e.length;
      i(t) ? t.length = r : t = new Array(r);

      for (var n = 0; n < r; n++) {
        t[n] = this.cartographicToCartesian(e[n], t[n]);
      }

      return t;
    };
    var E = new e(),
        p = new e(),
        m = new e();
    return f.prototype.cartesianToCartographic = function (r, n) {
      var a = this.scaleToGeodeticSurface(r, p);

      if (i(a)) {
        var o = this.geodeticSurfaceNormal(a, E),
            s = e.subtract(r, a, m),
            c = Math.atan2(o.y, o.x),
            l = Math.asin(o.z),
            f = u.sign(e.dot(s, r)) * e.magnitude(s);
        return i(n) ? (n.longitude = c, n.latitude = l, n.height = f, n) : new t(c, l, f);
      }
    }, f.prototype.cartesianArrayToCartographicArray = function (e, t) {
      var r = e.length;
      i(t) ? t.length = r : t = new Array(r);

      for (var n = 0; n < r; ++n) {
        t[n] = this.cartesianToCartographic(e[n], t[n]);
      }

      return t;
    }, f.prototype.scaleToGeodeticSurface = function (e, t) {
      return c(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t);
    }, f.prototype.scaleToGeocentricSurface = function (t, r) {
      i(r) || (r = new e());
      var n = t.x,
          a = t.y,
          o = t.z,
          s = this._oneOverRadiiSquared,
          u = 1 / Math.sqrt(n * n * s.x + a * a * s.y + o * o * s.z);
      return e.multiplyByScalar(t, u, r);
    }, f.prototype.transformPositionToScaledSpace = function (t, r) {
      return i(r) || (r = new e()), e.multiplyComponents(t, this._oneOverRadii, r);
    }, f.prototype.transformPositionFromScaledSpace = function (t, r) {
      return i(r) || (r = new e()), e.multiplyComponents(t, this._radii, r);
    }, f.prototype.equals = function (t) {
      return this === t || i(t) && e.equals(this._radii, t._radii);
    }, f.prototype.toString = function () {
      return this._radii.toString();
    }, f.prototype.getSurfaceNormalIntersectionWithZAxis = function (t, r, a) {
      r = n(r, 0);
      var o = this._squaredXOverSquaredZ;
      if (i(a) || (a = new e()), a.x = 0, a.y = 0, a.z = t.z * (1 - o), !(Math.abs(a.z) >= this._radii.z - r)) return a;
    }, f;
  }), define("Core/ArcType", ["./freezeObject"], function (e) {
    "use strict";

    return e({
      NONE: 0,
      GEODESIC: 1,
      RHUMB: 2
    });
  }), define("Core/GeographicProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function (e, t, r, n, i, a, o) {
    "use strict";

    function s(e) {
      this._ellipsoid = r(e, o.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
    }

    return i(s.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      }
    }), s.prototype.project = function (t, r) {
      var i = this._semimajorAxis,
          a = t.longitude * i,
          o = t.latitude * i,
          s = t.height;
      return n(r) ? (r.x = a, r.y = o, r.z = s, r) : new e(a, o, s);
    }, s.prototype.unproject = function (e, r) {
      var i = this._oneOverSemimajorAxis,
          a = e.x * i,
          o = e.y * i,
          s = e.z;
      return n(r) ? (r.longitude = a, r.latitude = o, r.height = s, r) : new t(a, o, s);
    }, s;
  }), define("Core/Intersect", ["./freezeObject"], function (e) {
    "use strict";

    return e({
      OUTSIDE: -1,
      INTERSECTING: 0,
      INSIDE: 1
    });
  }), define("Core/Interval", ["./defaultValue"], function (e) {
    "use strict";

    function t(t, r) {
      this.start = e(t, 0), this.stop = e(r, 0);
    }

    return t;
  }), define("Core/Matrix3", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, a, o, s) {
    "use strict";

    function u(e, t, n, i, a, o, s, u, c) {
      this[0] = r(e, 0), this[1] = r(i, 0), this[2] = r(s, 0), this[3] = r(t, 0), this[4] = r(a, 0), this[5] = r(u, 0), this[6] = r(n, 0), this[7] = r(o, 0), this[8] = r(c, 0);
    }

    function c(e) {
      for (var t = 0, r = 0; r < 9; ++r) {
        var n = e[r];
        t += n * n;
      }

      return Math.sqrt(t);
    }

    function l(e) {
      for (var t = 0, r = 0; r < 3; ++r) {
        var n = e[u.getElementIndex(p[r], E[r])];
        t += 2 * n * n;
      }

      return Math.sqrt(t);
    }

    function f(e, t) {
      for (var r = s.EPSILON15, n = 0, i = 1, a = 0; a < 3; ++a) {
        var o = Math.abs(e[u.getElementIndex(p[a], E[a])]);
        o > n && (i = a, n = o);
      }

      var c = 1,
          l = 0,
          f = E[i],
          h = p[i];

      if (Math.abs(e[u.getElementIndex(h, f)]) > r) {
        var d,
            m = e[u.getElementIndex(h, h)],
            _ = e[u.getElementIndex(f, f)],
            y = e[u.getElementIndex(h, f)],
            R = (m - _) / 2 / y;
        d = R < 0 ? -1 / (-R + Math.sqrt(1 + R * R)) : 1 / (R + Math.sqrt(1 + R * R)), c = 1 / Math.sqrt(1 + d * d), l = d * c;
      }

      return t = u.clone(u.IDENTITY, t), t[u.getElementIndex(f, f)] = t[u.getElementIndex(h, h)] = c, t[u.getElementIndex(h, f)] = l, t[u.getElementIndex(f, h)] = -l, t;
    }

    u.packedLength = 9, u.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t[n++] = e[4], t[n++] = e[5], t[n++] = e[6], t[n++] = e[7], t[n++] = e[8], t;
    }, u.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new u()), i[0] = e[t++], i[1] = e[t++], i[2] = e[t++], i[3] = e[t++], i[4] = e[t++], i[5] = e[t++], i[6] = e[t++], i[7] = e[t++], i[8] = e[t++], i;
    }, u.clone = function (e, t) {
      if (n(e)) return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new u(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]);
    }, u.fromArray = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new u()), i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i[4] = e[t + 4], i[5] = e[t + 5], i[6] = e[t + 6], i[7] = e[t + 7], i[8] = e[t + 8], i;
    }, u.fromColumnMajorArray = function (e, t) {
      return u.clone(e, t);
    }, u.fromRowMajorArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t) : new u(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
    }, u.fromQuaternion = function (e, t) {
      var r = e.x * e.x,
          i = e.x * e.y,
          a = e.x * e.z,
          o = e.x * e.w,
          s = e.y * e.y,
          c = e.y * e.z,
          l = e.y * e.w,
          f = e.z * e.z,
          h = e.z * e.w,
          d = e.w * e.w,
          E = r - s - f + d,
          p = 2 * (i - h),
          m = 2 * (a + l),
          _ = 2 * (i + h),
          y = -r + s - f + d,
          R = 2 * (c - o),
          T = 2 * (a - l),
          A = 2 * (c + o),
          S = -r - s + f + d;

      return n(t) ? (t[0] = E, t[1] = _, t[2] = T, t[3] = p, t[4] = y, t[5] = A, t[6] = m, t[7] = R, t[8] = S, t) : new u(E, p, m, _, y, R, T, A, S);
    }, u.fromHeadingPitchRoll = function (e, t) {
      var r = Math.cos(-e.pitch),
          i = Math.cos(-e.heading),
          a = Math.cos(e.roll),
          o = Math.sin(-e.pitch),
          s = Math.sin(-e.heading),
          c = Math.sin(e.roll),
          l = r * i,
          f = -a * s + c * o * i,
          h = c * s + a * o * i,
          d = r * s,
          E = a * i + c * o * s,
          p = -c * i + a * o * s,
          m = -o,
          _ = c * r,
          y = a * r;

      return n(t) ? (t[0] = l, t[1] = d, t[2] = m, t[3] = f, t[4] = E, t[5] = _, t[6] = h, t[7] = p, t[8] = y, t) : new u(l, f, h, d, E, p, m, _, y);
    }, u.fromScale = function (e, t) {
      return n(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e.y, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e.z, t) : new u(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z);
    }, u.fromUniformScale = function (e, t) {
      return n(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e, t) : new u(e, 0, 0, 0, e, 0, 0, 0, e);
    }, u.fromCrossProduct = function (e, t) {
      return n(t) ? (t[0] = 0, t[1] = e.z, t[2] = -e.y, t[3] = -e.z, t[4] = 0, t[5] = e.x, t[6] = e.y, t[7] = -e.x, t[8] = 0, t) : new u(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0);
    }, u.fromRotationX = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = r, t[5] = i, t[6] = 0, t[7] = -i, t[8] = r, t) : new u(1, 0, 0, 0, r, -i, 0, i, r);
    }, u.fromRotationY = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = 0, t[2] = -i, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = i, t[7] = 0, t[8] = r, t) : new u(r, 0, i, 0, 1, 0, -i, 0, r);
    }, u.fromRotationZ = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = i, t[2] = 0, t[3] = -i, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new u(r, -i, 0, i, r, 0, 0, 0, 1);
    }, u.toArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]];
    }, u.getElementIndex = function (e, t) {
      return 3 * e + t;
    }, u.getColumn = function (e, t, r) {
      var n = 3 * t,
          i = e[n],
          a = e[n + 1],
          o = e[n + 2];
      return r.x = i, r.y = a, r.z = o, r;
    }, u.setColumn = function (e, t, r, n) {
      n = u.clone(e, n);
      var i = 3 * t;
      return n[i] = r.x, n[i + 1] = r.y, n[i + 2] = r.z, n;
    }, u.getRow = function (e, t, r) {
      var n = e[t],
          i = e[t + 3],
          a = e[t + 6];
      return r.x = n, r.y = i, r.z = a, r;
    }, u.setRow = function (e, t, r, n) {
      return n = u.clone(e, n), n[t] = r.x, n[t + 3] = r.y, n[t + 6] = r.z, n;
    };
    var h = new e();

    u.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], t[2], h)), r.y = e.magnitude(e.fromElements(t[3], t[4], t[5], h)), r.z = e.magnitude(e.fromElements(t[6], t[7], t[8], h)), r;
    };

    var d = new e();
    u.getMaximumScale = function (t) {
      return u.getScale(t, d), e.maximumComponent(d);
    }, u.multiply = function (e, t, r) {
      var n = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
          i = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
          a = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
          o = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
          s = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
          u = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
          c = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
          l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
          f = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
      return r[0] = n, r[1] = i, r[2] = a, r[3] = o, r[4] = s, r[5] = u, r[6] = c, r[7] = l, r[8] = f, r;
    }, u.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r;
    }, u.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r;
    }, u.multiplyByVector = function (e, t, r) {
      var n = t.x,
          i = t.y,
          a = t.z,
          o = e[0] * n + e[3] * i + e[6] * a,
          s = e[1] * n + e[4] * i + e[7] * a,
          u = e[2] * n + e[5] * i + e[8] * a;
      return r.x = o, r.y = s, r.z = u, r;
    }, u.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r;
    }, u.multiplyByScale = function (e, t, r) {
      return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.x, r[3] = e[3] * t.y, r[4] = e[4] * t.y, r[5] = e[5] * t.y, r[6] = e[6] * t.z, r[7] = e[7] * t.z, r[8] = e[8] * t.z, r;
    }, u.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t;
    }, u.transpose = function (e, t) {
      var r = e[0],
          n = e[3],
          i = e[6],
          a = e[1],
          o = e[4],
          s = e[7],
          u = e[2],
          c = e[5],
          l = e[8];
      return t[0] = r, t[1] = n, t[2] = i, t[3] = a, t[4] = o, t[5] = s, t[6] = u, t[7] = c, t[8] = l, t;
    };

    var E = [1, 0, 0],
        p = [2, 2, 1],
        m = new u(),
        _ = new u();

    return u.computeEigenDecomposition = function (e, t) {
      var r = s.EPSILON20,
          i = 0,
          a = 0;
      n(t) || (t = {});

      for (var o = t.unitary = u.clone(u.IDENTITY, t.unitary), h = t.diagonal = u.clone(e, t.diagonal), d = r * c(h); a < 10 && l(h) > d;) {
        f(h, m), u.transpose(m, _), u.multiply(h, m, h), u.multiply(_, h, h), u.multiply(o, m, o), ++i > 2 && (++a, i = 0);
      }

      return t;
    }, u.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t;
    }, u.determinant = function (e) {
      var t = e[0],
          r = e[3],
          n = e[6],
          i = e[1],
          a = e[4],
          o = e[7],
          s = e[2],
          u = e[5],
          c = e[8];
      return t * (a * c - u * o) + i * (u * n - r * c) + s * (r * o - a * n);
    }, u.inverse = function (e, t) {
      var r = e[0],
          n = e[1],
          i = e[2],
          a = e[3],
          o = e[4],
          s = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = u.determinant(e);
      t[0] = o * f - l * s, t[1] = l * i - n * f, t[2] = n * s - o * i, t[3] = c * s - a * f, t[4] = r * f - c * i, t[5] = a * i - r * s, t[6] = a * l - c * o, t[7] = c * n - r * l, t[8] = r * o - a * n;
      var d = 1 / h;
      return u.multiplyByScalar(t, d, t);
    }, u.equals = function (e, t) {
      return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
    }, u.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r;
    }, u.IDENTITY = o(new u(1, 0, 0, 0, 1, 0, 0, 0, 1)), u.ZERO = o(new u(0, 0, 0, 0, 0, 0, 0, 0, 0)), u.COLUMN0ROW0 = 0, u.COLUMN0ROW1 = 1, u.COLUMN0ROW2 = 2, u.COLUMN1ROW0 = 3, u.COLUMN1ROW1 = 4, u.COLUMN1ROW2 = 5, u.COLUMN2ROW0 = 6, u.COLUMN2ROW1 = 7, u.COLUMN2ROW2 = 8, i(u.prototype, {
      length: {
        get: function get() {
          return u.packedLength;
        }
      }
    }), u.prototype.clone = function (e) {
      return u.clone(this, e);
    }, u.prototype.equals = function (e) {
      return u.equals(this, e);
    }, u.equalsArray = function (e, t, r) {
      return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8];
    }, u.prototype.equalsEpsilon = function (e, t) {
      return u.equalsEpsilon(this, e, t);
    }, u.prototype.toString = function () {
      return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")";
    }, u;
  }), define("Core/Cartesian4", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, a) {
    "use strict";

    function o(e, r, n, i) {
      this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0), this.w = t(i, 0);
    }

    o.fromElements = function (e, t, n, i, a) {
      return r(a) ? (a.x = e, a.y = t, a.z = n, a.w = i, a) : new o(e, t, n, i);
    }, o.fromColor = function (e, t) {
      return r(t) ? (t.x = e.red, t.y = e.green, t.z = e.blue, t.w = e.alpha, t) : new o(e.red, e.green, e.blue, e.alpha);
    }, o.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new o(e.x, e.y, e.z, e.w);
    }, o.packedLength = 4, o.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n++] = e.y, r[n++] = e.z, r[n] = e.w, r;
    }, o.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new o()), i.x = e[n++], i.y = e[n++], i.z = e[n++], i.w = e[n], i;
    }, o.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 4 * n : t = new Array(4 * n);

      for (var i = 0; i < n; ++i) {
        o.pack(e[i], t, 4 * i);
      }

      return t;
    }, o.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 4 : t = new Array(n / 4);

      for (var i = 0; i < n; i += 4) {
        var a = i / 4;
        t[a] = o.unpack(e, i, t[a]);
      }

      return t;
    }, o.fromArray = o.unpack, o.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z, e.w);
    }, o.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z, e.w);
    }, o.minimumByComponent = function (e, t, r) {
      return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r.z = Math.min(e.z, t.z), r.w = Math.min(e.w, t.w), r;
    }, o.maximumByComponent = function (e, t, r) {
      return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r.z = Math.max(e.z, t.z), r.w = Math.max(e.w, t.w), r;
    }, o.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }, o.magnitude = function (e) {
      return Math.sqrt(o.magnitudeSquared(e));
    };
    var s = new o();
    o.distance = function (e, t) {
      return o.subtract(e, t, s), o.magnitude(s);
    }, o.distanceSquared = function (e, t) {
      return o.subtract(e, t, s), o.magnitudeSquared(s);
    }, o.normalize = function (e, t) {
      var r = o.magnitude(e);
      return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t.w = e.w / r, t;
    }, o.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }, o.multiplyComponents = function (e, t, r) {
      return r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z, r.w = e.w * t.w, r;
    }, o.divideComponents = function (e, t, r) {
      return r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z, r.w = e.w / t.w, r;
    }, o.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r.w = e.w + t.w, r;
    }, o.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r.w = e.w - t.w, r;
    }, o.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
    }, o.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
    }, o.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
    }, o.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t.w = Math.abs(e.w), t;
    };
    var u = new o();

    o.lerp = function (e, t, r, n) {
      return o.multiplyByScalar(t, r, u), n = o.multiplyByScalar(e, 1 - r, n), o.add(u, n, n);
    };

    var c = new o();
    o.mostOrthogonalAxis = function (e, t) {
      var r = o.normalize(e, c);
      return o.abs(r, r), t = r.x <= r.y ? r.x <= r.z ? r.x <= r.w ? o.clone(o.UNIT_X, t) : o.clone(o.UNIT_W, t) : r.z <= r.w ? o.clone(o.UNIT_Z, t) : o.clone(o.UNIT_W, t) : r.y <= r.z ? r.y <= r.w ? o.clone(o.UNIT_Y, t) : o.clone(o.UNIT_W, t) : r.z <= r.w ? o.clone(o.UNIT_Z, t) : o.clone(o.UNIT_W, t);
    }, o.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, o.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2] && e.w === t[r + 3];
    }, o.equalsEpsilon = function (e, t, n, i) {
      return e === t || r(e) && r(t) && a.equalsEpsilon(e.x, t.x, n, i) && a.equalsEpsilon(e.y, t.y, n, i) && a.equalsEpsilon(e.z, t.z, n, i) && a.equalsEpsilon(e.w, t.w, n, i);
    }, o.ZERO = i(new o(0, 0, 0, 0)), o.UNIT_X = i(new o(1, 0, 0, 0)), o.UNIT_Y = i(new o(0, 1, 0, 0)), o.UNIT_Z = i(new o(0, 0, 1, 0)), o.UNIT_W = i(new o(0, 0, 0, 1)), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, r) {
      return o.equalsEpsilon(this, e, t, r);
    }, o.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    };
    var l = new Float32Array(1);
    return o.packFloat = function (e, t) {
      if (r(t) || (t = new o()), l[0] = e, 0 === (e = l[0])) return o.clone(o.ZERO, t);
      var n,
          i = e < 0 ? 1 : 0;
      isFinite(e) ? (e = Math.abs(e), n = Math.floor(a.logBase(e, 10)) + 1, e /= Math.pow(10, n)) : (e = .1, n = 38);
      var s = 256 * e;
      return t.x = Math.floor(s), s = 256 * (s - t.x), t.y = Math.floor(s), s = 256 * (s - t.y), t.z = Math.floor(s), t.w = 2 * (n + 38) + i, t;
    }, o.unpackFloat = function (e) {
      var t = e.w / 2,
          r = Math.floor(t),
          n = 2 * (t - r);
      if (r -= 38, n = 2 * n - 1, n = -n, r >= 38) return n < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      var i = n * e.x * (1 / 256);
      return i += n * e.y * (1 / 65536), (i += n * e.z * (1 / 16777216)) * Math.pow(10, r);
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
  }), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (e, t, r, n, i, a, o, s, u, c) {
    "use strict";

    function l(e, t, r, i, a, o, s, u, c, l, f, h, d, E, p, m) {
      this[0] = n(e, 0), this[1] = n(a, 0), this[2] = n(c, 0), this[3] = n(d, 0), this[4] = n(t, 0), this[5] = n(o, 0), this[6] = n(l, 0), this[7] = n(E, 0), this[8] = n(r, 0), this[9] = n(s, 0), this[10] = n(f, 0), this[11] = n(p, 0), this[12] = n(i, 0), this[13] = n(u, 0), this[14] = n(h, 0), this[15] = n(m, 0);
    }

    l.packedLength = 16, l.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t[r++] = e[4], t[r++] = e[5], t[r++] = e[6], t[r++] = e[7], t[r++] = e[8], t[r++] = e[9], t[r++] = e[10], t[r++] = e[11], t[r++] = e[12], t[r++] = e[13], t[r++] = e[14], t[r] = e[15], t;
    }, l.unpack = function (e, t, r) {
      return t = n(t, 0), i(r) || (r = new l()), r[0] = e[t++], r[1] = e[t++], r[2] = e[t++], r[3] = e[t++], r[4] = e[t++], r[5] = e[t++], r[6] = e[t++], r[7] = e[t++], r[8] = e[t++], r[9] = e[t++], r[10] = e[t++], r[11] = e[t++], r[12] = e[t++], r[13] = e[t++], r[14] = e[t++], r[15] = e[t], r;
    }, l.clone = function (e, t) {
      if (i(e)) return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : new l(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]);
    }, l.fromArray = l.unpack, l.fromColumnMajorArray = function (e, t) {
      return l.clone(e, t);
    }, l.fromRowMajorArray = function (e, t) {
      return i(t) ? (t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t) : new l(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
    }, l.fromRotationTranslation = function (t, r, a) {
      return r = n(r, e.ZERO), i(a) ? (a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = 0, a[4] = t[3], a[5] = t[4], a[6] = t[5], a[7] = 0, a[8] = t[6], a[9] = t[7], a[10] = t[8], a[11] = 0, a[12] = r.x, a[13] = r.y, a[14] = r.z, a[15] = 1, a) : new l(t[0], t[3], t[6], r.x, t[1], t[4], t[7], r.y, t[2], t[5], t[8], r.z, 0, 0, 0, 1);
    }, l.fromTranslationQuaternionRotationScale = function (e, t, r, n) {
      i(n) || (n = new l());

      var a = r.x,
          o = r.y,
          s = r.z,
          u = t.x * t.x,
          c = t.x * t.y,
          f = t.x * t.z,
          h = t.x * t.w,
          d = t.y * t.y,
          E = t.y * t.z,
          p = t.y * t.w,
          m = t.z * t.z,
          _ = t.z * t.w,
          y = t.w * t.w,
          R = u - d - m + y,
          T = 2 * (c - _),
          A = 2 * (f + p),
          S = 2 * (c + _),
          g = -u + d - m + y,
          C = 2 * (E - h),
          v = 2 * (f - p),
          I = 2 * (E + h),
          O = -u - d + m + y;

      return n[0] = R * a, n[1] = S * a, n[2] = v * a, n[3] = 0, n[4] = T * o, n[5] = g * o, n[6] = I * o, n[7] = 0, n[8] = A * s, n[9] = C * s, n[10] = O * s, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, n;
    }, l.fromTranslationRotationScale = function (e, t) {
      return l.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t);
    }, l.fromTranslation = function (e, t) {
      return l.fromRotationTranslation(u.IDENTITY, e, t);
    }, l.fromScale = function (e, t) {
      return i(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e.y, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e.z, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1);
    }, l.fromUniformScale = function (e, t) {
      return i(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
    };
    var f = new e(),
        h = new e(),
        d = new e();
    l.fromCamera = function (t, r) {
      var n = t.position,
          a = t.direction,
          o = t.up;
      e.normalize(a, f), e.normalize(e.cross(f, o, h), h), e.normalize(e.cross(h, f, d), d);
      var s = h.x,
          u = h.y,
          c = h.z,
          E = f.x,
          p = f.y,
          m = f.z,
          _ = d.x,
          y = d.y,
          R = d.z,
          T = n.x,
          A = n.y,
          S = n.z,
          g = s * -T + u * -A + c * -S,
          C = _ * -T + y * -A + R * -S,
          v = E * T + p * A + m * S;
      return i(r) ? (r[0] = s, r[1] = _, r[2] = -E, r[3] = 0, r[4] = u, r[5] = y, r[6] = -p, r[7] = 0, r[8] = c, r[9] = R, r[10] = -m, r[11] = 0, r[12] = g, r[13] = C, r[14] = v, r[15] = 1, r) : new l(s, u, c, g, _, y, R, C, -E, -p, -m, v, 0, 0, 0, 1);
    }, l.computePerspectiveFieldOfView = function (e, t, r, n, i) {
      var a = Math.tan(.5 * e),
          o = 1 / a,
          s = o / t,
          u = (n + r) / (r - n),
          c = 2 * n * r / (r - n);
      return i[0] = s, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = o, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = u, i[11] = -1, i[12] = 0, i[13] = 0, i[14] = c, i[15] = 0, i;
    }, l.computeOrthographicOffCenter = function (e, t, r, n, i, a, o) {
      var s = 1 / (t - e),
          u = 1 / (n - r),
          c = 1 / (a - i),
          l = -(t + e) * s,
          f = -(n + r) * u,
          h = -(a + i) * c;
      return s *= 2, u *= 2, c *= -2, o[0] = s, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = u, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = c, o[11] = 0, o[12] = l, o[13] = f, o[14] = h, o[15] = 1, o;
    }, l.computePerspectiveOffCenter = function (e, t, r, n, i, a, o) {
      var s = 2 * i / (t - e),
          u = 2 * i / (n - r),
          c = (t + e) / (t - e),
          l = (n + r) / (n - r),
          f = -(a + i) / (a - i),
          h = -2 * a * i / (a - i);
      return o[0] = s, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = u, o[6] = 0, o[7] = 0, o[8] = c, o[9] = l, o[10] = f, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = h, o[15] = 0, o;
    }, l.computeInfinitePerspectiveOffCenter = function (e, t, r, n, i, a) {
      var o = 2 * i / (t - e),
          s = 2 * i / (n - r),
          u = (t + e) / (t - e),
          c = (n + r) / (n - r),
          l = -2 * i;
      return a[0] = o, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = u, a[9] = c, a[10] = -1, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = l, a[15] = 0, a;
    }, l.computeViewportTransformation = function (e, t, r, i) {
      e = n(e, n.EMPTY_OBJECT);
      var a = n(e.x, 0),
          o = n(e.y, 0),
          s = n(e.width, 0),
          u = n(e.height, 0);
      t = n(t, 0), r = n(r, 1);

      var c = .5 * s,
          l = .5 * u,
          f = .5 * (r - t),
          h = c,
          d = l,
          E = f,
          p = a + c,
          m = o + l,
          _ = t + f;

      return i[0] = h, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = d, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = E, i[11] = 0, i[12] = p, i[13] = m, i[14] = _, i[15] = 1, i;
    }, l.computeView = function (t, r, n, i, a) {
      return a[0] = i.x, a[1] = n.x, a[2] = -r.x, a[3] = 0, a[4] = i.y, a[5] = n.y, a[6] = -r.y, a[7] = 0, a[8] = i.z, a[9] = n.z, a[10] = -r.z, a[11] = 0, a[12] = -e.dot(i, t), a[13] = -e.dot(n, t), a[14] = e.dot(r, t), a[15] = 1, a;
    }, l.toArray = function (e, t) {
      return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]];
    }, l.getElementIndex = function (e, t) {
      return 4 * e + t;
    }, l.getColumn = function (e, t, r) {
      var n = 4 * t,
          i = e[n],
          a = e[n + 1],
          o = e[n + 2],
          s = e[n + 3];
      return r.x = i, r.y = a, r.z = o, r.w = s, r;
    }, l.setColumn = function (e, t, r, n) {
      n = l.clone(e, n);
      var i = 4 * t;
      return n[i] = r.x, n[i + 1] = r.y, n[i + 2] = r.z, n[i + 3] = r.w, n;
    }, l.setTranslation = function (e, t, r) {
      return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = e[15], r;
    };
    var E = new e();
    l.setScale = function (t, r, n) {
      var i = l.getScale(t, E),
          a = e.divideComponents(r, i, E);
      return l.multiplyByScale(t, a, n);
    }, l.getRow = function (e, t, r) {
      var n = e[t],
          i = e[t + 4],
          a = e[t + 8],
          o = e[t + 12];
      return r.x = n, r.y = i, r.z = a, r.w = o, r;
    }, l.setRow = function (e, t, r, n) {
      return n = l.clone(e, n), n[t] = r.x, n[t + 4] = r.y, n[t + 8] = r.z, n[t + 12] = r.w, n;
    };
    var p = new e();

    l.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], t[2], p)), r.y = e.magnitude(e.fromElements(t[4], t[5], t[6], p)), r.z = e.magnitude(e.fromElements(t[8], t[9], t[10], p)), r;
    };

    var m = new e();
    l.getMaximumScale = function (t) {
      return l.getScale(t, m), e.maximumComponent(m);
    }, l.multiply = function (e, t, r) {
      var n = e[0],
          i = e[1],
          a = e[2],
          o = e[3],
          s = e[4],
          u = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = e[9],
          d = e[10],
          E = e[11],
          p = e[12],
          m = e[13],
          _ = e[14],
          y = e[15],
          R = t[0],
          T = t[1],
          A = t[2],
          S = t[3],
          g = t[4],
          C = t[5],
          v = t[6],
          I = t[7],
          O = t[8],
          N = t[9],
          M = t[10],
          w = t[11],
          P = t[12],
          D = t[13],
          U = t[14],
          F = t[15],
          x = n * R + s * T + f * A + p * S,
          L = i * R + u * T + h * A + m * S,
          B = a * R + c * T + d * A + _ * S,
          b = o * R + l * T + E * A + y * S,
          q = n * g + s * C + f * v + p * I,
          G = i * g + u * C + h * v + m * I,
          z = a * g + c * C + d * v + _ * I,
          V = o * g + l * C + E * v + y * I,
          W = n * O + s * N + f * M + p * w,
          H = i * O + u * N + h * M + m * w,
          X = a * O + c * N + d * M + _ * w,
          Y = o * O + l * N + E * M + y * w,
          k = n * P + s * D + f * U + p * F,
          j = i * P + u * D + h * U + m * F,
          K = a * P + c * D + d * U + _ * F,
          Z = o * P + l * D + E * U + y * F;
      return r[0] = x, r[1] = L, r[2] = B, r[3] = b, r[4] = q, r[5] = G, r[6] = z, r[7] = V, r[8] = W, r[9] = H, r[10] = X, r[11] = Y, r[12] = k, r[13] = j, r[14] = K, r[15] = Z, r;
    }, l.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r[9] = e[9] + t[9], r[10] = e[10] + t[10], r[11] = e[11] + t[11], r[12] = e[12] + t[12], r[13] = e[13] + t[13], r[14] = e[14] + t[14], r[15] = e[15] + t[15], r;
    }, l.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r[9] = e[9] - t[9], r[10] = e[10] - t[10], r[11] = e[11] - t[11], r[12] = e[12] - t[12], r[13] = e[13] - t[13], r[14] = e[14] - t[14], r[15] = e[15] - t[15], r;
    }, l.multiplyTransformation = function (e, t, r) {
      var n = e[0],
          i = e[1],
          a = e[2],
          o = e[4],
          s = e[5],
          u = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = e[12],
          d = e[13],
          E = e[14],
          p = t[0],
          m = t[1],
          _ = t[2],
          y = t[4],
          R = t[5],
          T = t[6],
          A = t[8],
          S = t[9],
          g = t[10],
          C = t[12],
          v = t[13],
          I = t[14],
          O = n * p + o * m + c * _,
          N = i * p + s * m + l * _,
          M = a * p + u * m + f * _,
          w = n * y + o * R + c * T,
          P = i * y + s * R + l * T,
          D = a * y + u * R + f * T,
          U = n * A + o * S + c * g,
          F = i * A + s * S + l * g,
          x = a * A + u * S + f * g,
          L = n * C + o * v + c * I + h,
          B = i * C + s * v + l * I + d,
          b = a * C + u * v + f * I + E;
      return r[0] = O, r[1] = N, r[2] = M, r[3] = 0, r[4] = w, r[5] = P, r[6] = D, r[7] = 0, r[8] = U, r[9] = F, r[10] = x, r[11] = 0, r[12] = L, r[13] = B, r[14] = b, r[15] = 1, r;
    }, l.multiplyByMatrix3 = function (e, t, r) {
      var n = e[0],
          i = e[1],
          a = e[2],
          o = e[4],
          s = e[5],
          u = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = t[0],
          d = t[1],
          E = t[2],
          p = t[3],
          m = t[4],
          _ = t[5],
          y = t[6],
          R = t[7],
          T = t[8],
          A = n * h + o * d + c * E,
          S = i * h + s * d + l * E,
          g = a * h + u * d + f * E,
          C = n * p + o * m + c * _,
          v = i * p + s * m + l * _,
          I = a * p + u * m + f * _,
          O = n * y + o * R + c * T,
          N = i * y + s * R + l * T,
          M = a * y + u * R + f * T;
      return r[0] = A, r[1] = S, r[2] = g, r[3] = 0, r[4] = C, r[5] = v, r[6] = I, r[7] = 0, r[8] = O, r[9] = N, r[10] = M, r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15], r;
    }, l.multiplyByTranslation = function (e, t, r) {
      var n = t.x,
          i = t.y,
          a = t.z,
          o = n * e[0] + i * e[4] + a * e[8] + e[12],
          s = n * e[1] + i * e[5] + a * e[9] + e[13],
          u = n * e[2] + i * e[6] + a * e[10] + e[14];
      return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = o, r[13] = s, r[14] = u, r[15] = e[15], r;
    };

    var _ = new e();

    l.multiplyByUniformScale = function (e, t, r) {
      return _.x = t, _.y = t, _.z = t, l.multiplyByScale(e, _, r);
    }, l.multiplyByScale = function (e, t, r) {
      var n = t.x,
          i = t.y,
          a = t.z;
      return 1 === n && 1 === i && 1 === a ? l.clone(e, r) : (r[0] = n * e[0], r[1] = n * e[1], r[2] = n * e[2], r[3] = 0, r[4] = i * e[4], r[5] = i * e[5], r[6] = i * e[6], r[7] = 0, r[8] = a * e[8], r[9] = a * e[9], r[10] = a * e[10], r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = 1, r);
    }, l.multiplyByVector = function (e, t, r) {
      var n = t.x,
          i = t.y,
          a = t.z,
          o = t.w,
          s = e[0] * n + e[4] * i + e[8] * a + e[12] * o,
          u = e[1] * n + e[5] * i + e[9] * a + e[13] * o,
          c = e[2] * n + e[6] * i + e[10] * a + e[14] * o,
          l = e[3] * n + e[7] * i + e[11] * a + e[15] * o;
      return r.x = s, r.y = u, r.z = c, r.w = l, r;
    }, l.multiplyByPointAsVector = function (e, t, r) {
      var n = t.x,
          i = t.y,
          a = t.z,
          o = e[0] * n + e[4] * i + e[8] * a,
          s = e[1] * n + e[5] * i + e[9] * a,
          u = e[2] * n + e[6] * i + e[10] * a;
      return r.x = o, r.y = s, r.z = u, r;
    }, l.multiplyByPoint = function (e, t, r) {
      var n = t.x,
          i = t.y,
          a = t.z,
          o = e[0] * n + e[4] * i + e[8] * a + e[12],
          s = e[1] * n + e[5] * i + e[9] * a + e[13],
          u = e[2] * n + e[6] * i + e[10] * a + e[14];
      return r.x = o, r.y = s, r.z = u, r;
    }, l.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r[9] = e[9] * t, r[10] = e[10] * t, r[11] = e[11] * t, r[12] = e[12] * t, r[13] = e[13] * t, r[14] = e[14] * t, r[15] = e[15] * t, r;
    }, l.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t;
    }, l.transpose = function (e, t) {
      var r = e[1],
          n = e[2],
          i = e[3],
          a = e[6],
          o = e[7],
          s = e[11];
      return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = n, t[9] = a, t[10] = e[10], t[11] = e[14], t[12] = i, t[13] = o, t[14] = s, t[15] = e[15], t;
    }, l.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t[9] = Math.abs(e[9]), t[10] = Math.abs(e[10]), t[11] = Math.abs(e[11]), t[12] = Math.abs(e[12]), t[13] = Math.abs(e[13]), t[14] = Math.abs(e[14]), t[15] = Math.abs(e[15]), t;
    }, l.equals = function (e, t) {
      return e === t || i(e) && i(t) && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[3] === t[3] && e[7] === t[7] && e[11] === t[11] && e[15] === t[15];
    }, l.equalsEpsilon = function (e, t, r) {
      return e === t || i(e) && i(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r && Math.abs(e[9] - t[9]) <= r && Math.abs(e[10] - t[10]) <= r && Math.abs(e[11] - t[11]) <= r && Math.abs(e[12] - t[12]) <= r && Math.abs(e[13] - t[13]) <= r && Math.abs(e[14] - t[14]) <= r && Math.abs(e[15] - t[15]) <= r;
    }, l.getTranslation = function (e, t) {
      return t.x = e[12], t.y = e[13], t.z = e[14], t;
    }, l.getRotation = function (e, t) {
      return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t;
    };
    var y = new u(),
        R = new u(),
        T = new t(),
        A = new t(0, 0, 0, 1);
    return l.inverse = function (e, r) {
      var n = e[0],
          i = e[4],
          a = e[8],
          o = e[12],
          f = e[1],
          h = e[5],
          d = e[9],
          E = e[13],
          p = e[2],
          m = e[6],
          _ = e[10],
          S = e[14],
          g = e[3],
          C = e[7],
          v = e[11],
          I = e[15],
          O = _ * I,
          N = S * v,
          M = m * I,
          w = S * C,
          P = m * v,
          D = _ * C,
          U = p * I,
          F = S * g,
          x = p * v,
          L = _ * g,
          B = p * C,
          b = m * g,
          q = O * h + w * d + P * E - (N * h + M * d + D * E),
          G = N * f + U * d + L * E - (O * f + F * d + x * E),
          z = M * f + F * h + B * E - (w * f + U * h + b * E),
          V = D * f + x * h + b * d - (P * f + L * h + B * d),
          W = N * i + M * a + D * o - (O * i + w * a + P * o),
          H = O * n + F * a + x * o - (N * n + U * a + L * o),
          X = w * n + U * i + b * o - (M * n + F * i + B * o),
          Y = P * n + L * i + B * a - (D * n + x * i + b * a);
      O = a * E, N = o * d, M = i * E, w = o * h, P = i * d, D = a * h, U = n * E, F = o * f, x = n * d, L = a * f, B = n * h, b = i * f;
      var k = O * C + w * v + P * I - (N * C + M * v + D * I),
          j = N * g + U * v + L * I - (O * g + F * v + x * I),
          K = M * g + F * C + B * I - (w * g + U * C + b * I),
          Z = D * g + x * C + b * v - (P * g + L * C + B * v),
          J = M * _ + D * S + N * m - (P * S + O * m + w * _),
          Q = x * S + O * p + F * _ - (U * _ + L * S + N * p),
          $ = U * m + b * S + w * p - (B * S + M * p + F * m),
          ee = B * _ + P * p + L * m - (x * m + b * _ + D * p),
          te = n * q + i * G + a * z + o * V;

      if (Math.abs(te) < s.EPSILON21) {
        if (u.equalsEpsilon(l.getRotation(e, y), R, s.EPSILON7) && t.equals(l.getRow(e, 3, T), A)) return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 0, r[11] = 0, r[12] = -e[12], r[13] = -e[13], r[14] = -e[14], r[15] = 1, r;
        throw new c("matrix is not invertible because its determinate is zero.");
      }

      return te = 1 / te, r[0] = q * te, r[1] = G * te, r[2] = z * te, r[3] = V * te, r[4] = W * te, r[5] = H * te, r[6] = X * te, r[7] = Y * te, r[8] = k * te, r[9] = j * te, r[10] = K * te, r[11] = Z * te, r[12] = J * te, r[13] = Q * te, r[14] = $ * te, r[15] = ee * te, r;
    }, l.inverseTransformation = function (e, t) {
      var r = e[0],
          n = e[1],
          i = e[2],
          a = e[4],
          o = e[5],
          s = e[6],
          u = e[8],
          c = e[9],
          l = e[10],
          f = e[12],
          h = e[13],
          d = e[14],
          E = -r * f - n * h - i * d,
          p = -a * f - o * h - s * d,
          m = -u * f - c * h - l * d;
      return t[0] = r, t[1] = a, t[2] = u, t[3] = 0, t[4] = n, t[5] = o, t[6] = c, t[7] = 0, t[8] = i, t[9] = s, t[10] = l, t[11] = 0, t[12] = E, t[13] = p, t[14] = m, t[15] = 1, t;
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
    }, l.equalsArray = function (e, t, r) {
      return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8] && e[9] === t[r + 9] && e[10] === t[r + 10] && e[11] === t[r + 11] && e[12] === t[r + 12] && e[13] === t[r + 13] && e[14] === t[r + 14] && e[15] === t[r + 15];
    }, l.prototype.equalsEpsilon = function (e, t) {
      return l.equalsEpsilon(this, e, t);
    }, l.prototype.toString = function () {
      return "(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")";
    }, l;
  }), define("Core/Rectangle", ["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function (e, t, r, n, i, a, o, s) {
    "use strict";

    function u(e, t, n, i) {
      this.west = r(e, 0), this.south = r(t, 0), this.east = r(n, 0), this.north = r(i, 0);
    }

    i(u.prototype, {
      width: {
        get: function get() {
          return u.computeWidth(this);
        }
      },
      height: {
        get: function get() {
          return u.computeHeight(this);
        }
      }
    }), u.packedLength = 4, u.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e.west, t[n++] = e.south, t[n++] = e.east, t[n] = e.north, t;
    }, u.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new u()), i.west = e[t++], i.south = e[t++], i.east = e[t++], i.north = e[t], i;
    }, u.computeWidth = function (e) {
      var t = e.east,
          r = e.west;
      return t < r && (t += s.TWO_PI), t - r;
    }, u.computeHeight = function (e) {
      return e.north - e.south;
    }, u.fromDegrees = function (e, t, i, a, o) {
      return e = s.toRadians(r(e, 0)), t = s.toRadians(r(t, 0)), i = s.toRadians(r(i, 0)), a = s.toRadians(r(a, 0)), n(o) ? (o.west = e, o.south = t, o.east = i, o.north = a, o) : new u(e, t, i, a);
    }, u.fromRadians = function (e, t, i, a, o) {
      return n(o) ? (o.west = r(e, 0), o.south = r(t, 0), o.east = r(i, 0), o.north = r(a, 0), o) : new u(e, t, i, a);
    }, u.fromCartographicArray = function (e, t) {
      for (var r = Number.MAX_VALUE, i = -Number.MAX_VALUE, a = Number.MAX_VALUE, o = -Number.MAX_VALUE, c = Number.MAX_VALUE, l = -Number.MAX_VALUE, f = 0, h = e.length; f < h; f++) {
        var d = e[f];
        r = Math.min(r, d.longitude), i = Math.max(i, d.longitude), c = Math.min(c, d.latitude), l = Math.max(l, d.latitude);
        var E = d.longitude >= 0 ? d.longitude : d.longitude + s.TWO_PI;
        a = Math.min(a, E), o = Math.max(o, E);
      }

      return i - r > o - a && (r = a, i = o, i > s.PI && (i -= s.TWO_PI), r > s.PI && (r -= s.TWO_PI)), n(t) ? (t.west = r, t.south = c, t.east = i, t.north = l, t) : new u(r, c, i, l);
    }, u.fromCartesianArray = function (e, t, i) {
      t = r(t, a.WGS84);

      for (var o = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = Number.MAX_VALUE, f = -Number.MAX_VALUE, h = Number.MAX_VALUE, d = -Number.MAX_VALUE, E = 0, p = e.length; E < p; E++) {
        var m = t.cartesianToCartographic(e[E]);
        o = Math.min(o, m.longitude), c = Math.max(c, m.longitude), h = Math.min(h, m.latitude), d = Math.max(d, m.latitude);

        var _ = m.longitude >= 0 ? m.longitude : m.longitude + s.TWO_PI;

        l = Math.min(l, _), f = Math.max(f, _);
      }

      return c - o > f - l && (o = l, c = f, c > s.PI && (c -= s.TWO_PI), o > s.PI && (o -= s.TWO_PI)), n(i) ? (i.west = o, i.south = h, i.east = c, i.north = d, i) : new u(o, h, c, d);
    }, u.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.west = e.west, t.south = e.south, t.east = e.east, t.north = e.north, t) : new u(e.west, e.south, e.east, e.north);
    }, u.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.west - t.west) <= r && Math.abs(e.south - t.south) <= r && Math.abs(e.east - t.east) <= r && Math.abs(e.north - t.north) <= r;
    }, u.prototype.clone = function (e) {
      return u.clone(this, e);
    }, u.prototype.equals = function (e) {
      return u.equals(this, e);
    }, u.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north;
    }, u.prototype.equalsEpsilon = function (e, t) {
      return u.equalsEpsilon(this, e, t);
    }, u.validate = function (e) {}, u.southwest = function (t, r) {
      return n(r) ? (r.longitude = t.west, r.latitude = t.south, r.height = 0, r) : new e(t.west, t.south);
    }, u.northwest = function (t, r) {
      return n(r) ? (r.longitude = t.west, r.latitude = t.north, r.height = 0, r) : new e(t.west, t.north);
    }, u.northeast = function (t, r) {
      return n(r) ? (r.longitude = t.east, r.latitude = t.north, r.height = 0, r) : new e(t.east, t.north);
    }, u.southeast = function (t, r) {
      return n(r) ? (r.longitude = t.east, r.latitude = t.south, r.height = 0, r) : new e(t.east, t.south);
    }, u.center = function (t, r) {
      var i = t.east,
          a = t.west;
      i < a && (i += s.TWO_PI);
      var o = s.negativePiToPi(.5 * (a + i)),
          u = .5 * (t.south + t.north);
      return n(r) ? (r.longitude = o, r.latitude = u, r.height = 0, r) : new e(o, u);
    }, u.intersection = function (e, t, r) {
      var i = e.east,
          a = e.west,
          o = t.east,
          c = t.west;
      i < a && o > 0 ? i += s.TWO_PI : o < c && i > 0 && (o += s.TWO_PI), i < a && c < 0 ? c += s.TWO_PI : o < c && a < 0 && (a += s.TWO_PI);
      var l = s.negativePiToPi(Math.max(a, c)),
          f = s.negativePiToPi(Math.min(i, o));

      if (!((e.west < e.east || t.west < t.east) && f <= l)) {
        var h = Math.max(e.south, t.south),
            d = Math.min(e.north, t.north);
        if (!(h >= d)) return n(r) ? (r.west = l, r.south = h, r.east = f, r.north = d, r) : new u(l, h, f, d);
      }
    }, u.simpleIntersection = function (e, t, r) {
      var i = Math.max(e.west, t.west),
          a = Math.max(e.south, t.south),
          o = Math.min(e.east, t.east),
          s = Math.min(e.north, t.north);
      if (!(a >= s || i >= o)) return n(r) ? (r.west = i, r.south = a, r.east = o, r.north = s, r) : new u(i, a, o, s);
    }, u.union = function (e, t, r) {
      n(r) || (r = new u());
      var i = e.east,
          a = e.west,
          o = t.east,
          c = t.west;
      i < a && o > 0 ? i += s.TWO_PI : o < c && i > 0 && (o += s.TWO_PI), i < a && c < 0 ? c += s.TWO_PI : o < c && a < 0 && (a += s.TWO_PI);
      var l = s.convertLongitudeRange(Math.min(a, c)),
          f = s.convertLongitudeRange(Math.max(i, o));
      return r.west = l, r.south = Math.min(e.south, t.south), r.east = f, r.north = Math.max(e.north, t.north), r;
    }, u.expand = function (e, t, r) {
      return n(r) || (r = new u()), r.west = Math.min(e.west, t.longitude), r.south = Math.min(e.south, t.latitude), r.east = Math.max(e.east, t.longitude), r.north = Math.max(e.north, t.latitude), r;
    }, u.contains = function (e, t) {
      var r = t.longitude,
          n = t.latitude,
          i = e.west,
          a = e.east;
      return a < i && (a += s.TWO_PI, r < 0 && (r += s.TWO_PI)), (r > i || s.equalsEpsilon(r, i, s.EPSILON14)) && (r < a || s.equalsEpsilon(r, a, s.EPSILON14)) && n >= e.south && n <= e.north;
    };
    var c = new e();
    return u.subsample = function (e, t, i, o) {
      t = r(t, a.WGS84), i = r(i, 0), n(o) || (o = []);
      var l = 0,
          f = e.north,
          h = e.south,
          d = e.east,
          E = e.west,
          p = c;
      p.height = i, p.longitude = E, p.latitude = f, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.longitude = d, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.latitude = h, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.longitude = E, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.latitude = f < 0 ? f : h > 0 ? h : 0;

      for (var m = 1; m < 8; ++m) {
        p.longitude = -Math.PI + m * s.PI_OVER_TWO, u.contains(e, p) && (o[l] = t.cartographicToCartesian(p, o[l]), l++);
      }

      return 0 === p.latitude && (p.longitude = E, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.longitude = d, o[l] = t.cartographicToCartesian(p, o[l]), l++), o.length = l, o;
    }, u.MAX_VALUE = o(new u(-Math.PI, -s.PI_OVER_TWO, Math.PI, s.PI_OVER_TWO)), u;
  }), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (e, t, r, n, i, a, o, s, u, c, l, f, h) {
    "use strict";

    function d(t, r) {
      this.center = e.clone(n(t, e.ZERO)), this.radius = n(r, 0);
    }

    var E = new e(),
        p = new e(),
        m = new e(),
        _ = new e(),
        y = new e(),
        R = new e(),
        T = new e(),
        A = new e(),
        S = new e(),
        g = new e(),
        C = new e(),
        v = new e(),
        I = 4 / 3 * c.PI;

    d.fromPoints = function (t, r) {
      if (i(r) || (r = new d()), !i(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var n,
          a = e.clone(t[0], T),
          o = e.clone(a, E),
          s = e.clone(a, p),
          u = e.clone(a, m),
          c = e.clone(a, _),
          l = e.clone(a, y),
          f = e.clone(a, R),
          h = t.length;

      for (n = 1; n < h; n++) {
        e.clone(t[n], a);
        var I = a.x,
            O = a.y,
            N = a.z;
        I < o.x && e.clone(a, o), I > c.x && e.clone(a, c), O < s.y && e.clone(a, s), O > l.y && e.clone(a, l), N < u.z && e.clone(a, u), N > f.z && e.clone(a, f);
      }

      var M = e.magnitudeSquared(e.subtract(c, o, A)),
          w = e.magnitudeSquared(e.subtract(l, s, A)),
          P = e.magnitudeSquared(e.subtract(f, u, A)),
          D = o,
          U = c,
          F = M;
      w > F && (F = w, D = s, U = l), P > F && (F = P, D = u, U = f);
      var x = S;
      x.x = .5 * (D.x + U.x), x.y = .5 * (D.y + U.y), x.z = .5 * (D.z + U.z);
      var L = e.magnitudeSquared(e.subtract(U, x, A)),
          B = Math.sqrt(L),
          b = g;
      b.x = o.x, b.y = s.y, b.z = u.z;
      var q = C;
      q.x = c.x, q.y = l.y, q.z = f.z;
      var G = e.midpoint(b, q, v),
          z = 0;

      for (n = 0; n < h; n++) {
        e.clone(t[n], a);
        var V = e.magnitude(e.subtract(a, G, A));
        V > z && (z = V);
        var W = e.magnitudeSquared(e.subtract(a, x, A));

        if (W > L) {
          var H = Math.sqrt(W);
          B = .5 * (B + H), L = B * B;
          var X = H - B;
          x.x = (B * x.x + X * a.x) / H, x.y = (B * x.y + X * a.y) / H, x.z = (B * x.z + X * a.z) / H;
        }
      }

      return B < z ? (e.clone(x, r.center), r.radius = B) : (e.clone(G, r.center), r.radius = z), r;
    };

    var O = new o(),
        N = new e(),
        M = new e(),
        w = new t(),
        P = new t();
    d.fromRectangle2D = function (e, t, r) {
      return d.fromRectangleWithHeights2D(e, t, 0, 0, r);
    }, d.fromRectangleWithHeights2D = function (t, r, a, o, s) {
      if (i(s) || (s = new d()), !i(t)) return s.center = e.clone(e.ZERO, s.center), s.radius = 0, s;
      r = n(r, O), h.southwest(t, w), w.height = a, h.northeast(t, P), P.height = o;
      var u = r.project(w, N),
          c = r.project(P, M),
          l = c.x - u.x,
          f = c.y - u.y,
          E = c.z - u.z;
      s.radius = .5 * Math.sqrt(l * l + f * f + E * E);
      var p = s.center;
      return p.x = u.x + .5 * l, p.y = u.y + .5 * f, p.z = u.z + .5 * E, s;
    };
    var D = [];
    d.fromRectangle3D = function (t, r, o, s) {
      if (r = n(r, a.WGS84), o = n(o, 0), i(s) || (s = new d()), !i(t)) return s.center = e.clone(e.ZERO, s.center), s.radius = 0, s;
      var u = h.subsample(t, r, o, D);
      return d.fromPoints(u, s);
    }, d.fromVertices = function (t, r, a, o) {
      if (i(o) || (o = new d()), !i(t) || 0 === t.length) return o.center = e.clone(e.ZERO, o.center), o.radius = 0, o;
      r = n(r, e.ZERO), a = n(a, 3);
      var s = T;
      s.x = t[0] + r.x, s.y = t[1] + r.y, s.z = t[2] + r.z;
      var u,
          c = e.clone(s, E),
          l = e.clone(s, p),
          f = e.clone(s, m),
          h = e.clone(s, _),
          I = e.clone(s, y),
          O = e.clone(s, R),
          N = t.length;

      for (u = 0; u < N; u += a) {
        var M = t[u] + r.x,
            w = t[u + 1] + r.y,
            P = t[u + 2] + r.z;
        s.x = M, s.y = w, s.z = P, M < c.x && e.clone(s, c), M > h.x && e.clone(s, h), w < l.y && e.clone(s, l), w > I.y && e.clone(s, I), P < f.z && e.clone(s, f), P > O.z && e.clone(s, O);
      }

      var D = e.magnitudeSquared(e.subtract(h, c, A)),
          U = e.magnitudeSquared(e.subtract(I, l, A)),
          F = e.magnitudeSquared(e.subtract(O, f, A)),
          x = c,
          L = h,
          B = D;
      U > B && (B = U, x = l, L = I), F > B && (B = F, x = f, L = O);
      var b = S;
      b.x = .5 * (x.x + L.x), b.y = .5 * (x.y + L.y), b.z = .5 * (x.z + L.z);
      var q = e.magnitudeSquared(e.subtract(L, b, A)),
          G = Math.sqrt(q),
          z = g;
      z.x = c.x, z.y = l.y, z.z = f.z;
      var V = C;
      V.x = h.x, V.y = I.y, V.z = O.z;
      var W = e.midpoint(z, V, v),
          H = 0;

      for (u = 0; u < N; u += a) {
        s.x = t[u] + r.x, s.y = t[u + 1] + r.y, s.z = t[u + 2] + r.z;
        var X = e.magnitude(e.subtract(s, W, A));
        X > H && (H = X);
        var Y = e.magnitudeSquared(e.subtract(s, b, A));

        if (Y > q) {
          var k = Math.sqrt(Y);
          G = .5 * (G + k), q = G * G;
          var j = k - G;
          b.x = (G * b.x + j * s.x) / k, b.y = (G * b.y + j * s.y) / k, b.z = (G * b.z + j * s.z) / k;
        }
      }

      return G < H ? (e.clone(b, o.center), o.radius = G) : (e.clone(W, o.center), o.radius = H), o;
    }, d.fromEncodedCartesianVertices = function (t, r, n) {
      if (i(n) || (n = new d()), !i(t) || !i(r) || t.length !== r.length || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
      var a = T;
      a.x = t[0] + r[0], a.y = t[1] + r[1], a.z = t[2] + r[2];
      var o,
          s = e.clone(a, E),
          u = e.clone(a, p),
          c = e.clone(a, m),
          l = e.clone(a, _),
          f = e.clone(a, y),
          h = e.clone(a, R),
          I = t.length;

      for (o = 0; o < I; o += 3) {
        var O = t[o] + r[o],
            N = t[o + 1] + r[o + 1],
            M = t[o + 2] + r[o + 2];
        a.x = O, a.y = N, a.z = M, O < s.x && e.clone(a, s), O > l.x && e.clone(a, l), N < u.y && e.clone(a, u), N > f.y && e.clone(a, f), M < c.z && e.clone(a, c), M > h.z && e.clone(a, h);
      }

      var w = e.magnitudeSquared(e.subtract(l, s, A)),
          P = e.magnitudeSquared(e.subtract(f, u, A)),
          D = e.magnitudeSquared(e.subtract(h, c, A)),
          U = s,
          F = l,
          x = w;
      P > x && (x = P, U = u, F = f), D > x && (x = D, U = c, F = h);
      var L = S;
      L.x = .5 * (U.x + F.x), L.y = .5 * (U.y + F.y), L.z = .5 * (U.z + F.z);
      var B = e.magnitudeSquared(e.subtract(F, L, A)),
          b = Math.sqrt(B),
          q = g;
      q.x = s.x, q.y = u.y, q.z = c.z;
      var G = C;
      G.x = l.x, G.y = f.y, G.z = h.z;
      var z = e.midpoint(q, G, v),
          V = 0;

      for (o = 0; o < I; o += 3) {
        a.x = t[o] + r[o], a.y = t[o + 1] + r[o + 1], a.z = t[o + 2] + r[o + 2];
        var W = e.magnitude(e.subtract(a, z, A));
        W > V && (V = W);
        var H = e.magnitudeSquared(e.subtract(a, L, A));

        if (H > B) {
          var X = Math.sqrt(H);
          b = .5 * (b + X), B = b * b;
          var Y = X - b;
          L.x = (b * L.x + Y * a.x) / X, L.y = (b * L.y + Y * a.y) / X, L.z = (b * L.z + Y * a.z) / X;
        }
      }

      return b < V ? (e.clone(L, n.center), n.radius = b) : (e.clone(z, n.center), n.radius = V), n;
    }, d.fromCornerPoints = function (t, r, n) {
      i(n) || (n = new d());
      var a = e.midpoint(t, r, n.center);
      return n.radius = e.distance(a, r), n;
    }, d.fromEllipsoid = function (t, r) {
      return i(r) || (r = new d()), e.clone(e.ZERO, r.center), r.radius = t.maximumRadius, r;
    };
    var U = new e();

    d.fromBoundingSpheres = function (t, r) {
      if (i(r) || (r = new d()), !i(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var n = t.length;
      if (1 === n) return d.clone(t[0], r);
      if (2 === n) return d.union(t[0], t[1], r);
      var a,
          o = [];

      for (a = 0; a < n; a++) {
        o.push(t[a].center);
      }

      r = d.fromPoints(o, r);
      var s = r.center,
          u = r.radius;

      for (a = 0; a < n; a++) {
        var c = t[a];
        u = Math.max(u, e.distance(s, c.center, U) + c.radius);
      }

      return r.radius = u, r;
    };

    var F = new e(),
        x = new e(),
        L = new e();
    d.fromOrientedBoundingBox = function (t, r) {
      i(r) || (r = new d());
      var n = t.halfAxes,
          a = l.getColumn(n, 0, F),
          o = l.getColumn(n, 1, x),
          s = l.getColumn(n, 2, L);
      return e.add(a, o, a), e.add(a, s, a), r.center = e.clone(t.center, r.center), r.radius = e.magnitude(a), r;
    }, d.clone = function (t, r) {
      if (i(t)) return i(r) ? (r.center = e.clone(t.center, r.center), r.radius = t.radius, r) : new d(t.center, t.radius);
    }, d.packedLength = 4, d.pack = function (e, t, r) {
      r = n(r, 0);
      var i = e.center;
      return t[r++] = i.x, t[r++] = i.y, t[r++] = i.z, t[r] = e.radius, t;
    }, d.unpack = function (e, t, r) {
      t = n(t, 0), i(r) || (r = new d());
      var a = r.center;
      return a.x = e[t++], a.y = e[t++], a.z = e[t++], r.radius = e[t], r;
    };
    var B = new e(),
        b = new e();

    d.union = function (t, r, n) {
      i(n) || (n = new d());
      var a = t.center,
          o = t.radius,
          s = r.center,
          u = r.radius,
          c = e.subtract(s, a, B),
          l = e.magnitude(c);
      if (o >= l + u) return t.clone(n), n;
      if (u >= l + o) return r.clone(n), n;
      var f = .5 * (o + l + u),
          h = e.multiplyByScalar(c, (-o + f) / l, b);
      return e.add(h, a, h), e.clone(h, n.center), n.radius = f, n;
    };

    var q = new e();
    d.expand = function (t, r, n) {
      n = d.clone(t, n);
      var i = e.magnitude(e.subtract(r, n.center, q));
      return i > n.radius && (n.radius = i), n;
    }, d.intersectPlane = function (t, r) {
      var n = t.center,
          i = t.radius,
          a = r.normal,
          o = e.dot(a, n) + r.distance;
      return o < -i ? s.OUTSIDE : o < i ? s.INTERSECTING : s.INSIDE;
    }, d.transform = function (e, t, r) {
      return i(r) || (r = new d()), r.center = f.multiplyByPoint(t, e.center, r.center), r.radius = f.getMaximumScale(t) * e.radius, r;
    };
    var G = new e();
    d.distanceSquaredTo = function (t, r) {
      var n = e.subtract(t.center, r, G);
      return e.magnitudeSquared(n) - t.radius * t.radius;
    }, d.transformWithoutScale = function (e, t, r) {
      return i(r) || (r = new d()), r.center = f.multiplyByPoint(t, e.center, r.center), r.radius = e.radius, r;
    };
    var z = new e();

    d.computePlaneDistances = function (t, r, n, a) {
      i(a) || (a = new u());
      var o = e.subtract(t.center, r, z),
          s = e.dot(n, o);
      return a.start = s - t.radius, a.stop = s + t.radius, a;
    };

    for (var V = new e(), W = new e(), H = new e(), X = new e(), Y = new e(), k = new t(), j = new Array(8), K = 0; K < 8; ++K) {
      j[K] = new e();
    }

    var Z = new o();
    return d.projectTo2D = function (t, r, i) {
      r = n(r, Z);
      var a = r.ellipsoid,
          o = t.center,
          s = t.radius,
          u = a.geodeticSurfaceNormal(o, V),
          c = e.cross(e.UNIT_Z, u, W);
      e.normalize(c, c);
      var l = e.cross(u, c, H);
      e.normalize(l, l), e.multiplyByScalar(u, s, u), e.multiplyByScalar(l, s, l), e.multiplyByScalar(c, s, c);
      var f = e.negate(l, Y),
          h = e.negate(c, X),
          E = j,
          p = E[0];
      e.add(u, l, p), e.add(p, c, p), p = E[1], e.add(u, l, p), e.add(p, h, p), p = E[2], e.add(u, f, p), e.add(p, h, p), p = E[3], e.add(u, f, p), e.add(p, c, p), e.negate(u, u), p = E[4], e.add(u, l, p), e.add(p, c, p), p = E[5], e.add(u, l, p), e.add(p, h, p), p = E[6], e.add(u, f, p), e.add(p, h, p), p = E[7], e.add(u, f, p), e.add(p, c, p);

      for (var m = E.length, _ = 0; _ < m; ++_) {
        var y = E[_];
        e.add(o, y, y);
        var R = a.cartesianToCartographic(y, k);
        r.project(R, y);
      }

      i = d.fromPoints(E, i), o = i.center;
      var T = o.x,
          A = o.y,
          S = o.z;
      return o.x = S, o.y = T, o.z = A, i;
    }, d.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e);
    }, d.equals = function (t, r) {
      return t === r || i(t) && i(r) && e.equals(t.center, r.center) && t.radius === r.radius;
    }, d.prototype.intersectPlane = function (e) {
      return d.intersectPlane(this, e);
    }, d.prototype.distanceSquaredTo = function (e) {
      return d.distanceSquaredTo(this, e);
    }, d.prototype.computePlaneDistances = function (e, t, r) {
      return d.computePlaneDistances(this, e, t, r);
    }, d.prototype.isOccluded = function (e) {
      return d.isOccluded(this, e);
    }, d.prototype.equals = function (e) {
      return d.equals(this, e);
    }, d.prototype.clone = function (e) {
      return d.clone(this, e);
    }, d.prototype.volume = function () {
      var e = this.radius;
      return I * e * e * e;
    }, d.prototype.empty = function () {
      return this.radius <= 0;
    }, d;
  }), define("Core/Fullscreen", ["./defined", "./defineProperties"], function (e, t) {
    "use strict";

    var r,
        n = {
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
          if (i.supportsFullscreen()) return document[n.fullscreenElement];
        }
      },
      changeEventName: {
        get: function get() {
          if (i.supportsFullscreen()) return n.fullscreenchange;
        }
      },
      errorEventName: {
        get: function get() {
          if (i.supportsFullscreen()) return n.fullscreenerror;
        }
      },
      enabled: {
        get: function get() {
          if (i.supportsFullscreen()) return document[n.fullscreenEnabled];
        }
      },
      fullscreen: {
        get: function get() {
          if (i.supportsFullscreen()) return null !== i.element;
        }
      }
    }), i.supportsFullscreen = function () {
      if (e(r)) return r;
      r = !1;
      var t = document.body;
      if ("function" == typeof t.requestFullscreen) return n.requestFullscreen = "requestFullscreen", n.exitFullscreen = "exitFullscreen", n.fullscreenEnabled = "fullscreenEnabled", n.fullscreenElement = "fullscreenElement", n.fullscreenchange = "fullscreenchange", n.fullscreenerror = "fullscreenerror", r = !0;

      for (var i, a = ["webkit", "moz", "o", "ms", "khtml"], o = 0, s = a.length; o < s; ++o) {
        var u = a[o];
        i = u + "RequestFullscreen", "function" == typeof t[i] ? (n.requestFullscreen = i, r = !0) : (i = u + "RequestFullScreen", "function" == typeof t[i] && (n.requestFullscreen = i, r = !0)), i = u + "ExitFullscreen", "function" == typeof document[i] ? n.exitFullscreen = i : (i = u + "CancelFullScreen", "function" == typeof document[i] && (n.exitFullscreen = i)), i = u + "FullscreenEnabled", void 0 !== document[i] ? n.fullscreenEnabled = i : (i = u + "FullScreenEnabled", void 0 !== document[i] && (n.fullscreenEnabled = i)), i = u + "FullscreenElement", void 0 !== document[i] ? n.fullscreenElement = i : (i = u + "FullScreenElement", void 0 !== document[i] && (n.fullscreenElement = i)), i = u + "fullscreenchange", void 0 !== document["on" + i] && ("ms" === u && (i = "MSFullscreenChange"), n.fullscreenchange = i), i = u + "fullscreenerror", void 0 !== document["on" + i] && ("ms" === u && (i = "MSFullscreenError"), n.fullscreenerror = i);
      }

      return r;
    }, i.requestFullscreen = function (e, t) {
      i.supportsFullscreen() && e[n.requestFullscreen]({
        vrDisplay: t
      });
    }, i.exitFullscreen = function () {
      i.supportsFullscreen() && document[n.exitFullscreen]();
    }, i;
  }), function (e) {
    "use strict";

    e("ThirdParty/when", [], function () {
      function e(e, r, n, i) {
        return t(e).then(r, n, i);
      }

      function t(e) {
        var t, r;
        return e instanceof n ? t = e : s(e) ? (r = o(), e.then(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, function (e) {
          r.progress(e);
        }), t = r.promise) : t = i(e), t;
      }

      function r(t) {
        return e(t, a);
      }

      function n(e) {
        this.then = e;
      }

      function i(e) {
        return new n(function (r) {
          try {
            return t(r ? r(e) : e);
          } catch (e) {
            return a(e);
          }
        });
      }

      function a(e) {
        return new n(function (r, n) {
          try {
            return n ? t(n(e)) : a(e);
          } catch (e) {
            return a(e);
          }
        });
      }

      function o() {
        function e(e, t, r) {
          return h(e, t, r);
        }

        function r(e) {
          return _E(e);
        }

        function i(e) {
          return _E(a(e));
        }

        function s(e) {
          return d(e);
        }

        var u, c, l, f, h, d, _E;

        return c = new n(e), u = {
          then: e,
          resolve: r,
          reject: i,
          progress: s,
          promise: c,
          resolver: {
            resolve: r,
            reject: i,
            progress: s
          }
        }, l = [], f = [], h = function h(e, t, r) {
          var n, i;
          return n = o(), i = "function" == typeof r ? function (e) {
            try {
              n.progress(r(e));
            } catch (e) {
              n.progress(e);
            }
          } : function (e) {
            n.progress(e);
          }, l.push(function (r) {
            r.then(e, t).then(n.resolve, n.reject, i);
          }), f.push(i), n.promise;
        }, d = function d(e) {
          return p(f, e), e;
        }, _E = function E(e) {
          return e = t(e), h = e.then, _E = t, d = _, p(l, e), f = l = A, e;
        }, u;
      }

      function s(e) {
        return e && "function" == typeof e.then;
      }

      function u(t, r, n, i, a) {
        return m(2, arguments), e(t, function (t) {
          function s(e) {
            _p(e);
          }

          function u(e) {
            _E2(e);
          }

          var c, l, f, h, d, _E2, _p, m, y, R;

          if (y = t.length >>> 0, c = Math.max(0, Math.min(r, y)), f = [], l = y - c + 1, h = [], d = o(), c) for (m = d.progress, _p = function p(e) {
            h.push(e), --l || (_E2 = _p = _, d.reject(h));
          }, _E2 = function E(e) {
            f.push(e), --c || (_E2 = _p = _, d.resolve(f));
          }, R = 0; R < y; ++R) {
            R in t && e(t[R], u, s, m);
          } else d.resolve(f);
          return d.then(n, i, a);
        });
      }

      function c(e, t, r, n) {
        function i(e) {
          return t ? t(e[0]) : e[0];
        }

        return u(e, 1, i, r, n);
      }

      function l(e, t, r, n) {
        return m(1, arguments), h(e, y).then(t, r, n);
      }

      function f() {
        return h(arguments, y);
      }

      function h(t, r) {
        return e(t, function (t) {
          var n, i, a, s, u, c;
          if (a = i = t.length >>> 0, n = [], c = o(), a) for (s = function s(t, i) {
            e(t, r).then(function (e) {
              n[i] = e, --a || c.resolve(n);
            }, c.reject);
          }, u = 0; u < i; u++) {
            u in t ? s(t[u], u) : --a;
          } else c.resolve(n);
          return c.promise;
        });
      }

      function d(t, r) {
        var n = T.call(arguments, 1);
        return e(t, function (t) {
          var i;
          return i = t.length, n[0] = function (t, n, a) {
            return e(t, function (t) {
              return e(n, function (e) {
                return r(t, e, a, i);
              });
            });
          }, R.apply(t, n);
        });
      }

      function E(t, r, n) {
        var i = arguments.length > 2;
        return e(t, function (e) {
          return e = i ? n : e, r.resolve(e), e;
        }, function (e) {
          return r.reject(e), a(e);
        }, r.progress);
      }

      function p(e, t) {
        for (var r, n = 0; r = e[n++];) {
          r(t);
        }
      }

      function m(e, t) {
        for (var r, n = t.length; n > e;) {
          if (null != (r = t[--n]) && "function" != typeof r) throw new Error("arg " + n + " must be a function");
        }
      }

      function _() {}

      function y(e) {
        return e;
      }

      var R, T, A;
      return e.defer = o, e.resolve = t, e.reject = r, e.join = f, e.all = l, e.map = h, e.reduce = d, e.any = c, e.some = u, e.chain = E, e.isPromise = s, n.prototype = {
        always: function always(e, t) {
          return this.then(e, e, t);
        },
        otherwise: function otherwise(e) {
          return this.then(A, e);
        },
        "yield": function _yield(e) {
          return this.then(function () {
            return e;
          });
        },
        spread: function spread(e) {
          return this.then(function (t) {
            return l(t, function (t) {
              return e.apply(A, t);
            });
          });
        }
      }, T = [].slice, R = [].reduce || function (e) {
        var t, r, n, i, a;
        if (a = 0, t = Object(this), i = t.length >>> 0, r = arguments, r.length <= 1) for (;;) {
          if (a in t) {
            n = t[a++];
            break;
          }

          if (++a >= i) throw new TypeError();
        } else n = r[1];

        for (; a < i; ++a) {
          a in t && (n = e(n, t[a], a, t));
        }

        return n;
      }, e;
    });
  }("function" == typeof define && define.amd ? define : function (e) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : this.when = e();
  }), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Fullscreen", "../ThirdParty/when"], function (e, t, r, n, i, a) {
    "use strict";

    function o(e) {
      for (var t = e.split("."), r = 0, n = t.length; r < n; ++r) {
        t[r] = parseInt(t[r], 10);
      }

      return t;
    }

    function s() {
      if (!t(v) && (v = !1, !p())) {
        var e = / Chrome\/([\.0-9]+)/.exec(C.userAgent);
        null !== e && (v = !0, I = o(e[1]));
      }

      return v;
    }

    function u() {
      return s() && I;
    }

    function c() {
      if (!t(O) && (O = !1, !s() && !p() && / Safari\/[\.0-9]+/.test(C.userAgent))) {
        var e = / Version\/([\.0-9]+)/.exec(C.userAgent);
        null !== e && (O = !0, N = o(e[1]));
      }

      return O;
    }

    function l() {
      return c() && N;
    }

    function f() {
      if (!t(M)) {
        M = !1;
        var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(C.userAgent);
        null !== e && (M = !0, w = o(e[1]), w.isNightly = !!e[2]);
      }

      return M;
    }

    function h() {
      return f() && w;
    }

    function d() {
      if (!t(P)) {
        P = !1;
        var e;
        "Microsoft Internet Explorer" === C.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(C.userAgent)) && (P = !0, D = o(e[1])) : "Netscape" === C.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(C.userAgent)) && (P = !0, D = o(e[1]));
      }

      return P;
    }

    function E() {
      return d() && D;
    }

    function p() {
      if (!t(U)) {
        U = !1;
        var e = / Edge\/([\.0-9]+)/.exec(C.userAgent);
        null !== e && (U = !0, F = o(e[1]));
      }

      return U;
    }

    function m() {
      return p() && F;
    }

    function _() {
      if (!t(x)) {
        x = !1;
        var e = /Firefox\/([\.0-9]+)/.exec(C.userAgent);
        null !== e && (x = !0, L = o(e[1]));
      }

      return x;
    }

    function y() {
      return t(B) || (B = /Windows/i.test(C.appVersion)), B;
    }

    function R() {
      return _() && L;
    }

    function T() {
      return t(b) || (b = !_() && "undefined" != typeof PointerEvent && (!t(C.pointerEnabled) || C.pointerEnabled)), b;
    }

    function A() {
      if (!t(G)) {
        var e = document.createElement("canvas");
        e.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;");
        var r = e.style.imageRendering;
        G = t(r) && "" !== r, G && (q = r);
      }

      return G;
    }

    function S() {
      return A() ? q : void 0;
    }

    function g() {
      return g._result;
    }

    var C;
    C = "undefined" != typeof navigator ? navigator : {};
    var v, I, O, N, M, w, P, D, U, F, x, L, B, b, q, G;
    g._promise = void 0, g._result = void 0, g.initialize = function () {
      if (t(g._promise)) return g._promise;
      var e = a.defer();
      if (g._promise = e.promise, p()) return g._result = !1, e.resolve(g._result), e.promise;
      var r = new Image();
      return r.onload = function () {
        g._result = r.width > 0 && r.height > 0, e.resolve(g._result);
      }, r.onerror = function () {
        g._result = !1, e.resolve(g._result);
      }, r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.promise;
    }, r(g, {
      initialized: {
        get: function get() {
          return t(g._result);
        }
      }
    });
    var z = [];
    "undefined" != typeof ArrayBuffer && (z.push(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), "undefined" != typeof Uint8ClampedArray && z.push(Uint8ClampedArray), "undefined" != typeof CanvasPixelArray && z.push(CanvasPixelArray));
    var V = {
      isChrome: s,
      chromeVersion: u,
      isSafari: c,
      safariVersion: l,
      isWebkit: f,
      webkitVersion: h,
      isInternetExplorer: d,
      internetExplorerVersion: E,
      isEdge: p,
      edgeVersion: m,
      isFirefox: _,
      firefoxVersion: R,
      isWindows: y,
      hardwareConcurrency: e(C.hardwareConcurrency, 3),
      supportsPointerEvents: T,
      supportsImageRenderingPixelated: A,
      supportsWebP: g,
      imageRenderingValue: S,
      typedArrayTypes: z
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
  }), define("Core/Color", ["./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math"], function (e, t, r, n, i, a) {
    "use strict";

    function o(e, t, r) {
      return r < 0 && (r += 1), r > 1 && (r -= 1), 6 * r < 1 ? e + 6 * (t - e) * r : 2 * r < 1 ? t : 3 * r < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
    }

    function s(e, r, n, i) {
      this.red = t(e, 1), this.green = t(r, 1), this.blue = t(n, 1), this.alpha = t(i, 1);
    }

    s.fromCartesian4 = function (e, t) {
      return r(t) ? (t.red = e.x, t.green = e.y, t.blue = e.z, t.alpha = e.w, t) : new s(e.x, e.y, e.z, e.w);
    }, s.fromBytes = function (e, n, i, a, o) {
      return e = s.byteToFloat(t(e, 255)), n = s.byteToFloat(t(n, 255)), i = s.byteToFloat(t(i, 255)), a = s.byteToFloat(t(a, 255)), r(o) ? (o.red = e, o.green = n, o.blue = i, o.alpha = a, o) : new s(e, n, i, a);
    }, s.fromAlpha = function (e, t, n) {
      return r(n) ? (n.red = e.red, n.green = e.green, n.blue = e.blue, n.alpha = t, n) : new s(e.red, e.green, e.blue, t);
    };
    var u, c, l;
    n.supportsTypedArrays() && (u = new ArrayBuffer(4), c = new Uint32Array(u), l = new Uint8Array(u)), s.fromRgba = function (e, t) {
      return c[0] = e, s.fromBytes(l[0], l[1], l[2], l[3], t);
    }, s.fromHsl = function (e, n, i, a, u) {
      e = t(e, 0) % 1, n = t(n, 0), i = t(i, 0), a = t(a, 1);
      var c = i,
          l = i,
          f = i;

      if (0 !== n) {
        var h;
        h = i < .5 ? i * (1 + n) : i + n - i * n;
        var d = 2 * i - h;
        c = o(d, h, e + 1 / 3), l = o(d, h, e), f = o(d, h, e - 1 / 3);
      }

      return r(u) ? (u.red = c, u.green = l, u.blue = f, u.alpha = a, u) : new s(c, l, f, a);
    }, s.fromRandom = function (e, n) {
      e = t(e, t.EMPTY_OBJECT);
      var i = e.red;

      if (!r(i)) {
        var o = t(e.minimumRed, 0),
            u = t(e.maximumRed, 1);
        i = o + a.nextRandomNumber() * (u - o);
      }

      var c = e.green;

      if (!r(c)) {
        var l = t(e.minimumGreen, 0),
            f = t(e.maximumGreen, 1);
        c = l + a.nextRandomNumber() * (f - l);
      }

      var h = e.blue;

      if (!r(h)) {
        var d = t(e.minimumBlue, 0),
            E = t(e.maximumBlue, 1);
        h = d + a.nextRandomNumber() * (E - d);
      }

      var p = e.alpha;

      if (!r(p)) {
        var m = t(e.minimumAlpha, 0),
            _ = t(e.maximumAlpha, 1);

        p = m + a.nextRandomNumber() * (_ - m);
      }

      return r(n) ? (n.red = i, n.green = c, n.blue = h, n.alpha = p, n) : new s(i, c, h, p);
    };
    var f = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
        h = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
        d = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
        E = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
    return s.fromCssColorString = function (e, n) {
      r(n) || (n = new s());
      var i = s[e.toUpperCase()];
      if (r(i)) return s.clone(i, n), n;
      var a = f.exec(e);
      return null !== a ? (n.red = parseInt(a[1], 16) / 15, n.green = parseInt(a[2], 16) / 15, n.blue = parseInt(a[3], 16) / 15, n.alpha = 1, n) : null !== (a = h.exec(e)) ? (n.red = parseInt(a[1], 16) / 255, n.green = parseInt(a[2], 16) / 255, n.blue = parseInt(a[3], 16) / 255, n.alpha = 1, n) : null !== (a = d.exec(e)) ? (n.red = parseFloat(a[1]) / ("%" === a[1].substr(-1) ? 100 : 255), n.green = parseFloat(a[2]) / ("%" === a[2].substr(-1) ? 100 : 255), n.blue = parseFloat(a[3]) / ("%" === a[3].substr(-1) ? 100 : 255), n.alpha = parseFloat(t(a[4], "1.0")), n) : null !== (a = E.exec(e)) ? s.fromHsl(parseFloat(a[1]) / 360, parseFloat(a[2]) / 100, parseFloat(a[3]) / 100, parseFloat(t(a[4], "1.0")), n) : n = void 0;
    }, s.packedLength = 4, s.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.red, r[n++] = e.green, r[n++] = e.blue, r[n] = e.alpha, r;
    }, s.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new s()), i.red = e[n++], i.green = e[n++], i.blue = e[n++], i.alpha = e[n], i;
    }, s.byteToFloat = function (e) {
      return e / 255;
    }, s.floatToByte = function (e) {
      return 1 === e ? 255 : 256 * e | 0;
    }, s.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.red = e.red, t.green = e.green, t.blue = e.blue, t.alpha = e.alpha, t) : new s(e.red, e.green, e.blue, e.alpha);
    }, s.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.red === t.red && e.green === t.green && e.blue === t.blue && e.alpha === t.alpha;
    }, s.equalsArray = function (e, t, r) {
      return e.red === t[r] && e.green === t[r + 1] && e.blue === t[r + 2] && e.alpha === t[r + 3];
    }, s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.prototype.equalsEpsilon = function (e, t) {
      return this === e || r(e) && Math.abs(this.red - e.red) <= t && Math.abs(this.green - e.green) <= t && Math.abs(this.blue - e.blue) <= t && Math.abs(this.alpha - e.alpha) <= t;
    }, s.prototype.toString = function () {
      return "(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    }, s.prototype.toCssColorString = function () {
      var e = s.floatToByte(this.red),
          t = s.floatToByte(this.green),
          r = s.floatToByte(this.blue);
      return 1 === this.alpha ? "rgb(" + e + "," + t + "," + r + ")" : "rgba(" + e + "," + t + "," + r + "," + this.alpha + ")";
    }, s.prototype.toBytes = function (e) {
      var t = s.floatToByte(this.red),
          n = s.floatToByte(this.green),
          i = s.floatToByte(this.blue),
          a = s.floatToByte(this.alpha);
      return r(e) ? (e[0] = t, e[1] = n, e[2] = i, e[3] = a, e) : [t, n, i, a];
    }, s.prototype.toRgba = function () {
      return l[0] = s.floatToByte(this.red), l[1] = s.floatToByte(this.green), l[2] = s.floatToByte(this.blue), l[3] = s.floatToByte(this.alpha), c[0];
    }, s.prototype.brighten = function (e, t) {
      return e = 1 - e, t.red = 1 - (1 - this.red) * e, t.green = 1 - (1 - this.green) * e, t.blue = 1 - (1 - this.blue) * e, t.alpha = this.alpha, t;
    }, s.prototype.darken = function (e, t) {
      return e = 1 - e, t.red = this.red * e, t.green = this.green * e, t.blue = this.blue * e, t.alpha = this.alpha, t;
    }, s.prototype.withAlpha = function (e, t) {
      return s.fromAlpha(this, e, t);
    }, s.add = function (e, t, r) {
      return r.red = e.red + t.red, r.green = e.green + t.green, r.blue = e.blue + t.blue, r.alpha = e.alpha + t.alpha, r;
    }, s.subtract = function (e, t, r) {
      return r.red = e.red - t.red, r.green = e.green - t.green, r.blue = e.blue - t.blue, r.alpha = e.alpha - t.alpha, r;
    }, s.multiply = function (e, t, r) {
      return r.red = e.red * t.red, r.green = e.green * t.green, r.blue = e.blue * t.blue, r.alpha = e.alpha * t.alpha, r;
    }, s.divide = function (e, t, r) {
      return r.red = e.red / t.red, r.green = e.green / t.green, r.blue = e.blue / t.blue, r.alpha = e.alpha / t.alpha, r;
    }, s.mod = function (e, t, r) {
      return r.red = e.red % t.red, r.green = e.green % t.green, r.blue = e.blue % t.blue, r.alpha = e.alpha % t.alpha, r;
    }, s.multiplyByScalar = function (e, t, r) {
      return r.red = e.red * t, r.green = e.green * t, r.blue = e.blue * t, r.alpha = e.alpha * t, r;
    }, s.divideByScalar = function (e, t, r) {
      return r.red = e.red / t, r.green = e.green / t, r.blue = e.blue / t, r.alpha = e.alpha / t, r;
    }, s.ALICEBLUE = i(s.fromCssColorString("#F0F8FF")), s.ANTIQUEWHITE = i(s.fromCssColorString("#FAEBD7")), s.AQUA = i(s.fromCssColorString("#00FFFF")), s.AQUAMARINE = i(s.fromCssColorString("#7FFFD4")), s.AZURE = i(s.fromCssColorString("#F0FFFF")), s.BEIGE = i(s.fromCssColorString("#F5F5DC")), s.BISQUE = i(s.fromCssColorString("#FFE4C4")), s.BLACK = i(s.fromCssColorString("#000000")), s.BLANCHEDALMOND = i(s.fromCssColorString("#FFEBCD")), s.BLUE = i(s.fromCssColorString("#0000FF")), s.BLUEVIOLET = i(s.fromCssColorString("#8A2BE2")), s.BROWN = i(s.fromCssColorString("#A52A2A")), s.BURLYWOOD = i(s.fromCssColorString("#DEB887")), s.CADETBLUE = i(s.fromCssColorString("#5F9EA0")), s.CHARTREUSE = i(s.fromCssColorString("#7FFF00")), s.CHOCOLATE = i(s.fromCssColorString("#D2691E")), s.CORAL = i(s.fromCssColorString("#FF7F50")), s.CORNFLOWERBLUE = i(s.fromCssColorString("#6495ED")), s.CORNSILK = i(s.fromCssColorString("#FFF8DC")), s.CRIMSON = i(s.fromCssColorString("#DC143C")), s.CYAN = i(s.fromCssColorString("#00FFFF")), s.DARKBLUE = i(s.fromCssColorString("#00008B")), s.DARKCYAN = i(s.fromCssColorString("#008B8B")), s.DARKGOLDENROD = i(s.fromCssColorString("#B8860B")), s.DARKGRAY = i(s.fromCssColorString("#A9A9A9")), s.DARKGREEN = i(s.fromCssColorString("#006400")), s.DARKGREY = s.DARKGRAY, s.DARKKHAKI = i(s.fromCssColorString("#BDB76B")), s.DARKMAGENTA = i(s.fromCssColorString("#8B008B")), s.DARKOLIVEGREEN = i(s.fromCssColorString("#556B2F")), s.DARKORANGE = i(s.fromCssColorString("#FF8C00")), s.DARKORCHID = i(s.fromCssColorString("#9932CC")), s.DARKRED = i(s.fromCssColorString("#8B0000")), s.DARKSALMON = i(s.fromCssColorString("#E9967A")), s.DARKSEAGREEN = i(s.fromCssColorString("#8FBC8F")), s.DARKSLATEBLUE = i(s.fromCssColorString("#483D8B")), s.DARKSLATEGRAY = i(s.fromCssColorString("#2F4F4F")), s.DARKSLATEGREY = s.DARKSLATEGRAY, s.DARKTURQUOISE = i(s.fromCssColorString("#00CED1")), s.DARKVIOLET = i(s.fromCssColorString("#9400D3")), s.DEEPPINK = i(s.fromCssColorString("#FF1493")), s.DEEPSKYBLUE = i(s.fromCssColorString("#00BFFF")), s.DIMGRAY = i(s.fromCssColorString("#696969")), s.DIMGREY = s.DIMGRAY, s.DODGERBLUE = i(s.fromCssColorString("#1E90FF")), s.FIREBRICK = i(s.fromCssColorString("#B22222")), s.FLORALWHITE = i(s.fromCssColorString("#FFFAF0")), s.FORESTGREEN = i(s.fromCssColorString("#228B22")), s.FUCHSIA = i(s.fromCssColorString("#FF00FF")), s.GAINSBORO = i(s.fromCssColorString("#DCDCDC")), s.GHOSTWHITE = i(s.fromCssColorString("#F8F8FF")), s.GOLD = i(s.fromCssColorString("#FFD700")), s.GOLDENROD = i(s.fromCssColorString("#DAA520")), s.GRAY = i(s.fromCssColorString("#808080")), s.GREEN = i(s.fromCssColorString("#008000")), s.GREENYELLOW = i(s.fromCssColorString("#ADFF2F")), s.GREY = s.GRAY, s.HONEYDEW = i(s.fromCssColorString("#F0FFF0")), s.HOTPINK = i(s.fromCssColorString("#FF69B4")), s.INDIANRED = i(s.fromCssColorString("#CD5C5C")), s.INDIGO = i(s.fromCssColorString("#4B0082")), s.IVORY = i(s.fromCssColorString("#FFFFF0")), s.KHAKI = i(s.fromCssColorString("#F0E68C")), s.LAVENDER = i(s.fromCssColorString("#E6E6FA")), s.LAVENDAR_BLUSH = i(s.fromCssColorString("#FFF0F5")), s.LAWNGREEN = i(s.fromCssColorString("#7CFC00")), s.LEMONCHIFFON = i(s.fromCssColorString("#FFFACD")), s.LIGHTBLUE = i(s.fromCssColorString("#ADD8E6")), s.LIGHTCORAL = i(s.fromCssColorString("#F08080")), s.LIGHTCYAN = i(s.fromCssColorString("#E0FFFF")), s.LIGHTGOLDENRODYELLOW = i(s.fromCssColorString("#FAFAD2")), s.LIGHTGRAY = i(s.fromCssColorString("#D3D3D3")), s.LIGHTGREEN = i(s.fromCssColorString("#90EE90")), s.LIGHTGREY = s.LIGHTGRAY, s.LIGHTPINK = i(s.fromCssColorString("#FFB6C1")), s.LIGHTSEAGREEN = i(s.fromCssColorString("#20B2AA")), s.LIGHTSKYBLUE = i(s.fromCssColorString("#87CEFA")), s.LIGHTSLATEGRAY = i(s.fromCssColorString("#778899")), s.LIGHTSLATEGREY = s.LIGHTSLATEGRAY, s.LIGHTSTEELBLUE = i(s.fromCssColorString("#B0C4DE")), s.LIGHTYELLOW = i(s.fromCssColorString("#FFFFE0")), s.LIME = i(s.fromCssColorString("#00FF00")), s.LIMEGREEN = i(s.fromCssColorString("#32CD32")), s.LINEN = i(s.fromCssColorString("#FAF0E6")), s.MAGENTA = i(s.fromCssColorString("#FF00FF")), s.MAROON = i(s.fromCssColorString("#800000")), s.MEDIUMAQUAMARINE = i(s.fromCssColorString("#66CDAA")), s.MEDIUMBLUE = i(s.fromCssColorString("#0000CD")), s.MEDIUMORCHID = i(s.fromCssColorString("#BA55D3")), s.MEDIUMPURPLE = i(s.fromCssColorString("#9370DB")), s.MEDIUMSEAGREEN = i(s.fromCssColorString("#3CB371")), s.MEDIUMSLATEBLUE = i(s.fromCssColorString("#7B68EE")), s.MEDIUMSPRINGGREEN = i(s.fromCssColorString("#00FA9A")), s.MEDIUMTURQUOISE = i(s.fromCssColorString("#48D1CC")), s.MEDIUMVIOLETRED = i(s.fromCssColorString("#C71585")), s.MIDNIGHTBLUE = i(s.fromCssColorString("#191970")), s.MINTCREAM = i(s.fromCssColorString("#F5FFFA")), s.MISTYROSE = i(s.fromCssColorString("#FFE4E1")), s.MOCCASIN = i(s.fromCssColorString("#FFE4B5")), s.NAVAJOWHITE = i(s.fromCssColorString("#FFDEAD")), s.NAVY = i(s.fromCssColorString("#000080")), s.OLDLACE = i(s.fromCssColorString("#FDF5E6")), s.OLIVE = i(s.fromCssColorString("#808000")), s.OLIVEDRAB = i(s.fromCssColorString("#6B8E23")), s.ORANGE = i(s.fromCssColorString("#FFA500")), s.ORANGERED = i(s.fromCssColorString("#FF4500")), s.ORCHID = i(s.fromCssColorString("#DA70D6")), s.PALEGOLDENROD = i(s.fromCssColorString("#EEE8AA")), s.PALEGREEN = i(s.fromCssColorString("#98FB98")), s.PALETURQUOISE = i(s.fromCssColorString("#AFEEEE")), s.PALEVIOLETRED = i(s.fromCssColorString("#DB7093")), s.PAPAYAWHIP = i(s.fromCssColorString("#FFEFD5")), s.PEACHPUFF = i(s.fromCssColorString("#FFDAB9")), s.PERU = i(s.fromCssColorString("#CD853F")), s.PINK = i(s.fromCssColorString("#FFC0CB")), s.PLUM = i(s.fromCssColorString("#DDA0DD")), s.POWDERBLUE = i(s.fromCssColorString("#B0E0E6")), s.PURPLE = i(s.fromCssColorString("#800080")), s.RED = i(s.fromCssColorString("#FF0000")), s.ROSYBROWN = i(s.fromCssColorString("#BC8F8F")), s.ROYALBLUE = i(s.fromCssColorString("#4169E1")), s.SADDLEBROWN = i(s.fromCssColorString("#8B4513")), s.SALMON = i(s.fromCssColorString("#FA8072")), s.SANDYBROWN = i(s.fromCssColorString("#F4A460")), s.SEAGREEN = i(s.fromCssColorString("#2E8B57")), s.SEASHELL = i(s.fromCssColorString("#FFF5EE")), s.SIENNA = i(s.fromCssColorString("#A0522D")), s.SILVER = i(s.fromCssColorString("#C0C0C0")), s.SKYBLUE = i(s.fromCssColorString("#87CEEB")), s.SLATEBLUE = i(s.fromCssColorString("#6A5ACD")), s.SLATEGRAY = i(s.fromCssColorString("#708090")), s.SLATEGREY = s.SLATEGRAY, s.SNOW = i(s.fromCssColorString("#FFFAFA")), s.SPRINGGREEN = i(s.fromCssColorString("#00FF7F")), s.STEELBLUE = i(s.fromCssColorString("#4682B4")), s.TAN = i(s.fromCssColorString("#D2B48C")), s.TEAL = i(s.fromCssColorString("#008080")), s.THISTLE = i(s.fromCssColorString("#D8BFD8")), s.TOMATO = i(s.fromCssColorString("#FF6347")), s.TURQUOISE = i(s.fromCssColorString("#40E0D0")), s.VIOLET = i(s.fromCssColorString("#EE82EE")), s.WHEAT = i(s.fromCssColorString("#F5DEB3")), s.WHITE = i(s.fromCssColorString("#FFFFFF")), s.WHITESMOKE = i(s.fromCssColorString("#F5F5F5")), s.YELLOW = i(s.fromCssColorString("#FFFF00")), s.YELLOWGREEN = i(s.fromCssColorString("#9ACD32")), s.TRANSPARENT = i(new s(0, 0, 0, 0)), s;
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
  }), define("Core/ComponentDatatype", ["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function (e, t, r, n, i, a) {
    "use strict";

    if (!n.supportsTypedArrays()) return {};
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
    }, o.createArrayBufferView = function (t, r, n, i) {
      switch (n = e(n, 0), i = e(i, (r.byteLength - n) / o.getSizeInBytes(t)), t) {
        case o.BYTE:
          return new Int8Array(r, n, i);

        case o.UNSIGNED_BYTE:
          return new Uint8Array(r, n, i);

        case o.SHORT:
          return new Int16Array(r, n, i);

        case o.UNSIGNED_SHORT:
          return new Uint16Array(r, n, i);

        case o.INT:
          return new Int32Array(r, n, i);

        case o.UNSIGNED_INT:
          return new Uint32Array(r, n, i);

        case o.FLOAT:
          return new Float32Array(r, n, i);

        case o.DOUBLE:
          return new Float64Array(r, n, i);
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
  }), define("Core/oneTimeWarning", ["./defaultValue", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(r, n) {
      t(i[r]) || (i[r] = !0, console.warn(e(n, r)));
    }

    var i = {};
    return n.geometryOutlines = "Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.", n.geometryZIndex = "Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored", n.geometryHeightReference = "Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored", n.geometryExtrudedHeightReference = "Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored", n;
  }), define("Core/deprecationWarning", ["./defined", "./DeveloperError", "./oneTimeWarning"], function (e, t, r) {
    "use strict";

    function n(e, t) {
      r(e, t);
    }

    return n;
  }), define("Core/Cartesian2", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, a) {
    "use strict";

    function o(e, r) {
      this.x = t(e, 0), this.y = t(r, 0);
    }

    o.fromElements = function (e, t, n) {
      return r(n) ? (n.x = e, n.y = t, n) : new o(e, t);
    }, o.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t) : new o(e.x, e.y);
    }, o.fromCartesian3 = o.clone, o.fromCartesian4 = o.clone, o.packedLength = 2, o.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n] = e.y, r;
    }, o.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new o()), i.x = e[n++], i.y = e[n], i;
    }, o.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 2 * n : t = new Array(2 * n);

      for (var i = 0; i < n; ++i) {
        o.pack(e[i], t, 2 * i);
      }

      return t;
    }, o.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 2 : t = new Array(n / 2);

      for (var i = 0; i < n; i += 2) {
        var a = i / 2;
        t[a] = o.unpack(e, i, t[a]);
      }

      return t;
    }, o.fromArray = o.unpack, o.maximumComponent = function (e) {
      return Math.max(e.x, e.y);
    }, o.minimumComponent = function (e) {
      return Math.min(e.x, e.y);
    }, o.minimumByComponent = function (e, t, r) {
      return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r;
    }, o.maximumByComponent = function (e, t, r) {
      return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r;
    }, o.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y;
    }, o.magnitude = function (e) {
      return Math.sqrt(o.magnitudeSquared(e));
    };
    var s = new o();
    o.distance = function (e, t) {
      return o.subtract(e, t, s), o.magnitude(s);
    }, o.distanceSquared = function (e, t) {
      return o.subtract(e, t, s), o.magnitudeSquared(s);
    }, o.normalize = function (e, t) {
      var r = o.magnitude(e);
      return t.x = e.x / r, t.y = e.y / r, t;
    }, o.dot = function (e, t) {
      return e.x * t.x + e.y * t.y;
    }, o.multiplyComponents = function (e, t, r) {
      return r.x = e.x * t.x, r.y = e.y * t.y, r;
    }, o.divideComponents = function (e, t, r) {
      return r.x = e.x / t.x, r.y = e.y / t.y, r;
    }, o.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r;
    }, o.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r;
    }, o.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r;
    }, o.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r;
    }, o.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t;
    }, o.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t;
    };
    var u = new o();

    o.lerp = function (e, t, r, n) {
      return o.multiplyByScalar(t, r, u), n = o.multiplyByScalar(e, 1 - r, n), o.add(u, n, n);
    };

    var c = new o(),
        l = new o();

    o.angleBetween = function (e, t) {
      return o.normalize(e, c), o.normalize(t, l), a.acosClamped(o.dot(c, l));
    };

    var f = new o();
    return o.mostOrthogonalAxis = function (e, t) {
      var r = o.normalize(e, f);
      return o.abs(r, r), t = r.x <= r.y ? o.clone(o.UNIT_X, t) : o.clone(o.UNIT_Y, t);
    }, o.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y;
    }, o.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1];
    }, o.equalsEpsilon = function (e, t, n, i) {
      return e === t || r(e) && r(t) && a.equalsEpsilon(e.x, t.x, n, i) && a.equalsEpsilon(e.y, t.y, n, i);
    }, o.ZERO = i(new o(0, 0)), o.UNIT_X = i(new o(1, 0)), o.UNIT_Y = i(new o(0, 1)), o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, r) {
      return o.equalsEpsilon(this, e, t, r);
    }, o.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ")";
    }, o;
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
  }), define("Core/Matrix2", ["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject"], function (e, t, r, n, i, a) {
    "use strict";

    function o(e, t, n, i) {
      this[0] = r(e, 0), this[1] = r(n, 0), this[2] = r(t, 0), this[3] = r(i, 0);
    }

    o.packedLength = 4, o.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t;
    }, o.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new o()), i[0] = e[t++], i[1] = e[t++], i[2] = e[t++], i[3] = e[t++], i;
    }, o.clone = function (e, t) {
      if (n(e)) return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : new o(e[0], e[2], e[1], e[3]);
    }, o.fromArray = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new o()), i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i;
    }, o.fromColumnMajorArray = function (e, t) {
      return o.clone(e, t);
    }, o.fromRowMajorArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t) : new o(e[0], e[1], e[2], e[3]);
    }, o.fromScale = function (e, t) {
      return n(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = e.y, t) : new o(e.x, 0, 0, e.y);
    }, o.fromUniformScale = function (e, t) {
      return n(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = e, t) : new o(e, 0, 0, e);
    }, o.fromRotation = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = i, t[2] = -i, t[3] = r, t) : new o(r, -i, i, r);
    }, o.toArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : [e[0], e[1], e[2], e[3]];
    }, o.getElementIndex = function (e, t) {
      return 2 * e + t;
    }, o.getColumn = function (e, t, r) {
      var n = 2 * t,
          i = e[n],
          a = e[n + 1];
      return r.x = i, r.y = a, r;
    }, o.setColumn = function (e, t, r, n) {
      n = o.clone(e, n);
      var i = 2 * t;
      return n[i] = r.x, n[i + 1] = r.y, n;
    }, o.getRow = function (e, t, r) {
      var n = e[t],
          i = e[t + 2];
      return r.x = n, r.y = i, r;
    }, o.setRow = function (e, t, r, n) {
      return n = o.clone(e, n), n[t] = r.x, n[t + 2] = r.y, n;
    };
    var s = new e();

    o.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], s)), r.y = e.magnitude(e.fromElements(t[2], t[3], s)), r;
    };

    var u = new e();
    return o.getMaximumScale = function (t) {
      return o.getScale(t, u), e.maximumComponent(u);
    }, o.multiply = function (e, t, r) {
      var n = e[0] * t[0] + e[2] * t[1],
          i = e[0] * t[2] + e[2] * t[3],
          a = e[1] * t[0] + e[3] * t[1],
          o = e[1] * t[2] + e[3] * t[3];
      return r[0] = n, r[1] = a, r[2] = i, r[3] = o, r;
    }, o.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r;
    }, o.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r;
    }, o.multiplyByVector = function (e, t, r) {
      var n = e[0] * t.x + e[2] * t.y,
          i = e[1] * t.x + e[3] * t.y;
      return r.x = n, r.y = i, r;
    }, o.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r;
    }, o.multiplyByScale = function (e, t, r) {
      return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.y, r[3] = e[3] * t.y, r;
    }, o.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t;
    }, o.transpose = function (e, t) {
      var r = e[0],
          n = e[2],
          i = e[1],
          a = e[3];
      return t[0] = r, t[1] = n, t[2] = i, t[3] = a, t;
    }, o.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t;
    }, o.equals = function (e, t) {
      return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
    }, o.equalsArray = function (e, t, r) {
      return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3];
    }, o.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r;
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
  }), define("Core/Quaternion", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math", "./Matrix3"], function (e, t, r, n, i, a, o, s) {
    "use strict";

    function u(e, t, n, i) {
      this.x = r(e, 0), this.y = r(t, 0), this.z = r(n, 0), this.w = r(i, 0);
    }

    var c = new e();

    u.fromAxisAngle = function (t, r, i) {
      var a = r / 2,
          o = Math.sin(a);
      c = e.normalize(t, c);
      var s = c.x * o,
          l = c.y * o,
          f = c.z * o,
          h = Math.cos(a);
      return n(i) ? (i.x = s, i.y = l, i.z = f, i.w = h, i) : new u(s, l, f, h);
    };

    var l = [1, 2, 0],
        f = new Array(3);

    u.fromRotationMatrix = function (e, t) {
      var r,
          i,
          a,
          o,
          c,
          h = e[s.COLUMN0ROW0],
          d = e[s.COLUMN1ROW1],
          E = e[s.COLUMN2ROW2],
          p = h + d + E;
      if (p > 0) r = Math.sqrt(p + 1), c = .5 * r, r = .5 / r, i = (e[s.COLUMN1ROW2] - e[s.COLUMN2ROW1]) * r, a = (e[s.COLUMN2ROW0] - e[s.COLUMN0ROW2]) * r, o = (e[s.COLUMN0ROW1] - e[s.COLUMN1ROW0]) * r;else {
        var m = l,
            _ = 0;
        d > h && (_ = 1), E > h && E > d && (_ = 2);
        var y = m[_],
            R = m[y];
        r = Math.sqrt(e[s.getElementIndex(_, _)] - e[s.getElementIndex(y, y)] - e[s.getElementIndex(R, R)] + 1);
        var T = f;
        T[_] = .5 * r, r = .5 / r, c = (e[s.getElementIndex(R, y)] - e[s.getElementIndex(y, R)]) * r, T[y] = (e[s.getElementIndex(y, _)] + e[s.getElementIndex(_, y)]) * r, T[R] = (e[s.getElementIndex(R, _)] + e[s.getElementIndex(_, R)]) * r, i = -T[0], a = -T[1], o = -T[2];
      }
      return n(t) ? (t.x = i, t.y = a, t.z = o, t.w = c, t) : new u(i, a, o, c);
    };

    var h = new u(),
        d = new u(),
        E = new u(),
        p = new u();

    u.fromHeadingPitchRoll = function (t, r) {
      return p = u.fromAxisAngle(e.UNIT_X, t.roll, h), E = u.fromAxisAngle(e.UNIT_Y, -t.pitch, r), r = u.multiply(E, p, E), d = u.fromAxisAngle(e.UNIT_Z, -t.heading, h), u.multiply(d, r, r);
    };

    var m = new e(),
        _ = new e(),
        y = new u(),
        R = new u(),
        T = new u();

    u.packedLength = 4, u.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e.x, t[n++] = e.y, t[n++] = e.z, t[n] = e.w, t;
    }, u.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new u()), i.x = e[t], i.y = e[t + 1], i.z = e[t + 2], i.w = e[t + 3], i;
    }, u.packedInterpolationLength = 3, u.convertPackedArrayForInterpolation = function (e, t, r, n) {
      u.unpack(e, 4 * r, T), u.conjugate(T, T);

      for (var i = 0, a = r - t + 1; i < a; i++) {
        var o = 3 * i;
        u.unpack(e, 4 * (t + i), y), u.multiply(y, T, y), y.w < 0 && u.negate(y, y), u.computeAxis(y, m);
        var s = u.computeAngle(y);
        n[o] = m.x * s, n[o + 1] = m.y * s, n[o + 2] = m.z * s;
      }
    }, u.unpackInterpolationResult = function (t, r, i, a, o) {
      n(o) || (o = new u()), e.fromArray(t, 0, _);
      var s = e.magnitude(_);
      return u.unpack(r, 4 * a, R), 0 === s ? u.clone(u.IDENTITY, y) : u.fromAxisAngle(_, s, y), u.multiply(y, R, o);
    }, u.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new u(e.x, e.y, e.z, e.w);
    }, u.conjugate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = e.w, t;
    }, u.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }, u.magnitude = function (e) {
      return Math.sqrt(u.magnitudeSquared(e));
    }, u.normalize = function (e, t) {
      var r = 1 / u.magnitude(e),
          n = e.x * r,
          i = e.y * r,
          a = e.z * r,
          o = e.w * r;
      return t.x = n, t.y = i, t.z = a, t.w = o, t;
    }, u.inverse = function (e, t) {
      var r = u.magnitudeSquared(e);
      return t = u.conjugate(e, t), u.multiplyByScalar(t, 1 / r, t);
    }, u.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r.w = e.w + t.w, r;
    }, u.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r.w = e.w - t.w, r;
    }, u.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
    }, u.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }, u.multiply = function (e, t, r) {
      var n = e.x,
          i = e.y,
          a = e.z,
          o = e.w,
          s = t.x,
          u = t.y,
          c = t.z,
          l = t.w,
          f = o * s + n * l + i * c - a * u,
          h = o * u - n * c + i * l + a * s,
          d = o * c + n * u - i * s + a * l,
          E = o * l - n * s - i * u - a * c;
      return r.x = f, r.y = h, r.z = d, r.w = E, r;
    }, u.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
    }, u.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
    }, u.computeAxis = function (e, t) {
      var r = e.w;
      if (Math.abs(r - 1) < o.EPSILON6) return t.x = t.y = t.z = 0, t;
      var n = 1 / Math.sqrt(1 - r * r);
      return t.x = e.x * n, t.y = e.y * n, t.z = e.z * n, t;
    }, u.computeAngle = function (e) {
      return Math.abs(e.w - 1) < o.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    };
    var A = new u();

    u.lerp = function (e, t, r, n) {
      return A = u.multiplyByScalar(t, r, A), n = u.multiplyByScalar(e, 1 - r, n), u.add(A, n, n);
    };

    var S = new u(),
        g = new u(),
        C = new u();
    u.slerp = function (e, t, r, n) {
      var i = u.dot(e, t),
          a = t;
      if (i < 0 && (i = -i, a = S = u.negate(t, S)), 1 - i < o.EPSILON6) return u.lerp(e, a, r, n);
      var s = Math.acos(i);
      return g = u.multiplyByScalar(e, Math.sin((1 - r) * s), g), C = u.multiplyByScalar(a, Math.sin(r * s), C), n = u.add(g, C, n), u.multiplyByScalar(n, 1 / Math.sin(s), n);
    }, u.log = function (t, r) {
      var n = o.acosClamped(t.w),
          i = 0;
      return 0 !== n && (i = n / Math.sin(n)), e.multiplyByScalar(t, i, r);
    }, u.exp = function (t, r) {
      var n = e.magnitude(t),
          i = 0;
      return 0 !== n && (i = Math.sin(n) / n), r.x = t.x * i, r.y = t.y * i, r.z = t.z * i, r.w = Math.cos(n), r;
    };
    var v = new e(),
        I = new e(),
        O = new u(),
        N = new u();
    u.computeInnerQuadrangle = function (t, r, n, i) {
      var a = u.conjugate(r, O);
      u.multiply(a, n, N);
      var o = u.log(N, v);
      u.multiply(a, t, N);
      var s = u.log(N, I);
      return e.add(o, s, o), e.multiplyByScalar(o, .25, o), e.negate(o, o), u.exp(o, O), u.multiply(r, O, i);
    }, u.squad = function (e, t, r, n, i, a) {
      var o = u.slerp(e, t, i, O),
          s = u.slerp(r, n, i, N);
      return u.slerp(o, s, 2 * i * (1 - i), a);
    };

    for (var M = new u(), w = 1.9011074535173003, P = i.supportsTypedArrays() ? new Float32Array(8) : [], D = i.supportsTypedArrays() ? new Float32Array(8) : [], U = i.supportsTypedArrays() ? new Float32Array(8) : [], F = i.supportsTypedArrays() ? new Float32Array(8) : [], x = 0; x < 7; ++x) {
      var L = x + 1,
          B = 2 * L + 1;
      P[x] = 1 / (L * B), D[x] = L / B;
    }

    return P[7] = w / 136, D[7] = 8 * w / 17, u.fastSlerp = function (e, t, r, n) {
      var i,
          a = u.dot(e, t);
      a >= 0 ? i = 1 : (i = -1, a = -a);

      for (var o = a - 1, s = 1 - r, c = r * r, l = s * s, f = 7; f >= 0; --f) {
        U[f] = (P[f] * c - D[f]) * o, F[f] = (P[f] * l - D[f]) * o;
      }

      var h = i * r * (1 + U[0] * (1 + U[1] * (1 + U[2] * (1 + U[3] * (1 + U[4] * (1 + U[5] * (1 + U[6] * (1 + U[7])))))))),
          d = s * (1 + F[0] * (1 + F[1] * (1 + F[2] * (1 + F[3] * (1 + F[4] * (1 + F[5] * (1 + F[6] * (1 + F[7])))))))),
          E = u.multiplyByScalar(e, d, M);
      return u.multiplyByScalar(t, h, n), u.add(E, n, n);
    }, u.fastSquad = function (e, t, r, n, i, a) {
      var o = u.fastSlerp(e, t, i, O),
          s = u.fastSlerp(r, n, i, N);
      return u.fastSlerp(o, s, 2 * i * (1 - i), a);
    }, u.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, u.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.x - t.x) <= r && Math.abs(e.y - t.y) <= r && Math.abs(e.z - t.z) <= r && Math.abs(e.w - t.w) <= r;
    }, u.ZERO = a(new u(0, 0, 0, 0)), u.IDENTITY = a(new u(0, 0, 0, 1)), u.prototype.clone = function (e) {
      return u.clone(this, e);
    }, u.prototype.equals = function (e) {
      return u.equals(this, e);
    }, u.prototype.equalsEpsilon = function (e, t) {
      return u.equalsEpsilon(this, e, t);
    }, u.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    }, u;
  }), define("Core/binarySearch", ["./Check"], function (e) {
    "use strict";

    function t(e, t, r) {
      for (var n, i, a = 0, o = e.length - 1; a <= o;) {
        if (n = ~~((a + o) / 2), (i = r(e[n], t)) < 0) a = n + 1;else {
          if (!(i > 0)) return n;
          o = n - 1;
        }
      }

      return ~(o + 1);
    }

    return t;
  }), define("Core/EarthOrientationParametersSample", [], function () {
    "use strict";

    function e(e, t, r, n, i) {
      this.xPoleWander = e, this.yPoleWander = t, this.xPoleOffset = r, this.yPoleOffset = n, this.ut1MinusUtc = i;
    }

    return e;
  }), define("ThirdParty/sprintf", [], function () {
    function e() {
      var e = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
          t = arguments,
          r = 0,
          n = t[r++],
          i = function i(e, t, r, n) {
        r || (r = " ");
        var i = e.length >= t ? "" : Array(1 + t - e.length >>> 0).join(r);
        return n ? e + i : i + e;
      },
          a = function a(e, t, r, n, _a, o) {
        var s = n - e.length;
        return s > 0 && (e = r || !_a ? i(e, n, o, r) : e.slice(0, t.length) + i("", s, "0", !0) + e.slice(t.length)), e;
      },
          o = function o(e, t, r, n, _o, s, u) {
        var c = e >>> 0;
        return r = r && c && {
          2: "0b",
          8: "0",
          16: "0x"
        }[t] || "", e = r + i(c.toString(t), s || 0, "0", !1), a(e, r, n, _o, u);
      },
          s = function s(e, t, r, n, i, o) {
        return null != n && (e = e.slice(0, n)), a(e, "", t, r, i, o);
      },
          u = function u(e, n, _u, c, l, f, h) {
        var d, E, p, m, _;

        if ("%%" == e) return "%";

        for (var y = !1, R = "", T = !1, A = !1, S = " ", g = _u.length, C = 0; _u && C < g; C++) {
          switch (_u.charAt(C)) {
            case " ":
              R = " ";
              break;

            case "+":
              R = "+";
              break;

            case "-":
              y = !0;
              break;

            case "'":
              S = _u.charAt(C + 1);
              break;

            case "0":
              T = !0;
              break;

            case "#":
              A = !0;
          }
        }

        if (c = c ? "*" == c ? +t[r++] : "*" == c.charAt(0) ? +t[c.slice(1, -1)] : +c : 0, c < 0 && (c = -c, y = !0), !isFinite(c)) throw new Error("sprintf: (minimum-)width must be finite");

        switch (f = f ? "*" == f ? +t[r++] : "*" == f.charAt(0) ? +t[f.slice(1, -1)] : +f : "fFeE".indexOf(h) > -1 ? 6 : "d" == h ? 0 : void 0, _ = n ? t[n.slice(0, -1)] : t[r++], h) {
          case "s":
            return s(String(_), y, c, f, T, S);

          case "c":
            return s(String.fromCharCode(+_), y, c, f, T);

          case "b":
            return o(_, 2, A, y, c, f, T);

          case "o":
            return o(_, 8, A, y, c, f, T);

          case "x":
            return o(_, 16, A, y, c, f, T);

          case "X":
            return o(_, 16, A, y, c, f, T).toUpperCase();

          case "u":
            return o(_, 10, A, y, c, f, T);

          case "i":
          case "d":
            return d = +_ || 0, d = Math.round(d - d % 1), E = d < 0 ? "-" : R, _ = E + i(String(Math.abs(d)), f, "0", !1), a(_, E, y, c, T);

          case "e":
          case "E":
          case "f":
          case "F":
          case "g":
          case "G":
            return d = +_, E = d < 0 ? "-" : R, p = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(h.toLowerCase())], m = ["toString", "toUpperCase"]["eEfFgG".indexOf(h) % 2], _ = E + Math.abs(d)[p](f), a(_, E, y, c, T)[m]();

          default:
            return e;
        }
      };

      return n.replace(e, u);
    }

    return e;
  }), define("Core/GregorianDate", [], function () {
    "use strict";

    function e(e, t, r, n, i, a, o, s) {
      this.year = e, this.month = t, this.day = r, this.hour = n, this.minute = i, this.second = a, this.millisecond = o, this.isLeapSecond = s;
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
  }), define("Core/JulianDate", ["../ThirdParty/sprintf", "./binarySearch", "./defaultValue", "./defined", "./DeveloperError", "./GregorianDate", "./isLeapYear", "./LeapSecond", "./TimeConstants", "./TimeStandard"], function (e, t, r, n, i, a, o, s, u, c) {
    "use strict";

    function l(e, t) {
      return p.compare(e.julianDate, t.julianDate);
    }

    function f(e) {
      y.julianDate = e;
      var r = p.leapSeconds,
          n = t(r, y, l);
      n < 0 && (n = ~n), n >= r.length && (n = r.length - 1);
      var i = r[n].offset;

      if (n > 0) {
        p.secondsDifference(r[n].julianDate, e) > i && (n--, i = r[n].offset);
      }

      p.addSeconds(e, i, e);
    }

    function h(e, r) {
      y.julianDate = e;
      var n = p.leapSeconds,
          i = t(n, y, l);
      if (i < 0 && (i = ~i), 0 === i) return p.addSeconds(e, -n[0].offset, r);
      if (i >= n.length) return p.addSeconds(e, -n[i - 1].offset, r);
      var a = p.secondsDifference(n[i].julianDate, e);
      return 0 === a ? p.addSeconds(e, -n[i].offset, r) : a <= 1 ? void 0 : p.addSeconds(e, -n[--i].offset, r);
    }

    function d(e, t, r) {
      var n = t / u.SECONDS_PER_DAY | 0;
      return e += n, t -= u.SECONDS_PER_DAY * n, t < 0 && (e--, t += u.SECONDS_PER_DAY), r.dayNumber = e, r.secondsOfDay = t, r;
    }

    function E(e, t, r, n, i, a, o) {
      var s = (t - 14) / 12 | 0,
          c = e + 4800 + s,
          l = (1461 * c / 4 | 0) + (367 * (t - 2 - 12 * s) / 12 | 0) - (3 * ((c + 100) / 100 | 0) / 4 | 0) + r - 32075;
      (n -= 12) < 0 && (n += 24);
      var f = a + (n * u.SECONDS_PER_HOUR + i * u.SECONDS_PER_MINUTE + o * u.SECONDS_PER_MILLISECOND);
      return f >= 43200 && (l -= 1), [l, f];
    }

    function p(e, t, n) {
      this.dayNumber = void 0, this.secondsOfDay = void 0, e = r(e, 0), t = r(t, 0), n = r(n, c.UTC);
      var i = 0 | e;
      t += (e - i) * u.SECONDS_PER_DAY, d(i, t, this), n === c.UTC && f(this);
    }

    var m = new a(),
        _ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        y = new s(),
        R = /^(\d{4})$/,
        T = /^(\d{4})-(\d{2})$/,
        A = /^(\d{4})-?(\d{3})$/,
        S = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
        g = /^(\d{4})-?(\d{2})-?(\d{2})$/,
        C = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
        v = /^(\d{2})(\.\d+)?/.source + C.source,
        I = /^(\d{2}):?(\d{2})(\.\d+)?/.source + C.source,
        O = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + C.source;
    p.fromGregorianDate = function (e, t) {
      var r = E(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
      return n(t) ? (d(r[0], r[1], t), f(t), t) : new p(r[0], r[1], c.UTC);
    }, p.fromDate = function (e, t) {
      var r = E(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
      return n(t) ? (d(r[0], r[1], t), f(t), t) : new p(r[0], r[1], c.UTC);
    }, p.fromIso8601 = function (e, t) {
      e = e.replace(",", ".");
      var r,
          i,
          a,
          s = e.split("T"),
          u = 1,
          l = 1,
          h = 0,
          m = 0,
          y = 0,
          C = 0,
          N = s[0],
          M = s[1];
      if (null !== (s = N.match(g))) r = +s[1], u = +s[2], l = +s[3];else if (null !== (s = N.match(T))) r = +s[1], u = +s[2];else if (null !== (s = N.match(R))) r = +s[1];else {
        var w;
        if (null !== (s = N.match(A))) r = +s[1], w = +s[2], a = o(r);else if (null !== (s = N.match(S))) {
          r = +s[1];
          var P = +s[2],
              D = +s[3] || 0,
              U = new Date(Date.UTC(r, 0, 4));
          w = 7 * P + D - U.getUTCDay() - 3;
        }
        i = new Date(Date.UTC(r, 0, 1)), i.setUTCDate(w), u = i.getUTCMonth() + 1, l = i.getUTCDate();
      }
      a = o(r);
      var F;

      if (n(M)) {
        s = M.match(O), null !== s ? (h = +s[1], m = +s[2], y = +s[3], C = 1e3 * +(s[4] || 0), F = 5) : (s = M.match(I), null !== s ? (h = +s[1], m = +s[2], y = 60 * +(s[3] || 0), F = 4) : null !== (s = M.match(v)) && (h = +s[1], m = 60 * +(s[2] || 0), F = 3));
        var x = s[F],
            L = +s[F + 1],
            B = +(s[F + 2] || 0);

        switch (x) {
          case "+":
            h -= L, m -= B;
            break;

          case "-":
            h += L, m += B;
            break;

          case "Z":
            break;

          default:
            m += new Date(Date.UTC(r, u - 1, l, h, m)).getTimezoneOffset();
        }
      }

      var b = 60 === y;

      for (b && y--; m >= 60;) {
        m -= 60, h++;
      }

      for (; h >= 24;) {
        h -= 24, l++;
      }

      for (i = a && 2 === u ? 29 : _[u - 1]; l > i;) {
        l -= i, u++, u > 12 && (u -= 12, r++), i = a && 2 === u ? 29 : _[u - 1];
      }

      for (; m < 0;) {
        m += 60, h--;
      }

      for (; h < 0;) {
        h += 24, l--;
      }

      for (; l < 1;) {
        u--, u < 1 && (u += 12, r--), i = a && 2 === u ? 29 : _[u - 1], l += i;
      }

      var q = E(r, u, l, h, m, y, C);
      return n(t) ? (d(q[0], q[1], t), f(t)) : t = new p(q[0], q[1], c.UTC), b && p.addSeconds(t, 1, t), t;
    }, p.now = function (e) {
      return p.fromDate(new Date(), e);
    };
    var N = new p(0, 0, c.TAI);
    return p.toGregorianDate = function (e, t) {
      var r = !1,
          i = h(e, N);
      n(i) || (p.addSeconds(e, -1, N), i = h(N, N), r = !0);
      var o = i.dayNumber,
          s = i.secondsOfDay;
      s >= 43200 && (o += 1);
      var c = o + 68569 | 0,
          l = 4 * c / 146097 | 0;
      c = c - ((146097 * l + 3) / 4 | 0) | 0;
      var f = 4e3 * (c + 1) / 1461001 | 0;
      c = c - (1461 * f / 4 | 0) + 31 | 0;
      var d = 80 * c / 2447 | 0,
          E = c - (2447 * d / 80 | 0) | 0;
      c = d / 11 | 0;

      var m = d + 2 - 12 * c | 0,
          _ = 100 * (l - 49) + f + c | 0,
          y = s / u.SECONDS_PER_HOUR | 0,
          R = s - y * u.SECONDS_PER_HOUR,
          T = R / u.SECONDS_PER_MINUTE | 0;

      R -= T * u.SECONDS_PER_MINUTE;
      var A = 0 | R,
          S = (R - A) / u.SECONDS_PER_MILLISECOND;
      return y += 12, y > 23 && (y -= 24), r && (A += 1), n(t) ? (t.year = _, t.month = m, t.day = E, t.hour = y, t.minute = T, t.second = A, t.millisecond = S, t.isLeapSecond = r, t) : new a(_, m, E, y, T, A, S, r);
    }, p.toDate = function (e) {
      var t = p.toGregorianDate(e, m),
          r = t.second;
      return t.isLeapSecond && (r -= 1), new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, r, t.millisecond));
    }, p.toIso8601 = function (t, r) {
      var i = p.toGregorianDate(t, m),
          a = i.year,
          o = i.month,
          s = i.day,
          u = i.hour,
          c = i.minute,
          l = i.second,
          f = i.millisecond;
      1e4 === a && 1 === o && 1 === s && 0 === u && 0 === c && 0 === l && 0 === f && (a = 9999, o = 12, s = 31, u = 24);
      var h;
      return n(r) || 0 === f ? n(r) && 0 !== r ? (h = (.01 * f).toFixed(r).replace(".", "").slice(0, r), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", a, o, s, u, c, l, h)) : e("%04d-%02d-%02dT%02d:%02d:%02dZ", a, o, s, u, c, l) : (h = (.01 * f).toString().replace(".", ""), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", a, o, s, u, c, l, h));
    }, p.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.dayNumber = e.dayNumber, t.secondsOfDay = e.secondsOfDay, t) : new p(e.dayNumber, e.secondsOfDay, c.TAI);
    }, p.compare = function (e, t) {
      var r = e.dayNumber - t.dayNumber;
      return 0 !== r ? r : e.secondsOfDay - t.secondsOfDay;
    }, p.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
    }, p.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(p.secondsDifference(e, t)) <= r;
    }, p.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / u.SECONDS_PER_DAY;
    }, p.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * u.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
    }, p.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / u.SECONDS_PER_DAY;
    }, p.computeTaiMinusUtc = function (e) {
      y.julianDate = e;
      var r = p.leapSeconds,
          n = t(r, y, l);
      return n < 0 && (n = ~n, --n < 0 && (n = 0)), r[n].offset;
    }, p.addSeconds = function (e, t, r) {
      return d(e.dayNumber, e.secondsOfDay + t, r);
    }, p.addMinutes = function (e, t, r) {
      var n = e.secondsOfDay + t * u.SECONDS_PER_MINUTE;
      return d(e.dayNumber, n, r);
    }, p.addHours = function (e, t, r) {
      var n = e.secondsOfDay + t * u.SECONDS_PER_HOUR;
      return d(e.dayNumber, n, r);
    }, p.addDays = function (e, t, r) {
      return d(e.dayNumber + t, e.secondsOfDay, r);
    }, p.lessThan = function (e, t) {
      return p.compare(e, t) < 0;
    }, p.lessThanOrEquals = function (e, t) {
      return p.compare(e, t) <= 0;
    }, p.greaterThan = function (e, t) {
      return p.compare(e, t) > 0;
    }, p.greaterThanOrEquals = function (e, t) {
      return p.compare(e, t) >= 0;
    }, p.prototype.clone = function (e) {
      return p.clone(this, e);
    }, p.prototype.equals = function (e) {
      return p.equals(this, e);
    }, p.prototype.equalsEpsilon = function (e, t) {
      return p.equalsEpsilon(this, e, t);
    }, p.prototype.toString = function () {
      return p.toIso8601(this);
    }, p.leapSeconds = [new s(new p(2441317, 43210, c.TAI), 10), new s(new p(2441499, 43211, c.TAI), 11), new s(new p(2441683, 43212, c.TAI), 12), new s(new p(2442048, 43213, c.TAI), 13), new s(new p(2442413, 43214, c.TAI), 14), new s(new p(2442778, 43215, c.TAI), 15), new s(new p(2443144, 43216, c.TAI), 16), new s(new p(2443509, 43217, c.TAI), 17), new s(new p(2443874, 43218, c.TAI), 18), new s(new p(2444239, 43219, c.TAI), 19), new s(new p(2444786, 43220, c.TAI), 20), new s(new p(2445151, 43221, c.TAI), 21), new s(new p(2445516, 43222, c.TAI), 22), new s(new p(2446247, 43223, c.TAI), 23), new s(new p(2447161, 43224, c.TAI), 24), new s(new p(2447892, 43225, c.TAI), 25), new s(new p(2448257, 43226, c.TAI), 26), new s(new p(2448804, 43227, c.TAI), 27), new s(new p(2449169, 43228, c.TAI), 28), new s(new p(2449534, 43229, c.TAI), 29), new s(new p(2450083, 43230, c.TAI), 30), new s(new p(2450630, 43231, c.TAI), 31), new s(new p(2451179, 43232, c.TAI), 32), new s(new p(2453736, 43233, c.TAI), 33), new s(new p(2454832, 43234, c.TAI), 34), new s(new p(2456109, 43235, c.TAI), 35), new s(new p(2457204, 43236, c.TAI), 36), new s(new p(2457754, 43237, c.TAI), 37)], p;
  }), define("ThirdParty/Uri", [], function () {
    function e(t) {
      if (t instanceof e) this.scheme = t.scheme, this.authority = t.authority, this.path = t.path, this.query = t.query, this.fragment = t.fragment;else if (t) {
        var r = n.exec(t);
        this.scheme = r[1], this.authority = r[2], this.path = r[3], this.query = r[4], this.fragment = r[5];
      }
    }

    function t(e) {
      var t = unescape(e);
      return a.test(t) ? t : e.toUpperCase();
    }

    function r(e, t, r, n) {
      return (t || "") + r.toLowerCase() + (n || "");
    }

    e.prototype.scheme = null, e.prototype.authority = null, e.prototype.path = "", e.prototype.query = null, e.prototype.fragment = null;
    var n = new RegExp("^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$");
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
      this.removeDotSegments(), this.scheme && (this.scheme = this.scheme.toLowerCase()), this.authority && (this.authority = this.authority.replace(o, r).replace(i, t)), this.path && (this.path = this.path.replace(i, t)), this.query && (this.query = this.query.replace(i, t)), this.fragment && (this.fragment = this.fragment.replace(i, t));
    };
    var i = /%[0-9a-z]{2}/gi,
        a = /[a-zA-Z0-9\-\._~]/,
        o = /(.*@)?([^@:]*)(:.*)?/;
    return e.prototype.resolve = function (t) {
      var r = new e();
      return this.scheme ? (r.scheme = this.scheme, r.authority = this.authority, r.path = this.path, r.query = this.query) : (r.scheme = t.scheme, this.authority ? (r.authority = this.authority, r.path = this.path, r.query = this.query) : (r.authority = t.authority, "" == this.path ? (r.path = t.path, r.query = this.query || t.query) : ("/" == this.path.charAt(0) ? (r.path = this.path, r.removeDotSegments()) : (t.authority && "" == t.path ? r.path = "/" + this.path : r.path = t.path.substring(0, t.path.lastIndexOf("/") + 1) + this.path, r.removeDotSegments()), r.query = this.query))), r.fragment = this.fragment, r;
    }, e.prototype.removeDotSegments = function () {
      var e,
          t = this.path.split("/"),
          r = [],
          n = "" == t[0];
      n && t.shift();

      for ("" == t[0] && t.shift(); t.length;) {
        e = t.shift(), ".." == e ? r.pop() : "." != e && r.push(e);
      }

      "." != e && ".." != e || r.push(""), n && r.unshift(""), this.path = r.join("/");
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

    function t(r, n) {
      if (null === r || "object" != _typeof(r)) return r;
      n = e(n, !1);
      var i = new r.constructor();

      for (var a in r) {
        if (r.hasOwnProperty(a)) {
          var o = r[a];
          n && (o = t(o, n)), i[a] = o;
        }
      }

      return i;
    }

    return t;
  }), define("Core/combine", ["./defaultValue", "./defined"], function (e, t) {
    "use strict";

    function r(n, i, a) {
      a = e(a, !1);
      var o,
          s,
          u,
          c = {},
          l = t(n),
          f = t(i);
      if (l) for (o in n) {
        n.hasOwnProperty(o) && (s = n[o], f && a && "object" == _typeof(s) && i.hasOwnProperty(o) ? (u = i[o], c[o] = "object" == _typeof(u) ? r(s, u, a) : s) : c[o] = s);
      }
      if (f) for (o in i) {
        i.hasOwnProperty(o) && !c.hasOwnProperty(o) && (u = i[o], c[o] = u);
      }
      return c;
    }

    return r;
  }), define("Core/getAbsoluteUri", ["../ThirdParty/Uri", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, r, n) {
    "use strict";

    function i(e, t) {
      var r;
      return "undefined" != typeof document && (r = document), i._implementation(e, t, r);
    }

    return i._implementation = function (n, i, a) {
      if (!r(i)) {
        if (void 0 === a) return n;
        i = t(a.baseURI, a.location.href);
      }

      var o = new e(i);
      return new e(n).resolve(o).toString();
    }, i;
  }), define("Core/getBaseUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(r, n) {
      var i = "",
          a = r.lastIndexOf("/");
      return -1 !== a && (i = r.substring(0, a + 1)), n ? (r = new e(r), t(r.query) && (i += "?" + r.query), t(r.fragment) && (i += "#" + r.fragment), i) : i;
    }

    return n;
  }), define("Core/getExtensionFromUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(t) {
      var r = new e(t);
      r.normalize();
      var n = r.path,
          i = n.lastIndexOf("/");
      return -1 !== i && (n = n.substr(i + 1)), i = n.lastIndexOf("."), n = -1 === i ? "" : n.substr(i + 1);
    }

    return n;
  }), define("Core/isBlobUri", ["./Check"], function (e) {
    "use strict";

    function t(e) {
      return r.test(e);
    }

    var r = /^blob:/i;
    return t;
  }), define("Core/isCrossOriginUrl", ["./defined"], function (e) {
    "use strict";

    function t(t) {
      e(r) || (r = document.createElement("a")), r.href = window.location.href;
      var n = r.host,
          i = r.protocol;
      return r.href = t, r.href = r.href, i !== r.protocol || n !== r.host;
    }

    var r;
    return t;
  }), define("Core/isDataUri", ["./Check"], function (e) {
    "use strict";

    function t(e) {
      return r.test(e);
    }

    var r = /^data:/i;
    return t;
  }), define("Core/loadAndExecuteScript", ["../ThirdParty/when"], function (e) {
    "use strict";

    function t(t) {
      var r = e.defer(),
          n = document.createElement("script");
      n.async = !0, n.src = t;
      var i = document.getElementsByTagName("head")[0];
      return n.onload = function () {
        n.onload = void 0, i.removeChild(n), r.resolve();
      }, n.onerror = function (e) {
        r.reject(e);
      }, i.appendChild(n), r.promise;
    }

    return t;
  }), define("Core/isArray", ["./defined"], function (e) {
    "use strict";

    var t = Array.isArray;
    return e(t) || (t = function t(e) {
      return "[object Array]" === Object.prototype.toString.call(e);
    }), t;
  }), define("Core/objectToQuery", ["./defined", "./DeveloperError", "./isArray"], function (e, t, r) {
    "use strict";

    function n(e) {
      var t = "";

      for (var n in e) {
        if (e.hasOwnProperty(n)) {
          var i = e[n],
              a = encodeURIComponent(n) + "=";
          if (r(i)) for (var o = 0, s = i.length; o < s; ++o) {
            t += a + encodeURIComponent(i[o]) + "&";
          } else t += a + encodeURIComponent(i) + "&";
        }
      }

      return t = t.slice(0, -1);
    }

    return n;
  }), define("Core/queryToObject", ["./defined", "./DeveloperError", "./isArray"], function (e, t, r) {
    "use strict";

    function n(t) {
      var n = {};
      if ("" === t) return n;

      for (var i = t.replace(/\+/g, "%20").split(/[&;]/), a = 0, o = i.length; a < o; ++a) {
        var s = i[a].split("="),
            u = decodeURIComponent(s[0]),
            c = s[1];
        c = e(c) ? decodeURIComponent(c) : "";
        var l = n[u];
        "string" == typeof l ? n[u] = [l, c] : r(l) ? l.push(c) : n[u] = c;
      }

      return n;
    }

    return n;
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
  }), define("Core/Request", ["./defaultValue", "./defined", "./RequestState", "./RequestType"], function (e, t, r, n) {
    "use strict";

    function i(t) {
      t = e(t, e.EMPTY_OBJECT);
      var i = e(t.throttleByServer, !1),
          a = e(t.throttle, !1);
      this.url = t.url, this.requestFunction = t.requestFunction, this.cancelFunction = t.cancelFunction, this.priorityFunction = t.priorityFunction, this.priority = e(t.priority, 0), this.throttle = a, this.throttleByServer = i, this.type = e(t.type, n.OTHER), this.serverKey = void 0, this.state = r.UNISSUED, this.deferred = void 0, this.cancelled = !1;
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

      for (var r = e.split("\r\n"), n = 0; n < r.length; ++n) {
        var i = r[n],
            a = i.indexOf(": ");

        if (a > 0) {
          var o = i.substring(0, a),
              s = i.substring(a + 2);
          t[o] = s;
        }
      }

      return t;
    }

    return e;
  }), define("Core/RequestErrorEvent", ["./defined", "./parseResponseHeaders"], function (e, t) {
    "use strict";

    function r(e, r, n) {
      this.statusCode = e, this.response = r, this.responseHeaders = n, "string" == typeof this.responseHeaders && (this.responseHeaders = t(this.responseHeaders));
    }

    return r.prototype.toString = function () {
      var t = "Request has failed.";
      return e(this.statusCode) && (t += " Status Code: " + this.statusCode), t;
    }, r;
  }), define("Core/Event", ["./Check", "./defined", "./defineProperties"], function (e, t, r) {
    "use strict";

    function n() {
      this._listeners = [], this._scopes = [], this._toRemove = [], this._insideRaiseEvent = !1;
    }

    function i(e, t) {
      return t - e;
    }

    return r(n.prototype, {
      numberOfListeners: {
        get: function get() {
          return this._listeners.length - this._toRemove.length;
        }
      }
    }), n.prototype.addEventListener = function (e, t) {
      this._listeners.push(e), this._scopes.push(t);
      var r = this;
      return function () {
        r.removeEventListener(e, t);
      };
    }, n.prototype.removeEventListener = function (e, t) {
      for (var r = this._listeners, n = this._scopes, i = -1, a = 0; a < r.length; a++) {
        if (r[a] === e && n[a] === t) {
          i = a;
          break;
        }
      }

      return -1 !== i && (this._insideRaiseEvent ? (this._toRemove.push(i), r[i] = void 0, n[i] = void 0) : (r.splice(i, 1), n.splice(i, 1)), !0);
    }, n.prototype.raiseEvent = function () {
      this._insideRaiseEvent = !0;
      var e,
          r = this._listeners,
          n = this._scopes,
          a = r.length;

      for (e = 0; e < a; e++) {
        var o = r[e];
        t(o) && r[e].apply(n[e], arguments);
      }

      var s = this._toRemove;

      if ((a = s.length) > 0) {
        for (s.sort(i), e = 0; e < a; e++) {
          var u = s[e];
          r.splice(u, 1), n.splice(u, 1);
        }

        s.length = 0;
      }

      this._insideRaiseEvent = !1;
    }, n;
  }), define("Core/Heap", ["./Check", "./defaultValue", "./defined", "./defineProperties"], function (e, t, r, n) {
    "use strict";

    function i(e) {
      this._comparator = e.comparator, this._array = [], this._length = 0, this._maximumLength = void 0;
    }

    function a(e, t, r) {
      var n = e[t];
      e[t] = e[r], e[r] = n;
    }

    return n(i.prototype, {
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

      for (var r = this._length, n = this._comparator, i = this._array, o = -1, s = !0; s;) {
        var u = 2 * (e + 1),
            c = u - 1;
        o = c < r && n(i[c], i[e]) < 0 ? c : e, u < r && n(i[u], i[o]) < 0 && (o = u), o !== e ? (a(i, o, e), e = o) : s = !1;
      }
    }, i.prototype.resort = function () {
      for (var e = this._length, t = Math.ceil(e / 2); t >= 0; --t) {
        this.heapify(t);
      }
    }, i.prototype.insert = function (e) {
      var t = this._array,
          n = this._comparator,
          i = this._maximumLength,
          o = this._length++;

      for (o < t.length ? t[o] = e : t.push(e); 0 !== o;) {
        var s = Math.floor((o - 1) / 2);
        if (!(n(t[o], t[s]) < 0)) break;
        a(t, o, s), o = s;
      }

      var u;
      return r(i) && this._length > i && (u = t[i], this._length = i), u;
    }, i.prototype.pop = function (e) {
      if (e = t(e, 0), 0 !== this._length) {
        var r = this._array,
            n = r[e];
        return a(r, e, --this._length), this.heapify(e), n;
      }
    }, i;
  }), define("Core/RequestScheduler", ["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Event", "./Heap", "./isBlobUri", "./isDataUri", "./RequestState"], function (e, t, r, n, i, a, o, s, u, c, l) {
    "use strict";

    function f(e, t) {
      return e.priority - t.priority;
    }

    function h() {}

    function d(e) {
      i(e.priorityFunction) && (e.priority = e.priorityFunction());
    }

    function E(e) {
      var t = n(h.requestsByServer[e], h.maximumRequestsPerServer);
      return v[e] < t;
    }

    function p(e) {
      return e.state === l.UNISSUED && (e.state = l.ISSUED, e.deferred = t.defer()), e.deferred.promise;
    }

    function m(e) {
      return function (t) {
        e.state !== l.CANCELLED && (--A.numberOfActiveRequests, --v[e.serverKey], O.raiseEvent(), e.state = l.RECEIVED, e.deferred.resolve(t));
      };
    }

    function _(e) {
      return function (t) {
        e.state !== l.CANCELLED && (++A.numberOfFailedRequests, --A.numberOfActiveRequests, --v[e.serverKey], O.raiseEvent(t), e.state = l.FAILED, e.deferred.reject(t));
      };
    }

    function y(e) {
      var t = p(e);
      return e.state = l.ACTIVE, C.push(e), ++A.numberOfActiveRequests, ++A.numberOfActiveRequestsEver, ++v[e.serverKey], e.requestFunction().then(m(e)).otherwise(_(e)), t;
    }

    function R(e) {
      var t = e.state === l.ACTIVE;
      e.state = l.CANCELLED, ++A.numberOfCancelledRequests, e.deferred.reject(), t && (--A.numberOfActiveRequests, --v[e.serverKey], ++A.numberOfCancelledActiveRequests), i(e.cancelFunction) && e.cancelFunction();
    }

    function T() {
      h.debugShowStatistics && (0 === A.numberOfActiveRequests && A.lastNumberOfActiveRequests > 0 && (A.numberOfAttemptedRequests > 0 && (console.log("Number of attempted requests: " + A.numberOfAttemptedRequests), A.numberOfAttemptedRequests = 0), A.numberOfCancelledRequests > 0 && (console.log("Number of cancelled requests: " + A.numberOfCancelledRequests), A.numberOfCancelledRequests = 0), A.numberOfCancelledActiveRequests > 0 && (console.log("Number of cancelled active requests: " + A.numberOfCancelledActiveRequests), A.numberOfCancelledActiveRequests = 0), A.numberOfFailedRequests > 0 && (console.log("Number of failed requests: " + A.numberOfFailedRequests), A.numberOfFailedRequests = 0)), A.lastNumberOfActiveRequests = A.numberOfActiveRequests);
    }

    var A = {
      numberOfAttemptedRequests: 0,
      numberOfActiveRequests: 0,
      numberOfCancelledRequests: 0,
      numberOfCancelledActiveRequests: 0,
      numberOfFailedRequests: 0,
      numberOfActiveRequestsEver: 0,
      lastNumberOfActiveRequests: 0
    },
        S = 20,
        g = new s({
      comparator: f
    });
    g.maximumLength = S, g.reserve(S);
    var C = [],
        v = {},
        I = "undefined" != typeof document ? new e(document.location.href) : new e(),
        O = new o();
    return h.maximumRequests = 50, h.maximumRequestsPerServer = 6, h.requestsByServer = {
      "api.pgEarth.com:443": 18,
      "assets.pgEarth.com:443": 18
    }, h.throttleRequests = !0, h.debugShowStatistics = !1, h.requestCompletedEvent = O, a(h, {
      statistics: {
        get: function get() {
          return A;
        }
      },
      priorityHeapLength: {
        get: function get() {
          return S;
        },
        set: function set(e) {
          if (e < S) for (; g.length > e;) {
            var t = g.pop();
            R(t);
          }
          S = e, g.maximumLength = e, g.reserve(e);
        }
      }
    }), h.update = function () {
      var e,
          t,
          r = 0,
          n = C.length;

      for (e = 0; e < n; ++e) {
        t = C[e], t.cancelled && R(t), t.state === l.ACTIVE ? r > 0 && (C[e - r] = t) : ++r;
      }

      C.length -= r;
      var i = g.internalArray,
          a = g.length;

      for (e = 0; e < a; ++e) {
        d(i[e]);
      }

      g.resort();

      for (var o = Math.max(h.maximumRequests - C.length, 0), s = 0; s < o && g.length > 0;) {
        t = g.pop(), t.cancelled ? R(t) : !t.throttleByServer || E(t.serverKey) ? (y(t), ++s) : R(t);
      }

      T();
    }, h.getServerKey = function (t) {
      var r = new e(t).resolve(I);
      r.normalize();
      var n = r.authority;
      /:/.test(n) || (n = n + ":" + ("https" === r.scheme ? "443" : "80"));
      var a = v[n];
      return i(a) || (v[n] = 0), n;
    }, h.request = function (e) {
      if (c(e.url) || u(e.url)) return O.raiseEvent(), e.state = l.RECEIVED, e.requestFunction();

      if (++A.numberOfAttemptedRequests, i(e.serverKey) || (e.serverKey = h.getServerKey(e.url)), !e.throttleByServer || E(e.serverKey)) {
        if (!h.throttleRequests || !e.throttle) return y(e);

        if (!(C.length >= h.maximumRequests)) {
          d(e);
          var t = g.insert(e);

          if (i(t)) {
            if (t === e) return;
            R(t);
          }

          return p(e);
        }
      }
    }, h.clearForSpecs = function () {
      for (; g.length > 0;) {
        R(g.pop());
      }

      for (var e = C.length, t = 0; t < e; ++t) {
        R(C[t]);
      }

      C.length = 0, v = {}, A.numberOfAttemptedRequests = 0, A.numberOfActiveRequests = 0, A.numberOfCancelledRequests = 0, A.numberOfCancelledActiveRequests = 0, A.numberOfFailedRequests = 0, A.numberOfActiveRequestsEver = 0, A.lastNumberOfActiveRequests = 0;
    }, h.numberOfActiveRequestsByServer = function (e) {
      return v[e];
    }, h.requestHeap = g, h;
  }), define("Core/TrustedServers", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(r) {
      var n = new e(r);
      n.normalize();
      var i = n.getAuthority();

      if (t(i)) {
        if (-1 !== i.indexOf("@")) {
          i = i.split("@")[1];
        }

        if (-1 === i.indexOf(":")) {
          var a = n.getScheme();
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
    return i.add = function (e, r) {
      var n = e.toLowerCase() + ":" + r;
      t(a[n]) || (a[n] = !0);
    }, i.remove = function (e, r) {
      var n = e.toLowerCase() + ":" + r;
      t(a[n]) && delete a[n];
    }, i.contains = function (e) {
      var r = n(e);
      return !(!t(r) || !t(a[r]));
    }, i.clear = function () {
      a = {};
    }, i;
  }), define("Core/Resource", ["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (e, t, r, n, i, a, o, s, u, c, l, f, h, d, E, p, m, _, y, R, T, A, S, g, C, v) {
    "use strict";

    function I(e, t, r, n) {
      var i = e.query;
      if (!s(i) || 0 === i.length) return {};
      var a;

      if (-1 === i.indexOf("=")) {
        var o = {};
        o[i] = void 0, a = o;
      } else a = R(i);

      t._queryParameters = r ? w(a, t._queryParameters, n) : a, e.query = void 0;
    }

    function O(e, t) {
      var r = t._queryParameters,
          n = Object.keys(r);
      1 !== n.length || s(r[n[0]]) ? e.query = y(r) : e.query = n[0];
    }

    function N(e, t) {
      return s(e) ? s(e.clone) ? e.clone() : i(e) : t;
    }

    function M(e) {
      if (e.state === g.ISSUED || e.state === g.ACTIVE) throw new C("The Resource is already being fetched.");
      e.state = g.UNISSUED, e.deferred = void 0;
    }

    function w(e, t, r) {
      if (!r) return a(e, t);
      var n = i(e, !0);

      for (var o in t) {
        if (t.hasOwnProperty(o)) {
          var u = n[o],
              c = t[o];
          s(u) ? (Array.isArray(u) || (u = n[o] = [u]), n[o] = u.concat(c)) : n[o] = Array.isArray(c) ? c.slice() : c;
        }
      }

      return n;
    }

    function P(t) {
      t = o(t, o.EMPTY_OBJECT), "string" == typeof t && (t = {
        url: t
      }), this._url = void 0, this._templateValues = N(t.templateValues, {}), this._queryParameters = N(t.queryParameters, {}), this.headers = N(t.headers, {}), this.request = o(t.request, new T()), this.proxy = t.proxy, this.retryCallback = t.retryCallback, this.retryAttempts = o(t.retryAttempts, 0), this._retryCount = 0;
      var r = new e(t.url);
      I(r, this, !0, !0), r.fragment = void 0, this._url = r.toString();
    }

    function D(e) {
      var r = e.resource,
          n = e.flipY,
          i = e.preferImageBitmap,
          a = r.request;
      a.url = r.url, a.requestFunction = function () {
        var e = r.url,
            a = !1;
        r.isDataUri || r.isBlobUri || (a = r.isCrossOriginUrl);
        var o = t.defer();
        return P._Implementations.createImage(e, a, o, n, i), o.promise;
      };
      var o = S.request(a);
      if (s(o)) return o.otherwise(function (e) {
        return a.state !== g.FAILED ? t.reject(e) : r.retryOnError(e).then(function (o) {
          return o ? (a.state = g.UNISSUED, a.deferred = void 0, D({
            resource: r,
            flipY: n,
            preferImageBitmap: i
          })) : t.reject(e);
        });
      });
    }

    function U(e, r, n) {
      var i = {};
      i[r] = n, e.setQueryParameters(i);
      var a = e.request;
      a.url = e.url, a.requestFunction = function () {
        var r = t.defer();
        return window[n] = function (e) {
          r.resolve(e);

          try {
            delete window[n];
          } catch (e) {
            window[n] = void 0;
          }
        }, P._Implementations.loadAndExecuteScript(e.url, n, r), r.promise;
      };
      var o = S.request(a);
      if (s(o)) return o.otherwise(function (i) {
        return a.state !== g.FAILED ? t.reject(i) : e.retryOnError(i).then(function (o) {
          return o ? (a.state = g.UNISSUED, a.deferred = void 0, U(e, r, n)) : t.reject(i);
        });
      });
    }

    function F(e, t) {
      var r = decodeURIComponent(t);
      return e ? atob(r) : r;
    }

    function x(e, t) {
      for (var r = F(e, t), n = new ArrayBuffer(r.length), i = new Uint8Array(n), a = 0; a < r.length; a++) {
        i[a] = r.charCodeAt(a);
      }

      return n;
    }

    function L(e, t) {
      t = o(t, "");
      var r = e[1],
          n = !!e[2],
          i = e[3];

      switch (t) {
        case "":
        case "text":
          return F(n, i);

        case "arraybuffer":
          return x(n, i);

        case "blob":
          var a = x(n, i);
          return new Blob([a], {
            type: r
          });

        case "document":
          return new DOMParser().parseFromString(F(n, i), r);

        case "json":
          return JSON.parse(F(n, i));
      }
    }

    function B(e, t, r) {
      var n = new Image();
      n.onload = function () {
        r.resolve(n);
      }, n.onerror = function (e) {
        r.reject(e);
      }, t && (v.contains(e) ? n.crossOrigin = "use-credentials" : n.crossOrigin = ""), n.src = e;
    }

    function b(e, t) {
      switch (t) {
        case "text":
          return e.toString("utf8");

        case "json":
          return JSON.parse(e.toString("utf8"));

        default:
          return new Uint8Array(e).buffer;
      }
    }

    function q(e, t, r, n, i, a, o) {
      var s = global.require,
          u = s("url").parse(e),
          c = s("https:" === u.protocol ? "https" : "http"),
          l = s("zlib"),
          f = {
        protocol: u.protocol,
        hostname: u.hostname,
        port: u.port,
        path: u.path,
        query: u.query,
        method: r,
        headers: i
      };
      c.request(f).on("response", function (e) {
        if (e.statusCode < 200 || e.statusCode >= 300) return void a.reject(new A(e.statusCode, e, e.headers));
        var r = [];
        e.on("data", function (e) {
          r.push(e);
        }), e.on("end", function () {
          var n = Buffer.concat(r);
          "gzip" === e.headers["content-encoding"] ? l.gunzip(n, function (e, r) {
            e ? a.reject(new C("Error decompressing response.")) : a.resolve(b(r, t));
          }) : a.resolve(b(n, t));
        });
      }).on("error", function (e) {
        a.reject(new A());
      }).end();
    }

    var G = function () {
      try {
        var e = new XMLHttpRequest();
        return e.open("GET", "#", !0), e.responseType = "blob", "blob" === e.responseType;
      } catch (e) {
        return !1;
      }
    }();

    P.createIfNeeded = function (e) {
      return e instanceof P ? e.getDerivedResource({
        request: e.request
      }) : "string" != typeof e ? e : new P({
        url: e
      });
    };

    var z;
    P.supportsImageBitmapOptions = function () {
      if (s(z)) return z;
      if ("function" != typeof createImageBitmap) return z = t.resolve(!1);
      return z = P.fetchBlob({
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
    }, u(P, {
      isBlobSupported: {
        get: function get() {
          return G;
        }
      }
    }), u(P.prototype, {
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
          var r = new e(t);
          I(r, this, !1), r.fragment = void 0, this._url = r.toString();
        }
      },
      extension: {
        get: function get() {
          return d(this._url);
        }
      },
      isDataUri: {
        get: function get() {
          return m(this._url);
        }
      },
      isBlobUri: {
        get: function get() {
          return E(this._url);
        }
      },
      isCrossOriginUrl: {
        get: function get() {
          return p(this._url);
        }
      },
      hasHeaders: {
        get: function get() {
          return Object.keys(this.headers).length > 0;
        }
      }
    }), P.prototype.getUrlComponent = function (t, r) {
      if (this.isDataUri) return this._url;
      var n = new e(this._url);
      t && O(n, this);
      var i = n.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
          a = this._templateValues;
      return i = i.replace(/{(.*?)}/g, function (e, t) {
        var r = a[t];
        return s(r) ? encodeURIComponent(r) : e;
      }), r && s(this.proxy) && (i = this.proxy.getURL(i)), i;
    }, P.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t ? w(this._queryParameters, e, !1) : w(e, this._queryParameters, !1);
    }, P.prototype.appendQueryParameters = function (e) {
      this._queryParameters = w(e, this._queryParameters, !0);
    }, P.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t ? a(this._templateValues, e) : a(e, this._templateValues);
    }, P.prototype.getDerivedResource = function (t) {
      var r = this.clone();

      if (r._retryCount = 0, s(t.url)) {
        var n = new e(t.url);
        I(n, r, !0, o(t.preserveQueryParameters, !1)), n.fragment = void 0, r._url = n.resolve(new e(f(this._url))).toString();
      }

      return s(t.queryParameters) && (r._queryParameters = a(t.queryParameters, r._queryParameters)), s(t.templateValues) && (r._templateValues = a(t.templateValues, r.templateValues)), s(t.headers) && (r.headers = a(t.headers, r.headers)), s(t.proxy) && (r.proxy = t.proxy), s(t.request) && (r.request = t.request), s(t.retryCallback) && (r.retryCallback = t.retryCallback), s(t.retryAttempts) && (r.retryAttempts = t.retryAttempts), r;
    }, P.prototype.retryOnError = function (e) {
      var r = this.retryCallback;
      if ("function" != typeof r || this._retryCount >= this.retryAttempts) return t(!1);
      var n = this;
      return t(r(this, e)).then(function (e) {
        return ++n._retryCount, e;
      });
    }, P.prototype.clone = function (e) {
      return s(e) || (e = new P({
        url: this._url
      })), e._url = this._url, e._queryParameters = i(this._queryParameters), e._templateValues = i(this._templateValues), e.headers = i(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
    }, P.prototype.getBaseUri = function (e) {
      return h(this.getUrlComponent(e), e);
    }, P.prototype.appendForwardSlash = function () {
      this._url = r(this._url);
    }, P.prototype.fetchArrayBuffer = function () {
      return this.fetch({
        responseType: "arraybuffer"
      });
    }, P.fetchArrayBuffer = function (e) {
      return new P(e).fetchArrayBuffer();
    }, P.prototype.fetchBlob = function () {
      return this.fetch({
        responseType: "blob"
      });
    }, P.fetchBlob = function (e) {
      return new P(e).fetchBlob();
    }, P.prototype.fetchImage = function (e) {
      e = o(e, o.EMPTY_OBJECT);
      var r = o(e.preferImageBitmap, !1),
          n = o(e.preferBlob, !1),
          i = o(e.flipY, !1);
      if (M(this.request), !G || this.isDataUri || this.isBlobUri || !this.hasHeaders && !n) return D({
        resource: this,
        flipY: i,
        preferImageBitmap: r
      });
      var a = this.fetchBlob();

      if (s(a)) {
        var u, c, l, f;
        return P.supportsImageBitmapOptions().then(function (e) {
          return u = e, c = u && r, a;
        }).then(function (e) {
          if (s(e)) {
            if (f = e, c) return P.createImageBitmapFromBlob(e, {
              flipY: i,
              premultiplyAlpha: !1
            });
            var t = window.URL.createObjectURL(e);
            return l = new P({
              url: t
            }), D({
              resource: l,
              flipY: i,
              preferImageBitmap: !1
            });
          }
        }).then(function (e) {
          if (s(e)) return e.blob = f, c ? e : (window.URL.revokeObjectURL(l.url), e);
        }).otherwise(function (e) {
          return s(l) && window.URL.revokeObjectURL(l.url), e.blob = f, t.reject(e);
        });
      }
    }, P.fetchImage = function (e) {
      return new P(e).fetchImage({
        flipY: e.flipY,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap
      });
    }, P.prototype.fetchText = function () {
      return this.fetch({
        responseType: "text"
      });
    }, P.fetchText = function (e) {
      return new P(e).fetchText();
    }, P.prototype.fetchJson = function () {
      var e = this.fetch({
        responseType: "text",
        headers: {
          Accept: "application/json,*/*;q=0.01"
        }
      });
      if (s(e)) return e.then(function (e) {
        if (s(e)) return JSON.parse(e);
      });
    }, P.fetchJson = function (e) {
      return new P(e).fetchJson();
    }, P.prototype.fetchXML = function () {
      return this.fetch({
        responseType: "document",
        overrideMimeType: "text/xml"
      });
    }, P.fetchXML = function (e) {
      return new P(e).fetchXML();
    }, P.prototype.fetchJsonp = function (e) {
      e = o(e, "callback"), M(this.request);
      var t;

      do {
        t = "loadJsonp" + Math.random().toString().substring(2, 8);
      } while (s(window[t]));

      return U(this, e, t);
    }, P.fetchJsonp = function (e) {
      return new P(e).fetchJsonp(e.callbackParameterName);
    }, P.prototype._makeRequest = function (e) {
      var r = this;
      M(r.request);
      var n = r.request;
      n.url = r.url, n.requestFunction = function () {
        var i = e.responseType,
            o = a(e.headers, r.headers),
            u = e.overrideMimeType,
            c = e.method,
            l = e.data,
            f = t.defer(),
            h = P._Implementations.loadWithXhr(r.url, i, c, l, o, f, u);

        return s(h) && s(h.abort) && (n.cancelFunction = function () {
          h.abort();
        }), f.promise;
      };
      var i = S.request(n);
      if (s(i)) return i.then(function (e) {
        return e;
      }).otherwise(function (i) {
        return n.state !== g.FAILED ? t.reject(i) : r.retryOnError(i).then(function (a) {
          return a ? (n.state = g.UNISSUED, n.deferred = void 0, r.fetch(e)) : t.reject(i);
        });
      });
    };
    var V = /^data:(.*?)(;base64)?,(.*)$/;
    P.prototype.fetch = function (e) {
      return e = N(e, {}), e.method = "GET", this._makeRequest(e);
    }, P.fetch = function (e) {
      return new P(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, P.prototype["delete"] = function (e) {
      return e = N(e, {}), e.method = "DELETE", this._makeRequest(e);
    }, P["delete"] = function (e) {
      return new P(e)["delete"]({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data
      });
    }, P.prototype.head = function (e) {
      return e = N(e, {}), e.method = "HEAD", this._makeRequest(e);
    }, P.head = function (e) {
      return new P(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, P.prototype.options = function (e) {
      return e = N(e, {}), e.method = "OPTIONS", this._makeRequest(e);
    }, P.options = function (e) {
      return new P(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, P.prototype.post = function (e, t) {
      return n.defined("data", e), t = N(t, {}), t.method = "POST", t.data = e, this._makeRequest(t);
    }, P.post = function (e) {
      return new P(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, P.prototype.put = function (e, t) {
      return n.defined("data", e), t = N(t, {}), t.method = "PUT", t.data = e, this._makeRequest(t);
    }, P.put = function (e) {
      return new P(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, P.prototype.patch = function (e, t) {
      return n.defined("data", e), t = N(t, {}), t.method = "PATCH", t.data = e, this._makeRequest(t);
    }, P.patch = function (e) {
      return new P(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, P._Implementations = {}, P._Implementations.createImage = function (e, t, r, n, i) {
      P.supportsImageBitmapOptions().then(function (n) {
        return n && i ? P.fetchBlob({
          url: e
        }) : void B(e, t, r);
      }).then(function (e) {
        if (s(e)) return P.createImageBitmapFromBlob(e, {
          flipY: n,
          premultiplyAlpha: !1
        });
      }).then(function (e) {
        s(e) && r.resolve(e);
      }).otherwise(r.reject);
    }, P.createImageBitmapFromBlob = function (e, t) {
      return n.defined("options", t), n.typeOf.bool("options.flipY", t.flipY), n.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha), createImageBitmap(e, {
        imageOrientation: t.flipY ? "flipY" : "none",
        premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"
      });
    };
    var W = "undefined" == typeof XMLHttpRequest;
    return P._Implementations.loadWithXhr = function (e, t, r, n, i, a, o) {
      var u = V.exec(e);
      if (null !== u) return void a.resolve(L(u, t));
      if (W) return void q(e, t, r, n, i, a, o);
      var c = new XMLHttpRequest();
      if (v.contains(e) && (c.withCredentials = !0), c.open(r, e, !0), s(o) && s(c.overrideMimeType) && c.overrideMimeType(o), s(i)) for (var l in i) {
        i.hasOwnProperty(l) && c.setRequestHeader(l, i[l]);
      }
      s(t) && (c.responseType = t);
      var f = !1;
      return "string" == typeof e && (f = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), c.onload = function () {
        if ((c.status < 200 || c.status >= 300) && (!f || 0 !== c.status)) return void a.reject(new A(c.status, c.response, c.getAllResponseHeaders()));
        var e = c.response,
            n = c.responseType;

        if ("HEAD" === r || "OPTIONS" === r) {
          var i = c.getAllResponseHeaders(),
              o = i.trim().split(/[\r\n]+/),
              u = {};
          return o.forEach(function (e) {
            var t = e.split(": "),
                r = t.shift();
            u[r] = t.join(": ");
          }), void a.resolve(u);
        }

        if (s(e) && "string" == typeof e) try {
          if (-1 === JSON.parse(e).code) return void a.reject(new A(c.status, c.response, c.getAllResponseHeaders()));
        } catch (e) {
          a.reject(e);
        }
        if (204 === c.status) a.resolve();else if (!s(e) || s(t) && n !== t) {
          if ("json" === t && "string" == typeof e) try {
            a.resolve(JSON.parse(e));
          } catch (e) {
            a.reject(e);
          } else ("" === n || "document" === n) && s(c.responseXML) && c.responseXML.hasChildNodes() ? a.resolve(c.responseXML) : "" !== n && "text" !== n || !s(c.responseText) ? a.reject(new C("Invalid XMLHttpRequest response type.")) : a.resolve(c.responseText);
        } else a.resolve(e);
      }, c.onerror = function (e) {
        a.reject(new A());
      }, c.send(n), c;
    }, P._Implementations.loadAndExecuteScript = function (e, t, r) {
      return _(e, t).otherwise(r.reject);
    }, P._DefaultImplementations = {}, P._DefaultImplementations.createImage = P._Implementations.createImage, P._DefaultImplementations.loadWithXhr = P._Implementations.loadWithXhr, P._DefaultImplementations.loadAndExecuteScript = P._Implementations.loadAndExecuteScript, P.DEFAULT = l(new P({
      url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
    })), P;
  }), define("Core/EarthOrientationParameters", ["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (e, t, r, n, i, a, o, s, u, c, l, f) {
    "use strict";

    function h(t) {
      if (t = r(t, r.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = r(t.addNewLeapSeconds, !0), n(t.data)) E(this, t.data);else if (n(t.url)) {
        var i = u.createIfNeeded(t.url),
            a = this;
        this._downloadPromise = e(i.fetchJson(), function (e) {
          E(a, e);
        }, function () {
          a._dataError = "An error occurred while retrieving the EOP data from the URL " + i.url + ".";
        });
      } else E(this, {
        columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
        samples: []
      });
    }

    function d(e, t) {
      return o.compare(e.julianDate, t);
    }

    function E(e, r) {
      if (!n(r.columnNames)) return void (e._dataError = "Error in loaded EOP data: The columnNames property is required.");
      if (!n(r.samples)) return void (e._dataError = "Error in loaded EOP data: The samples property is required.");
      var i = r.columnNames.indexOf("modifiedJulianDateUtc"),
          a = r.columnNames.indexOf("xPoleWanderRadians"),
          u = r.columnNames.indexOf("yPoleWanderRadians"),
          c = r.columnNames.indexOf("ut1MinusUtcSeconds"),
          h = r.columnNames.indexOf("xCelestialPoleOffsetRadians"),
          E = r.columnNames.indexOf("yCelestialPoleOffsetRadians"),
          p = r.columnNames.indexOf("taiMinusUtcSeconds");
      if (i < 0 || a < 0 || u < 0 || c < 0 || h < 0 || E < 0 || p < 0) return void (e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");

      var m = e._samples = r.samples,
          _ = e._dates = [];

      e._dateColumn = i, e._xPoleWanderRadiansColumn = a, e._yPoleWanderRadiansColumn = u, e._ut1MinusUtcSecondsColumn = c, e._xCelestialPoleOffsetRadiansColumn = h, e._yCelestialPoleOffsetRadiansColumn = E, e._taiMinusUtcSecondsColumn = p, e._columnCount = r.columnNames.length, e._lastIndex = void 0;

      for (var y, R = e._addNewLeapSeconds, T = 0, A = m.length; T < A; T += e._columnCount) {
        var S = m[T + i],
            g = m[T + p],
            C = S + l.MODIFIED_JULIAN_DATE_DIFFERENCE,
            v = new o(C, g, f.TAI);

        if (_.push(v), R) {
          if (g !== y && n(y)) {
            var I = o.leapSeconds,
                O = t(I, v, d);

            if (O < 0) {
              var N = new s(v, g);
              I.splice(~O, 0, N);
            }
          }

          y = g;
        }
      }
    }

    function p(e, t, r, n, i) {
      var a = r * n;
      i.xPoleWander = t[a + e._xPoleWanderRadiansColumn], i.yPoleWander = t[a + e._yPoleWanderRadiansColumn], i.xPoleOffset = t[a + e._xCelestialPoleOffsetRadiansColumn], i.yPoleOffset = t[a + e._yCelestialPoleOffsetRadiansColumn], i.ut1MinusUtc = t[a + e._ut1MinusUtcSecondsColumn];
    }

    function m(e, t, r) {
      return t + e * (r - t);
    }

    function _(e, t, r, n, i, a, s) {
      var u = e._columnCount;
      if (a > t.length - 1) return s.xPoleWander = 0, s.yPoleWander = 0, s.xPoleOffset = 0, s.yPoleOffset = 0, s.ut1MinusUtc = 0, s;
      var c = t[i],
          l = t[a];
      if (c.equals(l) || n.equals(c)) return p(e, r, i, u, s), s;
      if (n.equals(l)) return p(e, r, a, u, s), s;
      var f = o.secondsDifference(n, c) / o.secondsDifference(l, c),
          h = i * u,
          d = a * u,
          E = r[h + e._ut1MinusUtcSecondsColumn],
          _ = r[d + e._ut1MinusUtcSecondsColumn],
          y = _ - E;

      if (y > .5 || y < -.5) {
        var R = r[h + e._taiMinusUtcSecondsColumn],
            T = r[d + e._taiMinusUtcSecondsColumn];
        R !== T && (l.equals(n) ? E = _ : _ -= T - R);
      }

      return s.xPoleWander = m(f, r[h + e._xPoleWanderRadiansColumn], r[d + e._xPoleWanderRadiansColumn]), s.yPoleWander = m(f, r[h + e._yPoleWanderRadiansColumn], r[d + e._yPoleWanderRadiansColumn]), s.xPoleOffset = m(f, r[h + e._xCelestialPoleOffsetRadiansColumn], r[d + e._xCelestialPoleOffsetRadiansColumn]), s.yPoleOffset = m(f, r[h + e._yCelestialPoleOffsetRadiansColumn], r[d + e._yCelestialPoleOffsetRadiansColumn]), s.ut1MinusUtc = m(f, E, _), s;
    }

    return h.NONE = a({
      getPromiseToLoad: function getPromiseToLoad() {
        return e();
      },
      compute: function compute(e, t) {
        return n(t) ? (t.xPoleWander = 0, t.yPoleWander = 0, t.xPoleOffset = 0, t.yPoleOffset = 0, t.ut1MinusUtc = 0) : t = new i(0, 0, 0, 0, 0), t;
      }
    }), h.prototype.getPromiseToLoad = function () {
      return e(this._downloadPromise);
    }, h.prototype.compute = function (e, r) {
      if (n(this._samples)) {
        if (n(r) || (r = new i(0, 0, 0, 0, 0)), 0 === this._samples.length) return r.xPoleWander = 0, r.yPoleWander = 0, r.xPoleOffset = 0, r.yPoleOffset = 0, r.ut1MinusUtc = 0, r;
        var a = this._dates,
            s = this._lastIndex,
            u = 0,
            l = 0;

        if (n(s)) {
          var f = a[s],
              h = a[s + 1],
              d = o.lessThanOrEquals(f, e),
              E = !n(h),
              p = E || o.greaterThanOrEquals(h, e);
          if (d && p) return u = s, !E && h.equals(e) && ++u, l = u + 1, _(this, a, this._samples, e, u, l, r), r;
        }

        var m = t(a, e, o.compare, this._dateColumn);
        return m >= 0 ? (m < a.length - 1 && a[m + 1].equals(e) && ++m, u = m, l = m) : (l = ~m, (u = l - 1) < 0 && (u = 0)), this._lastIndex = u, _(this, a, this._samples, e, u, l, r), r;
      }

      if (n(this._dataError)) throw new c(this._dataError);
    }, h;
  }), define("Core/HeadingPitchRoll", ["./defaultValue", "./defined", "./DeveloperError", "./Math"], function (e, t, r, n) {
    "use strict";

    function i(t, r, n) {
      this.heading = e(t, 0), this.pitch = e(r, 0), this.roll = e(n, 0);
    }

    return i.fromQuaternion = function (e, r) {
      t(r) || (r = new i());
      var a = 2 * (e.w * e.y - e.z * e.x),
          o = 1 - 2 * (e.x * e.x + e.y * e.y),
          s = 2 * (e.w * e.x + e.y * e.z),
          u = 1 - 2 * (e.y * e.y + e.z * e.z),
          c = 2 * (e.w * e.z + e.x * e.y);
      return r.heading = -Math.atan2(c, u), r.roll = Math.atan2(s, o), r.pitch = -n.asinClamped(a), r;
    }, i.fromDegrees = function (e, r, a, o) {
      return t(o) || (o = new i()), o.heading = e * n.RADIANS_PER_DEGREE, o.pitch = r * n.RADIANS_PER_DEGREE, o.roll = a * n.RADIANS_PER_DEGREE, o;
    }, i.clone = function (e, r) {
      if (t(e)) return t(r) ? (r.heading = e.heading, r.pitch = e.pitch, r.roll = e.roll, r) : new i(e.heading, e.pitch, e.roll);
    }, i.equals = function (e, r) {
      return e === r || t(e) && t(r) && e.heading === r.heading && e.pitch === r.pitch && e.roll === r.roll;
    }, i.equalsEpsilon = function (e, r, i, a) {
      return e === r || t(e) && t(r) && n.equalsEpsilon(e.heading, r.heading, i, a) && n.equalsEpsilon(e.pitch, r.pitch, i, a) && n.equalsEpsilon(e.roll, r.roll, i, a);
    }, i.prototype.clone = function (e) {
      return i.clone(this, e);
    }, i.prototype.equals = function (e) {
      return i.equals(this, e);
    }, i.prototype.equalsEpsilon = function (e, t, r) {
      return i.equalsEpsilon(this, e, t, r);
    }, i.prototype.toString = function () {
      return "(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
    }, i;
  }), define("Core/buildModuleUrl", ["./defined", "./DeveloperError", "./getAbsoluteUri", "./Resource", "require"], function (e, t, r, n, i) {
    "use strict";

    function a() {
      for (var e = document.getElementsByTagName("script"), t = 0, r = e.length; t < r; ++t) {
        var n = e[t].getAttribute("src"),
            i = E.exec(n);
        if (null !== i) return i[1];
      }
    }

    function o(t) {
      return "undefined" == typeof document ? t : (e(f) || (f = document.createElement("a")), f.href = t, f.href = f.href, f.href);
    }

    function s() {
      if (e(h)) return h;
      var t;
      return t = "undefined" != typeof PGEARTH_BASE_URL ? PGEARTH_BASE_URL : e(define.amd) && !define.amd.toUrlUndefined && e(i.toUrl) ? r("..", l("Core/buildModuleUrl.js")) : a(), h = new n({
        url: o(t)
      }), h.appendForwardSlash(), h;
    }

    function u(e) {
      return o(i.toUrl("../" + e));
    }

    function c(e) {
      return s().getDerivedResource({
        url: e
      }).url;
    }

    function l(t) {
      return e(d) || (d = e(define.amd) && !define.amd.toUrlUndefined && e(i.toUrl) ? u : c), d(t);
    }

    var f,
        h,
        d,
        E = /((?:.*\/)|^)pgEarth[\w-]*\.js(?:\W|$)/i;
    return l._pgEarthScriptRegex = E, l._buildModuleUrlFromBaseUrl = c, l._clearBaseResource = function () {
      h = void 0;
    }, l.setBaseUrl = function (e) {
      h = n.DEFAULT.getDerivedResource({
        url: e
      });
    }, l.getPGEarthBaseUrl = s, l;
  }), define("Core/Iau2006XysSample", [], function () {
    "use strict";

    function e(e, t, r) {
      this.x = e, this.y = t, this.s = r;
    }

    return e;
  }), define("Core/Iau2006XysData", ["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./Iau2006XysSample", "./JulianDate", "./Resource", "./TimeStandard"], function (e, t, r, n, i, a, o, s) {
    "use strict";

    function u(e) {
      e = r(e, r.EMPTY_OBJECT), this._xysFileUrlTemplate = o.createIfNeeded(e.xysFileUrlTemplate), this._interpolationOrder = r(e.interpolationOrder, 9), this._sampleZeroJulianEphemerisDate = r(e.sampleZeroJulianEphemerisDate, 2442396.5), this._sampleZeroDateTT = new a(this._sampleZeroJulianEphemerisDate, 0, s.TAI), this._stepSizeDays = r(e.stepSizeDays, 1), this._samplesPerXysFile = r(e.samplesPerXysFile, 1e3), this._totalSamples = r(e.totalSamples, 27426), this._samples = new Array(3 * this._totalSamples), this._chunkDownloadsInProgress = [];

      for (var t = this._interpolationOrder, n = this._denominators = new Array(t + 1), i = this._xTable = new Array(t + 1), u = Math.pow(this._stepSizeDays, t), c = 0; c <= t; ++c) {
        n[c] = u, i[c] = c * this._stepSizeDays;

        for (var l = 0; l <= t; ++l) {
          l !== c && (n[c] *= c - l);
        }

        n[c] = 1 / n[c];
      }

      this._work = new Array(t + 1), this._coef = new Array(t + 1);
    }

    function c(e, t, r) {
      var n = f;
      return n.dayNumber = t, n.secondsOfDay = r, a.daysDifference(n, e._sampleZeroDateTT);
    }

    function l(r, i) {
      if (r._chunkDownloadsInProgress[i]) return r._chunkDownloadsInProgress[i];
      var a = e.defer();
      r._chunkDownloadsInProgress[i] = a;
      var s,
          u = r._xysFileUrlTemplate;
      return s = n(u) ? u.getDerivedResource({
        templateValues: {
          0: i
        }
      }) : new o({
        url: t("Assets/IAU2006_XYS/IAU2006_XYS_" + i + ".json")
      }), e(s.fetchJson(), function (e) {
        r._chunkDownloadsInProgress[i] = !1;

        for (var t = r._samples, n = e.samples, o = i * r._samplesPerXysFile * 3, s = 0, u = n.length; s < u; ++s) {
          t[o + s] = n[s];
        }

        a.resolve();
      }), a.promise;
    }

    var f = new a(0, 0, s.TAI);
    return u.prototype.preload = function (t, r, n, i) {
      var a = c(this, t, r),
          o = c(this, n, i),
          s = a / this._stepSizeDays - this._interpolationOrder / 2 | 0;
      s < 0 && (s = 0);
      var u = o / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;
      u >= this._totalSamples && (u = this._totalSamples - 1);

      for (var f = s / this._samplesPerXysFile | 0, h = u / this._samplesPerXysFile | 0, d = [], E = f; E <= h; ++E) {
        d.push(l(this, E));
      }

      return e.all(d);
    }, u.prototype.computeXysRadians = function (e, t, r) {
      var a = c(this, e, t);

      if (!(a < 0)) {
        var o = a / this._stepSizeDays | 0;

        if (!(o >= this._totalSamples)) {
          var s = this._interpolationOrder,
              u = o - (s / 2 | 0);
          u < 0 && (u = 0);
          var f = u + s;
          f >= this._totalSamples && (f = this._totalSamples - 1, (u = f - s) < 0 && (u = 0));
          var h = !1,
              d = this._samples;

          if (n(d[3 * u]) || (l(this, u / this._samplesPerXysFile | 0), h = !0), n(d[3 * f]) || (l(this, f / this._samplesPerXysFile | 0), h = !0), !h) {
            n(r) ? (r.x = 0, r.y = 0, r.s = 0) : r = new i(0, 0, 0);
            var E,
                p,
                m = a - u * this._stepSizeDays,
                _ = this._work,
                y = this._denominators,
                R = this._coef,
                T = this._xTable;

            for (E = 0; E <= s; ++E) {
              _[E] = m - T[E];
            }

            for (E = 0; E <= s; ++E) {
              for (R[E] = 1, p = 0; p <= s; ++p) {
                p !== E && (R[E] *= _[p]);
              }

              R[E] *= y[E];
              var A = 3 * (u + E);
              r.x += R[E] * d[A++], r.y += R[E] * d[A++], r.s += R[E] * d[A];
            }

            return r;
          }
        }
      }
    }, u;
  }), define("Core/Transforms", ["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (e, t, r, n, i, a, o, s, u, c, l, f, h, d, E, p, m, _, y, R, T) {
    "use strict";

    var A = {},
        S = {
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
        g = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1]
    },
        C = {},
        v = {
      east: new r(),
      north: new r(),
      up: new r(),
      west: new r(),
      south: new r(),
      down: new r()
    },
        I = new r(),
        O = new r(),
        N = new r();
    A.localFrameToFixedFrameGenerator = function (e, t) {
      if (!S.hasOwnProperty(e) || !S[e].hasOwnProperty(t)) throw new u("firstAxis and secondAxis must be east, north, up, west, south or down.");
      var n,
          i = S[e][t],
          a = e + t;
      return s(C[a]) ? n = C[a] : (n = function n(_n, a, u) {
        if (s(u) || (u = new y()), m.equalsEpsilon(_n.x, 0, m.EPSILON14) && m.equalsEpsilon(_n.y, 0, m.EPSILON14)) {
          var c = m.sign(_n.z);
          r.unpack(g[e], 0, I), "east" !== e && "west" !== e && r.multiplyByScalar(I, c, I), r.unpack(g[t], 0, O), "east" !== t && "west" !== t && r.multiplyByScalar(O, c, O), r.unpack(g[i], 0, N), "east" !== i && "west" !== i && r.multiplyByScalar(N, c, N);
        } else {
          a = o(a, f.WGS84), a.geodeticSurfaceNormal(_n, v.up);
          var l = v.up,
              h = v.east;
          h.x = -_n.y, h.y = _n.x, h.z = 0, r.normalize(h, v.east), r.cross(l, h, v.north), r.multiplyByScalar(v.up, -1, v.down), r.multiplyByScalar(v.east, -1, v.west), r.multiplyByScalar(v.north, -1, v.south), I = v[e], O = v[t], N = v[i];
        }

        return u[0] = I.x, u[1] = I.y, u[2] = I.z, u[3] = 0, u[4] = O.x, u[5] = O.y, u[6] = O.z, u[7] = 0, u[8] = N.x, u[9] = N.y, u[10] = N.z, u[11] = 0, u[12] = _n.x, u[13] = _n.y, u[14] = _n.z, u[15] = 1, u;
      }, C[a] = n), n;
    }, A.eastNorthUpToFixedFrame = A.localFrameToFixedFrameGenerator("east", "north"), A.northEastDownToFixedFrame = A.localFrameToFixedFrameGenerator("north", "east"), A.northUpEastToFixedFrame = A.localFrameToFixedFrameGenerator("north", "up"), A.northWestUpToFixedFrame = A.localFrameToFixedFrameGenerator("north", "west");
    var M = new R(),
        w = new r(1, 1, 1),
        P = new y();

    A.headingPitchRollToFixedFrame = function (e, t, n, i, a) {
      i = o(i, A.eastNorthUpToFixedFrame);
      var s = R.fromHeadingPitchRoll(t, M),
          u = y.fromTranslationQuaternionRotationScale(r.ZERO, s, w, P);
      return a = i(e, n, a), y.multiply(a, u, a);
    };

    var D = new y(),
        U = new _();

    A.headingPitchRollQuaternion = function (e, t, r, n, i) {
      var a = A.headingPitchRollToFixedFrame(e, t, r, n, D),
          o = y.getRotation(a, U);
      return R.fromRotationMatrix(o, i);
    };

    var F = new r(1, 1, 1),
        x = new r(),
        L = new y(),
        B = new y(),
        b = new _(),
        q = new R();

    A.fixedFrameToHeadingPitchRoll = function (e, t, n, i) {
      t = o(t, f.WGS84), n = o(n, A.eastNorthUpToFixedFrame), s(i) || (i = new h());
      var a = y.getTranslation(e, x);
      if (r.equals(a, r.ZERO)) return i.heading = 0, i.pitch = 0, i.roll = 0, i;
      var u = y.inverseTransformation(n(a, t, L), L),
          c = y.setScale(e, F, B);
      c = y.setTranslation(c, r.ZERO, c), u = y.multiply(u, c, u);
      var l = R.fromRotationMatrix(y.getRotation(u, b), q);
      return l = R.normalize(l, l), h.fromQuaternion(l, i);
    };

    var G = m.TWO_PI / 86400,
        z = new p();
    A.computeTemeToPseudoFixedMatrix = function (e, t) {
      z = p.addSeconds(e, -p.computeTaiMinusUtc(e), z);
      var r,
          n = z.dayNumber,
          i = z.secondsOfDay,
          a = n - 2451545;
      r = i >= 43200 ? (a + .5) / T.DAYS_PER_JULIAN_CENTURY : (a - .5) / T.DAYS_PER_JULIAN_CENTURY;
      var o = 24110.54841 + r * (8640184.812866 + r * (.093104 + -62e-7 * r)),
          u = o * G % m.TWO_PI,
          c = 72921158553e-15 + 1.1772758384668e-19 * (n - 2451545.5),
          l = (i + .5 * T.SECONDS_PER_DAY) % T.SECONDS_PER_DAY,
          f = u + c * l,
          h = Math.cos(f),
          d = Math.sin(f);
      return s(t) ? (t[0] = h, t[1] = -d, t[2] = 0, t[3] = d, t[4] = h, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new _(h, d, 0, -d, h, 0, 0, 0, 1);
    }, A.iau2006XysData = new d(), A.earthOrientationParameters = c.NONE;
    A.preloadIcrfFixed = function (t) {
      var r = t.start.dayNumber,
          n = t.start.secondsOfDay + 32.184,
          i = t.stop.dayNumber,
          a = t.stop.secondsOfDay + 32.184,
          o = A.iau2006XysData.preload(r, n, i, a),
          s = A.earthOrientationParameters.getPromiseToLoad();
      return e.all([o, s]);
    }, A.computeIcrfToFixedMatrix = function (e, t) {
      s(t) || (t = new _());
      var r = A.computeFixedToIcrfMatrix(e, t);
      if (s(r)) return _.transpose(r, t);
    };
    var V = new E(0, 0, 0),
        W = new l(0, 0, 0, 0, 0, 0),
        H = new _(),
        X = new _();

    A.computeFixedToIcrfMatrix = function (e, t) {
      s(t) || (t = new _());
      var r = A.earthOrientationParameters.compute(e, W);

      if (s(r)) {
        var n = e.dayNumber,
            i = e.secondsOfDay + 32.184,
            a = A.iau2006XysData.computeXysRadians(n, i, V);

        if (s(a)) {
          var o = a.x + r.xPoleOffset,
              u = a.y + r.yPoleOffset,
              c = 1 / (1 + Math.sqrt(1 - o * o - u * u)),
              l = H;
          l[0] = 1 - c * o * o, l[3] = -c * o * u, l[6] = o, l[1] = -c * o * u, l[4] = 1 - c * u * u, l[7] = u, l[2] = -o, l[5] = -u, l[8] = 1 - c * (o * o + u * u);

          var f = _.fromRotationZ(-a.s, X),
              h = _.multiply(l, f, H),
              d = e.dayNumber,
              E = e.secondsOfDay - p.computeTaiMinusUtc(e) + r.ut1MinusUtc,
              y = d - 2451545,
              R = E / T.SECONDS_PER_DAY,
              S = .779057273264 + R + .00273781191135448 * (y + R);

          S = S % 1 * m.TWO_PI;

          var g = _.fromRotationZ(S, X),
              C = _.multiply(h, g, H),
              v = Math.cos(r.xPoleWander),
              I = Math.cos(r.yPoleWander),
              O = Math.sin(r.xPoleWander),
              N = Math.sin(r.yPoleWander),
              M = n - 2451545 + i / T.SECONDS_PER_DAY;

          M /= 36525;
          var w = -47e-6 * M * m.RADIANS_PER_DEGREE / 3600,
              P = Math.cos(w),
              D = Math.sin(w),
              U = X;
          return U[0] = v * P, U[1] = v * D, U[2] = O, U[3] = -I * D + N * O * P, U[4] = I * P + N * O * D, U[5] = -N * v, U[6] = -N * D - I * O * P, U[7] = N * P - I * O * D, U[8] = I * v, _.multiply(C, U, t);
        }
      }
    };

    var Y = new n();
    A.pointToWindowCoordinates = function (e, t, r, n) {
      return n = A.pointToGLWindowCoordinates(e, t, r, n), n.y = 2 * t[5] - n.y, n;
    }, A.pointToGLWindowCoordinates = function (e, r, i, a) {
      s(a) || (a = new t());
      var o = Y;
      return y.multiplyByVector(e, n.fromElements(i.x, i.y, i.z, 1, o), o), n.multiplyByScalar(o, 1 / o.w, o), y.multiplyByVector(r, o, o), t.fromCartesian4(o, a);
    };
    var k = new r(),
        j = new r(),
        K = new r();

    A.rotationMatrixFromPositionVelocity = function (e, t, n, i) {
      var a = o(n, f.WGS84).geodeticSurfaceNormal(e, k),
          u = r.cross(t, a, j);
      r.equalsEpsilon(u, r.ZERO, m.EPSILON6) && (u = r.clone(r.UNIT_X, u));
      var c = r.cross(u, t, K);
      return r.normalize(c, c), r.cross(t, c, u), r.negate(u, u), r.normalize(u, u), s(i) || (i = new _()), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = u.x, i[4] = u.y, i[5] = u.z, i[6] = c.x, i[7] = c.y, i[8] = c.z, i;
    };

    var Z = new y(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
        J = new i(),
        Q = new r(),
        $ = new r(),
        ee = new _(),
        te = new y(),
        re = new y();
    return A.basisTo2D = function (e, t, n) {
      var i = y.getTranslation(t, $),
          a = e.ellipsoid,
          o = a.cartesianToCartographic(i, J),
          s = e.project(o, Q);
      r.fromElements(s.z, s.x, s.y, s);
      var u = A.eastNorthUpToFixedFrame(i, a, te),
          c = y.inverseTransformation(u, re),
          l = y.getRotation(t, ee),
          f = y.multiplyByMatrix3(c, l, n);
      return y.multiply(Z, f, n), y.setTranslation(n, s, n), n;
    }, A.wgs84To2DModelMatrix = function (e, t, n) {
      var i = e.ellipsoid,
          a = A.eastNorthUpToFixedFrame(t, i, te),
          o = y.inverseTransformation(a, re),
          s = i.cartesianToCartographic(t, J),
          u = e.project(s, Q);
      r.fromElements(u.z, u.x, u.y, u);
      var c = y.fromTranslation(u, te);
      return y.multiply(Z, o, n), y.multiply(c, n, n), n;
    }, A;
  }), define("Core/Geometry", ["./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryOffsetAttribute", "./GeometryType", "./Matrix2", "./Matrix3", "./Matrix4", "./PrimitiveType", "./Quaternion", "./Rectangle", "./Transforms"], function (e, t, r, n, i, a, o, s, u, c, l, f, h, d, E, p) {
    "use strict";

    function m(e) {
      e = i(e, i.EMPTY_OBJECT), this.attributes = e.attributes, this.indices = e.indices, this.primitiveType = i(e.primitiveType, h.TRIANGLES), this.boundingSphere = e.boundingSphere, this.geometryType = i(e.geometryType, u.NONE), this.boundingSphereCV = e.boundingSphereCV, this.offsetAttribute = e.offsetAttribute;
    }

    m.computeNumberOfVertices = function (e) {
      var t = -1;

      for (var r in e.attributes) {
        if (e.attributes.hasOwnProperty(r) && a(e.attributes[r]) && a(e.attributes[r].values)) {
          var n = e.attributes[r],
              i = n.values.length / n.componentsPerAttribute;
          t = i;
        }
      }

      return t;
    };

    var _ = new r(),
        y = new t(),
        R = new f(),
        T = [new r(), new r(), new r()],
        A = [new e(), new e(), new e()],
        S = [new e(), new e(), new e()],
        g = new t(),
        C = new d(),
        v = new f(),
        I = new c();

    return m._textureCoordinateRotationPoints = function (n, i, a, o) {
      var s,
          u = E.center(o, _),
          h = r.toCartesian(u, a, y),
          m = p.eastNorthUpToFixedFrame(h, a, R),
          O = f.inverse(m, R),
          N = A,
          M = T;
      M[0].longitude = o.west, M[0].latitude = o.south, M[1].longitude = o.west, M[1].latitude = o.north, M[2].longitude = o.east, M[2].latitude = o.south;
      var w = g;

      for (s = 0; s < 3; s++) {
        r.toCartesian(M[s], a, w), w = f.multiplyByPointAsVector(O, w, w), N[s].x = w.x, N[s].y = w.y;
      }

      var P = d.fromAxisAngle(t.UNIT_Z, -i, C),
          D = l.fromQuaternion(P, v),
          U = n.length,
          F = Number.POSITIVE_INFINITY,
          x = Number.POSITIVE_INFINITY,
          L = Number.NEGATIVE_INFINITY,
          B = Number.NEGATIVE_INFINITY;

      for (s = 0; s < U; s++) {
        w = f.multiplyByPointAsVector(O, n[s], w), w = l.multiplyByVector(D, w, w), F = Math.min(F, w.x), x = Math.min(x, w.y), L = Math.max(L, w.x), B = Math.max(B, w.y);
      }

      var b = c.fromRotation(i, I),
          q = S;
      q[0].x = F, q[0].y = x, q[1].x = F, q[1].y = B, q[2].x = L, q[2].y = x;
      var G = N[0],
          z = N[2].x - G.x,
          V = N[1].y - G.y;

      for (s = 0; s < 3; s++) {
        var W = q[s];
        c.multiplyByVector(b, W, W), W.x = (W.x - G.x) / z, W.y = (W.y - G.y) / V;
      }

      var H = q[0],
          X = q[1],
          Y = q[2],
          k = new Array(6);
      return e.pack(H, k), e.pack(X, k, 2), e.pack(Y, k, 4), k;
    }, m;
  }), define("Core/GeometryAttribute", ["./defaultValue", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(t) {
      t = e(t, e.EMPTY_OBJECT), this.componentDatatype = t.componentDatatype, this.componentsPerAttribute = t.componentsPerAttribute, this.normalize = e(t.normalize, !1), this.values = t.values;
    }

    return n;
  }), define("Core/GeometryAttributes", ["./defaultValue"], function (e) {
    "use strict";

    function t(t) {
      t = e(t, e.EMPTY_OBJECT), this.position = t.position, this.normal = t.normal, this.st = t.st, this.bitangent = t.bitangent, this.tangent = t.tangent, this.color = t.color;
    }

    return t;
  }), define("Core/IndexDatatype", ["./defined", "./DeveloperError", "./freezeObject", "./Math", "./WebGLConstants"], function (e, t, r, n, i) {
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
      return e >= n.SIXTY_FOUR_KILOBYTES ? new Uint32Array(t) : new Uint16Array(t);
    }, a.createTypedArrayFromArrayBuffer = function (e, t, r, i) {
      return e >= n.SIXTY_FOUR_KILOBYTES ? new Uint32Array(t, r, i) : new Uint16Array(t, r, i);
    }, r(a);
  }), define("Core/EllipsoidGeodesic", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./Math"], function (e, t, r, n, i, a, o, s) {
    "use strict";

    function u(e) {
      var t = e._uSquared,
          r = e._ellipsoid.maximumRadius,
          n = e._ellipsoid.minimumRadius,
          i = (r - n) / r,
          a = Math.cos(e._startHeading),
          o = Math.sin(e._startHeading),
          s = (1 - i) * Math.tan(e._start.latitude),
          u = 1 / Math.sqrt(1 + s * s),
          c = u * s,
          l = Math.atan2(s, a),
          f = u * o,
          h = f * f,
          d = 1 - h,
          E = Math.sqrt(d),
          p = t / 4,
          m = p * p,
          _ = m * p,
          y = m * m,
          R = 1 + p - 3 * m / 4 + 5 * _ / 4 - 175 * y / 64,
          T = 1 - p + 15 * m / 8 - 35 * _ / 8,
          A = 1 - 3 * p + 35 * m / 4,
          S = 1 - 5 * p,
          g = R * l - T * Math.sin(2 * l) * p / 2 - A * Math.sin(4 * l) * m / 16 - S * Math.sin(6 * l) * _ / 48 - 5 * Math.sin(8 * l) * y / 512,
          C = e._constants;

      C.a = r, C.b = n, C.f = i, C.cosineHeading = a, C.sineHeading = o, C.tanU = s, C.cosineU = u, C.sineU = c, C.sigma = l, C.sineAlpha = f, C.sineSquaredAlpha = h, C.cosineSquaredAlpha = d, C.cosineAlpha = E, C.u2Over4 = p, C.u4Over16 = m, C.u6Over64 = _, C.u8Over256 = y, C.a0 = R, C.a1 = T, C.a2 = A, C.a3 = S, C.distanceRatio = g;
    }

    function c(e, t) {
      return e * t * (4 + e * (4 - 3 * t)) / 16;
    }

    function l(e, t, r, n, i, a, o) {
      var s = c(e, r);
      return (1 - s) * e * t * (n + s * i * (o + s * a * (2 * o * o - 1)));
    }

    function f(e, t, r, n, i, a, o) {
      var u,
          c,
          f,
          h,
          d,
          E = (t - r) / t,
          p = a - n,
          m = Math.atan((1 - E) * Math.tan(i)),
          _ = Math.atan((1 - E) * Math.tan(o)),
          y = Math.cos(m),
          R = Math.sin(m),
          T = Math.cos(_),
          A = Math.sin(_),
          S = y * T,
          g = y * A,
          C = R * A,
          v = R * T,
          I = p,
          O = s.TWO_PI,
          N = Math.cos(I),
          M = Math.sin(I);

      do {
        N = Math.cos(I), M = Math.sin(I);
        var w = g - v * N;
        f = Math.sqrt(T * T * M * M + w * w), c = C + S * N, u = Math.atan2(f, c);
        var P;
        0 === f ? (P = 0, h = 1) : (P = S * M / f, h = 1 - P * P), O = I, d = c - 2 * C / h, isNaN(d) && (d = 0), I = p + l(E, P, h, u, f, c, d);
      } while (Math.abs(I - O) > s.EPSILON12);

      var D = h * (t * t - r * r) / (r * r),
          U = 1 + D * (4096 + D * (D * (320 - 175 * D) - 768)) / 16384,
          F = D * (256 + D * (D * (74 - 47 * D) - 128)) / 1024,
          x = d * d,
          L = F * f * (d + F * (c * (2 * x - 1) - F * d * (4 * f * f - 3) * (4 * x - 3) / 6) / 4),
          B = r * U * (u - L),
          b = Math.atan2(T * M, g - v * N),
          q = Math.atan2(y * M, g * N - v);
      e._distance = B, e._startHeading = b, e._endHeading = q, e._uSquared = D;
    }

    function h(r, n, i, a) {
      e.normalize(a.cartographicToCartesian(n, p), E), e.normalize(a.cartographicToCartesian(i, p), p);
      f(r, a.maximumRadius, a.minimumRadius, n.longitude, n.latitude, i.longitude, i.latitude), r._start = t.clone(n, r._start), r._end = t.clone(i, r._end), r._start.height = 0, r._end.height = 0, u(r);
    }

    function d(e, r, a) {
      var s = n(a, o.WGS84);
      this._ellipsoid = s, this._start = new t(), this._end = new t(), this._constants = {}, this._startHeading = void 0, this._endHeading = void 0, this._distance = void 0, this._uSquared = void 0, i(e) && i(r) && h(this, e, r, s);
    }

    var E = new e(),
        p = new e();
    return a(d.prototype, {
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
      startHeading: {
        get: function get() {
          return this._startHeading;
        }
      },
      endHeading: {
        get: function get() {
          return this._endHeading;
        }
      }
    }), d.prototype.setEndPoints = function (e, t) {
      h(this, e, t, this._ellipsoid);
    }, d.prototype.interpolateUsingFraction = function (e, t) {
      return this.interpolateUsingSurfaceDistance(this._distance * e, t);
    }, d.prototype.interpolateUsingSurfaceDistance = function (e, r) {
      var n = this._constants,
          a = n.distanceRatio + e / n.b,
          o = Math.cos(2 * a),
          s = Math.cos(4 * a),
          u = Math.cos(6 * a),
          c = Math.sin(2 * a),
          f = Math.sin(4 * a),
          h = Math.sin(6 * a),
          d = Math.sin(8 * a),
          E = a * a,
          p = a * E,
          m = n.u8Over256,
          _ = n.u2Over4,
          y = n.u6Over64,
          R = n.u4Over16,
          T = 2 * p * m * o / 3 + a * (1 - _ + 7 * R / 4 - 15 * y / 4 + 579 * m / 64 - (R - 15 * y / 4 + 187 * m / 16) * o - (5 * y / 4 - 115 * m / 16) * s - 29 * m * u / 16) + (_ / 2 - R + 71 * y / 32 - 85 * m / 16) * c + (5 * R / 16 - 5 * y / 4 + 383 * m / 96) * f - E * ((y - 11 * m / 2) * c + 5 * m * f / 2) + (29 * y / 96 - 29 * m / 16) * h + 539 * m * d / 1536,
          A = Math.asin(Math.sin(T) * n.cosineAlpha),
          S = Math.atan(n.a / n.b * Math.tan(A));
      T -= n.sigma;
      var g = Math.cos(2 * n.sigma + T),
          C = Math.sin(T),
          v = Math.cos(T),
          I = n.cosineU * v,
          O = n.sineU * C,
          N = Math.atan2(C * n.sineHeading, I - O * n.cosineHeading),
          M = N - l(n.f, n.sineAlpha, n.cosineSquaredAlpha, T, C, v, g);
      return i(r) ? (r.longitude = this._start.longitude + M, r.latitude = S, r.height = 0, r) : new t(this._start.longitude + M, S, 0);
    }, d;
  }), define("Core/EllipsoidRhumbLine", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Math"], function (e, t, r, n, i, a, o, s, u) {
    "use strict";

    function c(e, t, r) {
      if (0 === e) return t * r;
      var n = e * e,
          i = n * n,
          a = i * n,
          o = a * n,
          s = o * n,
          u = s * n,
          c = r;
      return t * ((1 - n / 4 - 3 * i / 64 - 5 * a / 256 - 175 * o / 16384 - 441 * s / 65536 - 4851 * u / 1048576) * c - (3 * n / 8 + 3 * i / 32 + 45 * a / 1024 + 105 * o / 4096 + 2205 * s / 131072 + 6237 * u / 524288) * Math.sin(2 * c) + (15 * i / 256 + 45 * a / 1024 + 525 * o / 16384 + 1575 * s / 65536 + 155925 * u / 8388608) * Math.sin(4 * c) - (35 * a / 3072 + 175 * o / 12288 + 3675 * s / 262144 + 13475 * u / 1048576) * Math.sin(6 * c) + (315 * o / 131072 + 2205 * s / 524288 + 43659 * u / 8388608) * Math.sin(8 * c) - (693 * s / 1310720 + 6237 * u / 5242880) * Math.sin(10 * c) + 1001 * u / 8388608 * Math.sin(12 * c));
    }

    function l(e, t, r) {
      var n = e / r;
      if (0 === t) return n;

      var i = n * n,
          a = i * n,
          o = a * n,
          s = t,
          u = s * s,
          c = u * u,
          l = c * u,
          f = l * u,
          h = f * u,
          d = h * u,
          E = Math.sin(2 * n),
          p = Math.cos(2 * n),
          m = Math.sin(4 * n),
          _ = Math.cos(4 * n),
          y = Math.sin(6 * n),
          R = Math.cos(6 * n),
          T = Math.sin(8 * n),
          A = Math.cos(8 * n),
          S = Math.sin(10 * n);

      return n + n * u / 4 + 7 * n * c / 64 + 15 * n * l / 256 + 579 * n * f / 16384 + 1515 * n * h / 65536 + 16837 * n * d / 1048576 + (3 * n * c / 16 + 45 * n * l / 256 - n * (32 * i - 561) * f / 4096 - n * (232 * i - 1677) * h / 16384 + n * (399985 - 90560 * i + 512 * o) * d / 5242880) * p + (21 * n * l / 256 + 483 * n * f / 4096 - n * (224 * i - 1969) * h / 16384 - n * (33152 * i - 112599) * d / 1048576) * _ + (151 * n * f / 4096 + 4681 * n * h / 65536 + 1479 * n * d / 16384 - 453 * a * d / 32768) * R + (1097 * n * h / 65536 + 42783 * n * d / 1048576) * A + 8011 * n * d / 1048576 * Math.cos(10 * n) + (3 * u / 8 + 3 * c / 16 + 213 * l / 2048 - 3 * i * l / 64 + 255 * f / 4096 - 33 * i * f / 512 + 20861 * h / 524288 - 33 * i * h / 512 + o * h / 1024 + 28273 * d / 1048576 - 471 * i * d / 8192 + 9 * o * d / 4096) * E + (21 * c / 256 + 21 * l / 256 + 533 * f / 8192 - 21 * i * f / 512 + 197 * h / 4096 - 315 * i * h / 4096 + 584039 * d / 16777216 - 12517 * i * d / 131072 + 7 * o * d / 2048) * m + (151 * l / 6144 + 151 * f / 4096 + 5019 * h / 131072 - 453 * i * h / 16384 + 26965 * d / 786432 - 8607 * i * d / 131072) * y + (1097 * f / 131072 + 1097 * h / 65536 + 225797 * d / 10485760 - 1097 * i * d / 65536) * T + (8011 * h / 2621440 + 8011 * d / 1048576) * S + 293393 * d / 251658240 * Math.sin(12 * n);
    }

    function f(e, t) {
      if (0 === e) return Math.log(Math.tan(.5 * (u.PI_OVER_TWO + t)));
      var r = e * Math.sin(t);
      return Math.log(Math.tan(.5 * (u.PI_OVER_TWO + t))) - e / 2 * Math.log((1 + r) / (1 - r));
    }

    function h(e, t, r, n, i) {
      var a = f(e._ellipticity, r),
          o = f(e._ellipticity, i);
      return Math.atan2(u.negativePiToPi(n - t), o - a);
    }

    function d(e, t, r, n, i, a, o) {
      var s = e._heading,
          l = a - n,
          f = 0;
      if (u.equalsEpsilon(Math.abs(s), u.PI_OVER_TWO, u.EPSILON8)) {
        if (t === r) f = t * Math.cos(i) * u.negativePiToPi(l);else {
          var h = Math.sin(i);
          f = t * Math.cos(i) * u.negativePiToPi(l) / Math.sqrt(1 - e._ellipticitySquared * h * h);
        }
      } else {
        var d = c(e._ellipticity, t, i);
        f = (c(e._ellipticity, t, o) - d) / Math.cos(s);
      }
      return Math.abs(f);
    }

    function E(r, n, i, a) {
      var o = (e.normalize(a.cartographicToCartesian(n, y), _), e.normalize(a.cartographicToCartesian(i, y), y), a.maximumRadius),
          s = a.minimumRadius,
          u = o * o,
          c = s * s;
      r._ellipticitySquared = (u - c) / u, r._ellipticity = Math.sqrt(r._ellipticitySquared), r._start = t.clone(n, r._start), r._start.height = 0, r._end = t.clone(i, r._end), r._end.height = 0, r._heading = h(r, n.longitude, n.latitude, i.longitude, i.latitude), r._distance = d(r, a.maximumRadius, a.minimumRadius, n.longitude, n.latitude, i.longitude, i.latitude);
    }

    function p(e, r, n, a, o, s) {
      var h,
          d,
          E,
          p = o * o;

      if (Math.abs(u.PI_OVER_TWO - Math.abs(r)) > u.EPSILON8) {
        d = l(c(o, a, e.latitude) + n * Math.cos(r), o, a);

        var m = f(o, e.latitude),
            _ = f(o, d);

        E = Math.tan(r) * (_ - m), h = u.negativePiToPi(e.longitude + E);
      } else {
        d = e.latitude;
        var y;
        if (0 === o) y = a * Math.cos(e.latitude);else {
          var R = Math.sin(e.latitude);
          y = a * Math.cos(e.latitude) / Math.sqrt(1 - p * R * R);
        }
        E = n / y, h = r > 0 ? u.negativePiToPi(e.longitude + E) : u.negativePiToPi(e.longitude - E);
      }

      return i(s) ? (s.longitude = h, s.latitude = d, s.height = 0, s) : new t(h, d, 0);
    }

    function m(e, r, a) {
      var o = n(a, s.WGS84);
      this._ellipsoid = o, this._start = new t(), this._end = new t(), this._heading = void 0, this._distance = void 0, this._ellipticity = void 0, this._ellipticitySquared = void 0, i(e) && i(r) && E(this, e, r, o);
    }

    var _ = new e(),
        y = new e();

    return a(m.prototype, {
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
    }), m.fromStartHeadingDistance = function (e, t, r, a, o) {
      var c = n(a, s.WGS84),
          l = c.maximumRadius,
          f = c.minimumRadius,
          h = l * l,
          d = f * f,
          E = Math.sqrt((h - d) / h);
      t = u.negativePiToPi(t);

      var _ = p(e, t, r, c.maximumRadius, E);

      return !i(o) || i(a) && !a.equals(o.ellipsoid) ? new m(e, _, c) : (o.setEndPoints(e, _), o);
    }, m.prototype.setEndPoints = function (e, t) {
      E(this, e, t, this._ellipsoid);
    }, m.prototype.interpolateUsingFraction = function (e, t) {
      return this.interpolateUsingSurfaceDistance(e * this._distance, t);
    }, m.prototype.interpolateUsingSurfaceDistance = function (e, t) {
      return p(this._start, this._heading, e, this._ellipsoid.maximumRadius, this._ellipticity, t);
    }, m.prototype.findIntersectionWithLongitude = function (e, r) {
      var n = this._ellipticity,
          a = this._heading,
          o = Math.abs(a),
          s = this._start;
      if (e = u.negativePiToPi(e), u.equalsEpsilon(Math.abs(e), Math.PI, u.EPSILON14) && (e = u.sign(s.longitude) * Math.PI), i(r) || (r = new t()), Math.abs(u.PI_OVER_TWO - o) <= u.EPSILON8) return r.longitude = e, r.latitude = s.latitude, r.height = 0, r;

      if (u.equalsEpsilon(Math.abs(u.PI_OVER_TWO - o), u.PI_OVER_TWO, u.EPSILON8)) {
        if (u.equalsEpsilon(e, s.longitude, u.EPSILON12)) return;
        return r.longitude = e, r.latitude = u.PI_OVER_TWO * u.sign(u.PI_OVER_TWO - a), r.height = 0, r;
      }

      var c,
          l = s.latitude,
          f = n * Math.sin(l),
          h = Math.tan(.5 * (u.PI_OVER_TWO + l)) * Math.exp((e - s.longitude) / Math.tan(a)),
          d = (1 + f) / (1 - f),
          E = s.latitude;

      do {
        c = E;
        var p = n * Math.sin(c),
            m = (1 + p) / (1 - p);
        E = 2 * Math.atan(h * Math.pow(m / d, n / 2)) - u.PI_OVER_TWO;
      } while (!u.equalsEpsilon(E, c, u.EPSILON12));

      return r.longitude = e, r.latitude = E, r.height = 0, r;
    }, m.prototype.findIntersectionWithLatitude = function (e, r) {
      var n = this._ellipticity,
          a = this._heading,
          o = this._start;

      if (!u.equalsEpsilon(Math.abs(a), u.PI_OVER_TWO, u.EPSILON8)) {
        var s = f(n, o.latitude),
            c = f(n, e),
            l = Math.tan(a) * (c - s),
            h = u.negativePiToPi(o.longitude + l);
        return i(r) ? (r.longitude = h, r.latitude = e, r.height = 0, r) : new t(h, e, 0);
      }
    }, m;
  }), define("Core/QuadraticRealPolynomial", ["./DeveloperError", "./Math"], function (e, t) {
    "use strict";

    function r(e, r, n) {
      var i = e + r;
      return t.sign(e) !== t.sign(r) && Math.abs(i / Math.max(Math.abs(e), Math.abs(r))) < n ? 0 : i;
    }

    var n = {};
    return n.computeDiscriminant = function (e, t, r) {
      return t * t - 4 * e * r;
    }, n.computeRealRoots = function (e, n, i) {
      var a;
      if (0 === e) return 0 === n ? [] : [-i / n];

      if (0 === n) {
        if (0 === i) return [0, 0];
        var o = Math.abs(i),
            s = Math.abs(e);
        if (o < s && o / s < t.EPSILON14) return [0, 0];
        if (o > s && s / o < t.EPSILON14) return [];
        if ((a = -i / e) < 0) return [];
        var u = Math.sqrt(a);
        return [-u, u];
      }

      if (0 === i) return a = -n / e, a < 0 ? [a, 0] : [0, a];
      var c = n * n,
          l = 4 * e * i,
          f = r(c, -l, t.EPSILON14);
      if (f < 0) return [];
      var h = -.5 * r(n, t.sign(n) * Math.sqrt(f), t.EPSILON14);
      return n > 0 ? [h / e, i / h] : [i / h, h / e];
    }, n;
  }), define("Core/CubicRealPolynomial", ["./DeveloperError", "./QuadraticRealPolynomial"], function (e, t) {
    "use strict";

    function r(e, t, r, n) {
      var i,
          a,
          o = e,
          s = t / 3,
          u = r / 3,
          c = n,
          l = o * u,
          f = s * c,
          h = s * s,
          d = u * u,
          E = o * u - h,
          p = o * c - s * u,
          m = s * c - d,
          _ = 4 * E * m - p * p;

      if (_ < 0) {
        var y, R, T;
        h * f >= l * d ? (y = o, R = E, T = -2 * s * E + o * p) : (y = c, R = m, T = -c * p + 2 * u * m);
        var A = T < 0 ? -1 : 1,
            S = -A * Math.abs(y) * Math.sqrt(-_);
        a = -T + S;
        var g = a / 2,
            C = g < 0 ? -Math.pow(-g, 1 / 3) : Math.pow(g, 1 / 3),
            v = a === S ? -C : -R / C;
        return i = R <= 0 ? C + v : -T / (C * C + v * v + R), h * f >= l * d ? [(i - s) / o] : [-c / (i + u)];
      }

      var I = E,
          O = -2 * s * E + o * p,
          N = m,
          M = -c * p + 2 * u * m,
          w = Math.sqrt(_),
          P = Math.sqrt(3) / 2,
          D = Math.abs(Math.atan2(o * w, -O) / 3);
      i = 2 * Math.sqrt(-I);
      var U = Math.cos(D);
      a = i * U;
      var F = i * (-U / 2 - P * Math.sin(D)),
          x = a + F > 2 * s ? a - s : F - s,
          L = o,
          B = x / L;
      D = Math.abs(Math.atan2(c * w, -M) / 3), i = 2 * Math.sqrt(-N), U = Math.cos(D), a = i * U, F = i * (-U / 2 - P * Math.sin(D));
      var b = -c,
          q = a + F < 2 * u ? a + u : F + u,
          G = b / q,
          z = L * q,
          V = -x * q - L * b,
          W = x * b,
          H = (u * V - s * W) / (-s * V + u * z);
      return B <= H ? B <= G ? H <= G ? [B, H, G] : [B, G, H] : [G, B, H] : B <= G ? [H, B, G] : H <= G ? [H, G, B] : [G, H, B];
    }

    var n = {};
    return n.computeDiscriminant = function (e, t, r, n) {
      var i = e * e,
          a = t * t,
          o = r * r;
      return 18 * e * t * r * n + a * o - 27 * i * (n * n) - 4 * (e * o * r + a * t * n);
    }, n.computeRealRoots = function (e, n, i, a) {
      var o, s;
      if (0 === e) return t.computeRealRoots(n, i, a);

      if (0 === n) {
        if (0 === i) {
          if (0 === a) return [0, 0, 0];
          s = -a / e;
          var u = s < 0 ? -Math.pow(-s, 1 / 3) : Math.pow(s, 1 / 3);
          return [u, u, u];
        }

        return 0 === a ? (o = t.computeRealRoots(e, 0, i), 0 === o.Length ? [0] : [o[0], 0, o[1]]) : r(e, 0, i, a);
      }

      return 0 === i ? 0 === a ? (s = -n / e, s < 0 ? [s, 0, 0] : [0, 0, s]) : r(e, n, 0, a) : 0 === a ? (o = t.computeRealRoots(e, n, i), 0 === o.length ? [0] : o[1] <= 0 ? [o[0], o[1], 0] : o[0] >= 0 ? [0, o[0], o[1]] : [o[0], 0, o[1]]) : r(e, n, i, a);
    }, n;
  }), define("Core/QuarticRealPolynomial", ["./CubicRealPolynomial", "./DeveloperError", "./Math", "./QuadraticRealPolynomial"], function (e, t, r, n) {
    "use strict";

    function i(t, i, a, o) {
      var s = t * t,
          u = i - 3 * s / 8,
          c = a - i * t / 2 + s * t / 8,
          l = o - a * t / 4 + i * s / 16 - 3 * s * s / 256,
          f = e.computeRealRoots(1, 2 * u, u * u - 4 * l, -c * c);

      if (f.length > 0) {
        var h = -t / 4,
            d = f[f.length - 1];

        if (Math.abs(d) < r.EPSILON14) {
          var E = n.computeRealRoots(1, u, l);

          if (2 === E.length) {
            var p,
                m = E[0],
                _ = E[1];

            if (m >= 0 && _ >= 0) {
              var y = Math.sqrt(m),
                  R = Math.sqrt(_);
              return [h - R, h - y, h + y, h + R];
            }

            if (m >= 0 && _ < 0) return p = Math.sqrt(m), [h - p, h + p];
            if (m < 0 && _ >= 0) return p = Math.sqrt(_), [h - p, h + p];
          }

          return [];
        }

        if (d > 0) {
          var T = Math.sqrt(d),
              A = (u + d - c / T) / 2,
              S = (u + d + c / T) / 2,
              g = n.computeRealRoots(1, T, A),
              C = n.computeRealRoots(1, -T, S);
          return 0 !== g.length ? (g[0] += h, g[1] += h, 0 !== C.length ? (C[0] += h, C[1] += h, g[1] <= C[0] ? [g[0], g[1], C[0], C[1]] : C[1] <= g[0] ? [C[0], C[1], g[0], g[1]] : g[0] >= C[0] && g[1] <= C[1] ? [C[0], g[0], g[1], C[1]] : C[0] >= g[0] && C[1] <= g[1] ? [g[0], C[0], C[1], g[1]] : g[0] > C[0] && g[0] < C[1] ? [C[0], g[0], C[1], g[1]] : [g[0], C[0], g[1], C[1]]) : g) : 0 !== C.length ? (C[0] += h, C[1] += h, C) : [];
        }
      }

      return [];
    }

    function a(t, i, a, o) {
      var s = a * a,
          u = i * i,
          c = t * t,
          l = -2 * i,
          f = a * t + u - 4 * o,
          h = c * o - a * i * t + s,
          d = e.computeRealRoots(1, l, f, h);

      if (d.length > 0) {
        var E,
            p,
            m = d[0],
            _ = i - m,
            y = _ * _,
            R = t / 2,
            T = _ / 2,
            A = y - 4 * o,
            S = y + 4 * Math.abs(o),
            g = c - 4 * m,
            C = c + 4 * Math.abs(m);

        if (m < 0 || A * C < g * S) {
          var v = Math.sqrt(g);
          E = v / 2, p = 0 === v ? 0 : (t * T - a) / v;
        } else {
          var I = Math.sqrt(A);
          E = 0 === I ? 0 : (t * T - a) / I, p = I / 2;
        }

        var O, N;
        0 === R && 0 === E ? (O = 0, N = 0) : r.sign(R) === r.sign(E) ? (O = R + E, N = m / O) : (N = R - E, O = m / N);
        var M, w;
        0 === T && 0 === p ? (M = 0, w = 0) : r.sign(T) === r.sign(p) ? (M = T + p, w = o / M) : (w = T - p, M = o / w);
        var P = n.computeRealRoots(1, O, M),
            D = n.computeRealRoots(1, N, w);
        if (0 !== P.length) return 0 !== D.length ? P[1] <= D[0] ? [P[0], P[1], D[0], D[1]] : D[1] <= P[0] ? [D[0], D[1], P[0], P[1]] : P[0] >= D[0] && P[1] <= D[1] ? [D[0], P[0], P[1], D[1]] : D[0] >= P[0] && D[1] <= P[1] ? [P[0], D[0], D[1], P[1]] : P[0] > D[0] && P[0] < D[1] ? [D[0], P[0], D[1], P[1]] : [P[0], D[0], P[1], D[1]] : P;
        if (0 !== D.length) return D;
      }

      return [];
    }

    var o = {};
    return o.computeDiscriminant = function (e, t, r, n, i) {
      var a = e * e,
          o = a * e,
          s = t * t,
          u = s * t,
          c = r * r,
          l = c * r,
          f = n * n,
          h = f * n,
          d = i * i;
      return s * c * f - 4 * u * h - 4 * e * l * f + 18 * e * t * r * h - 27 * a * f * f + 256 * o * (d * i) + i * (18 * u * r * n - 4 * s * l + 16 * e * c * c - 80 * e * t * c * n - 6 * e * s * f + 144 * a * r * f) + d * (144 * e * s * r - 27 * s * s - 128 * a * c - 192 * a * t * n);
    }, o.computeRealRoots = function (t, n, o, s, u) {
      if (Math.abs(t) < r.EPSILON15) return e.computeRealRoots(n, o, s, u);
      var c = n / t,
          l = o / t,
          f = s / t,
          h = u / t,
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
  }), define("Core/Ray", ["./Cartesian3", "./Check", "./defaultValue", "./defined"], function (e, t, r, n) {
    "use strict";

    function i(t, n) {
      n = e.clone(r(n, e.ZERO)), e.equals(n, e.ZERO) || e.normalize(n, n), this.origin = e.clone(r(t, e.ZERO)), this.direction = n;
    }

    return i.clone = function (t, r) {
      if (n(t)) return n(r) ? (r.origin = e.clone(t.origin), r.direction = e.clone(t.direction), r) : new i(t.origin, t.direction);
    }, i.getPoint = function (t, r, i) {
      return n(i) || (i = new e()), i = e.multiplyByScalar(t.direction, r, i), e.add(t.origin, i, i);
    }, i;
  }), define("Core/IntersectionTests", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Interval", "./Math", "./Matrix3", "./QuadraticRealPolynomial", "./QuarticRealPolynomial", "./Ray"], function (e, t, r, n, i, a, o, s, u, c, l) {
    "use strict";

    function f(e, t, r, n) {
      var i = t * t - 4 * e * r;

      if (!(i < 0)) {
        if (i > 0) {
          var a = 1 / (2 * e),
              o = Math.sqrt(i),
              s = (-t + o) * a,
              u = (-t - o) * a;
          return s < u ? (n.root0 = s, n.root1 = u) : (n.root0 = u, n.root1 = s), n;
        }

        var c = -t / (2 * e);
        if (0 !== c) return n.root0 = n.root1 = c, n;
      }
    }

    function h(t, r, i) {
      n(i) || (i = new a());
      var o = t.origin,
          s = t.direction,
          u = r.center,
          c = r.radius * r.radius,
          l = e.subtract(o, u, y),
          h = e.dot(s, s),
          d = 2 * e.dot(s, l),
          E = e.magnitudeSquared(l) - c,
          p = f(h, d, E, S);
      if (n(p)) return i.start = p.root0, i.stop = p.root1, i;
    }

    function d(e, t, r) {
      var n = e + t;
      return o.sign(e) !== o.sign(t) && Math.abs(n / Math.max(Math.abs(e), Math.abs(t))) < r ? 0 : n;
    }

    function E(t, r, n, i, a) {
      var l,
          f = i * i,
          h = a * a,
          E = (t[s.COLUMN1ROW1] - t[s.COLUMN2ROW2]) * h,
          p = a * (i * d(t[s.COLUMN1ROW0], t[s.COLUMN0ROW1], o.EPSILON15) + r.y),
          m = t[s.COLUMN0ROW0] * f + t[s.COLUMN2ROW2] * h + i * r.x + n,
          _ = h * d(t[s.COLUMN2ROW1], t[s.COLUMN1ROW2], o.EPSILON15),
          y = a * (i * d(t[s.COLUMN2ROW0], t[s.COLUMN0ROW2]) + r.z),
          R = [];

      if (0 === y && 0 === _) {
        if (l = u.computeRealRoots(E, p, m), 0 === l.length) return R;
        var T = l[0],
            A = Math.sqrt(Math.max(1 - T * T, 0));

        if (R.push(new e(i, a * T, a * -A)), R.push(new e(i, a * T, a * A)), 2 === l.length) {
          var S = l[1],
              g = Math.sqrt(Math.max(1 - S * S, 0));
          R.push(new e(i, a * S, a * -g)), R.push(new e(i, a * S, a * g));
        }

        return R;
      }

      var C = y * y,
          v = _ * _,
          I = E * E,
          O = y * _,
          N = I + v,
          M = 2 * (p * E + O),
          w = 2 * m * E + p * p - v + C,
          P = 2 * (m * p - O),
          D = m * m - C;
      if (0 === N && 0 === M && 0 === w && 0 === P) return R;
      l = c.computeRealRoots(N, M, w, P, D);
      var U = l.length;
      if (0 === U) return R;

      for (var F = 0; F < U; ++F) {
        var x,
            L = l[F],
            B = L * L,
            b = Math.max(1 - B, 0),
            q = Math.sqrt(b);
        x = o.sign(E) === o.sign(m) ? d(E * B + m, p * L, o.EPSILON12) : o.sign(m) === o.sign(p * L) ? d(E * B, p * L + m, o.EPSILON12) : d(E * B + p * L, m, o.EPSILON12);
        var G = d(_ * L, y, o.EPSILON15),
            z = x * G;
        z < 0 ? R.push(new e(i, a * L, a * q)) : z > 0 ? R.push(new e(i, a * L, a * -q)) : 0 !== q ? (R.push(new e(i, a * L, a * -q)), R.push(new e(i, a * L, a * q)), ++F) : R.push(new e(i, a * L, a * q));
      }

      return R;
    }

    var p = {};

    p.rayPlane = function (t, r, i) {
      n(i) || (i = new e());
      var a = t.origin,
          s = t.direction,
          u = r.normal,
          c = e.dot(u, s);

      if (!(Math.abs(c) < o.EPSILON15)) {
        var l = (-r.distance - e.dot(u, a)) / c;
        if (!(l < 0)) return i = e.multiplyByScalar(s, l, i), e.add(a, i, i);
      }
    };

    var m = new e(),
        _ = new e(),
        y = new e(),
        R = new e(),
        T = new e();

    p.rayTriangleParametric = function (t, n, i, a, s) {
      s = r(s, !1);
      var u,
          c,
          l,
          f,
          h,
          d = t.origin,
          E = t.direction,
          p = e.subtract(i, n, m),
          A = e.subtract(a, n, _),
          S = e.cross(E, A, y),
          g = e.dot(p, S);

      if (s) {
        if (g < o.EPSILON6) return;
        if (u = e.subtract(d, n, R), (l = e.dot(u, S)) < 0 || l > g) return;
        if (c = e.cross(u, p, T), (f = e.dot(E, c)) < 0 || l + f > g) return;
        h = e.dot(A, c) / g;
      } else {
        if (Math.abs(g) < o.EPSILON6) return;
        var C = 1 / g;
        if (u = e.subtract(d, n, R), (l = e.dot(u, S) * C) < 0 || l > 1) return;
        if (c = e.cross(u, p, T), (f = e.dot(E, c) * C) < 0 || l + f > 1) return;
        h = e.dot(A, c) * C;
      }

      return h;
    }, p.rayTriangle = function (t, r, i, a, o, s) {
      var u = p.rayTriangleParametric(t, r, i, a, o);
      if (n(u) && !(u < 0)) return n(s) || (s = new e()), e.multiplyByScalar(t.direction, u, s), e.add(t.origin, s, s);
    };
    var A = new l();

    p.lineSegmentTriangle = function (t, r, i, a, o, s, u) {
      var c = A;
      e.clone(t, c.origin), e.subtract(r, t, c.direction), e.normalize(c.direction, c.direction);
      var l = p.rayTriangleParametric(c, i, a, o, s);
      if (!(!n(l) || l < 0 || l > e.distance(t, r))) return n(u) || (u = new e()), e.multiplyByScalar(c.direction, l, u), e.add(c.origin, u, u);
    };

    var S = {
      root0: 0,
      root1: 0
    };

    p.raySphere = function (e, t, r) {
      if (r = h(e, t, r), n(r) && !(r.stop < 0)) return r.start = Math.max(r.start, 0), r;
    };

    var g = new l();

    p.lineSegmentSphere = function (t, r, i, a) {
      var o = g;
      e.clone(t, o.origin);
      var s = e.subtract(r, t, o.direction),
          u = e.magnitude(s);
      if (e.normalize(s, s), a = h(o, i, a), !(!n(a) || a.stop < 0 || a.start > u)) return a.start = Math.max(a.start, 0), a.stop = Math.min(a.stop, u), a;
    };

    var C = new e(),
        v = new e();

    p.rayEllipsoid = function (t, r) {
      var n,
          i,
          o,
          s,
          u,
          c = r.oneOverRadii,
          l = e.multiplyComponents(c, t.origin, C),
          f = e.multiplyComponents(c, t.direction, v),
          h = e.magnitudeSquared(l),
          d = e.dot(l, f);

      if (h > 1) {
        if (d >= 0) return;
        var E = d * d;
        if (n = h - 1, i = e.magnitudeSquared(f), o = i * n, E < o) return;

        if (E > o) {
          s = d * d - o, u = -d + Math.sqrt(s);
          var p = u / i,
              m = n / u;
          return p < m ? new a(p, m) : {
            start: m,
            stop: p
          };
        }

        var _ = Math.sqrt(n / i);

        return new a(_, _);
      }

      return h < 1 ? (n = h - 1, i = e.magnitudeSquared(f), o = i * n, s = d * d - o, u = -d + Math.sqrt(s), new a(0, u / i)) : d < 0 ? (i = e.magnitudeSquared(f), new a(0, -d / i)) : void 0;
    };

    var I = new e(),
        O = new e(),
        N = new e(),
        M = new e(),
        w = new e(),
        P = new s(),
        D = new s(),
        U = new s(),
        F = new s(),
        x = new s(),
        L = new s(),
        B = new s(),
        b = new e(),
        q = new e(),
        G = new t();

    p.grazingAltitudeLocation = function (t, r) {
      var i = t.origin,
          a = t.direction;

      if (!e.equals(i, e.ZERO)) {
        var u = r.geodeticSurfaceNormal(i, I);
        if (e.dot(a, u) >= 0) return i;
      }

      var c = n(this.rayEllipsoid(t, r)),
          l = r.transformPositionToScaledSpace(a, I),
          f = e.normalize(l, l),
          h = e.mostOrthogonalAxis(l, M),
          d = e.normalize(e.cross(h, f, O), O),
          p = e.normalize(e.cross(f, d, N), N),
          m = P;
      m[0] = f.x, m[1] = f.y, m[2] = f.z, m[3] = d.x, m[4] = d.y, m[5] = d.z, m[6] = p.x, m[7] = p.y, m[8] = p.z;

      var _ = s.transpose(m, D),
          y = s.fromScale(r.radii, U),
          R = s.fromScale(r.oneOverRadii, F),
          T = x;

      T[0] = 0, T[1] = -a.z, T[2] = a.y, T[3] = a.z, T[4] = 0, T[5] = -a.x, T[6] = -a.y, T[7] = a.x, T[8] = 0;
      var A,
          S,
          g = s.multiply(s.multiply(_, R, L), T, L),
          C = s.multiply(s.multiply(g, y, B), m, B),
          v = s.multiplyByVector(g, i, w),
          z = E(C, e.negate(v, I), 0, 0, 1),
          V = z.length;

      if (V > 0) {
        for (var W = e.clone(e.ZERO, q), H = Number.NEGATIVE_INFINITY, X = 0; X < V; ++X) {
          A = s.multiplyByVector(y, s.multiplyByVector(m, z[X], b), b);
          var Y = e.normalize(e.subtract(A, i, M), M),
              k = e.dot(Y, a);
          k > H && (H = k, W = e.clone(A, W));
        }

        var j = r.cartesianToCartographic(W, G);
        return H = o.clamp(H, 0, 1), S = e.magnitude(e.subtract(W, i, M)) * Math.sqrt(1 - H * H), S = c ? -S : S, j.height = S, r.cartographicToCartesian(j, new e());
      }
    };

    var z = new e();
    return p.lineSegmentPlane = function (t, r, i, a) {
      n(a) || (a = new e());
      var s = e.subtract(r, t, z),
          u = i.normal,
          c = e.dot(u, s);

      if (!(Math.abs(c) < o.EPSILON6)) {
        var l = e.dot(u, t),
            f = -(i.distance + l) / c;
        if (!(f < 0 || f > 1)) return e.multiplyByScalar(s, f, a), e.add(t, a, a), a;
      }
    }, p.trianglePlaneIntersection = function (t, r, n, i) {
      var a = i.normal,
          o = i.distance,
          s = e.dot(a, t) + o < 0,
          u = e.dot(a, r) + o < 0,
          c = e.dot(a, n) + o < 0,
          l = 0;
      l += s ? 1 : 0, l += u ? 1 : 0, l += c ? 1 : 0;
      var f, h;

      if (1 !== l && 2 !== l || (f = new e(), h = new e()), 1 === l) {
        if (s) return p.lineSegmentPlane(t, r, i, f), p.lineSegmentPlane(t, n, i, h), {
          positions: [t, r, n, f, h],
          indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
        };
        if (u) return p.lineSegmentPlane(r, n, i, f), p.lineSegmentPlane(r, t, i, h), {
          positions: [t, r, n, f, h],
          indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
        };
        if (c) return p.lineSegmentPlane(n, t, i, f), p.lineSegmentPlane(n, r, i, h), {
          positions: [t, r, n, f, h],
          indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
        };
      } else if (2 === l) {
        if (!s) return p.lineSegmentPlane(r, t, i, f), p.lineSegmentPlane(n, t, i, h), {
          positions: [t, r, n, f, h],
          indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
        };
        if (!u) return p.lineSegmentPlane(n, r, i, f), p.lineSegmentPlane(t, r, i, h), {
          positions: [t, r, n, f, h],
          indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
        };
        if (!c) return p.lineSegmentPlane(t, n, i, f), p.lineSegmentPlane(r, n, i, h), {
          positions: [t, r, n, f, h],
          indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
        };
      }
    }, p;
  }), define("Core/Plane", ["./Cartesian3", "./Check", "./defined", "./DeveloperError", "./freezeObject", "./Math", "./Matrix4"], function (e, t, r, n, i, a, o) {
    "use strict";

    function s(t, r) {
      this.normal = e.clone(t), this.distance = r;
    }

    s.fromPointNormal = function (t, n, i) {
      var a = -e.dot(n, t);
      return r(i) ? (e.clone(n, i.normal), i.distance = a, i) : new s(n, a);
    };

    var u = new e();
    s.fromCartesian4 = function (t, n) {
      var i = e.fromCartesian4(t, u),
          a = t.w;
      return r(n) ? (e.clone(i, n.normal), n.distance = a, n) : new s(i, a);
    }, s.getPointDistance = function (t, r) {
      return e.dot(t.normal, r) + t.distance;
    };
    var c = new e();

    s.projectPointOntoPlane = function (t, n, i) {
      r(i) || (i = new e());
      var a = s.getPointDistance(t, n),
          o = e.multiplyByScalar(t.normal, a, c);
      return e.subtract(n, o, i);
    };

    var l = new e();
    return s.transform = function (t, r, n) {
      return o.multiplyByPointAsVector(r, t.normal, u), e.normalize(u, u), e.multiplyByScalar(t.normal, -t.distance, l), o.multiplyByPoint(r, l, l), s.fromPointNormal(l, u, n);
    }, s.clone = function (t, n) {
      return r(n) ? (e.clone(t.normal, n.normal), n.distance = t.distance, n) : new s(t.normal, t.distance);
    }, s.equals = function (t, r) {
      return t.distance === r.distance && e.equals(t.normal, r.normal);
    }, s.ORIGIN_XY_PLANE = i(new s(e.UNIT_Z, 0)), s.ORIGIN_YZ_PLANE = i(new s(e.UNIT_X, 0)), s.ORIGIN_ZX_PLANE = i(new s(e.UNIT_Y, 0)), s;
  }), define("Core/PolylinePipeline", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidGeodesic", "./EllipsoidRhumbLine", "./IntersectionTests", "./isArray", "./Math", "./Matrix4", "./Plane"], function (e, t, r, n, i, a, o, s, u, c, l, f, h) {
    "use strict";

    function d(e, t, r) {
      var n = I;
      n.length = e;
      var i;

      if (t === r) {
        for (i = 0; i < e; i++) {
          n[i] = t;
        }

        return n;
      }

      var a = r - t,
          o = a / e;

      for (i = 0; i < e; i++) {
        var s = t + i * o;
        n[i] = s;
      }

      return n;
    }

    function E(t, r, n, i, a, o, s, u) {
      var c = i.scaleToGeodeticSurface(t, w),
          l = i.scaleToGeodeticSurface(r, P),
          f = m.numberOfPoints(t, r, n),
          h = i.cartesianToCartographic(c, O),
          E = i.cartesianToCartographic(l, N),
          p = d(f, a, o);
      D.setEndPoints(h, E);

      var _ = D.surfaceDistance / f,
          y = u;

      h.height = a;
      var R = i.cartographicToCartesian(h, M);
      e.pack(R, s, y), y += 3;

      for (var T = 1; T < f; T++) {
        var A = D.interpolateUsingSurfaceDistance(T * _, N);
        A.height = p[T], R = i.cartographicToCartesian(A, M), e.pack(R, s, y), y += 3;
      }

      return y;
    }

    function p(t, r, n, i, a, o, u, c) {
      var l = i.scaleToGeodeticSurface(t, w),
          f = i.scaleToGeodeticSurface(r, P),
          h = i.cartesianToCartographic(l, O),
          E = i.cartesianToCartographic(f, N),
          p = m.numberOfPointsRhumbLine(h, E, n),
          _ = d(p, a, o);

      U.ellipsoid.equals(i) || (U = new s(void 0, void 0, i)), U.setEndPoints(h, E);
      var y = U.surfaceDistance / p,
          R = c;
      h.height = a;
      var T = i.cartographicToCartesian(h, M);
      e.pack(T, u, R), R += 3;

      for (var A = 1; A < p; A++) {
        var S = U.interpolateUsingSurfaceDistance(A * y, N);
        S.height = _[A], T = i.cartographicToCartesian(S, M), e.pack(T, u, R), R += 3;
      }

      return R;
    }

    var m = {};
    m.numberOfPoints = function (t, r, n) {
      var i = e.distance(t, r);
      return Math.ceil(i / n);
    }, m.numberOfPointsRhumbLine = function (e, t, r) {
      var n = Math.pow(e.longitude - t.longitude, 2) + Math.pow(e.latitude - t.latitude, 2);
      return Math.ceil(Math.sqrt(n / (r * r)));
    };

    var _ = new t();

    m.extractHeights = function (e, t) {
      for (var r = e.length, n = new Array(r), i = 0; i < r; i++) {
        var a = e[i];
        n[i] = t.cartesianToCartographic(a, _).height;
      }

      return n;
    };

    var y = new f(),
        R = new e(),
        T = new e(),
        A = new h(e.UNIT_X, 0),
        S = new e(),
        g = new h(e.UNIT_X, 0),
        C = new e(),
        v = new e(),
        I = [],
        O = new t(),
        N = new t(),
        M = new e(),
        w = new e(),
        P = new e(),
        D = new o(),
        U = new s();
    m.wrapLongitude = function (t, i) {
      var a = [],
          o = [];

      if (n(t) && t.length > 0) {
        i = r(i, f.IDENTITY);
        var s = f.inverseTransformation(i, y),
            c = f.multiplyByPoint(s, e.ZERO, R),
            l = e.normalize(f.multiplyByPointAsVector(s, e.UNIT_Y, T), T),
            d = h.fromPointNormal(c, l, A),
            E = e.normalize(f.multiplyByPointAsVector(s, e.UNIT_X, S), S),
            p = h.fromPointNormal(c, E, g),
            m = 1;
        a.push(e.clone(t[0]));

        for (var _ = a[0], I = t.length, O = 1; O < I; ++O) {
          var N = t[O];

          if (h.getPointDistance(p, _) < 0 || h.getPointDistance(p, N) < 0) {
            var M = u.lineSegmentPlane(_, N, d, C);

            if (n(M)) {
              var w = e.multiplyByScalar(l, 5e-9, v);
              h.getPointDistance(d, _) < 0 && e.negate(w, w), a.push(e.add(M, w, new e())), o.push(m + 1), e.negate(w, w), a.push(e.add(M, w, new e())), m = 1;
            }
          }

          a.push(e.clone(t[O])), m++, _ = N;
        }

        o.push(m);
      }

      return {
        positions: a,
        lengths: o
      };
    }, m.generateArc = function (t) {
      n(t) || (t = {});
      var i = t.positions,
          o = i.length,
          s = r(t.ellipsoid, a.WGS84),
          u = r(t.height, 0),
          f = c(u);
      if (o < 1) return [];

      if (1 === o) {
        var h = s.scaleToGeodeticSurface(i[0], w);

        if (0 !== (u = f ? u[0] : u)) {
          var d = s.geodeticSurfaceNormal(h, M);
          e.multiplyByScalar(d, u, d), e.add(h, d, h);
        }

        return [h.x, h.y, h.z];
      }

      var p = t.minDistance;

      if (!n(p)) {
        var _ = r(t.granularity, l.RADIANS_PER_DEGREE);

        p = l.chordLength(_, s.maximumRadius);
      }

      var y,
          R = 0;

      for (y = 0; y < o - 1; y++) {
        R += m.numberOfPoints(i[y], i[y + 1], p);
      }

      var T = 3 * (R + 1),
          A = new Array(T),
          S = 0;

      for (y = 0; y < o - 1; y++) {
        S = E(i[y], i[y + 1], p, s, f ? u[y] : u, f ? u[y + 1] : u, A, S);
      }

      I.length = 0;
      var g = i[o - 1],
          C = s.cartesianToCartographic(g, O);
      C.height = f ? u[o - 1] : u;
      var v = s.cartographicToCartesian(C, M);
      return e.pack(v, A, T - 3), A;
    };
    var F = new t(),
        x = new t();
    return m.generateRhumbArc = function (i) {
      n(i) || (i = {});
      var o = i.positions,
          s = o.length,
          u = r(i.ellipsoid, a.WGS84),
          f = r(i.height, 0),
          h = c(f);
      if (s < 1) return [];

      if (1 === s) {
        var d = u.scaleToGeodeticSurface(o[0], w);

        if (0 !== (f = h ? f[0] : f)) {
          var E = u.geodeticSurfaceNormal(d, M);
          e.multiplyByScalar(E, f, E), e.add(d, E, d);
        }

        return [d.x, d.y, d.z];
      }

      var _,
          y,
          R = r(i.granularity, l.RADIANS_PER_DEGREE),
          T = 0,
          A = u.cartesianToCartographic(o[0], F);

      for (_ = 0; _ < s - 1; _++) {
        y = u.cartesianToCartographic(o[_ + 1], x), T += m.numberOfPointsRhumbLine(A, y, R), A = t.clone(y, F);
      }

      var S = 3 * (T + 1),
          g = new Array(S),
          C = 0;

      for (_ = 0; _ < s - 1; _++) {
        C = p(o[_], o[_ + 1], R, u, h ? f[_] : f, h ? f[_ + 1] : f, g, C);
      }

      I.length = 0;
      var v = o[s - 1],
          N = u.cartesianToCartographic(v, O);
      N.height = h ? f[s - 1] : f;
      var P = u.cartographicToCartesian(N, M);
      return e.pack(P, g, S - 3), g;
    }, m.generateCartesianArc = function (t) {
      for (var r = m.generateArc(t), n = r.length / 3, i = new Array(n), a = 0; a < n; a++) {
        i[a] = e.unpack(r, 3 * a);
      }

      return i;
    }, m.generateCartesianRhumbArc = function (t) {
      for (var r = m.generateRhumbArc(t), n = r.length / 3, i = new Array(n), a = 0; a < n; a++) {
        i[a] = e.unpack(r, 3 * a);
      }

      return i;
    }, m;
  }), define("Core/SimplePolylineGeometry", ["./ArcType", "./BoundingSphere", "./Cartesian3", "./Color", "./ComponentDatatype", "./defaultValue", "./defined", "./deprecationWarning", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./IndexDatatype", "./Math", "./PolylinePipeline", "./PrimitiveType"], function (e, t, r, n, i, a, o, s, u, c, l, f, h, d, E, p, m) {
    "use strict";

    function _(e, t, r, i, a, o, s) {
      var u,
          c = p.numberOfPoints(e, t, a),
          l = r.red,
          f = r.green,
          h = r.blue,
          d = r.alpha,
          E = i.red,
          m = i.green,
          _ = i.blue,
          y = i.alpha;

      if (n.equals(r, i)) {
        for (u = 0; u < c; u++) {
          o[s++] = n.floatToByte(l), o[s++] = n.floatToByte(f), o[s++] = n.floatToByte(h), o[s++] = n.floatToByte(d);
        }

        return s;
      }

      var R = (E - l) / c,
          T = (m - f) / c,
          A = (_ - h) / c,
          S = (y - d) / c,
          g = s;

      for (u = 0; u < c; u++) {
        o[g++] = n.floatToByte(l + u * R), o[g++] = n.floatToByte(f + u * T), o[g++] = n.floatToByte(h + u * A), o[g++] = n.floatToByte(d + u * S);
      }

      return g;
    }

    function y(t) {
      t = a(t, a.EMPTY_OBJECT);
      var i = t.positions,
          s = t.colors,
          u = a(t.colorsPerVertex, !1);
      this._positions = i, this._colors = s, this._colorsPerVertex = u, this._arcType = a(t.arcType, e.GEODESIC), this._granularity = a(t.granularity, E.RADIANS_PER_DEGREE), this._ellipsoid = a(t.ellipsoid, c.WGS84), this._workerName = "createSimplePolylineGeometry";
      var l = 1 + i.length * r.packedLength;
      l += o(s) ? 1 + s.length * n.packedLength : 1, this.packedLength = l + c.packedLength + 3;
    }

    y.pack = function (e, t, i) {
      i = a(i, 0);
      var s,
          u = e._positions,
          l = u.length;

      for (t[i++] = l, s = 0; s < l; ++s, i += r.packedLength) {
        r.pack(u[s], t, i);
      }

      var f = e._colors;

      for (l = o(f) ? f.length : 0, t[i++] = l, s = 0; s < l; ++s, i += n.packedLength) {
        n.pack(f[s], t, i);
      }

      return c.pack(e._ellipsoid, t, i), i += c.packedLength, t[i++] = e._colorsPerVertex ? 1 : 0, t[i++] = e._arcType, t[i] = e._granularity, t;
    }, y.unpack = function (e, t, i) {
      t = a(t, 0);
      var s,
          u = e[t++],
          l = new Array(u);

      for (s = 0; s < u; ++s, t += r.packedLength) {
        l[s] = r.unpack(e, t);
      }

      u = e[t++];
      var f = u > 0 ? new Array(u) : void 0;

      for (s = 0; s < u; ++s, t += n.packedLength) {
        f[s] = n.unpack(e, t);
      }

      var h = c.unpack(e, t);
      t += c.packedLength;
      var d = 1 === e[t++],
          E = e[t++],
          p = e[t];
      return o(i) ? (i._positions = l, i._colors = f, i._ellipsoid = h, i._colorsPerVertex = d, i._arcType = E, i._granularity = p, i) : new y({
        positions: l,
        colors: f,
        ellipsoid: h,
        colorsPerVertex: d,
        arcType: E,
        granularity: p
      });
    };
    var R = new Array(2),
        T = new Array(2),
        A = {
      positions: R,
      height: T,
      ellipsoid: void 0,
      minDistance: void 0,
      granularity: void 0
    };
    return y.createGeometry = function (a) {
      var s,
          u,
          c,
          y,
          S,
          g = a._positions,
          C = a._colors,
          v = a._colorsPerVertex,
          I = a._arcType,
          O = a._granularity,
          N = a._ellipsoid,
          M = E.chordLength(O, N.maximumRadius),
          w = o(C) && !v,
          P = g.length,
          D = 0;

      if (I === e.GEODESIC || I === e.RHUMB) {
        var U, F, x;
        I === e.GEODESIC ? (U = E.chordLength(O, N.maximumRadius), F = p.numberOfPoints, x = p.generateArc) : (U = O, F = p.numberOfPointsRhumbLine, x = p.generateRhumbArc);
        var L = p.extractHeights(g, N),
            B = A;

        if (I === e.GEODESIC ? B.minDistance = M : B.granularity = O, B.ellipsoid = N, w) {
          var b = 0;

          for (s = 0; s < P - 1; s++) {
            b += F(g[s], g[s + 1], U) + 1;
          }

          u = new Float64Array(3 * b), y = new Uint8Array(4 * b), B.positions = R, B.height = T;
          var q = 0;

          for (s = 0; s < P - 1; ++s) {
            R[0] = g[s], R[1] = g[s + 1], T[0] = L[s], T[1] = L[s + 1];
            var G = x(B);

            if (o(C)) {
              var z = G.length / 3;
              S = C[s];

              for (var V = 0; V < z; ++V) {
                y[q++] = n.floatToByte(S.red), y[q++] = n.floatToByte(S.green), y[q++] = n.floatToByte(S.blue), y[q++] = n.floatToByte(S.alpha);
              }
            }

            u.set(G, D), D += G.length;
          }
        } else if (B.positions = g, B.height = L, u = new Float64Array(x(B)), o(C)) {
          for (y = new Uint8Array(u.length / 3 * 4), s = 0; s < P - 1; ++s) {
            var W = g[s],
                H = g[s + 1],
                X = C[s],
                Y = C[s + 1];
            D = _(W, H, X, Y, M, y, D);
          }

          var k = C[P - 1];
          y[D++] = n.floatToByte(k.red), y[D++] = n.floatToByte(k.green), y[D++] = n.floatToByte(k.blue), y[D++] = n.floatToByte(k.alpha);
        }
      } else {
        c = w ? 2 * P - 2 : P, u = new Float64Array(3 * c), y = o(C) ? new Uint8Array(4 * c) : void 0;
        var j = 0,
            K = 0;

        for (s = 0; s < P; ++s) {
          var Z = g[s];
          if (w && s > 0 && (r.pack(Z, u, j), j += 3, S = C[s - 1], y[K++] = n.floatToByte(S.red), y[K++] = n.floatToByte(S.green), y[K++] = n.floatToByte(S.blue), y[K++] = n.floatToByte(S.alpha)), w && s === P - 1) break;
          r.pack(Z, u, j), j += 3, o(C) && (S = C[s], y[K++] = n.floatToByte(S.red), y[K++] = n.floatToByte(S.green), y[K++] = n.floatToByte(S.blue), y[K++] = n.floatToByte(S.alpha));
        }
      }

      var J = new h();
      J.position = new f({
        componentDatatype: i.DOUBLE,
        componentsPerAttribute: 3,
        values: u
      }), o(C) && (J.color = new f({
        componentDatatype: i.UNSIGNED_BYTE,
        componentsPerAttribute: 4,
        values: y,
        normalize: !0
      })), c = u.length / 3;
      var Q = 2 * (c - 1),
          $ = d.createTypedArray(c, Q),
          ee = 0;

      for (s = 0; s < c - 1; ++s) {
        $[ee++] = s, $[ee++] = s + 1;
      }

      return new l({
        attributes: J,
        indices: $,
        primitiveType: m.LINES,
        boundingSphere: t.fromPoints(g)
      });
    }, y;
  }), define("Workers/createSimplePolylineGeometry", ["../Core/defined", "../Core/Ellipsoid", "../Core/SimplePolylineGeometry"], function (e, t, r) {
    "use strict";

    function n(n, i) {
      return e(i) && (n = r.unpack(n, i)), n._ellipsoid = t.clone(n._ellipsoid), r.createGeometry(n);
    }

    return n;
  });
}();