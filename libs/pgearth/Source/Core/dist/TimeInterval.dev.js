"use strict";

define(["./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./JulianDate"], function (f, d, h, t, u, s, E) {
  "use strict";

  function y(t) {
    t = d(t, d.EMPTY_OBJECT), this.start = h(t.start) ? E.clone(t.start) : new E(), this.stop = h(t.stop) ? E.clone(t.stop) : new E(), this.data = t.data, this.isStartIncluded = d(t.isStartIncluded, !0), this.isStopIncluded = d(t.isStopIncluded, !0);
  }

  t(y.prototype, {
    isEmpty: {
      get: function get() {
        var t = E.compare(this.stop, this.start);
        return t < 0 || 0 === t && (!this.isStartIncluded || !this.isStopIncluded);
      }
    }
  });
  var l = {
    start: void 0,
    stop: void 0,
    isStartIncluded: void 0,
    isStopIncluded: void 0,
    data: void 0
  };
  return y.fromIso8601 = function (t, s) {
    f.typeOf.object("options", t), f.typeOf.string("options.iso8601", t.iso8601);
    var e = t.iso8601.split("/");
    if (2 !== e.length) throw new u("options.iso8601 is an invalid ISO 8601 interval.");
    var n = E.fromIso8601(e[0]),
        a = E.fromIso8601(e[1]),
        o = d(t.isStartIncluded, !0),
        r = d(t.isStopIncluded, !0),
        i = t.data;
    return h(s) ? (s.start = n, s.stop = a, s.isStartIncluded = o, s.isStopIncluded = r, s.data = i, s) : (l.start = n, l.stop = a, l.isStartIncluded = o, l.isStopIncluded = r, l.data = i, new y(l));
  }, y.toIso8601 = function (t, s) {
    return f.typeOf.object("timeInterval", t), E.toIso8601(t.start, s) + "/" + E.toIso8601(t.stop, s);
  }, y.clone = function (t, s) {
    if (h(t)) return h(s) ? (s.start = t.start, s.stop = t.stop, s.isStartIncluded = t.isStartIncluded, s.isStopIncluded = t.isStopIncluded, s.data = t.data, s) : new y(t);
  }, y.equals = function (t, s, e) {
    return t === s || h(t) && h(s) && (t.isEmpty && s.isEmpty || t.isStartIncluded === s.isStartIncluded && t.isStopIncluded === s.isStopIncluded && E.equals(t.start, s.start) && E.equals(t.stop, s.stop) && (t.data === s.data || h(e) && e(t.data, s.data)));
  }, y.equalsEpsilon = function (t, s, e, n) {
    return f.typeOf.number("epsilon", e), t === s || h(t) && h(s) && (t.isEmpty && s.isEmpty || t.isStartIncluded === s.isStartIncluded && t.isStopIncluded === s.isStopIncluded && E.equalsEpsilon(t.start, s.start, e) && E.equalsEpsilon(t.stop, s.stop, e) && (t.data === s.data || h(n) && n(t.data, s.data)));
  }, y.intersect = function (t, s, e, n) {
    if (f.typeOf.object("left", t), f.typeOf.object("result", e), !h(s)) return y.clone(y.EMPTY, e);
    var a = t.start,
        o = t.stop,
        r = s.start,
        i = s.stop,
        d = E.greaterThanOrEquals(r, a) && E.greaterThanOrEquals(o, r),
        u = !d && E.lessThanOrEquals(r, a) && E.lessThanOrEquals(a, i);
    if (!d && !u) return y.clone(y.EMPTY, e);
    var l = t.isStartIncluded,
        p = t.isStopIncluded,
        c = s.isStartIncluded,
        I = s.isStopIncluded,
        S = E.lessThan(o, i);
    return e.start = d ? r : a, e.isStartIncluded = l && c || !E.equals(r, a) && (d && c || u && l), e.stop = S ? o : i, e.isStopIncluded = S ? p : p && I || !E.equals(i, o) && I, e.data = h(n) ? n(t.data, s.data) : t.data, e;
  }, y.contains = function (t, s) {
    if (f.typeOf.object("timeInterval", t), f.typeOf.object("julianDate", s), t.isEmpty) return !1;
    var e = E.compare(t.start, s);
    if (0 === e) return t.isStartIncluded;
    var n = E.compare(s, t.stop);
    return 0 === n ? t.isStopIncluded : e < 0 && n < 0;
  }, y.prototype.clone = function (t) {
    return y.clone(this, t);
  }, y.prototype.equals = function (t, s) {
    return y.equals(this, t, s);
  }, y.prototype.equalsEpsilon = function (t, s, e) {
    return y.equalsEpsilon(this, t, s, e);
  }, y.prototype.toString = function () {
    return y.toIso8601(this);
  }, y.EMPTY = s(new y({
    start: new E(),
    stop: new E(),
    isStartIncluded: !1,
    isStopIncluded: !1
  })), y;
});