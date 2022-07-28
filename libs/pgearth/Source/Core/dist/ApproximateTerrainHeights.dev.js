"use strict";

define(["./buildModuleUrl", "./defaultValue", "./defined", "./defineProperties", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Cartographic", "./Check", "./DeveloperError", "./Ellipsoid", "./GeographicTilingScheme", "./Rectangle", "./Resource"], function (i, u, f, e, s, r, l, g, d, c, m, t, H, n) {
  "use strict";

  var w = new l(),
      p = new l(),
      _ = new g(),
      v = new l(),
      T = new l(),
      h = new s(),
      x = new t(),
      M = [new g(), new g(), new g(), new g()],
      R = new r(),
      C = {};

  function S(e) {
    g.fromRadians(e.east, e.north, 0, M[0]), g.fromRadians(e.west, e.north, 0, M[1]), g.fromRadians(e.east, e.south, 0, M[2]), g.fromRadians(e.west, e.south, 0, M[3]);

    for (var i = 0, r = 0, t = 0, n = 0, a = C._terrainHeightsMaxLevel, o = 0; o <= a; ++o) {
      for (var s = !1, h = 0; h < 4; ++h) {
        var u = M[h];
        if (x.positionToTileXY(u, o, R), 0 === h) t = R.x, n = R.y;else if (t !== R.x || n !== R.y) {
          s = !0;
          break;
        }
      }

      if (s) break;
      i = t, r = n;
    }

    if (0 !== o) return {
      x: i,
      y: r,
      level: a < o ? a : o - 1
    };
  }

  return C.initialize = function () {
    var e = C._initPromise;
    return f(e) ? e : (e = n.fetchJson(i("Assets/approximateTerrainHeights.json")).then(function (e) {
      C._terrainHeights = e;
    }), C._initPromise = e);
  }, C.getMinimumMaximumHeights = function (e, i) {
    if (d.defined("rectangle", e), !f(C._terrainHeights)) throw new c("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");
    i = u(i, m.WGS84);
    var r,
        t,
        n,
        a,
        o = S(e),
        s = C._defaultMinTerrainHeight,
        h = C._defaultMaxTerrainHeight;
    return f(o) && (r = o.level + "-" + o.x + "-" + o.y, t = C._terrainHeights[r], f(t) && (s = t[0], h = t[1]), i.cartographicToCartesian(H.northeast(e, _), w), i.cartographicToCartesian(H.southwest(e, _), p), l.midpoint(p, w, v), n = i.scaleToGeodeticSurface(v, T), s = f(n) ? (a = l.distance(v, n), Math.min(s, -a)) : C._defaultMinTerrainHeight), {
      minimumTerrainHeight: s = Math.max(C._defaultMinTerrainHeight, s),
      maximumTerrainHeight: h
    };
  }, C.getBoundingSphere = function (e, i) {
    if (d.defined("rectangle", e), !f(C._terrainHeights)) throw new c("You must call ApproximateTerrainHeights.initialize and wait for the promise to resolve before using this function");
    i = u(i, m.WGS84);
    var r,
        t,
        n = S(e),
        a = C._defaultMaxTerrainHeight;
    f(n) && (r = n.level + "-" + n.x + "-" + n.y, t = C._terrainHeights[r], f(t) && (a = t[1]));
    var o = s.fromRectangle3D(e, i, 0);
    return s.fromRectangle3D(e, i, a, h), s.union(o, h, o);
  }, C._terrainHeightsMaxLevel = 6, C._defaultMaxTerrainHeight = 9e3, C._defaultMinTerrainHeight = -1e5, C._terrainHeights = void 0, C._initPromise = void 0, e(C, {
    initialized: {
      get: function get() {
        return f(C._terrainHeights);
      }
    }
  }), C;
});