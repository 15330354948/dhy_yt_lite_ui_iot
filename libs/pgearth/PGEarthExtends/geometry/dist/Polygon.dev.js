"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/Cartesian3", "../../Source/Core/RuntimeError", "../../Source/Core/defined"], function (b, a, d, e) {
  var c = function c(q) {
    if (!e(q)) {
      throw new d("options is required");
    }

    if (!e(q.rings)) {
      throw new d("rings is required");
    }

    var f = [],
        n = [],
        g = "",
        o;

    if (q.rings[0] instanceof a) {
      o = q.rings;
    } else {
      for (var m in q.rings) {
        var k = [];

        if (q.rings[m]) {
          for (var l = 0; l < q.rings[m].length; l++) {
            if (q.rings[m][l] instanceof Array) {
              k.push(q.rings[m][l][0], q.rings[m][l][1]);
            } else {
              f.push(q.rings[m][l]);
            }
          }

          g += q.rings[m][0] + " " + q.rings[m][1] + ",";

          if (q.rings[m][0] instanceof Array) {
            n.push(k);
          }
        }
      }

      if (q.rings[0][0] !== q.rings[q.rings.length - 1][0] && q.rings[0][1] !== q.rings[q.rings.length - 1][1]) {
        g += q.rings[0][0] + " " + q.rings[0][1] + ",";
      }

      if (n.length > 1 && n[0] instanceof Array) {
        o = {
          positions: a.fromDegreesArray(n[0])
        };
        var h = {};

        for (var m = n.length - 1; m > 0; m--) {
          var p = h;
          h = {};

          if (m !== n.length - 1) {
            h.holes = [p];
          }

          h.positions = a.fromDegreesArray(n[m]);
        }

        o.holes = [h];
      } else {
        if (q.perPositionHeight) {
          o = a.fromDegreesArrayHeights(f);
        } else {
          o = a.fromDegreesArray(f);
        }
      }
    }

    this.hierarchy = o;
    this.WKTContent = "Polygon((" + g.substring(0, g.length - 1) + "))";
    this.rings = q.rings;

    if (q.perPositionHeight) {
      this.height = q.perPositionHeight ? q.height : b(q.height, 0);
      this.perPositionHeight = q.perPositionHeight;
    }

    this.type = "polygon";
  };

  return c;
});