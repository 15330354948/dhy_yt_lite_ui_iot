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
        m = new o(40680631590769, 40680631590769, 40408299984661.445);
    return o.fromRadians = function (e, r, i, a, u) {
      i = t(i, 0);
      var s = n(a) ? a.radiiSquared : m,
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
  }), define("Core/Intersect", ["./freezeObject"], function (e) {
    "use strict";

    return e({
      OUTSIDE: -1,
      INTERSECTING: 0,
      INSIDE: 1
    });
  }), define("Core/AxisAlignedBoundingBox", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./Intersect"], function (e, t, n, r, i) {
    "use strict";

    function a(t, i, a) {
      this.minimum = e.clone(n(t, e.ZERO)), this.maximum = e.clone(n(i, e.ZERO)), a = r(a) ? e.clone(a) : e.midpoint(this.minimum, this.maximum, new e()), this.center = a;
    }

    a.fromPoints = function (t, n) {
      if (r(n) || (n = new a()), !r(t) || 0 === t.length) return n.minimum = e.clone(e.ZERO, n.minimum), n.maximum = e.clone(e.ZERO, n.maximum), n.center = e.clone(e.ZERO, n.center), n;

      for (var i = t[0].x, o = t[0].y, u = t[0].z, s = t[0].x, c = t[0].y, l = t[0].z, f = t.length, h = 1; h < f; h++) {
        var d = t[h],
            m = d.x,
            p = d.y,
            E = d.z;
        i = Math.min(m, i), s = Math.max(m, s), o = Math.min(p, o), c = Math.max(p, c), u = Math.min(E, u), l = Math.max(E, l);
      }

      var _ = n.minimum;
      _.x = i, _.y = o, _.z = u;
      var y = n.maximum;
      return y.x = s, y.y = c, y.z = l, n.center = e.midpoint(_, y, n.center), n;
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
  }), define("Core/scaleToGeodeticSurface", ["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function (e, t, n, r) {
    "use strict";

    function i(n, i, u, s, c) {
      var l = n.x,
          f = n.y,
          h = n.z,
          d = i.x,
          m = i.y,
          p = i.z,
          E = l * l * d * d,
          _ = f * f * m * m,
          y = h * h * p * p,
          T = E + _ + y,
          R = Math.sqrt(1 / T),
          A = e.multiplyByScalar(n, R, a);

      if (T < s) return isFinite(R) ? e.clone(A, c) : void 0;
      var v = u.x,
          S = u.y,
          g = u.z,
          I = o;
      I.x = A.x * v * 2, I.y = A.y * S * 2, I.z = A.z * g * 2;
      var N,
          M,
          O,
          w,
          C,
          x,
          P,
          U,
          D,
          F,
          L,
          b = (1 - R) * e.magnitude(n) / (.5 * e.magnitude(I)),
          B = 0;

      do {
        b -= B, O = 1 / (1 + b * v), w = 1 / (1 + b * S), C = 1 / (1 + b * g), x = O * O, P = w * w, U = C * C, D = x * O, F = P * w, L = U * C, N = E * x + _ * P + y * U - 1, M = E * D * v + _ * F * S + y * L * g;
        B = N / (-2 * M);
      } while (Math.abs(N) > r.EPSILON12);

      return t(c) ? (c.x = l * O, c.y = f * w, c.z = h * C, c) : new e(l * O, f * w, h * C);
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
      var m = r(n) ? n.oneOverRadii : f,
          p = r(n) ? n.oneOverRadiiSquared : h,
          E = r(n) ? n._centerToleranceSquared : d,
          _ = o(t, m, p, E, c);

      if (r(_)) {
        var y = e.multiplyComponents(_, p, s);
        y = e.normalize(y, y);
        var T = e.subtract(t, _, l),
            R = Math.atan2(y.y, y.x),
            A = Math.asin(y.z),
            v = a.sign(e.dot(T, t)) * e.magnitude(T);
        return r(i) ? (i.longitude = R, i.latitude = A, i.height = v, i) : new u(R, A, v);
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
    var m = new e(),
        p = new e(),
        E = new e();
    return f.prototype.cartesianToCartographic = function (n, r) {
      var a = this.scaleToGeodeticSurface(n, p);

      if (i(a)) {
        var o = this.geodeticSurfaceNormal(a, m),
            u = e.subtract(n, a, E),
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
        var r = e[s.getElementIndex(p[n], m[n])];
        t += 2 * r * r;
      }

      return Math.sqrt(t);
    }

    function f(e, t) {
      for (var n = u.EPSILON15, r = 0, i = 1, a = 0; a < 3; ++a) {
        var o = Math.abs(e[s.getElementIndex(p[a], m[a])]);
        o > r && (i = a, r = o);
      }

      var c = 1,
          l = 0,
          f = m[i],
          h = p[i];

      if (Math.abs(e[s.getElementIndex(h, f)]) > n) {
        var d,
            E = e[s.getElementIndex(h, h)],
            _ = e[s.getElementIndex(f, f)],
            y = e[s.getElementIndex(h, f)],
            T = (E - _) / 2 / y;
        d = T < 0 ? -1 / (-T + Math.sqrt(1 + T * T)) : 1 / (T + Math.sqrt(1 + T * T)), c = 1 / Math.sqrt(1 + d * d), l = d * c;
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
          m = n - u - f + d,
          p = 2 * (i - h),
          E = 2 * (a + l),
          _ = 2 * (i + h),
          y = -n + u - f + d,
          T = 2 * (c - o),
          R = 2 * (a - l),
          A = 2 * (c + o),
          v = -n - u + f + d;

      return r(t) ? (t[0] = m, t[1] = _, t[2] = R, t[3] = p, t[4] = y, t[5] = A, t[6] = E, t[7] = T, t[8] = v, t) : new s(m, p, E, _, y, T, R, A, v);
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
          m = a * i + c * o * u,
          p = -c * i + a * o * u,
          E = -o,
          _ = c * n,
          y = a * n;

      return r(t) ? (t[0] = l, t[1] = d, t[2] = E, t[3] = f, t[4] = m, t[5] = _, t[6] = h, t[7] = p, t[8] = y, t) : new s(l, f, h, d, m, p, E, _, y);
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

    var m = [1, 0, 0],
        p = [2, 2, 1],
        E = new s(),
        _ = new s();

    return s.computeEigenDecomposition = function (e, t) {
      var n = u.EPSILON20,
          i = 0,
          a = 0;
      r(t) || (t = {});

      for (var o = t.unitary = s.clone(s.IDENTITY, t.unitary), h = t.diagonal = s.clone(e, t.diagonal), d = n * c(h); a < 10 && l(h) > d;) {
        f(h, E), s.transpose(E, _), s.multiply(h, E, h), s.multiply(_, h, h), s.multiply(o, E, o), ++i > 2 && (++a, i = 0);
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

    function l(e, t, n, i, a, o, u, s, c, l, f, h, d, m, p, E) {
      this[0] = r(e, 0), this[1] = r(a, 0), this[2] = r(c, 0), this[3] = r(d, 0), this[4] = r(t, 0), this[5] = r(o, 0), this[6] = r(l, 0), this[7] = r(m, 0), this[8] = r(n, 0), this[9] = r(u, 0), this[10] = r(f, 0), this[11] = r(p, 0), this[12] = r(i, 0), this[13] = r(s, 0), this[14] = r(h, 0), this[15] = r(E, 0);
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
          m = t.y * t.z,
          p = t.y * t.w,
          E = t.z * t.z,
          _ = t.z * t.w,
          y = t.w * t.w,
          T = s - d - E + y,
          R = 2 * (c - _),
          A = 2 * (f + p),
          v = 2 * (c + _),
          S = -s + d - E + y,
          g = 2 * (m - h),
          I = 2 * (f - p),
          N = 2 * (m + h),
          M = -s - d + E + y;

      return r[0] = T * a, r[1] = v * a, r[2] = I * a, r[3] = 0, r[4] = R * o, r[5] = S * o, r[6] = N * o, r[7] = 0, r[8] = A * u, r[9] = g * u, r[10] = M * u, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, r;
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
          m = f.x,
          p = f.y,
          E = f.z,
          _ = d.x,
          y = d.y,
          T = d.z,
          R = r.x,
          A = r.y,
          v = r.z,
          S = u * -R + s * -A + c * -v,
          g = _ * -R + y * -A + T * -v,
          I = m * R + p * A + E * v;
      return i(n) ? (n[0] = u, n[1] = _, n[2] = -m, n[3] = 0, n[4] = s, n[5] = y, n[6] = -p, n[7] = 0, n[8] = c, n[9] = T, n[10] = -E, n[11] = 0, n[12] = S, n[13] = g, n[14] = I, n[15] = 1, n) : new l(u, s, c, S, _, y, T, g, -m, -p, -E, I, 0, 0, 0, 1);
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
          m = f,
          p = a + c,
          E = o + l,
          _ = t + f;

      return i[0] = h, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = d, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = m, i[11] = 0, i[12] = p, i[13] = E, i[14] = _, i[15] = 1, i;
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
    var m = new e();
    l.setScale = function (t, n, r) {
      var i = l.getScale(t, m),
          a = e.divideComponents(n, i, m);
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
    var p = new e();

    l.getScale = function (t, n) {
      return n.x = e.magnitude(e.fromElements(t[0], t[1], t[2], p)), n.y = e.magnitude(e.fromElements(t[4], t[5], t[6], p)), n.z = e.magnitude(e.fromElements(t[8], t[9], t[10], p)), n;
    };

    var E = new e();
    l.getMaximumScale = function (t) {
      return l.getScale(t, E), e.maximumComponent(E);
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
          m = e[11],
          p = e[12],
          E = e[13],
          _ = e[14],
          y = e[15],
          T = t[0],
          R = t[1],
          A = t[2],
          v = t[3],
          S = t[4],
          g = t[5],
          I = t[6],
          N = t[7],
          M = t[8],
          O = t[9],
          w = t[10],
          C = t[11],
          x = t[12],
          P = t[13],
          U = t[14],
          D = t[15],
          F = r * T + u * R + f * A + p * v,
          L = i * T + s * R + h * A + E * v,
          b = a * T + c * R + d * A + _ * v,
          B = o * T + l * R + m * A + y * v,
          z = r * S + u * g + f * I + p * N,
          q = i * S + s * g + h * I + E * N,
          G = a * S + c * g + d * I + _ * N,
          V = o * S + l * g + m * I + y * N,
          W = r * M + u * O + f * w + p * C,
          X = i * M + s * O + h * w + E * C,
          H = a * M + c * O + d * w + _ * C,
          Y = o * M + l * O + m * w + y * C,
          k = r * x + u * P + f * U + p * D,
          j = i * x + s * P + h * U + E * D,
          Z = a * x + c * P + d * U + _ * D,
          K = o * x + l * P + m * U + y * D;
      return n[0] = F, n[1] = L, n[2] = b, n[3] = B, n[4] = z, n[5] = q, n[6] = G, n[7] = V, n[8] = W, n[9] = X, n[10] = H, n[11] = Y, n[12] = k, n[13] = j, n[14] = Z, n[15] = K, n;
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
          m = e[14],
          p = t[0],
          E = t[1],
          _ = t[2],
          y = t[4],
          T = t[5],
          R = t[6],
          A = t[8],
          v = t[9],
          S = t[10],
          g = t[12],
          I = t[13],
          N = t[14],
          M = r * p + o * E + c * _,
          O = i * p + u * E + l * _,
          w = a * p + s * E + f * _,
          C = r * y + o * T + c * R,
          x = i * y + u * T + l * R,
          P = a * y + s * T + f * R,
          U = r * A + o * v + c * S,
          D = i * A + u * v + l * S,
          F = a * A + s * v + f * S,
          L = r * g + o * I + c * N + h,
          b = i * g + u * I + l * N + d,
          B = a * g + s * I + f * N + m;
      return n[0] = M, n[1] = O, n[2] = w, n[3] = 0, n[4] = C, n[5] = x, n[6] = P, n[7] = 0, n[8] = U, n[9] = D, n[10] = F, n[11] = 0, n[12] = L, n[13] = b, n[14] = B, n[15] = 1, n;
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
          m = t[2],
          p = t[3],
          E = t[4],
          _ = t[5],
          y = t[6],
          T = t[7],
          R = t[8],
          A = r * h + o * d + c * m,
          v = i * h + u * d + l * m,
          S = a * h + s * d + f * m,
          g = r * p + o * E + c * _,
          I = i * p + u * E + l * _,
          N = a * p + s * E + f * _,
          M = r * y + o * T + c * R,
          O = i * y + u * T + l * R,
          w = a * y + s * T + f * R;
      return n[0] = A, n[1] = v, n[2] = S, n[3] = 0, n[4] = g, n[5] = I, n[6] = N, n[7] = 0, n[8] = M, n[9] = O, n[10] = w, n[11] = 0, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15], n;
    }, l.multiplyByTranslation = function (e, t, n) {
      var r = t.x,
          i = t.y,
          a = t.z,
          o = r * e[0] + i * e[4] + a * e[8] + e[12],
          u = r * e[1] + i * e[5] + a * e[9] + e[13],
          s = r * e[2] + i * e[6] + a * e[10] + e[14];
      return n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = o, n[13] = u, n[14] = s, n[15] = e[15], n;
    };

    var _ = new e();

    l.multiplyByUniformScale = function (e, t, n) {
      return _.x = t, _.y = t, _.z = t, l.multiplyByScale(e, _, n);
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
    var y = new s(),
        T = new s(),
        R = new t(),
        A = new t(0, 0, 0, 1);
    return l.inverse = function (e, n) {
      var r = e[0],
          i = e[4],
          a = e[8],
          o = e[12],
          f = e[1],
          h = e[5],
          d = e[9],
          m = e[13],
          p = e[2],
          E = e[6],
          _ = e[10],
          v = e[14],
          S = e[3],
          g = e[7],
          I = e[11],
          N = e[15],
          M = _ * N,
          O = v * I,
          w = E * N,
          C = v * g,
          x = E * I,
          P = _ * g,
          U = p * N,
          D = v * S,
          F = p * I,
          L = _ * S,
          b = p * g,
          B = E * S,
          z = M * h + C * d + x * m - (O * h + w * d + P * m),
          q = O * f + U * d + L * m - (M * f + D * d + F * m),
          G = w * f + D * h + b * m - (C * f + U * h + B * m),
          V = P * f + F * h + B * d - (x * f + L * h + b * d),
          W = O * i + w * a + P * o - (M * i + C * a + x * o),
          X = M * r + D * a + F * o - (O * r + U * a + L * o),
          H = C * r + U * i + B * o - (w * r + D * i + b * o),
          Y = x * r + L * i + b * a - (P * r + F * i + B * a);
      M = a * m, O = o * d, w = i * m, C = o * h, x = i * d, P = a * h, U = r * m, D = o * f, F = r * d, L = a * f, b = r * h, B = i * f;
      var k = M * g + C * I + x * N - (O * g + w * I + P * N),
          j = O * S + U * I + L * N - (M * S + D * I + F * N),
          Z = w * S + D * g + b * N - (C * S + U * g + B * N),
          K = P * S + F * g + B * I - (x * S + L * g + b * I),
          J = w * _ + P * v + O * E - (x * v + M * E + C * _),
          Q = F * v + M * p + D * _ - (U * _ + L * v + O * p),
          $ = U * E + B * v + C * p - (b * v + w * p + D * E),
          ee = b * _ + x * p + L * E - (F * E + B * _ + P * p),
          te = r * z + i * q + a * G + o * V;

      if (Math.abs(te) < u.EPSILON21) {
        if (s.equalsEpsilon(l.getRotation(e, y), T, u.EPSILON7) && t.equals(l.getRow(e, 3, R), A)) return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 0, n[11] = 0, n[12] = -e[12], n[13] = -e[13], n[14] = -e[14], n[15] = 1, n;
        throw new c("matrix is not invertible because its determinate is zero.");
      }

      return te = 1 / te, n[0] = z * te, n[1] = q * te, n[2] = G * te, n[3] = V * te, n[4] = W * te, n[5] = X * te, n[6] = H * te, n[7] = Y * te, n[8] = k * te, n[9] = j * te, n[10] = Z * te, n[11] = K * te, n[12] = J * te, n[13] = Q * te, n[14] = $ * te, n[15] = ee * te, n;
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
          m = -n * f - r * h - i * d,
          p = -a * f - o * h - u * d,
          E = -s * f - c * h - l * d;
      return t[0] = n, t[1] = a, t[2] = s, t[3] = 0, t[4] = r, t[5] = o, t[6] = c, t[7] = 0, t[8] = i, t[9] = u, t[10] = l, t[11] = 0, t[12] = m, t[13] = p, t[14] = E, t[15] = 1, t;
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
        var m = d.longitude >= 0 ? d.longitude : d.longitude + u.TWO_PI;
        a = Math.min(a, m), o = Math.max(o, m);
      }

      return i - n > o - a && (n = a, i = o, i > u.PI && (i -= u.TWO_PI), n > u.PI && (n -= u.TWO_PI)), r(t) ? (t.west = n, t.south = c, t.east = i, t.north = l, t) : new s(n, c, i, l);
    }, s.fromCartesianArray = function (e, t, i) {
      t = n(t, a.WGS84);

      for (var o = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = Number.MAX_VALUE, f = -Number.MAX_VALUE, h = Number.MAX_VALUE, d = -Number.MAX_VALUE, m = 0, p = e.length; m < p; m++) {
        var E = t.cartesianToCartographic(e[m]);
        o = Math.min(o, E.longitude), c = Math.max(c, E.longitude), h = Math.min(h, E.latitude), d = Math.max(d, E.latitude);

        var _ = E.longitude >= 0 ? E.longitude : E.longitude + u.TWO_PI;

        l = Math.min(l, _), f = Math.max(f, _);
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
          m = e.west,
          p = c;
      p.height = i, p.longitude = m, p.latitude = f, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.longitude = d, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.latitude = h, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.longitude = m, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.latitude = f < 0 ? f : h > 0 ? h : 0;

      for (var E = 1; E < 8; ++E) {
        p.longitude = -Math.PI + E * u.PI_OVER_TWO, s.contains(e, p) && (o[l] = t.cartographicToCartesian(p, o[l]), l++);
      }

      return 0 === p.latitude && (p.longitude = m, o[l] = t.cartographicToCartesian(p, o[l]), l++, p.longitude = d, o[l] = t.cartographicToCartesian(p, o[l]), l++), o.length = l, o;
    }, s.MAX_VALUE = o(new s(-Math.PI, -u.PI_OVER_TWO, Math.PI, u.PI_OVER_TWO)), s;
  }), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (e, t, n, r, i, a, o, u, s, c, l, f, h) {
    "use strict";

    function d(t, n) {
      this.center = e.clone(r(t, e.ZERO)), this.radius = r(n, 0);
    }

    var m = new e(),
        p = new e(),
        E = new e(),
        _ = new e(),
        y = new e(),
        T = new e(),
        R = new e(),
        A = new e(),
        v = new e(),
        S = new e(),
        g = new e(),
        I = new e(),
        N = 4 / 3 * c.PI;

    d.fromPoints = function (t, n) {
      if (i(n) || (n = new d()), !i(t) || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
      var r,
          a = e.clone(t[0], R),
          o = e.clone(a, m),
          u = e.clone(a, p),
          s = e.clone(a, E),
          c = e.clone(a, _),
          l = e.clone(a, y),
          f = e.clone(a, T),
          h = t.length;

      for (r = 1; r < h; r++) {
        e.clone(t[r], a);
        var N = a.x,
            M = a.y,
            O = a.z;
        N < o.x && e.clone(a, o), N > c.x && e.clone(a, c), M < u.y && e.clone(a, u), M > l.y && e.clone(a, l), O < s.z && e.clone(a, s), O > f.z && e.clone(a, f);
      }

      var w = e.magnitudeSquared(e.subtract(c, o, A)),
          C = e.magnitudeSquared(e.subtract(l, u, A)),
          x = e.magnitudeSquared(e.subtract(f, s, A)),
          P = o,
          U = c,
          D = w;
      C > D && (D = C, P = u, U = l), x > D && (D = x, P = s, U = f);
      var F = v;
      F.x = .5 * (P.x + U.x), F.y = .5 * (P.y + U.y), F.z = .5 * (P.z + U.z);
      var L = e.magnitudeSquared(e.subtract(U, F, A)),
          b = Math.sqrt(L),
          B = S;
      B.x = o.x, B.y = u.y, B.z = s.z;
      var z = g;
      z.x = c.x, z.y = l.y, z.z = f.z;
      var q = e.midpoint(B, z, I),
          G = 0;

      for (r = 0; r < h; r++) {
        e.clone(t[r], a);
        var V = e.magnitude(e.subtract(a, q, A));
        V > G && (G = V);
        var W = e.magnitudeSquared(e.subtract(a, F, A));

        if (W > L) {
          var X = Math.sqrt(W);
          b = .5 * (b + X), L = b * b;
          var H = X - b;
          F.x = (b * F.x + H * a.x) / X, F.y = (b * F.y + H * a.y) / X, F.z = (b * F.z + H * a.z) / X;
        }
      }

      return b < G ? (e.clone(F, n.center), n.radius = b) : (e.clone(q, n.center), n.radius = G), n;
    };

    var M = new o(),
        O = new e(),
        w = new e(),
        C = new t(),
        x = new t();
    d.fromRectangle2D = function (e, t, n) {
      return d.fromRectangleWithHeights2D(e, t, 0, 0, n);
    }, d.fromRectangleWithHeights2D = function (t, n, a, o, u) {
      if (i(u) || (u = new d()), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
      n = r(n, M), h.southwest(t, C), C.height = a, h.northeast(t, x), x.height = o;
      var s = n.project(C, O),
          c = n.project(x, w),
          l = c.x - s.x,
          f = c.y - s.y,
          m = c.z - s.z;
      u.radius = .5 * Math.sqrt(l * l + f * f + m * m);
      var p = u.center;
      return p.x = s.x + .5 * l, p.y = s.y + .5 * f, p.z = s.z + .5 * m, u;
    };
    var P = [];
    d.fromRectangle3D = function (t, n, o, u) {
      if (n = r(n, a.WGS84), o = r(o, 0), i(u) || (u = new d()), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
      var s = h.subsample(t, n, o, P);
      return d.fromPoints(s, u);
    }, d.fromVertices = function (t, n, a, o) {
      if (i(o) || (o = new d()), !i(t) || 0 === t.length) return o.center = e.clone(e.ZERO, o.center), o.radius = 0, o;
      n = r(n, e.ZERO), a = r(a, 3);
      var u = R;
      u.x = t[0] + n.x, u.y = t[1] + n.y, u.z = t[2] + n.z;
      var s,
          c = e.clone(u, m),
          l = e.clone(u, p),
          f = e.clone(u, E),
          h = e.clone(u, _),
          N = e.clone(u, y),
          M = e.clone(u, T),
          O = t.length;

      for (s = 0; s < O; s += a) {
        var w = t[s] + n.x,
            C = t[s + 1] + n.y,
            x = t[s + 2] + n.z;
        u.x = w, u.y = C, u.z = x, w < c.x && e.clone(u, c), w > h.x && e.clone(u, h), C < l.y && e.clone(u, l), C > N.y && e.clone(u, N), x < f.z && e.clone(u, f), x > M.z && e.clone(u, M);
      }

      var P = e.magnitudeSquared(e.subtract(h, c, A)),
          U = e.magnitudeSquared(e.subtract(N, l, A)),
          D = e.magnitudeSquared(e.subtract(M, f, A)),
          F = c,
          L = h,
          b = P;
      U > b && (b = U, F = l, L = N), D > b && (b = D, F = f, L = M);
      var B = v;
      B.x = .5 * (F.x + L.x), B.y = .5 * (F.y + L.y), B.z = .5 * (F.z + L.z);
      var z = e.magnitudeSquared(e.subtract(L, B, A)),
          q = Math.sqrt(z),
          G = S;
      G.x = c.x, G.y = l.y, G.z = f.z;
      var V = g;
      V.x = h.x, V.y = N.y, V.z = M.z;
      var W = e.midpoint(G, V, I),
          X = 0;

      for (s = 0; s < O; s += a) {
        u.x = t[s] + n.x, u.y = t[s + 1] + n.y, u.z = t[s + 2] + n.z;
        var H = e.magnitude(e.subtract(u, W, A));
        H > X && (X = H);
        var Y = e.magnitudeSquared(e.subtract(u, B, A));

        if (Y > z) {
          var k = Math.sqrt(Y);
          q = .5 * (q + k), z = q * q;
          var j = k - q;
          B.x = (q * B.x + j * u.x) / k, B.y = (q * B.y + j * u.y) / k, B.z = (q * B.z + j * u.z) / k;
        }
      }

      return q < X ? (e.clone(B, o.center), o.radius = q) : (e.clone(W, o.center), o.radius = X), o;
    }, d.fromEncodedCartesianVertices = function (t, n, r) {
      if (i(r) || (r = new d()), !i(t) || !i(n) || t.length !== n.length || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var a = R;
      a.x = t[0] + n[0], a.y = t[1] + n[1], a.z = t[2] + n[2];
      var o,
          u = e.clone(a, m),
          s = e.clone(a, p),
          c = e.clone(a, E),
          l = e.clone(a, _),
          f = e.clone(a, y),
          h = e.clone(a, T),
          N = t.length;

      for (o = 0; o < N; o += 3) {
        var M = t[o] + n[o],
            O = t[o + 1] + n[o + 1],
            w = t[o + 2] + n[o + 2];
        a.x = M, a.y = O, a.z = w, M < u.x && e.clone(a, u), M > l.x && e.clone(a, l), O < s.y && e.clone(a, s), O > f.y && e.clone(a, f), w < c.z && e.clone(a, c), w > h.z && e.clone(a, h);
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
      var q = g;
      q.x = l.x, q.y = f.y, q.z = h.z;
      var G = e.midpoint(z, q, I),
          V = 0;

      for (o = 0; o < N; o += 3) {
        a.x = t[o] + n[o], a.y = t[o + 1] + n[o + 1], a.z = t[o + 2] + n[o + 2];
        var W = e.magnitude(e.subtract(a, G, A));
        W > V && (V = W);
        var X = e.magnitudeSquared(e.subtract(a, L, A));

        if (X > b) {
          var H = Math.sqrt(X);
          B = .5 * (B + H), b = B * B;
          var Y = H - B;
          L.x = (B * L.x + Y * a.x) / H, L.y = (B * L.y + Y * a.y) / H, L.z = (B * L.z + Y * a.z) / H;
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
    var U = new e();

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
        s = Math.max(s, e.distance(u, c.center, U) + c.radius);
      }

      return n.radius = s, n;
    };

    var D = new e(),
        F = new e(),
        L = new e();
    d.fromOrientedBoundingBox = function (t, n) {
      i(n) || (n = new d());
      var r = t.halfAxes,
          a = l.getColumn(r, 0, D),
          o = l.getColumn(r, 1, F),
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
    var b = new e(),
        B = new e();

    d.union = function (t, n, r) {
      i(r) || (r = new d());
      var a = t.center,
          o = t.radius,
          u = n.center,
          s = n.radius,
          c = e.subtract(u, a, b),
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

    for (var V = new e(), W = new e(), X = new e(), H = new e(), Y = new e(), k = new t(), j = new Array(8), Z = 0; Z < 8; ++Z) {
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
      var f = e.negate(l, Y),
          h = e.negate(c, H),
          m = j,
          p = m[0];
      e.add(s, l, p), e.add(p, c, p), p = m[1], e.add(s, l, p), e.add(p, h, p), p = m[2], e.add(s, f, p), e.add(p, h, p), p = m[3], e.add(s, f, p), e.add(p, c, p), e.negate(s, s), p = m[4], e.add(s, l, p), e.add(p, c, p), p = m[5], e.add(s, l, p), e.add(p, h, p), p = m[6], e.add(s, f, p), e.add(p, h, p), p = m[7], e.add(s, f, p), e.add(p, c, p);

      for (var E = m.length, _ = 0; _ < E; ++_) {
        var y = m[_];
        e.add(o, y, y);
        var T = a.cartesianToCartographic(y, k);
        n.project(T, y);
      }

      i = d.fromPoints(m, i), o = i.center;
      var R = o.x,
          A = o.y,
          v = o.z;
      return o.x = v, o.y = R, o.z = A, i;
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
      return N * e * e * e;
    }, d.prototype.empty = function () {
      return this.radius <= 0;
    }, d;
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
  }), define("Core/EllipsoidalOccluder", ["./BoundingSphere", "./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Rectangle"], function (e, t, n, r, i, a, o) {
    "use strict";

    function u(e, n) {
      this._ellipsoid = e, this._cameraPosition = new t(), this._cameraPositionInScaledSpace = new t(), this._distanceToLimbInScaledSpaceSquared = 0, i(n) && (this.cameraPosition = n);
    }

    function s(e, n, r) {
      var i = e.transformPositionToScaledSpace(n, m),
          a = t.magnitudeSquared(i),
          o = Math.sqrt(a),
          u = t.divideByScalar(i, o, p);
      a = Math.max(1, a), o = Math.max(1, o);
      var s = t.dot(u, r),
          c = t.magnitude(t.cross(u, r, u)),
          l = 1 / o;
      return 1 / (s * l - c * (Math.sqrt(a - 1) * l));
    }

    function c(e, n, r) {
      if (!(n <= 0 || n === 1 / 0 || n !== n)) return t.multiplyByScalar(e, n, r);
    }

    function l(e, n) {
      return t.equals(n, t.ZERO) ? n : (e.transformPositionToScaledSpace(n, E), t.normalize(E, E));
    }

    a(u.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      },
      cameraPosition: {
        get: function get() {
          return this._cameraPosition;
        },
        set: function set(e) {
          var n = this._ellipsoid,
              r = n.transformPositionToScaledSpace(e, this._cameraPositionInScaledSpace),
              i = t.magnitudeSquared(r) - 1;
          t.clone(e, this._cameraPosition), this._cameraPositionInScaledSpace = r, this._distanceToLimbInScaledSpaceSquared = i;
        }
      }
    });
    var f = new t();
    u.prototype.isPointVisible = function (e) {
      var t = this._ellipsoid,
          n = t.transformPositionToScaledSpace(e, f);
      return this.isScaledSpacePointVisible(n);
    }, u.prototype.isScaledSpacePointVisible = function (e) {
      var n = this._cameraPositionInScaledSpace,
          r = this._distanceToLimbInScaledSpaceSquared,
          i = t.subtract(e, n, f),
          a = -t.dot(i, n);
      return !(r < 0 ? a > 0 : a > r && a * a / t.magnitudeSquared(i) > r);
    }, u.prototype.computeHorizonCullingPoint = function (e, n, r) {
      i(r) || (r = new t());

      for (var a = this._ellipsoid, o = l(a, e), u = 0, f = 0, h = n.length; f < h; ++f) {
        var d = n[f],
            m = s(a, d, o);
        u = Math.max(u, m);
      }

      return c(o, u, r);
    };
    var h = new t();

    u.prototype.computeHorizonCullingPointFromVertices = function (e, n, a, o, u) {
      i(u) || (u = new t()), o = r(o, t.ZERO);

      for (var f = this._ellipsoid, d = l(f, e), m = 0, p = 0, E = n.length; p < E; p += a) {
        h.x = n[p] + o.x, h.y = n[p + 1] + o.y, h.z = n[p + 2] + o.z;

        var _ = s(f, h, d);

        m = Math.max(m, _);
      }

      return c(d, m, u);
    };

    var d = [];

    u.prototype.computeHorizonCullingPointFromRectangle = function (n, r, i) {
      var a = o.subsample(n, r, 0, d),
          u = e.fromPoints(a);
      if (!(t.magnitude(u.center) < .1 * r.minimumRadius)) return this.computeHorizonCullingPoint(u.center, a, i);
    };

    var m = new t(),
        p = new t(),
        E = new t();
    return u;
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
          m = o * s - h,
          p = o * c - u * s,
          E = u * c - d,
          _ = 4 * m * E - p * p;

      if (_ < 0) {
        var y, T, R;
        h * f >= l * d ? (y = o, T = m, R = -2 * u * m + o * p) : (y = c, T = E, R = -c * p + 2 * s * E);
        var A = R < 0 ? -1 : 1,
            v = -A * Math.abs(y) * Math.sqrt(-_);
        a = -R + v;
        var S = a / 2,
            g = S < 0 ? -Math.pow(-S, 1 / 3) : Math.pow(S, 1 / 3),
            I = a === v ? -g : -T / g;
        return i = T <= 0 ? g + I : -R / (g * g + I * I + T), h * f >= l * d ? [(i - u) / o] : [-c / (i + s)];
      }

      var N = m,
          M = -2 * u * m + o * p,
          O = E,
          w = -c * p + 2 * s * E,
          C = Math.sqrt(_),
          x = Math.sqrt(3) / 2,
          P = Math.abs(Math.atan2(o * C, -M) / 3);
      i = 2 * Math.sqrt(-N);
      var U = Math.cos(P);
      a = i * U;
      var D = i * (-U / 2 - x * Math.sin(P)),
          F = a + D > 2 * u ? a - u : D - u,
          L = o,
          b = F / L;
      P = Math.abs(Math.atan2(c * C, -w) / 3), i = 2 * Math.sqrt(-O), U = Math.cos(P), a = i * U, D = i * (-U / 2 - x * Math.sin(P));
      var B = -c,
          z = a + D < 2 * s ? a + s : D + s,
          q = B / z,
          G = L * z,
          V = -F * z - L * B,
          W = F * B,
          X = (s * V - u * W) / (-u * V + s * G);
      return b <= X ? b <= q ? X <= q ? [b, X, q] : [b, q, X] : [q, b, X] : b <= q ? [X, b, q] : X <= q ? [X, q, b] : [q, X, b];
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
          var m = r.computeRealRoots(1, s, l);

          if (2 === m.length) {
            var p,
                E = m[0],
                _ = m[1];

            if (E >= 0 && _ >= 0) {
              var y = Math.sqrt(E),
                  T = Math.sqrt(_);
              return [h - T, h - y, h + y, h + T];
            }

            if (E >= 0 && _ < 0) return p = Math.sqrt(E), [h - p, h + p];
            if (E < 0 && _ >= 0) return p = Math.sqrt(_), [h - p, h + p];
          }

          return [];
        }

        if (d > 0) {
          var R = Math.sqrt(d),
              A = (s + d - c / R) / 2,
              v = (s + d + c / R) / 2,
              S = r.computeRealRoots(1, R, A),
              g = r.computeRealRoots(1, -R, v);
          return 0 !== S.length ? (S[0] += h, S[1] += h, 0 !== g.length ? (g[0] += h, g[1] += h, S[1] <= g[0] ? [S[0], S[1], g[0], g[1]] : g[1] <= S[0] ? [g[0], g[1], S[0], S[1]] : S[0] >= g[0] && S[1] <= g[1] ? [g[0], S[0], S[1], g[1]] : g[0] >= S[0] && g[1] <= S[1] ? [S[0], g[0], g[1], S[1]] : S[0] > g[0] && S[0] < g[1] ? [g[0], S[0], g[1], S[1]] : [S[0], g[0], S[1], g[1]]) : S) : 0 !== g.length ? (g[0] += h, g[1] += h, g) : [];
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
        var m,
            p,
            E = d[0],
            _ = i - E,
            y = _ * _,
            T = t / 2,
            R = _ / 2,
            A = y - 4 * o,
            v = y + 4 * Math.abs(o),
            S = c - 4 * E,
            g = c + 4 * Math.abs(E);

        if (E < 0 || A * g < S * v) {
          var I = Math.sqrt(S);
          m = I / 2, p = 0 === I ? 0 : (t * R - a) / I;
        } else {
          var N = Math.sqrt(A);
          m = 0 === N ? 0 : (t * R - a) / N, p = N / 2;
        }

        var M, O;
        0 === T && 0 === m ? (M = 0, O = 0) : n.sign(T) === n.sign(m) ? (M = T + m, O = E / M) : (O = T - m, M = E / O);
        var w, C;
        0 === R && 0 === p ? (w = 0, C = 0) : n.sign(R) === n.sign(p) ? (w = R + p, C = o / w) : (C = R - p, w = o / C);
        var x = r.computeRealRoots(1, M, w),
            P = r.computeRealRoots(1, O, C);
        if (0 !== x.length) return 0 !== P.length ? x[1] <= P[0] ? [x[0], x[1], P[0], P[1]] : P[1] <= x[0] ? [P[0], P[1], x[0], x[1]] : x[0] >= P[0] && x[1] <= P[1] ? [P[0], x[0], x[1], P[1]] : P[0] >= x[0] && P[1] <= x[1] ? [x[0], P[0], P[1], x[1]] : x[0] > P[0] && x[0] < P[1] ? [P[0], x[0], P[1], x[1]] : [x[0], P[0], x[1], P[1]] : x;
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
          l = e.subtract(o, s, y),
          h = e.dot(u, u),
          d = 2 * e.dot(u, l),
          m = e.magnitudeSquared(l) - c,
          p = f(h, d, m, v);
      if (r(p)) return i.start = p.root0, i.stop = p.root1, i;
    }

    function d(e, t, n) {
      var r = e + t;
      return o.sign(e) !== o.sign(t) && Math.abs(r / Math.max(Math.abs(e), Math.abs(t))) < n ? 0 : r;
    }

    function m(t, n, r, i, a) {
      var l,
          f = i * i,
          h = a * a,
          m = (t[u.COLUMN1ROW1] - t[u.COLUMN2ROW2]) * h,
          p = a * (i * d(t[u.COLUMN1ROW0], t[u.COLUMN0ROW1], o.EPSILON15) + n.y),
          E = t[u.COLUMN0ROW0] * f + t[u.COLUMN2ROW2] * h + i * n.x + r,
          _ = h * d(t[u.COLUMN2ROW1], t[u.COLUMN1ROW2], o.EPSILON15),
          y = a * (i * d(t[u.COLUMN2ROW0], t[u.COLUMN0ROW2]) + n.z),
          T = [];

      if (0 === y && 0 === _) {
        if (l = s.computeRealRoots(m, p, E), 0 === l.length) return T;
        var R = l[0],
            A = Math.sqrt(Math.max(1 - R * R, 0));

        if (T.push(new e(i, a * R, a * -A)), T.push(new e(i, a * R, a * A)), 2 === l.length) {
          var v = l[1],
              S = Math.sqrt(Math.max(1 - v * v, 0));
          T.push(new e(i, a * v, a * -S)), T.push(new e(i, a * v, a * S));
        }

        return T;
      }

      var g = y * y,
          I = _ * _,
          N = m * m,
          M = y * _,
          O = N + I,
          w = 2 * (p * m + M),
          C = 2 * E * m + p * p - I + g,
          x = 2 * (E * p - M),
          P = E * E - g;
      if (0 === O && 0 === w && 0 === C && 0 === x) return T;
      l = c.computeRealRoots(O, w, C, x, P);
      var U = l.length;
      if (0 === U) return T;

      for (var D = 0; D < U; ++D) {
        var F,
            L = l[D],
            b = L * L,
            B = Math.max(1 - b, 0),
            z = Math.sqrt(B);
        F = o.sign(m) === o.sign(E) ? d(m * b + E, p * L, o.EPSILON12) : o.sign(E) === o.sign(p * L) ? d(m * b, p * L + E, o.EPSILON12) : d(m * b + p * L, E, o.EPSILON12);
        var q = d(_ * L, y, o.EPSILON15),
            G = F * q;
        G < 0 ? T.push(new e(i, a * L, a * z)) : G > 0 ? T.push(new e(i, a * L, a * -z)) : 0 !== z ? (T.push(new e(i, a * L, a * -z)), T.push(new e(i, a * L, a * z)), ++D) : T.push(new e(i, a * L, a * z));
      }

      return T;
    }

    var p = {};

    p.rayPlane = function (t, n, i) {
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

    var E = new e(),
        _ = new e(),
        y = new e(),
        T = new e(),
        R = new e();

    p.rayTriangleParametric = function (t, r, i, a, u) {
      u = n(u, !1);
      var s,
          c,
          l,
          f,
          h,
          d = t.origin,
          m = t.direction,
          p = e.subtract(i, r, E),
          A = e.subtract(a, r, _),
          v = e.cross(m, A, y),
          S = e.dot(p, v);

      if (u) {
        if (S < o.EPSILON6) return;
        if (s = e.subtract(d, r, T), (l = e.dot(s, v)) < 0 || l > S) return;
        if (c = e.cross(s, p, R), (f = e.dot(m, c)) < 0 || l + f > S) return;
        h = e.dot(A, c) / S;
      } else {
        if (Math.abs(S) < o.EPSILON6) return;
        var g = 1 / S;
        if (s = e.subtract(d, r, T), (l = e.dot(s, v) * g) < 0 || l > 1) return;
        if (c = e.cross(s, p, R), (f = e.dot(m, c) * g) < 0 || l + f > 1) return;
        h = e.dot(A, c) * g;
      }

      return h;
    }, p.rayTriangle = function (t, n, i, a, o, u) {
      var s = p.rayTriangleParametric(t, n, i, a, o);
      if (r(s) && !(s < 0)) return r(u) || (u = new e()), e.multiplyByScalar(t.direction, s, u), e.add(t.origin, u, u);
    };
    var A = new l();

    p.lineSegmentTriangle = function (t, n, i, a, o, u, s) {
      var c = A;
      e.clone(t, c.origin), e.subtract(n, t, c.direction), e.normalize(c.direction, c.direction);
      var l = p.rayTriangleParametric(c, i, a, o, u);
      if (!(!r(l) || l < 0 || l > e.distance(t, n))) return r(s) || (s = new e()), e.multiplyByScalar(c.direction, l, s), e.add(c.origin, s, s);
    };

    var v = {
      root0: 0,
      root1: 0
    };

    p.raySphere = function (e, t, n) {
      if (n = h(e, t, n), r(n) && !(n.stop < 0)) return n.start = Math.max(n.start, 0), n;
    };

    var S = new l();

    p.lineSegmentSphere = function (t, n, i, a) {
      var o = S;
      e.clone(t, o.origin);
      var u = e.subtract(n, t, o.direction),
          s = e.magnitude(u);
      if (e.normalize(u, u), a = h(o, i, a), !(!r(a) || a.stop < 0 || a.start > s)) return a.start = Math.max(a.start, 0), a.stop = Math.min(a.stop, s), a;
    };

    var g = new e(),
        I = new e();

    p.rayEllipsoid = function (t, n) {
      var r,
          i,
          o,
          u,
          s,
          c = n.oneOverRadii,
          l = e.multiplyComponents(c, t.origin, g),
          f = e.multiplyComponents(c, t.direction, I),
          h = e.magnitudeSquared(l),
          d = e.dot(l, f);

      if (h > 1) {
        if (d >= 0) return;
        var m = d * d;
        if (r = h - 1, i = e.magnitudeSquared(f), o = i * r, m < o) return;

        if (m > o) {
          u = d * d - o, s = -d + Math.sqrt(u);
          var p = s / i,
              E = r / s;
          return p < E ? new a(p, E) : {
            start: E,
            stop: p
          };
        }

        var _ = Math.sqrt(r / i);

        return new a(_, _);
      }

      return h < 1 ? (r = h - 1, i = e.magnitudeSquared(f), o = i * r, u = d * d - o, s = -d + Math.sqrt(u), new a(0, s / i)) : d < 0 ? (i = e.magnitudeSquared(f), new a(0, -d / i)) : void 0;
    };

    var N = new e(),
        M = new e(),
        O = new e(),
        w = new e(),
        C = new e(),
        x = new u(),
        P = new u(),
        U = new u(),
        D = new u(),
        F = new u(),
        L = new u(),
        b = new u(),
        B = new e(),
        z = new e(),
        q = new t();

    p.grazingAltitudeLocation = function (t, n) {
      var i = t.origin,
          a = t.direction;

      if (!e.equals(i, e.ZERO)) {
        var s = n.geodeticSurfaceNormal(i, N);
        if (e.dot(a, s) >= 0) return i;
      }

      var c = r(this.rayEllipsoid(t, n)),
          l = n.transformPositionToScaledSpace(a, N),
          f = e.normalize(l, l),
          h = e.mostOrthogonalAxis(l, w),
          d = e.normalize(e.cross(h, f, M), M),
          p = e.normalize(e.cross(f, d, O), O),
          E = x;
      E[0] = f.x, E[1] = f.y, E[2] = f.z, E[3] = d.x, E[4] = d.y, E[5] = d.z, E[6] = p.x, E[7] = p.y, E[8] = p.z;

      var _ = u.transpose(E, P),
          y = u.fromScale(n.radii, U),
          T = u.fromScale(n.oneOverRadii, D),
          R = F;

      R[0] = 0, R[1] = -a.z, R[2] = a.y, R[3] = a.z, R[4] = 0, R[5] = -a.x, R[6] = -a.y, R[7] = a.x, R[8] = 0;
      var A,
          v,
          S = u.multiply(u.multiply(_, T, L), R, L),
          g = u.multiply(u.multiply(S, y, b), E, b),
          I = u.multiplyByVector(S, i, C),
          G = m(g, e.negate(I, N), 0, 0, 1),
          V = G.length;

      if (V > 0) {
        for (var W = e.clone(e.ZERO, z), X = Number.NEGATIVE_INFINITY, H = 0; H < V; ++H) {
          A = u.multiplyByVector(y, u.multiplyByVector(E, G[H], B), B);
          var Y = e.normalize(e.subtract(A, i, w), w),
              k = e.dot(Y, a);
          k > X && (X = k, W = e.clone(A, W));
        }

        var j = n.cartesianToCartographic(W, q);
        return X = o.clamp(X, 0, 1), v = e.magnitude(e.subtract(W, i, w)) * Math.sqrt(1 - X * X), v = c ? -v : v, j.height = v, n.cartographicToCartesian(j, new e());
      }
    };

    var G = new e();
    return p.lineSegmentPlane = function (t, n, i, a) {
      r(a) || (a = new e());
      var u = e.subtract(n, t, G),
          s = i.normal,
          c = e.dot(s, u);

      if (!(Math.abs(c) < o.EPSILON6)) {
        var l = e.dot(s, t),
            f = -(i.distance + l) / c;
        if (!(f < 0 || f > 1)) return e.multiplyByScalar(u, f, a), e.add(t, a, a), a;
      }
    }, p.trianglePlaneIntersection = function (t, n, r, i) {
      var a = i.normal,
          o = i.distance,
          u = e.dot(a, t) + o < 0,
          s = e.dot(a, n) + o < 0,
          c = e.dot(a, r) + o < 0,
          l = 0;
      l += u ? 1 : 0, l += s ? 1 : 0, l += c ? 1 : 0;
      var f, h;

      if (1 !== l && 2 !== l || (f = new e(), h = new e()), 1 === l) {
        if (u) return p.lineSegmentPlane(t, n, i, f), p.lineSegmentPlane(t, r, i, h), {
          positions: [t, n, r, f, h],
          indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
        };
        if (s) return p.lineSegmentPlane(n, r, i, f), p.lineSegmentPlane(n, t, i, h), {
          positions: [t, n, r, f, h],
          indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
        };
        if (c) return p.lineSegmentPlane(r, t, i, f), p.lineSegmentPlane(r, n, i, h), {
          positions: [t, n, r, f, h],
          indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
        };
      } else if (2 === l) {
        if (!u) return p.lineSegmentPlane(n, t, i, f), p.lineSegmentPlane(r, t, i, h), {
          positions: [t, n, r, f, h],
          indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
        };
        if (!s) return p.lineSegmentPlane(r, n, i, f), p.lineSegmentPlane(t, n, i, h), {
          positions: [t, n, r, f, h],
          indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
        };
        if (!c) return p.lineSegmentPlane(t, r, i, f), p.lineSegmentPlane(n, r, i, h), {
          positions: [t, n, r, f, h],
          indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
        };
      }
    }, p;
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
          return _m(e);
        }

        function i(e) {
          return _m(a(e));
        }

        function u(e) {
          return d(e);
        }

        var s, c, l, f, h, d, _m;

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
          return p(f, e), e;
        }, _m = function m(e) {
          return e = t(e), h = e.then, _m = t, d = _, p(l, e), f = l = A, e;
        }, s;
      }

      function u(e) {
        return e && "function" == typeof e.then;
      }

      function s(t, n, r, i, a) {
        return E(2, arguments), e(t, function (t) {
          function u(e) {
            _p(e);
          }

          function s(e) {
            _m2(e);
          }

          var c, l, f, h, d, _m2, _p, E, y, T;

          if (y = t.length >>> 0, c = Math.max(0, Math.min(n, y)), f = [], l = y - c + 1, h = [], d = o(), c) for (E = d.progress, _p = function p(e) {
            h.push(e), --l || (_m2 = _p = _, d.reject(h));
          }, _m2 = function m(e) {
            f.push(e), --c || (_m2 = _p = _, d.resolve(f));
          }, T = 0; T < y; ++T) {
            T in t && e(t[T], s, u, E);
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
        return E(1, arguments), h(e, y).then(t, n, r);
      }

      function f() {
        return h(arguments, y);
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
        var r = R.call(arguments, 1);
        return e(t, function (t) {
          var i;
          return i = t.length, r[0] = function (t, r, a) {
            return e(t, function (t) {
              return e(r, function (e) {
                return n(t, e, a, i);
              });
            });
          }, T.apply(t, r);
        });
      }

      function m(t, n, r) {
        var i = arguments.length > 2;
        return e(t, function (e) {
          return e = i ? r : e, n.resolve(e), e;
        }, function (e) {
          return n.reject(e), a(e);
        }, n.progress);
      }

      function p(e, t) {
        for (var n, r = 0; n = e[r++];) {
          n(t);
        }
      }

      function E(e, t) {
        for (var n, r = t.length; r > e;) {
          if (null != (n = t[--r]) && "function" != typeof n) throw new Error("arg " + r + " must be a function");
        }
      }

      function _() {}

      function y(e) {
        return e;
      }

      var T, R, A;
      return e.defer = o, e.resolve = t, e.reject = n, e.join = f, e.all = l, e.map = h, e.reduce = d, e.any = c, e.some = s, e.chain = m, e.isPromise = u, r.prototype = {
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
        var d, m, p, E, _;

        if ("%%" == e) return "%";

        for (var y = !1, T = "", R = !1, A = !1, v = " ", S = _s.length, g = 0; _s && g < S; g++) {
          switch (_s.charAt(g)) {
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
              v = _s.charAt(g + 1);
              break;

            case "0":
              R = !0;
              break;

            case "#":
              A = !0;
          }
        }

        if (c = c ? "*" == c ? +t[n++] : "*" == c.charAt(0) ? +t[c.slice(1, -1)] : +c : 0, c < 0 && (c = -c, y = !0), !isFinite(c)) throw new Error("sprintf: (minimum-)width must be finite");

        switch (f = f ? "*" == f ? +t[n++] : "*" == f.charAt(0) ? +t[f.slice(1, -1)] : +f : "fFeE".indexOf(h) > -1 ? 6 : "d" == h ? 0 : void 0, _ = r ? t[r.slice(0, -1)] : t[n++], h) {
          case "s":
            return u(String(_), y, c, f, R, v);

          case "c":
            return u(String.fromCharCode(+_), y, c, f, R);

          case "b":
            return o(_, 2, A, y, c, f, R);

          case "o":
            return o(_, 8, A, y, c, f, R);

          case "x":
            return o(_, 16, A, y, c, f, R);

          case "X":
            return o(_, 16, A, y, c, f, R).toUpperCase();

          case "u":
            return o(_, 10, A, y, c, f, R);

          case "i":
          case "d":
            return d = +_ || 0, d = Math.round(d - d % 1), m = d < 0 ? "-" : T, _ = m + i(String(Math.abs(d)), f, "0", !1), a(_, m, y, c, R);

          case "e":
          case "E":
          case "f":
          case "F":
          case "g":
          case "G":
            return d = +_, m = d < 0 ? "-" : T, p = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(h.toLowerCase())], E = ["toString", "toUpperCase"]["eEfFgG".indexOf(h) % 2], _ = m + Math.abs(d)[p](f), a(_, m, y, c, R)[E]();

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
      return p.compare(e.julianDate, t.julianDate);
    }

    function f(e) {
      y.julianDate = e;
      var n = p.leapSeconds,
          r = t(n, y, l);
      r < 0 && (r = ~r), r >= n.length && (r = n.length - 1);
      var i = n[r].offset;

      if (r > 0) {
        p.secondsDifference(n[r].julianDate, e) > i && (r--, i = n[r].offset);
      }

      p.addSeconds(e, i, e);
    }

    function h(e, n) {
      y.julianDate = e;
      var r = p.leapSeconds,
          i = t(r, y, l);
      if (i < 0 && (i = ~i), 0 === i) return p.addSeconds(e, -r[0].offset, n);
      if (i >= r.length) return p.addSeconds(e, -r[i - 1].offset, n);
      var a = p.secondsDifference(r[i].julianDate, e);
      return 0 === a ? p.addSeconds(e, -r[i].offset, n) : a <= 1 ? void 0 : p.addSeconds(e, -r[--i].offset, n);
    }

    function d(e, t, n) {
      var r = t / s.SECONDS_PER_DAY | 0;
      return e += r, t -= s.SECONDS_PER_DAY * r, t < 0 && (e--, t += s.SECONDS_PER_DAY), n.dayNumber = e, n.secondsOfDay = t, n;
    }

    function m(e, t, n, r, i, a, o) {
      var u = (t - 14) / 12 | 0,
          c = e + 4800 + u,
          l = (1461 * c / 4 | 0) + (367 * (t - 2 - 12 * u) / 12 | 0) - (3 * ((c + 100) / 100 | 0) / 4 | 0) + n - 32075;
      (r -= 12) < 0 && (r += 24);
      var f = a + (r * s.SECONDS_PER_HOUR + i * s.SECONDS_PER_MINUTE + o * s.SECONDS_PER_MILLISECOND);
      return f >= 43200 && (l -= 1), [l, f];
    }

    function p(e, t, r) {
      this.dayNumber = void 0, this.secondsOfDay = void 0, e = n(e, 0), t = n(t, 0), r = n(r, c.UTC);
      var i = 0 | e;
      t += (e - i) * s.SECONDS_PER_DAY, d(i, t, this), r === c.UTC && f(this);
    }

    var E = new a(),
        _ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        y = new u(),
        T = /^(\d{4})$/,
        R = /^(\d{4})-(\d{2})$/,
        A = /^(\d{4})-?(\d{3})$/,
        v = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
        S = /^(\d{4})-?(\d{2})-?(\d{2})$/,
        g = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
        I = /^(\d{2})(\.\d+)?/.source + g.source,
        N = /^(\d{2}):?(\d{2})(\.\d+)?/.source + g.source,
        M = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + g.source;
    p.fromGregorianDate = function (e, t) {
      var n = m(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
      return r(t) ? (d(n[0], n[1], t), f(t), t) : new p(n[0], n[1], c.UTC);
    }, p.fromDate = function (e, t) {
      var n = m(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
      return r(t) ? (d(n[0], n[1], t), f(t), t) : new p(n[0], n[1], c.UTC);
    }, p.fromIso8601 = function (e, t) {
      e = e.replace(",", ".");
      var n,
          i,
          a,
          u = e.split("T"),
          s = 1,
          l = 1,
          h = 0,
          E = 0,
          y = 0,
          g = 0,
          O = u[0],
          w = u[1];
      if (null !== (u = O.match(S))) n = +u[1], s = +u[2], l = +u[3];else if (null !== (u = O.match(R))) n = +u[1], s = +u[2];else if (null !== (u = O.match(T))) n = +u[1];else {
        var C;
        if (null !== (u = O.match(A))) n = +u[1], C = +u[2], a = o(n);else if (null !== (u = O.match(v))) {
          n = +u[1];
          var x = +u[2],
              P = +u[3] || 0,
              U = new Date(Date.UTC(n, 0, 4));
          C = 7 * x + P - U.getUTCDay() - 3;
        }
        i = new Date(Date.UTC(n, 0, 1)), i.setUTCDate(C), s = i.getUTCMonth() + 1, l = i.getUTCDate();
      }
      a = o(n);
      var D;

      if (r(w)) {
        u = w.match(M), null !== u ? (h = +u[1], E = +u[2], y = +u[3], g = 1e3 * +(u[4] || 0), D = 5) : (u = w.match(N), null !== u ? (h = +u[1], E = +u[2], y = 60 * +(u[3] || 0), D = 4) : null !== (u = w.match(I)) && (h = +u[1], E = 60 * +(u[2] || 0), D = 3));
        var F = u[D],
            L = +u[D + 1],
            b = +(u[D + 2] || 0);

        switch (F) {
          case "+":
            h -= L, E -= b;
            break;

          case "-":
            h += L, E += b;
            break;

          case "Z":
            break;

          default:
            E += new Date(Date.UTC(n, s - 1, l, h, E)).getTimezoneOffset();
        }
      }

      var B = 60 === y;

      for (B && y--; E >= 60;) {
        E -= 60, h++;
      }

      for (; h >= 24;) {
        h -= 24, l++;
      }

      for (i = a && 2 === s ? 29 : _[s - 1]; l > i;) {
        l -= i, s++, s > 12 && (s -= 12, n++), i = a && 2 === s ? 29 : _[s - 1];
      }

      for (; E < 0;) {
        E += 60, h--;
      }

      for (; h < 0;) {
        h += 24, l--;
      }

      for (; l < 1;) {
        s--, s < 1 && (s += 12, n--), i = a && 2 === s ? 29 : _[s - 1], l += i;
      }

      var z = m(n, s, l, h, E, y, g);
      return r(t) ? (d(z[0], z[1], t), f(t)) : t = new p(z[0], z[1], c.UTC), B && p.addSeconds(t, 1, t), t;
    }, p.now = function (e) {
      return p.fromDate(new Date(), e);
    };
    var O = new p(0, 0, c.TAI);
    return p.toGregorianDate = function (e, t) {
      var n = !1,
          i = h(e, O);
      r(i) || (p.addSeconds(e, -1, O), i = h(O, O), n = !0);
      var o = i.dayNumber,
          u = i.secondsOfDay;
      u >= 43200 && (o += 1);
      var c = o + 68569 | 0,
          l = 4 * c / 146097 | 0;
      c = c - ((146097 * l + 3) / 4 | 0) | 0;
      var f = 4e3 * (c + 1) / 1461001 | 0;
      c = c - (1461 * f / 4 | 0) + 31 | 0;
      var d = 80 * c / 2447 | 0,
          m = c - (2447 * d / 80 | 0) | 0;
      c = d / 11 | 0;

      var E = d + 2 - 12 * c | 0,
          _ = 100 * (l - 49) + f + c | 0,
          y = u / s.SECONDS_PER_HOUR | 0,
          T = u - y * s.SECONDS_PER_HOUR,
          R = T / s.SECONDS_PER_MINUTE | 0;

      T -= R * s.SECONDS_PER_MINUTE;
      var A = 0 | T,
          v = (T - A) / s.SECONDS_PER_MILLISECOND;
      return y += 12, y > 23 && (y -= 24), n && (A += 1), r(t) ? (t.year = _, t.month = E, t.day = m, t.hour = y, t.minute = R, t.second = A, t.millisecond = v, t.isLeapSecond = n, t) : new a(_, E, m, y, R, A, v, n);
    }, p.toDate = function (e) {
      var t = p.toGregorianDate(e, E),
          n = t.second;
      return t.isLeapSecond && (n -= 1), new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, n, t.millisecond));
    }, p.toIso8601 = function (t, n) {
      var i = p.toGregorianDate(t, E),
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
    }, p.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.dayNumber = e.dayNumber, t.secondsOfDay = e.secondsOfDay, t) : new p(e.dayNumber, e.secondsOfDay, c.TAI);
    }, p.compare = function (e, t) {
      var n = e.dayNumber - t.dayNumber;
      return 0 !== n ? n : e.secondsOfDay - t.secondsOfDay;
    }, p.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
    }, p.equalsEpsilon = function (e, t, n) {
      return e === t || r(e) && r(t) && Math.abs(p.secondsDifference(e, t)) <= n;
    }, p.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / s.SECONDS_PER_DAY;
    }, p.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * s.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
    }, p.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / s.SECONDS_PER_DAY;
    }, p.computeTaiMinusUtc = function (e) {
      y.julianDate = e;
      var n = p.leapSeconds,
          r = t(n, y, l);
      return r < 0 && (r = ~r, --r < 0 && (r = 0)), n[r].offset;
    }, p.addSeconds = function (e, t, n) {
      return d(e.dayNumber, e.secondsOfDay + t, n);
    }, p.addMinutes = function (e, t, n) {
      var r = e.secondsOfDay + t * s.SECONDS_PER_MINUTE;
      return d(e.dayNumber, r, n);
    }, p.addHours = function (e, t, n) {
      var r = e.secondsOfDay + t * s.SECONDS_PER_HOUR;
      return d(e.dayNumber, r, n);
    }, p.addDays = function (e, t, n) {
      return d(e.dayNumber + t, e.secondsOfDay, n);
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
    }, p.leapSeconds = [new u(new p(2441317, 43210, c.TAI), 10), new u(new p(2441499, 43211, c.TAI), 11), new u(new p(2441683, 43212, c.TAI), 12), new u(new p(2442048, 43213, c.TAI), 13), new u(new p(2442413, 43214, c.TAI), 14), new u(new p(2442778, 43215, c.TAI), 15), new u(new p(2443144, 43216, c.TAI), 16), new u(new p(2443509, 43217, c.TAI), 17), new u(new p(2443874, 43218, c.TAI), 18), new u(new p(2444239, 43219, c.TAI), 19), new u(new p(2444786, 43220, c.TAI), 20), new u(new p(2445151, 43221, c.TAI), 21), new u(new p(2445516, 43222, c.TAI), 22), new u(new p(2446247, 43223, c.TAI), 23), new u(new p(2447161, 43224, c.TAI), 24), new u(new p(2447892, 43225, c.TAI), 25), new u(new p(2448257, 43226, c.TAI), 26), new u(new p(2448804, 43227, c.TAI), 27), new u(new p(2449169, 43228, c.TAI), 28), new u(new p(2449534, 43229, c.TAI), 29), new u(new p(2450083, 43230, c.TAI), 30), new u(new p(2450630, 43231, c.TAI), 31), new u(new p(2451179, 43232, c.TAI), 32), new u(new p(2453736, 43233, c.TAI), 33), new u(new p(2454832, 43234, c.TAI), 34), new u(new p(2456109, 43235, c.TAI), 35), new u(new p(2457204, 43236, c.TAI), 36), new u(new p(2457754, 43237, c.TAI), 37)], p;
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

    function m(e) {
      var t = r(h.requestsByServer[e], h.maximumRequestsPerServer);
      return I[e] < t;
    }

    function p(e) {
      return e.state === l.UNISSUED && (e.state = l.ISSUED, e.deferred = t.defer()), e.deferred.promise;
    }

    function E(e) {
      return function (t) {
        e.state !== l.CANCELLED && (--A.numberOfActiveRequests, --I[e.serverKey], M.raiseEvent(), e.state = l.RECEIVED, e.deferred.resolve(t));
      };
    }

    function _(e) {
      return function (t) {
        e.state !== l.CANCELLED && (++A.numberOfFailedRequests, --A.numberOfActiveRequests, --I[e.serverKey], M.raiseEvent(t), e.state = l.FAILED, e.deferred.reject(t));
      };
    }

    function y(e) {
      var t = p(e);
      return e.state = l.ACTIVE, g.push(e), ++A.numberOfActiveRequests, ++A.numberOfActiveRequestsEver, ++I[e.serverKey], e.requestFunction().then(E(e)).otherwise(_(e)), t;
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
    var g = [],
        I = {},
        N = "undefined" != typeof document ? new e(document.location.href) : new e(),
        M = new o();
    return h.maximumRequests = 50, h.maximumRequestsPerServer = 6, h.requestsByServer = {
      "api.pgEarth.com:443": 18,
      "assets.pgEarth.com:443": 18
    }, h.throttleRequests = !0, h.debugShowStatistics = !1, h.requestCompletedEvent = M, a(h, {
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
          n = 0,
          r = g.length;

      for (e = 0; e < r; ++e) {
        t = g[e], t.cancelled && T(t), t.state === l.ACTIVE ? n > 0 && (g[e - n] = t) : ++n;
      }

      g.length -= n;
      var i = S.internalArray,
          a = S.length;

      for (e = 0; e < a; ++e) {
        d(i[e]);
      }

      S.resort();

      for (var o = Math.max(h.maximumRequests - g.length, 0), u = 0; u < o && S.length > 0;) {
        t = S.pop(), t.cancelled ? T(t) : !t.throttleByServer || m(t.serverKey) ? (y(t), ++u) : T(t);
      }

      R();
    }, h.getServerKey = function (t) {
      var n = new e(t).resolve(N);
      n.normalize();
      var r = n.authority;
      /:/.test(r) || (r = r + ":" + ("https" === n.scheme ? "443" : "80"));
      var a = I[r];
      return i(a) || (I[r] = 0), r;
    }, h.request = function (e) {
      if (c(e.url) || s(e.url)) return M.raiseEvent(), e.state = l.RECEIVED, e.requestFunction();

      if (++A.numberOfAttemptedRequests, i(e.serverKey) || (e.serverKey = h.getServerKey(e.url)), !e.throttleByServer || m(e.serverKey)) {
        if (!h.throttleRequests || !e.throttle) return y(e);

        if (!(g.length >= h.maximumRequests)) {
          d(e);
          var t = S.insert(e);

          if (i(t)) {
            if (t === e) return;
            T(t);
          }

          return p(e);
        }
      }
    }, h.clearForSpecs = function () {
      for (; S.length > 0;) {
        T(S.pop());
      }

      for (var e = g.length, t = 0; t < e; ++t) {
        T(g[t]);
      }

      g.length = 0, I = {}, A.numberOfAttemptedRequests = 0, A.numberOfActiveRequests = 0, A.numberOfCancelledRequests = 0, A.numberOfCancelledActiveRequests = 0, A.numberOfFailedRequests = 0, A.numberOfActiveRequestsEver = 0, A.lastNumberOfActiveRequests = 0;
    }, h.numberOfActiveRequestsByServer = function (e) {
      return I[e];
    }, h.requestHeap = S, h;
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
  }), define("Core/Resource", ["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, m, p, E, _, y, T, R, A, v, S, g, I) {
    "use strict";

    function N(e, t, n, r) {
      var i = e.query;
      if (!u(i) || 0 === i.length) return {};
      var a;

      if (-1 === i.indexOf("=")) {
        var o = {};
        o[i] = void 0, a = o;
      } else a = T(i);

      t._queryParameters = n ? C(a, t._queryParameters, r) : a, e.query = void 0;
    }

    function M(e, t) {
      var n = t._queryParameters,
          r = Object.keys(n);
      1 !== r.length || u(n[r[0]]) ? e.query = y(n) : e.query = r[0];
    }

    function O(e, t) {
      return u(e) ? u(e.clone) ? e.clone() : i(e) : t;
    }

    function w(e) {
      if (e.state === S.ISSUED || e.state === S.ACTIVE) throw new g("The Resource is already being fetched.");
      e.state = S.UNISSUED, e.deferred = void 0;
    }

    function C(e, t, n) {
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

    function x(t) {
      t = o(t, o.EMPTY_OBJECT), "string" == typeof t && (t = {
        url: t
      }), this._url = void 0, this._templateValues = O(t.templateValues, {}), this._queryParameters = O(t.queryParameters, {}), this.headers = O(t.headers, {}), this.request = o(t.request, new R()), this.proxy = t.proxy, this.retryCallback = t.retryCallback, this.retryAttempts = o(t.retryAttempts, 0), this._retryCount = 0;
      var n = new e(t.url);
      N(n, this, !0, !0), n.fragment = void 0, this._url = n.toString();
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
        return x._Implementations.createImage(e, a, o, r, i), o.promise;
      };
      var o = v.request(a);
      if (u(o)) return o.otherwise(function (e) {
        return a.state !== S.FAILED ? t.reject(e) : n.retryOnError(e).then(function (o) {
          return o ? (a.state = S.UNISSUED, a.deferred = void 0, P({
            resource: n,
            flipY: r,
            preferImageBitmap: i
          })) : t.reject(e);
        });
      });
    }

    function U(e, n, r) {
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
        }, x._Implementations.loadAndExecuteScript(e.url, r, n), n.promise;
      };
      var o = v.request(a);
      if (u(o)) return o.otherwise(function (i) {
        return a.state !== S.FAILED ? t.reject(i) : e.retryOnError(i).then(function (o) {
          return o ? (a.state = S.UNISSUED, a.deferred = void 0, U(e, n, r)) : t.reject(i);
        });
      });
    }

    function D(e, t) {
      var n = decodeURIComponent(t);
      return e ? atob(n) : n;
    }

    function F(e, t) {
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
          return F(r, i);

        case "blob":
          var a = F(r, i);
          return new Blob([a], {
            type: n
          });

        case "document":
          return new DOMParser().parseFromString(D(r, i), n);

        case "json":
          return JSON.parse(D(r, i));
      }
    }

    function b(e, t, n) {
      var r = new Image();
      r.onload = function () {
        n.resolve(r);
      }, r.onerror = function (e) {
        n.reject(e);
      }, t && (I.contains(e) ? r.crossOrigin = "use-credentials" : r.crossOrigin = ""), r.src = e;
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
        if (e.statusCode < 200 || e.statusCode >= 300) return void a.reject(new A(e.statusCode, e, e.headers));
        var n = [];
        e.on("data", function (e) {
          n.push(e);
        }), e.on("end", function () {
          var r = Buffer.concat(n);
          "gzip" === e.headers["content-encoding"] ? l.gunzip(r, function (e, n) {
            e ? a.reject(new g("Error decompressing response.")) : a.resolve(B(n, t));
          }) : a.resolve(B(r, t));
        });
      }).on("error", function (e) {
        a.reject(new A());
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
          var n = new e(t);
          N(n, this, !1), n.fragment = void 0, this._url = n.toString();
        }
      },
      extension: {
        get: function get() {
          return d(this._url);
        }
      },
      isDataUri: {
        get: function get() {
          return E(this._url);
        }
      },
      isBlobUri: {
        get: function get() {
          return m(this._url);
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
    }), x.prototype.getUrlComponent = function (t, n) {
      if (this.isDataUri) return this._url;
      var r = new e(this._url);
      t && M(r, this);
      var i = r.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
          a = this._templateValues;
      return i = i.replace(/{(.*?)}/g, function (e, t) {
        var n = a[t];
        return u(n) ? encodeURIComponent(n) : e;
      }), n && u(this.proxy) && (i = this.proxy.getURL(i)), i;
    }, x.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t ? C(this._queryParameters, e, !1) : C(e, this._queryParameters, !1);
    }, x.prototype.appendQueryParameters = function (e) {
      this._queryParameters = C(e, this._queryParameters, !0);
    }, x.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t ? a(this._templateValues, e) : a(e, this._templateValues);
    }, x.prototype.getDerivedResource = function (t) {
      var n = this.clone();

      if (n._retryCount = 0, u(t.url)) {
        var r = new e(t.url);
        N(r, n, !0, o(t.preserveQueryParameters, !1)), r.fragment = void 0, n._url = r.resolve(new e(f(this._url))).toString();
      }

      return u(t.queryParameters) && (n._queryParameters = a(t.queryParameters, n._queryParameters)), u(t.templateValues) && (n._templateValues = a(t.templateValues, n.templateValues)), u(t.headers) && (n.headers = a(t.headers, n.headers)), u(t.proxy) && (n.proxy = t.proxy), u(t.request) && (n.request = t.request), u(t.retryCallback) && (n.retryCallback = t.retryCallback), u(t.retryAttempts) && (n.retryAttempts = t.retryAttempts), n;
    }, x.prototype.retryOnError = function (e) {
      var n = this.retryCallback;
      if ("function" != typeof n || this._retryCount >= this.retryAttempts) return t(!1);
      var r = this;
      return t(n(this, e)).then(function (e) {
        return ++r._retryCount, e;
      });
    }, x.prototype.clone = function (e) {
      return u(e) || (e = new x({
        url: this._url
      })), e._url = this._url, e._queryParameters = i(this._queryParameters), e._templateValues = i(this._templateValues), e.headers = i(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
    }, x.prototype.getBaseUri = function (e) {
      return h(this.getUrlComponent(e), e);
    }, x.prototype.appendForwardSlash = function () {
      this._url = n(this._url);
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
      e = o(e, o.EMPTY_OBJECT);
      var n = o(e.preferImageBitmap, !1),
          r = o(e.preferBlob, !1),
          i = o(e.flipY, !1);
      if (w(this.request), !q || this.isDataUri || this.isBlobUri || !this.hasHeaders && !r) return P({
        resource: this,
        flipY: i,
        preferImageBitmap: n
      });
      var a = this.fetchBlob();

      if (u(a)) {
        var s, c, l, f;
        return x.supportsImageBitmapOptions().then(function (e) {
          return s = e, c = s && n, a;
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
      e = o(e, "callback"), w(this.request);
      var t;

      do {
        t = "loadJsonp" + Math.random().toString().substring(2, 8);
      } while (u(window[t]));

      return U(this, e, t);
    }, x.fetchJsonp = function (e) {
      return new x(e).fetchJsonp(e.callbackParameterName);
    }, x.prototype._makeRequest = function (e) {
      var n = this;
      w(n.request);
      var r = n.request;
      r.url = n.url, r.requestFunction = function () {
        var i = e.responseType,
            o = a(e.headers, n.headers),
            s = e.overrideMimeType,
            c = e.method,
            l = e.data,
            f = t.defer(),
            h = x._Implementations.loadWithXhr(n.url, i, c, l, o, f, s);

        return u(h) && u(h.abort) && (r.cancelFunction = function () {
          h.abort();
        }), f.promise;
      };
      var i = v.request(r);
      if (u(i)) return i.then(function (e) {
        return e;
      }).otherwise(function (i) {
        return r.state !== S.FAILED ? t.reject(i) : n.retryOnError(i).then(function (a) {
          return a ? (r.state = S.UNISSUED, r.deferred = void 0, n.fetch(e)) : t.reject(i);
        });
      });
    };
    var V = /^data:(.*?)(;base64)?,(.*)$/;
    x.prototype.fetch = function (e) {
      return e = O(e, {}), e.method = "GET", this._makeRequest(e);
    }, x.fetch = function (e) {
      return new x(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype["delete"] = function (e) {
      return e = O(e, {}), e.method = "DELETE", this._makeRequest(e);
    }, x["delete"] = function (e) {
      return new x(e)["delete"]({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data
      });
    }, x.prototype.head = function (e) {
      return e = O(e, {}), e.method = "HEAD", this._makeRequest(e);
    }, x.head = function (e) {
      return new x(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.options = function (e) {
      return e = O(e, {}), e.method = "OPTIONS", this._makeRequest(e);
    }, x.options = function (e) {
      return new x(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.post = function (e, t) {
      return r.defined("data", e), t = O(t, {}), t.method = "POST", t.data = e, this._makeRequest(t);
    }, x.post = function (e) {
      return new x(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.put = function (e, t) {
      return r.defined("data", e), t = O(t, {}), t.method = "PUT", t.data = e, this._makeRequest(t);
    }, x.put = function (e) {
      return new x(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x.prototype.patch = function (e, t) {
      return r.defined("data", e), t = O(t, {}), t.method = "PATCH", t.data = e, this._makeRequest(t);
    }, x.patch = function (e) {
      return new x(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, x._Implementations = {}, x._Implementations.createImage = function (e, t, n, r, i) {
      x.supportsImageBitmapOptions().then(function (r) {
        return r && i ? x.fetchBlob({
          url: e
        }) : void b(e, t, n);
      }).then(function (e) {
        if (u(e)) return x.createImageBitmapFromBlob(e, {
          flipY: r,
          premultiplyAlpha: !1
        });
      }).then(function (e) {
        u(e) && n.resolve(e);
      }).otherwise(n.reject);
    }, x.createImageBitmapFromBlob = function (e, t) {
      return r.defined("options", t), r.typeOf.bool("options.flipY", t.flipY), r.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha), createImageBitmap(e, {
        imageOrientation: t.flipY ? "flipY" : "none",
        premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"
      });
    };
    var W = "undefined" == typeof XMLHttpRequest;
    return x._Implementations.loadWithXhr = function (e, t, n, r, i, a, o) {
      var s = V.exec(e);
      if (null !== s) return void a.resolve(L(s, t));
      if (W) return void z(e, t, n, r, i, a, o);
      var c = new XMLHttpRequest();
      if (I.contains(e) && (c.withCredentials = !0), c.open(n, e, !0), u(o) && u(c.overrideMimeType) && c.overrideMimeType(o), u(i)) for (var l in i) {
        i.hasOwnProperty(l) && c.setRequestHeader(l, i[l]);
      }
      u(t) && (c.responseType = t);
      var f = !1;
      return "string" == typeof e && (f = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), c.onload = function () {
        if ((c.status < 200 || c.status >= 300) && (!f || 0 !== c.status)) return void a.reject(new A(c.status, c.response, c.getAllResponseHeaders()));
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
          if (-1 === JSON.parse(e).code) return void a.reject(new A(c.status, c.response, c.getAllResponseHeaders()));
        } catch (e) {
          a.reject(e);
        }
        if (204 === c.status) a.resolve();else if (!u(e) || u(t) && r !== t) {
          if ("json" === t && "string" == typeof e) try {
            a.resolve(JSON.parse(e));
          } catch (e) {
            a.reject(e);
          } else ("" === r || "document" === r) && u(c.responseXML) && c.responseXML.hasChildNodes() ? a.resolve(c.responseXML) : "" !== r && "text" !== r || !u(c.responseText) ? a.reject(new g("Invalid XMLHttpRequest response type.")) : a.resolve(c.responseText);
        } else a.resolve(e);
      }, c.onerror = function (e) {
        a.reject(new A());
      }, c.send(r), c;
    }, x._Implementations.loadAndExecuteScript = function (e, t, n) {
      return _(e, t).otherwise(n.reject);
    }, x._DefaultImplementations = {}, x._DefaultImplementations.createImage = x._Implementations.createImage, x._DefaultImplementations.loadWithXhr = x._Implementations.loadWithXhr, x._DefaultImplementations.loadAndExecuteScript = x._Implementations.loadAndExecuteScript, x.DEFAULT = l(new x({
      url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
    })), x;
  }), define("Core/EarthOrientationParameters", ["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (e, t, n, r, i, a, o, u, s, c, l, f) {
    "use strict";

    function h(t) {
      if (t = n(t, n.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = n(t.addNewLeapSeconds, !0), r(t.data)) m(this, t.data);else if (r(t.url)) {
        var i = s.createIfNeeded(t.url),
            a = this;
        this._downloadPromise = e(i.fetchJson(), function (e) {
          m(a, e);
        }, function () {
          a._dataError = "An error occurred while retrieving the EOP data from the URL " + i.url + ".";
        });
      } else m(this, {
        columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
        samples: []
      });
    }

    function d(e, t) {
      return o.compare(e.julianDate, t);
    }

    function m(e, n) {
      if (!r(n.columnNames)) return void (e._dataError = "Error in loaded EOP data: The columnNames property is required.");
      if (!r(n.samples)) return void (e._dataError = "Error in loaded EOP data: The samples property is required.");
      var i = n.columnNames.indexOf("modifiedJulianDateUtc"),
          a = n.columnNames.indexOf("xPoleWanderRadians"),
          s = n.columnNames.indexOf("yPoleWanderRadians"),
          c = n.columnNames.indexOf("ut1MinusUtcSeconds"),
          h = n.columnNames.indexOf("xCelestialPoleOffsetRadians"),
          m = n.columnNames.indexOf("yCelestialPoleOffsetRadians"),
          p = n.columnNames.indexOf("taiMinusUtcSeconds");
      if (i < 0 || a < 0 || s < 0 || c < 0 || h < 0 || m < 0 || p < 0) return void (e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");

      var E = e._samples = n.samples,
          _ = e._dates = [];

      e._dateColumn = i, e._xPoleWanderRadiansColumn = a, e._yPoleWanderRadiansColumn = s, e._ut1MinusUtcSecondsColumn = c, e._xCelestialPoleOffsetRadiansColumn = h, e._yCelestialPoleOffsetRadiansColumn = m, e._taiMinusUtcSecondsColumn = p, e._columnCount = n.columnNames.length, e._lastIndex = void 0;

      for (var y, T = e._addNewLeapSeconds, R = 0, A = E.length; R < A; R += e._columnCount) {
        var v = E[R + i],
            S = E[R + p],
            g = v + l.MODIFIED_JULIAN_DATE_DIFFERENCE,
            I = new o(g, S, f.TAI);

        if (_.push(I), T) {
          if (S !== y && r(y)) {
            var N = o.leapSeconds,
                M = t(N, I, d);

            if (M < 0) {
              var O = new u(I, S);
              N.splice(~M, 0, O);
            }
          }

          y = S;
        }
      }
    }

    function p(e, t, n, r, i) {
      var a = n * r;
      i.xPoleWander = t[a + e._xPoleWanderRadiansColumn], i.yPoleWander = t[a + e._yPoleWanderRadiansColumn], i.xPoleOffset = t[a + e._xCelestialPoleOffsetRadiansColumn], i.yPoleOffset = t[a + e._yCelestialPoleOffsetRadiansColumn], i.ut1MinusUtc = t[a + e._ut1MinusUtcSecondsColumn];
    }

    function E(e, t, n) {
      return t + e * (n - t);
    }

    function _(e, t, n, r, i, a, u) {
      var s = e._columnCount;
      if (a > t.length - 1) return u.xPoleWander = 0, u.yPoleWander = 0, u.xPoleOffset = 0, u.yPoleOffset = 0, u.ut1MinusUtc = 0, u;
      var c = t[i],
          l = t[a];
      if (c.equals(l) || r.equals(c)) return p(e, n, i, s, u), u;
      if (r.equals(l)) return p(e, n, a, s, u), u;
      var f = o.secondsDifference(r, c) / o.secondsDifference(l, c),
          h = i * s,
          d = a * s,
          m = n[h + e._ut1MinusUtcSecondsColumn],
          _ = n[d + e._ut1MinusUtcSecondsColumn],
          y = _ - m;

      if (y > .5 || y < -.5) {
        var T = n[h + e._taiMinusUtcSecondsColumn],
            R = n[d + e._taiMinusUtcSecondsColumn];
        T !== R && (l.equals(r) ? m = _ : _ -= R - T);
      }

      return u.xPoleWander = E(f, n[h + e._xPoleWanderRadiansColumn], n[d + e._xPoleWanderRadiansColumn]), u.yPoleWander = E(f, n[h + e._yPoleWanderRadiansColumn], n[d + e._yPoleWanderRadiansColumn]), u.xPoleOffset = E(f, n[h + e._xCelestialPoleOffsetRadiansColumn], n[d + e._xCelestialPoleOffsetRadiansColumn]), u.yPoleOffset = E(f, n[h + e._yCelestialPoleOffsetRadiansColumn], n[d + e._yCelestialPoleOffsetRadiansColumn]), u.ut1MinusUtc = E(f, m, _), u;
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
              m = !r(h),
              p = m || o.greaterThanOrEquals(h, e);
          if (d && p) return s = u, !m && h.equals(e) && ++s, l = s + 1, _(this, a, this._samples, e, s, l, n), n;
        }

        var E = t(a, e, o.compare, this._dateColumn);
        return E >= 0 ? (E < a.length - 1 && a[E + 1].equals(e) && ++E, s = E, l = E) : (l = ~E, (s = l - 1) < 0 && (s = 0)), this._lastIndex = s, _(this, a, this._samples, e, s, l, n), n;
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
            i = m.exec(r);
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
        m = /((?:.*\/)|^)pgEarth[\w-]*\.js(?:\W|$)/i;
    return l._pgEarthScriptRegex = m, l._buildModuleUrlFromBaseUrl = c, l._clearBaseResource = function () {
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

      for (var f = u / this._samplesPerXysFile | 0, h = s / this._samplesPerXysFile | 0, d = [], m = f; m <= h; ++m) {
        d.push(l(this, m));
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
            var m,
                p,
                E = a - s * this._stepSizeDays,
                _ = this._work,
                y = this._denominators,
                T = this._coef,
                R = this._xTable;

            for (m = 0; m <= u; ++m) {
              _[m] = E - R[m];
            }

            for (m = 0; m <= u; ++m) {
              for (T[m] = 1, p = 0; p <= u; ++p) {
                p !== m && (T[m] *= _[p]);
              }

              T[m] *= y[m];
              var A = 3 * (s + m);
              n.x += T[m] * d[A++], n.y += T[m] * d[A++], n.s += T[m] * d[A];
            }

            return n;
          }
        }
      }
    }, s;
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
  }), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Fullscreen", "../ThirdParty/when"], function (e, t, n, r, i, a) {
    "use strict";

    function o(e) {
      for (var t = e.split("."), n = 0, r = t.length; n < r; ++n) {
        t[n] = parseInt(t[n], 10);
      }

      return t;
    }

    function u() {
      if (!t(I) && (I = !1, !p())) {
        var e = / Chrome\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (I = !0, N = o(e[1]));
      }

      return I;
    }

    function s() {
      return u() && N;
    }

    function c() {
      if (!t(M) && (M = !1, !u() && !p() && / Safari\/[\.0-9]+/.test(g.userAgent))) {
        var e = / Version\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (M = !0, O = o(e[1]));
      }

      return M;
    }

    function l() {
      return c() && O;
    }

    function f() {
      if (!t(w)) {
        w = !1;
        var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(g.userAgent);
        null !== e && (w = !0, C = o(e[1]), C.isNightly = !!e[2]);
      }

      return w;
    }

    function h() {
      return f() && C;
    }

    function d() {
      if (!t(x)) {
        x = !1;
        var e;
        "Microsoft Internet Explorer" === g.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(g.userAgent)) && (x = !0, P = o(e[1])) : "Netscape" === g.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(g.userAgent)) && (x = !0, P = o(e[1]));
      }

      return x;
    }

    function m() {
      return d() && P;
    }

    function p() {
      if (!t(U)) {
        U = !1;
        var e = / Edge\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (U = !0, D = o(e[1]));
      }

      return U;
    }

    function E() {
      return p() && D;
    }

    function _() {
      if (!t(F)) {
        F = !1;
        var e = /Firefox\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (F = !0, L = o(e[1]));
      }

      return F;
    }

    function y() {
      return t(b) || (b = /Windows/i.test(g.appVersion)), b;
    }

    function T() {
      return _() && L;
    }

    function R() {
      return t(B) || (B = !_() && "undefined" != typeof PointerEvent && (!t(g.pointerEnabled) || g.pointerEnabled)), B;
    }

    function A() {
      if (!t(q)) {
        var e = document.createElement("canvas");
        e.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;");
        var n = e.style.imageRendering;
        q = t(n) && "" !== n, q && (z = n);
      }

      return q;
    }

    function v() {
      return A() ? z : void 0;
    }

    function S() {
      return S._result;
    }

    var g;
    g = "undefined" != typeof navigator ? navigator : {};
    var I, N, M, O, w, C, x, P, U, D, F, L, b, B, z, q;
    S._promise = void 0, S._result = void 0, S.initialize = function () {
      if (t(S._promise)) return S._promise;
      var e = a.defer();
      if (S._promise = e.promise, p()) return S._result = !1, e.resolve(S._result), e.promise;
      var n = new Image();
      return n.onload = function () {
        S._result = n.width > 0 && n.height > 0, e.resolve(S._result);
      }, n.onerror = function () {
        S._result = !1, e.resolve(S._result);
      }, n.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.promise;
    }, n(S, {
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
      internetExplorerVersion: m,
      isEdge: p,
      edgeVersion: E,
      isFirefox: _,
      firefoxVersion: T,
      isWindows: y,
      hardwareConcurrency: e(g.hardwareConcurrency, 3),
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
          m = e[u.COLUMN2ROW2],
          p = h + d + m;
      if (p > 0) n = Math.sqrt(p + 1), c = .5 * n, n = .5 / n, i = (e[u.COLUMN1ROW2] - e[u.COLUMN2ROW1]) * n, a = (e[u.COLUMN2ROW0] - e[u.COLUMN0ROW2]) * n, o = (e[u.COLUMN0ROW1] - e[u.COLUMN1ROW0]) * n;else {
        var E = l,
            _ = 0;
        d > h && (_ = 1), m > h && m > d && (_ = 2);
        var y = E[_],
            T = E[y];
        n = Math.sqrt(e[u.getElementIndex(_, _)] - e[u.getElementIndex(y, y)] - e[u.getElementIndex(T, T)] + 1);
        var R = f;
        R[_] = .5 * n, n = .5 / n, c = (e[u.getElementIndex(T, y)] - e[u.getElementIndex(y, T)]) * n, R[y] = (e[u.getElementIndex(y, _)] + e[u.getElementIndex(_, y)]) * n, R[T] = (e[u.getElementIndex(T, _)] + e[u.getElementIndex(_, T)]) * n, i = -R[0], a = -R[1], o = -R[2];
      }
      return r(t) ? (t.x = i, t.y = a, t.z = o, t.w = c, t) : new s(i, a, o, c);
    };

    var h = new s(),
        d = new s(),
        m = new s(),
        p = new s();

    s.fromHeadingPitchRoll = function (t, n) {
      return p = s.fromAxisAngle(e.UNIT_X, t.roll, h), m = s.fromAxisAngle(e.UNIT_Y, -t.pitch, n), n = s.multiply(m, p, m), d = s.fromAxisAngle(e.UNIT_Z, -t.heading, h), s.multiply(d, n, n);
    };

    var E = new e(),
        _ = new e(),
        y = new s(),
        T = new s(),
        R = new s();

    s.packedLength = 4, s.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e.x, t[r++] = e.y, t[r++] = e.z, t[r] = e.w, t;
    }, s.unpack = function (e, t, i) {
      return t = n(t, 0), r(i) || (i = new s()), i.x = e[t], i.y = e[t + 1], i.z = e[t + 2], i.w = e[t + 3], i;
    }, s.packedInterpolationLength = 3, s.convertPackedArrayForInterpolation = function (e, t, n, r) {
      s.unpack(e, 4 * n, R), s.conjugate(R, R);

      for (var i = 0, a = n - t + 1; i < a; i++) {
        var o = 3 * i;
        s.unpack(e, 4 * (t + i), y), s.multiply(y, R, y), y.w < 0 && s.negate(y, y), s.computeAxis(y, E);
        var u = s.computeAngle(y);
        r[o] = E.x * u, r[o + 1] = E.y * u, r[o + 2] = E.z * u;
      }
    }, s.unpackInterpolationResult = function (t, n, i, a, o) {
      r(o) || (o = new s()), e.fromArray(t, 0, _);
      var u = e.magnitude(_);
      return s.unpack(n, 4 * a, T), 0 === u ? s.clone(s.IDENTITY, y) : s.fromAxisAngle(_, u, y), s.multiply(y, T, o);
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
          m = o * l - r * u - i * s - a * c;
      return n.x = f, n.y = h, n.z = d, n.w = m, n;
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
    var A = new s();

    s.lerp = function (e, t, n, r) {
      return A = s.multiplyByScalar(t, n, A), r = s.multiplyByScalar(e, 1 - n, r), s.add(A, r, r);
    };

    var v = new s(),
        S = new s(),
        g = new s();
    s.slerp = function (e, t, n, r) {
      var i = s.dot(e, t),
          a = t;
      if (i < 0 && (i = -i, a = v = s.negate(t, v)), 1 - i < o.EPSILON6) return s.lerp(e, a, n, r);
      var u = Math.acos(i);
      return S = s.multiplyByScalar(e, Math.sin((1 - n) * u), S), g = s.multiplyByScalar(a, Math.sin(n * u), g), r = s.add(S, g, r), s.multiplyByScalar(r, 1 / Math.sin(u), r);
    }, s.log = function (t, n) {
      var r = o.acosClamped(t.w),
          i = 0;
      return 0 !== r && (i = r / Math.sin(r)), e.multiplyByScalar(t, i, n);
    }, s.exp = function (t, n) {
      var r = e.magnitude(t),
          i = 0;
      return 0 !== r && (i = Math.sin(r) / r), n.x = t.x * i, n.y = t.y * i, n.z = t.z * i, n.w = Math.cos(r), n;
    };
    var I = new e(),
        N = new e(),
        M = new s(),
        O = new s();
    s.computeInnerQuadrangle = function (t, n, r, i) {
      var a = s.conjugate(n, M);
      s.multiply(a, r, O);
      var o = s.log(O, I);
      s.multiply(a, t, O);
      var u = s.log(O, N);
      return e.add(o, u, o), e.multiplyByScalar(o, .25, o), e.negate(o, o), s.exp(o, M), s.multiply(n, M, i);
    }, s.squad = function (e, t, n, r, i, a) {
      var o = s.slerp(e, t, i, M),
          u = s.slerp(n, r, i, O);
      return s.slerp(o, u, 2 * i * (1 - i), a);
    };

    for (var w = new s(), C = 1.9011074535173003, x = i.supportsTypedArrays() ? new Float32Array(8) : [], P = i.supportsTypedArrays() ? new Float32Array(8) : [], U = i.supportsTypedArrays() ? new Float32Array(8) : [], D = i.supportsTypedArrays() ? new Float32Array(8) : [], F = 0; F < 7; ++F) {
      var L = F + 1,
          b = 2 * L + 1;
      x[F] = 1 / (L * b), P[F] = L / b;
    }

    return x[7] = C / 136, P[7] = 8 * C / 17, s.fastSlerp = function (e, t, n, r) {
      var i,
          a = s.dot(e, t);
      a >= 0 ? i = 1 : (i = -1, a = -a);

      for (var o = a - 1, u = 1 - n, c = n * n, l = u * u, f = 7; f >= 0; --f) {
        U[f] = (x[f] * c - P[f]) * o, D[f] = (x[f] * l - P[f]) * o;
      }

      var h = i * n * (1 + U[0] * (1 + U[1] * (1 + U[2] * (1 + U[3] * (1 + U[4] * (1 + U[5] * (1 + U[6] * (1 + U[7])))))))),
          d = u * (1 + D[0] * (1 + D[1] * (1 + D[2] * (1 + D[3] * (1 + D[4] * (1 + D[5] * (1 + D[6] * (1 + D[7])))))))),
          m = s.multiplyByScalar(e, d, w);
      return s.multiplyByScalar(t, h, r), s.add(m, r, r);
    }, s.fastSquad = function (e, t, n, r, i, a) {
      var o = s.fastSlerp(e, t, i, M),
          u = s.fastSlerp(n, r, i, O);
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
  }), define("Core/Transforms", ["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, m, p, E, _, y, T, R) {
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
        g = {},
        I = {
      east: new n(),
      north: new n(),
      up: new n(),
      west: new n(),
      south: new n(),
      down: new n()
    },
        N = new n(),
        M = new n(),
        O = new n();
    A.localFrameToFixedFrameGenerator = function (e, t) {
      if (!v.hasOwnProperty(e) || !v[e].hasOwnProperty(t)) throw new s("firstAxis and secondAxis must be east, north, up, west, south or down.");
      var r,
          i = v[e][t],
          a = e + t;
      return u(g[a]) ? r = g[a] : (r = function r(_r, a, s) {
        if (u(s) || (s = new y()), E.equalsEpsilon(_r.x, 0, E.EPSILON14) && E.equalsEpsilon(_r.y, 0, E.EPSILON14)) {
          var c = E.sign(_r.z);
          n.unpack(S[e], 0, N), "east" !== e && "west" !== e && n.multiplyByScalar(N, c, N), n.unpack(S[t], 0, M), "east" !== t && "west" !== t && n.multiplyByScalar(M, c, M), n.unpack(S[i], 0, O), "east" !== i && "west" !== i && n.multiplyByScalar(O, c, O);
        } else {
          a = o(a, f.WGS84), a.geodeticSurfaceNormal(_r, I.up);
          var l = I.up,
              h = I.east;
          h.x = -_r.y, h.y = _r.x, h.z = 0, n.normalize(h, I.east), n.cross(l, h, I.north), n.multiplyByScalar(I.up, -1, I.down), n.multiplyByScalar(I.east, -1, I.west), n.multiplyByScalar(I.north, -1, I.south), N = I[e], M = I[t], O = I[i];
        }

        return s[0] = N.x, s[1] = N.y, s[2] = N.z, s[3] = 0, s[4] = M.x, s[5] = M.y, s[6] = M.z, s[7] = 0, s[8] = O.x, s[9] = O.y, s[10] = O.z, s[11] = 0, s[12] = _r.x, s[13] = _r.y, s[14] = _r.z, s[15] = 1, s;
      }, g[a] = r), r;
    }, A.eastNorthUpToFixedFrame = A.localFrameToFixedFrameGenerator("east", "north"), A.northEastDownToFixedFrame = A.localFrameToFixedFrameGenerator("north", "east"), A.northUpEastToFixedFrame = A.localFrameToFixedFrameGenerator("north", "up"), A.northWestUpToFixedFrame = A.localFrameToFixedFrameGenerator("north", "west");
    var w = new T(),
        C = new n(1, 1, 1),
        x = new y();

    A.headingPitchRollToFixedFrame = function (e, t, r, i, a) {
      i = o(i, A.eastNorthUpToFixedFrame);
      var u = T.fromHeadingPitchRoll(t, w),
          s = y.fromTranslationQuaternionRotationScale(n.ZERO, u, C, x);
      return a = i(e, r, a), y.multiply(a, s, a);
    };

    var P = new y(),
        U = new _();

    A.headingPitchRollQuaternion = function (e, t, n, r, i) {
      var a = A.headingPitchRollToFixedFrame(e, t, n, r, P),
          o = y.getRotation(a, U);
      return T.fromRotationMatrix(o, i);
    };

    var D = new n(1, 1, 1),
        F = new n(),
        L = new y(),
        b = new y(),
        B = new _(),
        z = new T();

    A.fixedFrameToHeadingPitchRoll = function (e, t, r, i) {
      t = o(t, f.WGS84), r = o(r, A.eastNorthUpToFixedFrame), u(i) || (i = new h());
      var a = y.getTranslation(e, F);
      if (n.equals(a, n.ZERO)) return i.heading = 0, i.pitch = 0, i.roll = 0, i;
      var s = y.inverseTransformation(r(a, t, L), L),
          c = y.setScale(e, D, b);
      c = y.setTranslation(c, n.ZERO, c), s = y.multiply(s, c, s);
      var l = T.fromRotationMatrix(y.getRotation(s, B), z);
      return l = T.normalize(l, l), h.fromQuaternion(l, i);
    };

    var q = E.TWO_PI / 86400,
        G = new p();
    A.computeTemeToPseudoFixedMatrix = function (e, t) {
      G = p.addSeconds(e, -p.computeTaiMinusUtc(e), G);
      var n,
          r = G.dayNumber,
          i = G.secondsOfDay,
          a = r - 2451545;
      n = i >= 43200 ? (a + .5) / R.DAYS_PER_JULIAN_CENTURY : (a - .5) / R.DAYS_PER_JULIAN_CENTURY;
      var o = 24110.54841 + n * (8640184.812866 + n * (.093104 + -62e-7 * n)),
          s = o * q % E.TWO_PI,
          c = 72921158553e-15 + 1.1772758384668e-19 * (r - 2451545.5),
          l = (i + .5 * R.SECONDS_PER_DAY) % R.SECONDS_PER_DAY,
          f = s + c * l,
          h = Math.cos(f),
          d = Math.sin(f);
      return u(t) ? (t[0] = h, t[1] = -d, t[2] = 0, t[3] = d, t[4] = h, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new _(h, d, 0, -d, h, 0, 0, 0, 1);
    }, A.iau2006XysData = new d(), A.earthOrientationParameters = c.NONE;
    A.preloadIcrfFixed = function (t) {
      var n = t.start.dayNumber,
          r = t.start.secondsOfDay + 32.184,
          i = t.stop.dayNumber,
          a = t.stop.secondsOfDay + 32.184,
          o = A.iau2006XysData.preload(n, r, i, a),
          u = A.earthOrientationParameters.getPromiseToLoad();
      return e.all([o, u]);
    }, A.computeIcrfToFixedMatrix = function (e, t) {
      u(t) || (t = new _());
      var n = A.computeFixedToIcrfMatrix(e, t);
      if (u(n)) return _.transpose(n, t);
    };
    var V = new m(0, 0, 0),
        W = new l(0, 0, 0, 0, 0, 0),
        X = new _(),
        H = new _();

    A.computeFixedToIcrfMatrix = function (e, t) {
      u(t) || (t = new _());
      var n = A.earthOrientationParameters.compute(e, W);

      if (u(n)) {
        var r = e.dayNumber,
            i = e.secondsOfDay + 32.184,
            a = A.iau2006XysData.computeXysRadians(r, i, V);

        if (u(a)) {
          var o = a.x + n.xPoleOffset,
              s = a.y + n.yPoleOffset,
              c = 1 / (1 + Math.sqrt(1 - o * o - s * s)),
              l = X;
          l[0] = 1 - c * o * o, l[3] = -c * o * s, l[6] = o, l[1] = -c * o * s, l[4] = 1 - c * s * s, l[7] = s, l[2] = -o, l[5] = -s, l[8] = 1 - c * (o * o + s * s);

          var f = _.fromRotationZ(-a.s, H),
              h = _.multiply(l, f, X),
              d = e.dayNumber,
              m = e.secondsOfDay - p.computeTaiMinusUtc(e) + n.ut1MinusUtc,
              y = d - 2451545,
              T = m / R.SECONDS_PER_DAY,
              v = .779057273264 + T + .00273781191135448 * (y + T);

          v = v % 1 * E.TWO_PI;

          var S = _.fromRotationZ(v, H),
              g = _.multiply(h, S, X),
              I = Math.cos(n.xPoleWander),
              N = Math.cos(n.yPoleWander),
              M = Math.sin(n.xPoleWander),
              O = Math.sin(n.yPoleWander),
              w = r - 2451545 + i / R.SECONDS_PER_DAY;

          w /= 36525;
          var C = -47e-6 * w * E.RADIANS_PER_DEGREE / 3600,
              x = Math.cos(C),
              P = Math.sin(C),
              U = H;
          return U[0] = I * x, U[1] = I * P, U[2] = M, U[3] = -N * P + O * M * x, U[4] = N * x + O * M * P, U[5] = -O * I, U[6] = -O * P - N * M * x, U[7] = O * x - N * M * P, U[8] = N * I, _.multiply(g, U, t);
        }
      }
    };

    var Y = new r();
    A.pointToWindowCoordinates = function (e, t, n, r) {
      return r = A.pointToGLWindowCoordinates(e, t, n, r), r.y = 2 * t[5] - r.y, r;
    }, A.pointToGLWindowCoordinates = function (e, n, i, a) {
      u(a) || (a = new t());
      var o = Y;
      return y.multiplyByVector(e, r.fromElements(i.x, i.y, i.z, 1, o), o), r.multiplyByScalar(o, 1 / o.w, o), y.multiplyByVector(n, o, o), t.fromCartesian4(o, a);
    };
    var k = new n(),
        j = new n(),
        Z = new n();

    A.rotationMatrixFromPositionVelocity = function (e, t, r, i) {
      var a = o(r, f.WGS84).geodeticSurfaceNormal(e, k),
          s = n.cross(t, a, j);
      n.equalsEpsilon(s, n.ZERO, E.EPSILON6) && (s = n.clone(n.UNIT_X, s));
      var c = n.cross(s, t, Z);
      return n.normalize(c, c), n.cross(t, c, s), n.negate(s, s), n.normalize(s, s), u(i) || (i = new _()), i[0] = t.x, i[1] = t.y, i[2] = t.z, i[3] = s.x, i[4] = s.y, i[5] = s.z, i[6] = c.x, i[7] = c.y, i[8] = c.z, i;
    };

    var K = new y(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
        J = new i(),
        Q = new n(),
        $ = new n(),
        ee = new _(),
        te = new y(),
        ne = new y();
    return A.basisTo2D = function (e, t, r) {
      var i = y.getTranslation(t, $),
          a = e.ellipsoid,
          o = a.cartesianToCartographic(i, J),
          u = e.project(o, Q);
      n.fromElements(u.z, u.x, u.y, u);
      var s = A.eastNorthUpToFixedFrame(i, a, te),
          c = y.inverseTransformation(s, ne),
          l = y.getRotation(t, ee),
          f = y.multiplyByMatrix3(c, l, r);
      return y.multiply(K, f, r), y.setTranslation(r, u, r), r;
    }, A.wgs84To2DModelMatrix = function (e, t, r) {
      var i = e.ellipsoid,
          a = A.eastNorthUpToFixedFrame(t, i, te),
          o = y.inverseTransformation(a, ne),
          u = i.cartesianToCartographic(t, J),
          s = e.project(u, Q);
      n.fromElements(s.z, s.x, s.y, s);
      var c = y.fromTranslation(s, te);
      return y.multiply(K, o, r), y.multiply(c, r, r), r;
    }, A;
  }), define("Core/EllipsoidTangentPlane", ["./AxisAlignedBoundingBox", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./IntersectionTests", "./Matrix4", "./Plane", "./Ray", "./Transforms"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, m) {
    "use strict";

    function p(e, t) {
      t = a(t, c.WGS84), e = t.scaleToGeodeticSurface(e);
      var r = m.eastNorthUpToFixedFrame(e, t);
      this._ellipsoid = t, this._origin = e, this._xAxis = n.fromCartesian4(f.getColumn(r, 0, E)), this._yAxis = n.fromCartesian4(f.getColumn(r, 1, E));
      var i = n.fromCartesian4(f.getColumn(r, 2, E));
      this._plane = h.fromPointNormal(e, i);
    }

    var E = new r();
    u(p.prototype, {
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

    var _ = new e();

    p.fromPoints = function (t, n) {
      return new p(e.fromPoints(t, _).center, n);
    };

    var y = new d(),
        T = new n();
    p.prototype.projectPointOntoPlane = function (e, r) {
      var i = y;
      i.origin = e, n.normalize(e, i.direction);
      var a = l.rayPlane(i, this._plane, T);

      if (o(a) || (n.negate(i.direction, i.direction), a = l.rayPlane(i, this._plane, T)), o(a)) {
        var u = n.subtract(a, this._origin, a),
            s = n.dot(this._xAxis, u),
            c = n.dot(this._yAxis, u);
        return o(r) ? (r.x = s, r.y = c, r) : new t(s, c);
      }
    }, p.prototype.projectPointsOntoPlane = function (e, t) {
      o(t) || (t = []);

      for (var n = 0, r = e.length, i = 0; i < r; i++) {
        var a = this.projectPointOntoPlane(e[i], t[n]);
        o(a) && (t[n] = a, n++);
      }

      return t.length = n, t;
    }, p.prototype.projectPointToNearestOnPlane = function (e, r) {
      o(r) || (r = new t());
      var i = y;
      i.origin = e, n.clone(this._plane.normal, i.direction);
      var a = l.rayPlane(i, this._plane, T);
      o(a) || (n.negate(i.direction, i.direction), a = l.rayPlane(i, this._plane, T));
      var u = n.subtract(a, this._origin, a),
          s = n.dot(this._xAxis, u),
          c = n.dot(this._yAxis, u);
      return r.x = s, r.y = c, r;
    }, p.prototype.projectPointsToNearestOnPlane = function (e, t) {
      o(t) || (t = []);
      var n = e.length;
      t.length = n;

      for (var r = 0; r < n; r++) {
        t[r] = this.projectPointToNearestOnPlane(e[r], t[r]);
      }

      return t;
    };
    var R = new n();
    return p.prototype.projectPointOntoEllipsoid = function (e, t) {
      o(t) || (t = new n());
      var r = this._ellipsoid,
          i = this._origin,
          a = this._xAxis,
          u = this._yAxis,
          s = R;
      return n.multiplyByScalar(a, e.x, s), t = n.add(i, s, t), n.multiplyByScalar(u, e.y, s), n.add(t, s, t), r.scaleToGeocentricSurface(t, t), t;
    }, p.prototype.projectPointsOntoEllipsoid = function (e, t) {
      var n = e.length;
      o(t) ? t.length = n : t = new Array(n);

      for (var r = 0; r < n; ++r) {
        t[r] = this.projectPointOntoEllipsoid(e[r], t[r]);
      }

      return t;
    }, p;
  }), define("Core/OrientedBoundingBox", ["./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidTangentPlane", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Plane", "./Rectangle"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, m, p) {
    "use strict";

    function E(e, t) {
      this.center = n.clone(a(e, n.ZERO)), this.halfAxes = d.clone(a(t, d.ZERO));
    }

    function _(e, t, r, i, a, u, s, c) {
      o(c) || (c = new E());
      var l = c.halfAxes;
      d.setColumn(l, 0, e.xAxis, l), d.setColumn(l, 1, e.yAxis, l), d.setColumn(l, 2, e.zAxis, l);
      var f = N;
      f.x = (t + r) / 2, f.y = (i + a) / 2, f.z = (u + s) / 2;
      var h = M;
      h.x = (r - t) / 2, h.y = (a - i) / 2, h.z = (s - u) / 2;
      var m = c.center;
      return f = d.multiplyByVector(l, f, f), n.add(e.origin, f, m), d.multiplyByScale(l, h, l), c;
    }

    E.packedLength = n.packedLength + d.packedLength, E.pack = function (e, t, r) {
      return r = a(r, 0), n.pack(e.center, t, r), d.pack(e.halfAxes, t, r + n.packedLength), t;
    }, E.unpack = function (e, t, r) {
      return t = a(t, 0), o(r) || (r = new E()), n.unpack(e, t, r.center), d.unpack(e, t + n.packedLength, r.halfAxes), r;
    };
    var y = new n(),
        T = new n(),
        R = new n(),
        A = new n(),
        v = new n(),
        S = new n(),
        g = new d(),
        I = {
      unitary: new d(),
      diagonal: new d()
    };

    E.fromPoints = function (e, t) {
      if (o(t) || (t = new E()), !o(e) || 0 === e.length) return t.halfAxes = d.ZERO, t.center = n.ZERO, t;
      var r,
          i = e.length,
          a = n.clone(e[0], y);

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
          m = 0,
          p = 0;

      for (r = 0; r < i; r++) {
        s = n.subtract(e[r], a, T), c += s.x * s.x, l += s.x * s.y, f += s.x * s.z, h += s.y * s.y, m += s.y * s.z, p += s.z * s.z;
      }

      c *= u, l *= u, f *= u, h *= u, m *= u, p *= u;
      var _ = g;
      _[0] = c, _[1] = l, _[2] = f, _[3] = l, _[4] = h, _[5] = m, _[6] = f, _[7] = m, _[8] = p;
      var N = d.computeEigenDecomposition(_, I),
          M = d.clone(N.unitary, t.halfAxes),
          O = d.getColumn(M, 0, A),
          w = d.getColumn(M, 1, v),
          C = d.getColumn(M, 2, S),
          x = -Number.MAX_VALUE,
          P = -Number.MAX_VALUE,
          U = -Number.MAX_VALUE,
          D = Number.MAX_VALUE,
          F = Number.MAX_VALUE,
          L = Number.MAX_VALUE;

      for (r = 0; r < i; r++) {
        s = e[r], x = Math.max(n.dot(O, s), x), P = Math.max(n.dot(w, s), P), U = Math.max(n.dot(C, s), U), D = Math.min(n.dot(O, s), D), F = Math.min(n.dot(w, s), F), L = Math.min(n.dot(C, s), L);
      }

      O = n.multiplyByScalar(O, .5 * (D + x), O), w = n.multiplyByScalar(w, .5 * (F + P), w), C = n.multiplyByScalar(C, .5 * (L + U), C);
      var b = n.add(O, w, t.center);
      n.add(b, C, b);
      var B = R;
      return B.x = x - D, B.y = P - F, B.z = U - L, n.multiplyByScalar(B, .5, B), d.multiplyByScale(t.halfAxes, B, t.halfAxes), t;
    };

    var N = new n(),
        M = new n(),
        O = new r(),
        w = new n(),
        C = [new r(), new r(), new r(), new r(), new r(), new r(), new r(), new r()],
        x = [new n(), new n(), new n(), new n(), new n(), new n(), new n(), new n()],
        P = [new t(), new t(), new t(), new t(), new t(), new t(), new t(), new t()];
    E.fromRectangle = function (e, t, n, r, i) {
      t = a(t, 0), n = a(n, 0), r = a(r, s.WGS84);
      var o = p.center(e, O),
          u = r.cartographicToCartesian(o, w),
          l = new c(u, r),
          f = l.plane,
          h = C[0],
          d = C[1],
          E = C[2],
          y = C[3],
          T = C[4],
          R = C[5],
          A = C[6],
          v = C[7],
          S = o.longitude,
          g = e.south < 0 && e.north > 0 ? 0 : o.latitude;
      A.latitude = R.latitude = T.latitude = e.south, v.latitude = y.latitude = g, h.latitude = d.latitude = E.latitude = e.north, A.longitude = v.longitude = h.longitude = e.west, R.longitude = d.longitude = S, T.longitude = y.longitude = E.longitude = e.east, E.height = d.height = h.height = v.height = A.height = R.height = T.height = y.height = n, r.cartographicArrayToCartesianArray(C, x), l.projectPointsToNearestOnPlane(x, P);
      var I = Math.min(P[6].x, P[7].x, P[0].x),
          N = Math.max(P[2].x, P[3].x, P[4].x),
          M = Math.min(P[4].y, P[5].y, P[6].y),
          U = Math.max(P[0].y, P[1].y, P[2].y);
      return E.height = h.height = T.height = A.height = t, r.cartographicArrayToCartesianArray(C, x), _(l, I, N, M, U, Math.min(m.getPointDistance(f, x[0]), m.getPointDistance(f, x[2]), m.getPointDistance(f, x[4]), m.getPointDistance(f, x[6])), n, i);
    }, E.clone = function (e, t) {
      if (o(e)) return o(t) ? (n.clone(e.center, t.center), d.clone(e.halfAxes, t.halfAxes), t) : new E(e.center, e.halfAxes);
    }, E.intersectPlane = function (e, t) {
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
    var U = new n(),
        D = new n(),
        F = new n(),
        L = new n();

    E.distanceSquaredTo = function (e, t) {
      var r = n.subtract(t, e.center, N),
          i = e.halfAxes,
          a = d.getColumn(i, 0, U),
          o = d.getColumn(i, 1, D),
          u = d.getColumn(i, 2, F),
          s = n.magnitude(a),
          c = n.magnitude(o),
          l = n.magnitude(u);
      n.normalize(a, a), n.normalize(o, o), n.normalize(u, u);
      var f = L;
      f.x = n.dot(r, a), f.y = n.dot(r, o), f.z = n.dot(r, u);
      var h,
          m = 0;
      return f.x < -s ? (h = f.x + s, m += h * h) : f.x > s && (h = f.x - s, m += h * h), f.y < -c ? (h = f.y + c, m += h * h) : f.y > c && (h = f.y - c, m += h * h), f.z < -l ? (h = f.z + l, m += h * h) : f.z > l && (h = f.z - l, m += h * h), m;
    };

    var b = new n(),
        B = new n();

    E.computePlaneDistances = function (e, t, r, i) {
      o(i) || (i = new f());
      var a = Number.POSITIVE_INFINITY,
          u = Number.NEGATIVE_INFINITY,
          s = e.center,
          c = e.halfAxes,
          l = d.getColumn(c, 0, U),
          h = d.getColumn(c, 1, D),
          m = d.getColumn(c, 2, F),
          p = n.add(l, h, b);
      n.add(p, m, p), n.add(p, s, p);

      var E = n.subtract(p, t, B),
          _ = n.dot(r, E);

      return a = Math.min(_, a), u = Math.max(_, u), n.add(s, l, p), n.add(p, h, p), n.subtract(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), n.add(s, l, p), n.subtract(p, h, p), n.add(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), n.add(s, l, p), n.subtract(p, h, p), n.subtract(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), n.subtract(s, l, p), n.add(p, h, p), n.add(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), n.subtract(s, l, p), n.add(p, h, p), n.subtract(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), n.subtract(s, l, p), n.subtract(p, h, p), n.add(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), n.subtract(s, l, p), n.subtract(p, h, p), n.subtract(p, m, p), n.subtract(p, t, E), _ = n.dot(r, E), a = Math.min(_, a), u = Math.max(_, u), i.start = a, i.stop = u, i;
    };

    var z = new e();
    return E.isOccluded = function (t, n) {
      var r = e.fromOrientedBoundingBox(t, z);
      return !n.isBoundingSphereVisible(r);
    }, E.prototype.intersectPlane = function (e) {
      return E.intersectPlane(this, e);
    }, E.prototype.distanceSquaredTo = function (e) {
      return E.distanceSquaredTo(this, e);
    }, E.prototype.computePlaneDistances = function (e, t, n) {
      return E.computePlaneDistances(this, e, t, n);
    }, E.prototype.isOccluded = function (e) {
      return E.isOccluded(this, e);
    }, E.equals = function (e, t) {
      return e === t || o(e) && o(t) && n.equals(e.center, t.center) && d.equals(e.halfAxes, t.halfAxes);
    }, E.prototype.clone = function (e) {
      return E.clone(this, e);
    }, E.prototype.equals = function (e) {
      return E.equals(this, e);
    }, E;
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
  }), define("Core/TerrainQuantization", ["./freezeObject"], function (e) {
    "use strict";

    return e({
      NONE: 0,
      BITS12: 1
    });
  }), define("Core/TerrainEncoding", ["./AttributeCompression", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./Math", "./Matrix4", "./TerrainQuantization"], function (e, t, n, r, i, a, o, u, s) {
    "use strict";

    function c(e, t, r, o, c, h) {
      var E,
          _,
          y,
          T = s.NONE;

      if (a(e) && a(t) && a(r) && a(o)) {
        var R = e.minimum,
            A = e.maximum,
            v = n.subtract(A, R, f),
            S = r - t;
        T = Math.max(n.maximumComponent(v), S) < p - 1 ? s.BITS12 : s.NONE, E = e.center, _ = u.inverseTransformation(o, new u());
        var g = n.negate(R, l);
        u.multiply(u.fromTranslation(g, d), _, _);
        var I = l;
        I.x = 1 / v.x, I.y = 1 / v.y, I.z = 1 / v.z, u.multiply(u.fromScale(I, d), _, _), y = u.clone(o), u.setTranslation(y, n.ZERO, y), o = u.clone(o, new u());
        var N = u.fromTranslation(R, d),
            M = u.fromScale(v, m),
            O = u.multiply(N, M, d);
        u.multiply(o, O, o), u.multiply(y, O, y);
      }

      this.quantization = T, this.minimumHeight = t, this.maximumHeight = r, this.center = E, this.toScaledENU = _, this.fromScaledENU = o, this.matrix = y, this.hasVertexNormals = c, this.hasWebMercatorT = i(h, !1);
    }

    var l = new n(),
        f = new n(),
        h = new t(),
        d = new u(),
        m = new u(),
        p = Math.pow(2, 12);
    c.prototype.encode = function (r, i, a, c, f, d, m) {
      var p = c.x,
          E = c.y;

      if (this.quantization === s.BITS12) {
        a = u.multiplyByPoint(this.toScaledENU, a, l), a.x = o.clamp(a.x, 0, 1), a.y = o.clamp(a.y, 0, 1), a.z = o.clamp(a.z, 0, 1);

        var _ = this.maximumHeight - this.minimumHeight,
            y = o.clamp((f - this.minimumHeight) / _, 0, 1);

        t.fromElements(a.x, a.y, h);
        var T = e.compressTextureCoordinates(h);
        t.fromElements(a.z, y, h);
        var R = e.compressTextureCoordinates(h);
        t.fromElements(p, E, h);
        var A = e.compressTextureCoordinates(h);

        if (r[i++] = T, r[i++] = R, r[i++] = A, this.hasWebMercatorT) {
          t.fromElements(m, 0, h);
          var v = e.compressTextureCoordinates(h);
          r[i++] = v;
        }
      } else n.subtract(a, this.center, l), r[i++] = l.x, r[i++] = l.y, r[i++] = l.z, r[i++] = f, r[i++] = p, r[i++] = E, this.hasWebMercatorT && (r[i++] = m);

      return this.hasVertexNormals && (r[i++] = e.octPackFloat(d)), i;
    }, c.prototype.decodePosition = function (t, r, i) {
      if (a(i) || (i = new n()), r *= this.getStride(), this.quantization === s.BITS12) {
        var o = e.decompressTextureCoordinates(t[r], h);
        i.x = o.x, i.y = o.y;
        var c = e.decompressTextureCoordinates(t[r + 1], h);
        return i.z = c.x, u.multiplyByPoint(this.fromScaledENU, i, i);
      }

      return i.x = t[r], i.y = t[r + 1], i.z = t[r + 2], n.add(i, this.center, i);
    }, c.prototype.decodeTextureCoordinates = function (n, r, i) {
      return a(i) || (i = new t()), r *= this.getStride(), this.quantization === s.BITS12 ? e.decompressTextureCoordinates(n[r + 2], i) : t.fromElements(n[r + 4], n[r + 5], i);
    }, c.prototype.decodeHeight = function (t, n) {
      if (n *= this.getStride(), this.quantization === s.BITS12) {
        return e.decompressTextureCoordinates(t[n + 1], h).y * (this.maximumHeight - this.minimumHeight) + this.minimumHeight;
      }

      return t[n + 3];
    }, c.prototype.decodeWebMercatorT = function (t, n) {
      return n *= this.getStride(), this.quantization === s.BITS12 ? e.decompressTextureCoordinates(t[n + 3], h).x : t[n + 6];
    }, c.prototype.getOctEncodedNormal = function (e, n, r) {
      n = (n + 1) * this.getStride() - 1;
      var i = e[n] / 256,
          a = Math.floor(i),
          o = 256 * (i - a);
      return t.fromElements(a, o, r);
    }, c.prototype.getStride = function () {
      var e;

      switch (this.quantization) {
        case s.BITS12:
          e = 3;
          break;

        default:
          e = 6;
      }

      return this.hasWebMercatorT && ++e, this.hasVertexNormals && ++e, e;
    };
    var E = {
      position3DAndHeight: 0,
      textureCoordAndEncodedNormals: 1
    },
        _ = {
      compressed0: 0,
      compressed1: 1
    };
    return c.prototype.getAttributes = function (e) {
      var t,
          n = r.FLOAT,
          i = r.getSizeInBytes(n);

      if (this.quantization === s.NONE) {
        var a = 2;
        return this.hasWebMercatorT && ++a, this.hasVertexNormals && ++a, t = (4 + a) * i, [{
          index: E.position3DAndHeight,
          vertexBuffer: e,
          componentDatatype: n,
          componentsPerAttribute: 4,
          offsetInBytes: 0,
          strideInBytes: t
        }, {
          index: E.textureCoordAndEncodedNormals,
          vertexBuffer: e,
          componentDatatype: n,
          componentsPerAttribute: a,
          offsetInBytes: 4 * i,
          strideInBytes: t
        }];
      }

      var o = 3,
          u = 0;
      return (this.hasWebMercatorT || this.hasVertexNormals) && ++o, this.hasWebMercatorT && this.hasVertexNormals ? (++u, t = (o + u) * i, [{
        index: _.compressed0,
        vertexBuffer: e,
        componentDatatype: n,
        componentsPerAttribute: o,
        offsetInBytes: 0,
        strideInBytes: t
      }, {
        index: _.compressed1,
        vertexBuffer: e,
        componentDatatype: n,
        componentsPerAttribute: u,
        offsetInBytes: o * i,
        strideInBytes: t
      }]) : [{
        index: _.compressed0,
        vertexBuffer: e,
        componentDatatype: n,
        componentsPerAttribute: o
      }];
    }, c.prototype.getAttributeLocations = function () {
      return this.quantization === s.NONE ? E : _;
    }, c.clone = function (e, t) {
      return a(t) || (t = new c()), t.quantization = e.quantization, t.minimumHeight = e.minimumHeight, t.maximumHeight = e.maximumHeight, t.center = n.clone(e.center), t.toScaledENU = u.clone(e.toScaledENU), t.fromScaledENU = u.clone(e.fromScaledENU), t.matrix = u.clone(e.matrix), t.hasVertexNormals = e.hasVertexNormals, t.hasWebMercatorT = e.hasWebMercatorT, t;
    }, c;
  }), define("Core/WebMercatorProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid", "./Math"], function (e, t, n, r, i, a, o, u) {
    "use strict";

    function s(e) {
      this._ellipsoid = n(e, o.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
    }

    return i(s.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      }
    }), s.mercatorAngleToGeodeticLatitude = function (e) {
      return u.PI_OVER_TWO - 2 * Math.atan(Math.exp(-e));
    }, s.geodeticLatitudeToMercatorAngle = function (e) {
      e > s.MaximumLatitude ? e = s.MaximumLatitude : e < -s.MaximumLatitude && (e = -s.MaximumLatitude);
      var t = Math.sin(e);
      return .5 * Math.log((1 + t) / (1 - t));
    }, s.MaximumLatitude = s.mercatorAngleToGeodeticLatitude(Math.PI), s.prototype.project = function (t, n) {
      var i = this._semimajorAxis,
          a = t.longitude * i,
          o = s.geodeticLatitudeToMercatorAngle(t.latitude) * i,
          u = t.height;
      return r(n) ? (n.x = a, n.y = o, n.z = u, n) : new e(a, o, u);
    }, s.prototype.unproject = function (e, n) {
      var i = this._oneOverSemimajorAxis,
          a = e.x * i,
          o = s.mercatorAngleToGeodeticLatitude(e.y * i),
          u = e.z;
      return r(n) ? (n.longitude = a, n.latitude = o, n.height = u, n) : new t(a, o, u);
    }, s;
  }), define("Core/formatError", ["./defined"], function (e) {
    "use strict";

    function t(t) {
      var n,
          r = t.name,
          i = t.message;
      n = e(r) && e(i) ? r + ": " + i : t.toString();
      var a = t.stack;
      return e(a) && (n += "\n" + a), n;
    }

    return t;
  }), define("Workers/createTaskProcessorWorker", ["../ThirdParty/when", "../Core/defaultValue", "../Core/defined", "../Core/formatError"], function (e, t, n, r) {
    "use strict";

    function i(t, n, r) {
      try {
        return t(n, r);
      } catch (t) {
        return e.reject(t);
      }
    }

    function a(a) {
      var o;
      return function (u) {
        var s = u.data,
            c = [],
            l = {
          id: s.id,
          result: void 0,
          error: void 0
        };
        return e(i(a, s.parameters, c)).then(function (e) {
          l.result = e;
        }).otherwise(function (e) {
          e instanceof Error ? l.error = {
            name: e.name,
            message: e.message,
            stack: e.stack
          } : l.error = e;
        }).always(function () {
          n(o) || (o = t(self.webkitPostMessage, self.postMessage)), s.canTransferArrayBuffer || (c.length = 0);

          try {
            o(l, c);
          } catch (e) {
            l.result = void 0, l.error = "postMessage failed with error: " + r(e) + "\n  with responseMessage: " + JSON.stringify(l), o(l);
          }
        });
      };
    }

    return a;
  }), define("Workers/createVerticesFromGoogleEarthEnterpriseBuffer", ["../Core/AxisAlignedBoundingBox", "../Core/BoundingSphere", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/Ellipsoid", "../Core/EllipsoidalOccluder", "../Core/Math", "../Core/Matrix4", "../Core/OrientedBoundingBox", "../Core/Rectangle", "../Core/RuntimeError", "../Core/TerrainEncoding", "../Core/Transforms", "../Core/WebMercatorProjection", "./createTaskProcessorWorker"], function (e, t, n, r, i, a, o, u, s, c, l, f, h, d, m, p, E, _) {
    "use strict";

    function y(e, t, n) {
      n = a(n, c);

      for (var r = e.length, i = 0; i < r; ++i) {
        if (n.equalsEpsilon(e[i], t, c.EPSILON12)) return i;
      }

      return -1;
    }

    function T(e, t) {
      e.ellipsoid = u.clone(e.ellipsoid), e.rectangle = h.clone(e.rectangle);
      var n = R(e.buffer, e.relativeToCenter, e.ellipsoid, e.rectangle, e.nativeRectangle, e.exaggeration, e.skirtHeight, e.includeWebMercatorT, e.negativeAltitudeExponentBias, e.negativeElevationThreshold),
          r = n.vertices;
      t.push(r.buffer);
      var i = n.indices;
      return t.push(i.buffer), {
        vertices: r.buffer,
        indices: i.buffer,
        numberOfAttributes: n.encoding.getStride(),
        minimumHeight: n.minimumHeight,
        maximumHeight: n.maximumHeight,
        boundingSphere3D: n.boundingSphere3D,
        orientedBoundingBox: n.orientedBoundingBox,
        occludeePointInScaledSpace: n.occludeePointInScaledSpace,
        encoding: n.encoding,
        vertexCountWithoutSkirts: n.vertexCountWithoutSkirts,
        skirtIndex: n.skirtIndex,
        westIndicesSouthToNorth: n.westIndicesSouthToNorth,
        southIndicesEastToWest: n.southIndicesEastToWest,
        eastIndicesNorthToSouth: n.eastIndicesNorthToSouth,
        northIndicesWestToEast: n.northIndicesWestToEast
      };
    }

    function R(a, u, h, _, T, R, P, U, D, F) {
      var L, b, B, z, q, G;
      o(_) ? (L = _.west, b = _.south, B = _.east, z = _.north, q = _.width, G = _.height) : (L = c.toRadians(T.west), b = c.toRadians(T.south), B = c.toRadians(T.east), z = c.toRadians(T.north), q = c.toRadians(_.width), G = c.toRadians(_.height));
      var V,
          W,
          X = [b, z],
          H = [L, B],
          Y = p.eastNorthUpToFixedFrame(u, h),
          k = l.inverseTransformation(Y, x);
      U && (V = E.geodeticLatitudeToMercatorAngle(b), W = 1 / (E.geodeticLatitudeToMercatorAngle(z) - V));
      var j = new DataView(a),
          Z = Number.POSITIVE_INFINITY,
          K = Number.NEGATIVE_INFINITY,
          J = w;
      J.x = Number.POSITIVE_INFINITY, J.y = Number.POSITIVE_INFINITY, J.z = Number.POSITIVE_INFINITY;
      var Q = C;
      Q.x = Number.NEGATIVE_INFINITY, Q.y = Number.NEGATIVE_INFINITY, Q.z = Number.NEGATIVE_INFINITY;
      var $,
          ee,
          te = 0,
          ne = 0,
          re = 0;

      for (ee = 0; ee < 4; ++ee) {
        var ie = te;
        $ = j.getUint32(ie, !0), ie += g;
        var ae = c.toRadians(180 * j.getFloat64(ie, !0));
        ie += N, -1 === y(H, ae) && H.push(ae);
        var oe = c.toRadians(180 * j.getFloat64(ie, !0));
        ie += N, -1 === y(X, oe) && X.push(oe), ie += 2 * N;
        var ue = j.getInt32(ie, !0);
        ie += S, ne += ue, ue = j.getInt32(ie, !0), re += 3 * ue, te += $ + g;
      }

      var se = [],
          ce = [],
          le = new Array(ne),
          fe = new Array(ne),
          he = new Array(ne),
          de = U ? new Array(ne) : [],
          me = new Array(re),
          pe = [],
          Ee = [],
          _e = [],
          ye = [],
          Te = 0,
          Re = 0;

      for (te = 0, ee = 0; ee < 4; ++ee) {
        $ = j.getUint32(te, !0), te += g;
        var Ae = te,
            ve = c.toRadians(180 * j.getFloat64(te, !0));
        te += N;
        var Se = c.toRadians(180 * j.getFloat64(te, !0));
        te += N;
        var ge = c.toRadians(180 * j.getFloat64(te, !0)),
            Ie = .5 * ge;
        te += N;
        var Ne = c.toRadians(180 * j.getFloat64(te, !0)),
            Me = .5 * Ne;
        te += N;
        var Oe = j.getInt32(te, !0);
        te += S;
        var we = j.getInt32(te, !0);
        te += S, te += S;

        for (var Ce = new Array(Oe), xe = 0; xe < Oe; ++xe) {
          var Pe = ve + j.getUint8(te++) * ge;
          M.longitude = Pe;
          var Ue = Se + j.getUint8(te++) * Ne;
          M.latitude = Ue;
          var De = 6371010 * j.getFloat32(te, !0);

          if (te += I, De < F && (De *= D), De *= R, M.height = De, -1 !== y(H, Pe) || -1 !== y(X, Ue)) {
            var Fe = y(se, M, i);

            if (-1 !== Fe) {
              Ce[xe] = ce[Fe];
              continue;
            }

            se.push(i.clone(M)), ce.push(Te);
          }

          Ce[xe] = Te, Math.abs(Pe - L) < Ie ? pe.push({
            index: Te,
            cartographic: i.clone(M)
          }) : Math.abs(Pe - B) < Ie ? _e.push({
            index: Te,
            cartographic: i.clone(M)
          }) : Math.abs(Ue - b) < Me ? Ee.push({
            index: Te,
            cartographic: i.clone(M)
          }) : Math.abs(Ue - z) < Me && ye.push({
            index: Te,
            cartographic: i.clone(M)
          }), Z = Math.min(De, Z), K = Math.max(De, K), he[Te] = De;
          var Le = h.cartographicToCartesian(M);
          le[Te] = Le, U && (de[Te] = (E.geodeticLatitudeToMercatorAngle(Ue) - V) * W), l.multiplyByPoint(k, Le, O), r.minimumByComponent(O, J, J), r.maximumByComponent(O, Q, Q);
          var be = (Pe - L) / (B - L);
          be = c.clamp(be, 0, 1);
          var Be = (Ue - b) / (z - b);
          Be = c.clamp(Be, 0, 1), fe[Te] = new n(be, Be), ++Te;
        }

        for (var ze = 3 * we, qe = 0; qe < ze; ++qe, ++Re) {
          me[Re] = Ce[j.getUint16(te, !0)], te += v;
        }

        if ($ !== te - Ae) throw new d("Invalid terrain tile.");
      }

      le.length = Te, fe.length = Te, he.length = Te, U && (de.length = Te);
      var Ge = Te,
          Ve = Re,
          We = {
        hMin: Z,
        lastBorderPoint: void 0,
        skirtHeight: P,
        toENU: k,
        ellipsoid: h,
        minimum: J,
        maximum: Q
      };
      pe.sort(function (e, t) {
        return t.cartographic.latitude - e.cartographic.latitude;
      }), Ee.sort(function (e, t) {
        return e.cartographic.longitude - t.cartographic.longitude;
      }), _e.sort(function (e, t) {
        return e.cartographic.latitude - t.cartographic.latitude;
      }), ye.sort(function (e, t) {
        return t.cartographic.longitude - e.cartographic.longitude;
      });

      if (A(le, he, fe, de, me, We, pe, -1e-5 * q, !0, -1e-5 * G), A(le, he, fe, de, me, We, Ee, -1e-5 * G, !1), A(le, he, fe, de, me, We, _e, 1e-5 * q, !0, 1e-5 * G), A(le, he, fe, de, me, We, ye, 1e-5 * G, !1), pe.length > 0 && ye.length > 0) {
        var Xe = pe[0].index,
            He = Ge,
            Ye = ye[ye.length - 1].index,
            ke = le.length - 1;
        me.push(Ye, ke, He, He, Xe, Ye);
      }

      ne = le.length;
      var je,
          Ze = t.fromPoints(le);
      o(_) && _.width < c.PI_OVER_TWO + c.EPSILON5 && (je = f.fromRectangle(_, Z, K, h));

      for (var Ke = new s(h), Je = Ke.computeHorizonCullingPoint(u, le), Qe = new e(J, Q, u), $e = new m(Qe, We.hMin, K, Y, !1, U), et = new Float32Array(ne * $e.getStride()), tt = 0, nt = 0; nt < ne; ++nt) {
        tt = $e.encode(et, tt, le[nt], fe[nt], he[nt], void 0, de[nt]);
      }

      var rt = pe.map(function (e) {
        return e.index;
      }).reverse(),
          it = Ee.map(function (e) {
        return e.index;
      }).reverse(),
          at = _e.map(function (e) {
        return e.index;
      }).reverse(),
          ot = ye.map(function (e) {
        return e.index;
      }).reverse();

      return it.unshift(at[at.length - 1]), it.push(rt[0]), ot.unshift(rt[rt.length - 1]), ot.push(at[0]), {
        vertices: et,
        indices: new Uint16Array(me),
        maximumHeight: K,
        minimumHeight: Z,
        encoding: $e,
        boundingSphere3D: Ze,
        orientedBoundingBox: je,
        occludeePointInScaledSpace: Je,
        vertexCountWithoutSkirts: Ge,
        skirtIndex: Ve,
        westIndicesSouthToNorth: rt,
        southIndicesEastToWest: it,
        eastIndicesNorthToSouth: at,
        northIndicesWestToEast: ot
      };
    }

    function A(e, t, a, u, s, f, h, d, m, p) {
      for (var E = h.length, _ = 0; _ < E; ++_) {
        var y = h[_],
            T = y.cartographic,
            R = y.index,
            A = e.length,
            v = T.longitude,
            S = T.latitude;
        S = c.clamp(S, -c.PI_OVER_TWO, c.PI_OVER_TWO);
        var g = T.height - f.skirtHeight;
        f.hMin = Math.min(f.hMin, g), i.fromRadians(v, S, g, M), m && (M.longitude += d), m ? _ === E - 1 ? M.latitude += p : 0 === _ && (M.latitude -= p) : M.latitude += d;
        var I = f.ellipsoid.cartographicToCartesian(M);
        e.push(I), t.push(g), a.push(n.clone(a[R])), u.length > 0 && u.push(u[R]), l.multiplyByPoint(f.toENU, I, O);
        var N = f.minimum,
            w = f.maximum;
        r.minimumByComponent(O, N, N), r.maximumByComponent(O, w, w);
        var C = f.lastBorderPoint;

        if (o(C)) {
          var x = C.index;
          s.push(x, A - 1, A, A, R, x);
        }

        f.lastBorderPoint = y;
      }
    }

    var v = Uint16Array.BYTES_PER_ELEMENT,
        S = Int32Array.BYTES_PER_ELEMENT,
        g = Uint32Array.BYTES_PER_ELEMENT,
        I = Float32Array.BYTES_PER_ELEMENT,
        N = Float64Array.BYTES_PER_ELEMENT,
        M = new i(),
        O = new r(),
        w = new r(),
        C = new r(),
        x = new l();
    return _(T);
  });
}();