"use strict";

define(["../../Source/Core/PGEarthTerrainProvider", "../../Source/Core/createGuid", "../../Source/Core/defined", "../../Source/Core/DeveloperError"], function (r, e, o, i) {
  return function (u) {
    if (!o(u.url)) throw new i("url is required");
    var n = new r(u);
    return n.id = u.id || e(), n;
  };
});