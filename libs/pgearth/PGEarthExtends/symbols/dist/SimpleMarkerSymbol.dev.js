"use strict";

define(["../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/DataSources/PointGraphics", "../../Source/Core/RuntimeError", "../../Source/Scene/HeightReference", "../_Color"], function (e, o, i, r, t, n) {
  return function (u) {
    if (!o(u)) throw new r("the options is required");
    u.color = new n(e(u.color, "red")), u.pixelSize = e(u.size, 12), u.outlineColor = new n(u.outline && u.outline.color || "black"), u.outlineWidth = u.outline && u.outline.width || 1, u.heightReference = e(u.heightReference, t.RELATIVE_TO_GROUND), this.__proto__ = i.prototype, i.call(this, u), this.symbolKey = "point";
  };
});