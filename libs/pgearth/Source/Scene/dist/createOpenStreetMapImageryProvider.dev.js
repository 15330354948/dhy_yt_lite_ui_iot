"use strict";

define(["../Core/appendForwardSlash", "../Core/Credit", "../Core/defaultValue", "../Core/DeveloperError", "../Core/Rectangle", "../Core/Resource", "../Core/WebMercatorTilingScheme", "./UrlTemplateImageryProvider"], function (p, d, h, c, v, g, C, f) {
  "use strict";

  var w = new d("MapQuest, Open Street Map and contributors, CC-BY-SA");
  return function (e) {
    e = h(e, {});
    var t = h(e.url, "https://a.tile.openstreetmap.org/"),
        t = p(t);
    t += "{z}/{x}/{y}." + h(e.fileExtension, "png");
    var r = g.createIfNeeded(t),
        i = new C({
      ellipsoid: e.ellipsoid
    }),
        n = h(e.minimumLevel, 0),
        a = e.maximumLevel,
        o = h(e.rectangle, i.rectangle),
        l = i.positionToTileXY(v.southwest(o), n),
        m = i.positionToTileXY(v.northeast(o), n),
        s = (Math.abs(m.x - l.x) + 1) * (Math.abs(m.y - l.y) + 1);
    if (4 < s) throw new c("The rectangle and minimumLevel indicate that there are " + s + " tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.");
    var u = h(e.credit, w);
    return "string" == typeof u && (u = new d(u)), new f({
      url: r,
      credit: u,
      tilingScheme: i,
      tileWidth: 256,
      tileHeight: 256,
      minimumLevel: n,
      maximumLevel: a,
      rectangle: o
    });
  };
});