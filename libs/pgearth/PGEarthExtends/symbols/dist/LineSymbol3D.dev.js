"use strict";

define(["../../Source/DataSources/PolylineVolumeGraphics", "../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/RuntimeError", "../../Source/Core/Cartesian2", "../../Source/Core/CornerType", "../../Source/Core/Math", "../_Color"], function (r, e, o, n, i, t, u, a) {
  function s(r) {
    if ("circle" === r.type) return function (r) {
      for (var e = [], o = 0; o < 360; o++) {
        var n = u.toRadians(o);
        e.push(new i(r * Math.cos(n), r * Math.sin(n)));
      }

      return e;
    }(r.radius);
    if ("star" === r.type) return function (r, e, o) {
      for (var n = Math.PI / r, t = 2 * r, u = new Array(t), a = 0; a < t; a++) {
        var s = a % 2 == 0 ? e : o;
        u[a] = new i(Math.cos(a * n) * s, Math.sin(a * n) * s);
      }

      return u;
    }(r.arms, r.rOuter, r.rInner);

    if ("polygon" === r.type) {
      var e = [];
      if (!r.rings) throw new n("the rings of polygon is required!");

      for (var o in r.rings) {
        e.push(new i(r.rings[o][0], r.rings[o][1]));
      }

      return e;
    }
  }

  return function (i) {
    if (!i) throw new n("options is required!");
    i.material = new a(e(i.color, "#fff")), i.outline = !!o(i.outline) && i.outline, i.outlineColor = new a(e(i.outlineColor, "#000")), i.shape = o(i.shape) ? s(i.shape) : s({
      type: "circle",
      radius: 1e3
    }), this.__proto__ = r.prototype, r.call(this, i), this.symbolKey = "polylineVolume";
  };
});