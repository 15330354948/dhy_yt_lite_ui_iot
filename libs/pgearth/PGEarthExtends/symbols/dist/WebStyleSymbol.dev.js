"use strict";

define(["../../Source/DataSources/ModelGraphics", "../../Source/Core/defaultValue", "../../Source/Core/RuntimeError", "../../Source/Core/Math", "../../Source/Core/HeadingPitchRoll", "../../Source/Scene/HeightReference", "../../Source/Core/Color", "../_Color"], function (e, o, r, i, t, c, n, u) {
  return function (l) {
    if (!l) throw new r("options is required");
    l instanceof e ? this.__proto__ = l : (l.uri = l.url, l.color = o(u(l.color), n.WHITE), l.minimumPixelSize = o(l.minimumPixelSize, 0), l.heightReference = o(l.heightReference, c.RELATIVE_TO_GROUND), this.__proto__ = e.prototype, e.call(this, l));
    var h = i.toRadians(o(l.heading, 0)),
        a = l.pitch,
        s = l.roll;
    this.hpr = new t(h, a, s), this.symbolKey = "model";
  };
});