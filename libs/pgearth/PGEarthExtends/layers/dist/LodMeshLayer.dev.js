"use strict";

define(["../../Source/Oblique/PGPageLOD/PGPageLOD", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/createGuid"], function (e, r, o, u) {
  return function (i) {
    if (!r(i.url)) throw new o("url is required");
    var n = new e(i);
    return n.id = i.id || u(), n.destroy = function () {}, n;
  };
});