"use strict";

define(["../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Scene/ArcGisMapServerImageryProvider", "../../Source/Core/createGuid"], function (r, e, o, u) {
  return function (u) {
    var i = i;
    if (!r(u.url) || "" === u.url) throw new e("url is required");
    var n = new o(u);
    return n.id = u.id || i, n;
  };
});