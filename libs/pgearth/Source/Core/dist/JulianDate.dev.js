"use strict";

define(["../ThirdParty/sprintf", "./binarySearch", "./defaultValue", "./defined", "./DeveloperError", "./GregorianDate", "./isLeapYear", "./LeapSecond", "./TimeConstants", "./TimeStandard"], function (w, i, a, C, p, S, v, e, m, A) {
  "use strict";

  var c = new S(),
      _ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function o(e, n) {
    return $.compare(e.julianDate, n.julianDate);
  }

  var s = new e();

  function g(e) {
    s.julianDate = e;
    var n = $.leapSeconds,
        r = i(n, s, o);
    r < 0 && (r = ~r), r >= n.length && (r = n.length - 1);
    var t = n[r].offset;
    0 < r && t < $.secondsDifference(n[r].julianDate, e) && (t = n[--r].offset), $.addSeconds(e, t, e);
  }

  function E(e, n) {
    s.julianDate = e;
    var r = $.leapSeconds,
        t = i(r, s, o);
    if (t < 0 && (t = ~t), 0 === t) return $.addSeconds(e, -r[0].offset, n);
    if (t >= r.length) return $.addSeconds(e, -r[t - 1].offset, n);
    var a = $.secondsDifference(r[t].julianDate, e);
    return 0 === a ? $.addSeconds(e, -r[t].offset, n) : a <= 1 ? void 0 : $.addSeconds(e, -r[--t].offset, n);
  }

  function q(e, n, r) {
    var t = n / m.SECONDS_PER_DAY | 0;
    return e += t, (n -= m.SECONDS_PER_DAY * t) < 0 && (e--, n += m.SECONDS_PER_DAY), r.dayNumber = e, r.secondsOfDay = n, r;
  }

  function U(e, n, r, t, a, i, o) {
    var s = (n - 14) / 12 | 0,
        d = e + 4800 + s,
        u = (1461 * d / 4 | 0) + (367 * (n - 2 - 12 * s) / 12 | 0) - (3 * ((d + 100) / 100 | 0) / 4 | 0) + r - 32075;
    (t -= 12) < 0 && (t += 24);
    var f = i + (t * m.SECONDS_PER_HOUR + a * m.SECONDS_PER_MINUTE + o * m.SECONDS_PER_MILLISECOND);
    return 43200 <= f && --u, [u, f];
  }

  var b = /^(\d{4})$/,
      R = /^(\d{4})-(\d{2})$/,
      P = /^(\d{4})-?(\d{3})$/,
      j = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
      M = /^(\d{4})-?(\d{2})-?(\d{2})$/,
      n = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
      Y = /^(\d{2})(\.\d+)?/.source + n.source,
      L = /^(\d{2}):?(\d{2})(\.\d+)?/.source + n.source,
      G = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + n.source,
      H = "Invalid ISO 8601 date.";

  function $(e, n, r) {
    this.dayNumber = void 0, this.secondsOfDay = void 0, e = a(e, 0), n = a(n, 0), r = a(r, A.UTC);
    var t = 0 | e;
    q(t, n += (e - t) * m.SECONDS_PER_DAY, this), r === A.UTC && g(this);
  }

  $.fromGregorianDate = function (e, n) {
    if (!(e instanceof S)) throw new p("date must be a valid GregorianDate.");
    var r = U(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond);
    return C(n) ? (q(r[0], r[1], n), g(n), n) : new $(r[0], r[1], A.UTC);
  }, $.fromDate = function (e, n) {
    if (!(e instanceof Date) || isNaN(e.getTime())) throw new p("date must be a valid JavaScript Date.");
    var r = U(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
    return C(n) ? (q(r[0], r[1], n), g(n), n) : new $(r[0], r[1], A.UTC);
  }, $.fromIso8601 = function (e, n) {
    if ("string" != typeof e) throw new p(H);
    var r,
        t,
        a,
        i,
        o = (e = e.replace(",", ".")).split("T"),
        s = 1,
        d = 1,
        u = 0,
        f = 0,
        w = 0,
        c = 0,
        l = o[0],
        D = o[1];
    if (!C(l)) throw new p(H);

    if (null !== (o = l.match(M))) {
      if (0 < (h = l.split("-").length - 1) && 2 !== h) throw new p(H);
      r = +o[1], s = +o[2], d = +o[3];
    } else if (null !== (o = l.match(R))) r = +o[1], s = +o[2];else if (null !== (o = l.match(b))) r = +o[1];else {
      if (null !== (o = l.match(P))) {
        if (r = +o[1], S = +o[2], a = v(r), S < 1 || a && 366 < S || !a && 365 < S) throw new p(H);
      } else {
        if (null === (o = l.match(j))) throw new p(H);
        r = +o[1];
        var h,
            T = +o[2],
            y = +o[3] || 0;
        if (0 < (h = l.split("-").length - 1) && (!C(o[3]) && 1 !== h || C(o[3]) && 2 !== h)) throw new p(H);
        var S = 7 * T + y - new Date(Date.UTC(r, 0, 4)).getUTCDay() - 3;
      }

      (t = new Date(Date.UTC(r, 0, 1))).setUTCDate(S), s = t.getUTCMonth() + 1, d = t.getUTCDate();
    }

    if (a = v(r), s < 1 || 12 < s || d < 1 || (2 !== s || !a) && _[s - 1] < d || a && 2 === s && 29 < d) throw new p(H);

    if (C(D)) {
      if (null !== (o = D.match(G))) {
        if (0 < (h = D.split(":").length - 1) && 2 !== h && 3 !== h) throw new p(H);
        u = +o[1], f = +o[2], w = +o[3], c = 1e3 * (o[4] || 0), i = 5;
      } else if (null !== (o = D.match(L))) {
        if (2 < (h = D.split(":").length - 1)) throw new p(H);
        u = +o[1], f = +o[2], w = 60 * (o[3] || 0), i = 4;
      } else {
        if (null === (o = D.match(Y))) throw new p(H);
        u = +o[1], f = 60 * (o[2] || 0), i = 3;
      }

      if (60 <= f || 61 <= w || 24 < u || 24 === u && (0 < f || 0 < w || 0 < c)) throw new p(H);
      var m = o[i],
          E = +o[i + 1],
          O = +(o[i + 2] || 0);

      switch (m) {
        case "+":
          u -= E, f -= O;
          break;

        case "-":
          u += E, f += O;
          break;

        case "Z":
          break;

        default:
          f += new Date(Date.UTC(r, s - 1, d, u, f)).getTimezoneOffset();
      }
    }

    var N = 60 === w;

    for (N && w--; 60 <= f;) {
      f -= 60, u++;
    }

    for (; 24 <= u;) {
      u -= 24, d++;
    }

    for (t = a && 2 === s ? 29 : _[s - 1]; t < d;) {
      d -= t, 12 < ++s && (s -= 12, r++), t = a && 2 === s ? 29 : _[s - 1];
    }

    for (; f < 0;) {
      f += 60, u--;
    }

    for (; u < 0;) {
      u += 24, d--;
    }

    for (; d < 1;) {
      --s < 1 && (s += 12, r--), d += t = a && 2 === s ? 29 : _[s - 1];
    }

    var I = U(r, s, d, u, f, w, c);
    return C(n) ? (q(I[0], I[1], n), g(n)) : n = new $(I[0], I[1], A.UTC), N && $.addSeconds(n, 1, n), n;
  }, $.now = function (e) {
    return $.fromDate(new Date(), e);
  };
  var O = new $(0, 0, A.TAI);
  return $.toGregorianDate = function (e, n) {
    if (!C(e)) throw new p("julianDate is required.");
    var r = !1,
        t = E(e, O);
    C(t) || ($.addSeconds(e, -1, O), t = E(O, O), r = !0);
    var a = t.dayNumber,
        i = t.secondsOfDay;
    43200 <= i && (a += 1);
    var o = a + 68569 | 0,
        s = 4 * o / 146097 | 0,
        d = 4e3 * ((o = o - ((146097 * s + 3) / 4 | 0) | 0) + 1) / 1461001 | 0,
        u = 80 * (o = o - (1461 * d / 4 | 0) + 31 | 0) / 2447 | 0,
        f = o - (2447 * u / 80 | 0) | 0,
        w = 2 + u - 12 * (o = u / 11 | 0) | 0,
        c = 100 * (s - 49) + d + o | 0,
        l = i / m.SECONDS_PER_HOUR | 0,
        D = i - l * m.SECONDS_PER_HOUR,
        h = D / m.SECONDS_PER_MINUTE | 0,
        T = 0 | (D -= h * m.SECONDS_PER_MINUTE),
        y = (D - T) / m.SECONDS_PER_MILLISECOND;
    return 23 < (l += 12) && (l -= 24), r && (T += 1), C(n) ? (n.year = c, n.month = w, n.day = f, n.hour = l, n.minute = h, n.second = T, n.millisecond = y, n.isLeapSecond = r, n) : new S(c, w, f, l, h, T, y, r);
  }, $.toDate = function (e) {
    if (!C(e)) throw new p("julianDate is required.");
    var n = $.toGregorianDate(e, c),
        r = n.second;
    return n.isLeapSecond && --r, new Date(Date.UTC(n.year, n.month - 1, n.day, n.hour, n.minute, r, n.millisecond));
  }, $.toIso8601 = function (e, n) {
    if (!C(e)) throw new p("julianDate is required.");
    var r,
        t = $.toGregorianDate(e, c),
        a = t.year,
        i = t.month,
        o = t.day,
        s = t.hour,
        d = t.minute,
        u = t.second,
        f = t.millisecond;
    return 1e4 === a && 1 === i && 1 === o && 0 === s && 0 === d && 0 === u && 0 === f && (a = 9999, i = 12, o = 31, s = 24), C(n) || 0 === f ? C(n) && 0 !== n ? (r = (.01 * f).toFixed(n).replace(".", "").slice(0, n), w("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", a, i, o, s, d, u, r)) : w("%04d-%02d-%02dT%02d:%02d:%02dZ", a, i, o, s, d, u) : (r = (.01 * f).toString().replace(".", ""), w("%04d-%02d-%02dT%02d:%02d:%02d.%sZ", a, i, o, s, d, u, r));
  }, $.clone = function (e, n) {
    if (C(e)) return C(n) ? (n.dayNumber = e.dayNumber, n.secondsOfDay = e.secondsOfDay, n) : new $(e.dayNumber, e.secondsOfDay, A.TAI);
  }, $.compare = function (e, n) {
    if (!C(e)) throw new p("left is required.");
    if (!C(n)) throw new p("right is required.");
    var r = e.dayNumber - n.dayNumber;
    return 0 != r ? r : e.secondsOfDay - n.secondsOfDay;
  }, $.equals = function (e, n) {
    return e === n || C(e) && C(n) && e.dayNumber === n.dayNumber && e.secondsOfDay === n.secondsOfDay;
  }, $.equalsEpsilon = function (e, n, r) {
    if (!C(r)) throw new p("epsilon is required.");
    return e === n || C(e) && C(n) && Math.abs($.secondsDifference(e, n)) <= r;
  }, $.totalDays = function (e) {
    if (!C(e)) throw new p("julianDate is required.");
    return e.dayNumber + e.secondsOfDay / m.SECONDS_PER_DAY;
  }, $.secondsDifference = function (e, n) {
    if (!C(e)) throw new p("left is required.");
    if (!C(n)) throw new p("right is required.");
    return (e.dayNumber - n.dayNumber) * m.SECONDS_PER_DAY + (e.secondsOfDay - n.secondsOfDay);
  }, $.daysDifference = function (e, n) {
    if (!C(e)) throw new p("left is required.");
    if (!C(n)) throw new p("right is required.");
    return e.dayNumber - n.dayNumber + (e.secondsOfDay - n.secondsOfDay) / m.SECONDS_PER_DAY;
  }, $.computeTaiMinusUtc = function (e) {
    s.julianDate = e;
    var n = $.leapSeconds,
        r = i(n, s, o);
    return r < 0 && (r = ~r, --r < 0 && (r = 0)), n[r].offset;
  }, $.addSeconds = function (e, n, r) {
    if (!C(e)) throw new p("julianDate is required.");
    if (!C(n)) throw new p("seconds is required.");
    if (!C(r)) throw new p("result is required.");
    return q(e.dayNumber, e.secondsOfDay + n, r);
  }, $.addMinutes = function (e, n, r) {
    if (!C(e)) throw new p("julianDate is required.");
    if (!C(n)) throw new p("minutes is required.");
    if (!C(r)) throw new p("result is required.");
    var t = e.secondsOfDay + n * m.SECONDS_PER_MINUTE;
    return q(e.dayNumber, t, r);
  }, $.addHours = function (e, n, r) {
    if (!C(e)) throw new p("julianDate is required.");
    if (!C(n)) throw new p("hours is required.");
    if (!C(r)) throw new p("result is required.");
    var t = e.secondsOfDay + n * m.SECONDS_PER_HOUR;
    return q(e.dayNumber, t, r);
  }, $.addDays = function (e, n, r) {
    if (!C(e)) throw new p("julianDate is required.");
    if (!C(n)) throw new p("days is required.");
    if (!C(r)) throw new p("result is required.");
    return q(e.dayNumber + n, e.secondsOfDay, r);
  }, $.lessThan = function (e, n) {
    return $.compare(e, n) < 0;
  }, $.lessThanOrEquals = function (e, n) {
    return $.compare(e, n) <= 0;
  }, $.greaterThan = function (e, n) {
    return 0 < $.compare(e, n);
  }, $.greaterThanOrEquals = function (e, n) {
    return 0 <= $.compare(e, n);
  }, $.prototype.clone = function (e) {
    return $.clone(this, e);
  }, $.prototype.equals = function (e) {
    return $.equals(this, e);
  }, $.prototype.equalsEpsilon = function (e, n) {
    return $.equalsEpsilon(this, e, n);
  }, $.prototype.toString = function () {
    return $.toIso8601(this);
  }, $.leapSeconds = [new e(new $(2441317, 43210, A.TAI), 10), new e(new $(2441499, 43211, A.TAI), 11), new e(new $(2441683, 43212, A.TAI), 12), new e(new $(2442048, 43213, A.TAI), 13), new e(new $(2442413, 43214, A.TAI), 14), new e(new $(2442778, 43215, A.TAI), 15), new e(new $(2443144, 43216, A.TAI), 16), new e(new $(2443509, 43217, A.TAI), 17), new e(new $(2443874, 43218, A.TAI), 18), new e(new $(2444239, 43219, A.TAI), 19), new e(new $(2444786, 43220, A.TAI), 20), new e(new $(2445151, 43221, A.TAI), 21), new e(new $(2445516, 43222, A.TAI), 22), new e(new $(2446247, 43223, A.TAI), 23), new e(new $(2447161, 43224, A.TAI), 24), new e(new $(2447892, 43225, A.TAI), 25), new e(new $(2448257, 43226, A.TAI), 26), new e(new $(2448804, 43227, A.TAI), 27), new e(new $(2449169, 43228, A.TAI), 28), new e(new $(2449534, 43229, A.TAI), 29), new e(new $(2450083, 43230, A.TAI), 30), new e(new $(2450630, 43231, A.TAI), 31), new e(new $(2451179, 43232, A.TAI), 32), new e(new $(2453736, 43233, A.TAI), 33), new e(new $(2454832, 43234, A.TAI), 34), new e(new $(2456109, 43235, A.TAI), 35), new e(new $(2457204, 43236, A.TAI), 36), new e(new $(2457754, 43237, A.TAI), 37)], $;
});