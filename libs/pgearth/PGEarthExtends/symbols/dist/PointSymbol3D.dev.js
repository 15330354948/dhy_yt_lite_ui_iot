"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/RuntimeError", "../../Source/Core/Cartesian3", "../../Source/Scene/HeightReference", "../_Color"], function (c, d, b, a, e) {
  function f(g) {
    if (!g) {
      throw new d("the options is required");
    }

    if (g.style.type === "cylinder") {
      return {
        length: c(g.style.height, 0),
        topRadius: c(g.style.width, 100),
        bottomRadius: c(g.style.width, 100),
        material: new e(c(g.style.color, "#f00")),
        outline: c(g.style.outline, false),
        outlineColor: new e(c(g.style.outlineColor, "#0ff")),
        outlineWidth: c(g.style.outlineWidth, 1),
        heightReference: c(g.style.heightReference, a.NONE),
        symbolKey: "cylinder"
      };
    } else {
      if (g.style.type === "cone") {
        return {
          length: c(g.style.height, 0),
          topRadius: 0,
          bottomRadius: c(g.style.width, 100),
          material: new e(c(g.style.color, "#f00")),
          outline: c(g.style.outline, false),
          outlineColor: new e(c(g.style.outlineColor, "#0ff")),
          outlineWidth: c(g.style.outlineWidth, 1),
          heightReference: c(g.style.heightReference, a.NONE),
          symbolKey: "cylinder"
        };
      } else {
        if (g.style.type === "ellipsoid") {
          return {
            radii: new b(c(g.style.radii[0], 0), c(g.style.radii[1], 0), c(g.style.radii[2], 0)),
            material: new e(c(g.style.color, "#f00")),
            outline: c(g.style.outline, false),
            outlineColor: new e(c(g.style.outlineColor, "#0ff")),
            outlineWidth: c(g.style.outlineWidth, 1),
            heightReference: c(g.style.heightReference, a.NONE),
            symbolKey: "ellipsoid"
          };
        }
      }
    }
  }

  return f;
});