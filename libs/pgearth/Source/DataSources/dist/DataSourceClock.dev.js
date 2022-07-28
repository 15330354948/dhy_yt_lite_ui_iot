"use strict";

define(["../Core/Clock", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/JulianDate", "./createRawPropertyDescriptor"], function (e, i, r, t, o, c, s, n) {
  "use strict";

  function l() {
    this._startTime = void 0, this._stopTime = void 0, this._currentTime = void 0, this._clockRange = void 0, this._clockStep = void 0, this._multiplier = void 0, this._definitionChanged = new c();
  }

  return t(l.prototype, {
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    startTime: n("startTime"),
    stopTime: n("stopTime"),
    currentTime: n("currentTime"),
    clockRange: n("clockRange"),
    clockStep: n("clockStep"),
    multiplier: n("multiplier")
  }), l.prototype.clone = function (t) {
    return r(t) || (t = new l()), t.startTime = this.startTime, t.stopTime = this.stopTime, t.currentTime = this.currentTime, t.clockRange = this.clockRange, t.clockStep = this.clockStep, t.multiplier = this.multiplier, t;
  }, l.prototype.equals = function (t) {
    return this === t || r(t) && s.equals(this.startTime, t.startTime) && s.equals(this.stopTime, t.stopTime) && s.equals(this.currentTime, t.currentTime) && this.clockRange === t.clockRange && this.clockStep === t.clockStep && this.multiplier === t.multiplier;
  }, l.prototype.merge = function (t) {
    if (!r(t)) throw new o("source is required.");
    this.startTime = i(this.startTime, t.startTime), this.stopTime = i(this.stopTime, t.stopTime), this.currentTime = i(this.currentTime, t.currentTime), this.clockRange = i(this.clockRange, t.clockRange), this.clockStep = i(this.clockStep, t.clockStep), this.multiplier = i(this.multiplier, t.multiplier);
  }, l.prototype.getValue = function (t) {
    return r(t) || (t = new e()), t.startTime = i(this.startTime, t.startTime), t.stopTime = i(this.stopTime, t.stopTime), t.currentTime = i(this.currentTime, t.currentTime), t.clockRange = i(this.clockRange, t.clockRange), t.multiplier = i(this.multiplier, t.multiplier), t.clockStep = i(this.clockStep, t.clockStep), t;
  }, l;
});