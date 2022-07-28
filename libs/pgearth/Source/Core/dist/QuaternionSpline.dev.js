"use strict";

define(["./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Quaternion", "./Spline"], function (i, u, t, r, l, e) {
  "use strict";

  function n(t) {
    var p,
        s,
        a,
        e = (t = i(t, i.EMPTY_OBJECT)).points,
        n = t.times;
    if (!u(e) || !u(n)) throw new r("points and times are required.");
    if (e.length < 2) throw new r("points.length must be greater than or equal to 2.");
    if (n.length !== e.length) throw new r("times.length must be equal to points.length.");
    this._times = n, this._points = e, this._evaluateFunction = (s = (p = this).points, a = p.times, function (t, e) {
      u(e) || (e = new l());
      var n = p._lastTimeIndex = p.findTimeInterval(t, p._lastTimeIndex),
          i = (t - a[n]) / (a[n + 1] - a[n]),
          r = s[n],
          o = s[n + 1];
      return l.fastSlerp(r, o, i, e);
    }), this._lastTimeIndex = 0;
  }

  return t(n.prototype, {
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
  }), n.prototype.findTimeInterval = e.prototype.findTimeInterval, n.prototype.wrapTime = e.prototype.wrapTime, n.prototype.clampTime = e.prototype.clampTime, n.prototype.evaluate = function (t, e) {
    return this._evaluateFunction(t, e);
  }, n;
});