"use strict";

define(["../../Source/Core/Check", "../../Source/Core/RuntimeError", "../../Source/DataSources/SampledPositionProperty", "./Point", "./Polyline", "./Polygon"], function (g, b, d, f, c, a) {
  function e(h) {
    if (!h) {
      throw new b("options is required");
    }

    g.typeOf.object("options", h);
    var i;

    if (h.type === "point" && !(h instanceof f)) {
      i = new f(h);
    } else {
      if (h.type === "polyline" && !(h instanceof c)) {
        i = new c(h);
      } else {
        if (h.type === "polygon" && !(h instanceof a)) {
          i = new a(h);
        } else {
          if (h instanceof f || h instanceof c || h instanceof a) {
            i = h;
          } else {
            if (h instanceof d) {
              i = h;
            }
          }
        }
      }
    }

    return i;
  }

  return e;
});