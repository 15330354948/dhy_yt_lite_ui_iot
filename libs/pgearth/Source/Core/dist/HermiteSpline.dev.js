"use strict";

define(["./Cartesian3", "./Cartesian4", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./LinearSpline", "./Matrix4", "./Spline", "./TridiagonalSystemSolver"], function (g, t, l, u, e, o, h, p, n, m) {
  "use strict";

  var w = [],
      c = [],
      T = [],
      f = [];

  function y(t) {
    var e = (t = l(t, l.EMPTY_OBJECT)).points,
        n = t.times,
        i = t.inTangents,
        r = t.outTangents;
    if (!(u(e) && u(n) && u(i) && u(r))) throw new o("times, points, inTangents, and outTangents are required.");
    if (e.length < 2) throw new o("points.length must be greater than or equal to 2.");
    if (n.length !== e.length) throw new o("times.length must be equal to points.length.");
    if (i.length !== r.length || i.length !== e.length - 1) throw new o("inTangents and outTangents must have a length equal to points.length - 1.");
    this._times = n, this._points = e, this._inTangents = i, this._outTangents = r, this._lastTimeIndex = 0;
  }

  e(y.prototype, {
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
    inTangents: {
      get: function get() {
        return this._inTangents;
      }
    },
    outTangents: {
      get: function get() {
        return this._outTangents;
      }
    }
  }), y.createC1 = function (t) {
    var e = (t = l(t, l.EMPTY_OBJECT)).times,
        n = t.points,
        i = t.tangents;
    if (!u(n) || !u(e) || !u(i)) throw new o("points, times and tangents are required.");
    if (n.length < 2) throw new o("points.length must be greater than or equal to 2.");
    if (e.length !== n.length || e.length !== i.length) throw new o("times, points and tangents must have the same length.");
    var r = i.slice(0, i.length - 1);
    return new y({
      times: e,
      points: n,
      inTangents: i.slice(1, i.length),
      outTangents: r
    });
  }, y.createNaturalCubic = function (t) {
    var e = (t = l(t, l.EMPTY_OBJECT)).times,
        n = t.points;
    if (!u(n) || !u(e)) throw new o("points and times are required.");
    if (n.length < 2) throw new o("points.length must be greater than or equal to 2.");
    if (e.length !== n.length) throw new o("times.length must be equal to points.length.");
    if (n.length < 3) return new h({
      points: n,
      times: e
    });

    var i = function (t) {
      var e,
          n = w,
          i = T,
          r = c,
          a = f;
      n.length = i.length = t.length - 1, r.length = a.length = t.length, n[0] = i[0] = 1, r[0] = 2;
      var s = a[0];

      for (u(s) || (s = a[0] = new g()), g.subtract(t[1], t[0], s), g.multiplyByScalar(s, 3, s), e = 1; e < n.length; ++e) {
        n[e] = i[e] = 1, r[e] = 4, s = a[e], u(s) || (s = a[e] = new g()), g.subtract(t[e + 1], t[e - 1], s), g.multiplyByScalar(s, 3, s);
      }

      return r[e] = 2, s = a[e], u(s) || (s = a[e] = new g()), g.subtract(t[e], t[e - 1], s), g.multiplyByScalar(s, 3, s), m.solve(n, r, i, a);
    }(n),
        r = i.slice(0, i.length - 1);

    return new y({
      times: e,
      points: n,
      inTangents: i.slice(1, i.length),
      outTangents: r
    });
  }, y.createClampedCubic = function (t) {
    var e = (t = l(t, l.EMPTY_OBJECT)).times,
        n = t.points,
        i = t.firstTangent,
        r = t.lastTangent;
    if (!(u(n) && u(e) && u(i) && u(r))) throw new o("points, times, firstTangent and lastTangent are required.");
    if (n.length < 2) throw new o("points.length must be greater than or equal to 2.");
    if (e.length !== n.length) throw new o("times.length must be equal to points.length.");
    if (n.length < 3) return new h({
      points: n,
      times: e
    });

    var a = function (t, e, n) {
      var i,
          r = w,
          a = T,
          s = c,
          l = f;
      r.length = a.length = t.length - 1, s.length = l.length = t.length, r[0] = s[0] = 1;
      var o = l[a[0] = 0];

      for (u(o) || (o = l[0] = new g()), g.clone(e, o), i = 1; i < r.length - 1; ++i) {
        r[i] = a[i] = 1, s[i] = 4, o = l[i], u(o) || (o = l[i] = new g()), g.subtract(t[i + 1], t[i - 1], o), g.multiplyByScalar(o, 3, o);
      }

      return r[i] = 0, a[i] = 1, s[i] = 4, o = l[i], u(o) || (o = l[i] = new g()), g.subtract(t[i + 1], t[i - 1], o), g.multiplyByScalar(o, 3, o), o = l[i + (s[i + 1] = 1)], u(o) || (o = l[i + 1] = new g()), g.clone(n, o), m.solve(r, s, a, l);
    }(n, i, r),
        s = a.slice(0, a.length - 1);

    return new y({
      times: e,
      points: n,
      inTangents: a.slice(1, a.length),
      outTangents: s
    });
  }, y.hermiteCoefficientMatrix = new p(2, -3, 0, 1, -2, 3, 0, 0, 1, -2, 1, 0, 1, -1, 0, 0), y.prototype.findTimeInterval = n.prototype.findTimeInterval;
  var d = new t(),
      v = new g();
  return y.prototype.wrapTime = n.prototype.wrapTime, y.prototype.clampTime = n.prototype.clampTime, y.prototype.evaluate = function (t, e) {
    u(e) || (e = new g());
    var n = this.points,
        i = this.times,
        r = this.inTangents,
        a = this.outTangents,
        s = this._lastTimeIndex = this.findTimeInterval(t, this._lastTimeIndex),
        l = (t - i[s]) / (i[s + 1] - i[s]),
        o = d;
    o.z = l, o.y = l * l, o.x = o.y * l, o.w = 1;
    var h = p.multiplyByVector(y.hermiteCoefficientMatrix, o, o);
    return e = g.multiplyByScalar(n[s], h.x, e), g.multiplyByScalar(n[s + 1], h.y, v), g.add(e, v, e), g.multiplyByScalar(a[s], h.z, v), g.add(e, v, e), g.multiplyByScalar(r[s], h.w, v), g.add(e, v, e);
  }, y;
});