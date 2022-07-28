"use strict";

define(["../../Source/DataSources/BoxGraphics", "../../Source/Core/Check", "../../Source/Core/defaultValue", "../../Source/Core/Cartesian3", "../../Source/Core/RuntimeError", "../../Source/Core/Color", "../_Color"], function (e, o, r, i, n, t, s) {
  return function (u) {
    if (!u) return new n("options is required!");
    o.typeOf.object("options", u), u.dimensions = new i(u.dimensions.length, u.dimensions.width, u.dimensions.height), u.material = r(new s(u.material), t.WHITE), this.__proto__ = e.prototype, e.call(this, u), this.symbolKey = "box";
  };
});