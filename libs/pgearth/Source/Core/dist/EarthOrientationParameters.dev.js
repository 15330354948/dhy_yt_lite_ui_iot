"use strict";

define(["../ThirdParty/when", "./binarySearch", "./defaultValue", "./defined", "./EarthOrientationParametersSample", "./freezeObject", "./JulianDate", "./LeapSecond", "./Resource", "./RuntimeError", "./TimeConstants", "./TimeStandard"], function (s, p, t, E, c, e, W, U, o, m, S, M) {
  "use strict";

  function n(e) {
    var n, a;
    e = t(e, t.EMPTY_OBJECT), this._dates = void 0, this._samples = void 0, this._dateColumn = -1, this._xPoleWanderRadiansColumn = -1, this._yPoleWanderRadiansColumn = -1, this._ut1MinusUtcSecondsColumn = -1, this._xCelestialPoleOffsetRadiansColumn = -1, this._yCelestialPoleOffsetRadiansColumn = -1, this._taiMinusUtcSecondsColumn = -1, this._columnCount = 0, this._lastIndex = -1, this._downloadPromise = void 0, this._dataError = void 0, this._addNewLeapSeconds = t(e.addNewLeapSeconds, !0), E(e.data) ? l(this, e.data) : E(e.url) ? (n = o.createIfNeeded(e.url), (a = this)._downloadPromise = s(n.fetchJson(), function (e) {
      l(a, e);
    }, function () {
      a._dataError = "An error occurred while retrieving the EOP data from the URL " + n.url + ".";
    })) : l(this, {
      columnNames: ["dateIso8601", "modifiedJulianDateUtc", "xPoleWanderRadians", "yPoleWanderRadians", "ut1MinusUtcSeconds", "lengthOfDayCorrectionSeconds", "xCelestialPoleOffsetRadians", "yCelestialPoleOffsetRadians", "taiMinusUtcSeconds"],
      samples: []
    });
  }

  function N(e, n) {
    return W.compare(e.julianDate, n);
  }

  function l(e, n) {
    if (E(n.columnNames)) {
      if (E(n.samples)) {
        var a = n.columnNames.indexOf("modifiedJulianDateUtc"),
            s = n.columnNames.indexOf("xPoleWanderRadians"),
            t = n.columnNames.indexOf("yPoleWanderRadians"),
            o = n.columnNames.indexOf("ut1MinusUtcSeconds"),
            l = n.columnNames.indexOf("xCelestialPoleOffsetRadians"),
            i = n.columnNames.indexOf("yCelestialPoleOffsetRadians"),
            d = n.columnNames.indexOf("taiMinusUtcSeconds");
        if (a < 0 || s < 0 || t < 0 || o < 0 || l < 0 || i < 0 || d < 0) e._dataError = "Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns";else {
          var r,
              u = e._samples = n.samples,
              f = e._dates = [];
          e._dateColumn = a, e._xPoleWanderRadiansColumn = s, e._yPoleWanderRadiansColumn = t, e._ut1MinusUtcSecondsColumn = o, e._xCelestialPoleOffsetRadiansColumn = l, e._yCelestialPoleOffsetRadiansColumn = i, e._taiMinusUtcSecondsColumn = d, e._columnCount = n.columnNames.length, e._lastIndex = void 0;

          for (var c = e._addNewLeapSeconds, m = 0, _ = u.length; m < _; m += e._columnCount) {
            var P,
                C,
                h,
                O = u[m + a],
                x = u[m + d],
                R = O + S.MODIFIED_JULIAN_DATE_DIFFERENCE,
                y = new W(R, x, M.TAI);
            f.push(y), c && (x !== r && E(r) && (P = W.leapSeconds, (C = p(P, y, N)) < 0 && (h = new U(y, x), P.splice(~C, 0, h))), r = x);
          }
        }
      } else e._dataError = "Error in loaded EOP data: The samples property is required.";
    } else e._dataError = "Error in loaded EOP data: The columnNames property is required.";
  }

  function O(e, n, a, s, t) {
    var o = a * s;
    t.xPoleWander = n[o + e._xPoleWanderRadiansColumn], t.yPoleWander = n[o + e._yPoleWanderRadiansColumn], t.xPoleOffset = n[o + e._xCelestialPoleOffsetRadiansColumn], t.yPoleOffset = n[o + e._yCelestialPoleOffsetRadiansColumn], t.ut1MinusUtc = n[o + e._ut1MinusUtcSecondsColumn];
  }

  function x(e, n, a) {
    return n + e * (a - n);
  }

  function _(e, n, a, s, t, o, l) {
    var i = e._columnCount;
    if (o > n.length - 1) return l.xPoleWander = 0, l.yPoleWander = 0, l.xPoleOffset = 0, l.yPoleOffset = 0, l.ut1MinusUtc = 0, l;
    var d = n[t],
        r = n[o];
    if (d.equals(r) || s.equals(d)) return O(e, a, t, i, l), l;
    if (s.equals(r)) return O(e, a, o, i, l), l;

    var u,
        f,
        c = W.secondsDifference(s, d) / W.secondsDifference(r, d),
        m = t * i,
        _ = o * i,
        P = a[m + e._ut1MinusUtcSecondsColumn],
        C = a[_ + e._ut1MinusUtcSecondsColumn],
        h = C - P;

    return !(.5 < h || h < -.5) || (u = a[m + e._taiMinusUtcSecondsColumn]) !== (f = a[_ + e._taiMinusUtcSecondsColumn]) && (r.equals(s) ? P = C : C -= f - u), l.xPoleWander = x(c, a[m + e._xPoleWanderRadiansColumn], a[_ + e._xPoleWanderRadiansColumn]), l.yPoleWander = x(c, a[m + e._yPoleWanderRadiansColumn], a[_ + e._yPoleWanderRadiansColumn]), l.xPoleOffset = x(c, a[m + e._xCelestialPoleOffsetRadiansColumn], a[_ + e._xCelestialPoleOffsetRadiansColumn]), l.yPoleOffset = x(c, a[m + e._yCelestialPoleOffsetRadiansColumn], a[_ + e._yCelestialPoleOffsetRadiansColumn]), l.ut1MinusUtc = x(c, P, C), l;
  }

  return n.NONE = e({
    getPromiseToLoad: function getPromiseToLoad() {
      return s();
    },
    compute: function compute(e, n) {
      return E(n) ? (n.xPoleWander = 0, n.yPoleWander = 0, n.xPoleOffset = 0, n.yPoleOffset = 0, n.ut1MinusUtc = 0) : n = new c(0, 0, 0, 0, 0), n;
    }
  }), n.prototype.getPromiseToLoad = function () {
    return s(this._downloadPromise);
  }, n.prototype.compute = function (e, n) {
    if (E(this._samples)) {
      if (E(n) || (n = new c(0, 0, 0, 0, 0)), 0 === this._samples.length) return n.xPoleWander = 0, n.yPoleWander = 0, n.xPoleOffset = 0, n.yPoleOffset = 0, n.ut1MinusUtc = 0, n;
      var a = this._dates,
          s = this._lastIndex,
          t = 0,
          o = 0;

      if (E(s)) {
        var l = a[s],
            i = a[s + 1],
            d = W.lessThanOrEquals(l, e),
            r = !E(i),
            u = r || W.greaterThanOrEquals(i, e);
        if (d && u) return t = s, !r && i.equals(e) && ++t, o = t + 1, _(this, a, this._samples, e, t, o, n), n;
      }

      var f = p(a, e, W.compare, this._dateColumn);
      return 0 <= f ? (f < a.length - 1 && a[f + 1].equals(e) && ++f, o = t = f) : (t = (o = ~f) - 1) < 0 && (t = 0), this._lastIndex = t, _(this, a, this._samples, e, t, o, n), n;
    }

    if (E(this._dataError)) throw new m(this._dataError);
  }, n;
});