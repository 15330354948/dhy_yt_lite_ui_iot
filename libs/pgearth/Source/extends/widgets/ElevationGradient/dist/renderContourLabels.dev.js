"use strict";

define(["../support/lodash"], function (t) {
  var e = function e(_e) {
    return t.sortBy(_e)[Math.floor(_e.length / 2)];
  },
      o = .5 * Math.PI,
      n = !1,
      r = .25,
      l = function l(t, e) {
    return {
      x: t % e,
      y: Math.floor(t / e)
    };
  },
      a = function a(t, e) {
    return t.x + t.y * e;
  },
      s = function s(t, e, n) {
    var r = function r(o, _r) {
      var l = {
        x: n.x + o,
        y: n.y + _r
      };
      return t[a(l, e)];
    },
        l = Math.floor(.2 * e),
        s = r(l, 0) - r(-l, 0),
        i = r(0, l) - r(0, -l);

    return Math.atan2(i, s) + o;
  };

  return function (_ref) {
    var o = _ref.canvas,
        i = _ref.values,
        u = _ref.maskSamples,
        h = _ref.majorContour,
        x = _ref.minorContour,
        d = _ref.fontSize,
        f = _ref.formatLabel,
        c = _ref.shouldRenderContourLabel,
        y = _ref.textColor,
        M = _ref.textOutlineColor;
    var C = o.width,
        m = (e(i), Math.sqrt(i.length)),
        g = Math.round(e(i) / h) * h,
        S = i.map(function (t, e) {
      return {
        value: t,
        index: e
      };
    }).filter(function (t) {
      return function (_ref2) {
        var t = _ref2.x,
            e = _ref2.y;
        return t > m * r && t < m * (1 - r) && e > m * r && e < m * (1 - r);
      }(l(t.index, m));
    }),
        b = S.map(function (t) {
      return t.value;
    }),
        p = t.min(b),
        v = t.max(b);
    if (g < p || g > v || !c(g)) return o;
    var k = t.sortBy(S, function (t) {
      return Math.abs(t.value - g);
    })[0];
    if (Math.abs(k.value - g) > .5 * x) return o;
    var B = l(k.index, m),
        P = B.x * C / m,
        q = B.y * C / m,
        A = Math.sqrt(u.length),
        I = {
      x: Math.round(B.x * A / m),
      y: Math.round(B.y * A / m)
    };
    if (u[a(I, A)] < .9) return o;
    var L = s(i, m, B),
        R = o.getContext("2d");
    n && (R.strokeStyle = M.toCssColorString(), R.lineWidth = 1, R.strokeRect(1, 1, C - 1, C - 1));
    var T = f(g);
    return R.font = "bold ".concat(d, "px Arial"), R.textAlign = "center", R.textBaseline = "middle", R.translate(P, q), R.rotate(L), R.lineWidth = 3, R.strokeStyle = M.toCssColorString(), R.strokeText(T, 0, 0), R.fillStyle = y.toCssColorString(), R.fillText(T, 0, 0), n && (R.beginPath(), R.arc(0, 0, 3, 0, 2 * Math.PI, !1), R.fillStyle = "red", R.fill()), o;
  };
});