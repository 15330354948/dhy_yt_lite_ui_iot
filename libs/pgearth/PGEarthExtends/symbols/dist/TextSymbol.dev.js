"use strict";

define(["../../Source/DataSources/LabelGraphics", "../../Source/Core/defaultValue", "../../Source/Core/defined", "../../Source/Core/Check", "../../Source/Core/RuntimeError", "../../Source/Scene/LabelStyle", "../../Source/Core/Cartesian2", "../../Source/Scene/HeightReference", "../_Color"], function (e, o, t, r, i, n, l, f, c) {
  return function (u) {
    if (!u) throw new i("options is required");
    r.typeOf.object("options", u), u.fillColor = new c(o(u.color, "#000")), u.font = (t(u.font.size) ? u.font.size + " " : "16px ") + u.font.family, u.outlineColor = new c(o(u.outlineColor, "#000")), u.outlineWidth = o(u.outlineWidth, 1), u.text = t(u.text) && u.text.toString(), u.style = o(n[u.style], n.FILL), u.pixelOffset = new l(o(u.xoffset, 0), o(u.yoffset, 0)), u.heightReference = o(u.heightReference, f.RELATIVE_TO_GROUND), this.__proto__ = e.prototype, e.call(this, u), this.symbolKey = "label";
  };
});