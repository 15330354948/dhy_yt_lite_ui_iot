"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/RuntimeError", "../../Source/DataSources/PolylineGraphics", "../../Source/DataSources/PolylineOutlineMaterialProperty", "../../Source/DataSources/PolylineArrowMaterialProperty", "../../Source/DataSources/PolylineGlowMaterialProperty", "../../Source/DataSources/PolylineDashMaterialProperty", "../../Source/Core/Color", "../_Color"], function (e, o, r, l, t, a, i, n, s, c) {
  return function (y) {
    if (!y) throw new r("options is required");
    if (!y.style) throw new r("options.style is required");
    var u;

    switch (y.style.type ? y.style.type : "color") {
      case "line-outline":
        u = new t({
          color: new c(e(y.style.color, "#fff")),
          outlineWidth: e(y.style.outlineWidth, 1),
          outlineColor: new c(e(y.style.outlineColor, "#fff"))
        });
        break;

      case "line-arrow":
        u = new a(new c(e(y.style.color, "#fff")));
        break;

      case "line-glow":
        u = new i({
          glowPower: e(y.style.glowPower, .1),
          color: new c(e(y.style.color, "#fff"))
        });
        break;

      case "line-dash":
        u = new n({
          color: new c(e(y.style.color, "#fff")),
          gapColor: o(y.style.gapColor) ? new c(y.style.gapColor) : s.fromAlpha(s.YELLOW, 0),
          dashLength: e(y.style.dashLength, 16)
        });
        break;

      case "color":
        u = new c(e(y.style.color, "#f00"));
    }

    y.width = e(y.width, 1), y.material = u, this.__proto__ = l.prototype, l.call(this, y), this.symbolKey = "polyline";
  };
});