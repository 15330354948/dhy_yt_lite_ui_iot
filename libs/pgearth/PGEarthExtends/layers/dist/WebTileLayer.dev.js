"use strict";

define(["../../Source/Core/defined", "../../Source/Core/createGuid", "../../Source/Core/DeveloperError", "../../Source/Scene/UrlTemplateImageryProvider"], function (e, r, o, u) {
  return function (i) {
    if (!e(i.url)) throw new o("url is required");
    var n = new u(i);
    return n.id = i.id || r(), n;
  };
});