"use strict";

define(["../Core/Cartesian3", "../Core/defined", "../Core/Math", "./SceneMode"], function (f, c, u, d) {
  "use strict";

  function e() {
    this.enabled = !0, this.density = 2e-4, this.screenSpaceErrorFactor = 2, this.minimumBrightness = .03;
  }

  for (var g = [359.393, 800.749, 1275.6501, 2151.1192, 3141.7763, 4777.5198, 6281.2493, 12364.307, 15900.765, 49889.0549, 78026.8259, 99260.7344, 120036.3873, 151011.0158, 156091.1953, 203849.3112, 274866.9803, 319916.3149, 493552.0528, 628733.5874], m = [2e-5, 2e-4, 1e-4, 7e-5, 5e-5, 4e-5, 3e-5, 19e-6, 1e-5, 85e-7, 62e-7, 58e-7, 53e-7, 52e-7, 51e-7, 42e-7, 4e-6, 34e-7, 26e-7, 22e-7], r = 0; r < m.length; ++r) {
    m[r] *= 1e6;
  }

  for (var l = m[1], p = m[m.length - 1], t = 0; t < m.length; ++t) {
    m[t] = (m[t] - p) / (l - p);
  }

  var C = 0;
  var v = new f();
  return e.prototype.update = function (e) {
    var r, t, i, n, o, s, a, h;
    (e.fog.enabled = this.enabled) && (t = (r = e.camera).positionCartographic, !c(t) || 8e5 < t.height || e.mode !== d.SCENE3D ? e.fog.enabled = !1 : (n = function (e) {
      var r,
          t = g,
          i = t.length;
      if (e < t[0]) return C = 0;
      if (t[i - 1] < e) return C = i - 2;

      if (t[C] <= e) {
        if (C + 1 < i && e < t[C + 1]) return C;
        if (C + 2 < i && e < t[C + 2]) return ++C;
      } else if (0 <= C - 1 && t[C - 1] <= e) return --C;

      for (r = 0; r < i - 2 && !(t[r] <= e && e < t[r + 1]); ++r) {
        ;
      }

      return C = r;
    }(i = t.height), o = u.clamp((i - g[n]) / (g[n + 1] - g[n]), 0, 1), a = (a = u.lerp(m[n], m[n + 1], o)) * ((s = 1e6 * this.density) - s / l * p) * 1e-6, h = f.normalize(r.positionWC, v), a *= 1 - Math.abs(f.dot(r.directionWC, h)), e.fog.density = a, e.fog.sse = this.screenSpaceErrorFactor, e.fog.minimumBrightness = this.minimumBrightness));
  }, e;
});