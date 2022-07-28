"use strict";

define(["../../Source/Core/Cartesian3", "../../Source/Core/RuntimeError", "../../Source/Core/defined", "../core/GeoUtils"], function (a, c, e, b) {
  var d = function d(h) {
    if (!e(h)) {
      throw new c("options is required");
    }

    if (!e(h.paths)) {
      throw new c("paths is required");
    }

    var k = [],
        l,
        g = "";

    if (h.paths[0].hasOwnProperty("x")) {
      l = h.paths;

      for (var j = 0; j < h.paths.length; j++) {
        var f = b.cartesian2Degrees(h.paths[j]);
        g += f.longitude + " " + f.latitude + ",";
      }
    } else {
      for (var j = 0; j < h.paths.length; j++) {
        if (h.paths[j].length === 3) {
          k.push(h.paths[j][0], h.paths[j][1], h.paths[j][2]);
        } else {
          k.push(h.paths[j][0], h.paths[j][1]);
        }

        g += h.paths[j][0] + " " + h.paths[j][1] + ",";
      }

      if (h.paths[0].length === 3) {
        l = a.fromDegreesArrayHeights(k);
      } else {
        l = a.fromDegreesArray(k);
      }
    }

    this.positions = l;
    this.WKTContent = "LineString(" + g.substring(0, g.length - 1) + ")";
    this.paths = h.paths;
    this.type = "polyline";
  };

  return d;
});