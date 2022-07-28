"use strict";

define(["../../Source/DataSources/PolygonGraphics", "../../Source/Core/defaultValue", "../../Source/Core/Check", "../../Source/Core/RuntimeError", "../../Source/Scene/HeightReference", "../_Color"], function (d, b, g, c, a, e) {
  function f(i) {
    if (!i) {
      throw new c("options is required!");
    }

    g.typeOf.object("options", i);
    i.material = new e(b(i.color), "#fff");
    i.outline = b(i.outline, false);
    i.outlineColor = new e(b(i.outlineColor, "#000"));
    i.outlineWidth = b(i.outlineWidth, 1);
    var h = this;
    this.__proto__ = d.prototype;
    d.call(h, i);
    this.symbolKey = "polygon";
  }

  return f;
});