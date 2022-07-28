"use strict";

define(["./Cartesian3", "./defined", "./DeveloperError", "./JulianDate", "./Math", "./Matrix3", "./TimeConstants", "./TimeStandard"], function (d, v, P, s, I, _, p, t) {
  "use strict";

  var a = {};
  var h = 32.184,
      o = 2451545;

  function R(t, a) {
    a = s.addSeconds(t, h, a);
    var n,
        e = s.totalDays(a) - o;
    return a = s.addSeconds(a, (n = 6.239996 + .0172019696544 * e, .001657 * Math.sin(n + .01671 * Math.sin(n))), a);
  }

  var g = new s(2451545, 0, t.TAI),
      C = 1e3,
      W = I.RADIANS_PER_DEGREE,
      Y = I.RADIANS_PER_ARCSECOND,
      E = new _();

  function U(t, a, n, e, s, h, o) {
    if (n < 0 && (n = -n, s += I.PI), n < 0 || n > I.PI) throw new P("The inclination is out of range. Inclination must be greater than or equal to zero and less than or equal to Pi radians.");

    var i = t * (1 - a),
        M = e - s,
        r = s,
        c = function (t, a) {
      if (a < 0 || 1 <= a) throw new P("eccentricity out of range.");
      return function (t, a) {
        if (a < 0 || 1 <= a) throw new P("eccentricity out of range.");
        var n = Math.floor(t / I.TWO_PI);
        t -= n * I.TWO_PI;
        var e = Math.cos(t) - a,
            s = Math.sin(t) * Math.sqrt(1 - a * a),
            h = Math.atan2(s, e);
        h = I.zeroToTwoPi(h), t < 0 && (h -= I.TWO_PI);
        return h += n * I.TWO_PI;
      }(function (t, a) {
        if (a < 0 || 1 <= a) throw new P("eccentricity out of range.");
        var n,
            e = Math.floor(t / I.TWO_PI),
            s = (t -= e * I.TWO_PI) + a * Math.sin(t) / (1 - Math.sin(t + a) + Math.sin(t)),
            h = Number.MAX_VALUE;

        for (n = 0; n < b && Math.abs(h - s) > m; ++n) {
          var o = (h = s) - a * Math.sin(h) - t,
              i = 1 - a * Math.cos(h);
          s = h - o / i;
        }

        if (b <= n) throw new P("Kepler equation did not converge");
        return h = s + e * I.TWO_PI;
      }(t, a), a);
    }(h - e, a);

    if ("Hyperbolic" === function (t, a) {
      if (t < 0) throw new P("eccentricity cannot be negative.");
      {
        if (t <= a) return "Circular";
        if (t < 1 - a) return "Elliptical";
        if (t <= 1 + a) return "Parabolic";
      }
      return "Hyperbolic";
    }(a, 0) && Math.abs(I.negativePiToPi(c)) >= Math.acos(-1 / a)) throw new P("The true anomaly of the hyperbolic orbit lies outside of the bounds of the hyperbola.");
    !function (t, a, n, e) {
      if (a < 0 || a > I.PI) throw new P("inclination out of range");
      var s = Math.cos(t),
          h = Math.sin(t),
          o = Math.cos(a),
          i = Math.sin(a),
          M = Math.cos(n),
          r = Math.sin(n);
      v(e) ? (e[0] = M * s - r * h * o, e[1] = r * s + M * h * o, e[2] = h * i, e[3] = -M * h - r * s * o, e[4] = -r * h + M * s * o, e[5] = s * i, e[6] = r * i, e[7] = -M * i, e[8] = o) : e = new _(M * s - r * h * o, -M * h - r * s * o, r * i, r * s + M * h * o, -r * h + M * s * o, -M * i, h * i, s * i, o);
    }(M, n, r, E);
    var u = i * (1 + a),
        f = Math.cos(c),
        l = Math.sin(c),
        w = 1 + a * f;
    if (w <= I.Epsilon10) throw new P("elements cannot be converted to cartesian");
    var y = u / w;
    return v(o) ? (o.x = y * f, o.y = y * l, o.z = 0) : o = new d(y * f, y * l, 0), _.multiplyByVector(E, o, o);
  }

  var b = 50,
      m = I.EPSILON8;
  var i = 100.46645683 * W,
      M = 1295977422.83429 * Y,
      q = new s(0, 0, t.TAI);

  function e(t, a) {
    R(t, q);

    var n = (q.dayNumber - g.dayNumber + (q.secondsOfDay - g.secondsOfDay) / p.SECONDS_PER_DAY) / p.DAYS_PER_JULIAN_CENTURY,
        e = n * n,
        s = e * n,
        h = s * n,
        o = 383397.7725 + .004 * n,
        i = .055545526 - 16e-9 * n,
        M = 5.15668983 * W,
        r = -8e-5 * n + .02966 * e - 42e-6 * s - 13e-8 * h,
        c = 83.35324312 * W,
        u = 14643420.2669 * n - 38.2702 * e - .045047 * s + 21301e-8 * h,
        f = 125.04455501 * W,
        l = -6967919.3631 * n + 6.3602 * e + .007625 * s - 3586e-8 * h,
        w = 218.31664563 * W,
        y = 1732559343.4847 * n - 6.391 * e + .006588 * s - 3169e-8 * h,
        d = 297.85019547 * W + Y * (1602961601.209 * n - 6.3706 * e + .006593 * s - 3169e-8 * h),
        v = 134.96340251 * W + Y * (1717915923.2178 * n + 31.8792 * e + .051635 * s - 2447e-7 * h),
        P = 357.52910918 * W + Y * (129596581.0481 * n - .5532 * e + 136e-6 * s - 1149e-8 * h),
        I = 310.17137918 * W - Y * (6967051.436 * n + 6.2068 * e + .007618 * s - 3219e-8 * h),
        _ = 2 * d,
        E = 4 * d,
        b = 6 * d,
        m = 2 * v,
        T = 3 * v,
        D = 4 * v,
        A = 2 * (93.27209062 * W + Y * (1739527262.8478 * n - 12.7512 * e - .001037 * s + 417e-8 * h));

    o += 3400.4 * Math.cos(_) - 635.6 * Math.cos(_ - v) - 235.6 * Math.cos(v) + 218.1 * Math.cos(_ - P) + 181 * Math.cos(_ + v), i += .014216 * Math.cos(_ - v) + .008551 * Math.cos(_ - m) - .001383 * Math.cos(v) + .001356 * Math.cos(_ + v) - .001147 * Math.cos(E - T) - 914e-6 * Math.cos(E - m) + 869e-6 * Math.cos(_ - P - v) - 627e-6 * Math.cos(_) - 394e-6 * Math.cos(E - D) + 282e-6 * Math.cos(_ - P - m) - 279e-6 * Math.cos(d - v) - 236e-6 * Math.cos(m) + 231e-6 * Math.cos(E) + 229e-6 * Math.cos(b - D) - 201e-6 * Math.cos(m - A), r += 486.26 * Math.cos(_ - A) - 40.13 * Math.cos(_) + 37.51 * Math.cos(A) + 25.73 * Math.cos(m - A) + 19.97 * Math.cos(_ - P - A), u += -55609 * Math.sin(_ - v) - 34711 * Math.sin(_ - m) - 9792 * Math.sin(v) + 9385 * Math.sin(E - T) + 7505 * Math.sin(E - m) + 5318 * Math.sin(_ + v) + 3484 * Math.sin(E - D) - 3417 * Math.sin(_ - P - v) - 2530 * Math.sin(b - D) - 2376 * Math.sin(_) - 2075 * Math.sin(_ - T) - 1883 * Math.sin(m) - 1736 * Math.sin(b - 5 * v) + 1626 * Math.sin(P) - 1370 * Math.sin(b - T), l += -5392 * Math.sin(_ - A) - 540 * Math.sin(P) - 441 * Math.sin(_) + 423 * Math.sin(A) - 288 * Math.sin(m - A), y += -3332.9 * Math.sin(_) + 1197.4 * Math.sin(_ - v) - 662.5 * Math.sin(P) + 396.3 * Math.sin(v) - 218 * Math.sin(_ - P);
    var N = 2 * I,
        O = 3 * I;
    r += 46.997 * Math.cos(I) * n - .614 * Math.cos(_ - A + I) * n + .614 * Math.cos(_ - A - I) * n - .0297 * Math.cos(N) * e - .0335 * Math.cos(I) * e + .0012 * Math.cos(_ - A + N) * e - 16e-5 * Math.cos(I) * s + 4e-5 * Math.cos(O) * s + 4e-5 * Math.cos(N) * s;
    var S = 2.116 * Math.sin(I) * n - .111 * Math.sin(_ - A - I) * n - .0015 * Math.sin(I) * e;
    return u += S, y += S, l += -520.77 * Math.sin(I) * n + 13.66 * Math.sin(_ - A + I) * n + 1.12 * Math.sin(_ - I) * n - 1.06 * Math.sin(A - I) * n + .66 * Math.sin(N) * e + .371 * Math.sin(I) * e - .035 * Math.sin(_ - A + N) * e - .015 * Math.sin(_ - A + I) * e + .0014 * Math.sin(I) * s - .0011 * Math.sin(O) * s - 9e-4 * Math.sin(N) * s, U(o *= C, i, M + r * Y, c + u * Y, f + l * Y, w + y * Y, a);
  }

  var r = new _(1.0000000000000002, 5619723173785822e-31, 4690511510146299e-34, -5154129427414611e-31, .9174820620691819, -.39777715593191376, -223970096136568e-30, .39777715593191376, .9174820620691819),
      c = new d();
  return a.computeSunPositionInEarthInertialFrame = function (t, a) {
    var n;
    return v(t) || (t = s.now()), v(a) || (a = new d()), c = function (t, a) {
      R(t, q);
      var n = (q.dayNumber - g.dayNumber + (q.secondsOfDay - g.secondsOfDay) / p.SECONDS_PER_DAY) / (10 * p.DAYS_PER_JULIAN_CENTURY),
          e = .3595362 * n,
          s = 149598022260.7121 + 957426.3679999999 * Math.cos(16002 * e) + -2243968.05 * Math.sin(16002 * e) + -2273887.624 * Math.cos(21863 * e) + -688150.202 * Math.sin(21863 * e) + 927506.794 * Math.cos(32004 * e) + 1017265.516 * Math.sin(32004 * e) + -119678.29599999999 * Math.cos(10931 * e) + 807828.498 * Math.sin(10931 * e) + 478713.18399999995 * Math.cos(14529 * e) + 209437.01799999998 * Math.sin(14529 * e) + -613351.267 * Math.cos(16368 * e) + 359034.888 * Math.sin(16368 * e) + 284235.953 * Math.cos(15318 * e) + -418874.03599999996 * Math.sin(15318 * e) + -164557.657 * Math.cos(32794 * e) + 329115.314 * Math.sin(32794 * e),
          h = i + M * n + -325e-7 * Math.cos(10 * e) + -105e-7 * Math.sin(10 * e) + -322e-7 * Math.cos(16002 * e) + -137e-7 * Math.sin(16002 * e) + 1e-7 * -79 * Math.cos(21863 * e) + 258e-7 * Math.sin(21863 * e) + 232 * 1e-7 * Math.cos(10931 * e) + 35e-7 * Math.sin(10931 * e) + 1e-7 * -52 * Math.cos(1473 * e) + 1e-7 * -116 * Math.sin(1473 * e) + 97e-7 * Math.cos(32004 * e) + -88e-7 * Math.sin(32004 * e) + 55e-7 * Math.cos(4387 * e) + -112e-7 * Math.sin(4387 * e) + -41e-7 * Math.cos(73 * e) + -8e-6 * Math.sin(73 * e);
      return U(s, .0167086342 - .0004203654 * n, 469.97289 * Y * n, 102.93734808 * W + 11612.3529 * Y * n, 174.87317577 * W - 8679.27034 * Y * n, h, a);
    }(t, c), a = d.negate(c, a), n = e(t, n = c), d.multiplyByScalar(n, -.01215058143522694, n), d.subtract(a, c, a), _.multiplyByVector(r, a, a), a;
  }, a.computeMoonPositionInEarthInertialFrame = function (t, a) {
    return v(t) || (t = s.now()), a = e(t, a), _.multiplyByVector(r, a, a), a;
  }, a;
});