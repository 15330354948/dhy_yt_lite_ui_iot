"use strict";

define(["../Core/Cartesian3", "../Core/Check", "./PGEarth3DTileOptimizationHint", "./TileBoundingRegion", "./TileOrientedBoundingBox"], function (o, x, b, A, M) {
  "use strict";

  var a = {},
      d = new o();
  return a.checkChildrenWithinParent = function (a) {
    x.typeOf.object("tile", a);
    var e = a.children,
        t = e.length,
        n = a.boundingVolume;

    if (n instanceof M || n instanceof A) {
      var i = n._orientedBoundingBox;
      a._optimChildrenWithinParent = b.USE_OPTIMIZATION;

      for (var h = 0; h < t; ++h) {
        var s = e[h].boundingVolume;

        if (!(s instanceof M || s instanceof A)) {
          a._optimChildrenWithinParent = b.SKIP_OPTIMIZATION;
          break;
        }

        var r = s._orientedBoundingBox,
            l = o.subtract(r.center, i.center, d),
            f = o.magnitude(l);

        if (o.divideByScalar(l, f, l), Math.abs(i.halfAxes[0] * l.x) + Math.abs(i.halfAxes[1] * l.y) + Math.abs(i.halfAxes[2] * l.z) + Math.abs(i.halfAxes[3] * l.x) + Math.abs(i.halfAxes[4] * l.y) + Math.abs(i.halfAxes[5] * l.z) + Math.abs(i.halfAxes[6] * l.x) + Math.abs(i.halfAxes[7] * l.y) + Math.abs(i.halfAxes[8] * l.z) <= Math.abs(r.halfAxes[0] * l.x) + Math.abs(r.halfAxes[1] * l.y) + Math.abs(r.halfAxes[2] * l.z) + Math.abs(r.halfAxes[3] * l.x) + Math.abs(r.halfAxes[4] * l.y) + Math.abs(r.halfAxes[5] * l.z) + Math.abs(r.halfAxes[6] * l.x) + Math.abs(r.halfAxes[7] * l.y) + Math.abs(r.halfAxes[8] * l.z) + f) {
          a._optimChildrenWithinParent = b.SKIP_OPTIMIZATION;
          break;
        }
      }
    }

    return a._optimChildrenWithinParent === b.USE_OPTIMIZATION;
  }, a;
});