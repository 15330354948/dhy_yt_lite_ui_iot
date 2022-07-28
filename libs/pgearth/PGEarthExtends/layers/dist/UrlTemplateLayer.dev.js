"use strict";

define(["../../Source/Core/defined", "../../Source/Scene/UrlTemplateImageryProvider", "../../Source/Core/createGuid", "../../Source/Core/DeveloperError", "../../Source/Core/defaultValue"], function (f, e, c, b, a) {
  function d(h) {
    var i = i;

    if (!f(h.url) || h.url === "") {
      throw new b("url is required");
    }

    var g = new e(h);
    g.id = h.id || i;
    g.throttleByServer = a(h.throttleByServer, true);
    return g;
  }

  return d;
});