"use strict";

define(["./binarySearch", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Event", "./GregorianDate", "./isLeapYear", "./Iso8601", "./JulianDate", "./TimeInterval"], function (s, h, v, t, S, n, e, u, f, p, g) {
  "use strict";

  function i(t, e) {
    return p.compare(t.start, e.start);
  }

  function m(t) {
    if (this._intervals = [], this._changedEvent = new n(), v(t)) for (var e = t.length, a = 0; a < e; a++) {
      this.addInterval(t[a]);
    }
  }

  t(m.prototype, {
    changedEvent: {
      get: function get() {
        return this._changedEvent;
      }
    },
    start: {
      get: function get() {
        var t = this._intervals;
        return 0 === t.length ? void 0 : t[0].start;
      }
    },
    isStartIncluded: {
      get: function get() {
        var t = this._intervals;
        return 0 !== t.length && t[0].isStartIncluded;
      }
    },
    stop: {
      get: function get() {
        var t = this._intervals,
            e = t.length;
        return 0 === e ? void 0 : t[e - 1].stop;
      }
    },
    isStopIncluded: {
      get: function get() {
        var t = this._intervals,
            e = t.length;
        return 0 !== e && t[e - 1].isStopIncluded;
      }
    },
    length: {
      get: function get() {
        return this._intervals.length;
      }
    },
    isEmpty: {
      get: function get() {
        return 0 === this._intervals.length;
      }
    }
  }), m.prototype.equals = function (t, e) {
    if (this === t) return !0;
    if (!(t instanceof m)) return !1;
    var a = this._intervals,
        n = t._intervals,
        r = a.length;
    if (r !== n.length) return !1;

    for (var s = 0; s < r; s++) {
      if (!g.equals(a[s], n[s], e)) return !1;
    }

    return !0;
  }, m.prototype.get = function (t) {
    if (!v(t)) throw new S("index is required.");
    return this._intervals[t];
  }, m.prototype.removeAll = function () {
    0 < this._intervals.length && (this._intervals.length = 0, this._changedEvent.raiseEvent(this));
  }, m.prototype.findIntervalContainingDate = function (t) {
    var e = this.indexOf(t);
    return 0 <= e ? this._intervals[e] : void 0;
  }, m.prototype.findDataForIntervalContainingDate = function (t) {
    var e = this.indexOf(t);
    return 0 <= e ? this._intervals[e].data : void 0;
  }, m.prototype.contains = function (t) {
    return 0 <= this.indexOf(t);
  };
  var r = new g();
  m.prototype.indexOf = function (t) {
    if (!v(t)) throw new S("date is required");
    var e = this._intervals;
    r.start = t, r.stop = t;
    var a = s(e, r, i);
    return 0 <= a ? e[a].isStartIncluded ? a : 0 < a && e[a - 1].stop.equals(t) && e[a - 1].isStopIncluded ? a - 1 : ~a : 0 < (a = ~a) && a - 1 < e.length && g.contains(e[a - 1], t) ? a - 1 : ~a;
  }, m.prototype.findInterval = function (t) {
    for (var e = (t = h(t, h.EMPTY_OBJECT)).start, a = t.stop, n = t.isStartIncluded, r = t.isStopIncluded, s = this._intervals, i = 0, d = s.length; i < d; i++) {
      var o = s[i];
      if ((!v(e) || o.start.equals(e)) && (!v(a) || o.stop.equals(a)) && (!v(n) || o.isStartIncluded === n) && (!v(r) || o.isStopIncluded === r)) return s[i];
    }
  }, m.prototype.addInterval = function (t, e) {
    if (!v(t)) throw new S("interval is required");

    if (!t.isEmpty) {
      var a = this._intervals;
      if (0 === a.length || p.greaterThan(t.start, a[a.length - 1].stop)) return a.push(t), void this._changedEvent.raiseEvent(this);
      var n,
          r = s(a, t, i);

      for (r < 0 ? r = ~r : 0 < r && t.isStartIncluded && a[r - 1].isStartIncluded && a[r - 1].start.equals(t.start) ? --r : r < a.length && !t.isStartIncluded && a[r].isStartIncluded && a[r].start.equals(t.start) && ++r, 0 < r && (0 < (n = p.compare(a[r - 1].stop, t.start)) || 0 === n && (a[r - 1].isStopIncluded || t.isStartIncluded)) && ((v(e) ? e(a[r - 1].data, t.data) : a[r - 1].data === t.data) ? (t = p.greaterThan(t.stop, a[r - 1].stop) ? new g({
        start: a[r - 1].start,
        stop: t.stop,
        isStartIncluded: a[r - 1].isStartIncluded,
        isStopIncluded: t.isStopIncluded,
        data: t.data
      }) : new g({
        start: a[r - 1].start,
        stop: a[r - 1].stop,
        isStartIncluded: a[r - 1].isStartIncluded,
        isStopIncluded: a[r - 1].isStopIncluded || t.stop.equals(a[r - 1].stop) && t.isStopIncluded,
        data: t.data
      }), a.splice(r - 1, 1), --r) : ((0 < (n = p.compare(a[r - 1].stop, t.stop)) || 0 === n && a[r - 1].isStopIncluded && !t.isStopIncluded) && a.splice(r, 0, new g({
        start: t.stop,
        stop: a[r - 1].stop,
        isStartIncluded: !t.isStopIncluded,
        isStopIncluded: a[r - 1].isStopIncluded,
        data: a[r - 1].data
      })), a[r - 1] = new g({
        start: a[r - 1].start,
        stop: t.start,
        isStartIncluded: a[r - 1].isStartIncluded,
        isStopIncluded: !t.isStartIncluded,
        data: a[r - 1].data
      }))); r < a.length && (0 < (n = p.compare(t.stop, a[r].start)) || 0 === n && (t.isStopIncluded || a[r].isStartIncluded));) {
        if (v(e) ? e(a[r].data, t.data) : a[r].data === t.data) t = new g({
          start: t.start,
          stop: p.greaterThan(a[r].stop, t.stop) ? a[r].stop : t.stop,
          isStartIncluded: t.isStartIncluded,
          isStopIncluded: p.greaterThan(a[r].stop, t.stop) ? a[r].isStopIncluded : t.isStopIncluded,
          data: t.data
        }), a.splice(r, 1);else {
          if (a[r] = new g({
            start: t.stop,
            stop: a[r].stop,
            isStartIncluded: !t.isStopIncluded,
            isStopIncluded: a[r].isStopIncluded,
            data: a[r].data
          }), !a[r].isEmpty) break;
          a.splice(r, 1);
        }
      }

      a.splice(r, 0, t), this._changedEvent.raiseEvent(this);
    }
  }, m.prototype.removeInterval = function (t) {
    if (!v(t)) throw new S("interval is required");
    if (t.isEmpty) return !1;
    var e = this._intervals,
        a = s(e, t, i);
    a < 0 && (a = ~a);
    var n = !1;

    for (0 < a && (p.greaterThan(e[a - 1].stop, t.start) || e[a - 1].stop.equals(t.start) && e[a - 1].isStopIncluded && t.isStartIncluded) && (n = !0, (p.greaterThan(e[a - 1].stop, t.stop) || e[a - 1].isStopIncluded && !t.isStopIncluded && e[a - 1].stop.equals(t.stop)) && e.splice(a, 0, new g({
      start: t.stop,
      stop: e[a - 1].stop,
      isStartIncluded: !t.isStopIncluded,
      isStopIncluded: e[a - 1].isStopIncluded,
      data: e[a - 1].data
    })), e[a - 1] = new g({
      start: e[a - 1].start,
      stop: t.start,
      isStartIncluded: e[a - 1].isStartIncluded,
      isStopIncluded: !t.isStartIncluded,
      data: e[a - 1].data
    })), a < e.length && !t.isStartIncluded && e[a].isStartIncluded && t.start.equals(e[a].start) && (n = !0, e.splice(a, 0, new g({
      start: e[a].start,
      stop: e[a].start,
      isStartIncluded: !0,
      isStopIncluded: !0,
      data: e[a].data
    })), ++a); a < e.length && p.greaterThan(t.stop, e[a].stop);) {
      n = !0, e.splice(a, 1);
    }

    return a < e.length && t.stop.equals(e[a].stop) && (n = !0, !t.isStopIncluded && e[a].isStopIncluded ? a + 1 < e.length && e[a + 1].start.equals(t.stop) && e[a].data === e[a + 1].data ? (e.splice(a, 1), e[a] = new g({
      start: e[a].start,
      stop: e[a].stop,
      isStartIncluded: !0,
      isStopIncluded: e[a].isStopIncluded,
      data: e[a].data
    })) : e[a] = new g({
      start: t.stop,
      stop: t.stop,
      isStartIncluded: !0,
      isStopIncluded: !0,
      data: e[a].data
    }) : e.splice(a, 1)), a < e.length && (p.greaterThan(t.stop, e[a].start) || t.stop.equals(e[a].start) && t.isStopIncluded && e[a].isStartIncluded) && (n = !0, e[a] = new g({
      start: t.stop,
      stop: e[a].stop,
      isStartIncluded: !t.isStopIncluded,
      isStopIncluded: e[a].isStopIncluded,
      data: e[a].data
    })), n && this._changedEvent.raiseEvent(this), n;
  }, m.prototype.intersect = function (t, e, a) {
    if (!v(t)) throw new S("other is required.");

    for (var n = new m(), r = 0, s = 0, i = this._intervals, d = t._intervals; r < i.length && s < d.length;) {
      var o,
          l = i[r],
          u = d[s];
      p.lessThan(l.stop, u.start) ? ++r : p.lessThan(u.stop, l.start) ? ++s : ((v(a) || v(e) && e(l.data, u.data) || !v(e) && u.data === l.data) && ((o = g.intersect(l, u, new g(), a)).isEmpty || n.addInterval(o, e)), p.lessThan(l.stop, u.stop) || l.stop.equals(u.stop) && !l.isStopIncluded && u.isStopIncluded ? ++r : ++s);
    }

    return n;
  }, m.fromJulianDateArray = function (t, e) {
    if (!v(t)) throw new S("options is required.");
    if (!v(t.julianDates)) throw new S("options.iso8601Array is required.");
    v(e) || (e = new m());
    var a = t.julianDates,
        n = a.length,
        r = t.dataCallback,
        s = h(t.isStartIncluded, !0),
        i = h(t.isStopIncluded, !0),
        d = h(t.leadingInterval, !1),
        o = h(t.trailingInterval, !1),
        l = 0;
    d && (++l, (p = new g({
      start: f.MINIMUM_VALUE,
      stop: a[0],
      isStartIncluded: !0,
      isStopIncluded: !s
    })).data = v(r) ? r(p, e.length) : e.length, e.addInterval(p));

    for (var u = 0; u < n - 1; ++u) {
      var p,
          c = a[u],
          I = a[u + 1];
      (p = new g({
        start: c,
        stop: I,
        isStartIncluded: e.length !== l || s,
        isStopIncluded: u === n - 2 && i
      })).data = v(r) ? r(p, e.length) : e.length, e.addInterval(p), c = I;
    }

    return o && ((p = new g({
      start: a[n - 1],
      stop: f.MAXIMUM_VALUE,
      isStartIncluded: !i,
      isStopIncluded: !0
    })).data = v(r) ? r(p, e.length) : e.length, e.addInterval(p)), e;
  };
  var c = new e(),
      I = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function w(t, e, a) {
    v(a) || (a = new p()), p.toGregorianDate(t, c);
    var n = c.millisecond + e.millisecond,
        r = c.second + e.second,
        s = c.minute + e.minute,
        i = c.hour + e.hour,
        d = c.day + e.day,
        o = c.month + e.month,
        l = c.year + e.year;

    for (1e3 <= n && (r += Math.floor(n / 1e3), n %= 1e3), 60 <= r && (s += Math.floor(r / 60), r %= 60), 60 <= s && (i += Math.floor(s / 60), s %= 60), 24 <= i && (d += Math.floor(i / 24), i %= 24), I[2] = u(l) ? 29 : 28; d > I[o] || 13 <= o;) {
      d > I[o] && (d -= I[o], ++o), 13 <= o && (--o, l += Math.floor(o / 12), o %= 12, ++o), I[2] = u(l) ? 29 : 28;
    }

    return c.millisecond = n, c.second = r, c.minute = s, c.hour = i, c.day = d, c.month = o, c.year = l, p.fromGregorianDate(c, a);
  }

  var d = new p(),
      o = /P(?:([\d.,]+)Y)?(?:([\d.,]+)M)?(?:([\d.,]+)W)?(?:([\d.,]+)D)?(?:T(?:([\d.,]+)H)?(?:([\d.,]+)M)?(?:([\d.,]+)S)?)?/;

  function y(t, e) {
    if (v(t) && 0 !== t.length) {
      if (e.year = 0, e.month = 0, e.day = 0, e.hour = 0, e.minute = 0, e.second = 0, "P" === t[e.millisecond = 0]) {
        var a,
            n = t.match(o);
        if (!v(n)) return;
        v(n[1]) && (e.year = Number(n[1].replace(",", "."))), v(n[2]) && (e.month = Number(n[2].replace(",", "."))), v(n[3]) && (e.day = 7 * Number(n[3].replace(",", "."))), v(n[4]) && (e.day += Number(n[4].replace(",", "."))), v(n[5]) && (e.hour = Number(n[5].replace(",", "."))), v(n[6]) && (e.minute = Number(n[6].replace(",", "."))), v(n[7]) && (a = Number(n[7].replace(",", ".")), e.second = Math.floor(a), e.millisecond = a % 1 * 1e3);
      } else "Z" !== t[t.length - 1] && (t += "Z"), p.toGregorianDate(p.fromIso8601(t, d), e);

      return e.year || e.month || e.day || e.hour || e.minute || e.second || e.millisecond;
    }
  }

  var q = new e();
  return m.fromIso8601 = function (t, e) {
    if (!v(t)) throw new S("options is required.");
    if (!v(t.iso8601)) throw new S("options.iso8601 is required.");
    var a = t.iso8601.split("/"),
        n = p.fromIso8601(a[0]),
        r = p.fromIso8601(a[1]),
        s = [];

    if (y(a[2], q)) {
      var i = p.clone(n);

      for (s.push(i); p.compare(i, r) < 0;) {
        i = w(i, q);
        p.compare(r, i) <= 0 && p.clone(r, i), s.push(i);
      }
    } else s.push(n, r);

    return m.fromJulianDateArray({
      julianDates: s,
      isStartIncluded: t.isStartIncluded,
      isStopIncluded: t.isStopIncluded,
      leadingInterval: t.leadingInterval,
      trailingInterval: t.trailingInterval,
      dataCallback: t.dataCallback
    }, e);
  }, m.fromIso8601DateArray = function (t, e) {
    if (!v(t)) throw new S("options is required.");
    if (!v(t.iso8601Dates)) throw new S("options.iso8601Dates is required.");
    return m.fromJulianDateArray({
      julianDates: t.iso8601Dates.map(function (t) {
        return p.fromIso8601(t);
      }),
      isStartIncluded: t.isStartIncluded,
      isStopIncluded: t.isStopIncluded,
      leadingInterval: t.leadingInterval,
      trailingInterval: t.trailingInterval,
      dataCallback: t.dataCallback
    }, e);
  }, m.fromIso8601DurationArray = function (t, e) {
    if (!v(t)) throw new S("options is required.");
    if (!v(t.epoch)) throw new S("options.epoch is required.");
    if (!v(t.iso8601Durations)) throw new S("options.iso8601Durations is required.");

    for (var a, n, r = t.epoch, s = t.iso8601Durations, i = h(t.relativeToPrevious, !1), d = [], o = s.length, l = 0; l < o; ++l) {
      !y(s[l], q) && 0 !== l || (a = i && v(n) ? w(n, q) : w(r, q), d.push(a), n = a);
    }

    return m.fromJulianDateArray({
      julianDates: d,
      isStartIncluded: t.isStartIncluded,
      isStopIncluded: t.isStopIncluded,
      leadingInterval: t.leadingInterval,
      trailingInterval: t.trailingInterval,
      dataCallback: t.dataCallback
    }, e);
  }, m;
});