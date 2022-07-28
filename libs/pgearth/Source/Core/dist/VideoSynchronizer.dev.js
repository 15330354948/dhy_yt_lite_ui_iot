"use strict";

define(["./defaultValue", "./defined", "./defineProperties", "./destroyObject", "./Iso8601", "./JulianDate"], function (k, _, e, t, u, p) {
  "use strict";

  function i(e) {
    e = k(e, k.EMPTY_OBJECT), this._clock = void 0, this._element = void 0, this._clockSubscription = void 0, this._seekFunction = void 0, this._lastPlaybackRate = void 0, this.clock = e.clock, this.element = e.element, this.epoch = k(e.epoch, u.MINIMUM_VALUE), this.tolerance = k(e.tolerance, 1), this._seeking = !1, this._seekFunction = void 0, this._firstTickAfterSeek = !1;
  }

  return e(i.prototype, {
    clock: {
      get: function get() {
        return this._clock;
      },
      set: function set(e) {
        var t = this._clock;
        t !== e && (_(t) && (this._clockSubscription(), this._clockSubscription = void 0), _(e) && (this._clockSubscription = e.onTick.addEventListener(i.prototype._onTick, this)), this._clock = e);
      }
    },
    element: {
      get: function get() {
        return this._element;
      },
      set: function set(e) {
        var t,
            i = this._element;
        i !== e && (_(i) && i.removeEventListener("seeked", this._seekFunction, !1), _(e) && (this._seeking = !1, this._seekFunction = (t = this, function () {
          t._seeking = !1, t._firstTickAfterSeek = !0;
        }), e.addEventListener("seeked", this._seekFunction, !1)), this._element = e, this._seeking = !1, this._firstTickAfterSeek = !1);
      }
    }
  }), i.prototype.destroy = function () {
    return this.element = void 0, this.clock = void 0, t(this);
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype._trySetPlaybackRate = function (e) {
    if (this._lastPlaybackRate !== e.multiplier) {
      var t = this._element;

      try {
        t.playbackRate = e.multiplier;
      } catch (e) {
        t.playbackRate = 0;
      }

      this._lastPlaybackRate = e.multiplier;
    }
  }, i.prototype._onTick = function (e) {
    var t,
        i,
        s,
        n,
        c,
        o,
        r,
        h,
        a,
        l = this._element;
    !_(l) || l.readyState < 2 || (t = l.paused, (i = e.shouldAnimate) === t && (i ? l.play() : l.pause()), this._seeking || this._firstTickAfterSeek ? this._firstTickAfterSeek = !1 : (this._trySetPlaybackRate(e), s = e.currentTime, n = k(this.epoch, u.MINIMUM_VALUE), c = p.secondsDifference(s, n), o = l.duration, r = l.currentTime, h = l.loop ? ((c %= o) < 0 && (c = o - c), c) : o < c ? o : c < 0 ? 0 : c, a = i ? k(this.tolerance, 1) : .001, Math.abs(h - r) > a && (this._seeking = !0, l.currentTime = h)));
  }, i;
});