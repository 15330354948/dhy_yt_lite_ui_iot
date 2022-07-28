"use strict";

define(["../../Source/Scene/WebMapServiceImageryProvider", "../../Source/Core/defined", "../../Source/Core/createGuid", "../../Source/Core/DeveloperError"], function (e, r, n, o) {
  return function (i) {
    if (!r(i.url)) throw new o("url is required");
    i.parameters = {
      format: "image/png",
      transparent: !0
    };
    var u = new e(i);
    return u.id = i.id || n(), u;
  };
});