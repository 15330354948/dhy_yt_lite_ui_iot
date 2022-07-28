"use strict";

define(["../Core/defined", "../Core/Rectangle", "../Core/sampleTerrainMostDetailed", "./SceneMode", "../ThirdParty/when"], function (s, u, e, c, d) {
  "use strict";

  function h(t, a) {
    var n = a.terrainProvider,
        e = a.mapProjection,
        r = e.ellipsoid,
        i = a.camera.getRectangleCameraCoordinates(t),
        o = a.mode === c.SCENE3D ? r.cartesianToCartographic(i) : e.unproject(i);
    return s(n) ? n.readyPromise.then(function () {
      var e = n.availability;
      if (!s(e) || a.mode === c.SCENE2D) return o;
      var r = [u.center(t), u.southeast(t), u.southwest(t), u.northeast(t), u.northwest(t)];
      return h._sampleTerrainMostDetailed(n, r).then(function (e) {
        var r = e.reduce(function (e, r) {
          return Math.max(r.height, e);
        }, -Number.MAX_VALUE),
            t = o;
        return t.height += r, t;
      });
    }) : d.resolve(o);
  }

  return h._sampleTerrainMostDetailed = e, h;
});