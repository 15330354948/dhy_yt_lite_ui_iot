"use strict";

define(["../../Core/binarySearch", "../../Core/ClockRange", "../../Core/ClockStep", "../../Core/defined", "../../Core/defineProperties", "../../Core/DeveloperError", "../../Core/JulianDate", "../../ThirdParty/knockout", "../../ThirdParty/sprintf", "../createCommand", "../ToggleButtonViewModel"], function (r, u, s, c, e, h, d, n, o, l, m) {
  "use strict";

  var a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      g = 15,
      p = 105;

  function f(e, t) {
    return e - t;
  }

  function _(e, t) {
    var i = r(t, e, f);
    return i < 0 ? ~i : i;
  }

  function M(e) {
    if (!c(e)) throw new h("clockViewModel is required.");
    var a = this;
    this._clockViewModel = e, this._allShuttleRingTicks = [], this._dateFormatter = M.defaultDateFormatter, this._timeFormatter = M.defaultTimeFormatter, this.shuttleRingDragging = !1, this.snapToTicks = !1, n.track(this, ["_allShuttleRingTicks", "_dateFormatter", "_timeFormatter", "shuttleRingDragging", "snapToTicks"]), this._sortedFilteredPositiveTicks = [], this.setShuttleRingTicks(M.defaultTicks), this.timeLabel = void 0, n.defineProperty(this, "timeLabel", function () {
      return a._timeFormatter(a._clockViewModel.currentTime, a);
    }), this.dateLabel = void 0, n.defineProperty(this, "dateLabel", function () {
      return a._dateFormatter(a._clockViewModel.currentTime, a);
    }), this.multiplierLabel = void 0, n.defineProperty(this, "multiplierLabel", function () {
      var e = a._clockViewModel;
      if (e.clockStep === s.SYSTEM_CLOCK) return "Today";
      var t = e.multiplier;
      return t % 1 == 0 ? t.toFixed(0) + "x" : t.toFixed(3).replace(/0{0,3}$/, "") + "x";
    }), this.shuttleRingAngle = void 0, n.defineProperty(this, "shuttleRingAngle", {
      get: function get() {
        return function (e, t, i) {
          if (i.clockStep === s.SYSTEM_CLOCK) return g;
          if (Math.abs(e) <= 1) return e * g;
          var r = t[t.length - 1];
          r < e ? e = r : e < -r && (e = -r);
          var o,
              n = g,
              l = p;
          return 0 < e ? (o = Math.log(r) / (l - n), Math.log(e) / o + n) : (o = Math.log(-t[0]) / (l - n), -(Math.log(Math.abs(e)) / o + n));
        }(e.multiplier, a._allShuttleRingTicks, e);
      },
      set: function set(e) {
        e = Math.max(Math.min(e, p), -p);
        var t,
            i,
            r,
            o,
            n = a._allShuttleRingTicks,
            l = a._clockViewModel;
        l.clockStep = s.SYSTEM_CLOCK_MULTIPLIER, Math.abs(e) !== p ? (o = function (e, t) {
          if (Math.abs(e) <= g) return e / g;
          var i,
              r = g,
              o = p;
          return 0 < e ? (i = Math.log(t[t.length - 1]) / (o - r), Math.exp(0 + i * (e - r))) : (i = Math.log(-t[0]) / (o - r), -Math.exp(0 + i * (Math.abs(e) - r)));
        }(e, n), a.snapToTicks ? o = n[_(o, n)] : 0 !== o && (100 < (t = Math.abs(o)) ? (i = t.toFixed(0).length - 2, r = Math.pow(10, i), o = Math.round(o / r) * r | 0) : g < t ? o = Math.round(o) : 1 < t ? o = +o.toFixed(1) : 0 < t && (o = +o.toFixed(2))), l.multiplier = o) : l.multiplier = 0 < e ? n[n.length - 1] : n[0];
      }
    }), this._canAnimate = void 0, n.defineProperty(this, "_canAnimate", function () {
      var e = a._clockViewModel,
          t = e.clockRange;
      if (a.shuttleRingDragging || t === u.UNBOUNDED) return !0;
      var i,
          r = e.multiplier,
          o = e.currentTime,
          n = e.startTime,
          l = !1;
      return (l = t === u.LOOP_STOP ? d.greaterThan(o, n) || o.equals(n) && 0 < r : (i = e.stopTime, d.greaterThan(o, n) && d.lessThan(o, i) || o.equals(n) && 0 < r || o.equals(i) && r < 0)) || (e.shouldAnimate = !1), l;
    }), this._isSystemTimeAvailable = void 0, n.defineProperty(this, "_isSystemTimeAvailable", function () {
      var e = a._clockViewModel;
      if (e.clockRange === u.UNBOUNDED) return !0;
      var t = e.systemTime;
      return d.greaterThanOrEquals(t, e.startTime) && d.lessThanOrEquals(t, e.stopTime);
    }), this._isAnimating = void 0, n.defineProperty(this, "_isAnimating", function () {
      return a._clockViewModel.shouldAnimate && (a._canAnimate || a.shuttleRingDragging);
    });
    var t = l(function () {
      var e = a._clockViewModel;
      e.shouldAnimate ? e.shouldAnimate = !1 : a._canAnimate && (e.shouldAnimate = !0);
    });
    this._pauseViewModel = new m(t, {
      toggled: n.computed(function () {
        return !a._isAnimating;
      }),
      tooltip: "Pause"
    });
    var i = l(function () {
      var e = a._clockViewModel,
          t = e.multiplier;
      0 < t && (e.multiplier = -t), e.shouldAnimate = !0;
    });
    this._playReverseViewModel = new m(i, {
      toggled: n.computed(function () {
        return a._isAnimating && e.multiplier < 0;
      }),
      tooltip: "Play Reverse"
    });
    var r = l(function () {
      var e = a._clockViewModel,
          t = e.multiplier;
      t < 0 && (e.multiplier = -t), e.shouldAnimate = !0;
    });
    this._playForwardViewModel = new m(r, {
      toggled: n.computed(function () {
        return a._isAnimating && 0 < e.multiplier && e.clockStep !== s.SYSTEM_CLOCK;
      }),
      tooltip: "Play Forward"
    });
    var o = l(function () {
      a._clockViewModel.clockStep = s.SYSTEM_CLOCK;
    }, n.getObservable(this, "_isSystemTimeAvailable"));
    this._playRealtimeViewModel = new m(o, {
      toggled: n.computed(function () {
        return e.clockStep === s.SYSTEM_CLOCK;
      }),
      tooltip: n.computed(function () {
        return a._isSystemTimeAvailable ? "Today (real-time)" : "Current time not in range";
      })
    }), this._slower = l(function () {
      var e = a._clockViewModel,
          t = a._allShuttleRingTicks,
          i = _(e.multiplier, t) - 1;
      0 <= i && (e.multiplier = t[i]);
    }), this._faster = l(function () {
      var e = a._clockViewModel,
          t = a._allShuttleRingTicks,
          i = _(e.multiplier, t) + 1;
      i < t.length && (e.multiplier = t[i]);
    });
  }

  return M.defaultDateFormatter = function (e, t) {
    var i = d.toGregorianDate(e);
    return a[i.month - 1] + " " + i.day + " " + i.year;
  }, M.defaultTicks = [.001, .002, .005, .01, .02, .05, .1, .25, .5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 14400, 21600, 43200, 86400, 172800, 345600, 604800], M.defaultTimeFormatter = function (e, t) {
    var i = d.toGregorianDate(e),
        r = Math.round(i.millisecond);
    return Math.abs(t._clockViewModel.multiplier) < 1 ? o("%02d:%02d:%02d.%03d", i.hour, i.minute, i.second, r) : o("%02d:%02d:%02d UTC", i.hour, i.minute, i.second);
  }, M.prototype.getShuttleRingTicks = function () {
    return this._sortedFilteredPositiveTicks.slice(0);
  }, M.prototype.setShuttleRingTicks = function (e) {
    if (!c(e)) throw new h("positiveTicks is required.");
    var t,
        i = {},
        r = this._sortedFilteredPositiveTicks;

    for (l = r.length = 0, o = e.length; l < o; ++l) {
      t = e[l], i.hasOwnProperty(t) || (i[t] = !0, r.push(t));
    }

    r.sort(f);

    for (var o, n = [], l = (o = r.length) - 1; 0 <= l; --l) {
      0 !== (t = r[l]) && n.push(-t);
    }

    Array.prototype.push.apply(n, r), this._allShuttleRingTicks = n;
  }, e(M.prototype, {
    slower: {
      get: function get() {
        return this._slower;
      }
    },
    faster: {
      get: function get() {
        return this._faster;
      }
    },
    clockViewModel: {
      get: function get() {
        return this._clockViewModel;
      }
    },
    pauseViewModel: {
      get: function get() {
        return this._pauseViewModel;
      }
    },
    playReverseViewModel: {
      get: function get() {
        return this._playReverseViewModel;
      }
    },
    playForwardViewModel: {
      get: function get() {
        return this._playForwardViewModel;
      }
    },
    playRealtimeViewModel: {
      get: function get() {
        return this._playRealtimeViewModel;
      }
    },
    dateFormatter: {
      get: function get() {
        return this._dateFormatter;
      },
      set: function set(e) {
        if ("function" != typeof e) throw new h("dateFormatter must be a function");
        this._dateFormatter = e;
      }
    },
    timeFormatter: {
      get: function get() {
        return this._timeFormatter;
      },
      set: function set(e) {
        if ("function" != typeof e) throw new h("timeFormatter must be a function");
        this._timeFormatter = e;
      }
    }
  }), M._maxShuttleRingAngle = p, M._realtimeShuttleRingAngle = g, M;
});