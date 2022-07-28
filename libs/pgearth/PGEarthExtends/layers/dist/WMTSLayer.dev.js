"use strict";

define(["../../Source/Scene/WebMapTileServiceImageryProvider", "../../Source/Core/createGuid", "../../Source/Core/defined", "../../Source/Core/DeveloperError"], function (e, r, i, t) {
  return function (o) {
    if (!i(o.url)) throw new t("url is required");
    if (!i(o.title)) throw new t("title is required");
    if (!i(o.tileMatrixSet)) throw new t("tileMatrixSet is required");
    o.format = o.format || "image/jpeg", o.style = "default", o.tileMatrixSetID = o.tileMatrixSet, o.layer = o.title;
    var u = new e(o);
    return u.id = o.id || r(), u;
  };
});