"use strict";

define(["../../Oblique/PGPageLOD/PGPageLOD", "../../Core/defined", "../../Core/DeveloperError", "../../Core/createGuid"], function (i, n, o, u) {
  return function (e) {
    if (!n(e.url)) throw new o("url is required");
    var r = new i(e);
    return r.id = e.id || u(), r.destroy = function () {}, r;
  };
});