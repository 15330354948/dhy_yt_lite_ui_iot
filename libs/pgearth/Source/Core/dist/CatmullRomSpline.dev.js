"use strict";

define(["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./HermiteSpline", "./Matrix4", "./Spline"], function (y, t, l, s, f, e, h, g, n) {
  "use strict";

  var d = new t(),
      T = new y(),
      B = new y();
  var u = new y(),
      o = new y();

  function _(t) {
    var e,
        n = (t = s(t, s.EMPTY_OBJECT)).points,
        i = t.times,
        a = t.firstTangent,
        r = t.lastTangent;
    l.defined("points", n), l.defined("times", i), l.typeOf.number.greaterThanOrEquals("points.length", n.length, 2), l.typeOf.number.equals("times.length", "points.length", i.length, n.length), 2 < n.length && (f(a) || (a = u, y.multiplyByScalar(n[1], 2, a), y.subtract(a, n[2], a), y.subtract(a, n[0], a), y.multiplyByScalar(a, .5, a)), f(r) || (e = n.length - 1, r = o, y.multiplyByScalar(n[e - 1], 2, r), y.subtract(n[e], r, r), y.add(r, n[e - 2], r), y.multiplyByScalar(r, .5, r))), this._times = i, this._points = n, this._firstTangent = y.clone(a), this._lastTangent = y.clone(r), this._evaluateFunction = function (p) {
      var c = p.points,
          m = p.times;

      if (c.length < 3) {
        var i = m[0],
            a = 1 / (m[1] - i),
            r = c[0],
            l = c[1];
        return function (t, e) {
          f(e) || (e = new y());
          var n = (t - i) * a;
          return y.lerp(r, l, n, e);
        };
      }

      return function (t, e) {
        f(e) || (e = new y());
        var n,
            i,
            a,
            r,
            l,
            s = p._lastTimeIndex = p.findTimeInterval(t, p._lastTimeIndex),
            u = (t - m[s]) / (m[s + 1] - m[s]),
            o = d;
        return o.z = u, o.y = u * u, o.x = o.y * u, o.w = 1, l = 0 === s ? (n = c[0], i = c[1], a = p.firstTangent, r = y.subtract(c[2], n, T), y.multiplyByScalar(r, .5, r), g.multiplyByVector(h.hermiteCoefficientMatrix, o, o)) : s === c.length - 2 ? (n = c[s], i = c[s + 1], r = p.lastTangent, a = y.subtract(i, c[s - 1], T), y.multiplyByScalar(a, .5, a), g.multiplyByVector(h.hermiteCoefficientMatrix, o, o)) : (n = c[s - 1], i = c[s], a = c[s + 1], r = c[s + 2], g.multiplyByVector(_.catmullRomCoefficientMatrix, o, o)), e = y.multiplyByScalar(n, l.x, e), y.multiplyByScalar(i, l.y, B), y.add(e, B, e), y.multiplyByScalar(a, l.z, B), y.add(e, B, e), y.multiplyByScalar(r, l.w, B), y.add(e, B, e);
      };
    }(this), this._lastTimeIndex = 0;
  }

  return e(_.prototype, {
    times: {
      get: function get() {
        return this._times;
      }
    },
    points: {
      get: function get() {
        return this._points;
      }
    },
    firstTangent: {
      get: function get() {
        return this._firstTangent;
      }
    },
    lastTangent: {
      get: function get() {
        return this._lastTangent;
      }
    }
  }), _.catmullRomCoefficientMatrix = new g(-.5, 1, -.5, 0, 1.5, -2.5, 0, 1, -1.5, 2, .5, 0, .5, -.5, 0, 0), _.prototype.findTimeInterval = n.prototype.findTimeInterval, _.prototype.wrapTime = n.prototype.wrapTime, _.prototype.clampTime = n.prototype.clampTime, _.prototype.evaluate = function (t, e) {
    return this._evaluateFunction(t, e);
  }, _;
});