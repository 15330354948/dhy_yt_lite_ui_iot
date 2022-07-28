"use strict";

define(["./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Spline"], function (n, r, a, t, s, e) {
  "use strict";

  function i(t) {
    var e = (t = r(t, r.EMPTY_OBJECT)).weights,
        i = t.times;
    if (n.defined("weights", e), n.defined("times", i), n.typeOf.number.greaterThanOrEquals("weights.length", e.length, 3), e.length % i.length != 0) throw new s("times.length must be a factor of weights.length.");
    this._times = i, this._weights = e, this._count = e.length / i.length, this._lastTimeIndex = 0;
  }

  return t(i.prototype, {
    times: {
      get: function get() {
        return this._times;
      }
    },
    weights: {
      get: function get() {
        return this._weights;
      }
    }
  }), i.prototype.findTimeInterval = e.prototype.findTimeInterval, i.prototype.wrapTime = e.prototype.wrapTime, i.prototype.clampTime = e.prototype.clampTime, i.prototype.evaluate = function (t, e) {
    var i = this.weights,
        n = this.times,
        r = this._lastTimeIndex = this.findTimeInterval(t, this._lastTimeIndex),
        s = (t - n[r]) / (n[r + 1] - n[r]);
    a(e) || (e = new Array(this._count));

    for (var h = 0; h < this._count; h++) {
      var o = r * this._count + h;
      e[h] = i[o] * (1 - s) + i[o + this._count] * s;
    }

    return e;
  }, i;
});