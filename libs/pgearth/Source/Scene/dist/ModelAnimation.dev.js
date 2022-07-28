"use strict";

define(["../Core/defaultValue", "../Core/defineProperties", "../Core/defined", "../Core/deprecationWarning", "../Core/Event", "../Core/JulianDate", "./ModelAnimationLoop", "./ModelAnimationState"], function (r, t, e, i, o, s, a, u) {
  "use strict";

  function n(t, e, i) {
    this._name = i.name, this._startTime = s.clone(t.startTime), this._delay = r(t.delay, 0), this._stopTime = t.stopTime, this.removeOnStop = r(t.removeOnStop, !1), this._multiplier = r(t.multiplier, 1), this._reverse = r(t.reverse, !1), this._loop = r(t.loop, a.NONE), this.start = new o(), this.update = new o(), this.stop = new o(), this._state = u.STOPPED, this._runtimeAnimation = i, this._computedStartTime = void 0, this._duration = void 0;
    var n = this;
    this._raiseStartEvent = function () {
      n.start.raiseEvent(e, n);
    }, this._updateEventTime = 0, this._raiseUpdateEvent = function () {
      n.update.raiseEvent(e, n, n._updateEventTime);
    }, this._raiseStopEvent = function () {
      n.stop.raiseEvent(e, n);
    };
  }

  return t(n.prototype, {
    name: {
      get: function get() {
        return this._name;
      }
    },
    startTime: {
      get: function get() {
        return this._startTime;
      }
    },
    delay: {
      get: function get() {
        return this._delay;
      }
    },
    stopTime: {
      get: function get() {
        return this._stopTime;
      }
    },
    multiplier: {
      get: function get() {
        return this._multiplier;
      }
    },
    reverse: {
      get: function get() {
        return this._reverse;
      }
    },
    loop: {
      get: function get() {
        return this._loop;
      }
    }
  }), n;
});