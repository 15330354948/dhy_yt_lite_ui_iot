"use strict";

define(["../Core/Clock", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/EventHelper", "../Core/JulianDate", "../ThirdParty/knockout"], function (e, i, t, s, n, r, o) {
  "use strict";

  function c(t) {
    i(t) || (t = new e()), this._clock = t, this._eventHelper = new n(), this._eventHelper.add(t.onTick, this.synchronize, this), this.systemTime = o.observable(r.now()), this.systemTime.equalityComparer = r.equals, this.startTime = o.observable(t.startTime), this.startTime.equalityComparer = r.equals, this.startTime.subscribe(function (e) {
      t.startTime = e, this.synchronize();
    }, this), this.stopTime = o.observable(t.stopTime), this.stopTime.equalityComparer = r.equals, this.stopTime.subscribe(function (e) {
      t.stopTime = e, this.synchronize();
    }, this), this.currentTime = o.observable(t.currentTime), this.currentTime.equalityComparer = r.equals, this.currentTime.subscribe(function (e) {
      t.currentTime = e, this.synchronize();
    }, this), this.multiplier = o.observable(t.multiplier), this.multiplier.subscribe(function (e) {
      t.multiplier = e, this.synchronize();
    }, this), this.clockStep = o.observable(t.clockStep), this.clockStep.subscribe(function (e) {
      t.clockStep = e, this.synchronize();
    }, this), this.clockRange = o.observable(t.clockRange), this.clockRange.subscribe(function (e) {
      t.clockRange = e, this.synchronize();
    }, this), this.canAnimate = o.observable(t.canAnimate), this.canAnimate.subscribe(function (e) {
      t.canAnimate = e, this.synchronize();
    }, this), this.shouldAnimate = o.observable(t.shouldAnimate), this.shouldAnimate.subscribe(function (e) {
      t.shouldAnimate = e, this.synchronize();
    }, this), o.track(this, ["systemTime", "startTime", "stopTime", "currentTime", "multiplier", "clockStep", "clockRange", "canAnimate", "shouldAnimate"]);
  }

  return t(c.prototype, {
    clock: {
      get: function get() {
        return this._clock;
      }
    }
  }), c.prototype.synchronize = function () {
    var e = this._clock;
    this.systemTime = r.now(), this.startTime = e.startTime, this.stopTime = e.stopTime, this.currentTime = e.currentTime, this.multiplier = e.multiplier, this.clockStep = e.clockStep, this.clockRange = e.clockRange, this.canAnimate = e.canAnimate, this.shouldAnimate = e.shouldAnimate;
  }, c.prototype.isDestroyed = function () {
    return !1;
  }, c.prototype.destroy = function () {
    this._eventHelper.removeAll(), s(this);
  }, c;
});