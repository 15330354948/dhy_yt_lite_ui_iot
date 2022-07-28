"use strict";

define(["../ThirdParty/when", "./Cartesian2", "./defined", "./DeveloperError", "./sampleTerrain"], function (v, e, p, c, d) {
  "use strict";

  var m = new e();
  return function s(h, f) {
    if (!p(h)) throw new c("terrainProvider is required.");
    if (!p(f)) throw new c("positions is required.");
    return h.readyPromise.then(function () {
      var e = [],
          t = [],
          n = h.availability;
      if (!p(n)) throw new c("sampleTerrainMostDetailed requires a terrain provider that has tile availability.");

      for (var i = [], r = 0; r < f.length; ++r) {
        var a,
            o = f[r],
            u = n.computeMaximumLevelAtPosition(o);
        0 === (t[r] = u) && (h.tilingScheme.positionToTileXY(o, 1, m), a = h.loadTileDataAvailability(m.x, m.y, 1), p(a) && i.push(a));
        var l = e[u];
        p(l) || (e[u] = l = []), l.push(o);
      }

      return v.all(i).then(function () {
        return v.all(e.map(function (e, i) {
          if (p(e)) return d(h, i, e);
        }));
      }).then(function () {
        for (var e = [], i = 0; i < f.length; ++i) {
          var r = f[i];
          n.computeMaximumLevelAtPosition(r) !== t[i] && e.push(r);
        }

        if (0 < e.length) return s(h, e);
      }).then(function () {
        return f;
      });
    });
  };
});