"use strict";

define(["../ThirdParty/when", "./Check"], function (c, r) {
  "use strict";

  return function (e, t, n) {
    return r.typeOf.object("terrainProvider", e), r.typeOf.number("level", t), r.defined("positions", n), e.readyPromise.then(function () {
      return function (e, t, n) {
        var r,
            i = e.tilingScheme,
            o = [],
            l = {};

        for (r = 0; r < n.length; ++r) {
          var u,
              h = i.positionToTileXY(n[r], t),
              s = h.toString();
          l.hasOwnProperty(s) || (u = {
            x: h.x,
            y: h.y,
            level: t,
            tilingScheme: i,
            terrainProvider: e,
            positions: []
          }, l[s] = u, o.push(u)), l[s].positions.push(n[r]);
        }

        var a = [];

        for (r = 0; r < o.length; ++r) {
          var f = o[r],
              v = f.terrainProvider.requestTileGeometry(f.x, f.y, f.level).then(function (e) {
            var r = e.positions,
                i = e.tilingScheme.tileXYToRectangle(e.x, e.y, e.level);
            return function (e) {
              for (var t = 0; t < r.length; ++t) {
                var n = r[t];
                n.height = e.interpolateHeight(i, n.longitude, n.latitude);
              }
            };
          }(f)).otherwise(function (e) {
            var t = e.positions;
            return function () {
              for (var e = 0; e < t.length; ++e) {
                t[e].height = void 0;
              }
            };
          }(f));
          a.push(v);
        }

        return c.all(a, function () {
          return n;
        });
      }(e, t, n);
    });
  };
});