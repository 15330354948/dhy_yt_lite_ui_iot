"use strict";

define(["./ClockRange", "./ClockStep", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Event", "./getTimestamp", "./JulianDate"], function (h, l, n, o, t, c, r, a, u) {
  "use strict";

  function e(t) {
    var e = (t = n(t, n.EMPTY_OBJECT)).currentTime,
        i = t.startTime,
        s = t.stopTime,
        e = o(e) ? u.clone(e) : o(i) ? u.clone(i) : o(s) ? u.addDays(s, -1, new u()) : u.now(),
        i = o(i) ? u.clone(i) : u.clone(e),
        s = o(s) ? u.clone(s) : u.addDays(i, 1, new u());
    if (u.greaterThan(i, s)) throw new c("startTime must come before stopTime.");
    this.startTime = i, this.stopTime = s, this.clockRange = n(t.clockRange, h.UNBOUNDED), this.canAnimate = n(t.canAnimate, !0), this.onTick = new r(), this.onStop = new r(), this._currentTime = void 0, this._multiplier = void 0, this._clockStep = void 0, this._shouldAnimate = void 0, this._lastSystemTime = a(), this.currentTime = e, this.multiplier = n(t.multiplier, 1), this.shouldAnimate = n(t.shouldAnimate, !1), this.clockStep = n(t.clockStep, l.SYSTEM_CLOCK_MULTIPLIER);
  }

  return t(e.prototype, {
    currentTime: {
      get: function get() {
        return this._currentTime;
      },
      set: function set(t) {
        u.equals(this._currentTime, t) || (this._clockStep === l.SYSTEM_CLOCK && (this._clockStep = l.SYSTEM_CLOCK_MULTIPLIER), this._currentTime = t);
      }
    },
    multiplier: {
      get: function get() {
        return this._multiplier;
      },
      set: function set(t) {
        this._multiplier !== t && (this._clockStep === l.SYSTEM_CLOCK && (this._clockStep = l.SYSTEM_CLOCK_MULTIPLIER), this._multiplier = t);
      }
    },
    clockStep: {
      get: function get() {
        return this._clockStep;
      },
      set: function set(t) {
        t === l.SYSTEM_CLOCK && (this._multiplier = 1, this._shouldAnimate = !0, this._currentTime = u.now()), this._clockStep = t;
      }
    },
    shouldAnimate: {
      get: function get() {
        return this._shouldAnimate;
      },
      set: function set(t) {
        this._shouldAnimate !== t && (this._clockStep === l.SYSTEM_CLOCK && (this._clockStep = l.SYSTEM_CLOCK_MULTIPLIER), this._shouldAnimate = t);
      }
    }
  }), e.prototype.tick = function () {
    var t = a(),
        e = u.clone(this._currentTime);

    if (this.canAnimate && this._shouldAnimate) {
      var i = this._clockStep;
      if (i === l.SYSTEM_CLOCK) e = u.now(e);else {
        var s,
            n = this._multiplier;
        e = i === l.TICK_DEPENDENT ? u.addSeconds(e, n, e) : (s = t - this._lastSystemTime, u.addSeconds(e, n * (s / 1e3), e));
        var o = this.clockRange,
            c = this.startTime,
            r = this.stopTime;
        if (o === h.CLAMPED) u.lessThan(e, c) ? e = u.clone(c, e) : u.greaterThan(e, r) && (e = u.clone(r, e), this.onStop.raiseEvent(this));else if (o === h.LOOP_STOP) for (u.lessThan(e, c) && (e = u.clone(c, e)); u.greaterThan(e, r);) {
          e = u.addSeconds(c, u.secondsDifference(e, r), e), this.onStop.raiseEvent(this);
        }
      }
    }

    return this._currentTime = e, this._lastSystemTime = t, this.onTick.raiseEvent(this), e;
  }, e;
});