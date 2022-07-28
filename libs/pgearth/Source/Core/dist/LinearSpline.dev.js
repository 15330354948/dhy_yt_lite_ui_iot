"use strict";

define(["./Cartesian3", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Spline"], function (s, n, p, t, r, e) {
  "use strict";

  function i(t) {
    var e = (t = n(t, n.EMPTY_OBJECT)).points,
        i = t.times;
    if (!p(e) || !p(i)) throw new r("points and times are required.");
    if (e.length < 2) throw new r("points.length must be greater than or equal to 2.");
    if (i.length !== e.length) throw new r("times.length must be equal to points.length.");
    this._times = i, this._points = e, this._lastTimeIndex = 0;
  }

  return t(i.prototype, {
    times: {
      get: function get() {
        return this._times;
      }
    },
    points: {
      get: function get() {
        return this._points;
      }
    }
  }), i.prototype.findTimeInterval = e.prototype.findTimeInterval, i.prototype.wrapTime = e.prototype.wrapTime, i.prototype.clampTime = e.prototype.clampTime, i.prototype.evaluate = function (t, e) {
    var i = this.points,
        n = this.times,
        r = this._lastTimeIndex = this.findTimeInterval(t, this._lastTimeIndex),
        o = (t - n[r]) / (n[r + 1] - n[r]);
    return p(e) || (e = new s()), s.lerp(i[r], i[r + 1], o, e);
  }, i;
});