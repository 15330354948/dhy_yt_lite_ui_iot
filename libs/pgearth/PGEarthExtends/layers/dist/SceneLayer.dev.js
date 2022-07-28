"use strict";

define(["../../Source/Scene/PGEarth3DTileset", "../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/createGuid"], function (e, r, u, i) {
  return function (o) {
    if (!r(o.url)) throw new u("url is required");
    o.maximumScreenSpaceError = o.maximumScreenSpaceError || 2, o.maximumNumberOfLoadedTiles = o.maximumNumberOfLoadedTiles || 1e3;
    var m = new e(o);
    return m.id = o.id || i(), m;
  };
});