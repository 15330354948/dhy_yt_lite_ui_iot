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
    }, i.typeOf.number.equals = function (e, r, n, o) {
      if (i.typeOf.number(e, n), i.typeOf.number(r, o), n !== o) throw new t(e + " must be equal to " + r + ", the actual values are " + n + " and " + o);
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

    var o = {};
    o.EPSILON1 = .1, o.EPSILON2 = .01, o.EPSILON3 = .001, o.EPSILON4 = 1e-4, o.EPSILON5 = 1e-5, o.EPSILON6 = 1e-6, o.EPSILON7 = 1e-7, o.EPSILON8 = 1e-8, o.EPSILON9 = 1e-9, o.EPSILON10 = 1e-10, o.EPSILON11 = 1e-11, o.EPSILON12 = 1e-12, o.EPSILON13 = 1e-13, o.EPSILON14 = 1e-14, o.EPSILON15 = 1e-15, o.EPSILON16 = 1e-16, o.EPSILON17 = 1e-17, o.EPSILON18 = 1e-18, o.EPSILON19 = 1e-19, o.EPSILON20 = 1e-20, o.EPSILON21 = 1e-21, o.GRAVITATIONALPARAMETER = 3986004418e5, o.SOLAR_RADIUS = 6955e5, o.LUNAR_RADIUS = 1737400, o.SIXTY_FOUR_KILOBYTES = 65536, o.sign = r(Math.sign, function (e) {
      return e = +e, 0 === e || e !== e ? e : e > 0 ? 1 : -1;
    }), o.signNotZero = function (e) {
      return e < 0 ? -1 : 1;
    }, o.toSNorm = function (e, t) {
      return t = r(t, 255), Math.round((.5 * o.clamp(e, -1, 1) + .5) * t);
    }, o.fromSNorm = function (e, t) {
      return t = r(t, 255), o.clamp(e, 0, t) / t * 2 - 1;
    }, o.normalize = function (e, t, r) {
      return r = Math.max(r - t, 0), 0 === r ? 0 : o.clamp((e - t) / r, 0, 1);
    }, o.sinh = r(Math.sinh, function (e) {
      return (Math.exp(e) - Math.exp(-e)) / 2;
    }), o.cosh = r(Math.cosh, function (e) {
      return (Math.exp(e) + Math.exp(-e)) / 2;
    }), o.lerp = function (e, t, r) {
      return (1 - r) * e + r * t;
    }, o.PI = Math.PI, o.ONE_OVER_PI = 1 / Math.PI, o.PI_OVER_TWO = Math.PI / 2, o.PI_OVER_THREE = Math.PI / 3, o.PI_OVER_FOUR = Math.PI / 4, o.PI_OVER_SIX = Math.PI / 6, o.THREE_PI_OVER_TWO = 3 * Math.PI / 2, o.TWO_PI = 2 * Math.PI, o.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), o.RADIANS_PER_DEGREE = Math.PI / 180, o.DEGREES_PER_RADIAN = 180 / Math.PI, o.RADIANS_PER_ARCSECOND = o.RADIANS_PER_DEGREE / 3600, o.toRadians = function (e) {
      return e * o.RADIANS_PER_DEGREE;
    }, o.toDegrees = function (e) {
      return e * o.DEGREES_PER_RADIAN;
    }, o.convertLongitudeRange = function (e) {
      var t = o.TWO_PI,
          r = e - Math.floor(e / t) * t;
      return r < -Math.PI ? r + t : r >= Math.PI ? r - t : r;
    }, o.clampToLatitudeRange = function (e) {
      return o.clamp(e, -1 * o.PI_OVER_TWO, o.PI_OVER_TWO);
    }, o.negativePiToPi = function (e) {
      return o.zeroToTwoPi(e + o.PI) - o.PI;
    }, o.zeroToTwoPi = function (e) {
      var t = o.mod(e, o.TWO_PI);
      return Math.abs(t) < o.EPSILON14 && Math.abs(e) > o.EPSILON14 ? o.TWO_PI : t;
    }, o.mod = function (e, t) {
      return (e % t + t) % t;
    }, o.equalsEpsilon = function (e, t, n, i) {
      i = r(i, n);
      var o = Math.abs(e - t);
      return o <= i || o <= n * Math.max(Math.abs(e), Math.abs(t));
    }, o.lessThan = function (e, t, r) {
      return e - t < -r;
    }, o.lessThanOrEquals = function (e, t, r) {
      return e - t < r;
    }, o.greaterThan = function (e, t, r) {
      return e - t > r;
    }, o.greaterThanOrEquals = function (e, t, r) {
      return e - t > -r;
    };
    var a = [1];
    o.factorial = function (e) {
      var t = a.length;
      if (e >= t) for (var r = a[t - 1], n = t; n <= e; n++) {
        a.push(r * n);
      }
      return a[e];
    }, o.incrementWrap = function (e, t, n) {
      return n = r(n, 0), ++e, e > t && (e = n), e;
    }, o.isPowerOfTwo = function (e) {
      return 0 !== e && 0 == (e & e - 1);
    }, o.nextPowerOfTwo = function (e) {
      return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e;
    }, o.clamp = function (e, t, r) {
      return e < t ? t : e > r ? r : e;
    };
    var u = new e();
    return o.setRandomNumberSeed = function (t) {
      u = new e(t);
    }, o.nextRandomNumber = function () {
      return u.random();
    }, o.randomBetween = function (e, t) {
      return o.nextRandomNumber() * (t - e) + e;
    }, o.acosClamped = function (e) {
      return Math.acos(o.clamp(e, -1, 1));
    }, o.asinClamped = function (e) {
      return Math.asin(o.clamp(e, -1, 1));
    }, o.chordLength = function (e, t) {
      return 2 * t * Math.sin(.5 * e);
    }, o.logBase = function (e, t) {
      return Math.log(e) / Math.log(t);
    }, o.cbrt = r(Math.cbrt, function (e) {
      var t = Math.pow(Math.abs(e), 1 / 3);
      return e < 0 ? -t : t;
    }), o.log2 = r(Math.log2, function (e) {
      return Math.log(e) * Math.LOG2E;
    }), o.fog = function (e, t) {
      var r = e * t;
      return 1 - Math.exp(-r * r);
    }, o.fastApproximateAtan = function (e) {
      return e * (-.1784 * Math.abs(e) - .0663 * e * e + 1.0301);
    }, o.fastApproximateAtan2 = function (e, t) {
      var r,
          n,
          i = Math.abs(e);
      r = Math.abs(t), n = Math.max(i, r), r = Math.min(i, r);
      var a = r / n;
      return i = o.fastApproximateAtan(a), i = Math.abs(t) > Math.abs(e) ? o.PI_OVER_TWO - i : i, i = e < 0 ? o.PI - i : i, i = t < 0 ? -i : i;
    }, o;
  }), define("Core/Cartesian3", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, o) {
    "use strict";

    function a(e, r, n) {
      this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0);
    }

    a.fromSpherical = function (e, n) {
      r(n) || (n = new a());
      var i = e.clock,
          o = e.cone,
          u = t(e.magnitude, 1),
          s = u * Math.sin(o);
      return n.x = s * Math.cos(i), n.y = s * Math.sin(i), n.z = u * Math.cos(o), n;
    }, a.fromElements = function (e, t, n, i) {
      return r(i) ? (i.x = e, i.y = t, i.z = n, i) : new a(e, t, n);
    }, a.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t) : new a(e.x, e.y, e.z);
    }, a.fromCartesian4 = a.clone, a.packedLength = 3, a.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n++] = e.y, r[n] = e.z, r;
    }, a.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new a()), i.x = e[n++], i.y = e[n++], i.z = e[n], i;
    }, a.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 3 * n : t = new Array(3 * n);

      for (var i = 0; i < n; ++i) {
        a.pack(e[i], t, 3 * i);
      }

      return t;
    }, a.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 3 : t = new Array(n / 3);

      for (var i = 0; i < n; i += 3) {
        var o = i / 3;
        t[o] = a.unpack(e, i, t[o]);
      }

      return t;
    }, a.fromArray = a.unpack, a.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z);
    }, a.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z);
    }, a.minimumByComponent = function (e, t, r) {
      return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r.z = Math.min(e.z, t.z), r;
    }, a.maximumByComponent = function (e, t, r) {
      return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r.z = Math.max(e.z, t.z), r;
    }, a.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z;
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
      return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t;
    }, a.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z;
    }, a.multiplyComponents = function (e, t, r) {
      return r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z, r;
    }, a.divideComponents = function (e, t, r) {
      return r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z, r;
    }, a.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r;
    }, a.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r;
    }, a.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r;
    }, a.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r;
    }, a.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t;
    }, a.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t;
    };
    var s = new a();

    a.lerp = function (e, t, r, n) {
      return a.multiplyByScalar(t, r, s), n = a.multiplyByScalar(e, 1 - r, n), a.add(s, n, n);
    };

    var c = new a(),
        l = new a();

    a.angleBetween = function (e, t) {
      a.normalize(e, c), a.normalize(t, l);
      var r = a.dot(c, l),
          n = a.magnitude(a.cross(c, l, c));
      return Math.atan2(n, r);
    };

    var f = new a();
    a.mostOrthogonalAxis = function (e, t) {
      var r = a.normalize(e, f);
      return a.abs(r, r), t = r.x <= r.y ? r.x <= r.z ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_Z, t) : r.y <= r.z ? a.clone(a.UNIT_Y, t) : a.clone(a.UNIT_Z, t);
    }, a.projectVector = function (e, t, r) {
      var n = a.dot(e, t) / a.dot(t, t);
      return a.multiplyByScalar(t, n, r);
    }, a.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z;
    }, a.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2];
    }, a.equalsEpsilon = function (e, t, n, i) {
      return e === t || r(e) && r(t) && o.equalsEpsilon(e.x, t.x, n, i) && o.equalsEpsilon(e.y, t.y, n, i) && o.equalsEpsilon(e.z, t.z, n, i);
    }, a.cross = function (e, t, r) {
      var n = e.x,
          i = e.y,
          o = e.z,
          a = t.x,
          u = t.y,
          s = t.z,
          c = i * s - o * u,
          l = o * a - n * s,
          f = n * u - i * a;
      return r.x = c, r.y = l, r.z = f, r;
    }, a.midpoint = function (e, t, r) {
      return r.x = .5 * (e.x + t.x), r.y = .5 * (e.y + t.y), r.z = .5 * (e.z + t.z), r;
    }, a.fromDegrees = function (e, t, r, n, i) {
      return e = o.toRadians(e), t = o.toRadians(t), a.fromRadians(e, t, r, n, i);
    };
    var h = new a(),
        d = new a(),
        p = new a(40680631590769, 40680631590769, 40408299984661.445);
    return a.fromRadians = function (e, n, i, o, u) {
      i = t(i, 0);
      var s = r(o) ? o.radiiSquared : p,
          c = Math.cos(n);
      h.x = c * Math.cos(e), h.y = c * Math.sin(e), h.z = Math.sin(n), h = a.normalize(h, h), a.multiplyComponents(s, h, d);
      var l = Math.sqrt(a.dot(h, d));
      return d = a.divideByScalar(d, l, d), h = a.multiplyByScalar(h, i, h), r(u) || (u = new a()), a.add(d, h, u);
    }, a.fromDegreesArray = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 2 : n = new Array(i / 2);

      for (var o = 0; o < i; o += 2) {
        var u = e[o],
            s = e[o + 1],
            c = o / 2;
        n[c] = a.fromDegrees(u, s, 0, t, n[c]);
      }

      return n;
    }, a.fromRadiansArray = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 2 : n = new Array(i / 2);

      for (var o = 0; o < i; o += 2) {
        var u = e[o],
            s = e[o + 1],
            c = o / 2;
        n[c] = a.fromRadians(u, s, 0, t, n[c]);
      }

      return n;
    }, a.fromDegreesArrayHeights = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 3 : n = new Array(i / 3);

      for (var o = 0; o < i; o += 3) {
        var u = e[o],
            s = e[o + 1],
            c = e[o + 2],
            l = o / 3;
        n[l] = a.fromDegrees(u, s, c, t, n[l]);
      }

      return n;
    }, a.fromRadiansArrayHeights = function (e, t, n) {
      var i = e.length;
      r(n) ? n.length = i / 3 : n = new Array(i / 3);

      for (var o = 0; o < i; o += 3) {
        var u = e[o],
            s = e[o + 1],
            c = e[o + 2],
            l = o / 3;
        n[l] = a.fromRadians(u, s, c, t, n[l]);
      }

      return n;
    }, a.ZERO = i(new a(0, 0, 0)), a.UNIT_X = i(new a(1, 0, 0)), a.UNIT_Y = i(new a(0, 1, 0)), a.UNIT_Z = i(new a(0, 0, 1)), a.prototype.clone = function (e) {
      return a.clone(this, e);
    }, a.prototype.equals = function (e) {
      return a.equals(this, e);
    }, a.prototype.equalsEpsilon = function (e, t, r) {
      return a.equalsEpsilon(this, e, t, r);
    }, a.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }, a;
  }), define("Core/scaleToGeodeticSurface", ["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function (e, t, r, n) {
    "use strict";

    function i(r, i, u, s, c) {
      var l = r.x,
          f = r.y,
          h = r.z,
          d = i.x,
          p = i.y,
          E = i.z,
          _ = l * l * d * d,
          m = f * f * p * p,
          y = h * h * E * E,
          T = _ + m + y,
          R = Math.sqrt(1 / T),
          A = e.multiplyByScalar(r, R, o);

      if (T < s) return isFinite(R) ? e.clone(A, c) : void 0;
      var v = u.x,
          S = u.y,
          O = u.z,
          I = a;
      I.x = A.x * v * 2, I.y = A.y * S * 2, I.z = A.z * O * 2;
      var N,
          w,
          g,
          M,
          C,
          x,
          P,
          U,
          D,
          F,
          L,
          b = (1 - R) * e.magnitude(r) / (.5 * e.magnitude(I)),
          B = 0;

      do {
        b -= B, g = 1 / (1 + b * v), M = 1 / (1 + b * S), C = 1 / (1 + b * O), x = g * g, P = M * M, U = C * C, D = x * g, F = P * M, L = U * C, N = _ * x + m * P + y * U - 1, w = _ * D * v + m * F * S + y * L * O;
        B = N / (-2 * w);
      } while (Math.abs(N) > n.EPSILON12);

      return t(c) ? (c.x = l * g, c.y = f * M, c.z = h * C, c) : new e(l * g, f * M, h * C);
    }

    var o = new e(),
        a = new e();
    return i;
  }), define("Core/Cartographic", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, r, n, i, o, a) {
    "use strict";

    function u(e, t, n) {
      this.longitude = r(e, 0), this.latitude = r(t, 0), this.height = r(n, 0);
    }

    u.fromRadians = function (e, t, i, o) {
      return i = r(i, 0), n(o) ? (o.longitude = e, o.latitude = t, o.height = i, o) : new u(e, t, i);
    }, u.fromDegrees = function (e, t, r, n) {
      return e = o.toRadians(e), t = o.toRadians(t), u.fromRadians(e, t, r, n);
    };
    var s = new e(),
        c = new e(),
        l = new e(),
        f = new e(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
        h = new e(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
        d = o.EPSILON1;
    return u.fromCartesian = function (t, r, i) {
      var p = n(r) ? r.oneOverRadii : f,
          E = n(r) ? r.oneOverRadiiSquared : h,
          _ = n(r) ? r._centerToleranceSquared : d,
          m = a(t, p, E, _, c);

      if (n(m)) {
        var y = e.multiplyComponents(m, E, s);
        y = e.normalize(y, y);
        var T = e.subtract(t, m, l),
            R = Math.atan2(y.y, y.x),
            A = Math.asin(y.z),
            v = o.sign(e.dot(T, t)) * e.magnitude(T);
        return n(i) ? (i.longitude = R, i.latitude = A, i.height = v, i) : new u(R, A, v);
      }
    }, u.toCartesian = function (t, r, n) {
      return e.fromRadians(t.longitude, t.latitude, t.height, r, n);
    }, u.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.longitude = e.longitude, t.latitude = e.latitude, t.height = e.height, t) : new u(e.longitude, e.latitude, e.height);
    }, u.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height;
    }, u.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.longitude - t.longitude) <= r && Math.abs(e.latitude - t.latitude) <= r && Math.abs(e.height - t.height) <= r;
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
        r = Object.defineProperties;

    return t && e(r) || (r = function r(e) {
      return e;
    }), r;
  }), define("Core/Ellipsoid", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, r, n, i, o, a, u, s, c) {
    "use strict";

    function l(t, r, i, o) {
      r = n(r, 0), i = n(i, 0), o = n(o, 0), t._radii = new e(r, i, o), t._radiiSquared = new e(r * r, i * i, o * o), t._radiiToTheFourth = new e(r * r * r * r, i * i * i * i, o * o * o * o), t._oneOverRadii = new e(0 === r ? 0 : 1 / r, 0 === i ? 0 : 1 / i, 0 === o ? 0 : 1 / o), t._oneOverRadiiSquared = new e(0 === r ? 0 : 1 / (r * r), 0 === i ? 0 : 1 / (i * i), 0 === o ? 0 : 1 / (o * o)), t._minimumRadius = Math.min(r, i, o), t._maximumRadius = Math.max(r, i, o), t._centerToleranceSquared = s.EPSILON1, 0 !== t._radiiSquared.z && (t._squaredXOverSquaredZ = t._radiiSquared.x / t._radiiSquared.z);
    }

    function f(e, t, r) {
      this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, l(this, e, t, r);
    }

    o(f.prototype, {
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
    }, f.WGS84 = u(new f(6378137, 6378137, 6356752.314245179)), f.UNIT_SPHERE = u(new f(1, 1, 1)), f.MOON = u(new f(s.LUNAR_RADIUS, s.LUNAR_RADIUS, s.LUNAR_RADIUS)), f.prototype.clone = function (e) {
      return f.clone(this, e);
    }, f.packedLength = e.packedLength, f.pack = function (t, r, i) {
      return i = n(i, 0), e.pack(t._radii, r, i), r;
    }, f.unpack = function (t, r, i) {
      r = n(r, 0);
      var o = e.unpack(t, r);
      return f.fromCartesian3(o, i);
    }, f.prototype.geocentricSurfaceNormal = e.normalize, f.prototype.geodeticSurfaceNormalCartographic = function (t, r) {
      var n = t.longitude,
          o = t.latitude,
          a = Math.cos(o),
          u = a * Math.cos(n),
          s = a * Math.sin(n),
          c = Math.sin(o);
      return i(r) || (r = new e()), r.x = u, r.y = s, r.z = c, e.normalize(r, r);
    }, f.prototype.geodeticSurfaceNormal = function (t, r) {
      return i(r) || (r = new e()), r = e.multiplyComponents(t, this._oneOverRadiiSquared, r), e.normalize(r, r);
    };
    var h = new e(),
        d = new e();
    f.prototype.cartographicToCartesian = function (t, r) {
      var n = h,
          o = d;
      this.geodeticSurfaceNormalCartographic(t, n), e.multiplyComponents(this._radiiSquared, n, o);
      var a = Math.sqrt(e.dot(n, o));
      return e.divideByScalar(o, a, o), e.multiplyByScalar(n, t.height, n), i(r) || (r = new e()), e.add(o, n, r);
    }, f.prototype.cartographicArrayToCartesianArray = function (e, t) {
      var r = e.length;
      i(t) ? t.length = r : t = new Array(r);

      for (var n = 0; n < r; n++) {
        t[n] = this.cartographicToCartesian(e[n], t[n]);
      }

      return t;
    };

    var p = new e(),
        E = new e(),
        _ = new e();

    return f.prototype.cartesianToCartographic = function (r, n) {
      var o = this.scaleToGeodeticSurface(r, E);

      if (i(o)) {
        var a = this.geodeticSurfaceNormal(o, p),
            u = e.subtract(r, o, _),
            c = Math.atan2(a.y, a.x),
            l = Math.asin(a.z),
            f = s.sign(e.dot(u, r)) * e.magnitude(u);
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
          o = t.y,
          a = t.z,
          u = this._oneOverRadiiSquared,
          s = 1 / Math.sqrt(n * n * u.x + o * o * u.y + a * a * u.z);
      return e.multiplyByScalar(t, s, r);
    }, f.prototype.transformPositionToScaledSpace = function (t, r) {
      return i(r) || (r = new e()), e.multiplyComponents(t, this._oneOverRadii, r);
    }, f.prototype.transformPositionFromScaledSpace = function (t, r) {
      return i(r) || (r = new e()), e.multiplyComponents(t, this._radii, r);
    }, f.prototype.equals = function (t) {
      return this === t || i(t) && e.equals(this._radii, t._radii);
    }, f.prototype.toString = function () {
      return this._radii.toString();
    }, f.prototype.getSurfaceNormalIntersectionWithZAxis = function (t, r, o) {
      r = n(r, 0);
      var a = this._squaredXOverSquaredZ;
      if (i(o) || (o = new e()), o.x = 0, o.y = 0, o.z = t.z * (1 - a), !(Math.abs(o.z) >= this._radii.z - r)) return o;
    }, f;
  }), define("Core/GeographicProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function (e, t, r, n, i, o, a) {
    "use strict";

    function u(e) {
      this._ellipsoid = r(e, a.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
    }

    return i(u.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      }
    }), u.prototype.project = function (t, r) {
      var i = this._semimajorAxis,
          o = t.longitude * i,
          a = t.latitude * i,
          u = t.height;
      return n(r) ? (r.x = o, r.y = a, r.z = u, r) : new e(o, a, u);
    }, u.prototype.unproject = function (e, r) {
      var i = this._oneOverSemimajorAxis,
          o = e.x * i,
          a = e.y * i,
          u = e.z;
      return n(r) ? (r.longitude = o, r.latitude = a, r.height = u, r) : new t(o, a, u);
    }, u;
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
  }), define("Core/Matrix3", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, o, a, u) {
    "use strict";

    function s(e, t, n, i, o, a, u, s, c) {
      this[0] = r(e, 0), this[1] = r(i, 0), this[2] = r(u, 0), this[3] = r(t, 0), this[4] = r(o, 0), this[5] = r(s, 0), this[6] = r(n, 0), this[7] = r(a, 0), this[8] = r(c, 0);
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
        var n = e[s.getElementIndex(E[r], p[r])];
        t += 2 * n * n;
      }

      return Math.sqrt(t);
    }

    function f(e, t) {
      for (var r = u.EPSILON15, n = 0, i = 1, o = 0; o < 3; ++o) {
        var a = Math.abs(e[s.getElementIndex(E[o], p[o])]);
        a > n && (i = o, n = a);
      }

      var c = 1,
          l = 0,
          f = p[i],
          h = E[i];

      if (Math.abs(e[s.getElementIndex(h, f)]) > r) {
        var d,
            _ = e[s.getElementIndex(h, h)],
            m = e[s.getElementIndex(f, f)],
            y = e[s.getElementIndex(h, f)],
            T = (_ - m) / 2 / y;
        d = T < 0 ? -1 / (-T + Math.sqrt(1 + T * T)) : 1 / (T + Math.sqrt(1 + T * T)), c = 1 / Math.sqrt(1 + d * d), l = d * c;
      }

      return t = s.clone(s.IDENTITY, t), t[s.getElementIndex(f, f)] = t[s.getElementIndex(h, h)] = c, t[s.getElementIndex(h, f)] = l, t[s.getElementIndex(f, h)] = -l, t;
    }

    s.packedLength = 9, s.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t[n++] = e[4], t[n++] = e[5], t[n++] = e[6], t[n++] = e[7], t[n++] = e[8], t;
    }, s.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new s()), i[0] = e[t++], i[1] = e[t++], i[2] = e[t++], i[3] = e[t++], i[4] = e[t++], i[5] = e[t++], i[6] = e[t++], i[7] = e[t++], i[8] = e[t++], i;
    }, s.clone = function (e, t) {
      if (n(e)) return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new s(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]);
    }, s.fromArray = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new s()), i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i[4] = e[t + 4], i[5] = e[t + 5], i[6] = e[t + 6], i[7] = e[t + 7], i[8] = e[t + 8], i;
    }, s.fromColumnMajorArray = function (e, t) {
      return s.clone(e, t);
    }, s.fromRowMajorArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t) : new s(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
    }, s.fromQuaternion = function (e, t) {
      var r = e.x * e.x,
          i = e.x * e.y,
          o = e.x * e.z,
          a = e.x * e.w,
          u = e.y * e.y,
          c = e.y * e.z,
          l = e.y * e.w,
          f = e.z * e.z,
          h = e.z * e.w,
          d = e.w * e.w,
          p = r - u - f + d,
          E = 2 * (i - h),
          _ = 2 * (o + l),
          m = 2 * (i + h),
          y = -r + u - f + d,
          T = 2 * (c - a),
          R = 2 * (o - l),
          A = 2 * (c + a),
          v = -r - u + f + d;

      return n(t) ? (t[0] = p, t[1] = m, t[2] = R, t[3] = E, t[4] = y, t[5] = A, t[6] = _, t[7] = T, t[8] = v, t) : new s(p, E, _, m, y, T, R, A, v);
    }, s.fromHeadingPitchRoll = function (e, t) {
      var r = Math.cos(-e.pitch),
          i = Math.cos(-e.heading),
          o = Math.cos(e.roll),
          a = Math.sin(-e.pitch),
          u = Math.sin(-e.heading),
          c = Math.sin(e.roll),
          l = r * i,
          f = -o * u + c * a * i,
          h = c * u + o * a * i,
          d = r * u,
          p = o * i + c * a * u,
          E = -c * i + o * a * u,
          _ = -a,
          m = c * r,
          y = o * r;

      return n(t) ? (t[0] = l, t[1] = d, t[2] = _, t[3] = f, t[4] = p, t[5] = m, t[6] = h, t[7] = E, t[8] = y, t) : new s(l, f, h, d, p, E, _, m, y);
    }, s.fromScale = function (e, t) {
      return n(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e.y, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e.z, t) : new s(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z);
    }, s.fromUniformScale = function (e, t) {
      return n(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e, t) : new s(e, 0, 0, 0, e, 0, 0, 0, e);
    }, s.fromCrossProduct = function (e, t) {
      return n(t) ? (t[0] = 0, t[1] = e.z, t[2] = -e.y, t[3] = -e.z, t[4] = 0, t[5] = e.x, t[6] = e.y, t[7] = -e.x, t[8] = 0, t) : new s(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0);
    }, s.fromRotationX = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = r, t[5] = i, t[6] = 0, t[7] = -i, t[8] = r, t) : new s(1, 0, 0, 0, r, -i, 0, i, r);
    }, s.fromRotationY = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = 0, t[2] = -i, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = i, t[7] = 0, t[8] = r, t) : new s(r, 0, i, 0, 1, 0, -i, 0, r);
    }, s.fromRotationZ = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = i, t[2] = 0, t[3] = -i, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new s(r, -i, 0, i, r, 0, 0, 0, 1);
    }, s.toArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]];
    }, s.getElementIndex = function (e, t) {
      return 3 * e + t;
    }, s.getColumn = function (e, t, r) {
      var n = 3 * t,
          i = e[n],
          o = e[n + 1],
          a = e[n + 2];
      return r.x = i, r.y = o, r.z = a, r;
    }, s.setColumn = function (e, t, r, n) {
      n = s.clone(e, n);
      var i = 3 * t;
      return n[i] = r.x, n[i + 1] = r.y, n[i + 2] = r.z, n;
    }, s.getRow = function (e, t, r) {
      var n = e[t],
          i = e[t + 3],
          o = e[t + 6];
      return r.x = n, r.y = i, r.z = o, r;
    }, s.setRow = function (e, t, r, n) {
      return n = s.clone(e, n), n[t] = r.x, n[t + 3] = r.y, n[t + 6] = r.z, n;
    };
    var h = new e();

    s.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], t[2], h)), r.y = e.magnitude(e.fromElements(t[3], t[4], t[5], h)), r.z = e.magnitude(e.fromElements(t[6], t[7], t[8], h)), r;
    };

    var d = new e();
    s.getMaximumScale = function (t) {
      return s.getScale(t, d), e.maximumComponent(d);
    }, s.multiply = function (e, t, r) {
      var n = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
          i = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
          o = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
          a = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
          u = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
          s = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
          c = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
          l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
          f = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
      return r[0] = n, r[1] = i, r[2] = o, r[3] = a, r[4] = u, r[5] = s, r[6] = c, r[7] = l, r[8] = f, r;
    }, s.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r;
    }, s.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r;
    }, s.multiplyByVector = function (e, t, r) {
      var n = t.x,
          i = t.y,
          o = t.z,
          a = e[0] * n + e[3] * i + e[6] * o,
          u = e[1] * n + e[4] * i + e[7] * o,
          s = e[2] * n + e[5] * i + e[8] * o;
      return r.x = a, r.y = u, r.z = s, r;
    }, s.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r;
    }, s.multiplyByScale = function (e, t, r) {
      return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.x, r[3] = e[3] * t.y, r[4] = e[4] * t.y, r[5] = e[5] * t.y, r[6] = e[6] * t.z, r[7] = e[7] * t.z, r[8] = e[8] * t.z, r;
    }, s.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t;
    }, s.transpose = function (e, t) {
      var r = e[0],
          n = e[3],
          i = e[6],
          o = e[1],
          a = e[4],
          u = e[7],
          s = e[2],
          c = e[5],
          l = e[8];
      return t[0] = r, t[1] = n, t[2] = i, t[3] = o, t[4] = a, t[5] = u, t[6] = s, t[7] = c, t[8] = l, t;
    };

    var p = [1, 0, 0],
        E = [2, 2, 1],
        _ = new s(),
        m = new s();

    return s.computeEigenDecomposition = function (e, t) {
      var r = u.EPSILON20,
          i = 0,
          o = 0;
      n(t) || (t = {});

      for (var a = t.unitary = s.clone(s.IDENTITY, t.unitary), h = t.diagonal = s.clone(e, t.diagonal), d = r * c(h); o < 10 && l(h) > d;) {
        f(h, _), s.transpose(_, m), s.multiply(h, _, h), s.multiply(m, h, h), s.multiply(a, _, a), ++i > 2 && (++o, i = 0);
      }

      return t;
    }, s.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t;
    }, s.determinant = function (e) {
      var t = e[0],
          r = e[3],
          n = e[6],
          i = e[1],
          o = e[4],
          a = e[7],
          u = e[2],
          s = e[5],
          c = e[8];
      return t * (o * c - s * a) + i * (s * n - r * c) + u * (r * a - o * n);
    }, s.inverse = function (e, t) {
      var r = e[0],
          n = e[1],
          i = e[2],
          o = e[3],
          a = e[4],
          u = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = s.determinant(e);
      t[0] = a * f - l * u, t[1] = l * i - n * f, t[2] = n * u - a * i, t[3] = c * u - o * f, t[4] = r * f - c * i, t[5] = o * i - r * u, t[6] = o * l - c * a, t[7] = c * n - r * l, t[8] = r * a - o * n;
      var d = 1 / h;
      return s.multiplyByScalar(t, d, t);
    }, s.equals = function (e, t) {
      return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
    }, s.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r;
    }, s.IDENTITY = a(new s(1, 0, 0, 0, 1, 0, 0, 0, 1)), s.ZERO = a(new s(0, 0, 0, 0, 0, 0, 0, 0, 0)), s.COLUMN0ROW0 = 0, s.COLUMN0ROW1 = 1, s.COLUMN0ROW2 = 2, s.COLUMN1ROW0 = 3, s.COLUMN1ROW1 = 4, s.COLUMN1ROW2 = 5, s.COLUMN2ROW0 = 6, s.COLUMN2ROW1 = 7, s.COLUMN2ROW2 = 8, i(s.prototype, {
      length: {
        get: function get() {
          return s.packedLength;
        }
      }
    }), s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.equalsArray = function (e, t, r) {
      return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8];
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.prototype.toString = function () {
      return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")";
    }, s;
  }), define("Core/Cartesian4", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, o) {
    "use strict";

    function a(e, r, n, i) {
      this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0), this.w = t(i, 0);
    }

    a.fromElements = function (e, t, n, i, o) {
      return r(o) ? (o.x = e, o.y = t, o.z = n, o.w = i, o) : new a(e, t, n, i);
    }, a.fromColor = function (e, t) {
      return r(t) ? (t.x = e.red, t.y = e.green, t.z = e.blue, t.w = e.alpha, t) : new a(e.red, e.green, e.blue, e.alpha);
    }, a.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new a(e.x, e.y, e.z, e.w);
    }, a.packedLength = 4, a.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n++] = e.y, r[n++] = e.z, r[n] = e.w, r;
    }, a.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new a()), i.x = e[n++], i.y = e[n++], i.z = e[n++], i.w = e[n], i;
    }, a.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 4 * n : t = new Array(4 * n);

      for (var i = 0; i < n; ++i) {
        a.pack(e[i], t, 4 * i);
      }

      return t;
    }, a.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 4 : t = new Array(n / 4);

      for (var i = 0; i < n; i += 4) {
        var o = i / 4;
        t[o] = a.unpack(e, i, t[o]);
      }

      return t;
    }, a.fromArray = a.unpack, a.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z, e.w);
    }, a.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z, e.w);
    }, a.minimumByComponent = function (e, t, r) {
      return r.x = Math.min(e.x, t.x), r.y = Math.min(e.y, t.y), r.z = Math.min(e.z, t.z), r.w = Math.min(e.w, t.w), r;
    }, a.maximumByComponent = function (e, t, r) {
      return r.x = Math.max(e.x, t.x), r.y = Math.max(e.y, t.y), r.z = Math.max(e.z, t.z), r.w = Math.max(e.w, t.w), r;
    }, a.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
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
      return t.x = e.x / r, t.y = e.y / r, t.z = e.z / r, t.w = e.w / r, t;
    }, a.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }, a.multiplyComponents = function (e, t, r) {
      return r.x = e.x * t.x, r.y = e.y * t.y, r.z = e.z * t.z, r.w = e.w * t.w, r;
    }, a.divideComponents = function (e, t, r) {
      return r.x = e.x / t.x, r.y = e.y / t.y, r.z = e.z / t.z, r.w = e.w / t.w, r;
    }, a.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r.w = e.w + t.w, r;
    }, a.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r.w = e.w - t.w, r;
    }, a.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
    }, a.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
    }, a.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
    }, a.abs = function (e, t) {
      return t.x = Math.abs(e.x), t.y = Math.abs(e.y), t.z = Math.abs(e.z), t.w = Math.abs(e.w), t;
    };
    var s = new a();

    a.lerp = function (e, t, r, n) {
      return a.multiplyByScalar(t, r, s), n = a.multiplyByScalar(e, 1 - r, n), a.add(s, n, n);
    };

    var c = new a();
    a.mostOrthogonalAxis = function (e, t) {
      var r = a.normalize(e, c);
      return a.abs(r, r), t = r.x <= r.y ? r.x <= r.z ? r.x <= r.w ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_W, t) : r.z <= r.w ? a.clone(a.UNIT_Z, t) : a.clone(a.UNIT_W, t) : r.y <= r.z ? r.y <= r.w ? a.clone(a.UNIT_Y, t) : a.clone(a.UNIT_W, t) : r.z <= r.w ? a.clone(a.UNIT_Z, t) : a.clone(a.UNIT_W, t);
    }, a.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, a.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2] && e.w === t[r + 3];
    }, a.equalsEpsilon = function (e, t, n, i) {
      return e === t || r(e) && r(t) && o.equalsEpsilon(e.x, t.x, n, i) && o.equalsEpsilon(e.y, t.y, n, i) && o.equalsEpsilon(e.z, t.z, n, i) && o.equalsEpsilon(e.w, t.w, n, i);
    }, a.ZERO = i(new a(0, 0, 0, 0)), a.UNIT_X = i(new a(1, 0, 0, 0)), a.UNIT_Y = i(new a(0, 1, 0, 0)), a.UNIT_Z = i(new a(0, 0, 1, 0)), a.UNIT_W = i(new a(0, 0, 0, 1)), a.prototype.clone = function (e) {
      return a.clone(this, e);
    }, a.prototype.equals = function (e) {
      return a.equals(this, e);
    }, a.prototype.equalsEpsilon = function (e, t, r) {
      return a.equalsEpsilon(this, e, t, r);
    }, a.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    };
    var l = new Float32Array(1);
    return a.packFloat = function (e, t) {
      if (r(t) || (t = new a()), l[0] = e, 0 === (e = l[0])) return a.clone(a.ZERO, t);
      var n,
          i = e < 0 ? 1 : 0;
      isFinite(e) ? (e = Math.abs(e), n = Math.floor(o.logBase(e, 10)) + 1, e /= Math.pow(10, n)) : (e = .1, n = 38);
      var u = 256 * e;
      return t.x = Math.floor(u), u = 256 * (u - t.x), t.y = Math.floor(u), u = 256 * (u - t.y), t.z = Math.floor(u), t.w = 2 * (n + 38) + i, t;
    }, a.unpackFloat = function (e) {
      var t = e.w / 2,
          r = Math.floor(t),
          n = 2 * (t - r);
      if (r -= 38, n = 2 * n - 1, n = -n, r >= 38) return n < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      var i = n * e.x * (1 / 256);
      return i += n * e.y * (1 / 65536), (i += n * e.z * (1 / 16777216)) * Math.pow(10, r);
    }, a;
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
  }), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (e, t, r, n, i, o, a, u, s, c) {
    "use strict";

    function l(e, t, r, i, o, a, u, s, c, l, f, h, d, p, E, _) {
      this[0] = n(e, 0), this[1] = n(o, 0), this[2] = n(c, 0), this[3] = n(d, 0), this[4] = n(t, 0), this[5] = n(a, 0), this[6] = n(l, 0), this[7] = n(p, 0), this[8] = n(r, 0), this[9] = n(u, 0), this[10] = n(f, 0), this[11] = n(E, 0), this[12] = n(i, 0), this[13] = n(s, 0), this[14] = n(h, 0), this[15] = n(_, 0);
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
    }, l.fromRotationTranslation = function (t, r, o) {
      return r = n(r, e.ZERO), i(o) ? (o[0] = t[0], o[1] = t[1], o[2] = t[2], o[3] = 0, o[4] = t[3], o[5] = t[4], o[6] = t[5], o[7] = 0, o[8] = t[6], o[9] = t[7], o[10] = t[8], o[11] = 0, o[12] = r.x, o[13] = r.y, o[14] = r.z, o[15] = 1, o) : new l(t[0], t[3], t[6], r.x, t[1], t[4], t[7], r.y, t[2], t[5], t[8], r.z, 0, 0, 0, 1);
    }, l.fromTranslationQuaternionRotationScale = function (e, t, r, n) {
      i(n) || (n = new l());

      var o = r.x,
          a = r.y,
          u = r.z,
          s = t.x * t.x,
          c = t.x * t.y,
          f = t.x * t.z,
          h = t.x * t.w,
          d = t.y * t.y,
          p = t.y * t.z,
          E = t.y * t.w,
          _ = t.z * t.z,
          m = t.z * t.w,
          y = t.w * t.w,
          T = s - d - _ + y,
          R = 2 * (c - m),
          A = 2 * (f + E),
          v = 2 * (c + m),
          S = -s + d - _ + y,
          O = 2 * (p - h),
          I = 2 * (f - E),
          N = 2 * (p + h),
          w = -s - d + _ + y;

      return n[0] = T * o, n[1] = v * o, n[2] = I * o, n[3] = 0, n[4] = R * a, n[5] = S * a, n[6] = N * a, n[7] = 0, n[8] = A * u, n[9] = O * u, n[10] = w * u, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, n;
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
    l.fromCamera = function (t, r) {
      var n = t.position,
          o = t.direction,
          a = t.up;
      e.normalize(o, f), e.normalize(e.cross(f, a, h), h), e.normalize(e.cross(h, f, d), d);
      var u = h.x,
          s = h.y,
          c = h.z,
          p = f.x,
          E = f.y,
          _ = f.z,
          m = d.x,
          y = d.y,
          T = d.z,
          R = n.x,
          A = n.y,
          v = n.z,
          S = u * -R + s * -A + c * -v,
          O = m * -R + y * -A + T * -v,
          I = p * R + E * A + _ * v;
      return i(r) ? (r[0] = u, r[1] = m, r[2] = -p, r[3] = 0, r[4] = s, r[5] = y, r[6] = -E, r[7] = 0, r[8] = c, r[9] = T, r[10] = -_, r[11] = 0, r[12] = S, r[13] = O, r[14] = I, r[15] = 1, r) : new l(u, s, c, S, m, y, T, O, -p, -E, -_, I, 0, 0, 0, 1);
    }, l.computePerspectiveFieldOfView = function (e, t, r, n, i) {
      var o = Math.tan(.5 * e),
          a = 1 / o,
          u = a / t,
          s = (n + r) / (r - n),
          c = 2 * n * r / (r - n);
      return i[0] = u, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = a, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = s, i[11] = -1, i[12] = 0, i[13] = 0, i[14] = c, i[15] = 0, i;
    }, l.computeOrthographicOffCenter = function (e, t, r, n, i, o, a) {
      var u = 1 / (t - e),
          s = 1 / (n - r),
          c = 1 / (o - i),
          l = -(t + e) * u,
          f = -(n + r) * s,
          h = -(o + i) * c;
      return u *= 2, s *= 2, c *= -2, a[0] = u, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = c, a[11] = 0, a[12] = l, a[13] = f, a[14] = h, a[15] = 1, a;
    }, l.computePerspectiveOffCenter = function (e, t, r, n, i, o, a) {
      var u = 2 * i / (t - e),
          s = 2 * i / (n - r),
          c = (t + e) / (t - e),
          l = (n + r) / (n - r),
          f = -(o + i) / (o - i),
          h = -2 * o * i / (o - i);
      return a[0] = u, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = c, a[9] = l, a[10] = f, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = h, a[15] = 0, a;
    }, l.computeInfinitePerspectiveOffCenter = function (e, t, r, n, i, o) {
      var a = 2 * i / (t - e),
          u = 2 * i / (n - r),
          s = (t + e) / (t - e),
          c = (n + r) / (n - r),
          l = -2 * i;
      return o[0] = a, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = u, o[6] = 0, o[7] = 0, o[8] = s, o[9] = c, o[10] = -1, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = l, o[15] = 0, o;
    }, l.computeViewportTransformation = function (e, t, r, i) {
      e = n(e, n.EMPTY_OBJECT);
      var o = n(e.x, 0),
          a = n(e.y, 0),
          u = n(e.width, 0),
          s = n(e.height, 0);
      t = n(t, 0), r = n(r, 1);

      var c = .5 * u,
          l = .5 * s,
          f = .5 * (r - t),
          h = c,
          d = l,
          p = f,
          E = o + c,
          _ = a + l,
          m = t + f;

      return i[0] = h, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = d, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = p, i[11] = 0, i[12] = E, i[13] = _, i[14] = m, i[15] = 1, i;
    }, l.computeView = function (t, r, n, i, o) {
      return o[0] = i.x, o[1] = n.x, o[2] = -r.x, o[3] = 0, o[4] = i.y, o[5] = n.y, o[6] = -r.y, o[7] = 0, o[8] = i.z, o[9] = n.z, o[10] = -r.z, o[11] = 0, o[12] = -e.dot(i, t), o[13] = -e.dot(n, t), o[14] = e.dot(r, t), o[15] = 1, o;
    }, l.toArray = function (e, t) {
      return i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]];
    }, l.getElementIndex = function (e, t) {
      return 4 * e + t;
    }, l.getColumn = function (e, t, r) {
      var n = 4 * t,
          i = e[n],
          o = e[n + 1],
          a = e[n + 2],
          u = e[n + 3];
      return r.x = i, r.y = o, r.z = a, r.w = u, r;
    }, l.setColumn = function (e, t, r, n) {
      n = l.clone(e, n);
      var i = 4 * t;
      return n[i] = r.x, n[i + 1] = r.y, n[i + 2] = r.z, n[i + 3] = r.w, n;
    }, l.setTranslation = function (e, t, r) {
      return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = e[15], r;
    };
    var p = new e();
    l.setScale = function (t, r, n) {
      var i = l.getScale(t, p),
          o = e.divideComponents(r, i, p);
      return l.multiplyByScale(t, o, n);
    }, l.getRow = function (e, t, r) {
      var n = e[t],
          i = e[t + 4],
          o = e[t + 8],
          a = e[t + 12];
      return r.x = n, r.y = i, r.z = o, r.w = a, r;
    }, l.setRow = function (e, t, r, n) {
      return n = l.clone(e, n), n[t] = r.x, n[t + 4] = r.y, n[t + 8] = r.z, n[t + 12] = r.w, n;
    };
    var E = new e();

    l.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], t[2], E)), r.y = e.magnitude(e.fromElements(t[4], t[5], t[6], E)), r.z = e.magnitude(e.fromElements(t[8], t[9], t[10], E)), r;
    };

    var _ = new e();

    l.getMaximumScale = function (t) {
      return l.getScale(t, _), e.maximumComponent(_);
    }, l.multiply = function (e, t, r) {
      var n = e[0],
          i = e[1],
          o = e[2],
          a = e[3],
          u = e[4],
          s = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = e[9],
          d = e[10],
          p = e[11],
          E = e[12],
          _ = e[13],
          m = e[14],
          y = e[15],
          T = t[0],
          R = t[1],
          A = t[2],
          v = t[3],
          S = t[4],
          O = t[5],
          I = t[6],
          N = t[7],
          w = t[8],
          g = t[9],
          M = t[10],
          C = t[11],
          x = t[12],
          P = t[13],
          U = t[14],
          D = t[15],
          F = n * T + u * R + f * A + E * v,
          L = i * T + s * R + h * A + _ * v,
          b = o * T + c * R + d * A + m * v,
          B = a * T + l * R + p * A + y * v,
          z = n * S + u * O + f * I + E * N,
          q = i * S + s * O + h * I + _ * N,
          G = o * S + c * O + d * I + m * N,
          V = a * S + l * O + p * I + y * N,
          X = n * w + u * g + f * M + E * C,
          W = i * w + s * g + h * M + _ * C,
          H = o * w + c * g + d * M + m * C,
          k = a * w + l * g + p * M + y * C,
          Y = n * x + u * P + f * U + E * D,
          j = i * x + s * P + h * U + _ * D,
          K = o * x + c * P + d * U + m * D,
          Z = a * x + l * P + p * U + y * D;
      return r[0] = F, r[1] = L, r[2] = b, r[3] = B, r[4] = z, r[5] = q, r[6] = G, r[7] = V, r[8] = X, r[9] = W, r[10] = H, r[11] = k, r[12] = Y, r[13] = j, r[14] = K, r[15] = Z, r;
    }, l.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r[9] = e[9] + t[9], r[10] = e[10] + t[10], r[11] = e[11] + t[11], r[12] = e[12] + t[12], r[13] = e[13] + t[13], r[14] = e[14] + t[14], r[15] = e[15] + t[15], r;
    }, l.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r[9] = e[9] - t[9], r[10] = e[10] - t[10], r[11] = e[11] - t[11], r[12] = e[12] - t[12], r[13] = e[13] - t[13], r[14] = e[14] - t[14], r[15] = e[15] - t[15], r;
    }, l.multiplyTransformation = function (e, t, r) {
      var n = e[0],
          i = e[1],
          o = e[2],
          a = e[4],
          u = e[5],
          s = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = e[12],
          d = e[13],
          p = e[14],
          E = t[0],
          _ = t[1],
          m = t[2],
          y = t[4],
          T = t[5],
          R = t[6],
          A = t[8],
          v = t[9],
          S = t[10],
          O = t[12],
          I = t[13],
          N = t[14],
          w = n * E + a * _ + c * m,
          g = i * E + u * _ + l * m,
          M = o * E + s * _ + f * m,
          C = n * y + a * T + c * R,
          x = i * y + u * T + l * R,
          P = o * y + s * T + f * R,
          U = n * A + a * v + c * S,
          D = i * A + u * v + l * S,
          F = o * A + s * v + f * S,
          L = n * O + a * I + c * N + h,
          b = i * O + u * I + l * N + d,
          B = o * O + s * I + f * N + p;
      return r[0] = w, r[1] = g, r[2] = M, r[3] = 0, r[4] = C, r[5] = x, r[6] = P, r[7] = 0, r[8] = U, r[9] = D, r[10] = F, r[11] = 0, r[12] = L, r[13] = b, r[14] = B, r[15] = 1, r;
    }, l.multiplyByMatrix3 = function (e, t, r) {
      var n = e[0],
          i = e[1],
          o = e[2],
          a = e[4],
          u = e[5],
          s = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = t[0],
          d = t[1],
          p = t[2],
          E = t[3],
          _ = t[4],
          m = t[5],
          y = t[6],
          T = t[7],
          R = t[8],
          A = n * h + a * d + c * p,
          v = i * h + u * d + l * p,
          S = o * h + s * d + f * p,
          O = n * E + a * _ + c * m,
          I = i * E + u * _ + l * m,
          N = o * E + s * _ + f * m,
          w = n * y + a * T + c * R,
          g = i * y + u * T + l * R,
          M = o * y + s * T + f * R;
      return r[0] = A, r[1] = v, r[2] = S, r[3] = 0, r[4] = O, r[5] = I, r[6] = N, r[7] = 0, r[8] = w, r[9] = g, r[10] = M, r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15], r;
    }, l.multiplyByTranslation = function (e, t, r) {
      var n = t.x,
          i = t.y,
          o = t.z,
          a = n * e[0] + i * e[4] + o * e[8] + e[12],
          u = n * e[1] + i * e[5] + o * e[9] + e[13],
          s = n * e[2] + i * e[6] + o * e[10] + e[14];
      return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = a, r[13] = u, r[14] = s, r[15] = e[15], r;
    };
    var m = new e();
    l.multiplyByUniformScale = function (e, t, r) {
      return m.x = t, m.y = t, m.z = t, l.multiplyByScale(e, m, r);
    }, l.multiplyByScale = function (e, t, r) {
      var n = t.x,
          i = t.y,
          o = t.z;
      return 1 === n && 1 === i && 1 === o ? l.clone(e, r) : (r[0] = n * e[0], r[1] = n * e[1], r[2] = n * e[2], r[3] = 0, r[4] = i * e[4], r[5] = i * e[5], r[6] = i * e[6], r[7] = 0, r[8] = o * e[8], r[9] = o * e[9], r[10] = o * e[10], r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = 1, r);
    }, l.multiplyByVector = function (e, t, r) {
      var n = t.x,
          i = t.y,
          o = t.z,
          a = t.w,
          u = e[0] * n + e[4] * i + e[8] * o + e[12] * a,
          s = e[1] * n + e[5] * i + e[9] * o + e[13] * a,
          c = e[2] * n + e[6] * i + e[10] * o + e[14] * a,
          l = e[3] * n + e[7] * i + e[11] * o + e[15] * a;
      return r.x = u, r.y = s, r.z = c, r.w = l, r;
    }, l.multiplyByPointAsVector = function (e, t, r) {
      var n = t.x,
          i = t.y,
          o = t.z,
          a = e[0] * n + e[4] * i + e[8] * o,
          u = e[1] * n + e[5] * i + e[9] * o,
          s = e[2] * n + e[6] * i + e[10] * o;
      return r.x = a, r.y = u, r.z = s, r;
    }, l.multiplyByPoint = function (e, t, r) {
      var n = t.x,
          i = t.y,
          o = t.z,
          a = e[0] * n + e[4] * i + e[8] * o + e[12],
          u = e[1] * n + e[5] * i + e[9] * o + e[13],
          s = e[2] * n + e[6] * i + e[10] * o + e[14];
      return r.x = a, r.y = u, r.z = s, r;
    }, l.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r[9] = e[9] * t, r[10] = e[10] * t, r[11] = e[11] * t, r[12] = e[12] * t, r[13] = e[13] * t, r[14] = e[14] * t, r[15] = e[15] * t, r;
    }, l.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t;
    }, l.transpose = function (e, t) {
      var r = e[1],
          n = e[2],
          i = e[3],
          o = e[6],
          a = e[7],
          u = e[11];
      return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = n, t[9] = o, t[10] = e[10], t[11] = e[14], t[12] = i, t[13] = a, t[14] = u, t[15] = e[15], t;
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
    var y = new s(),
        T = new s(),
        R = new t(),
        A = new t(0, 0, 0, 1);
    return l.inverse = function (e, r) {
      var n = e[0],
          i = e[4],
          o = e[8],
          a = e[12],
          f = e[1],
          h = e[5],
          d = e[9],
          p = e[13],
          E = e[2],
          _ = e[6],
          m = e[10],
          v = e[14],
          S = e[3],
          O = e[7],
          I = e[11],
          N = e[15],
          w = m * N,
          g = v * I,
          M = _ * N,
          C = v * O,
          x = _ * I,
          P = m * O,
          U = E * N,
          D = v * S,
          F = E * I,
          L = m * S,
          b = E * O,
          B = _ * S,
          z = w * h + C * d + x * p - (g * h + M * d + P * p),
          q = g * f + U * d + L * p - (w * f + D * d + F * p),
          G = M * f + D * h + b * p - (C * f + U * h + B * p),
          V = P * f + F * h + B * d - (x * f + L * h + b * d),
          X = g * i + M * o + P * a - (w * i + C * o + x * a),
          W = w * n + D * o + F * a - (g * n + U * o + L * a),
          H = C * n + U * i + B * a - (M * n + D * i + b * a),
          k = x * n + L * i + b * o - (P * n + F * i + B * o);
      w = o * p, g = a * d, M = i * p, C = a * h, x = i * d, P = o * h, U = n * p, D = a * f, F = n * d, L = o * f, b = n * h, B = i * f;
      var Y = w * O + C * I + x * N - (g * O + M * I + P * N),
          j = g * S + U * I + L * N - (w * S + D * I + F * N),
          K = M * S + D * O + b * N - (C * S + U * O + B * N),
          Z = P * S + F * O + B * I - (x * S + L * O + b * I),
          J = M * m + P * v + g * _ - (x * v + w * _ + C * m),
          Q = F * v + w * E + D * m - (U * m + L * v + g * E),
          $ = U * _ + B * v + C * E - (b * v + M * E + D * _),
          ee = b * m + x * E + L * _ - (F * _ + B * m + P * E),
          te = n * z + i * q + o * G + a * V;

      if (Math.abs(te) < u.EPSILON21) {
        if (s.equalsEpsilon(l.getRotation(e, y), T, u.EPSILON7) && t.equals(l.getRow(e, 3, R), A)) return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 0, r[11] = 0, r[12] = -e[12], r[13] = -e[13], r[14] = -e[14], r[15] = 1, r;
        throw new c("matrix is not invertible because its determinate is zero.");
      }

      return te = 1 / te, r[0] = z * te, r[1] = q * te, r[2] = G * te, r[3] = V * te, r[4] = X * te, r[5] = W * te, r[6] = H * te, r[7] = k * te, r[8] = Y * te, r[9] = j * te, r[10] = K * te, r[11] = Z * te, r[12] = J * te, r[13] = Q * te, r[14] = $ * te, r[15] = ee * te, r;
    }, l.inverseTransformation = function (e, t) {
      var r = e[0],
          n = e[1],
          i = e[2],
          o = e[4],
          a = e[5],
          u = e[6],
          s = e[8],
          c = e[9],
          l = e[10],
          f = e[12],
          h = e[13],
          d = e[14],
          p = -r * f - n * h - i * d,
          E = -o * f - a * h - u * d,
          _ = -s * f - c * h - l * d;

      return t[0] = r, t[1] = o, t[2] = s, t[3] = 0, t[4] = n, t[5] = a, t[6] = c, t[7] = 0, t[8] = i, t[9] = u, t[10] = l, t[11] = 0, t[12] = p, t[13] = E, t[14] = _, t[15] = 1, t;
    }, l.IDENTITY = a(new l(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), l.ZERO = a(new l(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)), l.COLUMN0ROW0 = 0, l.COLUMN0ROW1 = 1, l.COLUMN0ROW2 = 2, l.COLUMN0ROW3 = 3, l.COLUMN1ROW0 = 4, l.COLUMN1ROW1 = 5, l.COLUMN1ROW2 = 6, l.COLUMN1ROW3 = 7, l.COLUMN2ROW0 = 8, l.COLUMN2ROW1 = 9, l.COLUMN2ROW2 = 10, l.COLUMN2ROW3 = 11, l.COLUMN3ROW0 = 12, l.COLUMN3ROW1 = 13, l.COLUMN3ROW2 = 14, l.COLUMN3ROW3 = 15, o(l.prototype, {
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
  }), define("Core/Rectangle", ["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function (e, t, r, n, i, o, a, u) {
    "use strict";

    function s(e, t, n, i) {
      this.west = r(e, 0), this.south = r(t, 0), this.east = r(n, 0), this.north = r(i, 0);
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
    }), s.packedLength = 4, s.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e.west, t[n++] = e.south, t[n++] = e.east, t[n] = e.north, t;
    }, s.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new s()), i.west = e[t++], i.south = e[t++], i.east = e[t++], i.north = e[t], i;
    }, s.computeWidth = function (e) {
      var t = e.east,
          r = e.west;
      return t < r && (t += u.TWO_PI), t - r;
    }, s.computeHeight = function (e) {
      return e.north - e.south;
    }, s.fromDegrees = function (e, t, i, o, a) {
      return e = u.toRadians(r(e, 0)), t = u.toRadians(r(t, 0)), i = u.toRadians(r(i, 0)), o = u.toRadians(r(o, 0)), n(a) ? (a.west = e, a.south = t, a.east = i, a.north = o, a) : new s(e, t, i, o);
    }, s.fromRadians = function (e, t, i, o, a) {
      return n(a) ? (a.west = r(e, 0), a.south = r(t, 0), a.east = r(i, 0), a.north = r(o, 0), a) : new s(e, t, i, o);
    }, s.fromCartographicArray = function (e, t) {
      for (var r = Number.MAX_VALUE, i = -Number.MAX_VALUE, o = Number.MAX_VALUE, a = -Number.MAX_VALUE, c = Number.MAX_VALUE, l = -Number.MAX_VALUE, f = 0, h = e.length; f < h; f++) {
        var d = e[f];
        r = Math.min(r, d.longitude), i = Math.max(i, d.longitude), c = Math.min(c, d.latitude), l = Math.max(l, d.latitude);
        var p = d.longitude >= 0 ? d.longitude : d.longitude + u.TWO_PI;
        o = Math.min(o, p), a = Math.max(a, p);
      }

      return i - r > a - o && (r = o, i = a, i > u.PI && (i -= u.TWO_PI), r > u.PI && (r -= u.TWO_PI)), n(t) ? (t.west = r, t.south = c, t.east = i, t.north = l, t) : new s(r, c, i, l);
    }, s.fromCartesianArray = function (e, t, i) {
      t = r(t, o.WGS84);

      for (var a = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = Number.MAX_VALUE, f = -Number.MAX_VALUE, h = Number.MAX_VALUE, d = -Number.MAX_VALUE, p = 0, E = e.length; p < E; p++) {
        var _ = t.cartesianToCartographic(e[p]);

        a = Math.min(a, _.longitude), c = Math.max(c, _.longitude), h = Math.min(h, _.latitude), d = Math.max(d, _.latitude);
        var m = _.longitude >= 0 ? _.longitude : _.longitude + u.TWO_PI;
        l = Math.min(l, m), f = Math.max(f, m);
      }

      return c - a > f - l && (a = l, c = f, c > u.PI && (c -= u.TWO_PI), a > u.PI && (a -= u.TWO_PI)), n(i) ? (i.west = a, i.south = h, i.east = c, i.north = d, i) : new s(a, h, c, d);
    }, s.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.west = e.west, t.south = e.south, t.east = e.east, t.north = e.north, t) : new s(e.west, e.south, e.east, e.north);
    }, s.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.west - t.west) <= r && Math.abs(e.south - t.south) <= r && Math.abs(e.east - t.east) <= r && Math.abs(e.north - t.north) <= r;
    }, s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north;
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.validate = function (e) {}, s.southwest = function (t, r) {
      return n(r) ? (r.longitude = t.west, r.latitude = t.south, r.height = 0, r) : new e(t.west, t.south);
    }, s.northwest = function (t, r) {
      return n(r) ? (r.longitude = t.west, r.latitude = t.north, r.height = 0, r) : new e(t.west, t.north);
    }, s.northeast = function (t, r) {
      return n(r) ? (r.longitude = t.east, r.latitude = t.north, r.height = 0, r) : new e(t.east, t.north);
    }, s.southeast = function (t, r) {
      return n(r) ? (r.longitude = t.east, r.latitude = t.south, r.height = 0, r) : new e(t.east, t.south);
    }, s.center = function (t, r) {
      var i = t.east,
          o = t.west;
      i < o && (i += u.TWO_PI);
      var a = u.negativePiToPi(.5 * (o + i)),
          s = .5 * (t.south + t.north);
      return n(r) ? (r.longitude = a, r.latitude = s, r.height = 0, r) : new e(a, s);
    }, s.intersection = function (e, t, r) {
      var i = e.east,
          o = e.west,
          a = t.east,
          c = t.west;
      i < o && a > 0 ? i += u.TWO_PI : a < c && i > 0 && (a += u.TWO_PI), i < o && c < 0 ? c += u.TWO_PI : a < c && o < 0 && (o += u.TWO_PI);
      var l = u.negativePiToPi(Math.max(o, c)),
          f = u.negativePiToPi(Math.min(i, a));

      if (!((e.west < e.east || t.west < t.east) && f <= l)) {
        var h = Math.max(e.south, t.south),
            d = Math.min(e.north, t.north);
        if (!(h >= d)) return n(r) ? (r.west = l, r.south = h, r.east = f, r.north = d, r) : new s(l, h, f, d);
      }
    }, s.simpleIntersection = function (e, t, r) {
      var i = Math.max(e.west, t.west),
          o = Math.max(e.south, t.south),
          a = Math.min(e.east, t.east),
          u = Math.min(e.north, t.north);
      if (!(o >= u || i >= a)) return n(r) ? (r.west = i, r.south = o, r.east = a, r.north = u, r) : new s(i, o, a, u);
    }, s.union = function (e, t, r) {
      n(r) || (r = new s());
      var i = e.east,
          o = e.west,
          a = t.east,
          c = t.west;
      i < o && a > 0 ? i += u.TWO_PI : a < c && i > 0 && (a += u.TWO_PI), i < o && c < 0 ? c += u.TWO_PI : a < c && o < 0 && (o += u.TWO_PI);
      var l = u.convertLongitudeRange(Math.min(o, c)),
          f = u.convertLongitudeRange(Math.max(i, a));
      return r.west = l, r.south = Math.min(e.south, t.south), r.east = f, r.north = Math.max(e.north, t.north), r;
    }, s.expand = function (e, t, r) {
      return n(r) || (r = new s()), r.west = Math.min(e.west, t.longitude), r.south = Math.min(e.south, t.latitude), r.east = Math.max(e.east, t.longitude), r.north = Math.max(e.north, t.latitude), r;
    }, s.contains = function (e, t) {
      var r = t.longitude,
          n = t.latitude,
          i = e.west,
          o = e.east;
      return o < i && (o += u.TWO_PI, r < 0 && (r += u.TWO_PI)), (r > i || u.equalsEpsilon(r, i, u.EPSILON14)) && (r < o || u.equalsEpsilon(r, o, u.EPSILON14)) && n >= e.south && n <= e.north;
    };
    var c = new e();
    return s.subsample = function (e, t, i, a) {
      t = r(t, o.WGS84), i = r(i, 0), n(a) || (a = []);
      var l = 0,
          f = e.north,
          h = e.south,
          d = e.east,
          p = e.west,
          E = c;
      E.height = i, E.longitude = p, E.latitude = f, a[l] = t.cartographicToCartesian(E, a[l]), l++, E.longitude = d, a[l] = t.cartographicToCartesian(E, a[l]), l++, E.latitude = h, a[l] = t.cartographicToCartesian(E, a[l]), l++, E.longitude = p, a[l] = t.cartographicToCartesian(E, a[l]), l++, E.latitude = f < 0 ? f : h > 0 ? h : 0;

      for (var _ = 1; _ < 8; ++_) {
        E.longitude = -Math.PI + _ * u.PI_OVER_TWO, s.contains(e, E) && (a[l] = t.cartographicToCartesian(E, a[l]), l++);
      }

      return 0 === E.latitude && (E.longitude = p, a[l] = t.cartographicToCartesian(E, a[l]), l++, E.longitude = d, a[l] = t.cartographicToCartesian(E, a[l]), l++), a.length = l, a;
    }, s.MAX_VALUE = a(new s(-Math.PI, -u.PI_OVER_TWO, Math.PI, u.PI_OVER_TWO)), s;
  }), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (e, t, r, n, i, o, a, u, s, c, l, f, h) {
    "use strict";

    function d(t, r) {
      this.center = e.clone(n(t, e.ZERO)), this.radius = n(r, 0);
    }

    var p = new e(),
        E = new e(),
        _ = new e(),
        m = new e(),
        y = new e(),
        T = new e(),
        R = new e(),
        A = new e(),
        v = new e(),
        S = new e(),
        O = new e(),
        I = new e(),
        N = 4 / 3 * c.PI;

    d.fromPoints = function (t, r) {
      if (i(r) || (r = new d()), !i(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var n,
          o = e.clone(t[0], R),
          a = e.clone(o, p),
          u = e.clone(o, E),
          s = e.clone(o, _),
          c = e.clone(o, m),
          l = e.clone(o, y),
          f = e.clone(o, T),
          h = t.length;

      for (n = 1; n < h; n++) {
        e.clone(t[n], o);
        var N = o.x,
            w = o.y,
            g = o.z;
        N < a.x && e.clone(o, a), N > c.x && e.clone(o, c), w < u.y && e.clone(o, u), w > l.y && e.clone(o, l), g < s.z && e.clone(o, s), g > f.z && e.clone(o, f);
      }

      var M = e.magnitudeSquared(e.subtract(c, a, A)),
          C = e.magnitudeSquared(e.subtract(l, u, A)),
          x = e.magnitudeSquared(e.subtract(f, s, A)),
          P = a,
          U = c,
          D = M;
      C > D && (D = C, P = u, U = l), x > D && (D = x, P = s, U = f);
      var F = v;
      F.x = .5 * (P.x + U.x), F.y = .5 * (P.y + U.y), F.z = .5 * (P.z + U.z);
      var L = e.magnitudeSquared(e.subtract(U, F, A)),
          b = Math.sqrt(L),
          B = S;
      B.x = a.x, B.y = u.y, B.z = s.z;
      var z = O;
      z.x = c.x, z.y = l.y, z.z = f.z;
      var q = e.midpoint(B, z, I),
          G = 0;

      for (n = 0; n < h; n++) {
        e.clone(t[n], o);
        var V = e.magnitude(e.subtract(o, q, A));
        V > G && (G = V);
        var X = e.magnitudeSquared(e.subtract(o, F, A));

        if (X > L) {
          var W = Math.sqrt(X);
          b = .5 * (b + W), L = b * b;
          var H = W - b;
          F.x = (b * F.x + H * o.x) / W, F.y = (b * F.y + H * o.y) / W, F.z = (b * F.z + H * o.z) / W;
        }
      }

      return b < G ? (e.clone(F, r.center), r.radius = b) : (e.clone(q, r.center), r.radius = G), r;
    };

    var w = new a(),
        g = new e(),
        M = new e(),
        C = new t(),
        x = new t();
    d.fromRectangle2D = function (e, t, r) {
      return d.fromRectangleWithHeights2D(e, t, 0, 0, r);
    }, d.fromRectangleWithHeights2D = function (t, r, o, a, u) {
      if (i(u) || (u = new d()), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
      r = n(r, w), h.southwest(t, C), C.height = o, h.northeast(t, x), x.height = a;
      var s = r.project(C, g),
          c = r.project(x, M),
          l = c.x - s.x,
          f = c.y - s.y,
          p = c.z - s.z;
      u.radius = .5 * Math.sqrt(l * l + f * f + p * p);
      var E = u.center;
      return E.x = s.x + .5 * l, E.y = s.y + .5 * f, E.z = s.z + .5 * p, u;
    };
    var P = [];
    d.fromRectangle3D = function (t, r, a, u) {
      if (r = n(r, o.WGS84), a = n(a, 0), i(u) || (u = new d()), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
      var s = h.subsample(t, r, a, P);
      return d.fromPoints(s, u);
    }, d.fromVertices = function (t, r, o, a) {
      if (i(a) || (a = new d()), !i(t) || 0 === t.length) return a.center = e.clone(e.ZERO, a.center), a.radius = 0, a;
      r = n(r, e.ZERO), o = n(o, 3);
      var u = R;
      u.x = t[0] + r.x, u.y = t[1] + r.y, u.z = t[2] + r.z;
      var s,
          c = e.clone(u, p),
          l = e.clone(u, E),
          f = e.clone(u, _),
          h = e.clone(u, m),
          N = e.clone(u, y),
          w = e.clone(u, T),
          g = t.length;

      for (s = 0; s < g; s += o) {
        var M = t[s] + r.x,
            C = t[s + 1] + r.y,
            x = t[s + 2] + r.z;
        u.x = M, u.y = C, u.z = x, M < c.x && e.clone(u, c), M > h.x && e.clone(u, h), C < l.y && e.clone(u, l), C > N.y && e.clone(u, N), x < f.z && e.clone(u, f), x > w.z && e.clone(u, w);
      }

      var P = e.magnitudeSquared(e.subtract(h, c, A)),
          U = e.magnitudeSquared(e.subtract(N, l, A)),
          D = e.magnitudeSquared(e.subtract(w, f, A)),
          F = c,
          L = h,
          b = P;
      U > b && (b = U, F = l, L = N), D > b && (b = D, F = f, L = w);
      var B = v;
      B.x = .5 * (F.x + L.x), B.y = .5 * (F.y + L.y), B.z = .5 * (F.z + L.z);
      var z = e.magnitudeSquared(e.subtract(L, B, A)),
          q = Math.sqrt(z),
          G = S;
      G.x = c.x, G.y = l.y, G.z = f.z;
      var V = O;
      V.x = h.x, V.y = N.y, V.z = w.z;
      var X = e.midpoint(G, V, I),
          W = 0;

      for (s = 0; s < g; s += o) {
        u.x = t[s] + r.x, u.y = t[s + 1] + r.y, u.z = t[s + 2] + r.z;
        var H = e.magnitude(e.subtract(u, X, A));
        H > W && (W = H);
        var k = e.magnitudeSquared(e.subtract(u, B, A));

        if (k > z) {
          var Y = Math.sqrt(k);
          q = .5 * (q + Y), z = q * q;
          var j = Y - q;
          B.x = (q * B.x + j * u.x) / Y, B.y = (q * B.y + j * u.y) / Y, B.z = (q * B.z + j * u.z) / Y;
        }
      }

      return q < W ? (e.clone(B, a.center), a.radius = q) : (e.clone(X, a.center), a.radius = W), a;
    }, d.fromEncodedCartesianVertices = function (t, r, n) {
      if (i(n) || (n = new d()), !i(t) || !i(r) || t.length !== r.length || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
      var o = R;
      o.x = t[0] + r[0], o.y = t[1] + r[1], o.z = t[2] + r[2];
      var a,
          u = e.clone(o, p),
          s = e.clone(o, E),
          c = e.clone(o, _),
          l = e.clone(o, m),
          f = e.clone(o, y),
          h = e.clone(o, T),
          N = t.length;

      for (a = 0; a < N; a += 3) {
        var w = t[a] + r[a],
            g = t[a + 1] + r[a + 1],
            M = t[a + 2] + r[a + 2];
        o.x = w, o.y = g, o.z = M, w < u.x && e.clone(o, u), w > l.x && e.clone(o, l), g < s.y && e.clone(o, s), g > f.y && e.clone(o, f), M < c.z && e.clone(o, c), M > h.z && e.clone(o, h);
      }

      var C = e.magnitudeSquared(e.subtract(l, u, A)),
          x = e.magnitudeSquared(e.subtract(f, s, A)),
          P = e.magnitudeSquared(e.subtract(h, c, A)),
          U = u,
          D = l,
          F = C;
      x > F && (F = x, U = s, D = f), P > F && (F = P, U = c, D = h);
      var L = v;
      L.x = .5 * (U.x + D.x), L.y = .5 * (U.y + D.y), L.z = .5 * (U.z + D.z);
      var b = e.magnitudeSquared(e.subtract(D, L, A)),
          B = Math.sqrt(b),
          z = S;
      z.x = u.x, z.y = s.y, z.z = c.z;
      var q = O;
      q.x = l.x, q.y = f.y, q.z = h.z;
      var G = e.midpoint(z, q, I),
          V = 0;

      for (a = 0; a < N; a += 3) {
        o.x = t[a] + r[a], o.y = t[a + 1] + r[a + 1], o.z = t[a + 2] + r[a + 2];
        var X = e.magnitude(e.subtract(o, G, A));
        X > V && (V = X);
        var W = e.magnitudeSquared(e.subtract(o, L, A));

        if (W > b) {
          var H = Math.sqrt(W);
          B = .5 * (B + H), b = B * B;
          var k = H - B;
          L.x = (B * L.x + k * o.x) / H, L.y = (B * L.y + k * o.y) / H, L.z = (B * L.z + k * o.z) / H;
        }
      }

      return B < V ? (e.clone(L, n.center), n.radius = B) : (e.clone(G, n.center), n.radius = V), n;
    }, d.fromCornerPoints = function (t, r, n) {
      i(n) || (n = new d());
      var o = e.midpoint(t, r, n.center);
      return n.radius = e.distance(o, r), n;
    }, d.fromEllipsoid = function (t, r) {
      return i(r) || (r = new d()), e.clone(e.ZERO, r.center), r.radius = t.maximumRadius, r;
    };
    var U = new e();

    d.fromBoundingSpheres = function (t, r) {
      if (i(r) || (r = new d()), !i(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var n = t.length;
      if (1 === n) return d.clone(t[0], r);
      if (2 === n) return d.union(t[0], t[1], r);
      var o,
          a = [];

      for (o = 0; o < n; o++) {
        a.push(t[o].center);
      }

      r = d.fromPoints(a, r);
      var u = r.center,
          s = r.radius;

      for (o = 0; o < n; o++) {
        var c = t[o];
        s = Math.max(s, e.distance(u, c.center, U) + c.radius);
      }

      return r.radius = s, r;
    };

    var D = new e(),
        F = new e(),
        L = new e();
    d.fromOrientedBoundingBox = function (t, r) {
      i(r) || (r = new d());
      var n = t.halfAxes,
          o = l.getColumn(n, 0, D),
          a = l.getColumn(n, 1, F),
          u = l.getColumn(n, 2, L);
      return e.add(o, a, o), e.add(o, u, o), r.center = e.clone(t.center, r.center), r.radius = e.magnitude(o), r;
    }, d.clone = function (t, r) {
      if (i(t)) return i(r) ? (r.center = e.clone(t.center, r.center), r.radius = t.radius, r) : new d(t.center, t.radius);
    }, d.packedLength = 4, d.pack = function (e, t, r) {
      r = n(r, 0);
      var i = e.center;
      return t[r++] = i.x, t[r++] = i.y, t[r++] = i.z, t[r] = e.radius, t;
    }, d.unpack = function (e, t, r) {
      t = n(t, 0), i(r) || (r = new d());
      var o = r.center;
      return o.x = e[t++], o.y = e[t++], o.z = e[t++], r.radius = e[t], r;
    };
    var b = new e(),
        B = new e();

    d.union = function (t, r, n) {
      i(n) || (n = new d());
      var o = t.center,
          a = t.radius,
          u = r.center,
          s = r.radius,
          c = e.subtract(u, o, b),
          l = e.magnitude(c);
      if (a >= l + s) return t.clone(n), n;
      if (s >= l + a) return r.clone(n), n;
      var f = .5 * (a + l + s),
          h = e.multiplyByScalar(c, (-a + f) / l, B);
      return e.add(h, o, h), e.clone(h, n.center), n.radius = f, n;
    };

    var z = new e();
    d.expand = function (t, r, n) {
      n = d.clone(t, n);
      var i = e.magnitude(e.subtract(r, n.center, z));
      return i > n.radius && (n.radius = i), n;
    }, d.intersectPlane = function (t, r) {
      var n = t.center,
          i = t.radius,
          o = r.normal,
          a = e.dot(o, n) + r.distance;
      return a < -i ? u.OUTSIDE : a < i ? u.INTERSECTING : u.INSIDE;
    }, d.transform = function (e, t, r) {
      return i(r) || (r = new d()), r.center = f.multiplyByPoint(t, e.center, r.center), r.radius = f.getMaximumScale(t) * e.radius, r;
    };
    var q = new e();
    d.distanceSquaredTo = function (t, r) {
      var n = e.subtract(t.center, r, q);
      return e.magnitudeSquared(n) - t.radius * t.radius;
    }, d.transformWithoutScale = function (e, t, r) {
      return i(r) || (r = new d()), r.center = f.multiplyByPoint(t, e.center, r.center), r.radius = e.radius, r;
    };
    var G = new e();

    d.computePlaneDistances = function (t, r, n, o) {
      i(o) || (o = new s());
      var a = e.subtract(t.center, r, G),
          u = e.dot(n, a);
      return o.start = u - t.radius, o.stop = u + t.radius, o;
    };

    for (var V = new e(), X = new e(), W = new e(), H = new e(), k = new e(), Y = new t(), j = new Array(8), K = 0; K < 8; ++K) {
      j[K] = new e();
    }

    var Z = new a();
    return d.projectTo2D = function (t, r, i) {
      r = n(r, Z);
      var o = r.ellipsoid,
          a = t.center,
          u = t.radius,
          s = o.geodeticSurfaceNormal(a, V),
          c = e.cross(e.UNIT_Z, s, X);
      e.normalize(c, c);
      var l = e.cross(s, c, W);
      e.normalize(l, l), e.multiplyByScalar(s, u, s), e.multiplyByScalar(l, u, l), e.multiplyByScalar(c, u, c);
      var f = e.negate(l, k),
          h = e.negate(c, H),
          p = j,
          E = p[0];
      e.add(s, l, E), e.add(E, c, E), E = p[1], e.add(s, l, E), e.add(E, h, E), E = p[2], e.add(s, f, E), e.add(E, h, E), E = p[3], e.add(s, f, E), e.add(E, c, E), e.negate(s, s), E = p[4], e.add(s, l, E), e.add(E, c, E), E = p[5], e.add(s, l, E), e.add(E, h, E), E = p[6], e.add(s, f, E), e.add(E, h, E), E = p[7], e.add(s, f, E), e.add(E, c, E);

      for (var _ = p.length, m = 0; m < _; ++m) {
        var y = p[m];
        e.add(a, y, y);
        var T = o.cartesianToCartographic(y, Y);
        r.project(T, y);
      }

      i = d.fromPoints(p, i), a = i.center;
      var R = a.x,
          A = a.y,
          v = a.z;
      return a.x = v, a.y = R, a.z = A, i;
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
      return N * e * e * e;
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

      for (var i, o = ["webkit", "moz", "o", "ms", "khtml"], a = 0, u = o.length; a < u; ++a) {
        var s = o[a];
        i = s + "RequestFullscreen", "function" == typeof t[i] ? (n.requestFullscreen = i, r = !0) : (i = s + "RequestFullScreen", "function" == typeof t[i] && (n.requestFullscreen = i, r = !0)), i = s + "ExitFullscreen", "function" == typeof document[i] ? n.exitFullscreen = i : (i = s + "CancelFullScreen", "function" == typeof document[i] && (n.exitFullscreen = i)), i = s + "FullscreenEnabled", void 0 !== document[i] ? n.fullscreenEnabled = i : (i = s + "FullScreenEnabled", void 0 !== document[i] && (n.fullscreenEnabled = i)), i = s + "FullscreenElement", void 0 !== document[i] ? n.fullscreenElement = i : (i = s + "FullScreenElement", void 0 !== document[i] && (n.fullscreenElement = i)), i = s + "fullscreenchange", void 0 !== document["on" + i] && ("ms" === s && (i = "MSFullscreenChange"), n.fullscreenchange = i), i = s + "fullscreenerror", void 0 !== document["on" + i] && ("ms" === s && (i = "MSFullscreenError"), n.fullscreenerror = i);
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
        return e instanceof n ? t = e : u(e) ? (r = a(), e.then(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, function (e) {
          r.progress(e);
        }), t = r.promise) : t = i(e), t;
      }

      function r(t) {
        return e(t, o);
      }

      function n(e) {
        this.then = e;
      }

      function i(e) {
        return new n(function (r) {
          try {
            return t(r ? r(e) : e);
          } catch (e) {
            return o(e);
          }
        });
      }

      function o(e) {
        return new n(function (r, n) {
          try {
            return n ? t(n(e)) : o(e);
          } catch (e) {
            return o(e);
          }
        });
      }

      function a() {
        function e(e, t, r) {
          return h(e, t, r);
        }

        function r(e) {
          return _p(e);
        }

        function i(e) {
          return _p(o(e));
        }

        function u(e) {
          return d(e);
        }

        var s, c, l, f, h, d, _p;

        return c = new n(e), s = {
          then: e,
          resolve: r,
          reject: i,
          progress: u,
          promise: c,
          resolver: {
            resolve: r,
            reject: i,
            progress: u
          }
        }, l = [], f = [], h = function h(e, t, r) {
          var n, i;
          return n = a(), i = "function" == typeof r ? function (e) {
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
          return E(f, e), e;
        }, _p = function p(e) {
          return e = t(e), h = e.then, _p = t, d = m, E(l, e), f = l = A, e;
        }, s;
      }

      function u(e) {
        return e && "function" == typeof e.then;
      }

      function s(t, r, n, i, o) {
        return _(2, arguments), e(t, function (t) {
          function u(e) {
            _E(e);
          }

          function s(e) {
            _p2(e);
          }

          var c, l, f, h, d, _p2, _E, _, y, T;

          if (y = t.length >>> 0, c = Math.max(0, Math.min(r, y)), f = [], l = y - c + 1, h = [], d = a(), c) for (_ = d.progress, _E = function E(e) {
            h.push(e), --l || (_p2 = _E = m, d.reject(h));
          }, _p2 = function p(e) {
            f.push(e), --c || (_p2 = _E = m, d.resolve(f));
          }, T = 0; T < y; ++T) {
            T in t && e(t[T], s, u, _);
          } else d.resolve(f);
          return d.then(n, i, o);
        });
      }

      function c(e, t, r, n) {
        function i(e) {
          return t ? t(e[0]) : e[0];
        }

        return s(e, 1, i, r, n);
      }

      function l(e, t, r, n) {
        return _(1, arguments), h(e, y).then(t, r, n);
      }

      function f() {
        return h(arguments, y);
      }

      function h(t, r) {
        return e(t, function (t) {
          var n, i, o, u, s, c;
          if (o = i = t.length >>> 0, n = [], c = a(), o) for (u = function u(t, i) {
            e(t, r).then(function (e) {
              n[i] = e, --o || c.resolve(n);
            }, c.reject);
          }, s = 0; s < i; s++) {
            s in t ? u(t[s], s) : --o;
          } else c.resolve(n);
          return c.promise;
        });
      }

      function d(t, r) {
        var n = R.call(arguments, 1);
        return e(t, function (t) {
          var i;
          return i = t.length, n[0] = function (t, n, o) {
            return e(t, function (t) {
              return e(n, function (e) {
                return r(t, e, o, i);
              });
            });
          }, T.apply(t, n);
        });
      }

      function p(t, r, n) {
        var i = arguments.length > 2;
        return e(t, function (e) {
          return e = i ? n : e, r.resolve(e), e;
        }, function (e) {
          return r.reject(e), o(e);
        }, r.progress);
      }

      function E(e, t) {
        for (var r, n = 0; r = e[n++];) {
          r(t);
        }
      }

      function _(e, t) {
        for (var r, n = t.length; n > e;) {
          if (null != (r = t[--n]) && "function" != typeof r) throw new Error("arg " + n + " must be a function");
        }
      }

      function m() {}

      function y(e) {
        return e;
      }

      var T, R, A;
      return e.defer = a, e.resolve = t, e.reject = r, e.join = f, e.all = l, e.map = h, e.reduce = d, e.any = c, e.some = s, e.chain = p, e.isPromise = u, n.prototype = {
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
      }, R = [].slice, T = [].reduce || function (e) {
        var t, r, n, i, o;
        if (o = 0, t = Object(this), i = t.length >>> 0, r = arguments, r.length <= 1) for (;;) {
          if (o in t) {
            n = t[o++];
            break;
          }

          if (++o >= i) throw new TypeError();
        } else n = r[1];

        for (; o < i; ++o) {
          o in t && (n = e(n, t[o], o, t));
        }

        return n;
      }, e;
    });
  }("function" == typeof define && define.amd ? define : function (e) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : this.when = e();
  }), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Fullscreen", "../ThirdParty/when"], function (e, t, r, n, i, o) {
    "use strict";

    function a(e) {
      for (var t = e.split("."), r = 0, n = t.length; r < n; ++r) {
        t[r] = parseInt(t[r], 10);
      }

      return t;
    }

    function u() {
      if (!t(I) && (I = !1, !E())) {
        var e = / Chrome\/([\.0-9]+)/.exec(O.userAgent);
        null !== e && (I = !0, N = a(e[1]));
      }

      return I;
    }

    function s() {
      return u() && N;
    }

    function c() {
      if (!t(w) && (w = !1, !u() && !E() && / Safari\/[\.0-9]+/.test(O.userAgent))) {
        var e = / Version\/([\.0-9]+)/.exec(O.userAgent);
        null !== e && (w = !0, g = a(e[1]));
      }

      return w;
    }

    function l() {
      return c() && g;
    }

    function f() {
      if (!t(M)) {
        M = !1;
        var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(O.userAgent);
        null !== e && (M = !0, C = a(e[1]), C.isNightly = !!e[2]);
      }

      return M;
    }

    function h() {
      return f() && C;
    }

    function d() {
      if (!t(x)) {
        x = !1;
        var e;
        "Microsoft Internet Explorer" === O.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(O.userAgent)) && (x = !0, P = a(e[1])) : "Netscape" === O.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(O.userAgent)) && (x = !0, P = a(e[1]));
      }

      return x;
    }

    function p() {
      return d() && P;
    }

    function E() {
      if (!t(U)) {
        U = !1;
        var e = / Edge\/([\.0-9]+)/.exec(O.userAgent);
        null !== e && (U = !0, D = a(e[1]));
      }

      return U;
    }

    function _() {
      return E() && D;
    }

    function m() {
      if (!t(F)) {
        F = !1;
        var e = /Firefox\/([\.0-9]+)/.exec(O.userAgent);
        null !== e && (F = !0, L = a(e[1]));
      }

      return F;
    }

    function y() {
      return t(b) || (b = /Windows/i.test(O.appVersion)), b;
    }

    function T() {
      return m() && L;
    }

    function R() {
      return t(B) || (B = !m() && "undefined" != typeof PointerEvent && (!t(O.pointerEnabled) || O.pointerEnabled)), B;
    }

    function A() {
      if (!t(q)) {
        var e = document.createElement("canvas");
        e.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;");
        var r = e.style.imageRendering;
        q = t(r) && "" !== r, q && (z = r);
      }

      return q;
    }

    function v() {
      return A() ? z : void 0;
    }

    function S() {
      return S._result;
    }

    var O;
    O = "undefined" != typeof navigator ? navigator : {};
    var I, N, w, g, M, C, x, P, U, D, F, L, b, B, z, q;
    S._promise = void 0, S._result = void 0, S.initialize = function () {
      if (t(S._promise)) return S._promise;
      var e = o.defer();
      if (S._promise = e.promise, E()) return S._result = !1, e.resolve(S._result), e.promise;
      var r = new Image();
      return r.onload = function () {
        S._result = r.width > 0 && r.height > 0, e.resolve(S._result);
      }, r.onerror = function () {
        S._result = !1, e.resolve(S._result);
      }, r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.promise;
    }, r(S, {
      initialized: {
        get: function get() {
          return t(S._result);
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
      isEdge: E,
      edgeVersion: _,
      isFirefox: m,
      firefoxVersion: T,
      isWindows: y,
      hardwareConcurrency: e(O.hardwareConcurrency, 3),
      supportsPointerEvents: R,
      supportsImageRenderingPixelated: A,
      supportsWebP: S,
      imageRenderingValue: v,
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
  }), define("Core/ComponentDatatype", ["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function (e, t, r, n, i, o) {
    "use strict";

    if (!n.supportsTypedArrays()) return {};
    var a = {
      BYTE: o.BYTE,
      UNSIGNED_BYTE: o.UNSIGNED_BYTE,
      SHORT: o.SHORT,
      UNSIGNED_SHORT: o.UNSIGNED_SHORT,
      INT: o.INT,
      UNSIGNED_INT: o.UNSIGNED_INT,
      FLOAT: o.FLOAT,
      DOUBLE: o.DOUBLE
    };
    return a.getSizeInBytes = function (e) {
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
    }, a.fromTypedArray = function (e) {
      return e instanceof Int8Array ? a.BYTE : e instanceof Uint8Array ? a.UNSIGNED_BYTE : e instanceof Int16Array ? a.SHORT : e instanceof Uint16Array ? a.UNSIGNED_SHORT : e instanceof Int32Array ? a.INT : e instanceof Uint32Array ? a.UNSIGNED_INT : e instanceof Float32Array ? a.FLOAT : e instanceof Float64Array ? a.DOUBLE : void 0;
    }, a.validate = function (e) {
      return t(e) && (e === a.BYTE || e === a.UNSIGNED_BYTE || e === a.SHORT || e === a.UNSIGNED_SHORT || e === a.INT || e === a.UNSIGNED_INT || e === a.FLOAT || e === a.DOUBLE);
    }, a.createTypedArray = function (e, t) {
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
    }, a.createArrayBufferView = function (t, r, n, i) {
      switch (n = e(n, 0), i = e(i, (r.byteLength - n) / a.getSizeInBytes(t)), t) {
        case a.BYTE:
          return new Int8Array(r, n, i);

        case a.UNSIGNED_BYTE:
          return new Uint8Array(r, n, i);

        case a.SHORT:
          return new Int16Array(r, n, i);

        case a.UNSIGNED_SHORT:
          return new Uint16Array(r, n, i);

        case a.INT:
          return new Int32Array(r, n, i);

        case a.UNSIGNED_INT:
          return new Uint32Array(r, n, i);

        case a.FLOAT:
          return new Float32Array(r, n, i);

        case a.DOUBLE:
          return new Float64Array(r, n, i);
      }
    }, a.fromName = function (e) {
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
    }, i(a);
  }), define("Core/Cartesian2", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, i, o) {
    "use strict";

    function a(e, r) {
      this.x = t(e, 0), this.y = t(r, 0);
    }

    a.fromElements = function (e, t, n) {
      return r(n) ? (n.x = e, n.y = t, n) : new a(e, t);
    }, a.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t) : new a(e.x, e.y);
    }, a.fromCartesian3 = a.clone, a.fromCartesian4 = a.clone, a.packedLength = 2, a.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n] = e.y, r;
    }, a.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new a()), i.x = e[n++], i.y = e[n], i;
    }, a.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 2 * n : t = new Array(2 * n);

      for (var i = 0; i < n; ++i) {
        a.pack(e[i], t, 2 * i);
      }

      return t;
    }, a.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 2 : t = new Array(n / 2);

      for (var i = 0; i < n; i += 2) {
        var o = i / 2;
        t[o] = a.unpack(e, i, t[o]);
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
      return a.abs(r, r), t = r.x <= r.y ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_Y, t);
    }, a.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y;
    }, a.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1];
    }, a.equalsEpsilon = function (e, t, n, i) {
      return e === t || r(e) && r(t) && o.equalsEpsilon(e.x, t.x, n, i) && o.equalsEpsilon(e.y, t.y, n, i);
    }, a.ZERO = i(new a(0, 0)), a.UNIT_X = i(new a(1, 0)), a.UNIT_Y = i(new a(0, 1)), a.prototype.clone = function (e) {
      return a.clone(this, e);
    }, a.prototype.equals = function (e) {
      return a.equals(this, e);
    }, a.prototype.equalsEpsilon = function (e, t, r) {
      return a.equalsEpsilon(this, e, t, r);
    }, a.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ")";
    }, a;
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
  }), define("Core/Matrix2", ["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject"], function (e, t, r, n, i, o) {
    "use strict";

    function a(e, t, n, i) {
      this[0] = r(e, 0), this[1] = r(n, 0), this[2] = r(t, 0), this[3] = r(i, 0);
    }

    a.packedLength = 4, a.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t;
    }, a.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new a()), i[0] = e[t++], i[1] = e[t++], i[2] = e[t++], i[3] = e[t++], i;
    }, a.clone = function (e, t) {
      if (n(e)) return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : new a(e[0], e[2], e[1], e[3]);
    }, a.fromArray = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new a()), i[0] = e[t], i[1] = e[t + 1], i[2] = e[t + 2], i[3] = e[t + 3], i;
    }, a.fromColumnMajorArray = function (e, t) {
      return a.clone(e, t);
    }, a.fromRowMajorArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3], t) : new a(e[0], e[1], e[2], e[3]);
    }, a.fromScale = function (e, t) {
      return n(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = e.y, t) : new a(e.x, 0, 0, e.y);
    }, a.fromUniformScale = function (e, t) {
      return n(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = e, t) : new a(e, 0, 0, e);
    }, a.fromRotation = function (e, t) {
      var r = Math.cos(e),
          i = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = i, t[2] = -i, t[3] = r, t) : new a(r, -i, i, r);
    }, a.toArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : [e[0], e[1], e[2], e[3]];
    }, a.getElementIndex = function (e, t) {
      return 2 * e + t;
    }, a.getColumn = function (e, t, r) {
      var n = 2 * t,
          i = e[n],
          o = e[n + 1];
      return r.x = i, r.y = o, r;
    }, a.setColumn = function (e, t, r, n) {
      n = a.clone(e, n);
      var i = 2 * t;
      return n[i] = r.x, n[i + 1] = r.y, n;
    }, a.getRow = function (e, t, r) {
      var n = e[t],
          i = e[t + 2];
      return r.x = n, r.y = i, r;
    }, a.setRow = function (e, t, r, n) {
      return n = a.clone(e, n), n[t] = r.x, n[t + 2] = r.y, n;
    };
    var u = new e();

    a.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], u)), r.y = e.magnitude(e.fromElements(t[2], t[3], u)), r;
    };

    var s = new e();
    return a.getMaximumScale = function (t) {
      return a.getScale(t, s), e.maximumComponent(s);
    }, a.multiply = function (e, t, r) {
      var n = e[0] * t[0] + e[2] * t[1],
          i = e[0] * t[2] + e[2] * t[3],
          o = e[1] * t[0] + e[3] * t[1],
          a = e[1] * t[2] + e[3] * t[3];
      return r[0] = n, r[1] = o, r[2] = i, r[3] = a, r;
    }, a.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r;
    }, a.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r;
    }, a.multiplyByVector = function (e, t, r) {
      var n = e[0] * t.x + e[2] * t.y,
          i = e[1] * t.x + e[3] * t.y;
      return r.x = n, r.y = i, r;
    }, a.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r;
    }, a.multiplyByScale = function (e, t, r) {
      return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.y, r[3] = e[3] * t.y, r;
    }, a.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t;
    }, a.transpose = function (e, t) {
      var r = e[0],
          n = e[2],
          i = e[1],
          o = e[3];
      return t[0] = r, t[1] = n, t[2] = i, t[3] = o, t;
    }, a.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t;
    }, a.equals = function (e, t) {
      return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
    }, a.equalsArray = function (e, t, r) {
      return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3];
    }, a.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r;
    }, a.IDENTITY = o(new a(1, 0, 0, 1)), a.ZERO = o(new a(0, 0, 0, 0)), a.COLUMN0ROW0 = 0, a.COLUMN0ROW1 = 1, a.COLUMN1ROW0 = 2, a.COLUMN1ROW1 = 3, i(a.prototype, {
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
  }), define("Core/Quaternion", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math", "./Matrix3"], function (e, t, r, n, i, o, a, u) {
    "use strict";

    function s(e, t, n, i) {
      this.x = r(e, 0), this.y = r(t, 0), this.z = r(n, 0), this.w = r(i, 0);
    }

    var c = new e();

    s.fromAxisAngle = function (t, r, i) {
      var o = r / 2,
          a = Math.sin(o);
      c = e.normalize(t, c);
      var u = c.x * a,
          l = c.y * a,
          f = c.z * a,
          h = Math.cos(o);
      return n(i) ? (i.x = u, i.y = l, i.z = f, i.w = h, i) : new s(u, l, f, h);
    };

    var l = [1, 2, 0],
        f = new Array(3);

    s.fromRotationMatrix = function (e, t) {
      var r,
          i,
          o,
          a,
          c,
          h = e[u.COLUMN0ROW0],
          d = e[u.COLUMN1ROW1],
          p = e[u.COLUMN2ROW2],
          E = h + d + p;
      if (E > 0) r = Math.sqrt(E + 1), c = .5 * r, r = .5 / r, i = (e[u.COLUMN1ROW2] - e[u.COLUMN2ROW1]) * r, o = (e[u.COLUMN2ROW0] - e[u.COLUMN0ROW2]) * r, a = (e[u.COLUMN0ROW1] - e[u.COLUMN1ROW0]) * r;else {
        var _ = l,
            m = 0;
        d > h && (m = 1), p > h && p > d && (m = 2);
        var y = _[m],
            T = _[y];
        r = Math.sqrt(e[u.getElementIndex(m, m)] - e[u.getElementIndex(y, y)] - e[u.getElementIndex(T, T)] + 1);
        var R = f;
        R[m] = .5 * r, r = .5 / r, c = (e[u.getElementIndex(T, y)] - e[u.getElementIndex(y, T)]) * r, R[y] = (e[u.getElementIndex(y, m)] + e[u.getElementIndex(m, y)]) * r, R[T] = (e[u.getElementIndex(T, m)] + e[u.getElementIndex(m, T)]) * r, i = -R[0], o = -R[1], a = -R[2];
      }
      return n(t) ? (t.x = i, t.y = o, t.z = a, t.w = c, t) : new s(i, o, a, c);
    };

    var h = new s(),
        d = new s(),
        p = new s(),
        E = new s();

    s.fromHeadingPitchRoll = function (t, r) {
      return E = s.fromAxisAngle(e.UNIT_X, t.roll, h), p = s.fromAxisAngle(e.UNIT_Y, -t.pitch, r), r = s.multiply(p, E, p), d = s.fromAxisAngle(e.UNIT_Z, -t.heading, h), s.multiply(d, r, r);
    };

    var _ = new e(),
        m = new e(),
        y = new s(),
        T = new s(),
        R = new s();

    s.packedLength = 4, s.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e.x, t[n++] = e.y, t[n++] = e.z, t[n] = e.w, t;
    }, s.unpack = function (e, t, i) {
      return t = r(t, 0), n(i) || (i = new s()), i.x = e[t], i.y = e[t + 1], i.z = e[t + 2], i.w = e[t + 3], i;
    }, s.packedInterpolationLength = 3, s.convertPackedArrayForInterpolation = function (e, t, r, n) {
      s.unpack(e, 4 * r, R), s.conjugate(R, R);

      for (var i = 0, o = r - t + 1; i < o; i++) {
        var a = 3 * i;
        s.unpack(e, 4 * (t + i), y), s.multiply(y, R, y), y.w < 0 && s.negate(y, y), s.computeAxis(y, _);
        var u = s.computeAngle(y);
        n[a] = _.x * u, n[a + 1] = _.y * u, n[a + 2] = _.z * u;
      }
    }, s.unpackInterpolationResult = function (t, r, i, o, a) {
      n(a) || (a = new s()), e.fromArray(t, 0, m);
      var u = e.magnitude(m);
      return s.unpack(r, 4 * o, T), 0 === u ? s.clone(s.IDENTITY, y) : s.fromAxisAngle(m, u, y), s.multiply(y, T, a);
    }, s.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new s(e.x, e.y, e.z, e.w);
    }, s.conjugate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = e.w, t;
    }, s.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w;
    }, s.magnitude = function (e) {
      return Math.sqrt(s.magnitudeSquared(e));
    }, s.normalize = function (e, t) {
      var r = 1 / s.magnitude(e),
          n = e.x * r,
          i = e.y * r,
          o = e.z * r,
          a = e.w * r;
      return t.x = n, t.y = i, t.z = o, t.w = a, t;
    }, s.inverse = function (e, t) {
      var r = s.magnitudeSquared(e);
      return t = s.conjugate(e, t), s.multiplyByScalar(t, 1 / r, t);
    }, s.add = function (e, t, r) {
      return r.x = e.x + t.x, r.y = e.y + t.y, r.z = e.z + t.z, r.w = e.w + t.w, r;
    }, s.subtract = function (e, t, r) {
      return r.x = e.x - t.x, r.y = e.y - t.y, r.z = e.z - t.z, r.w = e.w - t.w, r;
    }, s.negate = function (e, t) {
      return t.x = -e.x, t.y = -e.y, t.z = -e.z, t.w = -e.w, t;
    }, s.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w;
    }, s.multiply = function (e, t, r) {
      var n = e.x,
          i = e.y,
          o = e.z,
          a = e.w,
          u = t.x,
          s = t.y,
          c = t.z,
          l = t.w,
          f = a * u + n * l + i * c - o * s,
          h = a * s - n * c + i * l + o * u,
          d = a * c + n * s - i * u + o * l,
          p = a * l - n * u - i * s - o * c;
      return r.x = f, r.y = h, r.z = d, r.w = p, r;
    }, s.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
    }, s.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
    }, s.computeAxis = function (e, t) {
      var r = e.w;
      if (Math.abs(r - 1) < a.EPSILON6) return t.x = t.y = t.z = 0, t;
      var n = 1 / Math.sqrt(1 - r * r);
      return t.x = e.x * n, t.y = e.y * n, t.z = e.z * n, t;
    }, s.computeAngle = function (e) {
      return Math.abs(e.w - 1) < a.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    };
    var A = new s();

    s.lerp = function (e, t, r, n) {
      return A = s.multiplyByScalar(t, r, A), n = s.multiplyByScalar(e, 1 - r, n), s.add(A, n, n);
    };

    var v = new s(),
        S = new s(),
        O = new s();
    s.slerp = function (e, t, r, n) {
      var i = s.dot(e, t),
          o = t;
      if (i < 0 && (i = -i, o = v = s.negate(t, v)), 1 - i < a.EPSILON6) return s.lerp(e, o, r, n);
      var u = Math.acos(i);
      return S = s.multiplyByScalar(e, Math.sin((1 - r) * u), S), O = s.multiplyByScalar(o, Math.sin(r * u), O), n = s.add(S, O, n), s.multiplyByScalar(n, 1 / Math.sin(u), n);
    }, s.log = function (t, r) {
      var n = a.acosClamped(t.w),
          i = 0;
      return 0 !== n && (i = n / Math.sin(n)), e.multiplyByScalar(t, i, r);
    }, s.exp = function (t, r) {
      var n = e.magnitude(t),
          i = 0;
      return 0 !== n && (i = Math.sin(n) / n), r.x = t.x * i, r.y = t.y * i, r.z = t.z * i, r.w = Math.cos(n), r;
    };
    var I = new e(),
        N = new e(),
        w = new s(),
        g = new s();
    s.computeInnerQuadrangle = function (t, r, n, i) {
      var o = s.conjugate(r, w);
      s.multiply(o, n, g);
      var a = s.log(g, I);
      s.multiply(o, t, g);
      var u = s.log(g, N);
      return e.add(a, u, a), e.multiplyByScalar(a, .25, a), e.negate(a, a), s.exp(a, w), s.multiply(r, w, i);
    }, s.squad = function (e, t, r, n, i, o) {
      var a = s.slerp(e, t, i, w),
          u = s.slerp(r, n, i, g);
      return s.slerp(a, u, 2 * i * (1 - i), o);
    };

    for (var M = new s(), C = 1.9011074535173003, x = i.supportsTypedArrays() ? new Float32Array(8) : [], P = i.supportsTypedArrays() ? new Float32Array(8) : [], U = i.supportsTypedArrays() ? new Float32Array(8) : [], D = i.supportsTypedArrays() ? new Float32Array(8) : [], F = 0; F < 7; ++F) {
      var L = F + 1,
          b = 2 * L + 1;
      x[F] = 1 / (L * b), P[F] = L / b;
    }

    return x[7] = C / 136, P[7] = 8 * C / 17, s.fastSlerp = function (e, t, r, n) {
      var i,
          o = s.dot(e, t);
      o >= 0 ? i = 1 : (i = -1, o = -o);

      for (var a = o - 1, u = 1 - r, c = r * r, l = u * u, f = 7; f >= 0; --f) {
        U[f] = (x[f] * c - P[f]) * a, D[f] = (x[f] * l - P[f]) * a;
      }

      var h = i * r * (1 + U[0] * (1 + U[1] * (1 + U[2] * (1 + U[3] * (1 + U[4] * (1 + U[5] * (1 + U[6] * (1 + U[7])))))))),
          d = u * (1 + D[0] * (1 + D[1] * (1 + D[2] * (1 + D[3] * (1 + D[4] * (1 + D[5] * (1 + D[6] * (1 + D[7])))))))),
          p = s.multiplyByScalar(e, d, M);
      return s.multiplyByScalar(t, h, n), s.add(p, n, n);
    }, s.fastSquad = function (e, t, r, n, i, o) {
      var a = s.fastSlerp(e, t, i, w),
          u = s.fastSlerp(r, n, i, g);
      return s.fastSlerp(a, u, 2 * i * (1 - i), o);
    }, s.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, s.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.x - t.x) <= r && Math.abs(e.y - t.y) <= r && Math.abs(e.z - t.z) <= r && Math.abs(e.w - t.w) <= r;
    }, s.ZERO = o(new s(0, 0, 0, 0)), s.IDENTITY = o(new s(0, 0, 0, 1)), s.prototype.clone = function (e) {
      return s.clone(this, e);
    }, s.prototype.equals = function (e) {
      return s.equals(this, e);
    }, s.prototype.equalsEpsilon = function (e, t) {
      return s.equalsEpsilon(this, e, t);
    }, s.prototype.toString = function () {
      return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
    }, s;
  }), define("Core/binarySearch", ["./Check"], function (e) {
    "use strict";

    function t(e, t, r) {
      for (var n, i, o = 0, a = e.length - 1; o <= a;) {
        if (n = ~~((o + a) / 2), (i = r(e[n], t)) < 0) o = n + 1;else {
          if (!(i > 0)) return n;
          a = n - 1;
        }
      }

      return ~(a + 1);
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
          o = function o(e, t, r, n, _o, a) {
        var u = n - e.length;
        return u > 0 && (e = r || !_o ? i(e, n, a, r) : e.slice(0, t.length) + i("", u, "0", !0) + e.slice(t.length)), e;
      },
          a = function a(e, t, r, n, _a, u, s) {
        var c = e >>> 0;
        return r = r && c && {
          2: "0b",
          8: "0",
          16: "0x"
        }[t] || "", e = r + i(c.toString(t), u || 0, "0", !1), o(e, r, n, _a, s);
      },
          u = function u(e, t, r, n, i, a) {
        return null != n && (e = e.slice(0, n)), o(e, "", t, r, i, a);
      },
          s = function s(e, n, _s, c, l, f, h) {
        var d, p, E, _, m;

        if ("%%" == e) return "%";

        for (var y = !1, T = "", R = !1, A = !1, v = " ", S = _s.length, O = 0; _s && O < S; O++) {
          switch (_s.charAt(O)) {
            case " ":
              T = " ";
              break;

            case "+":
              T = "+";
              break;

            case "-":
              y = !0;
              break;

            case "'":
              v = _s.charAt(O + 1);
              break;

            case "0":
              R = !0;
              break;

            case "#":
              A = !0;
          }
        }

        if (c = c ? "*" == c ? +t[r++] : "*" == c.charAt(0) ? +t[c.slice(1, -1)] : +c : 0, c < 0 && (c = -c, y = !0), !isFinite(c)) throw new Error("sprintf: (minimum-)width must be finite");

        switch (f = f ? "*" == f ? +t[r++] : "*" == f.charAt(0) ? +t[f.slice(1, -1)] : +f : "fFeE".indexOf(h) > -1 ? 6 : "d" == h ? 0 : void 0, m = n ? t[n.slice(0, -1)] : t[r++], h) {
          case "s":
            return u(String(m), y, c, f, R, v);

          case "c":
            return u(String.fromCharCode(+m), y, c, f, R);

          case "b":
            return a(m, 2, A, y, c, f, R);

          case "o":
            return a(m, 8, A, y, c, f, R);

          case "x":
            return a(m, 16, A, y, c, f, R);

          case "X":
            return a(m, 16, A, y, c, f, R).toUpperCase();

          case "u":
            return a(m, 10, A, y, c, f, R);

          case "i":
          case "d":
            return d = +m || 0, d = Math.round(d - d % 1), p = d < 0 ? "-" : T, m = p + i(String(Math.abs(d)), f, "0", !1), o(m, p, y, c, R);

          case "e":
          case "E":
          case "f":
          case "F":
          case "g":
          case "G":
            return d = +m, p = d < 0 ? "-" : T, E = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(h.toLowerCase())], _ = ["toString", "toUpperCase"]["eEfFgG".indexOf(h) % 2], m = p + Math.abs(d)[E](f), o(m, p, y, c, R)[_]();

          default:
            return e;
        }
      };

      return n.replace(e, s);
    }

    return e;
  }), define("Core/GregorianDate", [], function () {
    "use strict";

    function e(e, t, r, n, i, o, a, u) {
      this.year = e, this.month = t, this.day = r, this.hour = n, this.minute = i, this.second = o, this.millisecond = a, this.isLeapSecond = u;
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
  }), define("Core/JulianDate", ["../ThirdParty/sprintf", "./binarySearch", "./defaultValue", "./defined", "./DeveloperError", "./GregorianDate", "./isLeapYear", "./LeapSecond", "./TimeConstants", "./TimeStandard"], function (e, t, r, n, i, o, a, u, s, c) {
    "use strict";

    function l(e, t) {
      return E.compare(e.julianDate, t.julianDate);
    }

    function f(e) {
      y.julianDate = e;
      var r = E.leapSeconds,
          n = t(r, y, l);
      n < 0 && (n = ~n), n >= r.length && (n = r.length - 1);
      var i = r[n].offset;

      if (n > 0) {
        E.secondsDifference(r[n].julianDate, e) > i && (n--, i = r[n].offset);
      }

      E.addSeconds(e, i, e);
    }

    function h(e, r) {
      y.julianDate = e;
      var n = E.leapSeconds,
          i = t(n, y, l);
      if (i < 0 && (i = ~i), 0 === i) return E.addSeconds(e, -n[0].offset, r);
      if (i >= n.length) return E.addSeconds(e, -n[i - 1].offset, r);
      var o = E.secondsDifference(n[i].julianDate, e);
      return 0 === o ? E.addSeconds(e, -n[i].offset, r) : o <= 1 ? void 0 : E.addSeconds(e, -n[--i].offset, r);
    }

    function d(e, t, r) {
      var n = t / s.SECONDS_PER_DAY | 0;
      return e += n, t -= s.SECONDS_PER_DAY * n, t < 0 && (e--, t += s.SECONDS_PER_DAY), r.dayNumber = e, r.secondsOfDay = t, r;
    }

    function p(e, t, r, n, i, o, a) {
      var u = (t - 14) / 12 | 0,
          c = e + 4800 + u,
          l = (1461 * c / 4 | 0) + (367 * (t - 2 - 12 * u) / 12 | 0) - (3 * ((c + 100) / 100 | 0) / 4 | 0) + r - 32075;
      (n -= 12) < 0 && (n += 24);
      var f = o + (n * s.SECONDS_PER_HOUR + i * s.SECONDS_PER_MINUTE + a * s.SECONDS_PER_MILLISECOND);
      return f >= 43200 && (l -= 1), [l, f];
    }

    function E(e, t, n) {
      this.dayNumber = void 0, this.secondsOfDay = void 0, e = r(e, 0), t = r(t, 0), n = r(n, c.UTC);
      var i = 0 | e;
      t += (e - i) * s.SECONDS_PER_DAY, d(i, t, this), n === c.UTC && f(this);
    }

    var _ = new o(),
        m = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        y = new u(),
        T = /^(\d{4})$/,
        R = /^(\d{4})-(\d{2})$/,
        A = /^(\d{4})-?(\d{3})$/,
        v = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
        S = /^(\d{4})-?(\d{2})-?(\d{2})$/,
        O = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
        I = /^(\d{2})(\.\d+)?/.source + O.source,
        N = /^(\d{2}):?(\d{2})(\.\d+)?/.source + O.source,
        w = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + O.source;

    E.fromGregorianDate = function (e, t) {
      var r = p(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
      return n(t) ? (d(r[0], r[1], t), f(t), t) : new E(r[0], r[1], c.UTC);
    }, E.fromDate = function (e, t) {
      var r = p(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
      return n(t) ? (d(r[0], r[1], t), f(t), t) : new E(r[0], r[1], c.UTC);
    }, E.fromIso8601 = function (e, t) {
      e = e.replace(",", ".");
      var r,
          i,
          o,
          u = e.split("T"),
          s = 1,
          l = 1,
          h = 0,
          _ = 0,
          y = 0,
          O = 0,
          g = u[0],
          M = u[1];
      if (null !== (u = g.match(S))) r = +u[1], s = +u[2], l = +u[3];else if (null !== (u = g.match(R))) r = +u[1], s = +u[2];else if (null !== (u = g.match(T))) r = +u[1];else {
        var C;
        if (null !== (u = g.match(A))) r = +u[1], C = +u[2], o = a(r);else if (null !== (u = g.match(v))) {
          r = +u[1];
          var x = +u[2],
              P = +u[3] || 0,
              U = new Date(Date.UTC(r, 0, 4));
          C = 7 * x + P - U.getUTCDay() - 3;
        }
        i = new Date(Date.UTC(r, 0, 1)), i.setUTCDate(C), s = i.getUTCMonth() + 1, l = i.getUTCDate();
      }
      o = a(r);
      var D;

      if (n(M)) {
        u = M.match(w), null !== u ? (h = +u[1], _ = +u[2], y = +u[3], O = 1e3 * +(u[4] || 0), D = 5) : (u = M.match(N), null !== u ? (h = +u[1], _ = +u[2], y = 60 * +(u[3] || 0), D = 4) : null !== (u = M.match(I)) && (h = +u[1], _ = 60 * +(u[2] || 0), D = 3));
        var F = u[D],
            L = +u[D + 1],
            b = +(u[D + 2] || 0);

        switch (F) {
          case "+":
            h -= L, _ -= b;
            break;

          case "-":
            h += L, _ += b;
            break;

          case "Z":
            break;

          default:
            _ += new Date(Date.UTC(r, s - 1, l, h, _)).getTimezoneOffset();
        }
      }

      var B = 60 === y;

      for (B && y--; _ >= 60;) {
        _ -= 60, h++;
      }

      for (; h >= 24;) {
        h -= 24, l++;
      }

      for (i = o && 2 === s ? 29 : m[s - 1]; l > i;) {
        l -= i, s++, s > 12 && (s -= 12, r++), i = o && 2 === s ? 29 : m[s - 1];
      }

      for (; _ < 0;) {
        _ += 60, h--;
      }

      for (; h < 0;) {
        h += 24, l--;
      }

      for (; l < 1;) {
        s--, s < 1 && (s += 12, r--), i = o && 2 === s ? 29 : m[s - 1], l += i;
      }

      var z = p(r, s, l, h, _, y, O);
      return n(t) ? (d(z[0], z[1], t), f(t)) : t = new E(z[0], z[1], c.UTC), B && E.addSeconds(t, 1, t), t;
    }, E.now = function (e) {
      return E.fromDate(new Date(), e);
    };
    var g = new E(0, 0, c.TAI);
    return E.toGregorianDate = function (e, t) {
      var r = !1,
          i = h(e, g);
      n(i) || (E.addSeconds(e, -1, g), i = h(g, g), r = !0);
      var a = i.dayNumber,
          u = i.secondsOfDay;
      u >= 43200 && (a += 1);
      var c = a + 68569 | 0,
          l = 4 * c / 146097 | 0;
      c = c - ((146097 * l + 3) / 4 | 0) | 0;
      var f = 4e3 * (c + 1) / 1461001 | 0;
      c = c - (1461 * f / 4 | 0) + 31 | 0;
      var d = 80 * c / 2447 | 0,
          p = c - (2447 * d / 80 | 0) | 0;
      c = d / 11 | 0;

      var _ = d + 2 - 12 * c | 0,
          m = 100 * (l - 49) + f + c | 0,
          y = u / s.SECONDS_PER_HOUR | 0,
          T = u - y * s.SECONDS_PER_HOUR,
          R = T / s.SECONDS_PER_MINUTE | 0;

      T -= R * s.SECONDS_PER_MINUTE;
      var A = 0 | T,
          v = (T - A) / s.SECONDS_PER_MILLISECOND;
      return y += 12, y > 23 && (y -= 24), r && (A += 1), n(t) ? (t.year = m, t.month = _, t.day = p, t.hour = y, t.minute = R, t.second = A, t.millisecond = v, t.isLeapSecond = r, t) : new o(m, _, p, y, R, A, v, r);
    }, E.toDate = function (e) {
      var t = E.toGregorianDate(e, _),
          r = t.second;
      return t.isLeapSecond && (r -= 1), new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, r, t.millisecond));
    }, E.toIso8601 = function (t, r) {
      var i = E.toGregorianDate(t, _),
          o = i.year,
          a = i.month,
          u = i.day,
          s = i.hour,
          c = i.minute,
          l = i.second,
          f = i.millisecond;
      1e4 === o && 1 === a && 1 === u && 0 === s && 0 === c && 0 === l && 0 === f && (o = 9999, a = 12, u = 31, s = 24);
      var h;
      return n(r) || 0 === f ? n(r) && 0 !== r ? (h = (.01 * f).toFixed(r).replace(".", "").slice(0, r), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", o, a, u, s, c, l, h)) : e("%04d-%02d-%02dT%02d:%02d:%02dZ", o, a, u, s, c, l) : (h = (.01 * f).toString().replace(".", ""), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", o, a, u, s, c, l, h));
    }, E.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.dayNumber = e.dayNumber, t.secondsOfDay = e.secondsOfDay, t) : new E(e.dayNumber, e.secondsOfDay, c.TAI);
    }, E.compare = function (e, t) {
      var r = e.dayNumber - t.dayNumber;
      return 0 !== r ? r : e.secondsOfDay - t.secondsOfDay;
    }, E.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
    }, E.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(E.secondsDifference(e, t)) <= r;
    }, E.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / s.SECONDS_PER_DAY;
    }, E.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * s.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
    }, E.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / s.SECONDS_PER_DAY;
    }, E.computeTaiMinusUtc = function (e) {
      y.julianDate = e;
      var r = E.leapSeconds,
          n = t(r, y, l);
      return n < 0 && (n = ~n, --n < 0 && (n = 0)), r[n].offset;
    }, E.addSeconds = function (e, t, r) {
      return d(e.dayNumber, e.secondsOfDay + t, r);
    }, E.addMinutes = function (e, t, r) {
      var n = e.secondsOfDay + t * s.SECONDS_PER_MINUTE;
      return d(e.dayNumber, n, r);
    }, E.addHours = function (e, t, r) {
      var n = e.secondsOfDay + t * s.SECONDS_PER_HOUR;
      return d(e.dayNumber, n, r);
    }, E.addDays = function (e, t, r) {
      return d(e.dayNumber + t, e.secondsOfDay, r);
    }, E.lessThan = function (e, t) {
      return E.compare(e, t) < 0;
    }, E.lessThanOrEquals = function (e, t) {
      return E.compare(e, t) <= 0;
    }, E.greaterThan = function (e, t) {
      return E.compare(e, t) > 0;
    }, E.greaterThanOrEquals = function (e, t) {
      return E.compare(e, t) >= 0;
    }, E.prototype.clone = function (e) {
      return E.clone(this, e);
    }, E.prototype.equals = function (e) {
      return E.equals(this, e);
    }, E.prototype.equalsEpsilon = function (e, t) {
      return E.equalsEpsilon(this, e, t);
    }, E.prototype.toString = function () {
      return E.toIso8601(this);
    }, E.leapSeconds = [new u(new E(2441317, 43210, c.TAI), 10), new u(new E(2441499, 43211, c.TAI), 11), new u(new E(2441683, 43212, c.TAI), 12), new u(new E(2442048, 43213, c.TAI), 13), new u(new E(2442413, 43214, c.TAI), 14), new u(new E(2442778, 43215, c.TAI), 15), new u(new E(2443144, 43216, c.TAI), 16), new u(new E(2443509, 43217, c.TAI), 17), new u(new E(2443874, 43218, c.TAI), 18), new u(new E(2444239, 43219, c.TAI), 19), new u(new E(2444786, 43220, c.TAI), 20), new u(new E(2445151, 43221, c.TAI), 21), new u(new E(2445516, 43222, c.TAI), 22), new u(new E(2446247, 43223, c.TAI), 23), new u(new E(2447161, 43224, c.TAI), 24), new u(new E(2447892, 43225, c.TAI), 25), new u(new E(2448257, 43226, c.TAI), 26), new u(new E(2448804, 43227, c.TAI), 27), new u(new E(2449169, 43228, c.TAI), 28), new u(new E(2449534, 43229, c.TAI), 29), new u(new E(2450083, 43230, c.TAI), 30), new u(new E(2450630, 43231, c.TAI), 31), new u(new E(2451179, 43232, c.TAI), 32), new u(new E(2453736, 43233, c.TAI), 33), new u(new E(2454832, 43234, c.TAI), 34), new u(new E(2456109, 43235, c.TAI), 35), new u(new E(2457204, 43236, c.TAI), 36), new u(new E(2457754, 43237, c.TAI), 37)], E;
  }), define("ThirdParty/Uri", [], function () {
    function e(t) {
      if (t instanceof e) this.scheme = t.scheme, this.authority = t.authority, this.path = t.path, this.query = t.query, this.fragment = t.fragment;else if (t) {
        var r = n.exec(t);
        this.scheme = r[1], this.authority = r[2], this.path = r[3], this.query = r[4], this.fragment = r[5];
      }
    }

    function t(e) {
      var t = unescape(e);
      return o.test(t) ? t : e.toUpperCase();
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
      this.removeDotSegments(), this.scheme && (this.scheme = this.scheme.toLowerCase()), this.authority && (this.authority = this.authority.replace(a, r).replace(i, t)), this.path && (this.path = this.path.replace(i, t)), this.query && (this.query = this.query.replace(i, t)), this.fragment && (this.fragment = this.fragment.replace(i, t));
    };
    var i = /%[0-9a-z]{2}/gi,
        o = /[a-zA-Z0-9\-\._~]/,
        a = /(.*@)?([^@:]*)(:.*)?/;
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

      for (var o in r) {
        if (r.hasOwnProperty(o)) {
          var a = r[o];
          n && (a = t(a, n)), i[o] = a;
        }
      }

      return i;
    }

    return t;
  }), define("Core/combine", ["./defaultValue", "./defined"], function (e, t) {
    "use strict";

    function r(n, i, o) {
      o = e(o, !1);
      var a,
          u,
          s,
          c = {},
          l = t(n),
          f = t(i);
      if (l) for (a in n) {
        n.hasOwnProperty(a) && (u = n[a], f && o && "object" == _typeof(u) && i.hasOwnProperty(a) ? (s = i[a], c[a] = "object" == _typeof(s) ? r(u, s, o) : u) : c[a] = u);
      }
      if (f) for (a in i) {
        i.hasOwnProperty(a) && !c.hasOwnProperty(a) && (s = i[a], c[a] = s);
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

    return i._implementation = function (n, i, o) {
      if (!r(i)) {
        if (void 0 === o) return n;
        i = t(o.baseURI, o.location.href);
      }

      var a = new e(i);
      return new e(n).resolve(a).toString();
    }, i;
  }), define("Core/getBaseUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(r, n) {
      var i = "",
          o = r.lastIndexOf("/");
      return -1 !== o && (i = r.substring(0, o + 1)), n ? (r = new e(r), t(r.query) && (i += "?" + r.query), t(r.fragment) && (i += "#" + r.fragment), i) : i;
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
              o = encodeURIComponent(n) + "=";
          if (r(i)) for (var a = 0, u = i.length; a < u; ++a) {
            t += o + encodeURIComponent(i[a]) + "&";
          } else t += o + encodeURIComponent(i) + "&";
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

      for (var i = t.replace(/\+/g, "%20").split(/[&;]/), o = 0, a = i.length; o < a; ++o) {
        var u = i[o].split("="),
            s = decodeURIComponent(u[0]),
            c = u[1];
        c = e(c) ? decodeURIComponent(c) : "";
        var l = n[s];
        "string" == typeof l ? n[s] = [l, c] : r(l) ? l.push(c) : n[s] = c;
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
          o = e(t.throttle, !1);
      this.url = t.url, this.requestFunction = t.requestFunction, this.cancelFunction = t.cancelFunction, this.priorityFunction = t.priorityFunction, this.priority = e(t.priority, 0), this.throttle = o, this.throttleByServer = i, this.type = e(t.type, n.OTHER), this.serverKey = void 0, this.state = r.UNISSUED, this.deferred = void 0, this.cancelled = !1;
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
            o = i.indexOf(": ");

        if (o > 0) {
          var a = i.substring(0, o),
              u = i.substring(o + 2);
          t[a] = u;
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
      for (var r = this._listeners, n = this._scopes, i = -1, o = 0; o < r.length; o++) {
        if (r[o] === e && n[o] === t) {
          i = o;
          break;
        }
      }

      return -1 !== i && (this._insideRaiseEvent ? (this._toRemove.push(i), r[i] = void 0, n[i] = void 0) : (r.splice(i, 1), n.splice(i, 1)), !0);
    }, n.prototype.raiseEvent = function () {
      this._insideRaiseEvent = !0;
      var e,
          r = this._listeners,
          n = this._scopes,
          o = r.length;

      for (e = 0; e < o; e++) {
        var a = r[e];
        t(a) && r[e].apply(n[e], arguments);
      }

      var u = this._toRemove;

      if ((o = u.length) > 0) {
        for (u.sort(i), e = 0; e < o; e++) {
          var s = u[e];
          r.splice(s, 1), n.splice(s, 1);
        }

        u.length = 0;
      }

      this._insideRaiseEvent = !1;
    }, n;
  }), define("Core/Heap", ["./Check", "./defaultValue", "./defined", "./defineProperties"], function (e, t, r, n) {
    "use strict";

    function i(e) {
      this._comparator = e.comparator, this._array = [], this._length = 0, this._maximumLength = void 0;
    }

    function o(e, t, r) {
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

      for (var r = this._length, n = this._comparator, i = this._array, a = -1, u = !0; u;) {
        var s = 2 * (e + 1),
            c = s - 1;
        a = c < r && n(i[c], i[e]) < 0 ? c : e, s < r && n(i[s], i[a]) < 0 && (a = s), a !== e ? (o(i, a, e), e = a) : u = !1;
      }
    }, i.prototype.resort = function () {
      for (var e = this._length, t = Math.ceil(e / 2); t >= 0; --t) {
        this.heapify(t);
      }
    }, i.prototype.insert = function (e) {
      var t = this._array,
          n = this._comparator,
          i = this._maximumLength,
          a = this._length++;

      for (a < t.length ? t[a] = e : t.push(e); 0 !== a;) {
        var u = Math.floor((a - 1) / 2);
        if (!(n(t[a], t[u]) < 0)) break;
        o(t, a, u), a = u;
      }

      var s;
      return r(i) && this._length > i && (s = t[i], this._length = i), s;
    }, i.prototype.pop = function (e) {
      if (e = t(e, 0), 0 !== this._length) {
        var r = this._array,
            n = r[e];
        return o(r, e, --this._length), this.heapify(e), n;
      }
    }, i;
  }), define("Core/RequestScheduler", ["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Event", "./Heap", "./isBlobUri", "./isDataUri", "./RequestState"], function (e, t, r, n, i, o, a, u, s, c, l) {
    "use strict";

    function f(e, t) {
      return e.priority - t.priority;
    }

    function h() {}

    function d(e) {
      i(e.priorityFunction) && (e.priority = e.priorityFunction());
    }

    function p(e) {
      var t = n(h.requestsByServer[e], h.maximumRequestsPerServer);
      return I[e] < t;
    }

    function E(e) {
      return e.state === l.UNISSUED && (e.state = l.ISSUED, e.deferred = t.defer()), e.deferred.promise;
    }

    function _(e) {
      return function (t) {
        e.state !== l.CANCELLED && (--A.numberOfActiveRequests, --I[e.serverKey], w.raiseEvent(), e.state = l.RECEIVED, e.deferred.resolve(t));
      };
    }

    function m(e) {
      return function (t) {
        e.state !== l.CANCELLED && (++A.numberOfFailedRequests, --A.numberOfActiveRequests, --I[e.serverKey], w.raiseEvent(t), e.state = l.FAILED, e.deferred.reject(t));
      };
    }

    function y(e) {
      var t = E(e);
      return e.state = l.ACTIVE, O.push(e), ++A.numberOfActiveRequests, ++A.numberOfActiveRequestsEver, ++I[e.serverKey], e.requestFunction().then(_(e)).otherwise(m(e)), t;
    }

    function T(e) {
      var t = e.state === l.ACTIVE;
      e.state = l.CANCELLED, ++A.numberOfCancelledRequests, e.deferred.reject(), t && (--A.numberOfActiveRequests, --I[e.serverKey], ++A.numberOfCancelledActiveRequests), i(e.cancelFunction) && e.cancelFunction();
    }

    function R() {
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
        v = 20,
        S = new u({
      comparator: f
    });
    S.maximumLength = v, S.reserve(v);
    var O = [],
        I = {},
        N = "undefined" != typeof document ? new e(document.location.href) : new e(),
        w = new a();
    return h.maximumRequests = 50, h.maximumRequestsPerServer = 6, h.requestsByServer = {
      "api.pgEarth.com:443": 18,
      "assets.pgEarth.com:443": 18
    }, h.throttleRequests = !0, h.debugShowStatistics = !1, h.requestCompletedEvent = w, o(h, {
      statistics: {
        get: function get() {
          return A;
        }
      },
      priorityHeapLength: {
        get: function get() {
          return v;
        },
        set: function set(e) {
          if (e < v) for (; S.length > e;) {
            var t = S.pop();
            T(t);
          }
          v = e, S.maximumLength = e, S.reserve(e);
        }
      }
    }), h.update = function () {
      var e,
          t,
          r = 0,
          n = O.length;

      for (e = 0; e < n; ++e) {
        t = O[e], t.cancelled && T(t), t.state === l.ACTIVE ? r > 0 && (O[e - r] = t) : ++r;
      }

      O.length -= r;
      var i = S.internalArray,
          o = S.length;

      for (e = 0; e < o; ++e) {
        d(i[e]);
      }

      S.resort();

      for (var a = Math.max(h.maximumRequests - O.length, 0), u = 0; u < a && S.length > 0;) {
        t = S.pop(), t.cancelled ? T(t) : !t.throttleByServer || p(t.serverKey) ? (y(t), ++u) : T(t);
      }

      R();
    }, h.getServerKey = function (t) {
      var r = new e(t).resolve(N);
      r.normalize();
      var n = r.authority;
      /:/.test(n) || (n = n + ":" + ("https" === r.scheme ? "443" : "80"));
      var o = I[n];
      return i(o) || (I[n] = 0), n;
    }, h.request = function (e) {
      if (c(e.url) || s(e.url)) return w.raiseEvent(), e.state = l.RECEIVED, e.requestFunction();

      if (++A.numberOfAttemptedRequests, i(e.serverKey) || (e.serverKey = h.getServerKey(e.url)), !e.throttleByServer || p(e.serverKey)) {
        if (!h.throttleRequests || !e.throttle) return y(e);

        if (!(O.length >= h.maximumRequests)) {
          d(e);
          var t = S.insert(e);

          if (i(t)) {
            if (t === e) return;
            T(t);
          }

          return E(e);
        }
      }
    }, h.clearForSpecs = function () {
      for (; S.length > 0;) {
        T(S.pop());
      }

      for (var e = O.length, t = 0; t < e; ++t) {
        T(O[t]);
      }

      O.length = 0, I = {}, A.numberOfAttemptedRequests = 0, A.numberOfActiveRequests = 0, A.numberOfCancelledRequests = 0, A.numberOfCancelledActiveRequests = 0, A.numberOfFailedRequests = 0, A.numberOfActiveRequestsEver = 0, A.lastNumberOfActiveRequests = 0;
    }, h.numberOfActiveRequestsByServer = function (e) {
      return I[e];
    }, h.requestHeap = S, h;
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
          var o = n.getScheme();
          if (t(o) || (o = window.location.protocol, o = o.substring(0, o.length - 1)), "http" === o) i += ":80";else {
            if ("https" !== o) return;
            i += ":443";
          }
        }

        return i;
      }
    }

    var i = {},
        o = {};
    return i.add = function (e, r) {
      var n = e.toLowerCase() + ":" + r;
      t(o[n]) || (o[n] = !0);
    }, i.remove = function (e, r) {
      var n = e.toLowerCase() + ":" + r;
      t(o[n]) && delete o[n];
    }, i.contains = function (e) {
      var r = n(e);
      return !(!t(r) || !t(o[r]));
    }, i.clear = function () {
      o = {};
    }, i;
  }), define("Core/Resource", ["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (e, t, r, n, i, o, a, u, s, c, l, f, h, d, p, E, _, m, y, T, R, A, v, S, O, I) {
    "use strict";

    function N(e, t, r, n) {
      var i = e.query;
      if (!u(i) || 0 === i.length) return {};
      var o;

      if (-1 === i.indexOf("=")) {
        var a = {};
        a[i] = void 0, o = a;
      } else o = T(i);

      t._queryParameters = r ? C(o, t._queryParameters, n) : o, e.query = void 0;
    }

    function w(e, t) {
      var r = t._queryParameters,
          n = Object.keys(r);
      1 !== n.length || u(r[n[0]]) ? e.query = y(r) : e.query = n[0];
    }

    function g(e, t) {
      return u(e) ? u(e.clone) ? e.clone() : i(e) : t;
    }

    function M(e) {
      if (e.state === S.ISSUED || e.state === S.ACTIVE) throw new O("The Resource is already being fetched.");
      e.state = S.UNISSUED, e.deferred = void 0;
    }

    function C(e, t, r) {
      if (!r) return o(e, t);
      var n = i(e, !0);

      for (var a in t) {
        if (t.hasOwnProperty(a)) {
          var s = n[a],
              c = t[a];
          u(s) ? (Array.isArray(s) || (s = n[a] = [s]), n[a] = s.concat(c)) : n[a] = Array.isArray(c) ? c.slice() : c;
        }
      }

      return n;
    }

    function x(t) {
      t = a(t, a.EMPTY_OBJECT), "string" == typeof t && (t = {
        url: t
      }), this._url = void 0, this._templateValues = g(t.templateValues, {}), this._queryParameters = g(t.queryParameters, {}), this.headers = g(t.headers, {}), this.request = a(t.request, new R()), this.proxy = t.proxy, this.retryCallback = t.retryCallback, this.retryAttempts = a(t.retryAttempts, 0), this._retryCount = 0;
      var r = new e(t.url);
      N(r, this, !0, !0), r.fragment = void 0, this._url = r.toString();
    }

    function P(e) {
      var r = e.resource,
          n = e.flipY,
          i = e.preferImageBitmap,
          o = r.request;
      o.url = r.url, o.requestFunction = function () {
        var e = r.url,
            o = !1;
        r.isDataUri || r.isBlobUri || (o = r.isCrossOriginUrl);
        var a = t.defer();
        return x._Implementations.createImage(e, o, a, n, i), a.promise;
      };
      var a = v.request(o);
      if (u(a)) return a.otherwise(function (e) {
        return o.state !== S.FAILED ? t.reject(e) : r.retryOnError(e).then(function (a) {
          return a ? (o.state = S.UNISSUED, o.deferred = void 0, P({
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
      var o = e.request;
      o.url = e.url, o.requestFunction = function () {
        var r = t.defer();
        return window[n] = function (e) {
          r.resolve(e);

          try {
            delete window[n];
          } catch (e) {
            window[n] = void 0;
          }
        }, x._Implementations.loadAndExecuteScript(e.url, n, r), r.promise;
      };
      var a = v.request(o);
      if (u(a)) return a.otherwise(function (i) {
        return o.state !== S.FAILED ? t.reject(i) : e.retryOnError(i).then(function (a) {
          return a ? (o.state = S.UNISSUED, o.deferred = void 0, U(e, r, n)) : t.reject(i);
        });
      });
    }

    function D(e, t) {
      var r = decodeURIComponent(t);
      return e ? atob(r) : r;
    }

    function F(e, t) {
      for (var r = D(e, t), n = new ArrayBuffer(r.length), i = new Uint8Array(n), o = 0; o < r.length; o++) {
        i[o] = r.charCodeAt(o);
      }

      return n;
    }

    function L(e, t) {
      t = a(t, "");
      var r = e[1],
          n = !!e[2],
          i = e[3];

      switch (t) {
        case "":
        case "text":
          return D(n, i);

        case "arraybuffer":
          return F(n, i);

        case "blob":
          var o = F(n, i);
          return new Blob([o], {
            type: r
          });

        case "document":
          return new DOMParser().parseFromString(D(n, i), r);

        case "json":
          return JSON.parse(D(n, i));
      }
    }

    function b(e, t, r) {
      var n = new Image();
      n.onload = function () {
        r.resolve(n);
      }, n.onerror = function (e) {
        r.reject(e);
      }, t && (I.contains(e) ? n.crossOrigin = "use-credentials" : n.crossOrigin = ""), n.src = e;
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

    function z(e, t, r, n, i, o, a) {
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
        method: r,
        headers: i
      };
      c.request(f).on("response", function (e) {
        if (e.statusCode < 200 || e.statusCode >= 300) return void o.reject(new A(e.statusCode, e, e.headers));
        var r = [];
        e.on("data", function (e) {
          r.push(e);
        }), e.on("end", function () {
          var n = Buffer.concat(r);
          "gzip" === e.headers["content-encoding"] ? l.gunzip(n, function (e, r) {
            e ? o.reject(new O("Error decompressing response.")) : o.resolve(B(r, t));
          }) : o.resolve(B(n, t));
        });
      }).on("error", function (e) {
        o.reject(new A());
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

    x.createIfNeeded = function (e) {
      return e instanceof x ? e.getDerivedResource({
        request: e.request
      }) : "string" != typeof e ? e : new x({
        url: e
      });
    };

    var G;
    x.supportsImageBitmapOptions = function () {
      if (u(G)) return G;
      if ("function" != typeof createImageBitmap) return G = t.resolve(!1);
      return G = x.fetchBlob({
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
    }, s(x, {
      isBlobSupported: {
        get: function get() {
          return q;
        }
      }
    }), s(x.prototype, {
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
          N(r, this, !1), r.fragment = void 0, this._url = r.toString();
        }
      },
      extension: {
        get: function get() {
          return d(this._url);
        }
      },
      isDataUri: {
        get: function get() {
          return _(this._url);
        }
      },
      isBlobUri: {
        get: function get() {
          return p(this._url);
        }
      },
      isCrossOriginUrl: {
        get: function get() {
          return E(this._url);
        }
      },
      hasHeaders: {
        get: function get() {
          return Object.keys(this.headers).length > 0;
        }
      }
    }), x.prototype.getUrlComponent = function (t, r) {
      if (this.isDataUri) return this._url;
      var n = new e(this._url);
      t && w(n, this);
      var i = n.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
          o = this._templateValues;
      return i = i.replace(/{(.*?)}/g, function (e, t) {
        var r = o[t];
        return u(r) ? encodeURIComponent(r) : e;
      }), r && u(this.proxy) && (i = this.proxy.getURL(i)), i;
    }, x.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t ? C(this._queryParameters, e, !1) : C(e, this._queryParameters, !1);
    }, x.prototype.appendQueryParameters = function (e) {
      this._queryParameters = C(e, this._queryParameters, !0);
    }, x.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t ? o(this._templateValues, e) : o(e, this._templateValues);
    }, x.prototype.getDerivedResource = function (t) {
      var r = this.clone();

      if (r._retryCount = 0, u(t.url)) {
        var n = new e(t.url);
        N(n, r, !0, a(t.preserveQueryParameters, !1)), n.fragment = void 0, r._url = n.resolve(new e(f(this._url))).toString();
      }

      return u(t.queryParameters) && (r._queryParameters = o(t.queryParameters, r._queryParameters)), u(t.templateValues) && (r._templateValues = o(t.templateValues, r.templateValues)), u(t.headers) && (r.headers = o(t.headers, r.headers)), u(t.proxy) && (r.proxy = t.proxy), u(t.request) && (r.request = t.request), u(t.retryCallback) && (r.retryCallback = t.retryCallback), u(t.retryAttempts) && (r.retryAttempts = t.retryAttempts), r;
    }, x.prototype.retryOnError = function (e) {
      var r = this.retryCallback;
      if ("function" != typeof r || this._retryCount >= this.retryAttempts) return t(!1);
      var n = this;
      return t(r(this, e)).then(function (e) {
        return ++n._retryCount, e;
      });
    }, x.prototype.clone = function (e) {
      return u(e) || (e = new x({
        url: this._url
      })), e._url = this._url, e._queryParameters = i(this._queryParameters), e._templateValues = i(this._templateValues), e.headers = i(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
    }, x.prototype.getBaseUri = function (e) {
      return h(this.getUrlComponent(e), e);
    }, x.prototype.appendForwardSlash = function () {
      this._url = r(this._url);
    }, x.prototype.fetchArrayBuffer = function () {
      return this.fetch({
        responseType: "arraybuffer"
      });
    }, x.fetchArrayBuffer = function (e) {
      return new x(e).fetchArrayBuffer();
    }, x.prototype.fetchBlob = function () {
      return this.fetch({
        responseType: "blob"
      });
    }, x.fetchBlob = function (e) {
      return new x(e).fetchBlob();
    }, x.prototype.fetchImage = function (e) {
      e = a(e, a.EMPTY_OBJECT);
      var r = a(e.preferImageBitmap, !1),
          n = a(e.preferBlob, !1),
          i = a(e.flipY, !1);
      if (M(this.request), !q || this.isDataUri || this.isBlobUri || !this.hasHeaders && !n) return P({
        resource: this,
        flipY: i,
        preferImageBitmap: r
      });
      var o = this.fetchBlob();

      if (u(o)) {
        var s, c, l, f;
        return x.supportsImageBitmapOptions().then(function (e) {
          return s = e, c = s && r, o;
        }).then(function (e) {
          if (u(e)) {
            if (f = e, c) return x.createImageBitmapFromBlob(e, {
              flipY: i,
              premultiplyAlpha: !1
            });
            var t = window.URL.createObjectURL(e);
            return l = new x({
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
    }, x.fetchImage = function (e) {
      return new x(e).fetchImage({
        flipY: e.flipY,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap
      });
    }, x.prototype.fetchText = function () {
      return this.fetch({
        responseType: "text"
      });
    }, x.fetchText = function (e) {
      return new x(e).fetchText();
    }, x.prototype.fetchJson = function () {
      var e = this.fetch({
        responseType: "text",
        headers: {
          Accept: "application/json,*/*;q=0.01"
        }
      });
      if (u(e)) return e.then(function (e) {
        if (u(e)) return JSON.parse(e);
      });
    }, x.fetchJson = function (e) {
      return new x(e).fetchJson();
    }, x.prototype.fetchXML = function () {
      return this.fetch({
        responseType: "document",
        overrideMimeType: "text/xml"
      });
    }, x.fetchXML = function (e) {
      return new x(e).fetchXML();
    }, x.prototype.fetchJsonp = function (e) {
      e = a(e, "callback"), M(this.request);
      var t;

      do {
        t = "loadJsonp" + Math.random().toString().substring(2, 8);
      } while (u(window[t]));

      return U(this, e, t);
    }, x.fetchJsonp = function (e) {
      return new x(e).fetchJsonp(e.callbackParameterName);
    }, x.prototype._makeRequest = function (e) {
      var r = this;
      M(r.request);
      var n = r.request;
      n.url = r.url, n.requestFunction = function () {
        var i = e.responseType,
            a = o(e.headers, r.headers),
            s = e.overrideMimeType,
            c = e.method,
            l = e.data,
            f = t.defer(),
            h = x._Implementations.loadWithXhr(r.url, i, c, l, a, f, s);

        return u(h) && u(h.abort) && (n.cancelFunction = function () {
          h.abort();
        }), f.promise;
      };
      var i = v.request(n);
      if (u(i)) return i.then(function (e) {
        return e;
      }).otherwise(function (i) {
        return n.state !== S.FAILED ? t.reject(i) : r.retryOnError(i).then(function (o) {
          return o ? (n.state = S.UNISSUED, n.deferred = void 0, r.fetch(e)) : t.reject(i);
        });
      });
    };
    var V = /^data:(.*?)(;base64)?,(.*)$/;
    x.prototype.fetch = function (e) {
      return e = g(e, {}), e.method = "GET", this._makeRequest(e);
    }, x.fetch = function (e) {
      return new x(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype["delete"] = function (e) {
      return e = g(e, {}), e.method = "DELETE", this._makeRequest(e);
    }, x["delete"] = function (e) {
      return new x(e)["delete"]({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data
      });
    }, x.prototype.head = function (e) {
      return e = g(e, {}), e.method = "HEAD", this._makeRequest(e);
    }, x.head = function (e) {
      return new x(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.options = function (e) {
      return e = g(e, {}), e.method = "OPTIONS", this._makeRequest(e);
    }, x.options = function (e) {
      return new x(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.post = function (e, t) {
      return n.defined("data", e), t = g(t, {}), t.method = "POST", t.data = e, this._makeRequest(t);
    }, x.post = function (e) {
      return new x(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.put = function (e, t) {
      return n.defined("data", e), t = g(t, {}), t.method = "PUT", t.data = e, this._makeRequest(t);
    }, x.put = function (e) {
      return new x(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.patch = function (e, t) {
      return n.defined("data", e), t = g(t, {}), t.method = "PATCH", t.data = e, this._makeRequest(t);
    }, x.patch = function (e) {
      return new x(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x._Implementations = {}, x._Implementations.createImage = function (e, t, r, n, i) {
      x.supportsImageBitmapOptions().then(function (n) {
        return n && i ? x.fetchBlob({
          url: e
        }) : void b(e, t, r);
      }).then(function (e) {
        if (u(e)) return x.createImageBitmapFromBlob(e, {
          flipY: n,
          premultiplyAlpha: !1
        });
      }).then(function (e) {
        u(e) && r.resolve(e);
      }).otherwise(r.reject);
    }, x.createImageBitmapFromBlob = function (e, t) {
      return n.defined("options", t), n.typeOf.bool("options.flipY", t.flipY), n.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha), createImageBitmap(e, {
        imageOrientation: t.flipY ? "flipY" : "none",
        premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"
      });
    };
    var X = "undefined" == typeof XMLHttpRequest;
    return x._Implementations.loadWithXhr = function (e, t, r, n, i, o, a) {
      var s = V.exec(e);
      if (null !== s) return void o.resolve(L(s, t));
      if (X) return void z(e, t, r, n, i, o, a);
      var c = new XMLHttpRequest();
      if (I.contains(e) && (c.withCredentials = !0), c.open(r, e, !0), u(a) && u(c.overrideMimeType) && c.overrideMimeType(a), u(i)) for (var l in i) {
        i.hasOwnProperty(l) && c.setRequestHeader(l, i[l]);
      }
      u(t) && (c.responseType = t);
      var f = !1;
      return "string" == typeof e && (f = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), c.onload = function () {
        if ((c.status < 200 || c.status >= 300) && (!f || 0 !== c.status)) return void o.reject(new A(c.status, c.response, c.getAllResponseHeaders()));
        var e = c.response,
            n = c.responseType;

        if ("HEAD" === r || "OPTIONS" === r) {
          var i = c.getAllResponseHeaders(),
              a = i.trim().split(/[\r\n]+/),
              s = {};
          return a.forEach(function (e) {
            var t = e.split(": "),
                r = t.shift();
            s[r] = t.join(": ");
          }), void o.resolve(s);
        }

        if (u(e) && "string" == typeof e) try {
          if (-1 === JSON.parse(e).code) return void o.reject(new A(c.status, c.response, c.getAllResponseHeaders()));
        } catch (e) {
          o.reject(e);
        }
        if (204 === c.status) o.resolve();else if (!u(e) || u(t) && n !== t) {
          if ("json" === t && "string" == typeof e) try {
            o.resolve(JSON.parse(e));
          } catch (e) {
            o.reject(e);
          } else ("" === n || "document" === n) && u(c.responseXML) && c.responseXML.hasChildNodes() ? o.resolve(c.responseXML) : "" !== n && "text" !== n || !u(c.responseText) ? o.reject(new O("Invalid XMLHttpRequest response type.")) : o.resolve(c.responseText);
        } else o.resolve(e);
      }, c.onerror = function (e) {
        o.reject(new A());
      }, c.send(n), c;
    }, x._Implementations.loadAndExecuteScript = function (e, t, r) {
      return m(e, t).otherwise(r.reject);
    }, x._DefaultImplementations = {}, x._DefaultImplementations.createImage = x._Implementations.createImage, x._DefaultImplementations.loadWithXhr = x._Implementations.loadWithXhr, x._DefaultImplementations.loadAndExecuteScript = x._Implementations.loadAndExecuteScript, x.DEFAULT = l(new x({
      url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
    })), x;
  }), define("Core/EarthOrientationParameters", ["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (e, t, r, n, i, o, a, u, s, c, l, f) {
    "use strict";

    function h(t) {
      if (t = r(t, r.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = r(t.addNewLeapSeconds, !0), n(t.data)) p(this, t.data);else if (n(t.url)) {
        var i = s.createIfNeeded(t.url),
            o = this;
        this._downloadPromise = e(i.fetchJson(), function (e) {
          p(o, e);
        }, function () {
          o._dataError = "An error occurred while retrieving the EOP data from the URL " + i.url + ".";
        });
      } else p(this, {
        columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
        samples: []
      });
    }

    function d(e, t) {
      return a.compare(e.julianDate, t);
    }

    function p(e, r) {
      if (!n(r.columnNames)) return void (e._dataError = "Error in loaded EOP data: The columnNames property is required.");
      if (!n(r.samples)) return void (e._dataError = "Error in loaded EOP data: The samples property is required.");
      var i = r.columnNames.indexOf("modifiedJulianDateUtc"),
          o = r.columnNames.indexOf("xPoleWanderRadians"),
          s = r.columnNames.indexOf("yPoleWanderRadians"),
          c = r.columnNames.indexOf("ut1MinusUtcSeconds"),
          h = r.columnNames.indexOf("xCelestialPoleOffsetRadians"),
          p = r.columnNames.indexOf("yCelestialPoleOffsetRadians"),
          E = r.columnNames.indexOf("taiMinusUtcSeconds");
      if (i < 0 || o < 0 || s < 0 || c < 0 || h < 0 || p < 0 || E < 0) return void (e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");

      var _ = e._samples = r.samples,
          m = e._dates = [];

      e._dateColumn = i, e._xPoleWanderRadiansColumn = o, e._yPoleWanderRadiansColumn = s, e._ut1MinusUtcSecondsColumn = c, e._xCelestialPoleOffsetRadiansColumn = h, e._yCelestialPoleOffsetRadiansColumn = p, e._taiMinusUtcSecondsColumn = E, e._columnCount = r.columnNames.length, e._lastIndex = void 0;

      for (var y, T = e._addNewLeapSeconds, R = 0, A = _.length; R < A; R += e._columnCount) {
        var v = _[R + i],
            S = _[R + E],
            O = v + l.MODIFIED_JULIAN_DATE_DIFFERENCE,
            I = new a(O, S, f.TAI);

        if (m.push(I), T) {
          if (S !== y && n(y)) {
            var N = a.leapSeconds,
                w = t(N, I, d);

            if (w < 0) {
              var g = new u(I, S);
              N.splice(~w, 0, g);
            }
          }

          y = S;
        }
      }
    }

    function E(e, t, r, n, i) {
      var o = r * n;
      i.xPoleWander = t[o + e._xPoleWanderRadiansColumn], i.yPoleWander = t[o + e._yPoleWanderRadiansColumn], i.xPoleOffset = t[o + e._xCelestialPoleOffsetRadiansColumn], i.yPoleOffset = t[o + e._yCelestialPoleOffsetRadiansColumn], i.ut1MinusUtc = t[o + e._ut1MinusUtcSecondsColumn];
    }

    function _(e, t, r) {
      return t + e * (r - t);
    }

    function m(e, t, r, n, i, o, u) {
      var s = e._columnCount;
      if (o > t.length - 1) return u.xPoleWander = 0, u.yPoleWander = 0, u.xPoleOffset = 0, u.yPoleOffset = 0, u.ut1MinusUtc = 0, u;
      var c = t[i],
          l = t[o];
      if (c.equals(l) || n.equals(c)) return E(e, r, i, s, u), u;
      if (n.equals(l)) return E(e, r, o, s, u), u;
      var f = a.secondsDifference(n, c) / a.secondsDifference(l, c),
          h = i * s,
          d = o * s,
          p = r[h + e._ut1MinusUtcSecondsColumn],
          m = r[d + e._ut1MinusUtcSecondsColumn],
          y = m - p;

      if (y > .5 || y < -.5) {
        var T = r[h + e._taiMinusUtcSecondsColumn],
            R = r[d + e._taiMinusUtcSecondsColumn];
        T !== R && (l.equals(n) ? p = m : m -= R - T);
      }

      return u.xPoleWander = _(f, r[h + e._xPoleWanderRadiansColumn], r[d + e._xPoleWanderRadiansColumn]), u.yPoleWander = _(f, r[h + e._yPoleWanderRadiansColumn], r[d + e._yPoleWanderRadiansColumn]), u.xPoleOffset = _(f, r[h + e._xCelestialPoleOffsetRadiansColumn], r[d + e._xCelestialPoleOffsetRadiansColumn]), u.yPoleOffset = _(f, r[h + e._yCelestialPoleOffsetRadiansColumn], r[d + e._yCelestialPoleOffsetRadiansColumn]), u.ut1MinusUtc = _(f, p, m), u;
    }

    return h.NONE = o({
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
        var o = this._dates,
            u = this._lastIndex,
            s = 0,
            l = 0;

        if (n(u)) {
          var f = o[u],
              h = o[u + 1],
              d = a.lessThanOrEquals(f, e),
              p = !n(h),
              E = p || a.greaterThanOrEquals(h, e);
          if (d && E) return s = u, !p && h.equals(e) && ++s, l = s + 1, m(this, o, this._samples, e, s, l, r), r;
        }

        var _ = t(o, e, a.compare, this._dateColumn);

        return _ >= 0 ? (_ < o.length - 1 && o[_ + 1].equals(e) && ++_, s = _, l = _) : (l = ~_, (s = l - 1) < 0 && (s = 0)), this._lastIndex = s, m(this, o, this._samples, e, s, l, r), r;
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
      var o = 2 * (e.w * e.y - e.z * e.x),
          a = 1 - 2 * (e.x * e.x + e.y * e.y),
          u = 2 * (e.w * e.x + e.y * e.z),
          s = 1 - 2 * (e.y * e.y + e.z * e.z),
          c = 2 * (e.w * e.z + e.x * e.y);
      return r.heading = -Math.atan2(c, s), r.roll = Math.atan2(u, a), r.pitch = -n.asinClamped(o), r;
    }, i.fromDegrees = function (e, r, o, a) {
      return t(a) || (a = new i()), a.heading = e * n.RADIANS_PER_DEGREE, a.pitch = r * n.RADIANS_PER_DEGREE, a.roll = o * n.RADIANS_PER_DEGREE, a;
    }, i.clone = function (e, r) {
      if (t(e)) return t(r) ? (r.heading = e.heading, r.pitch = e.pitch, r.roll = e.roll, r) : new i(e.heading, e.pitch, e.roll);
    }, i.equals = function (e, r) {
      return e === r || t(e) && t(r) && e.heading === r.heading && e.pitch === r.pitch && e.roll === r.roll;
    }, i.equalsEpsilon = function (e, r, i, o) {
      return e === r || t(e) && t(r) && n.equalsEpsilon(e.heading, r.heading, i, o) && n.equalsEpsilon(e.pitch, r.pitch, i, o) && n.equalsEpsilon(e.roll, r.roll, i, o);
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

    function o() {
      for (var e = document.getElementsByTagName("script"), t = 0, r = e.length; t < r; ++t) {
        var n = e[t].getAttribute("src"),
            i = p.exec(n);
        if (null !== i) return i[1];
      }
    }

    function a(t) {
      return "undefined" == typeof document ? t : (e(f) || (f = document.createElement("a")), f.href = t, f.href = f.href, f.href);
    }

    function u() {
      if (e(h)) return h;
      var t;
      return t = "undefined" != typeof PGEARTH_BASE_URL ? PGEARTH_BASE_URL : e(define.amd) && !define.amd.toUrlUndefined && e(i.toUrl) ? r("..", l("Core/buildModuleUrl.js")) : o(), h = new n({
        url: a(t)
      }), h.appendForwardSlash(), h;
    }

    function s(e) {
      return a(i.toUrl("../" + e));
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
      h = n.DEFAULT.getDerivedResource({
        url: e
      });
    }, l.getPGEarthBaseUrl = u, l;
  }), define("Core/Iau2006XysSample", [], function () {
    "use strict";

    function e(e, t, r) {
      this.x = e, this.y = t, this.s = r;
    }

    return e;
  }), define("Core/Iau2006XysData", ["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./Iau2006XysSample", "./JulianDate", "./Resource", "./TimeStandard"], function (e, t, r, n, i, o, a, u) {
    "use strict";

    function s(e) {
      e = r(e, r.EMPTY_OBJECT), this._xysFileUrlTemplate = a.createIfNeeded(e.xysFileUrlTemplate), this._interpolationOrder = r(e.interpolationOrder, 9), this._sampleZeroJulianEphemerisDate = r(e.sampleZeroJulianEphemerisDate, 2442396.5), this._sampleZeroDateTT = new o(this._sampleZeroJulianEphemerisDate, 0, u.TAI), this._stepSizeDays = r(e.stepSizeDays, 1), this._samplesPerXysFile = r(e.samplesPerXysFile, 1e3), this._totalSamples = r(e.totalSamples, 27426), this._samples = new Array(3 * this._totalSamples), this._chunkDownloadsInProgress = [];

      for (var t = this._interpolationOrder, n = this._denominators = new Array(t + 1), i = this._xTable = new Array(t + 1), s = Math.pow(this._stepSizeDays, t), c = 0; c <= t; ++c) {
        n[c] = s, i[c] = c * this._stepSizeDays;

        for (var l = 0; l <= t; ++l) {
          l !== c && (n[c] *= c - l);
        }

        n[c] = 1 / n[c];
      }

      this._work = new Array(t + 1), this._coef = new Array(t + 1);
    }

    function c(e, t, r) {
      var n = f;
      return n.dayNumber = t, n.secondsOfDay = r, o.daysDifference(n, e._sampleZeroDateTT);
    }

    function l(r, i) {
      if (r._chunkDownloadsInProgress[i]) return r._chunkDownloadsInProgress[i];
      var o = e.defer();
      r._chunkDownloadsInProgress[i] = o;
      var u,
          s = r._xysFileUrlTemplate;
      return u = n(s) ? s.getDerivedResource({
        templateValues: {
          0: i
        }
      }) : new a({
        url: t("Assets/IAU2006_XYS/IAU2006_XYS_" + i + ".json")
      }), e(u.fetchJson(), function (e) {
        r._chunkDownloadsInProgress[i] = !1;

        for (var t = r._samples, n = e.samples, a = i * r._samplesPerXysFile * 3, u = 0, s = n.length; u < s; ++u) {
          t[a + u] = n[u];
        }

        o.resolve();
      }), o.promise;
    }

    var f = new o(0, 0, u.TAI);
    return s.prototype.preload = function (t, r, n, i) {
      var o = c(this, t, r),
          a = c(this, n, i),
          u = o / this._stepSizeDays - this._interpolationOrder / 2 | 0;
      u < 0 && (u = 0);
      var s = a / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;
      s >= this._totalSamples && (s = this._totalSamples - 1);

      for (var f = u / this._samplesPerXysFile | 0, h = s / this._samplesPerXysFile | 0, d = [], p = f; p <= h; ++p) {
        d.push(l(this, p));
      }

      return e.all(d);
    }, s.prototype.computeXysRadians = function (e, t, r) {
      var o = c(this, e, t);

      if (!(o < 0)) {
        var a = o / this._stepSizeDays | 0;

        if (!(a >= this._totalSamples)) {
          var u = this._interpolationOrder,
              s = a - (u / 2 | 0);
          s < 0 && (s = 0);
          var f = s + u;
          f >= this._totalSamples && (f = this._totalSamples - 1, (s = f - u) < 0 && (s = 0));
          var h = !1,
              d = this._samples;

          if (n(d[3 * s]) || (l(this, s / this._samplesPerXysFile | 0), h = !0), n(d[3 * f]) || (l(this, f / this._samplesPerXysFile | 0), h = !0), !h) {
            n(r) ? (r.x = 0, r.y = 0, r.s = 0) : r = new i(0, 0, 0);

            var p,
                E,
                _ = o - s * this._stepSizeDays,
                m = this._work,
                y = this._denominators,
                T = this._coef,
                R = this._xTable;

            for (p = 0; p <= u; ++p) {
              m[p] = _ - R[p];
            }

            for (p = 0; p <= u; ++p) {
              for (T[p] = 1, E = 0; E <= u; ++E) {
                E !== p && (T[p] *= m[E]);
              }

              T[p] *= y[p];
              var A = 3 * (s + p);
              r.x += T[p] * d[A++], r.y += T[p] * d[A++], r.s += T[p] * d[A];
            }

            return r;
          }
        }
      }
    }, s;
  }), define("Core/Transforms", ["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (e, t, r, n, i, o, a, u, s, c, l, f, h, d, p, E, _, m, y, T, R) {
    "use strict";

    var A = {},
        v = {
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
        S = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1]
    },
        O = {},
        I = {
      east: new r(),
      north: new r(),
      up: new r(),
      west: new r(),
      south: new r(),
      down: new r()
    },
        N = new r(),
        w = new r(),
        g = new r();
    A.localFrameToFixedFrameGenerator = function (e, t) {
      if (!v.hasOwnProperty(e) || !v[e].hasOwnProperty(t)) throw new s("firstAxis and secondAxis must be east, north, up, west, south or down.");
      var n,
          i = v[e][t],
          o = e + t;
      return u(O[o]) ? n = O[o] : (n = function n(_n, o, s) {
        if (u(s) || (s = new y()), _.equalsEpsilon(_n.x, 0, _.EPSILON14) && _.equalsEpsilon(_n.y, 0, _.EPSILON14)) {
          var c = _.sign(_n.z);

          r.unpack(S[e], 0, N), "east" !== e && "west" !== e && r.multiplyByScalar(N, c, N), r.unpack(S[t], 0, w), "east" !== t && "west" !== t && r.multiplyByScalar(w, c, w), r.unpack(S[i], 0, g), "east" !== i && "west" !== i && r.multiplyByScalar(g, c, g);
        } else {
          o = a(o, f.WGS84), o.geodeticSurfaceNormal(_n, I.up);
          var l = I.up,
              h = I.east;
          h.x = -_n.y, h.y = _n.x, h.z = 0, r.normalize(h, I.east), r.cross(l, h, I.north), r.multiplyByScalar(I.up, -1, I.down), r.multiplyByScalar(I.east, -1, I.west), r.multiplyByScalar(I.north, -1, I.south), N = I[e], w = I[t], g = I[i];
        }

        return s[0] = N.x, s[1] = N.y, s[2] = N.z, s[3] = 0, s[4] = w.x, s[5] = w.y, s[6] = w.z, s[7] = 0, s[8] = g.x, s[9] = g.y, s[10] = g.z, s[11] = 0, s[12] = _n.x, s[13] = _n.y, s[14] = _n.z, s[15] = 1, s;
      }, O[o] = n), n;
    }, A.eastNorthUpToFixedFrame = A.localFrameToFixedFrameGenerator("east", "north"), A.northEastDownToFixedFrame = A.localFrameToFixedFrameGenerator("north", "east"), A.northUpEastToFixedFrame = A.localFrameToFixedFrameGenerator("north", "up"), A.northWestUpToFixedFrame = A.localFrameToFixedFrameGenerator("north", "west");
    var M = new T(),
        C = new r(1, 1, 1),
        x = new y();

    A.headingPitchRollToFixedFrame = function (e, t, n, i, o) {
      i = a(i, A.eastNorthUpToFixedFrame);
      var u = T.fromHeadingPitchRoll(t, M),
          s = y.fromTranslationQuaternionRotationScale(r.ZERO, u, C, x);
      return o = i(e, n, o), y.multiply(o, s, o);
    };

    var P = new y(),
        U = new m();

    A.headingPitchRollQuaternion = function (e, t, r, n, i) {
      var o = A.headingPitchRollToFixedFrame(e, t, r, n, P),
          a = y.getRotation(o, U);
      return T.fromRotationMatrix(a, i);
    };

    var D = new r(1, 1, 1),
        F = new r(),
        L = new y(),
        b = new y(),
        B = new m(),
        z = new T();

    A.fixedFrameToHeadingPitchRoll = function (e, t, n, i) {
      t = a(t, f.WGS84), n = a(n, A.eastNorthUpToFixedFrame), u(i) || (i = new h());
      var o = y.getTranslation(e, F);
      if (r.equals(o, r.ZERO)) return i.heading = 0, i.pitch = 0, i.roll = 0, i;
      var s = y.inverseTransformation(n(o, t, L), L),
          c = y.setScale(e, D, b);
      c = y.setTranslation(c, r.ZERO, c), s = y.multiply(s, c, s);
      var l = T.fromRotationMatrix(y.getRotation(s, B), z);
      return l = T.normalize(l, l), h.fromQuaternion(l, i);
    };

    var q = _.TWO_PI / 86400,
        G = new E();
    A.computeTemeToPseudoFixedMatrix = function (e, t) {
      G = E.addSeconds(e, -E.computeTaiMinusUtc(e), G);
      var r,
          n = G.dayNumber,
          i = G.secondsOfDay,
          o = n - 2451545;
      r = i >= 43200 ? (o + .5) / R.DAYS_PER_JULIAN_CENTURY : (o - .5) / R.DAYS_PER_JULIAN_CENTURY;
      var a = 24110.54841 + r * (8640184.812866 + r * (.093104 + -62e-7 * r)),
          s = a * q % _.TWO_PI,
          c = 72921158553e-15 + 1.1772758384668e-19 * (n - 2451545.5),
          l = (i + .5 * R.SECONDS_PER_DAY) % R.SECONDS_PER_DAY,
          f = s + c * l,
          h = Math.cos(f),
          d = Math.sin(f);
      return u(t) ? (t[0] = h, t[1] = -d, t[2] = 0, t[3] = d, t[4] = h, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new m(h, d, 0, -d, h, 0, 0, 0, 1);
    }, A.iau2006XysData = new d(), A.earthOrientationParameters = c.NONE;
    A.preloadIcrfFixed = function (t) {
      var r = t.start.dayNumber,
          n = t.start.secondsOfDay + 32.184,
          i = t.stop.dayNumber,
          o = t.stop.secondsOfDay + 32.184,
          a = A.iau2006XysData.preload(r, n, i, o),
          u = A.earthOrientationParameters.getPromiseToLoad();
      return e.all([a, u]);
    }, A.computeIcrfToFixedMatrix = function (e, t) {
      u(t) || (t = new m());
      var r = A.computeFixedToIcrfMatrix(e, t);
      if (u(r)) return m.transpose(r, t);
    };
    var V = new p(0, 0, 0),
        X = new l(0, 0, 0, 0, 0, 0),
        W = new m(),
        H = new m();

    A.computeFixedToIcrfMatrix = function (e, t) {
      u(t) || (t = new m());
      var r = A.earthOrientationParameters.compute(e, X);

      if (u(r)) {
        var n = e.dayNumber,
            i = e.secondsOfDay + 32.184,
            o = A.iau2006XysData.computeXysRadians(n, i, V);

        if (u(o)) {
          var a = o.x + r.xPoleOffset,
              s = o.y + r.yPoleOffset,
              c = 1 / (1 + Math.sqrt(1 - a * a - s * s)),
              l = W;
          l[0] = 1 - c * a * a, l[3] = -c * a * s, l[6] = a, l[1] = -c * a * s, l[4] = 1 - c * s * s, l[7] = s, l[2] = -a, l[5] = -s, l[8] = 1 - c * (a * a + s * s);
          var f = m.fromRotationZ(-o.s, H),
              h = m.multiply(l, f, W),
              d = e.dayNumber,
              p = e.secondsOfDay - E.computeTaiMinusUtc(e) + r.ut1MinusUtc,
              y = d - 2451545,
              T = p / R.SECONDS_PER_DAY,
              v = .779057273264 + T + .00273781191135448 * (y + T);
          v = v % 1 * _.TWO_PI;
          var S = m.fromRotationZ(v, H),
              O = m.multiply(h, S, W),
              I = Math.cos(r.xPoleWander),
              N = Math.cos(r.yPoleWander),
              w = Math.sin(r.xPoleWander),
              g = Math.sin(r.yPoleWander),
              M = n - 2451545 + i / R.SECONDS_PER_DAY;
          M /= 36525;
          var C = -47e-6 * M * _.RADIANS_PER_DEGREE / 3600,
              x = Math.cos(C),
              P = Math.sin(C),
              U = H;
          return U[0] = I * x, U[1] = I * P, U[2] = w, U[3] = -N * P + g * w * x, U[4] = N * x + g * w * P, U[5] = -g * I, U[6] = -g * P - N * w * x, U[7] = g * x - N * w * P, U[8] = N * I, m.multiply(O, U, t);
        }
      }
    };

    var k = new n();
    A.pointToWindowCoordinates = function (e, t, r, n) {
      return n = A.pointToGLWindowCoordinates(e, t, r, n), n.y = 2 * t[5] - n.y, n;
    }, A.pointToGLWindowCoordinates = function (e, r, i, o) {
      u(o) || (o = new t());
      var a = k;
      return y.multiplyByVector(e, n.fromElements(i.x, i.y, i.z, 1, a), a), n.multiplyByScalar(a, 1 / a.w, a), y.multiplyByVector(r, a, a), t.fromCartesian4(a, o);
    };
    var Y = new r(),
        j = new r(),
        K = new r();

    A.rotationMatrixFromPositionVelocity = function (e, t, n, i) {
      var o = a(n, f.WGS84).geodeticSurfaceNormal(e, Y),
          s = r.cross(t, o, j);
      r.equalsEpsilon(s, r.ZERO, _.EPSILON6) && (s = r.clone(r.UNIT_X, s));
      var c = r.cross(s, t, K);
      return r.normalize(c, c), r.cross(t, c, s), r.negate(s, s), r.normalize(s, s), u(i) || (i = new m()), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = s.x, i[4] = s.y, i[5] = s.z, i[6] = c.x, i[7] = c.y, i[8] = c.z, i;
    };

    var Z = new y(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
        J = new i(),
        Q = new r(),
        $ = new r(),
        ee = new m(),
        te = new y(),
        re = new y();
    return A.basisTo2D = function (e, t, n) {
      var i = y.getTranslation(t, $),
          o = e.ellipsoid,
          a = o.cartesianToCartographic(i, J),
          u = e.project(a, Q);
      r.fromElements(u.z, u.x, u.y, u);
      var s = A.eastNorthUpToFixedFrame(i, o, te),
          c = y.inverseTransformation(s, re),
          l = y.getRotation(t, ee),
          f = y.multiplyByMatrix3(c, l, n);
      return y.multiply(Z, f, n), y.setTranslation(n, u, n), n;
    }, A.wgs84To2DModelMatrix = function (e, t, n) {
      var i = e.ellipsoid,
          o = A.eastNorthUpToFixedFrame(t, i, te),
          a = y.inverseTransformation(o, re),
          u = i.cartesianToCartographic(t, J),
          s = e.project(u, Q);
      r.fromElements(s.z, s.x, s.y, s);
      var c = y.fromTranslation(s, te);
      return y.multiply(Z, a, n), y.multiply(c, n, n), n;
    }, A;
  }), define("Core/Geometry", ["./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryOffsetAttribute", "./GeometryType", "./Matrix2", "./Matrix3", "./Matrix4", "./PrimitiveType", "./Quaternion", "./Rectangle", "./Transforms"], function (e, t, r, n, i, o, a, u, s, c, l, f, h, d, p, E) {
    "use strict";

    function _(e) {
      e = i(e, i.EMPTY_OBJECT), this.attributes = e.attributes, this.indices = e.indices, this.primitiveType = i(e.primitiveType, h.TRIANGLES), this.boundingSphere = e.boundingSphere, this.geometryType = i(e.geometryType, s.NONE), this.boundingSphereCV = e.boundingSphereCV, this.offsetAttribute = e.offsetAttribute;
    }

    _.computeNumberOfVertices = function (e) {
      var t = -1;

      for (var r in e.attributes) {
        if (e.attributes.hasOwnProperty(r) && o(e.attributes[r]) && o(e.attributes[r].values)) {
          var n = e.attributes[r],
              i = n.values.length / n.componentsPerAttribute;
          t = i;
        }
      }

      return t;
    };

    var m = new r(),
        y = new t(),
        T = new f(),
        R = [new r(), new r(), new r()],
        A = [new e(), new e(), new e()],
        v = [new e(), new e(), new e()],
        S = new t(),
        O = new d(),
        I = new f(),
        N = new c();
    return _._textureCoordinateRotationPoints = function (n, i, o, a) {
      var u,
          s = p.center(a, m),
          h = r.toCartesian(s, o, y),
          _ = E.eastNorthUpToFixedFrame(h, o, T),
          w = f.inverse(_, T),
          g = A,
          M = R;

      M[0].longitude = a.west, M[0].latitude = a.south, M[1].longitude = a.west, M[1].latitude = a.north, M[2].longitude = a.east, M[2].latitude = a.south;
      var C = S;

      for (u = 0; u < 3; u++) {
        r.toCartesian(M[u], o, C), C = f.multiplyByPointAsVector(w, C, C), g[u].x = C.x, g[u].y = C.y;
      }

      var x = d.fromAxisAngle(t.UNIT_Z, -i, O),
          P = l.fromQuaternion(x, I),
          U = n.length,
          D = Number.POSITIVE_INFINITY,
          F = Number.POSITIVE_INFINITY,
          L = Number.NEGATIVE_INFINITY,
          b = Number.NEGATIVE_INFINITY;

      for (u = 0; u < U; u++) {
        C = f.multiplyByPointAsVector(w, n[u], C), C = l.multiplyByVector(P, C, C), D = Math.min(D, C.x), F = Math.min(F, C.y), L = Math.max(L, C.x), b = Math.max(b, C.y);
      }

      var B = c.fromRotation(i, N),
          z = v;
      z[0].x = D, z[0].y = F, z[1].x = D, z[1].y = b, z[2].x = L, z[2].y = F;
      var q = g[0],
          G = g[2].x - q.x,
          V = g[1].y - q.y;

      for (u = 0; u < 3; u++) {
        var X = z[u];
        c.multiplyByVector(B, X, X), X.x = (X.x - q.x) / G, X.y = (X.y - q.y) / V;
      }

      var W = z[0],
          H = z[1],
          k = z[2],
          Y = new Array(6);
      return e.pack(W, Y), e.pack(H, Y, 2), e.pack(k, Y, 4), Y;
    }, _;
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
  }), define("Core/Plane", ["./Cartesian3", "./Check", "./defined", "./DeveloperError", "./freezeObject", "./Math", "./Matrix4"], function (e, t, r, n, i, o, a) {
    "use strict";

    function u(t, r) {
      this.normal = e.clone(t), this.distance = r;
    }

    u.fromPointNormal = function (t, n, i) {
      var o = -e.dot(n, t);
      return r(i) ? (e.clone(n, i.normal), i.distance = o, i) : new u(n, o);
    };

    var s = new e();
    u.fromCartesian4 = function (t, n) {
      var i = e.fromCartesian4(t, s),
          o = t.w;
      return r(n) ? (e.clone(i, n.normal), n.distance = o, n) : new u(i, o);
    }, u.getPointDistance = function (t, r) {
      return e.dot(t.normal, r) + t.distance;
    };
    var c = new e();

    u.projectPointOntoPlane = function (t, n, i) {
      r(i) || (i = new e());
      var o = u.getPointDistance(t, n),
          a = e.multiplyByScalar(t.normal, o, c);
      return e.subtract(n, a, i);
    };

    var l = new e();
    return u.transform = function (t, r, n) {
      return a.multiplyByPointAsVector(r, t.normal, s), e.normalize(s, s), e.multiplyByScalar(t.normal, -t.distance, l), a.multiplyByPoint(r, l, l), u.fromPointNormal(l, s, n);
    }, u.clone = function (t, n) {
      return r(n) ? (e.clone(t.normal, n.normal), n.distance = t.distance, n) : new u(t.normal, t.distance);
    }, u.equals = function (t, r) {
      return t.distance === r.distance && e.equals(t.normal, r.normal);
    }, u.ORIGIN_XY_PLANE = i(new u(e.UNIT_Z, 0)), u.ORIGIN_YZ_PLANE = i(new u(e.UNIT_X, 0)), u.ORIGIN_ZX_PLANE = i(new u(e.UNIT_Y, 0)), u;
  }), define("Core/CullingVolume", ["./Cartesian3", "./Cartesian4", "./defaultValue", "./defined", "./DeveloperError", "./Intersect", "./Plane"], function (e, t, r, n, i, o, a) {
    "use strict";

    function u(e) {
      this.planes = r(e, []);
    }

    var s = [new e(), new e(), new e()];
    e.clone(e.UNIT_X, s[0]), e.clone(e.UNIT_Y, s[1]), e.clone(e.UNIT_Z, s[2]);
    var c = new e(),
        l = new e(),
        f = new a(new e(1, 0, 0), 0);
    return u.fromBoundingSphere = function (r, i) {
      n(i) || (i = new u());
      var o = s.length,
          a = i.planes;
      a.length = 2 * o;

      for (var f = r.center, h = r.radius, d = 0, p = 0; p < o; ++p) {
        var E = s[p],
            _ = a[d],
            m = a[d + 1];
        n(_) || (_ = a[d] = new t()), n(m) || (m = a[d + 1] = new t()), e.multiplyByScalar(E, -h, c), e.add(f, c, c), _.x = E.x, _.y = E.y, _.z = E.z, _.w = -e.dot(E, c), e.multiplyByScalar(E, h, c), e.add(f, c, c), m.x = -E.x, m.y = -E.y, m.z = -E.z, m.w = -e.dot(e.negate(E, l), c), d += 2;
      }

      return i;
    }, u.prototype.computeVisibility = function (e) {
      for (var t = this.planes, r = !1, n = 0, i = t.length; n < i; ++n) {
        var u = e.intersectPlane(a.fromCartesian4(t[n], f));
        if (u === o.OUTSIDE) return o.OUTSIDE;
        u === o.INTERSECTING && (r = !0);
      }

      return r ? o.INTERSECTING : o.INSIDE;
    }, u.prototype.computeVisibilityWithPlaneMask = function (e, t) {
      if (t === u.MASK_OUTSIDE || t === u.MASK_INSIDE) return t;

      for (var r = u.MASK_INSIDE, n = this.planes, i = 0, s = n.length; i < s; ++i) {
        var c = i < 31 ? 1 << i : 0;

        if (!(i < 31 && 0 == (t & c))) {
          var l = e.intersectPlane(a.fromCartesian4(n[i], f));
          if (l === o.OUTSIDE) return u.MASK_OUTSIDE;
          l === o.INTERSECTING && (r |= c);
        }
      }

      return r;
    }, u.MASK_OUTSIDE = 4294967295, u.MASK_INSIDE = 0, u.MASK_INDETERMINATE = 2147483647, u;
  }), define("Core/OrthographicOffCenterFrustum", ["./Cartesian3", "./Cartesian4", "./CullingVolume", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./Matrix4"], function (e, t, r, n, i, o, a, u, s) {
    "use strict";

    function c(e) {
      e = n(e, n.EMPTY_OBJECT), this.left = e.left, this._left = void 0, this.right = e.right, this._right = void 0, this.top = e.top, this._top = void 0, this.bottom = e.bottom, this._bottom = void 0, this.near = n(e.near, 1), this._near = this.near, this.far = n(e.far, 5e8), this._far = this.far, this._cullingVolume = new r(), this._orthographicMatrix = new s();
    }

    function l(e) {
      e.top === e._top && e.bottom === e._bottom && e.left === e._left && e.right === e._right && e.near === e._near && e.far === e._far || (e._left = e.left, e._right = e.right, e._top = e.top, e._bottom = e.bottom, e._near = e.near, e._far = e.far, e._orthographicMatrix = s.computeOrthographicOffCenter(e.left, e.right, e.bottom, e.top, e.near, e.far, e._orthographicMatrix));
    }

    o(c.prototype, {
      projectionMatrix: {
        get: function get() {
          return l(this), this._orthographicMatrix;
        }
      }
    });
    var f = new e(),
        h = new e(),
        d = new e(),
        p = new e();
    return c.prototype.computeCullingVolume = function (r, n, o) {
      var a = this._cullingVolume.planes,
          u = this.top,
          s = this.bottom,
          c = this.right,
          l = this.left,
          E = this.near,
          _ = this.far,
          m = e.cross(n, o, f);
      e.normalize(m, m);
      var y = h;
      e.multiplyByScalar(n, E, y), e.add(r, y, y);
      var T = d;
      e.multiplyByScalar(m, l, T), e.add(y, T, T);
      var R = a[0];
      return i(R) || (R = a[0] = new t()), R.x = m.x, R.y = m.y, R.z = m.z, R.w = -e.dot(m, T), e.multiplyByScalar(m, c, T), e.add(y, T, T), R = a[1], i(R) || (R = a[1] = new t()), R.x = -m.x, R.y = -m.y, R.z = -m.z, R.w = -e.dot(e.negate(m, p), T), e.multiplyByScalar(o, s, T), e.add(y, T, T), R = a[2], i(R) || (R = a[2] = new t()), R.x = o.x, R.y = o.y, R.z = o.z, R.w = -e.dot(o, T), e.multiplyByScalar(o, u, T), e.add(y, T, T), R = a[3], i(R) || (R = a[3] = new t()), R.x = -o.x, R.y = -o.y, R.z = -o.z, R.w = -e.dot(e.negate(o, p), T), R = a[4], i(R) || (R = a[4] = new t()), R.x = n.x, R.y = n.y, R.z = n.z, R.w = -e.dot(n, y), e.multiplyByScalar(n, _, T), e.add(r, T, T), R = a[5], i(R) || (R = a[5] = new t()), R.x = -n.x, R.y = -n.y, R.z = -n.z, R.w = -e.dot(e.negate(n, p), T), this._cullingVolume;
    }, c.prototype.getPixelDimensions = function (e, t, r, n) {
      l(this);
      var i = this.right - this.left,
          o = this.top - this.bottom,
          a = i / e,
          u = o / t;
      return n.x = a, n.y = u, n;
    }, c.prototype.clone = function (e) {
      return i(e) || (e = new c()), e.left = this.left, e.right = this.right, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e._left = void 0, e._right = void 0, e._top = void 0, e._bottom = void 0, e._near = void 0, e._far = void 0, e;
    }, c.prototype.equals = function (e) {
      return i(e) && e instanceof c && this.right === e.right && this.left === e.left && this.top === e.top && this.bottom === e.bottom && this.near === e.near && this.far === e.far;
    }, c.prototype.equalsEpsilon = function (e, t, r) {
      return e === this || i(e) && e instanceof c && u.equalsEpsilon(this.right, e.right, t, r) && u.equalsEpsilon(this.left, e.left, t, r) && u.equalsEpsilon(this.top, e.top, t, r) && u.equalsEpsilon(this.bottom, e.bottom, t, r) && u.equalsEpsilon(this.near, e.near, t, r) && u.equalsEpsilon(this.far, e.far, t, r);
    }, c;
  }), define("Core/OrthographicFrustum", ["./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./OrthographicOffCenterFrustum"], function (e, t, r, n, i, o, a) {
    "use strict";

    function u(e) {
      e = t(e, t.EMPTY_OBJECT), this._offCenterFrustum = new a(), this.width = e.width, this._width = void 0, this.aspectRatio = e.aspectRatio, this._aspectRatio = void 0, this.near = t(e.near, 1), this._near = this.near, this.far = t(e.far, 5e8), this._far = this.far;
    }

    function s(e) {
      var t = e._offCenterFrustum;

      if (e.width !== e._width || e.aspectRatio !== e._aspectRatio || e.near !== e._near || e.far !== e._far) {
        e._aspectRatio = e.aspectRatio, e._width = e.width, e._near = e.near, e._far = e.far;
        var r = 1 / e.aspectRatio;
        t.right = .5 * e.width, t.left = -t.right, t.top = r * t.right, t.bottom = -t.top, t.near = e.near, t.far = e.far;
      }
    }

    return u.packedLength = 4, u.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.width, r[n++] = e.aspectRatio, r[n++] = e.near, r[n] = e.far, r;
    }, u.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new u()), i.width = e[n++], i.aspectRatio = e[n++], i.near = e[n++], i.far = e[n], i;
    }, n(u.prototype, {
      projectionMatrix: {
        get: function get() {
          return s(this), this._offCenterFrustum.projectionMatrix;
        }
      }
    }), u.prototype.computeCullingVolume = function (e, t, r) {
      return s(this), this._offCenterFrustum.computeCullingVolume(e, t, r);
    }, u.prototype.getPixelDimensions = function (e, t, r, n) {
      return s(this), this._offCenterFrustum.getPixelDimensions(e, t, r, n);
    }, u.prototype.clone = function (e) {
      return r(e) || (e = new u()), e.aspectRatio = this.aspectRatio, e.width = this.width, e.near = this.near, e.far = this.far, e._aspectRatio = void 0, e._width = void 0, e._near = void 0, e._far = void 0, this._offCenterFrustum.clone(e._offCenterFrustum), e;
    }, u.prototype.equals = function (e) {
      return !!(r(e) && e instanceof u) && (s(this), s(e), this.width === e.width && this.aspectRatio === e.aspectRatio && this._offCenterFrustum.equals(e._offCenterFrustum));
    }, u.prototype.equalsEpsilon = function (e, t, n) {
      return !!(r(e) && e instanceof u) && (s(this), s(e), o.equalsEpsilon(this.width, e.width, t, n) && o.equalsEpsilon(this.aspectRatio, e.aspectRatio, t, n) && this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum, t, n));
    }, u;
  }), define("Core/PerspectiveOffCenterFrustum", ["./Cartesian3", "./Cartesian4", "./CullingVolume", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./Matrix4"], function (e, t, r, n, i, o, a, u, s) {
    "use strict";

    function c(e) {
      e = n(e, n.EMPTY_OBJECT), this.left = e.left, this._left = void 0, this.right = e.right, this._right = void 0, this.top = e.top, this._top = void 0, this.bottom = e.bottom, this._bottom = void 0, this.near = n(e.near, 1), this._near = this.near, this.far = n(e.far, 5e8), this._far = this.far, this._cullingVolume = new r(), this._perspectiveMatrix = new s(), this._infinitePerspective = new s();
    }

    function l(e) {
      var t = e.top,
          r = e.bottom,
          n = e.right,
          i = e.left,
          o = e.near,
          a = e.far;
      t === e._top && r === e._bottom && i === e._left && n === e._right && o === e._near && a === e._far || (e._left = i, e._right = n, e._top = t, e._bottom = r, e._near = o, e._far = a, e._perspectiveMatrix = s.computePerspectiveOffCenter(i, n, r, t, o, a, e._perspectiveMatrix), e._infinitePerspective = s.computeInfinitePerspectiveOffCenter(i, n, r, t, o, e._infinitePerspective));
    }

    o(c.prototype, {
      projectionMatrix: {
        get: function get() {
          return l(this), this._perspectiveMatrix;
        }
      },
      infiniteProjectionMatrix: {
        get: function get() {
          return l(this), this._infinitePerspective;
        }
      }
    });
    var f = new e(),
        h = new e(),
        d = new e(),
        p = new e();
    return c.prototype.computeCullingVolume = function (r, n, o) {
      var a = this._cullingVolume.planes,
          u = this.top,
          s = this.bottom,
          c = this.right,
          l = this.left,
          E = this.near,
          _ = this.far,
          m = e.cross(n, o, f),
          y = h;
      e.multiplyByScalar(n, E, y), e.add(r, y, y);
      var T = d;
      e.multiplyByScalar(n, _, T), e.add(r, T, T);
      var R = p;
      e.multiplyByScalar(m, l, R), e.add(y, R, R), e.subtract(R, r, R), e.normalize(R, R), e.cross(R, o, R), e.normalize(R, R);
      var A = a[0];
      return i(A) || (A = a[0] = new t()), A.x = R.x, A.y = R.y, A.z = R.z, A.w = -e.dot(R, r), e.multiplyByScalar(m, c, R), e.add(y, R, R), e.subtract(R, r, R), e.cross(o, R, R), e.normalize(R, R), A = a[1], i(A) || (A = a[1] = new t()), A.x = R.x, A.y = R.y, A.z = R.z, A.w = -e.dot(R, r), e.multiplyByScalar(o, s, R), e.add(y, R, R), e.subtract(R, r, R), e.cross(m, R, R), e.normalize(R, R), A = a[2], i(A) || (A = a[2] = new t()), A.x = R.x, A.y = R.y, A.z = R.z, A.w = -e.dot(R, r), e.multiplyByScalar(o, u, R), e.add(y, R, R), e.subtract(R, r, R), e.cross(R, m, R), e.normalize(R, R), A = a[3], i(A) || (A = a[3] = new t()), A.x = R.x, A.y = R.y, A.z = R.z, A.w = -e.dot(R, r), A = a[4], i(A) || (A = a[4] = new t()), A.x = n.x, A.y = n.y, A.z = n.z, A.w = -e.dot(n, y), e.negate(n, R), A = a[5], i(A) || (A = a[5] = new t()), A.x = R.x, A.y = R.y, A.z = R.z, A.w = -e.dot(R, T), this._cullingVolume;
    }, c.prototype.getPixelDimensions = function (e, t, r, n) {
      l(this);
      var i = 1 / this.near,
          o = this.top * i,
          a = 2 * r * o / t;
      o = this.right * i;
      var u = 2 * r * o / e;
      return n.x = u, n.y = a, n;
    }, c.prototype.clone = function (e) {
      return i(e) || (e = new c()), e.right = this.right, e.left = this.left, e.top = this.top, e.bottom = this.bottom, e.near = this.near, e.far = this.far, e._left = void 0, e._right = void 0, e._top = void 0, e._bottom = void 0, e._near = void 0, e._far = void 0, e;
    }, c.prototype.equals = function (e) {
      return i(e) && e instanceof c && this.right === e.right && this.left === e.left && this.top === e.top && this.bottom === e.bottom && this.near === e.near && this.far === e.far;
    }, c.prototype.equalsEpsilon = function (e, t, r) {
      return e === this || i(e) && e instanceof c && u.equalsEpsilon(this.right, e.right, t, r) && u.equalsEpsilon(this.left, e.left, t, r) && u.equalsEpsilon(this.top, e.top, t, r) && u.equalsEpsilon(this.bottom, e.bottom, t, r) && u.equalsEpsilon(this.near, e.near, t, r) && u.equalsEpsilon(this.far, e.far, t, r);
    }, c;
  }), define("Core/PerspectiveFrustum", ["./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Math", "./PerspectiveOffCenterFrustum"], function (e, t, r, n, i, o, a) {
    "use strict";

    function u(e) {
      e = t(e, t.EMPTY_OBJECT), this._offCenterFrustum = new a(), this.fov = e.fov, this._fov = void 0, this._fovy = void 0, this._sseDenominator = void 0, this.aspectRatio = e.aspectRatio, this._aspectRatio = void 0, this.near = t(e.near, 1), this._near = this.near, this.far = t(e.far, 5e8), this._far = this.far, this.xOffset = t(e.xOffset, 0), this._xOffset = this.xOffset, this.yOffset = t(e.yOffset, 0), this._yOffset = this.yOffset;
    }

    function s(e) {
      var t = e._offCenterFrustum;
      e.fov === e._fov && e.aspectRatio === e._aspectRatio && e.near === e._near && e.far === e._far && e.xOffset === e._xOffset && e.yOffset === e._yOffset || (e._aspectRatio = e.aspectRatio, e._fov = e.fov, e._fovy = e.aspectRatio <= 1 ? e.fov : 2 * Math.atan(Math.tan(.5 * e.fov) / e.aspectRatio), e._near = e.near, e._far = e.far, e._sseDenominator = 2 * Math.tan(.5 * e._fovy), e._xOffset = e.xOffset, e._yOffset = e.yOffset, t.top = e.near * Math.tan(.5 * e._fovy), t.bottom = -t.top, t.right = e.aspectRatio * t.top, t.left = -t.right, t.near = e.near, t.far = e.far, t.right += e.xOffset, t.left += e.xOffset, t.top += e.yOffset, t.bottom += e.yOffset);
    }

    return u.packedLength = 6, u.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.fov, r[n++] = e.aspectRatio, r[n++] = e.near, r[n++] = e.far, r[n++] = e.xOffset, r[n] = e.yOffset, r;
    }, u.unpack = function (e, n, i) {
      return n = t(n, 0), r(i) || (i = new u()), i.fov = e[n++], i.aspectRatio = e[n++], i.near = e[n++], i.far = e[n++], i.xOffset = e[n++], i.yOffset = e[n], i;
    }, n(u.prototype, {
      projectionMatrix: {
        get: function get() {
          return s(this), this._offCenterFrustum.projectionMatrix;
        }
      },
      infiniteProjectionMatrix: {
        get: function get() {
          return s(this), this._offCenterFrustum.infiniteProjectionMatrix;
        }
      },
      fovy: {
        get: function get() {
          return s(this), this._fovy;
        }
      },
      sseDenominator: {
        get: function get() {
          return s(this), this._sseDenominator;
        }
      }
    }), u.prototype.computeCullingVolume = function (e, t, r) {
      return s(this), this._offCenterFrustum.computeCullingVolume(e, t, r);
    }, u.prototype.getPixelDimensions = function (e, t, r, n) {
      return s(this), this._offCenterFrustum.getPixelDimensions(e, t, r, n);
    }, u.prototype.clone = function (e) {
      return r(e) || (e = new u()), e.aspectRatio = this.aspectRatio, e.fov = this.fov, e.near = this.near, e.far = this.far, e._aspectRatio = void 0, e._fov = void 0, e._near = void 0, e._far = void 0, this._offCenterFrustum.clone(e._offCenterFrustum), e;
    }, u.prototype.equals = function (e) {
      return !!(r(e) && e instanceof u) && (s(this), s(e), this.fov === e.fov && this.aspectRatio === e.aspectRatio && this._offCenterFrustum.equals(e._offCenterFrustum));
    }, u.prototype.equalsEpsilon = function (e, t, n) {
      return !!(r(e) && e instanceof u) && (s(this), s(e), o.equalsEpsilon(this.fov, e.fov, t, n) && o.equalsEpsilon(this.aspectRatio, e.aspectRatio, t, n) && this._offCenterFrustum.equalsEpsilon(e._offCenterFrustum, t, n));
    }, u;
  }), define("Core/VertexFormat", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function (e, t, r, n) {
    "use strict";

    function i(t) {
      t = e(t, e.EMPTY_OBJECT), this.position = e(t.position, !1), this.normal = e(t.normal, !1), this.st = e(t.st, !1), this.bitangent = e(t.bitangent, !1), this.tangent = e(t.tangent, !1), this.color = e(t.color, !1);
    }

    return i.POSITION_ONLY = n(new i({
      position: !0
    })), i.POSITION_AND_NORMAL = n(new i({
      position: !0,
      normal: !0
    })), i.POSITION_NORMAL_AND_ST = n(new i({
      position: !0,
      normal: !0,
      st: !0
    })), i.POSITION_AND_ST = n(new i({
      position: !0,
      st: !0
    })), i.POSITION_AND_COLOR = n(new i({
      position: !0,
      color: !0
    })), i.ALL = n(new i({
      position: !0,
      normal: !0,
      st: !0,
      tangent: !0,
      bitangent: !0
    })), i.DEFAULT = i.POSITION_NORMAL_AND_ST, i.packedLength = 6, i.pack = function (t, r, n) {
      return n = e(n, 0), r[n++] = t.position ? 1 : 0, r[n++] = t.normal ? 1 : 0, r[n++] = t.st ? 1 : 0, r[n++] = t.tangent ? 1 : 0, r[n++] = t.bitangent ? 1 : 0, r[n] = t.color ? 1 : 0, r;
    }, i.unpack = function (r, n, o) {
      return n = e(n, 0), t(o) || (o = new i()), o.position = 1 === r[n++], o.normal = 1 === r[n++], o.st = 1 === r[n++], o.tangent = 1 === r[n++], o.bitangent = 1 === r[n++], o.color = 1 === r[n], o;
    }, i.clone = function (e, r) {
      if (t(e)) return t(r) || (r = new i()), r.position = e.position, r.normal = e.normal, r.st = e.st, r.tangent = e.tangent, r.bitangent = e.bitangent, r.color = e.color, r;
    }, i;
  }), define("Core/FrustumGeometry", ["./BoundingSphere", "./Cartesian3", "./Cartesian4", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./Matrix3", "./Matrix4", "./OrthographicFrustum", "./PerspectiveFrustum", "./PrimitiveType", "./Quaternion", "./VertexFormat"], function (e, t, r, n, i, o, a, u, s, c, l, f, h, d, p, E, _) {
    "use strict";

    function m(e) {
      var r,
          n,
          i = e.frustum,
          a = e.orientation,
          u = e.origin,
          s = o(e.vertexFormat, _.DEFAULT),
          c = o(e._drawNearPlane, !0);
      i instanceof d ? (r = T, n = d.packedLength) : i instanceof h && (r = R, n = h.packedLength), this._frustumType = r, this._frustum = i.clone(), this._origin = t.clone(u), this._orientation = E.clone(a), this._drawNearPlane = c, this._vertexFormat = s, this._workerName = "createFrustumGeometry", this.packedLength = 2 + n + t.packedLength + E.packedLength + _.packedLength;
    }

    function y(e, t, r, n, i, o, u, s) {
      for (var c = e / 3 * 2, l = 0; l < 4; ++l) {
        a(t) && (t[e] = o.x, t[e + 1] = o.y, t[e + 2] = o.z), a(r) && (r[e] = u.x, r[e + 1] = u.y, r[e + 2] = u.z), a(n) && (n[e] = s.x, n[e + 1] = s.y, n[e + 2] = s.z), e += 3;
      }

      i[c] = 0, i[c + 1] = 0, i[c + 2] = 1, i[c + 3] = 0, i[c + 4] = 1, i[c + 5] = 1, i[c + 6] = 0, i[c + 7] = 1;
    }

    var T = 0,
        R = 1;

    m.pack = function (e, r, n) {
      n = o(n, 0);
      var i = e._frustumType,
          a = e._frustum;
      return r[n++] = i, i === T ? (d.pack(a, r, n), n += d.packedLength) : (h.pack(a, r, n), n += h.packedLength), t.pack(e._origin, r, n), n += t.packedLength, E.pack(e._orientation, r, n), n += E.packedLength, _.pack(e._vertexFormat, r, n), n += _.packedLength, r[n] = e._drawNearPlane ? 1 : 0, r;
    };

    var A = new d(),
        v = new h(),
        S = new E(),
        O = new t(),
        I = new _();

    m.unpack = function (e, r, n) {
      r = o(r, 0);
      var i,
          u = e[r++];
      u === T ? (i = d.unpack(e, r, A), r += d.packedLength) : (i = h.unpack(e, r, v), r += h.packedLength);
      var s = t.unpack(e, r, O);
      r += t.packedLength;
      var c = E.unpack(e, r, S);
      r += E.packedLength;

      var l = _.unpack(e, r, I);

      r += _.packedLength;
      var f = 1 === e[r];
      if (!a(n)) return new m({
        frustum: i,
        origin: s,
        orientation: c,
        vertexFormat: l,
        _drawNearPlane: f
      });
      var p = u === n._frustumType ? n._frustum : void 0;
      return n._frustum = i.clone(p), n._frustumType = u, n._origin = t.clone(s, n._origin), n._orientation = E.clone(c, n._orientation), n._vertexFormat = _.clone(l, n._vertexFormat), n._drawNearPlane = f, n;
    };

    var N = new l(),
        w = new f(),
        g = new f(),
        M = new t(),
        C = new t(),
        x = new t(),
        P = new t(),
        U = new t(),
        D = new t(),
        F = new Array(3),
        L = new Array(4);
    L[0] = new r(-1, -1, 1, 1), L[1] = new r(1, -1, 1, 1), L[2] = new r(1, 1, 1, 1), L[3] = new r(-1, 1, 1, 1);

    for (var b = new Array(4), B = 0; B < 4; ++B) {
      b[B] = new r();
    }

    return m._computeNearFarPlanes = function (e, n, i, u, s, c, h, d) {
      var p = l.fromQuaternion(n, N),
          E = o(c, M),
          _ = o(h, C),
          m = o(d, x);

      E = l.getColumn(p, 0, E), _ = l.getColumn(p, 1, _), m = l.getColumn(p, 2, m), t.normalize(E, E), t.normalize(_, _), t.normalize(m, m), t.negate(E, E);
      var y,
          R,
          A = f.computeView(e, m, _, E, w);

      if (i === T) {
        var v = u.projectionMatrix,
            S = f.multiply(v, A, g);
        R = f.inverse(S, g);
      } else y = f.inverseTransformation(A, g);

      a(R) ? (F[0] = u.near, F[1] = u.far) : (F[0] = 0, F[1] = u.near, F[2] = u.far);

      for (var O = 0; O < 2; ++O) {
        for (var I = 0; I < 4; ++I) {
          var P = r.clone(L[I], b[I]);

          if (a(R)) {
            P = f.multiplyByVector(R, P, P);
            var U = 1 / P.w;
            t.multiplyByScalar(P, U, P), t.subtract(P, e, P), t.normalize(P, P);
            var D = t.dot(m, P);
            t.multiplyByScalar(P, F[O] / D, P), t.add(P, e, P);
          } else {
            a(u._offCenterFrustum) && (u = u._offCenterFrustum);
            var B = F[O],
                z = F[O + 1];
            P.x = .5 * (P.x * (u.right - u.left) + u.left + u.right), P.y = .5 * (P.y * (u.top - u.bottom) + u.bottom + u.top), P.z = .5 * (P.z * (B - z) - B - z), P.w = 1, f.multiplyByVector(y, P, P);
          }

          s[12 * O + 3 * I] = P.x, s[12 * O + 3 * I + 1] = P.y, s[12 * O + 3 * I + 2] = P.z;
        }
      }
    }, m.createGeometry = function (r) {
      var n = r._frustumType,
          o = r._frustum,
          l = r._origin,
          f = r._orientation,
          h = r._drawNearPlane,
          d = r._vertexFormat,
          E = h ? 6 : 5,
          _ = new Float64Array(72);

      m._computeNearFarPlanes(l, f, n, o, _);

      var T = 24;
      _[T] = _[12], _[T + 1] = _[13], _[T + 2] = _[14], _[T + 3] = _[0], _[T + 4] = _[1], _[T + 5] = _[2], _[T + 6] = _[9], _[T + 7] = _[10], _[T + 8] = _[11], _[T + 9] = _[21], _[T + 10] = _[22], _[T + 11] = _[23], T += 12, _[T] = _[15], _[T + 1] = _[16], _[T + 2] = _[17], _[T + 3] = _[3], _[T + 4] = _[4], _[T + 5] = _[5], _[T + 6] = _[0], _[T + 7] = _[1], _[T + 8] = _[2], _[T + 9] = _[12], _[T + 10] = _[13], _[T + 11] = _[14], T += 12, _[T] = _[3], _[T + 1] = _[4], _[T + 2] = _[5], _[T + 3] = _[15], _[T + 4] = _[16], _[T + 5] = _[17], _[T + 6] = _[18], _[T + 7] = _[19], _[T + 8] = _[20], _[T + 9] = _[6], _[T + 10] = _[7], _[T + 11] = _[8], T += 12, _[T] = _[6], _[T + 1] = _[7], _[T + 2] = _[8], _[T + 3] = _[18], _[T + 4] = _[19], _[T + 5] = _[20], _[T + 6] = _[21], _[T + 7] = _[22], _[T + 8] = _[23], _[T + 9] = _[9], _[T + 10] = _[10], _[T + 11] = _[11], h || (_ = _.subarray(12));
      var R = new c({
        position: new s({
          componentDatatype: i.DOUBLE,
          componentsPerAttribute: 3,
          values: _
        })
      });

      if (a(d.normal) || a(d.tangent) || a(d.bitangent) || a(d.st)) {
        var A = a(d.normal) ? new Float32Array(12 * E) : void 0,
            v = a(d.tangent) ? new Float32Array(12 * E) : void 0,
            S = a(d.bitangent) ? new Float32Array(12 * E) : void 0,
            O = a(d.st) ? new Float32Array(8 * E) : void 0,
            I = M,
            N = C,
            w = x,
            g = t.negate(I, P),
            F = t.negate(N, U),
            L = t.negate(w, D);
        T = 0, h && (y(T, A, v, S, O, L, I, N), T += 12), y(T, A, v, S, O, w, g, N), T += 12, y(T, A, v, S, O, g, L, N), T += 12, y(T, A, v, S, O, F, L, g), T += 12, y(T, A, v, S, O, I, w, N), T += 12, y(T, A, v, S, O, N, w, g), a(A) && (R.normal = new s({
          componentDatatype: i.FLOAT,
          componentsPerAttribute: 3,
          values: A
        })), a(v) && (R.tangent = new s({
          componentDatatype: i.FLOAT,
          componentsPerAttribute: 3,
          values: v
        })), a(S) && (R.bitangent = new s({
          componentDatatype: i.FLOAT,
          componentsPerAttribute: 3,
          values: S
        })), a(O) && (R.st = new s({
          componentDatatype: i.FLOAT,
          componentsPerAttribute: 2,
          values: O
        }));
      }

      for (var b = new Uint16Array(6 * E), B = 0; B < E; ++B) {
        var z = 6 * B,
            q = 4 * B;
        b[z] = q, b[z + 1] = q + 1, b[z + 2] = q + 2, b[z + 3] = q, b[z + 4] = q + 2, b[z + 5] = q + 3;
      }

      return new u({
        attributes: R,
        indices: b,
        primitiveType: p.TRIANGLES,
        boundingSphere: e.fromVertices(_)
      });
    }, m;
  }), define("Workers/createFrustumGeometry", ["../Core/defined", "../Core/FrustumGeometry"], function (e, t) {
    "use strict";

    function r(r, n) {
      return e(n) && (r = t.unpack(r, n)), t.createGeometry(r);
    }

    return r;
  });
}();