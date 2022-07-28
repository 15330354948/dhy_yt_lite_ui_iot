"use strict";

define(["../../Source/Core/RuntimeError", "../../Source/Core/defaultValue", "../../Source/Core/Check", "../../Source/Core/Math", "../../Source/DataSources/EllipseGraphics", "../_Color"], function (e, o, t, i, r, n) {
  return function (u) {
    if (!u) throw new e("the options is required");
    t.typeOf.object("options", u), u.extrudedHeight = o(u.extrudedHeight, void 0), u.height = o(u.height, 0), u.rotation = i.toRadians(o(u.rotation, 0)), u.material = new n(o(u.color, "#fff")), u.outline = o(u.outline, !1), u.outlineColor = new n(o(u.outlineColor, "#000")), u.outlineWidth = o(u.outlineWidth, 1), this.__proto__ = r.prototype, r.call(this, u), this.symbolKey = "ellipse";
  };
});