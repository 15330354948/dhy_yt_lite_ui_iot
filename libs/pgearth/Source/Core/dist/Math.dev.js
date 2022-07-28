"use strict";

define(["../ThirdParty/mersenne-twister", "./Check", "./defaultValue", "./defined", "./DeveloperError"], function (r, o, a, u, h) {
  "use strict";

  var f = {
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
  f.sign = a(Math.sign, function (e) {
    return 0 === (e = +e) || e != e ? e : 0 < e ? 1 : -1;
  }), f.signNotZero = function (e) {
    return e < 0 ? -1 : 1;
  }, f.toSNorm = function (e, r) {
    return r = a(r, 255), Math.round((.5 * f.clamp(e, -1, 1) + .5) * r);
  }, f.fromSNorm = function (e, r) {
    return r = a(r, 255), f.clamp(e, 0, r) / r * 2 - 1;
  }, f.normalize = function (e, r, n) {
    return 0 === (n = Math.max(n - r, 0)) ? 0 : f.clamp((e - r) / n, 0, 1);
  }, f.sinh = a(Math.sinh, function (e) {
    return (Math.exp(e) - Math.exp(-e)) / 2;
  }), f.cosh = a(Math.cosh, function (e) {
    return (Math.exp(e) + Math.exp(-e)) / 2;
  }), f.lerp = function (e, r, n) {
    return (1 - n) * e + n * r;
  }, f.PI = Math.PI, f.ONE_OVER_PI = 1 / Math.PI, f.PI_OVER_TWO = Math.PI / 2, f.PI_OVER_THREE = Math.PI / 3, f.PI_OVER_FOUR = Math.PI / 4, f.PI_OVER_SIX = Math.PI / 6, f.THREE_PI_OVER_TWO = 3 * Math.PI / 2, f.TWO_PI = 2 * Math.PI, f.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), f.RADIANS_PER_DEGREE = Math.PI / 180, f.DEGREES_PER_RADIAN = 180 / Math.PI, f.RADIANS_PER_ARCSECOND = f.RADIANS_PER_DEGREE / 3600, f.toRadians = function (e) {
    if (!u(e)) throw new h("degrees is required.");
    return e * f.RADIANS_PER_DEGREE;
  }, f.toDegrees = function (e) {
    if (!u(e)) throw new h("radians is required.");
    return e * f.DEGREES_PER_RADIAN;
  }, f.convertLongitudeRange = function (e) {
    if (!u(e)) throw new h("angle is required.");
    var r = f.TWO_PI,
        n = e - Math.floor(e / r) * r;
    return n < -Math.PI ? n + r : n >= Math.PI ? n - r : n;
  }, f.clampToLatitudeRange = function (e) {
    if (!u(e)) throw new h("angle is required.");
    return f.clamp(e, -1 * f.PI_OVER_TWO, f.PI_OVER_TWO);
  }, f.negativePiToPi = function (e) {
    if (!u(e)) throw new h("angle is required.");
    return f.zeroToTwoPi(e + f.PI) - f.PI;
  }, f.zeroToTwoPi = function (e) {
    if (!u(e)) throw new h("angle is required.");
    var r = f.mod(e, f.TWO_PI);
    return Math.abs(r) < f.EPSILON14 && Math.abs(e) > f.EPSILON14 ? f.TWO_PI : r;
  }, f.mod = function (e, r) {
    if (!u(e)) throw new h("m is required.");
    if (!u(r)) throw new h("n is required.");
    return (e % r + r) % r;
  }, f.equalsEpsilon = function (e, r, n, t) {
    if (!u(e)) throw new h("left is required.");
    if (!u(r)) throw new h("right is required.");
    if (!u(n)) throw new h("relativeEpsilon is required.");
    t = a(t, n);
    var i = Math.abs(e - r);
    return i <= t || i <= n * Math.max(Math.abs(e), Math.abs(r));
  }, f.lessThan = function (e, r, n) {
    if (!u(e)) throw new h("first is required.");
    if (!u(r)) throw new h("second is required.");
    if (!u(n)) throw new h("relativeEpsilon is required.");
    return e - r < -n;
  }, f.lessThanOrEquals = function (e, r, n) {
    if (!u(e)) throw new h("first is required.");
    if (!u(r)) throw new h("second is required.");
    if (!u(n)) throw new h("relativeEpsilon is required.");
    return e - r < n;
  }, f.greaterThan = function (e, r, n) {
    if (!u(e)) throw new h("first is required.");
    if (!u(r)) throw new h("second is required.");
    if (!u(n)) throw new h("relativeEpsilon is required.");
    return n < e - r;
  }, f.greaterThanOrEquals = function (e, r, n) {
    if (!u(e)) throw new h("first is required.");
    if (!u(r)) throw new h("second is required.");
    if (!u(n)) throw new h("relativeEpsilon is required.");
    return -n < e - r;
  };
  var i = [1];
  f.factorial = function (e) {
    if ("number" != typeof e || e < 0) throw new h("A number greater than or equal to 0 is required.");
    var r = i.length;
    if (r <= e) for (var n = i[r - 1], t = r; t <= e; t++) {
      i.push(n * t);
    }
    return i[e];
  }, f.incrementWrap = function (e, r, n) {
    if (n = a(n, 0), !u(e)) throw new h("n is required.");
    if (r <= n) throw new h("maximumValue must be greater than minimumValue.");
    return r < ++e && (e = n), e;
  }, f.isPowerOfTwo = function (e) {
    if ("number" != typeof e || e < 0) throw new h("A number greater than or equal to 0 is required.");
    return 0 !== e && 0 == (e & e - 1);
  }, f.nextPowerOfTwo = function (e) {
    if ("number" != typeof e || e < 0) throw new h("A number greater than or equal to 0 is required.");
    return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e;
  }, f.clamp = function (e, r, n) {
    if (!u(e)) throw new h("value is required");
    if (!u(r)) throw new h("min is required.");
    if (!u(n)) throw new h("max is required.");
    return e < r ? r : n < e ? n : e;
  };
  var n = new r();
  return f.setRandomNumberSeed = function (e) {
    if (!u(e)) throw new h("seed is required.");
    n = new r(e);
  }, f.nextRandomNumber = function () {
    return n.random();
  }, f.randomBetween = function (e, r) {
    return f.nextRandomNumber() * (r - e) + e;
  }, f.acosClamped = function (e) {
    if (!u(e)) throw new h("value is required.");
    return Math.acos(f.clamp(e, -1, 1));
  }, f.asinClamped = function (e) {
    if (!u(e)) throw new h("value is required.");
    return Math.asin(f.clamp(e, -1, 1));
  }, f.chordLength = function (e, r) {
    if (!u(e)) throw new h("angle is required.");
    if (!u(r)) throw new h("radius is required.");
    return 2 * r * Math.sin(.5 * e);
  }, f.logBase = function (e, r) {
    if (!u(e)) throw new h("number is required.");
    if (!u(r)) throw new h("base is required.");
    return Math.log(e) / Math.log(r);
  }, f.cbrt = a(Math.cbrt, function (e) {
    var r = Math.pow(Math.abs(e), 1 / 3);
    return e < 0 ? -r : r;
  }), f.log2 = a(Math.log2, function (e) {
    return Math.log(e) * Math.LOG2E;
  }), f.fog = function (e, r) {
    var n = e * r;
    return 1 - Math.exp(-n * n);
  }, f.fastApproximateAtan = function (e) {
    return o.typeOf.number("x", e), e * (-.1784 * Math.abs(e) - .0663 * e * e + 1.0301);
  }, f.fastApproximateAtan2 = function (e, r) {
    o.typeOf.number("x", e), o.typeOf.number("y", r);
    var n = Math.abs(e),
        t = Math.abs(r),
        i = Math.max(n, t),
        a = (t = Math.min(n, t)) / i;
    if (isNaN(a)) throw new h("either x or y must be nonzero");
    return n = f.fastApproximateAtan(a), n = Math.abs(r) > Math.abs(e) ? f.PI_OVER_TWO - n : n, n = e < 0 ? f.PI - n : n, n = r < 0 ? -n : n;
  }, f;
});