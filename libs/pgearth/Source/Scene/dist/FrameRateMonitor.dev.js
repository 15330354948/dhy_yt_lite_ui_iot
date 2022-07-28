"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Event", "../Core/getTimestamp", "../Core/TimeConstants"], function (r, m, e, i, a, o, s, d) {
  "use strict";

  function u(e) {
    if (!m(e) || !m(e.scene)) throw new a("options.scene is required.");
    this._scene = e.scene, this.samplingWindow = r(e.samplingWindow, u.defaultSettings.samplingWindow), this.quietPeriod = r(e.quietPeriod, u.defaultSettings.quietPeriod), this.warmupPeriod = r(e.warmupPeriod, u.defaultSettings.warmupPeriod), this.minimumFrameRateDuringWarmup = r(e.minimumFrameRateDuringWarmup, u.defaultSettings.minimumFrameRateDuringWarmup), this.minimumFrameRateAfterWarmup = r(e.minimumFrameRateAfterWarmup, u.defaultSettings.minimumFrameRateAfterWarmup), this._lowFrameRate = new o(), this._nominalFrameRate = new o(), this._frameTimes = [], this._needsQuietPeriod = !0, this._quietPeriodEndTime = 0, this._warmupPeriodEndTime = 0, this._frameRateIsLow = !1, this._lastFramesPerSecond = void 0, this._pauseCount = 0;
    var t = this;
    this._preUpdateRemoveListener = this._scene.preUpdate.addEventListener(function (e, i) {
      !function (e) {
        if (0 < e._pauseCount) return;
        var i = s();
        if (e._needsQuietPeriod) e._needsQuietPeriod = !1, e._frameTimes.length = 0, e._quietPeriodEndTime = i + e.quietPeriod / d.SECONDS_PER_MILLISECOND, e._warmupPeriodEndTime = e._quietPeriodEndTime + (e.warmupPeriod + e.samplingWindow) / d.SECONDS_PER_MILLISECOND;else if (i >= e._quietPeriodEndTime) {
          e._frameTimes.push(i);

          var t = i - e.samplingWindow / d.SECONDS_PER_MILLISECOND;

          if (2 <= e._frameTimes.length && e._frameTimes[0] <= t) {
            for (; 2 <= e._frameTimes.length && e._frameTimes[1] < t;) {
              e._frameTimes.shift();
            }

            var n = (i - e._frameTimes[0]) / (e._frameTimes.length - 1);
            e._lastFramesPerSecond = 1e3 / n, 1e3 / (i > e._warmupPeriodEndTime ? e.minimumFrameRateAfterWarmup : e.minimumFrameRateDuringWarmup) < n ? e._frameRateIsLow || (e._frameRateIsLow = !0, e._needsQuietPeriod = !0, e.lowFrameRate.raiseEvent(e.scene, e._lastFramesPerSecond)) : e._frameRateIsLow && (e._frameRateIsLow = !1, e._needsQuietPeriod = !0, e.nominalFrameRate.raiseEvent(e.scene, e._lastFramesPerSecond));
          }
        }
      }(t);
    }), this._hiddenPropertyName = void 0 !== document.hidden ? "hidden" : void 0 !== document.mozHidden ? "mozHidden" : void 0 !== document.msHidden ? "msHidden" : void 0 !== document.webkitHidden ? "webkitHidden" : void 0;
    var i = void 0 !== document.hidden ? "visibilitychange" : void 0 !== document.mozHidden ? "mozvisibilitychange" : void 0 !== document.msHidden ? "msvisibilitychange" : void 0 !== document.webkitHidden ? "webkitvisibilitychange" : void 0;

    function n() {
      var e;
      e = t, document[e._hiddenPropertyName] ? e.pause() : e.unpause();
    }

    this._visibilityChangeRemoveListener = void 0, m(i) && (document.addEventListener(i, n, !1), this._visibilityChangeRemoveListener = function () {
      document.removeEventListener(i, n, !1);
    });
  }

  return u.defaultSettings = {
    samplingWindow: 5,
    quietPeriod: 2,
    warmupPeriod: 5,
    minimumFrameRateDuringWarmup: 4,
    minimumFrameRateAfterWarmup: 8
  }, u.fromScene = function (e) {
    if (!m(e)) throw new a("scene is required.");
    return m(e._frameRateMonitor) && !e._frameRateMonitor.isDestroyed() || (e._frameRateMonitor = new u({
      scene: e
    })), e._frameRateMonitor;
  }, e(u.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    lowFrameRate: {
      get: function get() {
        return this._lowFrameRate;
      }
    },
    nominalFrameRate: {
      get: function get() {
        return this._nominalFrameRate;
      }
    },
    lastFramesPerSecond: {
      get: function get() {
        return this._lastFramesPerSecond;
      }
    }
  }), u.prototype.pause = function () {
    ++this._pauseCount, 1 === this._pauseCount && (this._frameTimes.length = 0, this._lastFramesPerSecond = void 0);
  }, u.prototype.unpause = function () {
    --this._pauseCount, this._pauseCount <= 0 && (this._pauseCount = 0, this._needsQuietPeriod = !0);
  }, u.prototype.isDestroyed = function () {
    return !1;
  }, u.prototype.destroy = function () {
    return this._preUpdateRemoveListener(), m(this._visibilityChangeRemoveListener) && this._visibilityChangeRemoveListener(), i(this);
  }, u;
});