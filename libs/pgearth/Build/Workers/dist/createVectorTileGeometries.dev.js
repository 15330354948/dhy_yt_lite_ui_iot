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

    var o = {};
    return o.typeOf = {}, o.defined = function (n, o) {
      if (!e(o)) throw new t(r(n));
    }, o.typeOf.func = function (e, r) {
      if ("function" != typeof r) throw new t(n(_typeof(r), "function", e));
    }, o.typeOf.string = function (e, r) {
      if ("string" != typeof r) throw new t(n(_typeof(r), "string", e));
    }, o.typeOf.number = function (e, r) {
      if ("number" != typeof r) throw new t(n(_typeof(r), "number", e));
    }, o.typeOf.number.lessThan = function (e, r, n) {
      if (o.typeOf.number(e, r), r >= n) throw new t("Expected " + e + " to be less than " + n + ", actual value was " + r);
    }, o.typeOf.number.lessThanOrEquals = function (e, r, n) {
      if (o.typeOf.number(e, r), r > n) throw new t("Expected " + e + " to be less than or equal to " + n + ", actual value was " + r);
    }, o.typeOf.number.greaterThan = function (e, r, n) {
      if (o.typeOf.number(e, r), r <= n) throw new t("Expected " + e + " to be greater than " + n + ", actual value was " + r);
    }, o.typeOf.number.greaterThanOrEquals = function (e, r, n) {
      if (o.typeOf.number(e, r), r < n) throw new t("Expected " + e + " to be greater than or equal to" + n + ", actual value was " + r);
    }, o.typeOf.object = function (e, r) {
      if ("object" != _typeof(r)) throw new t(n(_typeof(r), "object", e));
    }, o.typeOf.bool = function (e, r) {
      if ("boolean" != typeof r) throw new t(n(_typeof(r), "boolean", e));
    }, o.typeOf.number.equals = function (e, r, n, i) {
      if (o.typeOf.number(e, n), o.typeOf.number(r, i), n !== i) throw new t(e + " must be equal to " + r + ", the actual values are " + n + " and " + i);
    }, o;
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
  }), define("Core/Math", ["../ThirdParty/mersenne-twister", "./Check", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, r, n, o) {
    "use strict";

    var i = {};
    i.EPSILON1 = .1, i.EPSILON2 = .01, i.EPSILON3 = .001, i.EPSILON4 = 1e-4, i.EPSILON5 = 1e-5, i.EPSILON6 = 1e-6, i.EPSILON7 = 1e-7, i.EPSILON8 = 1e-8, i.EPSILON9 = 1e-9, i.EPSILON10 = 1e-10, i.EPSILON11 = 1e-11, i.EPSILON12 = 1e-12, i.EPSILON13 = 1e-13, i.EPSILON14 = 1e-14, i.EPSILON15 = 1e-15, i.EPSILON16 = 1e-16, i.EPSILON17 = 1e-17, i.EPSILON18 = 1e-18, i.EPSILON19 = 1e-19, i.EPSILON20 = 1e-20, i.EPSILON21 = 1e-21, i.GRAVITATIONALPARAMETER = 3986004418e5, i.SOLAR_RADIUS = 6955e5, i.LUNAR_RADIUS = 1737400, i.SIXTY_FOUR_KILOBYTES = 65536, i.sign = r(Math.sign, function (e) {
      return e = +e, 0 === e || e !== e ? e : e > 0 ? 1 : -1;
    }), i.signNotZero = function (e) {
      return e < 0 ? -1 : 1;
    }, i.toSNorm = function (e, t) {
      return t = r(t, 255), Math.round((.5 * i.clamp(e, -1, 1) + .5) * t);
    }, i.fromSNorm = function (e, t) {
      return t = r(t, 255), i.clamp(e, 0, t) / t * 2 - 1;
    }, i.normalize = function (e, t, r) {
      return r = Math.max(r - t, 0), 0 === r ? 0 : i.clamp((e - t) / r, 0, 1);
    }, i.sinh = r(Math.sinh, function (e) {
      return (Math.exp(e) - Math.exp(-e)) / 2;
    }), i.cosh = r(Math.cosh, function (e) {
      return (Math.exp(e) + Math.exp(-e)) / 2;
    }), i.lerp = function (e, t, r) {
      return (1 - r) * e + r * t;
    }, i.PI = Math.PI, i.ONE_OVER_PI = 1 / Math.PI, i.PI_OVER_TWO = Math.PI / 2, i.PI_OVER_THREE = Math.PI / 3, i.PI_OVER_FOUR = Math.PI / 4, i.PI_OVER_SIX = Math.PI / 6, i.THREE_PI_OVER_TWO = 3 * Math.PI / 2, i.TWO_PI = 2 * Math.PI, i.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), i.RADIANS_PER_DEGREE = Math.PI / 180, i.DEGREES_PER_RADIAN = 180 / Math.PI, i.RADIANS_PER_ARCSECOND = i.RADIANS_PER_DEGREE / 3600, i.toRadians = function (e) {
      return e * i.RADIANS_PER_DEGREE;
    }, i.toDegrees = function (e) {
      return e * i.DEGREES_PER_RADIAN;
    }, i.convertLongitudeRange = function (e) {
      var t = i.TWO_PI,
          r = e - Math.floor(e / t) * t;
      return r < -Math.PI ? r + t : r >= Math.PI ? r - t : r;
    }, i.clampToLatitudeRange = function (e) {
      return i.clamp(e, -1 * i.PI_OVER_TWO, i.PI_OVER_TWO);
    }, i.negativePiToPi = function (e) {
      return i.zeroToTwoPi(e + i.PI) - i.PI;
    }, i.zeroToTwoPi = function (e) {
      var t = i.mod(e, i.TWO_PI);
      return Math.abs(t) < i.EPSILON14 && Math.abs(e) > i.EPSILON14 ? i.TWO_PI : t;
    }, i.mod = function (e, t) {
      return (e % t + t) % t;
    }, i.equalsEpsilon = function (e, t, n, o) {
      o = r(o, n);
      var i = Math.abs(e - t);
      return i <= o || i <= n * Math.max(Math.abs(e), Math.abs(t));
    }, i.lessThan = function (e, t, r) {
      return e - t < -r;
    }, i.lessThanOrEquals = function (e, t, r) {
      return e - t < r;
    }, i.greaterThan = function (e, t, r) {
      return e - t > r;
    }, i.greaterThanOrEquals = function (e, t, r) {
      return e - t > -r;
    };
    var a = [1];
    i.factorial = function (e) {
      var t = a.length;
      if (e >= t) for (var r = a[t - 1], n = t; n <= e; n++) {
        a.push(r * n);
      }
      return a[e];
    }, i.incrementWrap = function (e, t, n) {
      return n = r(n, 0), ++e, e > t && (e = n), e;
    }, i.isPowerOfTwo = function (e) {
      return 0 !== e && 0 == (e & e - 1);
    }, i.nextPowerOfTwo = function (e) {
      return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e;
    }, i.clamp = function (e, t, r) {
      return e < t ? t : e > r ? r : e;
    };
    var s = new e();
    return i.setRandomNumberSeed = function (t) {
      s = new e(t);
    }, i.nextRandomNumber = function () {
      return s.random();
    }, i.randomBetween = function (e, t) {
      return i.nextRandomNumber() * (t - e) + e;
    }, i.acosClamped = function (e) {
      return Math.acos(i.clamp(e, -1, 1));
    }, i.asinClamped = function (e) {
      return Math.asin(i.clamp(e, -1, 1));
    }, i.chordLength = function (e, t) {
      return 2 * t * Math.sin(.5 * e);
    }, i.logBase = function (e, t) {
      return Math.log(e) / Math.log(t);
    }, i.cbrt = r(Math.cbrt, function (e) {
      var t = Math.pow(Math.abs(e), 1 / 3);
      return e < 0 ? -t : t;
    }), i.log2 = r(Math.log2, function (e) {
      return Math.log(e) * Math.LOG2E;
    }), i.fog = function (e, t) {
      var r = e * t;
      return 1 - Math.exp(-r * r);
    }, i.fastApproximateAtan = function (e) {
      return e * (-.1784 * Math.abs(e) - .0663 * e * e + 1.0301);
    }, i.fastApproximateAtan2 = function (e, t) {
      var r,
          n,
          o = Math.abs(e);
      r = Math.abs(t), n = Math.max(o, r), r = Math.min(o, r);
      var a = r / n;
      return o = i.fastApproximateAtan(a), o = Math.abs(t) > Math.abs(e) ? i.PI_OVER_TWO - o : o, o = e < 0 ? i.PI - o : o, o = t < 0 ? -o : o;
    }, i;
  }), define("Core/Cartesian3", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, o, i) {
    "use strict";

    function a(e, r, n) {
      this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0);
    }

    a.fromSpherical = function (e, n) {
      r(n) || (n = new a());
      var o = e.clock,
          i = e.cone,
          s = t(e.magnitude, 1),
          u = s * Math.sin(i);
      return n.x = u * Math.cos(o), n.y = u * Math.sin(o), n.z = s * Math.cos(i), n;
    }, a.fromElements = function (e, t, n, o) {
      return r(o) ? (o.x = e, o.y = t, o.z = n, o) : new a(e, t, n);
    }, a.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t) : new a(e.x, e.y, e.z);
    }, a.fromCartesian4 = a.clone, a.packedLength = 3, a.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n++] = e.y, r[n] = e.z, r;
    }, a.unpack = function (e, n, o) {
      return n = t(n, 0), r(o) || (o = new a()), o.x = e[n++], o.y = e[n++], o.z = e[n], o;
    }, a.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 3 * n : t = new Array(3 * n);

      for (var o = 0; o < n; ++o) {
        a.pack(e[o], t, 3 * o);
      }

      return t;
    }, a.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 3 : t = new Array(n / 3);

      for (var o = 0; o < n; o += 3) {
        var i = o / 3;
        t[i] = a.unpack(e, o, t[i]);
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
    var s = new a();
    a.distance = function (e, t) {
      return a.subtract(e, t, s), a.magnitude(s);
    }, a.distanceSquared = function (e, t) {
      return a.subtract(e, t, s), a.magnitudeSquared(s);
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
    var u = new a();

    a.lerp = function (e, t, r, n) {
      return a.multiplyByScalar(t, r, u), n = a.multiplyByScalar(e, 1 - r, n), a.add(u, n, n);
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
    }, a.equalsEpsilon = function (e, t, n, o) {
      return e === t || r(e) && r(t) && i.equalsEpsilon(e.x, t.x, n, o) && i.equalsEpsilon(e.y, t.y, n, o) && i.equalsEpsilon(e.z, t.z, n, o);
    }, a.cross = function (e, t, r) {
      var n = e.x,
          o = e.y,
          i = e.z,
          a = t.x,
          s = t.y,
          u = t.z,
          c = o * u - i * s,
          l = i * a - n * u,
          f = n * s - o * a;
      return r.x = c, r.y = l, r.z = f, r;
    }, a.midpoint = function (e, t, r) {
      return r.x = .5 * (e.x + t.x), r.y = .5 * (e.y + t.y), r.z = .5 * (e.z + t.z), r;
    }, a.fromDegrees = function (e, t, r, n, o) {
      return e = i.toRadians(e), t = i.toRadians(t), a.fromRadians(e, t, r, n, o);
    };
    var h = new a(),
        E = new a(),
        d = new a(40680631590769, 40680631590769, 40408299984661.445);
    return a.fromRadians = function (e, n, o, i, s) {
      o = t(o, 0);
      var u = r(i) ? i.radiiSquared : d,
          c = Math.cos(n);
      h.x = c * Math.cos(e), h.y = c * Math.sin(e), h.z = Math.sin(n), h = a.normalize(h, h), a.multiplyComponents(u, h, E);
      var l = Math.sqrt(a.dot(h, E));
      return E = a.divideByScalar(E, l, E), h = a.multiplyByScalar(h, o, h), r(s) || (s = new a()), a.add(E, h, s);
    }, a.fromDegreesArray = function (e, t, n) {
      var o = e.length;
      r(n) ? n.length = o / 2 : n = new Array(o / 2);

      for (var i = 0; i < o; i += 2) {
        var s = e[i],
            u = e[i + 1],
            c = i / 2;
        n[c] = a.fromDegrees(s, u, 0, t, n[c]);
      }

      return n;
    }, a.fromRadiansArray = function (e, t, n) {
      var o = e.length;
      r(n) ? n.length = o / 2 : n = new Array(o / 2);

      for (var i = 0; i < o; i += 2) {
        var s = e[i],
            u = e[i + 1],
            c = i / 2;
        n[c] = a.fromRadians(s, u, 0, t, n[c]);
      }

      return n;
    }, a.fromDegreesArrayHeights = function (e, t, n) {
      var o = e.length;
      r(n) ? n.length = o / 3 : n = new Array(o / 3);

      for (var i = 0; i < o; i += 3) {
        var s = e[i],
            u = e[i + 1],
            c = e[i + 2],
            l = i / 3;
        n[l] = a.fromDegrees(s, u, c, t, n[l]);
      }

      return n;
    }, a.fromRadiansArrayHeights = function (e, t, n) {
      var o = e.length;
      r(n) ? n.length = o / 3 : n = new Array(o / 3);

      for (var i = 0; i < o; i += 3) {
        var s = e[i],
            u = e[i + 1],
            c = e[i + 2],
            l = i / 3;
        n[l] = a.fromRadians(s, u, c, t, n[l]);
      }

      return n;
    }, a.ZERO = o(new a(0, 0, 0)), a.UNIT_X = o(new a(1, 0, 0)), a.UNIT_Y = o(new a(0, 1, 0)), a.UNIT_Z = o(new a(0, 0, 1)), a.prototype.clone = function (e) {
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

    function o(r, o, s, u, c) {
      var l = r.x,
          f = r.y,
          h = r.z,
          E = o.x,
          d = o.y,
          m = o.z,
          p = l * l * E * E,
          _ = f * f * d * d,
          y = h * h * m * m,
          A = p + _ + y,
          T = Math.sqrt(1 / A),
          R = e.multiplyByScalar(r, T, i);

      if (A < u) return isFinite(T) ? e.clone(R, c) : void 0;
      var S = s.x,
          C = s.y,
          g = s.z,
          I = a;
      I.x = R.x * S * 2, I.y = R.y * C * 2, I.z = R.z * g * 2;
      var O,
          v,
          N,
          w,
          M,
          F,
          x,
          D,
          U,
          P,
          L,
          b = (1 - T) * e.magnitude(r) / (.5 * e.magnitude(I)),
          B = 0;

      do {
        b -= B, N = 1 / (1 + b * S), w = 1 / (1 + b * C), M = 1 / (1 + b * g), F = N * N, x = w * w, D = M * M, U = F * N, P = x * w, L = D * M, O = p * F + _ * x + y * D - 1, v = p * U * S + _ * P * C + y * L * g;
        B = O / (-2 * v);
      } while (Math.abs(O) > n.EPSILON12);

      return t(c) ? (c.x = l * N, c.y = f * w, c.z = h * M, c) : new e(l * N, f * w, h * M);
    }

    var i = new e(),
        a = new e();
    return o;
  }), define("Core/Cartographic", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, r, n, o, i, a) {
    "use strict";

    function s(e, t, n) {
      this.longitude = r(e, 0), this.latitude = r(t, 0), this.height = r(n, 0);
    }

    s.fromRadians = function (e, t, o, i) {
      return o = r(o, 0), n(i) ? (i.longitude = e, i.latitude = t, i.height = o, i) : new s(e, t, o);
    }, s.fromDegrees = function (e, t, r, n) {
      return e = i.toRadians(e), t = i.toRadians(t), s.fromRadians(e, t, r, n);
    };
    var u = new e(),
        c = new e(),
        l = new e(),
        f = new e(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
        h = new e(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
        E = i.EPSILON1;
    return s.fromCartesian = function (t, r, o) {
      var d = n(r) ? r.oneOverRadii : f,
          m = n(r) ? r.oneOverRadiiSquared : h,
          p = n(r) ? r._centerToleranceSquared : E,
          _ = a(t, d, m, p, c);

      if (n(_)) {
        var y = e.multiplyComponents(_, m, u);
        y = e.normalize(y, y);
        var A = e.subtract(t, _, l),
            T = Math.atan2(y.y, y.x),
            R = Math.asin(y.z),
            S = i.sign(e.dot(A, t)) * e.magnitude(A);
        return n(o) ? (o.longitude = T, o.latitude = R, o.height = S, o) : new s(T, R, S);
      }
    }, s.toCartesian = function (t, r, n) {
      return e.fromRadians(t.longitude, t.latitude, t.height, r, n);
    }, s.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.longitude = e.longitude, t.latitude = e.latitude, t.height = e.height, t) : new s(e.longitude, e.latitude, e.height);
    }, s.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height;
    }, s.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.longitude - t.longitude) <= r && Math.abs(e.latitude - t.latitude) <= r && Math.abs(e.height - t.height) <= r;
    }, s.ZERO = o(new s(0, 0, 0)), s.prototype.clone = function (e) {
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
  }), define("Core/Ellipsoid", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function (e, t, r, n, o, i, a, s, u, c) {
    "use strict";

    function l(t, r, o, i) {
      r = n(r, 0), o = n(o, 0), i = n(i, 0), t._radii = new e(r, o, i), t._radiiSquared = new e(r * r, o * o, i * i), t._radiiToTheFourth = new e(r * r * r * r, o * o * o * o, i * i * i * i), t._oneOverRadii = new e(0 === r ? 0 : 1 / r, 0 === o ? 0 : 1 / o, 0 === i ? 0 : 1 / i), t._oneOverRadiiSquared = new e(0 === r ? 0 : 1 / (r * r), 0 === o ? 0 : 1 / (o * o), 0 === i ? 0 : 1 / (i * i)), t._minimumRadius = Math.min(r, o, i), t._maximumRadius = Math.max(r, o, i), t._centerToleranceSquared = u.EPSILON1, 0 !== t._radiiSquared.z && (t._squaredXOverSquaredZ = t._radiiSquared.x / t._radiiSquared.z);
    }

    function f(e, t, r) {
      this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, l(this, e, t, r);
    }

    i(f.prototype, {
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
      if (o(t)) {
        var n = t._radii;
        return o(r) ? (e.clone(n, r._radii), e.clone(t._radiiSquared, r._radiiSquared), e.clone(t._radiiToTheFourth, r._radiiToTheFourth), e.clone(t._oneOverRadii, r._oneOverRadii), e.clone(t._oneOverRadiiSquared, r._oneOverRadiiSquared), r._minimumRadius = t._minimumRadius, r._maximumRadius = t._maximumRadius, r._centerToleranceSquared = t._centerToleranceSquared, r) : new f(n.x, n.y, n.z);
      }
    }, f.fromCartesian3 = function (e, t) {
      return o(t) || (t = new f()), o(e) ? (l(t, e.x, e.y, e.z), t) : t;
    }, f.WGS84 = s(new f(6378137, 6378137, 6356752.314245179)), f.UNIT_SPHERE = s(new f(1, 1, 1)), f.MOON = s(new f(u.LUNAR_RADIUS, u.LUNAR_RADIUS, u.LUNAR_RADIUS)), f.prototype.clone = function (e) {
      return f.clone(this, e);
    }, f.packedLength = e.packedLength, f.pack = function (t, r, o) {
      return o = n(o, 0), e.pack(t._radii, r, o), r;
    }, f.unpack = function (t, r, o) {
      r = n(r, 0);
      var i = e.unpack(t, r);
      return f.fromCartesian3(i, o);
    }, f.prototype.geocentricSurfaceNormal = e.normalize, f.prototype.geodeticSurfaceNormalCartographic = function (t, r) {
      var n = t.longitude,
          i = t.latitude,
          a = Math.cos(i),
          s = a * Math.cos(n),
          u = a * Math.sin(n),
          c = Math.sin(i);
      return o(r) || (r = new e()), r.x = s, r.y = u, r.z = c, e.normalize(r, r);
    }, f.prototype.geodeticSurfaceNormal = function (t, r) {
      return o(r) || (r = new e()), r = e.multiplyComponents(t, this._oneOverRadiiSquared, r), e.normalize(r, r);
    };
    var h = new e(),
        E = new e();
    f.prototype.cartographicToCartesian = function (t, r) {
      var n = h,
          i = E;
      this.geodeticSurfaceNormalCartographic(t, n), e.multiplyComponents(this._radiiSquared, n, i);
      var a = Math.sqrt(e.dot(n, i));
      return e.divideByScalar(i, a, i), e.multiplyByScalar(n, t.height, n), o(r) || (r = new e()), e.add(i, n, r);
    }, f.prototype.cartographicArrayToCartesianArray = function (e, t) {
      var r = e.length;
      o(t) ? t.length = r : t = new Array(r);

      for (var n = 0; n < r; n++) {
        t[n] = this.cartographicToCartesian(e[n], t[n]);
      }

      return t;
    };
    var d = new e(),
        m = new e(),
        p = new e();
    return f.prototype.cartesianToCartographic = function (r, n) {
      var i = this.scaleToGeodeticSurface(r, m);

      if (o(i)) {
        var a = this.geodeticSurfaceNormal(i, d),
            s = e.subtract(r, i, p),
            c = Math.atan2(a.y, a.x),
            l = Math.asin(a.z),
            f = u.sign(e.dot(s, r)) * e.magnitude(s);
        return o(n) ? (n.longitude = c, n.latitude = l, n.height = f, n) : new t(c, l, f);
      }
    }, f.prototype.cartesianArrayToCartographicArray = function (e, t) {
      var r = e.length;
      o(t) ? t.length = r : t = new Array(r);

      for (var n = 0; n < r; ++n) {
        t[n] = this.cartesianToCartographic(e[n], t[n]);
      }

      return t;
    }, f.prototype.scaleToGeodeticSurface = function (e, t) {
      return c(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t);
    }, f.prototype.scaleToGeocentricSurface = function (t, r) {
      o(r) || (r = new e());
      var n = t.x,
          i = t.y,
          a = t.z,
          s = this._oneOverRadiiSquared,
          u = 1 / Math.sqrt(n * n * s.x + i * i * s.y + a * a * s.z);
      return e.multiplyByScalar(t, u, r);
    }, f.prototype.transformPositionToScaledSpace = function (t, r) {
      return o(r) || (r = new e()), e.multiplyComponents(t, this._oneOverRadii, r);
    }, f.prototype.transformPositionFromScaledSpace = function (t, r) {
      return o(r) || (r = new e()), e.multiplyComponents(t, this._radii, r);
    }, f.prototype.equals = function (t) {
      return this === t || o(t) && e.equals(this._radii, t._radii);
    }, f.prototype.toString = function () {
      return this._radii.toString();
    }, f.prototype.getSurfaceNormalIntersectionWithZAxis = function (t, r, i) {
      r = n(r, 0);
      var a = this._squaredXOverSquaredZ;
      if (o(i) || (i = new e()), i.x = 0, i.y = 0, i.z = t.z * (1 - a), !(Math.abs(i.z) >= this._radii.z - r)) return i;
    }, f;
  }), define("Core/GeographicProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function (e, t, r, n, o, i, a) {
    "use strict";

    function s(e) {
      this._ellipsoid = r(e, a.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis;
    }

    return o(s.prototype, {
      ellipsoid: {
        get: function get() {
          return this._ellipsoid;
        }
      }
    }), s.prototype.project = function (t, r) {
      var o = this._semimajorAxis,
          i = t.longitude * o,
          a = t.latitude * o,
          s = t.height;
      return n(r) ? (r.x = i, r.y = a, r.z = s, r) : new e(i, a, s);
    }, s.prototype.unproject = function (e, r) {
      var o = this._oneOverSemimajorAxis,
          i = e.x * o,
          a = e.y * o,
          s = e.z;
      return n(r) ? (r.longitude = i, r.latitude = a, r.height = s, r) : new t(i, a, s);
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
  }), define("Core/Matrix3", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, o, i, a, s) {
    "use strict";

    function u(e, t, n, o, i, a, s, u, c) {
      this[0] = r(e, 0), this[1] = r(o, 0), this[2] = r(s, 0), this[3] = r(t, 0), this[4] = r(i, 0), this[5] = r(u, 0), this[6] = r(n, 0), this[7] = r(a, 0), this[8] = r(c, 0);
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
        var n = e[u.getElementIndex(m[r], d[r])];
        t += 2 * n * n;
      }

      return Math.sqrt(t);
    }

    function f(e, t) {
      for (var r = s.EPSILON15, n = 0, o = 1, i = 0; i < 3; ++i) {
        var a = Math.abs(e[u.getElementIndex(m[i], d[i])]);
        a > n && (o = i, n = a);
      }

      var c = 1,
          l = 0,
          f = d[o],
          h = m[o];

      if (Math.abs(e[u.getElementIndex(h, f)]) > r) {
        var E,
            p = e[u.getElementIndex(h, h)],
            _ = e[u.getElementIndex(f, f)],
            y = e[u.getElementIndex(h, f)],
            A = (p - _) / 2 / y;
        E = A < 0 ? -1 / (-A + Math.sqrt(1 + A * A)) : 1 / (A + Math.sqrt(1 + A * A)), c = 1 / Math.sqrt(1 + E * E), l = E * c;
      }

      return t = u.clone(u.IDENTITY, t), t[u.getElementIndex(f, f)] = t[u.getElementIndex(h, h)] = c, t[u.getElementIndex(h, f)] = l, t[u.getElementIndex(f, h)] = -l, t;
    }

    u.packedLength = 9, u.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t[n++] = e[4], t[n++] = e[5], t[n++] = e[6], t[n++] = e[7], t[n++] = e[8], t;
    }, u.unpack = function (e, t, o) {
      return t = r(t, 0), n(o) || (o = new u()), o[0] = e[t++], o[1] = e[t++], o[2] = e[t++], o[3] = e[t++], o[4] = e[t++], o[5] = e[t++], o[6] = e[t++], o[7] = e[t++], o[8] = e[t++], o;
    }, u.clone = function (e, t) {
      if (n(e)) return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new u(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]);
    }, u.fromArray = function (e, t, o) {
      return t = r(t, 0), n(o) || (o = new u()), o[0] = e[t], o[1] = e[t + 1], o[2] = e[t + 2], o[3] = e[t + 3], o[4] = e[t + 4], o[5] = e[t + 5], o[6] = e[t + 6], o[7] = e[t + 7], o[8] = e[t + 8], o;
    }, u.fromColumnMajorArray = function (e, t) {
      return u.clone(e, t);
    }, u.fromRowMajorArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], t) : new u(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
    }, u.fromQuaternion = function (e, t) {
      var r = e.x * e.x,
          o = e.x * e.y,
          i = e.x * e.z,
          a = e.x * e.w,
          s = e.y * e.y,
          c = e.y * e.z,
          l = e.y * e.w,
          f = e.z * e.z,
          h = e.z * e.w,
          E = e.w * e.w,
          d = r - s - f + E,
          m = 2 * (o - h),
          p = 2 * (i + l),
          _ = 2 * (o + h),
          y = -r + s - f + E,
          A = 2 * (c - a),
          T = 2 * (i - l),
          R = 2 * (c + a),
          S = -r - s + f + E;

      return n(t) ? (t[0] = d, t[1] = _, t[2] = T, t[3] = m, t[4] = y, t[5] = R, t[6] = p, t[7] = A, t[8] = S, t) : new u(d, m, p, _, y, A, T, R, S);
    }, u.fromHeadingPitchRoll = function (e, t) {
      var r = Math.cos(-e.pitch),
          o = Math.cos(-e.heading),
          i = Math.cos(e.roll),
          a = Math.sin(-e.pitch),
          s = Math.sin(-e.heading),
          c = Math.sin(e.roll),
          l = r * o,
          f = -i * s + c * a * o,
          h = c * s + i * a * o,
          E = r * s,
          d = i * o + c * a * s,
          m = -c * o + i * a * s,
          p = -a,
          _ = c * r,
          y = i * r;

      return n(t) ? (t[0] = l, t[1] = E, t[2] = p, t[3] = f, t[4] = d, t[5] = _, t[6] = h, t[7] = m, t[8] = y, t) : new u(l, f, h, E, d, m, p, _, y);
    }, u.fromScale = function (e, t) {
      return n(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e.y, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e.z, t) : new u(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z);
    }, u.fromUniformScale = function (e, t) {
      return n(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = e, t) : new u(e, 0, 0, 0, e, 0, 0, 0, e);
    }, u.fromCrossProduct = function (e, t) {
      return n(t) ? (t[0] = 0, t[1] = e.z, t[2] = -e.y, t[3] = -e.z, t[4] = 0, t[5] = e.x, t[6] = e.y, t[7] = -e.x, t[8] = 0, t) : new u(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0);
    }, u.fromRotationX = function (e, t) {
      var r = Math.cos(e),
          o = Math.sin(e);
      return n(t) ? (t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = r, t[5] = o, t[6] = 0, t[7] = -o, t[8] = r, t) : new u(1, 0, 0, 0, r, -o, 0, o, r);
    }, u.fromRotationY = function (e, t) {
      var r = Math.cos(e),
          o = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = 0, t[2] = -o, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = o, t[7] = 0, t[8] = r, t) : new u(r, 0, o, 0, 1, 0, -o, 0, r);
    }, u.fromRotationZ = function (e, t) {
      var r = Math.cos(e),
          o = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = o, t[2] = 0, t[3] = -o, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new u(r, -o, 0, o, r, 0, 0, 0, 1);
    }, u.toArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]];
    }, u.getElementIndex = function (e, t) {
      return 3 * e + t;
    }, u.getColumn = function (e, t, r) {
      var n = 3 * t,
          o = e[n],
          i = e[n + 1],
          a = e[n + 2];
      return r.x = o, r.y = i, r.z = a, r;
    }, u.setColumn = function (e, t, r, n) {
      n = u.clone(e, n);
      var o = 3 * t;
      return n[o] = r.x, n[o + 1] = r.y, n[o + 2] = r.z, n;
    }, u.getRow = function (e, t, r) {
      var n = e[t],
          o = e[t + 3],
          i = e[t + 6];
      return r.x = n, r.y = o, r.z = i, r;
    }, u.setRow = function (e, t, r, n) {
      return n = u.clone(e, n), n[t] = r.x, n[t + 3] = r.y, n[t + 6] = r.z, n;
    };
    var h = new e();

    u.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], t[2], h)), r.y = e.magnitude(e.fromElements(t[3], t[4], t[5], h)), r.z = e.magnitude(e.fromElements(t[6], t[7], t[8], h)), r;
    };

    var E = new e();
    u.getMaximumScale = function (t) {
      return u.getScale(t, E), e.maximumComponent(E);
    }, u.multiply = function (e, t, r) {
      var n = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
          o = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
          i = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
          a = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
          s = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
          u = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
          c = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
          l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
          f = e[2] * t[6] + e[5] * t[7] + e[8] * t[8];
      return r[0] = n, r[1] = o, r[2] = i, r[3] = a, r[4] = s, r[5] = u, r[6] = c, r[7] = l, r[8] = f, r;
    }, u.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r;
    }, u.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r;
    }, u.multiplyByVector = function (e, t, r) {
      var n = t.x,
          o = t.y,
          i = t.z,
          a = e[0] * n + e[3] * o + e[6] * i,
          s = e[1] * n + e[4] * o + e[7] * i,
          u = e[2] * n + e[5] * o + e[8] * i;
      return r.x = a, r.y = s, r.z = u, r;
    }, u.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r;
    }, u.multiplyByScale = function (e, t, r) {
      return r[0] = e[0] * t.x, r[1] = e[1] * t.x, r[2] = e[2] * t.x, r[3] = e[3] * t.y, r[4] = e[4] * t.y, r[5] = e[5] * t.y, r[6] = e[6] * t.z, r[7] = e[7] * t.z, r[8] = e[8] * t.z, r;
    }, u.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t;
    }, u.transpose = function (e, t) {
      var r = e[0],
          n = e[3],
          o = e[6],
          i = e[1],
          a = e[4],
          s = e[7],
          u = e[2],
          c = e[5],
          l = e[8];
      return t[0] = r, t[1] = n, t[2] = o, t[3] = i, t[4] = a, t[5] = s, t[6] = u, t[7] = c, t[8] = l, t;
    };

    var d = [1, 0, 0],
        m = [2, 2, 1],
        p = new u(),
        _ = new u();

    return u.computeEigenDecomposition = function (e, t) {
      var r = s.EPSILON20,
          o = 0,
          i = 0;
      n(t) || (t = {});

      for (var a = t.unitary = u.clone(u.IDENTITY, t.unitary), h = t.diagonal = u.clone(e, t.diagonal), E = r * c(h); i < 10 && l(h) > E;) {
        f(h, p), u.transpose(p, _), u.multiply(h, p, h), u.multiply(_, h, h), u.multiply(a, p, a), ++o > 2 && (++i, o = 0);
      }

      return t;
    }, u.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t;
    }, u.determinant = function (e) {
      var t = e[0],
          r = e[3],
          n = e[6],
          o = e[1],
          i = e[4],
          a = e[7],
          s = e[2],
          u = e[5],
          c = e[8];
      return t * (i * c - u * a) + o * (u * n - r * c) + s * (r * a - i * n);
    }, u.inverse = function (e, t) {
      var r = e[0],
          n = e[1],
          o = e[2],
          i = e[3],
          a = e[4],
          s = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = u.determinant(e);
      t[0] = a * f - l * s, t[1] = l * o - n * f, t[2] = n * s - a * o, t[3] = c * s - i * f, t[4] = r * f - c * o, t[5] = i * o - r * s, t[6] = i * l - c * a, t[7] = c * n - r * l, t[8] = r * a - i * n;
      var E = 1 / h;
      return u.multiplyByScalar(t, E, t);
    }, u.equals = function (e, t) {
      return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
    }, u.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r;
    }, u.IDENTITY = a(new u(1, 0, 0, 0, 1, 0, 0, 0, 1)), u.ZERO = a(new u(0, 0, 0, 0, 0, 0, 0, 0, 0)), u.COLUMN0ROW0 = 0, u.COLUMN0ROW1 = 1, u.COLUMN0ROW2 = 2, u.COLUMN1ROW0 = 3, u.COLUMN1ROW1 = 4, u.COLUMN1ROW2 = 5, u.COLUMN2ROW0 = 6, u.COLUMN2ROW1 = 7, u.COLUMN2ROW2 = 8, o(u.prototype, {
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
  }), define("Core/Cartesian4", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, o, i) {
    "use strict";

    function a(e, r, n, o) {
      this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0), this.w = t(o, 0);
    }

    a.fromElements = function (e, t, n, o, i) {
      return r(i) ? (i.x = e, i.y = t, i.z = n, i.w = o, i) : new a(e, t, n, o);
    }, a.fromColor = function (e, t) {
      return r(t) ? (t.x = e.red, t.y = e.green, t.z = e.blue, t.w = e.alpha, t) : new a(e.red, e.green, e.blue, e.alpha);
    }, a.clone = function (e, t) {
      if (r(e)) return r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new a(e.x, e.y, e.z, e.w);
    }, a.packedLength = 4, a.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.x, r[n++] = e.y, r[n++] = e.z, r[n] = e.w, r;
    }, a.unpack = function (e, n, o) {
      return n = t(n, 0), r(o) || (o = new a()), o.x = e[n++], o.y = e[n++], o.z = e[n++], o.w = e[n], o;
    }, a.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 4 * n : t = new Array(4 * n);

      for (var o = 0; o < n; ++o) {
        a.pack(e[o], t, 4 * o);
      }

      return t;
    }, a.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 4 : t = new Array(n / 4);

      for (var o = 0; o < n; o += 4) {
        var i = o / 4;
        t[i] = a.unpack(e, o, t[i]);
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
    var s = new a();
    a.distance = function (e, t) {
      return a.subtract(e, t, s), a.magnitude(s);
    }, a.distanceSquared = function (e, t) {
      return a.subtract(e, t, s), a.magnitudeSquared(s);
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
    var u = new a();

    a.lerp = function (e, t, r, n) {
      return a.multiplyByScalar(t, r, u), n = a.multiplyByScalar(e, 1 - r, n), a.add(u, n, n);
    };

    var c = new a();
    a.mostOrthogonalAxis = function (e, t) {
      var r = a.normalize(e, c);
      return a.abs(r, r), t = r.x <= r.y ? r.x <= r.z ? r.x <= r.w ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_W, t) : r.z <= r.w ? a.clone(a.UNIT_Z, t) : a.clone(a.UNIT_W, t) : r.y <= r.z ? r.y <= r.w ? a.clone(a.UNIT_Y, t) : a.clone(a.UNIT_W, t) : r.z <= r.w ? a.clone(a.UNIT_Z, t) : a.clone(a.UNIT_W, t);
    }, a.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, a.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2] && e.w === t[r + 3];
    }, a.equalsEpsilon = function (e, t, n, o) {
      return e === t || r(e) && r(t) && i.equalsEpsilon(e.x, t.x, n, o) && i.equalsEpsilon(e.y, t.y, n, o) && i.equalsEpsilon(e.z, t.z, n, o) && i.equalsEpsilon(e.w, t.w, n, o);
    }, a.ZERO = o(new a(0, 0, 0, 0)), a.UNIT_X = o(new a(1, 0, 0, 0)), a.UNIT_Y = o(new a(0, 1, 0, 0)), a.UNIT_Z = o(new a(0, 0, 1, 0)), a.UNIT_W = o(new a(0, 0, 0, 1)), a.prototype.clone = function (e) {
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
          o = e < 0 ? 1 : 0;
      isFinite(e) ? (e = Math.abs(e), n = Math.floor(i.logBase(e, 10)) + 1, e /= Math.pow(10, n)) : (e = .1, n = 38);
      var s = 256 * e;
      return t.x = Math.floor(s), s = 256 * (s - t.x), t.y = Math.floor(s), s = 256 * (s - t.y), t.z = Math.floor(s), t.w = 2 * (n + 38) + o, t;
    }, a.unpackFloat = function (e) {
      var t = e.w / 2,
          r = Math.floor(t),
          n = 2 * (t - r);
      if (r -= 38, n = 2 * n - 1, n = -n, r >= 38) return n < 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      var o = n * e.x * (1 / 256);
      return o += n * e.y * (1 / 65536), (o += n * e.z * (1 / 16777216)) * Math.pow(10, r);
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
  }), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function (e, t, r, n, o, i, a, s, u, c) {
    "use strict";

    function l(e, t, r, o, i, a, s, u, c, l, f, h, E, d, m, p) {
      this[0] = n(e, 0), this[1] = n(i, 0), this[2] = n(c, 0), this[3] = n(E, 0), this[4] = n(t, 0), this[5] = n(a, 0), this[6] = n(l, 0), this[7] = n(d, 0), this[8] = n(r, 0), this[9] = n(s, 0), this[10] = n(f, 0), this[11] = n(m, 0), this[12] = n(o, 0), this[13] = n(u, 0), this[14] = n(h, 0), this[15] = n(p, 0);
    }

    l.packedLength = 16, l.pack = function (e, t, r) {
      return r = n(r, 0), t[r++] = e[0], t[r++] = e[1], t[r++] = e[2], t[r++] = e[3], t[r++] = e[4], t[r++] = e[5], t[r++] = e[6], t[r++] = e[7], t[r++] = e[8], t[r++] = e[9], t[r++] = e[10], t[r++] = e[11], t[r++] = e[12], t[r++] = e[13], t[r++] = e[14], t[r] = e[15], t;
    }, l.unpack = function (e, t, r) {
      return t = n(t, 0), o(r) || (r = new l()), r[0] = e[t++], r[1] = e[t++], r[2] = e[t++], r[3] = e[t++], r[4] = e[t++], r[5] = e[t++], r[6] = e[t++], r[7] = e[t++], r[8] = e[t++], r[9] = e[t++], r[10] = e[t++], r[11] = e[t++], r[12] = e[t++], r[13] = e[t++], r[14] = e[t++], r[15] = e[t], r;
    }, l.clone = function (e, t) {
      if (o(e)) return o(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : new l(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]);
    }, l.fromArray = l.unpack, l.fromColumnMajorArray = function (e, t) {
      return l.clone(e, t);
    }, l.fromRowMajorArray = function (e, t) {
      return o(t) ? (t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t) : new l(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
    }, l.fromRotationTranslation = function (t, r, i) {
      return r = n(r, e.ZERO), o(i) ? (i[0] = t[0], i[1] = t[1], i[2] = t[2], i[3] = 0, i[4] = t[3], i[5] = t[4], i[6] = t[5], i[7] = 0, i[8] = t[6], i[9] = t[7], i[10] = t[8], i[11] = 0, i[12] = r.x, i[13] = r.y, i[14] = r.z, i[15] = 1, i) : new l(t[0], t[3], t[6], r.x, t[1], t[4], t[7], r.y, t[2], t[5], t[8], r.z, 0, 0, 0, 1);
    }, l.fromTranslationQuaternionRotationScale = function (e, t, r, n) {
      o(n) || (n = new l());

      var i = r.x,
          a = r.y,
          s = r.z,
          u = t.x * t.x,
          c = t.x * t.y,
          f = t.x * t.z,
          h = t.x * t.w,
          E = t.y * t.y,
          d = t.y * t.z,
          m = t.y * t.w,
          p = t.z * t.z,
          _ = t.z * t.w,
          y = t.w * t.w,
          A = u - E - p + y,
          T = 2 * (c - _),
          R = 2 * (f + m),
          S = 2 * (c + _),
          C = -u + E - p + y,
          g = 2 * (d - h),
          I = 2 * (f - m),
          O = 2 * (d + h),
          v = -u - E + p + y;

      return n[0] = A * i, n[1] = S * i, n[2] = I * i, n[3] = 0, n[4] = T * a, n[5] = C * a, n[6] = O * a, n[7] = 0, n[8] = R * s, n[9] = g * s, n[10] = v * s, n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, n;
    }, l.fromTranslationRotationScale = function (e, t) {
      return l.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t);
    }, l.fromTranslation = function (e, t) {
      return l.fromRotationTranslation(u.IDENTITY, e, t);
    }, l.fromScale = function (e, t) {
      return o(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e.y, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e.z, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1);
    }, l.fromUniformScale = function (e, t) {
      return o(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
    };
    var f = new e(),
        h = new e(),
        E = new e();
    l.fromCamera = function (t, r) {
      var n = t.position,
          i = t.direction,
          a = t.up;
      e.normalize(i, f), e.normalize(e.cross(f, a, h), h), e.normalize(e.cross(h, f, E), E);
      var s = h.x,
          u = h.y,
          c = h.z,
          d = f.x,
          m = f.y,
          p = f.z,
          _ = E.x,
          y = E.y,
          A = E.z,
          T = n.x,
          R = n.y,
          S = n.z,
          C = s * -T + u * -R + c * -S,
          g = _ * -T + y * -R + A * -S,
          I = d * T + m * R + p * S;
      return o(r) ? (r[0] = s, r[1] = _, r[2] = -d, r[3] = 0, r[4] = u, r[5] = y, r[6] = -m, r[7] = 0, r[8] = c, r[9] = A, r[10] = -p, r[11] = 0, r[12] = C, r[13] = g, r[14] = I, r[15] = 1, r) : new l(s, u, c, C, _, y, A, g, -d, -m, -p, I, 0, 0, 0, 1);
    }, l.computePerspectiveFieldOfView = function (e, t, r, n, o) {
      var i = Math.tan(.5 * e),
          a = 1 / i,
          s = a / t,
          u = (n + r) / (r - n),
          c = 2 * n * r / (r - n);
      return o[0] = s, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = a, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = u, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = c, o[15] = 0, o;
    }, l.computeOrthographicOffCenter = function (e, t, r, n, o, i, a) {
      var s = 1 / (t - e),
          u = 1 / (n - r),
          c = 1 / (i - o),
          l = -(t + e) * s,
          f = -(n + r) * u,
          h = -(i + o) * c;
      return s *= 2, u *= 2, c *= -2, a[0] = s, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = u, a[6] = 0, a[7] = 0, a[8] = 0, a[9] = 0, a[10] = c, a[11] = 0, a[12] = l, a[13] = f, a[14] = h, a[15] = 1, a;
    }, l.computePerspectiveOffCenter = function (e, t, r, n, o, i, a) {
      var s = 2 * o / (t - e),
          u = 2 * o / (n - r),
          c = (t + e) / (t - e),
          l = (n + r) / (n - r),
          f = -(i + o) / (i - o),
          h = -2 * i * o / (i - o);
      return a[0] = s, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = u, a[6] = 0, a[7] = 0, a[8] = c, a[9] = l, a[10] = f, a[11] = -1, a[12] = 0, a[13] = 0, a[14] = h, a[15] = 0, a;
    }, l.computeInfinitePerspectiveOffCenter = function (e, t, r, n, o, i) {
      var a = 2 * o / (t - e),
          s = 2 * o / (n - r),
          u = (t + e) / (t - e),
          c = (n + r) / (n - r),
          l = -2 * o;
      return i[0] = a, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = s, i[6] = 0, i[7] = 0, i[8] = u, i[9] = c, i[10] = -1, i[11] = -1, i[12] = 0, i[13] = 0, i[14] = l, i[15] = 0, i;
    }, l.computeViewportTransformation = function (e, t, r, o) {
      e = n(e, n.EMPTY_OBJECT);
      var i = n(e.x, 0),
          a = n(e.y, 0),
          s = n(e.width, 0),
          u = n(e.height, 0);
      t = n(t, 0), r = n(r, 1);

      var c = .5 * s,
          l = .5 * u,
          f = .5 * (r - t),
          h = c,
          E = l,
          d = f,
          m = i + c,
          p = a + l,
          _ = t + f;

      return o[0] = h, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = E, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = d, o[11] = 0, o[12] = m, o[13] = p, o[14] = _, o[15] = 1, o;
    }, l.computeView = function (t, r, n, o, i) {
      return i[0] = o.x, i[1] = n.x, i[2] = -r.x, i[3] = 0, i[4] = o.y, i[5] = n.y, i[6] = -r.y, i[7] = 0, i[8] = o.z, i[9] = n.z, i[10] = -r.z, i[11] = 0, i[12] = -e.dot(o, t), i[13] = -e.dot(n, t), i[14] = e.dot(r, t), i[15] = 1, i;
    }, l.toArray = function (e, t) {
      return o(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]];
    }, l.getElementIndex = function (e, t) {
      return 4 * e + t;
    }, l.getColumn = function (e, t, r) {
      var n = 4 * t,
          o = e[n],
          i = e[n + 1],
          a = e[n + 2],
          s = e[n + 3];
      return r.x = o, r.y = i, r.z = a, r.w = s, r;
    }, l.setColumn = function (e, t, r, n) {
      n = l.clone(e, n);
      var o = 4 * t;
      return n[o] = r.x, n[o + 1] = r.y, n[o + 2] = r.z, n[o + 3] = r.w, n;
    }, l.setTranslation = function (e, t, r) {
      return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = e[15], r;
    };
    var d = new e();
    l.setScale = function (t, r, n) {
      var o = l.getScale(t, d),
          i = e.divideComponents(r, o, d);
      return l.multiplyByScale(t, i, n);
    }, l.getRow = function (e, t, r) {
      var n = e[t],
          o = e[t + 4],
          i = e[t + 8],
          a = e[t + 12];
      return r.x = n, r.y = o, r.z = i, r.w = a, r;
    }, l.setRow = function (e, t, r, n) {
      return n = l.clone(e, n), n[t] = r.x, n[t + 4] = r.y, n[t + 8] = r.z, n[t + 12] = r.w, n;
    };
    var m = new e();

    l.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], t[2], m)), r.y = e.magnitude(e.fromElements(t[4], t[5], t[6], m)), r.z = e.magnitude(e.fromElements(t[8], t[9], t[10], m)), r;
    };

    var p = new e();
    l.getMaximumScale = function (t) {
      return l.getScale(t, p), e.maximumComponent(p);
    }, l.multiply = function (e, t, r) {
      var n = e[0],
          o = e[1],
          i = e[2],
          a = e[3],
          s = e[4],
          u = e[5],
          c = e[6],
          l = e[7],
          f = e[8],
          h = e[9],
          E = e[10],
          d = e[11],
          m = e[12],
          p = e[13],
          _ = e[14],
          y = e[15],
          A = t[0],
          T = t[1],
          R = t[2],
          S = t[3],
          C = t[4],
          g = t[5],
          I = t[6],
          O = t[7],
          v = t[8],
          N = t[9],
          w = t[10],
          M = t[11],
          F = t[12],
          x = t[13],
          D = t[14],
          U = t[15],
          P = n * A + s * T + f * R + m * S,
          L = o * A + u * T + h * R + p * S,
          b = i * A + c * T + E * R + _ * S,
          B = a * A + l * T + d * R + y * S,
          z = n * C + s * g + f * I + m * O,
          G = o * C + u * g + h * I + p * O,
          q = i * C + c * g + E * I + _ * O,
          V = a * C + l * g + d * I + y * O,
          W = n * v + s * N + f * w + m * M,
          k = o * v + u * N + h * w + p * M,
          H = i * v + c * N + E * w + _ * M,
          Y = a * v + l * N + d * w + y * M,
          X = n * F + s * x + f * D + m * U,
          j = o * F + u * x + h * D + p * U,
          K = i * F + c * x + E * D + _ * U,
          Z = a * F + l * x + d * D + y * U;
      return r[0] = P, r[1] = L, r[2] = b, r[3] = B, r[4] = z, r[5] = G, r[6] = q, r[7] = V, r[8] = W, r[9] = k, r[10] = H, r[11] = Y, r[12] = X, r[13] = j, r[14] = K, r[15] = Z, r;
    }, l.add = function (e, t, r) {
      return r[0] = e[0] + t[0], r[1] = e[1] + t[1], r[2] = e[2] + t[2], r[3] = e[3] + t[3], r[4] = e[4] + t[4], r[5] = e[5] + t[5], r[6] = e[6] + t[6], r[7] = e[7] + t[7], r[8] = e[8] + t[8], r[9] = e[9] + t[9], r[10] = e[10] + t[10], r[11] = e[11] + t[11], r[12] = e[12] + t[12], r[13] = e[13] + t[13], r[14] = e[14] + t[14], r[15] = e[15] + t[15], r;
    }, l.subtract = function (e, t, r) {
      return r[0] = e[0] - t[0], r[1] = e[1] - t[1], r[2] = e[2] - t[2], r[3] = e[3] - t[3], r[4] = e[4] - t[4], r[5] = e[5] - t[5], r[6] = e[6] - t[6], r[7] = e[7] - t[7], r[8] = e[8] - t[8], r[9] = e[9] - t[9], r[10] = e[10] - t[10], r[11] = e[11] - t[11], r[12] = e[12] - t[12], r[13] = e[13] - t[13], r[14] = e[14] - t[14], r[15] = e[15] - t[15], r;
    }, l.multiplyTransformation = function (e, t, r) {
      var n = e[0],
          o = e[1],
          i = e[2],
          a = e[4],
          s = e[5],
          u = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = e[12],
          E = e[13],
          d = e[14],
          m = t[0],
          p = t[1],
          _ = t[2],
          y = t[4],
          A = t[5],
          T = t[6],
          R = t[8],
          S = t[9],
          C = t[10],
          g = t[12],
          I = t[13],
          O = t[14],
          v = n * m + a * p + c * _,
          N = o * m + s * p + l * _,
          w = i * m + u * p + f * _,
          M = n * y + a * A + c * T,
          F = o * y + s * A + l * T,
          x = i * y + u * A + f * T,
          D = n * R + a * S + c * C,
          U = o * R + s * S + l * C,
          P = i * R + u * S + f * C,
          L = n * g + a * I + c * O + h,
          b = o * g + s * I + l * O + E,
          B = i * g + u * I + f * O + d;
      return r[0] = v, r[1] = N, r[2] = w, r[3] = 0, r[4] = M, r[5] = F, r[6] = x, r[7] = 0, r[8] = D, r[9] = U, r[10] = P, r[11] = 0, r[12] = L, r[13] = b, r[14] = B, r[15] = 1, r;
    }, l.multiplyByMatrix3 = function (e, t, r) {
      var n = e[0],
          o = e[1],
          i = e[2],
          a = e[4],
          s = e[5],
          u = e[6],
          c = e[8],
          l = e[9],
          f = e[10],
          h = t[0],
          E = t[1],
          d = t[2],
          m = t[3],
          p = t[4],
          _ = t[5],
          y = t[6],
          A = t[7],
          T = t[8],
          R = n * h + a * E + c * d,
          S = o * h + s * E + l * d,
          C = i * h + u * E + f * d,
          g = n * m + a * p + c * _,
          I = o * m + s * p + l * _,
          O = i * m + u * p + f * _,
          v = n * y + a * A + c * T,
          N = o * y + s * A + l * T,
          w = i * y + u * A + f * T;
      return r[0] = R, r[1] = S, r[2] = C, r[3] = 0, r[4] = g, r[5] = I, r[6] = O, r[7] = 0, r[8] = v, r[9] = N, r[10] = w, r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15], r;
    }, l.multiplyByTranslation = function (e, t, r) {
      var n = t.x,
          o = t.y,
          i = t.z,
          a = n * e[0] + o * e[4] + i * e[8] + e[12],
          s = n * e[1] + o * e[5] + i * e[9] + e[13],
          u = n * e[2] + o * e[6] + i * e[10] + e[14];
      return r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r[9] = e[9], r[10] = e[10], r[11] = e[11], r[12] = a, r[13] = s, r[14] = u, r[15] = e[15], r;
    };

    var _ = new e();

    l.multiplyByUniformScale = function (e, t, r) {
      return _.x = t, _.y = t, _.z = t, l.multiplyByScale(e, _, r);
    }, l.multiplyByScale = function (e, t, r) {
      var n = t.x,
          o = t.y,
          i = t.z;
      return 1 === n && 1 === o && 1 === i ? l.clone(e, r) : (r[0] = n * e[0], r[1] = n * e[1], r[2] = n * e[2], r[3] = 0, r[4] = o * e[4], r[5] = o * e[5], r[6] = o * e[6], r[7] = 0, r[8] = i * e[8], r[9] = i * e[9], r[10] = i * e[10], r[11] = 0, r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = 1, r);
    }, l.multiplyByVector = function (e, t, r) {
      var n = t.x,
          o = t.y,
          i = t.z,
          a = t.w,
          s = e[0] * n + e[4] * o + e[8] * i + e[12] * a,
          u = e[1] * n + e[5] * o + e[9] * i + e[13] * a,
          c = e[2] * n + e[6] * o + e[10] * i + e[14] * a,
          l = e[3] * n + e[7] * o + e[11] * i + e[15] * a;
      return r.x = s, r.y = u, r.z = c, r.w = l, r;
    }, l.multiplyByPointAsVector = function (e, t, r) {
      var n = t.x,
          o = t.y,
          i = t.z,
          a = e[0] * n + e[4] * o + e[8] * i,
          s = e[1] * n + e[5] * o + e[9] * i,
          u = e[2] * n + e[6] * o + e[10] * i;
      return r.x = a, r.y = s, r.z = u, r;
    }, l.multiplyByPoint = function (e, t, r) {
      var n = t.x,
          o = t.y,
          i = t.z,
          a = e[0] * n + e[4] * o + e[8] * i + e[12],
          s = e[1] * n + e[5] * o + e[9] * i + e[13],
          u = e[2] * n + e[6] * o + e[10] * i + e[14];
      return r.x = a, r.y = s, r.z = u, r;
    }, l.multiplyByScalar = function (e, t, r) {
      return r[0] = e[0] * t, r[1] = e[1] * t, r[2] = e[2] * t, r[3] = e[3] * t, r[4] = e[4] * t, r[5] = e[5] * t, r[6] = e[6] * t, r[7] = e[7] * t, r[8] = e[8] * t, r[9] = e[9] * t, r[10] = e[10] * t, r[11] = e[11] * t, r[12] = e[12] * t, r[13] = e[13] * t, r[14] = e[14] * t, r[15] = e[15] * t, r;
    }, l.negate = function (e, t) {
      return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t;
    }, l.transpose = function (e, t) {
      var r = e[1],
          n = e[2],
          o = e[3],
          i = e[6],
          a = e[7],
          s = e[11];
      return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = r, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = n, t[9] = i, t[10] = e[10], t[11] = e[14], t[12] = o, t[13] = a, t[14] = s, t[15] = e[15], t;
    }, l.abs = function (e, t) {
      return t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t[9] = Math.abs(e[9]), t[10] = Math.abs(e[10]), t[11] = Math.abs(e[11]), t[12] = Math.abs(e[12]), t[13] = Math.abs(e[13]), t[14] = Math.abs(e[14]), t[15] = Math.abs(e[15]), t;
    }, l.equals = function (e, t) {
      return e === t || o(e) && o(t) && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[3] === t[3] && e[7] === t[7] && e[11] === t[11] && e[15] === t[15];
    }, l.equalsEpsilon = function (e, t, r) {
      return e === t || o(e) && o(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r && Math.abs(e[4] - t[4]) <= r && Math.abs(e[5] - t[5]) <= r && Math.abs(e[6] - t[6]) <= r && Math.abs(e[7] - t[7]) <= r && Math.abs(e[8] - t[8]) <= r && Math.abs(e[9] - t[9]) <= r && Math.abs(e[10] - t[10]) <= r && Math.abs(e[11] - t[11]) <= r && Math.abs(e[12] - t[12]) <= r && Math.abs(e[13] - t[13]) <= r && Math.abs(e[14] - t[14]) <= r && Math.abs(e[15] - t[15]) <= r;
    }, l.getTranslation = function (e, t) {
      return t.x = e[12], t.y = e[13], t.z = e[14], t;
    }, l.getRotation = function (e, t) {
      return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t;
    };
    var y = new u(),
        A = new u(),
        T = new t(),
        R = new t(0, 0, 0, 1);
    return l.inverse = function (e, r) {
      var n = e[0],
          o = e[4],
          i = e[8],
          a = e[12],
          f = e[1],
          h = e[5],
          E = e[9],
          d = e[13],
          m = e[2],
          p = e[6],
          _ = e[10],
          S = e[14],
          C = e[3],
          g = e[7],
          I = e[11],
          O = e[15],
          v = _ * O,
          N = S * I,
          w = p * O,
          M = S * g,
          F = p * I,
          x = _ * g,
          D = m * O,
          U = S * C,
          P = m * I,
          L = _ * C,
          b = m * g,
          B = p * C,
          z = v * h + M * E + F * d - (N * h + w * E + x * d),
          G = N * f + D * E + L * d - (v * f + U * E + P * d),
          q = w * f + U * h + b * d - (M * f + D * h + B * d),
          V = x * f + P * h + B * E - (F * f + L * h + b * E),
          W = N * o + w * i + x * a - (v * o + M * i + F * a),
          k = v * n + U * i + P * a - (N * n + D * i + L * a),
          H = M * n + D * o + B * a - (w * n + U * o + b * a),
          Y = F * n + L * o + b * i - (x * n + P * o + B * i);
      v = i * d, N = a * E, w = o * d, M = a * h, F = o * E, x = i * h, D = n * d, U = a * f, P = n * E, L = i * f, b = n * h, B = o * f;
      var X = v * g + M * I + F * O - (N * g + w * I + x * O),
          j = N * C + D * I + L * O - (v * C + U * I + P * O),
          K = w * C + U * g + b * O - (M * C + D * g + B * O),
          Z = x * C + P * g + B * I - (F * C + L * g + b * I),
          J = w * _ + x * S + N * p - (F * S + v * p + M * _),
          Q = P * S + v * m + U * _ - (D * _ + L * S + N * m),
          $ = D * p + B * S + M * m - (b * S + w * m + U * p),
          ee = b * _ + F * m + L * p - (P * p + B * _ + x * m),
          te = n * z + o * G + i * q + a * V;

      if (Math.abs(te) < s.EPSILON21) {
        if (u.equalsEpsilon(l.getRotation(e, y), A, s.EPSILON7) && t.equals(l.getRow(e, 3, T), R)) return r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = 0, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 0, r[9] = 0, r[10] = 0, r[11] = 0, r[12] = -e[12], r[13] = -e[13], r[14] = -e[14], r[15] = 1, r;
        throw new c("matrix is not invertible because its determinate is zero.");
      }

      return te = 1 / te, r[0] = z * te, r[1] = G * te, r[2] = q * te, r[3] = V * te, r[4] = W * te, r[5] = k * te, r[6] = H * te, r[7] = Y * te, r[8] = X * te, r[9] = j * te, r[10] = K * te, r[11] = Z * te, r[12] = J * te, r[13] = Q * te, r[14] = $ * te, r[15] = ee * te, r;
    }, l.inverseTransformation = function (e, t) {
      var r = e[0],
          n = e[1],
          o = e[2],
          i = e[4],
          a = e[5],
          s = e[6],
          u = e[8],
          c = e[9],
          l = e[10],
          f = e[12],
          h = e[13],
          E = e[14],
          d = -r * f - n * h - o * E,
          m = -i * f - a * h - s * E,
          p = -u * f - c * h - l * E;
      return t[0] = r, t[1] = i, t[2] = u, t[3] = 0, t[4] = n, t[5] = a, t[6] = c, t[7] = 0, t[8] = o, t[9] = s, t[10] = l, t[11] = 0, t[12] = d, t[13] = m, t[14] = p, t[15] = 1, t;
    }, l.IDENTITY = a(new l(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), l.ZERO = a(new l(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)), l.COLUMN0ROW0 = 0, l.COLUMN0ROW1 = 1, l.COLUMN0ROW2 = 2, l.COLUMN0ROW3 = 3, l.COLUMN1ROW0 = 4, l.COLUMN1ROW1 = 5, l.COLUMN1ROW2 = 6, l.COLUMN1ROW3 = 7, l.COLUMN2ROW0 = 8, l.COLUMN2ROW1 = 9, l.COLUMN2ROW2 = 10, l.COLUMN2ROW3 = 11, l.COLUMN3ROW0 = 12, l.COLUMN3ROW1 = 13, l.COLUMN3ROW2 = 14, l.COLUMN3ROW3 = 15, i(l.prototype, {
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
  }), define("Core/Rectangle", ["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function (e, t, r, n, o, i, a, s) {
    "use strict";

    function u(e, t, n, o) {
      this.west = r(e, 0), this.south = r(t, 0), this.east = r(n, 0), this.north = r(o, 0);
    }

    o(u.prototype, {
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
    }, u.unpack = function (e, t, o) {
      return t = r(t, 0), n(o) || (o = new u()), o.west = e[t++], o.south = e[t++], o.east = e[t++], o.north = e[t], o;
    }, u.computeWidth = function (e) {
      var t = e.east,
          r = e.west;
      return t < r && (t += s.TWO_PI), t - r;
    }, u.computeHeight = function (e) {
      return e.north - e.south;
    }, u.fromDegrees = function (e, t, o, i, a) {
      return e = s.toRadians(r(e, 0)), t = s.toRadians(r(t, 0)), o = s.toRadians(r(o, 0)), i = s.toRadians(r(i, 0)), n(a) ? (a.west = e, a.south = t, a.east = o, a.north = i, a) : new u(e, t, o, i);
    }, u.fromRadians = function (e, t, o, i, a) {
      return n(a) ? (a.west = r(e, 0), a.south = r(t, 0), a.east = r(o, 0), a.north = r(i, 0), a) : new u(e, t, o, i);
    }, u.fromCartographicArray = function (e, t) {
      for (var r = Number.MAX_VALUE, o = -Number.MAX_VALUE, i = Number.MAX_VALUE, a = -Number.MAX_VALUE, c = Number.MAX_VALUE, l = -Number.MAX_VALUE, f = 0, h = e.length; f < h; f++) {
        var E = e[f];
        r = Math.min(r, E.longitude), o = Math.max(o, E.longitude), c = Math.min(c, E.latitude), l = Math.max(l, E.latitude);
        var d = E.longitude >= 0 ? E.longitude : E.longitude + s.TWO_PI;
        i = Math.min(i, d), a = Math.max(a, d);
      }

      return o - r > a - i && (r = i, o = a, o > s.PI && (o -= s.TWO_PI), r > s.PI && (r -= s.TWO_PI)), n(t) ? (t.west = r, t.south = c, t.east = o, t.north = l, t) : new u(r, c, o, l);
    }, u.fromCartesianArray = function (e, t, o) {
      t = r(t, i.WGS84);

      for (var a = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = Number.MAX_VALUE, f = -Number.MAX_VALUE, h = Number.MAX_VALUE, E = -Number.MAX_VALUE, d = 0, m = e.length; d < m; d++) {
        var p = t.cartesianToCartographic(e[d]);
        a = Math.min(a, p.longitude), c = Math.max(c, p.longitude), h = Math.min(h, p.latitude), E = Math.max(E, p.latitude);

        var _ = p.longitude >= 0 ? p.longitude : p.longitude + s.TWO_PI;

        l = Math.min(l, _), f = Math.max(f, _);
      }

      return c - a > f - l && (a = l, c = f, c > s.PI && (c -= s.TWO_PI), a > s.PI && (a -= s.TWO_PI)), n(o) ? (o.west = a, o.south = h, o.east = c, o.north = E, o) : new u(a, h, c, E);
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
      var o = t.east,
          i = t.west;
      o < i && (o += s.TWO_PI);
      var a = s.negativePiToPi(.5 * (i + o)),
          u = .5 * (t.south + t.north);
      return n(r) ? (r.longitude = a, r.latitude = u, r.height = 0, r) : new e(a, u);
    }, u.intersection = function (e, t, r) {
      var o = e.east,
          i = e.west,
          a = t.east,
          c = t.west;
      o < i && a > 0 ? o += s.TWO_PI : a < c && o > 0 && (a += s.TWO_PI), o < i && c < 0 ? c += s.TWO_PI : a < c && i < 0 && (i += s.TWO_PI);
      var l = s.negativePiToPi(Math.max(i, c)),
          f = s.negativePiToPi(Math.min(o, a));

      if (!((e.west < e.east || t.west < t.east) && f <= l)) {
        var h = Math.max(e.south, t.south),
            E = Math.min(e.north, t.north);
        if (!(h >= E)) return n(r) ? (r.west = l, r.south = h, r.east = f, r.north = E, r) : new u(l, h, f, E);
      }
    }, u.simpleIntersection = function (e, t, r) {
      var o = Math.max(e.west, t.west),
          i = Math.max(e.south, t.south),
          a = Math.min(e.east, t.east),
          s = Math.min(e.north, t.north);
      if (!(i >= s || o >= a)) return n(r) ? (r.west = o, r.south = i, r.east = a, r.north = s, r) : new u(o, i, a, s);
    }, u.union = function (e, t, r) {
      n(r) || (r = new u());
      var o = e.east,
          i = e.west,
          a = t.east,
          c = t.west;
      o < i && a > 0 ? o += s.TWO_PI : a < c && o > 0 && (a += s.TWO_PI), o < i && c < 0 ? c += s.TWO_PI : a < c && i < 0 && (i += s.TWO_PI);
      var l = s.convertLongitudeRange(Math.min(i, c)),
          f = s.convertLongitudeRange(Math.max(o, a));
      return r.west = l, r.south = Math.min(e.south, t.south), r.east = f, r.north = Math.max(e.north, t.north), r;
    }, u.expand = function (e, t, r) {
      return n(r) || (r = new u()), r.west = Math.min(e.west, t.longitude), r.south = Math.min(e.south, t.latitude), r.east = Math.max(e.east, t.longitude), r.north = Math.max(e.north, t.latitude), r;
    }, u.contains = function (e, t) {
      var r = t.longitude,
          n = t.latitude,
          o = e.west,
          i = e.east;
      return i < o && (i += s.TWO_PI, r < 0 && (r += s.TWO_PI)), (r > o || s.equalsEpsilon(r, o, s.EPSILON14)) && (r < i || s.equalsEpsilon(r, i, s.EPSILON14)) && n >= e.south && n <= e.north;
    };
    var c = new e();
    return u.subsample = function (e, t, o, a) {
      t = r(t, i.WGS84), o = r(o, 0), n(a) || (a = []);
      var l = 0,
          f = e.north,
          h = e.south,
          E = e.east,
          d = e.west,
          m = c;
      m.height = o, m.longitude = d, m.latitude = f, a[l] = t.cartographicToCartesian(m, a[l]), l++, m.longitude = E, a[l] = t.cartographicToCartesian(m, a[l]), l++, m.latitude = h, a[l] = t.cartographicToCartesian(m, a[l]), l++, m.longitude = d, a[l] = t.cartographicToCartesian(m, a[l]), l++, m.latitude = f < 0 ? f : h > 0 ? h : 0;

      for (var p = 1; p < 8; ++p) {
        m.longitude = -Math.PI + p * s.PI_OVER_TWO, u.contains(e, m) && (a[l] = t.cartographicToCartesian(m, a[l]), l++);
      }

      return 0 === m.latitude && (m.longitude = d, a[l] = t.cartographicToCartesian(m, a[l]), l++, m.longitude = E, a[l] = t.cartographicToCartesian(m, a[l]), l++), a.length = l, a;
    }, u.MAX_VALUE = a(new u(-Math.PI, -s.PI_OVER_TWO, Math.PI, s.PI_OVER_TWO)), u;
  }), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Math", "./Matrix3", "./Matrix4", "./Rectangle"], function (e, t, r, n, o, i, a, s, u, c, l, f, h) {
    "use strict";

    function E(t, r) {
      this.center = e.clone(n(t, e.ZERO)), this.radius = n(r, 0);
    }

    var d = new e(),
        m = new e(),
        p = new e(),
        _ = new e(),
        y = new e(),
        A = new e(),
        T = new e(),
        R = new e(),
        S = new e(),
        C = new e(),
        g = new e(),
        I = new e(),
        O = 4 / 3 * c.PI;

    E.fromPoints = function (t, r) {
      if (o(r) || (r = new E()), !o(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var n,
          i = e.clone(t[0], T),
          a = e.clone(i, d),
          s = e.clone(i, m),
          u = e.clone(i, p),
          c = e.clone(i, _),
          l = e.clone(i, y),
          f = e.clone(i, A),
          h = t.length;

      for (n = 1; n < h; n++) {
        e.clone(t[n], i);
        var O = i.x,
            v = i.y,
            N = i.z;
        O < a.x && e.clone(i, a), O > c.x && e.clone(i, c), v < s.y && e.clone(i, s), v > l.y && e.clone(i, l), N < u.z && e.clone(i, u), N > f.z && e.clone(i, f);
      }

      var w = e.magnitudeSquared(e.subtract(c, a, R)),
          M = e.magnitudeSquared(e.subtract(l, s, R)),
          F = e.magnitudeSquared(e.subtract(f, u, R)),
          x = a,
          D = c,
          U = w;
      M > U && (U = M, x = s, D = l), F > U && (U = F, x = u, D = f);
      var P = S;
      P.x = .5 * (x.x + D.x), P.y = .5 * (x.y + D.y), P.z = .5 * (x.z + D.z);
      var L = e.magnitudeSquared(e.subtract(D, P, R)),
          b = Math.sqrt(L),
          B = C;
      B.x = a.x, B.y = s.y, B.z = u.z;
      var z = g;
      z.x = c.x, z.y = l.y, z.z = f.z;
      var G = e.midpoint(B, z, I),
          q = 0;

      for (n = 0; n < h; n++) {
        e.clone(t[n], i);
        var V = e.magnitude(e.subtract(i, G, R));
        V > q && (q = V);
        var W = e.magnitudeSquared(e.subtract(i, P, R));

        if (W > L) {
          var k = Math.sqrt(W);
          b = .5 * (b + k), L = b * b;
          var H = k - b;
          P.x = (b * P.x + H * i.x) / k, P.y = (b * P.y + H * i.y) / k, P.z = (b * P.z + H * i.z) / k;
        }
      }

      return b < q ? (e.clone(P, r.center), r.radius = b) : (e.clone(G, r.center), r.radius = q), r;
    };

    var v = new a(),
        N = new e(),
        w = new e(),
        M = new t(),
        F = new t();
    E.fromRectangle2D = function (e, t, r) {
      return E.fromRectangleWithHeights2D(e, t, 0, 0, r);
    }, E.fromRectangleWithHeights2D = function (t, r, i, a, s) {
      if (o(s) || (s = new E()), !o(t)) return s.center = e.clone(e.ZERO, s.center), s.radius = 0, s;
      r = n(r, v), h.southwest(t, M), M.height = i, h.northeast(t, F), F.height = a;
      var u = r.project(M, N),
          c = r.project(F, w),
          l = c.x - u.x,
          f = c.y - u.y,
          d = c.z - u.z;
      s.radius = .5 * Math.sqrt(l * l + f * f + d * d);
      var m = s.center;
      return m.x = u.x + .5 * l, m.y = u.y + .5 * f, m.z = u.z + .5 * d, s;
    };
    var x = [];
    E.fromRectangle3D = function (t, r, a, s) {
      if (r = n(r, i.WGS84), a = n(a, 0), o(s) || (s = new E()), !o(t)) return s.center = e.clone(e.ZERO, s.center), s.radius = 0, s;
      var u = h.subsample(t, r, a, x);
      return E.fromPoints(u, s);
    }, E.fromVertices = function (t, r, i, a) {
      if (o(a) || (a = new E()), !o(t) || 0 === t.length) return a.center = e.clone(e.ZERO, a.center), a.radius = 0, a;
      r = n(r, e.ZERO), i = n(i, 3);
      var s = T;
      s.x = t[0] + r.x, s.y = t[1] + r.y, s.z = t[2] + r.z;
      var u,
          c = e.clone(s, d),
          l = e.clone(s, m),
          f = e.clone(s, p),
          h = e.clone(s, _),
          O = e.clone(s, y),
          v = e.clone(s, A),
          N = t.length;

      for (u = 0; u < N; u += i) {
        var w = t[u] + r.x,
            M = t[u + 1] + r.y,
            F = t[u + 2] + r.z;
        s.x = w, s.y = M, s.z = F, w < c.x && e.clone(s, c), w > h.x && e.clone(s, h), M < l.y && e.clone(s, l), M > O.y && e.clone(s, O), F < f.z && e.clone(s, f), F > v.z && e.clone(s, v);
      }

      var x = e.magnitudeSquared(e.subtract(h, c, R)),
          D = e.magnitudeSquared(e.subtract(O, l, R)),
          U = e.magnitudeSquared(e.subtract(v, f, R)),
          P = c,
          L = h,
          b = x;
      D > b && (b = D, P = l, L = O), U > b && (b = U, P = f, L = v);
      var B = S;
      B.x = .5 * (P.x + L.x), B.y = .5 * (P.y + L.y), B.z = .5 * (P.z + L.z);
      var z = e.magnitudeSquared(e.subtract(L, B, R)),
          G = Math.sqrt(z),
          q = C;
      q.x = c.x, q.y = l.y, q.z = f.z;
      var V = g;
      V.x = h.x, V.y = O.y, V.z = v.z;
      var W = e.midpoint(q, V, I),
          k = 0;

      for (u = 0; u < N; u += i) {
        s.x = t[u] + r.x, s.y = t[u + 1] + r.y, s.z = t[u + 2] + r.z;
        var H = e.magnitude(e.subtract(s, W, R));
        H > k && (k = H);
        var Y = e.magnitudeSquared(e.subtract(s, B, R));

        if (Y > z) {
          var X = Math.sqrt(Y);
          G = .5 * (G + X), z = G * G;
          var j = X - G;
          B.x = (G * B.x + j * s.x) / X, B.y = (G * B.y + j * s.y) / X, B.z = (G * B.z + j * s.z) / X;
        }
      }

      return G < k ? (e.clone(B, a.center), a.radius = G) : (e.clone(W, a.center), a.radius = k), a;
    }, E.fromEncodedCartesianVertices = function (t, r, n) {
      if (o(n) || (n = new E()), !o(t) || !o(r) || t.length !== r.length || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
      var i = T;
      i.x = t[0] + r[0], i.y = t[1] + r[1], i.z = t[2] + r[2];
      var a,
          s = e.clone(i, d),
          u = e.clone(i, m),
          c = e.clone(i, p),
          l = e.clone(i, _),
          f = e.clone(i, y),
          h = e.clone(i, A),
          O = t.length;

      for (a = 0; a < O; a += 3) {
        var v = t[a] + r[a],
            N = t[a + 1] + r[a + 1],
            w = t[a + 2] + r[a + 2];
        i.x = v, i.y = N, i.z = w, v < s.x && e.clone(i, s), v > l.x && e.clone(i, l), N < u.y && e.clone(i, u), N > f.y && e.clone(i, f), w < c.z && e.clone(i, c), w > h.z && e.clone(i, h);
      }

      var M = e.magnitudeSquared(e.subtract(l, s, R)),
          F = e.magnitudeSquared(e.subtract(f, u, R)),
          x = e.magnitudeSquared(e.subtract(h, c, R)),
          D = s,
          U = l,
          P = M;
      F > P && (P = F, D = u, U = f), x > P && (P = x, D = c, U = h);
      var L = S;
      L.x = .5 * (D.x + U.x), L.y = .5 * (D.y + U.y), L.z = .5 * (D.z + U.z);
      var b = e.magnitudeSquared(e.subtract(U, L, R)),
          B = Math.sqrt(b),
          z = C;
      z.x = s.x, z.y = u.y, z.z = c.z;
      var G = g;
      G.x = l.x, G.y = f.y, G.z = h.z;
      var q = e.midpoint(z, G, I),
          V = 0;

      for (a = 0; a < O; a += 3) {
        i.x = t[a] + r[a], i.y = t[a + 1] + r[a + 1], i.z = t[a + 2] + r[a + 2];
        var W = e.magnitude(e.subtract(i, q, R));
        W > V && (V = W);
        var k = e.magnitudeSquared(e.subtract(i, L, R));

        if (k > b) {
          var H = Math.sqrt(k);
          B = .5 * (B + H), b = B * B;
          var Y = H - B;
          L.x = (B * L.x + Y * i.x) / H, L.y = (B * L.y + Y * i.y) / H, L.z = (B * L.z + Y * i.z) / H;
        }
      }

      return B < V ? (e.clone(L, n.center), n.radius = B) : (e.clone(q, n.center), n.radius = V), n;
    }, E.fromCornerPoints = function (t, r, n) {
      o(n) || (n = new E());
      var i = e.midpoint(t, r, n.center);
      return n.radius = e.distance(i, r), n;
    }, E.fromEllipsoid = function (t, r) {
      return o(r) || (r = new E()), e.clone(e.ZERO, r.center), r.radius = t.maximumRadius, r;
    };
    var D = new e();

    E.fromBoundingSpheres = function (t, r) {
      if (o(r) || (r = new E()), !o(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
      var n = t.length;
      if (1 === n) return E.clone(t[0], r);
      if (2 === n) return E.union(t[0], t[1], r);
      var i,
          a = [];

      for (i = 0; i < n; i++) {
        a.push(t[i].center);
      }

      r = E.fromPoints(a, r);
      var s = r.center,
          u = r.radius;

      for (i = 0; i < n; i++) {
        var c = t[i];
        u = Math.max(u, e.distance(s, c.center, D) + c.radius);
      }

      return r.radius = u, r;
    };

    var U = new e(),
        P = new e(),
        L = new e();
    E.fromOrientedBoundingBox = function (t, r) {
      o(r) || (r = new E());
      var n = t.halfAxes,
          i = l.getColumn(n, 0, U),
          a = l.getColumn(n, 1, P),
          s = l.getColumn(n, 2, L);
      return e.add(i, a, i), e.add(i, s, i), r.center = e.clone(t.center, r.center), r.radius = e.magnitude(i), r;
    }, E.clone = function (t, r) {
      if (o(t)) return o(r) ? (r.center = e.clone(t.center, r.center), r.radius = t.radius, r) : new E(t.center, t.radius);
    }, E.packedLength = 4, E.pack = function (e, t, r) {
      r = n(r, 0);
      var o = e.center;
      return t[r++] = o.x, t[r++] = o.y, t[r++] = o.z, t[r] = e.radius, t;
    }, E.unpack = function (e, t, r) {
      t = n(t, 0), o(r) || (r = new E());
      var i = r.center;
      return i.x = e[t++], i.y = e[t++], i.z = e[t++], r.radius = e[t], r;
    };
    var b = new e(),
        B = new e();

    E.union = function (t, r, n) {
      o(n) || (n = new E());
      var i = t.center,
          a = t.radius,
          s = r.center,
          u = r.radius,
          c = e.subtract(s, i, b),
          l = e.magnitude(c);
      if (a >= l + u) return t.clone(n), n;
      if (u >= l + a) return r.clone(n), n;
      var f = .5 * (a + l + u),
          h = e.multiplyByScalar(c, (-a + f) / l, B);
      return e.add(h, i, h), e.clone(h, n.center), n.radius = f, n;
    };

    var z = new e();
    E.expand = function (t, r, n) {
      n = E.clone(t, n);
      var o = e.magnitude(e.subtract(r, n.center, z));
      return o > n.radius && (n.radius = o), n;
    }, E.intersectPlane = function (t, r) {
      var n = t.center,
          o = t.radius,
          i = r.normal,
          a = e.dot(i, n) + r.distance;
      return a < -o ? s.OUTSIDE : a < o ? s.INTERSECTING : s.INSIDE;
    }, E.transform = function (e, t, r) {
      return o(r) || (r = new E()), r.center = f.multiplyByPoint(t, e.center, r.center), r.radius = f.getMaximumScale(t) * e.radius, r;
    };
    var G = new e();
    E.distanceSquaredTo = function (t, r) {
      var n = e.subtract(t.center, r, G);
      return e.magnitudeSquared(n) - t.radius * t.radius;
    }, E.transformWithoutScale = function (e, t, r) {
      return o(r) || (r = new E()), r.center = f.multiplyByPoint(t, e.center, r.center), r.radius = e.radius, r;
    };
    var q = new e();

    E.computePlaneDistances = function (t, r, n, i) {
      o(i) || (i = new u());
      var a = e.subtract(t.center, r, q),
          s = e.dot(n, a);
      return i.start = s - t.radius, i.stop = s + t.radius, i;
    };

    for (var V = new e(), W = new e(), k = new e(), H = new e(), Y = new e(), X = new t(), j = new Array(8), K = 0; K < 8; ++K) {
      j[K] = new e();
    }

    var Z = new a();
    return E.projectTo2D = function (t, r, o) {
      r = n(r, Z);
      var i = r.ellipsoid,
          a = t.center,
          s = t.radius,
          u = i.geodeticSurfaceNormal(a, V),
          c = e.cross(e.UNIT_Z, u, W);
      e.normalize(c, c);
      var l = e.cross(u, c, k);
      e.normalize(l, l), e.multiplyByScalar(u, s, u), e.multiplyByScalar(l, s, l), e.multiplyByScalar(c, s, c);
      var f = e.negate(l, Y),
          h = e.negate(c, H),
          d = j,
          m = d[0];
      e.add(u, l, m), e.add(m, c, m), m = d[1], e.add(u, l, m), e.add(m, h, m), m = d[2], e.add(u, f, m), e.add(m, h, m), m = d[3], e.add(u, f, m), e.add(m, c, m), e.negate(u, u), m = d[4], e.add(u, l, m), e.add(m, c, m), m = d[5], e.add(u, l, m), e.add(m, h, m), m = d[6], e.add(u, f, m), e.add(m, h, m), m = d[7], e.add(u, f, m), e.add(m, c, m);

      for (var p = d.length, _ = 0; _ < p; ++_) {
        var y = d[_];
        e.add(a, y, y);
        var A = i.cartesianToCartographic(y, X);
        r.project(A, y);
      }

      o = E.fromPoints(d, o), a = o.center;
      var T = a.x,
          R = a.y,
          S = a.z;
      return a.x = S, a.y = T, a.z = R, o;
    }, E.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e);
    }, E.equals = function (t, r) {
      return t === r || o(t) && o(r) && e.equals(t.center, r.center) && t.radius === r.radius;
    }, E.prototype.intersectPlane = function (e) {
      return E.intersectPlane(this, e);
    }, E.prototype.distanceSquaredTo = function (e) {
      return E.distanceSquaredTo(this, e);
    }, E.prototype.computePlaneDistances = function (e, t, r) {
      return E.computePlaneDistances(this, e, t, r);
    }, E.prototype.isOccluded = function (e) {
      return E.isOccluded(this, e);
    }, E.prototype.equals = function (e) {
      return E.equals(this, e);
    }, E.prototype.clone = function (e) {
      return E.clone(this, e);
    }, E.prototype.volume = function () {
      var e = this.radius;
      return O * e * e * e;
    }, E.prototype.empty = function () {
      return this.radius <= 0;
    }, E;
  }), define("Core/arrayFill", ["./Check", "./defaultValue", "./defined"], function (e, t, r) {
    "use strict";

    function n(e, r, n, o) {
      if ("function" == typeof e.fill) return e.fill(r, n, o);

      for (var i = e.length >>> 0, a = t(n, 0), s = a < 0 ? Math.max(i + a, 0) : Math.min(a, i), u = t(o, i), c = u < 0 ? Math.max(i + u, 0) : Math.min(u, i); s < c;) {
        e[s] = r, s++;
      }

      return e;
    }

    return n;
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
        o = {};
    return t(o, {
      element: {
        get: function get() {
          if (o.supportsFullscreen()) return document[n.fullscreenElement];
        }
      },
      changeEventName: {
        get: function get() {
          if (o.supportsFullscreen()) return n.fullscreenchange;
        }
      },
      errorEventName: {
        get: function get() {
          if (o.supportsFullscreen()) return n.fullscreenerror;
        }
      },
      enabled: {
        get: function get() {
          if (o.supportsFullscreen()) return document[n.fullscreenEnabled];
        }
      },
      fullscreen: {
        get: function get() {
          if (o.supportsFullscreen()) return null !== o.element;
        }
      }
    }), o.supportsFullscreen = function () {
      if (e(r)) return r;
      r = !1;
      var t = document.body;
      if ("function" == typeof t.requestFullscreen) return n.requestFullscreen = "requestFullscreen", n.exitFullscreen = "exitFullscreen", n.fullscreenEnabled = "fullscreenEnabled", n.fullscreenElement = "fullscreenElement", n.fullscreenchange = "fullscreenchange", n.fullscreenerror = "fullscreenerror", r = !0;

      for (var o, i = ["webkit", "moz", "o", "ms", "khtml"], a = 0, s = i.length; a < s; ++a) {
        var u = i[a];
        o = u + "RequestFullscreen", "function" == typeof t[o] ? (n.requestFullscreen = o, r = !0) : (o = u + "RequestFullScreen", "function" == typeof t[o] && (n.requestFullscreen = o, r = !0)), o = u + "ExitFullscreen", "function" == typeof document[o] ? n.exitFullscreen = o : (o = u + "CancelFullScreen", "function" == typeof document[o] && (n.exitFullscreen = o)), o = u + "FullscreenEnabled", void 0 !== document[o] ? n.fullscreenEnabled = o : (o = u + "FullScreenEnabled", void 0 !== document[o] && (n.fullscreenEnabled = o)), o = u + "FullscreenElement", void 0 !== document[o] ? n.fullscreenElement = o : (o = u + "FullScreenElement", void 0 !== document[o] && (n.fullscreenElement = o)), o = u + "fullscreenchange", void 0 !== document["on" + o] && ("ms" === u && (o = "MSFullscreenChange"), n.fullscreenchange = o), o = u + "fullscreenerror", void 0 !== document["on" + o] && ("ms" === u && (o = "MSFullscreenError"), n.fullscreenerror = o);
      }

      return r;
    }, o.requestFullscreen = function (e, t) {
      o.supportsFullscreen() && e[n.requestFullscreen]({
        vrDisplay: t
      });
    }, o.exitFullscreen = function () {
      o.supportsFullscreen() && document[n.exitFullscreen]();
    }, o;
  }), function (e) {
    "use strict";

    e("ThirdParty/when", [], function () {
      function e(e, r, n, o) {
        return t(e).then(r, n, o);
      }

      function t(e) {
        var t, r;
        return e instanceof n ? t = e : s(e) ? (r = a(), e.then(function (e) {
          r.resolve(e);
        }, function (e) {
          r.reject(e);
        }, function (e) {
          r.progress(e);
        }), t = r.promise) : t = o(e), t;
      }

      function r(t) {
        return e(t, i);
      }

      function n(e) {
        this.then = e;
      }

      function o(e) {
        return new n(function (r) {
          try {
            return t(r ? r(e) : e);
          } catch (e) {
            return i(e);
          }
        });
      }

      function i(e) {
        return new n(function (r, n) {
          try {
            return n ? t(n(e)) : i(e);
          } catch (e) {
            return i(e);
          }
        });
      }

      function a() {
        function e(e, t, r) {
          return h(e, t, r);
        }

        function r(e) {
          return _d(e);
        }

        function o(e) {
          return _d(i(e));
        }

        function s(e) {
          return E(e);
        }

        var u, c, l, f, h, E, _d;

        return c = new n(e), u = {
          then: e,
          resolve: r,
          reject: o,
          progress: s,
          promise: c,
          resolver: {
            resolve: r,
            reject: o,
            progress: s
          }
        }, l = [], f = [], h = function h(e, t, r) {
          var n, o;
          return n = a(), o = "function" == typeof r ? function (e) {
            try {
              n.progress(r(e));
            } catch (e) {
              n.progress(e);
            }
          } : function (e) {
            n.progress(e);
          }, l.push(function (r) {
            r.then(e, t).then(n.resolve, n.reject, o);
          }), f.push(o), n.promise;
        }, E = function E(e) {
          return m(f, e), e;
        }, _d = function d(e) {
          return e = t(e), h = e.then, _d = t, E = _, m(l, e), f = l = R, e;
        }, u;
      }

      function s(e) {
        return e && "function" == typeof e.then;
      }

      function u(t, r, n, o, i) {
        return p(2, arguments), e(t, function (t) {
          function s(e) {
            _m(e);
          }

          function u(e) {
            _d2(e);
          }

          var c, l, f, h, E, _d2, _m, p, y, A;

          if (y = t.length >>> 0, c = Math.max(0, Math.min(r, y)), f = [], l = y - c + 1, h = [], E = a(), c) for (p = E.progress, _m = function m(e) {
            h.push(e), --l || (_d2 = _m = _, E.reject(h));
          }, _d2 = function d(e) {
            f.push(e), --c || (_d2 = _m = _, E.resolve(f));
          }, A = 0; A < y; ++A) {
            A in t && e(t[A], u, s, p);
          } else E.resolve(f);
          return E.then(n, o, i);
        });
      }

      function c(e, t, r, n) {
        function o(e) {
          return t ? t(e[0]) : e[0];
        }

        return u(e, 1, o, r, n);
      }

      function l(e, t, r, n) {
        return p(1, arguments), h(e, y).then(t, r, n);
      }

      function f() {
        return h(arguments, y);
      }

      function h(t, r) {
        return e(t, function (t) {
          var n, o, i, s, u, c;
          if (i = o = t.length >>> 0, n = [], c = a(), i) for (s = function s(t, o) {
            e(t, r).then(function (e) {
              n[o] = e, --i || c.resolve(n);
            }, c.reject);
          }, u = 0; u < o; u++) {
            u in t ? s(t[u], u) : --i;
          } else c.resolve(n);
          return c.promise;
        });
      }

      function E(t, r) {
        var n = T.call(arguments, 1);
        return e(t, function (t) {
          var o;
          return o = t.length, n[0] = function (t, n, i) {
            return e(t, function (t) {
              return e(n, function (e) {
                return r(t, e, i, o);
              });
            });
          }, A.apply(t, n);
        });
      }

      function d(t, r, n) {
        var o = arguments.length > 2;
        return e(t, function (e) {
          return e = o ? n : e, r.resolve(e), e;
        }, function (e) {
          return r.reject(e), i(e);
        }, r.progress);
      }

      function m(e, t) {
        for (var r, n = 0; r = e[n++];) {
          r(t);
        }
      }

      function p(e, t) {
        for (var r, n = t.length; n > e;) {
          if (null != (r = t[--n]) && "function" != typeof r) throw new Error("arg " + n + " must be a function");
        }
      }

      function _() {}

      function y(e) {
        return e;
      }

      var A, T, R;
      return e.defer = a, e.resolve = t, e.reject = r, e.join = f, e.all = l, e.map = h, e.reduce = E, e.any = c, e.some = u, e.chain = d, e.isPromise = s, n.prototype = {
        always: function always(e, t) {
          return this.then(e, e, t);
        },
        otherwise: function otherwise(e) {
          return this.then(R, e);
        },
        "yield": function _yield(e) {
          return this.then(function () {
            return e;
          });
        },
        spread: function spread(e) {
          return this.then(function (t) {
            return l(t, function (t) {
              return e.apply(R, t);
            });
          });
        }
      }, T = [].slice, A = [].reduce || function (e) {
        var t, r, n, o, i;
        if (i = 0, t = Object(this), o = t.length >>> 0, r = arguments, r.length <= 1) for (;;) {
          if (i in t) {
            n = t[i++];
            break;
          }

          if (++i >= o) throw new TypeError();
        } else n = r[1];

        for (; i < o; ++i) {
          i in t && (n = e(n, t[i], i, t));
        }

        return n;
      }, e;
    });
  }("function" == typeof define && define.amd ? define : function (e) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : this.when = e();
  }), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Fullscreen", "../ThirdParty/when"], function (e, t, r, n, o, i) {
    "use strict";

    function a(e) {
      for (var t = e.split("."), r = 0, n = t.length; r < n; ++r) {
        t[r] = parseInt(t[r], 10);
      }

      return t;
    }

    function s() {
      if (!t(I) && (I = !1, !m())) {
        var e = / Chrome\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (I = !0, O = a(e[1]));
      }

      return I;
    }

    function u() {
      return s() && O;
    }

    function c() {
      if (!t(v) && (v = !1, !s() && !m() && / Safari\/[\.0-9]+/.test(g.userAgent))) {
        var e = / Version\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (v = !0, N = a(e[1]));
      }

      return v;
    }

    function l() {
      return c() && N;
    }

    function f() {
      if (!t(w)) {
        w = !1;
        var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(g.userAgent);
        null !== e && (w = !0, M = a(e[1]), M.isNightly = !!e[2]);
      }

      return w;
    }

    function h() {
      return f() && M;
    }

    function E() {
      if (!t(F)) {
        F = !1;
        var e;
        "Microsoft Internet Explorer" === g.appName ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(g.userAgent)) && (F = !0, x = a(e[1])) : "Netscape" === g.appName && null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(g.userAgent)) && (F = !0, x = a(e[1]));
      }

      return F;
    }

    function d() {
      return E() && x;
    }

    function m() {
      if (!t(D)) {
        D = !1;
        var e = / Edge\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (D = !0, U = a(e[1]));
      }

      return D;
    }

    function p() {
      return m() && U;
    }

    function _() {
      if (!t(P)) {
        P = !1;
        var e = /Firefox\/([\.0-9]+)/.exec(g.userAgent);
        null !== e && (P = !0, L = a(e[1]));
      }

      return P;
    }

    function y() {
      return t(b) || (b = /Windows/i.test(g.appVersion)), b;
    }

    function A() {
      return _() && L;
    }

    function T() {
      return t(B) || (B = !_() && "undefined" != typeof PointerEvent && (!t(g.pointerEnabled) || g.pointerEnabled)), B;
    }

    function R() {
      if (!t(G)) {
        var e = document.createElement("canvas");
        e.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;");
        var r = e.style.imageRendering;
        G = t(r) && "" !== r, G && (z = r);
      }

      return G;
    }

    function S() {
      return R() ? z : void 0;
    }

    function C() {
      return C._result;
    }

    var g;
    g = "undefined" != typeof navigator ? navigator : {};
    var I, O, v, N, w, M, F, x, D, U, P, L, b, B, z, G;
    C._promise = void 0, C._result = void 0, C.initialize = function () {
      if (t(C._promise)) return C._promise;
      var e = i.defer();
      if (C._promise = e.promise, m()) return C._result = !1, e.resolve(C._result), e.promise;
      var r = new Image();
      return r.onload = function () {
        C._result = r.width > 0 && r.height > 0, e.resolve(C._result);
      }, r.onerror = function () {
        C._result = !1, e.resolve(C._result);
      }, r.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.promise;
    }, r(C, {
      initialized: {
        get: function get() {
          return t(C._result);
        }
      }
    });
    var q = [];
    "undefined" != typeof ArrayBuffer && (q.push(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array), "undefined" != typeof Uint8ClampedArray && q.push(Uint8ClampedArray), "undefined" != typeof CanvasPixelArray && q.push(CanvasPixelArray));
    var V = {
      isChrome: s,
      chromeVersion: u,
      isSafari: c,
      safariVersion: l,
      isWebkit: f,
      webkitVersion: h,
      isInternetExplorer: E,
      internetExplorerVersion: d,
      isEdge: m,
      edgeVersion: p,
      isFirefox: _,
      firefoxVersion: A,
      isWindows: y,
      hardwareConcurrency: e(g.hardwareConcurrency, 3),
      supportsPointerEvents: T,
      supportsImageRenderingPixelated: R,
      supportsWebP: C,
      imageRenderingValue: S,
      typedArrayTypes: q
    };
    return V.supportsFullscreen = function () {
      return o.supportsFullscreen();
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
  }), define("Core/ComponentDatatype", ["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function (e, t, r, n, o, i) {
    "use strict";

    if (!n.supportsTypedArrays()) return {};
    var a = {
      BYTE: i.BYTE,
      UNSIGNED_BYTE: i.UNSIGNED_BYTE,
      SHORT: i.SHORT,
      UNSIGNED_SHORT: i.UNSIGNED_SHORT,
      INT: i.INT,
      UNSIGNED_INT: i.UNSIGNED_INT,
      FLOAT: i.FLOAT,
      DOUBLE: i.DOUBLE
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
    }, a.createArrayBufferView = function (t, r, n, o) {
      switch (n = e(n, 0), o = e(o, (r.byteLength - n) / a.getSizeInBytes(t)), t) {
        case a.BYTE:
          return new Int8Array(r, n, o);

        case a.UNSIGNED_BYTE:
          return new Uint8Array(r, n, o);

        case a.SHORT:
          return new Int16Array(r, n, o);

        case a.UNSIGNED_SHORT:
          return new Uint16Array(r, n, o);

        case a.INT:
          return new Int32Array(r, n, o);

        case a.UNSIGNED_INT:
          return new Uint32Array(r, n, o);

        case a.FLOAT:
          return new Float32Array(r, n, o);

        case a.DOUBLE:
          return new Float64Array(r, n, o);
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
    }, o(a);
  }), define("Core/Cartesian2", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function (e, t, r, n, o, i) {
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
    }, a.unpack = function (e, n, o) {
      return n = t(n, 0), r(o) || (o = new a()), o.x = e[n++], o.y = e[n], o;
    }, a.packArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = 2 * n : t = new Array(2 * n);

      for (var o = 0; o < n; ++o) {
        a.pack(e[o], t, 2 * o);
      }

      return t;
    }, a.unpackArray = function (e, t) {
      var n = e.length;
      r(t) ? t.length = n / 2 : t = new Array(n / 2);

      for (var o = 0; o < n; o += 2) {
        var i = o / 2;
        t[i] = a.unpack(e, o, t[i]);
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
    var s = new a();
    a.distance = function (e, t) {
      return a.subtract(e, t, s), a.magnitude(s);
    }, a.distanceSquared = function (e, t) {
      return a.subtract(e, t, s), a.magnitudeSquared(s);
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
    var u = new a();

    a.lerp = function (e, t, r, n) {
      return a.multiplyByScalar(t, r, u), n = a.multiplyByScalar(e, 1 - r, n), a.add(u, n, n);
    };

    var c = new a(),
        l = new a();

    a.angleBetween = function (e, t) {
      return a.normalize(e, c), a.normalize(t, l), i.acosClamped(a.dot(c, l));
    };

    var f = new a();
    return a.mostOrthogonalAxis = function (e, t) {
      var r = a.normalize(e, f);
      return a.abs(r, r), t = r.x <= r.y ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_Y, t);
    }, a.equals = function (e, t) {
      return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y;
    }, a.equalsArray = function (e, t, r) {
      return e.x === t[r] && e.y === t[r + 1];
    }, a.equalsEpsilon = function (e, t, n, o) {
      return e === t || r(e) && r(t) && i.equalsEpsilon(e.x, t.x, n, o) && i.equalsEpsilon(e.y, t.y, n, o);
    }, a.ZERO = o(new a(0, 0)), a.UNIT_X = o(new a(1, 0)), a.UNIT_Y = o(new a(0, 1)), a.prototype.clone = function (e) {
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
  }), define("Core/Matrix2", ["./Cartesian2", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject"], function (e, t, r, n, o, i) {
    "use strict";

    function a(e, t, n, o) {
      this[0] = r(e, 0), this[1] = r(n, 0), this[2] = r(t, 0), this[3] = r(o, 0);
    }

    a.packedLength = 4, a.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e[0], t[n++] = e[1], t[n++] = e[2], t[n++] = e[3], t;
    }, a.unpack = function (e, t, o) {
      return t = r(t, 0), n(o) || (o = new a()), o[0] = e[t++], o[1] = e[t++], o[2] = e[t++], o[3] = e[t++], o;
    }, a.clone = function (e, t) {
      if (n(e)) return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : new a(e[0], e[2], e[1], e[3]);
    }, a.fromArray = function (e, t, o) {
      return t = r(t, 0), n(o) || (o = new a()), o[0] = e[t], o[1] = e[t + 1], o[2] = e[t + 2], o[3] = e[t + 3], o;
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
          o = Math.sin(e);
      return n(t) ? (t[0] = r, t[1] = o, t[2] = -o, t[3] = r, t) : new a(r, -o, o, r);
    }, a.toArray = function (e, t) {
      return n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t) : [e[0], e[1], e[2], e[3]];
    }, a.getElementIndex = function (e, t) {
      return 2 * e + t;
    }, a.getColumn = function (e, t, r) {
      var n = 2 * t,
          o = e[n],
          i = e[n + 1];
      return r.x = o, r.y = i, r;
    }, a.setColumn = function (e, t, r, n) {
      n = a.clone(e, n);
      var o = 2 * t;
      return n[o] = r.x, n[o + 1] = r.y, n;
    }, a.getRow = function (e, t, r) {
      var n = e[t],
          o = e[t + 2];
      return r.x = n, r.y = o, r;
    }, a.setRow = function (e, t, r, n) {
      return n = a.clone(e, n), n[t] = r.x, n[t + 2] = r.y, n;
    };
    var s = new e();

    a.getScale = function (t, r) {
      return r.x = e.magnitude(e.fromElements(t[0], t[1], s)), r.y = e.magnitude(e.fromElements(t[2], t[3], s)), r;
    };

    var u = new e();
    return a.getMaximumScale = function (t) {
      return a.getScale(t, u), e.maximumComponent(u);
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
      return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
    }, a.equalsArray = function (e, t, r) {
      return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3];
    }, a.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e[0] - t[0]) <= r && Math.abs(e[1] - t[1]) <= r && Math.abs(e[2] - t[2]) <= r && Math.abs(e[3] - t[3]) <= r;
    }, a.IDENTITY = i(new a(1, 0, 0, 1)), a.ZERO = i(new a(0, 0, 0, 0)), a.COLUMN0ROW0 = 0, a.COLUMN0ROW1 = 1, a.COLUMN1ROW0 = 2, a.COLUMN1ROW1 = 3, o(a.prototype, {
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
  }), define("Core/Quaternion", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math", "./Matrix3"], function (e, t, r, n, o, i, a, s) {
    "use strict";

    function u(e, t, n, o) {
      this.x = r(e, 0), this.y = r(t, 0), this.z = r(n, 0), this.w = r(o, 0);
    }

    var c = new e();

    u.fromAxisAngle = function (t, r, o) {
      var i = r / 2,
          a = Math.sin(i);
      c = e.normalize(t, c);
      var s = c.x * a,
          l = c.y * a,
          f = c.z * a,
          h = Math.cos(i);
      return n(o) ? (o.x = s, o.y = l, o.z = f, o.w = h, o) : new u(s, l, f, h);
    };

    var l = [1, 2, 0],
        f = new Array(3);

    u.fromRotationMatrix = function (e, t) {
      var r,
          o,
          i,
          a,
          c,
          h = e[s.COLUMN0ROW0],
          E = e[s.COLUMN1ROW1],
          d = e[s.COLUMN2ROW2],
          m = h + E + d;
      if (m > 0) r = Math.sqrt(m + 1), c = .5 * r, r = .5 / r, o = (e[s.COLUMN1ROW2] - e[s.COLUMN2ROW1]) * r, i = (e[s.COLUMN2ROW0] - e[s.COLUMN0ROW2]) * r, a = (e[s.COLUMN0ROW1] - e[s.COLUMN1ROW0]) * r;else {
        var p = l,
            _ = 0;
        E > h && (_ = 1), d > h && d > E && (_ = 2);
        var y = p[_],
            A = p[y];
        r = Math.sqrt(e[s.getElementIndex(_, _)] - e[s.getElementIndex(y, y)] - e[s.getElementIndex(A, A)] + 1);
        var T = f;
        T[_] = .5 * r, r = .5 / r, c = (e[s.getElementIndex(A, y)] - e[s.getElementIndex(y, A)]) * r, T[y] = (e[s.getElementIndex(y, _)] + e[s.getElementIndex(_, y)]) * r, T[A] = (e[s.getElementIndex(A, _)] + e[s.getElementIndex(_, A)]) * r, o = -T[0], i = -T[1], a = -T[2];
      }
      return n(t) ? (t.x = o, t.y = i, t.z = a, t.w = c, t) : new u(o, i, a, c);
    };

    var h = new u(),
        E = new u(),
        d = new u(),
        m = new u();

    u.fromHeadingPitchRoll = function (t, r) {
      return m = u.fromAxisAngle(e.UNIT_X, t.roll, h), d = u.fromAxisAngle(e.UNIT_Y, -t.pitch, r), r = u.multiply(d, m, d), E = u.fromAxisAngle(e.UNIT_Z, -t.heading, h), u.multiply(E, r, r);
    };

    var p = new e(),
        _ = new e(),
        y = new u(),
        A = new u(),
        T = new u();

    u.packedLength = 4, u.pack = function (e, t, n) {
      return n = r(n, 0), t[n++] = e.x, t[n++] = e.y, t[n++] = e.z, t[n] = e.w, t;
    }, u.unpack = function (e, t, o) {
      return t = r(t, 0), n(o) || (o = new u()), o.x = e[t], o.y = e[t + 1], o.z = e[t + 2], o.w = e[t + 3], o;
    }, u.packedInterpolationLength = 3, u.convertPackedArrayForInterpolation = function (e, t, r, n) {
      u.unpack(e, 4 * r, T), u.conjugate(T, T);

      for (var o = 0, i = r - t + 1; o < i; o++) {
        var a = 3 * o;
        u.unpack(e, 4 * (t + o), y), u.multiply(y, T, y), y.w < 0 && u.negate(y, y), u.computeAxis(y, p);
        var s = u.computeAngle(y);
        n[a] = p.x * s, n[a + 1] = p.y * s, n[a + 2] = p.z * s;
      }
    }, u.unpackInterpolationResult = function (t, r, o, i, a) {
      n(a) || (a = new u()), e.fromArray(t, 0, _);
      var s = e.magnitude(_);
      return u.unpack(r, 4 * i, A), 0 === s ? u.clone(u.IDENTITY, y) : u.fromAxisAngle(_, s, y), u.multiply(y, A, a);
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
          o = e.y * r,
          i = e.z * r,
          a = e.w * r;
      return t.x = n, t.y = o, t.z = i, t.w = a, t;
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
          o = e.y,
          i = e.z,
          a = e.w,
          s = t.x,
          u = t.y,
          c = t.z,
          l = t.w,
          f = a * s + n * l + o * c - i * u,
          h = a * u - n * c + o * l + i * s,
          E = a * c + n * u - o * s + i * l,
          d = a * l - n * s - o * u - i * c;
      return r.x = f, r.y = h, r.z = E, r.w = d, r;
    }, u.multiplyByScalar = function (e, t, r) {
      return r.x = e.x * t, r.y = e.y * t, r.z = e.z * t, r.w = e.w * t, r;
    }, u.divideByScalar = function (e, t, r) {
      return r.x = e.x / t, r.y = e.y / t, r.z = e.z / t, r.w = e.w / t, r;
    }, u.computeAxis = function (e, t) {
      var r = e.w;
      if (Math.abs(r - 1) < a.EPSILON6) return t.x = t.y = t.z = 0, t;
      var n = 1 / Math.sqrt(1 - r * r);
      return t.x = e.x * n, t.y = e.y * n, t.z = e.z * n, t;
    }, u.computeAngle = function (e) {
      return Math.abs(e.w - 1) < a.EPSILON6 ? 0 : 2 * Math.acos(e.w);
    };
    var R = new u();

    u.lerp = function (e, t, r, n) {
      return R = u.multiplyByScalar(t, r, R), n = u.multiplyByScalar(e, 1 - r, n), u.add(R, n, n);
    };

    var S = new u(),
        C = new u(),
        g = new u();
    u.slerp = function (e, t, r, n) {
      var o = u.dot(e, t),
          i = t;
      if (o < 0 && (o = -o, i = S = u.negate(t, S)), 1 - o < a.EPSILON6) return u.lerp(e, i, r, n);
      var s = Math.acos(o);
      return C = u.multiplyByScalar(e, Math.sin((1 - r) * s), C), g = u.multiplyByScalar(i, Math.sin(r * s), g), n = u.add(C, g, n), u.multiplyByScalar(n, 1 / Math.sin(s), n);
    }, u.log = function (t, r) {
      var n = a.acosClamped(t.w),
          o = 0;
      return 0 !== n && (o = n / Math.sin(n)), e.multiplyByScalar(t, o, r);
    }, u.exp = function (t, r) {
      var n = e.magnitude(t),
          o = 0;
      return 0 !== n && (o = Math.sin(n) / n), r.x = t.x * o, r.y = t.y * o, r.z = t.z * o, r.w = Math.cos(n), r;
    };
    var I = new e(),
        O = new e(),
        v = new u(),
        N = new u();
    u.computeInnerQuadrangle = function (t, r, n, o) {
      var i = u.conjugate(r, v);
      u.multiply(i, n, N);
      var a = u.log(N, I);
      u.multiply(i, t, N);
      var s = u.log(N, O);
      return e.add(a, s, a), e.multiplyByScalar(a, .25, a), e.negate(a, a), u.exp(a, v), u.multiply(r, v, o);
    }, u.squad = function (e, t, r, n, o, i) {
      var a = u.slerp(e, t, o, v),
          s = u.slerp(r, n, o, N);
      return u.slerp(a, s, 2 * o * (1 - o), i);
    };

    for (var w = new u(), M = 1.9011074535173003, F = o.supportsTypedArrays() ? new Float32Array(8) : [], x = o.supportsTypedArrays() ? new Float32Array(8) : [], D = o.supportsTypedArrays() ? new Float32Array(8) : [], U = o.supportsTypedArrays() ? new Float32Array(8) : [], P = 0; P < 7; ++P) {
      var L = P + 1,
          b = 2 * L + 1;
      F[P] = 1 / (L * b), x[P] = L / b;
    }

    return F[7] = M / 136, x[7] = 8 * M / 17, u.fastSlerp = function (e, t, r, n) {
      var o,
          i = u.dot(e, t);
      i >= 0 ? o = 1 : (o = -1, i = -i);

      for (var a = i - 1, s = 1 - r, c = r * r, l = s * s, f = 7; f >= 0; --f) {
        D[f] = (F[f] * c - x[f]) * a, U[f] = (F[f] * l - x[f]) * a;
      }

      var h = o * r * (1 + D[0] * (1 + D[1] * (1 + D[2] * (1 + D[3] * (1 + D[4] * (1 + D[5] * (1 + D[6] * (1 + D[7])))))))),
          E = s * (1 + U[0] * (1 + U[1] * (1 + U[2] * (1 + U[3] * (1 + U[4] * (1 + U[5] * (1 + U[6] * (1 + U[7])))))))),
          d = u.multiplyByScalar(e, E, w);
      return u.multiplyByScalar(t, h, n), u.add(d, n, n);
    }, u.fastSquad = function (e, t, r, n, o, i) {
      var a = u.fastSlerp(e, t, o, v),
          s = u.fastSlerp(r, n, o, N);
      return u.fastSlerp(a, s, 2 * o * (1 - o), i);
    }, u.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w;
    }, u.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(e.x - t.x) <= r && Math.abs(e.y - t.y) <= r && Math.abs(e.z - t.z) <= r && Math.abs(e.w - t.w) <= r;
    }, u.ZERO = i(new u(0, 0, 0, 0)), u.IDENTITY = i(new u(0, 0, 0, 1)), u.prototype.clone = function (e) {
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
      for (var n, o, i = 0, a = e.length - 1; i <= a;) {
        if (n = ~~((i + a) / 2), (o = r(e[n], t)) < 0) i = n + 1;else {
          if (!(o > 0)) return n;
          a = n - 1;
        }
      }

      return ~(a + 1);
    }

    return t;
  }), define("Core/EarthOrientationParametersSample", [], function () {
    "use strict";

    function e(e, t, r, n, o) {
      this.xPoleWander = e, this.yPoleWander = t, this.xPoleOffset = r, this.yPoleOffset = n, this.ut1MinusUtc = o;
    }

    return e;
  }), define("ThirdParty/sprintf", [], function () {
    function e() {
      var e = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g,
          t = arguments,
          r = 0,
          n = t[r++],
          o = function o(e, t, r, n) {
        r || (r = " ");
        var o = e.length >= t ? "" : Array(1 + t - e.length >>> 0).join(r);
        return n ? e + o : o + e;
      },
          i = function i(e, t, r, n, _i, a) {
        var s = n - e.length;
        return s > 0 && (e = r || !_i ? o(e, n, a, r) : e.slice(0, t.length) + o("", s, "0", !0) + e.slice(t.length)), e;
      },
          a = function a(e, t, r, n, _a, s, u) {
        var c = e >>> 0;
        return r = r && c && {
          2: "0b",
          8: "0",
          16: "0x"
        }[t] || "", e = r + o(c.toString(t), s || 0, "0", !1), i(e, r, n, _a, u);
      },
          s = function s(e, t, r, n, o, a) {
        return null != n && (e = e.slice(0, n)), i(e, "", t, r, o, a);
      },
          u = function u(e, n, _u, c, l, f, h) {
        var E, d, m, p, _;

        if ("%%" == e) return "%";

        for (var y = !1, A = "", T = !1, R = !1, S = " ", C = _u.length, g = 0; _u && g < C; g++) {
          switch (_u.charAt(g)) {
            case " ":
              A = " ";
              break;

            case "+":
              A = "+";
              break;

            case "-":
              y = !0;
              break;

            case "'":
              S = _u.charAt(g + 1);
              break;

            case "0":
              T = !0;
              break;

            case "#":
              R = !0;
          }
        }

        if (c = c ? "*" == c ? +t[r++] : "*" == c.charAt(0) ? +t[c.slice(1, -1)] : +c : 0, c < 0 && (c = -c, y = !0), !isFinite(c)) throw new Error("sprintf: (minimum-)width must be finite");

        switch (f = f ? "*" == f ? +t[r++] : "*" == f.charAt(0) ? +t[f.slice(1, -1)] : +f : "fFeE".indexOf(h) > -1 ? 6 : "d" == h ? 0 : void 0, _ = n ? t[n.slice(0, -1)] : t[r++], h) {
          case "s":
            return s(String(_), y, c, f, T, S);

          case "c":
            return s(String.fromCharCode(+_), y, c, f, T);

          case "b":
            return a(_, 2, R, y, c, f, T);

          case "o":
            return a(_, 8, R, y, c, f, T);

          case "x":
            return a(_, 16, R, y, c, f, T);

          case "X":
            return a(_, 16, R, y, c, f, T).toUpperCase();

          case "u":
            return a(_, 10, R, y, c, f, T);

          case "i":
          case "d":
            return E = +_ || 0, E = Math.round(E - E % 1), d = E < 0 ? "-" : A, _ = d + o(String(Math.abs(E)), f, "0", !1), i(_, d, y, c, T);

          case "e":
          case "E":
          case "f":
          case "F":
          case "g":
          case "G":
            return E = +_, d = E < 0 ? "-" : A, m = ["toExponential", "toFixed", "toPrecision"]["efg".indexOf(h.toLowerCase())], p = ["toString", "toUpperCase"]["eEfFgG".indexOf(h) % 2], _ = d + Math.abs(E)[m](f), i(_, d, y, c, T)[p]();

          default:
            return e;
        }
      };

      return n.replace(e, u);
    }

    return e;
  }), define("Core/GregorianDate", [], function () {
    "use strict";

    function e(e, t, r, n, o, i, a, s) {
      this.year = e, this.month = t, this.day = r, this.hour = n, this.minute = o, this.second = i, this.millisecond = a, this.isLeapSecond = s;
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
  }), define("Core/JulianDate", ["../ThirdParty/sprintf", "./binarySearch", "./defaultValue", "./defined", "./DeveloperError", "./GregorianDate", "./isLeapYear", "./LeapSecond", "./TimeConstants", "./TimeStandard"], function (e, t, r, n, o, i, a, s, u, c) {
    "use strict";

    function l(e, t) {
      return m.compare(e.julianDate, t.julianDate);
    }

    function f(e) {
      y.julianDate = e;
      var r = m.leapSeconds,
          n = t(r, y, l);
      n < 0 && (n = ~n), n >= r.length && (n = r.length - 1);
      var o = r[n].offset;

      if (n > 0) {
        m.secondsDifference(r[n].julianDate, e) > o && (n--, o = r[n].offset);
      }

      m.addSeconds(e, o, e);
    }

    function h(e, r) {
      y.julianDate = e;
      var n = m.leapSeconds,
          o = t(n, y, l);
      if (o < 0 && (o = ~o), 0 === o) return m.addSeconds(e, -n[0].offset, r);
      if (o >= n.length) return m.addSeconds(e, -n[o - 1].offset, r);
      var i = m.secondsDifference(n[o].julianDate, e);
      return 0 === i ? m.addSeconds(e, -n[o].offset, r) : i <= 1 ? void 0 : m.addSeconds(e, -n[--o].offset, r);
    }

    function E(e, t, r) {
      var n = t / u.SECONDS_PER_DAY | 0;
      return e += n, t -= u.SECONDS_PER_DAY * n, t < 0 && (e--, t += u.SECONDS_PER_DAY), r.dayNumber = e, r.secondsOfDay = t, r;
    }

    function d(e, t, r, n, o, i, a) {
      var s = (t - 14) / 12 | 0,
          c = e + 4800 + s,
          l = (1461 * c / 4 | 0) + (367 * (t - 2 - 12 * s) / 12 | 0) - (3 * ((c + 100) / 100 | 0) / 4 | 0) + r - 32075;
      (n -= 12) < 0 && (n += 24);
      var f = i + (n * u.SECONDS_PER_HOUR + o * u.SECONDS_PER_MINUTE + a * u.SECONDS_PER_MILLISECOND);
      return f >= 43200 && (l -= 1), [l, f];
    }

    function m(e, t, n) {
      this.dayNumber = void 0, this.secondsOfDay = void 0, e = r(e, 0), t = r(t, 0), n = r(n, c.UTC);
      var o = 0 | e;
      t += (e - o) * u.SECONDS_PER_DAY, E(o, t, this), n === c.UTC && f(this);
    }

    var p = new i(),
        _ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        y = new s(),
        A = /^(\d{4})$/,
        T = /^(\d{4})-(\d{2})$/,
        R = /^(\d{4})-?(\d{3})$/,
        S = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
        C = /^(\d{4})-?(\d{2})-?(\d{2})$/,
        g = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
        I = /^(\d{2})(\.\d+)?/.source + g.source,
        O = /^(\d{2}):?(\d{2})(\.\d+)?/.source + g.source,
        v = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + g.source;
    m.fromGregorianDate = function (e, t) {
      var r = d(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
      return n(t) ? (E(r[0], r[1], t), f(t), t) : new m(r[0], r[1], c.UTC);
    }, m.fromDate = function (e, t) {
      var r = d(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
      return n(t) ? (E(r[0], r[1], t), f(t), t) : new m(r[0], r[1], c.UTC);
    }, m.fromIso8601 = function (e, t) {
      e = e.replace(",", ".");
      var r,
          o,
          i,
          s = e.split("T"),
          u = 1,
          l = 1,
          h = 0,
          p = 0,
          y = 0,
          g = 0,
          N = s[0],
          w = s[1];
      if (null !== (s = N.match(C))) r = +s[1], u = +s[2], l = +s[3];else if (null !== (s = N.match(T))) r = +s[1], u = +s[2];else if (null !== (s = N.match(A))) r = +s[1];else {
        var M;
        if (null !== (s = N.match(R))) r = +s[1], M = +s[2], i = a(r);else if (null !== (s = N.match(S))) {
          r = +s[1];
          var F = +s[2],
              x = +s[3] || 0,
              D = new Date(Date.UTC(r, 0, 4));
          M = 7 * F + x - D.getUTCDay() - 3;
        }
        o = new Date(Date.UTC(r, 0, 1)), o.setUTCDate(M), u = o.getUTCMonth() + 1, l = o.getUTCDate();
      }
      i = a(r);
      var U;

      if (n(w)) {
        s = w.match(v), null !== s ? (h = +s[1], p = +s[2], y = +s[3], g = 1e3 * +(s[4] || 0), U = 5) : (s = w.match(O), null !== s ? (h = +s[1], p = +s[2], y = 60 * +(s[3] || 0), U = 4) : null !== (s = w.match(I)) && (h = +s[1], p = 60 * +(s[2] || 0), U = 3));
        var P = s[U],
            L = +s[U + 1],
            b = +(s[U + 2] || 0);

        switch (P) {
          case "+":
            h -= L, p -= b;
            break;

          case "-":
            h += L, p += b;
            break;

          case "Z":
            break;

          default:
            p += new Date(Date.UTC(r, u - 1, l, h, p)).getTimezoneOffset();
        }
      }

      var B = 60 === y;

      for (B && y--; p >= 60;) {
        p -= 60, h++;
      }

      for (; h >= 24;) {
        h -= 24, l++;
      }

      for (o = i && 2 === u ? 29 : _[u - 1]; l > o;) {
        l -= o, u++, u > 12 && (u -= 12, r++), o = i && 2 === u ? 29 : _[u - 1];
      }

      for (; p < 0;) {
        p += 60, h--;
      }

      for (; h < 0;) {
        h += 24, l--;
      }

      for (; l < 1;) {
        u--, u < 1 && (u += 12, r--), o = i && 2 === u ? 29 : _[u - 1], l += o;
      }

      var z = d(r, u, l, h, p, y, g);
      return n(t) ? (E(z[0], z[1], t), f(t)) : t = new m(z[0], z[1], c.UTC), B && m.addSeconds(t, 1, t), t;
    }, m.now = function (e) {
      return m.fromDate(new Date(), e);
    };
    var N = new m(0, 0, c.TAI);
    return m.toGregorianDate = function (e, t) {
      var r = !1,
          o = h(e, N);
      n(o) || (m.addSeconds(e, -1, N), o = h(N, N), r = !0);
      var a = o.dayNumber,
          s = o.secondsOfDay;
      s >= 43200 && (a += 1);
      var c = a + 68569 | 0,
          l = 4 * c / 146097 | 0;
      c = c - ((146097 * l + 3) / 4 | 0) | 0;
      var f = 4e3 * (c + 1) / 1461001 | 0;
      c = c - (1461 * f / 4 | 0) + 31 | 0;
      var E = 80 * c / 2447 | 0,
          d = c - (2447 * E / 80 | 0) | 0;
      c = E / 11 | 0;

      var p = E + 2 - 12 * c | 0,
          _ = 100 * (l - 49) + f + c | 0,
          y = s / u.SECONDS_PER_HOUR | 0,
          A = s - y * u.SECONDS_PER_HOUR,
          T = A / u.SECONDS_PER_MINUTE | 0;

      A -= T * u.SECONDS_PER_MINUTE;
      var R = 0 | A,
          S = (A - R) / u.SECONDS_PER_MILLISECOND;
      return y += 12, y > 23 && (y -= 24), r && (R += 1), n(t) ? (t.year = _, t.month = p, t.day = d, t.hour = y, t.minute = T, t.second = R, t.millisecond = S, t.isLeapSecond = r, t) : new i(_, p, d, y, T, R, S, r);
    }, m.toDate = function (e) {
      var t = m.toGregorianDate(e, p),
          r = t.second;
      return t.isLeapSecond && (r -= 1), new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, r, t.millisecond));
    }, m.toIso8601 = function (t, r) {
      var o = m.toGregorianDate(t, p),
          i = o.year,
          a = o.month,
          s = o.day,
          u = o.hour,
          c = o.minute,
          l = o.second,
          f = o.millisecond;
      1e4 === i && 1 === a && 1 === s && 0 === u && 0 === c && 0 === l && 0 === f && (i = 9999, a = 12, s = 31, u = 24);
      var h;
      return n(r) || 0 === f ? n(r) && 0 !== r ? (h = (.01 * f).toFixed(r).replace(".", "").slice(0, r), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", i, a, s, u, c, l, h)) : e("%04d-%02d-%02dT%02d:%02d:%02dZ", i, a, s, u, c, l) : (h = (.01 * f).toString().replace(".", ""), e("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", i, a, s, u, c, l, h));
    }, m.clone = function (e, t) {
      if (n(e)) return n(t) ? (t.dayNumber = e.dayNumber, t.secondsOfDay = e.secondsOfDay, t) : new m(e.dayNumber, e.secondsOfDay, c.TAI);
    }, m.compare = function (e, t) {
      var r = e.dayNumber - t.dayNumber;
      return 0 !== r ? r : e.secondsOfDay - t.secondsOfDay;
    }, m.equals = function (e, t) {
      return e === t || n(e) && n(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay;
    }, m.equalsEpsilon = function (e, t, r) {
      return e === t || n(e) && n(t) && Math.abs(m.secondsDifference(e, t)) <= r;
    }, m.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / u.SECONDS_PER_DAY;
    }, m.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * u.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay);
    }, m.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / u.SECONDS_PER_DAY;
    }, m.computeTaiMinusUtc = function (e) {
      y.julianDate = e;
      var r = m.leapSeconds,
          n = t(r, y, l);
      return n < 0 && (n = ~n, --n < 0 && (n = 0)), r[n].offset;
    }, m.addSeconds = function (e, t, r) {
      return E(e.dayNumber, e.secondsOfDay + t, r);
    }, m.addMinutes = function (e, t, r) {
      var n = e.secondsOfDay + t * u.SECONDS_PER_MINUTE;
      return E(e.dayNumber, n, r);
    }, m.addHours = function (e, t, r) {
      var n = e.secondsOfDay + t * u.SECONDS_PER_HOUR;
      return E(e.dayNumber, n, r);
    }, m.addDays = function (e, t, r) {
      return E(e.dayNumber + t, e.secondsOfDay, r);
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
    }, m.leapSeconds = [new s(new m(2441317, 43210, c.TAI), 10), new s(new m(2441499, 43211, c.TAI), 11), new s(new m(2441683, 43212, c.TAI), 12), new s(new m(2442048, 43213, c.TAI), 13), new s(new m(2442413, 43214, c.TAI), 14), new s(new m(2442778, 43215, c.TAI), 15), new s(new m(2443144, 43216, c.TAI), 16), new s(new m(2443509, 43217, c.TAI), 17), new s(new m(2443874, 43218, c.TAI), 18), new s(new m(2444239, 43219, c.TAI), 19), new s(new m(2444786, 43220, c.TAI), 20), new s(new m(2445151, 43221, c.TAI), 21), new s(new m(2445516, 43222, c.TAI), 22), new s(new m(2446247, 43223, c.TAI), 23), new s(new m(2447161, 43224, c.TAI), 24), new s(new m(2447892, 43225, c.TAI), 25), new s(new m(2448257, 43226, c.TAI), 26), new s(new m(2448804, 43227, c.TAI), 27), new s(new m(2449169, 43228, c.TAI), 28), new s(new m(2449534, 43229, c.TAI), 29), new s(new m(2450083, 43230, c.TAI), 30), new s(new m(2450630, 43231, c.TAI), 31), new s(new m(2451179, 43232, c.TAI), 32), new s(new m(2453736, 43233, c.TAI), 33), new s(new m(2454832, 43234, c.TAI), 34), new s(new m(2456109, 43235, c.TAI), 35), new s(new m(2457204, 43236, c.TAI), 36), new s(new m(2457754, 43237, c.TAI), 37)], m;
  }), define("ThirdParty/Uri", [], function () {
    function e(t) {
      if (t instanceof e) this.scheme = t.scheme, this.authority = t.authority, this.path = t.path, this.query = t.query, this.fragment = t.fragment;else if (t) {
        var r = n.exec(t);
        this.scheme = r[1], this.authority = r[2], this.path = r[3], this.query = r[4], this.fragment = r[5];
      }
    }

    function t(e) {
      var t = unescape(e);
      return i.test(t) ? t : e.toUpperCase();
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
      this.removeDotSegments(), this.scheme && (this.scheme = this.scheme.toLowerCase()), this.authority && (this.authority = this.authority.replace(a, r).replace(o, t)), this.path && (this.path = this.path.replace(o, t)), this.query && (this.query = this.query.replace(o, t)), this.fragment && (this.fragment = this.fragment.replace(o, t));
    };
    var o = /%[0-9a-z]{2}/gi,
        i = /[a-zA-Z0-9\-\._~]/,
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
      var o = new r.constructor();

      for (var i in r) {
        if (r.hasOwnProperty(i)) {
          var a = r[i];
          n && (a = t(a, n)), o[i] = a;
        }
      }

      return o;
    }

    return t;
  }), define("Core/combine", ["./defaultValue", "./defined"], function (e, t) {
    "use strict";

    function r(n, o, i) {
      i = e(i, !1);
      var a,
          s,
          u,
          c = {},
          l = t(n),
          f = t(o);
      if (l) for (a in n) {
        n.hasOwnProperty(a) && (s = n[a], f && i && "object" == _typeof(s) && o.hasOwnProperty(a) ? (u = o[a], c[a] = "object" == _typeof(u) ? r(s, u, i) : s) : c[a] = s);
      }
      if (f) for (a in o) {
        o.hasOwnProperty(a) && !c.hasOwnProperty(a) && (u = o[a], c[a] = u);
      }
      return c;
    }

    return r;
  }), define("Core/getAbsoluteUri", ["../ThirdParty/Uri", "./defaultValue", "./defined", "./DeveloperError"], function (e, t, r, n) {
    "use strict";

    function o(e, t) {
      var r;
      return "undefined" != typeof document && (r = document), o._implementation(e, t, r);
    }

    return o._implementation = function (n, o, i) {
      if (!r(o)) {
        if (void 0 === i) return n;
        o = t(i.baseURI, i.location.href);
      }

      var a = new e(o);
      return new e(n).resolve(a).toString();
    }, o;
  }), define("Core/getBaseUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(r, n) {
      var o = "",
          i = r.lastIndexOf("/");
      return -1 !== i && (o = r.substring(0, i + 1)), n ? (r = new e(r), t(r.query) && (o += "?" + r.query), t(r.fragment) && (o += "#" + r.fragment), o) : o;
    }

    return n;
  }), define("Core/getExtensionFromUri", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(t) {
      var r = new e(t);
      r.normalize();
      var n = r.path,
          o = n.lastIndexOf("/");
      return -1 !== o && (n = n.substr(o + 1)), o = n.lastIndexOf("."), n = -1 === o ? "" : n.substr(o + 1);
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
          o = r.protocol;
      return r.href = t, r.href = r.href, o !== r.protocol || n !== r.host;
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
      var o = document.getElementsByTagName("head")[0];
      return n.onload = function () {
        n.onload = void 0, o.removeChild(n), r.resolve();
      }, n.onerror = function (e) {
        r.reject(e);
      }, o.appendChild(n), r.promise;
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
          var o = e[n],
              i = encodeURIComponent(n) + "=";
          if (r(o)) for (var a = 0, s = o.length; a < s; ++a) {
            t += i + encodeURIComponent(o[a]) + "&";
          } else t += i + encodeURIComponent(o) + "&";
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

      for (var o = t.replace(/\+/g, "%20").split(/[&;]/), i = 0, a = o.length; i < a; ++i) {
        var s = o[i].split("="),
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

    function o(t) {
      t = e(t, e.EMPTY_OBJECT);
      var o = e(t.throttleByServer, !1),
          i = e(t.throttle, !1);
      this.url = t.url, this.requestFunction = t.requestFunction, this.cancelFunction = t.cancelFunction, this.priorityFunction = t.priorityFunction, this.priority = e(t.priority, 0), this.throttle = i, this.throttleByServer = o, this.type = e(t.type, n.OTHER), this.serverKey = void 0, this.state = r.UNISSUED, this.deferred = void 0, this.cancelled = !1;
    }

    return o.prototype.cancel = function () {
      this.cancelled = !0;
    }, o.prototype.clone = function (e) {
      return t(e) ? (e.url = this.url, e.requestFunction = this.requestFunction, e.cancelFunction = this.cancelFunction, e.priorityFunction = this.priorityFunction, e.priority = this.priority, e.throttle = this.throttle, e.throttleByServer = this.throttleByServer, e.type = this.type, e.serverKey = this.serverKey, e.state = this.RequestState.UNISSUED, e.deferred = void 0, e.cancelled = !1, e) : new o(this);
    }, o;
  }), define("Core/parseResponseHeaders", [], function () {
    "use strict";

    function e(e) {
      var t = {};
      if (!e) return t;

      for (var r = e.split("\r\n"), n = 0; n < r.length; ++n) {
        var o = r[n],
            i = o.indexOf(": ");

        if (i > 0) {
          var a = o.substring(0, i),
              s = o.substring(i + 2);
          t[a] = s;
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

    function o(e, t) {
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
      for (var r = this._listeners, n = this._scopes, o = -1, i = 0; i < r.length; i++) {
        if (r[i] === e && n[i] === t) {
          o = i;
          break;
        }
      }

      return -1 !== o && (this._insideRaiseEvent ? (this._toRemove.push(o), r[o] = void 0, n[o] = void 0) : (r.splice(o, 1), n.splice(o, 1)), !0);
    }, n.prototype.raiseEvent = function () {
      this._insideRaiseEvent = !0;
      var e,
          r = this._listeners,
          n = this._scopes,
          i = r.length;

      for (e = 0; e < i; e++) {
        var a = r[e];
        t(a) && r[e].apply(n[e], arguments);
      }

      var s = this._toRemove;

      if ((i = s.length) > 0) {
        for (s.sort(o), e = 0; e < i; e++) {
          var u = s[e];
          r.splice(u, 1), n.splice(u, 1);
        }

        s.length = 0;
      }

      this._insideRaiseEvent = !1;
    }, n;
  }), define("Core/Heap", ["./Check", "./defaultValue", "./defined", "./defineProperties"], function (e, t, r, n) {
    "use strict";

    function o(e) {
      this._comparator = e.comparator, this._array = [], this._length = 0, this._maximumLength = void 0;
    }

    function i(e, t, r) {
      var n = e[t];
      e[t] = e[r], e[r] = n;
    }

    return n(o.prototype, {
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
    }), o.prototype.reserve = function (e) {
      e = t(e, this._length), this._array.length = e;
    }, o.prototype.heapify = function (e) {
      e = t(e, 0);

      for (var r = this._length, n = this._comparator, o = this._array, a = -1, s = !0; s;) {
        var u = 2 * (e + 1),
            c = u - 1;
        a = c < r && n(o[c], o[e]) < 0 ? c : e, u < r && n(o[u], o[a]) < 0 && (a = u), a !== e ? (i(o, a, e), e = a) : s = !1;
      }
    }, o.prototype.resort = function () {
      for (var e = this._length, t = Math.ceil(e / 2); t >= 0; --t) {
        this.heapify(t);
      }
    }, o.prototype.insert = function (e) {
      var t = this._array,
          n = this._comparator,
          o = this._maximumLength,
          a = this._length++;

      for (a < t.length ? t[a] = e : t.push(e); 0 !== a;) {
        var s = Math.floor((a - 1) / 2);
        if (!(n(t[a], t[s]) < 0)) break;
        i(t, a, s), a = s;
      }

      var u;
      return r(o) && this._length > o && (u = t[o], this._length = o), u;
    }, o.prototype.pop = function (e) {
      if (e = t(e, 0), 0 !== this._length) {
        var r = this._array,
            n = r[e];
        return i(r, e, --this._length), this.heapify(e), n;
      }
    }, o;
  }), define("Core/RequestScheduler", ["../ThirdParty/Uri", "../ThirdParty/when", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Event", "./Heap", "./isBlobUri", "./isDataUri", "./RequestState"], function (e, t, r, n, o, i, a, s, u, c, l) {
    "use strict";

    function f(e, t) {
      return e.priority - t.priority;
    }

    function h() {}

    function E(e) {
      o(e.priorityFunction) && (e.priority = e.priorityFunction());
    }

    function d(e) {
      var t = n(h.requestsByServer[e], h.maximumRequestsPerServer);
      return I[e] < t;
    }

    function m(e) {
      return e.state === l.UNISSUED && (e.state = l.ISSUED, e.deferred = t.defer()), e.deferred.promise;
    }

    function p(e) {
      return function (t) {
        e.state !== l.CANCELLED && (--R.numberOfActiveRequests, --I[e.serverKey], v.raiseEvent(), e.state = l.RECEIVED, e.deferred.resolve(t));
      };
    }

    function _(e) {
      return function (t) {
        e.state !== l.CANCELLED && (++R.numberOfFailedRequests, --R.numberOfActiveRequests, --I[e.serverKey], v.raiseEvent(t), e.state = l.FAILED, e.deferred.reject(t));
      };
    }

    function y(e) {
      var t = m(e);
      return e.state = l.ACTIVE, g.push(e), ++R.numberOfActiveRequests, ++R.numberOfActiveRequestsEver, ++I[e.serverKey], e.requestFunction().then(p(e)).otherwise(_(e)), t;
    }

    function A(e) {
      var t = e.state === l.ACTIVE;
      e.state = l.CANCELLED, ++R.numberOfCancelledRequests, e.deferred.reject(), t && (--R.numberOfActiveRequests, --I[e.serverKey], ++R.numberOfCancelledActiveRequests), o(e.cancelFunction) && e.cancelFunction();
    }

    function T() {
      h.debugShowStatistics && (0 === R.numberOfActiveRequests && R.lastNumberOfActiveRequests > 0 && (R.numberOfAttemptedRequests > 0 && (console.log("Number of attempted requests: " + R.numberOfAttemptedRequests), R.numberOfAttemptedRequests = 0), R.numberOfCancelledRequests > 0 && (console.log("Number of cancelled requests: " + R.numberOfCancelledRequests), R.numberOfCancelledRequests = 0), R.numberOfCancelledActiveRequests > 0 && (console.log("Number of cancelled active requests: " + R.numberOfCancelledActiveRequests), R.numberOfCancelledActiveRequests = 0), R.numberOfFailedRequests > 0 && (console.log("Number of failed requests: " + R.numberOfFailedRequests), R.numberOfFailedRequests = 0)), R.lastNumberOfActiveRequests = R.numberOfActiveRequests);
    }

    var R = {
      numberOfAttemptedRequests: 0,
      numberOfActiveRequests: 0,
      numberOfCancelledRequests: 0,
      numberOfCancelledActiveRequests: 0,
      numberOfFailedRequests: 0,
      numberOfActiveRequestsEver: 0,
      lastNumberOfActiveRequests: 0
    },
        S = 20,
        C = new s({
      comparator: f
    });
    C.maximumLength = S, C.reserve(S);
    var g = [],
        I = {},
        O = "undefined" != typeof document ? new e(document.location.href) : new e(),
        v = new a();
    return h.maximumRequests = 50, h.maximumRequestsPerServer = 6, h.requestsByServer = {
      "api.pgEarth.com:443": 18,
      "assets.pgEarth.com:443": 18
    }, h.throttleRequests = !0, h.debugShowStatistics = !1, h.requestCompletedEvent = v, i(h, {
      statistics: {
        get: function get() {
          return R;
        }
      },
      priorityHeapLength: {
        get: function get() {
          return S;
        },
        set: function set(e) {
          if (e < S) for (; C.length > e;) {
            var t = C.pop();
            A(t);
          }
          S = e, C.maximumLength = e, C.reserve(e);
        }
      }
    }), h.update = function () {
      var e,
          t,
          r = 0,
          n = g.length;

      for (e = 0; e < n; ++e) {
        t = g[e], t.cancelled && A(t), t.state === l.ACTIVE ? r > 0 && (g[e - r] = t) : ++r;
      }

      g.length -= r;
      var o = C.internalArray,
          i = C.length;

      for (e = 0; e < i; ++e) {
        E(o[e]);
      }

      C.resort();

      for (var a = Math.max(h.maximumRequests - g.length, 0), s = 0; s < a && C.length > 0;) {
        t = C.pop(), t.cancelled ? A(t) : !t.throttleByServer || d(t.serverKey) ? (y(t), ++s) : A(t);
      }

      T();
    }, h.getServerKey = function (t) {
      var r = new e(t).resolve(O);
      r.normalize();
      var n = r.authority;
      /:/.test(n) || (n = n + ":" + ("https" === r.scheme ? "443" : "80"));
      var i = I[n];
      return o(i) || (I[n] = 0), n;
    }, h.request = function (e) {
      if (c(e.url) || u(e.url)) return v.raiseEvent(), e.state = l.RECEIVED, e.requestFunction();

      if (++R.numberOfAttemptedRequests, o(e.serverKey) || (e.serverKey = h.getServerKey(e.url)), !e.throttleByServer || d(e.serverKey)) {
        if (!h.throttleRequests || !e.throttle) return y(e);

        if (!(g.length >= h.maximumRequests)) {
          E(e);
          var t = C.insert(e);

          if (o(t)) {
            if (t === e) return;
            A(t);
          }

          return m(e);
        }
      }
    }, h.clearForSpecs = function () {
      for (; C.length > 0;) {
        A(C.pop());
      }

      for (var e = g.length, t = 0; t < e; ++t) {
        A(g[t]);
      }

      g.length = 0, I = {}, R.numberOfAttemptedRequests = 0, R.numberOfActiveRequests = 0, R.numberOfCancelledRequests = 0, R.numberOfCancelledActiveRequests = 0, R.numberOfFailedRequests = 0, R.numberOfActiveRequestsEver = 0, R.lastNumberOfActiveRequests = 0;
    }, h.numberOfActiveRequestsByServer = function (e) {
      return I[e];
    }, h.requestHeap = C, h;
  }), define("Core/TrustedServers", ["../ThirdParty/Uri", "./defined", "./DeveloperError"], function (e, t, r) {
    "use strict";

    function n(r) {
      var n = new e(r);
      n.normalize();
      var o = n.getAuthority();

      if (t(o)) {
        if (-1 !== o.indexOf("@")) {
          o = o.split("@")[1];
        }

        if (-1 === o.indexOf(":")) {
          var i = n.getScheme();
          if (t(i) || (i = window.location.protocol, i = i.substring(0, i.length - 1)), "http" === i) o += ":80";else {
            if ("https" !== i) return;
            o += ":443";
          }
        }

        return o;
      }
    }

    var o = {},
        i = {};
    return o.add = function (e, r) {
      var n = e.toLowerCase() + ":" + r;
      t(i[n]) || (i[n] = !0);
    }, o.remove = function (e, r) {
      var n = e.toLowerCase() + ":" + r;
      t(i[n]) && delete i[n];
    }, o.contains = function (e) {
      var r = n(e);
      return !(!t(r) || !t(i[r]));
    }, o.clear = function () {
      i = {};
    }, o;
  }), define("Core/Resource", ["../ThirdParty/Uri", "../ThirdParty/when", "./appendForwardSlash", "./Check", "./clone", "./combine", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./getAbsoluteUri", "./getBaseUri", "./getExtensionFromUri", "./isBlobUri", "./isCrossOriginUrl", "./isDataUri", "./loadAndExecuteScript", "./objectToQuery", "./queryToObject", "./Request", "./RequestErrorEvent", "./RequestScheduler", "./RequestState", "./RuntimeError", "./TrustedServers"], function (e, t, r, n, o, i, a, s, u, c, l, f, h, E, d, m, p, _, y, A, T, R, S, C, g, I) {
    "use strict";

    function O(e, t, r, n) {
      var o = e.query;
      if (!s(o) || 0 === o.length) return {};
      var i;

      if (-1 === o.indexOf("=")) {
        var a = {};
        a[o] = void 0, i = a;
      } else i = A(o);

      t._queryParameters = r ? M(i, t._queryParameters, n) : i, e.query = void 0;
    }

    function v(e, t) {
      var r = t._queryParameters,
          n = Object.keys(r);
      1 !== n.length || s(r[n[0]]) ? e.query = y(r) : e.query = n[0];
    }

    function N(e, t) {
      return s(e) ? s(e.clone) ? e.clone() : o(e) : t;
    }

    function w(e) {
      if (e.state === C.ISSUED || e.state === C.ACTIVE) throw new g("The Resource is already being fetched.");
      e.state = C.UNISSUED, e.deferred = void 0;
    }

    function M(e, t, r) {
      if (!r) return i(e, t);
      var n = o(e, !0);

      for (var a in t) {
        if (t.hasOwnProperty(a)) {
          var u = n[a],
              c = t[a];
          s(u) ? (Array.isArray(u) || (u = n[a] = [u]), n[a] = u.concat(c)) : n[a] = Array.isArray(c) ? c.slice() : c;
        }
      }

      return n;
    }

    function F(t) {
      t = a(t, a.EMPTY_OBJECT), "string" == typeof t && (t = {
        url: t
      }), this._url = void 0, this._templateValues = N(t.templateValues, {}), this._queryParameters = N(t.queryParameters, {}), this.headers = N(t.headers, {}), this.request = a(t.request, new T()), this.proxy = t.proxy, this.retryCallback = t.retryCallback, this.retryAttempts = a(t.retryAttempts, 0), this._retryCount = 0;
      var r = new e(t.url);
      O(r, this, !0, !0), r.fragment = void 0, this._url = r.toString();
    }

    function x(e) {
      var r = e.resource,
          n = e.flipY,
          o = e.preferImageBitmap,
          i = r.request;
      i.url = r.url, i.requestFunction = function () {
        var e = r.url,
            i = !1;
        r.isDataUri || r.isBlobUri || (i = r.isCrossOriginUrl);
        var a = t.defer();
        return F._Implementations.createImage(e, i, a, n, o), a.promise;
      };
      var a = S.request(i);
      if (s(a)) return a.otherwise(function (e) {
        return i.state !== C.FAILED ? t.reject(e) : r.retryOnError(e).then(function (a) {
          return a ? (i.state = C.UNISSUED, i.deferred = void 0, x({
            resource: r,
            flipY: n,
            preferImageBitmap: o
          })) : t.reject(e);
        });
      });
    }

    function D(e, r, n) {
      var o = {};
      o[r] = n, e.setQueryParameters(o);
      var i = e.request;
      i.url = e.url, i.requestFunction = function () {
        var r = t.defer();
        return window[n] = function (e) {
          r.resolve(e);

          try {
            delete window[n];
          } catch (e) {
            window[n] = void 0;
          }
        }, F._Implementations.loadAndExecuteScript(e.url, n, r), r.promise;
      };
      var a = S.request(i);
      if (s(a)) return a.otherwise(function (o) {
        return i.state !== C.FAILED ? t.reject(o) : e.retryOnError(o).then(function (a) {
          return a ? (i.state = C.UNISSUED, i.deferred = void 0, D(e, r, n)) : t.reject(o);
        });
      });
    }

    function U(e, t) {
      var r = decodeURIComponent(t);
      return e ? atob(r) : r;
    }

    function P(e, t) {
      for (var r = U(e, t), n = new ArrayBuffer(r.length), o = new Uint8Array(n), i = 0; i < r.length; i++) {
        o[i] = r.charCodeAt(i);
      }

      return n;
    }

    function L(e, t) {
      t = a(t, "");
      var r = e[1],
          n = !!e[2],
          o = e[3];

      switch (t) {
        case "":
        case "text":
          return U(n, o);

        case "arraybuffer":
          return P(n, o);

        case "blob":
          var i = P(n, o);
          return new Blob([i], {
            type: r
          });

        case "document":
          return new DOMParser().parseFromString(U(n, o), r);

        case "json":
          return JSON.parse(U(n, o));
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

    function z(e, t, r, n, o, i, a) {
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
        headers: o
      };
      c.request(f).on("response", function (e) {
        if (e.statusCode < 200 || e.statusCode >= 300) return void i.reject(new R(e.statusCode, e, e.headers));
        var r = [];
        e.on("data", function (e) {
          r.push(e);
        }), e.on("end", function () {
          var n = Buffer.concat(r);
          "gzip" === e.headers["content-encoding"] ? l.gunzip(n, function (e, r) {
            e ? i.reject(new g("Error decompressing response.")) : i.resolve(B(r, t));
          }) : i.resolve(B(n, t));
        });
      }).on("error", function (e) {
        i.reject(new R());
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

    F.createIfNeeded = function (e) {
      return e instanceof F ? e.getDerivedResource({
        request: e.request
      }) : "string" != typeof e ? e : new F({
        url: e
      });
    };

    var q;
    F.supportsImageBitmapOptions = function () {
      if (s(q)) return q;
      if ("function" != typeof createImageBitmap) return q = t.resolve(!1);
      return q = F.fetchBlob({
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
    }, u(F, {
      isBlobSupported: {
        get: function get() {
          return G;
        }
      }
    }), u(F.prototype, {
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
          O(r, this, !1), r.fragment = void 0, this._url = r.toString();
        }
      },
      extension: {
        get: function get() {
          return E(this._url);
        }
      },
      isDataUri: {
        get: function get() {
          return p(this._url);
        }
      },
      isBlobUri: {
        get: function get() {
          return d(this._url);
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
    }), F.prototype.getUrlComponent = function (t, r) {
      if (this.isDataUri) return this._url;
      var n = new e(this._url);
      t && v(n, this);
      var o = n.toString().replace(/%7B/g, "{").replace(/%7D/g, "}"),
          i = this._templateValues;
      return o = o.replace(/{(.*?)}/g, function (e, t) {
        var r = i[t];
        return s(r) ? encodeURIComponent(r) : e;
      }), r && s(this.proxy) && (o = this.proxy.getURL(o)), o;
    }, F.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t ? M(this._queryParameters, e, !1) : M(e, this._queryParameters, !1);
    }, F.prototype.appendQueryParameters = function (e) {
      this._queryParameters = M(e, this._queryParameters, !0);
    }, F.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t ? i(this._templateValues, e) : i(e, this._templateValues);
    }, F.prototype.getDerivedResource = function (t) {
      var r = this.clone();

      if (r._retryCount = 0, s(t.url)) {
        var n = new e(t.url);
        O(n, r, !0, a(t.preserveQueryParameters, !1)), n.fragment = void 0, r._url = n.resolve(new e(f(this._url))).toString();
      }

      return s(t.queryParameters) && (r._queryParameters = i(t.queryParameters, r._queryParameters)), s(t.templateValues) && (r._templateValues = i(t.templateValues, r.templateValues)), s(t.headers) && (r.headers = i(t.headers, r.headers)), s(t.proxy) && (r.proxy = t.proxy), s(t.request) && (r.request = t.request), s(t.retryCallback) && (r.retryCallback = t.retryCallback), s(t.retryAttempts) && (r.retryAttempts = t.retryAttempts), r;
    }, F.prototype.retryOnError = function (e) {
      var r = this.retryCallback;
      if ("function" != typeof r || this._retryCount >= this.retryAttempts) return t(!1);
      var n = this;
      return t(r(this, e)).then(function (e) {
        return ++n._retryCount, e;
      });
    }, F.prototype.clone = function (e) {
      return s(e) || (e = new F({
        url: this._url
      })), e._url = this._url, e._queryParameters = o(this._queryParameters), e._templateValues = o(this._templateValues), e.headers = o(this.headers), e.proxy = this.proxy, e.retryCallback = this.retryCallback, e.retryAttempts = this.retryAttempts, e._retryCount = 0, e.request = this.request.clone(), e;
    }, F.prototype.getBaseUri = function (e) {
      return h(this.getUrlComponent(e), e);
    }, F.prototype.appendForwardSlash = function () {
      this._url = r(this._url);
    }, F.prototype.fetchArrayBuffer = function () {
      return this.fetch({
        responseType: "arraybuffer"
      });
    }, F.fetchArrayBuffer = function (e) {
      return new F(e).fetchArrayBuffer();
    }, F.prototype.fetchBlob = function () {
      return this.fetch({
        responseType: "blob"
      });
    }, F.fetchBlob = function (e) {
      return new F(e).fetchBlob();
    }, F.prototype.fetchImage = function (e) {
      e = a(e, a.EMPTY_OBJECT);
      var r = a(e.preferImageBitmap, !1),
          n = a(e.preferBlob, !1),
          o = a(e.flipY, !1);
      if (w(this.request), !G || this.isDataUri || this.isBlobUri || !this.hasHeaders && !n) return x({
        resource: this,
        flipY: o,
        preferImageBitmap: r
      });
      var i = this.fetchBlob();

      if (s(i)) {
        var u, c, l, f;
        return F.supportsImageBitmapOptions().then(function (e) {
          return u = e, c = u && r, i;
        }).then(function (e) {
          if (s(e)) {
            if (f = e, c) return F.createImageBitmapFromBlob(e, {
              flipY: o,
              premultiplyAlpha: !1
            });
            var t = window.URL.createObjectURL(e);
            return l = new F({
              url: t
            }), x({
              resource: l,
              flipY: o,
              preferImageBitmap: !1
            });
          }
        }).then(function (e) {
          if (s(e)) return e.blob = f, c ? e : (window.URL.revokeObjectURL(l.url), e);
        }).otherwise(function (e) {
          return s(l) && window.URL.revokeObjectURL(l.url), e.blob = f, t.reject(e);
        });
      }
    }, F.fetchImage = function (e) {
      return new F(e).fetchImage({
        flipY: e.flipY,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap
      });
    }, F.prototype.fetchText = function () {
      return this.fetch({
        responseType: "text"
      });
    }, F.fetchText = function (e) {
      return new F(e).fetchText();
    }, F.prototype.fetchJson = function () {
      var e = this.fetch({
        responseType: "text",
        headers: {
          Accept: "application/json,*/*;q=0.01"
        }
      });
      if (s(e)) return e.then(function (e) {
        if (s(e)) return JSON.parse(e);
      });
    }, F.fetchJson = function (e) {
      return new F(e).fetchJson();
    }, F.prototype.fetchXML = function () {
      return this.fetch({
        responseType: "document",
        overrideMimeType: "text/xml"
      });
    }, F.fetchXML = function (e) {
      return new F(e).fetchXML();
    }, F.prototype.fetchJsonp = function (e) {
      e = a(e, "callback"), w(this.request);
      var t;

      do {
        t = "loadJsonp" + Math.random().toString().substring(2, 8);
      } while (s(window[t]));

      return D(this, e, t);
    }, F.fetchJsonp = function (e) {
      return new F(e).fetchJsonp(e.callbackParameterName);
    }, F.prototype._makeRequest = function (e) {
      var r = this;
      w(r.request);
      var n = r.request;
      n.url = r.url, n.requestFunction = function () {
        var o = e.responseType,
            a = i(e.headers, r.headers),
            u = e.overrideMimeType,
            c = e.method,
            l = e.data,
            f = t.defer(),
            h = F._Implementations.loadWithXhr(r.url, o, c, l, a, f, u);

        return s(h) && s(h.abort) && (n.cancelFunction = function () {
          h.abort();
        }), f.promise;
      };
      var o = S.request(n);
      if (s(o)) return o.then(function (e) {
        return e;
      }).otherwise(function (o) {
        return n.state !== C.FAILED ? t.reject(o) : r.retryOnError(o).then(function (i) {
          return i ? (n.state = C.UNISSUED, n.deferred = void 0, r.fetch(e)) : t.reject(o);
        });
      });
    };
    var V = /^data:(.*?)(;base64)?,(.*)$/;
    F.prototype.fetch = function (e) {
      return e = N(e, {}), e.method = "GET", this._makeRequest(e);
    }, F.fetch = function (e) {
      return new F(e).fetch({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, F.prototype["delete"] = function (e) {
      return e = N(e, {}), e.method = "DELETE", this._makeRequest(e);
    }, F["delete"] = function (e) {
      return new F(e)["delete"]({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType,
        data: e.data
      });
    }, F.prototype.head = function (e) {
      return e = N(e, {}), e.method = "HEAD", this._makeRequest(e);
    }, F.head = function (e) {
      return new F(e).head({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, F.prototype.options = function (e) {
      return e = N(e, {}), e.method = "OPTIONS", this._makeRequest(e);
    }, F.options = function (e) {
      return new F(e).options({
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, F.prototype.post = function (e, t) {
      return n.defined("data", e), t = N(t, {}), t.method = "POST", t.data = e, this._makeRequest(t);
    }, F.post = function (e) {
      return new F(e).post(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, F.prototype.put = function (e, t) {
      return n.defined("data", e), t = N(t, {}), t.method = "PUT", t.data = e, this._makeRequest(t);
    }, F.put = function (e) {
      return new F(e).put(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, F.prototype.patch = function (e, t) {
      return n.defined("data", e), t = N(t, {}), t.method = "PATCH", t.data = e, this._makeRequest(t);
    }, F.patch = function (e) {
      return new F(e).patch(e.data, {
        responseType: e.responseType,
        overrideMimeType: e.overrideMimeType
      });
    }, F._Implementations = {}, F._Implementations.createImage = function (e, t, r, n, o) {
      F.supportsImageBitmapOptions().then(function (n) {
        return n && o ? F.fetchBlob({
          url: e
        }) : void b(e, t, r);
      }).then(function (e) {
        if (s(e)) return F.createImageBitmapFromBlob(e, {
          flipY: n,
          premultiplyAlpha: !1
        });
      }).then(function (e) {
        s(e) && r.resolve(e);
      }).otherwise(r.reject);
    }, F.createImageBitmapFromBlob = function (e, t) {
      return n.defined("options", t), n.typeOf.bool("options.flipY", t.flipY), n.typeOf.bool("options.premultiplyAlpha", t.premultiplyAlpha), createImageBitmap(e, {
        imageOrientation: t.flipY ? "flipY" : "none",
        premultiplyAlpha: t.premultiplyAlpha ? "premultiply" : "none"
      });
    };
    var W = "undefined" == typeof XMLHttpRequest;
    return F._Implementations.loadWithXhr = function (e, t, r, n, o, i, a) {
      var u = V.exec(e);
      if (null !== u) return void i.resolve(L(u, t));
      if (W) return void z(e, t, r, n, o, i, a);
      var c = new XMLHttpRequest();
      if (I.contains(e) && (c.withCredentials = !0), c.open(r, e, !0), s(a) && s(c.overrideMimeType) && c.overrideMimeType(a), s(o)) for (var l in o) {
        o.hasOwnProperty(l) && c.setRequestHeader(l, o[l]);
      }
      s(t) && (c.responseType = t);
      var f = !1;
      return "string" == typeof e && (f = 0 === e.indexOf("file://") || "undefined" != typeof window && "file://" === window.location.origin), c.onload = function () {
        if ((c.status < 200 || c.status >= 300) && (!f || 0 !== c.status)) return void i.reject(new R(c.status, c.response, c.getAllResponseHeaders()));
        var e = c.response,
            n = c.responseType;

        if ("HEAD" === r || "OPTIONS" === r) {
          var o = c.getAllResponseHeaders(),
              a = o.trim().split(/[\r\n]+/),
              u = {};
          return a.forEach(function (e) {
            var t = e.split(": "),
                r = t.shift();
            u[r] = t.join(": ");
          }), void i.resolve(u);
        }

        if (s(e) && "string" == typeof e) try {
          if (-1 === JSON.parse(e).code) return void i.reject(new R(c.status, c.response, c.getAllResponseHeaders()));
        } catch (e) {
          i.reject(e);
        }
        if (204 === c.status) i.resolve();else if (!s(e) || s(t) && n !== t) {
          if ("json" === t && "string" == typeof e) try {
            i.resolve(JSON.parse(e));
          } catch (e) {
            i.reject(e);
          } else ("" === n || "document" === n) && s(c.responseXML) && c.responseXML.hasChildNodes() ? i.resolve(c.responseXML) : "" !== n && "text" !== n || !s(c.responseText) ? i.reject(new g("Invalid XMLHttpRequest response type.")) : i.resolve(c.responseText);
        } else i.resolve(e);
      }, c.onerror = function (e) {
        i.reject(new R());
      }, c.send(n), c;
    }, F._Implementations.loadAndExecuteScript = function (e, t, r) {
      return _(e, t).otherwise(r.reject);
    }, F._DefaultImplementations = {}, F._DefaultImplementations.createImage = F._Implementations.createImage, F._DefaultImplementations.loadWithXhr = F._Implementations.loadWithXhr, F._DefaultImplementations.loadAndExecuteScript = F._Implementations.loadAndExecuteScript, F.DEFAULT = l(new F({
      url: "undefined" == typeof document ? "" : document.location.href.split("?")[0]
    })), F;
  }), define("Core/EarthOrientationParameters", ["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (e, t, r, n, o, i, a, s, u, c, l, f) {
    "use strict";

    function h(t) {
      if (t = r(t, r.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = r(t.addNewLeapSeconds, !0), n(t.data)) d(this, t.data);else if (n(t.url)) {
        var o = u.createIfNeeded(t.url),
            i = this;
        this._downloadPromise = e(o.fetchJson(), function (e) {
          d(i, e);
        }, function () {
          i._dataError = "An error occurred while retrieving the EOP data from the URL " + o.url + ".";
        });
      } else d(this, {
        columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
        samples: []
      });
    }

    function E(e, t) {
      return a.compare(e.julianDate, t);
    }

    function d(e, r) {
      if (!n(r.columnNames)) return void (e._dataError = "Error in loaded EOP data: The columnNames property is required.");
      if (!n(r.samples)) return void (e._dataError = "Error in loaded EOP data: The samples property is required.");
      var o = r.columnNames.indexOf("modifiedJulianDateUtc"),
          i = r.columnNames.indexOf("xPoleWanderRadians"),
          u = r.columnNames.indexOf("yPoleWanderRadians"),
          c = r.columnNames.indexOf("ut1MinusUtcSeconds"),
          h = r.columnNames.indexOf("xCelestialPoleOffsetRadians"),
          d = r.columnNames.indexOf("yCelestialPoleOffsetRadians"),
          m = r.columnNames.indexOf("taiMinusUtcSeconds");
      if (o < 0 || i < 0 || u < 0 || c < 0 || h < 0 || d < 0 || m < 0) return void (e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns");

      var p = e._samples = r.samples,
          _ = e._dates = [];

      e._dateColumn = o, e._xPoleWanderRadiansColumn = i, e._yPoleWanderRadiansColumn = u, e._ut1MinusUtcSecondsColumn = c, e._xCelestialPoleOffsetRadiansColumn = h, e._yCelestialPoleOffsetRadiansColumn = d, e._taiMinusUtcSecondsColumn = m, e._columnCount = r.columnNames.length, e._lastIndex = void 0;

      for (var y, A = e._addNewLeapSeconds, T = 0, R = p.length; T < R; T += e._columnCount) {
        var S = p[T + o],
            C = p[T + m],
            g = S + l.MODIFIED_JULIAN_DATE_DIFFERENCE,
            I = new a(g, C, f.TAI);

        if (_.push(I), A) {
          if (C !== y && n(y)) {
            var O = a.leapSeconds,
                v = t(O, I, E);

            if (v < 0) {
              var N = new s(I, C);
              O.splice(~v, 0, N);
            }
          }

          y = C;
        }
      }
    }

    function m(e, t, r, n, o) {
      var i = r * n;
      o.xPoleWander = t[i + e._xPoleWanderRadiansColumn], o.yPoleWander = t[i + e._yPoleWanderRadiansColumn], o.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn], o.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn], o.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn];
    }

    function p(e, t, r) {
      return t + e * (r - t);
    }

    function _(e, t, r, n, o, i, s) {
      var u = e._columnCount;
      if (i > t.length - 1) return s.xPoleWander = 0, s.yPoleWander = 0, s.xPoleOffset = 0, s.yPoleOffset = 0, s.ut1MinusUtc = 0, s;
      var c = t[o],
          l = t[i];
      if (c.equals(l) || n.equals(c)) return m(e, r, o, u, s), s;
      if (n.equals(l)) return m(e, r, i, u, s), s;
      var f = a.secondsDifference(n, c) / a.secondsDifference(l, c),
          h = o * u,
          E = i * u,
          d = r[h + e._ut1MinusUtcSecondsColumn],
          _ = r[E + e._ut1MinusUtcSecondsColumn],
          y = _ - d;

      if (y > .5 || y < -.5) {
        var A = r[h + e._taiMinusUtcSecondsColumn],
            T = r[E + e._taiMinusUtcSecondsColumn];
        A !== T && (l.equals(n) ? d = _ : _ -= T - A);
      }

      return s.xPoleWander = p(f, r[h + e._xPoleWanderRadiansColumn], r[E + e._xPoleWanderRadiansColumn]), s.yPoleWander = p(f, r[h + e._yPoleWanderRadiansColumn], r[E + e._yPoleWanderRadiansColumn]), s.xPoleOffset = p(f, r[h + e._xCelestialPoleOffsetRadiansColumn], r[E + e._xCelestialPoleOffsetRadiansColumn]), s.yPoleOffset = p(f, r[h + e._yCelestialPoleOffsetRadiansColumn], r[E + e._yCelestialPoleOffsetRadiansColumn]), s.ut1MinusUtc = p(f, d, _), s;
    }

    return h.NONE = i({
      getPromiseToLoad: function getPromiseToLoad() {
        return e();
      },
      compute: function compute(e, t) {
        return n(t) ? (t.xPoleWander = 0, t.yPoleWander = 0, t.xPoleOffset = 0, t.yPoleOffset = 0, t.ut1MinusUtc = 0) : t = new o(0, 0, 0, 0, 0), t;
      }
    }), h.prototype.getPromiseToLoad = function () {
      return e(this._downloadPromise);
    }, h.prototype.compute = function (e, r) {
      if (n(this._samples)) {
        if (n(r) || (r = new o(0, 0, 0, 0, 0)), 0 === this._samples.length) return r.xPoleWander = 0, r.yPoleWander = 0, r.xPoleOffset = 0, r.yPoleOffset = 0, r.ut1MinusUtc = 0, r;
        var i = this._dates,
            s = this._lastIndex,
            u = 0,
            l = 0;

        if (n(s)) {
          var f = i[s],
              h = i[s + 1],
              E = a.lessThanOrEquals(f, e),
              d = !n(h),
              m = d || a.greaterThanOrEquals(h, e);
          if (E && m) return u = s, !d && h.equals(e) && ++u, l = u + 1, _(this, i, this._samples, e, u, l, r), r;
        }

        var p = t(i, e, a.compare, this._dateColumn);
        return p >= 0 ? (p < i.length - 1 && i[p + 1].equals(e) && ++p, u = p, l = p) : (l = ~p, (u = l - 1) < 0 && (u = 0)), this._lastIndex = u, _(this, i, this._samples, e, u, l, r), r;
      }

      if (n(this._dataError)) throw new c(this._dataError);
    }, h;
  }), define("Core/HeadingPitchRoll", ["./defaultValue", "./defined", "./DeveloperError", "./Math"], function (e, t, r, n) {
    "use strict";

    function o(t, r, n) {
      this.heading = e(t, 0), this.pitch = e(r, 0), this.roll = e(n, 0);
    }

    return o.fromQuaternion = function (e, r) {
      t(r) || (r = new o());
      var i = 2 * (e.w * e.y - e.z * e.x),
          a = 1 - 2 * (e.x * e.x + e.y * e.y),
          s = 2 * (e.w * e.x + e.y * e.z),
          u = 1 - 2 * (e.y * e.y + e.z * e.z),
          c = 2 * (e.w * e.z + e.x * e.y);
      return r.heading = -Math.atan2(c, u), r.roll = Math.atan2(s, a), r.pitch = -n.asinClamped(i), r;
    }, o.fromDegrees = function (e, r, i, a) {
      return t(a) || (a = new o()), a.heading = e * n.RADIANS_PER_DEGREE, a.pitch = r * n.RADIANS_PER_DEGREE, a.roll = i * n.RADIANS_PER_DEGREE, a;
    }, o.clone = function (e, r) {
      if (t(e)) return t(r) ? (r.heading = e.heading, r.pitch = e.pitch, r.roll = e.roll, r) : new o(e.heading, e.pitch, e.roll);
    }, o.equals = function (e, r) {
      return e === r || t(e) && t(r) && e.heading === r.heading && e.pitch === r.pitch && e.roll === r.roll;
    }, o.equalsEpsilon = function (e, r, o, i) {
      return e === r || t(e) && t(r) && n.equalsEpsilon(e.heading, r.heading, o, i) && n.equalsEpsilon(e.pitch, r.pitch, o, i) && n.equalsEpsilon(e.roll, r.roll, o, i);
    }, o.prototype.clone = function (e) {
      return o.clone(this, e);
    }, o.prototype.equals = function (e) {
      return o.equals(this, e);
    }, o.prototype.equalsEpsilon = function (e, t, r) {
      return o.equalsEpsilon(this, e, t, r);
    }, o.prototype.toString = function () {
      return "(" + this.heading + ", " + this.pitch + ", " + this.roll + ")";
    }, o;
  }), define("Core/buildModuleUrl", ["./defined", "./DeveloperError", "./getAbsoluteUri", "./Resource", "require"], function (e, t, r, n, o) {
    "use strict";

    function i() {
      for (var e = document.getElementsByTagName("script"), t = 0, r = e.length; t < r; ++t) {
        var n = e[t].getAttribute("src"),
            o = d.exec(n);
        if (null !== o) return o[1];
      }
    }

    function a(t) {
      return "undefined" == typeof document ? t : (e(f) || (f = document.createElement("a")), f.href = t, f.href = f.href, f.href);
    }

    function s() {
      if (e(h)) return h;
      var t;
      return t = "undefined" != typeof PGEARTH_BASE_URL ? PGEARTH_BASE_URL : e(define.amd) && !define.amd.toUrlUndefined && e(o.toUrl) ? r("..", l("Core/buildModuleUrl.js")) : i(), h = new n({
        url: a(t)
      }), h.appendForwardSlash(), h;
    }

    function u(e) {
      return a(o.toUrl("../" + e));
    }

    function c(e) {
      return s().getDerivedResource({
        url: e
      }).url;
    }

    function l(t) {
      return e(E) || (E = e(define.amd) && !define.amd.toUrlUndefined && e(o.toUrl) ? u : c), E(t);
    }

    var f,
        h,
        E,
        d = /((?:.*\/)|^)pgEarth[\w-]*\.js(?:\W|$)/i;
    return l._pgEarthScriptRegex = d, l._buildModuleUrlFromBaseUrl = c, l._clearBaseResource = function () {
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
  }), define("Core/Iau2006XysData", ["../ThirdParty/when", "./buildModuleUrl", "./defaultValue", "./defined", "./Iau2006XysSample", "./JulianDate", "./Resource", "./TimeStandard"], function (e, t, r, n, o, i, a, s) {
    "use strict";

    function u(e) {
      e = r(e, r.EMPTY_OBJECT), this._xysFileUrlTemplate = a.createIfNeeded(e.xysFileUrlTemplate), this._interpolationOrder = r(e.interpolationOrder, 9), this._sampleZeroJulianEphemerisDate = r(e.sampleZeroJulianEphemerisDate, 2442396.5), this._sampleZeroDateTT = new i(this._sampleZeroJulianEphemerisDate, 0, s.TAI), this._stepSizeDays = r(e.stepSizeDays, 1), this._samplesPerXysFile = r(e.samplesPerXysFile, 1e3), this._totalSamples = r(e.totalSamples, 27426), this._samples = new Array(3 * this._totalSamples), this._chunkDownloadsInProgress = [];

      for (var t = this._interpolationOrder, n = this._denominators = new Array(t + 1), o = this._xTable = new Array(t + 1), u = Math.pow(this._stepSizeDays, t), c = 0; c <= t; ++c) {
        n[c] = u, o[c] = c * this._stepSizeDays;

        for (var l = 0; l <= t; ++l) {
          l !== c && (n[c] *= c - l);
        }

        n[c] = 1 / n[c];
      }

      this._work = new Array(t + 1), this._coef = new Array(t + 1);
    }

    function c(e, t, r) {
      var n = f;
      return n.dayNumber = t, n.secondsOfDay = r, i.daysDifference(n, e._sampleZeroDateTT);
    }

    function l(r, o) {
      if (r._chunkDownloadsInProgress[o]) return r._chunkDownloadsInProgress[o];
      var i = e.defer();
      r._chunkDownloadsInProgress[o] = i;
      var s,
          u = r._xysFileUrlTemplate;
      return s = n(u) ? u.getDerivedResource({
        templateValues: {
          0: o
        }
      }) : new a({
        url: t("Assets/IAU2006_XYS/IAU2006_XYS_" + o + ".json")
      }), e(s.fetchJson(), function (e) {
        r._chunkDownloadsInProgress[o] = !1;

        for (var t = r._samples, n = e.samples, a = o * r._samplesPerXysFile * 3, s = 0, u = n.length; s < u; ++s) {
          t[a + s] = n[s];
        }

        i.resolve();
      }), i.promise;
    }

    var f = new i(0, 0, s.TAI);
    return u.prototype.preload = function (t, r, n, o) {
      var i = c(this, t, r),
          a = c(this, n, o),
          s = i / this._stepSizeDays - this._interpolationOrder / 2 | 0;
      s < 0 && (s = 0);
      var u = a / this._stepSizeDays - this._interpolationOrder / 2 | 0 + this._interpolationOrder;
      u >= this._totalSamples && (u = this._totalSamples - 1);

      for (var f = s / this._samplesPerXysFile | 0, h = u / this._samplesPerXysFile | 0, E = [], d = f; d <= h; ++d) {
        E.push(l(this, d));
      }

      return e.all(E);
    }, u.prototype.computeXysRadians = function (e, t, r) {
      var i = c(this, e, t);

      if (!(i < 0)) {
        var a = i / this._stepSizeDays | 0;

        if (!(a >= this._totalSamples)) {
          var s = this._interpolationOrder,
              u = a - (s / 2 | 0);
          u < 0 && (u = 0);
          var f = u + s;
          f >= this._totalSamples && (f = this._totalSamples - 1, (u = f - s) < 0 && (u = 0));
          var h = !1,
              E = this._samples;

          if (n(E[3 * u]) || (l(this, u / this._samplesPerXysFile | 0), h = !0), n(E[3 * f]) || (l(this, f / this._samplesPerXysFile | 0), h = !0), !h) {
            n(r) ? (r.x = 0, r.y = 0, r.s = 0) : r = new o(0, 0, 0);
            var d,
                m,
                p = i - u * this._stepSizeDays,
                _ = this._work,
                y = this._denominators,
                A = this._coef,
                T = this._xTable;

            for (d = 0; d <= s; ++d) {
              _[d] = p - T[d];
            }

            for (d = 0; d <= s; ++d) {
              for (A[d] = 1, m = 0; m <= s; ++m) {
                m !== d && (A[d] *= _[m]);
              }

              A[d] *= y[d];
              var R = 3 * (u + d);
              r.x += A[d] * E[R++], r.y += A[d] * E[R++], r.s += A[d] * E[R];
            }

            return r;
          }
        }
      }
    }, u;
  }), define("Core/Transforms", ["../ThirdParty/when", "./Cartesian2", "./Cartesian3", "./Cartesian4", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./EarthOrientationParameters", "./EarthOrientationParametersSample", "./Ellipsoid", "./HeadingPitchRoll", "./Iau2006XysData", "./Iau2006XysSample", "./JulianDate", "./Math", "./Matrix3", "./Matrix4", "./Quaternion", "./TimeConstants"], function (e, t, r, n, o, i, a, s, u, c, l, f, h, E, d, m, p, _, y, A, T) {
    "use strict";

    var R = {},
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
        C = {
      north: [-1, 0, 0],
      east: [0, 1, 0],
      up: [0, 0, 1],
      south: [1, 0, 0],
      west: [0, -1, 0],
      down: [0, 0, -1]
    },
        g = {},
        I = {
      east: new r(),
      north: new r(),
      up: new r(),
      west: new r(),
      south: new r(),
      down: new r()
    },
        O = new r(),
        v = new r(),
        N = new r();
    R.localFrameToFixedFrameGenerator = function (e, t) {
      if (!S.hasOwnProperty(e) || !S[e].hasOwnProperty(t)) throw new u("firstAxis and secondAxis must be east, north, up, west, south or down.");
      var n,
          o = S[e][t],
          i = e + t;
      return s(g[i]) ? n = g[i] : (n = function n(_n, i, u) {
        if (s(u) || (u = new y()), p.equalsEpsilon(_n.x, 0, p.EPSILON14) && p.equalsEpsilon(_n.y, 0, p.EPSILON14)) {
          var c = p.sign(_n.z);
          r.unpack(C[e], 0, O), "east" !== e && "west" !== e && r.multiplyByScalar(O, c, O), r.unpack(C[t], 0, v), "east" !== t && "west" !== t && r.multiplyByScalar(v, c, v), r.unpack(C[o], 0, N), "east" !== o && "west" !== o && r.multiplyByScalar(N, c, N);
        } else {
          i = a(i, f.WGS84), i.geodeticSurfaceNormal(_n, I.up);
          var l = I.up,
              h = I.east;
          h.x = -_n.y, h.y = _n.x, h.z = 0, r.normalize(h, I.east), r.cross(l, h, I.north), r.multiplyByScalar(I.up, -1, I.down), r.multiplyByScalar(I.east, -1, I.west), r.multiplyByScalar(I.north, -1, I.south), O = I[e], v = I[t], N = I[o];
        }

        return u[0] = O.x, u[1] = O.y, u[2] = O.z, u[3] = 0, u[4] = v.x, u[5] = v.y, u[6] = v.z, u[7] = 0, u[8] = N.x, u[9] = N.y, u[10] = N.z, u[11] = 0, u[12] = _n.x, u[13] = _n.y, u[14] = _n.z, u[15] = 1, u;
      }, g[i] = n), n;
    }, R.eastNorthUpToFixedFrame = R.localFrameToFixedFrameGenerator("east", "north"), R.northEastDownToFixedFrame = R.localFrameToFixedFrameGenerator("north", "east"), R.northUpEastToFixedFrame = R.localFrameToFixedFrameGenerator("north", "up"), R.northWestUpToFixedFrame = R.localFrameToFixedFrameGenerator("north", "west");
    var w = new A(),
        M = new r(1, 1, 1),
        F = new y();

    R.headingPitchRollToFixedFrame = function (e, t, n, o, i) {
      o = a(o, R.eastNorthUpToFixedFrame);
      var s = A.fromHeadingPitchRoll(t, w),
          u = y.fromTranslationQuaternionRotationScale(r.ZERO, s, M, F);
      return i = o(e, n, i), y.multiply(i, u, i);
    };

    var x = new y(),
        D = new _();

    R.headingPitchRollQuaternion = function (e, t, r, n, o) {
      var i = R.headingPitchRollToFixedFrame(e, t, r, n, x),
          a = y.getRotation(i, D);
      return A.fromRotationMatrix(a, o);
    };

    var U = new r(1, 1, 1),
        P = new r(),
        L = new y(),
        b = new y(),
        B = new _(),
        z = new A();

    R.fixedFrameToHeadingPitchRoll = function (e, t, n, o) {
      t = a(t, f.WGS84), n = a(n, R.eastNorthUpToFixedFrame), s(o) || (o = new h());
      var i = y.getTranslation(e, P);
      if (r.equals(i, r.ZERO)) return o.heading = 0, o.pitch = 0, o.roll = 0, o;
      var u = y.inverseTransformation(n(i, t, L), L),
          c = y.setScale(e, U, b);
      c = y.setTranslation(c, r.ZERO, c), u = y.multiply(u, c, u);
      var l = A.fromRotationMatrix(y.getRotation(u, B), z);
      return l = A.normalize(l, l), h.fromQuaternion(l, o);
    };

    var G = p.TWO_PI / 86400,
        q = new m();
    R.computeTemeToPseudoFixedMatrix = function (e, t) {
      q = m.addSeconds(e, -m.computeTaiMinusUtc(e), q);
      var r,
          n = q.dayNumber,
          o = q.secondsOfDay,
          i = n - 2451545;
      r = o >= 43200 ? (i + .5) / T.DAYS_PER_JULIAN_CENTURY : (i - .5) / T.DAYS_PER_JULIAN_CENTURY;
      var a = 24110.54841 + r * (8640184.812866 + r * (.093104 + -62e-7 * r)),
          u = a * G % p.TWO_PI,
          c = 72921158553e-15 + 1.1772758384668e-19 * (n - 2451545.5),
          l = (o + .5 * T.SECONDS_PER_DAY) % T.SECONDS_PER_DAY,
          f = u + c * l,
          h = Math.cos(f),
          E = Math.sin(f);
      return s(t) ? (t[0] = h, t[1] = -E, t[2] = 0, t[3] = E, t[4] = h, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t) : new _(h, E, 0, -E, h, 0, 0, 0, 1);
    }, R.iau2006XysData = new E(), R.earthOrientationParameters = c.NONE;
    R.preloadIcrfFixed = function (t) {
      var r = t.start.dayNumber,
          n = t.start.secondsOfDay + 32.184,
          o = t.stop.dayNumber,
          i = t.stop.secondsOfDay + 32.184,
          a = R.iau2006XysData.preload(r, n, o, i),
          s = R.earthOrientationParameters.getPromiseToLoad();
      return e.all([a, s]);
    }, R.computeIcrfToFixedMatrix = function (e, t) {
      s(t) || (t = new _());
      var r = R.computeFixedToIcrfMatrix(e, t);
      if (s(r)) return _.transpose(r, t);
    };
    var V = new d(0, 0, 0),
        W = new l(0, 0, 0, 0, 0, 0),
        k = new _(),
        H = new _();

    R.computeFixedToIcrfMatrix = function (e, t) {
      s(t) || (t = new _());
      var r = R.earthOrientationParameters.compute(e, W);

      if (s(r)) {
        var n = e.dayNumber,
            o = e.secondsOfDay + 32.184,
            i = R.iau2006XysData.computeXysRadians(n, o, V);

        if (s(i)) {
          var a = i.x + r.xPoleOffset,
              u = i.y + r.yPoleOffset,
              c = 1 / (1 + Math.sqrt(1 - a * a - u * u)),
              l = k;
          l[0] = 1 - c * a * a, l[3] = -c * a * u, l[6] = a, l[1] = -c * a * u, l[4] = 1 - c * u * u, l[7] = u, l[2] = -a, l[5] = -u, l[8] = 1 - c * (a * a + u * u);

          var f = _.fromRotationZ(-i.s, H),
              h = _.multiply(l, f, k),
              E = e.dayNumber,
              d = e.secondsOfDay - m.computeTaiMinusUtc(e) + r.ut1MinusUtc,
              y = E - 2451545,
              A = d / T.SECONDS_PER_DAY,
              S = .779057273264 + A + .00273781191135448 * (y + A);

          S = S % 1 * p.TWO_PI;

          var C = _.fromRotationZ(S, H),
              g = _.multiply(h, C, k),
              I = Math.cos(r.xPoleWander),
              O = Math.cos(r.yPoleWander),
              v = Math.sin(r.xPoleWander),
              N = Math.sin(r.yPoleWander),
              w = n - 2451545 + o / T.SECONDS_PER_DAY;

          w /= 36525;
          var M = -47e-6 * w * p.RADIANS_PER_DEGREE / 3600,
              F = Math.cos(M),
              x = Math.sin(M),
              D = H;
          return D[0] = I * F, D[1] = I * x, D[2] = v, D[3] = -O * x + N * v * F, D[4] = O * F + N * v * x, D[5] = -N * I, D[6] = -N * x - O * v * F, D[7] = N * F - O * v * x, D[8] = O * I, _.multiply(g, D, t);
        }
      }
    };

    var Y = new n();
    R.pointToWindowCoordinates = function (e, t, r, n) {
      return n = R.pointToGLWindowCoordinates(e, t, r, n), n.y = 2 * t[5] - n.y, n;
    }, R.pointToGLWindowCoordinates = function (e, r, o, i) {
      s(i) || (i = new t());
      var a = Y;
      return y.multiplyByVector(e, n.fromElements(o.x, o.y, o.z, 1, a), a), n.multiplyByScalar(a, 1 / a.w, a), y.multiplyByVector(r, a, a), t.fromCartesian4(a, i);
    };
    var X = new r(),
        j = new r(),
        K = new r();

    R.rotationMatrixFromPositionVelocity = function (e, t, n, o) {
      var i = a(n, f.WGS84).geodeticSurfaceNormal(e, X),
          u = r.cross(t, i, j);
      r.equalsEpsilon(u, r.ZERO, p.EPSILON6) && (u = r.clone(r.UNIT_X, u));
      var c = r.cross(u, t, K);
      return r.normalize(c, c), r.cross(t, c, u), r.negate(u, u), r.normalize(u, u), s(o) || (o = new _()), o[0] = t.x, o[1] = t.y, o[2] = t.z, o[3] = u.x, o[4] = u.y, o[5] = u.z, o[6] = c.x, o[7] = c.y, o[8] = c.z, o;
    };

    var Z = new y(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
        J = new o(),
        Q = new r(),
        $ = new r(),
        ee = new _(),
        te = new y(),
        re = new y();
    return R.basisTo2D = function (e, t, n) {
      var o = y.getTranslation(t, $),
          i = e.ellipsoid,
          a = i.cartesianToCartographic(o, J),
          s = e.project(a, Q);
      r.fromElements(s.z, s.x, s.y, s);
      var u = R.eastNorthUpToFixedFrame(o, i, te),
          c = y.inverseTransformation(u, re),
          l = y.getRotation(t, ee),
          f = y.multiplyByMatrix3(c, l, n);
      return y.multiply(Z, f, n), y.setTranslation(n, s, n), n;
    }, R.wgs84To2DModelMatrix = function (e, t, n) {
      var o = e.ellipsoid,
          i = R.eastNorthUpToFixedFrame(t, o, te),
          a = y.inverseTransformation(i, re),
          s = o.cartesianToCartographic(t, J),
          u = e.project(s, Q);
      r.fromElements(u.z, u.x, u.y, u);
      var c = y.fromTranslation(u, te);
      return y.multiply(Z, a, n), y.multiply(c, n, n), n;
    }, R;
  }), define("Core/Geometry", ["./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryOffsetAttribute", "./GeometryType", "./Matrix2", "./Matrix3", "./Matrix4", "./PrimitiveType", "./Quaternion", "./Rectangle", "./Transforms"], function (e, t, r, n, o, i, a, s, u, c, l, f, h, E, d, m) {
    "use strict";

    function p(e) {
      e = o(e, o.EMPTY_OBJECT), this.attributes = e.attributes, this.indices = e.indices, this.primitiveType = o(e.primitiveType, h.TRIANGLES), this.boundingSphere = e.boundingSphere, this.geometryType = o(e.geometryType, u.NONE), this.boundingSphereCV = e.boundingSphereCV, this.offsetAttribute = e.offsetAttribute;
    }

    p.computeNumberOfVertices = function (e) {
      var t = -1;

      for (var r in e.attributes) {
        if (e.attributes.hasOwnProperty(r) && i(e.attributes[r]) && i(e.attributes[r].values)) {
          var n = e.attributes[r],
              o = n.values.length / n.componentsPerAttribute;
          t = o;
        }
      }

      return t;
    };

    var _ = new r(),
        y = new t(),
        A = new f(),
        T = [new r(), new r(), new r()],
        R = [new e(), new e(), new e()],
        S = [new e(), new e(), new e()],
        C = new t(),
        g = new E(),
        I = new f(),
        O = new c();

    return p._textureCoordinateRotationPoints = function (n, o, i, a) {
      var s,
          u = d.center(a, _),
          h = r.toCartesian(u, i, y),
          p = m.eastNorthUpToFixedFrame(h, i, A),
          v = f.inverse(p, A),
          N = R,
          w = T;
      w[0].longitude = a.west, w[0].latitude = a.south, w[1].longitude = a.west, w[1].latitude = a.north, w[2].longitude = a.east, w[2].latitude = a.south;
      var M = C;

      for (s = 0; s < 3; s++) {
        r.toCartesian(w[s], i, M), M = f.multiplyByPointAsVector(v, M, M), N[s].x = M.x, N[s].y = M.y;
      }

      var F = E.fromAxisAngle(t.UNIT_Z, -o, g),
          x = l.fromQuaternion(F, I),
          D = n.length,
          U = Number.POSITIVE_INFINITY,
          P = Number.POSITIVE_INFINITY,
          L = Number.NEGATIVE_INFINITY,
          b = Number.NEGATIVE_INFINITY;

      for (s = 0; s < D; s++) {
        M = f.multiplyByPointAsVector(v, n[s], M), M = l.multiplyByVector(x, M, M), U = Math.min(U, M.x), P = Math.min(P, M.y), L = Math.max(L, M.x), b = Math.max(b, M.y);
      }

      var B = c.fromRotation(o, O),
          z = S;
      z[0].x = U, z[0].y = P, z[1].x = U, z[1].y = b, z[2].x = L, z[2].y = P;
      var G = N[0],
          q = N[2].x - G.x,
          V = N[1].y - G.y;

      for (s = 0; s < 3; s++) {
        var W = z[s];
        c.multiplyByVector(B, W, W), W.x = (W.x - G.x) / q, W.y = (W.y - G.y) / V;
      }

      var k = z[0],
          H = z[1],
          Y = z[2],
          X = new Array(6);
      return e.pack(k, X), e.pack(H, X, 2), e.pack(Y, X, 4), X;
    }, p;
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
  }), define("Core/VertexFormat", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function (e, t, r, n) {
    "use strict";

    function o(t) {
      t = e(t, e.EMPTY_OBJECT), this.position = e(t.position, !1), this.normal = e(t.normal, !1), this.st = e(t.st, !1), this.bitangent = e(t.bitangent, !1), this.tangent = e(t.tangent, !1), this.color = e(t.color, !1);
    }

    return o.POSITION_ONLY = n(new o({
      position: !0
    })), o.POSITION_AND_NORMAL = n(new o({
      position: !0,
      normal: !0
    })), o.POSITION_NORMAL_AND_ST = n(new o({
      position: !0,
      normal: !0,
      st: !0
    })), o.POSITION_AND_ST = n(new o({
      position: !0,
      st: !0
    })), o.POSITION_AND_COLOR = n(new o({
      position: !0,
      color: !0
    })), o.ALL = n(new o({
      position: !0,
      normal: !0,
      st: !0,
      tangent: !0,
      bitangent: !0
    })), o.DEFAULT = o.POSITION_NORMAL_AND_ST, o.packedLength = 6, o.pack = function (t, r, n) {
      return n = e(n, 0), r[n++] = t.position ? 1 : 0, r[n++] = t.normal ? 1 : 0, r[n++] = t.st ? 1 : 0, r[n++] = t.tangent ? 1 : 0, r[n++] = t.bitangent ? 1 : 0, r[n] = t.color ? 1 : 0, r;
    }, o.unpack = function (r, n, i) {
      return n = e(n, 0), t(i) || (i = new o()), i.position = 1 === r[n++], i.normal = 1 === r[n++], i.st = 1 === r[n++], i.tangent = 1 === r[n++], i.bitangent = 1 === r[n++], i.color = 1 === r[n], i;
    }, o.clone = function (e, r) {
      if (t(e)) return t(r) || (r = new o()), r.position = e.position, r.normal = e.normal, r.st = e.st, r.tangent = e.tangent, r.bitangent = e.bitangent, r.color = e.color, r;
    }, o;
  }), define("Core/BoxGeometry", ["./arrayFill", "./BoundingSphere", "./Cartesian3", "./Check", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./PrimitiveType", "./VertexFormat"], function (e, t, r, n, o, i, a, s, u, c, l, f, h, E) {
    "use strict";

    function d(e) {
      e = i(e, i.EMPTY_OBJECT);
      var t = e.minimum,
          n = e.maximum,
          o = i(e.vertexFormat, E.DEFAULT);
      this._minimum = r.clone(t), this._maximum = r.clone(n), this._vertexFormat = o, this._offsetAttribute = e.offsetAttribute, this._workerName = "createBoxGeometry";
    }

    var m = new r();
    d.fromDimensions = function (e) {
      e = i(e, i.EMPTY_OBJECT);
      var t = e.dimensions,
          n = r.multiplyByScalar(t, .5, new r());
      return new d({
        minimum: r.negate(n, new r()),
        maximum: n,
        vertexFormat: e.vertexFormat,
        offsetAttribute: e.offsetAttribute
      });
    }, d.fromAxisAlignedBoundingBox = function (e) {
      return new d({
        minimum: e.minimum,
        maximum: e.maximum
      });
    }, d.packedLength = 2 * r.packedLength + E.packedLength + 1, d.pack = function (e, t, n) {
      return n = i(n, 0), r.pack(e._minimum, t, n), r.pack(e._maximum, t, n + r.packedLength), E.pack(e._vertexFormat, t, n + 2 * r.packedLength), t[n + 2 * r.packedLength + E.packedLength] = i(e._offsetAttribute, -1), t;
    };

    var p = new r(),
        _ = new r(),
        y = new E(),
        A = {
      minimum: p,
      maximum: _,
      vertexFormat: y,
      offsetAttribute: void 0
    };

    d.unpack = function (e, t, n) {
      t = i(t, 0);
      var o = r.unpack(e, t, p),
          s = r.unpack(e, t + r.packedLength, _),
          u = E.unpack(e, t + 2 * r.packedLength, y),
          c = e[t + 2 * r.packedLength + E.packedLength];
      return a(n) ? (n._minimum = r.clone(o, n._minimum), n._maximum = r.clone(s, n._maximum), n._vertexFormat = E.clone(u, n._vertexFormat), n._offsetAttribute = -1 === c ? void 0 : c, n) : (A.offsetAttribute = -1 === c ? void 0 : c, new d(A));
    }, d.createGeometry = function (n) {
      var i = n._minimum,
          s = n._maximum,
          E = n._vertexFormat;

      if (!r.equals(i, s)) {
        var d,
            p,
            _ = new l();

        if (E.position && (E.st || E.normal || E.tangent || E.bitangent)) {
          if (E.position && (p = new Float64Array(72), p[0] = i.x, p[1] = i.y, p[2] = s.z, p[3] = s.x, p[4] = i.y, p[5] = s.z, p[6] = s.x, p[7] = s.y, p[8] = s.z, p[9] = i.x, p[10] = s.y, p[11] = s.z, p[12] = i.x, p[13] = i.y, p[14] = i.z, p[15] = s.x, p[16] = i.y, p[17] = i.z, p[18] = s.x, p[19] = s.y, p[20] = i.z, p[21] = i.x, p[22] = s.y, p[23] = i.z, p[24] = s.x, p[25] = i.y, p[26] = i.z, p[27] = s.x, p[28] = s.y, p[29] = i.z, p[30] = s.x, p[31] = s.y, p[32] = s.z, p[33] = s.x, p[34] = i.y, p[35] = s.z, p[36] = i.x, p[37] = i.y, p[38] = i.z, p[39] = i.x, p[40] = s.y, p[41] = i.z, p[42] = i.x, p[43] = s.y, p[44] = s.z, p[45] = i.x, p[46] = i.y, p[47] = s.z, p[48] = i.x, p[49] = s.y, p[50] = i.z, p[51] = s.x, p[52] = s.y, p[53] = i.z, p[54] = s.x, p[55] = s.y, p[56] = s.z, p[57] = i.x, p[58] = s.y, p[59] = s.z, p[60] = i.x, p[61] = i.y, p[62] = i.z, p[63] = s.x, p[64] = i.y, p[65] = i.z, p[66] = s.x, p[67] = i.y, p[68] = s.z, p[69] = i.x, p[70] = i.y, p[71] = s.z, _.position = new c({
            componentDatatype: o.DOUBLE,
            componentsPerAttribute: 3,
            values: p
          })), E.normal) {
            var y = new Float32Array(72);
            y[0] = 0, y[1] = 0, y[2] = 1, y[3] = 0, y[4] = 0, y[5] = 1, y[6] = 0, y[7] = 0, y[8] = 1, y[9] = 0, y[10] = 0, y[11] = 1, y[12] = 0, y[13] = 0, y[14] = -1, y[15] = 0, y[16] = 0, y[17] = -1, y[18] = 0, y[19] = 0, y[20] = -1, y[21] = 0, y[22] = 0, y[23] = -1, y[24] = 1, y[25] = 0, y[26] = 0, y[27] = 1, y[28] = 0, y[29] = 0, y[30] = 1, y[31] = 0, y[32] = 0, y[33] = 1, y[34] = 0, y[35] = 0, y[36] = -1, y[37] = 0, y[38] = 0, y[39] = -1, y[40] = 0, y[41] = 0, y[42] = -1, y[43] = 0, y[44] = 0, y[45] = -1, y[46] = 0, y[47] = 0, y[48] = 0, y[49] = 1, y[50] = 0, y[51] = 0, y[52] = 1, y[53] = 0, y[54] = 0, y[55] = 1, y[56] = 0, y[57] = 0, y[58] = 1, y[59] = 0, y[60] = 0, y[61] = -1, y[62] = 0, y[63] = 0, y[64] = -1, y[65] = 0, y[66] = 0, y[67] = -1, y[68] = 0, y[69] = 0, y[70] = -1, y[71] = 0, _.normal = new c({
              componentDatatype: o.FLOAT,
              componentsPerAttribute: 3,
              values: y
            });
          }

          if (E.st) {
            var A = new Float32Array(48);
            A[0] = 0, A[1] = 0, A[2] = 1, A[3] = 0, A[4] = 1, A[5] = 1, A[6] = 0, A[7] = 1, A[8] = 1, A[9] = 0, A[10] = 0, A[11] = 0, A[12] = 0, A[13] = 1, A[14] = 1, A[15] = 1, A[16] = 0, A[17] = 0, A[18] = 1, A[19] = 0, A[20] = 1, A[21] = 1, A[22] = 0, A[23] = 1, A[24] = 1, A[25] = 0, A[26] = 0, A[27] = 0, A[28] = 0, A[29] = 1, A[30] = 1, A[31] = 1, A[32] = 1, A[33] = 0, A[34] = 0, A[35] = 0, A[36] = 0, A[37] = 1, A[38] = 1, A[39] = 1, A[40] = 0, A[41] = 0, A[42] = 1, A[43] = 0, A[44] = 1, A[45] = 1, A[46] = 0, A[47] = 1, _.st = new c({
              componentDatatype: o.FLOAT,
              componentsPerAttribute: 2,
              values: A
            });
          }

          if (E.tangent) {
            var T = new Float32Array(72);
            T[0] = 1, T[1] = 0, T[2] = 0, T[3] = 1, T[4] = 0, T[5] = 0, T[6] = 1, T[7] = 0, T[8] = 0, T[9] = 1, T[10] = 0, T[11] = 0, T[12] = -1, T[13] = 0, T[14] = 0, T[15] = -1, T[16] = 0, T[17] = 0, T[18] = -1, T[19] = 0, T[20] = 0, T[21] = -1, T[22] = 0, T[23] = 0, T[24] = 0, T[25] = 1, T[26] = 0, T[27] = 0, T[28] = 1, T[29] = 0, T[30] = 0, T[31] = 1, T[32] = 0, T[33] = 0, T[34] = 1, T[35] = 0, T[36] = 0, T[37] = -1, T[38] = 0, T[39] = 0, T[40] = -1, T[41] = 0, T[42] = 0, T[43] = -1, T[44] = 0, T[45] = 0, T[46] = -1, T[47] = 0, T[48] = -1, T[49] = 0, T[50] = 0, T[51] = -1, T[52] = 0, T[53] = 0, T[54] = -1, T[55] = 0, T[56] = 0, T[57] = -1, T[58] = 0, T[59] = 0, T[60] = 1, T[61] = 0, T[62] = 0, T[63] = 1, T[64] = 0, T[65] = 0, T[66] = 1, T[67] = 0, T[68] = 0, T[69] = 1, T[70] = 0, T[71] = 0, _.tangent = new c({
              componentDatatype: o.FLOAT,
              componentsPerAttribute: 3,
              values: T
            });
          }

          if (E.bitangent) {
            var R = new Float32Array(72);
            R[0] = 0, R[1] = 1, R[2] = 0, R[3] = 0, R[4] = 1, R[5] = 0, R[6] = 0, R[7] = 1, R[8] = 0, R[9] = 0, R[10] = 1, R[11] = 0, R[12] = 0, R[13] = 1, R[14] = 0, R[15] = 0, R[16] = 1, R[17] = 0, R[18] = 0, R[19] = 1, R[20] = 0, R[21] = 0, R[22] = 1, R[23] = 0, R[24] = 0, R[25] = 0, R[26] = 1, R[27] = 0, R[28] = 0, R[29] = 1, R[30] = 0, R[31] = 0, R[32] = 1, R[33] = 0, R[34] = 0, R[35] = 1, R[36] = 0, R[37] = 0, R[38] = 1, R[39] = 0, R[40] = 0, R[41] = 1, R[42] = 0, R[43] = 0, R[44] = 1, R[45] = 0, R[46] = 0, R[47] = 1, R[48] = 0, R[49] = 0, R[50] = 1, R[51] = 0, R[52] = 0, R[53] = 1, R[54] = 0, R[55] = 0, R[56] = 1, R[57] = 0, R[58] = 0, R[59] = 1, R[60] = 0, R[61] = 0, R[62] = 1, R[63] = 0, R[64] = 0, R[65] = 1, R[66] = 0, R[67] = 0, R[68] = 1, R[69] = 0, R[70] = 0, R[71] = 1, _.bitangent = new c({
              componentDatatype: o.FLOAT,
              componentsPerAttribute: 3,
              values: R
            });
          }

          d = new Uint16Array(36), d[0] = 0, d[1] = 1, d[2] = 2, d[3] = 0, d[4] = 2, d[5] = 3, d[6] = 6, d[7] = 5, d[8] = 4, d[9] = 7, d[10] = 6, d[11] = 4, d[12] = 8, d[13] = 9, d[14] = 10, d[15] = 8, d[16] = 10, d[17] = 11, d[18] = 14, d[19] = 13, d[20] = 12, d[21] = 15, d[22] = 14, d[23] = 12, d[24] = 18, d[25] = 17, d[26] = 16, d[27] = 19, d[28] = 18, d[29] = 16, d[30] = 20, d[31] = 21, d[32] = 22, d[33] = 20, d[34] = 22, d[35] = 23;
        } else p = new Float64Array(24), p[0] = i.x, p[1] = i.y, p[2] = i.z, p[3] = s.x, p[4] = i.y, p[5] = i.z, p[6] = s.x, p[7] = s.y, p[8] = i.z, p[9] = i.x, p[10] = s.y, p[11] = i.z, p[12] = i.x, p[13] = i.y, p[14] = s.z, p[15] = s.x, p[16] = i.y, p[17] = s.z, p[18] = s.x, p[19] = s.y, p[20] = s.z, p[21] = i.x, p[22] = s.y, p[23] = s.z, _.position = new c({
          componentDatatype: o.DOUBLE,
          componentsPerAttribute: 3,
          values: p
        }), d = new Uint16Array(36), d[0] = 4, d[1] = 5, d[2] = 6, d[3] = 4, d[4] = 6, d[5] = 7, d[6] = 1, d[7] = 0, d[8] = 3, d[9] = 1, d[10] = 3, d[11] = 2, d[12] = 1, d[13] = 6, d[14] = 5, d[15] = 1, d[16] = 2, d[17] = 6, d[18] = 2, d[19] = 3, d[20] = 7, d[21] = 2, d[22] = 7, d[23] = 6, d[24] = 3, d[25] = 0, d[26] = 4, d[27] = 3, d[28] = 4, d[29] = 7, d[30] = 0, d[31] = 1, d[32] = 5, d[33] = 0, d[34] = 5, d[35] = 4;

        var S = r.subtract(s, i, m),
            C = .5 * r.magnitude(S);

        if (a(n._offsetAttribute)) {
          var g = p.length,
              I = new Uint8Array(g / 3),
              O = n._offsetAttribute === f.NONE ? 0 : 1;
          e(I, O), _.applyOffset = new c({
            componentDatatype: o.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: I
          });
        }

        return new u({
          attributes: _,
          indices: d,
          primitiveType: h.TRIANGLES,
          boundingSphere: new t(r.ZERO, C),
          offsetAttribute: n._offsetAttribute
        });
      }
    };
    var T;
    return d.getUnitBox = function () {
      return a(T) || (T = d.createGeometry(d.fromDimensions({
        dimensions: new r(1, 1, 1),
        vertexFormat: E.POSITION_ONLY
      }))), T;
    }, d;
  }), define("Core/Color", ["./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math"], function (e, t, r, n, o, i) {
    "use strict";

    function a(e, t, r) {
      return r < 0 && (r += 1), r > 1 && (r -= 1), 6 * r < 1 ? e + 6 * (t - e) * r : 2 * r < 1 ? t : 3 * r < 2 ? e + (t - e) * (2 / 3 - r) * 6 : e;
    }

    function s(e, r, n, o) {
      this.red = t(e, 1), this.green = t(r, 1), this.blue = t(n, 1), this.alpha = t(o, 1);
    }

    s.fromCartesian4 = function (e, t) {
      return r(t) ? (t.red = e.x, t.green = e.y, t.blue = e.z, t.alpha = e.w, t) : new s(e.x, e.y, e.z, e.w);
    }, s.fromBytes = function (e, n, o, i, a) {
      return e = s.byteToFloat(t(e, 255)), n = s.byteToFloat(t(n, 255)), o = s.byteToFloat(t(o, 255)), i = s.byteToFloat(t(i, 255)), r(a) ? (a.red = e, a.green = n, a.blue = o, a.alpha = i, a) : new s(e, n, o, i);
    }, s.fromAlpha = function (e, t, n) {
      return r(n) ? (n.red = e.red, n.green = e.green, n.blue = e.blue, n.alpha = t, n) : new s(e.red, e.green, e.blue, t);
    };
    var u, c, l;
    n.supportsTypedArrays() && (u = new ArrayBuffer(4), c = new Uint32Array(u), l = new Uint8Array(u)), s.fromRgba = function (e, t) {
      return c[0] = e, s.fromBytes(l[0], l[1], l[2], l[3], t);
    }, s.fromHsl = function (e, n, o, i, u) {
      e = t(e, 0) % 1, n = t(n, 0), o = t(o, 0), i = t(i, 1);
      var c = o,
          l = o,
          f = o;

      if (0 !== n) {
        var h;
        h = o < .5 ? o * (1 + n) : o + n - o * n;
        var E = 2 * o - h;
        c = a(E, h, e + 1 / 3), l = a(E, h, e), f = a(E, h, e - 1 / 3);
      }

      return r(u) ? (u.red = c, u.green = l, u.blue = f, u.alpha = i, u) : new s(c, l, f, i);
    }, s.fromRandom = function (e, n) {
      e = t(e, t.EMPTY_OBJECT);
      var o = e.red;

      if (!r(o)) {
        var a = t(e.minimumRed, 0),
            u = t(e.maximumRed, 1);
        o = a + i.nextRandomNumber() * (u - a);
      }

      var c = e.green;

      if (!r(c)) {
        var l = t(e.minimumGreen, 0),
            f = t(e.maximumGreen, 1);
        c = l + i.nextRandomNumber() * (f - l);
      }

      var h = e.blue;

      if (!r(h)) {
        var E = t(e.minimumBlue, 0),
            d = t(e.maximumBlue, 1);
        h = E + i.nextRandomNumber() * (d - E);
      }

      var m = e.alpha;

      if (!r(m)) {
        var p = t(e.minimumAlpha, 0),
            _ = t(e.maximumAlpha, 1);

        m = p + i.nextRandomNumber() * (_ - p);
      }

      return r(n) ? (n.red = o, n.green = c, n.blue = h, n.alpha = m, n) : new s(o, c, h, m);
    };
    var f = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
        h = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
        E = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
        d = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
    return s.fromCssColorString = function (e, n) {
      r(n) || (n = new s());
      var o = s[e.toUpperCase()];
      if (r(o)) return s.clone(o, n), n;
      var i = f.exec(e);
      return null !== i ? (n.red = parseInt(i[1], 16) / 15, n.green = parseInt(i[2], 16) / 15, n.blue = parseInt(i[3], 16) / 15, n.alpha = 1, n) : null !== (i = h.exec(e)) ? (n.red = parseInt(i[1], 16) / 255, n.green = parseInt(i[2], 16) / 255, n.blue = parseInt(i[3], 16) / 255, n.alpha = 1, n) : null !== (i = E.exec(e)) ? (n.red = parseFloat(i[1]) / ("%" === i[1].substr(-1) ? 100 : 255), n.green = parseFloat(i[2]) / ("%" === i[2].substr(-1) ? 100 : 255), n.blue = parseFloat(i[3]) / ("%" === i[3].substr(-1) ? 100 : 255), n.alpha = parseFloat(t(i[4], "1.0")), n) : null !== (i = d.exec(e)) ? s.fromHsl(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, parseFloat(t(i[4], "1.0")), n) : n = void 0;
    }, s.packedLength = 4, s.pack = function (e, r, n) {
      return n = t(n, 0), r[n++] = e.red, r[n++] = e.green, r[n++] = e.blue, r[n] = e.alpha, r;
    }, s.unpack = function (e, n, o) {
      return n = t(n, 0), r(o) || (o = new s()), o.red = e[n++], o.green = e[n++], o.blue = e[n++], o.alpha = e[n], o;
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
          o = s.floatToByte(this.blue),
          i = s.floatToByte(this.alpha);
      return r(e) ? (e[0] = t, e[1] = n, e[2] = o, e[3] = i, e) : [t, n, o, i];
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
    }, s.ALICEBLUE = o(s.fromCssColorString("#F0F8FF")), s.ANTIQUEWHITE = o(s.fromCssColorString("#FAEBD7")), s.AQUA = o(s.fromCssColorString("#00FFFF")), s.AQUAMARINE = o(s.fromCssColorString("#7FFFD4")), s.AZURE = o(s.fromCssColorString("#F0FFFF")), s.BEIGE = o(s.fromCssColorString("#F5F5DC")), s.BISQUE = o(s.fromCssColorString("#FFE4C4")), s.BLACK = o(s.fromCssColorString("#000000")), s.BLANCHEDALMOND = o(s.fromCssColorString("#FFEBCD")), s.BLUE = o(s.fromCssColorString("#0000FF")), s.BLUEVIOLET = o(s.fromCssColorString("#8A2BE2")), s.BROWN = o(s.fromCssColorString("#A52A2A")), s.BURLYWOOD = o(s.fromCssColorString("#DEB887")), s.CADETBLUE = o(s.fromCssColorString("#5F9EA0")), s.CHARTREUSE = o(s.fromCssColorString("#7FFF00")), s.CHOCOLATE = o(s.fromCssColorString("#D2691E")), s.CORAL = o(s.fromCssColorString("#FF7F50")), s.CORNFLOWERBLUE = o(s.fromCssColorString("#6495ED")), s.CORNSILK = o(s.fromCssColorString("#FFF8DC")), s.CRIMSON = o(s.fromCssColorString("#DC143C")), s.CYAN = o(s.fromCssColorString("#00FFFF")), s.DARKBLUE = o(s.fromCssColorString("#00008B")), s.DARKCYAN = o(s.fromCssColorString("#008B8B")), s.DARKGOLDENROD = o(s.fromCssColorString("#B8860B")), s.DARKGRAY = o(s.fromCssColorString("#A9A9A9")), s.DARKGREEN = o(s.fromCssColorString("#006400")), s.DARKGREY = s.DARKGRAY, s.DARKKHAKI = o(s.fromCssColorString("#BDB76B")), s.DARKMAGENTA = o(s.fromCssColorString("#8B008B")), s.DARKOLIVEGREEN = o(s.fromCssColorString("#556B2F")), s.DARKORANGE = o(s.fromCssColorString("#FF8C00")), s.DARKORCHID = o(s.fromCssColorString("#9932CC")), s.DARKRED = o(s.fromCssColorString("#8B0000")), s.DARKSALMON = o(s.fromCssColorString("#E9967A")), s.DARKSEAGREEN = o(s.fromCssColorString("#8FBC8F")), s.DARKSLATEBLUE = o(s.fromCssColorString("#483D8B")), s.DARKSLATEGRAY = o(s.fromCssColorString("#2F4F4F")), s.DARKSLATEGREY = s.DARKSLATEGRAY, s.DARKTURQUOISE = o(s.fromCssColorString("#00CED1")), s.DARKVIOLET = o(s.fromCssColorString("#9400D3")), s.DEEPPINK = o(s.fromCssColorString("#FF1493")), s.DEEPSKYBLUE = o(s.fromCssColorString("#00BFFF")), s.DIMGRAY = o(s.fromCssColorString("#696969")), s.DIMGREY = s.DIMGRAY, s.DODGERBLUE = o(s.fromCssColorString("#1E90FF")), s.FIREBRICK = o(s.fromCssColorString("#B22222")), s.FLORALWHITE = o(s.fromCssColorString("#FFFAF0")), s.FORESTGREEN = o(s.fromCssColorString("#228B22")), s.FUCHSIA = o(s.fromCssColorString("#FF00FF")), s.GAINSBORO = o(s.fromCssColorString("#DCDCDC")), s.GHOSTWHITE = o(s.fromCssColorString("#F8F8FF")), s.GOLD = o(s.fromCssColorString("#FFD700")), s.GOLDENROD = o(s.fromCssColorString("#DAA520")), s.GRAY = o(s.fromCssColorString("#808080")), s.GREEN = o(s.fromCssColorString("#008000")), s.GREENYELLOW = o(s.fromCssColorString("#ADFF2F")), s.GREY = s.GRAY, s.HONEYDEW = o(s.fromCssColorString("#F0FFF0")), s.HOTPINK = o(s.fromCssColorString("#FF69B4")), s.INDIANRED = o(s.fromCssColorString("#CD5C5C")), s.INDIGO = o(s.fromCssColorString("#4B0082")), s.IVORY = o(s.fromCssColorString("#FFFFF0")), s.KHAKI = o(s.fromCssColorString("#F0E68C")), s.LAVENDER = o(s.fromCssColorString("#E6E6FA")), s.LAVENDAR_BLUSH = o(s.fromCssColorString("#FFF0F5")), s.LAWNGREEN = o(s.fromCssColorString("#7CFC00")), s.LEMONCHIFFON = o(s.fromCssColorString("#FFFACD")), s.LIGHTBLUE = o(s.fromCssColorString("#ADD8E6")), s.LIGHTCORAL = o(s.fromCssColorString("#F08080")), s.LIGHTCYAN = o(s.fromCssColorString("#E0FFFF")), s.LIGHTGOLDENRODYELLOW = o(s.fromCssColorString("#FAFAD2")), s.LIGHTGRAY = o(s.fromCssColorString("#D3D3D3")), s.LIGHTGREEN = o(s.fromCssColorString("#90EE90")), s.LIGHTGREY = s.LIGHTGRAY, s.LIGHTPINK = o(s.fromCssColorString("#FFB6C1")), s.LIGHTSEAGREEN = o(s.fromCssColorString("#20B2AA")), s.LIGHTSKYBLUE = o(s.fromCssColorString("#87CEFA")), s.LIGHTSLATEGRAY = o(s.fromCssColorString("#778899")), s.LIGHTSLATEGREY = s.LIGHTSLATEGRAY, s.LIGHTSTEELBLUE = o(s.fromCssColorString("#B0C4DE")), s.LIGHTYELLOW = o(s.fromCssColorString("#FFFFE0")), s.LIME = o(s.fromCssColorString("#00FF00")), s.LIMEGREEN = o(s.fromCssColorString("#32CD32")), s.LINEN = o(s.fromCssColorString("#FAF0E6")), s.MAGENTA = o(s.fromCssColorString("#FF00FF")), s.MAROON = o(s.fromCssColorString("#800000")), s.MEDIUMAQUAMARINE = o(s.fromCssColorString("#66CDAA")), s.MEDIUMBLUE = o(s.fromCssColorString("#0000CD")), s.MEDIUMORCHID = o(s.fromCssColorString("#BA55D3")), s.MEDIUMPURPLE = o(s.fromCssColorString("#9370DB")), s.MEDIUMSEAGREEN = o(s.fromCssColorString("#3CB371")), s.MEDIUMSLATEBLUE = o(s.fromCssColorString("#7B68EE")), s.MEDIUMSPRINGGREEN = o(s.fromCssColorString("#00FA9A")), s.MEDIUMTURQUOISE = o(s.fromCssColorString("#48D1CC")), s.MEDIUMVIOLETRED = o(s.fromCssColorString("#C71585")), s.MIDNIGHTBLUE = o(s.fromCssColorString("#191970")), s.MINTCREAM = o(s.fromCssColorString("#F5FFFA")), s.MISTYROSE = o(s.fromCssColorString("#FFE4E1")), s.MOCCASIN = o(s.fromCssColorString("#FFE4B5")), s.NAVAJOWHITE = o(s.fromCssColorString("#FFDEAD")), s.NAVY = o(s.fromCssColorString("#000080")), s.OLDLACE = o(s.fromCssColorString("#FDF5E6")), s.OLIVE = o(s.fromCssColorString("#808000")), s.OLIVEDRAB = o(s.fromCssColorString("#6B8E23")), s.ORANGE = o(s.fromCssColorString("#FFA500")), s.ORANGERED = o(s.fromCssColorString("#FF4500")), s.ORCHID = o(s.fromCssColorString("#DA70D6")), s.PALEGOLDENROD = o(s.fromCssColorString("#EEE8AA")), s.PALEGREEN = o(s.fromCssColorString("#98FB98")), s.PALETURQUOISE = o(s.fromCssColorString("#AFEEEE")), s.PALEVIOLETRED = o(s.fromCssColorString("#DB7093")), s.PAPAYAWHIP = o(s.fromCssColorString("#FFEFD5")), s.PEACHPUFF = o(s.fromCssColorString("#FFDAB9")), s.PERU = o(s.fromCssColorString("#CD853F")), s.PINK = o(s.fromCssColorString("#FFC0CB")), s.PLUM = o(s.fromCssColorString("#DDA0DD")), s.POWDERBLUE = o(s.fromCssColorString("#B0E0E6")), s.PURPLE = o(s.fromCssColorString("#800080")), s.RED = o(s.fromCssColorString("#FF0000")), s.ROSYBROWN = o(s.fromCssColorString("#BC8F8F")), s.ROYALBLUE = o(s.fromCssColorString("#4169E1")), s.SADDLEBROWN = o(s.fromCssColorString("#8B4513")), s.SALMON = o(s.fromCssColorString("#FA8072")), s.SANDYBROWN = o(s.fromCssColorString("#F4A460")), s.SEAGREEN = o(s.fromCssColorString("#2E8B57")), s.SEASHELL = o(s.fromCssColorString("#FFF5EE")), s.SIENNA = o(s.fromCssColorString("#A0522D")), s.SILVER = o(s.fromCssColorString("#C0C0C0")), s.SKYBLUE = o(s.fromCssColorString("#87CEEB")), s.SLATEBLUE = o(s.fromCssColorString("#6A5ACD")), s.SLATEGRAY = o(s.fromCssColorString("#708090")), s.SLATEGREY = s.SLATEGRAY, s.SNOW = o(s.fromCssColorString("#FFFAFA")), s.SPRINGGREEN = o(s.fromCssColorString("#00FF7F")), s.STEELBLUE = o(s.fromCssColorString("#4682B4")), s.TAN = o(s.fromCssColorString("#D2B48C")), s.TEAL = o(s.fromCssColorString("#008080")), s.THISTLE = o(s.fromCssColorString("#D8BFD8")), s.TOMATO = o(s.fromCssColorString("#FF6347")), s.TURQUOISE = o(s.fromCssColorString("#40E0D0")), s.VIOLET = o(s.fromCssColorString("#EE82EE")), s.WHEAT = o(s.fromCssColorString("#F5DEB3")), s.WHITE = o(s.fromCssColorString("#FFFFFF")), s.WHITESMOKE = o(s.fromCssColorString("#F5F5F5")), s.YELLOW = o(s.fromCssColorString("#FFFF00")), s.YELLOWGREEN = o(s.fromCssColorString("#9ACD32")), s.TRANSPARENT = o(new s(0, 0, 0, 0)), s;
  }), define("Core/CylinderGeometryLibrary", ["./Math"], function (e) {
    "use strict";

    var t = {};
    return t.computePositions = function (t, r, n, o, i) {
      var a,
          s = .5 * t,
          u = -s,
          c = o + o,
          l = i ? 2 * c : c,
          f = new Float64Array(3 * l),
          h = 0,
          E = 0,
          d = i ? 3 * c : 0,
          m = i ? 3 * (c + o) : 3 * o;

      for (a = 0; a < o; a++) {
        var p = a / o * e.TWO_PI,
            _ = Math.cos(p),
            y = Math.sin(p),
            A = _ * n,
            T = y * n,
            R = _ * r,
            S = y * r;

        f[E + d] = A, f[E + d + 1] = T, f[E + d + 2] = u, f[E + m] = R, f[E + m + 1] = S, f[E + m + 2] = s, E += 3, i && (f[h++] = A, f[h++] = T, f[h++] = u, f[h++] = R, f[h++] = S, f[h++] = s);
      }

      return f;
    }, t;
  }), define("Core/IndexDatatype", ["./defined", "./DeveloperError", "./freezeObject", "./Math", "./WebGLConstants"], function (e, t, r, n, o) {
    "use strict";

    var i = {
      UNSIGNED_BYTE: o.UNSIGNED_BYTE,
      UNSIGNED_SHORT: o.UNSIGNED_SHORT,
      UNSIGNED_INT: o.UNSIGNED_INT
    };
    return i.getSizeInBytes = function (e) {
      switch (e) {
        case i.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT;

        case i.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT;

        case i.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT;
      }
    }, i.fromSizeInBytes = function (e) {
      switch (e) {
        case 2:
          return i.UNSIGNED_SHORT;

        case 4:
          return i.UNSIGNED_INT;

        case 1:
          return i.UNSIGNED_BYTE;
      }
    }, i.validate = function (t) {
      return e(t) && (t === i.UNSIGNED_BYTE || t === i.UNSIGNED_SHORT || t === i.UNSIGNED_INT);
    }, i.createTypedArray = function (e, t) {
      return e >= n.SIXTY_FOUR_KILOBYTES ? new Uint32Array(t) : new Uint16Array(t);
    }, i.createTypedArrayFromArrayBuffer = function (e, t, r, o) {
      return e >= n.SIXTY_FOUR_KILOBYTES ? new Uint32Array(t, r, o) : new Uint16Array(t, r, o);
    }, r(i);
  }), define("Core/CylinderGeometry", ["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./CylinderGeometryLibrary", "./defaultValue", "./defined", "./DeveloperError", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PrimitiveType", "./VertexFormat"], function (e, t, r, n, o, i, a, s, u, c, l, f, h, E, d, m, p) {
    "use strict";

    function _(e) {
      e = a(e, a.EMPTY_OBJECT);
      var t = e.length,
          r = e.topRadius,
          n = e.bottomRadius,
          o = a(e.vertexFormat, p.DEFAULT),
          i = a(e.slices, 128);
      this._length = t, this._topRadius = r, this._bottomRadius = n, this._vertexFormat = p.clone(o), this._slices = i, this._offsetAttribute = e.offsetAttribute, this._workerName = "createCylinderGeometry";
    }

    var y = new r(),
        A = new n(),
        T = new n(),
        R = new n(),
        S = new n();
    _.packedLength = p.packedLength + 5, _.pack = function (e, t, r) {
      return r = a(r, 0), p.pack(e._vertexFormat, t, r), r += p.packedLength, t[r++] = e._length, t[r++] = e._topRadius, t[r++] = e._bottomRadius, t[r++] = e._slices, t[r] = a(e._offsetAttribute, -1), t;
    };
    var C = new p(),
        g = {
      vertexFormat: C,
      length: void 0,
      topRadius: void 0,
      bottomRadius: void 0,
      slices: void 0,
      offsetAttribute: void 0
    };
    _.unpack = function (e, t, r) {
      t = a(t, 0);
      var n = p.unpack(e, t, C);
      t += p.packedLength;
      var o = e[t++],
          i = e[t++],
          u = e[t++],
          c = e[t++],
          l = e[t];
      return s(r) ? (r._vertexFormat = p.clone(n, r._vertexFormat), r._length = o, r._topRadius = i, r._bottomRadius = u, r._slices = c, r._offsetAttribute = -1 === l ? void 0 : l, r) : (g.length = o, g.topRadius = i, g.bottomRadius = u, g.slices = c, g.offsetAttribute = -1 === l ? void 0 : l, new _(g));
    }, _.createGeometry = function (a) {
      var u = a._length,
          p = a._topRadius,
          _ = a._bottomRadius,
          C = a._vertexFormat,
          g = a._slices;

      if (!(u <= 0 || p < 0 || _ < 0 || 0 === p && 0 === _)) {
        var I,
            O = g + g,
            v = g + O,
            N = O + O,
            w = i.computePositions(u, p, _, g, !0),
            M = C.st ? new Float32Array(2 * N) : void 0,
            F = C.normal ? new Float32Array(3 * N) : void 0,
            x = C.tangent ? new Float32Array(3 * N) : void 0,
            D = C.bitangent ? new Float32Array(3 * N) : void 0,
            U = C.normal || C.tangent || C.bitangent;

        if (U) {
          var P = C.tangent || C.bitangent,
              L = 0,
              b = 0,
              B = 0,
              z = Math.atan2(_ - p, u),
              G = A;
          G.z = Math.sin(z);
          var q = Math.cos(z),
              V = R,
              W = T;

          for (I = 0; I < g; I++) {
            var k = I / g * d.TWO_PI,
                H = q * Math.cos(k),
                Y = q * Math.sin(k);
            U && (G.x = H, G.y = Y, P && (V = n.normalize(n.cross(n.UNIT_Z, G, V), V)), C.normal && (F[L++] = G.x, F[L++] = G.y, F[L++] = G.z, F[L++] = G.x, F[L++] = G.y, F[L++] = G.z), C.tangent && (x[b++] = V.x, x[b++] = V.y, x[b++] = V.z, x[b++] = V.x, x[b++] = V.y, x[b++] = V.z), C.bitangent && (W = n.normalize(n.cross(G, V, W), W), D[B++] = W.x, D[B++] = W.y, D[B++] = W.z, D[B++] = W.x, D[B++] = W.y, D[B++] = W.z));
          }

          for (I = 0; I < g; I++) {
            C.normal && (F[L++] = 0, F[L++] = 0, F[L++] = -1), C.tangent && (x[b++] = 1, x[b++] = 0, x[b++] = 0), C.bitangent && (D[B++] = 0, D[B++] = -1, D[B++] = 0);
          }

          for (I = 0; I < g; I++) {
            C.normal && (F[L++] = 0, F[L++] = 0, F[L++] = 1), C.tangent && (x[b++] = 1, x[b++] = 0, x[b++] = 0), C.bitangent && (D[B++] = 0, D[B++] = 1, D[B++] = 0);
          }
        }

        var X = 12 * g - 12,
            j = E.createTypedArray(N, X),
            K = 0,
            Z = 0;

        for (I = 0; I < g - 1; I++) {
          j[K++] = Z, j[K++] = Z + 2, j[K++] = Z + 3, j[K++] = Z, j[K++] = Z + 3, j[K++] = Z + 1, Z += 2;
        }

        for (j[K++] = O - 2, j[K++] = 0, j[K++] = 1, j[K++] = O - 2, j[K++] = 1, j[K++] = O - 1, I = 1; I < g - 1; I++) {
          j[K++] = O + I + 1, j[K++] = O + I, j[K++] = O;
        }

        for (I = 1; I < g - 1; I++) {
          j[K++] = v, j[K++] = v + I, j[K++] = v + I + 1;
        }

        var J = 0;

        if (C.st) {
          var Q = Math.max(p, _);

          for (I = 0; I < N; I++) {
            var $ = n.fromArray(w, 3 * I, S);
            M[J++] = ($.x + Q) / (2 * Q), M[J++] = ($.y + Q) / (2 * Q);
          }
        }

        var ee = new f();
        C.position && (ee.position = new l({
          componentDatatype: o.DOUBLE,
          componentsPerAttribute: 3,
          values: w
        })), C.normal && (ee.normal = new l({
          componentDatatype: o.FLOAT,
          componentsPerAttribute: 3,
          values: F
        })), C.tangent && (ee.tangent = new l({
          componentDatatype: o.FLOAT,
          componentsPerAttribute: 3,
          values: x
        })), C.bitangent && (ee.bitangent = new l({
          componentDatatype: o.FLOAT,
          componentsPerAttribute: 3,
          values: D
        })), C.st && (ee.st = new l({
          componentDatatype: o.FLOAT,
          componentsPerAttribute: 2,
          values: M
        })), y.x = .5 * u, y.y = Math.max(_, p);
        var te = new t(n.ZERO, r.magnitude(y));

        if (s(a._offsetAttribute)) {
          u = w.length;
          var re = new Uint8Array(u / 3),
              ne = a._offsetAttribute === h.NONE ? 0 : 1;
          e(re, ne), ee.applyOffset = new l({
            componentDatatype: o.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: re
          });
        }

        return new c({
          attributes: ee,
          indices: j,
          primitiveType: m.TRIANGLES,
          boundingSphere: te,
          offsetAttribute: a._offsetAttribute
        });
      }
    };
    var I;
    return _.getUnitCylinder = function () {
      return s(I) || (I = _.createGeometry(new _({
        topRadius: 1,
        bottomRadius: 1,
        length: 1,
        vertexFormat: p.POSITION_ONLY
      }))), I;
    }, _;
  }), define("Core/EllipsoidGeometry", ["./arrayFill", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryOffsetAttribute", "./IndexDatatype", "./Math", "./PrimitiveType", "./VertexFormat"], function (e, t, r, n, o, i, a, s, u, c, l, f, h, E, d, m, p) {
    "use strict";

    function _(e) {
      e = i(e, i.EMPTY_OBJECT);
      var t = i(e.radii, C),
          r = Math.round(i(e.stackPartitions, 64)),
          o = Math.round(i(e.slicePartitions, 64)),
          a = i(e.vertexFormat, p.DEFAULT);
      this._radii = n.clone(t), this._stackPartitions = r, this._slicePartitions = o, this._vertexFormat = p.clone(a), this._offsetAttribute = e.offsetAttribute, this._workerName = "createEllipsoidGeometry";
    }

    var y = new n(),
        A = new n(),
        T = new n(),
        R = new n(),
        S = new n(),
        C = new n(1, 1, 1),
        g = Math.cos,
        I = Math.sin;
    _.packedLength = n.packedLength + p.packedLength + 3, _.pack = function (e, t, r) {
      return r = i(r, 0), n.pack(e._radii, t, r), r += n.packedLength, p.pack(e._vertexFormat, t, r), r += p.packedLength, t[r++] = e._stackPartitions, t[r++] = e._slicePartitions, t[r] = i(e._offsetAttribute, -1), t;
    };
    var O = new n(),
        v = new p(),
        N = {
      radii: O,
      vertexFormat: v,
      stackPartitions: void 0,
      slicePartitions: void 0,
      offsetAttribute: void 0
    };
    _.unpack = function (e, t, r) {
      t = i(t, 0);
      var o = n.unpack(e, t, O);
      t += n.packedLength;
      var s = p.unpack(e, t, v);
      t += p.packedLength;
      var u = e[t++],
          c = e[t++],
          l = e[t];
      return a(r) ? (r._radii = n.clone(o, r._radii), r._vertexFormat = p.clone(s, r._vertexFormat), r._stackPartitions = u, r._slicePartitions = c, r._offsetAttribute = -1 === l ? void 0 : l, r) : (N.stackPartitions = u, N.slicePartitions = c, N.offsetAttribute = -1 === l ? void 0 : l, new _(N));
    }, _.createGeometry = function (i) {
      var s = i._radii;

      if (!(s.x <= 0 || s.y <= 0 || s.z <= 0)) {
        var p,
            _,
            C = u.fromCartesian3(s),
            O = i._vertexFormat,
            v = i._slicePartitions + 1,
            N = i._stackPartitions + 1,
            w = N * v,
            M = new Float64Array(3 * w),
            F = 6 * (v - 1) * (N - 2),
            x = E.createTypedArray(w, F),
            D = O.normal ? new Float32Array(3 * w) : void 0,
            U = O.tangent ? new Float32Array(3 * w) : void 0,
            P = O.bitangent ? new Float32Array(3 * w) : void 0,
            L = O.st ? new Float32Array(2 * w) : void 0,
            b = new Array(v),
            B = new Array(v),
            z = 0;

        for (p = 0; p < v; p++) {
          var G = d.TWO_PI * p / (v - 1);
          b[p] = g(G), B[p] = I(G), M[z++] = 0, M[z++] = 0, M[z++] = s.z;
        }

        for (p = 1; p < N - 1; p++) {
          var q = Math.PI * p / (N - 1),
              V = I(q),
              W = s.x * V,
              k = s.y * V,
              H = s.z * g(q);

          for (_ = 0; _ < v; _++) {
            M[z++] = b[_] * W, M[z++] = B[_] * k, M[z++] = H;
          }
        }

        for (p = 0; p < v; p++) {
          M[z++] = 0, M[z++] = 0, M[z++] = -s.z;
        }

        var Y = new f();
        O.position && (Y.position = new l({
          componentDatatype: o.DOUBLE,
          componentsPerAttribute: 3,
          values: M
        }));
        var X = 0,
            j = 0,
            K = 0,
            Z = 0;

        if (O.st || O.normal || O.tangent || O.bitangent) {
          for (p = 0; p < w; p++) {
            var J = n.fromArray(M, 3 * p, y),
                Q = C.geodeticSurfaceNormal(J, A);

            if (O.st) {
              var $ = r.negate(Q, S);
              r.magnitude($) < d.EPSILON6 && (z = 3 * (p + v * Math.floor(.5 * N)), z > M.length && (z = 3 * (p - v * Math.floor(.5 * N))), n.fromArray(M, z, $), C.geodeticSurfaceNormal($, $), r.negate($, $)), L[X++] = Math.atan2($.y, $.x) / d.TWO_PI + .5, L[X++] = Math.asin(Q.z) / Math.PI + .5;
            }

            if (O.normal && (D[j++] = Q.x, D[j++] = Q.y, D[j++] = Q.z), O.tangent || O.bitangent) {
              var ee = T;

              if (p < v || p > w - v - 1 ? (n.cross(n.UNIT_X, Q, ee), n.normalize(ee, ee)) : (n.cross(n.UNIT_Z, Q, ee), n.normalize(ee, ee)), O.tangent && (U[K++] = ee.x, U[K++] = ee.y, U[K++] = ee.z), O.bitangent) {
                var te = n.cross(Q, ee, R);
                n.normalize(te, te), P[Z++] = te.x, P[Z++] = te.y, P[Z++] = te.z;
              }
            }
          }

          O.st && (Y.st = new l({
            componentDatatype: o.FLOAT,
            componentsPerAttribute: 2,
            values: L
          })), O.normal && (Y.normal = new l({
            componentDatatype: o.FLOAT,
            componentsPerAttribute: 3,
            values: D
          })), O.tangent && (Y.tangent = new l({
            componentDatatype: o.FLOAT,
            componentsPerAttribute: 3,
            values: U
          })), O.bitangent && (Y.bitangent = new l({
            componentDatatype: o.FLOAT,
            componentsPerAttribute: 3,
            values: P
          }));
        }

        if (a(i._offsetAttribute)) {
          var re = M.length,
              ne = new Uint8Array(re / 3),
              oe = i._offsetAttribute === h.NONE ? 0 : 1;
          e(ne, oe), Y.applyOffset = new l({
            componentDatatype: o.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: ne
          });
        }

        for (z = 0, _ = 0; _ < v - 1; _++) {
          x[z++] = v + _, x[z++] = v + _ + 1, x[z++] = _ + 1;
        }

        var ie, ae;

        for (p = 1; p < N - 2; p++) {
          for (ie = p * v, ae = (p + 1) * v, _ = 0; _ < v - 1; _++) {
            x[z++] = ae + _, x[z++] = ae + _ + 1, x[z++] = ie + _ + 1, x[z++] = ae + _, x[z++] = ie + _ + 1, x[z++] = ie + _;
          }
        }

        for (p = N - 2, ie = p * v, ae = (p + 1) * v, _ = 0; _ < v - 1; _++) {
          x[z++] = ae + _, x[z++] = ie + _ + 1, x[z++] = ie + _;
        }

        return new c({
          attributes: Y,
          indices: x,
          primitiveType: m.TRIANGLES,
          boundingSphere: t.fromEllipsoid(C),
          offsetAttribute: i._offsetAttribute
        });
      }
    };
    var w;
    return _.getUnitEllipsoid = function () {
      return a(w) || (w = _.createGeometry(new _({
        radii: new n(1, 1, 1),
        vertexFormat: p.POSITION_ONLY
      }))), w;
    }, _;
  }), define("Scene/Vector3DTileBatch", [], function () {
    "use strict";

    function e(e) {
      this.offset = e.offset, this.count = e.count, this.color = e.color, this.batchIds = e.batchIds;
    }

    return e;
  }), define("Core/formatError", ["./defined"], function (e) {
    "use strict";

    function t(t) {
      var r,
          n = t.name,
          o = t.message;
      r = e(n) && e(o) ? n + ": " + o : t.toString();
      var i = t.stack;
      return e(i) && (r += "\n" + i), r;
    }

    return t;
  }), define("Workers/createTaskProcessorWorker", ["../ThirdParty/when", "../Core/defaultValue", "../Core/defined", "../Core/formatError"], function (e, t, r, n) {
    "use strict";

    function o(t, r, n) {
      try {
        return t(r, n);
      } catch (t) {
        return e.reject(t);
      }
    }

    function i(i) {
      var a;
      return function (s) {
        var u = s.data,
            c = [],
            l = {
          id: u.id,
          result: void 0,
          error: void 0
        };
        return e(o(i, u.parameters, c)).then(function (e) {
          l.result = e;
        }).otherwise(function (e) {
          e instanceof Error ? l.error = {
            name: e.name,
            message: e.message,
            stack: e.stack
          } : l.error = e;
        }).always(function () {
          r(a) || (a = t(self.webkitPostMessage, self.postMessage)), u.canTransferArrayBuffer || (c.length = 0);

          try {
            a(l, c);
          } catch (e) {
            l.result = void 0, l.error = "postMessage failed with error: " + n(e) + "\n  with responseMessage: " + JSON.stringify(l), a(l);
          }
        });
      };
    }

    return i;
  }), define("Workers/createVectorTileGeometries", ["../Core/BoundingSphere", "../Core/BoxGeometry", "../Core/Cartesian3", "../Core/Color", "../Core/CylinderGeometry", "../Core/defined", "../Core/EllipsoidGeometry", "../Core/IndexDatatype", "../Core/Matrix4", "../Scene/Vector3DTileBatch", "./createTaskProcessorWorker"], function (e, t, r, n, o, i, a, s, u, c, l) {
    "use strict";

    function f(e, t) {
      var n = t * R,
          o = r.unpack(e, n, T);
      n += r.packedLength;
      var i = u.unpack(e, n, I.modelMatrix);
      u.multiplyByScale(i, o, i);
      var a = I.boundingVolume;
      return r.clone(r.ZERO, a.center), a.radius = Math.sqrt(3), I;
    }

    function h(e, t) {
      var n = t * S,
          o = e[n++],
          i = e[n++],
          a = r.fromElements(o, o, i, T),
          s = u.unpack(e, n, I.modelMatrix);
      u.multiplyByScale(s, a, s);
      var c = I.boundingVolume;
      return r.clone(r.ZERO, c.center), c.radius = Math.sqrt(2), I;
    }

    function E(e, t) {
      var n = t * C,
          o = r.unpack(e, n, T);
      n += r.packedLength;
      var i = u.unpack(e, n, I.modelMatrix);
      u.multiplyByScale(i, o, i);
      var a = I.boundingVolume;
      return r.clone(r.ZERO, a.center), a.radius = 1, I;
    }

    function d(e, t) {
      var n = t * g,
          o = e[n++],
          i = r.unpack(e, n, T),
          a = u.fromTranslation(i, I.modelMatrix);
      u.multiplyByUniformScale(a, o, a);
      var s = I.boundingVolume;
      return r.clone(r.ZERO, s.center), s.radius = 1, I;
    }

    function m(t, o, a, s, l) {
      if (i(o)) {
        for (var f = a.length, h = s.attributes.position.values, E = s.indices, d = t.positions, m = t.vertexBatchIds, p = t.indices, _ = t.batchIds, y = t.batchTableColors, A = t.batchedIndices, T = t.indexOffsets, R = t.indexCounts, S = t.boundingVolumes, C = t.modelMatrix, g = t.center, I = t.positionOffset, v = t.batchIdIndex, N = t.indexOffset, w = t.batchedIndicesOffset, M = 0; M < f; ++M) {
          var F = l(o, M),
              x = F.modelMatrix;
          u.multiply(C, x, x);

          for (var D = a[M], U = h.length, P = 0; P < U; P += 3) {
            var L = r.unpack(h, P, O);
            u.multiplyByPoint(x, L, L), r.subtract(L, g, L), r.pack(L, d, 3 * I + P), m[v++] = D;
          }

          for (var b = E.length, B = 0; B < b; ++B) {
            p[N + B] = E[B] + I;
          }

          var z = M + w;
          A[z] = new c({
            offset: N,
            count: b,
            color: n.fromRgba(y[D]),
            batchIds: [D]
          }), _[z] = D, T[z] = N, R[z] = b, S[z] = e.transform(F.boundingVolume, x), I += U / 3, N += b;
        }

        t.positionOffset = I, t.batchIdIndex = v, t.indexOffset = N, t.batchedIndicesOffset += f;
      }
    }

    function p(e) {
      var t = new Float64Array(e),
          n = 0;
      r.unpack(t, n, v), n += r.packedLength, u.unpack(t, n, N);
    }

    function _(e) {
      for (var t = e.length, r = 0, o = 0; o < t; ++o) {
        r += n.packedLength + 3 + e[o].batchIds.length;
      }

      return r;
    }

    function y(t, r, o) {
      var i = o.length,
          a = 2 + i * e.packedLength + 1 + _(r),
          s = new Float64Array(a),
          u = 0;

      s[u++] = t, s[u++] = i;

      for (var c = 0; c < i; ++c) {
        e.pack(o[c], s, u), u += e.packedLength;
      }

      var l = r.length;
      s[u++] = l;

      for (var f = 0; f < l; ++f) {
        var h = r[f];
        n.pack(h.color, s, u), u += n.packedLength, s[u++] = h.offset, s[u++] = h.count;
        var E = h.batchIds,
            d = E.length;
        s[u++] = d;

        for (var m = 0; m < d; ++m) {
          s[u++] = E[m];
        }
      }

      return s;
    }

    function A(e, r) {
      var n = i(e.boxes) ? new Float32Array(e.boxes) : void 0,
          u = i(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
          c = i(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
          l = i(e.cylinderBatchIds) ? new Uint16Array(e.cylinderBatchIds) : void 0,
          _ = i(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
          A = i(e.ellipsoidBatchIds) ? new Uint16Array(e.ellipsoidBatchIds) : void 0,
          T = i(e.spheres) ? new Float32Array(e.spheres) : void 0,
          R = i(e.sphereBatchIds) ? new Uint16Array(e.sphereBatchIds) : void 0,
          S = i(n) ? u.length : 0,
          C = i(c) ? l.length : 0,
          g = i(_) ? A.length : 0,
          I = i(T) ? R.length : 0,
          O = t.getUnitBox(),
          w = o.getUnitCylinder(),
          M = a.getUnitEllipsoid(),
          F = O.attributes.position.values,
          x = w.attributes.position.values,
          D = M.attributes.position.values,
          U = F.length * S;

      U += x.length * C, U += D.length * (g + I);
      var P = O.indices,
          L = w.indices,
          b = M.indices,
          B = P.length * S;
      B += L.length * C, B += b.length * (g + I);
      var z = new Float32Array(U),
          G = new Uint16Array(U / 3),
          q = s.createTypedArray(U / 3, B),
          V = S + C + g + I,
          W = new Uint16Array(V),
          k = new Array(V),
          H = new Uint32Array(V),
          Y = new Uint32Array(V),
          X = new Array(V);
      p(e.packedBuffer);
      var j = {
        batchTableColors: new Uint32Array(e.batchTableColors),
        positions: z,
        vertexBatchIds: G,
        indices: q,
        batchIds: W,
        batchedIndices: k,
        indexOffsets: H,
        indexCounts: Y,
        boundingVolumes: X,
        positionOffset: 0,
        batchIdIndex: 0,
        indexOffset: 0,
        batchedIndicesOffset: 0,
        modelMatrix: N,
        center: v
      };
      m(j, n, u, O, f), m(j, c, l, w, h), m(j, _, A, M, E), m(j, T, R, M, d);
      var K = y(q.BYTES_PER_ELEMENT, k, X);
      return r.push(z.buffer, G.buffer, q.buffer), r.push(W.buffer, H.buffer, Y.buffer), r.push(K.buffer), {
        positions: z.buffer,
        vertexBatchIds: G.buffer,
        indices: q.buffer,
        indexOffsets: H.buffer,
        indexCounts: Y.buffer,
        batchIds: W.buffer,
        packedBuffer: K.buffer
      };
    }

    var T = new r(),
        R = u.packedLength + r.packedLength,
        S = u.packedLength + 2,
        C = u.packedLength + r.packedLength,
        g = r.packedLength + 1,
        I = {
      modelMatrix: new u(),
      boundingVolume: new e()
    },
        O = new r(),
        v = new r(),
        N = new u();
    return l(A);
  });
}();