"use strict";

define(["../../Source/Core/defined", "../../Source/Scene/createTileMapServiceImageryProvider", "../../Source/Core/createGuid", "../../Source/Core/DeveloperError"], function (e, d, c, b) {
  function a(f) {
    var g = g;

    if (!e(f.url) || f.url === "") {
      throw new b("url is required");
    }

    console.log(f);
    var h = new d(f);
    h.id = f.id || g;
    return h;
  }

  return a;
});